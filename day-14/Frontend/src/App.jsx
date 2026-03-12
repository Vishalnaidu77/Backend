import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import AppLayout from './AppLayout'
import './features/shared/global.scss'

const App = () => {

  const router = createBrowserRouter([
   { 
    path: "/",
    element: <AppLayout />,
    children: [
      // {
      // index: true,
      // element: <Home />
      // },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  }
])

  return (
    <RouterProvider router={router} />
   )
}

export default App
