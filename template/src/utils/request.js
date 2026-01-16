import axios from 'axios'
import { message, notification } from 'ant-design-vue'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      message.error(res.message || 'Error')
      if (res.code === 401) {
        // 登录过期处理
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res.data
  },
  (error) => {
    const { response } = error
    if (response) {
      notification.error({
        message: `Error ${response.status}`,
        description: response.data?.message || response.statusText
      })
    } else {
      message.error('网络连接异常')
    }
    return Promise.reject(error)
  }
)

export default request
