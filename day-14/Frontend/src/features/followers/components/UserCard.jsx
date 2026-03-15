import React from 'react'
import '../style/usercard.scss'

const UserCard = ({ user }) => {

    console.log(user);

  return (
    <div className="user-card">
        <div className="profile">
            <img className='profile-img' src={user.profileImage} alt="" />
            <p>{user.username}</p>
        </div>
        <button className='flw-btn'>Follow</button>
    </div>
  )
}

export default UserCard
