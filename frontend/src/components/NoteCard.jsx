import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const STATUS_STYLE = {
  'Pending': 'bg-amber-50 text-amber-600 border-amber-200',
  'In Progress': 'bg-blue-50 text-blue-600 border-blue-200',
  'Done': 'bg-green-50 text-green-600 border-green-200',
}

export default function NoteCard({ note, onEdit, onDelete }) {
  // Trim content for preview (strip markdown syntax for cleaner snippet)
  const preview = note.content.slice(0, 150) + (note.content.length > 150 ? '...' : '')

  return (
    <div className="bg-white border border-ink-100 rounded-xl p-5 flex flex-col gap-3 hover:border-ink-300 hover:shadow-sm transition-all group">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-ink-900 text-sm leading-snug line-clamp-2 flex-1">
          {note.title}
        </h3>
        <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLE[note.status] || 'bg-ink-50 text-ink-500 border-ink-200'}`}>
          {note.status}
        </span>
      </div>

      {/* Rendered markdown preview */}
      <div className="prose prose-sm prose-ink max-w-none text-ink-400 line-clamp-4 text-sm leading-relaxed [&>*]:my-0 [&>*+*]:mt-1">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {preview}
        </ReactMarkdown>
      </div>

      <div className="flex gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(note)}
          className="flex-1 py-1.5 text-xs text-ink-500 border border-ink-200 rounded-lg hover:bg-ink-50 hover:text-ink-900 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="flex-1 py-1.5 text-xs text-red-400 border border-red-100 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
