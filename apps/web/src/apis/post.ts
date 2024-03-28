import { request } from '@/utils/request'
interface CreatePost {
    content : String
}

export const createPost = async (data: CreatePost) => {
    await request.post('/posts', data)
}
