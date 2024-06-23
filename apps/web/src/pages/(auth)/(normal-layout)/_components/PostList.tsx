import { FileImage, SmilePlus, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { useInfiniteQuery } from '@tanstack/react-query'
import CreatePost from './CreatePost'
import Post from './Post'
import { Post as IPost, fetchPosts } from '@/apis/posts'
import { useCallback, useMemo, useRef } from 'react'

export default function PostList() {
  const observer = useRef<IntersectionObserver>()

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined
    }
  })

  const posts = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page]
    }, [])
  }, [data])

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage()
        }
      })

      if (node) observer.current.observe(node)
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  )

  return (
    <div className="mt-4 w-[520px]">
      <div className="w-full rounded-lg bg-white p-5">
        <div className="flex flex-col">
          <div className="flex max-h-10 space-x-2">
            <CreatePost />
          </div>

          <hr className="color-[#f0f2f5] mt-3 h-2 w-full" />

          <div className="mt-2 flex text-nowrap">
            <Button className="flex items-center space-x-1 bg-white hover:bg-[#e1e4ea]">
              <Video className="text-pink-900" />
              <p className="text-black">Video trực tiếp</p>
            </Button>
            <Button className="flex items-center space-x-1 bg-white hover:bg-[#e1e4ea]">
              <FileImage className="text-green-500" />
              <p className="text-black">Ảnh/video</p>
            </Button>
            <Button className="flex items-center space-x-1 bg-white hover:bg-[#e1e4ea]">
              <SmilePlus className="text-yellow-500" />
              <p className="text-black">Cảm xúc/hoạt động </p>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {posts?.map((post: IPost) => (
          <div key={post.id} ref={lastElementRef}>
            <Post post={post} key={post.id} />{' '}
          </div>
        ))}
      </div>
      {isFetching && (
        <div className="mt-4 space-y-4">
          <Post.Sekelton />
          <Post.Sekelton />
        </div>
      )}
    </div>
  )
}
