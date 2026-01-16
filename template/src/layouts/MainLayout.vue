<template>
  <a-layout class="min-h-screen">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo h-8 m-4 bg-gray-700 rounded flex items-center justify-center text-white font-bold overflow-hidden">
        {{ collapsed ? 'E' : 'Ethan CLI' }}
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="dashboard">
          <template #icon><dashboard-outlined /></template>
          <router-link to="/dashboard">仪表盘</router-link>
        </a-menu-item>
        <a-menu-item key="home">
          <template #icon><home-outlined /></template>
          <router-link to="/">主页</router-link>
        </a-menu-item>
        <a-menu-item key="profile">
          <template #icon><user-outlined /></template>
          <router-link to="/profile">个人中心</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="bg-white p-0 flex justify-between items-center px-6 shadow-sm">
        <div class="text-lg font-medium">{{ currentTitle }}</div>
        <a-dropdown>
          <a-space class="cursor-pointer">
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
            <span>Admin</span>
          </a-space>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="$router.push('/profile')">个人设置</a-menu-item>
              <a-menu-divider />
              <a-menu-item @click="handleLogout">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content class="m-6 p-6 bg-white rounded shadow-sm">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="text-center text-gray-400 pb-8">
        Ethan CLI ©2026 Created by Ethan Liu
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  DashboardOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'

const collapsed = ref(false)
const selectedKeys = ref(['dashboard'])
const route = useRoute()
const router = useRouter()

const currentTitle = computed(() => {
  const titles = {
    '/dashboard': '仪表盘',
    '/': '主页',
    '/profile': '个人中心',
  }
  return titles[route.path] || '页面'
})

const handleLogout = () => {
  router.push('/login')
}
</script>

<style scoped>
.logo {
  transition: all 0.2s;
}
</style>
