import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import AppLayout from './AppLayout'
import './features/shared/global.scss'
import Feed from './features/posts/pages/Feed'
import CreatePost from './features/posts/pages/CreatePost'
import SavedPost from './features/posts/pages/SavedPost'

const App = () => {

  const router = createBrowserRouter([
   { 
    path: "/",
    element: <AppLayout />,
    children: [
      {
      index: true,
      element: <Feed />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/create-post",
        element: <CreatePost />
      },
      {
        path: "/saved-post",
        element: <SavedPost />
      }
    ]
  }
])

  return (
    <RouterProvider router={router} />
   )
}

export default App
