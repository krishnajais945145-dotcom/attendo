import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Generate unique student ID (e.g. STU-2026-8492)
export function generateStudentId() {
  const currentYear = new Date().getFullYear()
  const randomNum = Math.floor(1000 + Math.random() * 9000)
  return `STU-${currentYear}-${randomNum}`
}

// Format date to YYYY-MM-DD
export function formatDate(date = new Date()) {
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()
  return `${year}-${month}-${day}`
}

// Format friendly date (e.g., "Wednesday, Oct 14, 2026")
export function formatFriendlyDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Get day of week name (Monday, Tuesday, etc.)
export function getDayOfWeek(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long' })
}

// Calculate attendance percentage
export function calculatePercentage(attended, total) {
  if (!total || total === 0) return 0
  return Math.min(100, Math.round((attended / total) * 100))
}

// Dual-Tone status color helper (Apple minimal light & obsidian dark)
export function getAttendanceColor(percentage, conducted = null) {
  if (conducted === 0) {
    return {
      text: 'text-[#86868b] dark:text-[#9898a0]',
      bg: 'bg-black/[0.03] dark:bg-white/[0.04]',
      border: 'border-black/[0.08] dark:border-white/[0.08]',
      indicator: 'bg-[#d2d2d7] dark:bg-[#333338]',
      badge: 'bg-black/[0.04] text-[#515154] border-black/[0.08] dark:bg-white/[0.06] dark:text-[#a1a1aa] dark:border-white/[0.08]',
      label: 'Not Marked'
    }
  }
  if (percentage >= 75) {
    return {
      text: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      border: 'border-emerald-500/25 dark:border-emerald-500/30',
      indicator: 'bg-emerald-500',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-500/30',
      label: 'Healthy'
    }
  }
  if (percentage >= 65) {
    return {
      text: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500/10 dark:bg-amber-500/15',
      border: 'border-amber-500/25 dark:border-amber-500/30',
      indicator: 'bg-amber-500',
      badge: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-500/30',
      label: 'Warning'
    }
  }
  return {
    text: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-500/10 dark:bg-rose-500/15',
    border: 'border-rose-500/25 dark:border-rose-500/30',
    indicator: 'bg-rose-500',
    badge: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-500/30',
    label: 'Low'
  }
}

// Bunk / Margin calculation
export function calculateBunkMargin(attended, conducted, target = 75) {
  if (!conducted || conducted === 0) {
    return { canBunk: 0, needToAttend: 0, currentPct: 0, isSafe: true, notStarted: true }
  }

  const currentPct = (attended / conducted) * 100
  const targetFraction = target / 100

  if (currentPct >= target) {
    const canBunk = Math.floor((attended / targetFraction) - conducted)
    return {
      canBunk: Math.max(0, canBunk),
      needToAttend: 0,
      currentPct: Math.round(currentPct),
      isSafe: true,
      notStarted: false
    }
  } else {
    const needToAttend = Math.ceil((targetFraction * conducted - attended) / (1 - targetFraction))
    return {
      canBunk: 0,
      needToAttend: Math.max(1, needToAttend),
      currentPct: Math.round(currentPct),
      isSafe: false,
      notStarted: false
    }
  }
}
