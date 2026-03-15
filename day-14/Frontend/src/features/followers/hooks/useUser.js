import { useContext } from "react"
import { UserContext } from "../user.context"
import { getAllUsers } from "../services/users.api"

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

    return{
        user,
        loading,
        setLoading,
        handleGetUser
    }
}

export default useUser