import request from '@/utils/request'

// 获取分类列表head数据
export const getCategoryAPI = () => {
  return request.get('/home/category/head')
}
