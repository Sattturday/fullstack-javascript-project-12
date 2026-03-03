import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLoginSchema } from '../validation/loginSchema'
import { useLoginMutation } from '../services/api'
import useAuth from '../hooks/useAuth'
import { routes } from '../routes'
import AuthPageLayout from '../components/AuthPageLayout'

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login: loginUser } = useAuth()
  const [login, { isLoading }] = useLoginMutation()
  const [submitError, setSubmitError] = useState(null)

  const schema = getLoginSchema(t)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitError(null)

      const result = await login(values).unwrap()

      loginUser({
        token: result.token,
        username: result.username,
      })

      navigate(routes.home)
    }
    catch (err) {
      if (err.status === 401) {
        setSubmitError(t('errors.loginError'))
      }
      else {
        setSubmitError(t('errors.connection'))
      }
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthPageLayout
      title={t('auth.login')}
      footer={(
        <>
          <span>{t('auth.noAccount')}</span>
          {' '}
          <Link to={routes.signup}>{t('auth.signup')}</Link>
        </>
      )}
    >
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="mb-3">
              {submitError && (
                <div
                  className="alert alert-danger alert-dismissible fade show py-2"
                  role="alert"
                >
                  <small>{submitError}</small>
                </div>
              )}
            </div>

            <div className="form-floating mb-2">
              <Field
                name="username"
                id="username"
                placeholder={t('auth.userNick')}
                autoComplete="username"
                className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''
                }`}
              />
              <label htmlFor="username">{t('auth.userNick')}</label>
              <div className="invalid-feedback d-block" style={{ minHeight: '18px' }}>
                {errors.username && touched.username
                  ? <ErrorMessage name="username" />
                  : null}
              </div>
            </div>

            <div className="form-floating mb-4">
              <Field
                type="password"
                name="password"
                id="password"
                placeholder={t('auth.password')}
                autoComplete="current-password"
                className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''
                }`}
              />
              <label htmlFor="password">{t('auth.password')}</label>
              <div className="invalid-feedback d-block mb-2" style={{ minHeight: '18px' }}>
                {errors.password && touched.password
                  ? <ErrorMessage name="password" />
                  : null}
              </div>
            </div>

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
                : t('auth.login')}
            </button>
          </Form>
        )}
      </Formik>
    </AuthPageLayout>
  )
}

export default Login
