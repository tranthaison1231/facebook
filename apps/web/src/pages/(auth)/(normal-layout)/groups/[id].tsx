import { getGroup } from '@/apis/groups'
import { useParams } from '@/router'
import { useQuery } from '@tanstack/react-query'

export default function Group() {
  const { id } = useParams('/groups/:id')

  const { data } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroup(id)
  })

  console.log(data)

  return <div>Group</div>
}
