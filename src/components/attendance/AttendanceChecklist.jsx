import React, { useState, useEffect } from 'react'
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Ban, 
  SunMedium, 
  Clock, 
  MapPin, 
  Plus,
  Palmtree,
  Sparkles
} from 'lucide-react'
import { formatDate, formatFriendlyDate, getDayOfWeek } from '../../lib/utils'
import { useAuth } from '../../context/AuthContext'
import { getCalendarEventForDate } from '../../services/academicCalendarData'

export function AttendanceChecklist({ 
  timetable = [], 
  subjects = [], 
  attendanceRecords = [], 
  onSaveAttendance,
  onOpenExtraClass
}) {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const [pendingSelections, setPendingSelections] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { user, showToast } = useAuth()
  const [groupFilter, setGroupFilter] = useState('MY_GROUP') // 'MY_GROUP' | 'ALL' | 'P1' | 'P2'

  const dayOfWeek = getDayOfWeek(selectedDate)
  const calendarEvent = getCalendarEventForDate(selectedDate)
  const subjectMap = new Map(subjects.map(s => [s.id, s]))

  const allDayClasses = timetable
    .filter(t => t.day.toLowerCase() === dayOfWeek.toLowerCase())
    .sort((a, b) => a.start_time.localeCompare(b.start_time))

  const scheduledClasses = allDayClasses.filter(t => {
    if (groupFilter === 'ALL') return true
    if (groupFilter === 'P1') return t.group === 'P1' || t.group === 'ALL' || !t.group
    if (groupFilter === 'P2') return t.group === 'P2' || t.group === 'ALL' || !t.group
    const myGroup = user?.lab_group || 'P1'
    return t.group === myGroup || t.group === 'ALL' || !t.group
  })

  const dateRecords = attendanceRecords.filter(r => r.date === selectedDate)

  useEffect(() => {
    const initialMap = {}
    dateRecords.forEach(r => {
      const key = r.timetable_id || r.subject_id
      initialMap[key] = r.status
    })
    setPendingSelections(initialMap)
  }, [selectedDate, attendanceRecords])

  const handlePrevDay = () => {
    const d = new Date(selectedDate + 'T00:00:00')
    d.setDate(d.getDate() - 1)
    setSelectedDate(formatDate(d))
  }

  const handleNextDay = () => {
    const d = new Date(selectedDate + 'T00:00:00')
    d.setDate(d.getDate() + 1)
    setSelectedDate(formatDate(d))
  }

  const handleSetToday = () => {
    setSelectedDate(formatDate(new Date()))
  }

  const handleSelectStatus = async (item, status) => {
    const key = item.id || item.subject_id
    setPendingSelections(prev => ({ ...prev, [key]: status }))

    try {
      await onSaveAttendance({
        subject_id: item.subject_id,
        timetable_id: item.id,
        date: selectedDate,
        status: status
      })
      showToast(`Marked ${status} for ${subjectMap.get(item.subject_id)?.name || 'Class'}`, 'info')
    } catch (err) {
      showToast('Failed to save attendance record.', 'error')
    }
  }

  const handleMarkAllPresent = async () => {
    if (scheduledClasses.length === 0) return
    setSubmitting(true)
    try {
      const updates = {}
      for (const item of scheduledClasses) {
        updates[item.id] = 'present'
        await onSaveAttendance({
          subject_id: item.subject_id,
          timetable_id: item.id,
          date: selectedDate,
          status: 'present'
        })
      }
      setPendingSelections(prev => ({ ...prev, ...updates }))
      showToast(`Marked all ${scheduledClasses.length} classes as Present`, 'success')
    } catch (err) {
      showToast('Error marking all present.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const attendanceOptions = [
    {
      value: 'present',
      label: 'Present',
      icon: CheckCircle2,
      activeColor: 'bg-emerald-600 text-white dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-600 dark:border-emerald-500/40 shadow-xs font-semibold'
    },
    {
      value: 'absent',
      label: 'Absent',
      icon: XCircle,
      activeColor: 'bg-rose-600 text-white dark:bg-rose-500/20 dark:text-rose-300 border-rose-600 dark:border-rose-500/40 shadow-xs font-semibold'
    },
    {
      value: 'cancelled',
      label: 'Cancelled',
      icon: Ban,
      activeColor: 'bg-amber-600 text-white dark:bg-amber-500/20 dark:text-amber-300 border-amber-600 dark:border-amber-500/40 shadow-xs font-semibold'
    },
    {
      value: 'holiday',
      label: 'Off / Holiday',
      icon: SunMedium,
      activeColor: 'bg-sky-600 text-white dark:bg-sky-500/20 dark:text-sky-300 border-sky-600 dark:border-sky-500/40 shadow-xs font-semibold'
    }
  ]

  return (
    <div className="space-y-4">
      {/* Date Header & Navigation Card */}
      <div className="p-5 sm:p-6 rounded-3xl theme-card text-[#1d1d1f] dark:text-[#f5f5f7] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[#1d1d1f] dark:text-white tracking-tight">
              Attendance Checklist
            </h2>
            <p className="text-xs text-[#86868b] dark:text-slate-400">
              Select date and choose mutually exclusive status for scheduled sessions.
            </p>
          </div>

          {/* Date Selector Navigation Controls */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={handlePrevDay}
              className="p-2 rounded-xl bg-[#f5f5f7] hover:bg-black/[0.05] dark:bg-[#1c1d25] dark:hover:bg-[#252732] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-white transition cursor-pointer"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-[#f5f5f7] dark:bg-[#1c1d25] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-white rounded-xl px-3 py-1.5 text-xs font-mono focus:outline-none transition cursor-pointer"
            />

            <button
              onClick={handleNextDay}
              className="p-2 rounded-xl bg-[#f5f5f7] hover:bg-black/[0.05] dark:bg-[#1c1d25] dark:hover:bg-[#252732] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-white transition cursor-pointer"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleSetToday}
              className="px-3 py-1.5 rounded-xl bg-[#f5f5f7] hover:bg-black/[0.05] text-[#1d1d1f] dark:bg-[#1c1d25] dark:hover:bg-[#252732] dark:text-white border border-black/[0.08] dark:border-white/[0.08] text-xs font-semibold transition cursor-pointer"
            >
              Today
            </button>
          </div>
        </div>

        {/* Selected Date Indicator Banner & Batch Filter */}
        <div className="mt-3.5 pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#86868b] dark:text-slate-400" />
              <span className="text-[#1d1d1f] dark:text-white font-semibold">{formatFriendlyDate(selectedDate)}</span>
            </div>

            {/* Batch Filter Pill */}
            <div className="flex items-center bg-[#f5f5f7] dark:bg-[#0c0d12] p-0.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] font-semibold text-[11px]">
              <button
                onClick={() => setGroupFilter('MY_GROUP')}
                className={`px-2.5 py-0.5 rounded-lg transition cursor-pointer ${groupFilter === 'MY_GROUP' ? 'bg-white dark:bg-[#1c1d25] text-[#1d1d1f] dark:text-white font-bold shadow-xs border border-black/[0.08] dark:border-white/[0.08]' : 'text-[#86868b] hover:text-[#1d1d1f] dark:text-slate-400'}`}
              >
                Group {user?.lab_group || 'P1'}
              </button>
              <button
                onClick={() => setGroupFilter('ALL')}
                className={`px-2.5 py-0.5 rounded-lg transition cursor-pointer ${groupFilter === 'ALL' ? 'bg-white dark:bg-[#1c1d25] text-[#1d1d1f] dark:text-white font-bold shadow-xs border border-black/[0.08] dark:border-white/[0.08]' : 'text-[#86868b] hover:text-[#1d1d1f] dark:text-slate-400'}`}
              >
                All Sections
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllPresent}
              disabled={submitting || scheduledClasses.length === 0}
              className="mac-btn-primary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 transition disabled:opacity-40 shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark All Present</span>
            </button>

            <button
              onClick={onOpenExtraClass}
              className="px-3 py-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#16171f] hover:bg-black/[0.04] dark:hover:bg-[#20222b] text-[#1d1d1f] dark:text-slate-300 text-xs font-semibold inline-flex items-center gap-1 transition cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Log Extra Class</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official MMMUT Calendar Occasion / Vacation Banner */}
      {calendarEvent && (
        <div className={`p-4 rounded-3xl flex items-center justify-between gap-3 border shadow-xs animate-in fade-in duration-200 ${
          calendarEvent.isHoliday 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300'
            : calendarEvent.isAudit
            ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-300'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300'
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-xl select-none">
              {calendarEvent.isHoliday ? '🏖️' : calendarEvent.isAudit ? '🚨' : '📝'}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10">
                  MMMUT CALENDAR &bull; {calendarEvent.dates}
                </span>
                {calendarEvent.noClass && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/15">
                    No Regular Classes Scheduled
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold tracking-tight text-[#101828] dark:text-white mt-1">
                {calendarEvent.activity}
              </h4>
              {calendarEvent.note && (
                <p className="text-xs opacity-90 mt-0.5 leading-relaxed">
                  {calendarEvent.note}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Classes Checklist List */}
      <div className="space-y-2.5">
        {scheduledClasses.length === 0 ? (
          <div className="py-10 rounded-xl bg-white dark:bg-zinc-900/30 border border-dashed border-slate-200 dark:border-zinc-800 text-center p-6 shadow-xs">
            <Calendar className="w-8 h-8 text-slate-400 dark:text-zinc-600 mx-auto mb-2" />
            <h4 className="text-xs font-semibold text-slate-800 dark:text-zinc-300 mb-0.5">No classes scheduled for {dayOfWeek}</h4>
            <p className="text-[11px] text-slate-500 dark:text-zinc-500 mb-3">
              No classes in your weekly timetable for this day.
            </p>
            <button
              onClick={onOpenExtraClass}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border dark:border-zinc-800 dark:text-zinc-300 text-xs font-medium inline-flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Unscheduled Class</span>
            </button>
          </div>
        ) : (
          scheduledClasses.map((item) => {
            const subject = subjectMap.get(item.subject_id)
            const currentStatus = pendingSelections[item.id]

            return (
              <div
                key={item.id}
                className="p-5 rounded-3xl theme-card hover:border-[#0091ff]/30 dark:hover:border-[#ff5e3a]/40 transition-all text-[#1d1d1f] dark:text-[#f5f5f7] shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  {/* Class Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-mono text-[#1d1d1f] dark:text-zinc-200 text-xs flex items-center gap-1.5 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-[#86868b] dark:text-sky-400" />
                        {item.start_time} - {item.end_time}
                      </span>
                      {item.room && (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#1d1d1f] dark:text-slate-100 bg-black/[0.04] dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700/80 px-2.5 py-0.5 rounded-md shadow-xs">
                          <MapPin className="w-3.5 h-3.5 text-[#86868b] dark:text-sky-400 shrink-0" />
                          {item.room}
                        </span>
                      )}
                      {item.group === 'P1' && (
                        <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-black/[0.04] dark:bg-sky-500/20 text-[#1d1d1f] dark:text-sky-300 border border-black/[0.08] dark:border-sky-500/40">
                          Group P1
                        </span>
                      )}
                      {item.group === 'P2' && (
                        <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-black/[0.04] dark:bg-purple-500/20 text-[#1d1d1f] dark:text-purple-300 border border-black/[0.08] dark:border-purple-500/40">
                          Group P2
                        </span>
                      )}
                      {subject?.code && (
                        <span className="font-mono text-xs font-bold text-[#1d1d1f] dark:text-sky-300 bg-black/[0.04] dark:bg-sky-950/80 border border-black/[0.08] dark:border-sky-500/40 px-2.5 py-0.5 rounded-md tracking-wider shadow-xs">
                          {subject.code}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-[#1d1d1f] dark:text-white tracking-tight">
                      {subject ? subject.name : 'Unknown Subject'}
                    </h4>
                    {item.notes && (
                      <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        {item.notes}
                      </p>
                    )}
                  </div>

                  {/* Mutually Exclusive Segmented Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-[#f5f5f7] dark:bg-[#0c0d12] p-1.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08]">
                    {attendanceOptions.map((opt) => {
                      const Icon = opt.icon
                      const isSelected = currentStatus === opt.value

                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSelectStatus(item, opt.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                            isSelected
                              ? opt.activeColor
                              : 'border-transparent text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.04] dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span>{opt.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
