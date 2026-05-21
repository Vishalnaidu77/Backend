import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {

    const auth = useSelector(state => state.auth)
    console.log(auth.user);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard