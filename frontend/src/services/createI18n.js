import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ru: {
    translation: {
      auth: {
        username: 'Имя пользователя',
        userNick: 'Ваш ник',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        login: 'Войти',
        signup: 'Регистрация',
        register: 'Зарегистрироваться',
        hasAccount: 'Уже есть аккаунт?',
        noAccount: 'Нет аккаунта?',
      },
      validation: {
        required: 'Обязательное поле',
        usernameRange: 'От 3 до 20 символов',
        passwordMin: 'Не менее 6 символов',
        passwordsMatch: 'Пароли должны совпадать',
        unique: 'Должно быть уникальным',
        profanity: 'Такое слово использовать нельзя',
      },
      errors: {
        loginError: 'Неверные имя пользователя или пароль',
        userExists: 'Такой пользователь уже существует',
        connection: 'Ошибка соединения',
      },
      chat: {
        send: 'Отправить',
        messages: {
          one: 'сообщение',
          few: 'сообщения',
          many: 'сообщений',
        },
        input: {
          placeholder: 'Введите сообщение...',
          ariaLabel: 'Новое сообщение',
        },
      },
      channels: {
        title: 'Каналы',
        manage: 'Управление каналом',
        name: 'Имя канала',
        create: 'Добавить канал',
        rename: 'Переименовать канал',
        remove: 'Удалить канал',
        confirmRemove: 'Уверены?',
        cancel: 'Отменить',
        send: 'Отправить',
        delete: 'Удалить',
        edit: 'Переименовать',
        created: 'Канал создан',
        renamed: 'Канал переименован',
        removed: 'Канал удалён',
      },
      notFound: {
        title: 'Страница не найдена',
        message: 'Но вы можете перейти ',
        link: 'на главную страницу',
      },
      header: {
        brand: 'Hexlet Chat',
        logout: 'Выйти',
      },
    },
  },
}

export default async function createI18n() {
  const instance = i18next.createInstance()

  await instance
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    })

  return instance
}
