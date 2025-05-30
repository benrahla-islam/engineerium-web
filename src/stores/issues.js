import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { issues as mockIssues } from '@/data/mockData.js'
import { useArticlesStore } from './articles'

export const useIssuesStore = defineStore('issues', () => {
  // State
  const issues = ref([...mockIssues])
  const loading = ref(false)
  const error = ref(null)

  // Getters (computed)
  const allIssues = computed(() => issues.value)
  
  const getIssueById = computed(() => {
    return (id) => issues.value.find(issue => issue.id === parseInt(id))
  })
  
  const getIssuesByYear = computed(() => {
    return (year) => issues.value.filter(issue => 
      new Date(issue.date).getFullYear() === parseInt(year)
    )
  })
  
  const getIssuesByAuthor = computed(() => {
    return (authorId) => {
      const articlesStore = useArticlesStore()
      const authorArticles = articlesStore.getArticlesByAuthor(authorId)
      const issueIds = [...new Set(authorArticles.map(article => article.issueId))]
      return issues.value.filter(issue => issueIds.includes(issue.id))
    }
  })
  
  const searchIssues = computed(() => {
    return (query) => {
      if (!query.trim()) return issues.value
      const searchTerm = query.toLowerCase().trim()
      return issues.value.filter(issue =>
        issue.title.toLowerCase().includes(searchTerm) ||
        issue.description.toLowerCase().includes(searchTerm)
      )
    }
  })
  
  const sortedIssues = computed(() => {
    return [...issues.value].sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  // Actions
  const setLoading = (state) => {
    loading.value = state
  }

  const setError = (errorMessage) => {
    error.value = errorMessage
  }

  const clearError = () => {
    error.value = null
  }

  // Future-proofing for API integration
  const fetchIssues = async () => {
    try {
      setLoading(true)
      clearError()
      // In future: const response = await issuesAPI.getAll()
      // issues.value = response.data
      issues.value = [...mockIssues]
    } catch (err) {
      setError('Failed to fetch issues')
      console.error('Error fetching issues:', err)
    } finally {
      setLoading(false)
    }
  }

  const addIssue = (issue) => {
    const newIssue = {
      ...issue,
      id: Math.max(...issues.value.map(i => i.id)) + 1,
      date: issue.date || new Date().toISOString().split('T')[0],
      coverImage: issue.coverImage || issue.title.charAt(0).toUpperCase(),
      articleCount: 0
    }
    issues.value.push(newIssue)
  }

  const updateIssue = (id, updatedIssue) => {
    const index = issues.value.findIndex(issue => issue.id === parseInt(id))
    if (index !== -1) {
      issues.value[index] = { ...issues.value[index], ...updatedIssue }
    }
  }

  const deleteIssue = (id) => {
    const index = issues.value.findIndex(issue => issue.id === parseInt(id))
    if (index !== -1) {
      issues.value.splice(index, 1)
    }
  }

  const updateArticleCount = (issueId) => {
    const articlesStore = useArticlesStore()
    const issue = issues.value.find(i => i.id === parseInt(issueId))
    if (issue) {
      issue.articleCount = articlesStore.getArticlesByIssue(issueId).length
    }
  }

  return {
    // State
    issues: allIssues,
    loading,
    error,
    
    // Getters
    getIssueById,
    getIssuesByYear,
    getIssuesByAuthor,
    searchIssues,
    sortedIssues,
    
    // Actions
    fetchIssues,
    addIssue,
    updateIssue,
    deleteIssue,
    updateArticleCount,
    setLoading,
    setError,
    clearError
  }
})