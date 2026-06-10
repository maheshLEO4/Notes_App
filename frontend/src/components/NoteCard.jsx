import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const STATUS_STYLE = {
  'Pending': 'bg-amber-50 text-amber-600 border-amber-200',
  'In Progress': 'bg-blue-50 text-blue-600 border-blue-200',
  'Done': 'bg-green-50 text-green-600 border-green-200',
}

export default function NoteCard({ note, onView, onEdit, onDelete }) {
  const isLongContent = note.content.length > 150
  const displayContent = note.content.slice(0, 150) + (isLongContent ? '...' : '')

  return (
    <div className="bg-white border border-ink-100 rounded-xl p-5 flex flex-col h-full gap-3 hover:border-ink-300 hover:shadow-sm transition-all group">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-ink-900 text-sm leading-snug line-clamp-2 flex-1">
          {note.title}
        </h3>
        <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLE[note.status] || 'bg-ink-50 text-ink-500 border-ink-200'}`}>
          {note.status}
        </span>
      </div>

      {/* Rendered markdown preview */}
      <div className="prose prose-sm prose-ink max-w-none text-ink-400 text-sm leading-relaxed [&>*]:my-0 [&>*+*]:mt-1 line-clamp-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {displayContent}
        </ReactMarkdown>
      </div>

      <div className="mt-auto flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onView(note)}
          className="flex-1 py-1.5 text-xs bg-ink-900 text-white rounded-lg hover:bg-black transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onEdit(note)}
          className="flex-1 py-1.5 text-xs bg-ink-900 text-white rounded-lg hover:bg-black transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="flex-1 py-1.5 text-xs text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
