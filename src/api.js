import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Intercepteur requête → ajoute l'accessToken
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken') // ✅ nouvelle clé
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Intercepteur réponse → gère les 401
api.interceptors.response.use(
  (response) => response, // si tout va bien, on laisse passer
  async (error) => {
    const originalRequest = error.config

    // Si 401 et qu'on n'a pas déjà réessayé
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // marquer pour éviter une boucle infinie

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          { refreshToken }
        )

        const newAccessToken = res.data.accessToken
        localStorage.setItem('accessToken', newAccessToken)

        // Relancer la requête originale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)

      } catch (refreshError) {
        // Refresh échoué → déconnexion forcée
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userEmail')
        window.location.href = import.meta.env.VITE_APP_URL
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api