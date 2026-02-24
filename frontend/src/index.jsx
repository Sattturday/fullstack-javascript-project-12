import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import App from './App'
import initApp from './init'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'

const run = async () => {
  const { store, i18n, rollbar } = await initApp()

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RollbarProvider instance={rollbar}>
        <ErrorBoundary>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <App />
              <ToastContainer position="top-right" autoClose={3000} />
            </I18nextProvider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </StrictMode>,
  )
}

run()
