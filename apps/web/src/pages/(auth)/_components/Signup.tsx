import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { signUp } from '@/apis/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/utils/schema';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader } from '@/components/ui/dialog';
import { ShieldQuestion } from 'lucide-react';
import { InputDay } from './InputDay';
import { InputMonth } from './InputMonth';
import { InputYear } from './InputYear';

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await signUp(data);
      toast.success('Sign-up successfully!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-48 text-white bg-[#42B72A] rounded-sm py-6 text-lg text-center font-bold">Tạo tài khoản mới</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-4">
        <DialogHeader>
          <DialogTitle className='text-[#1c1e21] text-3xl font-bold'>Đăng Ký</DialogTitle>
          <DialogDescription>
            Nhanh chóng và dễ dàng.
          </DialogDescription>
        </DialogHeader>
        <hr className='my-4'/>
        <div className="grid grid-flow-row gap-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <Input className="px-1 py-2 mb-3 bg-[#F5F6F7] rounded-[5px]" {...register('firstname')} placeholder="Họ" />
              <Input className="px-1 py-2 mb-3 bg-[#F5F6F7] rounded-[5px]" {...register('lastname')} placeholder="Tên" />
            </div>
            <Input className="px-1 py-2 mb-3 bg-[#F5F6F7] rounded-[5px]" {...register('email')} placeholder="Số di động hoặc email" />
            {/* {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>} */}
            <Input className="px-1 py-2 mb-3 bg-[#F5F6F7] rounded-[5px]" {...register('password')} placeholder="Mật khẩu mới" type="password" />
            {/* {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>} */}
            <div className="flex items-center">
              <p className='text-sm text-[#828697]'>Ngày sinh</p>
              <ShieldQuestion className='w-3 h-3 '/>
            </div>
            <div className="grid grid-flow-col gap-2">
              <InputDay className='rounded-[5px]' {...register('day')} />
              <InputMonth className='rounded-[5px]' {...register('month')} />
              <InputYear className='rounded-[5px]' {...register('year')} />
            </div>
            <div className="flex items-center">
              <p className='text-sm text-[#828697]'>Giới tính</p>
              <ShieldQuestion className='w-3 h-3 '/>
            </div>
            <div className="grid grid-flow-col gap-1">
              <div className="flex justify-center items-center gap-8 border border-gray-300 rounded-[5px] p-2">
                <p>Nữ</p>
                <Input type='checkbox' className='w-3 h-3' {...register('gender')} value="female" />
              </div>
              <div className="flex justify-center items-center gap-8 border border-gray-300 rounded-[5px] p-2">
                <p>Nam</p>
                <Input type='checkbox' className='w-3 h-3' {...register('gender')} value="male" />
              </div>
              <div className="flex justify-center items-center gap-8 border border-gray-300 rounded-[5px] p-2">
                <p>Tùy chỉnh</p>
                <Input type='checkbox' className='w-3 h-3' {...register('gender')} value="custom" />
              </div>
            </div>
            <p className='text-sm text-[#828697]'>Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Facebook. <span className='text-primary'>Tìm hiểu thêm.</span></p>
            <p className='text-sm text-[#828697] pb-7'>Bằng cách nhấp vào Đăng ký, bạn đồng ý với <span className='text-primary'>Điều khoản</span>, <span className='text-primary'>Chính sách quyền riêng tư</span> và <span className='text-primary'>Chính sách cookie</span> của chúng tôi. Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.</p>
            <div className='flex justify-center items-center'>
              <Button type="submit" loading={isLoading} className='py-5 px-20 text-xl bg-[#00A400] text-white'>Đăng ký</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
