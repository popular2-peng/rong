import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LoginAPI } from '@/apis/user'
import { mergCartAPI } from '@/apis/cart'
import { useCartStore } from '@/stores/cartStore'

export const useUserStore = defineStore(
  'user',
  () => {
    const cartStore = useCartStore()
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    // 2. 定义获取接口的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await LoginAPI({ account, password })
      userInfo.value = res.data.result
      // 合并购物车
      await mergCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            count: item.count,
            selected: item.selected
          }
        })
      )
      cartStore.updateNewList()
    }
    // 4. 退出时清空用户信息
    const clearUserInfo = () => {
      userInfo.value = {}
      cartStore.clearCart()
    }
    // 3. 以对象的格式把state和action函数暴露出去
    return {
      userInfo,
      clearUserInfo,
      getUserInfo
    }
  },
  {
    persist: true // 持久化存储
  }
)
