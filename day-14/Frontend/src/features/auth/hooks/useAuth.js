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
            setLoading(false)
            setCurrUser(res.user)
            console.log(res);
            return res.user
        } catch (err) {
            throw err
        } finally{
            setLoading(false)
        }
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true)
        try {
            const res = await register(username, email, password)
            setLoading(false)
            setCurrUser(res.user)
            return res.user
        } catch (err) {
            throw err
        } finally{
            setLoading(false)
        }
    }

    const handleGetMe = async () => {
        const res = await getMe()
        setCurrUser(res.user)
    }

    return{
        currUser, setCurrUser, loading, setLoading, handleLogin, handleRegister, handleGetMe
    }
}