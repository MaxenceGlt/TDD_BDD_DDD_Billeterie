import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
app.config.globalProperties.$apiURL = "http://localhost:8080"
app.config.globalProperties.$accessTokenKey = "accessTokenKey"
