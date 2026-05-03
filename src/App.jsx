import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import BottomBar from "./components/BottomBar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Todos from "./pages/Todos"
import Profil from "./pages/Profil"
import PrivateRoute from "./PrivateRoute"
import Premium from "./pages/Premium"
import PremiumSuccess from "./pages/PremiumSuccess"
import ComingSoon from './pages/ComingSoon'
import { TodosProvider } from "./TodosContext"

function App() {
  return (
    <BrowserRouter>
      <TodosProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todos" element={<PrivateRoute><Todos /></PrivateRoute>} />
          <Route path="/profil" element={<PrivateRoute><Profil /></PrivateRoute>} />
          <Route path="/premium" element={<PrivateRoute><Premium /></PrivateRoute>} />
          <Route path="/premium/success" element={<PrivateRoute><PremiumSuccess /></PrivateRoute>} />
          <Route path="/coming-soon" element={<PrivateRoute><ComingSoon /></PrivateRoute>} />
        </Routes>
        <BottomBar />
      </TodosProvider>
    </BrowserRouter>
  )
}

export default App