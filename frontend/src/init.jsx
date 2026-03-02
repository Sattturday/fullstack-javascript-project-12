import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import leoProfanity from 'leo-profanity'
import Rollbar from 'rollbar'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import createI18n from './services/createI18n'
import { createSocket } from './services/createSocket'
import { createAppStore } from './store'
import SocketContext from './contexts/SocketContext'
import App from './App'

export default async function initApp() {
  const i18n = await createI18n()

  const hasToken = Boolean(import.meta.env.VITE_ROLLBAR_TOKEN)

  const rollbar = hasToken
    ? new Rollbar({
        accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
        environment: import.meta.env.MODE,
        captureUncaught: true,
        captureUnhandledRejections: true,
        enabled: true,
      })
    : null

  const socket = createSocket()

  leoProfanity.clearList()
  leoProfanity.add(leoProfanity.getDictionary('en'))
  leoProfanity.add(leoProfanity.getDictionary('ru'))

  const store = createAppStore(socket)

  const content = (
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
          <ToastContainer position="top-right" autoClose={3000} />
        </I18nextProvider>
      </Provider>
    </SocketContext.Provider>
  )

  const AppWithProviders = () => (
    <StrictMode>
      {rollbar
        ? (
            <RollbarProvider instance={rollbar}>
              <ErrorBoundary>
                {content}
              </ErrorBoundary>
            </RollbarProvider>
          )
        : (
            content
          )}
    </StrictMode>
  )

  return {
    App: AppWithProviders,
    store,
    i18n,
    rollbar,
    socket,
  }
}
