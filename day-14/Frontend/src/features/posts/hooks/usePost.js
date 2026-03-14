import { useContext } from "react";
import { createPost, getFeed, likedPost, unLikedPost } from "../services/post.api";
import { PostContext } from "../post.context";

export const usePost = () => {

    const { loading, setLoading, post, setPost, feed, setFeed } = useContext(PostContext)

    const handleGetFeed = async () => {
        setLoading(true)
        const res = await getFeed()
        setFeed([...res.posts].reverse())
        setLoading(false)
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        const res = await createPost(imageFile, caption)
        setFeed((prevFeed) => [res.post, ...(prevFeed || [])])
        setLoading(false)
    }

    const handleLike = async (postId) => {
        await likedPost(postId)

        setFeed((prevFeed) =>
            (prevFeed || []).map((post) =>
                post._id === postId ? { ...post, isLiked: true } : post
            )
        )
    }

    const handleUnLike = async (postId) => {
        await unLikedPost(postId)

        setFeed((prevFeed) =>
            (prevFeed || []).map((post) =>
                post._id === postId ? { ...post, isLiked: false } : post
            )
        )
    }

    return{
        loading, setLoading, post, setPost, feed, setFeed, handleGetFeed, handleCreatePost, handleLike, handleUnLike
    }
}