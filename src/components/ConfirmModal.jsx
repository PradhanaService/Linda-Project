import { AlertTriangle } from 'lucide-react'

export default function ConfirmModal({ open, title, message, onCancel, onConfirm, loading }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-amber-50 text-danger">
            <AlertTriangle size={20} />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            <p className="mt-2 text-sm text-muted">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn-secondary" type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button className="btn-danger" type="button" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
