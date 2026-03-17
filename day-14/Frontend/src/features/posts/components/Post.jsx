import React, { useEffect, useRef, useState } from 'react'
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { BiMessageRounded } from "react-icons/bi";
import { HiOutlineBookmark } from "react-icons/hi2";

const Post = ({ user, post, handleLike, handleUnLike, handleSavePost }) => {

    const [showImageHeart, setShowImageHeart] = useState(false)
    const heartTimerRef = useRef(null)

    const triggerImageHeart = () => {
        setShowImageHeart(true)

        if (heartTimerRef.current) {
            clearTimeout(heartTimerRef.current)
        }

        heartTimerRef.current = setTimeout(() => {
            setShowImageHeart(false)
        }, 700)
    }

    const handleImageDoubleClick = () => {
        if (!post.isLiked) {
            handleLike(post._id)
        }
        triggerImageHeart()
    }

    const handleLikeClick = () => {
        if (post.isLiked) {
            handleUnLike(post._id)
            return
        }

        handleLike(post._id)
        triggerImageHeart()
    }

    useEffect(() => {
        return () => {
            if (heartTimerRef.current) {
                clearTimeout(heartTimerRef.current)
            }
        }
    }, [])


  return (
    <div>
      <div className="post">
        <div className="user">
            <div className="img-wrapper">
                <img src={user?.profileImage ? user.profileImage : post.postUserProfileImage} alt="" />
            </div>
            <p><b>{user?.username ? user.username : post.postUserUsername}</b></p>
        </div>
        <img 
            onDoubleClick={handleImageDoubleClick}
            src={post.imageUrl} 
            alt="" 
        />
        <span className={`on-like-icon ${showImageHeart ? "show" : ""}`}>
            <FaHeart />
        </span>
        <div className="icons">
            <div className="left">
                <button
                className={`btn ${post.isLiked ? "liked" : ""}`}
                aria-label={post.isLiked ? "Unlike post" : "Like post"}
                onClick={handleLikeClick}
                >
                    {post.isLiked ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button className='btn'><BiMessageRounded /></button>
                <button className='btn'><PiShareFat /></button>
            </div>
            <div className="right" onClick={() => handleSavePost(post._id)}>
                <button className='btn'><HiOutlineBookmark /></button>
            </div>
        </div>
        <p className='caption'><b>{user?.username ? user.username : post.postUserUsername}</b> {post.caption}</p>
    </div>
    </div>
  )
}

export default Post
