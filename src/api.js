import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mon-backend-7hcj.onrender.com'
})

// Avant chaque requete, on ajoute automatiquement le token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }   
    return config
})

export default api