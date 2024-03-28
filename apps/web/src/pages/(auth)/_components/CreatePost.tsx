import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { User } from '@/apis/auth'
import { useOutletContext } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import { Lock, ChevronDown } from 'lucide-react'

export default function CreatePost() {
  const { me } = useOutletContext<{ me: User }>()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" flex w-full cursor-pointer items-center rounded-full border-none bg-gray-200 p-4 hover:bg-gray-300">
          {me?.fullName} ơi ,bạn đang nghĩ gì thế?
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className=" flex items-center justify-center p-4">
          <h3>Tạo Bài viểt</h3>
        </div>
        <hr className="h-1 w-full bg-gray-300 "></hr>
        <div className="p-4">
          <div className="flex gap-2 ">
            <img className="h-8 w-8" src={me?.avatar} alt="" />
            <div>
              <p className="text-base font-bold">{me?.fullName}</p>
              <div className="flex items-center gap-1 rounded bg-gray-300 p-1 text-sm font-bold">
                <Lock className="h-4 w-4" />
                Chỉ mình tôi
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          <Textarea className="border-none outline-none" placeholder="Type your message here." />
        </div>
      </DialogContent>
    </Dialog>
  )
}
