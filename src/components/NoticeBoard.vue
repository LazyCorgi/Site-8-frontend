<template>
  <v-card class="notice-board pa-4" elevation="2">
    <div class="header">
      <span class="title">📢 公告栏</span>
      <v-btn variant="text" @click="goToMore" class="more-btn">查看更多</v-btn>
    </div>

    <!-- ✅ 动态类名控制渐隐 -->
    <div ref="scrollContainer" :class="['notice-content', { 'masked-scroll': isOverflowing }]">
      <div class="masonry">
        <MarkdownCard v-for="(notice, index) in notices" :key="index" :content="notice" />
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import MarkdownCard from './MarkdownCard.vue'

const router = useRouter()
const goToMore = () => router.push('/notices')

const notices = [
  `## 欢迎使用 Site-8\n\nSite-8 是一个基于 Vue3 + Vuetify3 + Vite 的前端开发框架，目前已经支持了大约 30+ 个组件，欢迎大家的使用。`,
  `## 🎉 Site-8 v0.0.1 发布\n\nSite-8 v0.0.1 发布了，欢迎大家的使用。`,
  `## 🎉 Site-8 v0.0.2 发布\n\nSite-8 v0.0.2 发布了，欢迎大家的使用。`,
  `## 公告 1\n\n短内容。`,
  `## 公告 2\n\n这是一个很长的公告内容。\n\n- 多行\n- 图片\n\n![图](https://shared.cdn.queniuqe.com/store_item_assets/steam/apps/2953480/header.jpg)`,
  `## 公告 3\n\n[点击这里](https://example.com)\n\n更多内容`,
  `## 公告 4\n\n简要提醒。`,
  `## 公告 5\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.`,
]

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
