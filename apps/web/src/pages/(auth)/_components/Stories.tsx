import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Avatar from '@/assets/images/avt1.jpg'

import Background from '@/assets/images/bg.jpg'

const IMAGES = [
  {
    name: 'Huynh Chi Trung',
    avt: Avatar,
    bg: Background
  }
]

export default function Stories() {
  return (
    <Carousel className="mx-auto h-64 ">
      <CarouselContent>
        {IMAGES.map(item => (
          <CarouselItem key={item.name} className="relative inline-block h-64 basis-1/4 items-center rounded-lg ">
            <div className="h-64 rounded-lg">
              <img src={`${item.bg}`} alt=" avt" className="h-full w-full rounded-lg" />
            </div>
            <div className="absolute top-0 h-12 w-12 overflow-hidden rounded-full ">
              <img src={`${item.avt}`} alt=" avt" className=" rounded-full object-contain" />
            </div>
            <div className=" absolute bottom-3 left-7 inline-block">
              <p className=" w-full text-nowrap text-white">{item.name}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
