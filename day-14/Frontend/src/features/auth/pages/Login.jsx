import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../hooks/userAuth'

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { loading, handleLogin } = useAuth()

    const loginUser = async (e) => {
      e.preventDefault()

      const res = await handleLogin(username, password)

      setUsername("")
      setPassword("")
    }

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input 
                  type="text" 
                  name='username' 
                  placeholder='Enter username or email' 
                  value={username} 
                  onInput={(e) => setUsername(e.target.value)}
                />
                <input 
                  type="text" 
                  name='password' 
                  placeholder='Enter password' 
                  value={password} 
                  onInput={(e) => setPassword(e.target.value)}/>
                <button type='submit'>Login</button>
            </form>

            <p>Already have an account? <Link className='toggle-auth-form' to='/register'>Register</Link></p>

        </div>
    </main>
  )
}

export default Login
