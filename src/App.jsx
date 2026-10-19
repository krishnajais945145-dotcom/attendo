import React, { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import { dataService } from './services/dataService'
import { AuthPage } from './components/auth/AuthPage'
import { Navbar } from './components/layout/Navbar'
import { Sidebar } from './components/layout/Sidebar'
import { Toast } from './components/common/Toast'
import { ContactDeveloperWidget } from './components/common/ContactDeveloperWidget'
import { FloatingDock } from './components/common/FloatingDock'

// Dashboard views
import { AttendanceStats } from './components/dashboard/AttendanceStats'
import { LowAttendanceAlert } from './components/dashboard/LowAttendanceAlert'
import { SubjectCards } from './components/dashboard/SubjectCards'
import { TodaySchedule } from './components/dashboard/TodaySchedule'
import { BunkCalculatorModal } from './components/dashboard/BunkCalculatorModal'
import { AddSubjectModal } from './components/dashboard/AddSubjectModal'
import { QuickMarkModal } from './components/dashboard/QuickMarkModal'
import { AcademicCalendarModal } from './components/calendar/AcademicCalendarModal'

// Timetable views
import { TimetableGrid } from './components/timetable/TimetableGrid'
import { OcrUploadModal } from './components/timetable/OcrUploadModal'
import { ManualEntryModal } from './components/timetable/ManualEntryModal'

// Attendance & Analytics views
import { AttendanceChecklist } from './components/attendance/AttendanceChecklist'
import { ExtraClassModal } from './components/attendance/ExtraClassModal'
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard'
import { ProfileView } from './components/profile/ProfileView'

import { formatDate, getDayOfWeek } from './lib/utils'
import { Calendar, CheckSquare, Plus, Sparkles, UploadCloud } from 'lucide-react'

export function App() {
  const { user, loading, toast, dismissToast, showToast } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // App data state
  const [stats, setStats] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [timetable, setTimetable] = useState([])
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [dataLoading, setDataLoading] = useState(true)

  // Modals state
  const [showOcrModal, setShowOcrModal] = useState(false)
  const [showManualAddModal, setShowManualAddModal] = useState(false)
  const [editingTimetableEntry, setEditingTimetableEntry] = useState(null)
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false)
  const [showBunkCalcModal, setShowBunkCalcModal] = useState(false)
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [showExtraClassModal, setShowExtraClassModal] = useState(false)
  const [quickMarkTarget, setQuickMarkTarget] = useState(null)

  // Load all student data
  const refreshData = async () => {
    try {
      const [subs, tt, att, calculated] = await Promise.all([
        dataService.getSubjects(),
        dataService.getTimetable(),
        dataService.getAttendanceRecords(),
        dataService.getCalculatedStats()
      ])
      setSubjects(subs || [])
      setTimetable(tt || [])
      setAttendanceRecords(att || [])
      setStats(calculated)
    } catch (err) {
      console.error('Failed to load student data:', err)
    } finally {
      setDataLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      refreshData()
    }
  }, [user])

  // Timetable Handlers
  const handleApplyMmmutPreset = async () => {
    try {
      await dataService.applyMmmutTimetablePreset()
      await refreshData()
      showToast(`Successfully applied official ${user?.department || 'Branch'} timetable!`, 'success')
      setShowOcrModal(false)
    } catch (err) {
      showToast('Failed to apply timetable preset.', 'error')
    }
  }

  const handleSaveOcrEntries = async (entries) => {
    try {
      const createdSlots = []
      const currentSubjects = await dataService.getSubjects()
      const subjectMap = new Map()
      currentSubjects.forEach(s => {
        if (s.code) subjectMap.set(s.code.toUpperCase(), s.id)
      })

      for (const item of entries) {
        let subjectId = item.subject_id
        const code = (item.subject_code || item.subject_name?.slice(0, 6) || 'SUB').toUpperCase()

        // If subject doesn't exist, create it first
        if (!subjectId && item.subject_name) {
          if (subjectMap.has(code)) {
            subjectId = subjectMap.get(code)
          } else {
            const newSub = await dataService.addSubject({
              name: item.subject_name,
              code: code,
              faculty: item.faculty || '',
              min_threshold: 75
            })
            subjectId = newSub.id
            subjectMap.set(code, subjectId)
          }
        }

        createdSlots.push({
          id: item.id || `slot-${Date.now()}-${createdSlots.length + 1}`,
          subject_id: subjectId,
          day: item.day,
          start_time: item.start_time,
          end_time: item.end_time,
          room: item.room || 'Classroom',
          semester: user?.semester || 'Semester 1',
          faculty: item.faculty || '',
          type: item.type || 'Lecture',
          group: item.group || 'ALL',
          notes: item.notes || ''
        })
      }

      await dataService.setFullTimetable(createdSlots)
      showToast(`Saved ${createdSlots.length} class slots to your weekly timetable!`, 'success')
      await refreshData()
    } catch (err) {
      console.error('Error saving OCR entries:', err)
      showToast('Error saving OCR timetable entries.', 'error')
    }
  }

  const handleSaveManualSlot = async (slotData) => {
    try {
      let subjectId = slotData.subject_id

      if (slotData.isNewSubject && slotData.custom_subject_name) {
        const newSub = await dataService.addSubject({
          name: slotData.custom_subject_name,
          code: slotData.custom_subject_code || '',
          min_threshold: 75
        })
        subjectId = newSub.id
      }

      if (editingTimetableEntry) {
        await dataService.updateTimetableEntry(editingTimetableEntry.id, {
          subject_id: subjectId,
          day: slotData.day,
          start_time: slotData.start_time,
          end_time: slotData.end_time,
          room: slotData.room,
          faculty: slotData.faculty,
          group: slotData.group || 'ALL',
          type: slotData.type || 'Lecture'
        })
        showToast('Timetable slot updated!', 'success')
      } else {
        await dataService.addTimetableEntry({
          subject_id: subjectId,
          day: slotData.day,
          start_time: slotData.start_time,
          end_time: slotData.end_time,
          room: slotData.room,
          faculty: slotData.faculty,
          group: slotData.group || 'ALL',
          type: slotData.type || 'Lecture'
        })
        showToast('Added new class session to timetable!', 'success')
      }

      setEditingTimetableEntry(null)
      await refreshData()
    } catch (err) {
      showToast('Failed to save timetable slot.', 'error')
    }
  }

  const handleDeleteTimetableEntry = async (id) => {
    try {
      await dataService.deleteTimetableEntry(id)
      showToast('Timetable entry deleted.', 'info')
      await refreshData()
    } catch (err) {
      showToast('Error deleting entry.', 'error')
    }
  }

  // Attendance Handlers
  const handleSaveAttendance = async (recordData) => {
    try {
      await dataService.markAttendance(recordData)
      await refreshData()
    } catch (err) {
      showToast('Error recording attendance.', 'error')
      throw err
    }
  }

  const handleToggleUserGroup = async () => {
    const nextGroup = user?.lab_group === 'P2' ? 'P1' : 'P2'
    try {
      await dataService.updateProfile({ lab_group: nextGroup })
      showToast(`Switched active lab/workshop group to Group ${nextGroup}!`, 'success')
      await refreshData()
    } catch (err) {
      showToast('Failed to switch lab group.', 'error')
    }
  }

  const handleQuickMarkSubmit = async (targetClass, status) => {
    try {
      const todayDateStr = formatDate(new Date())
      await dataService.markAttendance({
        subject_id: targetClass.subject_id,
        timetable_id: targetClass.id,
        date: todayDateStr,
        status: status
      })
      showToast(`Marked ${status}!`, 'success')
      await refreshData()
    } catch (err) {
      showToast('Failed to log attendance.', 'error')
    }
  }

  const handleAddSubject = async (formData) => {
    try {
      await dataService.addSubject(formData)
      showToast(`Added course: ${formData.name}`, 'success')
      await refreshData()
    } catch (err) {
      showToast('Failed to add course.', 'error')
    }
  }

  const handleSaveExtraClass = async (extraData) => {
    try {
      await dataService.markAttendance({
        subject_id: extraData.subject_id,
        date: extraData.date,
        status: extraData.status,
        notes: extraData.notes
      })
      showToast('Extra class attendance logged!', 'success')
      await refreshData()
    } catch (err) {
      showToast('Failed to log extra class.', 'error')
    }
  }

  // If loading session
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfbfd] dark:bg-[#0a0a0d] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-black/10 dark:border-white/10 border-t-[#1d1d1f] dark:border-t-white rounded-full animate-spin" />
          <p className="text-xs font-medium text-[#86868b]">Loading Attendo...</p>
        </div>
      </div>
    )
  }

  // If unauthenticated, show Auth Page
  if (!user) {
    return (
      <>
        <AuthPage />
        <Toast toast={toast} onDismiss={dismissToast} />
      </>
    )
  }

  // Today's attendance records
  const todayDateStr = formatDate(new Date())
  const todayRecords = attendanceRecords.filter(r => r.date === todayDateStr)

  return (
    <div className="h-screen h-[100dvh] relative overflow-hidden flex flex-col transition-colors duration-300">
      {/* Huly Cosmic Aurora Glow & Ray in Dark Mode - Fixed and stable */}
      <div className="dark-aurora-bg" />
      <div className="huly-ray" />

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto relative z-10 overflow-hidden min-h-0">
        {/* Responsive Desktop Sidebar & Mobile Drawer */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          overallPercentage={stats?.totalConducted > 0 ? (stats?.overallPercentage ?? 0) : 0}
        />

        {/* Main Content Area: Only tabs scroll smoothly while background stays stable */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 pb-28 sm:pb-32 overflow-y-auto relative z-10 overscroll-contain">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Ignitio / Huly Signature Welcome Hero Banner */}
              <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl theme-card shadow-sm transition-all duration-300">
                {/* Subtle radiant flare */}
                <div className="absolute -top-16 -right-16 w-60 h-60 bg-[#0091ff]/15 dark:bg-[#ff5e3a]/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono font-bold text-[#0091ff] dark:text-[#ffa043] bg-[#0091ff]/10 dark:bg-[#ff5e3a]/15 px-3 py-1 rounded-full border border-[#0091ff]/20 dark:border-[#ff5e3a]/30">
                        {user.student_id}
                      </span>
                      <span className="text-xs text-[#475467] dark:text-[#9aa1b2] font-semibold">
                        &bull; {user.department} &bull; {user.semester} &bull; {user.section || 'SEC-A'}
                      </span>
                      {/* Active Group Indicator & 1-Click Switcher */}
                      <button
                        onClick={handleToggleUserGroup}
                        title="Click to toggle between Group P1 and Group P2"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#101828] text-white dark:bg-white dark:text-black shadow-xs transition cursor-pointer active:scale-95"
                      >
                        <span>🧪 Group {user?.lab_group || 'P1'}</span>
                        <span className="text-[10px] opacity-75 underline font-normal">Switch to {user?.lab_group === 'P2' ? 'P1' : 'P2'}</span>
                      </button>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828] dark:text-white">
                      Welcome, {user.full_name}
                    </h1>
                    <p className="text-xs text-[#475467] dark:text-[#9aa1b2] font-medium max-w-xl">
                      {user.college_name || 'Campus'} &bull; Attendance & Timetable Manager
                    </p>
                  </div>

                  {/* Quick Action CTA Buttons (Ignitio Electric Blue / Huly Laser Orange) */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      onClick={() => setActiveTab('attendance')}
                      className="ignitio-huly-btn px-6 py-3 text-xs inline-flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <CheckSquare className="w-4 h-4" />
                      <span>Mark Today's Attendance &rarr;</span>
                    </button>

                    <button
                      onClick={() => setShowOcrModal(true)}
                      className="px-4 py-3 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#101828] dark:text-white text-xs font-semibold inline-flex items-center gap-2 transition cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4 text-[#0091ff] dark:text-[#ffa043]" />
                      <span>Upload Timetable</span>
                    </button>

                    <button
                      onClick={() => setShowCalendarModal(true)}
                      className="px-4 py-3 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#101828] dark:text-white text-xs font-semibold inline-flex items-center gap-2 transition cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Academic Calendar</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Low Attendance Alert Banner */}
              <LowAttendanceAlert
                stats={stats}
                onOpenBunkCalc={() => setShowBunkCalcModal(true)}
              />

              {/* Stats Summary Cards */}
              <AttendanceStats stats={stats} />

              {/* Today's Schedule */}
              <TodaySchedule
                timetable={timetable}
                subjects={subjects}
                todayLogs={todayRecords}
                userLabGroup={user?.lab_group || 'P1'}
                userSection={user?.section || 'SEC-A'}
                onToggleLabGroup={handleToggleUserGroup}
                onOpenAttendance={() => setActiveTab('attendance')}
                onMarkQuick={(item, subject) => setQuickMarkTarget({ class: item, subject })}
              />

              {/* Subject-wise Cards with Progress Bars */}
              <SubjectCards
                subjects={stats?.subjects || subjects}
                timetable={timetable}
                userLabGroup={user?.lab_group || 'P1'}
                onMarkSubject={(sub) => {
                  setActiveTab('attendance')
                }}
                onOpenAddSubject={() => setShowAddSubjectModal(true)}
              />
            </div>
          )}

          {/* TAB 2: ATTENDANCE CHECKLIST */}
          {activeTab === 'attendance' && (
            <div className="animate-in fade-in duration-200">
              <AttendanceChecklist
                timetable={timetable}
                subjects={subjects}
                attendanceRecords={attendanceRecords}
                onSaveAttendance={handleSaveAttendance}
                onOpenExtraClass={() => setShowExtraClassModal(true)}
              />
            </div>
          )}

          {/* TAB 3: TIMETABLE & OCR */}
          {activeTab === 'timetable' && (
            <div className="animate-in fade-in duration-200">
              <TimetableGrid
                timetable={timetable}
                subjects={subjects}
                userLabGroup={user?.lab_group || 'P1'}
                onToggleLabGroup={handleToggleUserGroup}
                onOpenOcr={() => setShowOcrModal(true)}
                onOpenManualAdd={() => {
                  setEditingTimetableEntry(null)
                  setShowManualAddModal(true)
                }}
                onEditEntry={(entry) => {
                  setEditingTimetableEntry(entry)
                  setShowManualAddModal(true)
                }}
                onDeleteEntry={handleDeleteTimetableEntry}
                onApplyMmmutPreset={handleApplyMmmutPreset}
              />
            </div>
          )}

          {/* TAB 4: ANALYTICS & REPORTS */}
          {activeTab === 'analytics' && (
            <div className="animate-in fade-in duration-200">
              <AnalyticsDashboard
                stats={stats}
                subjects={subjects}
              />
            </div>
          )}

          {/* TAB 5: BUNK CALCULATOR */}
          {activeTab === 'bunk_calc' && (
            <div className="animate-in fade-in duration-200">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white">Attendance Margin & Bunk Predictor</h2>
                <p className="text-xs text-slate-400">Plan safe leaves and test what-if attendance scenarios</p>
              </div>
              <BunkCalculatorModal
                isOpen={true}
                onClose={() => setActiveTab('dashboard')}
                subjects={stats?.subjects || subjects}
              />
            </div>
          )}

          {/* TAB 6: PROFILE */}
          {activeTab === 'profile' && (
            <div className="animate-in fade-in duration-200">
              <ProfileView />
            </div>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <OcrUploadModal
        isOpen={showOcrModal}
        onClose={() => setShowOcrModal(false)}
        subjects={subjects}
        onSaveEntries={handleSaveOcrEntries}
        onApplyMmmutPreset={handleApplyMmmutPreset}
        onFallbackToManual={() => {
          setEditingTimetableEntry(null)
          setShowManualAddModal(true)
        }}
      />

      <ManualEntryModal
        isOpen={showManualAddModal}
        onClose={() => {
          setShowManualAddModal(false)
          setEditingTimetableEntry(null)
        }}
        subjects={subjects}
        initialData={editingTimetableEntry}
        onSave={handleSaveManualSlot}
      />

      <AddSubjectModal
        isOpen={showAddSubjectModal}
        onClose={() => setShowAddSubjectModal(false)}
        onSave={handleAddSubject}
      />

      <ExtraClassModal
        isOpen={showExtraClassModal}
        onClose={() => setShowExtraClassModal(false)}
        subjects={subjects}
        onSave={handleSaveExtraClass}
      />

      <BunkCalculatorModal
        isOpen={showBunkCalcModal}
        onClose={() => setShowBunkCalcModal(false)}
        subjects={stats?.subjects || subjects}
        onOpenCalendar={() => setShowCalendarModal(true)}
      />

      <AcademicCalendarModal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
      />

      <QuickMarkModal
        isOpen={Boolean(quickMarkTarget)}
        onClose={() => setQuickMarkTarget(null)}
        targetClass={quickMarkTarget?.class}
        subject={quickMarkTarget?.subject}
        onMarkStatus={handleQuickMarkSubmit}
      />

      {/* Signature Ignitio & Huly Floating Navigation Dock */}
      <FloatingDock activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contact the Developer Floating Corner Section */}
      <ContactDeveloperWidget />

      {/* Global Toast */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  )
}

export default App
