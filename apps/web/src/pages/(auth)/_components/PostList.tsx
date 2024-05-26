import Avatar from '@/assets/images/avt1.jpg'

import {
  FileImage,
  Forward,
  Heart,
  MessageCircle,
  MoreHorizontal,
  MoveDown,
  Share,
  SmilePlus,
  Video
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'

import Love from '@/assets/images/love.png'
import Love2 from '@/assets/images/love2.png'
import Like from '@/assets/images/like.png'
import { Post, fetchPosts } from '@/apis/posts'
import { useQuery } from '@tanstack/react-query'
import CreatePost from './CreatePost'
import dayjs from 'dayjs'

const Extrafunction = [
  {
    icon: <MoveDown />,
    name: 'Luu bai viet',
    detail: 'Them vao danh sach luu'
  },
  {
    icon: <MoveDown />,
    name: 'Luu bai viet',
    detail: 'Them vao danh sach luu'
  },
  {
    icon: <MoveDown />,
    name: 'Luu bai viet',
    detail: 'Them vao danh sach luu'
  },
  {
    icon: <MoveDown />,
    name: 'Luu bai viet',
    detail: 'Them vao danh sach luu'
  }
]

export default function PostList() {
  const { data: postsQuery } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts()
  })
  return (
    <div className="w-[520px]">
      <div className="w-full rounded-lg bg-white p-5">
        <div className=" flex flex-col ">
          <div className=" flex max-h-10 space-x-2">
            <CreatePost />
          </div>

          <hr className=" color-[#f0f2f5] mt-3 h-2 w-full" />

          <div className=" mt-2 flex text-nowrap">
            <Button className="flex items-center space-x-1 bg-white  hover:bg-[#e1e4ea]">
              <Video className=" text-pink-900" />
              <p className=" text-black">Video trực tiếp</p>
            </Button>
            <Button className="flex items-center space-x-1 bg-white  hover:bg-[#e1e4ea]">
              <FileImage className=" text-green-500" />
              <p className=" text-black">Ảnh/video</p>
            </Button>
            <Button className="flex items-center space-x-1 bg-white  hover:bg-[#e1e4ea]">
              <SmilePlus className=" text-yellow-500" />
              <p className=" text-black">Cảm xúc/hoạt động </p>
            </Button>
          </div>
        </div>
      </div>
      {postsQuery?.data.items.map((post: Post) => (
        <article className="mt-3 w-full rounded-lg bg-white" key={post.id}>
          <div className=" flex items-center justify-between p-3">
            <div className="flex space-x-2">
              <img src={post.user.avatar} alt="" className="size-10 rounded-full" />
              <div className="flex flex-col justify-start">
                <p className="font-bold">{post.user.firstName + ' ' + post.user.lastName} </p>
                <p>{dayjs(post.createdAt).fromNow()}</p>
              </div>
            </div>

            <div className=" flex items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <ScrollArea className="h-[200px] w-[350px] p-4">
                    <ul>
                      {Extrafunction.map(item => (
                        <li className=" hover:bg-slate-300" key={item.name}>
                          <div>
                            <div>
                              <img src={`$${item.icon}`} alt="" />
                            </div>
                            <div>
                              <p className="font-bold">{item.name}</p>
                              <p className="font-light">{item.detail}</p>
                            </div>
                          </div>
                          <hr className="h-1/2 w-full bg-slate-100" />
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <hr className=" h-1 px-5" />

          <div className="p-5 text-justify ">{post?.content}</div>

          {post?.media?.length > 0 && (
            <div className=" max-h-[500px] overflow-hidden">
              <img src={post?.media?.[0]} alt="" className="w-full object-contain" />
            </div>
          )}

          <div className="flex justify-between p-5 ">
            <div className=" flex items-center justify-center space-x-1">
              <div className="flex items-center -space-x-1">
                <img src={`${Love}`} alt="" className=" h-4 w-4" />
                <img src={`${Love2}`} alt="" className=" h-4 w-4" />
                <img src={`${Like}`} alt="" className=" h-4 w-4" />
              </div>
              <p>{post.likes.length}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <p>219</p>
                <MessageCircle className="w-4" />
              </div>
              <div className="flex">
                <p>52</p>
                <Forward className="w-4" />
              </div>
            </div>
          </div>
          <hr />

          <div className="flex justify-between px-5">
            <Button className="flex items-center space-x-2 bg-white text-secondaryColor hover:bg-[#e1e4ea]">
              <Heart />
              Thích
            </Button>
            <Button className="flex items-center space-x-2 bg-white text-secondaryColor hover:bg-[#e1e4ea]">
              <MessageCircle />
              Bình luận
            </Button>
            <Button className="flex items-center space-x-2 bg-white text-secondaryColor hover:bg-[#e1e4ea]">
              <Share />
              Chia sẻ
            </Button>
          </div>
        </article>
      ))}
    </div>
  )
}
