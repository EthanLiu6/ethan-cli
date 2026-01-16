import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login/index.vue'),
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../pages/home/index.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../pages/dashboard/index.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../pages/profile/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/exception/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
