import request from '@/utils/request'

export const LoginAPI = ({ account, password }) => {
  return request.post('/login', { account, password })
}

export const getLikeListAPI = ({ limit = 4 }) => {
  return request.get('/goods/relevant', { params: { limit } })
}
