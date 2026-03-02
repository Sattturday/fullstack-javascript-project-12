import { useEffect, useCallback, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SocketContext from '../contexts/SocketContext'
import {
  setCredentials,
  logout as logoutAction,
  restoreSession,
} from '../store/authSlice'

const useAuth = () => {
  const dispatch = useDispatch()
  const contextSocket = useContext(SocketContext)
  const socketRef = useRef(contextSocket)

  const { token, username, isLoading } = useSelector(state => state.auth)
  const isAuthenticated = Boolean(token)

  // Восстановление сессии при старте приложения
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUsername = localStorage.getItem('username')

    if (savedToken && savedUsername) {
      dispatch(setCredentials({ token: savedToken, username: savedUsername }))
      socketRef.current.auth = { token: savedToken }
      socketRef.current.connect()
    }
    else {
      dispatch(restoreSession())
    }
  }, [dispatch])

  const login = useCallback(
    ({ token, username }) => {
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)

      dispatch(setCredentials({ token, username }))

      socketRef.current.auth = { token }
      socketRef.current.connect()
    },
    [dispatch],
  )

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')

    dispatch(logoutAction())
    socketRef.current.disconnect()
  }, [dispatch])

  return {
    token,
    username,
    isAuthenticated,
    isLoading,
    login,
    logout,
  }
}

export default useAuth
