import { useState, useEffect } from 'react'
import api from '../api'

function Todos() {
  const [todos, setTodos] = useState([])
  const [newTache, setNewTache] = useState('')
  const [newDeadline, setNewDeadline] = useState('')
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
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

  const addTodo = async () => {
    if (!newTache.trim()) return
    try {
      const res = await api.post('/todos', { tache: newTache, deadline: newDeadline || null })
      setTodos([...todos, res.data])
      setNewTache('')
      setNewDeadline('')
      showToast('Tâche ajoutée !')
    } catch (err) {
      showToast(err.response?.data?.message || 'Erreur lors de l\'ajout', 'error')
    }
  }

  const toggleComplete = async (todo) => {
    try {
      const res = await api.put(`/todos/${todo.id}`, { completed: !todo.completed })
      setTodos(todos.map(t => t.id === todo.id ? res.data : t))
    } catch (err) {
      showToast('Erreur', 'error')
    }
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.tache)
  }

  const saveEdit = async (id) => {
    try {
      const res = await api.put(`/todos/${id}`, { tache: editText })
      setTodos(todos.map(t => t.id === id ? res.data : t))
      setEditingId(null)
      showToast('Tâche modifiée !')
    } catch (err) {
      showToast('Erreur lors de la modification', 'error')
    }
  }

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`)
      setTodos(todos.filter(todo => todo.id !== id))
      showToast('Tâche supprimée !')
    } catch (err) {
      showToast('Erreur lors de la suppression', 'error')
    }
  }

  const remaining = todos.filter(t => !t.completed).length

  return (
    <div style={{ maxWidth: '640px', margin: '48px auto', padding: '0 24px' }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px',
          background: toast.type === 'error' ? '#2d1f1f' : '#1a2f1a',
          color: toast.type === 'error' ? '#f87171' : '#4ade80',
          padding: '14px 20px', borderRadius: '10px',
          fontSize: '14px', fontWeight: '500',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          zIndex: 1000, transition: 'all 0.3s'
        }}>
          {toast.type === 'error' ? '❌' : '✅'} {toast.message}
        </div>
      )}

      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
        Mes tâches
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '32px' }}>
        {remaining} tâche{remaining > 1 ? 's' : ''} restante{remaining > 1 ? 's' : ''}
      </p>

      {/* Ajouter une tâche */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Nouvelle tâche..."
          value={newTache}
          onChange={e => setNewTache(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button
          onClick={addTodo}
          style={{ background: '#6c63ff', color: '#fff', whiteSpace: 'nowrap', padding: '12px 20px' }}
        >
          + Ajouter
        </button>
      </div>

      {/* Date limite */}
      <div style={{ marginBottom: '32px' }}>
        <input
          type="date"
          value={newDeadline}
          onChange={e => setNewDeadline(e.target.value)}
          style={{ width: 'auto' }}
        />
      </div>

      {/* Liste */}
      {loading ? (
        <p style={{ color: '#94a3b8', textAlign: 'center', padding: '48px 0' }}>Chargement...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {todos.length === 0 && (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '48px 0' }}>
              Aucune tâche pour le moment 🎉
            </p>
          )}
          {todos.map(todo => (
            <div key={todo.id} style={{
              background: '#13151f',
              border: `1px solid ${todo.completed ? '#2d4a2d' : '#2d3148'}`,
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              opacity: todo.completed ? 0.6 : 1,
              transition: 'all 0.2s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                {/* Checkbox */}
                <div
                  onClick={() => toggleComplete(todo)}
                  style={{
                    width: '20px', height: '20px',
                    borderRadius: '50%',
                    border: `2px solid ${todo.completed ? '#4ade80' : '#6c63ff'}`,
                    background: todo.completed ? '#4ade80' : 'transparent',
                    cursor: 'pointer', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px'
                  }}
                >
                  {todo.completed && '✓'}
                </div>

                {/* Texte ou édition */}
                <div style={{ flex: 1 }}>
                  {editingId === todo.id ? (
                    <input
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveEdit(todo.id)}
                      autoFocus
                      style={{ padding: '4px 8px' }}
                    />
                  ) : (
                    <span style={{
                      fontSize: '15px',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#94a3b8' : '#e2e8f0'
                    }}>
                      {todo.tache}
                    </span>
                  )}
                  {todo.deadline && (
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                      📅 {new Date(todo.deadline).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
                {editingId === todo.id ? (
                  <button
                    onClick={() => saveEdit(todo.id)}
                    style={{ background: '#1a2f1a', color: '#4ade80', padding: '8px 14px', fontSize: '13px' }}
                  >
                    ✓
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(todo)}
                    style={{ background: '#1e2130', color: '#94a3b8', padding: '8px 14px', fontSize: '13px' }}
                  >
                    ✏️
                  </button>
                )}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{ background: '#2d1f1f', color: '#f87171', padding: '8px 14px', fontSize: '13px' }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Todos