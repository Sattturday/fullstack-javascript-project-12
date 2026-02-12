import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '../store/authSlice'
import { useEffect } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const validate = (values) => {
    const errors = {}
    if (!values.username) errors.username = 'Обязательное поле'
    if (!values.password) errors.password = 'Обязательное поле'
    return errors
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(clearError())

    try {
      const resultAction = await dispatch(loginUser(values))
      if (loginUser.fulfilled.match(resultAction)) {
        navigate('/')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="text-center mb-4">Войти</h1>

              <Formik
                initialValues={{ username: '', password: '' }}
                validate={validate}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}

                    <div className="form-floating mb-3">
                      <Field
                        name="username"
                        id="username"
                        className="form-control"
                        placeholder="Ваш ник"
                        autoComplete="username"
                      />
                      <label htmlFor="username">Ваш ник</label>
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    <div className="form-floating mb-4">
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Пароль"
                        autoComplete="current-password"
                      />
                      <label htmlFor="password">Пароль</label>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-100 mb-3 btn btn-outline-primary"
                      disabled={isSubmitting || loading}
                    >
                      {loading ? 'Вход...' : 'Войти'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            <div className="card-footer p-4 text-center">
              <span>Нет аккаунта?</span>{' '}
              <Link to="/signup">Регистрация</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
