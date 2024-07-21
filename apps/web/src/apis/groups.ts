import { request } from '@/utils/request'
import { z } from 'zod'

enum roles {
  ADIMN,
  MOD,
  MEMBER
}
export interface RolesOnGroup {
  groupId: string
  userId: string
  role: roles
}
export interface Group {
  userId: string
  name: string
  type: string
}

export const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
  ownerId: z.string(),
  createdAt: z.string(),
  type: z.string(),
  background: z.string()
})

export const groupExtentSchema = groupSchema.extend({
  totalMember: z.number(),
  isJoined: z.boolean()
})

export const getGroups = async () => {
  const res = await request.get(`/groups`)
  return res.data
}

export const getGroup = async (groupId: string) => {
  const res = await request.get(`/groups/${groupId}`)
  return groupExtentSchema.parse(res.data.data)
}

export const createGroup = async (data: Group) => {
  await request.post(`/groups`, data)
}
