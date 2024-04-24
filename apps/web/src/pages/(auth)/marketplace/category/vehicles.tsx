import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from '@/router'

function Vehicles() {
 
  
  return (
    <div>
        {/* =============== SIDEBAR =============== */}
        <section className=' w-full bg-[#f0f2f5]'>
            {/* =============== MUA THEO HANG MUC =============== */}
            <div className=' bg-white p-4 rounded-md'>
              <h1 className=' font-bold text-lg mb-2'>Mua sắm theo hạng mục</h1>
              <ul className=' flex gap-x-2'>
                <li className=' bg-[#e4e6eb] rounded-2xl font-medium p-2 text-xs'>Tàu thuyền</li>
                <li className=' bg-[#e4e6eb] rounded-2xl font-medium p-2 text-xs'>Xe hơi</li>
                <li className=' bg-[#e4e6eb] rounded-2xl font-medium p-2 text-xs'>Xe mô tô</li>
                <li className=' bg-[#e4e6eb] rounded-2xl font-medium p-2 text-xs'>Xe phân phối lớn</li>
                <li className=' bg-[#e4e6eb] rounded-2xl font-medium p-2 text-xs'>Xe móc</li>
                <li className=' bg-[#e4e6eb] rounded-2xl font-medium p-2 text-xs'>Xe tải</li>
                <li className=' bg-[#e4e6eb] rounded-2xl font-medium p-2 text-xs'>Xe lưu động</li>
              </ul>
            </div>
            {/* =============== SAN PHAM =============== */}
            <div>
              
            </div>
        </section>
    </div>
  )
}

export default Vehicles