import { Outlet, useOutletContext } from 'react-router-dom'
import { User } from '@/apis/auth'
import Header from './_components/Header'

export default function Component() {
  const { me } = useOutletContext<{ me: User }>()

  return (
    <>
      <div className="fixed w-full">
        <Header user={me} />
      </div>
      <div className="pt-18.5">
        <Outlet context={{ me: me }} />
      </div>
    </>
  )
}
