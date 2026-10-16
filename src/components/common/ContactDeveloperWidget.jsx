import React, { useState } from 'react'
import { Mail, Copy, Check, MessageSquare, X, Send, ShieldCheck } from 'lucide-react'

export function ContactDeveloperWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const devEmails = ['krishnajais945145@gmail.com', 'rummerblaze07@gmail.com']

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2200)
  }

  const handleMailto = (subject = 'Attendo Inquiry / Feedback') => {
    window.location.href = `mailto:${devEmails.join(',')}?subject=${encodeURIComponent(subject)}`
  }

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-white/95 dark:bg-[#121318]/95 border border-black/[0.08] dark:border-white/[0.1] text-[#1d1d1f] dark:text-[#f5f5f7] shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-5 sm:p-6 backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-250">
          {/* Card Header */}
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0091ff]/15 to-[#0091ff]/5 dark:from-[#ff5e3a]/20 dark:to-[#ffa043]/10 border border-[#0091ff]/20 dark:border-[#ff5e3a]/30 flex items-center justify-center text-[#0091ff] dark:text-[#ffa043] shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1d1d1f] dark:text-white tracking-tight flex items-center gap-2">
                  System Administrators
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h4>
                <p className="text-[11px] font-medium text-[#86868b] dark:text-slate-400">
                  Lead Developers &bull; Attendo Support
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-[#86868b] hover:text-[#1d1d1f] dark:text-slate-400 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Card Content */}
          <div className="py-3.5 space-y-3">
            <p className="text-xs text-[#515154] dark:text-slate-300 leading-relaxed">
              Have feedback, bug reports, or need custom branch features? Connect directly with the developers:
            </p>

            {/* Email Box */}
            <div className="p-3 rounded-2xl bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868b] dark:text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0091ff] dark:text-[#ffa043]" />
                  Administrator Emails
                </span>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>

              <div className="space-y-1.5 pt-0.5">
                {devEmails.map((email) => (
                  <div key={email} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white dark:bg-[#1a1b22] border border-black/[0.05] dark:border-white/[0.06]">
                    <span className="text-xs font-mono font-medium text-[#1d1d1f] dark:text-sky-300 truncate" title={email}>
                      {email}
                    </span>

                    <button
                      onClick={() => handleCopy(email)}
                      className="px-2.5 py-1 rounded-lg bg-[#f5f5f7] dark:bg-[#252733] hover:bg-black/[0.06] dark:hover:bg-white/[0.1] text-[#1d1d1f] dark:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition border border-black/[0.06] dark:border-white/[0.08] shrink-0 cursor-pointer shadow-2xs"
                      title={`Copy ${email} to clipboard`}
                    >
                      {copiedEmail === email ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#86868b] dark:text-slate-300" />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleMailto('Attendo Attendance Inquiry')}
                className="mac-btn-primary w-full py-2.5 px-3 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Email Team</span>
              </button>

              <button
                onClick={() => handleMailto('Feature Request / Bug Report - Attendo')}
                className="w-full py-2.5 px-3 rounded-2xl bg-white dark:bg-[#16171f] hover:bg-black/[0.04] dark:hover:bg-[#20222b] text-[#1d1d1f] dark:text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition border border-black/[0.08] dark:border-white/[0.08] cursor-pointer shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#0091ff] dark:text-[#ffa043]" />
                <span>Report Issue</span>
              </button>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-2.5 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-[11px] text-[#86868b] dark:text-slate-400">
            <span>Direct Admin Dispatch</span>
            <span className="font-mono">&bull; Attendo v1.0</span>
          </div>
        </div>
      )}

      {/* Floating Trigger: Circular Administrator Icon with Rolling Circle Animation */}
      <div className="relative flex items-center justify-end group">
        {/* Tooltip on hover (when closed) */}
        {!isOpen && (
          <div className="absolute right-14 px-3 py-1.5 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-black text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-lg transform translate-x-2 group-hover:translate-x-0">
            Administrator & Dev Contact
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#1d1d1f] dark:bg-white rotate-45" />
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] border transition-all duration-300 cursor-pointer group ${
            isOpen
              ? 'bg-[#1d1d1f] dark:bg-white text-white dark:text-black border-black/20 dark:border-white/40 scale-105'
              : 'bg-white/95 dark:bg-[#121318]/95 hover:bg-white dark:hover:bg-[#181a22] border-black/[0.1] dark:border-white/[0.15] text-[#1d1d1f] dark:text-white hover:scale-110 active:scale-95'
          }`}
          aria-label="Contact Developer & Administrator"
          title="Contact Developer & Administrator"
        >
          {/* Outer Rolling Orbit Ring (Rolling in circle animation when we want to access / hover) */}
          <div 
            className={`absolute -inset-[4px] rounded-full border-2 border-dashed border-[#0091ff] dark:border-[#ffa043] transition-all duration-300 pointer-events-none ${
              isHovered || isOpen ? 'opacity-100 animate-rolling-spin scale-105' : 'opacity-0 scale-95'
            }`}
          />

          {/* Pulse ring on background */}
          <div 
            className={`absolute -inset-[6px] rounded-full bg-[#0091ff]/20 dark:bg-[#ff5e3a]/25 blur-sm transition-opacity duration-300 pointer-events-none ${
              isHovered ? 'opacity-100 animate-pulse-ring' : 'opacity-0'
            }`}
          />

          {/* Center Administrator Icon with rolling 360deg transform when accessed / hovered */}
          <div className="relative z-10 flex items-center justify-center transition-transform duration-700 ease-out group-hover:rotate-[360deg] group-focus:rotate-[360deg] group-active:rotate-[360deg]">
            {isOpen ? (
              <X className="w-5 h-5 transition-transform duration-200" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-[#0091ff] dark:text-[#ffa043] transition-colors" />
            )}
          </div>

          {/* Online green indicator badge */}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#121318] z-20 shadow-xs" />
          )}
        </button>
      </div>
    </div>
  )
}

