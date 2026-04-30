import { useState, useEffect, useRef } from 'react'
import { MoreVertical, Pencil, Trash2, Check } from 'lucide-react'
import { useTodos } from '../TodosContext' // ✅ nouveau

function Todos() {
  const { todos, loading, toast, addTodo, toggleComplete, saveEdit, deleteTodo } = useTodos() // ✅
  const [newTache, setNewTache] = useState('')
  const [openMenu, setOpenMenu] = useState(null)
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 })
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [editDeadline, setEditDeadline] = useState('')
  const menuRef = useRef(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOpenMenu = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMenuPosition({
      top: rect.bottom + window.scrollY + 8,
      right: window.innerWidth - rect.right
    })
    setOpenMenu(openMenu === id ? null : id)
  }

  const isOverdue = (deadline) => {
    if (!deadline) return false
    return new Date(deadline) < new Date()
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
          zIndex: 1000
        }}>
          {toast.type === 'error' ? '❌' : '✅'} {toast.message}
        </div>
      )}

      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Mes tâches</h1>
      <p style={{ color: '#94a3b8', marginBottom: '32px' }}>
        {remaining} tâche{remaining > 1 ? 's' : ''} restante{remaining > 1 ? 's' : ''}
      </p>

      {/* Ajouter */}
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
            <div key={todo.id} className="todo-item" style={{
              background: '#13151f',
              border: `1px solid ${todo.completed ? '#2d4a2d' : isOverdue(todo.deadline) ? '#4a2d2d' : '#2d3148'}`,
              borderRadius: '12px',
              padding: '16px 20px',
              opacity: todo.completed ? 0.6 : 1,
              transition: 'all 0.2s',
              position: 'relative'
            }}>
              {editingId === todo.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    autoFocus
                  />
                  <input
                    type="date"
                    value={editDeadline}
                    onChange={e => setEditDeadline(e.target.value)}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => saveEdit(todo.id)}
                      style={{ background: '#1a2f1a', color: '#4ade80', flex: 1 }}
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      style={{ background: '#1e2130', color: '#94a3b8', flex: 1 }}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <div
                      onClick={() => toggleComplete(todo)}
                      style={{
                        width: '20px', height: '20px',
                        borderRadius: '50%',
                        border: `2px solid ${todo.completed ? '#4ade80' : '#6c63ff'}`,
                        background: todo.completed ? '#4ade80' : 'transparent',
                        cursor: 'pointer', flexShrink: 0,
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {todo.completed && <Check size={12} color="#0f1117" strokeWidth={3} />}
                    </div>

                    <div>
                      <span style={{
                        fontSize: '15px',
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? '#94a3b8' : '#e2e8f0'
                      }}>
                        {todo.tache}
                      </span>
                      {todo.deadline && (
                        <p style={{
                          fontSize: '12px',
                          color: isOverdue(todo.deadline) ? '#f87171' : '#94a3b8',
                          marginTop: '4px'
                        }}>
                          📅 {new Date(todo.deadline).toLocaleDateString('fr-FR')}
                          {isOverdue(todo.deadline) && ' · En retard'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={(e) => handleOpenMenu(e, todo.id)}
                      style={{ background: 'transparent', color: '#94a3b8', padding: '4px 10px' }}
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Menu contextuel global */}
      {openMenu && (
        <div ref={menuRef} style={{
          position: 'fixed',
          top: `${menuPosition.top}px`,
          right: `${menuPosition.right}px`,
          background: '#1e2130',
          border: '1px solid #2d3148',
          borderRadius: '10px',
          overflow: 'hidden',
          zIndex: 999,
          minWidth: '160px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
        }}>
          <button
            onClick={() => {
              const todo = todos.find(t => t.id === openMenu)
              setEditingId(todo.id)
              setEditText(todo.tache)
              setEditDeadline(todo.deadline ? todo.deadline.split('T')[0] : '')
              setOpenMenu(null)
            }}
            style={{
              width: '100%', textAlign: 'left',
              background: 'transparent', color: '#e2e8f0',
              padding: '12px 16px', borderRadius: '0',
              fontWeight: '400', display: 'flex',
              alignItems: 'center', gap: '10px'
            }}
          >
            <Pencil size={15} /> Modifier
          </button>
          <button
            onClick={() => deleteTodo(openMenu)}
            style={{
              width: '100%', textAlign: 'left',
              background: 'transparent', color: '#f87171',
              padding: '12px 16px', borderRadius: '0',
              fontWeight: '400', borderTop: '1px solid #2d3148',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}
          >
            <Trash2 size={15} /> Supprimer
          </button>
        </div>
      )}
    </div>
  )
}

export default Todos