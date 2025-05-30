<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faClock, faTag, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from 'vue-router';
import { useAuthorsStore } from '@/stores';
import { computed } from 'vue';

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
});

// Initialize store
const authorsStore = useAuthorsStore()

// Get author information from store
const author = computed(() => authorsStore.getAuthorById(props.article.authorId));
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
    <!-- Category and read time -->
    <div class="flex items-center justify-between mb-3">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <FontAwesomeIcon :icon="faTag" class="mr-1" />
        {{ article.category }}
      </span>
      <div class="flex items-center text-sm text-neutral-500">
        <FontAwesomeIcon :icon="faClock" class="mr-1" />
        <span>{{ article.readTime }}</span>
      </div>
    </div>
    
    <!-- Article title -->
    <h3 class="text-xl font-bold text-neutral-800 font-poppins mb-3">
      {{ article.title }}
    </h3>
    
    <!-- Article excerpt -->
    <p class="text-neutral-600 mb-4 line-clamp-3">
      {{ article.excerpt }}
    </p>
    
    <!-- Author and action -->
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center mr-3">
          <span class="text-white font-semibold text-sm">{{ author?.profileImage }}</span>
        </div>
        <div>
          <RouterLink 
            :to="`/authors/${author?.id}`"
            class="text-sm font-medium text-neutral-800 hover:text-green-700 transition duration-300"
          >
            {{ author?.name }}
          </RouterLink>
          <p class="text-xs text-neutral-500">{{ author?.specialization }}</p>
        </div>
      </div>
      
      <RouterLink 
        :to="`/issues/${article.issueId}/article/${article.id}`"
        class="inline-flex items-center text-green-700 hover:text-green-800 font-medium transition duration-300"
      >
        Read Article
        <FontAwesomeIcon :icon="faArrowRight" class="ml-2" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>