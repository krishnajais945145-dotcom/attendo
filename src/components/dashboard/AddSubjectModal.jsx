import React, { useState } from 'react'
import { X, BookOpen } from 'lucide-react'

export function AddSubjectModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    faculty: '',
    min_threshold: 75
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return
    onSave(formData)
    setFormData({ name: '', code: '', faculty: '', min_threshold: 75 })
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

        <div className="mb-5">
          <h3 className="text-base font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">Add Course</h3>
          <p className="text-xs text-[#86868b] mt-0.5">Add a course to your semester attendance roster</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
              Course / Subject Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Systems"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                Code (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. CS601"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white font-mono uppercase focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                Target Threshold (%)
              </label>
              <input
                type="number"
                min="50"
                max="100"
                value={formData.min_threshold}
                onChange={(e) => setFormData(prev => ({ ...prev, min_threshold: Number(e.target.value) }))}
                className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white font-mono focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
              Faculty (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Vance"
              value={formData.faculty}
              onChange={(e) => setFormData(prev => ({ ...prev, faculty: e.target.value }))}
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
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
