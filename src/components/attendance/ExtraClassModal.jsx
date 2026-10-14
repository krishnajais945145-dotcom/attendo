import React, { useState } from 'react'
import { X, Plus, Calendar, Clock, BookOpen, CheckCircle2 } from 'lucide-react'
import { formatDate } from '../../lib/utils'

export function ExtraClassModal({ isOpen, onClose, subjects = [], onSave }) {
  const [formData, setFormData] = useState({
    subject_id: subjects[0]?.id || '',
    date: formatDate(new Date()),
    status: 'present',
    notes: 'Makeup / Extra Class'
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl rounded-3xl p-6 sm:p-7 text-[#1d1d1f] dark:text-[#f5f5f7]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white p-1.5 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7] flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">Log Extra / Makeup Class</h3>
            <p className="text-xs text-[#86868b] mt-0.5">Record a class not in your standard timetable</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
              Course / Subject
            </label>
            <select
              value={formData.subject_id}
              onChange={(e) => setFormData(prev => ({ ...prev, subject_id: e.target.value }))}
              className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2.5 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition appearance-none cursor-pointer"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id} className="bg-white dark:bg-[#121318] text-[#1d1d1f] dark:text-white">
                  {s.code ? `${s.code} - ${s.name}` : s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white font-mono focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
              Attendance Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['present', 'absent', 'cancelled', 'holiday'].map(status => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, status }))}
                  className={`py-2 rounded-xl text-xs font-semibold capitalize transition ${
                    formData.status === status
                      ? 'bg-[#1d1d1f] text-white dark:bg-white dark:text-black shadow-xs font-semibold'
                      : 'bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.06] dark:border-white/[0.06] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
              Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Extra Saturday tutorial"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition"
            />
          </div>

          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-xs font-medium text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl mac-btn-primary text-xs font-semibold"
            >
              Save Class Record
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
