import { useContext } from "react";
import { createPost, getFeed, getSavedPost, likedPost, savePost, unLikedPost } from "../services/post.api";
import { PostContext } from "../post.context";

export const usePost = () => {

    const { loading, setLoading, post, setPost, feed, setFeed, setSavedPost, allSavePost, setAllSavePost } = useContext(PostContext)

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

    const handleSavePost = async (postId) => {
        const res = await savePost(postId)
        setSavedPost(res.post)
        console.log("Post saved successfully");
    }

    const handleGetSavePost = async () => {
        const res = await getSavedPost()
        setAllSavePost(res.posts)
        console.log("Saves posts fetched", res.posts);
    }

    return{
        loading, 
        setLoading, 
        post, 
        setPost, 
        feed, 
        setFeed, 
        handleGetFeed, 
        handleCreatePost, 
        handleLike, 
        handleUnLike, 
        handleSavePost, 
        handleGetSavePost, 
        allSavePost, 
        setAllSavePost
    }
}