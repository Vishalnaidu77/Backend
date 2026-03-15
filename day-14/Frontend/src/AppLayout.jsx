import React from 'react'
import { Outlet, Routes } from 'react-router-dom'
import Followers from './features/followers/components/Followers'
import Nav from './features/shared/component/Nav'

const AppLayout = () => {
  return (
    <main className='main-page'>
      <Nav />
      <section>
        <Outlet />
      </section>
      <Followers />
    </main>
  )
}

export default AppLayout
