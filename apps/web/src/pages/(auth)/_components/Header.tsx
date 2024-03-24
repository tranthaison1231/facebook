import { Link, useLocation, useNavigate } from 'react-router-dom'

import FaceBookIcon from '@/assets/images/facebook-logo.png'
import { Input } from '@/components/ui/input'

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
  UsersRound
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import UserProfile from './UserProfile'
import { useQuery } from '@tanstack/react-query'
import { getMe } from '@/apis/auth'
import { useRef } from 'react'

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

export default function Header() {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const { data: meQuery } = useQuery({
    queryKey: ['me'],
    queryFn: getMe
  })
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === 'Enter'){
      navigate(`search/people?q=${inputRef.current?.value}`)
    }
  }

  return (
    <div className=" fixed top-0 z-10 flex w-full flex-row justify-between border bg-white px-4 py-4 shadow-md ">
      
      <div>
        <div className=" flex max-h-10 space-x-3">
          <Link to={'/'}>
            <img className=" w-12" src={`${FaceBookIcon}`} alt="" />
          </Link>
          <div className="flex min-w-60 items-center justify-center space-x-1 rounded-full border bg-secondary-foreground p-2 px-2">
            <Search />
          
            <Input placeholder="Search..." className=" border-none bg-transparent " onKeyDown={onSearch} ref={inputRef} />
          </div>
        </div>
      </div>
      <div className="">
        <ul className=" flex flex-row">
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

      <ul className=" flex flex-row space-x-3">
        <li className="relative  flex h-10 w-10 cursor-pointer items-center justify-center gap-4 rounded-full bg-secondary-foreground ">
          <DropdownMenu>
            <DropdownMenuTrigger className=" rounded-full">{ICON_MESSAGE[0].icon}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-90 hover:bg-white">
              <DropdownMenuLabel>FEATURES</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <p>HELLO</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li className="relative  flex h-10 w-10 cursor-pointer items-center justify-center gap-4 rounded-full bg-secondary-foreground">
          <DropdownMenu>
            <DropdownMenuTrigger className=" rounded-full">{ICON_MESSAGE[1].icon}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-90 hover:bg-white">
              <DropdownMenuLabel>THÔNG BÁO</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <p>HELLO</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li className="relative  flex h-10 w-10 cursor-pointer items-center justify-center gap-4 rounded-full bg-secondary-foreground">
          <DropdownMenu>
            <DropdownMenuTrigger className=" rounded-full">{ICON_MESSAGE[2].icon}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-90 hover:bg-white">
              <DropdownMenuLabel>MESSENGER</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <p>HELLO</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li className="relative flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-4 rounded-full bg-secondary-foreground">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
              {meQuery?.data?.avatar ? (
                <img src={`${meQuery?.data?.avatar}`} alt="avatar" className="h-10 w-10 rounded-full" />
              ) : (
                <UsersRound />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-96 p-4 hover:bg-white ">
              <div className="flex flex-col items-start justify-start space-y-2 rounded-lg p-4 font-semibold text-black shadow-lg shadow-gray-300 ">
                <Link
                  to={`/profile/`}
                  className="flex w-full items-center justify-start space-x-3 rounded-md p-2 hover:bg-slate-200"
                >
                  <img src={`${meQuery?.data?.avatar}`} alt="avatar" className="h-9 w-9 rounded-full" />
                  <p className="text-lg">{meQuery?.data?.fullName}</p>
                </Link>
                <hr className=" h-3/4 w-full bg-secondary-foreground" />
                <div className="flex w-full items-center justify-start space-x-3 rounded-md p-2 hover:bg-slate-200">
                  <img
                    src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-6/287783869_177078658070053_1098275628170852232_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=FexHRjMt5YwAX_2Foh4&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfDo0hiA4XwHCRH8gA45Fugs6dx7LC9Qjpl25P59c9TrkA&oe=65F08F5B"
                    alt="avatar"
                    className="h-9 w-9 rounded-full"
                  />
                  <p className="text-lg">Ban quyền lực E21CQCN01-N</p>
                </div>
                <hr className=" h-3/4 w-full bg-secondary-foreground" />
                <Button className="flex w-full space-x-2 rounded-sm bg-[#e4e6eb] text-black hover:bg-[#e4e6eb] hover:opacity-80">
                  <UserRoundSearch />
                  <p> Xem tất cả ở trang cá nhân</p>
                </Button>
              </div>
              <ul className=" mt-4 font-semibold text-black">
                {FEATURES.map(item => (
                  <li className=" flex w-full items-center justify-start space-x-3 rounded-md p-2 hover:bg-slate-200">
                    {item.icon}
                    <p>{item.content}</p>
                    {item.arrow}
                  </li>
                ))}
                <li className=" flex w-full items-center justify-start space-x-3 rounded-md p-2 hover:bg-slate-200">
                  <LogOut />
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
