import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  User,
  Lock,
  Globe,
  Star,
  MessageSquare,
  LogOut,
  Crown,
} from "lucide-react";

function Profil() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = import.meta.env.VITE_APP_URL;
  };

  const email = localStorage.getItem("userEmail") || "ton@email.com";

  const SettingItem = ({ icon, iconBg, label, value, onClick, danger }) => (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        cursor: onClick ? "pointer" : "default",
        borderBottom: "1px solid #1e2130",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1c2a")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <span
          style={{ fontSize: "15px", color: danger ? "#f87171" : "#e2e8f0" }}
        >
          {label}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {value && (
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>{value}</span>
        )}
        {onClick && !danger && <ChevronRight size={16} color="#94a3b8" />}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", padding: "0" }}>
      {/* Header profil */}
      <div
        style={{
          background: "#13151f",
          padding: "32px 24px 24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          borderBottom: "1px solid #2d3148",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#6c63ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: "700",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {email.charAt(0).toUpperCase()}
        </div>
        <div>
          <p style={{ fontWeight: "600", fontSize: "16px" }}>{email}</p>
          <p style={{ color: "#4ade80", fontSize: "13px", marginTop: "2px" }}>
            ● Connecté
          </p>
        </div>
      </div>

      {/* Go Premium */}
      <div
        onClick={() => navigate("/premium")}
        style={{
          margin: "16px",
          background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
          borderRadius: "14px",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(108, 99, 255, 0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Crown size={22} color="#fff" />
          <div>
            <p style={{ fontWeight: "700", fontSize: "15px" }}>Go Premium</p>
            <p style={{ fontSize: "12px", opacity: 0.85 }}>
              Synchro, rappels, thèmes
            </p>
          </div>
        </div>
        <ChevronRight size={20} color="#fff" />
      </div>

      {error && (
        <p
          style={{
            background: "#2d1f1f",
            color: "#f87171",
            padding: "12px 24px",
            fontSize: "14px",
          }}
        >
          {error}
        </p>
      )}

      {/* Section COMPTE */}
      <div style={{ padding: "24px 24px 8px" }}>
        <p
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#94a3b8",
            letterSpacing: "1px",
          }}
        >
          COMPTE
        </p>
      </div>
      <div
        style={{
          background: "#13151f",
          borderRadius: "12px",
          margin: "0 16px",
          overflow: "hidden",
        }}
      >
        <SettingItem
          icon={<User size={18} color="#fff" />}
          iconBg="#6c63ff"
          label="Modifier l'email"
          onClick={() => {}}
        />
        <SettingItem
          icon={<Lock size={18} color="#fff" />}
          iconBg="#f59e0b"
          label="Modifier le mot de passe"
          onClick={() => {}}
        />
      </div>

      {/* Section APPLICATION */}
      <div style={{ padding: "24px 24px 8px" }}>
        <p
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#94a3b8",
            letterSpacing: "1px",
          }}
        >
          APPLICATION
        </p>
      </div>
      <div
        style={{
          background: "#13151f",
          borderRadius: "12px",
          margin: "0 16px",
          overflow: "hidden",
        }}
      >
        <SettingItem
          icon={<Globe size={18} color="#fff" />}
          iconBg="#10b981"
          label="Langue"
          value="Français"
        />
      </div>

      {/* Section AUTRE */}
      <div style={{ padding: "24px 24px 8px" }}>
        <p
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#94a3b8",
            letterSpacing: "1px",
          }}
        >
          AUTRE
        </p>
      </div>
      <div
        style={{
          background: "#13151f",
          borderRadius: "12px",
          margin: "0 16px",
          overflow: "hidden",
        }}
      >
        <SettingItem
          icon={<Star size={18} color="#fff" />}
          iconBg="#f59e0b"
          label="Noter l'app"
          onClick={() => {}}
        />
        <SettingItem
          icon={<MessageSquare size={18} color="#fff" />}
          iconBg="#3b82f6"
          label="Feedback"
          onClick={() => {}}
        />
      </div>

      {/* Déconnexion */}
      <div
        style={{
          margin: "24px 16px 8px",
          background: "#13151f",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <SettingItem
          icon={<LogOut size={18} color="#f87171" />}
          iconBg="#2d1f1f"
          label="Se déconnecter"
          onClick={handleLogout}
          danger
        />
      </div>

      {/* Version */}
      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "13px",
          padding: "24px",
        }}
      >
        Version 1.0.13
      </p>
    </div>
  );
}

export default Profil;
