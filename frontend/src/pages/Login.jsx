import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { useLoginMutation } from '../services/api'
import { useState, useEffect } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [login, { isLoading, error: rtkError }] = useLoginMutation()
  const [submitError, setSubmitError] = useState(null)

  // Очищаем ошибку при монтировании компонента
  useEffect(() => {
    setSubmitError(null)
  }, [submitError])

  const validate = values => {
    const errors = {}

    if (!values.username) {
      errors.username = 'Обязательное поле'
    } else if (values.username.length < 3) {
      errors.username = 'Имя пользователя должно быть не менее 3 символов'
    } else if (values.username.length > 20) {
      errors.username = 'Имя пользователя должно быть не более 20 символов'
    }

    if (!values.password) {
      errors.password = 'Обязательное поле'
    } else if (values.password.length < 5) {
      errors.password = 'Пароль должен быть не менее 5 символов'
    }

    return errors
  }

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitError(null) // Очищаем предыдущую ошибку

      const result = await login(values).unwrap()

      if (result.token) {
        navigate('/')
      }
    } catch (err) {
      // Обрабатываем разные форматы ошибок от сервера
      let errorMessage = 'Ошибка авторизации'

      if (err.data?.message) {
        errorMessage = err.data.message
      } else if (err.data?.error) {
        errorMessage = err.data.error
      } else if (err.message) {
        errorMessage = err.message
      }

      // Если сервер вернул ошибки валидации для конкретных полей
      if (err.data?.errors) {
        const fieldErrors = {}
        Object.keys(err.data.errors).forEach(key => {
          fieldErrors[key] = err.data.errors[key].join(', ')
        })
        setErrors(fieldErrors)
      } else {
        // Общая ошибка формы
        setSubmitError(errorMessage)
      }

      console.error('Login failed:', err)
    } finally {
      setSubmitting(false)
    }
  }

  // Функция для получения текста ошибки
  const getErrorMessage = () => {
    if (submitError) return submitError
    if (rtkError) {
      return (
        rtkError.data?.message ||
        rtkError.data?.error ||
        rtkError.message ||
        'Ошибка подключения к серверу'
      )
    }
    return null
  }

  const errorMessage = getErrorMessage()

  return (
    <div className='container vh-100 d-flex align-items-center justify-content-center'>
      <div className='row justify-content-center w-100'>
        <div className='col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5'>
          <div className='card shadow-sm'>
            <div className='card-body p-5'>
              <h1 className='text-center mb-4'>Войти</h1>

              <Formik
                initialValues={{ username: '', password: '' }}
                validate={validate}
                onSubmit={handleSubmit}
                validateOnChange={false} // Валидация только при потере фокуса
                validateOnBlur={true}
              >
                {({ isSubmitting, errors, touched, isValid, dirty }) => (
                  <Form>
                    {/* Блок с ошибкой фиксированной высоты */}
                    <div
                      className='mb-3'
                      style={{ minHeight: '58px' }}
                    >
                      {errorMessage && (
                        <div
                          className='alert alert-danger alert-dismissible fade show py-2'
                          role='alert'
                        >
                          <small>{errorMessage}</small>
                          <button
                            type='button'
                            className='btn-close btn-sm'
                            onClick={() => {
                              setSubmitError(null)
                            }}
                            aria-label='Close'
                          />
                        </div>
                      )}
                    </div>

                    {/* Поле username */}
                    <div className='form-floating mb-3'>
                      <Field
                        name='username'
                        id='username'
                        placeholder='Ваш ник'
                        autoComplete='username'
                        className={`form-control ${
                          errors.username && touched.username
                            ? 'is-invalid'
                            : ''
                        }`}
                      />
                      <label htmlFor='username'>Ваш ник</label>
                      <div className='invalid-feedback'>
                        <ErrorMessage name='username' />
                      </div>
                    </div>

                    {/* Поле password */}
                    <div className='form-floating mb-4'>
                      <Field
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Пароль'
                        autoComplete='current-password'
                        className={`form-control ${
                          errors.password && touched.password
                            ? 'is-invalid'
                            : ''
                        }`}
                      />
                      <label htmlFor='password'>Пароль</label>
                      <div className='invalid-feedback'>
                        <ErrorMessage name='password' />
                      </div>
                    </div>

                    {/* Кнопка отправки */}
                    <button
                      type='submit'
                      className='w-100 mb-3 btn btn-outline-primary'
                      disabled={isSubmitting || isLoading || !isValid || !dirty}
                    >
                      {isLoading || isSubmitting ? (
                        <span
                          className='spinner-border spinner-border-sm me-2'
                          aria-hidden='true'
                        />
                      ) : (
                        'Войти'
                      )}
                    </button>

                    {/* Подсказка для тестирования */}
                    <div className='text-center text-muted small'>
                      <p className='mb-0'>Для теста используйте:</p>
                      <code>admin / admin</code>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            <div className='card-footer p-4 text-center'>
              <span>Нет аккаунта?</span> <Link to='/signup'>Регистрация</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
