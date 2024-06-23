import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Input } from '@/components/ui/input'
import { User } from '@/apis/auth'

import clsx from 'clsx'

import { ICON_FEATURES } from '@/shared/Home'
import { Search } from 'lucide-react'
import { useRef } from 'react'
import { cn } from '@/utils/cn'
import HeaderTools from '@/components/HeaderTools'

interface Props {
  user: User
}

export default function Header({ user }: Props) {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const inputRef = useRef<HTMLInputElement>(null)

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`search/people?q=${inputRef.current?.value}`)
    }
  }

  return (
    <div className="fixed top-0 z-10 flex w-full flex-row justify-between border bg-white px-4 py-4 shadow-md">
      <div>
        <div className="flex max-h-10 items-center justify-center space-x-3">
          <Link to={'/'}>
            <img
              src="https://1.bp.blogspot.com/-S8HTBQqmfcs/XN0ACIRD9PI/AAAAAAAAAlo/FLhccuLdMfIFLhocRjWqsr9cVGdTN_8sgCPcBGAYYCw/s1600/f_logo_RGB-Blue_1024.png"
              alt=""
              className="h-10 w-10"
            />
          </Link>
          <div
            className={cn(
              'flex min-w-60 items-center justify-center space-x-1 rounded-full border bg-secondary-foreground p-2 px-2'
            )}
          >
            <Search />

            <Input placeholder="Search..." className="border-none bg-transparent" onKeyDown={onSearch} ref={inputRef} />
          </div>
        </div>
      </div>
      <div>
        <ul className="flex flex-row">
          {ICON_FEATURES.map(item => (
            <Link to={`${item.path}`} key={item.title} className={clsx('', {})}>
              <li
                className={clsx('flex cursor-pointer gap-4 rounded-sm px-6 py-2 hover:text-primary', {
                  'text-primary': currentPath === `${item.path}`
                })}
              >
                {item.icon}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <HeaderTools user={user} />
    </div>
  )
}
