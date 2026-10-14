import React from 'react'
import { X, CheckCircle2, XCircle, Ban, SunMedium, Clock } from 'lucide-react'

export function QuickMarkModal({ isOpen, onClose, targetClass, subject, onMarkStatus }) {
  if (!isOpen || !targetClass) return null

  const attendanceOptions = [
    {
      value: 'present',
      label: 'Present',
      sub: 'Attended session',
      icon: CheckCircle2,
      style: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
    },
    {
      value: 'absent',
      label: 'Absent',
      sub: 'Missed class',
      icon: XCircle,
      style: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/20'
    },
    {
      value: 'cancelled',
      label: 'Cancelled',
      sub: 'Teacher absent / class cancelled',
      icon: Ban,
      style: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/20'
    },
    {
      value: 'holiday',
      label: 'Holiday / No Class',
      sub: 'Campus declared holiday',
      icon: SunMedium,
      style: 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-700 dark:text-sky-400 border border-sky-500/20'
    }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl shadow-2xl p-6 sm:p-7 text-[#1d1d1f] dark:text-[#f5f5f7]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white p-1.5 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-4">
          <span className="text-[11px] font-mono font-bold text-sky-700 dark:text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
            {subject?.code || 'SESSION'}
          </span>
          <h3 className="text-base font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mt-2">{subject?.name || 'Class Session'}</h3>
          <p className="text-xs text-[#86868b] flex items-center gap-1.5 mt-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-[#86868b]" />
            <span>{targetClass.start_time} - {targetClass.end_time}</span>
            {targetClass.room && <span>&bull; {targetClass.room}</span>}
          </p>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-3">
          Select status:
        </p>

        <div className="space-y-2">
          {attendanceOptions.map((opt) => {
            const Icon = opt.icon
            return (
              <button
                key={opt.value}
                onClick={() => {
                  onMarkStatus(targetClass, opt.value)
                  onClose()
                }}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition group active:scale-[0.99] cursor-pointer ${opt.style}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold leading-tight">{opt.label}</p>
                    <p className="text-[10px] opacity-75 mt-0.5">{opt.sub}</p>
                  </div>
                </div>
                <span className="text-xs font-bold group-hover:translate-x-0.5 transition">&rarr;</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
