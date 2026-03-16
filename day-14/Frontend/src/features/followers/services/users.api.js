import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/users",
    withCredentials: true
})

export async function getAllUsers(){
    const res = await api.get("/get-users")
    return res.data
}

export async function followUser(username){
    const res = await api.post(`/follow/${username}`)
    return res.data
}