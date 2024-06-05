import { getMe } from '@/apis/auth'
import { Button } from '@/components/ui/button'
import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { Earth, SmartphoneCharging, X } from 'lucide-react'
import { Image } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {  Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

function item() {
  const { data: me } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe()
  })
  console.log(me)

  const [images, setImages] = useState<string[]>([]) // Use array of strings to store image URLs
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const newImageURL = URL.createObjectURL(file)
      setImages(prevImages => [...prevImages, newImageURL]) // Add new image URL to the array
      console.log('container here', file.name)
    } else {
      console.log('No files selected')
    }
  }
  const navigate = useNavigate()
  if (images.length > 0) console.log(images.length)

  // FORM
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'Username must be at least 2 characters.'
    }),
    price: z.coerce.number().min(1, { message: 'Price is required' })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0
    }
  })

  return (
    <div className=" -mt-20 flex">
      <section className="sticky left-0 top-0 h-screen w-[360px] shrink-0 bg-white p-4 shadow-md">
        {/* HEADER */}
        <div className="mb-2 mt-2 flex gap-x-3">
          <X
            size={5}
            className=" size-10 flex-shrink-0 rounded-full bg-[#0006] text-white"
            onClick={() => navigate('/marketplace')}
          />
          <Link to={'/'}>
            <img
              className=" size-10"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWmwYccpGN_2SFl5JJMSaCdmCGmLyaKEwEVw&s"
              alt=""
            />
          </Link>
        </div>
        <hr />
        <div className=" mb-7 flex h-10 w-full items-center justify-between">
          <div className=" w-2/3">
            <span className="text-xs font-light">Marketplace</span>
            <h1 className=" text-lg font-bold">Mặt hàng cần bán</h1>
          </div>
          <Button
            className=" h-9 w-1/3 text-nowrap rounded-[6px] bg-[#e4e6eb] px-4 text-sm font-semibold text-[#bcc0c4] "
            disabled
          >
            Lưu bản nháp
          </Button>
        </div>
        {/* BODY */}
        <div className=" custom-scrollbar h-[500px] w-full ">
          <div className="mb-3 flex gap-x-2">
            <div>
              <img src={me?.data.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
            </div>
            <div className="">
              <p className="text-sm font-semibold">{me?.data.firstName}</p>
              <div className="children:text-xs children:font-light flex items-center justify-center">
                <p className=" text-xs font-normal">Niêm yết lên Marketplace ·</p>
                <p className="flex   text-xs font-light">
                  <Earth className="size-3 text-xs" /> Công khai
                </p>
              </div>
            </div>
          </div>
          {/* ANH */}
          <div>
            <p className="text-xs font-normal ">
              <span className="font-semibold">Ảnh · {images.length}/10</span> - Bạn có thể thêm đến 10 ảnh.
            </p>
            {images.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2">
                {images.map((src, index) => (
                  <img key={index} src={src} alt={`Uploaded ${index}`} className=" size-24 rounded-sm object-cover" />
                ))}
                <div>
                  <form className=" flex size-24 items-center justify-center rounded-sm border-[#e4e6eb] bg-[#e4e6eb]">
                    <label htmlFor="image" className="flex w-full items-center justify-center rounded-sm border-2">
                      <input type="file" id="image" className="hidden" onChange={handleUpload} />
                      <p className=" size-full text-sm font-medium">Thêm ảnh +</p>
                    </label>
                  </form>
                </div>
              </div>
            )}
            <form
              action=""
              className={clsx('', {
                hidden: images.length > 0
              })}
            >
              <label
                htmlFor="image"
                className="flex w-full items-center justify-center rounded-sm border-2 border-[#ced0d4] py-14"
              >
                <input type="file" id="image" className="hidden" onChange={handleUpload} />
                <div className="flex flex-col items-center justify-center">
                  <div className="flex size-9 items-center justify-center rounded-full bg-[#ced0d4]">
                    {/* Assuming `Image` is an imported component or icon */}
                    <Image className="block object-cover text-center text-[20px]" />
                  </div>
                  <p className="text-[17px] font-medium">Thêm ảnh</p>
                </div>
              </label>
            </form>
          </div>
          <div className=" my-2 flex items-center justify-around bg-[#f0f2f5] p-1">
            <div>
              <SmartphoneCharging />
            </div>
            <div>
              <p className=" text-sm font-normal">
                Tải trực tiếp ảnh lên từ điện thoại của bạn. <a href="#"> Tìm hiểu thêm</a>
              </p>
            </div>
            <Button className=" w-fit text-nowrap bg-[#e4e6eb] px-3 py-0 font-semibold text-black rounded-[5px] h-[30px]">Dùng thử</Button>
          </div>
          <div className=" flex items-center justify-between">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className=' border-4 rounded-lg px-5'>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl className=' h-5'>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
            </Form>
          </div>
          {/* FIELDS */}
          <p className="text-xs font-light">
            Các mặt hàng trên Marketplace đều hiển thị công khai với mọi người trên Facebook lẫn những nơi khác. Chúng
            tôi không cho phép các mặt hàng về động vật, chất cấm, chất gây nghiện, vũ khí, hàng giả và các sản phẩm
            khác vi phạm quyền sở hữu trí tuệ xuất hiện trên Marketplace. Hãy xem Chính sách thương mại của chúng tôi.
          </p>
        </div>
        {/* FOOTER */}
        <div className="h-[120px] w-full">
          <h1>FOOOTER</h1>
        </div>
      </section>
      <section>CONTENT</section>
    </div>
  )
}

export default item
