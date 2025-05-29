<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from 'vue-router';

defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <nav class="flex items-center space-x-2 text-sm text-neutral-600 mb-6">
    <template v-for="(item, index) in items" :key="index">
      <RouterLink 
        v-if="item.to"
        :to="item.to"
        class="hover:text-green-700 transition duration-300"
      >
        {{ item.name }}
      </RouterLink>
      <span v-else class="text-neutral-800 font-medium">{{ item.name }}</span>
      
      <FontAwesomeIcon 
        v-if="index < items.length - 1"
        :icon="faChevronRight" 
        class="text-neutral-400" 
      />
    </template>
  </nav>
</template>