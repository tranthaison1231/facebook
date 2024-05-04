import { fetchCategories } from '@/apis/categories'
import { fetchProducts } from '@/apis/products'
import { formatNumber } from '@/utils/number'

import { useQuery } from '@tanstack/react-query'

function Marketplace() {
  const { data: categories } = useQuery({
    queryKey: ['category'],
    queryFn: () => fetchCategories()
  })
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts()
  })

  return (
    <div className=" ">
      <section className="">
        <h1 className=" mb-8 text-lg font-bold">Lựa chọn hôm nay</h1>
        <div className=" mb-11">
          <ul className=" grid w-full grid-cols-6 gap-x-2 gap-y-6 ">
            {products?.map(item => (
              <li className="overflow-hidden rounded-sm">
                <div className="h-60 w-60">
                  <img src={`${item.img}`} alt={item.name} className=" h-full w-full rounded-sm object-cover" />
                </div>
                <div className="">
                  <p className=" text-base font-bold">{formatNumber(item.price)}</p>
                  <p className=" text-base font-normal">{item.description} </p>
                  <p className=" text-sm font-light">{item.location}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {categories?.map(category => (
            <div className=" mb-5">
              <hr className=" border-[1px] border-slate-300" />
              <div key={category.id}>
                <div className=" my-5 flex gap-x-32">
                  <p className=" text-lg font-bold">Được tài trợ</p>
                  <p className=" text-lg font-bold">{category.name}</p>
                </div>
                <ul className=" grid w-full grid-cols-6 gap-x-2 gap-y-2 ">
                  {products
                    ?.filter(product => product.categoryId === category.id)
                    .map(item => (
                      <li className="overflow-hidden rounded-sm">
                        <div>
                          <img src={`${item.img}`} alt={item.name} className="h-60 w-60 rounded-sm" />
                        </div>
                        <div className="">
                          <p className=" text-base font-bold">{formatNumber(item.price)} </p>
                          <p className=" text-base font-normal">{item.description} </p>
                          <p className=" text-sm font-light">{item.location}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Marketplace
