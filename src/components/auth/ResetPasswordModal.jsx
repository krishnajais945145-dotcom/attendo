import React, { useState } from 'react'
import { Lock, ArrowRight, CheckCircle2, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export function ResetPasswordModal({ isOpen, onClose }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const { updatePassword } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      await updatePassword(password)
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Failed to update password. Link may have expired.')
    } finally {
      setLoading(false)
    }
  }

  const handleFinish = () => {
    setSuccess(false)
    setPassword('')
    setConfirmPassword('')
    if (onClose) onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl shadow-2xl p-6 sm:p-8 text-[#1d1d1f] dark:text-[#f5f5f7]">
        {!success ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#0091ff]/10 dark:bg-gradient-to-r dark:from-[#ff5e3a]/20 dark:to-[#ffa043]/20 border border-[#0091ff]/20 flex items-center justify-center text-[#0091ff] dark:text-[#ffa043] mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-1">Create New Password</h3>
            <p className="text-xs text-[#86868b] mb-6">
              Enter your new secure password below to regain access to your account.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#86868b] mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#1d1d1f] dark:text-white placeholder-[#86868b] focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#86868b] mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] focus:border-black/30 dark:focus:border-white/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1d1d1f] dark:text-white placeholder-[#86868b] focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl mac-btn-primary disabled:opacity-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  {loading ? 'Saving...' : 'Update Password'}
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
            <h3 className="text-xl font-bold tracking-tight mb-2">Password Updated!</h3>
            <p className="text-xs text-[#86868b] mb-6 leading-relaxed">
              Your password has been successfully changed. You can now log in with your new credentials.
            </p>
            <button
              onClick={handleFinish}
              className="w-full py-2.5 rounded-xl mac-btn-primary text-xs font-semibold"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
