import { cn } from '@/utils/cn'
import { LazyMotion, ValueAnimationTransition, animate, domAnimation, m, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface CarouselProps {
  images: string[]
  loop?: boolean
  autoplay?: boolean
  autoplayDelay?: number
  transition?: ValueAnimationTransition
  className?: string
  imgClassName?: string
  controls?: boolean
}

export default function Carousel({
  images,
  autoplay = false,
  autoplayDelay = 400,
  loop = true,
  transition = { duration: 0.4 },
  className,
  imgClassName,
  controls = true
}: CarouselProps) {
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)

  const calculateNewX = useCallback(() => -index * (containerRef.current?.clientWidth || 0), [index])

  const handleNext = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e?.stopPropagation()
      const idx = loop ? 0 : index
      setIndex(index + 1 === images.length ? idx : index + 1)
    },
    [index, loop, images.length]
  )

  const handlePrev = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.stopPropagation()
    const idx = loop ? images.length - 1 : 0
    setIndex(index - 1 < 0 ? idx : index - 1)
  }

  useEffect(() => {
    const controls = animate(x, calculateNewX(), transition)

    return controls.stop
  }, [calculateNewX, index, x, transition])

  useEffect(() => {
    window.addEventListener('resize', () => {
      animate(x, calculateNewX(), transition)
    })
  }, [calculateNewX, transition, x])

  useEffect(() => {
    if (!autoplay) {
      return
    }

    const timer = setInterval(() => handleNext(), autoplayDelay)

    return () => clearInterval(timer)
  }, [autoplay, handleNext, autoplayDelay])

  return (
    <div ref={containerRef} className={cn('relative flex h-full w-full overflow-x-hidden', className)}>
      {images.map((image, i) => (
        <LazyMotion key={i} features={domAnimation}>
          <m.div
            className="inline-block h-full w-full flex-none"
            style={{
              x,
              left: `${i * 100}%`,
              right: `${i * 100}%`
            }}
          >
            <img src={image} className={cn('w-full', imgClassName)} />
          </m.div>
        </LazyMotion>
      ))}
      <button
        onClick={handlePrev}
        disabled={!loop && index === 0}
        className="absolute left-4 top-2/4 hidden h-6 select-none place-items-center rounded-full bg-white text-muted-foreground  transition-all hover:scale-105 group-hover:grid"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={handleNext}
        disabled={!loop && index === images.length - 1}
        className="absolute right-4 top-2/4 hidden h-6 select-none place-items-center rounded-full bg-white text-muted-foreground transition-all hover:scale-105 group-hover:grid"
      >
        <ChevronRight />
      </button>
      {controls && (
        <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2">
          {new Array(images.length).fill('').map((_, i) => (
            <span
              key={i}
              className={`block h-2 w-2 cursor-pointer rounded-full transition-colors content-[''] ${
                index === i ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={e => {
                e.stopPropagation()
                setIndex(i)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
