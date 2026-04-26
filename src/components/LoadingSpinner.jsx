export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-muted">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-line border-t-brand" />
      <span>{label}</span>
    </div>
  )
}
