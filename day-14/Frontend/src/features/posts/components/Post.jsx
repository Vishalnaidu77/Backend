import React from 'react'
import { FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { BiMessageRounded } from "react-icons/bi";

const Post = ({ user, post, handleLike, handleUnLike }) => {

  return (
    <div>
      <div className="post">
        <div className="user">
            <div className="img-wrapper">
                <img src={user.profileImage} alt="" />
            </div>
            <p><b>{user.username}</b></p>
        </div>
        <img src={post.imageUrl} alt="" />
        <div className="icons">
            <div className="left">
                <button
                className={`btn ${post.isLiked ? "liked" : ""}`}
                aria-label={post.isLiked ? "Unlike post" : "Like post"}
                onClick={() => {
                    post.isLiked ? handleUnLike(post._id) : handleLike(post._id)
                }}
                >
                    {post.isLiked ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button className='btn'><BiMessageRounded /></button>
                <button className='btn'><PiShareFat /></button>
            </div>
            <div className="right">
                <button className='btn'><FaRegBookmark /></button>
            </div>
        </div>
        <p><b>{user.username}</b> {post.caption}</p>
    </div>
    </div>
  )
}

export default Post
