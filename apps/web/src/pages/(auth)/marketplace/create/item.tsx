import { getMe } from '@/apis/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { imageUploadSchema } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Earth } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Image } from 'lucide-react'
import { useRef, useState } from 'react'
function item() {
  const { data: me } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe()
  })
  console.log(me)
  const [images, setImages] = useState([])
  const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
  }
  console.log(images);
  
  const uploadImage = useRef<File | null>(null)
  return (
    <div className=" flex">
      <section className="sticky left-0 top-0 h-screen w-72 shrink-0 bg-white p-4 shadow-md">
        {/* HEADER */}
        <div className=" mb-7 flex h-10 items-center justify-between">
          <div>
            <span className="text-xs font-light">Marketplace</span>
            <h1 className=" text-lg font-bold">Mặt hàng cần bán</h1>
          </div>
          <Button className="rounded-sm bg-[#e4e6eb] font-semibold px-1 text-xs text-[#bcc0c4] " disabled>
            Lưu bản nháp
          </Button>
        </div>
        {/* BODY */}
        <div className=" custom-scrollbar h-[500px] w-full ">
          <div className="mb-3 flex">
            <div>
              <img src={me?.data.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
            </div>
            <div className="">
              <p className="text-sm font-semibold">{me?.data.firstName}</p>
              <div className="flex children:text-xs children:font-light">
                <p className=" ">Niêm yết lên Marketplace ·</p>
                <p className="flex">
                  <Earth className=" size-4 text-xs" /> Công khai
                </p>
              </div>
            </div>
          </div>
          {/* ANH */}
          <div>
            <p className="text-xs font-light">Ảnh · 0/10 - Bạn có thể thêm đến 10 ảnh.</p>
            {images.length <= 0 ? (
              <form action="">
                <label
                  htmlFor="image"
                  className=" flex w-full items-center justify-center rounded-sm border-2 border-[#ced0d4] py-14"
                >
                  <input type="file" id="image" className="hidden" />
                  <div className="flex flex-col items-center justify-center">
                    <div className=" flex size-9 items-center justify-center rounded-full bg-[#ced0d4]">
                      <Image className=" block object-cover text-center text-[20px] " />
                    </div>
                    <p className=" text-[17px] font-semibold">Thêm ảnh</p>
                    <p className=" text-xs font-light">hoặc kéo thả</p>
                  </div>
                </label>
              </form>
            ) : (
              <p>CÓ ẢNH</p>
            )}
          </div>
          {/* FIELDS */}
          <div></div>
          <div></div>
          <p className="text-xs font-light">
            Các mặt hàng trên Marketplace đều hiển thị công khai với mọi người trên Facebook lẫn những nơi khác. Chúng
            tôi không cho phép các mặt hàng về động vật, chất cấm, chất gây nghiện, vũ khí, hàng giả và các sản phẩm
            khác vi phạm quyền sở hữu trí tuệ xuất hiện trên Marketplace. Hãy xem Chính sách thương mại của chúng tôi.
          </p>
        </div>
        {/* FOOTER */}
        <div className="h-[120px] w-full">
          <h1>FOOOTER</h1>
        </div>
      </section>
      <section>CONTENT</section>
    </div>
  )
}

export default item
