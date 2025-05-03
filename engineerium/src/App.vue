<script setup>
import NavBar from './components/NavBar.vue'
import Hero from './components/hero.vue'
import download from './components/download.vue'
import contact from './components/contact.vue'
import Footer from './components/footer.vue'
</script>

<template>
  <NavBar />
  <Hero 
    title="Welcome to Engineerium" 
    subtitle="A student-led magazine exploring tech, science, and campus life" 
    backgroundColor="bg-blue-900"
    :showScrollIndicator="true"
  />
  <download />
  <contact />
  <Footer />
</template>