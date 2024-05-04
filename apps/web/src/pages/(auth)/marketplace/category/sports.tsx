
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProductsById } from '@/apis/products'
import { formatNumber } from '@/utils/number';



function sports() {
   const categoryId = useLocation();
   const currentId = categoryId.pathname.split('/').pop()?.trim() ;
  if(currentId == null)
    return
   const {data : products} = useQuery({
     queryKey: ['products'],
     queryFn: () => getProductsById(currentId)
   })
   console.log('PROBUDTS BY ID',products);

  console.log('Vehicles')
 
  return (
    <section className="">
    <h1 className=' font-bold text-lg mb-8'>Lựa chọn hôm nay</h1>
   <div className=' mb-11'>
        <ul className=' grid grid-cols-6 gap-x-2 gap-y-6 w-full '>
          {products?.map((item:any)=>(
            <li className='rounded-sm overflow-hidden'>
                <div className='w-60 h-60'><img src={`${item.img}`} alt={item.name} className=' w-full h-full rounded-sm object-cover' /></div>
                <div className='mt-1'>
                  <p className=' font-bold text-base'>{formatNumber(item.price)} </p>
                  <p className=' font-normal text-base'>{item.description} </p>
                  <p  className=' font-light text-sm'>{item.location}</p>
                </div>
            </li>
          )
          )}
        </ul>
   </div>
   
   <div>
 
</div>
   
  </section>
  )
}

export default sports
