import { fetchProductsByCategoryId } from '@/apis/products'
import { fetchSubCategoriesByCategoryId } from '@/apis/categories'
import { useParams } from '@/router'
import { formatNumber } from '@/utils/number'

import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

function Component() {
  const { id: categoryId } = useParams('/marketplace/category/:id')

  const { data: products } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => fetchProductsByCategoryId(categoryId)
  })

  const { data: subCategories } = useQuery({
    queryKey: ['subCategories', categoryId],
    queryFn: () => fetchSubCategoriesByCategoryId(categoryId)
  })

  return (
    <section className="bg-[#f0f2f5] p-8">
      {!!subCategories?.length && (
        <div className=" w-full rounded-sm bg-white p-4">
          <h1 className=" text-xl font-bold">Mua sắm theo hạng mục</h1>
          <ul className=" -ml-3 mt-2 flex gap-x-3">
            {subCategories?.map(subCategory => (
              <Link
                className=" rounded-md bg-buttonColor px-3 py-1 text-sm font-semibold"
                key={subCategory.id}
                to={`/marketplace/category/${subCategory.id}`}
              >
                {subCategory.name}
              </Link>
            ))}
          </ul>
        </div>
      )}

      <div className=" mb-11">
        <ul className=" grid w-full grid-cols-6 gap-x-2 gap-y-6 ">
          {products?.map((product: any) => (
            <li className="overflow-hidden rounded-sm">
              <div className="h-60 w-60">
                <img
                  src={`${JSON.parse(product.images)?.[0]}`}
                  alt={product.name}
                  className=" h-full w-full rounded-sm object-cover"
                />
              </div>
              <div className="mt-1">
                <p className=" text-base font-bold">{formatNumber(product.price ?? 0)} </p>
                <p className=" text-base font-normal">{product.description} </p>
                <p className=" text-sm font-light">{product.location}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Component
