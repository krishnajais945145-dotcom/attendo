import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { generateStudentId } from '../lib/utils'
import { getFirstYearBranchSchedule } from './firstYearDatabase'

// Local storage keys
const STORAGE_KEYS = {
  CURRENT_USER: 'attendo_current_user',
  USERS: 'attendo_users',
  SUBJECTS: 'attendo_subjects',
  TIMETABLE: 'attendo_timetable',
  ATTENDANCE: 'attendo_attendance'
}

// Helpers for localStorage
function loadLocal(key, defaultVal) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultVal
  } catch (e) {
    console.error('Failed to load from localStorage', e)
    return defaultVal
  }
}

function saveLocal(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val))
  } catch (e) {
    console.error('Failed to save to localStorage', e)
  }
}

// Universal initialization: Ready to deploy - clean 0% base with zero test records
function initializeLocalStorage() {
  const DEPLOY_KEY = 'attendo_prod_deploy_clean_v2'
  if (!localStorage.getItem(DEPLOY_KEY)) {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
      localStorage.removeItem(STORAGE_KEYS.USERS)
      localStorage.removeItem(STORAGE_KEYS.SUBJECTS)
      localStorage.removeItem(STORAGE_KEYS.TIMETABLE)
      localStorage.removeItem(STORAGE_KEYS.ATTENDANCE)

      // Purge any old test keys from campussync or previous runs
      const keysToRemove = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && (key.startsWith('campussync') || key.startsWith('attendo_')) && key !== DEPLOY_KEY) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k))
    } catch (e) {
      console.warn('Deploy storage purge exception:', e)
    }
    localStorage.setItem(DEPLOY_KEY, 'true')
  }
}

// Run init
if (typeof window !== 'undefined') {
  initializeLocalStorage()
}

export const dataService = {
  isCloudConnected: () => isSupabaseConfigured,

  // ================= AUTHENTICATION =================
  async signUp(userData) {
    const generatedId = generateStudentId()
    
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.fullName,
            student_id: generatedId,
            college_name: userData.collegeName,
            department: userData.department,
            year_of_study: userData.yearOfStudy,
            semester: userData.semester,
            section: userData.section || 'SEC-A',
            lab_group: userData.labGroup || 'P1'
          }
        }
      })
      if (error) throw error

      // Insert profile row into database
      if (data?.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          student_id: generatedId,
          full_name: userData.fullName,
          college_name: userData.collegeName,
          department: userData.department,
          year_of_study: userData.yearOfStudy,
          semester: userData.semester,
          section: userData.section || 'SEC-A',
          lab_group: userData.labGroup || 'P1',
          email: userData.email
        })
        if (profileError) console.error('Profile insert warning:', profileError)
      }
      return data
    } else {
      // Local storage implementation
      const users = loadLocal(STORAGE_KEYS.USERS, [])
      const exists = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())
      if (exists) {
        throw new Error('A student with this email address already exists.')
      }

      const newStudent = {
        id: `student-${Date.now()}`,
        student_id: generatedId,
        email: userData.email,
        password: userData.password,
        full_name: userData.fullName,
        college_name: userData.collegeName,
        department: userData.department,
        year_of_study: userData.yearOfStudy,
        semester: userData.semester,
        section: userData.section || 'SEC-A',
        lab_group: userData.labGroup || 'P1',
        created_at: new Date().toISOString()
      }

      users.push(newStudent)
      saveLocal(STORAGE_KEYS.USERS, users)

      // Determine subjects and timetable for this student's branch & section
      let userSubjects = userData.customSubjects
      let userTimetable = userData.customTimetable

      if (!userSubjects || userSubjects.length === 0) {
        userSubjects = []
        userTimetable = []
      }

      // Save user-isolated subjects and timetable
      saveLocal(`${STORAGE_KEYS.SUBJECTS}_${generatedId}`, userSubjects)
      saveLocal(`${STORAGE_KEYS.TIMETABLE}_${generatedId}`, userTimetable)
      saveLocal(STORAGE_KEYS.SUBJECTS, userSubjects)
      saveLocal(STORAGE_KEYS.TIMETABLE, userTimetable)

      saveLocal(STORAGE_KEYS.CURRENT_USER, newStudent)
      return { user: newStudent }
    }
  },

  async signIn(email, password, optionalGroup = null) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      if (optionalGroup && data?.user) {
        await supabase.from('profiles').update({ lab_group: optionalGroup }).eq('id', data.user.id)
      }
      return data
    } else {
      const users = loadLocal(STORAGE_KEYS.USERS, [])
      const user = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )
      if (!user) {
        throw new Error('Invalid email or password. Please check your credentials.')
      }
      if (optionalGroup) {
        user.lab_group = optionalGroup
        saveLocal(STORAGE_KEYS.USERS, users)
      }
      const safeUser = { ...user }
      delete safeUser.password
      saveLocal(STORAGE_KEYS.CURRENT_USER, safeUser)

      // Restore user-specific branch timetable if saved
      const studentId = safeUser.student_id || safeUser.id
      const userSubs = loadLocal(`${STORAGE_KEYS.SUBJECTS}_${studentId}`, null)
      if (userSubs && userSubs.length > 0) {
        saveLocal(STORAGE_KEYS.SUBJECTS, userSubs)
      }
      const userTt = loadLocal(`${STORAGE_KEYS.TIMETABLE}_${studentId}`, null)
      if (userTt && userTt.length > 0) {
        saveLocal(STORAGE_KEYS.TIMETABLE, userTt)
      }

      return { user: safeUser }
    }
  },

  async signOut() {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
    }
  },

  async resetPassword(email) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password'
      })
      if (error) throw error
      return data
    } else {
      const users = loadLocal(STORAGE_KEYS.USERS, [])
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
      if (!user) {
        throw new Error('No registered student account was found with that email.')
      }
      return { message: 'Password reset link sent (demo simulation: check inbox)' }
    }
  },

  async updateUserPassword(newPassword) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })
      if (error) throw error
      return data
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      if (currentUser) {
        const users = loadLocal(STORAGE_KEYS.USERS, [])
        const idx = users.findIndex(u => u.id === currentUser.id)
        if (idx !== -1) {
          users[idx].password = newPassword
          saveLocal(STORAGE_KEYS.USERS, users)
        }
      }
      return { message: 'Password updated successfully' }
    }
  },

  async getCurrentProfile() {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        return {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || 'Student',
          student_id: user.user_metadata?.student_id || 'STU-NEW',
          college_name: user.user_metadata?.college_name || 'College',
          department: user.user_metadata?.department || 'Branch',
          year_of_study: user.user_metadata?.year_of_study || 'Year 1',
          semester: user.user_metadata?.semester || 'Sem 1'
        }
      }
      return data
    } else {
      return loadLocal(STORAGE_KEYS.CURRENT_USER, null)
    }
  },

  async updateProfile(updates) {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      return data
    } else {
      const current = loadLocal(STORAGE_KEYS.CURRENT_USER, {})
      const updated = { ...current, ...updates }
      saveLocal(STORAGE_KEYS.CURRENT_USER, updated)
      return updated
    }
  },

  // ================= SUBJECTS =================
  async getSubjects() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('subjects').select('*').order('name')
      if (error) throw error
      return data
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      const currentUserId = currentUser?.student_id || currentUser?.id
      let subs = []
      if (currentUserId) {
        subs = loadLocal(`${STORAGE_KEYS.SUBJECTS}_${currentUserId}`, null)
      }
      if (subs === null) {
        subs = loadLocal(STORAGE_KEYS.SUBJECTS, [])
      }

      // Strictly synchronize with timetable: Only return subjects present in timetable!
      const currentTimetable = await this.getTimetable()
      if (currentTimetable && currentTimetable.length > 0) {
        const timetableSubjectIds = new Set(currentTimetable.map(t => t.subject_id).filter(Boolean))
        const timetableSubjectCodes = new Set(currentTimetable.map(t => t.subject_code).filter(Boolean))

        const filtered = (subs || []).filter(s => 
          timetableSubjectIds.has(s.id) || 
          (s.code && timetableSubjectCodes.has(s.code))
        )

        // If any slot exists in timetable that is missing from filtered subjects, construct it cleanly
        currentTimetable.forEach(t => {
          const exists = filtered.some(s => s.id === t.subject_id || (t.subject_code && s.code === t.subject_code))
          if (!exists) {
            filtered.push({
              id: t.subject_id || `sub-${t.subject_code?.toLowerCase() || 'gen'}`,
              code: t.subject_code || '',
              name: t.subject_name || (t.subject_code ? `${t.subject_code} Course` : 'Course'),
              faculty: t.faculty || 'Faculty',
              min_threshold: 75
            })
          }
        })

        return filtered
      }

      return subs || []
    }
  },

  async addSubject(subject) {
    const newSub = {
      id: `sub-${Date.now()}`,
      code: subject.code || '',
      name: subject.name,
      faculty: subject.faculty || '',
      min_threshold: subject.min_threshold || 75
    }

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('subjects').insert(newSub).select().single()
      if (error) throw error
      return data
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      const currentUserId = currentUser?.student_id || currentUser?.id
      const userKey = currentUserId ? `${STORAGE_KEYS.SUBJECTS}_${currentUserId}` : STORAGE_KEYS.SUBJECTS

      const subs = loadLocal(userKey, loadLocal(STORAGE_KEYS.SUBJECTS, []))
      subs.push(newSub)
      saveLocal(userKey, subs)
      saveLocal(STORAGE_KEYS.SUBJECTS, subs)
      return newSub
    }
  },

  async deleteSubject(subjectId) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('subjects').delete().eq('id', subjectId)
      if (error) throw error
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      const currentUserId = currentUser?.student_id || currentUser?.id
      const userSubKey = currentUserId ? `${STORAGE_KEYS.SUBJECTS}_${currentUserId}` : STORAGE_KEYS.SUBJECTS
      const userTtKey = currentUserId ? `${STORAGE_KEYS.TIMETABLE}_${currentUserId}` : STORAGE_KEYS.TIMETABLE

      let subs = loadLocal(userSubKey, [])
      subs = subs.filter(s => s.id !== subjectId)
      saveLocal(userSubKey, subs)
      saveLocal(STORAGE_KEYS.SUBJECTS, subs)

      // Also clean associated timetable entries
      let tt = loadLocal(userTtKey, [])
      tt = tt.filter(t => t.subject_id !== subjectId)
      saveLocal(userTtKey, tt)
      saveLocal(STORAGE_KEYS.TIMETABLE, tt)
    }
  },

  // ================= TIMETABLE =================
  async getTimetable() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('timetable_entries')
        .select('*, subjects(*)')
        .order('start_time')
      if (error) throw error
      return data
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      const currentUserId = currentUser?.student_id || currentUser?.id
      if (currentUserId) {
        const userTt = loadLocal(`${STORAGE_KEYS.TIMETABLE}_${currentUserId}`, null)
        if (userTt !== null) return userTt
      }
      return loadLocal(STORAGE_KEYS.TIMETABLE, [])
    }
  },

  async addTimetableEntry(entry) {
    const newEntry = {
      id: `tt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      subject_id: entry.subject_id,
      day: entry.day,
      start_time: entry.start_time,
      end_time: entry.end_time,
      room: entry.room || 'General Classroom',
      semester: entry.semester || 'Semester 1',
      faculty: entry.faculty || '',
      type: entry.type || 'Lecture',
      group: entry.group || 'ALL',
      notes: entry.notes || ''
    }

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('timetable_entries')
        .insert(newEntry)
        .select()
        .single()
      if (error) throw error
      return data
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      const currentUserId = currentUser?.student_id || currentUser?.id
      const userKey = currentUserId ? `${STORAGE_KEYS.TIMETABLE}_${currentUserId}` : STORAGE_KEYS.TIMETABLE

      const list = loadLocal(userKey, loadLocal(STORAGE_KEYS.TIMETABLE, []))
      list.push(newEntry)
      saveLocal(userKey, list)
      saveLocal(STORAGE_KEYS.TIMETABLE, list)
      return newEntry
    }
  },

  async updateTimetableEntry(id, updates) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('timetable_entries')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      const currentUserId = currentUser?.student_id || currentUser?.id
      const userKey = currentUserId ? `${STORAGE_KEYS.TIMETABLE}_${currentUserId}` : STORAGE_KEYS.TIMETABLE

      const list = loadLocal(userKey, loadLocal(STORAGE_KEYS.TIMETABLE, []))
      const idx = list.findIndex(e => e.id === id)
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...updates }
        saveLocal(userKey, list)
        saveLocal(STORAGE_KEYS.TIMETABLE, list)
        return list[idx]
      }
      return null
    }
  },

  async deleteTimetableEntry(id) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('timetable_entries').delete().eq('id', id)
      if (error) throw error
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      const currentUserId = currentUser?.student_id || currentUser?.id
      const userKey = currentUserId ? `${STORAGE_KEYS.TIMETABLE}_${currentUserId}` : STORAGE_KEYS.TIMETABLE

      let list = loadLocal(userKey, loadLocal(STORAGE_KEYS.TIMETABLE, []))
      list = list.filter(e => e.id !== id)
      saveLocal(userKey, list)
      saveLocal(STORAGE_KEYS.TIMETABLE, list)
    }
  },

  async clearTimetable() {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('timetable_entries').delete().eq('user_id', user.id)
      }
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      const currentUserId = currentUser?.student_id || currentUser?.id
      const userKey = currentUserId ? `${STORAGE_KEYS.TIMETABLE}_${currentUserId}` : STORAGE_KEYS.TIMETABLE
      saveLocal(userKey, [])
      saveLocal(STORAGE_KEYS.TIMETABLE, [])
    }
  },

  async setFullTimetable(entries) {
    await this.clearTimetable()
    if (isSupabaseConfigured) {
      if (entries.length > 0) {
        const { data, error } = await supabase.from('timetable_entries').insert(entries).select()
        if (error) throw error
        return data
      }
      return []
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      const currentUserId = currentUser?.student_id || currentUser?.id
      const userKey = currentUserId ? `${STORAGE_KEYS.TIMETABLE}_${currentUserId}` : STORAGE_KEYS.TIMETABLE
      saveLocal(userKey, entries)
      saveLocal(STORAGE_KEYS.TIMETABLE, entries)
      return entries
    }
  },

  async bulkSaveTimetable(entries) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('timetable_entries').insert(entries).select()
      if (error) throw error
      return data
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      const currentUserId = currentUser?.student_id || currentUser?.id
      const userKey = currentUserId ? `${STORAGE_KEYS.TIMETABLE}_${currentUserId}` : STORAGE_KEYS.TIMETABLE

      const current = loadLocal(userKey, loadLocal(STORAGE_KEYS.TIMETABLE, []))
      const updated = [...current, ...entries]
      saveLocal(userKey, updated)
      saveLocal(STORAGE_KEYS.TIMETABLE, updated)
      return entries
    }
  },

  // ================= ATTENDANCE =================
  async getAttendanceRecords(filters = {}) {
    if (isSupabaseConfigured) {
      let query = supabase.from('attendance_records').select('*').order('date', { ascending: false })
      if (filters.subject_id) query = query.eq('subject_id', filters.subject_id)
      if (filters.date) query = query.eq('date', filters.date)
      const { data, error } = await query
      if (error) throw error
      return data
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      const currentUserId = currentUser?.id || currentUser?.student_id
      let records = loadLocal(STORAGE_KEYS.ATTENDANCE, [])
      
      // Isolate records per student and exclude any legacy demo generator items
      records = records.filter(r => !r.id?.startsWith('att-sub-1-') && !r.id?.startsWith('att-sub-2-') && !r.id?.startsWith('att-sub-mmmut-'))
      if (currentUserId) {
        records = records.filter(r => r.student_id === currentUserId)
      }

      if (filters.subject_id) {
        records = records.filter(r => r.subject_id === filters.subject_id)
      }
      if (filters.date) {
        records = records.filter(r => r.date === filters.date)
      }
      return records
    }
  },

  async markAttendance({ subject_id, timetable_id, date, status, notes = '' }) {
    // Four mutually exclusive statuses: 'present', 'absent', 'cancelled', 'holiday'
    if (isSupabaseConfigured) {
      // Upsert by date and timetable_id/subject_id
      const record = {
        subject_id,
        timetable_id,
        date,
        status,
        notes,
        updated_at: new Date().toISOString()
      }
      const { data, error } = await supabase
        .from('attendance_records')
        .upsert(record, { onConflict: 'subject_id, date, timetable_id' })
        .select()
        .single()
      if (error) throw error
      return data
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      const currentStudentId = currentUser?.id || currentUser?.student_id || 'guest'
      const records = loadLocal(STORAGE_KEYS.ATTENDANCE, [])
      
      const existingIdx = records.findIndex(r => 
        r.student_id === currentStudentId &&
        r.subject_id === subject_id && 
        r.date === date && 
        (timetable_id ? r.timetable_id === timetable_id : true)
      )

      const recordItem = {
        id: existingIdx !== -1 ? records[existingIdx].id : `att-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        student_id: currentStudentId,
        subject_id,
        timetable_id,
        date,
        status,
        notes,
        updated_at: new Date().toISOString()
      }

      if (existingIdx !== -1) {
        records[existingIdx] = recordItem
      } else {
        records.push(recordItem)
      }

      saveLocal(STORAGE_KEYS.ATTENDANCE, records)
      return recordItem
    }
  },

  async resetUserAttendance() {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('attendance_records').delete().eq('user_id', user.id)
      }
    } else {
      const currentUser = loadLocal(STORAGE_KEYS.CURRENT_USER, null)
      const currentUserId = currentUser?.id || currentUser?.student_id
      let records = loadLocal(STORAGE_KEYS.ATTENDANCE, [])
      if (currentUserId) {
        records = records.filter(r => r.student_id !== currentUserId)
      } else {
        records = []
      }
      saveLocal(STORAGE_KEYS.ATTENDANCE, records)
    }
  },

  async markBulkAttendance(attendanceEntries) {
    const results = []
    for (const entry of attendanceEntries) {
      const res = await this.markAttendance(entry)
      results.push(res)
    }
    return results
  },

  // Calculate comprehensive attendance statistics
  async getCalculatedStats() {
    const subjects = await this.getSubjects()
    const records = await this.getAttendanceRecords()

    let overallAttended = 0
    let overallConducted = 0
    let overallMissed = 0
    let overallCancelled = 0
    let overallHolidays = 0

    const subjectStats = subjects.map(sub => {
      const subRecords = records.filter(r => r.subject_id === sub.id)
      
      let attended = 0
      let missed = 0
      let cancelled = 0
      let holidays = 0

      subRecords.forEach(r => {
        if (r.status === 'present') attended++
        else if (r.status === 'absent') missed++
        else if (r.status === 'cancelled') cancelled++
        else if (r.status === 'holiday') holidays++
      })

      // Formula: Conducted classes = attended + missed (cancelled and holidays are excluded!)
      const conducted = attended + missed
      const percentage = conducted > 0 ? Math.round((attended / conducted) * 100) : 0

      overallAttended += attended
      overallConducted += conducted
      overallMissed += missed
      overallCancelled += cancelled
      overallHolidays += holidays

      return {
        ...sub,
        attended,
        conducted,
        missed,
        cancelled,
        holidays,
        percentage
      }
    })

    const overallPercentage = overallConducted > 0 
      ? Math.round((overallAttended / overallConducted) * 100) 
      : 0

    // Only flag low attendance if classes have actually been conducted!
    const lowAttendanceSubjects = subjectStats.filter(s => s.conducted > 0 && s.percentage < (s.min_threshold || 75))

    return {
      overallPercentage,
      totalConducted: overallConducted,
      totalAttended: overallAttended,
      totalMissed: overallMissed,
      totalCancelled: overallCancelled,
      totalHolidays: overallHolidays,
      subjectCount: subjects.length,
      lowAttendanceCount: lowAttendanceSubjects.length,
      lowAttendanceSubjects,
      subjects: subjectStats
    }
  },

  // 1-Click Apply Official Branch Timetable Preset for First Year
  async applyMmmutTimetablePreset() {
    const profile = await this.getCurrentProfile()
    const schedule = getFirstYearBranchSchedule(
      profile?.department || 'Computer Science & Engineering (CSE)',
      profile?.section || 'SEC-A',
      profile?.year_of_study || '1st Year',
      profile?.semester || 'Semester 1'
    )

    if (schedule && schedule.subjects && schedule.subjects.length > 0) {
      const timetableSlots = schedule.slots.map(t => ({
        id: t.id,
        subject_id: t.subject_id,
        day: t.day,
        start_time: t.start_time,
        end_time: t.end_time,
        room: t.room || schedule.room || 'Classroom',
        semester: profile?.semester || 'Semester 1',
        group: t.group || 'ALL',
        type: t.type || 'Lecture',
        notes: t.notes || ''
      }))

      saveLocal(STORAGE_KEYS.SUBJECTS, schedule.subjects)
      saveLocal(STORAGE_KEYS.TIMETABLE, timetableSlots)
      const currentUserId = profile?.student_id || profile?.id
      if (currentUserId) {
        saveLocal(`${STORAGE_KEYS.SUBJECTS}_${currentUserId}`, schedule.subjects)
        saveLocal(`${STORAGE_KEYS.TIMETABLE}_${currentUserId}`, timetableSlots)
      }
      return { profile, subjects: schedule.subjects, timetable: timetableSlots }
    }
    return null
  }
}
