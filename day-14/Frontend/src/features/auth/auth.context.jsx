import React, { createContext, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(false)

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider
