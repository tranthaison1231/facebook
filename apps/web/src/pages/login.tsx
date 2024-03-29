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

export type LoginInputs = z.infer<typeof loginSchema>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ShieldQuestion } from 'lucide-react'
import { InputDay } from './(auth)/_components/InputDay'
import { InputMonth } from './(auth)/_components/InputMonth'
import { InputYear } from './(auth)/_components/InputYear'

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
              <div className="">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-48 text-white bg-[#42B72A] rounded-sm py-6 text-lg text-center font-bold">Tạo tài khoản mới</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] p-4">
                    <DialogHeader>
                      <DialogTitle className='text-[#1c1e21] text-4xl font-bold'>Đăng Ký</DialogTitle>
                      <DialogDescription>
                        Nhanh chóng và dễ dàng.
                      </DialogDescription>
                    </DialogHeader>
                    <hr className='my-4'/>
                    <div className="grid grid-flow-row gap-3">
                      <div className="flex gap-4">
                        <Input className="px-3 py-4 bg-[#F5F6F7] rounded-[5px]" {...register('email')} placeholder="Họ" type="firstname" />
                        <Input className="px-3 py-4 bg-[#F5F6F7] rounded-[5px]" {...register('email')} placeholder="Tên" type="firstname" />
                      </div>
                      <Input className="px-3 py-4 bg-[#F5F6F7] rounded-[5px]" {...register('email')} placeholder="Số di động hoặc email" type="email" />
                      {/* {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>} */}
                      <Input className="px-3 py-4 bg-[#F5F6F7] rounded-[5px]" {...register('email')} placeholder="Mật khẩu mới" type="password" />
                      {/* {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>} */}
                      <div className="flex items-center">
                        <p className='text-sm text-[#828697]'>Ngày sinh</p>
                        <ShieldQuestion className='w-3 h-3 '/>
                      </div>
                      <div className="grid grid-flow-col gap-2">
                        <InputDay className='rounded-[5px]'/>
                        <InputMonth className='rounded-[5px]'/>
                        <InputYear className='rounded-[5px]'/>
                      </div>
                      <div className="flex items-center">
                        <p className='text-sm text-[#828697]'>Giới tính</p>
                        <ShieldQuestion className='w-3 h-3 '/>
                      </div>
                      <div className="grid grid-flow-col gap-5">
                        <div className="flex justify-center items-center gap-8 border border-gray-300 rounded-[5px] p-2">
                          <p>Nữ</p>
                          <Input type='checkbox' className='w-3 h-3' id='Nữ'/>
                        </div>
                        <div className="flex justify-center items-center gap-8 border border-gray-300 rounded-[5px] p-2">
                          <p>Nam</p>
                          <Input type='checkbox' className='w-3 h-3' id='Nam'/>
                        </div>
                        <div className="flex justify-center items-center gap-8 border border-gray-300 rounded-[5px] p-2">
                          <p>Tùy chỉnh</p>
                          <Input type='checkbox' className='w-3 h-3' id='Tùy chỉnh'/>
                        </div>
                      </div>
                      <p className='text-sm text-[#828697]'>Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Facebook. <span className='text-primary'>Tìm hiểu thêm.</span></p>
                      <p className='text-sm text-[#828697] pb-7'>Bằng cách nhấp vào Đăng ký, bạn đồng ý với <span className='text-primary'>Điều khoản</span>, <span className='text-primary'>Chính sách quyền riêng tư</span> và <span className='text-primary'>Chính sách cookie</span> của chúng tôi. Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.</p>
                    </div>
                    <div className='flex justify-center items-center'>
                      <Button type="submit" className='py-5 px-20 text-xl bg-[#00A400] text-white'>Đăng ký</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <p className='text-center font-primary'><span className='font-bold'>Tạo Trang</span> dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.</p>
        </div>
      </div>
    </div>
  )
}
