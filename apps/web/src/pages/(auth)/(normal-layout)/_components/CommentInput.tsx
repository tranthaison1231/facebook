import { User } from '@/apis/auth'
import { addComment } from '@/apis/comments'
import { Post } from '@/apis/posts'
import { Avatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { formatName } from '@/utils/name'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

interface CommentBoxProps {
  post: Post
}

export const CommentInput = ({ post }: CommentBoxProps) => {
  const clientQuery = useQueryClient()
  const { me } = useOutletContext<{ me: User }>()
  const [comment, setComment] = useState<string>('')

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && comment.trim() !== '') {
      await addComment(post.id, { content: comment })
      clientQuery.refetchQueries({
        queryKey: ['comments', post.id]
      })
      setComment('')
    }
  }

  return (
    <div className="p mt-4 flex gap-3">
      <Avatar src={me?.avatar} size="small" />
      <Input
        className="bg-gray-100"
        value={comment}
        placeholder={`Comment as ${formatName(me)}`}
        onKeyDown={onKeyDown}
        onChange={e => setComment(e.target.value)}
      />
    </div>
  )
}
