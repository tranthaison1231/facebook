import { Link } from '@/router'

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
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ArrowDown, ArrowUp, Camera, MessageCircleX, Pencil, Plus, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import clsx from 'clsx'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import avatar from '@/assets/images/avt1.jpg'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Outlet, useLocation } from 'react-router-dom'
import { useParams } from '@/router'
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
export default function ProfileHeader() {
  const { data: meQuery } = useQuery({
    queryKey: ['me'],
    queryFn: getMe
  })
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
    <div className=" pt-22  mx-auto flex items-center justify-center px-96">
      <div className="mx-auto flex min-h-screen min-w-10xl flex-col border-red-600 shadow-xl ">
        <div className=" relative w-full">
          <div className="relative overflow-hidden rounded-xl border after:absolute after:inset-0 after:shadow-[1px_-47px_43px_-15px_rgba(37,31,31,0.75)_inset] after:content-[''] ">
            <img src={`${meQuery?.data?.avatar}`} alt="" className=" h-96 w-full object-cover " />
          </div>
          <div className=" absolute bottom-10 right-5  z-10">
            <DropdownMenu>
              <DropdownMenuTrigger className=" flex items-center rounded-md bg-white p-2 font-bold">
                <Camera className=" mr-1 h-4 w-4 font-semibold" />
                <p>Chỉnh sửa ảnh bìa</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" w-96">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* HEADER */}
        <div className=" relative z-10 flex items-center justify-between px-9 ">
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
          <Carousel className=" rounded-sm ">
            <CarouselContent className=" mt-2 flex space-x-3 border-2 border-secondaryColor border-solid">
              {listOfFriends.map(item => (
                <CarouselItem
                  key={item.id}
                  className={clsx(
                    'relative mb-3 inline-block max-w-40 basis-1/6 items-center rounded-md border pb-3 pl-0 shadow-2xl ',
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

       

        {/* NAV BAR */}
        <div>
        <hr className=" h-[1px] w-full bg-secondaryColor" />
        <ul className=" flex ">
          {navBar.map(item => (
            <Link to={`/profile/${item.path}`} key={item.title}>
              <li
                className={clsx('flex cursor-pointer gap-4 rounded-sm px-6 py-2 font-semibold', {
                  ' underline-offset-4': currentPath === `/profile${item.path}`,
                  'text-primary': currentPath === `/profile${item.path}`
                })}
              >
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
        </div>
      
      </div>
    </div>
  )
}
