import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Crown, CheckCircle, XCircle, Loader } from 'lucide-react'
import api from '../api'

function PremiumSuccess() {
  const [status, setStatus] = useState('loading') // loading | success | error
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const verify = async () => {
      const reference = searchParams.get('reference')

      if (!reference) {
        setStatus('error')
        return
      }

      try {
        await api.post('/payment/verify', { reference })
        setStatus('success')
        setTimeout(() => navigate('/todos'), 3000)
      } catch (err) {
        setStatus('error')
      }
    }

    verify()
  }, [])

  return (
    <div style={{
      maxWidth: '520px', margin: '0 auto',
      padding: '80px 24px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', textAlign: 'center', gap: '16px'
    }}>

      {status === 'loading' && (
        <>
          <Loader size={48} color="#6c63ff" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>Vérification du paiement...</p>
        </>
      )}

      {status === 'success' && (
        <>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 32px rgba(108, 99, 255, 0.4)'
          }}>
            <Crown size={36} color="#fff" />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '800' }}>Bienvenue dans Premium 👑</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>Ton paiement a été confirmé. Toutes les fonctionnalités sont débloquées.</p>
          <p style={{ color: '#6c63ff', fontSize: '13px' }}>Redirection dans 3 secondes...</p>
        </>
      )}

      {status === 'error' && (
        <>
          <XCircle size={48} color="#ef4444" />
          <h1 style={{ fontSize: '22px', fontWeight: '800' }}>Paiement non confirmé</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>Le paiement n'a pas pu être vérifié. Contacte le support si tu as été débité.</p>
          <button
            onClick={() => navigate('/premium')}
            style={{
              marginTop: '8px',
              background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
              color: '#fff', padding: '12px 24px',
              borderRadius: '12px', fontWeight: '700', fontSize: '15px'
            }}
          >
            Réessayer
          </button>
        </>
      )}

    </div>
  )
}

export default PremiumSuccess