import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { ForgotPasswordModal } from './ForgotPasswordModal'
import { ResetPasswordModal } from './ResetPasswordModal'
import { useAuth } from '../../context/AuthContext'
import { ThemeToggle } from '../common/ThemeToggle'
import { GraduationCap, Sparkles, Layers, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react'

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const { isRecoveryMode, setIsRecoveryMode } = useAuth()

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col justify-between transition-colors duration-300 font-sans">
      {/* Dark mode Huly aurora glow */}
      <div className="dark-aurora-bg" />
      <div className="huly-ray" />
      
      {/* Top Floating Glass Header */}
      <header className="px-6 py-4 border-b border-black/10 dark:border-white/10 theme-navbar sticky top-0 z-40 backdrop-blur-xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#0091ff] text-white dark:bg-gradient-to-r dark:from-[#ff5e3a] dark:to-[#ffa043] dark:shadow-[0_0_15px_rgba(255,94,58,0.5)] flex items-center justify-center shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-[#101828] dark:text-white">Attendo</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Direct Theme Toggle on Auth Screen */}
            <ThemeToggle />

            <div className="flex items-center p-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isLogin
                    ? 'bg-[#0091ff] text-white shadow-sm dark:bg-gradient-to-r dark:from-[#ff5e3a] dark:to-[#ffa043] dark:shadow-[0_0_15px_rgba(255,94,58,0.5)]'
                    : 'text-[#475467] hover:text-[#101828] dark:text-[#9aa1b2] dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  !isLogin
                    ? 'bg-[#0091ff] text-white shadow-sm dark:bg-gradient-to-r dark:from-[#ff5e3a] dark:to-[#ffa043] dark:shadow-[0_0_15px_rgba(255,94,58,0.5)]'
                    : 'text-[#475467] hover:text-[#101828] dark:text-[#9aa1b2] dark:hover:text-white'
                }`}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dual-Tone Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
        
        {/* Left Hero Column: Apple Intro Minimalist Vibe */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#16171f] border border-black/[0.06] dark:border-white/[0.08] text-xs font-medium text-[#515154] dark:text-[#9898a0] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Universal College Attendance &bull; All Branches & Years</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-[#1d1d1f] dark:text-white">
            Attendance tracking, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400">
              refined to perfection.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#6e6e73] dark:text-[#9898a0] max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
            Effortlessly scan your branch timetable with AI OCR, monitor 75% attendance criteria, and calculate bunk limits without clutter.
          </p>

          {/* Minimalist Dual-Tone Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 max-w-lg mx-auto lg:mx-0 text-left">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#121318] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                <h4 className="text-xs font-bold text-[#1d1d1f] dark:text-white">AI Timetable OCR</h4>
              </div>
              <p className="text-[11px] text-[#86868b] dark:text-[#868692] leading-normal">
                Upload any branch timetable photo to extract your daily classes automatically.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#121318] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h4 className="text-xs font-bold text-[#1d1d1f] dark:text-white">75% Criteria Guard</h4>
              </div>
              <p className="text-[11px] text-[#86868b] dark:text-[#868692] leading-normal">
                Live bunk margin calculator tells you exactly how many lectures you can safely miss.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#121318] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-1.5">
                <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h4 className="text-xs font-bold text-[#1d1d1f] dark:text-white">Sub-batch Segregation</h4>
              </div>
              <p className="text-[11px] text-[#86868b] dark:text-[#868692] leading-normal">
                Group P1 and P2 lab and tutorial slots stay completely isolated for your roll number.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#121318] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-1.5">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h4 className="text-xs font-bold text-[#1d1d1f] dark:text-white">Daily 1-Tap Log</h4>
              </div>
              <p className="text-[11px] text-[#86868b] dark:text-[#868692] leading-normal">
                Log Present, Absent, Cancelled, or College Holidays with single-tap precision.
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Column: Clean Apple-styled Squircle Card */}
        <div className="w-full lg:w-1/2 flex justify-center">
          {isLogin ? (
            <LoginForm
              onSwitchToSignup={() => setIsLogin(false)}
              onOpenForgotPassword={() => setShowForgotModal(true)}
            />
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-[#86868b] dark:text-[#686872]">
        <p>Attendo &bull; College & University Attendance Management</p>
      </footer>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />

      {/* Set New Password Modal (via Email Reset Link) */}
      <ResetPasswordModal
        isOpen={isRecoveryMode}
        onClose={() => setIsRecoveryMode(false)}
      />
    </div>
  )
}
