import request from '@/utils/request'

// 首页轮播图
export const getBannerAPI = (params = {}) => {
  // 默认为1 商品为2
  const { distributionSite = '1' } = params
  return request.get('/home/banner', {
    params: {
      distributionSite
    }
  })
}

// 新鲜好物
/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const getNewAPI = () => {
  return request.get('/home/new')
}

// 人气推荐
/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => request.get('home/hot', 'get', {})

// 商品分类
/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => request.get('/home/goods')
