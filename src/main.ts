import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import 'vue-global-api'
import router from '@/router'
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')
