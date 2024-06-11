import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { User } from '@/apis/auth'
import { Link, useOutletContext } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import { Lock, ChevronDown, Smile, GripHorizontal, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { createPost } from '@/apis/posts'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { uploadFile } from '@/apis/upload'

export default function CreatePost() {
  const { me } = useOutletContext<{ me: User }>()
  const [value, setValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const clientQuery = useQueryClient()
  const [isShowImageInput, setIsShowImageInput] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleCreatePost = async () => {
    try {
      const urls = await Promise.all(
        images.map(async image => {
          const formData = new FormData()
          const blob = await fetch(image).then(res => res.blob())

          formData.append('file', blob)

          const data = await uploadFile(formData)
          return data?.data?.url
        })
      )

      await createPost({ content: value, media: urls })
      setIsOpen(false)
      toast.success('Post created successfully!!')
      clientQuery.invalidateQueries({ queryKey: ['posts'] })
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(urls)
    }
  }

  const FEATURES = [
    {
      source:
        'https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png?_nc_eui2=AeF-jGfihPr_fbLc9O4xlyeFfK5Z1qDG7FV8rlnWoMbsVfJVClVVFnxKF4rFuOsASuQrHmaUnNQrF0P5onJXH1IX',
      title: 'Ảnh/Videos',
      onClick: () => {
        setIsShowImageInput(true)
        setImages([])
      }
    },
    {
      source:
        'https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/MqTJr_DM3Jg.png?_nc_eui2=AeGmLIzUDsMC7AszMvFErvtyt8fz8ZW9Ebm3x_Pxlb0RuV7yy4SmpsIAqvEXVy8cxvGyv2bfcllWxCfaJgCLJHSZ',
      title: 'Gắn thẻ người khác',
      onClick: () => {}
    },
    {
      source:
        'https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/yMDS19UDsWe.png?_nc_eui2=AeFjOHNkuKEyqlj2Q7pqYpfyv2_PAiqLvPK_b88CKou88s_OadvInkH1rxZz-qdt9neYciLNROyQb7_mUvyg80E9',
      title: 'Cảm xúc/hoạt động',
      onClick: () => {}
    },
    {
      source:
        'https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/uywzfiZad5N.png?_nc_eui2=AeFiUAVHVmJZLTRvqrlFMoqIzQ4v13Ks4CbNDi_XcqzgJi7MZLaq3TDMsMSJUD4mJqveYb1eE1u05uhsJCf9Cuu2',
      title: 'Check in',
      onClick: () => {}
    },
    {
      source:
        'https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/j0Jp-GpONWx.png?_nc_eui2=AeGrehB3C0hyY6O82qN35k2Q_m0K4NvumlT-bQrg2-6aVPUQS4NLUs2p9uH-67fOx8KWWy2dRWzprBSMwEEWAIrL',
      title: 'File GIF',
      onClick: () => {}
    }
  ]

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
          <div className=" flex items-center justify-center p-4 text-3xl font-bold">
            <h3>Tạo Bài viết</h3>
          </div>
          <hr className=" bg-gray-300 "></hr>
          <div className=" grid grid-flow-row gap-1 p-2">
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
              className="h-36 w-full border-none p-3 text-2xl outline-none focus-visible:ring-0"
              onChange={e => setValue(e.target.value)}
              placeholder={`${me?.firstName} ${me?.lastName} ơi, Bạn đang nghĩ gì thế?`}
            />
            {isShowImageInput && (
              <div className="w-full rounded-lg border p-2">
                <div className="relative flex min-h-48 w-full cursor-pointer items-center justify-center rounded-lg bg-gray-100">
                  <Button
                    onClick={() => setIsShowImageInput(false)}
                    className="absolute right-2 top-2 z-20 size-8 rounded-full bg-white p-0"
                  >
                    <XIcon className="text-black" />
                  </Button>
                  {images.length > 0 ? (
                    <div className="grid h-full grid-cols-2">
                      {images.map((image, index) => (
                        <img key={index} src={image} alt="" className="h-full w-full" />
                      ))}
                    </div>
                  ) : (
                    <>
                      Add photos/video
                      <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
                        onChange={handleUpload}
                      />
                    </>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between rounded-lg bg-gray-100 p-2">
                  <span>Add photo and videos from you mobile device </span>{' '}
                  <Button className="bg-gray-200 text-black"> Add</Button>
                </div>
              </div>
            )}

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
                      <img
                        src={`${item?.source}`}
                        height={24}
                        width={24}
                        alt={`${item?.title}`}
                        onClick={item.onClick}
                        className="cursor-pointer"
                      />
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
    </>
  )
}
