<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEdit, faUser, faGraduationCap, faPen } from '@fortawesome/free-solid-svg-icons';

// Define props for customization
defineProps({
  title: {
    type: String,
    default: 'Contribute to Engineerium Journal',
  },
  description: {
    type: String,
    default: 'Share your insights, research, and innovations with the UBC Engineering community. We welcome contributions from both students and faculty members.',
  },
  formLink: {
    type: String,
    default: 'https://forms.google.com/engineeriumcontribute',
  },
  buttonText: {
    type: String,
    default: 'Submit Your Contribution',
  }
});
</script>

<template>
  <section class="py-16 px-6 bg-gray-50">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        <!-- Left side - Form link button (switched from right) -->
        <div class="md:w-2/5 flex justify-center">
          <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <div class="text-center mb-4">
              <FontAwesomeIcon :icon="faEdit" class="text-green-700 text-4xl mb-2" />
              <h3 class="text-xl font-semibold text-neutral-700">Ready to share your work?</h3>
              <p class="text-neutral-500 mt-2">Fill out our submission form to get started</p>
            </div>
            
            <a :href="formLink" target="_blank" rel="noopener noreferrer" 
               class="block w-full bg-green-700 hover:bg-green-800 text-white py-4 px-6 rounded-md font-medium text-center transition duration-300">
              {{ buttonText }}
            </a>
            
            <div class="mt-4 text-center text-sm text-neutral-500">
              Our editorial team will review your submission within 5-7 business days.
            </div>
          </div>
        </div>
        
        <!-- Right side - Text content (switched from left) -->
        <div class="md:w-3/5">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-800 font-poppins mb-4">
            {{ title }}
          </h2>
          <p class="text-lg text-neutral-600 mb-6">
            {{ description }}
          </p>
          
          <!-- Contributor types -->
          <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <div class="flex items-center text-neutral-600">
              <div class="bg-green-100 p-2 rounded-full mr-3">
                <FontAwesomeIcon :icon="faGraduationCap" class="text-green-700" />
              </div>
              <span>Students</span>
            </div>
            <div class="flex items-center text-neutral-600">
              <div class="bg-green-100 p-2 rounded-full mr-3">
                <FontAwesomeIcon :icon="faUser" class="text-green-700" />
              </div>
              <span>Faculty Members</span>
            </div>
          </div>
          
          <!-- Benefits list -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-neutral-700 mb-2">Why contribute?</h3>
            <ul class="text-neutral-600">
              <li class="flex items-start mb-2">
                <FontAwesomeIcon :icon="faPen" class="text-green-700 mt-1 mr-2" />
                <span>Showcase your research and projects</span>
              </li>
              <li class="flex items-start mb-2">
                <FontAwesomeIcon :icon="faPen" class="text-green-700 mt-1 mr-2" />
                <span>Gain recognition within the engineering community</span>
              </li>
              <li class="flex items-start">
                <FontAwesomeIcon :icon="faPen" class="text-green-700 mt-1 mr-2" />
                <span>Build your professional portfolio</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>