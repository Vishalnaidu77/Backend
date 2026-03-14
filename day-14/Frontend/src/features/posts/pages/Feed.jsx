import React, { useEffect } from 'react'
import "../style/style.scss"
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/component/Nav'

const Feed = () => {

    const { feed, loading, handleGetFeed } = usePost()

    useEffect(() => {
        handleGetFeed()
    }, [])

    if(loading){
        return <h1>Feed loading...</h1>
    }

  return (
    <div>
      <main className='feed-page'>
        <div className="feed">
          <Nav />
            <div className="posts">
                {feed?.map(post => (
                    <Post user={post.user} post={post} />
                ))}
            </div>
        </div>
      </main>
    </div>
  )
}

export default Feed
