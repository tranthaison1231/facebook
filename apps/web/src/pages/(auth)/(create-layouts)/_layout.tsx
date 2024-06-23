import { Outlet, useOutletContext } from 'react-router-dom'
import { User } from '@/apis/auth'
import Header from './_components/Header'

export default function Component() {
  const { me } = useOutletContext<{ me: User }>()

  return (
    <>
      <Header user={me} />
      <Outlet context={{ me: me }} />
    </>
  )
}
