import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { User } from '@/apis/auth'
import { Link, useOutletContext } from 'react-router-dom'
import { useState } from 'react'
import SelectPublishType from './SelectPublishType'
import PostEditor from './PostEditor'

export default function CreatePost() {
  const { me } = useOutletContext<{ me: User }>()
  const [isOpen, setIsOpen] = useState(false)
  const [isSelectPublishType, setIsSelectPublishType] = useState(false)
  const [publishType, setPublishType] = useState('PUBLIC')

  return (
    <>
      <Link to={`/${me?.id}`} className="h-10 w-10 overflow-hidden rounded-full">
        <img className=" w-full rounded-full  object-contain" src={me?.avatar} alt="" />
      </Link>
      <Dialog
        open={isOpen}
        onOpenChange={open => {
          if (open === false) {
            setIsOpen(false)
          }
        }}
      >
        <DialogTrigger asChild>
          <div
            onClick={() => setIsOpen(true)}
            className=" flex w-full cursor-pointer items-center rounded-full border-none bg-gray-200 p-4 hover:bg-gray-300"
          >
            {me?.firstName} ơi ,bạn đang nghĩ gì thế?
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-auto">
          {isSelectPublishType ? (
            <SelectPublishType
              onBack={() => setIsSelectPublishType(false)}
              onValueChange={value => setPublishType(value)}
            />
          ) : (
            <PostEditor
              onSelectPublicType={() => setIsSelectPublishType(true)}
              onClose={() => setIsOpen(false)}
              publishType={publishType}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
