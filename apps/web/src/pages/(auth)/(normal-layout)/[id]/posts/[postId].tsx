import { useParams } from '@/router'
import Post from '../../_components/Post'
import { useQuery } from '@tanstack/react-query'
import { fetechPostById } from '@/apis/posts'

export default function PostPage() {
  const { postId } = useParams('/:id/posts/:postId')

  const { data, isPending } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetechPostById(postId)
  })

  return <div className="mx-auto mt-6 max-w-2xl">{isPending ? <Post.Sekelton /> : <Post post={data} />}</div>
}
