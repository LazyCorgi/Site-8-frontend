import { defineStore } from 'pinia'
import { th, tr } from 'vuetify/locale'

export const useUserSettings = defineStore('userSettings', {
  state: () => ({
    theme: localStorage.getItem('theme') || 'auto', // 'light' | 'dark' | 'auto'
    drawerOpen: localStorage.getItem('drawerOpen') || 'open',
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || '',
  }),
  actions: {
    setTheme(mode: 'light' | 'dark' | 'auto') {
      this.theme = mode
      localStorage.setItem('theme', mode)
    },
    setDrawerOpen(open: boolean) {
      this.drawerOpen = open ? 'open' : 'close'
      localStorage.setItem('drawerOpen', this.drawerOpen)
    },
    setToken(token: string, username = '') {
      this.token = token
      this.username = username
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
    },
    logout() {
      this.token = ''
      this.username = ''
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
})
