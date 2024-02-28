import { AlignJustify, User2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { removeToken } from '@/utils/token'

export default function UserProfilePopover() {
  const onLogout = () => {
    removeToken()
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-3 rounded-full border px-4 py-1">
          <AlignJustify className="w-6" />
          <div className="flex h-8 w-8 items-end justify-center rounded-full bg-gray-400 text-white">
            <User2 />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-60 text-sm" align="end">
        <hr />
        <hr />
        <div className="my-2 w-full cursor-pointer p-3  hover:bg-gray-100" onClick={onLogout}>
          Logout
        </div>
      </PopoverContent>
    </Popover>
  )
}
