import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import { socket } from './services/socket'
import initApp from './init'

const { App } = await initApp(socket)

createRoot(document.getElementById('root')).render(<App />)
