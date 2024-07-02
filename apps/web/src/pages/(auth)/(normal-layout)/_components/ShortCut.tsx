import { type ShortCut, fetchShortCuts } from '@/apis/short-cuts'
import { Avatar } from '@/components/ui/avatar'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

export default function ShortCut() {
  const { data } = useQuery({
    queryKey: ['short-cuts'],
    queryFn: () => fetchShortCuts()
  })
  console.log('data', data)

  return (
    <ul className={clsx('space-y-2 border-r p-4 font-bold text-[#050505]')}>
      <li className="flex cursor-pointer gap-4 rounded-sm px-6 py-2">LỐI TẮT CỦA BẠN</li>
      {data?.map((shortCut: ShortCut) => (
        <Link to={`/groups/${shortCut.group.id}`} key={shortCut.id}>
          <li className={clsx('flex cursor-pointer items-center gap-4 rounded-sm px-6 py-2 hover:bg-gray-200')}>
            <Avatar src={shortCut?.group?.avatar} alt={shortCut?.group?.name} />
            <span>{shortCut?.group?.name}</span>
          </li>
        </Link>
      ))}
    </ul>
  )
}
