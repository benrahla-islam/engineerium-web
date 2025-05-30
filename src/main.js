import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Import Font Awesome core
import { library } from '@fortawesome/fontawesome-svg-core'
// Import Font Awesome icons
import { 
  faLock, 
  faMicrochip, 
  faFlask, 
  faUserGraduate, 
  faAngleDown,
  faDownload,
  faFileAlt,
  faCalendar,
  faClock,
  faTag,
  faArrowRight,
  faArrowLeft,
  faEnvelope,
  faChevronRight,
  faBars,
  faXmark,
  faSearch,
  faTimes,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
// Import Font Awesome component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Import router
import router from './router'


// Add icons to the library
library.add(
  faLock, 
  faMicrochip, 
  faFlask, 
  faUserGraduate, 
  faAngleDown,
  faDownload,
  faFileAlt,
  faCalendar,
  faClock,
  faTag,
  faArrowRight,
  faArrowLeft,
  faEnvelope,
  faChevronRight,
  faBars,
  faXmark,
  faSearch,
  faTimes,
  faExclamationTriangle
)

// Create Pinia instance
const pinia = createPinia()

// Create app
const app = createApp(App)

// Register FontAwesomeIcon component globally
app.component('FontAwesomeIcon', FontAwesomeIcon)
// Use Pinia
app.use(pinia)
// Use router
app.use(router)

// Mount app
app.mount('#app')
