import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Followers from './features/followers/components/Followers'
import Nav from './features/shared/component/Nav'

const AppLayout = () => {
  const { pathname } = useLocation()
  const isAuthRoute = pathname === '/login' || pathname === '/register'

  return (
    <main className={`main-page ${isAuthRoute ? 'auth-layout' : ''}`}>
      {!isAuthRoute && <Nav />}
      <section className={`main-content ${isAuthRoute ? 'auth-content' : ''}`}>
        <Outlet />
      </section>
      {!isAuthRoute && <Followers />}
    </main>
  )
}

export default AppLayout
