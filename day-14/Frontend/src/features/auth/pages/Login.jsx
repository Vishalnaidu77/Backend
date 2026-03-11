import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const loginUser = async (e) => {
      e.preventDefault()

      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password
      }, {
          withCredentials: true
      })
      console.log(res.data);

      setUsername("")
      setPassword("")
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
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                  type="text" 
                  name='password' 
                  placeholder='Enter password' 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit'>Login</button>
            </form>

            <p>Already have an account? <Link className='toggle-auth-form' to='/register'>Register</Link></p>

        </div>
    </main>
  )
}

export default Login
