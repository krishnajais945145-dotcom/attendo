export const INITIAL_STUDENT_PROFILE = null
export const INITIAL_SUBJECTS = []
export const INITIAL_TIMETABLE = []

// Clean attendance: starts strictly at 0 records for all courses
export const INITIAL_ATTENDANCE_LOGS = []

function generateHistoryForSubject(subjectId, totalConducted, totalAttended) {
  return []
}

// Full detected timetable preset for M.M.M. University of Technology, Gorakhpur (2025-26)
export const MMMUT_PRESET = {
  profile: {
    college_name: 'M.M.M. University of Technology, Gorakhpur',
    department: 'Mechanical Engineering (SEC-A)',
    semester: 'Semester 1',
    year_of_study: '1st Year',
    section: 'SEC-A',
    lab_group: 'P1'
  },
  subjects: [
    { id: 'sub-mmmut-1', code: 'BSM-110', name: 'Engineering Mathematics-1', faculty: 'Dr. Sajjan Lal (SL) & Mr. Vijay Pratap (VP)', min_threshold: 75 },
    { id: 'sub-mmmut-2', code: 'BSM-140', name: 'Environmental Science and Green Chemistry', faculty: 'RKY, CL, Preeti & RS', min_threshold: 75 },
    { id: 'sub-mmmut-3', code: 'BEE-110', name: 'Basic Electrical Engineering', faculty: 'Dr Shekhar Yadav (SY)/Monu (M)', min_threshold: 75 },
    { id: 'sub-mmmut-4', code: 'BME-104', name: 'Manufacturing Practice Workshop', faculty: 'PSY/Nistha, Anjani Kumar Singh/Dr. Kuldeep Kumar', min_threshold: 75 },
    { id: 'sub-mmmut-5', code: 'BHS-102', name: 'Technical Writing and Professional Communication', faculty: 'Dept. Faculty', min_threshold: 75 }
  ],
  timetable: [
    // === MONDAY ===
    { id: 'tt-m-1', subject_id: 'sub-mmmut-1', day: 'Monday', start_time: '09:10', end_time: '10:00', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (SL)' },
    { id: 'tt-m-2', subject_id: 'sub-mmmut-3', day: 'Monday', start_time: '10:00', end_time: '10:50', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (SY)' },
    { id: 'tt-m-3', subject_id: 'sub-mmmut-2', day: 'Monday', start_time: '10:50', end_time: '11:40', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (RKY)' },
    { id: 'tt-m-4-p2', subject_id: 'sub-mmmut-2', day: 'Monday', start_time: '14:00', end_time: '15:30', room: 'Chemistry Lab', semester: 'Sem 1', group: 'P2', type: 'Lab', notes: 'P/2 Chemistry Lab (RKY, NK & RS)' },
    { id: 'tt-m-4-p1', subject_id: 'sub-mmmut-5', day: 'Monday', start_time: '14:00', end_time: '15:30', room: 'Language Lab', semester: 'Sem 1', group: 'P1', type: 'Lab', notes: 'P/1 Communication Lab' },

    // === TUESDAY ===
    { id: 'tt-t-1-p2', subject_id: 'sub-mmmut-4', day: 'Tuesday', start_time: '09:10', end_time: '12:30', room: 'Central Workshop', semester: 'Sem 1', group: 'P2', type: 'Workshop', notes: 'P/2 Workshop Practice (PSY/Nistha)' },
    { id: 'tt-t-2-p1', subject_id: 'sub-mmmut-2', day: 'Tuesday', start_time: '14:00', end_time: '15:30', room: 'Chemistry Lab', semester: 'Sem 1', group: 'P1', type: 'Lab', notes: 'P/1 Chemistry Lab (CL, Preeti & RS)' },
    { id: 'tt-t-3', subject_id: 'sub-mmmut-2', day: 'Tuesday', start_time: '15:30', end_time: '16:15', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (RKY)' },
    { id: 'tt-t-4-p2', subject_id: 'sub-mmmut-5', day: 'Tuesday', start_time: '16:15', end_time: '17:00', room: 'TL-205', semester: 'Sem 1', group: 'P2', type: 'Tutorial', notes: 'T2 BHS-102 Tutorial' },

    // === WEDNESDAY ===
    { id: 'tt-w-1', subject_id: 'sub-mmmut-2', day: 'Wednesday', start_time: '09:10', end_time: '10:00', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (RKY)' },
    { id: 'tt-w-2', subject_id: 'sub-mmmut-4', day: 'Wednesday', start_time: '10:00', end_time: '10:50', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (MG)' },
    { id: 'tt-w-3-p1', subject_id: 'sub-mmmut-3', day: 'Wednesday', start_time: '14:00', end_time: '15:30', room: 'Electrical Lab', semester: 'Sem 1', group: 'P1', type: 'Lab', notes: 'P/1 Electrical Lab (SY/M)' },
    { id: 'tt-w-4', subject_id: 'sub-mmmut-5', day: 'Wednesday', start_time: '15:30', end_time: '16:15', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L BHS-102' },
    { id: 'tt-w-5-p2', subject_id: 'sub-mmmut-1', day: 'Wednesday', start_time: '16:15', end_time: '17:00', room: 'TL-205', semester: 'Sem 1', group: 'P2', type: 'Tutorial', notes: 'T2 Maths Tutorial (VP)' },

    // === THURSDAY ===
    { id: 'tt-th-1', subject_id: 'sub-mmmut-1', day: 'Thursday', start_time: '09:10', end_time: '10:00', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (SL)' },
    { id: 'tt-th-2', subject_id: 'sub-mmmut-3', day: 'Thursday', start_time: '10:00', end_time: '10:50', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (SY)' },
    { id: 'tt-th-3', subject_id: 'sub-mmmut-4', day: 'Thursday', start_time: '14:00', end_time: '14:45', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (MG)' },
    { id: 'tt-th-4-p1', subject_id: 'sub-mmmut-1', day: 'Thursday', start_time: '14:45', end_time: '15:30', room: 'TL-205', semester: 'Sem 1', group: 'P1', type: 'Tutorial', notes: 'T1 Maths Tutorial (VP)' },

    // === FRIDAY ===
    { id: 'tt-f-1', subject_id: 'sub-mmmut-1', day: 'Friday', start_time: '09:10', end_time: '10:00', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (SL)' },
    { id: 'tt-f-2', subject_id: 'sub-mmmut-3', day: 'Friday', start_time: '10:00', end_time: '10:50', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (SY)' },
    { id: 'tt-f-3-p2', subject_id: 'sub-mmmut-5', day: 'Friday', start_time: '14:00', end_time: '14:45', room: 'Language Lab', semester: 'Sem 1', group: 'P2', type: 'Lab', notes: 'P/2 Comm Lab' },
    { id: 'tt-f-4-p1', subject_id: 'sub-mmmut-4', day: 'Friday', start_time: '14:00', end_time: '17:00', room: 'Central Workshop', semester: 'Sem 1', group: 'P1', type: 'Workshop', notes: 'P/1 Workshop Practice (Anjani Kumar Singh/Dr. Kuldeep Kumar)' },

    // === SATURDAY ===
    { id: 'tt-s-1', subject_id: 'sub-mmmut-5', day: 'Saturday', start_time: '09:10', end_time: '10:00', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L BHS-102' },
    { id: 'tt-s-2-p1', subject_id: 'sub-mmmut-5', day: 'Saturday', start_time: '10:00', end_time: '10:50', room: 'TL-205', semester: 'Sem 1', group: 'P1', type: 'Tutorial', notes: 'T1 Comm Tutorial' },
    { id: 'tt-s-3-p2', subject_id: 'sub-mmmut-3', day: 'Saturday', start_time: '10:50', end_time: '12:30', room: 'Electrical Lab', semester: 'Sem 1', group: 'P2', type: 'Lab', notes: 'P/2 Electrical Lab (SY/M)' }
  ],
  generateAttendanceLogs() {
    return []
  }
}

// Full detected timetable preset for M.M.M. University of Technology, Gorakhpur - SEC-B (2025-26)
export const MMMUT_SEC_B_PRESET = {
  profile: {
    college_name: 'M.M.M. University of Technology, Gorakhpur',
    department: 'Mechanical Engineering (ME)',
    semester: 'Semester 1',
    year_of_study: '1st Year',
    section: 'SEC-B',
    lab_group: 'P1'
  },
  subjects: [
    { id: 'sub-secb-1', code: 'BSM-110', name: 'Engineering Mathematics-1', faculty: 'Dr. Sajjan Lal (SL) & Nidhi Verma (NV)', min_threshold: 75 },
    { id: 'sub-secb-2', code: 'BSM-140', name: 'Environmental Science and Green Chemistry', faculty: 'RKY, CL, Preeti & RS', min_threshold: 75 },
    { id: 'sub-secb-3', code: 'BEE-110', name: 'Basic Electrical Engineering', faculty: 'Dr Shekhar Yadav (SY)/Dr Prabhakar Tiwari (PT)/Monu (M)', min_threshold: 75 },
    { id: 'sub-secb-4', code: 'BME-104', name: 'Manufacturing Practice Workshop', faculty: 'PSY/Nistha, Anjani Kumar Singh/Dr. Kuldeep Kumar/Anuj', min_threshold: 75 },
    { id: 'sub-secb-5', code: 'BHS-102', name: 'Technical Writing and Professional Communication', faculty: 'Dept. Faculty', min_threshold: 75 }
  ],
  timetable: [
    // === MONDAY ===
    { id: 'tt-b-m-1-p2', subject_id: 'sub-secb-2', day: 'Monday', start_time: '09:10', end_time: '10:50', room: 'Chemistry Lab', semester: 'Sem 1', group: 'P2', type: 'Lab', notes: 'P/2 Chemistry Lab (Preeti & RS)' },
    { id: 'tt-b-m-2-p1', subject_id: 'sub-secb-4', day: 'Monday', start_time: '09:10', end_time: '12:30', room: 'Central Workshop', semester: 'Sem 1', group: 'P1', type: 'Workshop', notes: 'P/1 Workshop Practice (Anjani Kumar Singh/Anuj)' },
    { id: 'tt-b-m-3', subject_id: 'sub-secb-5', day: 'Monday', start_time: '14:00', end_time: '14:45', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L BHS-102' },
    { id: 'tt-b-m-4', subject_id: 'sub-secb-3', day: 'Monday', start_time: '14:45', end_time: '15:30', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (SY)' },
    { id: 'tt-b-m-5-p1', subject_id: 'sub-secb-1', day: 'Monday', start_time: '15:30', end_time: '16:15', room: 'TL-205', semester: 'Sem 1', group: 'P1', type: 'Tutorial', notes: 'T1/BSM-110/NV/TL-205' },

    // === TUESDAY ===
    { id: 'tt-b-t-1', subject_id: 'sub-secb-1', day: 'Tuesday', start_time: '09:10', end_time: '10:00', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (SL)' },
    { id: 'tt-b-t-2', subject_id: 'sub-secb-3', day: 'Tuesday', start_time: '10:00', end_time: '10:50', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (SY)' },
    { id: 'tt-b-t-3', subject_id: 'sub-secb-2', day: 'Tuesday', start_time: '10:50', end_time: '11:40', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (RKY)' },
    { id: 'tt-b-t-4', subject_id: 'sub-secb-4', day: 'Tuesday', start_time: '11:40', end_time: '12:30', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (MG)' },
    { id: 'tt-b-t-5-p2', subject_id: 'sub-secb-4', day: 'Tuesday', start_time: '14:45', end_time: '17:00', room: 'Central Workshop', semester: 'Sem 1', group: 'P2', type: 'Workshop', notes: 'P/2 Workshop Practice (PSY/Nistha)' },

    // === WEDNESDAY ===
    { id: 'tt-b-w-1', subject_id: 'sub-secb-2', day: 'Wednesday', start_time: '10:50', end_time: '11:40', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (RKY)' },
    { id: 'tt-b-w-2', subject_id: 'sub-secb-5', day: 'Wednesday', start_time: '11:40', end_time: '12:30', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L BHS-102' },

    // === THURSDAY ===
    { id: 'tt-b-th-1-p1', subject_id: 'sub-secb-3', day: 'Thursday', start_time: '09:10', end_time: '10:50', room: 'Electrical Lab', semester: 'Sem 1', group: 'P1', type: 'Lab', notes: 'P/1 Electrical Lab (M/PT)' },
    { id: 'tt-b-th-2', subject_id: 'sub-secb-2', day: 'Thursday', start_time: '10:50', end_time: '11:40', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (RKY)' },
    { id: 'tt-b-th-3', subject_id: 'sub-secb-4', day: 'Thursday', start_time: '11:40', end_time: '12:30', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (MG)' },
    { id: 'tt-b-th-4-p2', subject_id: 'sub-secb-5', day: 'Thursday', start_time: '14:00', end_time: '15:30', room: 'Language Lab', semester: 'Sem 1', group: 'P2', type: 'Lab', notes: 'P/2 Language Lab' },
    { id: 'tt-b-th-5-p2', subject_id: 'sub-secb-1', day: 'Thursday', start_time: '15:30', end_time: '16:15', room: 'TL-205', semester: 'Sem 1', group: 'P2', type: 'Tutorial', notes: 'T2/BSM-110/NV/TL-205' },

    // === FRIDAY ===
    { id: 'tt-b-f-1-p1', subject_id: 'sub-secb-5', day: 'Friday', start_time: '09:10', end_time: '10:50', room: 'Language Lab', semester: 'Sem 1', group: 'P1', type: 'Lab', notes: 'P/1 Language Lab' },
    { id: 'tt-b-f-2', subject_id: 'sub-secb-1', day: 'Friday', start_time: '10:50', end_time: '11:40', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (SL)' },
    { id: 'tt-b-f-3', subject_id: 'sub-secb-3', day: 'Friday', start_time: '11:40', end_time: '12:30', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (SY)' },
    { id: 'tt-b-f-4-p1', subject_id: 'sub-secb-2', day: 'Friday', start_time: '14:00', end_time: '15:30', room: 'Chemistry Lab', semester: 'Sem 1', group: 'P1', type: 'Lab', notes: 'P/1 Chemistry Lab (Preeti & RS)' },
    { id: 'tt-b-f-5-p1', subject_id: 'sub-secb-5', day: 'Friday', start_time: '15:30', end_time: '16:15', room: 'TL-205', semester: 'Sem 1', group: 'P1', type: 'Tutorial', notes: 'T1/BHS-102/TL-205' },

    // === SATURDAY ===
    { id: 'tt-b-s-1-p2', subject_id: 'sub-secb-3', day: 'Saturday', start_time: '09:10', end_time: '10:50', room: 'Electrical Lab', semester: 'Sem 1', group: 'P2', type: 'Lab', notes: 'P/2 Electrical Lab (SY/M)' },
    { id: 'tt-b-s-2', subject_id: 'sub-secb-1', day: 'Saturday', start_time: '10:50', end_time: '11:40', room: 'TL-205', semester: 'Sem 1', group: 'ALL', type: 'Lecture', notes: 'L (SL)' },
    { id: 'tt-b-s-3-p2', subject_id: 'sub-secb-5', day: 'Saturday', start_time: '11:40', end_time: '12:30', room: 'TL-205', semester: 'Sem 1', group: 'P2', type: 'Tutorial', notes: 'T2/BHS-102/TL-205' }
  ]
}

