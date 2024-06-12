import { getUser, updateMe } from '@/apis/auth'
import { useParams } from '@/router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Pencil, Plus, Camera, Scissors, Clock, Minus } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import AvatarEditor from 'react-avatar-editor'
import { useState, useRef } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { uploadFile } from '@/apis/upload'
import { cn } from '@/utils/cn'

export default function Component() {
  const { id } = useParams('/:id')
  const editor = useRef<AvatarEditor | null>(null)
  const uploadImage = useRef<File | null>(null)
  const [open, setOpen] = useState(false)
  const [avatar, setAvatar] = useState<File | Blob | null>(null)
  const [valueProgess, setValueProgess] = useState(1)
  const clientQuery = useQueryClient()
  const { data: userQuery } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id)
  })

  const handleEditAvatar = () => {
    setAvatar(userQuery?.data?.avatar)
  }
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setAvatar(e.target.files[0])
      uploadImage.current = e.target.files[0]
    }
  }
  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setAvatar(null)
    }
    setOpen(isOpen)
  }

  const handleUploadS3 = async () => {
    if (avatar !== null) {
      try {
        const formData = new FormData()
        const base64 = editor.current!.getImage().toDataURL()
        const res = await fetch(base64)
        const blob = await res.blob()

        formData.append('file', blob)

        const data = await uploadFile(formData)
        await updateMe({ avatar: data?.data?.url })
        setOpen(false)
        clientQuery.refetchQueries({
          queryKey: ['user', id]
        })
      } catch {
        console.log('Error!!!')
      }
    }
  }
  const zoomIn = () => {
    if (valueProgess < 11) {
      setValueProgess(valueProgess + 1)
    }
  }
  const zoomOut = () => {
    if (valueProgess > 1) {
      setValueProgess(valueProgess - 1)
    }
  }
  const handleSliderChange = (value: number[]) => {
    setValueProgess(value[0])
  }
  const handleCutImg = async () => {
    if (avatar == uploadImage.current) {
      const base64 = editor.current!.getImage().toDataURL()
      const res = await fetch(base64)
      const blob = await res.blob()
      setAvatar(blob)
    } else {
      setAvatar(uploadImage.current)
    }
  }

  return (
    <div>
      <div className="px-52">
        <div className="relative ">
          {userQuery?.data?.background !== null ? (
            <img
              className="h-full max-h-96 min-h-80 w-full rounded-b-md object-cover "
              src={userQuery?.data?.background}
              alt=""
            />
          ) : (
            <img
              className="h-full max-h-96 min-h-80 w-full rounded-b-md object-cover "
              src="https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg"
              alt=""
            />
          )}

          <button className="absolute bottom-4 right-6 flex gap-2 rounded border-none bg-white px-3 py-2 font-medium hover:bg-gray-200">
            {' '}
            <Camera />
            Chỉnh sửa ảnh bìa
          </button>
        </div>
        <div className="-mt-8 px-6">
          <div className="flex items-end  gap-4">
            <div className="relative h-44 min-w-44">
              {userQuery?.data?.avatar !== null ? (
                <img
                  className="absolute h-44 w-44 rounded-full border-4 border-white object-cover "
                  src={userQuery?.data?.avatar}
                  alt=""
                />
              ) : (
                <img
                  className="absolute h-44 w-44 rounded-full border-4 border-white object-cover "
                  src="https://tse3.explicit.bing.net/th?id=OIP.xTxu9pXFLyCrsK6ZIl5IMwHaEq&pid=Api&P=0&h=180"
                />
              )}

              <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>
                  <div className=" absolute bottom-0 right-5  w-10 rounded-full bg-gray-300 p-2">
                    <Camera />
                  </div>
                </DialogTrigger>
                <DialogContent className="h-full overflow-scroll sm:max-w-[768px]">
                  <div className="flex w-full items-center justify-center border-b-2 border-gray-200 py-4">
                    <h2 className="text-2xl font-bold">Chọn ảnh đại diện</h2>
                  </div>
                  {avatar !== null && (
                    <div>
                      <div className=" flex flex-col items-center border-b-2 border-gray-200 p-4">
                        <textarea className="w-full p-4" name="" id="" placeholder="Mô tả"></textarea>
                        <div className="flex items-center justify-center">
                          <AvatarEditor
                            image={URL.createObjectURL(avatar)}
                            ref={editor}
                            border={50}
                            color={[255, 255, 255, 0.6]} // RGBA
                            scale={valueProgess}
                            rotate={0}
                            borderRadius={200}
                          />
                        </div>
                        <div className="flex w-[60%] items-center justify-center ">
                          <Minus
                            className={cn('', {
                              'disabled  opacity-40': valueProgess === 0
                            })}
                            onClick={zoomOut}
                          />
                          <Slider onValueChange={handleSliderChange} value={[valueProgess]} max={11} min={1} step={1} />
                          <Plus
                            className={cn('', {
                              'opacity-40': valueProgess === 100
                            })}
                            onClick={zoomIn}
                          />
                        </div>
                        <div className="my-4 flex w-full items-center justify-center gap-2">
                          <button
                            onClick={handleCutImg}
                            className="flex items-center justify-center gap-2 rounded-sm bg-gray-200 p-2"
                          >
                            <Scissors className="h-4 w-4" />
                            Cắt ảnh
                          </button>
                          <button className="flex items-center justify-center gap-2 rounded-sm bg-gray-200 p-2">
                            <Clock className="h-4 w-4" />
                            Để tạm thời
                          </button>
                        </div>
                        <p>
                          Hệ thống cũng sẽ cập nhật ảnh đại diện của bạn cho <span>Phạm ngọc Thắm</span> trên Instagram.
                          <a className="text-blue-500" href="">
                            Quản lý cài đặt đồng bộ
                          </a>
                        </p>
                      </div>
                      <div className=" flex items-center justify-end gap-2 px-4">
                        <button className="text-base font-medium text-blue-800">Hủy</button>
                        <button onClick={handleUploadS3} className="rounded-sm bg-blue-800 px-12 py-2 text-white">
                          Lưu
                        </button>
                      </div>
                    </div>
                  )}
                  {avatar === null && (
                    <div>
                      <div className=" my-4 flex w-full gap-2 px-4 ">
                        <div className="relative  w-full">
                          <label
                            htmlFor="file"
                            className=" z-10 flex w-full items-center justify-center gap-2 rounded-sm bg-blue-200 py-2 text-base font-medium text-blue-500"
                          >
                            <Plus /> Tải ảnh lên
                            <input
                              onChange={handleUploadImage}
                              id="file"
                              className=" absolute -z-10 h-full w-full rounded-sm "
                              type="file"
                            />
                          </label>
                        </div>
                        <button className="w-full rounded-sm bg-gray-200 py-2 text-base font-medium">
                          Thêm Khung{' '}
                        </button>
                        <button onClick={handleEditAvatar} className="rounded-sm bg-gray-200 px-4 py-2">
                          <Pencil />
                        </button>
                      </div>
                      <div className="h-96 w-full overflow-scroll">
                        <div className="px-4">
                          <h3 className="text-lg font-medium">Ảnh gợi ý</h3>
                          <div className="my-4 grid grid-cols-6 gap-2">
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                          </div>
                          <button className="my-2 flex w-full items-center justify-center bg-gray-200  py-2">
                            Xem thêm
                          </button>
                        </div>
                        <div className="px-4">
                          <h3 className="text-lg font-medium">Ảnh có mặt bạn</h3>
                          <div className="my-4 grid grid-cols-6 gap-2">
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                          </div>
                          <button className="my-2 flex w-full items-center justify-center bg-gray-200  py-2">
                            Xem thêm
                          </button>
                        </div>
                        <div className="px-4">
                          <h3 className="text-lg font-medium">Ảnh đại diện</h3>
                          <div className="my-4 grid grid-cols-6 gap-2">
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="px-4">
                          <h3 className="text-lg font-medium">Ảnh của bạn và Hồ quốc phát</h3>
                          <div className="my-4 grid grid-cols-6 gap-2">
                            <img
                              className="min-h-20 object-cover"
                              src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex w-full items-end justify-between gap-4 pb-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold">
                  {userQuery?.data?.firstName} {userQuery?.data?.lastName}
                </h2>
                <p className="font-medium text-gray-500">626 bạn bè</p>
                <div>
                  <img className="h-10 w-10 rounded-full border-2 border-white" src={userQuery?.data?.avatar} alt="" />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex gap-1 rounded bg-blue-700 p-2 text-white">
                  {' '}
                  <Plus /> Thêm vào tin
                </button>
                <button className="flex gap-1 rounded bg-gray-300 p-2">
                  {' '}
                  <Pencil /> Chỉnh sửa trang cá nhân
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 h-px w-full bg-gray-300"></div>
        </div>

        <div className="flex items-center justify-between px-6">
          <div className="mt-2">
            <ul className="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="active bg-white-300 inline-block  border-b-2 border-blue-500 p-4 text-base text-blue-600 dark:bg-gray-800 dark:text-blue-500"
                >
                  Bài viết
                </a>
              </li>
              <li>
                <Link
                  to={`/${id}/about`}
                  className="inline-block  rounded p-4 text-base hover:bg-gray-300 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  to={`/${id}/friends`}
                  className="inline-block rounded p-4 text-base hover:bg-gray-300 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                >
                  Bạn bè
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-block rounded p-4 text-base hover:bg-gray-300 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                >
                  Ảnh
                </a>
              </li>
              <li>
                <a className="inline-block rounded p-4 text-base hover:bg-gray-300 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                  Video
                </a>
              </li>
              <li>
                <a className="inline-block rounded p-4 text-base hover:bg-gray-300 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                  Checkin
                </a>
              </li>
              <li>
                <a className="inline-block rounded p-4 text-base hover:bg-gray-300 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                  Xem thêm
                </a>
              </li>
            </ul>
          </div>
          <div className="cursor-pointer rounded bg-gray-200 px-3 py-2 hover:bg-gray-300">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              className="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
            >
              <circle cx="12" cy="12" r="2.5"></circle>
              <circle cx="19.5" cy="12" r="2.5"></circle>
              <circle cx="4.5" cy="12" r="2.5"></circle>
            </svg>
          </div>
        </div>
      </div>
      <div className="  h-full w-full  bg-gray-200 px-52 pt-4 ">
        <Outlet />
      </div>
    </div>
  )
}
