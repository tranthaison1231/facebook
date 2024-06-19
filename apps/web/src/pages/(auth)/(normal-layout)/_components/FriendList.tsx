import { Gift, Search, Plus } from 'lucide-react'

export default function FriendList() {
  const LIST: { avatar: string; name: string }[] = []

  const GROUP: { avatar: string; name: string }[] = []

  return (
    <div className={`fixed right-0 h-screen  max-w-72  border-none bg-[#f0f2f5] text-[#050505]  `}>
      <div className=" flex max-h-full flex-col overflow-scroll">
        <div className="mt-4 border-b-2 border-gray-300">
          <h3 className=" my-2 px-2 text-lg font-bold text-gray-500">Sinh nhật</h3>
          <div className="mb-4 flex items-start justify-start gap-2 px-2">
            <Gift className="h-14 w-14" />
            <p className="text-base ">
              Hôm nay là sinh nhật của <span className="text-base font-bold">Nguyễn thị thu hằng</span> và{' '}
              <span className="text-base font-bold">Tài phan</span>
            </p>
          </div>
        </div>
        <div className="mt-2 border-b-2 border-gray-300">
          <div className="flex items-center justify-between">
            <h3 className=" my-2 px-2 text-lg font-bold text-gray-500">Người liên hệ</h3>
            <div className="flex items-center gap-2">
              <Search className=" hover:bg-gray-300" />
              <div className="cursor-pointer rounded-full px-3 py-2 hover:bg-gray-200">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
                >
                  <circle cx="12" cy="12" r="2.5"></circle>
                  <circle cx="19.5" cy="12" r="2.5"></circle>
                  <circle cx="4.5" cy="12" r="2.5"></circle>
                </svg>
              </div>
            </div>
          </div>

          {LIST.map(item => (
            <div className="flex items-center gap-2 rounded-sm p-2 hover:bg-gray-200" key={item.avatar}>
              {item.avatar !== null ? (
                <img className="h-8 w-8" src={item.avatar} alt="" />
              ) : (
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://img.freepik.com/premium-vector/avatar-cute-little-boy-isolated-white-background-cartoon-style-vector-illustration_174639-55048.jpg?w=740"
                />
              )}
              <p className="text-base font-medium">{item.name}</p>
            </div>
          ))}
        </div>
        <div className=" mb-2 border-b-2 border-gray-300 pb-2">
          <h3 className=" my-2 px-2 text-lg font-bold text-gray-500">Đây là đoạn chát cộng đồng của bạn</h3>
          <div className="flex items-center gap-2 rounded-sm p-2 hover:bg-gray-200">
            <img
              className="h-8 w-8 rounded-full"
              src="https://img.freepik.com/premium-vector/avatar-cute-little-boy-isolated-white-background-cartoon-style-vector-illustration_174639-55048.jpg?w=740"
            />
            <div>
              <h3 className="text-base font-medium">Đoạn chát chung</h3>
              <p className="text-sm">Kỷ nguyển hải tặc</p>
            </div>
          </div>
        </div>
        <div className="mb-8 mt-2 border-b-2 border-gray-300">
          <h3 className=" my-2 px-2 text-lg font-bold text-gray-500">Cuộc trò truyện nhóm</h3>
          {GROUP.map(item => (
            <div className="flex items-center gap-2 rounded-sm p-2 hover:bg-gray-200" key={item.avatar}>
              {item.avatar !== null ? (
                <img className="h-8 w-8" src={item.avatar} alt="" />
              ) : (
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://img.freepik.com/premium-vector/avatar-cute-little-boy-isolated-white-background-cartoon-style-vector-illustration_174639-55048.jpg?w=740"
                />
              )}
              <p className="text-base font-medium">{item.name}</p>
            </div>
          ))}
          <div className="flex items-center gap-2 rounded-sm p-2 hover:bg-gray-200">
            <Plus className="h-8 w-8 rounded-full bg-gray-300 p-2" />
            <p className="text-base font-medium">Tạo nhóm mới</p>
          </div>
        </div>
      </div>
    </div>
  )
}
