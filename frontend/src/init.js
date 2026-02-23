import createI18n from './services/createI18n'
import { createSocket } from './services/createSocket'
import { createAppStore } from './store'

export default async function initApp() {
  const i18n = await createI18n()
  const socket = createSocket()
  const store = createAppStore(socket)

  socket.connect()

  return { i18n, store }
}