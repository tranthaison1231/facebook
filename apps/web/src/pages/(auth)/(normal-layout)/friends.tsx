import { Button } from '@/components/ui/button'
import Sidebar from './_components/Sidebar'
import IMG from '@/assets/images/avt1.jpg'
import IMG2 from '@/assets/images/avt2.jpg'
import IMG3 from '@/assets/images/avt3.jpg'
import IMG4 from '@/assets/images/avt4.jpg'
import clsx from 'clsx'
import { useState } from 'react'

export default function Component() {
  const [items, setItems] = useState([
    {
      id: 1,
      img: IMG,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG2,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 2,
      img: IMG2,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG3,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 3,
      img: IMG3,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG4,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 4,
      img: IMG,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG3,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 5,
      img: IMG2,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG4,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 6,
      img: IMG4,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG2,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 7,
      img: IMG,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG4,
      isConfirmed: false,
      isRemoved: false
    }
  ])
  const handleRemoveItem = (id: number) => {
    setItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, isRemoved: true } : item)))
  }
  const handleConfirmItem = (id: number) => {
    setItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, isConfirmed: true } : item)))
  }

  const [addFriends, setAddFirends] = useState([
    {
      id: 1,
      img: IMG,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG2,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 2,
      img: IMG2,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG3,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 3,
      img: IMG3,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG4,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 4,
      img: IMG,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG3,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 5,
      img: IMG2,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG4,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 6,
      img: IMG4,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG2,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 7,
      img: IMG,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '30 ban chung',
      avatar: IMG4,
      isConfirmed: false,
      isRemoved: false
    }
  ])
  const handleRemoveFriend = (id: number) => {
    console.log('REMOVE')
    setAddFirends(prevItems => prevItems.map(item => (item.id === id ? { ...item, isRemoved: true } : item)))
  }
  const handleConfirmFriends = (id: number) => {
    console.log('CONFIRM')
    setAddFirends(prevItems => prevItems.map(item => (item.id === id ? { ...item, isConfirmed: true } : item)))
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className=" ml-96 p-9">
        <h1 className=" text-3xl font-bold">Lời mời kết bạn</h1>
        <div className="pt-5">
          <ul className=" flex flex-wrap justify-start space-y-2 ">
            {addFriends.map(item => (
              <li
                className={clsx(
                  ' ml-2 flex w-[200px] flex-col items-center justify-center overflow-hidden rounded-sm bg-white shadow-lg',
                  {
                    hidden: item.isRemoved
                  }
                )}
                key={item.id}
              >
                <div className="w-full ">
                  <img src={`${item.img}`} alt="" className=" h-56 w-[200px] " />
                </div>
                <div className="flex flex-col justify-start space-y-1 p-4">
                  <p className=" font-bold text-black">{item.name}</p>
                  <div className="flex items-center space-x-1">
                    <div className="h-6 w-6 overflow-hidden rounded-full">
                      <img src={`${item.avatar}`} alt="" className=" rounded-full  object-cover " />
                    </div>
                    <p>{item.numooffriends}</p>
                  </div>
                  <div className=" flex flex-col space-y-2">
                    <Button
                      className={clsx('h-9 bg-[#ebf5ff] text-primary hover:bg-[#aac5e0] hover:text-white', {
                        hidden: item.isConfirmed
                      })}
                      onClick={() => handleConfirmFriends(item.id)}
                    >
                      Xác nhận
                    </Button>
                    {item.isConfirmed ? <p className=" font-light text-black">Đã gửi lời mời kết bạn</p> : ''}
                    <Button
                      className=" h-9 bg-[#e4e6eb] text-black hover:text-white hover:opacity-50"
                      onClick={() => handleRemoveFriend(item.id)}
                    >
                      {item.isConfirmed ? 'Hủy' : 'Xóa'}
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <h1 className=" mt-3 text-3xl font-bold">Những người bạn có thể biết</h1>

        <div className=" pt-5">
          <ul className=" flex flex-wrap justify-start space-y-2 ">
            {items.map(item => (
              <li
                className={clsx(
                  ' ml-2 flex w-[200px] flex-col items-center justify-center overflow-hidden rounded-sm bg-white shadow-lg',
                  {
                    hidden: item.isRemoved
                  }
                )}
                key={item.id}
              >
                <div className="w-full ">
                  <img src={`${item.img}`} alt="" className=" h-56 w-[200px] " />
                </div>
                <div className="flex flex-col justify-start space-y-1 p-4">
                  <p className=" font-bold text-black">{item.name}</p>
                  <div className="flex items-center space-x-1">
                    <div className="h-6 w-6 overflow-hidden rounded-full">
                      <img src={`${item.avatar}`} alt="" className=" rounded-full  object-cover " />
                    </div>
                    <p>{item.numooffriends}</p>
                  </div>
                  <div className=" flex flex-col space-y-2">
                    <Button
                      className={clsx('h-9 bg-[#ebf5ff] text-primary hover:bg-[#aac5e0] hover:text-white', {
                        hidden: item.isConfirmed
                      })}
                      onClick={() => handleConfirmItem(item.id)}
                    >
                      Xác nhận
                    </Button>
                    {item.isConfirmed ? <p className=" font-light text-black">Đã gửi lời mời kết bạn</p> : ''}
                    <Button
                      className=" h-9 bg-[#e4e6eb] text-black hover:text-white hover:opacity-50"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      {item.isConfirmed ? 'Hủy' : 'Xóa'}
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
