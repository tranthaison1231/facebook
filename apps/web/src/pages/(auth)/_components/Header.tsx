import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Input } from '@/components/ui/input'
import { User } from '@/apis/auth'

import clsx from 'clsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { ICON_FEATURES, ICON_MESSAGE } from '@/shared/Home'
import {
  CircleFadingPlus,
  HelpCircle,
  Lightbulb,
  LogOut,
  Moon,
  MoveUpRight,
  Search,
  Settings,
  UserRoundSearch,
  UsersRound,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'
import UserProfile from './UserProfile'
import Notification from './Notification'
import { removeToken } from '@/utils/token'
import { useQuery } from '@tanstack/react-query'
import { Page, getPages } from '@/apis/pages'
import { cn } from '@/utils/cn'

interface Props {
  user: User
}

const FEATURES = [
  {
    icon: <CircleFadingPlus />,
    content: 'Meta Site Business',
    arrow: <MoveUpRight />,
    path: '/'
  },
  {
    icon: <Settings />,
    content: 'Cài đặt và quyền riêng tư',
    arrow: <MoveUpRight />,
    path: '/'
  },
  {
    icon: <HelpCircle />,
    content: 'Trợ giúp và hỗ trợ',
    arrow: <MoveUpRight />,
    path: '/'
  },
  {
    icon: <Moon />,
    content: 'Màn hình trợ năng',
    path: '/'
  },
  {
    icon: <Lightbulb />,
    content: 'Đóng góp ý kiến',
    path: '/'
  }
]

export default function Header({ user }: Props) {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const inputRef = useRef<HTMLInputElement>(null)

  const { data } = useQuery({
    queryKey: ['pages'],
    queryFn: getPages
  })

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`search/people?q=${inputRef.current?.value}`)
    }
  }
  const logOut = () => {
    removeToken()
    navigate(`/login`)
  }

  const pathCreateGroup = currentPath.includes('/groups/create')

  return (
    <div
      className={cn('fixed top-0 z-10 flex w-full flex-row justify-between border bg-white px-4 py-4 shadow-md', {
        hidden: currentPath.includes('/marketplace/create'),
        'border-none bg-inherit shadow-none': pathCreateGroup
      })}
    >
      <div className={cn({ '-ml-4 -mt-4 flex w-90 border bg-white px-4 py-4 shadow-md': pathCreateGroup })}>
        <div className="flex max-h-10 items-center justify-center space-x-3">
          <Link to={'/groups'} className={cn('hidden', { 'flex justify-center items-center h-10 w-10': pathCreateGroup })}>
            <div className="hover:bg-hover flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-secondaryColor text-secondary-foreground hover:text-secondaryColor active:h-9 active:w-9">
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
          <div
            className={cn(
              'flex min-w-60 items-center justify-center space-x-1 rounded-full border bg-secondary-foreground p-2 px-2',
              { hidden: pathCreateGroup }
            )}
          >
            <Search />

            <Input placeholder="Search..." className="border-none bg-transparent" onKeyDown={onSearch} ref={inputRef} />
          </div>
        </div>
      </div>
      <div className={cn({ hidden: pathCreateGroup })}>
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

      <ul className="flex flex-row space-x-3">
        <li className="relative flex h-10 w-10 cursor-pointer items-center justify-center gap-4 rounded-full bg-secondary-foreground">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">{ICON_MESSAGE[0].icon}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-90 hover:bg-white">
              <DropdownMenuLabel>FEATURES</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <p>HELLO</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li className="relative flex h-10 w-10 cursor-pointer items-center justify-center gap-4 rounded-full bg-secondary-foreground">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">{ICON_MESSAGE[1].icon}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-90 hover:bg-white">
              <DropdownMenuLabel>THÔNG BÁO</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <p>HELLO</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li className="relative flex h-10 w-10 cursor-pointer items-center justify-center gap-4 rounded-full bg-secondary-foreground">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">{ICON_MESSAGE[2].icon}</DropdownMenuTrigger>
            <DropdownMenuContent className="hover:bg-white">
              <Notification />
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li className="relative flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-4 rounded-full bg-secondary-foreground">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
              {user?.avatar ? (
                <img src={`${user?.avatar}`} alt="avatar" className="h-10 w-10 rounded-full" />
              ) : (
                <UsersRound />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 p-4 hover:bg-white">
              <div className="flex flex-col items-start justify-start space-y-2 rounded-lg p-4 font-semibold text-black shadow-lg shadow-gray-300">
                <Link
                  to={`/${user?.id}`}
                  className="flex w-full items-center justify-start space-x-3 rounded-md p-2 hover:bg-slate-200"
                >
                  <img src={`${user?.avatar}`} alt="avatar" className="h-9 w-9 rounded-full" />
                  <p className="text-lg">
                    {user?.firstName} {user?.lastName}
                  </p>
                </Link>
                <hr className="h-3/4 w-full bg-secondary-foreground" />
                {data?.data?.map((item: Page) => (
                  <div
                    key={item.id}
                    className="flex w-full cursor-pointer items-center justify-start space-x-3 rounded-md p-2 hover:bg-slate-200"
                  >
                    <img src={item.avatar} alt="avatar" className="h-9 w-9 min-w-9 rounded-full object-cover" />
                    <p className="text-lg">{item.name}</p>
                  </div>
                ))}
                <hr className="h-3/4 w-full bg-secondary-foreground" />
                <Button className="flex w-full space-x-2 rounded-sm bg-[#e4e6eb] text-black hover:bg-[#e4e6eb] hover:opacity-80">
                  <UserRoundSearch />
                  <p> Xem tất cả ở trang cá nhân</p>
                </Button>
              </div>
              <ul className="mt-4 font-semibold text-black">
                {FEATURES.map(item => (
                  <li
                    key={item.content}
                    className="flex w-full items-center justify-start space-x-3 rounded-md p-2 hover:bg-slate-200"
                  >
                    {item.icon}
                    <p>{item.content}</p>
                    {item.arrow}
                  </li>
                ))}
                <li
                  onClick={logOut}
                  className="flex w-full cursor-pointer items-center justify-start gap-4 space-x-3 rounded-md p-2 hover:bg-slate-200"
                >
                  <LogOut />
                  Đăng xuất
                  <UserProfile />
                </li>
              </ul>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </div>
  )
}
