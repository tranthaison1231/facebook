import { Tag, Tags, CircleHelp } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MarketPlaceCreate() {
  return (
    <div className="flex">
      <section className="sticky h-screen w-[360px] overflow-x-hidden bg-white px-3 shadow-md">
        <hr />
        <div className="mb-2 flex justify-between">
          <h1 className="text-base font-bold">Tạo bài niêm yết mới</h1>
        </div>
        <p className="flex items-center gap-1 bg-[#f0f2f5] px-2 py-3 text-left text-xs font-medium text-black">
          <div className="rounded-full bg-[#1877f2] p-1">
            <Tag className="h-5 w-5 text-white" />
          </div>
          <p>Chọn loại bài niêm yết</p>
        </p>
        <hr />
        <ul className="mt-2 flex flex-col">
          <Link to={`/marketplace/you/selling`} key="selling">
            <li key={''} className="flex justify-start gap-3 rounded-sm py-2 text-base font-medium hover:bg-[#f0f2f5]">
              <div className="rounded-full bg-[#1877f2]/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4e6eb]">
                  <Tags className="h-5 w-5 object-cover" />
                </div>
              </div>
              <p className="text-base">Bài niêm yết của bạn</p>
            </li>
          </Link>
          <Link to={`/marketplace/you/selling`} key="selling">
            <li key={''} className="flex justify-start gap-3 rounded-sm py-2 text-base font-medium hover:bg-[#f0f2f5]">
              <div className="rounded-full bg-[#1877f2]/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4e6eb]">
                  <CircleHelp className="h-5 w-5 object-cover" />
                </div>
              </div>
              <p className="text-base">Trợ giúp người bán</p>
            </li>
          </Link>
        </ul>
      </section>
      <div className="flex w-full items-center justify-center">
        <div className="">
          <h1 className="mb-2 text-lg font-bold">Chọn loại bài niêm yết</h1>
          <div className="flex items-center justify-center gap-2">
            <Link
              className="flex h-52 w-40 flex-col items-center justify-center gap-y-3 rounded-sm bg-white px-4 py-12 hover:cursor-pointer hover:bg-[#f2f2f2]"
              to={'item'}
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
              to={'item'}
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
              to={'item'}
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
