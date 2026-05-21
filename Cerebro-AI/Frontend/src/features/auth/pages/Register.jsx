import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleRegister} = useAuth()

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log('Register Form Submitted:', { username, email, password });
    
    await handleRegister({ username, email, password})
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-800">
        <h2 className="text-2xl font-semibold text-white mb-8 text-center">Create Account</h2>
        
        <form onSubmit={handleSubmitForm} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe123"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-950 border border-gray-800 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#30b5a6] focus:ring-1 focus:ring-[#30b5a6] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-950 border border-gray-800 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#30b5a6] focus:ring-1 focus:ring-[#30b5a6] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-950 border border-gray-800 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#30b5a6] focus:ring-1 focus:ring-[#30b5a6] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#30b5a6] hover:bg-[#28988b] text-white font-medium rounded-lg transition-colors mt-4"
          >
            Sign Up
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-[#30b5a6] hover:text-[#3ce0ce] transition-colors">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register