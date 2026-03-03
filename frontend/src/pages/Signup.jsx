import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getSignupSchema } from '../validation/signupSchema'
import { useSignupMutation } from '../services/api'
import { routes } from '../routes'
import useAuth from '../hooks/useAuth'
import AuthPageLayout from '../components/AuthPageLayout'

const Signup = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login: loginUser } = useAuth()
  const [signup, { isLoading }] = useSignupMutation()
  const [submitError, setSubmitError] = useState(null)

  const schema = getSignupSchema(t)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitError(null)

      const result = await signup({
        username: values.username,
        password: values.password,
      }).unwrap()

      loginUser({
        token: result.token,
        username: result.username,
      })

      navigate(routes.home)
    }
    catch (err) {
      if (err.status === 409) {
        setSubmitError(t('errors.userExists'))
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
      title={t('auth.signup')}
      footer={(
        <>
          <span>{t('auth.hasAccount')}</span>
          {' '}
          <Link to={routes.login}>{t('auth.login')}</Link>
        </>
      )}
    >
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
        }}
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
                placeholder={t('auth.username')}
                autoComplete="username"
                className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''
                }`}
              />
              <label htmlFor="username">{t('auth.username')}</label>
              <div className="invalid-feedback d-block" style={{ minHeight: '18px' }}>
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
                autoComplete="new-password"
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
                : t('auth.register')}
            </button>
          </Form>
        )}
      </Formik>
    </AuthPageLayout>
  )
}

export default Signup
