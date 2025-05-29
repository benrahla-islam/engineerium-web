<script setup>
import { ref, onMounted, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faFileAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from 'vue-router';
import Breadcrumb from '@/components/Breadcrumb.vue';
import ArticleCard from '@/components/ArticleCard.vue';
import Footer from '@/components/footer.vue';
import { getAuthorById, getArticlesByAuthor, getIssuesByAuthor } from '@/data/mockData.js';

const props = defineProps({
  authorId: {
    type: String,
    required: true
  }
});

const author = ref(null);
const authorArticles = ref([]);
const authorIssues = ref([]);

// Breadcrumb items
const breadcrumbItems = computed(() => [
  { name: 'Home', to: '/' },
  { name: 'Authors', to: '/authors' },
  { name: author.value?.name || 'Author' }
]);

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });
};

onMounted(() => {
  author.value = getAuthorById(props.authorId);
  if (author.value) {
    authorArticles.value = getArticlesByAuthor(props.authorId);
    authorIssues.value = getIssuesByAuthor(props.authorId);
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- Breadcrumb -->
      <Breadcrumb :items="breadcrumbItems" />
      
      <!-- Author profile header -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Author avatar and basic info -->
          <div class="md:w-1/3 text-center md:text-left">
            <div class="w-32 h-32 bg-green-700 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
              <span class="text-5xl font-bold text-white">{{ author?.profileImage }}</span>
            </div>
            <h1 class="text-3xl font-bold text-neutral-800 font-poppins mb-2">
              {{ author?.name }}
            </h1>
            <p class="text-xl text-green-700 font-medium mb-4">
              {{ author?.specialization }}
            </p>
            <a 
              :href="`mailto:${author?.email}`"
              class="inline-flex items-center text-green-700 hover:text-green-800 transition duration-300"
            >
              <FontAwesomeIcon :icon="faEnvelope" class="mr-2" />
              {{ author?.email }}
            </a>
          </div>
          
          <!-- Author bio and stats -->
          <div class="md:w-2/3">
            <h2 class="text-2xl font-bold text-neutral-800 font-poppins mb-4">About</h2>
            <p class="text-lg text-neutral-600 mb-6 leading-relaxed">
              {{ author?.bio }}
            </p>
            
            <!-- Author statistics -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center text-neutral-600">
                  <FontAwesomeIcon :icon="faFileAlt" class="mr-2 text-green-700" />
                  <span class="font-medium">Articles Published</span>
                </div>
                <p class="text-2xl font-bold text-neutral-800 mt-1">{{ authorArticles.length }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center text-neutral-600">
                  <FontAwesomeIcon :icon="faCalendar" class="mr-2 text-green-700" />
                  <span class="font-medium">Issues Contributed</span>
                </div>
                <p class="text-2xl font-bold text-neutral-800 mt-1">{{ authorIssues.length }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Issues contributed to -->
      <div class="mb-8" v-if="authorIssues.length > 0">
        <h2 class="text-2xl font-bold text-neutral-800 font-poppins mb-6">
          Issues Contributed To
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="issue in authorIssues" 
            :key="issue.id"
            class="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
          >
            <div class="flex items-center mb-3">
              <div class="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center mr-3">
                <span class="text-white font-bold">{{ issue.coverImage }}</span>
              </div>
              <div>
                <h3 class="font-semibold text-neutral-800">{{ issue.title }}</h3>
                <p class="text-sm text-neutral-500">{{ formatDate(issue.date) }}</p>
              </div>
            </div>
            <RouterLink 
              :to="`/issues/${issue.id}`"
              class="text-green-700 hover:text-green-800 font-medium text-sm"
            >
              View Issue →
            </RouterLink>
          </div>
        </div>
      </div>
      
      <!-- Author's articles -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-neutral-800 font-poppins mb-6">
          Articles by {{ author?.name }}
        </h2>
        
        <div v-if="authorArticles.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ArticleCard 
            v-for="article in authorArticles" 
            :key="article.id" 
            :article="article" 
          />
        </div>
        
        <div v-else class="bg-white rounded-lg shadow-lg p-8 text-center">
          <p class="text-neutral-600">No articles published yet.</p>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>