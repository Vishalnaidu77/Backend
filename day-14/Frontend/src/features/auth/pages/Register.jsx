import React, { useState } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = (e) => {
        e.preventDefault()

        
    }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <input type="text" name='email' placeholder='Enter your username' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="text" name='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="text" name='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type='submit' className='button primary-btn'>Register</button>
        </form>
        <p>Already have an account? <Link to='/login'>Login</Link> </p>
      </div>
    </main>
  )
}

export default Register
