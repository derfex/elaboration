import './styles.sass'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './app/App.vue'
import vuetify from './integrator/plugins/vuetify'
import router from './integrator/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#root')
