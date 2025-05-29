<script setup>
import { ref, onMounted } from 'vue';
import IssueCard from '@/components/IssueCard.vue';
import Footer from '@/components/footer.vue';
import { issues } from '@/data/mockData.js';

const issuesList = ref([]);

onMounted(() => {
  issuesList.value = issues;
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

    <!-- Issues grid -->
    <section class="py-16 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <IssueCard 
            v-for="issue in issuesList" 
            :key="issue.id" 
            :issue="issue" 
          />
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>