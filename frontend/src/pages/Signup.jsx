import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getSignupSchema } from '../validation/signupSchema'
import { useAuth } from '../hooks/useAuth'
import AuthForm from '../components/AuthForm'

const Signup = () => {
  const { t } = useTranslation()
  const { submitError, isLoading, handleSubmit } = useAuth(false)
  const schema = getSignupSchema(t)

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
                  <AuthForm
                    isLogin={false}
                    isSubmitting={isSubmitting}
                    isLoading={isLoading}
                    submitError={submitError}
                    errors={errors}
                    touched={touched}
                  />
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
