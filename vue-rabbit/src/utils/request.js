import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'
import router from '@/router'
import 'element-plus/theme-chalk/el-message.css'

const request = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 50000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  (error) => {
    // 统一错误处理
    const userStore = useUserStore()

    ElMessage.error(error.response.data.message || '服务异常')
    // 401 token失效处理
    if (error.response.status === 401) {
      userStore.clearUserInfo()
      ElMessage.error('登录失效，请重新登录')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default request
