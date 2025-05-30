<script setup>
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { useAppStores } from '@/composables/useAppStores'

const { hasErrors, allErrors, clearAllErrors } = useAppStores()

const errorCount = computed(() => allErrors.value.length)
</script>

<template>
  <!-- Global Error Handler -->
  <Transition name="error-alert">
    <div 
      v-if="hasErrors" 
      class="fixed top-4 right-4 z-50 max-w-md bg-red-50 border border-red-200 rounded-lg shadow-lg"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <FontAwesomeIcon 
              :icon="faExclamationTriangle" 
              class="h-5 w-5 text-red-400" 
            />
          </div>
          <div class="ml-3 flex-1">
            <h3 class="text-sm font-medium text-red-800">
              {{ errorCount === 1 ? 'Error occurred' : `${errorCount} errors occurred` }}
            </h3>
            <div class="mt-2 text-sm text-red-700">
              <ul class="list-disc list-inside space-y-1">
                <li v-for="error in allErrors" :key="error.type">
                  <span class="font-medium capitalize">{{ error.type }}:</span> {{ error.message }}
                </li>
              </ul>
            </div>
            <div class="mt-3">
              <button
                @click="clearAllErrors"
                class="text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 transition-colors"
              >
                Dismiss All
              </button>
            </div>
          </div>
          <div class="ml-4 flex-shrink-0">
            <button
              @click="clearAllErrors"
              class="inline-flex text-red-400 hover:text-red-600 focus:outline-none"
            >
              <FontAwesomeIcon :icon="faTimes" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.error-alert-enter-active {
  transition: all 0.3s ease-out;
}

.error-alert-leave-active {
  transition: all 0.3s ease-in;
}

.error-alert-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.error-alert-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>