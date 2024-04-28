import { useQuery } from '@tanstack/react-query'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './_components/Header'
import { getMe } from '@/apis/auth'
import { getToken } from '@/utils/token'

export default function Component() {
  const { data: meQuery } = useQuery({
    queryKey: ['me'],
    queryFn: getMe
  })
  const accessToken = getToken()
  if (!accessToken) return <Navigate to="/login" />
  return (
    <div className="w-full">
      <Header user={meQuery?.data} />
      <div className="pt-16">
        <Outlet context={{ me: meQuery?.data }} />
      </div>
    </div>
  )
}
