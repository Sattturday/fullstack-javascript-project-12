import createI18n from './services/createI18n'
import { createSocket } from './services/createSocket'
import { createAppStore } from './store'
import leoProfanity from 'leo-profanity'
import Rollbar from 'rollbar'

export default async function initApp() {
  const i18n = await createI18n()

  const rollbar = new Rollbar({
    accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
    environment: import.meta.env.MODE,
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: Boolean(import.meta.env.VITE_ROLLBAR_TOKEN),
  })

  const socket = createSocket()

  leoProfanity.clearList()
  leoProfanity.add(leoProfanity.getDictionary('en'))
  leoProfanity.add(leoProfanity.getDictionary('ru'))

  const store = createAppStore(socket)

  return { i18n, store, rollbar, socket }
}