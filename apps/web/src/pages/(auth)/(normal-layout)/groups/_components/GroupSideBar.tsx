import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { AppWindow, Settings, Sparkles, UsersRound, Search, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/utils/cn'
import { useNavigate } from '@/router'

export default function GroupSideBar() {
  const sidebar = [
    {
      name: 'Bảng feed của bạn',
      icon: AppWindow,
      to: '/groups/feed'
    },
    {
      name: 'Khám phá',
      icon: Sparkles,
      to: '/groups/discover'
    },
    {
      name: 'Nhóm của bạn',
      icon: UsersRound,
      to: '/groups/joins'
    }
  ]

  const navigate = useNavigate()
  const [isNavigate, setIsNavigate] = useState(sidebar[0].to)
  const handleNavigate = (c: string) => {
    setIsNavigate(c)
  }

  return (
    <>
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Nhóm</p>
        <Settings />
      </div>
      <div className="relative my-5">
        <Search className="absolute left-2 top-2" />
        <Input className="p-2 pl-10" placeholder="Tìm kiếm nhóm" />
      </div>
      <div className="flex flex-col">
        {sidebar.map(item => (
          <Link
            key={item.name}
            to={item.to}
            onClick={() => handleNavigate(item.to)}
            className={cn(
              'hover:bg-hover flex items-center gap-5 rounded-md px-2 py-3 font-medium',
              isNavigate === item.to && 'bg-secondary-foreground'
            )}
          >
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground',
                isNavigate === item.to && 'bg-primary text-primary-foreground'
              )}
            >
              <item.icon />
            </div>
            <p>{item.name}</p>
          </Link>
        ))}
        <Button
          onClick={() => {
            navigate('/groups/create')
          }}
          className="mt-5 bg-secondaryBg text-primary hover:bg-secondary"
        >
          <Plus />
          <span>Tạo nhóm mới</span>
        </Button>
      </div>
    </>
  )
}
