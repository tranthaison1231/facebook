import { request } from '@/utils/request'

export interface Page {
  id: string
  name: string
  avatar: string
  background: string
}

export const getPages = async () => {
  const res = await request.get(`/pages`)
  return res.data
}
