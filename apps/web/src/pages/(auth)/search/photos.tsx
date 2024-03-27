// import { getUsers } from '@/apis/users'
// import { Button } from '@/components/ui/button'
// import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { Clapperboard, Newspaper, Table2, UsersRound, Image } from 'lucide-react'
import { cn } from '@/utils/cn'
import { ChevronDown } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

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
    childern: [
      {
        title: 'Người đăng ',
        type: false
      },
      {
        title: 'Loạt ảnh ',
        type: false
      },
      {
        title: 'Vị trí được gắn thẻ ',
        type: false
      },
      {
        title: 'Ngày đăng',
        type: false
      }
    ]
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

export default function Component() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  let currentPath = useLocation().pathname
  currentPath = currentPath.replace('/search/', '/')
  console.log(currentPath)

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
      <section className=" w-full bg-secondaryBg   px-36">
        <div className="mt-4 flex  flex-col rounded bg-white">
          <div className="flex items-center justify-between px-4 pt-4 ">
            <h3 className="text-xl font-bold">Ảnh từ bạn bè và nhóm</h3>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1 rounded-sm  px-4">
            <img
              className="h-full  min-h-28 w-full  rounded-tl-md"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full "
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full  rounded-tr-md"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full "
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full "
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full  rounded-bl-md"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full "
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="min -h-28 h-full w-full  rounded-br-md"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
          </div>
          <button className="m-4 rounded bg-gray-300 p-2">Xem tất cả</button>
        </div>
      </section>
    </div>
  )
}
