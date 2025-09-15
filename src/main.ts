import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import {themeConfig} from './themes/primeVue'


const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: themeConfig,
    },
})
app.mount('#app')
