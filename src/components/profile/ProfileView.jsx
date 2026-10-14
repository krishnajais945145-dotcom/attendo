import React, { useState } from 'react'
import { 
  User, 
  School, 
  BookOpen, 
  Calendar, 
  Copy, 
  Check, 
  Database,
  Save,
  RotateCcw
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { dataService } from '../../services/dataService'

export function ProfileView() {
  const { user, updateProfile, isCloudConnected, showToast } = useAuth()
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    college_name: user?.college_name || '',
    department: user?.department || '',
    year_of_study: user?.year_of_study || '',
    semester: user?.semester || '',
    section: user?.section || 'SEC-A',
    lab_group: user?.lab_group || 'P1'
  })
  const [saving, setSaving] = useState(false)

  const handleCopyId = () => {
    if (user?.student_id) {
      navigator.clipboard.writeText(user.student_id)
      setCopied(true)
      showToast('Student ID copied to clipboard', 'info')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile(formData)
    } catch (err) {
      // Toast handles error
    } finally {
      setSaving(false)
    }
  }

  const handleResetAttendance = async () => {
    if (window.confirm('Are you sure you want to reset all logged attendance records to zero? This will clear all present/absent logs.')) {
      try {
        await dataService.resetUserAttendance()
        showToast('All attendance records reset to zero!', 'success')
        setTimeout(() => window.location.reload(), 400)
      } catch (err) {
        showToast('Failed to reset attendance.', 'error')
      }
    }
  }

  return (
    <div className="space-y-4 max-w-4xl">
      {/* Profile Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl theme-card shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center text-lg font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{user?.full_name || 'Student'}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  Active
                </span>
              </div>
              <p className="text-xs text-[#86868b] mt-0.5">{user?.email}</p>
            </div>
          </div>

          {/* Student ID Card */}
          <div className="p-2.5 px-3 rounded-2xl bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] flex items-center gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#86868b] font-semibold block">
                Official Student ID
              </span>
              <span className="text-xs font-mono font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                {user?.student_id || 'STU-2026-4819'}
              </span>
            </div>
            <button
              onClick={handleCopyId}
              className="p-1.5 rounded-xl bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition"
              title="Copy Student ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="p-5 sm:p-6 rounded-3xl theme-card shadow-xs">
        <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-0.5">Academic & Personal Details</h3>
        <p className="text-xs text-[#86868b] mb-5">Update your enrollment profile information</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                College / University
              </label>
              <input
                type="text"
                value={formData.college_name}
                onChange={(e) => setFormData(prev => ({ ...prev, college_name: e.target.value }))}
                className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                Branch / Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                  Year of Study
                </label>
                <input
                  type="text"
                  value={formData.year_of_study}
                  onChange={(e) => setFormData(prev => ({ ...prev, year_of_study: e.target.value }))}
                  className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                  Semester
                </label>
                <input
                  type="text"
                  value={formData.semester}
                  onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value }))}
                  className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                  Batch Section
                </label>
                <input
                  type="text"
                  value={formData.section}
                  onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
                  placeholder="e.g. SEC-A"
                  className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#86868b] mb-1.5">
                  Lab & Workshop Sub-batch
                </label>
                <select
                  value={formData.lab_group}
                  onChange={(e) => setFormData(prev => ({ ...prev, lab_group: e.target.value }))}
                  className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition font-semibold"
                >
                  <option value="ALL">Single Batch (All sessions common)</option>
                  <option value="P1">Group P1 (Sub-batch 1)</option>
                  <option value="P2">Group P2 (Sub-batch 2)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-xl mac-btn-primary text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Reset Attendance Card */}
      <div className="p-5 sm:p-6 rounded-3xl theme-card shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">Reset Attendance to Zero (0)</h3>
            <p className="text-xs text-[#86868b] mt-0.5">
              Clear all logged attendance history to start with a clean slate (0% on all courses).
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetAttendance}
            className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-500 dark:text-rose-400 text-xs font-semibold transition flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Attendance</span>
          </button>
        </div>
      </div>

      {/* Supabase Connection & Backend Integration Guide */}
      <div className="p-5 sm:p-6 rounded-3xl theme-card shadow-xs">
        <div className="flex items-center gap-2.5 mb-2">
          <Database className="w-4 h-4 text-[#86868b]" />
          <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">Supabase Backend & Storage</h3>
        </div>
        <p className="text-xs text-[#86868b] mb-3">
          Status: <strong className="text-[#1d1d1f] dark:text-white">{isCloudConnected ? 'Connected to Supabase' : 'Running in Local Storage Preview Mode'}</strong>
        </p>

        <div className="p-4 rounded-2xl bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#86868b] space-y-2">
          <p>To connect live Supabase with Row Level Security:</p>
          <ol className="list-decimal pl-4 space-y-1 text-[11px]">
            <li>Run <code className="text-[#1d1d1f] dark:text-white font-mono">supabase_schema.sql</code> in the Supabase SQL editor.</li>
            <li>Configure <code className="text-[#1d1d1f] dark:text-white font-mono">.env</code> with your Project URL & Anon Key.</li>
            <li>Enjoy sync across multiple devices effortlessly.</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
