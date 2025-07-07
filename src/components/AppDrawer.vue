<template>
  <v-navigation-drawer :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" permanent
    width="300">
    <v-card-title class="pa-4">你好，</v-card-title>
    <v-divider />

    <v-list nav dense>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to" router active-class="primary--text">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-spacer />
    <div class="pa-4" style="position: absolute; bottom: 0;">
      <v-switch v-model="isDark" inset label="暗黑模式" color="primary"></v-switch>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'
const { modelValue } = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const items = [
  { title: '首页', to: '/' },
  { title: '关于我们', to: '/about' },
]
const theme = useTheme()
const isDark = ref(theme.global.name.value === 'dark')
watch(isDark, val => {
  theme.global.name.value = val ? 'dark' : 'light'
})
</script>
