import React, { useRef, useState } from 'react'
import '../style/createpost.scss'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { BiImageAdd } from "react-icons/bi";

const CreatePost = () => {

    const [caption, setCaption] = useState("")
    const postImageRef = useRef(null)

    const { loading, handleCreatePost } = usePost()

    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        const file = postImageRef.current.files[0];
        await handleCreatePost(file, caption)

        navigate('/')
    }

    if(loading){
        return <h1>Creating post</h1>
    }

  return (
    <main className='create-post-page'>
        <button 
            className='go-back'
            onClick={() => navigate("/")}
        >
            <IoIosArrowBack />
        </button>
        <div className="form-container">
            <h1>Create post</h1>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <label className='post-image-label' htmlFor="postImage"><BiImageAdd /></label>
                    <input ref={postImageRef} type="file" name='postImage' id='postImage' hidden/>
                    <textarea 
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        type="text" name='caption' id='caption' placeholder='Enter Caption'
                    />
                </div>
                <button className='button primary-btn'>Create post</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost
