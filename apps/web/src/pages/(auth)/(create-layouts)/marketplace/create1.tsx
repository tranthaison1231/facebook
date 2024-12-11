import { Link } from 'react-router-dom'
import MPSideBar from './create/_components/MPSideBar'

export default function MarketPlaceCreate() {
  return (
    <div className="flex">
      <div className='h-[calc(100vh-4.6rem)] w-90 border bg-white '>
        <MPSideBar/>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="">
          <h1 className="mb-2 text-lg font-bold">Chọn loại bài niêm yết</h1>
          <div className="flex items-center justify-center gap-2">
            <Link
          
              className="flex h-52 w-40 flex-col items-center justify-center gap-y-3 rounded-sm bg-white px-4 py-12 hover:cursor-pointer hover:bg-[#f2f2f2]"
              to={'/marketplace/create/item'}
            >
              <div className="size-16 rounded-full">
                <img
                  className="size-16 overflow-hidden rounded-full"
                  src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="">
                <p className="text-sm font-semibold">Mặt hàng cần bán</p>
                <p className="text-xs font-normal">Tạo một bài niêm yết duy nhất để bán một hoặc nhiều mặt hàng.</p>
              </div>
            </Link>
            <Link
              className="flex h-52 w-40 flex-col items-center justify-center gap-y-3 rounded-sm bg-white px-4 py-12 hover:cursor-pointer hover:bg-[#f2f2f2]"
              to={'/item'}
            >
              <div className="size-16 rounded-full">
                <img
                  className="size-16 overflow-hidden rounded-full"
                  src="https://images.unsplash.com/photo-1586374579358-9d19d632b6df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="">
                <p className="text-sm font-semibold">Mặt hàng cần bán</p>
                <p className="text-xs font-normal">Tạo một bài niêm yết duy nhất để bán một hoặc nhiều mặt hàng.</p>
              </div>
            </Link>
            <Link
              className="flex h-52 w-40 flex-col items-center justify-center gap-y-3 rounded-sm bg-white px-4 py-12 hover:cursor-pointer hover:bg-[#f2f2f2]"
              to={'/item'}
            >
              <div className="size-16 rounded-full">
                <img
                  className="size-16 overflow-hidden rounded-full"
                  src="https://plus.unsplash.com/premium_photo-1683120968693-9af51578770e?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="">
                <p className="text-sm font-semibold">Mặt hàng cần bán</p>
                <p className="text-xs font-normal">Tạo một bài niêm yết duy nhất để bán một hoặc nhiều mặt hàng.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
