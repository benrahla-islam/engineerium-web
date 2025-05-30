<script setup>
import { ref, onMounted, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import IssueCard from '@/components/IssueCard.vue';
import Footer from '@/components/footer.vue';
import { useIssuesStore } from '@/stores';

// Initialize store
const issuesStore = useIssuesStore()

const searchQuery = ref('');

// Computed property to filter issues based on search query
const filteredIssues = computed(() => {
  return issuesStore.searchIssues(searchQuery.value)
});

// Clear search
const clearSearch = () => {
  searchQuery.value = '';
};

onMounted(async () => {
  // Fetch data from store
  await issuesStore.fetchIssues()
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero section -->
    <section class="bg-blue-900 py-16 px-6">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
          Browse Issues
        </h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">
          Explore our collection of engineering insights, research, and innovations from the RE2SD community
        </p>
      </div>
    </section>

    <!-- Search section -->
    <section class="py-8 px-6 bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <div class="max-w-lg mx-auto">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon :icon="faSearch" class="text-gray-400" />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search issues by title or description..."
              class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FontAwesomeIcon :icon="faTimes" class="text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          
          <!-- Search results summary -->
          <div v-if="searchQuery" class="mt-3 text-center text-sm text-gray-600">
            Found {{ filteredIssues.length }} issue{{ filteredIssues.length !== 1 ? 's' : '' }}
            {{ searchQuery ? `for "${searchQuery}"` : '' }}
          </div>
        </div>
      </div>
    </section>

    <!-- Issues grid -->
    <section class="py-16 px-6">
      <div class="max-w-6xl mx-auto">
        <div v-if="filteredIssues.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <IssueCard 
            v-for="issue in filteredIssues" 
            :key="issue.id" 
            :issue="issue" 
          />
        </div>
        
        <!-- No results message -->
        <div v-else class="text-center py-12">
          <div class="max-w-md mx-auto">
            <FontAwesomeIcon :icon="faSearch" class="text-6xl text-gray-300 mb-4" />
            <h3 class="text-xl font-semibold text-gray-600 mb-2">No issues found</h3>
            <p class="text-gray-500 mb-4">
              We couldn't find any issues matching "{{ searchQuery }}". Try adjusting your search terms.
            </p>
            <button
              @click="clearSearch"
              class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Clear Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>