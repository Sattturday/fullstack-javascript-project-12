import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import initApp from './init'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const run = async () => {
  const { store, i18n, socket } = await initApp()

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App socket={socket} />
        </I18nextProvider>
      </Provider>
    </StrictMode>,
  )
}

run()