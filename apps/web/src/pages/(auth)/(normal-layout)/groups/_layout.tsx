import { getGroups } from '@/apis/groups'
import { useQuery } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import GroupSideBar from './_components/GroupSideBar'

export default function Component() {
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroups()
  })

  return (
    <div className="w-full">
      <div className="fixed h-[calc(100vh-4.6rem)] w-90 border bg-white p-5 shadow-md">
        <GroupSideBar />
      </div>
      <div className="ml-90">
        <Outlet context={groups} />
      </div>
    </div>
  )
}
