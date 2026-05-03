import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'

function ComingSoon({ title, message }) {
  const navigate = useNavigate()

  return (
    <div style={{
      maxWidth: '520px', margin: '0 auto',
      padding: '80px 24px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', textAlign: 'center', gap: '16px'
    }}>
      <div style={{
        width: '72px', height: '72px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 32px rgba(108, 99, 255, 0.4)'
      }}>
        <Clock size={32} color="#fff" />
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: '800', marginTop: '8px' }}>
        {title || 'Bientôt disponible'}
      </h1>

      <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', maxWidth: '320px' }}>
        {message || 'Nous te remercions pour l\'intérêt que tu portes à l\'app. Cette fonctionnalité est en cours de développement et sera disponible très prochainement.'}
      </p>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: '8px',
          background: '#1e2130', color: '#e2e8f0',
          padding: '12px 24px', borderRadius: '12px',
          fontWeight: '600', fontSize: '15px',
          display: 'flex', alignItems: 'center', gap: '8px',
          border: '1px solid #2d3148'
        }}
      >
        <ArrowLeft size={16} /> Retour
      </button>
    </div>
  )
}

export default ComingSoon