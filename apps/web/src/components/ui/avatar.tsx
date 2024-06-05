import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const avatarVariants = cva('rounded-full object-cover', {
  variants: {
    size: {
      normal: 'size-10',
      small: 'size-8',
      big: 'size-12'
    }
  },
  defaultVariants: {
    size: 'normal'
  }
})

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement>, VariantProps<typeof avatarVariants> {
  size?: 'small' | 'normal' | 'big'
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(({ size, ...props }, ref) => {
  return <img className={cn(avatarVariants({ size }))} ref={ref} {...props} />
})

export { Avatar, avatarVariants }
