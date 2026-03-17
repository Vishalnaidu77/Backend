import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/posts",
    withCredentials: true
})

export async function getFeed() {
    
    const res = await api.get("/feed")
    return res.data

}

export async function createPost(imageFile, caption){
    const formData = new FormData()

    formData.append("image", imageFile)
    formData.append("caption", caption)

    const res = await api.post("/", formData)

    return res.data
}

export async function likedPost(postId){
    const res = await api.post(`/like/${postId}`)
    return res.data
}

export async function unLikedPost(postId){
    const res = await api.post(`/unlike/${postId}`)
    return res.data
}

export async function savePost(postId){
    const res = await api.post(`/save/${postId}`)
    return res.data
}