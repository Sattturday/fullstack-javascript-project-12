import * as yup from 'yup'

export const getLoginSchema = t =>
  yup.object().shape({
    username: yup.string()
      .required(t('validation.required')),

    password: yup.string()
      .required(t('validation.required')),
  })
