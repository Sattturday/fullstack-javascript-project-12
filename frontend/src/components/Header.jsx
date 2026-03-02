import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { routes } from '../routes'
import useAuth from '../hooks/useAuth'

const Header = () => {
  const { t } = useTranslation()
  const { logout, isAuthenticated } = useAuth()

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand mb-0 h1" to={routes.home}>
          {t('header.brand')}
        </Link>

        {isAuthenticated && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={logout}
          >
            {t('header.logout')}
          </button>
        )}
      </div>
    </nav>
  )
}

export default Header
