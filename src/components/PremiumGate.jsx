import { useNavigate } from 'react-router-dom'
import { Crown, Lock } from 'lucide-react'
import { useTodos } from '../TodosContext'

function PremiumGate({ children, feature }) {
  const { isPremium } = useTodos()
  const navigate = useNavigate()

  if (isPremium) return children

  return (
    <div style={{
      position: 'relative',
      borderRadius: '14px',
      overflow: 'hidden'
    }}>
      {/* Contenu flouté derrière */}
      <div style={{ filter: 'blur(3px)', pointerEvents: 'none', userSelect: 'none' }}>
        {children}
      </div>

      {/* Overlay de blocage */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(15, 17, 23, 0.75)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '12px', borderRadius: '14px',
        border: '1px solid #2d3148'
      }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 24px rgba(108, 99, 255, 0.4)'
        }}>
          <Lock size={20} color="#fff" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: '700', fontSize: '15px', marginBottom: '4px' }}>
            {feature || 'Fonctionnalité Premium'}
          </p>
          <p style={{ color: '#94a3b8', fontSize: '13px' }}>
            Passe à Premium pour débloquer
          </p>
        </div>
        <button
          onClick={() => navigate('/premium')}
          style={{
            background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
            color: '#fff', padding: '10px 20px',
            borderRadius: '10px', fontWeight: '700', fontSize: '14px',
            display: 'flex', alignItems: 'center', gap: '6px',
            marginTop: '4px'
          }}
        >
          <Crown size={14} color="#fff" />
          Débloquer — $10/an
        </button>
      </div>
    </div>
  )
}

export default PremiumGate