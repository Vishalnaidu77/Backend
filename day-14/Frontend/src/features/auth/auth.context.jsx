import React, { createContext, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [ currUser, setCurrUser ] = useState(null)
    const [ loading, setLoading ] = useState(false)
  
  return (
    <AuthContext.Provider value={{ currUser, setCurrUser, loading, setLoading }}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider
