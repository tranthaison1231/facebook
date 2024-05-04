import { Outlet, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProductsById } from '@/apis/products'
import { getSubCategoriesById } from '@/apis/subcategory'

function _layout() {
  const categoryId = useLocation()
  const currentId = categoryId.pathname.split('/').pop()?.trim()
  if (currentId == null) return
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProductsById(currentId)
  })
  console.log('PROBUDTS BY ID', products)

  const {  data: subactegories } = useQuery({
    queryKey: ['subactegories'],
    queryFn: () => getSubCategoriesById(currentId)
  })
  

  return (
    <div>
      {subactegories?.type !== undefined && (
        <div className=" w-full rounded-sm bg-white p-4">
          <h1 className=" text-xl font-bold">Mua sắm theo hạng mục</h1>
          <ul className=" -ml-3 mt-2 flex gap-x-3">
            {subactegories?.map(item => (
              <li className=" rounded-md bg-buttonColor px-3 py-1 text-sm font-semibold">{item.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-[#f0f2f5] p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default _layout
