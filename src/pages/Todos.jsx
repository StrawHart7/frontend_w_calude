import { useState, useEffect } from 'react'
import api from '../api'

function Todos() {
  const [todos, setTodos] = useState([])
  const [newTache, setNewTache] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Charger les tâches au chargement de la page
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get('/todos')
        setTodos(res.data)
      } catch (err) {
        setError('Erreur lors du chargement des tâches')
      } finally {
        setLoading(false)
      }
    }
    fetchTodos()
  }, [])

  const addTodo = async () => {
    if (!newTache.trim()) return
    try {
      const res = await api.post('/todos', { tache: newTache })
      setTodos([...todos, res.data])
      setNewTache('')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout')
    }
  }

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`)
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (err) {
      setError('Erreur lors de la suppression')
    }
  }

  return (
    <div style={{ maxWidth: '640px', margin: '48px auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
        Mes tâches
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '32px' }}>
        {todos.length} tâche{todos.length > 1 ? 's' : ''} en cours
      </p>

      {error && (
        <p style={{
          background: '#2d1f1f',
          color: '#f87171',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          {error}
        </p>
      )}

      {/* Ajouter une tâche */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
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

      {/* Liste des tâches */}
      {loading ? (
        <p style={{ color: '#94a3b8', textAlign: 'center', padding: '48px 0' }}>
          Chargement...
        </p>
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
              border: '1px solid #2d3148',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: '15px' }}>{todo.tache}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ background: '#2d1f1f', color: '#f87171', padding: '8px 14px', fontSize: '13px' }}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Todos