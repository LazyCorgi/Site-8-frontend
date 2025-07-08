<template>
  <v-card class="pa-4">
    <div v-html="html" class="markdown-body" />
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps<{ content: string }>()

const html = computed(() => marked(props.content))
</script>

<style scoped>
.markdown-body {
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;
}

:deep(.markdown-body img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 8px 0;
}
</style>
