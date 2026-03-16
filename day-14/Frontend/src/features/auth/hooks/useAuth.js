import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { getMe, login, register } from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)

    const { currUser, setCurrUser, loading, setLoading } = context
    
    const handleLogin = async (email, password) => {
        setLoading(true)
        try {
            const res = await login(email, password)
            setCurrUser(res.user)
            console.log(res);
            const meRes = await getMe()
            setCurrUser({
                ...meRes.user,
                followers: meRes.user.followers || [],
                following: meRes.user.following || []
            })
            setLoading(false)
            return res.user
        } catch (err) {
            setLoading(false)
            throw err
        }
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true)
        try {
            const res = await register(username, email, password)
            setCurrUser(res.user)
            const meRes = await getMe()
            setCurrUser({
                ...meRes.user,
                followers: meRes.user.followers || [],
                following: meRes.user.following || []
            })
            setLoading(false)
            return res.user
        } catch (err) {
            setLoading(false)
            throw err
        }
    }

    const handleGetMe = async () => {
        try {
            const res = await getMe()
            console.log("GetMe response:", res)
            setCurrUser({
                ...res.user,
                followers: res.user.followers || [],
                following: res.user.following || []
            })
        } catch (err) {
            console.error("Error fetching user data:", err)
            throw err
        }
    }

    return{
        currUser, setCurrUser, loading, setLoading, handleLogin, handleRegister, handleGetMe
    }
}