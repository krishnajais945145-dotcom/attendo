import React, { useState } from 'react'
import { 
  X, 
  Calendar, 
  Clock, 
  ShieldAlert, 
  Palmtree, 
  FileText, 
  Sparkles, 
  GraduationCap, 
  ChevronRight,
  Search,
  AlertTriangle
} from 'lucide-react'
import { MMMUT_ACADEMIC_CALENDAR } from '../../services/academicCalendarData'

export function AcademicCalendarModal({ isOpen, onClose }) {
  const [selectedTerm, setSelectedTerm] = useState('odd') // 'odd' | 'even'
  const [filterType, setFilterType] = useState('ALL') // 'ALL' | 'audit' | 'vacation' | 'exam' | 'event'
  const [searchQuery, setSearchQuery] = useState('')

  if (!isOpen) return null

  const semData = selectedTerm === 'odd' 
    ? MMMUT_ACADEMIC_CALENDAR.oddSemester 
    : MMMUT_ACADEMIC_CALENDAR.evenSemester

  const filteredEvents = semData.events.filter(ev => {
    if (filterType === 'audit' && !ev.isAudit) return false
    if (filterType === 'vacation' && !ev.isHoliday && ev.category !== 'vacation') return false
    if (filterType === 'exam' && ev.category !== 'exam') return false
    if (filterType === 'event' && ev.category !== 'fest' && ev.category !== 'event' && ev.category !== 'occasion') return false

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        ev.activity.toLowerCase().includes(q) ||
        ev.dates.toLowerCase().includes(q) ||
        (ev.note && ev.note.toLowerCase().includes(q))
      )
    }
    return true
  })

  const getEventBadge = (ev) => {
    if (ev.isAudit) {
      return {
        bg: 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30',
        label: 'Attendance Audit',
        icon: ShieldAlert
      }
    }
    if (ev.isHoliday || ev.category === 'vacation') {
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
        label: 'Vacation / Holiday',
        icon: Palmtree
      }
    }
    if (ev.category === 'exam') {
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30',
        label: 'Examination',
        icon: FileText
      }
    }
    if (ev.category === 'fest' || ev.category === 'occasion' || ev.category === 'event') {
      return {
        bg: 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/30',
        label: 'University Event',
        icon: Sparkles
      }
    }
    return {
      bg: 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-400 border-sky-500/30',
      label: 'Academic Milestone',
      icon: GraduationCap
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#12141d] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl rounded-3xl p-5 sm:p-7 text-[#1d1d1f] dark:text-[#f5f5f7] flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white p-2 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-4 pr-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#0091ff]/10 dark:bg-[#ff5e3a]/15 text-[#0091ff] dark:text-[#ffa043] border border-[#0091ff]/20 dark:border-[#ff5e3a]/30">
              OFFICIAL MMMUT CALENDAR
            </span>
            <span className="text-xs text-[#86868b]">Session 2026-27</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#101828] dark:text-white">
            Academic Calendar & Occasion Schedule
          </h3>
          <p className="text-xs text-[#86868b] mt-0.5">
            Curated from official MMMUT notification. All teaching dates, vacations, minor exams, and 75% attendance display deadlines.
          </p>
        </div>

        {/* Semester Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.06] dark:border-white/[0.08] mb-3">
          <button
            onClick={() => setSelectedTerm('odd')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedTerm === 'odd'
                ? 'bg-white dark:bg-[#1f2230] text-[#101828] dark:text-white shadow-xs border border-black/[0.06] dark:border-white/[0.08]'
                : 'text-[#86868b] hover:text-[#101828] dark:hover:text-white'
            }`}
          >
            Odd Semester (2026-27)
          </button>
          <button
            onClick={() => setSelectedTerm('even')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedTerm === 'even'
                ? 'bg-white dark:bg-[#1f2230] text-[#101828] dark:text-white shadow-xs border border-black/[0.06] dark:border-white/[0.08]'
                : 'text-[#86868b] hover:text-[#101828] dark:hover:text-white'
            }`}
          >
            Even Semester (2026-27)
          </button>
        </div>

        {/* Milestone Quick Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
            <span className="text-[10px] text-[#86868b] block font-medium">Classes Commence</span>
            <span className="text-xs font-bold font-mono text-[#101828] dark:text-white">
              {selectedTerm === 'odd' ? 'Aug 03, 2026' : 'Dec 14, 2026'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/20">
            <span className="text-[10px] text-rose-600 dark:text-rose-400 block font-semibold">HoD 75% Audit</span>
            <span className="text-xs font-bold font-mono text-rose-700 dark:text-rose-300">
              {selectedTerm === 'odd' ? 'Sept 18, 2026' : 'Jan 30, 2027'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold">Mid-Sem Break</span>
            <span className="text-xs font-bold font-mono text-emerald-700 dark:text-emerald-300">
              {selectedTerm === 'odd' ? 'Nov 09-16, 2026' : 'Mar 22-27, 2027'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/20">
            <span className="text-[10px] text-rose-600 dark:text-rose-400 block font-semibold">Dean Office Cutoff</span>
            <span className="text-xs font-bold font-mono text-rose-700 dark:text-rose-300">
              {selectedTerm === 'odd' ? 'Nov 26, 2026' : 'Apr 22, 2027'}
            </span>
          </div>
        </div>

        {/* Filter Chips & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            {[
              { id: 'ALL', label: 'All Items' },
              { id: 'audit', label: '🚨 75% Audits' },
              { id: 'vacation', label: '🏖️ Vacations' },
              { id: 'exam', label: '📝 Exams' },
              { id: 'event', label: '🎉 Fests & Events' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  filterType === f.id
                    ? 'bg-[#101828] text-white dark:bg-white dark:text-black shadow-xs'
                    : 'bg-black/5 dark:bg-white/5 text-[#86868b] hover:text-[#101828] dark:hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#86868b]" />
            <input
              type="text"
              placeholder="Search schedule..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#101828] dark:text-white focus:outline-none transition"
            />
          </div>
        </div>

        {/* Events Scrollable Timeline List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredEvents.map((ev, idx) => {
            const badge = getEventBadge(ev)
            const Icon = badge.icon

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition-all ${
                  ev.isAudit
                    ? 'bg-rose-500/[0.04] border-rose-500/30 dark:border-rose-500/30'
                    : ev.isHoliday
                    ? 'bg-emerald-500/[0.04] border-emerald-500/30 dark:border-emerald-500/30'
                    : 'bg-[#faf7f0] dark:bg-[#0c0e17] border-black/[0.06] dark:border-white/[0.06]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${badge.bg}`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-mono text-xs font-bold text-[#101828] dark:text-white">
                          {ev.dates}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full border ${badge.bg}`}>
                          {badge.label}
                        </span>
                        {ev.noClass && (
                          <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.2 rounded-full border border-amber-500/20">
                            No Regular Classes
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-[#101828] dark:text-white tracking-tight">
                        {ev.activity}
                      </h4>

                      {ev.note && (
                        <p className="text-xs text-[#86868b] dark:text-slate-400 mt-1 leading-relaxed">
                          {ev.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 mt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs text-[#86868b]">
          <span>M.M.M. University of Technology Gorakhpur &bull; Academic Year 2026-27</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#101828] text-white dark:bg-white dark:text-black font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
