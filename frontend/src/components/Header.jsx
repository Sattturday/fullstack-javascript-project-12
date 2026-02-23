import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import socket from '../services/socket'
import { logout } from '../store/authSlice'

const Header = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)

  const handleLogout = () => {
    socket.disconnect()
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand  mb-0 h1" to="/">
          {t('header.brand')}
        </Link>

        {token && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogout}
          >
            {t('header.logout')}
          </button>
        )}
      </div>
    </nav>
  )
}

export default Header
