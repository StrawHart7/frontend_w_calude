import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const hideOn = ['/login', '/register']

  if (hideOn.includes(location.pathname)) return null

  return (
    <nav style={{
      background: '#13151f',
      borderBottom: '1px solid #2d3148',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{ fontSize: '20px', fontWeight: '700', color: '#6c63ff' }}>
        ✦ TodoApp
      </span>
      <div style={{ display: 'flex', gap: '24px' }}>
        <Link to="/todos" style={{
          color: location.pathname === '/todos' ? '#6c63ff' : '#94a3b8',
          textDecoration: 'none',
          fontWeight: '500'
        }}>
          Tâches
        </Link>
        <Link to="/profil" style={{
          color: location.pathname === '/profil' ? '#6c63ff' : '#94a3b8',
          textDecoration: 'none',
          fontWeight: '500'
        }}>
          Profil
        </Link>
      </div>
    </nav>
  )
}

export default Navbar