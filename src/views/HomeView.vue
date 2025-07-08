<!-- src/App.vue -->
<template>
  <v-app>
    <h1 class="text-center">Site-8</h1>
    <notice-board />
  </v-app>
</template>

<script setup lang="ts">
import NoticeBoard from '@/components/NoticeBoard.vue';
</script>

<style scoped>
p {
  margin: 0.5rem 0;
}
</style>
