import * as yup from 'yup'

export const getSignupSchema = t =>
  yup.object().shape({
    username: yup.string()
      .min(3, t('validation.usernameRange'))
      .max(20, t('validation.usernameRange'))
      .required(t('validation.required')),

    password: yup.string()
      .min(6, t('validation.passwordMin'))
      .required(t('validation.required')),

    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], t('validation.passwordsMatch'))
      .required(t('validation.required')),
  })
