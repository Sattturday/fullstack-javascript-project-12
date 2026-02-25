import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getSignupSchema } from '../validation/signupSchema'
import { useSignupMutation } from '../services/api'

const Signup = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
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

      if (result.token) {
        navigate('/')
      }
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
    <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="text-center mb-4">{t('auth.signup')}</h1>

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
                          ? (
                              <div className="invalid-feedback d-block">
                                <ErrorMessage name="username" />
                              </div>
                            )
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
                          ? (
                              <div className="invalid-feedback d-block">
                                <ErrorMessage name="password" />
                              </div>
                            )
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
                          ? (
                              <div className="invalid-feedback d-block">
                                <ErrorMessage name="confirmPassword" />
                              </div>
                            )
                          : null}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-100 mb-3 btn btn-outline-primary"
                      disabled={isSubmitting || isLoading }
                    >
                      {isLoading || isSubmitting
                        ? (
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              aria-hidden="true"
                            />
                          )
                        : (
                            t('auth.register')
                          )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            <div className="card-footer p-4 text-center">
              <span>{t('auth.hasAccount')}</span>
              {' '}
              <Link to="/login">{t('auth.login')}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
