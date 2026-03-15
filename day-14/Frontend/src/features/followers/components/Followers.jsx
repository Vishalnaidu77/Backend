import React, { useEffect } from 'react'
import '../style/followers.scss'
import useUser from '../hooks/useUser'
import UserCard from './UserCard'

const Followers = () => {

    const { user, loading, setLoading, handleGetUser } = useUser()

    useEffect(() => {
        handleGetUser()
    }, [])

    console.log(user);

  return (
    <main className='followers-section'>
        <div className="container">
            <div className="followers">
                <h2>Followers</h2>
                <div className="users">
                    
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
                    {user?.map(user => {
                        return <UserCard user={user}/>
                    })}
                </div>
            </div>
        </div>
    </main>
  )
}

export default Followers
