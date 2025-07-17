<template>
  <v-container class="py-16" style="max-width: 400px">
    <h2 class="text-h5 mb-6">🔐 用户登录</h2>

    <v-text-field v-model="username" label="用户名" outlined dense />
    <v-text-field v-model="password" label="密码" type="password" outlined dense />

    <v-btn block color="primary" class="mt-4" @click="submit">登录</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import api from '@/utils/api'
import { useRouter } from 'vue-router'
import { useUserSettings } from '@/stores/userSettings'
const username = ref('')
const password = ref('')
const router = useRouter()
const settings = useUserSettings()
const submit = async () => {
  try {
    const res = await api.post('/login', { username: username.value, password: password.value })
    const { token, username: name } = res.data

    settings.setToken(token, name)

    alert('登录成功！')
    router.push('/') // 跳转首页或 dashboard
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      alert('登录失败：' + (err.response?.data?.message || '服务器错误'))
    } else if (err instanceof Error) {
      alert('登录失败：' + err.message)
    } else {
      alert('未知错误')
    }
  }
}
</script>
