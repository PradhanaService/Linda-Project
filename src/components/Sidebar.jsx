import { BarChart3, Home, PlusCircle, ReceiptText, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/app/dashboard', label: 'Dashboard', icon: Home },
  { to: '/app/transactions', label: 'Transactions', icon: ReceiptText },
  { to: '/app/transactions/new', label: 'Add Transaction', icon: PlusCircle },
  { to: '/app/reports', label: 'Reports', icon: BarChart3 },
  { to: '/app/profile', label: 'Profile', icon: User },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <button
        className={`fixed inset-0 z-30 bg-slate-900/40 lg:hidden ${open ? 'block' : 'hidden'}`}
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-72 border-r border-line bg-white p-4 transition-transform lg:sticky lg:top-16 lg:z-10 lg:h-[calc(100vh-4rem)] lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="mt-14 space-y-1 lg:mt-0">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-emerald-50 text-brand' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
