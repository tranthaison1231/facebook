import { User } from '@/apis/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { formatName } from '@/utils/name'
import { removeToken } from '@/utils/token'
import { LogOut } from 'lucide-react'
import { useNavigate, useOutletContext } from 'react-router-dom'

export default function UserProfile() {
  const navigate = useNavigate()
  const { me } = useOutletContext<{ me: User }>()

  const logOut = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">{formatName(me)}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer" onClick={logOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
