import { useState } from 'react'

function Profil() {
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(null)

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhoto(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = () => {
    if (!photo) return
    console.log('Upload:', photo)
  }

  return (
    <div style={{
      maxWidth: '520px',
      margin: '48px auto',
      padding: '0 24px'
    }}>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
        Mon profil
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '32px' }}>
        Gère tes informations personnelles
      </p>

      {/* Avatar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          background: '#1e2130',
          border: '3px solid #6c63ff',
          overflow: 'hidden',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px'
        }}>
          {preview
            ? <img src={preview} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : '👤'
          }
        </div>
        <label style={{
          background: '#1e2130',
          border: '1px solid #2d3148',
          color: '#e2e8f0',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Choisir une photo
          <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
        </label>
      </div>

      {/* Infos */}
      <div style={{
        background: '#13151f',
        border: '1px solid #2d3148',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <label style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
            Email
          </label>
          <input type="email" placeholder="ton@email.com" />
        </div>
        <div>
          <label style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
            Nouveau mot de passe
          </label>
          <input type="password" placeholder="••••••••" />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        style={{ background: '#6c63ff', color: '#fff', width: '100%' }}
      >
        Sauvegarder
      </button>
    </div>
  )
}

export default Profil