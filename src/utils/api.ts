import axios from 'axios'
import { useUserSettings } from '@/stores/userSettings'
// 创建 axios 实例
const api = axios.create({
  baseURL: '/api', // 开发时由 Vite 代理，生产可换成实际地址
  timeout: 5000,
})

// 请求拦截器
api.interceptors.request.use((config) => {
  const settings = useUserSettings()
  if (settings.token) {
    config.headers.Authorization = `Bearer ${settings.token}`
    config.headers['X-Username'] = settings.username // 也可以自定义头部字段
  }
  return config
})

export default api
