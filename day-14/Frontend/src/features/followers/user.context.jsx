import React, { createContext, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(false)

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
        { children }
    </UserContext.Provider>
  )
}

export default UserProvider
