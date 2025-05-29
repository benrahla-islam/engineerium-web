<script setup>
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faFileAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from 'vue-router';
import Footer from '@/components/footer.vue';
import { authors, getArticlesByAuthor } from '@/data/mockData.js';

const authorsList = ref([]);

// Get article count for each author
const getAuthorArticleCount = (authorId) => {
  return getArticlesByAuthor(authorId).length;
};

onMounted(() => {
  authorsList.value = authors;
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero section -->
    <section class="bg-blue-900 py-16 px-6">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
          Browse Authors
        </h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">
          Meet the brilliant minds behind our engineering insights and research articles
        </p>
      </div>
    </section>

    <!-- Authors grid -->
    <section class="py-16 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="author in authorsList" 
            :key="author.id"
            class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
          >
            <!-- Author avatar -->
            <div class="text-center mb-4">
              <div class="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <span class="text-3xl font-bold text-white">{{ author.profileImage }}</span>
              </div>
              <h3 class="text-xl font-bold text-neutral-800 font-poppins">
                {{ author.name }}
              </h3>
              <p class="text-green-700 font-medium">{{ author.specialization }}</p>
            </div>
            
            <!-- Author bio -->
            <p class="text-neutral-600 mb-4 line-clamp-4">
              {{ author.bio }}
            </p>
            
            <!-- Author stats and contact -->
            <div class="space-y-3">
              <div class="flex items-center text-sm text-neutral-500">
                <FontAwesomeIcon :icon="faFileAlt" class="mr-2" />
                <span>{{ getAuthorArticleCount(author.id) }} articles published</span>
              </div>
              
              <a 
                :href="`mailto:${author.email}`"
                class="flex items-center text-sm text-green-700 hover:text-green-800 transition duration-300"
              >
                <FontAwesomeIcon :icon="faEnvelope" class="mr-2" />
                {{ author.email }}
              </a>
              
              <RouterLink 
                :to="`/authors/${author.id}`"
                class="inline-flex items-center text-green-700 hover:text-green-800 font-medium transition duration-300 w-full justify-center mt-4 py-2 border border-green-700 rounded-md hover:bg-green-50"
              >
                View Profile
                <FontAwesomeIcon :icon="faArrowRight" class="ml-2" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>