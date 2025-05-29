<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCalendar, faFileAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from 'vue-router';

defineProps({
  issue: {
    type: Object,
    required: true
  }
});

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
    <!-- Cover Image Placeholder -->
    <div class="h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
      <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
        <span class="text-4xl font-bold text-white font-poppins">{{ issue.coverImage }}</span>
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-6">
      <div class="flex items-center text-sm text-neutral-500 mb-2">
        <FontAwesomeIcon :icon="faCalendar" class="mr-2" />
        <span>{{ formatDate(issue.date) }}</span>
      </div>
      
      <h3 class="text-xl font-bold text-neutral-800 font-poppins mb-3">
        {{ issue.title }}
      </h3>
      
      <p class="text-neutral-600 mb-4 line-clamp-3">
        {{ issue.description }}
      </p>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-neutral-500">
          <FontAwesomeIcon :icon="faFileAlt" class="mr-2" />
          <span>{{ issue.articleCount }} articles</span>
        </div>
        
        <RouterLink 
          :to="`/issues/${issue.id}`"
          class="inline-flex items-center text-green-700 hover:text-green-800 font-medium transition duration-300"
        >
          View Issue
          <FontAwesomeIcon :icon="faArrowRight" class="ml-2" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>