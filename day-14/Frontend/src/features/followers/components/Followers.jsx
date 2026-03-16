import React, { useEffect } from 'react'
import '../style/followers.scss'
import useUser from '../hooks/useUser'
import UserCard from './UserCard'
import { useAuth } from '../../auth/hooks/useAuth'

const Followers = () => {

    const { user, loading, setLoading, handleGetUser, handleFollowUser } = useUser()

    const { currUser, handleGetMe, loading: authLoading } = useAuth()

    const getId = (value) => {
        if (!value) return null
        if (typeof value === "string") return value
        return value._id ? String(value._id) : null
    }

    const followerIdSet = new Set((currUser?.followers || []).map(getId).filter(Boolean))
    const followingIdSet = new Set((currUser?.following || []).map(getId).filter(Boolean))

    const suggestedUsers = (user || []).filter((candidate) => {
        const candidateId = getId(candidate)

        if (!candidateId) return false
        if (candidateId === getId(currUser)) return false
        if (candidate.username === currUser?.username) return false
        if (followerIdSet.has(candidateId)) return false
        if (followingIdSet.has(candidateId)) return false

        return true
    })
    
    useEffect(() => {
        handleGetUser()
        handleGetMe()
    }, [])

    useEffect(() => {
        console.log("currUser updated:", currUser)
    }, [currUser])

    // Show loading if auth is loading or followers/following are not yet populated
    const isLoading = authLoading || (currUser && (!currUser.followers || !currUser.following))

    if (isLoading) {
        return (
            <div className='followers-section'>
                <div className="container">
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    if (!currUser) {
        return (
            <div className='followers-section'>
                <div className="container">
                    <p>No data available</p>
                </div>
            </div>
        )
    }

  return (
    <main className='followers-section'>
        <div className="container">
            <div className="followers">
                <h4>Followers</h4>
                <div className="users">
                    {currUser?.followers && currUser.followers.length > 0 ? (
                        currUser.followers.map(user => {
                            return <UserCard key={getId(user)} user={user} followingIdSet={followingIdSet} handleFollowUser={handleFollowUser} />
                        })
                    ) : (
                        <p className='empty-message'>No followers yet</p>
                    )}
                </div>
            </div>
            <div className="following">
                <h4>Following</h4>
                <div className="users">
                    {currUser?.following && currUser.following.length > 0 ? (
                        currUser.following.map(user => {
                            return <UserCard key={getId(user)} user={user} followingIdSet={followingIdSet} handleFollowUser={handleFollowUser}/>
                        })
                    ) : (
                        <p className='empty-message'>Not following anyone yet</p>
                    )}
                </div>
            </div>
            <div className="suggestion">
                <h4>Suggestion</h4>
                <div className="users">
                    {suggestedUsers && suggestedUsers.length > 0 ? (
                        suggestedUsers.map(availUsers => {
                            return <UserCard key={availUsers._id} user={availUsers} followingIdSet={followingIdSet} handleFollowUser={handleFollowUser}/>
                        })
                    ) : (
                        <p className='empty-message'>No suggestions available</p>
                    )}
                </div>
            </div>
        </div>
    </main>
  )
}

export default Followers
