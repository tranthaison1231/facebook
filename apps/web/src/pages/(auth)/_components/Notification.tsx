import { useState } from 'react'
import { cn } from '@/utils/cn'

export default function Notification() {
  const [read, setRead] = useState(true)
  const LIST = []
  for (let i = 0; i <= 10; i++) {
    LIST.push({
      avata: null,
      content: ' Bạn được gắn thẻ trong tin của '
    })
  }
  console.log(read)

  return (
    <div className="h-96 w-96">
      <div className="h-full overflow-scroll p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Thông báo</h2>
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
        <div className="my-2 flex gap-2">
          <div
            onClick={() => setRead(true)}
            className={cn('cursor-pointer rounded-full p-2 text-base font-medium hover:bg-gray-100', {
              'bg-blue-100 text-blue-500 hover:bg-blue-100': read === true
            })}
          >
            Tất cả
          </div>
          <div
            onClick={() => setRead(false)}
            className={cn('cursor-pointer rounded-full p-2 text-base font-medium hover:bg-gray-100', {
              'bg-blue-100 text-blue-500 hover:bg-blue-100': read === false
            })}
          >
            Chưa đọc
          </div>
        </div>
        {read === true && (
          <div>
            <div className="flex items-center justify-between ">
              <p className="text-base font-bold">Trước đó</p>
              <p className="cursor-pointer rounded p-2 text-blue-500 hover:bg-gray-200">Xem tất cả</p>
            </div>
            {LIST.map(item => (
              <div key={item.avata} className="mt-2 flex items-center gap-4">
                <div className="relative max-h-20 min-w-16">
                  <img
                    className=" h-16 w-16 rounded-full"
                    src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/426448405_7188971087866017_2053067912483771628_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=l4OH256glo0Ab6cq-3W&_nc_ht=scontent.fdad3-6.fna&oh=00_AfBS5DF-jrR66lF7TQByNPFJF_SuCMk-Sp81Y2d3gA6fNA&oe=6619AA05"
                    alt=""
                  />
                  <img
                    className="absolute -bottom-1 -right-2  h-8 w-8 rounded-full"
                    src="https://www.pngarts.com/files/11/Haha-Emoji-Transparent-Image.png"
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <div className=" text-base leading-3">
                    Bạn được gắn thẻ trong tin của <span className="text-lg font-bold">Ngọc Ngọc</span> Hay chia sẽ tin
                    nhắn đó
                  </div>
                  <p className="text-base text-gray-500 ">2 giờ trước</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {read === false && (
          <div>
            {LIST.map(item => (
              <div key={item.content} className="mt-2 flex items-center gap-4">
                <div className="relative max-h-20 min-w-16">
                  <img
                    className=" h-16 w-16 rounded-full"
                    src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/426448405_7188971087866017_2053067912483771628_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=l4OH256glo0Ab6cq-3W&_nc_ht=scontent.fdad3-6.fna&oh=00_AfBS5DF-jrR66lF7TQByNPFJF_SuCMk-Sp81Y2d3gA6fNA&oe=6619AA05"
                    alt=""
                  />
                  <img
                    className="absolute -bottom-1 -right-2  h-8 w-8 rounded-full"
                    src="https://www.pngarts.com/files/11/Haha-Emoji-Transparent-Image.png"
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <div className=" text-base leading-3">
                    Bạn được gắn thẻ trong tin của <span className="text-lg font-bold">Ngọc Ngọc</span> Hay chia sẽ tin
                    nhắn đó
                  </div>
                  <p className="text-base text-gray-500 ">2 giờ trước</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
