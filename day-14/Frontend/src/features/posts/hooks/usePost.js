import { useContext, useEffect } from "react";
import { createPost, getFeed, likedPost, unLikedPost } from "../services/post.api";
import { PostContext } from "../post.context";

export const usePost = () => {

    const { loading, setLoading, post, setPost, feed, setFeed } = useContext(PostContext)

    const handleGetFeed = async () => {
        setLoading(true)
        const res = await getFeed()
        setFeed(res.posts.reverse())
        setLoading(false)
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        const res = await createPost(imageFile, caption)
        setFeed([res.post, ...feed])
        setLoading(false)
    }

    const handleLike = async (postId) => {
        const res = await likedPost(postId)
        // await handleGetFeed()
    }

    const handleUnLike = async (postId) => {
        const res = await unLikedPost(postId)
        // await handleGetFeed()
    }

    useEffect(() => {
        handleGetFeed()
    }, [])

    return{
        loading, setLoading, post, setPost, feed, setFeed, handleGetFeed, handleCreatePost, handleLike, handleUnLike
    }
}