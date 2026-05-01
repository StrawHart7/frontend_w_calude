import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  ChevronRight, User, Lock, Globe, Star,
  MessageSquare, LogOut, Crown, X
} from "lucide-react";

function Profil() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [modal, setModal] = useState(null) // 'email' | 'password' | null
  const [loading, setLoading] = useState(false)

  // Champs email
  const [newEmail, setNewEmail] = useState("")
  const [emailPassword, setEmailPassword] = useState("")

  // Champs password
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "ton@email.com")

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      await api.post('/auth/logout', { refreshToken })
    } catch (e) {}
    finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userEmail')
      window.location.href = import.meta.env.VITE_APP_URL
    }
  }

  const handleUpdateEmail = async () => {
    if (!newEmail || !emailPassword) return setError("Remplis tous les champs")
    try {
      setLoading(true)
      setError("")
      const res = await api.put('/auth/update-email', { newEmail, password: emailPassword })
      localStorage.setItem('accessToken', res.data.accessToken)
      localStorage.setItem('userEmail', res.data.email)
      setEmail(res.data.email)
      setSuccess("Email mis à jour !")
      setModal(null)
      setNewEmail("")
      setEmailPassword("")
    } catch (err) {
      setError(err.response?.data?.message || "Erreur")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) return setError("Remplis tous les champs")
    if (newPassword.length < 6) return setError("Mot de passe trop court (6 caractères minimum)")
    try {
      setLoading(true)
      setError("")
      await api.put('/auth/update-password', { currentPassword, newPassword })
      setSuccess("Mot de passe mis à jour !")
      setModal(null)
      setCurrentPassword("")
      setNewPassword("")
    } catch (err) {
      setError(err.response?.data?.message || "Erreur")
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setModal(null)
    setError("")
    setNewEmail("")
    setEmailPassword("")
    setCurrentPassword("")
    setNewPassword("")
  }

  const SettingItem = ({ icon, iconBg, label, value, onClick, danger }) => (
    <div
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 16px", cursor: onClick ? "pointer" : "default",
        borderBottom: "1px solid #1e2130", transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1c2a")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px", background: iconBg,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          {icon}
        </div>
        <span style={{ fontSize: "15px", color: danger ? "#f87171" : "#e2e8f0" }}>
          {label}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {value && <span style={{ fontSize: "13px", color: "#94a3b8" }}>{value}</span>}
        {onClick && !danger && <ChevronRight size={16} color="#94a3b8" />}
      </div>
    </div>
  )

  const modalInputStyle = {
    width: "100%", padding: "12px", borderRadius: "8px",
    background: "#0f1117", border: "1px solid #2d3148",
    color: "#e2e8f0", fontSize: "14px", boxSizing: "border-box"
  }

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", padding: "0" }}>

      {/* Modal overlay */}
      {modal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000, padding: "24px"
        }}>
          <div style={{
            background: "#13151f", borderRadius: "16px", padding: "24px",
            width: "100%", maxWidth: "400px", border: "1px solid #2d3148"
          }}>
            {/* Header modal */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "700" }}>
                {modal === 'email' ? "Modifier l'email" : "Modifier le mot de passe"}
              </h2>
              <div onClick={closeModal} style={{ cursor: "pointer", color: "#94a3b8" }}>
                <X size={20} />
              </div>
            </div>

            {error && (
              <p style={{
                background: "#2d1f1f", color: "#f87171", padding: "10px 12px",
                borderRadius: "8px", fontSize: "13px", marginBottom: "16px"
              }}>{error}</p>
            )}

            {/* Champs email */}
            {modal === 'email' && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  type="email" placeholder="Nouvel email"
                  value={newEmail} onChange={e => setNewEmail(e.target.value)}
                  style={modalInputStyle}
                />
                <input
                  type="password" placeholder="Mot de passe actuel (confirmation)"
                  value={emailPassword} onChange={e => setEmailPassword(e.target.value)}
                  style={modalInputStyle}
                />
                <button
                  onClick={handleUpdateEmail} disabled={loading}
                  style={{ background: "#6c63ff", color: "#fff", padding: "12px", borderRadius: "8px", marginTop: "4px" }}
                >
                  {loading ? "..." : "Confirmer"}
                </button>
              </div>
            )}

            {/* Champs password */}
            {modal === 'password' && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  type="password" placeholder="Mot de passe actuel"
                  value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}
                  style={modalInputStyle}
                />
                <input
                  type="password" placeholder="Nouveau mot de passe"
                  value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  style={modalInputStyle}
                />
                <button
                  onClick={handleUpdatePassword} disabled={loading}
                  style={{ background: "#6c63ff", color: "#fff", padding: "12px", borderRadius: "8px", marginTop: "4px" }}
                >
                  {loading ? "..." : "Confirmer"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header profil */}
      <div style={{
        background: "#13151f", padding: "32px 24px 24px",
        display: "flex", alignItems: "center", gap: "16px",
        borderBottom: "1px solid #2d3148",
      }}>
        <div style={{
          width: "56px", height: "56px", borderRadius: "50%", background: "#6c63ff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "22px", fontWeight: "700", color: "#fff", flexShrink: 0,
        }}>
          {email.charAt(0).toUpperCase()}
        </div>
        <div>
          <p style={{ fontWeight: "600", fontSize: "16px" }}>{email}</p>
          <p style={{ color: "#4ade80", fontSize: "13px", marginTop: "2px" }}>● Connecté</p>
        </div>
      </div>

      {/* Go Premium */}
      <div onClick={() => navigate("/premium")} style={{
        margin: "16px", background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
        borderRadius: "14px", padding: "16px 20px", display: "flex",
        alignItems: "center", justifyContent: "space-between", cursor: "pointer",
        boxShadow: "0 4px 20px rgba(108, 99, 255, 0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Crown size={22} color="#fff" />
          <p style={{ fontWeight: "800", fontSize: "18px" }}>Go Premium</p>
        </div>
        <ChevronRight size={20} color="#fff" />
      </div>

      {success && (
        <p style={{
          background: "#1a2f1a", color: "#4ade80", padding: "12px 24px", fontSize: "14px"
        }}>{success}</p>
      )}

      {/* Section COMPTE */}
      <div style={{ padding: "24px 24px 8px" }}>
        <p style={{ fontSize: "12px", fontWeight: "600", color: "#94a3b8", letterSpacing: "1px" }}>COMPTE</p>
      </div>
      <div style={{ background: "#13151f", borderRadius: "12px", margin: "0 16px", overflow: "hidden" }}>
        <SettingItem
          icon={<User size={18} color="#fff" />} iconBg="#6c63ff"
          label="Modifier l'email" onClick={() => { setError(""); setModal('email') }}
        />
        <SettingItem
          icon={<Lock size={18} color="#fff" />} iconBg="#f59e0b"
          label="Modifier le mot de passe" onClick={() => { setError(""); setModal('password') }}
        />
      </div>

      {/* Section APPLICATION */}
      <div style={{ padding: "24px 24px 8px" }}>
        <p style={{ fontSize: "12px", fontWeight: "600", color: "#94a3b8", letterSpacing: "1px" }}>APPLICATION</p>
      </div>
      <div style={{ background: "#13151f", borderRadius: "12px", margin: "0 16px", overflow: "hidden" }}>
        <SettingItem icon={<Globe size={18} color="#fff" />} iconBg="#10b981" label="Langue" value="Français" />
      </div>

      {/* Section AUTRE */}
      <div style={{ padding: "24px 24px 8px" }}>
        <p style={{ fontSize: "12px", fontWeight: "600", color: "#94a3b8", letterSpacing: "1px" }}>AUTRE</p>
      </div>
      <div style={{ background: "#13151f", borderRadius: "12px", margin: "0 16px", overflow: "hidden" }}>
        <SettingItem icon={<Star size={18} color="#fff" />} iconBg="#f59e0b" label="Noter l'app" onClick={() => {}} />
        <SettingItem icon={<MessageSquare size={18} color="#fff" />} iconBg="#3b82f6" label="Feedback" onClick={() => {}} />
      </div>

      {/* Déconnexion */}
      <div style={{ margin: "24px 16px 8px", background: "#13151f", borderRadius: "12px", overflow: "hidden" }}>
        <SettingItem
          icon={<LogOut size={18} color="#f87171" />} iconBg="#2d1f1f"
          label="Se déconnecter" onClick={handleLogout} danger
        />
      </div>

      <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "13px", padding: "24px" }}>
        Version 1.0.15
      </p>
    </div>
  )
}

export default Profil