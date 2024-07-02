import { User } from '@/apis/auth'
import { formatName } from '@/utils/name'
import clsx from 'clsx'
import { Bookmark, MoveDown, PersonStanding, Store, Users, Video } from 'lucide-react'
import { Link, useOutletContext } from 'react-router-dom'
import ShortCut from './ShortCut'

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
  },
  {
    title: 'Marketplace',
    path: '/marketplace',
    icon: <Store className="text-primary" />
  }
]

export default function Sidebar() {
  const { me } = useOutletContext<{ me: User }>()

  return (
    <div className={`fixed flex min-h-screen min-w-72 flex-col border-none bg-white text-[#050505] shadow-2xl`}>
      <ul className={clsx('space-y-2 border-r p-4')}>
        <Link to={`/${me?.id}`}>
          <li className={clsx('flex cursor-pointer gap-4 rounded-sm px-6 py-2 font-bold')}>
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <img src={me?.avatar} alt="avatar" className="h-full w-full object-cover" />
            </div>

            <p>{formatName(me)}</p>
          </li>
        </Link>
        {SIDE_BAR.map(item => (
          <Link to={`${item.path}`} key={item.title}>
            <li className={clsx('flex cursor-pointer gap-4 rounded-sm px-6 py-2 font-bold hover:bg-gray-200')}>
              {item.icon}
              <span>{item.title}</span>
            </li>
          </Link>
        ))}

        <hr className="bg-slate-600" />
      </ul>
      <ShortCut />
    </div>
  )
}
