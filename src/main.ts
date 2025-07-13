import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { useUserSettings } from './stores/userSettings'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())

let prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const userSettings = useUserSettings()
if (userSettings.theme === 'dark') {
  prefersDark = true
} else if (userSettings.theme === 'light') {
  prefersDark = false
}
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: prefersDark ? 'dark' : 'light',
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
      dark: {
        colors: {
          primary: '#3913cebb',
          secondary: '##2516627b',
        },
      },
    },
  },
})
app.use(vuetify)
app.use(router)

app.mount('#app')
