import { Input } from '@/components/ui/input'
import { Link } from '@/router'
import { AppWindow, Settings, Sparkles, UsersRound, Search } from 'lucide-react'

export default function GroupSideBar() {
  return (
    <>
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Nhóm</p>
        <Settings />
      </div>
      <div className="relative my-5">
        <Search className="absolute top-2 left-2" />
        <Input className="p-2 pl-10" placeholder="Tìm kiếm nhóm" />
      </div>
      <div>
        <div className="flex gap-5 py-3 px-2 rounded-md hover:bg-slate-200">
          <AppWindow />
          <p>Bảng feed của bạn</p>
        </div>
        <div className="flex gap-5 py-3 px-2 rounded-md hover:bg-slate-200">
          <Sparkles />
          <p>Khám phá</p>
        </div>
        <Link to="/groups/joins" className="flex gap-5 py-3 px-2 rounded-md hover:bg-slate-200">
          <UsersRound />
          <p>Nhóm của bạn</p>
        </Link>
      </div>
    </>
  )
}
