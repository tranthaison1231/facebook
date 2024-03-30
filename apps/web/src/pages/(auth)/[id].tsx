import { Link } from 'react-router-dom'

import img1 from '@/assets/images/avt1.jpg'
import img2 from '@/assets/images/avt2.jpg'
import img3 from '@/assets/images/avt3.jpg'
import img4 from '@/assets/images/avt4.jpg'
import img5 from '@/assets/images/bg-header.png'
import img6 from '@/assets/images/facebook-logo.png'
import img7 from '@/assets/images/avt4.jpg'
import { useQuery } from '@tanstack/react-query'
import { getMe } from '@/apis/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  ArrowDown,
  ArrowUp,
  Camera,
  Cylinder,
  Eye,
  FileImage,
  Heart,
  MessageCircleX,
  Pencil,
  Plus,
  Search,
  Settings2,
  SmilePlus,
  UserPlus,
  Video
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import clsx from 'clsx'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import avatar from '@/assets/images/avt1.jpg'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useLocation } from 'react-router-dom'
import { useParams } from '@/router'
import { Input } from '@/components/ui/input'

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'

const images = [img1, img2, img3, img4, img5, img6]
const navBar = [
  {
    title: 'Bai viet',
    path: '/posts'
  },
  {
    title: 'Gioi thieu',
    path: '/intro'
  },
  {
    title: 'Ban be',
    path: '/friends'
  },
  {
    title: 'Anh',
    path: '/images'
  },
  {
    title: 'Video',
    path: '/video'
  }
]
export default function ID() {
  const { data: meQuery } = useQuery({
    queryKey: ['me'],
    queryFn: getMe
  })
  const [open, setOpen] = useState(false)
  const { id } = useParams('/:id')
  const currentPath = useLocation().pathname
  const [isClicked, setClicked] = useState(false)
  const [listOfFriends, setListFriends] = useState([
    {
      id: 1,
      avatar: avatar,
      name: 'Trần Thanh Trà',
      common: '',
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 2,
      avatar: img1,
      name: 'Khởi Nguyên',
      common: '',
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 3,
      avatar: img2,
      name: 'Bao Nguyễn',
      common: '',
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 4,
      avatar: img3,
      name: 'Phú Cường',
      common: '',
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 5,
      avatar: img4,
      name: 'Nguyễn Shuna',
      common: '',
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 6,
      avatar: img5,
      name: 'Tran Anh De',
      common: '',
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 7,
      avatar: img6,
      name: 'Cuong NGuyen',
      common: '',
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 8,
      avatar: img7,
      name: 'Viettle',
      common: '',
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 9,
      avatar: img2,
      name: 'Tung Lam',
      common: '',
      isConfirmed: false,
      isRemoved: false
    }
  ])
  const handleRemoveItem = (id: number) => {
    console.log('REMOVE')
    setListFriends(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, isisRemoved: !item.isRemoved } : item))
    )
  }
  const handleConfirmItem = (id: number) => {
    console.log('CONFIRM')
    setListFriends(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, isConfirmed: !item.isConfirmed } : item))
    )
  }

  return (
    <div className=" mx-auto flex flex-col items-center justify-center">
      <div className="border-b-1 mx-auto flex w-max flex-col border-secondaryColor">
        <div className=" relative w-full">
          <div className="relative overflow-hidden rounded-xl border after:absolute after:inset-0 after:shadow-[1px_-47px_43px_-15px_rgba(37,31,31,0.75)_inset] after:content-[''] ">
            <img src={`${meQuery?.data?.avatar}`} alt="" className=" h-96 w-full object-cover " />
          </div>
          <div className=" absolute bottom-10 right-5 z-20">
            <DropdownMenu>
              <DropdownMenuTrigger className=" flex items-center rounded-md bg-white p-2 font-bold">
                <Camera className=" mr-1 h-4 w-4 font-semibold" />
                <p>Chỉnh sửa ảnh bìa</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" flex w-96">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* HEADER */}
        <div className=" relative flex items-center justify-between px-9 ">
          <div className=" -mt-10 flex items-center space-x-4 ">
            <div className=" overflow-hidden rounded-full border hover:opacity-50">
              <img src={`${meQuery?.data?.avatar}`} alt="" className=" h-40 w-40 rounded-full" />
            </div>

            <div className=" mt-4">
              <p className=" text-3xl font-bold">{meQuery?.data?.fullName}</p>
              <p className=" font-semibold text-secondaryColor">393 ban be</p>
              <ul className=" flex">
                {images.map(item => (
                  <li className=" -ml-1 overflow-hidden">
                    <img src={`${item}`} alt="" className=" h-8 w-8 rounded-full" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" flex flex-col items-end space-y-2">
            <div className=" flex space-x-3">
              <Button className="px-4 py-0 text-white ">
                <Plus className=" mr-1 h-4 w-4" />
                Thêm vào tin
              </Button>
              <Button className="bg-primary-foreground px-4 py-0 text-black">
                <Pencil className=" mr-1  h-4 w-4" />
                Chỉnh sửa trang cá nhân
              </Button>
            </div>
            <Button
              className=" h-9 w-12 bg-primary-foreground px-4 py-0 text-black"
              onClick={() => setClicked(!isClicked)}
            >
              {isClicked ? <ArrowUp /> : <ArrowDown />}
            </Button>
          </div>
        </div>
        <div
          className={clsx('w-full px-9', {
            hidden: isClicked == false
          })}
        >
          <div className=" flex justify-between">
            <p className=" text-lg font-semibold">Những người bạn có thể biết</p>
            <Link to="/friends" className=" text-primary hover:underline">
              Xem tat ca
            </Link>
          </div>
          <Carousel>
            <CarouselContent className=" flex space-x-3">
              {listOfFriends.map(item => (
                <CarouselItem
                  key={item.id}
                  className={clsx(
                    'relative mb-3 inline-block max-w-40 basis-1/6 items-center rounded-md pb-3 pl-0 shadow-2xl ',
                    {
                      hidden: item.isRemoved
                    }
                  )}
                >
                  <MessageCircleX
                    className=" absolute right-3 top-1 text-secondaryColor hover:cursor-pointer "
                    onClick={() => handleRemoveItem(item.id)}
                  />
                  {/* BACKGROUND */}
                  <div className=" h-36 w-full overflow-hidden rounded-t-lg">
                    <img src={`${item.avatar}`} alt=" avt" className="h-full w-full object-cover" />
                  </div>

                  <div className="flex flex-col space-y-2 px-3">
                    <p className=" w-full text-nowrap text-center text-black">{item.name}</p>

                    {/* AVATAR */}
                    {item.isConfirmed ? (
                      ''
                    ) : (
                      <div className=" flex justify-center space-x-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="h-6 w-6 overflow-hidden rounded-full ">
                                <img
                                  src={`${item.avatar}`}
                                  alt=" avt"
                                  className=" h-full w-full  rounded-full object-cover"
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>HIIIIII</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <p className=" text-secondaryColor">14 ban chung</p>
                      </div>
                    )}

                    {item.isConfirmed ? (
                      <p className="block text-nowrap text-center font-light text-black">Đã gửi lời mời</p>
                    ) : (
                      ''
                    )}
                    <Button
                      className={clsx('h-9 bg-secondaryBg text-primary ', {
                        ' bg-primary-foreground text-secondaryColor': item.isConfirmed
                      })}
                      onClick={() => handleConfirmItem(item.id)}
                    >
                      <UserPlus className=" mr-1  text-inherit" />

                      <p
                        className={clsx('text-nowrap font-semibold text-inherit', {
                          ' text-black': item.isConfirmed
                        })}
                      >
                        {item.isConfirmed ? 'Đã hủy' : 'Thêm bạn bè'}
                      </p>
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <hr className=" mx-9 h-1/2 bg-secondaryColor" />
        {/* NAV BAR */}

        <div className=" flex items-center justify-between">
          <ul className=" flex ">
            {navBar.map(item => (
              <Link to={`/${id}/${item.path}`} key={item.title}>
                <li
                  className={clsx('flex cursor-pointer gap-4 rounded-sm px-6 py-2 font-semibold text-secondaryColor', {
                    'bg-primary': currentPath === `/${item.path}`,
                    'text-white': currentPath === `/${item.path}`
                  })}
                >
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className=" flex h-9 w-9 items-center justify-center rounded-sm border-none bg-slate-200">
                <Cylinder />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex w-[342px] flex-col items-start ">
                <DropdownMenuItem className=" flex w-full items-start space-x-1">
                  <Eye />
                  <p>Chế độ xem</p>
                </DropdownMenuItem>
                <DropdownMenuItem className=" flex w-full items-start space-x-1">
                  <Eye />
                  <p>Chế độ xem</p>
                </DropdownMenuItem>
                <DropdownMenuItem className=" flex w-full items-start space-x-1">
                  <Eye />
                  <p>Chế độ xem</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className=" h-screen w-full bg-[#f0f2f5]">
        <div className="mx-auto mt-5 flex w-max space-x-4">
          {/* INTRO */}
          <div className=" w-intro rounded-lg border-red-500 bg-white">
            <div className=" flex w-full flex-col space-y-5 p-4 text-sm shadow-sm">
              <p className=" text-lg font-bold">Giới thiệu</p>
              <Button className=" h-8 w-full bg-buttonColor text-black">Thêm tiểu sử</Button>
              <div className=" flex space-x-1">
                <Heart className=" text-secondaryColor" />
                <p>Độc thân</p>
              </div>
              <Button className=" mt- h-8 w-full bg-buttonColor text-black">Chỉnh sửa chi tiết</Button>
              <Button className=" mt- h-8 w-full bg-buttonColor text-black">Chi tiết đáng chú ý</Button>
            </div>
          </div>
          {/* POST */}
          <div className=" w-post">
            <div className=" flex flex-col rounded-lg bg-white p-2 shadow-sm">
              <div className=" flex w-full space-x-2">
                <Link to={'/'} className="h-10 w-10 overflow-hidden rounded-full border">
                  <img className=" h-9 w-9 rounded-full object-contain" src={`${meQuery?.data?.avatar}`} alt="" />
                </Link>
                <div className="flex w-full items-center justify-start space-x-1 rounded-full border bg-secondary-foreground p-2">
                  <Search />

                  <Input placeholder="Search..." className=" w-full border-none bg-transparent px-2" />
                </div>
              </div>

              <hr className=" color-[#f0f2f5] mt-3 h-2 w-full" />

              <div className=" mt-2 flex items-center justify-between text-nowrap">
                <Button className="flex basis-1/3 items-center space-x-1 bg-white hover:bg-[#e1e4ea]">
                  <Video className=" text-pink-900" />
                  <p className=" text-black">Video trực tiếp</p>
                </Button>
                <Button className="flex basis-1/3 items-center space-x-1 bg-white hover:bg-[#e1e4ea]">
                  <FileImage className=" text-green-500" />
                  <p className=" text-black">Ảnh/video</p>
                </Button>
                <Button className="flex basis-1/3 items-center space-x-1 bg-white hover:bg-[#e1e4ea]">
                  <SmilePlus className=" text-yellow-500" />
                  <p className=" text-black">Sự kiện trong đời </p>
                </Button>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-white p-2 text-black shadow-sm">
              <div className=" flex items-center justify-between">
                <p className=" font-bold ">Bài viết</p>
                <div className=" flex space-x-1">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className=" flex items-center space-x-1 rounded-sm bg-buttonColor p-2 text-sm text-black">
                      <Settings2 className=" w-4 h-4" />
                      <p className=" font-semibold">Bộ lọc</p>
                    </DialogTrigger>
                    <DialogContent>
                      <h4 className=" text-md p-2 text-center font-bold">Bộ lọc bài viết</h4>
                      <hr className="w-full" />
                      <div>
                        <p className=" p-2 text-center text-sm font-bold">
                          Dùng bộ lọc để tìm bài viết trên dòng thời gian của bạn.
                        </p>
                        <p className=" text-secondaryColor">
                          Mọi người vẫn nhìn thấy dòng thời gian của bạn như bình thường.
                        </p>
                      </div>
                      <div>
                        <ul>
                          <li className=" flex space-x-8">
                            <p className=" min-w-44">Năm:</p>
                            <select id="year">
                              <option value="all">Tất cả các năm</option>
                              <option value="2024">2024</option>
                              <option value="2023">2023</option>
                              <option value="2022">2022</option>
                            </select>
                          </li>
                          <li className=" flex space-x-8">
                            <p className=" min-w-44">Người đăng:</p>
                            <select id="author">
                              <option value="all">Bất kỳ ai</option>
                              <option value="me">Bạn</option>
                              <option value="friends">Bạn bè</option>
                              <option value="family">Gia đình</option>
                            </select>
                          </li>
                          <li className=" flex space-x-8">
                            <p className=" min-w-44">Quyền riêng tư:</p>
                            <select id="privacy">
                              <option value="all">Tất cả bài viết</option>
                              <option value="public">Công khai</option>
                              <option value="friends">Chỉ bạn bè</option>
                              <option value="private">Riêng tư</option>
                            </select>
                          </li>
                          <li className=" flex space-x-8">
                            <p className=" min-w-44">Bài viết được gắn thẻ:</p>
                            <select id="tags">
                              <option value="all">Tất cả bài viết</option>
                              <option value="family">Gia đình</option>
                              <option value="friends">Bạn bè</option>
                              <option value="work">Công việc</option>
                            </select>
                          </li>
                        </ul>
                      </div>
                      <div className=" flex items-center justify-end space-x-2">
                        <Button
                          className=" flex h-8 min-w-28 items-center bg-buttonColor px-2 text-black"
                          onClick={() => setOpen(!open)}
                        >
                          Xoa
                        </Button>
                        <Button
                          className=" flex h-8 min-w-28 items-center bg-primary px-6 text-white"
                          onClick={() => setOpen(!open)}
                        >
                          Xong
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className=" flex items-center space-x-1 rounded-sm bg-buttonColor p-2 text-sm text-black">
                      <Settings2 className=" w-4 h-4" />
                      <p className=" font-semibold">Quản lý bài viết</p>
                    </DialogTrigger>
                    <DialogContent>
                      <h4 className=" text-md p-2 text-center font-bold">Bộ lọc bài viết</h4>
                      <hr className="w-full mt-2 block h-1 bg-black" />
                      <div>
                        <p className=" p-2 text-center text-sm font-bold">
                          Dùng bộ lọc để tìm bài viết trên dòng thời gian của bạn.
                        </p>
                        <p className=" text-secondaryColor">
                          Mọi người vẫn nhìn thấy dòng thời gian của bạn như bình thường.
                        </p>
                      </div>
                      <div>
                        <ul>
                          <li className=" flex space-x-8">
                            <p className=" min-w-44">Năm:</p>
                            <select id="year">
                              <option value="all">Tất cả các năm</option>
                              <option value="2024">2024</option>
                              <option value="2023">2023</option>
                              <option value="2022">2022</option>
                            </select>
                          </li>
                          <li className=" flex space-x-8">
                            <p className=" min-w-44">Người đăng:</p>
                            <select id="author">
                              <option value="all">Bất kỳ ai</option>
                              <option value="me">Bạn</option>
                              <option value="friends">Bạn bè</option>
                              <option value="family">Gia đình</option>
                            </select>
                          </li>
                          <li className=" flex space-x-8">
                            <p className=" min-w-44">Quyền riêng tư:</p>
                            <select id="privacy">
                              <option value="all">Tất cả bài viết</option>
                              <option value="public">Công khai</option>
                              <option value="friends">Chỉ bạn bè</option>
                              <option value="private">Riêng tư</option>
                            </select>
                          </li>
                          <li className=" flex space-x-8">
                            <p className=" min-w-44">Bài viết được gắn thẻ:</p>
                            <select id="tags">
                              <option value="all">Tất cả bài viết</option>
                              <option value="family">Gia đình</option>
                              <option value="friends">Bạn bè</option>
                              <option value="work">Công việc</option>
                            </select>
                          </li>
                        </ul>
                      </div>
                      <div className=" flex items-center justify-end space-x-2">
                        <Button
                          className=" flex h-8 min-w-28 items-center bg-buttonColor px-2 text-black"
                          onClick={() => setOpen(!open)}
                        >
                          Xoa
                        </Button>
                        <Button
                          className=" flex h-8 min-w-28 items-center bg-primary px-6 text-white"
                          onClick={() => setOpen(!open)}
                        >
                          Xong
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <hr />
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
