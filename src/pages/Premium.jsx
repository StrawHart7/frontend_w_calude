import { Check, Crown, Bell, Smartphone, Palette, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api'

function Premium() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    try {
      setLoading(true)
      const res = await api.post('/payment/initiate')
      window.location.href = res.data.authorization_url
    } catch (err) {
      alert('Erreur lors de l\'initialisation du paiement')
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: <Smartphone size={22} color="#fff" />,
      iconBg: '#6c63ff',
      title: 'Synchro multi-appareils',
      description: 'Accède à tes tâches depuis ton téléphone, tablette et ordinateur en temps réel.'
    },
    {
      icon: <Bell size={22} color="#fff" />,
      iconBg: '#f59e0b',
      title: 'Rappels & Notifications',
      description: 'Ne rate plus jamais une deadline. Reçois des alertes avant chaque échéance.'
    },
    {
      icon: <Palette size={22} color="#fff" />,
      iconBg: '#10b981',
      title: 'Thèmes personnalisés',
      description: 'Choisis parmi une collection de thèmes pour une expérience vraiment à toi.'
    }
  ]

  const freeFeatures = ['Tâches illimitées', 'Deadlines', 'Accès web']
  const premiumFeatures = ['Tout le gratuit', 'Synchro multi-appareils', 'Rappels & Notifications', 'Thèmes personnalisés', 'Support prioritaire']

  return (
    <div style={{ maxWidth: '520px', margin: '0 auto', paddingBottom: '48px' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1633 0%, #0f1117 100%)',
        padding: '48px 24px 40px',
        textAlign: 'center',
        position: 'relative',
        borderBottom: '1px solid #2d3148'
      }}>
        <button
          onClick={() => navigate('/profil')}
          style={{
            position: 'absolute', top: '20px', left: '20px',
            background: 'transparent', color: '#94a3b8',
            padding: '4px'
          }}
        >
          <X size={22} />
        </button>

        <div style={{
          width: '72px', height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 0 32px rgba(108, 99, 255, 0.4)'
        }}>
          <Crown size={32} color="#fff" />
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px' }}>
          Passe à Premium 👑
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.5' }}>
          Débloque toutes les fonctionnalités et booste ta productivité
        </p>

        {/* Prix */}
        <div style={{
          marginTop: '24px',
          background: '#1e2130',
          border: '1px solid #6c63ff',
          borderRadius: '16px',
          padding: '20px',
          display: 'inline-block'
        }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '4px' }}>Seulement</p>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
            <span style={{ fontSize: '42px', fontWeight: '800', color: '#6c63ff' }}>$10</span>
            <span style={{ color: '#94a3b8', fontSize: '15px' }}>/an</span>
          </div>
          <p style={{ color: '#4ade80', fontSize: '13px', marginTop: '4px' }}>
            Soit moins de $1 par mois 🎉
          </p>
        </div>
      </div>

      {/* Fonctionnalités */}
      <div style={{ padding: '32px 24px 0' }}>
        <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', letterSpacing: '1px', marginBottom: '16px' }}>
          CE QUE TU OBTIENS
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: '#13151f',
              border: '1px solid #2d3148',
              borderRadius: '14px',
              padding: '16px',
              display: 'flex', alignItems: 'flex-start', gap: '14px'
            }}>
              <div style={{
                width: '44px', height: '44px',
                borderRadius: '12px',
                background: f.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                {f.icon}
              </div>
              <div>
                <p style={{ fontWeight: '600', fontSize: '15px', marginBottom: '4px' }}>{f.title}</p>
                <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparaison */}
      <div style={{ padding: '32px 24px 0' }}>
        <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', letterSpacing: '1px', marginBottom: '16px' }}>
          COMPARAISON
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>

          {/* Free */}
          <div style={{
            flex: 1, background: '#13151f',
            border: '1px solid #2d3148',
            borderRadius: '14px', padding: '16px'
          }}>
            <p style={{ fontWeight: '700', marginBottom: '16px', color: '#94a3b8' }}>Gratuit</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {freeFeatures.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} color="#4ade80" />
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium */}
          <div style={{
            flex: 1, background: '#13151f',
            border: '2px solid #6c63ff',
            borderRadius: '14px', padding: '16px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute', top: '-12px', left: '50%',
              transform: 'translateX(-50%)',
              background: '#6c63ff', color: '#fff',
              fontSize: '11px', fontWeight: '700',
              padding: '3px 10px', borderRadius: '20px'
            }}>
              RECOMMANDÉ
            </div>
            <p style={{ fontWeight: '700', marginBottom: '16px', color: '#6c63ff' }}>Premium</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {premiumFeatures.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} color="#6c63ff" />
                  <span style={{ fontSize: '13px' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '32px 24px 0' }}>
        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#4a4a6a' : 'linear-gradient(135deg, #6c63ff, #a78bfa)',
            color: '#fff',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '700',
            borderRadius: '14px',
            boxShadow: '0 8px 24px rgba(108, 99, 255, 0.4)',
            letterSpacing: '0.5px',
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Chargement...' : '👑 Obtenir Premium — $10/an'}
        </button>
        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '12px', marginTop: '12px' }}>
          Paiement sécurisé · Annulation à tout moment
        </p>
      </div>

    </div>
  )
}

export default Premium