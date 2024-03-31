import { signIn } from '@/apis/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/utils/schema'
import { getToken, setToken } from '@/utils/token'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {  Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'
import FaceBookLogo from '@/assets/images/facebook-logo.png'
import Signup from './(auth)/_components/Signup'

export type LoginInputs = z.infer<typeof loginSchema>

export default function Component() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputs>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema)
  })

  const accessToken = getToken()

  if (accessToken) return <Navigate to="/" />

  const onSubmit = async (data: LoginInputs) => {
    try {
      setIsLoading(true)
      const res = await signIn(data)
      setToken(res.accessToken)
      navigate('/')
      toast.success('Login successfully!')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="m-auto flex items-center justify-center space-y-3 lg:p-32">
      <div className="container flex flex-col items-center space-y-10 md:flex-row md:justify-between">
        <div className=" flex flex-col items-center space-y-3 ">
          <h1 className="text-center text-4xl font-bold text-primary">Facebook</h1>
          <p className=" text-5xl">Recent Logins</p>
          <div className=" w-48">
            <img src={`${FaceBookLogo}`} alt="FaceBook Logo" />
          </div>
        </div>
        <div className="w-2/6">
          <div className=" rounded-xl shadow-[4px_25px_42px_17px_rgba(0,0,0,0.27)] mb-12">
            <form className="space-y-3 p-4" onSubmit={handleSubmit(onSubmit)}>
              <Input className="px-3 py-4" {...register('email')} placeholder="Email" type="email" />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              <Input className="px-3 py-4" {...register('password')} placeholder="Password" type="password" />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              <Button className="w-full text-white font-bold text-2xl py-7" size="lg" type="submit" loading={isLoading}>
                Đăng nhập
              </Button>
            </form>
            <div className="space-y-4 pb-4 px-4 flex flex-col justify-center items-center">
              <p className="cursor-pointer text-sm text-primary text-center">Quên mật khẩu</p>
              <div className='w-full h-[1px] bg-[#E6E8EA] rounded-full'></div>
              <Signup />
            </div>
          </div>
          <p className='text-center font-primary'><span className='font-bold'>Tạo Trang</span> dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.</p>
        </div>
      </div>
    </div>
  )
}
