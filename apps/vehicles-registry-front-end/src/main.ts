import './styles.sass'

import { createApp } from 'vue'
import App from './app/App.vue'

import vuetify from './integrator/plugins/vuetify'

const app = createApp(App)

app.use(vuetify)

app.mount('#root')
