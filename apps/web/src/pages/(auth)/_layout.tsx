import { Navigate, Outlet } from 'react-router-dom'
import Header from './_components/Header'

import { getToken } from '@/utils/token'

export default function Component() {
  const accessToken = getToken()
  if (!accessToken) return <Navigate to="/login" />

  return (
    <div className="w-full">
      <Header />
      <div className=" pt-16">
        <Outlet />
      </div>
    </div>
  )
}
