import * as yup from 'yup'

export const getChannelSchema = (t, channels, currentId = null) =>
  yup.object().shape({
    name: yup.string()
      .min(3, t('validation.usernameRange'))
      .max(20, t('validation.usernameRange'))
      .required(t('validation.required'))
      .test(
        'unique',
        t('validation.unique'),
        value => !channels.some(c => c.name === value && c.id !== currentId),
      ),
  })
