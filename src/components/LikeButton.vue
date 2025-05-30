<script setup>
import { computed } from 'vue'
import { useLikesStore } from '@/stores'

const props = defineProps({
  articleId: {
    type: [String, Number],
    required: true
  }
})

const likesStore = useLikesStore()

const likesCount = computed(() => likesStore.getLikesForArticle(props.articleId))
const isLiked = computed(() => likesStore.hasLiked(props.articleId))

const handleLike = () => {
  likesStore.toggleLike(props.articleId)
  // Force reactivity update
  console.log('Like toggled for article:', props.articleId, 'isLiked:', isLiked.value)
}
</script>

<template>
  <button
    @click="handleLike"
    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 border"
    :class="isLiked ? 'bg-white border-green-300' : 'bg-white border-gray-300 hover:border-gray-400'"
  >
    <!-- Honor Badge SVG -->
    <svg 
      class="w-6 h-6 transition-colors duration-300"
      viewBox="0 0 24 24"
    >
      <!-- Badge circle -->
      <circle 
        cx="12" 
        cy="9" 
        r="7" 
        stroke="currentColor" 
        stroke-width="1.5" 
        :fill="isLiked ? '#16a34a' : 'none'"
        :class="isLiked ? 'text-green-600' : 'text-gray-400'"
      />
      <!-- Star in center -->
      <path 
        d="M12 5.5l1.545 3.13L17 9.045l-2.727 2.66.644 3.755L12 14.27l-2.917 1.19.644-3.755L7 9.045l3.455-.415L12 5.5z" 
        :fill="isLiked ? 'white' : '#9ca3af'"
      />
      <!-- Ribbon tails -->
      <path 
        d="M9 16v5l3-1.5L15 21v-5" 
        stroke="currentColor" 
        stroke-width="1.5" 
        :fill="isLiked ? '#16a34a' : 'none'" 
        :class="isLiked ? 'text-green-600' : 'text-gray-400'"
        opacity="0.8"
      />
    </svg>
    
    <span class="font-medium text-sm" :class="isLiked ? 'text-green-700' : 'text-gray-600'">
      {{ likesCount }}
    </span>
  </button>
</template>

<style scoped>
button:active {
  transform: scale(0.95);
}
</style>