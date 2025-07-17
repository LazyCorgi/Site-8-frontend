<template>
  <v-app>

    <AppDrawer v-if="isDefaultLayout" v-model="drawer" />
    <AppTopbar v-if="isDefaultLayout" v-model:drawer="drawer" />
    <v-main>
      <router-view name="default" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppDrawer from '@/components/AppDrawer.vue'
import AppTopbar from '@/components/AppTopbar.vue'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useUserSettings } from './stores/userSettings'

const settings = useUserSettings()
const drawer = ref(settings.drawerOpen === 'open' ? true : false)
const route = useRoute()
const isDefaultLayout = computed(() => {
  return route.meta.layout !== 'none'
})
</script>
