import React from 'react'
import { useDispatch } from 'react-redux'
import { setError, setLoading, setUser } from '../auth.slice'
import { getMe, login, register } from '../services/auth.api'

const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister({ username, email, password }) {
        try {
            dispatch(setLoading(true))
            const res = await register({ username, email, password})
        } catch (err) {
            dispatch(setError(err.response?.data?.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({ email, password}) {
        try {
            dispatch(setLoading(true))
            const res = await login({ email, password })
            dispatch(setUser(res.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const res = await getMe()
            dispatch(setUser(res.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

  return {
    handleRegister,
    handleLogin,
    handleGetMe
  }
}

export default useAuth