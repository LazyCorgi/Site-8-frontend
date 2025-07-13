<template>
  <v-app-bar app color="primary" dark height="40">
    <v-app-bar-nav-icon @click="
      $emit('update:drawer', !drawer); userSettings.setDrawerOpen(!drawer)" />

    <v-tabs class="px-4" show-arrows>
      <v-tab to="/" style="min-width: 100px">首页</v-tab>
      <v-tab to="/notices" style="min-width: 100px">公告</v-tab>
      <v-tab to="/about" style="min-width: 100px">关于</v-tab>
    </v-tabs>

  </v-app-bar>
</template>

<script setup lang="ts">
import { useUserSettings } from '@/stores/userSettings';
const userSettings = useUserSettings()

defineProps<{ drawer: boolean }>()
defineEmits(['update:drawer'])

</script>
