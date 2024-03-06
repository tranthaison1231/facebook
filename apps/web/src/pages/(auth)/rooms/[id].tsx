import { useParams } from '@/router'
import { useSearchParams } from 'react-router-dom'

export default function Room() {
  const [searchParams] = useSearchParams()
  const { id } = useParams('/rooms/:id')

  const page = searchParams.get('page')
  return (
    <div>
      Room: {id}, Page: {page}
    </div>
  )
}
