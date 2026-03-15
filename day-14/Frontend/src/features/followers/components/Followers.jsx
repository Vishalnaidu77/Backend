import React, { useEffect } from 'react'
import '../style/followers.scss'
import useUser from '../hooks/useUser'
import UserCard from './UserCard'

const Followers = () => {

    const { user, loading, setLoading, handleGetUser } = useUser()

    let followersId = []
    let followers = []

    user?.forEach(users => {
        if(users.followers.length > 0){
            followersId.push(users.followers)
        }
    });

    useEffect(() => {
        handleGetUser()
    }, [])

  return (
    <main className='followers-section'>
        <div className="container">
            <div className="followers">
                <h2>Followers</h2>
                <div className="users">
                    {user?.followers?.map(followers => {
                        return <UserCard user={followers} />
                    })}
                </div>
            </div>
            <div className="following">
                <h2>Following</h2>
                <div className="users">
                    
                </div>
            </div>
            <div className="suggestion">
                <h2>Suggestion</h2>
                <div className="users">
                    {user?.map(availUsers => {
                        
                        return <UserCard user={availUsers} />
                    })}
                </div>
            </div>
        </div>
    </main>
  )
}

export default Followers
