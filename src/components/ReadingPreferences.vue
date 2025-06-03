<script setup>
import { computed } from 'vue'
import { useReadingStore } from '@/stores'

const readingStore = useReadingStore()

const preferences = computed(() => readingStore.readingPreferences)

const fontSizeOptions = [
  { value: 'small', label: 'Small', class: 'text-sm' },
  { value: 'medium', label: 'Medium', class: 'text-base' },
  { value: 'large', label: 'Large', class: 'text-lg' },
  { value: 'xlarge', label: 'X-Large', class: 'text-xl' }
]

const lineSpacingOptions = [
  { value: 'compact', label: 'Compact', class: 'leading-tight' },
  { value: 'normal', label: 'Normal', class: 'leading-normal' },
  { value: 'relaxed', label: 'Relaxed', class: 'leading-relaxed' }
]

const readingWidthOptions = [
  { value: 'narrow', label: 'Narrow', class: 'max-w-2xl' },
  { value: 'standard', label: 'Standard', class: 'max-w-4xl' },
  { value: 'wide', label: 'Wide', class: 'max-w-6xl' }
]

const updatePreference = (key, value) => {
  readingStore.updatePreferences({ [key]: value })
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 border min-w-80">
    <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <!-- Text Height Icon -->
      <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
      </svg>
      Reading Preferences
    </h3>
    
    <!-- Font Size -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        <!-- Font Size Icon -->
        <svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>
        Font Size
      </label>
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="option in fontSizeOptions"
          :key="option.value"
          @click="updatePreference('fontSize', option.value)"
          class="px-3 py-2 rounded-lg border transition-all duration-200"
          :class="preferences.fontSize === option.value 
            ? 'bg-green-100 border-green-300 text-green-700' 
            : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-green-50'"
        >
          <span :class="option.class">{{ option.label }}</span>
        </button>
      </div>
    </div>
    
    <!-- Line Spacing -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        <!-- Line Spacing Icon -->
        <svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
        </svg>
        Line Spacing
      </label>
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="option in lineSpacingOptions"
          :key="option.value"
          @click="updatePreference('lineSpacing', option.value)"
          class="px-3 py-2 rounded-lg border transition-all duration-200"
          :class="preferences.lineSpacing === option.value 
            ? 'bg-green-100 border-green-300 text-green-700' 
            : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-green-50'"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
    
    <!-- Reading Width -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        <!-- Width Icon -->
        <svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18m-9 4v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"/>
        </svg>
        Reading Width
      </label>
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="option in readingWidthOptions"
          :key="option.value"
          @click="updatePreference('readingWidth', option.value)"
          class="px-3 py-2 rounded-lg border transition-all duration-200"
          :class="preferences.readingWidth === option.value 
            ? 'bg-green-100 border-green-300 text-green-700' 
            : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-green-50'"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>