import React, { useState } from 'react'
import { 
  X, 
  Calculator, 
  Calendar, 
  ShieldAlert, 
  ShieldCheck, 
  Palmtree, 
  Clock, 
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react'
import { calculateBunkMargin, getAttendanceColor } from '../../lib/utils'
import { 
  MMMUT_ACADEMIC_CALENDAR, 
  calculateAcademicSemesterProjection 
} from '../../services/academicCalendarData'

export function BunkCalculatorModal({ isOpen, onClose, subjects = [], onOpenCalendar }) {
  const [selectedSubId, setSelectedSubId] = useState(subjects[0]?.id || '')
  const [targetPercentage, setTargetPercentage] = useState(75)
  const [selectedTerm, setSelectedTerm] = useState('Odd') // 'Odd' | 'Even'
  const [simulateAttend, setSimulateAttend] = useState(0)
  const [simulateMiss, setSimulateMiss] = useState(0)
  const [weeklySessions, setWeeklySessions] = useState(4)

  if (!isOpen) return null

  const currentSubject = subjects.find(s => s.id === selectedSubId) || subjects[0]
  const attended = currentSubject?.attended || 0
  const conducted = currentSubject?.conducted || 0

  // 1. Current real-time bunk margin
  const margin = calculateBunkMargin(attended, conducted, targetPercentage)

  // 2. Interactive simulator
  const simulatedAttended = attended + simulateAttend
  const simulatedConducted = conducted + simulateAttend + simulateMiss
  const simulatedPercentage = simulatedConducted > 0 
    ? Math.round((simulatedAttended / simulatedConducted) * 100) 
    : 100

  const simulatedColor = getAttendanceColor(simulatedPercentage, simulatedConducted)

  // 3. Official Academic Calendar Projection (MMMUT 2026-27)
  const projection = calculateAcademicSemesterProjection({
    semesterTerm: selectedTerm,
    weeklyClassCount: weeklySessions
  })

  // Full semester calculation
  // Total projected classes in semester = already conducted + remaining lectures
  const totalSemesterLectures = conducted + projection.remainingLectures
  // Maximum classes the student can miss across entire semester:
  // (attended + x) / totalSemesterLectures >= targetPercentage / 100
  // Or: maximum absences allowed for the rest of semester:
  // If student attends all other classes, how many can they miss?
  const maxTotalAllowedMisses = Math.floor(totalSemesterLectures * (1 - (targetPercentage / 100)))
  const currentMissed = conducted - attended
  const remainingBunksUntilDeanCutoff = Math.max(0, maxTotalAllowedMisses - currentMissed)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#12141d] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl rounded-3xl p-5 sm:p-7 text-[#1d1d1f] dark:text-[#f5f5f7] max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white p-1.5 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-4 pr-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#0091ff]/10 dark:bg-[#ff5e3a]/15 text-[#0091ff] dark:text-[#ffa043] border border-[#0091ff]/20 dark:border-[#ff5e3a]/30">
              ACADEMIC CALENDAR CURATED
            </span>
            <span className="text-xs text-[#86868b]">MMMUT Session 2026-27</span>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-[#101828] dark:text-white">
            Semester Bunk & Attendance Calculator
          </h3>
          <p className="text-xs text-[#86868b] mt-0.5">
            Calibrated with official vacation breaks (Nov 09-16) and exam milestones up to Dean Office 75% cutoff.
          </p>
        </div>

        <div className="overflow-y-auto flex-1 pr-1 space-y-4">
          {/* Semester Selector Pill */}
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.06] dark:border-white/[0.08]">
            <button
              onClick={() => setSelectedTerm('Odd')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedTerm === 'Odd'
                  ? 'bg-white dark:bg-[#1f2230] text-[#101828] dark:text-white shadow-xs border border-black/[0.06] dark:border-white/[0.08]'
                  : 'text-[#86868b] hover:text-[#101828] dark:hover:text-white'
              }`}
            >
              Odd Sem (Aug 03 – Nov 23, 2026)
            </button>
            <button
              onClick={() => setSelectedTerm('Even')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedTerm === 'Even'
                  ? 'bg-white dark:bg-[#1f2230] text-[#101828] dark:text-white shadow-xs border border-black/[0.06] dark:border-white/[0.08]'
                  : 'text-[#86868b] hover:text-[#101828] dark:hover:text-white'
              }`}
            >
              Even Sem (Dec 14 – Apr 17, 2027)
            </button>
          </div>

          {/* Course Selector & Target */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                Course to Calculate
              </label>
              <select
                value={selectedSubId}
                onChange={(e) => {
                  setSelectedSubId(e.target.value)
                  setSimulateAttend(0)
                  setSimulateMiss(0)
                }}
                className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-[#101828] dark:text-white focus:outline-none transition cursor-pointer"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id} className="bg-white dark:bg-[#12141d] text-[#101828] dark:text-white">
                    {s.code ? `${s.code} - ${s.name}` : s.name} ({s.conducted > 0 ? `${s.percentage}%` : '0 logged'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                Target Threshold
              </label>
              <div className="flex items-center gap-1.5">
                {[75, 80, 85].map(pct => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setTargetPercentage(pct)}
                    className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                      targetPercentage === pct
                        ? 'bg-[#101828] text-white dark:bg-white dark:text-black shadow-xs'
                        : 'bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.06] dark:border-white/[0.06] text-[#86868b] hover:text-[#101828] dark:hover:text-white'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Calendar Official Projection Plate */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0091ff]/10 via-transparent to-transparent dark:from-[#ff5e3a]/15 border border-[#0091ff]/20 dark:border-[#ff5e3a]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-[#0091ff] dark:text-[#ffa043] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                ACADEMIC CALENDAR RUNWAY
              </span>
              <span className="text-[11px] text-[#86868b] font-mono">
                Cutoff: {selectedTerm === 'Odd' ? 'Nov 26 (Dean Notice)' : 'Apr 22 (Dean Notice)'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-y border-black/[0.06] dark:border-white/[0.08] text-center my-2">
              <div>
                <span className="text-[10px] text-[#86868b] block">Teaching Weeks Left</span>
                <span className="text-sm font-bold font-mono text-[#101828] dark:text-white">
                  {projection.remainingWeeks} wks
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#86868b] block">Remaining Lectures</span>
                <span className="text-sm font-bold font-mono text-[#0091ff] dark:text-[#ffa043]">
                  ~{projection.remainingLectures}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#86868b] block">Full Sem Bunk Quota</span>
                <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {remainingBunksUntilDeanCutoff} classes
                </span>
              </div>
            </div>

            <p className="text-xs text-[#475467] dark:text-[#9aa1b2] leading-relaxed mt-2">
              {remainingBunksUntilDeanCutoff > 0 ? (
                <span>
                  &bull; Across the remaining teaching days until <strong>{selectedTerm === 'Odd' ? 'Nov 23' : 'Apr 17'}</strong> (excluding Mid-Sem Break), you can miss up to <strong className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">{remainingBunksUntilDeanCutoff} classes</strong> and still maintain &ge; {targetPercentage}% for your admit card.
                </span>
              ) : (
                <span className="text-rose-600 dark:text-rose-400 font-medium">
                  &bull; Warning: No safe bunks remaining this term. You must attend all scheduled lectures to ensure you do not drop below the mandatory 75% cutoff.
                </span>
              )}
            </p>
          </div>

          {/* Current Real-Time Status Card */}
          <div className={`p-4 rounded-2xl border ${margin.isSafe ? 'bg-emerald-500/10 border-emerald-500/25' : 'bg-rose-500/10 border-rose-500/25'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#101828] dark:text-white flex items-center gap-1.5">
                {margin.isSafe ? <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                Current Standing: {conducted > 0 ? `${currentSubject?.percentage}%` : 'Initial Baseline'} ({attended}/{conducted} logged)
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${margin.isSafe ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' : 'bg-rose-500/20 text-rose-700 dark:text-rose-300'}`}>
                {margin.isSafe ? 'SAFE' : 'RECOVERY REQUIRED'}
              </span>
            </div>

            <p className="text-xs text-[#101828] dark:text-[#f5f5f7] mt-1 leading-relaxed">
              {conducted === 0 ? (
                'No attendance logged yet. You start with 100% eligibility. Attend scheduled classes to establish your runway.'
              ) : margin.isSafe ? (
                <span>
                  Immediate Runway: You can safely miss <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{margin.canBunk}</strong> consecutive {margin.canBunk === 1 ? 'class' : 'classes'} right now without dropping below {targetPercentage}%.
                </span>
              ) : (
                <span>
                  Immediate Recovery: You must attend the next <strong className="text-rose-600 dark:text-rose-400 font-mono font-bold">{margin.needToAttend}</strong> consecutive {margin.needToAttend === 1 ? 'class' : 'classes'} to restore your attendance to {targetPercentage}%.
                </span>
              )}
            </p>
          </div>

          {/* Interactive What-If Simulator */}
          <div className="bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl p-4">
            <h4 className="text-xs font-bold text-[#101828] dark:text-white mb-2 flex items-center justify-between">
              <span>Test Custom What-If Scenario</span>
              <span className="text-[11px] font-mono text-[#86868b]">Interactive Slider</span>
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#86868b] mb-1">
                  Attend next: <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">+{simulateAttend}</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={simulateAttend}
                  onChange={(e) => setSimulateAttend(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#86868b] mb-1">
                  Bunk next: <strong className="text-rose-600 dark:text-rose-400 font-mono font-bold">+{simulateMiss}</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={simulateMiss}
                  onChange={(e) => setSimulateMiss(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-[#86868b]">Simulated Outcome:</span>
              <div className="flex items-center gap-2">
                <span className={`font-extrabold font-mono text-base ${simulatedColor.text}`}>
                  {simulatedPercentage}%
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${simulatedColor.badge}`}>
                  {simulatedColor.label}
                </span>
              </div>
            </div>
          </div>

          {/* Embedded University Vacations & Occasions Strip */}
          <div className="p-3.5 rounded-2xl bg-[#faf7f0] dark:bg-[#0c0e17] border border-black/[0.06] dark:border-white/[0.06]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-[#101828] dark:text-white flex items-center gap-1.5">
                <Palmtree className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                OFFICIAL VACATIONS & MILESTONES (NO CLASSES)
              </span>
              {onOpenCalendar && (
                <button
                  onClick={() => {
                    onClose()
                    onOpenCalendar()
                  }}
                  className="text-[11px] font-bold text-[#0091ff] dark:text-[#ffa043] hover:underline cursor-pointer"
                >
                  View Full Schedule &rarr;
                </button>
              )}
            </div>

            <div className="space-y-1.5 text-xs text-[#475467] dark:text-[#9aa1b2]">
              {selectedTerm === 'Odd' ? (
                <>
                  <div className="flex items-center justify-between py-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                    <span>🏖️ <strong>Mid Semester Break</strong> (Vacation)</span>
                    <span className="font-mono text-[#101828] dark:text-white">Nov 09 – 16, 2026</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                    <span>📝 <strong>Minor Test Exam</strong> (No Regular Lectures)</span>
                    <span className="font-mono text-[#101828] dark:text-white">Sept 21 – 25, 2026</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>🏛️ <strong>University Foundation Day</strong> (Holiday)</span>
                    <span className="font-mono text-[#101828] dark:text-white">Dec 01, 2026</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between py-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                    <span>🏖️ <strong>Mid Semester Break</strong> (Vacation)</span>
                    <span className="font-mono text-[#101828] dark:text-white">Mar 22 – 27, 2027</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                    <span>🎉 <strong>Tech Srijan (CSA Fest)</strong></span>
                    <span className="font-mono text-[#101828] dark:text-white">Dec 18 – 20, 2026</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>🏖️ <strong>Summer Session Break</strong></span>
                    <span className="font-mono text-[#101828] dark:text-white">May 05 – Jun 30, 2027</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 mt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
          <span className="text-xs text-[#86868b]">75% College Criterion Active</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#101828] text-white dark:bg-white dark:text-black text-xs font-semibold cursor-pointer"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  )
}
