import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])
    // 定义添加购物车的action
    const addCart = async (goods) => {
      const { skuId, count } = goods
      if (isLogin.value) {
        // 登录状态下，将商品添加到购物车
        await insertCartAPI({ skuId, count })
        updateNewList()
      } else {
        // 未登录状态下，将商品添加到本地存储
        // 已添加 count + 1
        // 未添加 新增商品push
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          // 已添加
          item.count++
        } else {
          // 未添加
          cartList.value.push(goods)
        }
      }
    }
    // 删除购物车
    const delCart = async (skuId) => {
      if (isLogin.value) {
        // 调用接口实现接口购物车中的删除功能
        await delCartAPI([skuId])
        updateNewList()
      } else {
        // 思路：
        // 1. 找到要删除项的下标值 - splice
        // 2. 使用数组的过滤方法 - filter
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
      }
    }

    // 清空购物车
    const clearCart = () => {
      cartList.value = []
    }

    // 获取最新购物车列表action
    const updateNewList = async () => {
      const res = await findNewCartListAPI()
      cartList.value = res.data.result
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuID找到要修改的那一项，然后把它的selected
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    // 全选
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }

    // 购物车总数
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    )
    // 购物车总价
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    )
    // 已选择商品的数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    )
    // 已选择商品的总价
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    )
    return {
      cartList,
      addCart,
      delCart,
      singleCheck,
      allCount,
      allPrice,
      isAll,
      allCheck,
      selectedCount,
      selectedPrice,
      clearCart,
      updateNewList
    }
  },
  {
    persist: true
  }
)
