import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  return token ? children : null
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
