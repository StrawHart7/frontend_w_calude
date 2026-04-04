import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!email || !password || !confirm) {
      setError('Veuillez remplir tous les champs')
      return
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    try {
      setLoading(true)
      setError('')
      await api.post('/auth/register', { email, password })
      const loginRes = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', loginRes.data.token)
      navigate('/todos') // ✅
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription')
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
          Créer un compte ✦
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>
          Rejoins TodoApp en quelques secondes
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
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />
          <button
  onClick={handleSubmit}
  disabled={loading}
  style={{ background: '#6c63ff', color: '#fff', marginTop: '8px', opacity: loading ? 0.7 : 1 }}
>
  {loading ? 'Inscription...' : "S'inscrire"}
</button>
        </div>

        <p style={{ color: '#94a3b8', marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
          Déjà un compte ?{' '}
          <Link to="/login" style={{ color: '#6c63ff', textDecoration: 'none', fontWeight: '600' }}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register