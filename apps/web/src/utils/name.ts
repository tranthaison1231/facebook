import { User } from '@/apis/auth'

export const formatName = (user: User) => {
  return `${user?.firstName} ${user?.lastName}`
}
