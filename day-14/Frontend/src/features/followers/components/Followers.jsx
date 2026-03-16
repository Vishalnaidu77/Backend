import React, { useEffect } from 'react'
import '../style/followers.scss'
import useUser from '../hooks/useUser'
import UserCard from './UserCard'
import { useAuth } from '../../auth/hooks/useAuth'

const Followers = () => {

    const { user, loading, setLoading, handleGetUser } = useUser()

    const { currUser, handleGetMe } = useAuth()

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

  return (
    <main className='followers-section'>
        <div className="container">
            <div className="followers">
                <h2>Followers</h2>
                <div className="users">
                    {currUser?.followers.map(user => {
                        return <UserCard key={getId(user)} user={user} />
                    })}
                </div>
            </div>000
            <div className="following">
                <h2>Following</h2>
                <div className="users">
                    {currUser?.following.map(user => {
                        return <UserCard key={getId(user)} user={user}/>
                    })}
                </div>
            </div>
            <div className="suggestion">
                <h2>Suggestion</h2>
                <div className="users">
                    {suggestedUsers.map(availUsers => {
                        return <UserCard key={availUsers._id} user={availUsers} />
                    })}
                </div>
            </div>
        </div>
    </main>
  )
}

export default Followers
