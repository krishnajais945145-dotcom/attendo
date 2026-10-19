import React from 'react'
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Calculator, 
  X,
  Mail
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getAttendanceColor } from '../../lib/utils'

export function Sidebar({ activeTab, setActiveTab, mobileOpen, onCloseMobile, overallPercentage = 100 }) {
  const { user } = useAuth()

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Mark Attendance', icon: CheckSquare },
    { id: 'timetable', label: 'Timetable & OCR', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'bunk_calc', label: 'Bunk Calculator', icon: Calculator, badge: '75%' }
  ]

  const colorStyles = getAttendanceColor(overallPercentage, overallPercentage === 0 ? 0 : 1)

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0e0f15] border-r border-slate-200 dark:border-zinc-800/80 p-4 transition-colors">
      {/* Student Profile Snapshot */}
      <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800/80 shadow-xs mb-5">
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700/80 flex items-center justify-center text-xs font-bold text-slate-800 dark:text-zinc-200">
            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div className="overflow-hidden">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-zinc-200 truncate">{user?.full_name || 'Student'}</h3>
            <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">
              {user?.student_id || 'STU-NEW'}
            </span>
          </div>
        </div>

        <div className="space-y-1 text-[11px] text-slate-500 dark:text-zinc-400 pt-2 border-t border-slate-100 dark:border-zinc-800/60">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 dark:text-zinc-500">Dept:</span>
            <span className="text-slate-700 dark:text-zinc-300 truncate max-w-[140px]" title={user?.department}>
              {user?.department || 'CSE'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 dark:text-zinc-500">Year / Sem:</span>
            <span className="text-slate-700 dark:text-zinc-300">
              {user?.year_of_study || '3rd Year'} &bull; {user?.semester || 'Sem 6'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-2">
          Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                if (onCloseMobile) onCloseMobile()
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                isActive
                  ? 'bg-slate-200/90 text-slate-900 font-semibold dark:bg-zinc-800 dark:text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900 dark:text-zinc-100' : 'text-slate-400 dark:text-zinc-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive
                      ? 'bg-slate-300 text-slate-800 dark:bg-zinc-700 dark:text-zinc-200'
                      : 'bg-slate-200/60 text-slate-600 dark:bg-zinc-900 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Mini Attendance Gauge Widget in Sidebar */}
      <div className="mt-auto pt-4 border-t border-slate-200 dark:border-zinc-800/80">
        <div className="p-3 rounded-xl bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800/80 shadow-xs">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 dark:text-zinc-400 text-[11px]">Total Attendance</span>
            <span className={`font-mono font-bold ${colorStyles.text}`}>{overallPercentage}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${colorStyles.indicator}`}
              style={{ width: `${Math.min(100, overallPercentage)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-500 mt-1.5">
            <span>Criteria:</span>
            <span className={`font-medium ${colorStyles.text}`}>{colorStyles.label} (&ge;75%)</span>
          </div>
        </div>

        {/* Contact Developer Card in Sidebar corner */}
        <div className="mt-2.5 p-3 rounded-xl bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7] shadow-xs">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[11px] font-bold text-[#1d1d1f] dark:text-sky-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#1d1d1f] dark:text-sky-400" />
              Contact Developers
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[#86868b] dark:text-slate-400 font-mono truncate select-all" title="krishnajais945145@gmail.com">
              krishnajais945145@gmail.com
            </p>
            <p className="text-[10px] text-[#86868b] dark:text-slate-400 font-mono truncate select-all" title="rummerblaze07@gmail.com">
              rummerblaze07@gmail.com
            </p>
          </div>
          <a
            href="mailto:krishnajais945145@gmail.com,rummerblaze07@gmail.com?subject=Attendo%20Inquiry%20/%20Feedback"
            className="mt-2 block w-full text-center py-1.5 rounded-lg bg-[#1d1d1f] hover:bg-[#2d2d30] text-white dark:bg-white dark:hover:bg-slate-200 dark:text-black text-[11px] font-semibold transition shadow-xs"
          >
            Email Developers
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-60 shrink-0 h-full overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-150">
            <button
              onClick={onCloseMobile}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white bg-slate-200 dark:bg-zinc-900 transition"
            >
              <X className="w-4 h-4" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
