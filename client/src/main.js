import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/bootstrap/js/bootstrap.min.js'
import './assets/bootstrap/css/bootstrap.min.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
