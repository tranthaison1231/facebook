import { Input } from '@/components/ui/input'
import UserProfile from './UserProfile'
import { ArrowLeft, ArrowRight, Bell, Mail } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  onToggle: () => void
  isOpen: boolean
}

export default function Header({ onToggle, isOpen }: Props) {
  return (
    <div className="flex w-full border-b">
      <div
        className={clsx('flex items-center px-8 text-center text-2xl font-bold', {
          'w-64': isOpen,
          'w-28': !isOpen
        })}
      >
        Facebook
      </div>
      <div
        className={clsx('relative flex  items-center justify-between px-7 py-2', {
          'w-[calc(100%-16rem)]': isOpen,
          'w-[calc(100%-4rem)]': !isOpen
        })}
      >
        <button
          onClick={onToggle}
          className="absolute -left-4 top-2 h-8 w-8 cursor-pointer rounded-full bg-primary p-1 text-white"
        >
          {isOpen ? <ArrowLeft /> : <ArrowRight />}
        </button>
        <Input placeholder="Search..." className="h-9 w-64" />
        <div className="flex gap-4">
          <div>
            <Bell />
          </div>
          <div>
            <Mail />
          </div>
          <UserProfile />
        </div>
      </div>
    </div>
  )
}
