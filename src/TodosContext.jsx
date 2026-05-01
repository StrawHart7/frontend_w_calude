import { createContext, useContext, useState, useEffect } from 'react'
import api from './api'

const TodosContext = createContext()

export function TodosProvider({ children }) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Chargement unique au démarrage
  useEffect(() => {
  const token = localStorage.getItem('accessToken')
  if (!token) return // ✅ ne rien faire si pas connecté

  const fetchTodos = async () => {
    try {
      const res = await api.get('/todos')
      setTodos(res.data)
    } catch (err) {
      showToast('Erreur lors du chargement', 'error')
    } finally {
      setLoading(false)
    }
  }
  fetchTodos()
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
    <TodosContext.Provider value={{ todos, loading, toast, addTodo, toggleComplete, saveEdit, deleteTodo }}>
      {children}
    </TodosContext.Provider>
  )
}

export function useTodos() {
  return useContext(TodosContext)
}