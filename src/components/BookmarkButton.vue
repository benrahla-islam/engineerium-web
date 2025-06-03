<script setup>
import { computed } from 'vue'
import { useReadingStore } from '@/stores'

const props = defineProps({
  articleId: {
    type: [String, Number],
    required: true
  }
})

const readingStore = useReadingStore()

const isBookmarked = computed(() => readingStore.isBookmarked(props.articleId))

const handleBookmark = () => {
  readingStore.toggleBookmark(props.articleId)
}
</script>

<template>
  <button
    @click="handleBookmark"
    class="inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 border"
    :class="isBookmarked ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-blue-50'"
    :title="isBookmarked ? 'Remove bookmark' : 'Bookmark this article'"
  >
    <!-- Bookmark SVG -->
    <svg 
      class="w-5 h-5 transition-colors duration-200"
      viewBox="0 0 24 24"
      :fill="isBookmarked ? 'currentColor' : 'none'"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
    
    <span class="font-medium text-sm">
      {{ isBookmarked ? 'Bookmarked' : 'Bookmark' }}
    </span>
  </button>
</template>

<style scoped>
button:active {
  transform: scale(0.95);
}
</style>