import { computed } from 'vue'
import { useArticlesStore, useAuthorsStore, useIssuesStore, useSearchStore, useLikesStore } from '@/stores'

/**
 * Enhanced composable for managing application stores with performance optimizations
 * This provides a centralized way to access and manage all stores
 */
export function useAppStores() {
  const articlesStore = useArticlesStore()
  const authorsStore = useAuthorsStore()
  const issuesStore = useIssuesStore()
  const searchStore = useSearchStore()
  const likesStore = useLikesStore()

  // Computed loading state across all stores
  const isLoading = computed(() => 
    articlesStore.loading || 
    authorsStore.loading || 
    issuesStore.loading || 
    searchStore.isSearching
  )

  // Computed error state across all stores
  const hasErrors = computed(() => 
    !!(articlesStore.error || authorsStore.error || issuesStore.error)
  )

  // Get all errors
  const allErrors = computed(() => {
    const errors = []
    if (articlesStore.error) errors.push({ type: 'articles', message: articlesStore.error })
    if (authorsStore.error) errors.push({ type: 'authors', message: authorsStore.error })
    if (issuesStore.error) errors.push({ type: 'issues', message: issuesStore.error })
    return errors
  })

  // Initialize all stores with data
  const initializeApp = async () => {
    try {
      await Promise.all([
        articlesStore.fetchArticles(),
        authorsStore.fetchAuthors(),
        issuesStore.fetchIssues()
      ])
      likesStore.initializeLikes()
    } catch (error) {
      console.error('Failed to initialize app:', error)
    }
  }

  // Clear all errors
  const clearAllErrors = () => {
    articlesStore.clearError()
    authorsStore.clearError()
    issuesStore.clearError()
  }

  // Performance: Get related data efficiently
  const getRelatedData = (articleId) => {
    const article = articlesStore.getArticleById(articleId)
    if (!article) return null

    return {
      article,
      author: authorsStore.getAuthorById(article.authorId),
      issue: issuesStore.getIssueById(article.issueId),
      relatedArticles: articlesStore.getArticlesByIssue(article.issueId)
        .filter(a => a.id !== parseInt(articleId))
        .slice(0, 3) // Limit for performance
    }
  }

  // Performance: Get author with articles and issues
  const getAuthorWithData = (authorId) => {
    const author = authorsStore.getAuthorById(authorId)
    if (!author) return null

    const articles = articlesStore.getArticlesByAuthor(authorId)
    return {
      author,
      articles,
      issues: issuesStore.getIssuesByAuthor(authorId),
      totalLikes: likesStore.getTotalLikesForAuthor(authorId, articles)
    }
  }

  // Global search across all stores
  const performGlobalSearch = (query) => {
    return searchStore.performGlobalSearch(query, {
      articlesStore,
      authorsStore,
      issuesStore
    })
  }

  return {
    // Stores
    articlesStore,
    authorsStore,
    issuesStore,
    searchStore,
    likesStore,

    // Computed states
    isLoading,
    hasErrors,
    allErrors,

    // Actions
    initializeApp,
    clearAllErrors,
    getRelatedData,
    getAuthorWithData,
    performGlobalSearch
  }
}