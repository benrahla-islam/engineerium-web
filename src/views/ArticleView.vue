<script setup>
import { ref, onMounted, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCalendar, faClock, faTag, faArrowLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from 'vue-router';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Footer from '@/components/footer.vue';
import { getArticleById, getAuthorById, getIssueById } from '@/data/mockData.js';

const props = defineProps({
  issueId: {
    type: String,
    required: true
  },
  articleId: {
    type: String,
    required: true
  }
});

const article = ref(null);
const author = ref(null);
const issue = ref(null);

// Breadcrumb items
const breadcrumbItems = computed(() => [
  { name: 'Home', to: '/' },
  { name: 'Issues', to: '/issues' },
  { name: issue.value?.title || 'Issue', to: `/issues/${props.issueId}` },
  { name: article.value?.title || 'Article' }
]);

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long',
    day: 'numeric'
  });
};

onMounted(() => {
  article.value = getArticleById(props.articleId);
  if (article.value) {
    author.value = getAuthorById(article.value.authorId);
    issue.value = getIssueById(article.value.issueId);
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-6 py-8">
      <!-- Breadcrumb -->
      <Breadcrumb :items="breadcrumbItems" />
      
      <!-- Back to issue button -->
      <div class="mb-6">
        <RouterLink 
          :to="`/issues/${issueId}`"
          class="inline-flex items-center text-green-700 hover:text-green-800 font-medium transition duration-300"
        >
          <FontAwesomeIcon :icon="faArrowLeft" class="mr-2" />
          Back to Issue
        </RouterLink>
      </div>
      
      <!-- Article content -->
      <article class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Article header -->
        <div class="p-8 border-b border-gray-200">
          <!-- Category and metadata -->
          <div class="flex flex-wrap items-center gap-4 mb-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <FontAwesomeIcon :icon="faTag" class="mr-1" />
              {{ article?.category }}
            </span>
            <div class="flex items-center text-sm text-neutral-500">
              <FontAwesomeIcon :icon="faClock" class="mr-1" />
              <span>{{ article?.readTime }}</span>
            </div>
            <div class="flex items-center text-sm text-neutral-500">
              <FontAwesomeIcon :icon="faCalendar" class="mr-1" />
              <span>{{ formatDate(article?.publishDate) }}</span>
            </div>
          </div>
          
          <!-- Article title -->
          <h1 class="text-3xl md:text-4xl font-bold text-neutral-800 font-poppins mb-4">
            {{ article?.title }}
          </h1>
          
          <!-- Article excerpt -->
          <p class="text-xl text-neutral-600 mb-6">
            {{ article?.excerpt }}
          </p>
          
          <!-- Author information -->
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center mr-4">
              <span class="text-white font-bold text-lg">{{ author?.profileImage }}</span>
            </div>
            <div>
              <RouterLink 
                :to="`/authors/${author?.id}`"
                class="text-lg font-semibold text-neutral-800 hover:text-green-700 transition duration-300"
              >
                {{ author?.name }}
              </RouterLink>
              <p class="text-neutral-600">{{ author?.specialization }}</p>
              <a 
                :href="`mailto:${author?.email}`"
                class="text-sm text-green-700 hover:text-green-800 flex items-center mt-1"
              >
                <FontAwesomeIcon :icon="faEnvelope" class="mr-1" />
                {{ author?.email }}
              </a>
            </div>
          </div>
        </div>
        
        <!-- Article body -->
        <div class="p-8">
          <div class="prose prose-lg max-w-none">
            <div v-html="article?.content?.replace(/\n/g, '<br>')"></div>
          </div>
        </div>
      </article>
      
      <!-- Related articles or back to issue -->
      <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-xl font-bold text-neutral-800 font-poppins mb-4">
          More from this Issue
        </h3>
        <RouterLink 
          :to="`/issues/${issueId}`"
          class="inline-flex items-center text-green-700 hover:text-green-800 font-medium transition duration-300"
        >
          View all articles in {{ issue?.title }}
          <FontAwesomeIcon :icon="faArrowLeft" class="ml-2 rotate-180" />
        </RouterLink>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<style scoped>
.prose {
  color: #374151;
  line-height: 1.7;
}

.prose h1 {
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem 0 1rem 0;
  color: #1f2937;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1.5rem 0 1rem 0;
  color: #1f2937;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 1.5rem 0 0.5rem 0;
  color: #1f2937;
}

.prose p {
  margin: 1rem 0;
}

.prose ul, .prose ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.prose li {
  margin: 0.5rem 0;
}
</style>