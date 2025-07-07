<template>
  <v-app>
    <AppDrawer v-model="drawer" />
    <AppTopbar v-model:drawer="drawer" />
    <v-main>

      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppDrawer from './components/AppDrawer.vue'
import AppTopbar from './components/AppTopbar.vue'
import { ref } from 'vue'


const drawer = ref(true)
</script>
