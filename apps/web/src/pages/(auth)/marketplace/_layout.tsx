import { useQuery } from '@tanstack/react-query'
import { Navigate, Outlet } from 'react-router-dom'

import { getMe } from '@/apis/auth'
import { getToken } from '@/utils/token'
import SideBar from './_component/SideBar'

export default function Component() {
  const { data: meQuery } = useQuery({
    queryKey: ['me'],
    queryFn: getMe
  })
  const accessToken = getToken()
  if (!accessToken) return <Navigate to="/login" />

  return (
    <div className="flex ">
      <SideBar />
      <div className="w-full bg-[#f0f2f5] p-8">
        <Outlet context={{ me: meQuery?.data }} />
      </div>
    </div>
  )
}
