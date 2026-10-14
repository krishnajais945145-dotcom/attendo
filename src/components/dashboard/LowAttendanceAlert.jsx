import React from 'react'
import { ShieldAlert, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react'
import { calculateBunkMargin } from '../../lib/utils'

export function LowAttendanceAlert({ stats, onOpenBunkCalc }) {
  const lowSubjects = stats?.lowAttendanceSubjects || []
  const overallPercentage = stats?.overallPercentage || 0
  const totalConducted = stats?.totalConducted || 0
  const subjects = stats?.subjects || []

  // Calculate overall safe bunk margin
  const totalAttended = stats?.totalAttended || 0
  const overallMargin = calculateBunkMargin(totalAttended, totalConducted, 75)
  const isSafe = lowSubjects.length === 0 && (totalConducted === 0 || overallPercentage >= 75)

  return (
    <section 
      aria-label="Attendance Risk Radar & Status Monitor"
      className={`relative overflow-hidden p-5 sm:p-6 rounded-3xl transition-all duration-300 ${
        !isSafe
          ? 'bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/5 border border-rose-500/30 dark:border-rose-500/40'
          : 'theme-card border-black/10 dark:border-white/10 shadow-sm'
      }`}
    >
      {/* Background ambient decorative glow in dark mode */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#0091ff]/10 dark:from-[#ff5e3a]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Icon & Status Overview */}
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
            !isSafe
              ? 'bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400'
              : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
          }`}>
            {!isSafe ? (
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[11px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                !isSafe
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
                  : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
              }`}>
                {!isSafe ? 'ATTENDANCE RISK RADAR • WARNING' : 'ATTENDANCE SHIELD ACTIVE • 75% SECURE'}
              </span>

              <span className="text-xs text-[#475467] dark:text-[#9aa1b2]">
                {totalConducted === 0 ? (
                  'Initial Term Baseline'
                ) : !isSafe ? (
                  `${lowSubjects.length} ${lowSubjects.length === 1 ? 'course' : 'courses'} below 75%`
                ) : (
                  `All ${subjects.length} courses compliant`
                )}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#101828] dark:text-white tracking-tight">
              {totalConducted === 0 ? (
                'Semester Attendance Ready: 75% Minimum Criterion'
              ) : !isSafe ? (
                'Action Required: Attendance Recovery Recommended'
              ) : (
                `Safe Bunk Zone: You Can Safely Miss Up To ${overallMargin.canBunk} Classes`
              )}
            </h3>

            <p className="text-xs text-[#475467] dark:text-[#9aa1b2] max-w-2xl leading-relaxed">
              {totalConducted === 0 ? (
                'No attendance logged yet. Mark your first class session today to establish your live safety margin.'
              ) : !isSafe ? (
                'Certain registered courses have dropped below the required 75% college threshold. Check the recovery schedule below.'
              ) : (
                'Your overall attendance is strong. You can afford strategic leaves without risking exam debarment.'
              )}
            </p>

            {/* List of critical or safe subjects */}
            <div className="flex flex-wrap gap-2 pt-2">
              {!isSafe ? (
                lowSubjects.map(sub => {
                  const margin = calculateBunkMargin(sub.attended, sub.conducted, 75)
                  return (
                    <div
                      key={sub.id}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-black/40 border border-rose-500/30 text-xs shadow-xs"
                    >
                      <span className="font-bold text-[#101828] dark:text-white">{sub.code || sub.name}:</span>
                      <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{sub.percentage}%</span>
                      <span className="text-[11px] text-[#475467] dark:text-[#9aa1b2]">
                        (Attend next <strong className="text-rose-600 dark:text-rose-400 font-bold">{margin.needToAttend}</strong> classes)
                      </span>
                    </div>
                  )
                })
              ) : (
                subjects.slice(0, 4).map(sub => {
                  const margin = calculateBunkMargin(sub.attended, sub.conducted, 75)
                  return (
                    <div
                      key={sub.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs"
                    >
                      <span className="font-semibold text-[#101828] dark:text-white">{sub.code || sub.name}</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{sub.percentage}%</span>
                      {margin.canBunk > 0 && (
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-medium font-mono">
                          (+{margin.canBunk} bunks)
                        </span>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Right: Action CTA */}
        <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
          <button
            onClick={onOpenBunkCalc}
            className="ignitio-huly-btn px-5 py-3 text-xs flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>{!isSafe ? 'Launch Recovery Plan' : 'Simulate Bunks & Radar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
