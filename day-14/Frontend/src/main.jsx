import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AuthProvider, { AuthContext } from './features/auth/auth.context.jsx'
import PostProvider from './features/posts/post.context.jsx'
import UserProvider from './features/followers/user.context.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <PostProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </PostProvider>
    </AuthProvider>
)
