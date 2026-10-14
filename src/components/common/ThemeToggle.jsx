import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
      className={`p-1.5 rounded-lg border transition flex items-center justify-center ${
        isDark
          ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800'
          : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-xs'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-slate-600 transition-transform hover:-rotate-12" />
      )}
    </button>
  )
}
