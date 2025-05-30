import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { articles as mockArticles } from '@/data/mockData.js'

export const useArticlesStore = defineStore('articles', () => {
  // State
  const articles = ref([...mockArticles])
  const loading = ref(false)
  const error = ref(null)

  // Getters (computed)
  const allArticles = computed(() => articles.value)
  
  const getArticleById = computed(() => {
    return (id) => articles.value.find(article => article.id === parseInt(id))
  })
  
  const getArticlesByIssue = computed(() => {
    return (issueId) => articles.value.filter(article => article.issueId === parseInt(issueId))
  })
  
  const getArticlesByAuthor = computed(() => {
    return (authorId) => articles.value.filter(article => article.authorId === parseInt(authorId))
  })
  
  const getArticlesByCategory = computed(() => {
    return (category) => articles.value.filter(article => 
      article.category.toLowerCase() === category.toLowerCase()
    )
  })
  
  const searchArticles = computed(() => {
    return (query) => {
      if (!query.trim()) return articles.value
      const searchTerm = query.toLowerCase().trim()
      return articles.value.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm)
      )
    }
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
  const fetchArticles = async () => {
    try {
      setLoading(true)
      clearError()
      // In future: const response = await articlesAPI.getAll()
      // articles.value = response.data
      articles.value = [...mockArticles]
    } catch (err) {
      setError('Failed to fetch articles')
      console.error('Error fetching articles:', err)
    } finally {
      setLoading(false)
    }
  }

  const addArticle = (article) => {
    const newArticle = {
      ...article,
      id: Math.max(...articles.value.map(a => a.id)) + 1,
      publishDate: article.publishDate || new Date().toISOString().split('T')[0]
    }
    articles.value.push(newArticle)
  }

  const updateArticle = (id, updatedArticle) => {
    const index = articles.value.findIndex(article => article.id === parseInt(id))
    if (index !== -1) {
      articles.value[index] = { ...articles.value[index], ...updatedArticle }
    }
  }

  const deleteArticle = (id) => {
    const index = articles.value.findIndex(article => article.id === parseInt(id))
    if (index !== -1) {
      articles.value.splice(index, 1)
    }
  }

  return {
    // State
    articles: allArticles,
    loading,
    error,
    
    // Getters
    getArticleById,
    getArticlesByIssue,
    getArticlesByAuthor,
    getArticlesByCategory,
    searchArticles,
    
    // Actions
    fetchArticles,
    addArticle,
    updateArticle,
    deleteArticle,
    setLoading,
    setError,
    clearError
  }
})