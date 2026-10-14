import React from 'react'
import { Plus, ArrowRight, User, Clock, Terminal, CheckCircle2, AlertCircle } from 'lucide-react'
import { getAttendanceColor, calculateBunkMargin } from '../../lib/utils'

function getDynamicScheduleText(subject, group = 'P1', timetable = []) {
  const g = (group || 'P1').toUpperCase()
  if (!timetable || timetable.length === 0) return null

  // Match all timetable entries for this subject (by ID or Code or Name)
  const matchingSlots = timetable.filter(t => 
    (t.subject_id === subject.id) || 
    (subject.code && t.subject_code && t.subject_code.toUpperCase() === subject.code.toUpperCase()) ||
    (t.subject_name && subject.name && t.subject_name.toLowerCase() === subject.name.toLowerCase())
  )

  if (matchingSlots.length === 0) return null

  // 1. First priority: Find practical/lab/workshop/tutorial specifically allocated for this student's group
  const groupLabSlot = matchingSlots.find(t => 
    (t.type === 'Lab' || t.type === 'Workshop' || t.type === 'Tutorial' || t.type === 'Practical') &&
    (t.group === g || t.group === 'ALL' || !t.group)
  )

  if (groupLabSlot) {
    const icon = groupLabSlot.type === 'Workshop' ? '🔨' : groupLabSlot.type === 'Tutorial' ? '📐' : '🧪'
    const grpLabel = groupLabSlot.group === 'ALL' ? '' : `Group ${groupLabSlot.group} `
    return {
      label: `${icon} ${grpLabel}${groupLabSlot.type || 'Session'}`,
      slot: `${groupLabSlot.day.slice(0, 3)} ${groupLabSlot.start_time} - ${groupLabSlot.end_time} • ${groupLabSlot.room || 'Lab'}`
    }
  }

  // 2. Second priority: If no group lab, show the weekly lecture schedule
  const lectureSlots = matchingSlots.filter(t => t.type === 'Lecture' || !t.type)
  if (lectureSlots.length > 0) {
    const days = Array.from(new Set(lectureSlots.map(s => s.day.slice(0, 3)))).join(', ')
    const firstRoom = lectureSlots[0].room || 'TL-205'
    return {
      label: `📖 ${lectureSlots.length} Weekly Lectures`,
      slot: `${days} • Room ${firstRoom}`
    }
  }

  // 3. Any other session
  const anySlot = matchingSlots[0]
  return {
    label: `📅 ${anySlot.type || 'Session'}`,
    slot: `${anySlot.day.slice(0, 3)} ${anySlot.start_time} - ${anySlot.end_time} • ${anySlot.room || 'TL-205'}`
  }
}

export function SubjectCards({ subjects = [], onMarkSubject, onOpenAddSubject, userLabGroup = 'P1', timetable = [] }) {
  // Only display subjects that actually belong to the uploaded timetable
  const activeSubjects = (timetable && timetable.length > 0)
    ? subjects.filter(sub => timetable.some(t => t.subject_id === sub.id || (sub.code && t.subject_code === sub.code)))
    : subjects

  if (activeSubjects.length === 0) {
    return (
      <div className="p-8 rounded-3xl theme-card border-dashed text-center">
        <h4 className="text-base font-bold text-[#101828] dark:text-white mb-1">No courses added</h4>
        <p className="text-xs text-[#475467] dark:text-[#9aa1b2] mb-4">
          Add your semester courses or upload your timetable image to populate this list.
        </p>
        <button
          onClick={onOpenAddSubject}
          className="ignitio-huly-btn px-5 py-2.5 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subject</span>
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base sm:text-lg font-bold text-[#101828] dark:text-white tracking-tight">
              Course Worlds & Breakdown
            </h3>
            <span className="text-[11px] font-mono font-bold text-[#0091ff] dark:text-[#ffa043] bg-[#0091ff]/10 dark:bg-[#ff5e3a]/15 border border-[#0091ff]/20 dark:border-[#ff5e3a]/30 px-2.5 py-0.5 rounded-full">
              Group {userLabGroup || 'P1'} Sessions
            </span>
          </div>
          <p className="text-xs text-[#475467] dark:text-[#9aa1b2] mt-0.5">
            Real-time compliance status, safe bunk limits, and laboratory allocations
          </p>
        </div>

        <button
          onClick={onOpenAddSubject}
          className="px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-semibold text-[#101828] dark:text-white inline-flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-[#0091ff] dark:text-[#ffa043]" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Course Cards Grid - Ignitio & Huly Card Aesthetic */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeSubjects.map((sub) => {
          const colorStyles = getAttendanceColor(sub.percentage, sub.conducted)
          const margin = calculateBunkMargin(sub.attended, sub.conducted, sub.min_threshold || 75)
          const labInfo = getDynamicScheduleText(sub, userLabGroup, timetable)

          return (
            <div
              key={sub.id}
              className="p-5 sm:p-6 rounded-3xl theme-card flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group relative"
            >
              <div>
                {/* Top Ignitio Pill Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-black/60 border border-black/10 dark:border-white/10 text-[11px] font-semibold text-[#101828] dark:text-white shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{sub.conducted > 0 ? `${sub.percentage}% Attendance` : 'Ready to Track'}</span>
                  </div>

                  <span className="font-mono text-xs font-bold text-[#475467] dark:text-[#9aa1b2] uppercase">
                    {sub.code || 'COURSE'}
                  </span>
                </div>

                {/* Clear Subject-Specific Intelligence Element (Replaces macOS terminal window) */}
                <div className="rounded-2xl p-4 mb-4 bg-[#f8f5ee] dark:bg-[#0c0e17] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
                  {/* Subject Domain Header & Session Count */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base select-none">
                        {sub.code?.includes('110') && sub.name?.toLowerCase().includes('math') ? '📐' :
                         sub.code?.includes('140') || sub.name?.toLowerCase().includes('chem') || sub.name?.toLowerCase().includes('env') ? '🧪' :
                         sub.code?.includes('BEE') || sub.name?.toLowerCase().includes('electr') ? '⚡' :
                         sub.code?.includes('BME') || sub.name?.toLowerCase().includes('workshop') || sub.name?.toLowerCase().includes('manufact') ? '🔨' :
                         sub.code?.includes('BHS') || sub.name?.toLowerCase().includes('writing') || sub.name?.toLowerCase().includes('commun') ? '✍️' :
                         sub.code?.includes('ECA') || sub.name?.toLowerCase().includes('induct') ? '🎓' :
                         '📚'}
                      </span>
                      <span className="text-[11px] font-semibold text-[#101828] dark:text-slate-200">
                        {sub.code?.includes('110') && sub.name?.toLowerCase().includes('math') ? 'Applied Mathematics' :
                         sub.code?.includes('140') || sub.name?.toLowerCase().includes('chem') || sub.name?.toLowerCase().includes('env') ? 'Chemistry & Environmental' :
                         sub.code?.includes('BEE') || sub.name?.toLowerCase().includes('electr') ? 'Electrical Engineering' :
                         sub.code?.includes('BME') || sub.name?.toLowerCase().includes('workshop') || sub.name?.toLowerCase().includes('manufact') ? 'Manufacturing Practice' :
                         sub.code?.includes('BHS') || sub.name?.toLowerCase().includes('writing') || sub.name?.toLowerCase().includes('commun') ? 'Technical Communication' :
                         sub.code?.includes('ECA') || sub.name?.toLowerCase().includes('induct') ? 'Foundational Induction' :
                         'Curriculum Course'}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-[#101828] dark:text-white">
                      {sub.conducted > 0 ? `${sub.attended}/${sub.conducted} Attended` : '0 Attended'}
                    </span>
                  </div>

                  {/* Clean Visual Progress Bar */}
                  <div className="w-full bg-black/5 dark:bg-white/10 rounded-full h-2 overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        sub.conducted === 0
                          ? 'bg-slate-300 dark:bg-slate-700'
                          : sub.percentage >= 75
                          ? 'bg-emerald-500'
                          : sub.percentage >= 65
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${sub.conducted > 0 ? Math.min(100, sub.percentage) : 0}%` }}
                    />
                  </div>

                  {/* Clear Venue & Timing Details */}
                  <div className="flex items-center justify-between text-[11px] text-[#475467] dark:text-[#9aa1b2] font-medium pt-1 border-t border-black/[0.04] dark:border-white/[0.06]">
                    <span className="truncate">
                      {labInfo ? labInfo.slot : 'Lecture Hall: TL-205 • 3 Credits'}
                    </span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold shrink-0 ml-2">
                      Target &ge; {sub.min_threshold || 75}%
                    </span>
                  </div>
                </div>

                {/* Course Title & Details */}
                <div className="flex items-center gap-1.5 text-xs text-[#475467] dark:text-[#9aa1b2] font-semibold mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{sub.min_threshold || 75}% COLLEGE MANDATE</span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-[#101828] dark:text-white line-clamp-1" title={sub.name}>
                  {sub.name}
                </h4>

                {sub.faculty && (
                  <p className="text-xs text-[#475467] dark:text-[#9aa1b2] flex items-center gap-1.5 mt-1 font-medium">
                    <User className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{sub.faculty}</span>
                  </p>
                )}
              </div>

              {/* Bottom Card Footer with Ignitio Circular Action Button */}
              <div className="pt-4 mt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#475467] dark:text-[#9aa1b2] block">
                    Telemetry Status
                  </span>
                  {margin.notStarted ? (
                    <span className="text-xs font-semibold text-[#101828] dark:text-white">
                      Initial Base (0 logged)
                    </span>
                  ) : margin.isSafe ? (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                      Safe (+{margin.canBunk} {margin.canBunk === 1 ? 'bunk' : 'bunks'})
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 font-mono">
                      Need +{margin.needToAttend} classes
                    </span>
                  )}
                </div>

                {/* Circular Action Button with Arrow (Ignitio signature) */}
                <button
                  onClick={() => onMarkSubject(sub)}
                  title={`Track ${sub.name}`}
                  className="ignitio-circle-btn w-10 h-10 shrink-0 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
