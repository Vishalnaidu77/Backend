import React from 'react'
import { useEffect } from 'react'
import { usePost } from '../hooks/usePost'

const SavedPost = () => {

    const { handleGetSavePost } = usePost()

    useEffect(() => {
        handleGetSavePost()
    }, [])

  return (
    <div>
      SavedPost
    </div>
  )
}

export default SavedPost
