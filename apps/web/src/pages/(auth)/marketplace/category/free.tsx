import { fetchCategories } from '@/apis/categories'
import { fetchProducts } from '@/apis/products'
import { formatNumber } from '@/utils/number'

import { useQuery } from '@tanstack/react-query'

import React, { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
function free() {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
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
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts()
  })

 
  return (
    <section className="">
      <h1 className=" mb-8 text-lg font-bold">Lựa chọn hôm nay</h1>
      <div className=" mb-11">
        <ul className=" grid w-full grid-cols-6 gap-x-2 gap-y-6 ">
          {products?.map((item: any) => (
            <li className="overflow-hidden rounded-sm">
              <div className="h-60 w-60">
                <img src={`${item.img}`} alt={item.name} className=" h-full w-full rounded-sm object-cover" />
              </div>
              <div className="mt-1">
                <p className=" text-base font-bold">{formatNumber(item.price) } </p>
                <p className=" text-base font-normal">{item.description} </p>
                <p className=" text-sm font-light">{item.location}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div></div>
    </section>
  )
}

export default free
