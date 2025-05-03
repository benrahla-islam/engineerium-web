<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

// Add icons to the library
library.add(faInstagram, faEnvelope);

// Define props for customization
defineProps({
  email: {
    type: String,
    default: 'engineerium@ubc.ca',
  },
  instagramUrl: {
    type: String,
    default: 'https://www.instagram.com/ubc_engineerium',
  },
  year: {
    type: Number,
    default: () => new Date().getFullYear(),
  }
});
</script>

<template>
  <footer class="bg-neutral-800 text-white py-12">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <!-- Logo and tagline -->
        <div class="mb-6 md:mb-0">
          <div class="flex items-center">
            <img src="@/assets/img/logo1.png" alt="Engineerium Logo" class="h-12 mr-3" />
            <h2 class="text-2xl font-bold text-white font-poppins">Engineerium</h2>
          </div>
          <p class="text-neutral-400 mt-2">RE2SD Engineering Student Journal</p>
        </div>
        
        <!-- Social links -->
        <div class="flex items-center space-x-6">
          <a :href="instagramUrl" target="_blank" rel="noopener noreferrer" 
             class="text-white hover:text-green-500 transition duration-300" 
             aria-label="Instagram">
            <div class="flex flex-col items-center">
              <FontAwesomeIcon :icon="faInstagram" class="text-2xl mb-2" />
              <span class="text-sm">Instagram</span>
            </div>
          </a>
          
          <a :href="`mailto:${email}`" 
             class="text-white hover:text-green-500 transition duration-300" 
             aria-label="Email">
            <div class="flex flex-col items-center">
              <FontAwesomeIcon :icon="faEnvelope" class="text-2xl mb-2" />
              <span class="text-sm">email</span>
            </div>
          </a>
        </div>
      </div>
      
      <div class="border-t border-neutral-700 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p class="text-neutral-400 text-sm mb-4 md:mb-0 text-center">
          &copy; {{ year }} Engineerium. All rights reserved.
        </p>

      </div>
    </div>
  </footer>
</template>


