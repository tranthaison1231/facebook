import { getMe } from '@/apis/auth'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { Bookmark, CircleFadingPlus, MoveDown, PersonStanding, Users, Video } from 'lucide-react'
import { Link } from 'react-router-dom'

const SIDE_BAR = [
  {
    title: 'Huynh Chi Trung',
    path: '/',
    icon: <PersonStanding className="text-primary" />
  },
  {
    title: 'Ban be',
    path: '/friends',
    icon: <Bookmark className="text-primary" />
  },
  {
    title: 'Groups',
    path: '/groups/feed/',
    icon: <Users className="text-primary" />
  },
  {
    title: 'Video',
    path: '/video',
    icon: <Video className="text-primary" />
  },
  {
    title: 'Xem them',
    path: '/seemore',
    icon: <MoveDown className="text-primary" />
  }
]
const SIDE_BAR2 = [
  {
    title: 'Ban quyền lực E21CQC',
    path: '/',
    icon: <CircleFadingPlus className="text-primary" />
  },
  {
    title: 'Facebook',
    path: '/',
    icon: <CircleFadingPlus className="text-primary" />
  },
  {
    title: 'Facebook',
    path: '/',
    icon: <CircleFadingPlus className="text-primary" />
  },
  {
    title: 'Facebook',
    path: '/',
    icon: <CircleFadingPlus className="text-primary" />
  }
]

export default function Sidebar() {
  const { data: meQuery } = useQuery({
    queryKey: ['me'],
    queryFn: getMe
  })

  return (
    <div className={`fixed  flex min-h-screen min-w-72 flex-col  border-none bg-white text-[#050505]  shadow-2xl `}>
      <ul className={clsx('space-y-2 border-r p-4')}>
        <Link to={`/${meQuery?.data?.id}`}>
          <li className={clsx('flex cursor-pointer gap-4 rounded-sm px-6 py-2 font-bold')}>
            <div className=" h-8 w-8 overflow-hidden rounded-full">
              <img src={meQuery?.data?.avatar} alt="avatar" className="h-full w-full object-cover" />
            </div>

            <p>{meQuery?.data?.firstname} {meQuery?.data?.lastname}</p>
          </li>
        </Link>
        {SIDE_BAR.map(item => (
          <Link to={`${item.path}`} key={item.title}>
            <li className={clsx('flex cursor-pointer gap-4 rounded-sm px-6 py-2 font-bold')}>
              {item.icon}
              <span>{item.title}</span>
            </li>
          </Link>
        ))}

        <hr className=" bg-slate-600" />
      </ul>

      <ul className={clsx('space-y-2 border-r p-4 font-bold text-[#050505]')}>
        <li className="flex cursor-pointer gap-4 rounded-sm px-6 py-2 ">LỐI TẮT CỦA BẠN</li>
        {SIDE_BAR2.map(item => (
          <Link to={`${item.path}`} key={item.title}>
            <li className={clsx('flex cursor-pointer gap-4 rounded-sm px-6 py-2')}>
              {item.icon}
              <span>{item.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
