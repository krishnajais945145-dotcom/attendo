import React, { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  UploadCloud, 
  Trash2, 
  Edit3,
  Zap,
  Sparkles
} from 'lucide-react'

export function TimetableGrid({ 
  timetable = [], 
  subjects = [], 
  onOpenOcr, 
  onOpenManualAdd, 
  onEditEntry, 
  onDeleteEntry,
  onApplyMmmutPreset,
  userLabGroup = 'P1',
  onToggleLabGroup
}) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [selectedDay, setSelectedDay] = useState('Monday')
  const [groupFilter, setGroupFilter] = useState('MY_GROUP') // 'MY_GROUP' | 'P1' | 'P2' | 'ALL'

  const subjectMap = new Map(subjects.map(s => [s.id, s]))

  // Filter timetable according to selected lab group
  const filteredTimetable = timetable.filter(entry => {
    if (groupFilter === 'ALL') return true
    if (groupFilter === 'P1') return entry.group === 'P1' || entry.group === 'ALL' || !entry.group
    if (groupFilter === 'P2') return entry.group === 'P2' || entry.group === 'ALL' || !entry.group
    // MY_GROUP:
    const myGroup = userLabGroup || 'P1'
    return entry.group === myGroup || entry.group === 'ALL' || !entry.group
  })

  // Group entries by day
  const entriesByDay = days.reduce((acc, day) => {
    acc[day] = filteredTimetable
      .filter(t => t.day.toLowerCase() === day.toLowerCase())
      .sort((a, b) => a.start_time.localeCompare(b.start_time))
    return acc
  }, {})

  return (
    <div className="space-y-5">
      {/* Schedule State Banner */}
      {timetable.length === 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121318] border border-black/[0.07] dark:border-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#1d1d1f] dark:text-sky-300 bg-black/[0.04] dark:bg-sky-500/20 px-2 py-0.5 rounded border border-black/[0.08] dark:border-sky-500/40">
                Weekly Schedule
              </span>
              <span className="text-xs text-[#86868b] dark:text-slate-400 font-medium">Configure your branch classes</span>
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f] dark:text-white">
              No timetable slots added yet
            </h3>
            <p className="text-xs text-[#86868b] dark:text-slate-400 mt-0.5">
              Scan your timetable image or click &quot;Add Single Slot&quot; to build your branch schedule.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={onOpenOcr}
              className="mac-btn-primary flex-1 md:flex-initial px-4 py-2.5 text-xs font-semibold inline-flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Scan Timetable Image</span>
            </button>
            <button
              onClick={onApplyMmmutPreset}
              className="px-3 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#16171f] hover:bg-black/[0.04] dark:hover:bg-[#20222b] text-[#1d1d1f] dark:text-slate-300 text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer"
              title="Auto-load official university timetable for your branch & section"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Load Branch Timetable</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Banner & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl theme-card text-[#1d1d1f] dark:text-[#f5f5f7] shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white tracking-tight">
            Weekly Timetable & Schedule
          </h2>
          <p className="text-xs text-[#86868b] dark:text-slate-400 mt-0.5 max-w-lg">
            Manage your weekly class timetable. Use the Smart Image Scanner or build custom slots in the Manual Matrix.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Option A: Upload Image */}
          <button
            onClick={onOpenOcr}
            className="mac-btn-primary flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold inline-flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Scan Timetable / Matrix</span>
          </button>

          {/* Option B: Enter Manually */}
          <button
            onClick={onOpenManualAdd}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#16171f] hover:bg-black/[0.04] dark:hover:bg-[#20222b] text-[#1d1d1f] dark:text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#1d1d1f] dark:text-sky-400" />
            <span>Add Single Slot</span>
          </button>
        </div>
      </div>

      {/* Lab & Batch Group Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#1d1d1f] dark:text-slate-300">Lab & Workshop Filter:</span>
          <button
            onClick={onToggleLabGroup}
            title="Click to toggle default group"
            className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 hover:bg-sky-500/30 transition"
          >
            Your Group: {userLabGroup || 'P1'} (change)
          </button>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setGroupFilter('MY_GROUP')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              groupFilter === 'MY_GROUP'
                ? 'bg-[#0091ff] text-white shadow-xs dark:bg-gradient-to-r dark:from-[#ff5e3a] dark:to-[#ffa043] dark:shadow-[0_0_12px_rgba(255,94,58,0.4)]'
                : 'text-[#475467] dark:text-[#9aa1b2] hover:text-[#101828] dark:hover:text-white'
            }`}
          >
            My Schedule ({userLabGroup || 'P1'})
          </button>
          <button
            onClick={() => setGroupFilter('P1')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              groupFilter === 'P1'
                ? 'bg-[#0091ff] text-white shadow-xs dark:bg-gradient-to-r dark:from-[#ff5e3a] dark:to-[#ffa043] dark:shadow-[0_0_12px_rgba(255,94,58,0.4)]'
                : 'text-[#475467] dark:text-[#9aa1b2] hover:text-[#101828] dark:hover:text-white'
            }`}
          >
            Group P1 Only
          </button>
          <button
            onClick={() => setGroupFilter('P2')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              groupFilter === 'P2'
                ? 'bg-[#0091ff] text-white shadow-xs dark:bg-gradient-to-r dark:from-[#ff5e3a] dark:to-[#ffa043] dark:shadow-[0_0_12px_rgba(255,94,58,0.4)]'
                : 'text-[#475467] dark:text-[#9aa1b2] hover:text-[#101828] dark:hover:text-white'
            }`}
          >
            Group P2 Only
          </button>
          <button
            onClick={() => setGroupFilter('ALL')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              groupFilter === 'ALL'
                ? 'bg-[#0091ff] text-white shadow-xs dark:bg-gradient-to-r dark:from-[#ff5e3a] dark:to-[#ffa043] dark:shadow-[0_0_12px_rgba(255,94,58,0.4)]'
                : 'text-[#475467] dark:text-[#9aa1b2] hover:text-[#101828] dark:hover:text-white'
            }`}
          >
            All Classes (Combined)
          </button>
        </div>
      </div>

      {/* Day Pills & Total Count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {days.map((day) => {
            const count = entriesByDay[day]?.length || 0
            const isSelected = selectedDay === day
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0091ff] text-white shadow-sm dark:bg-gradient-to-r dark:from-[#ff5e3a] dark:to-[#ffa043] dark:shadow-[0_0_14px_rgba(255,94,58,0.5)]'
                    : 'bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[#475467] dark:text-[#9aa1b2] hover:text-[#101828] dark:hover:text-white'
                }`}
              >
                <span>{day}</span>
                <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-[#475467] dark:bg-white/10 dark:text-[#9aa1b2]'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="text-xs text-[#475467] dark:text-[#9aa1b2] font-mono">
          Total: <strong className="text-[#101828] dark:text-white font-bold">{timetable.length}</strong> weekly slots
        </div>
      </div>

      {/* Classes for Selected Day */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
          {selectedDay} Schedule ({entriesByDay[selectedDay]?.length || 0})
        </h3>

        {entriesByDay[selectedDay]?.length === 0 ? (
          <div className="py-10 rounded-2xl bg-[#f5f5f7] dark:bg-[#0c0d12] border border-dashed border-black/[0.1] dark:border-white/[0.1] text-center shadow-xs text-[#1d1d1f] dark:text-white">
            <Calendar className="w-8 h-8 text-[#86868b] dark:text-slate-500 mx-auto mb-1.5" />
            <h4 className="text-sm font-bold text-[#1d1d1f] dark:text-white">No classes scheduled on {selectedDay}</h4>
            <p className="text-xs text-[#86868b] dark:text-slate-400 mt-0.5 mb-3">
              Scan your timetable photo or build weekly schedule with the manual matrix builder.
            </p>
            <button
              onClick={onOpenManualAdd}
              className="px-3.5 py-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#16171f] hover:bg-black/[0.04] dark:hover:bg-[#20222b] text-[#1d1d1f] dark:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#1d1d1f] dark:text-sky-400" />
              <span>Add slot</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {entriesByDay[selectedDay].map((entry) => {
              const subject = subjectMap.get(entry.subject_id)

              return (
                <div
                  key={entry.id}
                  className="p-5 rounded-3xl theme-card hover:border-[#0091ff]/30 dark:hover:border-[#ff5e3a]/40 text-[#1d1d1f] dark:text-[#f5f5f7] transition-all flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    {/* Time & Room header */}
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-mono text-[#1d1d1f] dark:text-sky-300 text-xs font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#86868b] dark:text-sky-400" />
                        {entry.start_time} - {entry.end_time}
                      </span>
                      {entry.room && (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#1d1d1f] dark:text-slate-100 bg-black/[0.04] dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700/80 px-2.5 py-0.5 rounded-md shadow-xs">
                          <MapPin className="w-3.5 h-3.5 text-[#86868b] dark:text-sky-400" />
                          {entry.room}
                        </span>
                      )}
                    </div>

                    {/* Group & Type Badge */}
                    <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                      {entry.group === 'P1' && (
                        <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-black/[0.04] dark:bg-sky-500/20 text-[#1d1d1f] dark:text-sky-300 border border-black/[0.08] dark:border-sky-500/40">
                          Group P1 Lab
                        </span>
                      )}
                      {entry.group === 'P2' && (
                        <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-black/[0.04] dark:bg-purple-500/20 text-[#1d1d1f] dark:text-purple-300 border border-black/[0.08] dark:border-purple-500/40">
                          Group P2 Lab
                        </span>
                      )}
                      {entry.group === 'ALL' && (
                        <span className="px-2 py-0.5 rounded-md text-xs font-mono font-medium bg-black/[0.04] dark:bg-slate-800 text-[#515154] dark:text-slate-300 border border-black/[0.08] dark:border-slate-700/60">
                          Common Lecture
                        </span>
                      )}
                      {entry.type && (
                        <span className="text-xs font-mono font-medium text-[#86868b] dark:text-slate-300 uppercase">
                          &bull; {entry.type}
                        </span>
                      )}
                    </div>

                    {/* Subject info */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-base font-bold text-[#1d1d1f] dark:text-white transition line-clamp-1">
                        {subject ? subject.name : 'Class Session'}
                      </h4>
                      {subject?.code && (
                        <span className="font-mono text-xs font-bold text-[#1d1d1f] dark:text-sky-300 bg-black/[0.04] dark:bg-sky-950/80 border border-black/[0.08] dark:border-sky-500/40 px-2.5 py-0.5 rounded-md tracking-wider shrink-0 shadow-xs">
                          {subject.code}
                        </span>
                      )}
                    </div>

                    {entry.notes && (
                      <p className="text-xs font-medium text-[#86868b] dark:text-sky-300/90 mt-1 flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        {entry.notes}
                      </p>
                    )}

                    {entry.faculty && (
                      <p className="text-xs text-[#86868b] dark:text-slate-400 font-medium mt-0.5">
                        {entry.faculty}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2.5 mt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                    <span className="text-[10px] text-[#86868b] dark:text-slate-500 font-mono">
                      {entry.id.slice(0, 8)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onEditEntry(entry)}
                        className="p-1.5 rounded-lg text-[#86868b] hover:text-[#1d1d1f] dark:text-slate-400 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition cursor-pointer"
                        title="Edit slot"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteEntry(entry.id)}
                        className="p-1.5 rounded-lg text-[#86868b] hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition cursor-pointer"
                        title="Delete slot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
