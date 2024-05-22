import { Tag, Tags, CircleHelp } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function index() {
  return (
    <div className=' flex'>
       {/* TAO BAI VIET */}
       <section className=" sticky left-0 top-0 max-h-max w-72 shrink-0 bg-white p-3 shadow-md">
        <div className=" mb-2 flex justify-between">
          <h1 className=" text-base font-bold">Tạo bài niêm yết mới</h1>
        </div>
        <p className=" flex gap-1 bg-[#f0f2f5] px-2 py-3 text-left text-xs font-medium text-black items-center">
          <div className=' rounded-full bg-[#1877f2] p-1'>
            <Tag className=' text-white w-5 h-5'/>
          </div>
          <p>Chọn loại bài niêm yết</p>
        </p>
        <hr />
        <ul className="mt-2 flex flex-col">
          <Link to={`/marketplace/you/selling`} key="selling">
            <li key={''} className="flex justify-start gap-3 rounded-sm py-2 text-base font-medium hover:bg-[#f0f2f5]">
              <div className="rounded-full bg-[#1877f2]/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4e6eb]">
                  <Tags className=" h-5 w-5 object-cover" />
                </div>
              </div>
              <p className=' text-base'>Bài niêm yết của bạn</p>
            </li>
          </Link>
          <Link to={`/marketplace/you/selling`} key="selling">
            <li key={''} className="flex justify-start gap-3 rounded-sm py-2 text-base font-medium hover:bg-[#f0f2f5]">
              <div className="rounded-full bg-[#1877f2]/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4e6eb]">
                  <CircleHelp className=" h-5 w-5 object-cover" />
                </div>
              </div>
              <p className=' text-base'>Trợ giúp người bán</p>
            </li>
          </Link>
        </ul>
     
      </section>
      <div className=' w-full flex items-center justify-center'>
        <div className=''>
            <h1 className=' font-bold text-lg mb-2'>Chọn loại bài niêm yết</h1>
            <div className=' flex gap-2'>
                <Link className=' w-40 h-56 rounded-sm p-4  bg-white hover:bg-[#f2f2f2] hover:cursor-pointer' to={'item'} >
                  <div className=' w-full h-28 overflow-hidden'><img className=' w-full h-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfHNI8xj7t4nedP6KO0YmC8Ng1FU0Y6cMb9xqa9po1yQ&s" alt="" /></div>
                  <div className=''>
                    <p className=' font-semibold text-sm'>Mặt hàng cần bán</p>
                    <p className=' font-light text-xs'>Tạo một bài niêm yết duy nhất để bán một hoặc nhiều mặt hàng.</p>
                  </div>
                </Link>
                <button className=' w-40 h-56 rounded-sm p-4  bg-white hover:bg-[#f2f2f2] hover:cursor-pointer'>
                  <div className=' w-full h-28 overflow-hidden'><img className=' w-full h-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfHNI8xj7t4nedP6KO0YmC8Ng1FU0Y6cMb9xqa9po1yQ&s" alt="" /></div>
                  <div className=''>
                    <p className=' font-semibold text-sm'>Mặt hàng cần bán</p>
                    <p className=' font-light text-xs'>Tạo một bài niêm yết duy nhất để bán một hoặc nhiều mặt hàng.</p>
                  </div>
                </button>
                <button className=' w-40 h-56 rounded-sm p-4  bg-white hover:bg-[#f2f2f2] hover:cursor-pointer'>
                  <div className=' w-full h-28 overflow-hidden'><img className=' w-full h-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfHNI8xj7t4nedP6KO0YmC8Ng1FU0Y6cMb9xqa9po1yQ&s" alt="" /></div>
                  <div className=''>
                    <p className=' font-semibold text-sm'>Mặt hàng cần bán</p>
                    <p className=' font-light text-xs'>Tạo một bài niêm yết duy nhất để bán một hoặc nhiều mặt hàng.</p>
                  </div>
                </button>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default index