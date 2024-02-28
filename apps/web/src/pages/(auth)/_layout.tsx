import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './_components/Header'
import Sidebar from './_components/Sidebar'
import { getToken } from '@/utils/token'

export default function Component() {
  const [isOpen, setIsOpen] = useState(true)
  const accessToken = getToken()

  const onToggle = () => {
    setIsOpen(isOpen => !isOpen)
  }

  if (!accessToken) return <Navigate to="/" />

  return (
    <div className="w-full">
      <Header onToggle={onToggle} isOpen={isOpen} />
      <div className="flex h-[calc(100vh-48px)]">
        <Sidebar isOpen={isOpen} />
        <div className="w-full p-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
