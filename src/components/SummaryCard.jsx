export default function SummaryCard({ title, value, icon: Icon, tone = 'blue', helper }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    red: 'bg-red-50 text-red-700',
    slate: 'bg-slate-100 text-slate-700',
  }

  return (
    <article className="panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
          {helper && <p className="mt-1 text-xs text-muted">{helper}</p>}
        </div>
        {Icon && (
          <span className={`grid h-11 w-11 place-items-center rounded-md ${tones[tone]}`}>
            <Icon size={21} />
          </span>
        )}
      </div>
    </article>
  )
}
