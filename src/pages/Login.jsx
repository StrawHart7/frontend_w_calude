import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs')
      return
    }
    try {
      setLoading(true)
      const res = await api.post('/auth/login', {email, password})
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userEmail', email)
      navigate('/todos')
    } catch (error) {
      setError( error.response?.data?.message || 'Errur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#13151f',
        border: '1px solid #2d3148',
        borderRadius: '16px',
        padding: '48px',
        width: '100%',
        maxWidth: '420px',
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
          Bon retour 👋
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>
          Connecte-toi à ton compte
        </p>

        {error && (
          <p style={{
            background: '#2d1f1f',
            color: '#f87171',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            style={{ background: '#6c63ff', color: '#fff', marginTop: '8px' }}
          >
            Se connecter
          </button>
        </div>

        <p style={{ color: '#94a3b8', marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
          Pas encore de compte ?{' '}
          <Link to="/register" style={{ color: '#6c63ff', textDecoration: 'none', fontWeight: '600' }}>
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login