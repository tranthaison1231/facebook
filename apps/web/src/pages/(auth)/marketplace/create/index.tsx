import { Tag, Tags, CircleHelp, X } from 'lucide-react'
import FaceBookIcon from '@/assets/images/facebook-logo.png'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'


function index() {
  const navigate = useNavigate()
  return (
    <div className=' flex'>
       {/* TAO BAI VIET */}
       <section className=" -mt-20 sticky h-screen w-[360px] overflow-x-hidden bg-white px-3 shadow-md">
        <div className='flex mb-2 mt-2 gap-x-3'>
          <Button className=' size-10 bg-[#0006] rounded-full flex justify-center items-center' onClick={() => navigate("/marketplace")}><X className=' text-white size-5'/></Button>
        <Link to={'/'} >
            <img className=" size-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWmwYccpGN_2SFl5JJMSaCdmCGmLyaKEwEVw&s" alt="" />
          </Link>
        </div>
        <hr/>
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
            <div className='  flex items-center justify-center gap-2 '>
                <Link className=' w-40 h-52 rounded-sm py-12 px-4 flex items-center justify-center flex-col gap-y-3  bg-white hover:bg-[#f2f2f2] hover:cursor-pointer' to={'item'} >
                  <div className=' size-16 rounded-full'><img className=' size-16 rounded-full overflow-hidden' src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>
                  <div className=''>
                    <p className=' font-semibold text-sm'>Mặt hàng cần bán</p>
                    <p className=' font-normal text-xs'>Tạo một bài niêm yết duy nhất để bán một hoặc nhiều mặt hàng.</p>
                  </div>
                </Link>
               <Link className=' w-40 h-52 rounded-sm py-12 px-4 flex items-center justify-center flex-col gap-y-3  bg-white hover:bg-[#f2f2f2] hover:cursor-pointer' to={'item'} >
                  <div className=' size-16 rounded-full'><img className=' size-16 rounded-full overflow-hidden' src="https://images.unsplash.com/photo-1586374579358-9d19d632b6df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>
                  <div className=''>
                    <p className=' font-semibold text-sm'>Mặt hàng cần bán</p>
                    <p className=' font-normal text-xs'>Tạo một bài niêm yết duy nhất để bán một hoặc nhiều mặt hàng.</p>
                  </div>
                </Link>
               <Link className=' w-40 h-52 rounded-sm py-12 px-4 flex items-center justify-center flex-col gap-y-3  bg-white hover:bg-[#f2f2f2] hover:cursor-pointer' to={'item'} >
                  <div className=' size-16 rounded-full'><img className=' size-16 rounded-full overflow-hidden' src="https://plus.unsplash.com/premium_photo-1683120968693-9af51578770e?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>
                  <div className=''>
                    <p className=' font-semibold text-sm'>Mặt hàng cần bán</p>
                    <p className=' font-normal text-xs'>Tạo một bài niêm yết duy nhất để bán một hoặc nhiều mặt hàng.</p>
                  </div>
                </Link>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default index