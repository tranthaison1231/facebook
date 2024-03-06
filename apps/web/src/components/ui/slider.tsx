import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/utils/cn'

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  tooltipValue?: string
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, tooltipValue, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-black" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="group relative block h-6 w-6 cursor-pointer rounded-full bg-black outline-none transition-colors active:scale-125 disabled:pointer-events-none disabled:opacity-50">
        {tooltipValue && (
          <div className="absolute bottom-8 right-0 hidden w-24 translate-x-1/3 rounded-full bg-black p-0.5 text-white group-active:block">
            {tooltipValue}
          </div>
        )}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
