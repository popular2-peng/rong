// 封装轮播图数据业务相关的逻辑
import { ref, onMounted } from 'vue'
import { getBannerAPI } from '@/apis/home'

export const useBanner = () => {
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2'
    })
    bannerList.value = res.data.result
  }
  onMounted(() => getBanner())
  return {
    bannerList
  }
}
