import React from 'react'
import { Link } from 'react-router-dom'
import '../style/form.scss'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const registerUser = async (e) => {
        e.preventDefault()

        setUsername("")
        setEmail("")
        setPassword("")
    }

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input 
                    type="text" 
                    name='username' 
                    placeholder='Enter username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="text" 
                    name='email' 
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="text" 
                    name='password' 
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Register</button>
            </form>

            <p>Already have an account? <Link className='toggle-auth-form' to='/login'>Login</Link></p>
        </div>
    </main>
  )
}

export default Register
