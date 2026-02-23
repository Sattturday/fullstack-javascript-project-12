import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import socket from '../services/socket'
import { logout } from '../store/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const handleLogout = () => {
    socket.disconnect()
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand  mb-0 h1" to="/">
          Hexlet Chat
        </Link>

        {token && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogout}
          >
            Выйти
          </button>
        )}
      </div>
    </nav>
  )
}

export default Header