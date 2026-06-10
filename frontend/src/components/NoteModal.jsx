import { useState, useEffect } from 'react'
import MDEditor from '@uiw/react-md-editor'

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Done']

export default function NoteModal({ note, onClose, onSave }) {
  const [form, setForm] = useState({ title: '', status: 'Pending', content: '' })
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('write') // 'write' | 'preview'

  useEffect(() => {
    if (note) setForm({ title: note.title, status: note.status, content: note.content })
  }, [note])

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.content.trim()) return
    setLoading(true)
    await onSave(form)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-ink-100">
          <h3 className="font-medium text-ink-900">{note ? 'Edit note' : 'New note'}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-400 hover:bg-ink-100 hover:text-ink-700 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              minLength={1}
              maxLength={100}
              placeholder="Note title..."
              className="w-full px-4 py-3 bg-ink-50 border border-ink-200 rounded-lg text-ink-900 text-sm placeholder-ink-300 focus:outline-none focus:border-ink-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">Status</label>
            <div className="flex gap-2">
              {STATUS_OPTIONS.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, status: s }))}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                    form.status === s ? 'bg-ink-900 text-ink-50' : 'bg-ink-50 text-ink-500 hover:bg-ink-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-ink-500 uppercase tracking-wider">Content</label>
              <div className="flex gap-1 bg-ink-100 rounded-md p-0.5">
                {['write', 'preview'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`px-2.5 py-1 rounded text-xs font-medium capitalize transition-colors ${
                      tab === t ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-400 hover:text-ink-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div data-color-mode="light">
              <MDEditor
                value={form.content}
                onChange={val => setForm(f => ({ ...f, content: val || '' }))}
                preview={tab === 'preview' ? 'preview' : 'edit'}
                hideToolbar={false}
                height={220}
                style={{ borderRadius: '8px', border: '1px solid #d0ccbf', fontSize: '13px' }}
              />
            </div>
            <p className="text-xs text-ink-300 mt-1.5 font-mono">Markdown supported</p>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-ink-200 text-ink-500 rounded-lg text-sm hover:bg-ink-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-ink-900 text-ink-50 rounded-lg text-sm font-medium hover:bg-ink-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : note ? 'Save changes' : 'Create note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
