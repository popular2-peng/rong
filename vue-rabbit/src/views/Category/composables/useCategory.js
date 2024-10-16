// 封装分类数据业务相关的逻辑

import { onMounted, ref, watch } from 'vue'
import { getCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'

export const useCategory = () => {
  const route = useRoute()
  const categoryData = ref([])
  const getCategory = async () => {
    const res = await getCategoryAPI(route.params.id)
    categoryData.value = res.data.result
  }

  // 目标：路由参数变化的时候，可以把分类数据接口重新请求
  // onBeforeRouteUpdate((to) => {
  //   getCategory(to.params.id)
  // })
  // 监听路由参数变化
  watch(
    () => route.params.id,
    async (id) => {
      getCategory(id)
    }
  )
  onMounted(() => getCategory())
  return {
    categoryData
  }
}
