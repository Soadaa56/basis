import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { restoreGameState } from './utils/restoreGameState'

// Custom plugins
import FontAwesomeIcon from './plugins/fontAwesome'

// Custom CSS
// import '@/assets/reset.css'
import '@/assets/main.scss'

const app = createApp(App)
app.component('FaIcon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

// Restore gameState if found
const gameData = localStorage.getItem('gameData')
if (gameData) {
  const parsed = JSON.parse(gameData)
  restoreGameState(parsed.gameState)
}

app.mount('#app')
