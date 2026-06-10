import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getNotes, createNote, updateNote, deleteNote } from '../api'
import NoteCard from '../components/NoteCard'
import NoteModal from '../components/NoteModal'

const FILTERS = ['All', 'Pending', 'In Progress', 'Done']

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null) // null | 'create' | note object
  const [deleting, setDeleting] = useState(null)

  const fetchNotes = useCallback(async () => {
    try {
      const data = await getNotes()
      setNotes(Array.isArray(data) ? data : [])
    } catch {
      setNotes([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchNotes() }, [fetchNotes])

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  async function handleSave(form) {
    if (modal === 'create') {
      await createNote(form)
    } else {
      await updateNote(modal.id, form)
    }
    setModal(null)
    fetchNotes()
  }

  async function handleDelete(id) {
    setDeleting(id)
    await deleteNote(id)
    setDeleting(null)
    fetchNotes()
  }

  const filtered = notes.filter(n => {
    const matchStatus = filter === 'All' || n.status === filter
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const counts = {
    All: notes.length,
    Pending: notes.filter(n => n.status === 'Pending').length,
    'In Progress': notes.filter(n => n.status === 'In Progress').length,
    Done: notes.filter(n => n.status === 'Done').length,
  }

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Navbar */}
      <header className="bg-white border-b border-ink-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-mono text-amber-500 text-sm tracking-widest uppercase">Notely</span>
          <div className="flex items-center gap-4">
            <span className="text-ink-400 text-sm hidden sm:block">
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-ink-400 hover:text-ink-700 border border-ink-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Page title + create */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium text-ink-900">My Notes</h1>
            <p className="text-ink-400 text-sm mt-0.5">{notes.length} note{notes.length !== 1 ? 's' : ''} total</p>
          </div>
          <button
            onClick={() => setModal('create')}
            className="bg-ink-900 text-ink-50 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-ink-700 transition-colors flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span>
            New note
          </button>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="flex-1 px-4 py-2.5 bg-white border border-ink-200 rounded-lg text-ink-900 text-sm placeholder-ink-300 focus:outline-none focus:border-ink-500 transition-colors"
          />
          <div className="flex gap-2 overflow-x-auto">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  filter === f
                    ? 'bg-ink-900 text-ink-50'
                    : 'bg-white border border-ink-200 text-ink-500 hover:border-ink-400'
                }`}
              >
                {f}
                <span className={`ml-1.5 ${filter === f ? 'text-ink-300' : 'text-ink-300'}`}>
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes grid */}
        {loading ? (
          <div className="text-center py-20 text-ink-400 font-mono text-sm animate-pulse">
            loading notes...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">📝</div>
            <p className="text-ink-400 text-sm">
              {search || filter !== 'All' ? 'No notes match your filter.' : "You haven't created any notes yet."}
            </p>
            {!search && filter === 'All' && (
              <button
                onClick={() => setModal('create')}
                className="mt-4 text-sm text-ink-700 underline underline-offset-2 hover:text-ink-900"
              >
                Create your first note
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(note => (
              <div
                key={note.id}
                className={deleting === note.id ? 'opacity-40 pointer-events-none transition-opacity' : ''}
              >
                <NoteCard
                  note={note}
                  onEdit={n => setModal(n)}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {modal !== null && (
        <NoteModal
          note={modal === 'create' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
