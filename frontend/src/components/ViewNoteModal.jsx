import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const STATUS_STYLE = {
  'Pending': 'bg-amber-50 text-amber-600 border-amber-200',
  'In Progress': 'bg-blue-50 text-blue-600 border-blue-200',
  'Done': 'bg-green-50 text-green-600 border-green-200',
}

export default function ViewNoteModal({ note, onClose, onEdit }) {
  if (!note) return null

  return (
    <div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h3 className="font-medium text-ink-900 text-lg">{note.title}</h3>
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLE[note.status] || 'bg-ink-50 text-ink-500 border-ink-200'}`}>
              {note.status}
            </span>
          </div>
          <div className="flex flex-center gap-2">
            <button
              onClick={() => onEdit(note)}
              className="text-xs font-medium text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              Edit
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-400 hover:bg-ink-100 hover:text-ink-700 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Body - Scrollable */}
        <div className="p-6 overflow-y-auto">
          <div className="prose prose-sm md:prose-base prose-ink max-w-none text-ink-600 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {note.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}