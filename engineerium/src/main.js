import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Import Font Awesome core
import { library } from '@fortawesome/fontawesome-svg-core'
// Import Font Awesome icons
import { 
  faLock, 
  faMicrochip, 
  faFlask, 
  faUserGraduate, 
  faAngleDown 
} from '@fortawesome/free-solid-svg-icons'
// Import Font Awesome component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add icons to the library
library.add(faLock, faMicrochip, faFlask, faUserGraduate, faAngleDown)

// Create app
const app = createApp(App)

// Register FontAwesomeIcon component globally
app.component('FontAwesomeIcon', FontAwesomeIcon)

// Mount app
app.mount('#app')
