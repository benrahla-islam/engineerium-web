<script setup>
import Hero from '@/components/hero.vue'
import download from '@/components/download.vue'
import contact from '@/components/contact.vue'
import Footer from '@/components/footer.vue'
</script>

<template>
  <Hero 
    title="Welcome to Engineerium" 
    subtitle="A student-led magazine exploring tech, science, and culture.      Led by students, for students." 
    backgroundColor="bg-blue-900"
    :showScrollIndicator="true"
  />
  <download />
  <contact />
  <Footer />

</template>