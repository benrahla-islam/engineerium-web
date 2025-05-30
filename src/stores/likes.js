import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLikesStore = defineStore('likes', () => {
  // State - store likes as articleId: count
  const likes = ref({})
  // Make liked articles reactive by storing in state
  const likedArticles = ref([])

  // Initialize liked articles from localStorage
  const initializeLikedArticles = () => {
    const stored = JSON.parse(localStorage.getItem('likedArticles') || '[]')
    likedArticles.value = stored
  }

  // Getters
  const getLikesForArticle = computed(() => {
    return (articleId) => likes.value[articleId] || 0
  })

  const getTotalLikesForAuthor = computed(() => {
    return (authorId, articles) => {
      return articles
        .filter(article => article.authorId === parseInt(authorId))
        .reduce((total, article) => total + (likes.value[article.id] || 0), 0)
    }
  })

  const hasLiked = computed(() => {
    return (articleId) => {
      // Use reactive state instead of localStorage directly
      return likedArticles.value.includes(parseInt(articleId))
    }
  })

  // Actions
  const toggleLike = (articleId) => {
    const id = parseInt(articleId)
    
    if (likedArticles.value.includes(id)) {
      // Unlike
      const index = likedArticles.value.indexOf(id)
      likedArticles.value.splice(index, 1)
      likes.value[id] = Math.max((likes.value[id] || 1) - 1, 0)
    } else {
      // Like
      likedArticles.value.push(id)
      likes.value[id] = (likes.value[id] || 0) + 1
    }
    
    // Sync with localStorage
    localStorage.setItem('likedArticles', JSON.stringify(likedArticles.value))
  }

  const initializeLikes = () => {
    // Initialize liked articles from localStorage
    initializeLikedArticles()
    
    // Initialize with some sample data - in a real app this would come from API
    if (Object.keys(likes.value).length === 0) {
      likes.value = {
        1: 12,
        2: 8,
        3: 15,
        4: 6,
        5: 9,
        6: 4
      }
    }
  }

  return {
    // State
    likes,
    likedArticles,
    
    // Getters
    getLikesForArticle,
    getTotalLikesForAuthor,
    hasLiked,
    
    // Actions
    toggleLike,
    initializeLikes
  }
})