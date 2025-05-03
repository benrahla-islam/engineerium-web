<script setup>
import logo from '@/assets/img/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
<nav class="flex justify-between items-center py-3 px-6 sticky top-0 z-50 bg-white/80 shadow-md backdrop-blur-md">
    <!-- Logo and magazine name -->
    <div class="flex items-center">
      <img :src="logo" alt="Engineerium" class="h-10 w-auto mr-3" />
      <h1 class="font-bold uppercase tracking-wide text-neutral-800 font-poppins text-xl">Engineerium</h1>
    </div>
    
    <div class="md:ml-auto">
      <div class="flex space-x-2">
        <a
          class="text-white bg-green-700 hover:bg-green-800 rounded-md px-3 py-2"
          >Home</a
        >
        <a
          class="text-neutral-700 hover:text-white hover:bg-green-700 rounded-md px-3 py-2 flex items-center"
          >Releases <FontAwesomeIcon :icon="faLock" class="ml-1 text-xs opacity-70" /></a
        >
        <a
          class="text-neutral-700 hover:text-white hover:bg-green-700 rounded-md px-3 py-2 flex items-center"
          >Blog <FontAwesomeIcon :icon="faLock" class="ml-1 text-xs opacity-70" /></a
        >
        <a
          class="text-neutral-700 hover:text-white hover:bg-green-700 rounded-md px-3 py-2 flex items-center"
          >About <FontAwesomeIcon :icon="faLock" class="ml-1 text-xs opacity-70" /></a
        >
      </div>
    </div>
  </nav>
</template>