import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat';

const Dashboard = () => {

    const auth = useSelector(state => state.auth)
    console.log(auth.user);

    const chat = useChat()

    useEffect(() => {
      chat.initializeSocketConnection()
    }, [])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard