import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useReadingStore = defineStore('reading', () => {
  // State
  const bookmarkedArticles = ref([])
  const readingPreferences = ref({
    fontSize: 'medium', // small, medium, large, xlarge
    lineSpacing: 'normal', // compact, normal, relaxed
    readingWidth: 'standard' // narrow, standard, wide
  })
  const readingProgress = ref({}) // articleId: { progress: 0-100, timeSpent: seconds }
  const currentlyReading = ref(null) // current article being read

  // Initialize from localStorage
  const initializeReading = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]')
    const preferences = JSON.parse(localStorage.getItem('readingPreferences') || '{}')
    const progress = JSON.parse(localStorage.getItem('readingProgress') || '{}')
    
    bookmarkedArticles.value = bookmarks
    readingPreferences.value = { ...readingPreferences.value, ...preferences }
    readingProgress.value = progress
  }

  // Getters
  const isBookmarked = computed(() => {
    return (articleId) => bookmarkedArticles.value.includes(parseInt(articleId))
  })

  const getReadingProgress = computed(() => {
    return (articleId) => readingProgress.value[articleId] || { progress: 0, timeSpent: 0 }
  })

  const bookmarkedCount = computed(() => bookmarkedArticles.value.length)

  const totalReadingTime = computed(() => {
    return Object.values(readingProgress.value)
      .reduce((total, article) => total + (article.timeSpent || 0), 0)
  })

  const completedArticles = computed(() => {
    return Object.values(readingProgress.value)
      .filter(article => article.progress >= 90).length
  })

  // Actions
  const toggleBookmark = (articleId) => {
    const id = parseInt(articleId)
    if (bookmarkedArticles.value.includes(id)) {
      const index = bookmarkedArticles.value.indexOf(id)
      bookmarkedArticles.value.splice(index, 1)
    } else {
      bookmarkedArticles.value.push(id)
    }
    localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarkedArticles.value))
  }

  const updateReadingProgress = (articleId, progressPercent) => {
    const id = parseInt(articleId)
    if (!readingProgress.value[id]) {
      readingProgress.value[id] = { progress: 0, timeSpent: 0, lastRead: Date.now() }
    }
    readingProgress.value[id].progress = Math.max(readingProgress.value[id].progress, progressPercent)
    readingProgress.value[id].lastRead = Date.now()
    localStorage.setItem('readingProgress', JSON.stringify(readingProgress.value))
  }

  const addReadingTime = (articleId, seconds) => {
    const id = parseInt(articleId)
    if (!readingProgress.value[id]) {
      readingProgress.value[id] = { progress: 0, timeSpent: 0, lastRead: Date.now() }
    }
    readingProgress.value[id].timeSpent += seconds
    localStorage.setItem('readingProgress', JSON.stringify(readingProgress.value))
  }

  const updatePreferences = (newPreferences) => {
    readingPreferences.value = { ...readingPreferences.value, ...newPreferences }
    localStorage.setItem('readingPreferences', JSON.stringify(readingPreferences.value))
  }

  const setCurrentlyReading = (articleId) => {
    currentlyReading.value = articleId
  }

  const clearCurrentlyReading = () => {
    currentlyReading.value = null
  }

  return {
    // State
    bookmarkedArticles,
    readingPreferences,
    readingProgress,
    currentlyReading,

    // Getters
    isBookmarked,
    getReadingProgress,
    bookmarkedCount,
    totalReadingTime,
    completedArticles,

    // Actions
    toggleBookmark,
    updateReadingProgress,
    addReadingTime,
    updatePreferences,
    setCurrentlyReading,
    clearCurrentlyReading,
    initializeReading
  }
})