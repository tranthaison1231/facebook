import { request } from '@/utils/request'

interface SignUp {
  email: string
  password: string
}
export interface User {
  id: string
  fullName: string
  avatar: string
  school: string
  address: string
  workAt: string
}
interface UpdateMe {
  fullName?: string
  age?: number
  avatar?: string
  phone?: number
}

export const signIn = async ({ email, password }: SignUp) => {
  const res = await request.post('/sign-in', {
    email,
    password
  })
  return res.data
}

export const signUp = async ({ email, password }: SignUp) => {
  const res = await request.post('/sign-up', {
    email,
    password
  })
  return res.data
}

export const forgotPassword = async ({ email }: { email: string }) => {
  const res = await request.post('/forgot-password', {
    email
  })
  return res.data
}

export const getMe = async () => {
  const res = await request.get('/users/me')
  return res.data
}

export const resetPassword = async (token: string, password: string) => {
  const res = await request.post(
    '/reset-password',
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return res.data
}

export const getUser = async (id: string) => {
  const res = await request.get(`/users/${id}`)
  return res.data
}
export const updateMe = async ({ fullName, age, avatar, phone }: UpdateMe) => {
  return request.put('/users/me', {
    fullName,
    age,
    avatar,
    phone
  })
}

