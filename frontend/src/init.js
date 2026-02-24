import createI18n from './services/createI18n'
import { createSocket } from './services/createSocket'
import { createAppStore } from './store'
import leoProfanity from 'leo-profanity'

export default async function initApp() {
  const i18n = await createI18n()
  const socket = createSocket()

  leoProfanity.clearList()

  leoProfanity.add(leoProfanity.getDictionary('en'))
  leoProfanity.add(leoProfanity.getDictionary('ru'))

  const token = localStorage.getItem('token')

  if (token) {
    socket.auth = { token }
    socket.connect()
  }

  const store = createAppStore(socket)

  return { i18n, store }
}