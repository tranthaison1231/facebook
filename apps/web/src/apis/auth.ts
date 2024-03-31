import { request } from '@/utils/request'

interface SignUp {
  firstname: string
  lastname: string
  email: string
  password: string
  day: number
  month: number
  year: number
  gender: string
}
export interface User {
  lastname: string
  firstname: string
  id: string
  fullName: string
  avatar: string
  school: string
  address: string
  workAt: string
}


interface SignInData {
  email: string;
  password: string;
}

export const signIn = async (data: SignInData) => {
  const res = await request.post('/sign-in', data);
  return res.data;
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



