import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!email || !password || !confirm) {
      setError('Veuillez remplir tous les champs')
      return
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    console.log('Register:', { email, password })
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
            style={{ background: '#6c63ff', color: '#fff', marginTop: '8px' }}
          >
            S'inscrire
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