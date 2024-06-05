import { Heart, MessageCircle, MoreHorizontal, MoveDown, Share } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import Love from '@/assets/images/love.png'
import Love2 from '@/assets/images/love2.png'
import Like from '@/assets/images/like.png'
import dayjs from 'dayjs'
import { Post as IPost } from '@/apis/posts'
import { CommentInput } from './CommentInput'
import { useQuery } from '@tanstack/react-query'
import { Comment as IComment, getComments } from '@/apis/comments'
import { Comment } from './Comment'

const Extrafunction = [
  {
    icon: <MoveDown />,
    name: 'Luu bai viet',
    detail: 'Them vao danh sach luu'
  },
  {
    icon: <MoveDown />,
    name: 'Luu bai viet',
    detail: 'Them vao danh sach luu'
  },
  {
    icon: <MoveDown />,
    name: 'Luu bai viet',
    detail: 'Them vao danh sach luu'
  },
  {
    icon: <MoveDown />,
    name: 'Luu bai viet',
    detail: 'Them vao danh sach luu'
  }
]

interface PostProps {
  post: IPost
}

export default function Post({ post }: PostProps) {
  const { data: commentsQuery } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => getComments(post.id)
  })

  return (
    <article className="w-full rounded-lg bg-white" key={post.id}>
      <div className=" flex items-center justify-between p-3">
        <div className="flex space-x-2">
          <img src={post.user.avatar} alt="" className="size-10 rounded-full" />
          <div className="flex flex-col justify-start">
            <p className="font-bold">{post.user.firstName + ' ' + post.user.lastName} </p>
            <p>{dayjs(post.createdAt).fromNow()}</p>
          </div>
        </div>

        <div className=" flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <ScrollArea className="h-[200px] w-[350px] p-4">
                <ul>
                  {Extrafunction.map(item => (
                    <li className=" hover:bg-slate-300" key={item.name}>
                      <div>
                        <div>
                          <img src={`$${item.icon}`} alt="" />
                        </div>
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="font-light">{item.detail}</p>
                        </div>
                      </div>
                      <hr className="h-1/2 w-full bg-slate-100" />
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <hr className=" h-1 px-5" />

      <div className="p-5 text-justify ">{post?.content}</div>

      {post?.media?.length > 0 && (
        <div className=" max-h-[500px] overflow-hidden">
          <img src={post?.media?.[0]} alt="" className="w-full object-contain" />
        </div>
      )}

      <div className="flex justify-between p-5 ">
        <div className=" flex items-center justify-center space-x-1">
          <div className="flex items-center -space-x-1">
            <img src={`${Love}`} alt="" className=" h-4 w-4" />
            <img src={`${Love2}`} alt="" className=" h-4 w-4" />
            <img src={`${Like}`} alt="" className=" h-4 w-4" />
          </div>
          <p>{post.likes.length}</p>
        </div>
        <p>{commentsQuery?.length ?? 0} comments</p>
      </div>
      <hr />

      <div className="flex justify-between px-5">
        <Button className="flex items-center space-x-2 bg-white text-secondaryColor hover:bg-[#e1e4ea]">
          <Heart />
          Thích
        </Button>
        <Button className="flex items-center space-x-2 bg-white text-secondaryColor hover:bg-[#e1e4ea]">
          <MessageCircle />
          Bình luận
        </Button>
        <Button className="flex items-center space-x-2 bg-white text-secondaryColor hover:bg-[#e1e4ea]">
          <Share />
          Chia sẻ
        </Button>
      </div>
      <hr />
      <div className="p-4">
        {commentsQuery?.map((comment: IComment) => <Comment comment={comment} key={comment.id} />)}
        <CommentInput post={post} />
      </div>
    </article>
  )
}

Post.Sekelton = () => <div className="h-40 w-full animate-pulse rounded-lg bg-gray-300"></div>
