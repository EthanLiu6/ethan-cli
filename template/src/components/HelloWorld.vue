<template>
  <div class="hello-world p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
    <h2 class="text-xl font-bold text-blue-600 mb-2">{{ title }}</h2>
    <p class="text-gray-600">这是一个由 Ethan CLI 自动生成的示例组件。</p>
    <div class="mt-4">
      <a-button type="primary" @click="count++">计数器: {{ count }}</a-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Hello Ethan CLI',
  },
})

const count = ref(0)
</script>

<style scoped>
.hello-world {
  max-width: 400px;
}
</style>
