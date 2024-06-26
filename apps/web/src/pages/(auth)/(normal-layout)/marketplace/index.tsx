import { fetchCategories } from '@/apis/categories'
import { fetchProducts } from '@/apis/products'

import { useQuery } from '@tanstack/react-query'
import React, { useRef } from 'react'
import {  useNavigate } from 'react-router-dom'
import LeftSideBar from './_component/LeftSideBar'



function Marketplace() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search/?q=${inputRef.current?.value}`)
    }
  }
  const { data: categorys } = useQuery({
    queryKey: ['category'],
    queryFn: () => fetchCategories()
  })
  const {data: products} = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts()
  })
  console.log("PRODUCTS",products);
  
  

  return (
    <div className=''>
     
      {/* ============== CONTENT ============= */}
      <section className=" w-full p-8 bg-[#f0f2f5]">
        <h1 className=' font-bold text-lg mb-8'>Lựa chọn hôm nay</h1>
       <div className=' mb-11'>
            <ul className=' grid grid-cols-6 gap-x-2 gap-y-6 w-full '>
              {products?.map((item)=>(
                <li className='rounded-sm overflow-hidden'>
                    <div ><img src={`${item.images[0]}`} alt={item.name} className='w-60 h-60 rounded-sm' /></div>
                    <div className=' px-1'>
                      <p className=' font-bold text-base'>{item.price == 0 ? 'Miễn phí' :`${item.price} đ` } </p>
                      <p className=' font-normal text-base'>{item.description} </p>
                      <p  className=' font-light text-sm'>{item.location}</p>
                    </div>
                </li>
              )
              )}
            </ul>
       </div>
       
       <div>
      {categorys?.map((category) => (
        <div className=' mb-5'>
          <hr className=" border-[1px] border-slate-300"/>
          <div key={category.id}>
          <div className=' flex gap-x-32 my-5'>
            <p className=' font-bold text-lg'>Được tài trợ</p>
            <p className=' font-bold text-lg'>{category.name}</p>
          </div>
          <ul className=' grid grid-cols-6 gap-x-2 gap-y-2 w-full '>
            {products?.filter((product) => product.categoryId === category.id).map((item) => (
              <li className='rounded-sm overflow-hidden'>
              <div ><img src={`${item.images[0]}`} alt={item.name} className='w-60 h-60 rounded-sm' /></div>
              <div className=''>
                <p className=' font-bold text-base'>{item.price == 0 ? 'Miễn phí' :(`${item.price}`)} </p>
                <p className=' font-normal text-base'>{item.description} </p>
                <p  className=' font-light text-sm'>{item.location}</p>
              </div>
          </li>
            ))}
          </ul>
        </div></div>

      ))}
    </div>
       
      </section>
     
    </div>
   
  )
}

export default Marketplace
