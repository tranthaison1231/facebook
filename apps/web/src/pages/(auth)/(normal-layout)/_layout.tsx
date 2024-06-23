import { Outlet, useOutletContext } from 'react-router-dom'
import Header from './_components/Header'
import { User } from '@/apis/auth'

export default function Component() {
  const { me } = useOutletContext<{ me: User }>()

  return (
    <>
      <Header user={me} />
      <div className="pt-18.5">
        <Outlet context={{ me: me }} />
      </div>
    </>
  )
}
