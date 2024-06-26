import { CircleHelp,  Tag, Tags } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function MPSideBar() {
  return (
    <section className="sticky h-screen w-90 overflow-x-hidden bg-white px-3 shadow-md">
        <hr />
        <div className="mb-2 flex justify-between">
        <h1 className="text-base font-bold">Tạo bài niêm yết mới</h1>
        </div>
        <div className="flex items-center gap-1 bg-[#f0f2f5] px-2 py-3 text-left text-xs font-medium text-black">
        <div className="rounded-full bg-[#1877f2] p-1">
            <Tag className="h-5 w-5 text-white" />
        </div>
        <p>Chọn loại bài niêm yết</p>
        </div>
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
  )
}

export default MPSideBar