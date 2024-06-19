import { Avatar } from '@/components/ui/avatar'
import { Comment as IComment } from '@/apis/comments'
import dayjs from 'dayjs'

interface CommentProps {
  comment: IComment
}

export const Comment = ({ comment }: CommentProps) => {
  return (
    <div key={comment.id} className="mt-2 flex gap-4">
      <Avatar src={comment.user.avatar} alt="" size="small" />
      <div>
        <p className="font-bold">{comment.user.firstName + ' ' + comment.user.lastName}</p>
        {comment.content}
        <div className="flex gap-4 text-sm text-gray-500">
          <p>{dayjs(comment.createdAt).fromNow()} </p>
          <p> Like </p>
          <p> Reply </p>
          <p> Share</p>
        </div>
      </div>
    </div>
  )
}
