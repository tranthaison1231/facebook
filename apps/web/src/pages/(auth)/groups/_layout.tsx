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
    <div className="flex h-[calc(100vh-4rem)] w-full pt-3">
      <div className="w-96 bg-white p-5">
        <GroupSideBar />
      </div>
      <Outlet context={groups} />
    </div>
  )
}
