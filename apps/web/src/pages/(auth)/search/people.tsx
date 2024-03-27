import { getUsers } from '@/apis/users'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { Clapperboard, Newspaper, Table2, UsersRound, Image } from 'lucide-react'
import { cn } from '@/utils/cn'
import { ChevronDown } from 'lucide-react'

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
        title: 'Bài viết gần đây '
      },
      {
        title: 'Bài viết bạn đã xem '
      },
      {
        title: 'Ngày Đăng '
      },
      {
        title: 'Bài viết từ'
      },
      {
        title: 'Vị trí được gắn thẻ'
      }
    ]
  },
  {
    icon: <UsersRound />,
    path: '/people',
    content: 'Mọi người',
    childern: [
      {
        title: 'Bạn bè '
      },
      {
        title: 'Tỉnh/Thành Phố '
      },
      {
        title: 'Học Vấn '
      },
      {
        title: 'Công việc'
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
interface User {
  id: string
  fullName: string
  avatar: string
  school: string
  address: string
  workAt: string
}

export default function Component() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  let currentPath = useLocation().pathname
  currentPath = currentPath.replace('/search/', '/')
  console.log(currentPath)
  const q = searchParams.get('q') || ''
  const { data: users } = useQuery({
    queryKey: ['users', q],
    queryFn: () => getUsers(q)
  })

  const addFriend = (id: string) => {
    console.log(id)
  }
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
                      <div className="flex w-full items-center justify-between rounded-sm p-2 hover:bg-gray-200">
                        <p>{submenu?.title}</p>
                        <ChevronDown />
                      </div>
                    </div>
                  ))}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className=" w-full  bg-secondaryBg">
        <div className=" mx-auto mt-6 w-[687px]  ">
          <ul className="flex flex-col gap-4">
            {users?.data?.map((item: User) => (
              <li
                key={item?.id}
                className=" flex  w-full items-center justify-between space-x-3 rounded-lg bg-white  p-4"
              >
                <div className="flex items-center gap-2">
                  <Link to={item.id} className="  overflow-hidden">
                    <img src={item.avatar} alt="Avatar" className="h-14 w-14 rounded-full object-contain" />
                  </Link>
                  <div className="  flex flex-col">
                    <h2>{item?.fullName}</h2>
                    <p>
                      <span>{item?.school || ''}</span> ·{' '}
                      <span> {item?.address ? ` Sống tại ${item?.address}` : ''}</span> ·{' '}
                      <span> {item?.workAt ? ` Làm việc tại ${item?.workAt} ` : ' '} </span>
                    </p>
                    <div className="flex items-center">
                      <img className="h-8 w-8 " src={item.avatar} alt="" />
                      <p>61 Bạn chung</p>
                    </div>
                  </div>
                </div>
                <Button
                  className=" text-nowrap bg-buttonColor font-semibold text-black"
                  onClick={() => addFriend(item?.id)}
                >
                  Thêm bạn bè
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
