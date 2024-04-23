import { fetchCategories } from '@/apis/categories'
import { fetchProducts } from '@/apis/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { BaggageClaim, Bell, Mails, Search, Settings, Store } from 'lucide-react'
import React, { useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const SIDE_BAR = [
  {
    name: 'Lướt xem tất cả',
    icon: <Store className=" w-5" />,
    path: '/'
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

function Marketplace() {
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
  const {data: products} = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts()
  })
  console.log(products);
  
  function formatNumber(num: number) {
    // Check if the input is a number
    if (typeof num !== 'number') {
      throw new Error('Input must be a number');
    }
  
    // Convert the number to a string
    const str = num.toString();
  
    // Add commas for thousands separation
    const formattedStr = str.replace(/(\d)(?=(\d{3})+$)/g, '$1.');
  
    return formattedStr;
  }

  return (
    <div className=" flex justify-center">
      {/* ============== SIDEBAR ============= */}
      <section className=" sticky top-[80px] min-w-72 bg-white px-3 shadow-md max-h-screen hover:overflow-scroll">
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

        <hr className="my-4  w-full bg-[#f0f2f5]" />
        <div>
          <h1 className=" font-semibold">Bộ lọc</h1>
          <p className=" text-xs font-semibold text-[#1877f2]">Thành phố Hồ Chí Minh Trong vòng 65 km</p>
        </div>
        <hr className="my-4 w-full bg-[#f0f2f5]" />
        <div>
          <h1 className=" text-xl font-bold">Hạng mục</h1>
          <ul className="flex flex-col">
            {categorys?.map(item => (
              <Link to={`/marketplace/category/${item.path}`} key={item.id}>
              <li key={item.id} className="flex items-center gap-x-1 py-2 rounded-sm text-base font-medium hover:bg-[#f0f2f5]">
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#e4e6eb]'>
                  <img src={`${item.icon}`} alt={item.name} className=" w-4 h-4 object-cover" />
                </div>
                <p>{item.name}</p>
              </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>

      {/* ============== CONTENT ============= */}
      <section className=" w-full p-8 bg-[#f0f2f5]">
        <h1 className=' font-bold text-lg mb-8'>Lựa chọn hôm nay</h1>
       <div className=' mb-11'>
            <ul className=' grid grid-cols-6 gap-x-2 gap-y-6 w-full '>
              {products?.map((item)=>(
                <li className='rounded-sm overflow-hidden'>
                    <div ><img src={`${item.img}`} alt={item.name} className='w-60 h-60 rounded-sm' /></div>
                    <div className=''>
                      <p className=' font-bold text-base'>{formatNumber(item.price)} đ</p>
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
              <div ><img src={`${item.img}`} alt={item.name} className='w-60 h-60 rounded-sm' /></div>
              <div className=''>
                <p className=' font-bold text-base'>{formatNumber(item.price)} đ</p>
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
