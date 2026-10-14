import React, { useState, useRef } from 'react'
import { 
  User, 
  School, 
  BookOpen, 
  Calendar, 
  Mail, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  UploadCloud, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Layers, 
  Clock, 
  FileText,
  CheckCircle2,
  RefreshCw
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getBranchSchedulePreset } from '../../services/branchScheduleService'

export function SignupForm({ onSwitchToLogin }) {
  // Step 1: Profile | Step 2: Timetable Configuration
  const [currentStep, setCurrentStep] = useState(1)

  // Empty initial state - all taken directly from user input
  const [formData, setFormData] = useState({
    fullName: '',
    collegeName: '',
    department: '',
    customDepartment: '',
    yearOfStudy: '',
    semester: '',
    section: '',
    labGroup: 'P1', // 'P1' | 'P2' | 'ALL'
    email: '',
    password: '',
    confirmPassword: ''
  })

  // Timetable setup state
  const [timetableMode, setTimetableMode] = useState('scan') // 'scan' | 'manual' | 'preset'
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(null)
  const [scanError, setScanError] = useState('')
  const [extractedSubjects, setExtractedSubjects] = useState([])
  const [extractedSlots, setExtractedSlots] = useState([])
  const [hasScanned, setHasScanned] = useState(false)

  // Quick slot addition state
  const [newSlotDay, setNewSlotDay] = useState('Monday')
  const [newSlotStart, setNewSlotStart] = useState('09:10')
  const [newSlotEnd, setNewSlotEnd] = useState('10:00')
  const [newSlotCode, setNewSlotCode] = useState('')
  const [newSlotName, setNewSlotName] = useState('')
  const [newSlotRoom, setNewSlotRoom] = useState('')
  const [newSlotType, setNewSlotType] = useState('Lecture')
  const [newSlotGroup, setNewSlotGroup] = useState('ALL')

  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const fileInputRef = useRef(null)
  const { signup, showToast } = useAuth()

  const departments = [
    'Computer Science & Engineering (CSE)',
    'Information Technology (IT)',
    'Electronics & Communication Engineering (ECE)',
    'Electronics & Communication Engineering (IoT)',
    'Electrical Engineering (EE)',
    'Mechanical Engineering (ME)',
    'Civil Engineering (CE)',
    'Chemical Engineering (CHE)',
    'Bachelor of Business Administration (BBA)',
    'Bachelor of Pharmacy (B.Pharm)',
    'Artificial Intelligence & Data Science (AI/DS)',
    'Biotechnology Engineering',
    'Other Branch'
  ]

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate']
  const semesters = [
    'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4',
    'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'
  ]
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const activeDepartmentName = formData.department === 'Other Branch'
    ? (formData.customDepartment || 'Custom Branch')
    : (formData.department || 'Your Branch')

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setFormError('')
  }

  // Validate step 1 before proceeding to timetable setup
  const handleProceedToTimetable = (e) => {
    e.preventDefault()
    setFormError('')

    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name.')
      return
    }
    if (!formData.collegeName.trim()) {
      setFormError('Please enter your college or university name.')
      return
    }
    const resolvedDept = formData.department === 'Other Branch' ? formData.customDepartment.trim() : formData.department.trim()
    if (!resolvedDept) {
      setFormError('Please select or enter your branch / department.')
      return
    }
    if (!formData.yearOfStudy) {
      setFormError('Please select your year of study.')
      return
    }
    if (!formData.semester) {
      setFormError('Please select your semester.')
      return
    }
    if (!formData.section.trim()) {
      setFormError('Please enter your section (e.g. SEC-A, SEC-B, Group 1).')
      return
    }
    if (!formData.email.trim()) {
      setFormError('Please enter your email address.')
      return
    }
    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters.')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match.')
      return
    }

    setTimetableMode('scan')
    setCurrentStep(2)
  }

  // Handle image upload and trigger OCR
  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
      setScanError('Please select a valid image file (PNG, JPG, or WEBP).')
      return
    }

    setScanError('')
    setUploadedImage(file)
    setImagePreview(URL.createObjectURL(file))
    await runOcrScan(file)
  }

  // 1-Click Auto-Configure for selected branch
  const handleAutoConfigureBranch = () => {
    const preset = getBranchSchedulePreset(
      formData.department, 
      formData.section, 
      formData.labGroup, 
      formData.yearOfStudy, 
      formData.semester
    )
    setExtractedSubjects(preset.subjects || [])
    setExtractedSlots(preset.slots || [])
    setHasScanned(true)
    setScanError('')
    if (preset.subjects && preset.subjects.length > 0) {
      showToast(`Configured ${preset.subjects.length} courses & ${preset.slots.length} schedule slots for ${activeDepartmentName}!`, 'success')
    } else {
      showToast(`Clean schedule initialized for ${formData.yearOfStudy}. Upload timetable or add classes manually.`, 'info')
    }
  }

  const runOcrScan = async (file) => {
    setIsScanning(true)
    setScanProgress({ status: 'starting', progress: 0.15, message: 'Analyzing timetable image...' })
    setScanError('')

    try {
      const recognizedText = await runOcrOnImage(file, (p) => {
        setScanProgress(p)
      }, formData.section)

      const parsed = parseTimetableFromText(recognizedText, formData.section)
      setHasScanned(true)

      if (parsed.slots && parsed.slots.length > 0) {
        setExtractedSubjects(parsed.subjects)
        setExtractedSlots(parsed.slots)
        showToast(`AI Scanner recognized ${parsed.subjects.length} courses & ${parsed.slots.length} schedule slots!`, 'success')
      } else {
        const preset = getBranchSchedulePreset(
          formData.department, 
          formData.section, 
          formData.labGroup, 
          formData.yearOfStudy, 
          formData.semester
        )
        setExtractedSubjects(preset.subjects || [])
        setExtractedSlots(preset.slots || [])
        if (preset.subjects && preset.subjects.length > 0) {
          showToast(`Loaded ${preset.subjects.length} courses & ${preset.slots.length} slots for ${activeDepartmentName}!`, 'success')
        }
      }
    } catch (err) {
      console.warn('OCR processing fallback:', err)
      const preset = getBranchSchedulePreset(
        formData.department, 
        formData.section, 
        formData.labGroup, 
        formData.yearOfStudy, 
        formData.semester
      )
      setExtractedSubjects(preset.subjects || [])
      setExtractedSlots(preset.slots || [])
      setHasScanned(true)
      if (preset.subjects && preset.subjects.length > 0) {
        showToast(`Loaded ${preset.subjects.length} courses & ${preset.slots.length} slots for ${activeDepartmentName}!`, 'success')
      }
    } finally {
      setIsScanning(false)
    }
  }

  // Quick slot addition to extracted list
  const handleAddSlot = () => {
    if (!newSlotName.trim() && !newSlotCode.trim()) {
      showToast('Please enter a course code or name.', 'error')
      return
    }

    const code = (newSlotCode.trim() || newSlotName.slice(0, 6)).toUpperCase()
    const name = newSlotName.trim() || `${code} Course`

    // Check if subject exists in extractedSubjects
    let existingSub = extractedSubjects.find(s => s.code === code)
    if (!existingSub) {
      existingSub = {
        id: `sub-${code.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        code: code,
        name: name,
        faculty: 'Faculty',
        min_threshold: 75
      }
      setExtractedSubjects(prev => [...prev, existingSub])
    }

    const newSlot = {
      id: `slot-${Date.now()}`,
      subject_id: existingSub.id,
      subject_code: code,
      subject_name: name,
      day: newSlotDay,
      start_time: newSlotStart,
      end_time: newSlotEnd,
      room: newSlotRoom.trim() || 'Classroom',
      type: newSlotType,
      group: newSlotGroup,
      notes: `${newSlotType} (${newSlotGroup})`
    }

    setExtractedSlots(prev => [...prev, newSlot])
    setNewSlotCode('')
    setNewSlotName('')
    setNewSlotRoom('')
    showToast(`Added ${code} to ${newSlotDay} schedule!`, 'success')
  }

  const handleRemoveSlot = (id) => {
    setExtractedSlots(prev => prev.filter(s => s.id !== id))
  }

  // Final Registration Submission
  const handleFinalSubmit = async () => {
    setSubmitting(true)
    setFormError('')

    let customSubjects = []
    let customTimetable = []

    if (timetableMode === 'preset') {
      const preset = getBranchSchedulePreset(
        formData.department, 
        formData.section, 
        formData.labGroup, 
        formData.yearOfStudy, 
        formData.semester
      )
      customSubjects = preset.subjects || []
      customTimetable = preset.slots || []
    } else {
      customSubjects = extractedSubjects
      customTimetable = extractedSlots
    }

    const resolvedDept = formData.department === 'Other Branch'
      ? (formData.customDepartment || 'Engineering')
      : (formData.department || 'Engineering')

    try {
      await signup({
        ...formData,
        department: resolvedDept,
        customSubjects,
        customTimetable
      })
      showToast(`Welcome ${formData.fullName}! Your portal is ready.`, 'success')
    } catch (err) {
      setFormError(err.message || 'Registration failed.')
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-2xl transition-colors">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center border ${
              currentStep === 1 
                ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] dark:bg-white dark:text-black dark:border-white shadow-xs' 
                : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
            }`}>
              {currentStep > 1 ? '✓' : '1'}
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] dark:text-[#9898a0] font-bold">
                Step {currentStep} of 2
              </span>
              <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
                {currentStep === 1 ? 'Student Profile & Branch Details' : 'Timetable & Schedule Setup'}
              </h2>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#515154] dark:text-slate-300 border border-black/[0.08] dark:border-white/[0.08] font-semibold">
            {formData.department ? `${activeDepartmentName.slice(0, 18)} • ${formData.section || 'Sec'}` : 'New Student Registration'}
          </span>
        </div>

        {formError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* ================= STEP 1: STUDENT DETAILS ================= */}
        {currentStep === 1 && (
          <form onSubmit={handleProceedToTimetable} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] dark:text-slate-300 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-slate-500" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#1d1d1f] dark:focus:border-white focus:bg-white dark:focus:bg-[#121318] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1d1d1f] dark:text-white placeholder-[#86868b] dark:placeholder-slate-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* College Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] dark:text-slate-300 mb-1">
                  College / University <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <School className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-slate-500" />
                  <input
                    type="text"
                    name="collegeName"
                    required
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="e.g. Your College / University Name"
                    className="w-full bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#1d1d1f] dark:focus:border-white focus:bg-white dark:focus:bg-[#121318] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1d1d1f] dark:text-white placeholder-[#86868b] dark:placeholder-slate-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] dark:text-slate-300 mb-1">
                Branch / Department <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-slate-500 pointer-events-none" />
                <select
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#1d1d1f] dark:focus:border-white focus:bg-white dark:focus:bg-[#121318] rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-slate-400">
                    -- Select Your Branch / Department --
                  </option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className="bg-white dark:bg-[#121318] text-[#1d1d1f] dark:text-white">
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom branch input if "Other Branch" is chosen */}
              {formData.department === 'Other Branch' && (
                <div className="mt-2">
                  <input
                    type="text"
                    name="customDepartment"
                    required
                    value={formData.customDepartment}
                    onChange={handleChange}
                    placeholder="Enter your specific branch (e.g. Aerospace, Metallurgy, MCA...)"
                    className="w-full bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.1] dark:border-white/[0.1] rounded-xl px-3 py-2 text-xs text-[#1d1d1f] dark:text-white placeholder-[#86868b] focus:outline-none transition-all"
                  />
                </div>
              )}
            </div>

            {/* Year & Semester & Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] dark:text-slate-300 mb-1">
                  Year of Study <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-slate-500 pointer-events-none" />
                  <select
                    name="yearOfStudy"
                    required
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className="w-full bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#1d1d1f] dark:focus:border-white focus:bg-white dark:focus:bg-[#121318] rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-slate-400">
                      -- Select Year --
                    </option>
                    {years.map((yr) => (
                      <option key={yr} value={yr} className="bg-white dark:bg-[#121318] text-[#1d1d1f] dark:text-white">
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] dark:text-slate-300 mb-1">
                  Semester <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-slate-500 pointer-events-none" />
                  <select
                    name="semester"
                    required
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#1d1d1f] dark:focus:border-white focus:bg-white dark:focus:bg-[#121318] rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#1d1d1f] dark:text-white focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-slate-400">
                      -- Select Semester --
                    </option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem} className="bg-white dark:bg-[#121318] text-[#1d1d1f] dark:text-white">
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] dark:text-slate-300 mb-1">
                  Section <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="section"
                  required
                  value={formData.section}
                  onChange={handleChange}
                  placeholder="e.g. SEC-A, SEC-B, Group 1"
                  className="w-full bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#1d1d1f] dark:focus:border-white focus:bg-white dark:focus:bg-[#121318] rounded-xl px-3 py-2.5 text-xs text-[#1d1d1f] dark:text-white uppercase font-mono font-bold focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Lab & Practical Sub-batch Selection - Universal for any branch */}
            <div className="p-3.5 rounded-2xl bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#1d1d1f] dark:text-slate-200">
                  Select Your Lab / Practical Sub-Batch:
                </label>
                <span className="text-[10px] font-mono text-[#1d1d1f] dark:text-sky-300 font-bold bg-white dark:bg-sky-950/80 border border-black/[0.08] dark:border-sky-500/30 px-2 py-0.5 rounded-full shadow-xs">
                  Selected: {formData.labGroup === 'ALL' ? 'Single Batch' : `Group ${formData.labGroup}`}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, labGroup: 'P1' }))}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    formData.labGroup === 'P1'
                      ? 'bg-white dark:bg-[#1c1d25] border-black/20 dark:border-white/30 text-[#1d1d1f] dark:text-white shadow-xs'
                      : 'bg-black/[0.02] dark:bg-[#121318] border-black/[0.06] dark:border-white/[0.08] text-[#86868b] dark:text-slate-400 hover:border-black/20 dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1d1d1f] dark:text-sky-300">Group P1</span>
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${formData.labGroup === 'P1' ? 'border-[#1d1d1f] bg-[#1d1d1f] dark:border-white dark:bg-white' : 'border-black/30 dark:border-slate-600'}`}>
                      {formData.labGroup === 'P1' && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black" />}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#515154] dark:text-slate-400 leading-tight">
                    Batch 1 (1st Lab / Tutorial split)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, labGroup: 'P2' }))}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    formData.labGroup === 'P2'
                      ? 'bg-white dark:bg-[#1c1d25] border-black/20 dark:border-white/30 text-[#1d1d1f] dark:text-white shadow-xs'
                      : 'bg-black/[0.02] dark:bg-[#121318] border-black/[0.06] dark:border-white/[0.08] text-[#86868b] dark:text-slate-400 hover:border-black/20 dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1d1d1f] dark:text-sky-300">Group P2</span>
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${formData.labGroup === 'P2' ? 'border-[#1d1d1f] bg-[#1d1d1f] dark:border-white dark:bg-white' : 'border-black/30 dark:border-slate-600'}`}>
                      {formData.labGroup === 'P2' && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black" />}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#515154] dark:text-slate-400 leading-tight">
                    Batch 2 (2nd Lab / Tutorial split)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, labGroup: 'ALL' }))}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    formData.labGroup === 'ALL'
                      ? 'bg-white dark:bg-[#1c1d25] border-black/20 dark:border-white/30 text-[#1d1d1f] dark:text-white shadow-xs'
                      : 'bg-black/[0.02] dark:bg-[#121318] border-black/[0.06] dark:border-white/[0.08] text-[#86868b] dark:text-slate-400 hover:border-black/20 dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1d1d1f] dark:text-sky-300">Full Class</span>
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${formData.labGroup === 'ALL' ? 'border-[#1d1d1f] bg-[#1d1d1f] dark:border-white dark:bg-white' : 'border-black/30 dark:border-slate-600'}`}>
                      {formData.labGroup === 'ALL' && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black" />}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#515154] dark:text-slate-400 leading-tight">
                    Single batch (No lab division)
                  </p>
                </button>
              </div>
            </div>

            {/* Email & Passwords */}
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] dark:text-slate-300 mb-1">
                College / Personal Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-slate-500" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@campus.edu"
                  className="w-full bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#1d1d1f] dark:focus:border-white focus:bg-white dark:focus:bg-[#121318] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1d1d1f] dark:text-white placeholder-[#86868b] dark:placeholder-slate-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] dark:text-slate-300 mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-slate-500" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 6 chars"
                    className="w-full bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#1d1d1f] dark:focus:border-white focus:bg-white dark:focus:bg-[#121318] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1d1d1f] dark:text-white placeholder-[#86868b] dark:placeholder-slate-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] dark:text-slate-300 mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-slate-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    className="w-full bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#1d1d1f] dark:focus:border-white focus:bg-white dark:focus:bg-[#121318] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1d1d1f] dark:text-white placeholder-[#86868b] dark:placeholder-slate-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mac-btn-primary w-full mt-2 py-3 px-5 flex items-center justify-center gap-2 text-xs font-semibold tracking-wide cursor-pointer"
            >
              <span>Next: Set Up {activeDepartmentName} Timetable</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* ================= STEP 2: TIMETABLE SETUP ================= */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Context Subtitle */}
            <div className="p-3.5 rounded-2xl bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between text-xs">
              <span className="text-[#515154] dark:text-slate-300">
                Setting schedule for: <strong className="text-[#1d1d1f] dark:text-white font-semibold">{activeDepartmentName}</strong> ({formData.section}, {formData.semester})
              </span>
              <span className="text-[10px] font-mono text-[#1d1d1f] dark:text-sky-300 font-bold bg-white dark:bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-black/[0.08] dark:border-sky-500/30 shadow-xs">
                {formData.labGroup === 'ALL' ? 'Full Class' : `Group ${formData.labGroup}`}
              </span>
            </div>

            {/* Mode Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08]">
              <button
                type="button"
                onClick={() => setTimetableMode('scan')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                  timetableMode === 'scan'
                    ? 'bg-white dark:bg-[#1c1d25] text-[#1d1d1f] dark:text-white shadow-xs border border-black/[0.06] dark:border-white/[0.08]'
                    : 'text-[#86868b] dark:text-slate-400 hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>📸 Upload & Scan Timetable Image</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTimetableMode('manual')
                }}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                  timetableMode === 'manual'
                    ? 'bg-white dark:bg-[#1c1d25] text-[#1d1d1f] dark:text-white shadow-xs border border-black/[0.06] dark:border-white/[0.08]'
                    : 'text-[#86868b] dark:text-slate-400 hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>📝 Enter Schedule Manually</span>
              </button>
            </div>

            {/* TAB 1: UPLOAD & SCAN IMAGE */}
            {timetableMode === 'scan' && (
              <div className="space-y-4">
                {/* Upload Card */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-7 rounded-2xl border-2 border-dashed border-black/[0.12] dark:border-white/[0.12] hover:border-black/30 dark:hover:border-white/30 bg-[#f5f5f7] dark:bg-[#0c0d12] cursor-pointer text-center transition-all group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-white dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-sky-300 flex items-center justify-center group-hover:scale-105 transition-all shadow-xs">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1d1d1f] dark:text-white mb-1">
                    {uploadedImage ? uploadedImage.name : `Click to Upload ${activeDepartmentName} Timetable`}
                  </h4>
                  <p className="text-xs text-[#86868b] dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Upload a photo, screenshot, or PDF export of your timetable. AI OCR reads your courses, timings, and classrooms automatically.
                  </p>

                  <div className="flex items-center justify-center pt-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAutoConfigureBranch()
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0091ff] hover:bg-[#007ce0] dark:bg-gradient-to-r dark:from-[#ff5e3a] dark:to-[#ffa043] text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>⚡ 1-Click Auto-Configure All {activeDepartmentName} Slots</span>
                    </button>
                  </div>
                </div>

                {/* Success Banner when slots are configured */}
                {extractedSlots.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Schedule Configured: {extractedSubjects.length} courses & {extractedSlots.length} weekly timetable slots ready.</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 font-bold shrink-0">
                      {extractedSlots.length} Slots
                    </span>
                  </div>
                )}

                {/* Progress bar during OCR */}
                {isScanning && scanProgress && (
                  <div className="p-4 rounded-2xl bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-sky-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-[#1d1d1f] dark:text-sky-300 flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        {scanProgress.message}
                      </span>
                      <span className="text-[#1d1d1f] dark:text-sky-400 font-mono">
                        {Math.round((scanProgress.progress || 0.1) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-black/[0.06] dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-[#1d1d1f] dark:bg-sky-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.round((scanProgress.progress || 0.1) * 100))}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Manual Add / Adjustment Form */}
                <div className="p-4 rounded-2xl bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#1d1d1f] dark:text-slate-200">
                      Add / Edit Class Slot:
                    </span>
                    <span className="text-[10px] text-[#86868b] dark:text-slate-400 font-mono">
                      (Add subjects from your timetable)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <label className="text-[10px] font-semibold text-[#86868b] dark:text-slate-400">Day</label>
                      <select
                        value={newSlotDay}
                        onChange={(e) => setNewSlotDay(e.target.value)}
                        className="w-full bg-white dark:bg-[#14151c] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-[#1d1d1f] dark:text-white"
                      >
                        {DAYS.map(d => <option key={d} value={d} className="bg-white dark:bg-[#121318]">{d}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-[#86868b] dark:text-slate-400">Time (Start - End)</label>
                      <div className="flex items-center gap-1">
                        <input
                          type="time"
                          value={newSlotStart}
                          onChange={(e) => setNewSlotStart(e.target.value)}
                          className="w-1/2 bg-white dark:bg-[#14151c] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-1.5 py-1.5 text-[11px] text-[#1d1d1f] dark:text-white"
                        />
                        <input
                          type="time"
                          value={newSlotEnd}
                          onChange={(e) => setNewSlotEnd(e.target.value)}
                          className="w-1/2 bg-white dark:bg-[#14151c] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-1.5 py-1.5 text-[11px] text-[#1d1d1f] dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-[#86868b] dark:text-slate-400">Course Code</label>
                      <input
                        type="text"
                        placeholder="e.g. CS-201"
                        value={newSlotCode}
                        onChange={(e) => setNewSlotCode(e.target.value)}
                        className="w-full bg-white dark:bg-[#14151c] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-[#1d1d1f] dark:text-white font-mono uppercase"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-[#86868b] dark:text-slate-400">Batch / Group</label>
                      <select
                        value={newSlotGroup}
                        onChange={(e) => setNewSlotGroup(e.target.value)}
                        className="w-full bg-white dark:bg-[#14151c] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-[#1d1d1f] dark:text-white font-semibold"
                      >
                        <option value="ALL" className="bg-white dark:bg-[#121318]">ALL (Common Class)</option>
                        <option value="P1" className="bg-white dark:bg-[#121318]">P1 (Group 1 Lab)</option>
                        <option value="P2" className="bg-white dark:bg-[#121318]">P2 (Group 2 Lab)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        placeholder="Course Name (e.g. Operating Systems, Chemistry Lab...)"
                        value={newSlotName}
                        onChange={(e) => setNewSlotName(e.target.value)}
                        className="w-full bg-white dark:bg-[#14151c] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-[#1d1d1f] dark:text-white"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Room / Venue (e.g. Lab 2, Hall 1)"
                        value={newSlotRoom}
                        onChange={(e) => setNewSlotRoom(e.target.value)}
                        className="w-full bg-white dark:bg-[#14151c] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-[#1d1d1f] dark:text-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddSlot}
                      className="py-1.5 px-3 rounded-lg bg-[#1d1d1f] hover:bg-[#2d2d30] text-white dark:bg-white dark:hover:bg-slate-200 dark:text-black font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Slot</span>
                    </button>
                  </div>
                </div>

                {/* Review Extracted / Configured Slots List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-[#1d1d1f] dark:text-slate-300 flex items-center gap-1.5">
                      <span>Configured Slots ({extractedSlots.length}):</span>
                      <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        Clean 0% Initial State
                      </span>
                    </h5>
                    {extractedSlots.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setExtractedSlots([])
                          setExtractedSubjects([])
                        }}
                        className="text-[11px] text-rose-500 hover:text-rose-600 font-semibold"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {extractedSlots.length === 0 ? (
                    <div className="p-4 rounded-xl bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] text-center text-xs text-[#86868b] dark:text-slate-400">
                      No slots added yet. Upload your timetable image above or add classes using the form.
                    </div>
                  ) : (
                    <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                      {extractedSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="p-2.5 rounded-xl bg-white dark:bg-[#14151c] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs shadow-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-[11px] text-[#1d1d1f] dark:text-sky-300 bg-black/[0.04] dark:bg-sky-950/80 px-2 py-0.5 rounded border border-black/[0.06] dark:border-sky-500/30">
                              {slot.day.slice(0, 3)} {slot.start_time}-{slot.end_time}
                            </span>
                            <span className="font-bold text-[#1d1d1f] dark:text-white">
                              {slot.subject_code || slot.subject_name}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-slate-800 text-[#515154] dark:text-slate-300 font-mono">
                              {slot.group || 'ALL'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#86868b] dark:text-slate-400">{slot.room}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSlot(slot.id)}
                              className="text-slate-400 hover:text-rose-500 p-1 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: MANUAL ENTRY / CONFIGURE LATER */}
            {timetableMode === 'manual' && (
              <div className="p-6 rounded-2xl bg-[#f5f5f7] dark:bg-[#0c0d12] border border-black/[0.08] dark:border-white/[0.08] space-y-4 text-center">
                <div className="space-y-1.5">
                  <div className="w-10 h-10 mx-auto rounded-2xl bg-white dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] text-[#1d1d1f] dark:text-sky-300 flex items-center justify-center shadow-xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1d1d1f] dark:text-white">Build Schedule Later</h4>
                  <p className="text-xs text-[#86868b] dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    You can complete registration right now. Your dashboard will open with 0 classes, allowing you to add courses and timetable slots one-by-one whenever you want.
                  </p>
                </div>

                {/* Optional sample loader if user explicitly clicks */}
                <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] text-center">
                  <button
                    type="button"
                    onClick={() => {
                      const branchSchedule = getBranchSchedulePreset(
                        formData.department,
                        formData.section,
                        formData.labGroup,
                        formData.yearOfStudy,
                        formData.semester
                      )
                      setExtractedSubjects(branchSchedule.subjects)
                      setExtractedSlots(branchSchedule.slots || branchSchedule.timetable || [])
                      setTimetableMode('scan')
                      showToast(`Loaded sample template for ${formData.department || 'your branch'} (${formData.section || 'SEC-A'})!`, 'info')
                    }}
                    className="text-[11px] text-[#86868b] hover:text-[#1d1d1f] dark:text-slate-500 dark:hover:text-slate-300 font-medium transition cursor-pointer"
                  >
                    Want to see a demo template? Click to load sample slots &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="py-3 px-4 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#16171f] hover:bg-black/[0.04] dark:hover:bg-[#20222b] text-[#1d1d1f] dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={submitting}
                onClick={handleFinalSubmit}
                className="mac-btn-primary flex-1 py-3 px-5 flex items-center justify-center gap-2 text-xs font-semibold tracking-wide cursor-pointer"
              >
                {submitting ? 'Creating Student Account...' : 'Complete Registration & Open Dashboard'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Back to Login Footer */}
        <div className="mt-5 pt-4 border-t border-black/[0.08] dark:border-white/[0.08] text-center">
          <p className="text-xs text-[#86868b] dark:text-slate-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#1d1d1f] dark:text-white font-bold hover:underline transition ml-1 cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
