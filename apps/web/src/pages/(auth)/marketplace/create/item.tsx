import { getMe } from '@/apis/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { Bitcoin, ChevronDown, ChevronUp, DoorOpen, Earth, Rocket, SmartphoneCharging, X } from 'lucide-react'

import { useState } from 'react'

import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { fetchCategories } from '@/apis/categories'
import { useForm } from 'react-hook-form'
import { marketPlace } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'

function item() {
  const { data: me } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe()
  })

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

  const [open, setOpen] = useState(false)
  const { data: categories } = useQuery({
    queryKey: ['category'],
    queryFn: () => fetchCategories()
  })
  console.log('CATEGORY: ', categories)
  // const [formData, setFormData] = useState({
  //   title: '',
  //   price: '',
  //   categoryId: '',
  //   description: '',
  //   location: '',
  //   image: ''
  // })
  // const handleInputChange = (
  //   e: React.ChangeEventHandler<HTMLInputElement> |
  //     React.ChangeEventHandler<HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   })
  // }
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault() // Ngăn chặn hành động mặc định
  //   console.log('DATA', formData) // Log dữ liệu từ biểu mẫu
  // }
  type FormValues = {
    //images: JSON
    price: string
    //description: string
    categoryId: number
    //location: string
    title: string
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(marketPlace)
  })

  const onSubmit = (data: FormValues) => console.log('DATA', data)

  return (
    <div className=" -mt-20 flex">
      <section className="sticky left-0 top-0 w-[360px] shrink-0 bg-white p-4 pt-0 shadow-md">
        {/* HEADER */}
        <div className="mb-2 mt-2 flex gap-x-3">
          <X
            size={10}
            className=" size-8 flex-shrink-0 rounded-full bg-[#0006] text-white"
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
        <div className=" custom-scrollbar h-[500px] w-full overflow-y-auto ">
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
                  <div className="  flex size-24 items-center justify-center rounded-sm border-[#e4e6eb] bg-[#e4e6eb]">
                    <label htmlFor="image" className="flex w-full items-center justify-center rounded-sm border-2">
                      <input type="file" id="image" className="hidden" onChange={handleUpload} />
                      <p className=" size-full text-sm font-medium">Thêm ảnh +</p>
                    </label>
                  </div>
                </div>
              </div>
            )}
            <div
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
                    <img className="block object-cover text-center text-[20px]" />
                  </div>
                  <p className="text-[17px] font-medium">Thêm ảnh</p>
                </div>
              </label>
            </div>
          </div>
          <div className=" my-2 flex items-center justify-around bg-[#f0f2f5] p-1">
            <div>
              <SmartphoneCharging />
            </div>
            <div>
              <p className=" text-xs font-normal">
                Tải trực tiếp ảnh lên từ điện thoại của bạn. <a href="#"> Tìm hiểu thêm</a>
              </p>
            </div>
            <Button className=" h-[30px] w-fit text-nowrap rounded-[5px] bg-[#e4e6eb] px-3 py-0 font-semibold text-black">
              Dùng thử
            </Button>
          </div>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-md font-bold">Bắt buộc</p>
            <p className="mb-2 text-sm font-normal">Hãy mô tả rõ nhất có thể.</p>
            <div className="flex flex-col items-center justify-center gap-2">
              <Input
                className="w-full rounded-[4px] border border-gray-300 bg-white px-4 pb-3 pt-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Tiêu đề"
                {...register('title', { required: 'Please enter your title.' })}
              />
              <Input
                className="w-full rounded-[4px] border border-gray-300 bg-white px-4 pb-3 pt-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="Giá"
                {...register('price', { required: 'Please enter your price.' })}
              />
              <select
                className="w-full rounded-[4px] border border-gray-300 bg-white px-4 pb-3 pt-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('categoryId', { required: 'Please select a category.' })}
              >
                <option value="">Hạng mục</option>
                {categories?.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Input
                className="w-full rounded-[4px] border border-gray-300 bg-white px-4 pb-3 pt-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Tình trạng"
                // Not registered for react-hook-form
              />
              <button
                className="font-mormal bg-white p-1 text-start text-sm text-black hover:bg-slate-300"
                type="submit"
              >
                Bắt buộc
              </button>
            </div>
          </form>
          <div>
            <p className="text-md font-bold">Chi tiết khác</p>

            <Button
              className=" font-mormal bg-white p-1 text-start text-sm text-black hover:bg-slate-300"
              onClick={() => setOpen(!open)}
            >
              Bổ sung chi tiết để thu hút thêm sự quan tâm. {open ? <ChevronUp /> : <ChevronDown />}
            </Button>
            {/* FIELDS */}
            <div className={clsx(' mt-2', { hidden: !open })}>
              <div className=" flex flex-col items-center justify-center gap-2">
                <textarea
                  className="w-full rounded-[4px] border border-gray-300 bg-white px-4 pb-3 pt-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mô tả"
                  name="description"
                ></textarea>
                <Select>
                  <SelectTrigger className="w-full rounded-[4px] border border-gray-300 bg-white px-4 pb-3 pt-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Tình trạng hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Niêm yết là còn hàng</SelectItem>
                    <SelectItem value="dark">Niêm yết là chỉ còn môt mặt hàng</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  className="w-full rounded-[4px] border border-gray-300 bg-white px-4 pb-3 pt-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Thẻ sản phẩm"
                />
                <Input
                  className="w-full rounded-[4px] border border-gray-300 bg-white px-4 pb-3 pt-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Vị trí"
                />
              </div>
              {/* TUY CHON VIEC GAP MAT */}
              <div className=" m-2 p-2">
                <p className="text-md font-bold">Tuy chọn vị trí</p>
                <p className=" text-sm font-light">
                  Người mua có thể nhìn thấy tùy chọn của bạn trên bài niêm yết. Tìm hiểu thêm
                </p>
                <div className="flex items-center justify-around gap-2 rounded-sm p-2 hover:bg-[#e4e6eb]">
                  <Bitcoin className=" shrink-0" />
                  <div className="">
                    <p className=" text-md font-semibold">Gặp mặt ở nơi công cộng</p>
                    <p className=" text-sm font-light">Gặp mặt tại vị trí công cộng.</p>
                  </div>
                  <div className="shrink-0">
                    <Input type="checkbox" className=" " />
                  </div>
                </div>
                <div className="flex items-center justify-around gap-2 rounded-sm p-2 hover:bg-[#e4e6eb]">
                  <DoorOpen className=" shrink-0" />
                  <div className="">
                    <p className=" text-md font-semibold">Đặt mua rồi tự đến lấy</p>
                    <p className=" text-sm font-light">Người mua nhận hàng tại nơi của bạn.</p>
                  </div>
                  <div className="shrink-0">
                    <Input type="checkbox" className=" " />
                  </div>
                </div>
                <div className="flex items-center justify-around gap-2 rounded-sm p-2 hover:bg-[#e4e6eb]">
                  <DoorOpen className=" shrink-0" />
                  <div className="">
                    <p className=" text-md font-semibold">Để hàng trước cửa</p>
                    <p className=" text-sm font-light">Bạn để hàng trước cửa nhà người mua.</p>
                  </div>
                  <div className="shrink-0">
                    <Input type="checkbox" className=" " />
                  </div>
                </div>
              </div>
            </div>

            {/* TOGGLE BUTTON */}
            <div className={clsx(' mt-2 ', {})}>
              <div className="flex justify-between gap-2 rounded-sm p-2 hover:bg-[#e4e6eb]">
                <Rocket className=" shrink-0" />
                <div className="">
                  <p className=" text-md font-semibold">Quảng cáo bài niêm yết sau khi đăng</p>
                  <p className=" text-sm font-light">
                    Thêm bước quảng cáo bài niêm yết sau khi đăng. Khi chuyển bài niêm yết thành quảng cáo, bạn có thể
                    tiếp cận nhiều người mua tiềm năng hơn.
                  </p>
                </div>
                <div className="shrink-0">
                  <Input
                    type="checkbox"
                    className=" after:contents-[''] relative inline-block h-7 w-14 appearance-none rounded-full bg-gray-400 shadow-sm transition-all after:absolute after:left-[3px] after:top-[3px] after:h-4/5 after:w-2/5 after:rounded-full after:bg-white after:transition-all checked:bg-[#1876f2] checked:after:translate-x-6"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-2 rounded-sm p-2 hover:bg-[#e4e6eb]">
                <div className="">
                  <p className=" text-md font-semibold">Ẩn với bạn bè</p>
                  <p className=" text-sm font-light">
                    Bài niêm yết này vẫn ở chế độ công khai nhưng sẽ ẩn với bạn bè trên Facebook và Messenger trong hầu
                    hết các trường hợp.
                  </p>
                </div>
                <div className="shrink-0">
                  <Input
                    type="checkbox"
                    className=" after:contents-[''] relative inline-block h-7 w-14 appearance-none rounded-full bg-gray-400 shadow-sm transition-all after:absolute after:left-[3px] after:top-[3px] after:h-4/5 after:w-2/5 after:rounded-full after:bg-white after:transition-all checked:bg-[#1876f2] checked:after:translate-x-6"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* FIELDS */}
          <p className="text-xs font-light">
            Các mặt hàng trên Marketplace đều hiển thị công khai với mọi người trên Facebook lẫn những nơi khác. Chúng
            tôi không cho phép các mặt hàng về động vật, chất cấm, chất gây nghiện, vũ khí, hàng giả và các sản phẩm
            khác vi phạm quyền sở hữu trí tuệ xuất hiện trên Marketplace. Hãy xem Chính sách thương mại của chúng tôi.
          </p>
        </div>

        {/* FOOTER */}
        <div className={clsx(' mt-3 w-full', {})}>
          <div className=" flex items-center justify-between gap-1">
            <div className=" h-2 w-1/2 rounded-full bg-slate-300"></div>
            <div className=" h-2 w-1/2 rounded-full bg-slate-300"></div>
          </div>
          <hr className=" m-2" />
          <Button className=" w-full rounded-sm bg-primary text-white">Tiếp</Button>
        </div>
      </section>

      <section className=" flex w-full items-center justify-center bg-[#f0f2f5]">
        <div className=" mx-auto mt-10 min-h-[650px] overflow-hidden rounded-lg bg-white p-3">
          <h1 className=" mb-3 font-bold">Xem trước</h1>
          <div className=" flex h-[600px] items-center justify-between overflow-hidden">
            {/* BACKGROUND */}
            <div className=" flex h-full w-2/3 items-center justify-center overflow-hidden bg-[#f0f2f5]">
              {images.length <= 0 ? (
                <div className=" flex h-full flex-col items-center justify-center">
                  <div className=" w-2/3 text-center">
                    <h1 className=" text-lg font-bold">Bản xem trước bài niêm yết</h1>
                    <p className=" text-lg">
                      Trong khi tạo, bạn có thể xem trước để biết bài niêm yết sẽ hiển thị thế nào với mọi người trên
                      Marketplace.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-between overflow-hidden">
                  <Carousel className="h-full w-full">
                    <CarouselContent className="">
                      {images.map((image, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4">
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-6">
                                <img src={image} className="block h-[600px] w-[571px] object-contain" />
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              )}
            </div>
            {/* CONTENT */}
            <div>
              <h1 className=" text-2xl font-bold">{}</h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default item
