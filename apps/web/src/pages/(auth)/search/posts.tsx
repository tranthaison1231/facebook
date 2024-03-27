// import { getUsers } from '@/apis/users'
// import { Button } from '@/components/ui/button'
// import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { Clapperboard, Newspaper, Table2, UsersRound, Image } from 'lucide-react'
import { cn } from '@/utils/cn'
import { ChevronDown } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Send, MessageCircle, ThumbsUp, ChevronRight } from 'lucide-react'

import { Link, useLocation, useSearchParams } from 'react-router-dom'
const SIDEBARS = [
  {
    icon: <Table2 />,
    path: '/top',
    content: 'Tất cả',
    childern: []
  },
  {
    icon: <Newspaper />,
    path: '/posts',
    content: 'Bài viết',
    childern: [
      {
        title: 'Bài viết gần đây ',
        type: true
      },
      {
        title: 'Bài viết bạn đã xem ',
        type: true
      },
      {
        title: 'Ngày Đăng ',
        type: false
      },
      {
        title: 'Bài viết từ',
        type: false
      },
      {
        title: 'Vị trí được gắn thẻ',
        type: false
      }
    ]
  },
  {
    icon: <UsersRound />,
    path: '/people',
    content: 'Mọi người',
    childern: [
      {
        title: 'Bạn bè ',
        type: false
      },
      {
        title: 'Tỉnh/Thành Phố ',
        type: false
      },
      {
        title: 'Học Vấn ',
        type: false
      },
      {
        title: 'Công việc',
        type: false
      }
    ]
  },
  {
    icon: <Image />,
    path: '/photos',
    content: 'Bài viết',
    childern: []
  },
  {
    icon: <Clapperboard />,
    path: '/top',
    content: 'Ảnh',
    childern: []
  },
  {
    icon: <Table2 />,
    path: '/top',
    content: 'Video',
    childern: []
  },
  {
    icon: <Table2 />,
    path: '/top',
    content: 'Bài viết',
    childern: []
  },
  {
    icon: <Table2 />,
    path: '/top',
    content: 'Bài viết',
    childern: []
  }
]
// interface User {
//   id: string
//   fullName: string
//   avatar: string
//   school: string
//   address: string
//   workAt: string
// }

export default function Component() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  let currentPath = useLocation().pathname
  currentPath = currentPath.replace('/search/', '/')
  console.log(currentPath)
  //   const q = searchParams.get('q') || ''
  //   const { data: users } = useQuery({
  //     queryKey: ['users', q],
  //     queryFn: () => getUsers(q)
  //   })

  console.log(location?.pathname)

  return (
    <div className=" mt-2 flex">
      <section className=" relative h-full w-96 bg-white shadow-lg">
        <h1 className=" z-20 flex bg-white p-2 text-2xl  font-bold">Kết quả tìm kiếm</h1>
        <hr />
        <div className=" relative">
          <p className="p-3 text-lg font-semibold">Bộ lọc</p>
          <ul className=" flex flex-col space-y-3 p-3 ">
            {SIDEBARS.map(item => (
              <li key={item?.content}>
                <Link
                  className={cn(
                    'flex w-full items-center space-x-1 rounded-sm p-2 font-semibold hover:bg-buttonColor hover:text-primary',
                    {
                      'bg-gray-200 p-2': `/search${item?.path}` === location?.pathname
                    }
                  )}
                  to={`/search${item.path}`}
                >
                  <div
                    className={clsx(
                      ' flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-buttonColor ',
                      {
                        'text-blue': item.path === searchParams.get('q')
                      }
                    )}
                  >
                    {item.icon}
                  </div>
                  <p>{item.content}</p>
                </Link>

                {`/search${item?.path}` === location?.pathname &&
                  item?.childern.map(submenu => (
                    <div className="mt-2 flex rounded  pl-9  ">
                      <div
                        className={cn('flex w-full items-center justify-between rounded-sm p-2 hover:bg-gray-200', {
                          'hover:bg-white': submenu?.type === true
                        })}
                      >
                        <p>{submenu?.title}</p>
                        {!submenu?.type ? <ChevronDown /> : <Switch id="airplane-mode" />}
                      </div>
                    </div>
                  ))}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className=" w-full bg-secondaryBg  px-36">
        <div className=" mt-4 rounded bg-white p-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <img className="h-10 w-10 cursor-pointer rounded-full" src="" alt="" />
              <div className="">
                <div className="flex items-center ">
                  <h2 className="text-base font-medium ">Phạm Ngọc Thắm</h2> <ChevronRight className="h-4 w-4" />
                  <h2 className="text-base font-medium ">Phạm Ngọc Thắm</h2>
                </div>
                <div className="flex items-center text-xs font-medium text-gray-500 ">
                  22 giờ
                  <span className="-translate-y-1 px-1 text-gray-600">.</span>
                  <img
                    className="opacity-55"
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/57iQDgPFByS.png"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="cursor-pointer rounded-full  px-3 py-3 hover:bg-gray-300">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                className="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
              >
                <circle cx="12" cy="12" r="2.5"></circle>
                <circle cx="19.5" cy="12" r="2.5"></circle>
                <circle cx="4.5" cy="12" r="2.5"></circle>
              </svg>
            </div>
          </div>
          <div className="m-2">
            <p>Title</p>
          </div>
          <div className="mt-2 w-full">
            <img className="w-full object-cover" src="" alt="" />
          </div>
          <div className="mt-2 flex justify-around">
            <button className="flex w-full items-center justify-center gap-2 rounded p-2 text-base font-medium text-gray-500 hover:bg-gray-200">
              <ThumbsUp />
              Thích
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-200">
              <MessageCircle />
              Bình luận
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded p-2 text-base font-medium text-gray-500 hover:bg-gray-200">
              <Send />
              Chia sẻ
            </button>
          </div>
          <div className=" mt-1 h-px w-full bg-gray-300 "></div>
          <div className="mt-2 flex gap-2">
            <div>
              <img className="h-10 w-10 cursor-pointer rounded-full" src="" alt="" />
            </div>
            <div className="w-full">
              <input
                type="text"
                className="w-full rounded-full border-gray-300 bg-gray-200 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Viết bình luận..."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
