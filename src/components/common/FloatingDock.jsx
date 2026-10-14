import React from 'react'
import { Home, CalendarCheck, Compass, BarChart3, User, Sparkles, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export function FloatingDock({ activeTab, setActiveTab }) {
  const { isDark, toggleTheme } = useTheme()

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'attendance', label: 'Tracker', icon: CalendarCheck },
    { id: 'timetable', label: 'Worlds', icon: Compass },
    { id: 'analytics', label: 'Audit', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  return (
    <nav 
      aria-label="Floating Navigation Dock"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 px-2 py-1.5 rounded-full floating-dock flex items-center gap-1 sm:gap-1.5 animate-in slide-in-from-bottom-5 duration-300"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none ${
              isActive
                ? 'bg-[#0091ff] text-white shadow-md shadow-[#0091ff]/30 dark:bg-gradient-to-r dark:from-[#ff5e3a] dark:to-[#ffa043] dark:text-white dark:shadow-[0_0_20px_rgba(255,94,58,0.5)] scale-100'
                : 'text-[#475467] hover:text-[#101828] dark:text-[#9aa1b2] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className={`text-[12px] ${isActive ? 'font-bold' : 'font-medium hidden sm:inline'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}

      <div className="w-[1px] h-5 bg-black/10 dark:bg-white/10 mx-1" />

      {/* Quick Theme Toggle inside Dock */}
      <button
        onClick={toggleTheme}
        title={isDark ? "Switch to Ignitio Day Theme" : "Switch to Huly Cosmic Night Theme"}
        className="p-2 rounded-full text-[#475467] hover:text-[#101828] dark:text-[#9aa1b2] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700" />
        )}
      </button>
    </nav>
  )
}
