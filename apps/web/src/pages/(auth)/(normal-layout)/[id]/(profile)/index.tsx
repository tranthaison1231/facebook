import { getUser } from '@/apis/auth'
import { fetchPostsByUserId } from '@/apis/posts'
import { useParams } from '@/router'
import { useQuery } from '@tanstack/react-query'
import { Settings, Settings2, Text, Grid2X2 } from 'lucide-react'

export default function Component() {
  const { id } = useParams('/:id')
  const { data: userQuery } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id)
  })

  const { data: postsQuery } = useQuery({
    queryKey: ['users', id, 'posts'],
    queryFn: () => fetchPostsByUserId(id)
  })

  console.log(postsQuery?.data)
  return (
    <div className="flex gap-4 px-6">
      <div className="max-w-80 ">
        <div className=" w-full rounded bg-white p-4">
          <h3 className="text-xl font-bold">Giới thiệu</h3>
          <button className="my-4 w-full items-center rounded bg-gray-200 py-1 font-medium hover:bg-gray-300">
            Thêm tiểu sử
          </button>
          <div>
            <div className="flex items-center gap-2">
              <img className="opacity-40" src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png" alt="" />
              <p>
                Làm việc tại <i className=" font-medium not-italic ">{userQuery?.data?.workAt}</i>
              </p>
            </div>
            <div className="my-3 flex items-center gap-2">
              <img className="opacity-40" src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png" alt="" />
              <p>
                Từng học tại <i className=" font-medium not-italic ">{userQuery?.data?.school}</i>
              </p>
            </div>
            <div className="my-3 flex items-center gap-2">
              <img className="opacity-40" src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png" alt="" />
              <p>
                Sống tại <i className=" font-medium not-italic ">{userQuery?.data?.address}</i>
              </p>
            </div>
            <div className="flex items-center gap-2">
              {' '}
              <img className="opacity-40" src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/S0aTxIHuoYO.png" alt="" />
              <p>Độc thân</p>
            </div>
          </div>
          <button className="my-4 w-full items-center rounded bg-gray-200 py-1 font-medium hover:bg-gray-300">
            Chỉnh sửa liên kết
          </button>
          <button className=" w-full items-center rounded bg-gray-200 py-1 font-medium hover:bg-gray-300">
            Thêm nội dung đáng chú ý{' '}
          </button>
        </div>
        <div className=" mt-4 w-full rounded bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Ảnh</h3>
            <p className="rounded p-2 text-blue-500 hover:bg-gray-200">Xem tất cả ảnh</p>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1 rounded-sm">
            <img
              className="h-full  min-h-28 w-full max-w-36 rounded-tl-md"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full max-w-36"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full max-w-36 rounded-tr-md"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full max-w-36"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full max-w-36"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full max-w-36"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full max-w-36 rounded-bl-md"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="h-full min-h-28 w-full max-w-36"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
            <img
              className="min -h-28 h-full w-full max-w-36 rounded-br-md"
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
              alt=""
            />
          </div>
        </div>
        <div className=" mt-4 w-full rounded bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Bạn Bè</h3>
            <p className="rounded p-2 text-blue-500 hover:bg-gray-200">Xem tất cả bạn bè</p>
          </div>
          <p className="font-normal text-gray-500">627 người bạn</p>
          <div className="mt-2 grid grid-cols-3 gap-2 rounded-sm">
            <div className="h-full min-h-28 w-full max-w-36">
              <img
                className="min-h-28 rounded-sm"
                src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
                alt=""
              />
              <p className="mt-1 text-sm font-medium"> Chí Trung</p>
            </div>
            <div>
              <img
                className="min-h-28 rounded-sm"
                src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
                alt=""
              />
              <p className="mt-1 text-sm font-medium"> Chí Trung</p>
            </div>
            <div>
              <img
                className="min-h-28 rounded-sm"
                src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
                alt=""
              />
              <p className="mt-1 text-sm font-medium"> Chí Trung</p>
            </div>
            <div>
              <img
                className="min-h-28 rounded-sm"
                src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
                alt=""
              />
              <p className="mt-1 text-sm font-medium"> Chí Trung</p>
            </div>
            <div>
              <img
                className="min-h-28 rounded-sm"
                src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
                alt=""
              />
              <p className="mt-1 text-sm font-medium"> Chí Trung</p>
            </div>
            <div>
              <img
                className="min-h-28 rounded-sm"
                src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
                alt=""
              />
              <p className="mt-1 text-sm font-medium"> Chí Trung</p>
            </div>
            <div>
              <img
                className="min-h-28 rounded-sm"
                src="https://scontent.fdad1-4.fna.fbcdn.net/v/t31.18172-8/22050991_1955936507979322_7297608177679054681_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bbgMtlKJwi0AX9iLOi2&_nc_ht=scontent.fdad1-4.fna&oh=00_AfCjnrKjVRH3wEg5-OI1GcJIWLrC6yeIZik_tKdnmFmwPQ&oe=6614EBF1"
                alt=""
              />
              <p className="mt-1 text-sm font-medium"> Chí Trung</p>
            </div>
          </div>
        </div>
        <div
          className="
            mt-2 flex flex-wrap items-center text-sm text-gray-600  "
        >
          <span className="cursor-pointer text-sm text-gray-600 hover:underline ">Quyền riêng tư</span>
          <span className="-translate-y-1 px-1 text-gray-600">.</span>
          <span className="cursor-pointer text-sm  text-gray-600 hover:underline ">Điều khoản</span>
          <span className="-translate-y-1 px-1 text-gray-600">.</span>
          <span className="cursor-pointer text-sm  text-gray-600 hover:underline ">Quảng cáo</span>
          <span className="-translate-y-1 px-1 text-gray-600">.</span>
          <span className="cursor-pointerhover:underline  text-sm text-gray-600 ">Lựa chọn quảng cáo</span>
          <span className="-translate-y-1 px-1 text-gray-600">.</span>
          <span className="cursor-pointer text-sm  text-gray-600 hover:underline ">Cookie</span>
          <span className="-translate-y-1 px-1 text-gray-600">.</span>
          <span className="cursor-pointer text-sm  text-gray-600 hover:underline ">Xem thêm</span>
          <span className="-translate-y-1 px-1 text-gray-600">.</span>
          Meta © 2024
        </div>
      </div>
      <div className="w-full ">
        <div className=" rounded bg-white p-4">
          <div className="flex  gap-2">
            <img className="h-10 w-10 cursor-pointer rounded-full" src={userQuery?.data?.avatar} alt="" />
            <button className="flex  w-full items-center justify-start rounded-3xl bg-gray-200 px-4 font-normal text-gray-500 hover:bg-gray-300">
              Bạn đang nghỉ gì?
            </button>
          </div>
          <div className=" mt-4 h-px w-full bg-gray-300 "></div>
          <div className="mt-2 flex justify-around">
            <button className="flex w-full items-center justify-center gap-2 rounded p-2 text-base font-medium text-gray-500 hover:bg-gray-200">
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png" alt="" />
              Video trực tiếp
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded px-3 py-2 text-base font-medium  text-gray-500  hover:bg-gray-200">
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" alt="" />
              Ảnh/video
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded p-2 text-base font-medium   text-gray-500 hover:bg-gray-200">
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/pkbalDbTOVI.png" alt="" />
              Sự kiện trong đời
            </button>
          </div>
        </div>
        <div className=" mt-4 rounded bg-white  ">
          <div className="flex items-center justify-between px-4 py-2 ">
            <h3 className="text-xl font-bold">Bài viết</h3>
            <div className="flex items-center gap-2">
              <button className="flex gap-2  rounded bg-gray-200 p-2 font-medium hover:bg-gray-300">
                {' '}
                <Settings2 />
                Bộ Lọc{' '}
              </button>
              <button className="flex gap-2  rounded bg-gray-200 p-2 font-medium hover:bg-gray-300">
                {' '}
                <Settings />
                Quản lý bài viết
              </button>
            </div>
          </div>
          <div className=" mt-2 h-px w-full bg-gray-300 "></div>
          <div className="px-4">
            <ul className="flex  border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <li className="active bg-white-300 inline-block flex w-2/4 w-full items-center justify-center gap-1  border-b-2 border-blue-500 p-2 text-base text-blue-600 dark:bg-gray-800 dark:text-blue-500">
                <Text />
                Xem theo danh sách
              </li>
              <li className=" bg-white-300 inline-block flex w-2/4 w-full items-center justify-center gap-1   rounded p-2 text-base  hover:bg-gray-300 dark:bg-gray-800 ">
                <Grid2X2 />
                Chế độ xem lưới
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
