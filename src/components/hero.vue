<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

// Define props based on requirements
defineProps({
  title: {
    type: String,
    default: 'Welcome to Engineerium',
  },
  subtitle: {
    type: String,
    default: 'A student-led magazine exploring tech, science, and campus life',
  },
  backgroundColor: {
    type: String,
    default: 'bg-blue-900',
  },
  showScrollIndicator: {
    type: Boolean,
    default: true, // Show scroll indicator by default
  }
});
</script>

<template>
  <!-- Full-screen hero section with customizable background color -->
  <section :class="[backgroundColor, 'min-h-screen flex flex-col justify-center items-center relative overflow-hidden']">
    <!-- SVG Background -->
    <div class="absolute inset-0 w-full h-full z-0 opacity-20">
      <img src="@/assets/img/hero.svg" alt="Background illustration" class="w-full h-full object-cover" />
    </div>
    
    <!-- Main content container -->
    <div class="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center z-10">
      <div class="text-center">
        <!-- Main heading with responsive font sizing -->
        <h1 class="text-4xl md:text-6xl font-extrabold text-white font-poppins leading-tight">
          {{ title }}
        </h1>
        
        <!-- Subheading with descriptive text -->
        <p class="mt-6 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-poppins">
          {{ subtitle }}
        </p>
      </div>
    </div>
    
    <!-- Optional scroll indicator at the bottom of the screen -->
    <div v-if="showScrollIndicator" class="absolute bottom-8 left-0 right-0 flex justify-center">
      <div class="animate-bounce p-2 cursor-pointer">
        <FontAwesomeIcon :icon="faAngleDown" class="text-white text-3xl" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animation for the bounce effect of scroll indicator */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>