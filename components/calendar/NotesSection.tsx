import { Note } from '@/lib/calendar'

interface NotesSectionProps {
  notes: Note[]
  noteInput: string
  noteTarget: 'general' | 'range'
  hasRange: boolean
  rangeLabel: string
  onInputChange: (v: string) => void
  onTargetChange: (v: 'general' | 'range') => void
  onAdd: () => void
  onDelete: (id: string) => void
  textareaRef: React.RefObject<HTMLTextAreaElement>
}

export default function NotesSection({
  notes, noteInput, noteTarget, hasRange, rangeLabel,
  onInputChange, onTargetChange, onAdd, onDelete, textareaRef,
}: NotesSectionProps) {
  return (
    <div className="flex flex-col flex-1 p-5 md:p-6 gap-4">
      <div className="flex items-center justify-between">
        <h3
          className="text-xs tracking-widest uppercase transition-colors"
          style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--text-faint)' }}
        >
          Notes
        </h3>
        {hasRange && (
          <div className="flex gap-2">
            {(['general', 'range'] as const).map(t => (
              <button
                key={t}
                onClick={() => onTargetChange(t)}
                className="text-xs px-2 py-0.5 rounded-sm transition-all"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  background: noteTarget === t ? 'var(--text-main)' : 'var(--bg-range-mid)',
                  color: noteTarget === t ? 'var(--bg-card)' : 'var(--text-muted)',
                }}
              >
                {t === 'general' ? 'General' : 'For range'}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 items-end">
        <textarea
          ref={textareaRef}
          value={noteInput}
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) onAdd() }}
          placeholder={noteTarget === 'range' && hasRange ? `Note for ${rangeLabel}…` : 'Write a note…'}
          rows={2}
          className="flex-1 resize-none rounded-sm px-3 py-2 text-sm leading-relaxed outline-none transition-all"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-input)',
            color: 'var(--text-main)',
            fontSize: '0.82rem',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--border-input-focus)'; e.target.style.background = 'var(--bg-input-focus)' }}
          onBlur={e => { e.target.style.borderColor = 'var(--border-input)'; e.target.style.background = 'var(--bg-input)' }}
        />
        <button
          onClick={onAdd}
          disabled={!noteInput.trim()}
          className="px-3 py-2 rounded-sm text-sm transition-all disabled:opacity-40"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            background: 'var(--text-main)',
            color: 'var(--bg-card)',
            fontSize: '0.82rem',
          }}
        >
          Add
        </button>
      </div>

      <div className="flex flex-col gap-1.5 overflow-y-auto" style={{ maxHeight: '180px' }}>
        {notes.length === 0 && (
          <p className="text-xs italic transition-colors" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--border-color)' }}>
            No notes yet.
          </p>
        )}
        {notes.map(note => (
          <NoteItem key={note.id} note={note} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}

function NoteItem({ note, onDelete }: { note: Note; onDelete: (id: string) => void }) {
  return (
    <div
      className="group flex items-start gap-2 py-2 px-3 rounded-sm transition-colors"
      style={{ background: 'var(--note-bg)', borderLeft: '2px solid var(--note-border)' }}
    >
      {note.date && (
        <span className="text-xs shrink-0 mt-0.5 transition-colors" style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--text-faint)', fontSize: '0.65rem' }}>
          {note.date}
        </span>
      )}
      <span className="flex-1 text-xs leading-relaxed transition-colors" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text-main)', fontSize: '0.8rem' }}>
        {note.text}
      </span>
      <button
        onClick={() => onDelete(note.id)}
        className="opacity-0 group-hover:opacity-100 transition-all text-xs leading-none"
        style={{ color: 'var(--text-faint)' }}
        aria-label="Delete note"
      >
        ×
      </button>
    </div>
  )
}