import React, { useState } from 'react'
import { X, Mail, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await resetPassword(email)
      setSubmitted(true)
    } catch (err) {
      // Toast handles error display
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setSubmitted(false)
    setEmail('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl shadow-2xl p-6 sm:p-8 text-[#1d1d1f] dark:text-[#f5f5f7]">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white p-1.5 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-1">Reset your password</h3>
            <p className="text-xs text-[#86868b] mb-6">
              Enter your college email address and we'll send you a link to reset your account password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#86868b] mb-2">
                  College Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@campus.edu"
                    className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1d1d1f] dark:text-white placeholder-[#86868b] focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-xs font-medium text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl mac-btn-primary disabled:opacity-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  {loading ? 'Sending...' : 'Send Link'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-2">Check your email</h3>
            <p className="text-xs text-[#86868b] mb-6 leading-relaxed">
              We've dispatched password recovery instructions to <span className="text-[#1d1d1f] dark:text-white font-semibold">{email}</span>.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl mac-btn-primary text-xs font-semibold"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
