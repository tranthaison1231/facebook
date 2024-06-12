import { useQuery } from '@tanstack/react-query'
import { Navigate, Outlet } from 'react-router-dom'

import { getMe } from '@/apis/auth'
import { getToken } from '@/utils/token'
import Header from '../_components/Header'
import LeftSideBar from './_component/LeftSideBar'






export default function Component() {
  const { data: meQuery } = useQuery({
    queryKey: ['me'],
    queryFn: getMe
  })
  const accessToken = getToken()
  if (!accessToken) return <Navigate to="/login" />
  return (
    <div className="w-full">
      <div className=' w-full '>
        <Outlet context={{ me: meQuery?.data }} />
      </div>
    </div>
  )
}
