import { fetchCategories } from '@/apis/categories'
import { fetchProducts } from '@/apis/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { BaggageClaim, Bell, Mails, Search, Settings, Store } from 'lucide-react'
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
function LeftSideBar() {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  console.log('result is', currentPath.includes('inbox'))

  const inputRef = useRef<HTMLInputElement>(null)
  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search/?q=${inputRef.current?.value}`)
    }
  }
  const { data: categories } = useQuery({
    queryKey: ['category'],
    queryFn: () => fetchCategories()
  })
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts()
  })
  const [cliked, setClicked] = useState(false)
  console.log(categories);
  

  return (
    <section className=" sticky top-[73.6px] left-0 h-screen w-[360px] overflow-x-hidden bg-white px-3 shadow-md">
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
          className=" border-none bg-transparent p-1 "
          onKeyDown={onSearch}
          ref={inputRef}
        />
      </div>

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
                  'bg-[#1877f2] ': currentPath.includes(item.path)
                })}
              >
                {item.icon}
              </div>
              <p>{item.name}</p>
            </li>
          </Link>
        ))}
        <Button className=" rounded-[6px] bg-[#ebf5ff] text-[#0866FF]">
          <Link to="/marketplace/create">
            <span>+</span>Tạo bài viết mới
          </Link>
        </Button>
      </ul>

      <hr className="my-4  w-full bg-[#f0f2f5]" />
      <div>
        <h1 className=" font-semibold">Bộ lọc</h1>
        <p className=" text-xs font-semibold text-[#1877f2]">Thành phố Hồ Chí Minh Trong vòng 65 km</p>
      </div>
      <hr className="my-4 w-full bg-[#f0f2f5]" />
      <div>
        <h1 className=" text-xl font-bold">Hạng mục</h1>
        <ul className="flex flex-col">
          {categories?.map(item => (
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

export default LeftSideBar
