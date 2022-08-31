import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import AccountPage from '../pages/account/AccountPage'
import HomePage from '../pages/home/HomePage'
import RoomPage from '../pages/room/[:roomId]/RoomPage'

export default function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <Route path='/home' element={<HomePage />} />
      <Route path='/room/:roomId' element={<RoomPage />} />
      <Route path='/account' element={<AccountPage />} />

      <Route path='*' element={<HomePage />} />
    </BrowserRouter>
  )
}
