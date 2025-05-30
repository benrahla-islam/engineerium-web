<script setup>
import NavBar from './components/NavBar.vue'
import GlobalErrorHandler from './components/GlobalErrorHandler.vue'
import { RouterView } from 'vue-router';
</script>

<template>
  <NavBar />
  <RouterView />
  <GlobalErrorHandler />
</template>