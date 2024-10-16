import request from '@/utils/request'

export const getCheckInfoAPI = () => {
  return request.get('/member/order/pre')
}

// 创建订单
export const createOrderAPI = (data) => {
  return request.post('/member/order', data)
}
