import { Button } from '@/components/ui/button'
import IMG from '@/assets/images/avt2.jpg'
import IMG3 from '@/assets/images/avt2.jpg'
import IMG4 from '@/assets/images/avt3.jpg'
import IMG5 from '@/assets/images/avt4.jpg'
import clsx from 'clsx'
import { useState } from 'react'
import FriendSidebar from '../_components/FriendSidebar'

export default function Component() {
  const [items, setItems] = useState([
    {
      id: 2,
      img: IMG,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG3,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 3,
      img: IMG3,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG4,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 4,
      img: IMG4,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG5,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 5,
      img: IMG,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG4,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 6,
      img: IMG3,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG5,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 7,
      img: IMG5,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG3,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 8,
      img: IMG,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG5,
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
      id: 2,
      img: IMG,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG3,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 3,
      img: IMG3,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG4,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 4,
      img: IMG4,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG5,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 5,
      img: IMG,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG4,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 6,
      img: IMG3,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG5,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 7,
      img: IMG5,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG3,
      isConfirmed: false,
      isRemoved: false
    },
    {
      id: 8,
      img: IMG,
      name: 'HUYNH CHI TRUNG',
      numooffriends: '31 ban chung',
      avatar: IMG5,
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
      <FriendSidebar className="w-1/3" />
      <div className="w-full p-4">
        <h2 className=" text-3xl font-bold">Lời mời kết bạn</h2>
        <div className="pt-4">
          <ul className="flex flex-wrap justify-start space-y-1 ">
            {addFriends.map(item => (
              <li
                className={clsx(
                  ' ml-1 flex flex-col items-center justify-center overflow-hidden rounded-sm bg-white shadow-lg',
                  {
                    hidden: item.isRemoved
                  }
                )}
                key={item.id}
              >
                <div className="w-full ">
                  <img src={`${item.img}`} alt="" className=" h-55 w-[200px] " />
                </div>
                <div className="space-y0 flex flex-col justify-start p-4">
                  <p className=" font-bold text-black">{item.name}</p>
                  <div className="space-x0 flex items-center">
                    <div className="h-5 w-6 overflow-hidden rounded-full">
                      <img src={`${item.avatar}`} alt="" className=" rounded-full  object-cover " />
                    </div>
                    <p>{item.numooffriends}</p>
                  </div>
                  <div className=" flex flex-col space-y-1">
                    <Button
                      className={clsx('h-8 bg-[#ebf5ff] text-primary hover:bg-[#aac5e0] hover:text-white', {
                        hidden: item.isConfirmed
                      })}
                      onClick={() => handleConfirmFriends(item.id)}
                    >
                      Xác nhận
                    </Button>
                    {item.isConfirmed ? <p className=" font-light text-black">Đã gửi lời mời kết bạn</p> : ''}
                    <Button
                      className=" h-8 bg-[#e4e6eb] text-black hover:text-white hover:opacity-50"
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

        <div className=" pt-4">
          <ul className=" flex flex-wrap justify-start space-y-1 ">
            {items.map(item => (
              <li
                className={clsx(
                  ' ml-1 flex w-[200px] flex-col items-center justify-center overflow-hidden rounded-sm bg-white shadow-lg',
                  {
                    hidden: item.isRemoved
                  }
                )}
                key={item.id}
              >
                <div className="w-full ">
                  <img src={`${item.img}`} alt="" className=" h-55 w-[200px] " />
                </div>
                <div className="space-y0 flex flex-col justify-start p-4">
                  <p className=" font-bold text-black">{item.name}</p>
                  <div className="space-x0 flex items-center">
                    <div className="h-5 w-6 overflow-hidden rounded-full">
                      <img src={`${item.avatar}`} alt="" className=" rounded-full  object-cover " />
                    </div>
                    <p>{item.numooffriends}</p>
                  </div>
                  <div className=" flex flex-col space-y-1">
                    <Button
                      className={clsx('h-8 bg-[#ebf5ff] text-primary hover:bg-[#aac5e0] hover:text-white', {
                        hidden: item.isConfirmed
                      })}
                      onClick={() => handleConfirmItem(item.id)}
                    >
                      Xác nhận
                    </Button>
                    {item.isConfirmed ? <p className=" font-light text-black">Đã gửi lời mời kết bạn</p> : ''}
                    <Button
                      className=" h-8 bg-[#e4e6eb] text-black hover:text-white hover:opacity-50"
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
