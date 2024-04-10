import { request } from '@/utils/request'

export interface Post {
  id: string
}

export const fetchPostsByUserId = async (userId: string): Promise<Post[]> => {
  const res = await request.get(`/users/${userId}/posts`)
  return res.data
}
