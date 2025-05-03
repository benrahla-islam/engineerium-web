<script setup>
import logo from '@/assets/img/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLock, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ref, onMounted, onUnmounted } from 'vue';

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  
  // Prevent scrolling when menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Close mobile menu when clicking outside
const closeMobileMenu = () => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
    document.body.style.overflow = '';
  }
};

// Close mobile menu on wider screens
const checkScreenSize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
    document.body.style.overflow = '';
  }
};

// Event listeners for screen resize
onMounted(() => {
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
  document.body.style.overflow = '';
});

// Navigation links
const navLinks = [
  { name: 'Home', locked: false },
  { name: 'Releases', locked: true },
  { name: 'Blog', locked: true },
  { name: 'About', locked: true }
];
</script>

<template>
<div>
  <nav class="flex justify-between items-center py-3 px-6 sticky top-0 z-50 bg-white/80 shadow-md backdrop-blur-md">
    <!-- Logo and magazine name -->
    <div class="flex items-center">
      <img :src="logo" alt="Engineerium" class="h-10 w-auto mr-3" />
      <h1 class="font-bold uppercase tracking-wide text-neutral-800 font-poppins text-xl">Engineerium</h1>
    </div>
    
    <!-- Desktop Navigation -->
    <div class="hidden md:block md:ml-auto">
      <div class="flex space-x-2">
        <a 
          v-for="(link, index) in navLinks" 
          :key="index"
          :class="[
            link.name === 'Home' 
              ? 'text-white bg-green-700 hover:bg-green-800' 
              : 'text-neutral-700 hover:text-white hover:bg-green-700',
            'rounded-md px-3 py-2 flex items-center'
          ]"
        >
          {{ link.name }}
          <FontAwesomeIcon 
            v-if="link.locked" 
            :icon="faLock" 
            class="ml-1 text-xs opacity-70" 
          />
        </a>
      </div>
    </div>
    
    <!-- Mobile menu button -->
    <button 
      @click="toggleMobileMenu" 
      class="md:hidden rounded-md p-2 text-neutral-700 hover:bg-green-700 hover:text-white focus:outline-none"
      aria-label="Menu"
    >
      <FontAwesomeIcon :icon="isMobileMenuOpen ? faXmark : faBars" class="h-6 w-6" />
    </button>
  </nav>

  <!-- Mobile Navigation Menu -->
  <div 
    v-if="isMobileMenuOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
    @click="closeMobileMenu"
  ></div>
  
  <div 
    class="fixed top-0 right-0 bottom-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-lg md:hidden"
    :class="isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="flex justify-end p-4">
      <button 
        @click="toggleMobileMenu" 
        class="text-neutral-700 hover:text-green-700 focus:outline-none"
        aria-label="Close menu"
      >
        <FontAwesomeIcon :icon="faXmark" class="h-6 w-6" />
      </button>
    </div>
    
    <div class="flex flex-col space-y-2 px-4 py-2">
      <a 
        v-for="(link, index) in navLinks" 
        :key="index"
        @click="toggleMobileMenu"
        :class="[
          link.name === 'Home' 
            ? 'text-white bg-green-700 hover:bg-green-800' 
            : 'text-neutral-700 hover:text-white hover:bg-green-700',
          'rounded-md px-3 py-2 flex items-center'
        ]"
      >
        {{ link.name }}
        <FontAwesomeIcon 
          v-if="link.locked" 
          :icon="faLock" 
          class="ml-1 text-xs opacity-70" 
        />
      </a>
    </div>
  </div>
</div>
</template>