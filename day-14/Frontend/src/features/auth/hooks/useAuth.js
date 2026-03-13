import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { getMe, login, register } from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context
    
    const handleLogin = async (email, password) => {
        setLoading(true)
        try {
            const res = await login(email, password)
            setLoading(false)
            setUser(res.user)
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
            setUser(res.user)
            return res.user
        } catch (err) {
            throw err
        } finally{
            setLoading(false)
        }
    }

    const handleGetMe = async () => {
        const res = await getMe()
        setUser(res.user)
    }

    return{
        user, setUser, loading, setLoading, handleLogin, handleRegister, handleGetMe
    }
}