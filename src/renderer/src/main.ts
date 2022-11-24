import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import './style.css'

const app = createApp(App)
// const pinia = createPinia
app.use(createPinia())
app.mount('#app')
