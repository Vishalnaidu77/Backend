import React, { useEffect } from 'react'
import "../style/style.scss"
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/component/Nav'
import Followers from '../../followers/components/Followers'

const Feed = () => {

  const { feed, loading, handleGetFeed, handleLike, handleUnLike, handleSavePost } = usePost()
  
  feed?.map(feed => {
    console.log(feed);
  })
  
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
            <div className="posts">
                {feed?.map(post => (
                  <Post key={post._id} user={post.user} post={post} loading={loading} handleLike={handleLike} handleUnLike={handleUnLike} handleSavePost={handleSavePost}/>
                ))}
            </div>
        </div>
      </main>
    </div>
  )
}

export default Feed
