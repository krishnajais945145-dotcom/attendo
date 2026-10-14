import React, { useState } from 'react'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export function LoginForm({ onSwitchToSignup, onOpenForgotPassword }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) return
    setSubmitting(true)
    try {
      await login(email, password)
    } catch (err) {
      // Toast handles error message
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl p-7 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition-all duration-200">
        
        {/* Header */}
        <div className="mb-6">
          <span className="text-[11px] font-mono font-bold text-[#1d1d1f] dark:text-[#f5f5f7] bg-[#f5f5f7] dark:bg-white/[0.06] px-3 py-1 rounded-full border border-black/[0.06] dark:border-white/[0.08]">
            Student Portal
          </span>
          <h2 className="text-2xl font-extrabold text-[#1d1d1f] dark:text-white mt-3 tracking-tight">
            Sign In to Attendo
          </h2>
          <p className="text-xs text-[#86868b] dark:text-[#868692] mt-1 font-normal">
            Universal College & University Attendance Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#515154] dark:text-[#9898a0] mb-1.5">
              College Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-[#686872]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@campus.edu"
                className="w-full bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#1d1d1f] dark:focus:border-white/[0.3] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white placeholder-[#86868b] dark:placeholder-[#686872] focus:outline-none transition shadow-2xs"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#515154] dark:text-[#9898a0]">
                Password
              </label>
              <button
                type="button"
                onClick={onOpenForgotPassword}
                className="text-xs text-blue-600 dark:text-sky-400 font-semibold hover:underline transition"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-[#686872]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#1d1d1f] dark:focus:border-white/[0.3] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white placeholder-[#86868b] dark:placeholder-[#686872] focus:outline-none transition shadow-2xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="ignitio-huly-btn w-full mt-2 py-3 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>{submitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-black/[0.06] dark:border-white/[0.08] text-center">
          <p className="text-xs text-[#86868b] dark:text-[#868692]">
            Don't have a student account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-blue-600 dark:text-sky-400 hover:underline font-bold transition ml-1"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
