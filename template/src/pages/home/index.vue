<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">欢迎使用 Vue3 + Vite + Ant Design Vue 模板</h1>
    <a-space>
      <a-button type="primary" @click="count++">计数器: {{ count }}</a-button>
      <a-button @click="testApi">测试接口</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const count = ref(0)

const testApi = () => {
  message.info('这里可以调用接口')
}
</script>
