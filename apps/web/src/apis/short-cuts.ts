import { request } from '@/utils/request'
import { z } from 'zod'
import { groupSchema } from './groups'

export const shortCutSchema = z.object({
  id: z.string(),
  groupId: z.string(),
  userId: z.string(),
  group: groupSchema
})

export type ShortCut = z.infer<typeof shortCutSchema>

export const fetchShortCuts = async () => {
  const res = await request.get(`/short-cuts`)
  return shortCutSchema.array().parse(res.data.data)
}
