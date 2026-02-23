import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <i className="bi bi-exclamation-triangle-fill display-1 text-muted mb-4" />
        <h2 className="h4 text-muted mb-2">{t('notFound.title')}</h2>
        <p className="text-muted">
          {t('notFound.message')}
          {' '}
          <a href="/">{t('notFound.link')}</a>
        </p>
      </div>
    </div>
  )
}

export default NotFound
