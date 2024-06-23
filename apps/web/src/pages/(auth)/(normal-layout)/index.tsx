import Sidebar from './_components/Sidebar'
import FriendList from './_components/FriendList'
import PostList from './_components/PostList'
import Stories from './_components/Stories'

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex w-full justify-center">
        <div className="w-full bg-[#f0f2f5]">
          <div className="mx-auto flex h-full w-[590px] flex-col items-center">
            <Stories />
            <PostList />
          </div>
        </div>
      </div>
      <FriendList />
    </div>
  )
}
