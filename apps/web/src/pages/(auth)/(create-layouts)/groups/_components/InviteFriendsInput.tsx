import { Input } from '@/components/ui/input'
import React from 'react'

export default function InviteFriendsInput() {
  return (
    <Input
      className={cn('px-4 pb-4 pt-6 text-base placeholder:absolute placeholder:top-5 focus:ring-2')}
      placeholder="Enter names or email addresses"
    />
  )
}
