<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">个人设置</h2>
    <div class="mb-4">
      <label class="block mb-1">用户名</label>
      <input type="text" v-model="form.username" class="border p-2 w-full" />
    </div>
    <!-- 其他设置项 -->
    <v-btn color="primary" @click="saveSettings">保存</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/utils/api'

const form = ref({
  username: '',
  // 其他字段
})

async function saveSettings() {
  await api.post('/api/user/update', form.value)
  alert('保存成功')
}
</script>
