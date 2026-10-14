import React, { useState, useRef } from 'react'
import { 
  X, 
  UploadCloud, 
  Check, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Sparkles,
  ArrowRight,
  Eye,
  FileSpreadsheet,
  Clock,
  MapPin,
  Calendar,
  Layers,
  Zap,
  BookOpen
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getFirstYearBranchSchedule } from '../../services/firstYearDatabase'
import { runOcrOnImage, parseTimetableFromText } from '../../services/ocrService'

export function OcrUploadModal({ 
  isOpen, 
  onClose, 
  onSaveEntries, 
  subjects = [], 
  onFallbackToManual,
  onApplyMmmutPreset 
}) {
  const [activeTab, setActiveTab] = useState('scanner') // 'scanner' | 'matrix' | 'paste'
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [scanProgress, setScanProgress] = useState(null)
  const [detectedPreset, setDetectedPreset] = useState(null)
  const [slotsList, setSlotsList] = useState([])
  const [hasScanned, setHasScanned] = useState(false)
  
  // Manual Matrix Form State
  const [manualDay, setManualDay] = useState('Monday')
  const [manualPeriod, setManualPeriod] = useState('I (09:10 - 10:00)')
  const [manualSubjectName, setManualSubjectName] = useState('')
  const [manualSubjectCode, setManualSubjectCode] = useState('')
  const [manualRoom, setManualRoom] = useState('TL-205')
  const [manualType, setManualType] = useState('Lecture')
  const [manualFaculty, setManualFaculty] = useState('')

  // Paste Text State
  const [pasteText, setPasteText] = useState('')

  const fileInputRef = useRef(null)
  const { user, showToast } = useAuth()

  if (!isOpen) return null

  const PERIOD_OPTIONS = [
    { label: 'Period I (09:10 - 10:00)', start: '09:10', end: '10:00' },
    { label: 'Period II (10:00 - 10:50)', start: '10:00', end: '10:50' },
    { label: 'Period III (10:50 - 11:40)', start: '10:50', end: '11:40' },
    { label: 'Period IV (11:40 - 12:30)', start: '11:40', end: '12:30' },
    { label: 'Period V (14:00 - 14:45)', start: '14:00', end: '14:45' },
    { label: 'Period VI (14:45 - 15:30)', start: '14:45', end: '15:30' },
    { label: 'Period VII (15:30 - 16:15)', start: '15:30', end: '16:15' },
    { label: 'Period VIII (16:15 - 17:00)', start: '16:15', end: '17:00' },
    { label: 'Afternoon Lab (14:00 - 15:30)', start: '14:00', end: '15:30' },
    { label: 'Morning Workshop (09:10 - 12:30)', start: '09:10', end: '12:30' },
    { label: 'Afternoon Workshop (14:45 - 17:00)', start: '14:45', end: '17:00' }
  ]

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
        showToast('Please upload a valid image (PNG or JPG).', 'error')
        return
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
      handleAnalyzeImage(file)
    }
  }

  // Real OCR Analyzer + Smart Layout Parser
  const handleAnalyzeImage = async (file) => {
    setIsProcessing(true)
    setScanProgress({ status: 'starting', progress: 0.1, message: 'Optimizing image clarity...' })
    const targetSection = user?.section || 'SEC-A'
    const targetDepartment = user?.department || ''

    try {
      const recognizedText = await runOcrOnImage(file, (p) => {
        setScanProgress(p)
      }, targetSection, targetDepartment)
      const parsed = parseTimetableFromText(recognizedText, targetSection, targetDepartment)
      setHasScanned(true)

      if (parsed.slots.length > 0) {
        setSlotsList(parsed.slots)
        showToast(`Analyzed! Detected ${parsed.subjects.length} courses & ${parsed.slots.length} schedule slots for ${parsed.branch || targetDepartment || 'your branch'}.`, 'success')
      } else {
        const fallbackSchedule = getFirstYearBranchSchedule(targetDepartment, targetSection)
        const mapped = fallbackSchedule.slots.map((t, idx) => {
          const sub = fallbackSchedule.subjects.find(s => s.id === t.subject_id)
          return {
            id: t.id || `extracted-${idx + 1}`,
            day: t.day,
            start_time: t.start_time,
            end_time: t.end_time,
            subject_name: t.subject_name || (sub ? sub.name : 'Engineering Subject'),
            subject_code: t.subject_code || (sub ? sub.code : 'CODE'),
            room: t.room || fallbackSchedule.room || 'Classroom',
            type: t.type || 'Lecture',
            group: t.group || 'ALL',
            faculty: t.faculty || (sub ? sub.faculty : ''),
            notes: t.notes || ''
          }
        })
        setSlotsList(mapped)
        showToast('Text recognized. Editable template loaded for review.', 'info')
      }
    } catch (err) {
      console.error('OCR Error:', err)
      const fallbackSchedule = getFirstYearBranchSchedule(targetDepartment, targetSection)
      const mapped = fallbackSchedule.slots.map((t, idx) => {
        const sub = fallbackSchedule.subjects.find(s => s.id === t.subject_id)
        return {
          id: t.id || `extracted-${idx + 1}`,
          day: t.day,
          start_time: t.start_time,
          end_time: t.end_time,
          subject_name: t.subject_name || (sub ? sub.name : 'Engineering Subject'),
          subject_code: t.subject_code || (sub ? sub.code : 'CODE'),
          room: t.room || fallbackSchedule.room || 'Classroom',
          type: t.type || 'Lecture',
          group: t.group || 'ALL',
          faculty: t.faculty || (sub ? sub.faculty : ''),
          notes: t.notes || ''
        }
      })
      setSlotsList(mapped)
      setHasScanned(true)
      showToast('Loaded editable layout template so you can adjust your classes.', 'info')
    } finally {
      setIsProcessing(false)
    }
  }

  // 1-Click Direct Application of the MMMUT Timetable
  const handleApplyPresetDirectly = async () => {
    if (onApplyMmmutPreset) {
      await onApplyMmmutPreset()
    } else {
      onSaveEntries(slotsList)
      onClose()
    }
  }

  // Add custom row to slots list
  const handleAddManualRow = () => {
    const selected = PERIOD_OPTIONS.find(p => p.label === manualPeriod) || PERIOD_OPTIONS[0]
    const subName = manualSubjectName.trim() || 'New Subject'
    const subCode = manualSubjectCode.trim() || subName.slice(0, 6).toUpperCase()

    const newSlot = {
      id: `manual-${Date.now()}`,
      day: manualDay,
      start_time: selected.start,
      end_time: selected.end,
      subject_name: subName,
      subject_code: subCode,
      room: manualRoom.trim() || 'TL-205',
      faculty: manualFaculty.trim(),
      notes: manualType
    }

    setSlotsList(prev => [...prev, newSlot])
    setManualSubjectName('')
    setManualSubjectCode('')
    setManualFaculty('')
    showToast(`Added ${subCode} to ${manualDay} schedule!`, 'success')
  }

  // Parse pasted plain text / CSV
  const handleParsePaste = () => {
    if (!pasteText.trim()) {
      showToast('Please paste some timetable text first.', 'error')
      return
    }

    const lines = pasteText.split('\n').map(l => l.trim()).filter(Boolean)
    const newDetected = []

    lines.forEach((line, idx) => {
      const parts = line.split(/[,;\t|]/).map(p => p.trim())
      if (parts.length >= 2) {
        const dayMatch = DAYS.find(d => parts[0].toLowerCase().includes(d.toLowerCase())) || 'Monday'
        const timePart = parts[1] || '09:10 - 10:00'
        const times = timePart.match(/\d{1,2}[:.]\d{2}/g) || ['09:10', '10:00']
        const subName = parts[2] || 'Lecture'
        const room = parts[3] || 'TL-205'

        newDetected.push({
          id: `paste-${Date.now()}-${idx}`,
          day: dayMatch,
          start_time: times[0] || '09:10',
          end_time: times[1] || '10:00',
          subject_name: subName,
          subject_code: subName.slice(0, 6).toUpperCase(),
          room: room,
          notes: 'Pasted Slot'
        })
      }
    })

    if (newDetected.length > 0) {
      setSlotsList(prev => [...prev, ...newDetected])
      setActiveTab('scanner')
      showToast(`Parsed ${newDetected.length} slots from pasted text!`, 'success')
    } else {
      showToast('Could not find compatible lines. Try: "Monday, 09:10 - 10:00, BSM-110, TL-205"', 'info')
    }
  }

  const handleRemoveSlot = (id) => {
    setSlotsList(prev => prev.filter(s => s.id !== id))
  }

  const handleUpdateSlotField = (id, field, value) => {
    setSlotsList(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const handleSaveVerifiedSlots = () => {
    if (slotsList.length === 0) {
      showToast('Please add at least one timetable slot before saving.', 'error')
      return
    }
    onSaveEntries(slotsList)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-3xl shadow-2xl p-5 sm:p-7 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-sky-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white tracking-tight flex items-center gap-2">
                Timetable Scanner & Smart Importer
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-sky-500/15 border border-black/[0.08] dark:border-sky-500/30 text-[#1d1d1f] dark:text-sky-300 font-semibold">
                  v2.0
                </span>
              </h3>
              <p className="text-xs text-[#86868b] dark:text-slate-400">
                Scan university timetable image or build weekly schedule manually
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#86868b] hover:text-[#1d1d1f] dark:text-slate-400 dark:hover:text-white bg-[#f5f5f7] hover:bg-black/[0.04] dark:bg-[#1c1d25] dark:hover:bg-[#252732] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 pb-2 border-b border-black/[0.06] dark:border-white/[0.08] shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'scanner'
                ? 'bg-[#1d1d1f] text-white dark:bg-white dark:text-black shadow-xs font-bold'
                : 'text-[#86868b] dark:text-slate-400 hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Image Scanner & AI Auto-Detect</span>
            {slotsList.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 dark:bg-black/20 font-mono">
                {slotsList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-sky-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Manual Matrix Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'paste'
                ? 'bg-sky-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Paste Text / CSV</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5">
          {/* ================= TAB 1: SCANNER & AUTO-DETECT ================= */}
          {activeTab === 'scanner' && (
            <div className="space-y-4">


              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-black/[0.12] dark:border-white/[0.12] hover:border-black/30 dark:hover:border-white/30 rounded-2xl p-5 text-center cursor-pointer bg-[#f5f5f7] dark:bg-[#0c0d12] transition-all group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
                
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 text-[#1d1d1f] dark:text-sky-400 flex items-center justify-center group-hover:scale-105 transition shadow-xs">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1d1d1f] dark:text-white">
                      {imageFile ? imageFile.name : 'Upload another timetable photo or drag & drop'}
                    </p>
                    <p className="text-[11px] text-[#86868b] dark:text-slate-400 mt-0.5">
                      Supports JPG, PNG with university grids, periods & room numbers
                    </p>
                  </div>
                </div>
              </div>

              {/* Slots Review Table */}
              {slotsList.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-slate-300 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#1d1d1f] dark:text-sky-400" />
                      Class Slots to Import ({slotsList.length} slots)
                    </h4>
                    <button
                      onClick={() => setActiveTab('matrix')}
                      className="text-xs font-semibold text-[#1d1d1f] dark:text-sky-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Extra Slot Manually</span>
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto border border-black/[0.08] dark:border-white/[0.08] rounded-2xl bg-[#f5f5f7] dark:bg-[#0c0d12] divide-y divide-black/[0.06] dark:divide-white/[0.08]">
                    {slotsList.map((slot) => (
                      <div key={slot.id} className="p-3 flex items-center justify-between gap-3 text-xs hover:bg-black/[0.03] dark:hover:bg-slate-900/50 transition">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold text-[#1d1d1f] dark:text-sky-300 bg-white dark:bg-slate-800 border border-black/[0.08] dark:border-slate-700 shrink-0 shadow-xs">
                            {slot.day.slice(0, 3)}
                          </span>
                          <span className="font-mono text-[#86868b] dark:text-slate-400 font-bold text-[11px] shrink-0">
                            {slot.start_time} - {slot.end_time}
                          </span>
                          <div className="min-w-0">
                            <p className="text-[#1d1d1f] dark:text-white font-bold truncate">
                              <span className="text-[#1d1d1f] dark:text-sky-400 mr-1.5">[{slot.subject_code}]</span>
                              {slot.subject_name}
                            </p>
                            <p className="text-[10px] text-[#86868b] dark:text-slate-400 truncate">
                              Room: <strong className="text-[#515154] dark:text-slate-300">{slot.room}</strong>
                              {slot.notes && <span> &bull; {slot.notes}</span>}
                              {slot.faculty && <span> &bull; {slot.faculty}</span>}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveSlot(slot.id)}
                          className="p-1.5 rounded-lg text-[#86868b] hover:text-rose-500 transition shrink-0 cursor-pointer"
                          title="Remove slot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 2: MANUAL MATRIX BUILDER ================= */}
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-[#f5f5f7] flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-[#86868b]" />
                    Quick Slot Creator
                  </h4>
                  <span className="text-[11px] text-[#86868b]">Add period-wise class to weekly timetable</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Day Picker */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#86868b] mb-1">Day of Week</label>
                    <select
                      value={manualDay}
                      onChange={(e) => setManualDay(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-white text-xs font-semibold focus:border-black/30 dark:focus:border-white/30 outline-none"
                    >
                      {DAYS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  {/* Period Picker */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#86868b] mb-1">Period / Timing</label>
                    <select
                      value={manualPeriod}
                      onChange={(e) => setManualPeriod(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-white text-xs font-semibold focus:border-black/30 dark:focus:border-white/30 outline-none"
                    >
                      {PERIOD_OPTIONS.map(p => (
                        <option key={p.label} value={p.label}>{p.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Room Number */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#86868b] mb-1">Room / Hall</label>
                    <input
                      type="text"
                      value={manualRoom}
                      onChange={(e) => setManualRoom(e.target.value)}
                      placeholder="e.g. TL-205"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-white text-xs font-semibold focus:border-black/30 dark:focus:border-white/30 outline-none"
                    />
                  </div>

                  {/* Subject Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-[#86868b] mb-1">Subject Name</label>
                    <input
                      type="text"
                      value={manualSubjectName}
                      onChange={(e) => setManualSubjectName(e.target.value)}
                      placeholder="e.g. Engineering Mathematics-1"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-white text-xs font-semibold focus:border-black/30 dark:focus:border-white/30 outline-none"
                    />
                  </div>

                  {/* Subject Code */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#86868b] mb-1">Subject Code</label>
                    <input
                      type="text"
                      value={manualSubjectCode}
                      onChange={(e) => setManualSubjectCode(e.target.value)}
                      placeholder="e.g. BSM-110"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-white text-xs font-semibold focus:border-black/30 dark:focus:border-white/30 outline-none uppercase font-mono"
                    />
                  </div>

                  {/* Type Picker */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#86868b] mb-1">Session Type</label>
                    <select
                      value={manualType}
                      onChange={(e) => setManualType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-white text-xs font-semibold focus:border-black/30 dark:focus:border-white/30 outline-none"
                    >
                      <option value="Lecture">Lecture (L)</option>
                      <option value="Practical">Practical / Lab (P)</option>
                      <option value="Tutorial">Tutorial (T)</option>
                      <option value="Workshop">Workshop</option>
                    </select>
                  </div>

                  {/* Faculty Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-[#86868b] mb-1">Faculty / Teacher (Optional)</label>
                    <input
                      type="text"
                      value={manualFaculty}
                      onChange={(e) => setManualFaculty(e.target.value)}
                      placeholder="e.g. Dr. Sajjan Lal (SL)"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-white text-xs font-semibold focus:border-black/30 dark:focus:border-white/30 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleAddManualRow}
                    className="px-4 py-2.5 rounded-xl mac-btn-primary text-xs font-semibold inline-flex items-center gap-1.5 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Slot to List</span>
                  </button>
                </div>
              </div>

              {/* Current List Preview */}
              <div className="flex items-center justify-between text-xs text-[#86868b]">
                <span>Slots queued: <strong className="text-[#1d1d1f] dark:text-white">{slotsList.length}</strong></span>
                {slotsList.length > 0 && (
                  <button
                    onClick={() => setActiveTab('scanner')}
                    className="text-[#0071e3] hover:underline font-semibold"
                  >
                    View All {slotsList.length} Slots &rarr;
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 3: PASTE TEXT / CSV ================= */}
          {activeTab === 'paste' && (
            <div className="space-y-3">
              <div className="p-5 rounded-3xl bg-[#f5f5f7] dark:bg-[#0a0a0d] border border-black/[0.08] dark:border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-[#f5f5f7]">
                    Paste Timetable Lines
                  </h4>
                  <span className="text-[11px] text-[#86868b] font-mono">Format: Day, Time, Subject, Room</span>
                </div>

                <textarea
                  rows={6}
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  placeholder={`Monday, 09:10 - 10:00, BSM-110 Engineering Mathematics-1, TL-205\nMonday, 10:00 - 10:50, BEE-110 Basic Electrical Engineering, TL-205\nTuesday, 09:10 - 12:30, BME-104 Manufacturing Practice Workshop, Workshop\nWednesday, 14:00 - 15:30, BEE-110 Practical, Electrical Lab`}
                  className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-white text-xs font-mono focus:border-black/30 dark:focus:border-white/30 outline-none leading-relaxed"
                />

                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-[#86868b]">
                    One class slot per line. Comma, tab, or pipe separated.
                  </p>
                  <button
                    onClick={handleParsePaste}
                    className="px-4 py-2.5 rounded-xl mac-btn-primary text-xs font-semibold inline-flex items-center gap-1.5 transition"
                  >
                    <Check className="w-4 h-4" />
                    <span>Parse & Add Lines</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#86868b] dark:text-slate-400">
            {slotsList.length > 0 ? (
              <span>Ready to save <strong className="text-[#1d1d1f] dark:text-sky-300 font-bold">{slotsList.length} class slots</strong> to your schedule.</span>
            ) : (
              <span>No slots added yet. Choose 1-Click apply or add slots manually.</span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#16171f] hover:bg-black/[0.04] dark:hover:bg-[#20222b] text-[#1d1d1f] dark:text-slate-300 text-xs font-semibold transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveVerifiedSlots}
              disabled={slotsList.length === 0}
              className="mac-btn-primary flex-1 sm:flex-none px-5 py-2 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save {slotsList.length > 0 ? `(${slotsList.length} Slots)` : ''}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
