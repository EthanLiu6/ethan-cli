<template>
  <div class="h-screen w-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-8">系统登录</h2>
      <a-form :model="formState" layout="vertical" @finish="onFinish">
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
          <a-input v-model:value="formState.username" placeholder="admin" />
        </a-form-item>
        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value="formState.password" placeholder="123456" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block :loading="loading">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const loading = ref(false)
const formState = reactive({
  username: '',
  password: ''
})

const onFinish = values => {
  loading.value = true
  // 模拟登录
  setTimeout(() => {
    loading.value = false
    if (values.username === 'admin' && values.password === '123456') {
      localStorage.setItem('token', 'mock-token')
      message.success('登录成功')
      router.push('/')
    } else {
      message.error('用户名或密码错误')
    }
  }, 1000)
}
</script>
