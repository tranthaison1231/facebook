import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { User } from '@/apis/auth'
import { useOutletContext } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import { Lock, ChevronDown, Smile, GripHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { createPost } from '@/apis/posts'
import { toast } from 'sonner'

const FEATURES = [
  {
    source:
      'https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png?_nc_eui2=AeF-jGfihPr_fbLc9O4xlyeFfK5Z1qDG7FV8rlnWoMbsVfJVClVVFnxKF4rFuOsASuQrHmaUnNQrF0P5onJXH1IX',
    title: 'Ảnh/Videos'
  },
  {
    source:
      'https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/MqTJr_DM3Jg.png?_nc_eui2=AeGmLIzUDsMC7AszMvFErvtyt8fz8ZW9Ebm3x_Pxlb0RuV7yy4SmpsIAqvEXVy8cxvGyv2bfcllWxCfaJgCLJHSZ',
    title: 'Gắn thẻ người khác'
  },
  {
    source:
      'https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/yMDS19UDsWe.png?_nc_eui2=AeFjOHNkuKEyqlj2Q7pqYpfyv2_PAiqLvPK_b88CKou88s_OadvInkH1rxZz-qdt9neYciLNROyQb7_mUvyg80E9',
    title: 'Cảm xúc/hoạt động'
  },
  {
    source:
      'https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/uywzfiZad5N.png?_nc_eui2=AeFiUAVHVmJZLTRvqrlFMoqIzQ4v13Ks4CbNDi_XcqzgJi7MZLaq3TDMsMSJUD4mJqveYb1eE1u05uhsJCf9Cuu2',
    title: 'Check in'
  },
  {
    source:
      'https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/j0Jp-GpONWx.png?_nc_eui2=AeGrehB3C0hyY6O82qN35k2Q_m0K4NvumlT-bQrg2-6aVPUQS4NLUs2p9uH-67fOx8KWWy2dRWzprBSMwEEWAIrL',
    title: 'File GIF'
  }
]

export default function CreatePost() {
  const { me } = useOutletContext<{ me: User }>()
  const [value, setValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  const handleCreatePost = async () => {
    try {
      await createPost({ content: value })
      setIsOpen(false)
      toast.success('Post created successfully!!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
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
        <div className=" flex items-center justify-center p-4 text-3xl font-bold">
          <h3>Tạo Bài viết</h3>
        </div>
        <hr className=" bg-gray-300 "></hr>
        <div className=" grid grid-flow-row gap-1">
          <div className="flex gap-2 p-4">
            <img className="h-10 w-10" src={me?.avatar} alt="" />
            <div>
              <p className="text-base font-bold">
                {me?.firstName} {me?.lastName}
              </p>
              <div className="flex items-center gap-1 rounded-sm bg-gray-200 p-1 px-2 py-1 text-sm font-medium">
                <Lock className="h-4 w-4 " />
                Chỉ mình tôi
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          <Textarea
            className="h-36 w-[500px] border-none p-4 text-2xl outline-none"
            onChange={(e: any) => setValue(e.target.value)}
            placeholder={`${me?.firstName} ${me?.lastName} ơi, Bạn đang nghĩ gì thế?`}
          />

          <div className="flex px-4">
            <img
              src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png"
              height={38}
              width={38}
              alt="Cỡ chữ"
            />
            <Smile className="ml-auto mr-0 h-9 w-9 text-gray-400" />
          </div>
          <div className="grid w-full grid-flow-row px-4 pt-6">
            <div className="mr-4 flex border-solid border-gray-800 p-2">
              <p className="font-primary text-lg">Thêm vào bài viết của bạn</p>
              <ul className="ml-auto mr-0 grid grid-flow-col gap-2">
                {FEATURES.map(item => (
                  <li key={item.title}>
                    <img src={`${item?.source}`} height={24} width={24} alt={`${item?.title}`} />
                  </li>
                ))}
                <GripHorizontal />
              </ul>
            </div>
            <div className="flex items-center justify-center p-4">
              <Button className="h-9 w-full" onClick={handleCreatePost}>
                Đăng
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
