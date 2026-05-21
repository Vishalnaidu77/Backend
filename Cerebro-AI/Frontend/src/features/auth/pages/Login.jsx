import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleLogin } = useAuth()
  const navigate = useNavigate()

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    await handleLogin({ email, password})
    navigate("/")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-800">
        <h2 className="text-2xl font-semibold text-white mb-8 text-center">Welcome Back</h2>
        
        <form onSubmit={handleSubmitForm} className="space-y-5">
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
            Sign In
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-[#30b5a6] hover:text-[#3ce0ce] transition-colors">
            Register here
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login