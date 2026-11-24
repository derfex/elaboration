import './styles.sass'

import { createApp } from 'vue'
import router from '|integrator/router'
import App from './app/App.vue'

const app = createApp(App)
app.use(router)
app.mount('#root')
