import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Custom plugins
import FontAwesomeIcon from './plugins/fontAwesome'

const app = createApp(App)
app.component('FaIcon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Logic for detecting saved game
const saveFile = false

if (!saveFile) {
  router.push('/welcome')
} else {
  router.push('/')
}
