import { useEffect, useMemo, useState } from 'react'
import ThemeContext from './themeContext'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('expense-theme') || 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('expense-theme', theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
