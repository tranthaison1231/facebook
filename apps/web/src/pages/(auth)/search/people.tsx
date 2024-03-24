import { getUsers } from '@/apis/users'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { Clapperboard, Newspaper, Table2, UsersRound, Image } from 'lucide-react'

import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
const SIDEBARS = [
  {
    icon: <Table2 />,
    path: '/top',
    content: 'Tất cả'
  },
  {
    icon: <Newspaper />,
    path: '/top',
    content: 'Bài viết'
  },
  {
    icon: <UsersRound />,
    path: '/top',
    content: 'Mọi người'
  },
  {
    icon: <Image />,
    path: '/top',
    content: 'Bài viết'
  },
  {
    icon: <Clapperboard />,
    path: '/top',
    content: 'Ảnh'
  },
  {
    icon: <Table2 />,
    path: '/top',
    content: 'Video'
  },
  {
    icon: <Table2 />,
    path: '/top',
    content: 'Bài viết'
  },
  {
    icon: <Table2 />,
    path: '/top',
    content: 'Bài viết'
  },
  {
    icon: <Table2 />,
    path: '/top',
    content: 'Bài viết'
  }
]
interface User {
  id: string
  fullName: string
  avatar: string
 
}
export default function Component() {
  const [searchParams] = useSearchParams()
  let currentPath = useLocation().pathname
  currentPath = currentPath.replace('/search/', '/')
  console.log(currentPath)
  const q = searchParams.get('q') || ''
  const { data: users } = useQuery({
    queryKey: ['users', q],
    queryFn: () => getUsers(q)
  })

const navigate = useNavigate();
const toProfile = (id:string) => {
  navigate(`/${id}`)
}
  console.log(users)
  return (
    <div className=" mt-2 flex">
      <section className=" h-screen w-96 bg-white shadow-lg">
        <h1 className=" text-center text-2xl font-bold">Kết quả tìm kiếm</h1>
        <hr />
        <div className="">
          <p className="p-3 text-lg font-semibold">Bộ lọc</p>
          <ul className=" flex flex-col space-y-3 p-3 ">
            {SIDEBARS.map(item => (
              <li>
                <Link
                  className=" flex w-full items-center space-x-1 rounded-md font-semibold hover:bg-buttonColor hover:text-primary"
                  to={''}
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
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className=" w-full  bg-secondaryBg">
        <div className=" mx-auto mt-6 w-[687px] rounded-lg bg-white p-4">
          <p className="text-lg font-semibold">Mọi người</p>
          <ul>
            {users?.data.map((item: User) => (
              <li className=' w-full flex items-center space-x-3'>
                <Link to={item.id} className='  overflow-hidden'>
                  <img src={item.avatar} alt="Avatar" className='w-14 h-14 rounded-full object-contain' />
                </Link>
                <p className=' w-3/4 font-primary font-normal text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione natus accusantium provident ducimus impedit necessitatibus id cumque culpa distinctio perferendis quia, quam accusamus. Repudiandae modi corporis obcaecati veritatis, fuga in.</p>
               <Button className=' text-nowrap bg-buttonColor text-black font-semibold' onClick={() =>toProfile(item.id)}>Đang theo dõi</Button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
