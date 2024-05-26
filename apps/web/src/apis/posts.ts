import { request } from '@/utils/request'
import { User } from './auth'

interface CreatePost {
  content: string
}

export const fetchPostsByUserId = async (userId: string) => {
  const res = await request.get(`/users/${userId}/posts`)
  return res.data
}

export const createPost = async (data: CreatePost) => {
  await request.post('/posts', data)
}

export interface Like {
  id: string
  user: User
  post: Post
  createdAt: string
}

export interface Post {
  id: string
  content: string
  user: User
  createdAt: string
  media: string[]
  updatedAt: string
  likes: Like[]
}

export const fetchPosts = async () => {
  const res = await request.get('/posts')
  return res.data
}
