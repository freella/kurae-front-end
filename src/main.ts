import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vuetify } from './plugins/vuetify'

import App from './App.vue'
import router from './router'
import { useErrorStore } from '@/store/error.store'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(vuetify)
app.use(router)

app.config.errorHandler = (error, instance, info) => {
  const errorStore = useErrorStore()

  console.error('Global error captured:', error)
  console.error('Component instance:', instance)
  console.error('Error info:', info)

  errorStore.setError(error)
}

app.mount('#app')