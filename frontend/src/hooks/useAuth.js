import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation, useSignupMutation } from '../services/api'

export const useAuth = (isLogin) => {
  const navigate = useNavigate()
  const [login, { isLoading: isLoginLoading }] = useLoginMutation()
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation()
  const [submitError, setSubmitError] = useState(null)

  const isLoading = isLogin ? isLoginLoading : isSignupLoading

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitError(null)

      let result = null

      if (isLogin) {
        result = await login(values).unwrap()
      }
      else {
        result = await signup({
          username: values.username,
          password: values.password,
        }).unwrap()
      }

      if (result.token) {
        navigate('/')
      }
    }
    catch (err) {
      if (isLogin && err.status === 401) {
        setSubmitError('errors.loginError')
      }
      else if (!isLogin && err.status === 409) {
        setSubmitError('errors.userExists')
      }
      else {
        setSubmitError('errors.connection')
      }
    }
    finally {
      setSubmitting(false)
    }
  }

  return {
    submitError,
    isLoading,
    handleSubmit,
  }
}
