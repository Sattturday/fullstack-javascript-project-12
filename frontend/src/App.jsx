import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import { routes } from './routes'

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1 d-flex justify-content-center">
          <Routes>
            <Route
              path={routes.home}
              element={(
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )}
            />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.signup} element={<Signup />} />
            <Route path={routes.notFound} element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
