import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Todos from './pages/Todos'
import Profil from './pages/Profil'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={
          <PrivateRoute>
            <Todos />
          </PrivateRoute>
        } />
        <Route path="/profil" element={
          <PrivateRoute>
            <Profil />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App