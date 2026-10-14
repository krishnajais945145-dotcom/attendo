// Official MMMUT Academic Calendar for Session 2026-27 (Odd & Even Semesters)
// Transcribed directly from official university calendar notification

export const MMMUT_ACADEMIC_CALENDAR = {
  university: 'M.M.M. University of Technology, Gorakhpur',
  session: '2026-27',
  oddSemester: {
    name: 'Odd Semester (2026-27)',
    term: 'Odd',
    classCommencement: '2026-08-03',
    classesEndDate: '2026-11-23',
    attendanceHodDisplay: '2026-09-18',
    minorTestStart: '2026-09-21',
    minorTestEnd: '2026-09-25',
    midSemBreakStart: '2026-11-09',
    midSemBreakEnd: '2026-11-16',
    attendanceDeanDisplay: '2026-11-26',
    majorExamsStart: '2026-11-30',
    majorExamsEnd: '2026-12-08',
    semesterBreakStart: '2026-12-09',
    semesterBreakEnd: '2026-12-12',
    resultDeclaration: '2026-12-15',
    events: [
      {
        dates: 'July 29-30, 2026',
        startDate: '2026-07-29',
        endDate: '2026-07-30',
        activity: 'Physical Reporting at MMMUT Gorakhpur',
        category: 'reporting',
        type: 'event',
        isHoliday: false,
        noClass: true
      },
      {
        dates: 'July 31, 2026',
        startDate: '2026-07-31',
        endDate: '2026-07-31',
        activity: 'Orientation Program',
        category: 'orientation',
        type: 'event',
        isHoliday: false,
        noClass: true
      },
      {
        dates: 'Aug 01 – Aug 22, 2026',
        startDate: '2026-08-01',
        endDate: '2026-08-22',
        activity: 'Induction Program for Newly admitted Students (IPNS-2026)',
        category: 'academic',
        type: 'induction',
        isHoliday: false,
        noClass: false
      },
      {
        dates: 'Aug 03, 2026',
        startDate: '2026-08-03',
        endDate: '2026-08-03',
        activity: 'Commencement of classes (Partially)',
        category: 'teaching',
        type: 'milestone',
        isHoliday: false,
        isMilestone: true,
        note: 'Odd Semester classes commence'
      },
      {
        dates: 'Sept 18, 2026',
        startDate: '2026-09-18',
        endDate: '2026-09-18',
        activity: 'Display of Mid Semester Attendance by HoD',
        category: 'attendance_audit',
        type: 'audit',
        isHoliday: false,
        isMilestone: true,
        isAudit: true,
        note: 'Crucial: First official 75% attendance display by Head of Department'
      },
      {
        dates: 'Sept 21-25, 2026',
        startDate: '2026-09-21',
        endDate: '2026-09-25',
        activity: 'Minor Test Examination',
        category: 'exam',
        type: 'exam',
        isHoliday: false,
        noClass: true,
        note: 'Minor test examinations (No regular lectures)'
      },
      {
        dates: 'Nov 09-16, 2026',
        startDate: '2026-11-09',
        endDate: '2026-11-16',
        activity: 'Mid Semester Break',
        category: 'vacation',
        type: 'vacation',
        isHoliday: true,
        noClass: true,
        note: 'Official university mid-semester vacation'
      },
      {
        dates: 'Nov 21-22, 2026',
        startDate: '2026-11-21',
        endDate: '2026-11-22',
        activity: 'Alumni Meet',
        category: 'event',
        type: 'event',
        isHoliday: false
      },
      {
        dates: 'Nov 23, 2026',
        startDate: '2026-11-23',
        endDate: '2026-11-23',
        activity: 'Last date for end semester classes',
        category: 'teaching',
        type: 'milestone',
        isHoliday: false,
        isMilestone: true,
        note: 'Final teaching day. All attendance counting for Odd Semester closes.'
      },
      {
        dates: 'Nov 24-27, 2026',
        startDate: '2026-11-24',
        endDate: '2026-11-27',
        activity: 'Practical Exam/Doubt Clearing classes (if required)',
        category: 'practical',
        type: 'exam',
        isHoliday: false,
        noClass: true
      },
      {
        dates: 'Nov 26, 2026',
        startDate: '2026-11-26',
        endDate: '2026-11-26',
        activity: 'Display of attendance by Dean Office',
        category: 'attendance_audit',
        type: 'audit',
        isHoliday: false,
        isMilestone: true,
        isAudit: true,
        note: 'Critical: Final eligibility cutoff. Must maintain >= 75% for exam admit card!'
      },
      {
        dates: 'Nov 30- Dec 08, 2026',
        startDate: '2026-11-30',
        endDate: '2026-12-08',
        activity: 'End Semester Major Examination',
        category: 'exam',
        type: 'exam',
        isHoliday: false,
        noClass: true
      },
      {
        dates: 'Dec 01, 2026',
        startDate: '2026-12-01',
        endDate: '2026-12-01',
        activity: 'University Foundation Day',
        category: 'occasion',
        type: 'holiday',
        isHoliday: true,
        noClass: true,
        note: 'MMMUT Foundation Day celebration'
      },
      {
        dates: 'Dec 09-12, 2026',
        startDate: '2026-12-09',
        endDate: '2026-12-12',
        activity: 'Semester Break',
        category: 'vacation',
        type: 'vacation',
        isHoliday: true,
        noClass: true
      },
      {
        dates: 'Dec 12, 2026',
        startDate: '2026-12-12',
        endDate: '2026-12-12',
        activity: 'Last date for Evaluation of Answer Sheets and Marks Uploading',
        category: 'evaluation',
        type: 'academic',
        isHoliday: false
      },
      {
        dates: 'Dec 14, 2026',
        startDate: '2026-12-14',
        endDate: '2026-12-14',
        activity: 'Last date for grade moderation committee meeting for 1st Year',
        category: 'academic',
        type: 'academic',
        isHoliday: false
      },
      {
        dates: 'Dec 15, 2026',
        startDate: '2026-12-15',
        endDate: '2026-12-15',
        activity: 'The last date for the declaration of the semester result',
        category: 'result',
        type: 'milestone',
        isHoliday: false,
        isMilestone: true
      }
    ]
  },
  evenSemester: {
    name: 'Even Semester (2026-27)',
    term: 'Even',
    classCommencement: '2026-12-14',
    classesEndDate: '2027-04-17',
    attendanceHodDisplay: '2027-01-30',
    minorTestStart: '2027-02-01',
    minorTestEnd: '2027-02-06',
    midSemBreakStart: '2027-03-22',
    midSemBreakEnd: '2027-03-27',
    attendanceDeanDisplay: '2027-04-22',
    majorExamsStart: '2027-04-26',
    majorExamsEnd: '2027-05-05',
    sessionBreakStart: '2027-05-05',
    sessionBreakEnd: '2027-06-30',
    resultDeclaration: '2027-05-13',
    events: [
      {
        dates: 'Dec 09-12, 2026',
        startDate: '2026-12-09',
        endDate: '2026-12-12',
        activity: 'Online Registration',
        category: 'registration',
        type: 'academic',
        isHoliday: false
      },
      {
        dates: 'Dec 14, 2026',
        startDate: '2026-12-14',
        endDate: '2026-12-14',
        activity: 'Commencement of classes',
        category: 'teaching',
        type: 'milestone',
        isHoliday: false,
        isMilestone: true,
        note: 'Even Semester classes commence'
      },
      {
        dates: 'Dec 18-20, 2026',
        startDate: '2026-12-18',
        endDate: '2026-12-20',
        activity: 'CSA Activity (Tech Srijan)',
        category: 'fest',
        type: 'event',
        isHoliday: false,
        note: 'Annual Technical Festival'
      },
      {
        dates: 'Jan 30, 2027',
        startDate: '2027-01-30',
        endDate: '2027-01-30',
        activity: 'Display of Mid Semester Attendance by HoD',
        category: 'attendance_audit',
        type: 'audit',
        isHoliday: false,
        isMilestone: true,
        isAudit: true,
        note: 'First official 75% attendance display by HoD'
      },
      {
        dates: 'Feb 01-06, 2027',
        startDate: '2027-02-01',
        endDate: '2027-02-06',
        activity: 'Minor Test Examination',
        category: 'exam',
        type: 'exam',
        isHoliday: false,
        noClass: true
      },
      {
        dates: 'Feb 12-13, 2027',
        startDate: '2027-02-12',
        endDate: '2027-02-13',
        activity: 'CSA Activity (Annual sports meet)',
        category: 'fest',
        type: 'event',
        isHoliday: false
      },
      {
        dates: 'Feb 26-28, 2027',
        startDate: '2027-02-26',
        endDate: '2027-02-28',
        activity: 'CSA Activity (Cultural Program)',
        category: 'fest',
        type: 'event',
        isHoliday: false
      },
      {
        dates: 'March 22-27, 2027',
        startDate: '2027-03-22',
        endDate: '2027-03-27',
        activity: 'Mid Semester Break',
        category: 'vacation',
        type: 'vacation',
        isHoliday: true,
        noClass: true,
        note: 'Official University Mid Semester Vacation'
      },
      {
        dates: 'April 17, 2027',
        startDate: '2027-04-17',
        endDate: '2027-04-17',
        activity: 'Last date for end semester classes',
        category: 'teaching',
        type: 'milestone',
        isHoliday: false,
        isMilestone: true,
        note: 'Final teaching day of Even Semester. Attendance counting closes.'
      },
      {
        dates: 'April 19-24, 2027',
        startDate: '2027-04-19',
        endDate: '2027-04-24',
        activity: 'Practical Exam/Doubt Clearing classes (if required)',
        category: 'practical',
        type: 'exam',
        isHoliday: false,
        noClass: true
      },
      {
        dates: 'April 22, 2027',
        startDate: '2027-04-22',
        endDate: '2027-04-22',
        activity: 'Display of attendance by Dean Office',
        category: 'attendance_audit',
        type: 'audit',
        isHoliday: false,
        isMilestone: true,
        isAudit: true,
        note: 'Final Dean Office Attendance Notice. Minimum 75% required for Major Exams!'
      },
      {
        dates: 'April 26- May 05, 2027',
        startDate: '2027-04-26',
        endDate: '2027-05-05',
        activity: 'End Semester Major Examination',
        category: 'exam',
        type: 'exam',
        isHoliday: false,
        noClass: true
      },
      {
        dates: 'May 05- June 30, 2027',
        startDate: '2027-05-05',
        endDate: '2027-06-30',
        activity: 'Session Break',
        category: 'vacation',
        type: 'vacation',
        isHoliday: true,
        noClass: true,
        note: 'Summer session vacation'
      },
      {
        dates: 'May 10, 2027',
        startDate: '2027-05-10',
        endDate: '2027-05-10',
        activity: 'Last date for Evaluation of Answer Sheets and Marks Uploading',
        category: 'evaluation',
        type: 'academic',
        isHoliday: false
      },
      {
        dates: 'May 12, 2027',
        startDate: '2027-05-12',
        endDate: '2027-05-12',
        activity: 'Grade Moderation Committee Meeting for 1st Year',
        category: 'academic',
        type: 'academic',
        isHoliday: false
      },
      {
        dates: 'May 07-14, 2027',
        startDate: '2027-05-07',
        endDate: '2027-05-14',
        activity: 'Social work/Training coordinated by Dean of Extension, Field Outreach and Alumni Relations',
        category: 'training',
        type: 'event',
        isHoliday: false
      },
      {
        dates: 'May 13, 2027',
        startDate: '2027-05-13',
        endDate: '2027-05-13',
        activity: 'Last date for declaration of semester result',
        category: 'result',
        type: 'milestone',
        isHoliday: false,
        isMilestone: true
      },
      {
        dates: 'May 16- June 14, 2027',
        startDate: '2027-05-16',
        endDate: '2027-06-14',
        activity: 'Summer break for Teachers',
        category: 'vacation',
        type: 'vacation',
        isHoliday: true
      },
      {
        dates: 'July 01- 10, 2027',
        startDate: '2027-07-01',
        endDate: '2027-07-10',
        activity: 'Online Registration & fee deposit for B.Tech/BBA/ BPharm Second Year students',
        category: 'registration',
        type: 'academic',
        isHoliday: false
      }
    ]
  }
}

/**
 * Checks if a given date string (YYYY-MM-DD) falls within an official university vacation or occasion
 */
export function getCalendarEventForDate(dateStr) {
  if (!dateStr) return null
  const target = new Date(dateStr + 'T00:00:00').getTime()

  const allEvents = [
    ...MMMUT_ACADEMIC_CALENDAR.oddSemester.events,
    ...MMMUT_ACADEMIC_CALENDAR.evenSemester.events
  ]

  for (const event of allEvents) {
    const s = new Date(event.startDate + 'T00:00:00').getTime()
    const e = new Date((event.endDate || event.startDate) + 'T23:59:59').getTime()
    if (target >= s && target <= e) {
      return event
    }
  }
  return null
}

/**
 * Calculates remaining teaching weeks and classes until semester end (Nov 23, 2026 or April 17, 2027)
 * taking into account mid-sem breaks, exam periods, and vacations.
 */
export function calculateAcademicSemesterProjection({
  currentDate = new Date(),
  semesterTerm = 'Odd', // 'Odd' | 'Even'
  weeklyClassCount = 4
}) {
  const semConfig = semesterTerm === 'Odd' 
    ? MMMUT_ACADEMIC_CALENDAR.oddSemester 
    : MMMUT_ACADEMIC_CALENDAR.evenSemester

  const today = new Date(currentDate)
  today.setHours(0, 0, 0, 0)

  const endDate = new Date(semConfig.classesEndDate + 'T23:59:59')
  const startDate = new Date(semConfig.classCommencement + 'T00:00:00')

  // Check if semester is completed or not started
  const effectiveStart = today > startDate ? today : startDate
  const diffTime = endDate.getTime() - effectiveStart.getTime()
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))

  // Exclude vacation days and minor test examination weeks from teaching days
  let excludedDays = 0
  const cur = new Date(effectiveStart)
  while (cur <= endDate) {
    const iso = cur.toISOString().split('T')[0]
    const dayOfWeek = cur.getDay() // 0 = Sunday
    const ev = getCalendarEventForDate(iso)
    if (dayOfWeek === 0 || (ev && ev.noClass)) {
      excludedDays++
    }
    cur.setDate(cur.getDate() + 1)
  }

  const effectiveTeachingDays = Math.max(0, daysRemaining - excludedDays)
  // 6 teaching days per university week (Mon-Sat)
  const remainingWeeks = Number((effectiveTeachingDays / 6).toFixed(1))
  const remainingLectures = Math.max(0, Math.round(remainingWeeks * weeklyClassCount))

  // Key audit milestones
  const hodAuditDate = semConfig.attendanceHodDisplay
  const deanAuditDate = semConfig.attendanceDeanDisplay

  return {
    semesterName: semConfig.name,
    classCommencement: semConfig.classCommencement,
    classesEndDate: semConfig.classesEndDate,
    effectiveTeachingDays,
    remainingWeeks,
    remainingLectures,
    hodAuditDate,
    deanAuditDate,
    nextMilestone: getNextAcademicMilestone(today, semConfig)
  }
}

function getNextAcademicMilestone(today, semConfig) {
  const t = today.getTime()
  for (const ev of semConfig.events) {
    const evTime = new Date(ev.startDate + 'T00:00:00').getTime()
    if (evTime >= t && (ev.isMilestone || ev.isAudit || ev.isHoliday)) {
      const diffDays = Math.ceil((evTime - t) / (1000 * 60 * 60 * 24))
      return {
        ...ev,
        daysAway: diffDays
      }
    }
  }
  return null
}
