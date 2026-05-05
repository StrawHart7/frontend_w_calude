import { createContext, useContext, useState, useEffect } from 'react'
import api from './api'

const TodosContext = createContext()

export function TodosProvider({ children }) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [isPremium, setIsPremium] = useState(false)
  const [user, setUser] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchMe = async () => {
  try {
    const res = await api.get('/auth/me')
    setUser(res.data)
    setIsPremium(res.data.is_premium)
    if (res.data.is_premium) {
      subscribeToPush()
    }
  } catch (err) {
    // silencieux
  }
}

  const subscribeToPush = async () => {
  try {
    console.log('subscribeToPush called');
    const reg = await navigator.serviceWorker.ready;
    console.log('SW ready');

    const existing = await reg.pushManager.getSubscription();
    console.log('existing:', existing);
    if (existing) return;

    const permission = await Notification.requestPermission();
    console.log('permission:', permission);
    if (permission !== 'granted') return;

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BBnvUNOreE6ub6DfGZlmQQAa7GrPwAk9tR_Kbb5t6Qo4RBE2moFYI0RlMAPCSrQ-01geNLEkqSo-OFWqznMvWzA'
    });
    console.log('sub créée:', sub);

    const res = await api.post('/push/subscribe', sub);
    console.log('réponse backend:', res.data);
  } catch (err) {
    console.error('Push subscribe erreur:', err);
  }
};

  const fetchTodos = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const res = await api.get('/todos')
      setTodos(res.data)
    } catch (err) {
      showToast('Erreur lors du chargement', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      fetchMe()
      fetchTodos()
    } else {
      setLoading(false)
    }
  }, [])

  const addTodo = async (tache) => {
    try {
      const res = await api.post('/todos', { tache })
      setTodos(prev => [...prev, res.data])
      showToast('Tâche ajoutée !')
    } catch (err) {
      showToast(err.response?.data?.message || 'Erreur', 'error')
    }
  }

  const toggleComplete = async (todo) => {
    try {
      const res = await api.put(`/todos/${todo.id}`, { completed: !todo.completed })
      setTodos(prev => prev.map(t => t.id === todo.id ? res.data : t))
    } catch (err) {
      showToast('Erreur', 'error')
    }
  }

  const saveEdit = async (id, tache, deadline) => {
    try {
      const res = await api.put(`/todos/${id}`, { tache, deadline: deadline || null })
      setTodos(prev => prev.map(t => t.id === id ? res.data : t))
      showToast('Tâche modifiée !')
    } catch (err) {
      showToast('Erreur', 'error')
    }
  }

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`)
      setTodos(prev => prev.filter(t => t.id !== id))
      showToast('Tâche supprimée !')
    } catch (err) {
      showToast('Erreur', 'error')
    }
  }

  return (
    <TodosContext.Provider value={{ todos, loading, toast, isPremium, user, fetchMe, addTodo, toggleComplete, saveEdit, deleteTodo, fetchTodos }}>
      {children}
    </TodosContext.Provider>
  )
}

export function useTodos() {
  return useContext(TodosContext)
}