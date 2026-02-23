import * as yup from 'yup'

export const getSignupSchema = () =>
  yup.object().shape({
    username: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),

    password: yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),

    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  })
