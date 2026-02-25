import { Form, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'

const AuthForm = ({
  isLogin,
  isSubmitting,
  isLoading,
  submitError,
  errors,
  touched,
}) => {
  const { t } = useTranslation()

  return (
    <Form>
      <div className="mb-3">
        {submitError && (
          <div
            className="alert alert-danger alert-dismissible fade show py-2"
            role="alert"
          >
            <small>{t(submitError)}</small>
          </div>
        )}
      </div>

      <div className="form-floating mb-2">
        <Field
          name="username"
          id="username"
          placeholder={t(isLogin ? 'auth.userNick' : 'auth.username')}
          autoComplete="username"
          className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''
          }`}
        />
        <label htmlFor="username">
          {t(isLogin ? 'auth.userNick' : 'auth.username')}
        </label>
        <div
          className="invalid-feedback d-block"
          style={{ minHeight: '18px' }}
        >
          {errors.username && touched.username
            ? <ErrorMessage name="username" />
            : null}
        </div>
      </div>

      <div className="form-floating mb-2">
        <Field
          type="password"
          name="password"
          id="password"
          placeholder={t('auth.password')}
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''
          }`}
        />
        <label htmlFor="password">{t('auth.password')}</label>
        <div className="invalid-feedback d-block" style={{ minHeight: '18px' }}>
          {errors.password && touched.password
            ? <ErrorMessage name="password" />
            : null}
        </div>
      </div>

      {!isLogin && (
        <div className="form-floating mb-4">
          <Field
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder={t('auth.confirmPassword')}
            autoComplete="new-password"
            className={`form-control ${errors.confirmPassword && touched.confirmPassword
              ? 'is-invalid'
              : ''
            }`}
          />
          <label htmlFor="confirmPassword">
            {t('auth.confirmPassword')}
          </label>
          <div className="invalid-feedback d-block" style={{ minHeight: '18px' }}>
            {errors.confirmPassword && touched.confirmPassword
              ? <ErrorMessage name="confirmPassword" />
              : null}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-100 mb-3 btn btn-outline-primary"
        disabled={isSubmitting || isLoading}
      >
        {isLoading || isSubmitting
          ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              />
            )
          : (
              t(isLogin ? 'auth.login' : 'auth.register')
            )}
      </button>
    </Form>
  )
}

export default AuthForm
