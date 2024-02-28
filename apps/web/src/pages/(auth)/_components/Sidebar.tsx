import clsx from 'clsx'
import { Home, LayoutDashboard, Tag, Users } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const SIDE_BAR = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <LayoutDashboard />
  },
  {
    title: 'Room',
    path: '/rooms',
    icon: <Home />
  },
  {
    title: 'Groups',
    path: '/groups/feed/',
    icon: <Users className="text-primary" />
  },
  {
    title: 'Category',
    path: '/categories',
    icon: <Tag />
  }
]

interface Props {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: Props) {
  const currentPath = useLocation().pathname

  return (
    <ul
      className={clsx('space-y-2 border-r p-4', {
        'w-64': isOpen,
        'w-28': !isOpen
      })}
    >
      {SIDE_BAR.map(item => (
        <Link to={`/admin${item.path}`} key={item.title}>
          <li
            className={clsx('flex cursor-pointer gap-4 rounded-sm px-6 py-2', {
              'bg-primary': currentPath === `/admin${item.path}`,
              'text-white': currentPath === `/admin${item.path}`
            })}
          >
            {item.icon}
            {isOpen && <span>{item.title}</span>}
          </li>
        </Link>
      ))}
    </ul>
  )
}
