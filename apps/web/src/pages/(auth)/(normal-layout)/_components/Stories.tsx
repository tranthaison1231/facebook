import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Avatar from '@/assets/images/avt1.jpg'

import Background from '@/assets/images/bg.jpg'

const IMAGES = [
  {
    name: 'Huynh Chi Trung',
    avt: Avatar,
    bg: Background
  },
  {
    name: 'Huynh Chi Trung',
    avt: Avatar,
    bg: Background
  },
  {
    name: 'Huynh Chi Trung',
    avt: Avatar,
    bg: Background
  },
  {
    name: 'Huynh Chi Trung',
    avt: Avatar,
    bg: Background
  }
]

export default function Stories() {
  return (
    <>
      <Carousel className="  relative w-full  py-4">
        <CarouselPrevious className="absolute left-4 top-1/2 z-40 border-none bg-[#00000080] text-white" />
        <CarouselContent className="flex w-full gap-4 px-6">
          {IMAGES.map(item => (
            <CarouselItem key={item.name} className="relative  basis-1/3 overflow-hidden  p-0 shadow-xl">
              <div className="group  flex h-64  w-full  flex-col items-center gap-4 rounded-xl  hover:cursor-pointer">
                <img src={`${item.bg}`} alt=" avt" className="h-full w-full rounded-lg" />
              </div>
              <div className="absolute left-2 top-2  size-10 overflow-hidden rounded-full border-[1px] border-gray-100">
                <img src={`${item.avt}`} alt=" avt" className=" rounded-full object-contain" />
              </div>
              <div className=" absolute bottom-3 left-7 inline-block">
                <p className=" w-full text-nowrap text-white">{item.name}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute right-4 top-1/2 z-40 border-none bg-[#00000080] text-white" />
      </Carousel>
    </>
  )
}
