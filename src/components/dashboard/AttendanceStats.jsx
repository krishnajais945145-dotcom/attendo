import React from 'react'
import { getAttendanceColor } from '../../lib/utils'

export function AttendanceStats({ stats }) {
  const {
    overallPercentage = 0,
    totalConducted = 0,
    totalAttended = 0,
    totalMissed = 0,
    totalCancelled = 0,
    totalHolidays = 0,
    subjectCount = 0
  } = stats || {}

  const colorStyles = getAttendanceColor(overallPercentage, totalConducted)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Overall Percentage Card */}
      <div className="p-5 sm:p-6 rounded-3xl theme-card shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#475467] dark:text-[#9aa1b2]">
            Overall Attendance
          </span>
          <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${colorStyles.badge}`}>
            {colorStyles.label}
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className={`text-4xl font-extrabold font-mono tracking-tight ${colorStyles.text}`}>
            {overallPercentage}%
          </span>
          <span className="text-xs font-mono font-medium text-[#475467] dark:text-[#9aa1b2]">/ 75% target</span>
        </div>

        <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              overallPercentage >= 75
                ? 'bg-[#0091ff] dark:bg-[#ffa043]'
                : overallPercentage >= 65
                ? 'bg-amber-400'
                : 'bg-rose-500'
            }`}
            style={{ width: `${totalConducted > 0 ? Math.min(100, overallPercentage) : 0}%` }}
          />
        </div>
      </div>

      {/* 2. Total Attended Card */}
      <div className="p-5 sm:p-6 rounded-3xl theme-card shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#475467] dark:text-[#9aa1b2]">
            Attended Classes
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs animate-pulse" />
        </div>
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-4xl font-extrabold font-mono text-[#101828] dark:text-white tracking-tight">
            {totalAttended}
          </span>
          <span className="text-xs font-medium text-[#475467] dark:text-[#9aa1b2]">sessions</span>
        </div>
        <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          ✓ Logged Present
        </p>
      </div>

      {/* 3. Total Missed / Absent Card */}
      <div className="p-5 sm:p-6 rounded-3xl theme-card shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#475467] dark:text-[#9aa1b2]">
            Missed Classes
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs" />
        </div>
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-4xl font-extrabold font-mono text-[#101828] dark:text-white tracking-tight">
            {totalMissed}
          </span>
          <span className="text-xs font-medium text-[#475467] dark:text-[#9aa1b2]">sessions</span>
        </div>
        <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
          ✗ Logged Absent
        </p>
      </div>

      {/* 4. Total Conducted Card */}
      <div className="p-5 sm:p-6 rounded-3xl theme-card shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#475467] dark:text-[#9aa1b2]">
            Total Conducted
          </span>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[#475467] dark:text-[#9aa1b2] border border-black/5 dark:border-white/10">
            {subjectCount} courses
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-4xl font-extrabold font-mono text-[#101828] dark:text-white tracking-tight">
            {totalConducted}
          </span>
          <span className="text-xs font-medium text-[#475467] dark:text-[#9aa1b2]">total classes</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-medium text-[#475467] dark:text-[#9aa1b2]">
          <span>{totalCancelled} cancelled</span>
          <span>&bull;</span>
          <span>{totalHolidays} holidays</span>
        </div>
      </div>
    </div>
  )
}
