import React from 'react'
import { useEffect } from 'react'
import { usePost } from '../hooks/usePost'
import Post from '../components/Post'
import { savePost } from '../services/post.api'

const SavedPost = () => {

    const {  allSavePost, loading, handleGetSavePost, handleSavePost } = usePost()



    allSavePost?.map(post => {
      console.log(post);
    })
    
    useEffect(() => {
        handleGetSavePost()
    }, [])

  return (
    <div>
      <div>
        <main className='feed-page'>
          <div className="feed">
              <div className="posts">
                  {allSavePost?.map(post => (
                    <Post key={post._id} user={post.user} allSavePost={allSavePost} post={post} loading={loading}  handleSavePost={handleSavePost}/>
                  ))}
              </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SavedPost
