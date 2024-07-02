import { request } from '@/utils/request'

export const getFriends = async () => {
  const res = await request.get('/friends')
  return res.data
}
