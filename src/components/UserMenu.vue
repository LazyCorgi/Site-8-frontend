<template>
  <v-menu location="bottom end" open-on-hover>
    <template #activator="{ props }">
      <div class="d-flex align-center mr-4 cursor-pointer user-box" v-bind="props">
        <!-- 用户头像（默认头像或上传） -->
        <v-avatar size="40">
          <v-img :src="defaultAvatar" alt="用户头像" cover />
        </v-avatar>

        <!-- 用户名 -->
        <span class="ml-2 text-body-2 text-truncate" style="max-width: 100px">
          {{ user.username }}
        </span>
      </div>
    </template>

    <!-- 下拉菜单 -->
    <v-list>
      <v-list-item @click="goToSettings">
        <v-list-item-title>用户设置</v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-title>登出</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/api'

const user = ref({ username: '', role: '' })
const router = useRouter()
const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

onMounted(async () => {
  try {
    const res = await api.get('/userinfo')
    user.value = res.data
    console.log(user.value)
  } catch (err) {
    console.error('获取用户信息失败', err)
  }
})

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}

function goToSettings() {
  router.push('/settings')
}
</script>

<style scoped>
.user-box {
  max-width: 160px;
  overflow: hidden;
}
</style>
