<template>
  <v-app>
    <AppDrawer v-model="drawer" />
    <AppTopbar v-model:drawer="drawer" />
    <v-main>
      <router-view name="default" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppDrawer from '@/components/AppDrawer.vue'
import AppTopbar from '@/components/AppTopbar.vue'
import { ref } from 'vue'
import { useUserSettings } from './stores/userSettings'

const settings = useUserSettings()
const drawer = ref(settings.drawerOpen === 'open' ? true : false)
</script>
