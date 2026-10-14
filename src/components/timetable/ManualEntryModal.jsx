import React, { useState, useEffect } from 'react'
import { X, Calendar, Clock, MapPin, User } from 'lucide-react'

export function ManualEntryModal({ isOpen, onClose, onSave, subjects = [], initialData = null }) {
  const [formData, setFormData] = useState({
    subject_id: '',
    custom_subject_name: '',
    custom_subject_code: '',
    day: 'Monday',
    start_time: '09:00',
    end_time: '10:00',
    room: 'Classroom',
    semester: 'Semester 1',
    faculty: '',
    group: 'ALL', // 'ALL' | 'P1' | 'P2'
    type: 'Lecture' // 'Lecture' | 'Lab' | 'Workshop' | 'Tutorial'
  })
  const [isNewSubject, setIsNewSubject] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        subject_id: initialData.subject_id || '',
        custom_subject_name: '',
        custom_subject_code: '',
        day: initialData.day || 'Monday',
        start_time: initialData.start_time || '09:00',
        end_time: initialData.end_time || '10:00',
        room: initialData.room || 'Classroom',
        semester: initialData.semester || 'Semester 1',
        faculty: initialData.faculty || '',
        group: initialData.group || 'ALL',
        type: initialData.type || 'Lecture'
      })
      setIsNewSubject(false)
    } else if (subjects.length > 0) {
      setFormData(prev => ({ ...prev, subject_id: subjects[0].id }))
      setIsNewSubject(false)
    } else {
      setIsNewSubject(true)
    }
  }, [initialData, subjects, isOpen])

  if (!isOpen) return null

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      isNewSubject
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl rounded-3xl p-6 sm:p-7 text-[#1d1d1f] dark:text-[#f5f5f7]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white p-1.5 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-5">
          <h3 className="text-base font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
            {initialData ? 'Edit Class Session' : 'Add Class Session'}
          </h3>
          <p className="text-xs text-[#86868b] mt-0.5">Configure weekly class slot and schedule</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject Selection or Create New */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#86868b]">
                Course / Subject
              </label>
              {subjects.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsNewSubject(!isNewSubject)}
                  className="text-xs text-[#0071e3] hover:underline font-medium"
                >
                  {isNewSubject ? 'Select Existing' : '+ Add New'}
                </button>
              )}
            </div>

            {!isNewSubject && subjects.length > 0 ? (
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
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Subject Name"
                  value={formData.custom_subject_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, custom_subject_name: e.target.value }))}
                  className="sm:col-span-2 bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition"
                />
                <input
                  type="text"
                  placeholder="Code (CS501)"
                  value={formData.custom_subject_code}
                  onChange={(e) => setFormData(prev => ({ ...prev, custom_subject_code: e.target.value }))}
                  className="bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none uppercase font-mono transition"
                />
              </div>
            )}
          </div>

          {/* Day of Week */}
          <div>
            <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
              Day of the Week
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {days.map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, day: d }))}
                  className={`py-2 rounded-xl text-xs font-medium transition ${
                    formData.day === d
                      ? 'bg-[#1d1d1f] text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                      : 'bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.06] dark:border-white/[0.06] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                  }`}
                >
                  {d.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Start and End Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                Start Time
              </label>
              <div className="relative">
                <Clock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
                <input
                  type="time"
                  required
                  value={formData.start_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                  className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl pl-8 pr-3 py-2 text-xs text-[#1d1d1f] dark:text-white font-mono focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                End Time
              </label>
              <div className="relative">
                <Clock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
                <input
                  type="time"
                  required
                  value={formData.end_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                  className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl pl-8 pr-3 py-2 text-xs text-[#1d1d1f] dark:text-white font-mono focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Group (ALL, P1, P2) and Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                Batch / Section Group
              </label>
              <select
                value={formData.group || 'ALL'}
                onChange={(e) => setFormData(prev => ({ ...prev, group: e.target.value }))}
                className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition"
              >
                <option value="ALL">All Students (Common Lecture)</option>
                <option value="P1">Group P1 Only (Lab / Workshop)</option>
                <option value="P2">Group P2 Only (Lab / Workshop)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                Session Type
              </label>
              <select
                value={formData.type || 'Lecture'}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition"
              >
                <option value="Lecture">Lecture</option>
                <option value="Lab">Lab Practical</option>
                <option value="Workshop">Manufacturing Workshop</option>
                <option value="Tutorial">Tutorial</option>
              </select>
            </div>
          </div>

          {/* Room & Faculty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                Room / Lab (Optional)
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
                <input
                  type="text"
                  placeholder="e.g. Hall 302"
                  value={formData.room}
                  onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
                  className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl pl-8 pr-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                Faculty (Optional)
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
                <input
                  type="text"
                  placeholder="e.g. Dr. Vance"
                  value={formData.faculty}
                  onChange={(e) => setFormData(prev => ({ ...prev, faculty: e.target.value }))}
                  className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl pl-8 pr-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition"
                />
              </div>
            </div>
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
              {initialData ? 'Update Session' : 'Save Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
