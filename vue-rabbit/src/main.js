import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPliginPersistedstate from 'pinia-plugin-persistedstate'

// 引入懒加载指令插件并注册
import { lazyPlugin } from '@/directives'
// 引入全局组件
import { componentPlugin } from '@/components'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPliginPersistedstate)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')
