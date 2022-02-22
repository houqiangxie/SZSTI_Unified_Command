import { createApp } from 'vue'
import App from './SystemApp.vue'
import 'virtual:windi.css'
import 'vue-global-api'
import router from '@/router/system'
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#system')
