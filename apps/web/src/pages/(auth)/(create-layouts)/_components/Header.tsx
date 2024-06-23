import { User } from '@/apis/auth'
import HeaderTools from '@/components/HeaderTools'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  user: User
}

export default function Header({ user }: HeaderProps) {
  return (
    <div className="flex justify-between">
      <div className="flex w-90 border bg-white px-4 py-4 shadow-md">
        <div className="flex max-h-10 items-center justify-center space-x-3">
          <Link to={'/groups/feed'} className="flex h-10 w-10 items-center justify-center">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-secondaryColor text-secondary-foreground hover:bg-hover hover:text-secondaryColor active:h-9 active:w-9">
              <X />
            </div>
          </Link>
          <Link to={'/'}>
            <img
              src="https://1.bp.blogspot.com/-S8HTBQqmfcs/XN0ACIRD9PI/AAAAAAAAAlo/FLhccuLdMfIFLhocRjWqsr9cVGdTN_8sgCPcBGAYYCw/s1600/f_logo_RGB-Blue_1024.png"
              alt=""
              className="h-10 w-10"
            />
          </Link>
        </div>
      </div>
      <div className="p-4">
        <HeaderTools user={user} />
      </div>
    </div>
  )
}
