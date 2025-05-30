import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authors as mockAuthors } from '@/data/mockData.js'

export const useAuthorsStore = defineStore('authors', () => {
  // State
  const authors = ref([...mockAuthors])
  const loading = ref(false)
  const error = ref(null)

  // Getters (computed)
  const allAuthors = computed(() => authors.value)
  
  const getAuthorById = computed(() => {
    return (id) => authors.value.find(author => author.id === parseInt(id))
  })
  
  const getAuthorsBySpecialization = computed(() => {
    return (specialization) => authors.value.filter(author => 
      author.specialization.toLowerCase().includes(specialization.toLowerCase())
    )
  })
  
  const searchAuthors = computed(() => {
    return (query) => {
      if (!query.trim()) return authors.value
      const searchTerm = query.toLowerCase().trim()
      return authors.value.filter(author =>
        author.name.toLowerCase().includes(searchTerm) ||
        author.specialization.toLowerCase().includes(searchTerm) ||
        author.bio.toLowerCase().includes(searchTerm) ||
        author.email.toLowerCase().includes(searchTerm)
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
  const fetchAuthors = async () => {
    try {
      setLoading(true)
      clearError()
      // In future: const response = await authorsAPI.getAll()
      // authors.value = response.data
      authors.value = [...mockAuthors]
    } catch (err) {
      setError('Failed to fetch authors')
      console.error('Error fetching authors:', err)
    } finally {
      setLoading(false)
    }
  }

  const addAuthor = (author) => {
    const newAuthor = {
      ...author,
      id: Math.max(...authors.value.map(a => a.id)) + 1,
      profileImage: author.profileImage || author.name.charAt(0).toUpperCase()
    }
    authors.value.push(newAuthor)
  }

  const updateAuthor = (id, updatedAuthor) => {
    const index = authors.value.findIndex(author => author.id === parseInt(id))
    if (index !== -1) {
      authors.value[index] = { ...authors.value[index], ...updatedAuthor }
    }
  }

  const deleteAuthor = (id) => {
    const index = authors.value.findIndex(author => author.id === parseInt(id))
    if (index !== -1) {
      authors.value.splice(index, 1)
    }
  }

  return {
    // State
    authors: allAuthors,
    loading,
    error,
    
    // Getters
    getAuthorById,
    getAuthorsBySpecialization,
    searchAuthors,
    
    // Actions
    fetchAuthors,
    addAuthor,
    updateAuthor,
    deleteAuthor,
    setLoading,
    setError,
    clearError
  }
})