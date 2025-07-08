<template>
  <v-container class="py-8">
    <h2 class="text-h5 mb-6">📜 公告历史</h2>

    <v-card v-for="(notice, index) in pagedNotices" :key="index" class="mb-4 px-4 py-2 notice-card" elevation="2">
      <div class="notice-markdown masked-scroll" v-html="rendered[index]" />
    </v-card>

    <!-- 分页器（可后续完善） -->
    <!-- <v-pagination v-model="page" :length="pageCount" /> -->
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const notices = [
  `## 公告 A\n\n很长的内容... \n\n- 多行\n- 多图片\n\n![图](https://via.placeholder.com/400x250)`,
  `## 公告 B\n\n中等长度的内容`,
  `## 公告 C\n\n短内容`,
]

const rendered = computed(() => notices.map(text => marked(text)))

// 若支持分页可用下列逻辑
const pagedNotices = notices // computed(() => notices.slice(...))
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
