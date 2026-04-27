export default function FirebaseConfigError({ missingKeys = [] }) {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-4">
      <section className="panel max-w-2xl p-6">
        <p className="text-sm font-semibold uppercase text-brand">Firebase setup required</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">Vercel environment variables are missing</h1>
        <p className="mt-3 text-sm text-muted">
          Add these variables in Vercel under Project Settings, then redeploy the latest commit.
        </p>
        <div className="mt-5 rounded-md border border-line bg-slate-50 p-4">
          <p className="text-sm font-semibold text-ink">Missing variables</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {missingKeys.map((key) => (
              <li key={key}>
                <code>{key}</code>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-sm text-muted">
          After adding them, also add your Vercel domain in Firebase Authentication authorized domains.
        </p>
      </section>
    </main>
  )
}
