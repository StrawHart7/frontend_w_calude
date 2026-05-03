import { Link, useLocation } from 'react-router-dom'
import { CheckSquare, User } from 'lucide-react'

function BottomBar() {
  const location = useLocation()
  const hideOn = ['/login', '/register', '/premium/success', '/coming-soon', '/premium']

  if (hideOn.includes(location.pathname)) return null

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#13151f',
      borderTop: '1px solid #2d3148',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '12px 0 20px',
      zIndex: 100
    }}>
      <Link to="/todos" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '4px', textDecoration: 'none',
        color: location.pathname === '/todos' ? '#6c63ff' : '#94a3b8',
      }}>
        <CheckSquare size={22} />
        <span style={{ fontSize: '11px', fontWeight: '600' }}>Tâches</span>
      </Link>

      <Link to="/profil" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '4px', textDecoration: 'none',
        color: location.pathname === '/profil' ? '#6c63ff' : '#94a3b8',
      }}>
        <User size={22} />
        <span style={{ fontSize: '11px', fontWeight: '600' }}>Profil</span>
      </Link>
    </nav>
  )
}

export default BottomBar