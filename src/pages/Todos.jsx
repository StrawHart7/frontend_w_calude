import { useState } from 'react'

function Todos() {
  const [todos, setTodos] = useState([
    { id: 1, tache: 'Apprendre le backend' },
    { id: 2, tache: 'Créer une API REST' },
    { id: 3, tache: 'Déployer sur Render' },
  ])
  const [newTache, setNewTache] = useState('')

  const addTodo = () => {
    if (!newTache.trim()) return
    setTodos([...todos, { id: Date.now(), tache: newTache }])
    setNewTache('')
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div style={{
      maxWidth: '640px',
      margin: '48px auto',
      padding: '0 24px'
    }}>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
        Mes tâches
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '32px' }}>
        {todos.length} tâche{todos.length > 1 ? 's' : ''} en cours
      </p>

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
          style={{
            background: '#6c63ff',
            color: '#fff',
            whiteSpace: 'nowrap',
            padding: '12px 20px'
          }}
        >
          + Ajouter
        </button>
      </div>

      {/* Liste des tâches */}
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
              style={{
                background: '#2d1f1f',
                color: '#f87171',
                padding: '8px 14px',
                fontSize: '13px'
              }}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todos