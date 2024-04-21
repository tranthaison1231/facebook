import { fetchCategories } from '@/apis/categories'
import { fetchProducts } from '@/apis/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { ChevronDown, Search, Settings } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
function SideBar() {
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
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts()
  })
  const [cliked, setClicked] = useState(false)
  return (
    <section className=" sticky top-[80px] max-h-screen max-w-72 bg-white px-3 shadow-md hover:overflow-scroll">
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
        {/* TRUYEN DU LIEU VAO DAY */}
        <Button className=" rounded-[6px] bg-[#ebf5ff] text-[#0866FF]">
          <span>+</span>Tạo bài viết mới
        </Button>
      </ul>

      <hr className="my-4  w-full bg-[#f0f2f5]" />
      <div>
        <h1 className=" font-semibold">Bộ lọc</h1>
        <p className=" text-xs font-semibold text-[#1877f2]">Thành phố Hồ Chí Minh Trong vòng 65 km</p>
        <div className=" flex justify-between" onClick={() => setClicked(!cliked)}>
          <p className=" text-base font-semibold">Sắp xếp theo</p>
          <ChevronDown />
        </div>
        {cliked && (
          <div>
            <form>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Option One</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Option Two</Label>
                </div>
              </RadioGroup>
            </form>
          </div>
        )}
      </div>
      <hr className="my-4 w-full bg-[#f0f2f5]" />
      <div>
        <h1 className=" text-xl font-bold">Hạng mục</h1>
        <ul className="flex flex-col">
          {categorys?.map(item => (
            <Link to={`/marketplace/category/${item.path}`} key={item.id}>
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
