require('./bootstrap')
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vfmPlugin } from 'vue-final-modal'
import Main from './views/Main'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(Main)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(vfmPlugin)
app.mount('#app')

app.config.globalProperties.axios = axios