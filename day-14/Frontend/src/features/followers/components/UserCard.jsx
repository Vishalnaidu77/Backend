import React from 'react'
import '../style/usercard.scss'

const UserCard = ({ user, handleFollowUser, followingIdSet }) => {
  const userId = user?._id ? String(user._id) : null
  const isFollowing = userId ? Boolean(followingIdSet?.has(userId)) : false

  return (
    <div className="user-card">
        <div className="profile">
            <img className='profile-img' src={user.profileImage} alt="" />
            <p>{user.username}</p>
        </div>
        <button className='flw-btn' onClick={() => handleFollowUser(user.username)}>
          {isFollowing ? "Following" : "Follow"}
        </button>
        
    </div>
  )
}

export default UserCard
