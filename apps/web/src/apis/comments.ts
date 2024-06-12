import { request } from '@/utils/request'
import { User } from './auth'

interface AddCommentInput {
  content: string
}

export const addComment = async (postId: string, { content }: AddCommentInput) => {
  await request.post(`posts/${postId}/comments`, { content })
}

export interface Comment {
  id: string
  content: string
  user: User
  createdAt: string
}

export const getComments = async (postId: string) => {
  const res = await request.get(`posts/${postId}/comments`)
  return res.data.data
}
