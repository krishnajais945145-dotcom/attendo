import React from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export function Toast({ toast, onDismiss }) {
  if (!toast) return null

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  }

  const borderColors = {
    success: 'border-emerald-500/30 bg-slate-900/95 text-slate-100',
    error: 'border-rose-500/30 bg-slate-900/95 text-slate-100',
    info: 'border-sky-500/30 bg-slate-900/95 text-slate-100'
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md ${borderColors[toast.type || 'info']}`}>
        {icons[toast.type || 'info']}
        <p className="text-sm font-medium pr-2 leading-relaxed">{toast.message}</p>
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors ml-auto"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
