<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useReadingStore } from '@/stores'

const props = defineProps({
  articleId: {
    type: [String, Number],
    required: true
  }
})

const readingStore = useReadingStore()
const progress = ref(0)
const isVisible = ref(false)
const startTime = ref(Date.now())

const progressPercent = computed(() => Math.round(progress.value))
const timeRemaining = computed(() => {
  if (progress.value === 0) return null
  const elapsed = (Date.now() - startTime.value) / 1000
  const totalEstimated = elapsed / (progress.value / 100)
  const remaining = Math.max(0, totalEstimated - elapsed)
  return Math.round(remaining / 60) // minutes
})

const updateProgress = () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
  
  progress.value = scrollPercent
  isVisible.value = scrollPercent > 5 // Show after 5% scroll
  
  // Update reading progress in store
  readingStore.updateReadingProgress(props.articleId, scrollPercent)
}

const updateReadingTime = () => {
  const now = Date.now()
  const elapsed = (now - startTime.value) / 1000
  if (elapsed >= 10) { // Update every 10 seconds
    readingStore.addReadingTime(props.articleId, elapsed)
    startTime.value = now
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
  
  // Track reading time
  const timeInterval = setInterval(updateReadingTime, 10000)
  
  // Set currently reading
  readingStore.setCurrentlyReading(props.articleId)
  
  onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress)
    clearInterval(timeInterval)
    updateReadingTime() // Final time update
    readingStore.clearCurrentlyReading()
  })
})
</script>

<template>
  <Transition name="progress-bar">
    <div 
      v-if="isVisible"
      class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200"
    >
      <!-- Progress bar -->
      <div class="h-1 bg-gray-200">
        <div 
          class="h-full bg-green-600 transition-all duration-300 ease-out"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
      
      <!-- Progress info -->
      <div class="px-4 py-2 flex items-center justify-between text-sm">
        <div class="text-gray-600">
          Reading Progress: <span class="font-semibold text-green-700">{{ progressPercent }}%</span>
        </div>
        <div v-if="timeRemaining && timeRemaining > 0" class="text-gray-500">
          ~{{ timeRemaining }} min remaining
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.progress-bar-enter-active {
  transition: all 0.3s ease-out;
}

.progress-bar-leave-active {
  transition: all 0.3s ease-in;
}

.progress-bar-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.progress-bar-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>