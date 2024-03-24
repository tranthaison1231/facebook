

import React from 'react'
import ProfileHeader from './profileHeader'
import { Outlet } from 'react-router-dom'

export default function 
() {
  return (
    <div>
        <ProfileHeader/>
        <Outlet/>
    </div>
  )
}

