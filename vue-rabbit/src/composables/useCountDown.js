// 封装倒计时逻辑函数
import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  // 1. 响应式变量
  const time = ref(0)
  let timer = null
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  // 2. 倒计时逻辑函数
  const start = (currentTime) => {
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}
