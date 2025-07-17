<template>
  <v-container class="py-8">
    <h2 class="text-h5 mb-6">📜 公告历史</h2>

    <v-card v-for="(notice, index) in notices" :key="index" class="mb-4 px-4 py-2 notice-card" elevation="2">
      <div class="notice-markdown masked-scroll" v-html=notice.content />
    </v-card>

    <!-- 分页器（可后续完善） -->
    <!-- <v-pagination v-model="page" :length="pageCount" /> -->
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { marked } from 'marked'
import api from '@/utils/api'

type Notice = {
  title: string;
  content: string;
  author: string;
  created_at: string;
}
const notices = ref<Notice[]>([])
onMounted(async () => {
  try {
    const res = await api.get('/notices')
    notices.value = res.data.map((n: Notice) => ({
      content: marked(`# ${n.title}\n\n${n.content}`),
      author: n.author,
      created_at: n.created_at
    }))
  } catch (err) {
    console.error(err)
  }
})

</script>

<style scoped>
.notice-card {
  max-height: 200px;
  overflow: hidden;
  position: relative;
}

.notice-markdown {
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;
}

:deep(.notice-markdown img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 8px 0;
}

/* ✅ 始终带渐隐遮罩，用于长公告 */
.masked-scroll {
  mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
}
</style>
