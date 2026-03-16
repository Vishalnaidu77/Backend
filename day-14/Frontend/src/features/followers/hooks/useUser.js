import { useContext } from "react"
import { UserContext } from "../user.context"
import { followUser, getAllUsers } from "../services/users.api"

const useUser = () => {

    const { user, setUser, loading, setLoading } = useContext(UserContext)

    const handleGetUser = async () => {
        setLoading(true)
        try {
            const res = await getAllUsers()
            setUser(res.users)
            setLoading(false)
        } catch (err) {
            throw err
        } finally{
            setLoading(false)
        }
    }

    const handleFollowUser = async (username) => {
        const res = await followUser(username)
        return res
    }

    return{
        user,
        loading,
        setLoading,
        handleGetUser,
        handleFollowUser
    }
}

export default useUser