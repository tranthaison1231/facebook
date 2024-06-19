import { cn } from '@/utils/cn'
import { Dot, Monitor, Smartphone, UserCircle } from 'lucide-react'
import { useState } from 'react'
import bgGroup from '@/assets/images/bg-group-default.png'

interface PreviewGroupProps {
  name: string
  type: string
}

export default function PreviewGroup({ name, type }: PreviewGroupProps) {
  const [isDestop, setIsDestop] = useState(true)

  return (
    <div className={cn('mx-auto h-[calc(100vh-4.6rem)] px-6 pb-8', { 'w-destop': isDestop, 'w-mobile': !isDestop })}>
      <div className="flex h-full flex-col gap-3 rounded-md bg-background px-3 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{isDestop ? 'Desktop Preview' : 'Mobile Priview'}</div>
          <div className="flex gap-2">
            <div
              className={cn('flex size-9 items-center justify-center rounded-full hover:bg-hover', {
                'text-primary': isDestop
              })}
              onClick={() => setIsDestop(true)}
            >
              <Monitor />
            </div>
            <div
              className={cn('flex size-9 items-center justify-center rounded-full hover:bg-hover', {
                'text-primary': !isDestop
              })}
              onClick={() => setIsDestop(false)}
            >
              <Smartphone />
            </div>
          </div>
        </div>

        <div className="h-full overflow-y-auto rounded-md border border-border">
          <div className="overflow-hidden rounded-md bg-white">
            <img className="opacity-50 grayscale filter" src={bgGroup} alt="Background group default" />
          </div>
          <div className="mx-5 space-y-2 border-b py-8">
            <p
              className={cn('text-2xl font-bold', {
                'text-gray-300': !name
              })}
            >
              {name ? name : 'Group name'}
            </p>
            <div className="flex items-center gap-1 text-sm">
              <p>{type ? `${type} Group` : 'Group privacy'}</p>
              <Dot className="size-3" />
              <p>1 member</p>
            </div>
          </div>

          <div className="flex gap-8 border-b px-8 py-5 text-sm font-medium shadow-sm">
            <p>About</p>
            <p>Posts</p>
            <p>Members</p>
            <p>Events</p>
          </div>
          <div className="foreground h-fit bg-secondary">
            <div>
              <div className="grayscale">
                <UserCircle />
                <div>
                  <p>{"What's on your mind?"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
