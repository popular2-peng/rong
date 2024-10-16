import request from '@/utils/request'

// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
  return request.post('/member/cart', {
    skuId,
    count
  })
}

// 获取购物车列表
export const findNewCartListAPI = () => {
  return request.get('/member/cart')
}

// 删除购物车商品
export const delCartAPI = (ids) => {
  return request.delete('/member/cart', {
    data: {
      ids
    }
  })
}

// 合并购物车
export const mergCartAPI = (data) => {
  return request.post('/member/cart/merge', data)
}
