import { getGroups } from '@/apis/groups'
import { useQuery } from '@tanstack/react-query'
import { Outlet, useLocation } from 'react-router-dom'
import GroupSideBar from './_components/GroupSideBar'
import { Navigate } from '@/router'
import InputCreateGroup from './_components/InputCreateGroup'
export default function Component() {
  const location = useLocation()
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroups()
  })

  if (location.pathname === '/groups/' || location.pathname === '/groups') {
    return <Navigate to="/groups/feed" />
  }
  return (
    <div className="w-full">
      <div className="fixed h-[calc(100vh-4.6rem)] w-90 border bg-white p-5 shadow-md">
        {location.pathname.includes('/groups/create') ? <InputCreateGroup /> : <GroupSideBar />}
      </div>
      <div className="ml-90">
        <Outlet context={groups} />
      </div>
    </div>
  )
}
