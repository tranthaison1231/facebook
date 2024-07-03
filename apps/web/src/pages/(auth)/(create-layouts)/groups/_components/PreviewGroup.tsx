import { cn } from '@/utils/cn'
import { Dot, Monitor, Smartphone, UserCircle } from 'lucide-react'
import { useState } from 'react'
import bgGroup from '@/assets/images/bg-group-default.png'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface PreviewGroupProps {
  name: string
  type: string
}

export default function PreviewGroup({ name, type }: PreviewGroupProps) {
  const [isDestop, setIsDestop] = useState(true)

  return (
    <div className={cn('mx-auto h-[calc(100vh-5rem)] pb-8', { 'max-w-desktop': isDestop, 'max-w-mobile': !isDestop })}>
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

        <div className="h-full overflow-y-auto rounded-md border border-border bg-secondary">
          <div className="overflow-hidden rounded-md bg-background">
            <img className="opacity-50 grayscale filter" src={bgGroup} alt="Background group default" />
          </div>
          <div className="space-y-2 border-b bg-background px-5 py-8">
            <p
              className={cn('text-2xl font-bold', {
                'text-gray-300': !name
              })}
            >
              {name ? name : 'Group name'}
            </p>
            <div className="flex items-center gap-1 text-sm">
              <p className="lowercase first-letter:uppercase">{type ? `${type} group` : 'Group privacy'}</p>
              <Dot className="size-3" />
              <p>1 member</p>
            </div>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex cursor-not-allowed gap-8 border-b bg-background px-8 py-5 text-sm font-medium shadow-sm">
                  <p>About</p>
                  <p>Posts</p>
                  <p>Members</p>
                  <p>Events</p>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-foreground text-background">
                <p>You can use this after you create your group</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="p-4">
            <div className="max-w-4xl space-y-5">
              <div className="rounded-sm bg-blue-300 p-3">
                <p>About</p>
              </div>
              <div className="rounded-sm bg-red-300 p-3">
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
