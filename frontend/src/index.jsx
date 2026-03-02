import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import initApp from './init'

const run = async () => {
  const { App } = await initApp()
  createRoot(document.getElementById('root')).render(<App />)
}

run()
