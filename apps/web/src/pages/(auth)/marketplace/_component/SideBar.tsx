import { fetchCategories } from '@/apis/categories'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { BaggageClaim, Bell, Divide, Mails, Search, Settings, Store } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const SIDE_BAR = [
  {
    name: 'Lướt xem tất cả',
    icon: <Store className=" w-5" />,
    path: ''
  },
  {
    name: 'Thông báo',
    icon: <Bell className=" w-5" />,
    path: 'notifications'
  },
  {
    name: 'Hộp thư',
    icon: <Mails className=" w-5" />,
    path: 'inbox'
  },
  {
    name: 'Đang mua',
    icon: <BaggageClaim className=" w-5" />,
    path: 'you'
  },
  {
    name: 'Bán hàng',
    icon: <Store className=" w-5" />,
    path: 'you/selling'
  }
]
function SideBar() {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const categorySideBar = currentPath.includes('category')

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

  const lowPrice = useRef<HTMLInputElement>(null)
  const highPrice = useRef<HTMLInputElement>(null)

  const [cliked, setClicked] = useState(false)
  return (
    <section className=" sticky left-0 top-0 max-h-screen w-72 shrink-0 bg-white p-3 shadow-md overflow-y-scroll">
      <div className=" mb-2 flex justify-between">
        <h1 className=" text-xl font-bold">MarketPlace</h1>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f2f5] font-bold text-black">
          <Settings />
        </div>
      </div>
      <div className="flex min-w-60 items-center justify-center space-x-1 rounded-full border bg-secondary-foreground p-1">
        <Search />
        <Input
          placeholder="Tìm kiếm trên MarketPlace..."
          className=" border-none bg-transparent text-sm font-normal"
          onKeyDown={onSearch}
          ref={inputRef}

        />
      </div>
      {!categorySideBar && (
        <ul className="mt-2 flex flex-col">
          {SIDE_BAR.map(item => (
            <Link to={`/marketplace/${item.path}`} key={item.name}>
              <li
                key={item.name}
                className={clsx('flex justify-start gap-3 rounded-sm py-2 text-base font-medium hover:bg-[#f0f2f5]', {
                  'bg-[#1877f2]': currentPath === `/${item.path}`
                })}
              >
                <div
                  className={clsx('flex h-8 w-8 items-center justify-center rounded-full bg-[#e4e6eb]', {
                    'bg-[#1877f2]': currentPath === `/${item.path}`
                  })}
                >
                  {item.icon}
                </div>
                <p>{item.name}</p>
              </li>
            </Link>
          ))}
          <Button className=" rounded-[6px] bg-[#ebf5ff] text-[#0866FF]">
            <span>+</span>Tạo bài viết mới
          </Button>
        </ul>
      )}

      <hr className="my-4  w-full bg-[#f0f2f5]" />
      <div>
        <h1 className=" font-semibold">Bộ lọc</h1>
        <p className=" text-xs font-semibold text-[#1877f2]">Thành phố Hồ Chí Minh Trong vòng 65 km</p>
        {categorySideBar && (
          <div>
            <h1>Sắp xếp theo</h1>
            <div>
              <p className=' font-bold text-sm'>Giá</p>
              <div className=' flex justify-between items-center text-sm'>
                <Input
                  placeholder="Thấp nhất"
                  className=" w-24 rounded-[4px] font-semibold bg-[#f0f2f5] p-1 "
                  onKeyDown={onSearch}
                  ref={lowPrice}
                />
                <p className=' text-sm'>đến</p>
                <Input
                  placeholder="Cao nhất"
                  className=" w-24 rounded-[4px] font-semibold bg-[#f0f2f5] p-1 "
                  onKeyDown={onSearch}
                  ref={highPrice}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <hr className="my-4 w-full bg-[#f0f2f5]" />
      <div>
        <h1 className=" text-xl font-bold">Hạng mục</h1>
        <ul className="flex flex-col">
          {categorys?.map(item => (
            <Link to={`/marketplace/category/${item.id}`} key={item.id}>
              <li
                key={item.id}
                className="flex items-center gap-x-1 rounded-sm py-2 text-base font-medium hover:bg-[#f0f2f5]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4e6eb]">
                  <img src={`${item.icon}`} alt={item.name} className=" h-4 w-4 object-cover" />
                </div>
                <p>{item.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SideBar
