import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { useSignupMutation } from '../services/api'
import { useState } from 'react'

const Signup = () => {
  const navigate = useNavigate()
  const [signup, { isLoading, error: rtkError }] = useSignupMutation()
  const [submitError, setSubmitError] = useState(null)

  const validate = (values) => {
    const errors = {}

    if (!values.username) {
      errors.username = 'Обязательное поле'
    }
    else if (values.username.length < 3) {
      errors.username = 'Имя пользователя должно быть не менее 3 символов'
    }
    else if (values.username.length > 20) {
      errors.username = 'Имя пользователя должно быть не более 20 символов'
    }

    if (!values.password) {
      errors.password = 'Обязательное поле'
    }
    else if (values.password.length < 5) {
      errors.password = 'Пароль должен быть не менее 5 символов'
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Обязательное поле'
    }
    else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Пароли должны совпадать'
    }

    return errors
  }

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitError(null) // Очищаем предыдущую ошибку

      const result = await signup({
        username: values.username,
        password: values.password,
      }).unwrap()

      if (result.token) {
        navigate('/login')
      }
    }
    catch (err) {
      // Обрабатываем разные форматы ошибок от сервера
      let errorMessage = 'Ошибка регистрации'

      if (err.status === 409) {
        errorMessage = 'Пользователь с таким именем уже существует'
      }
      else if (err.data?.message) {
        errorMessage = err.data.message
      }
      else if (err.data?.error) {
        errorMessage = err.data.error
      }
      else if (err.message) {
        errorMessage = err.message
      }

      // Если сервер вернул ошибки валидации для конкретных полей
      if (err.data?.errors) {
        const fieldErrors = {}
        Object.keys(err.data.errors).forEach((key) => {
          fieldErrors[key] = err.data.errors[key].join(', ')
        })
        setErrors(fieldErrors)
      }
      else {
        // Общая ошибка формы
        setSubmitError(errorMessage)
      }

      console.error('Signup failed:', err)
    }
    finally {
      setSubmitting(false)
    }
  }

  // Функция для получения текста ошибки
  const getErrorMessage = () => {
    if (submitError) return submitError
    if (rtkError) {
      return (
        rtkError.data?.message
        || rtkError.data?.error
        || rtkError.message
        || 'Ошибка подключения к серверу'
      )
    }
    return null
  }

  const errorMessage = getErrorMessage()

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="text-center mb-4">Регистрация</h1>

              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validate={validate}
                onSubmit={handleSubmit}
                validateOnChange={true} // Включаем живую валидацию
                validateOnBlur={true}
              >
                {({ isSubmitting, errors, touched, isValid, dirty }) => (
                  <Form>
                    {/* Блок с ошибкой фиксированной высоты */}
                    <div
                      className="mb-3"
                      style={{ minHeight: '58px' }}
                    >
                      {errorMessage && (
                        <div
                          className="alert alert-danger alert-dismissible fade show py-2"
                          role="alert"
                        >
                          <small>{errorMessage}</small>
                          <button
                            type="button"
                            className="btn-close btn-sm"
                            onClick={() => {
                              setSubmitError(null)
                            }}
                            aria-label="Close"
                          />
                        </div>
                      )}
                    </div>

                    {/* Поле username */}
                    <div className="form-floating mb-3">
                      <Field
                        name="username"
                        id="username"
                        placeholder="Ваш ник"
                        autoComplete="username"
                        className={`form-control ${errors.username && touched.username
                          ? 'is-invalid'
                          : ''
                          }`}
                      />
                      <label htmlFor="username">Ваш ник</label>
                      <div className="invalid-feedback">
                        <ErrorMessage name="username" />
                      </div>
                    </div>

                    {/* Поле password */}
                    <div className="form-floating mb-3">
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Пароль"
                        autoComplete="new-password"
                        className={`form-control ${errors.password && touched.password
                          ? 'is-invalid'
                          : ''
                          }`}
                      />
                      <label htmlFor="password">Пароль</label>
                      <div className="invalid-feedback">
                        <ErrorMessage name="password" />
                      </div>
                    </div>

                    {/* Поле confirmPassword */}
                    <div className="form-floating mb-4">
                      <Field
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Подтвердите пароль"
                        autoComplete="new-password"
                        className={`form-control ${errors.confirmPassword && touched.confirmPassword
                          ? 'is-invalid'
                          : ''
                          }`}
                      />
                      <label htmlFor="confirmPassword">
                        Подтвердите пароль
                      </label>
                      <div className="invalid-feedback">
                        <ErrorMessage name="confirmPassword" />
                      </div>
                    </div>

                    {/* Кнопка отправки */}
                    <button
                      type="submit"
                      className="w-100 mb-3 btn btn-outline-primary"
                      disabled={isSubmitting || isLoading || !isValid || !dirty}
                    >
                      {isLoading || isSubmitting
                        ? (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            aria-hidden="true"
                          />
                        )
                        : (
                          'Зарегистрироваться'
                        )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            <div className="card-footer p-4 text-center">
              <span>Уже есть аккаунт?</span>
              {' '}
              <Link to="/login">Войти</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
