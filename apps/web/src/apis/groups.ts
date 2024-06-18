import { request } from '@/utils/request'

enum roles {
  ADIMN,
  MOD,
  MEMBER
}
export interface rolesOnGroup {
  groupId: string
  userId: string
  role: roles
}
export interface Group {
  userId: string
  name: string
  type: string
}

export const getGroups = async () => {
  const res = await request.get(`/groups`)
  return res.data
}

export const createGroup = async (data: Group) => {
  await request.post(`/groups`, data)
}
