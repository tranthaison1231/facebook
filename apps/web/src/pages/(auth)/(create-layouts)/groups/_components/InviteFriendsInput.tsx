import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utils/cn'

import React from 'react'

export default function InviteFriendsInput() {
  return (
    <Popover>
      <PopoverTrigger>
        <Input
          className={cn('px-4 pb-4 pt-6 text-base placeholder:absolute placeholder:top-5 focus:ring-2')}
          placeholder="Enter names or email addresses"
        />
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">Gợi ý</p>
        <div>
          <div className="">
            <img src="" alt="" />
          </div>
          <div></div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
