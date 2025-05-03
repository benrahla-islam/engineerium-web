<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDownload, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';

// Define props for customization
const props = defineProps({
  title: {
    type: String,
    default: 'Download our latest issue',
  },
  description: {
    type: String,
    default: 'Explore the cutting-edge innovations and insights from RE2SD Engineering students. Our latest issue covers emerging technologies, research breakthroughs, and industry trends. This time in the AI field',
  },
  buttonText: {
    type: String,
    default: 'Download Now',
  },
  fileName: {
    type: String,
    default: 'Engineerium_May_2025.pdf',
  },
  fileSize: {
    type: String,
    default: '8.5 MB',
  },
  filePath: {
    type: String,
    default: '/pdfs/' // Default subfolder in public directory
  }
});

// Loading state
const isDownloading = ref(false);

// Function to handle file download
const handleDownload = async () => {
  try {
    isDownloading.value = true;
    
    const fullPath = `${props.filePath}${props.fileName}`;
    
    // Try to fetch the file to ensure it exists
    const response = await fetch(fullPath);
    
    if (!response.ok) {
      throw new Error(`File not found: ${fullPath}`);
    }
    
    // Get the file as blob
    const blob = await response.blob();
    
    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = props.fileName;
    document.body.appendChild(a);
    
    // Trigger download
    a.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download the file. Please try again later.');
  } finally {
    isDownloading.value = false;
  }
};
</script>

<template>
  <section class="py-16 px-6 bg-gray-50">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        <!-- Left side - Text content -->
        <div class="md:w-3/5">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-800 font-poppins mb-4">
            {{ title }}
          </h2>
          <p class="text-lg text-neutral-600 mb-6">
            {{ description }}
          </p>
          
          <!-- File information -->
          <div class="flex items-center text-sm text-neutral-500">
            <FontAwesomeIcon :icon="faFileAlt" class="mr-2" />
            <span>{{ fileName }} ({{ fileSize }})</span>
          </div>
        </div>
        
        <!-- Right side - Download button -->
        <div class="md:w-2/5 flex justify-center">
          <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <button 
              @click="handleDownload"
              class="w-full bg-green-700 hover:bg-green-800 text-white py-4 px-6 rounded-md font-medium flex items-center justify-center transition duration-300"
              :disabled="isDownloading"
            >
              <FontAwesomeIcon :icon="faDownload" class="mr-3 text-lg" />
              {{ isDownloading ? 'Downloading...' : buttonText }}
            </button>
            
            <div class="mt-4 text-center text-sm text-neutral-500">
              By downloading, you agree to our terms and conditions.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Add any component-specific styles here */
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>