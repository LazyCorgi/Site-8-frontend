<template>
  <v-card class="notice-board pa-4" elevation="2">
    <div class="header">
      <span class="title">📢 公告栏</span>
      <v-btn variant="text" @click="goToMore" class="more-btn">查看更多</v-btn>
    </div>

    <!-- ✅ 动态类名控制渐隐 -->
    <div ref="scrollContainer" :class="['notice-content', { 'masked-scroll': isOverflowing }]">
      <div class="masonry">
        <MarkdownCard v-for="(notice, index) in notices" :key="index" :content="notice.content" />
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import MarkdownCard from './MarkdownCard.vue'
import api from '@/utils/api'

const router = useRouter()
const goToMore = () => router.push('/notices')

type Notice = {
  title: string
  content: string
  author: string
  created_at: string
}
const notices = ref<Notice[]>([])
onMounted(async () => {
  try {
    const res = await api.get('/notices')
    notices.value = res.data.map((n: Notice) => ({
      content: `# ${n.title}\n\n${n.content}`,
      author: n.author,
      created_at: n.created_at
    }))
  } catch (err) {
    console.error(err)
  }
}
  // console.log(notices[0].html)
)

const scrollContainer = ref<HTMLElement>()
const isOverflowing = ref(false)

onMounted(() => {
  const el = scrollContainer.value
  if (el) {
    isOverflowing.value = el.scrollHeight > el.clientHeight
  }
})
</script>

<style scoped>
.notice-board {
  max-height: 500px;
  overflow: hidden;
  position: relative;
  width: 70%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.title {
  font-weight: bold;
  font-size: 1.2rem;
}

.more-btn {
  font-size: 0.9rem;
  text-transform: none;
  padding: 0 8px;
  min-width: auto;
}

.notice-content {
  overflow: hidden;
  position: relative;
  max-height: 400px;
}

/* ✅ 仅在 isOverflowing 为真时加上淡出效果 */
.masked-scroll {
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}

/* masonry 布局略同前文 */
.masonry {
  column-count: 1;
  column-gap: 16px;
}

@media (min-width: 600px) {
  .masonry {
    column-count: 2;
  }
}

@media (min-width: 960px) {
  .masonry {
    column-count: 3;
  }
}

.masonry>* {
  break-inside: avoid;
  margin-bottom: 16px;
}
</style>
