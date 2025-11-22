import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Custom plugins
import FontAwesomeIcon from './plugins/fontAwesome'

// Custom CSS
// import '@/assets/reset.css'
import '@/assets/main.scss'

const app = createApp(App)
app.component('FaIcon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
