<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDownload, faCalendar, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '@/components/Breadcrumb.vue';
import ArticleCard from '@/components/ArticleCard.vue';
import Footer from '@/components/footer.vue';
import { getIssueById, getArticlesByIssue } from '@/data/mockData.js';

const props = defineProps({
  issueId: {
    type: String,
    required: true
  }
});

const route = useRoute();
const issue = ref(null);
const articles = ref([]);
const isDownloading = ref(false);

// Breadcrumb items
const breadcrumbItems = computed(() => [
  { name: 'Home', to: '/' },
  { name: 'Issues', to: '/issues' },
  { name: issue.value?.title || 'Issue' }
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

// Handle PDF download
const handleDownload = async () => {
  if (!issue.value?.pdfPath) return;
  
  try {
    isDownloading.value = true;
    
    const response = await fetch(issue.value.pdfPath);
    
    if (!response.ok) {
      throw new Error(`File not found: ${issue.value.pdfPath}`);
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${issue.value.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download the PDF. Please try again later.');
  } finally {
    isDownloading.value = false;
  }
};

onMounted(() => {
  issue.value = getIssueById(props.issueId);
  articles.value = getArticlesByIssue(props.issueId);
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- Breadcrumb -->
      <Breadcrumb :items="breadcrumbItems" />
      
      <!-- Issue header -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Issue cover -->
          <div class="lg:w-1/3">
            <div class="h-64 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
              <div class="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                <span class="text-6xl font-bold text-white font-poppins">{{ issue?.coverImage }}</span>
              </div>
            </div>
          </div>
          
          <!-- Issue details -->
          <div class="lg:w-2/3">
            <div class="flex items-center text-sm text-neutral-500 mb-4">
              <FontAwesomeIcon :icon="faCalendar" class="mr-2" />
              <span>Published {{ formatDate(issue?.date) }}</span>
            </div>
            
            <h1 class="text-3xl md:text-4xl font-bold text-neutral-800 font-poppins mb-4">
              {{ issue?.title }}
            </h1>
            
            <p class="text-lg text-neutral-600 mb-6">
              {{ issue?.description }}
            </p>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center text-neutral-500">
                <FontAwesomeIcon :icon="faFileAlt" class="mr-2" />
                <span>{{ articles.length }} articles</span>
              </div>
              
              <button 
                @click="handleDownload"
                class="bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-md font-medium flex items-center transition duration-300"
                :disabled="isDownloading"
              >
                <FontAwesomeIcon :icon="faDownload" class="mr-2" />
                {{ isDownloading ? 'Downloading...' : 'Download PDF' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Articles section -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-neutral-800 font-poppins mb-6">
          Articles in this Issue
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ArticleCard 
            v-for="article in articles" 
            :key="article.id" 
            :article="article" 
          />
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<style scoped>
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>