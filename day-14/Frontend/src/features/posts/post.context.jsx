import React, { createContext, useState } from 'react'

export const PostContext = createContext()

const PostProvider = ({ children }) => {

    const [ loading, setLoading ] = useState(false)
    const [post, setPost] = useState(null)
    const [feed , setFeed] = useState(null)
    const [savedPost, setSavedPost] = useState(null)

  return (
    <PostContext.Provider value={{ loading, setLoading, post, setPost, feed, setFeed, savedPost, setSavedPost }}> 
        {children}
    </PostContext.Provider>
  )
}

export default PostProvider
