<script setup>
import { computed, onMounted } from 'vue'
import Hero from '@/components/hero.vue'
import download from '@/components/download.vue'
import contact from '@/components/contact.vue'
import Footer from '@/components/footer.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { useAppStores } from '@/composables/useAppStores'

const { articlesStore, readingStore, initializeApp } = useAppStores()

// Reading statistics
const readingStats = computed(() => ({
  bookmarkedCount: readingStore.bookmarkedCount,
  totalReadingTime: Math.round(readingStore.totalReadingTime / 60), // Convert to minutes
  completedArticles: readingStore.completedArticles
}))

// Get bookmarked articles
const bookmarkedArticles = computed(() => {
  return readingStore.bookmarkedArticles
    .map(id => articlesStore.getArticleById(id))
    .filter(article => article) // Filter out any null results
    .slice(0, 3) // Show only first 3
})

onMounted(() => {
  initializeApp()
})
</script>

<template>
  <Hero 
    title="Welcome to Engineerium" 
    subtitle="A student-led magazine exploring tech, science, and culture.      Led by students, for students." 
    backgroundColor="bg-blue-900"
    :showScrollIndicator="true"
  />
  
  <!-- Reading Dashboard Section -->
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Your Reading Dashboard</h2>
      
      <!-- Reading Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <!-- Bookmarks -->
        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800">{{ readingStats.bookmarkedCount }}</h3>
          <p class="text-gray-600">Bookmarked Articles</p>
        </div>
        
        <!-- Reading Time -->
        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800">{{ readingStats.totalReadingTime }}</h3>
          <p class="text-gray-600">Minutes Read</p>
        </div>
        
        <!-- Completed Articles -->
        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800">{{ readingStats.completedArticles }}</h3>
          <p class="text-gray-600">Articles Completed</p>
        </div>
      </div>
      
      <!-- Bookmarked Articles -->
      <div v-if="bookmarkedArticles.length > 0" class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-800">Your Bookmarks</h3>
          <RouterLink 
            to="/bookmarks" 
            class="text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            View All →
          </RouterLink>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ArticleCard 
            v-for="article in bookmarkedArticles"
            :key="article.id"
            :article="article"
            :showBookmark="true"
          />
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
        <h3 class="text-lg font-medium text-gray-700 mb-2">No bookmarks yet</h3>
        <p class="text-gray-500 mb-4">Start exploring articles and bookmark your favorites!</p>
        <RouterLink 
          to="/issues" 
          class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Browse Articles
        </RouterLink>
      </div>
    </div>
  </section>
  
  <download />
  <contact />
  <Footer />
</template>