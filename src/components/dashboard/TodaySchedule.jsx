import React, { useState } from 'react'
import { Clock, MapPin, CheckCircle2, ChevronRight, CalendarDays, Filter, Users, Wrench, Sparkles } from 'lucide-react'
import { getDayOfWeek } from '../../lib/utils'

export function TodaySchedule({ 
  timetable = [], 
  subjects = [], 
  todayLogs = [], 
  onOpenAttendance, 
  onMarkQuick,
  userLabGroup = 'P1',
  userSection = '',
  onToggleLabGroup
}) {
  const todayDateStr = new Date().toISOString().split('T')[0]
  const todayDayName = getDayOfWeek(todayDateStr)

  // Filter timetable strictly for today and for the student's active group
  const myGroup = userLabGroup || 'P1'
  const todaysClasses = timetable
    .filter(t => t.day.toLowerCase() === todayDayName.toLowerCase())
    .filter(item => item.group === myGroup || item.group === 'ALL' || !item.group)
    .sort((a, b) => a.start_time.localeCompare(b.start_time))

  const subjectMap = new Map(subjects.map(s => [s.id, s]))

  return (
    <div className="p-5 sm:p-6 rounded-3xl theme-card shadow-xs transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-bold text-[#101828] dark:text-white tracking-tight">
              Today's Live Timeline
            </h3>
            <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold text-[#0091ff] dark:text-[#ffa043] bg-[#0091ff]/10 dark:bg-[#ff5e3a]/15 border border-[#0091ff]/20 dark:border-[#ff5e3a]/30">
              {todayDayName}
            </span>

            {/* Active Lab Group Badge & Quick Switcher */}
            <span className="px-3 py-0.5 rounded-full text-xs font-mono font-semibold bg-black/5 dark:bg-white/10 text-[#101828] dark:text-slate-200 border border-black/10 dark:border-white/10 flex items-center gap-1.5">
              <span>{userSection ? `${userSection} • ` : ''}Group {myGroup}</span>
            </span>

            <button
              onClick={onToggleLabGroup}
              title={`Switch active view to Group ${myGroup === 'P1' ? 'P2' : 'P1'}`}
              className="px-3 py-0.5 rounded-full text-[11px] font-semibold text-[#475467] dark:text-[#9aa1b2] hover:text-[#101828] dark:hover:text-white bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 transition cursor-pointer"
            >
              Switch to {myGroup === 'P1' ? 'Group P2' : 'Group P1'}
            </button>
          </div>
          <p className="text-xs text-[#475467] dark:text-[#9aa1b2] mt-1">
            {todaysClasses.length > 0 
              ? `${todaysClasses.length} sessions scheduled today for Group ${myGroup} (Only your allocated labs & workshops)` 
              : `No scheduled classes or labs today for Group ${myGroup}`}
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenAttendance}
            className="ignitio-huly-btn px-4 py-2.5 text-xs inline-flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark Today's Attendance</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>
      </div>

      {todaysClasses.length === 0 ? (
        <div className="py-10 text-center border border-dashed border-black/15 dark:border-white/10 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02]">
          <CalendarDays className="w-8 h-8 text-[#737373] dark:text-[#5e6678] mx-auto mb-2 opacity-60" />
          <p className="text-xs font-semibold text-[#475467] dark:text-[#9aa1b2]">No classes scheduled for {todayDayName}</p>
          <p className="text-[11px] text-[#737373] dark:text-[#5e6678] mt-0.5">Enjoy your free study hours or log extra makeup classes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {todaysClasses.map((item) => {
            const subject = subjectMap.get(item.subject_id)
            const log = todayLogs.find(l => l.timetable_id === item.id || l.subject_id === item.subject_id)
            const isMarked = Boolean(log)

            const statusColors = {
              present: 'text-emerald-700 bg-emerald-500/15 border-emerald-500/30 dark:text-emerald-300 dark:bg-emerald-950/80 dark:border-emerald-500/40',
              absent: 'text-rose-700 bg-rose-500/15 border-rose-500/30 dark:text-rose-300 dark:bg-rose-950/80 dark:border-rose-500/40',
              cancelled: 'text-amber-700 bg-amber-500/15 border-amber-500/30 dark:text-amber-300 dark:bg-amber-950/80 dark:border-amber-500/40',
              holiday: 'text-sky-700 bg-sky-500/15 border-sky-500/30 dark:text-sky-300 dark:bg-sky-950/80 dark:border-sky-500/40'
            }

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#0c0e15] border border-black/10 dark:border-white/10 hover:border-[#0091ff]/50 dark:hover:border-[#ff5e3a]/50 flex flex-col justify-between transition-all duration-200 shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="flex items-center gap-1.5 font-mono text-[#101828] dark:text-[#ffa043] font-bold">
                      <Clock className="w-3.5 h-3.5 text-[#0091ff] dark:text-[#ffa043]" />
                      {item.start_time} - {item.end_time}
                    </span>
                    {item.room && (
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#101828] dark:text-white bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 px-2.5 py-0.5 rounded-full">
                        <MapPin className="w-3 h-3 text-[#0091ff] dark:text-[#ffa043]" />
                        {item.room}
                      </span>
                    )}
                  </div>

                  {/* Group & Type Badge */}
                  <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                    {item.group === 'P1' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#0091ff]/10 text-[#0091ff] dark:bg-sky-500/20 dark:text-sky-300 border border-[#0091ff]/20 dark:border-sky-500/30">
                        Group P1 Lab
                      </span>
                    )}
                    {item.group === 'P2' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-500/20 dark:border-purple-500/30">
                        Group P2 Lab
                      </span>
                    )}
                    {item.group === 'ALL' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-black/5 dark:bg-white/10 text-[#475467] dark:text-slate-300 border border-black/5 dark:border-white/10">
                        Common Lecture
                      </span>
                    )}
                    {item.type && (
                      <span className="text-[11px] font-medium text-[#475467] dark:text-slate-400 font-mono uppercase">
                        &bull; {item.type}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-base font-bold text-[#101828] dark:text-white tracking-tight line-clamp-1">
                      {subject ? subject.name : 'Class Session'}
                    </h4>
                    {subject?.code && (
                      <span className="font-mono text-xs font-bold text-[#101828] dark:text-white bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 px-2 py-0.5 rounded-md shrink-0">
                        {subject.code}
                      </span>
                    )}
                  </div>

                  {item.notes && (
                    <p className="text-xs text-[#475467] dark:text-slate-300 mt-1 flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {item.notes}
                    </p>
                  )}
                </div>

                <div className="mt-3.5 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  {isMarked ? (
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border capitalize ${statusColors[log.status] || 'bg-black/5 text-slate-700'}`}>
                      {log.status === 'present' ? '✓ Present' : log.status}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span>Not logged yet</span>
                    </span>
                  )}

                  <button
                    onClick={() => onMarkQuick(item, subject)}
                    className="text-xs font-bold text-[#0091ff] hover:text-[#007ee6] dark:text-[#ffa043] dark:hover:text-[#ffb76b] hover:underline transition cursor-pointer"
                  >
                    {isMarked ? 'Change Status' : 'Quick Mark'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
