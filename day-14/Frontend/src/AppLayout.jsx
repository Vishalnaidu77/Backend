import React from 'react'
import { Outlet, Routes } from 'react-router-dom'

const AppLayout = () => {
  return (
    <main>
        <Outlet />
    </main>
  )
}

export default AppLayout
