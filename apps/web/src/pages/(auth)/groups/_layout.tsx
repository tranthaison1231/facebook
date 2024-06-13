import { getGroups } from '@/apis/groups'
import { useQuery } from '@tanstack/react-query'
import { Outlet, useLocation } from 'react-router-dom'
import GroupSideBar from './_components/GroupSideBar'
import { Navigate } from '@/router'
export default function Component() {
  const location = useLocation()
  console.log('location', location)
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroups()
  })

  if (location.pathname === '/groups/' || location.pathname === '/groups') {
    return <Navigate to="/groups/feed" />
  }
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full">
      <div className="w-90 bg-white p-5">
        <GroupSideBar />
      </div>
      <Outlet context={groups} />
    </div>
  )
}
