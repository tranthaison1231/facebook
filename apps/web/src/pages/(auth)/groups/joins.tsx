import { useOutletContext } from 'react-router-dom'
import groupTest from '@/assets/images/group-test.jpg'
import { Button } from '@/components/ui/button'

export default function Joins() {
  const groups = useOutletContext()
  const totalGroup = groups?.data.length
  return (
    <div className="w-full px-32">
      <p className="my-3">Tất cả các nhóm mà bạn đã tham gia ({totalGroup})</p>
      <div className="grid grid-cols-3 gap-5">
        {groups?.data.map(group => (
          <div key={group.id} className="flex flex-col gap-5 rounded-lg bg-white p-4">
            <div className="flex items-center gap-5">
              <img className="size-24 rounded-lg object-cover" src={groupTest} alt="" />
              <h1 className="text-md font-bold">{group.name}</h1>
            </div>
            <div>
              <Button>Xem nhóm</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}