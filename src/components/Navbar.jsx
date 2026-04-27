import { LogOut, Menu, Moon, Sun, WalletCards } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/useAuth'
import { useTheme } from '../context/useTheme'

export default function Navbar({ onMenuClick }) {
  const { currentUser, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            className="btn-secondary px-3 lg:hidden"
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
          >
            <Menu size={18} />
          </button>
          <Link to="/app/dashboard" className="flex items-center gap-2 font-semibold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-brand text-white">
              <WalletCards size={19} />
            </span>
            Expense Tracker
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden max-w-48 truncate text-sm text-muted sm:block">{currentUser?.email}</span>
          <button
            className="btn-secondary px-3"
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="btn-secondary px-3" type="button" onClick={handleLogout} aria-label="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
