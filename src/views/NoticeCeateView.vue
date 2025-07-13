<template>
  <v-container fluid class="pa-8">
    <h2 class="text-h5 mb-4">📝 编辑公告</h2>

    <v-row dense>
      <!-- 左侧编辑器 -->
      <v-col cols="12" md="6">
        <v-textarea v-model="title" auto-grow rows="1" class="editor" />
        <v-textarea v-model="markdown" label="Markdown 内容" auto-grow rows="20" class="editor" />
        <v-btn color="primary" @click="submit">发布公告</v-btn>
      </v-col>

      <!-- 右侧预览 -->
      <v-col cols="12" md="6">
        <v-card class="preview pa-4">
          <div class="markdown-body" v-html="html" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'
import axios from 'axios'
import '@/assets/markdown.css'
const title = ref('标题')
const markdown = ref(`请在此输入 Markdown 内容...`)
const html = computed(() => marked("# " + title.value + "\n\n" + markdown.value))

const submit = async () => {
  try {
    await axios.post('/api/notices', {
      title: title.value,
      content: markdown.value
    })
    alert('发布成功！')
  } catch (err) {
    console.error(err)
    alert('发布失败\n' + err)
  }
}
</script>
