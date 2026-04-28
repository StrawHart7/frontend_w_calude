import { useState } from "react";
import api from "../api";

function Profil() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = import.meta.env.VITE_APP_URL;
  };

  return (
    <div style={{ maxWidth: "520px", margin: "48px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>
        Mon profil
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "32px" }}>
        Gère tes informations personnelles
      </p>

      {error && (
        <p
          style={{
            background: "#2d1f1f",
            color: "#f87171",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px",
          }}
        >
          {error}
        </p>
      )}

      {success && (
        <p
          style={{
            background: "#1a2f1a",
            color: "#4ade80",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px",
          }}
        >
          {success}
        </p>
      )}


      {/* Infos */}
      <div
        style={{
          background: "#13151f",
          border: "1px solid #2d3148",
          borderRadius: "16px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div>
          <label
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Nouveau mot de passe
          </label>
          <input type="password" placeholder="••••••••" />
        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{ background: "#2d1f1f", color: "#f87171", width: "100%" }}
      >
        Se déconnecter
      </button>
    </div>
  );
}

export default Profil;
