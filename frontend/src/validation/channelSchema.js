import * as yup from 'yup'

export const getChannelSchema = (channels, currentId = null) =>
  yup.object().shape({
    name: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .test(
        'unique',
        'Канал с таким именем уже существует',
        value =>
          !channels.some(
            c => c.name === value && c.id !== currentId,
          ),
      ),
  })
