import request from '@/utils/request'

export const getOrderAPI = (id) => {
  return request.get(`/member/order/${id}`)
}
