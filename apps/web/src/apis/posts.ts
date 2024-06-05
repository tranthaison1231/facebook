import { request } from '@/utils/request'
import { User } from './auth'
import { Comment } from './comments'

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
  comments: Comment[]
}

export const fetchPosts = async ({ pageParam }: { pageParam: number }) => {
  const res = await request.get(`/posts?page=${pageParam}&limit=3`)
  return res.data.data.items
}
