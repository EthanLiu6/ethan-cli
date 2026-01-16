<template>
  <div class="max-w-2xl mx-auto">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="基本信息">
        <a-form :model="formState" layout="vertical" class="mt-4">
          <a-form-item label="用户名">
            <a-input v-model:value="formState.username" />
          </a-form-item>
          <a-form-item label="电子邮箱">
            <a-input v-model:value="formState.email" />
          </a-form-item>
          <a-form-item label="个人简介">
            <a-textarea v-model:value="formState.bio" :rows="4" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSave">保存修改</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="账号安全">
        <a-list item-layout="horizontal">
          <a-list-item>
            <a-list-item-meta title="账户密码" description="当前密码强度：强">
            </a-list-item-meta>
            <template #actions>
              <a key="edit">修改</a>
            </template>
          </a-list-item>
          <a-list-item>
            <a-list-item-meta title="密保手机" description="已绑定手机：138****8888">
            </a-list-item-meta>
            <template #actions>
              <a key="edit">修改</a>
            </template>
          </a-list-item>
        </a-list>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'

const activeKey = ref('1')
const formState = reactive({
  username: 'Ethan Liu',
  email: 'ethan@example.com',
  bio: '全栈工程师，喜欢探索新技术。',
})

const handleSave = () => {
  message.success('保存成功！')
}
</script>
