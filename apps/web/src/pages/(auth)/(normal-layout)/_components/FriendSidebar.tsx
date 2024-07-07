import { cn } from '@/utils/cn'
import { ChevronRight, Gift, Settings, UserCheck, UserMinus, UserPlus, Users } from 'lucide-react'
import { cloneElement } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface FriendSidebarProps {
  className?: string
}

export const SIDE_BARS = [
  {
    icon: <Users />,
    name: 'Home',
    to: '',
    hasRightArrow: false
  },
  {
    icon: <UserMinus />,
    name: 'Friend requests',
    to: '/requests',
    hasRightArrow: true
  },
  {
    icon: <UserPlus />,
    name: 'Suggestions',
    to: '/suggestions',
    hasRightArrow: true
  },
  {
    icon: <UserCheck />,
    name: 'All friends',
    to: '/list',
    hasRightArrow: true
  },
  {
    icon: <Gift />,
    name: 'Birthdays',
    to: '/birthdays',
    hasRightArrow: false
  },
  {
    icon: <UserCheck />,
    name: 'Custom lists',
    to: '/friendlist',
    hasRightArrow: true
  }
]

export default function FriendSidebar({ className }: FriendSidebarProps) {
  const location = useLocation()

  return (
    <div className={cn('h-[calc(100vh-74px)] bg-white px-4 py-5', className)}>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Friends</h1>
        <div className="flex size-9 items-center justify-center rounded-full bg-gray-100">
          <Settings className="size-5" />
        </div>
      </div>
      <div className="mt-4">
        {SIDE_BARS.map(({ icon, name, to, hasRightArrow }) => {
          const isActive = location.pathname === `/friends${to}`
          return (
            <Link
              to={`/friends${to}`}
              key={name}
              className={cn('flex cursor-pointer items-center justify-between rounded-sm px-2 py-2', {
                'bg-gray-100': isActive
              })}
            >
              <div className="flex items-center space-x-3">
                <div
                  data-testid={`${name}-icon`}
                  className={cn('flex size-9 items-center justify-center rounded-full bg-gray-100', {
                    'bg-blue-500': isActive
                  })}
                >
                  {cloneElement(icon, {
                    className: cn('size-5', {
                      'text-black': isActive,
                      'text-white': isActive
                    })
                  })}
                </div>
                <span>{name}</span>
              </div>
              {hasRightArrow && <ChevronRight />}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
