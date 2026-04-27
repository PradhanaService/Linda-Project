export default function SummaryCard({ title, value, icon: Icon, tone = 'green', helper }) {
  const tones = {
    blue: 'bg-emerald-50 text-emerald-800',
    green: 'bg-emerald-50 text-emerald-800',
    red: 'bg-rose-50 text-rose-700',
    slate: 'bg-amber-50 text-amber-800',
  }

  return (
    <article className="panel animate-scale-in p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
          {helper && <p className="mt-1 text-xs text-muted">{helper}</p>}
        </div>
        {Icon && (
          <span className={`grid h-11 w-11 place-items-center rounded-md animate-pulse-soft ${tones[tone]}`}>
            <Icon size={21} />
          </span>
        )}
      </div>
    </article>
  )
}
