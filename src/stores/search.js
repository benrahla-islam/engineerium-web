import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSearchStore = defineStore('search', () => {
  // State
  const query = ref('')
  const searchHistory = ref([])
  const isSearching = ref(false)
  const searchResults = ref({
    articles: [],
    authors: [],
    issues: []
  })

  // Getters (computed)
  const hasQuery = computed(() => query.value.trim().length > 0)
  const hasResults = computed(() => 
    searchResults.value.articles.length > 0 ||
    searchResults.value.authors.length > 0 ||
    searchResults.value.issues.length > 0
  )
  const totalResults = computed(() => 
    searchResults.value.articles.length +
    searchResults.value.authors.length +
    searchResults.value.issues.length
  )

  // Actions
  const setQuery = (newQuery) => {
    query.value = newQuery
  }

  const clearQuery = () => {
    query.value = ''
    searchResults.value = {
      articles: [],
      authors: [],
      issues: []
    }
  }

  const addToHistory = (searchTerm) => {
    if (!searchTerm.trim()) return
    
    // Remove if already exists
    const index = searchHistory.value.indexOf(searchTerm)
    if (index > -1) {
      searchHistory.value.splice(index, 1)
    }
    
    // Add to beginning
    searchHistory.value.unshift(searchTerm)
    
    // Keep only last 10 searches
    if (searchHistory.value.length > 10) {
      searchHistory.value.pop()
    }
  }

  const clearHistory = () => {
    searchHistory.value = []
  }

  const performGlobalSearch = (searchTerm, stores) => {
    if (!searchTerm.trim()) {
      clearQuery()
      return
    }

    isSearching.value = true
    setQuery(searchTerm)
    
    try {
      const { articlesStore, authorsStore, issuesStore } = stores
      
      searchResults.value = {
        articles: articlesStore.searchArticles(searchTerm),
        authors: authorsStore.searchAuthors(searchTerm),
        issues: issuesStore.searchIssues(searchTerm)
      }
      
      addToHistory(searchTerm)
    } catch (error) {
      console.error('Global search failed:', error)
    } finally {
      isSearching.value = false
    }
  }

  return {
    // State
    query,
    searchHistory,
    isSearching,
    searchResults,
    
    // Getters
    hasQuery,
    hasResults,
    totalResults,
    
    // Actions
    setQuery,
    clearQuery,
    addToHistory,
    clearHistory,
    performGlobalSearch
  }
})