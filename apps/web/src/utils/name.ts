import { User } from '@/apis/auth'

export const formatName = (user: User) => {
  return `${user?.firstName} ${user?.lastName}`
}

// 1 input -> 1 output
