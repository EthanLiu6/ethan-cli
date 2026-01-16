<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">主页</h1>
    <div class="mb-8">
      <HelloWorld title="欢迎使用 Ethan CLI" />
    </div>
    <a-card title="更多功能" style="max-width: 400px">
      <a-space direction="vertical" class="w-full">
        <a-button type="primary" block @click="testApi">测试消息提示</a-button>
        <a-button block @click="count++">本地计数: {{ count }}</a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import HelloWorld from '@/components/HelloWorld.vue'

const count = ref(0)

const testApi = () => {
  message.success('Ethan CLI 项目运行正常！')
}
</script>
