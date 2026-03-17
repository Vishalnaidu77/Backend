import React, { useState } from 'react'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

  const { user, loading, handleLogin } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault()

    const res = await handleLogin(email, password,)
    console.log(res);
    navigate('/')

    setEmail("")
    setPassword("")
  }

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <main className='auth-form-page'>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={loginUser}>
          <input type="text" name='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="text" name='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type='submit' className='button primary-btn'>Login</button>
        </form>
        <p>Didn't have an account? <Link to='/register'>Register</Link> </p>
      </div>
    </main>
  )
}

export default Login
