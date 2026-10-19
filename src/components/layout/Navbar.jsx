import React, { useState } from 'react'
import { GraduationCap, Copy, Check, LogOut, Menu } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { ThemeToggle } from '../common/ThemeToggle'

export function Navbar({ activeTab, setActiveTab, onOpenMobileMenu }) {
  const { user, logout, isCloudConnected, showToast } = useAuth()
  const [copied, setCopied] = useState(false)

  const handleCopyStudentId = () => {
    if (user?.student_id) {
      navigator.clipboard.writeText(user.student_id)
      setCopied(true)
      showToast(`Copied: ${user.student_id}`, 'info')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <header className="sticky top-0 z-30 theme-navbar backdrop-blur-md border-b shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        {/* Left: Mobile menu & Minimalist Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#0091ff] text-white dark:bg-gradient-to-r dark:from-[#ff5e3a] dark:to-[#ffa043] dark:shadow-[0_0_15px_rgba(255,94,58,0.5)] flex items-center justify-center transition">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-extrabold text-base tracking-tight text-[#101828] dark:text-white">Attendo</span>
            </div>
          </div>
        </div>

        {/* Center / Right: Student ID badge & Cloud status & Theme Toggle & Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Cloud vs Local Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border theme-card">
            {isCloudConnected ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-zinc-600 dark:text-zinc-300">Supabase</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span className="text-zinc-600 dark:text-zinc-400">Local Mode</span>
              </>
            )}
          </div>

          {/* Student ID Badge with Copy */}
          {user?.student_id && (
            <button
              onClick={handleCopyStudentId}
              title="Click to copy your Student ID"
              className="flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono transition group theme-card"
            >
              <span className="text-zinc-400 text-[10px]">ID</span>
              <span className="font-semibold">{user.student_id}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition" />
              )}
            </button>
          )}

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-1 sm:pl-2">
            <div className="w-7 h-7 rounded-full bg-zinc-800 text-white border border-zinc-700 text-xs font-semibold flex items-center justify-center">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-medium leading-tight">{user?.full_name || 'Student'}</p>
              <p className="text-[10px] text-zinc-500 leading-tight">{user?.semester || 'Sem 6'}</p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={logout}
            title="Log Out"
            className="p-1.5 rounded-md text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
