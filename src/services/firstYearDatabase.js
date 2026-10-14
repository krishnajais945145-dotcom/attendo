/**
 * M.M.M. University of Technology, Gorakhpur
 * Official First Year Timetable Database (Session 2025-26 & 2026-27)
 * Extracted directly from official university branch schedules.
 */

// Helper to construct a standard timetable entry
function makeSlot(id, subject_id, subject_code, subject_name, day, start_time, end_time, room, type = 'Lecture', group = 'ALL', notes = '') {
  return {
    id,
    subject_id,
    subject_code,
    subject_name,
    day,
    start_time,
    end_time,
    room: room || 'Classroom',
    type,
    group,
    notes: notes || `${type} (${group})`
  }
}

// --------------------------------------------------------------------------
// 1. CIVIL ENGINEERING (CE) - Page 1 (SEC-A) & Page 2 (SEC-B)
// --------------------------------------------------------------------------
const CE_SUBJECTS = [
  { id: 'sub-ce-1', code: 'BSM-110', name: 'Engineering Mathematics I', faculty: 'Dr. Mohammad Hasan (MH) & Miss Uzma Faiz (UF)', min_threshold: 75 },
  { id: 'sub-ce-2', code: 'BSM-131', name: 'Engineering Physics', faculty: 'MH', min_threshold: 75 },
  { id: 'sub-ce-3', code: 'BIT-103', name: 'Programming in C', faculty: 'Ms. Niharika Singh (NiH) + Mr. Anand Kumar (AK)', min_threshold: 75 },
  { id: 'sub-ce-4', code: 'BCE-121', name: 'Engineering Graphics', faculty: 'Dr. Ravi Prakash Tripathi / Dr. Neeraj Chaubey / Ms. Mahima Modi / Ms. Anuradha', min_threshold: 75 },
  { id: 'sub-ce-5', code: 'BHS-101', name: 'Universal Human Values: Understanding Harmony', faculty: 'Dept. Faculty', min_threshold: 75 }
]

const CE_SEC_A_SLOTS = [
  // Monday
  makeSlot('ce-a-m1', 'sub-ce-2', 'BSM-131', 'Engineering Physics', 'Monday', '09:10', '10:00', 'TL-206', 'Lecture', 'ALL', 'L (MH)'),
  makeSlot('ce-a-m2', 'sub-ce-1', 'BSM-110', 'Engineering Mathematics I', 'Monday', '10:00', '10:50', 'TL-206', 'Lecture', 'ALL', 'L (MH)'),
  makeSlot('ce-a-m3', 'sub-ce-3', 'BIT-103', 'Programming in C', 'Monday', '10:50', '11:40', 'TL-206', 'Lecture', 'ALL', 'L (NiH)'),
  makeSlot('ce-a-m4', 'sub-ce-5', 'BHS-101', 'Universal Human Values', 'Monday', '15:30', '16:15', 'TL-206', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('ce-a-m5', 'sub-ce-1', 'BSM-110', 'Engineering Mathematics I', 'Monday', '16:15', '17:00', 'TL-206', 'Tutorial', 'P1', 'T1/BSM-110/UF/TL-206'),

  // Tuesday
  makeSlot('ce-a-t1', 'sub-ce-2', 'BSM-131', 'Engineering Physics', 'Tuesday', '09:10', '10:00', 'TL-206', 'Lecture', 'ALL', 'L (MH)'),
  makeSlot('ce-a-t2', 'sub-ce-1', 'BSM-110', 'Engineering Mathematics I', 'Tuesday', '10:00', '10:50', 'TL-206', 'Lecture', 'ALL', 'L (MH)'),
  makeSlot('ce-a-t3', 'sub-ce-5', 'BHS-101', 'Universal Human Values', 'Tuesday', '10:50', '11:40', 'TL-206', 'Tutorial', 'P1', 'T1/BHS-101/TL-206'),
  makeSlot('ce-a-t4', 'sub-ce-1', 'BSM-110', 'Engineering Mathematics I', 'Tuesday', '15:30', '16:15', 'TL-206', 'Tutorial', 'P2', 'T2/BSM-110/UF/TL-206'),

  // Wednesday
  makeSlot('ce-a-w1', 'sub-ce-2', 'BSM-131', 'Engineering Physics', 'Wednesday', '09:10', '10:00', 'TL-206', 'Lecture', 'ALL', 'L (MH)'),
  makeSlot('ce-a-w2', 'sub-ce-1', 'BSM-110', 'Engineering Mathematics I', 'Wednesday', '10:00', '10:50', 'TL-206', 'Lecture', 'ALL', 'L (MH)'),
  makeSlot('ce-a-w3', 'sub-ce-5', 'BHS-101', 'Universal Human Values', 'Wednesday', '10:50', '11:40', 'TL-206', 'Tutorial', 'P2', 'T2/BHS-101/TL-206'),
  makeSlot('ce-a-w4-p1', 'sub-ce-4', 'BCE-121', 'Engineering Graphics', 'Wednesday', '14:00', '17:00', 'L-104', 'Lab', 'P1', 'P/1/BCE-121 Graphics (RPT/SU)'),
  makeSlot('ce-a-w4-p2', 'sub-ce-2', 'BSM-131', 'Engineering Physics', 'Wednesday', '14:00', '15:30', 'Physics Lab', 'Lab', 'P2', 'P/2/BSM-131 Physics Lab'),

  // Thursday
  makeSlot('ce-a-th1-p2', 'sub-ce-3', 'BIT-103', 'Programming in C', 'Thursday', '09:10', '10:50', 'ITRC-02', 'Lab', 'P2', 'P/2/BIT-103/AK/ITRC-02'),
  makeSlot('ce-a-th2', 'sub-ce-3', 'BIT-103', 'Programming in C', 'Thursday', '10:50', '11:40', 'TL-206', 'Lecture', 'ALL', 'L (NiH)'),
  makeSlot('ce-a-th3-p2', 'sub-ce-4', 'BCE-121', 'Engineering Graphics', 'Thursday', '14:00', '17:00', 'L-104', 'Lab', 'P2', 'P/2/BCE-121 Graphics (MM/AD)'),
  makeSlot('ce-a-th3-p1', 'sub-ce-2', 'BSM-131', 'Engineering Physics', 'Thursday', '14:00', '15:30', 'Physics Lab', 'Lab', 'P1', 'P/1/BSM-131 Physics Lab'),

  // Friday
  makeSlot('ce-a-f1', 'sub-ce-3', 'BIT-103', 'Programming in C', 'Friday', '10:50', '11:40', 'TL-206', 'Lecture', 'ALL', 'L (NiH)'),
  makeSlot('ce-a-f2', 'sub-ce-5', 'BHS-101', 'Universal Human Values', 'Friday', '11:40', '12:30', 'TL-206', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('ce-a-f3', 'sub-ce-4', 'BCE-121', 'Engineering Graphics', 'Friday', '14:00', '15:30', 'TL-206', 'Lecture', 'ALL', 'L BCE-121 (NC)'),

  // Saturday
  makeSlot('ce-a-s1-p1', 'sub-ce-3', 'BIT-103', 'Programming in C', 'Saturday', '09:10', '10:50', 'ITRC-02', 'Lab', 'P1', 'P/1/BIT-103/AK/ITRC-02'),
  makeSlot('ce-a-s2', 'sub-ce-4', 'BCE-121', 'Engineering Graphics', 'Saturday', '10:50', '11:40', 'TL-206', 'Lecture', 'ALL', 'L BCE-121 (NC)'),
  makeSlot('ce-a-s3', 'sub-ce-5', 'BHS-101', 'Universal Human Values', 'Saturday', '11:40', '12:30', 'TL-206', 'Lecture', 'ALL', 'L BHS-101')
]

const CE_SEC_B_SLOTS = [
  // Monday
  makeSlot('ce-b-m1-p1', 'sub-ce-4', 'BCE-121', 'Engineering Graphics', 'Monday', '09:10', '12:30', 'L-104', 'Lab', 'P1', 'P/1/BCE-121 Graphics (RP/AKS)'),
  makeSlot('ce-b-m1-p2', 'sub-ce-2', 'BSM-131', 'Engineering Physics', 'Monday', '10:50', '12:30', 'Physics Lab', 'Lab', 'P2', 'P/2/BSM-131 Physics Lab'),
  makeSlot('ce-b-m2', 'sub-ce-3', 'BIT-103', 'Programming in C', 'Monday', '14:00', '14:45', 'TL-206', 'Lecture', 'ALL', 'L (NiH)'),
  makeSlot('ce-b-m3', 'sub-ce-4', 'BCE-121', 'Engineering Graphics', 'Monday', '14:45', '15:30', 'TL-206', 'Lecture', 'ALL', 'L BCE-121 (NC)'),

  // Tuesday
  makeSlot('ce-b-t1-p2', 'sub-ce-4', 'BCE-121', 'Engineering Graphics', 'Tuesday', '09:10', '12:30', 'L-104', 'Lab', 'P2', 'P/2/BCE-121 Graphics (DP/NC)'),
  makeSlot('ce-b-t1-p1', 'sub-ce-2', 'BSM-131', 'Engineering Physics', 'Tuesday', '10:50', '12:30', 'Physics Lab', 'Lab', 'P1', 'P/1/BSM-131 Physics Lab'),
  makeSlot('ce-b-t2', 'sub-ce-3', 'BIT-103', 'Programming in C', 'Tuesday', '14:00', '14:45', 'TL-206', 'Lecture', 'ALL', 'L (NiH)'),
  makeSlot('ce-b-t3', 'sub-ce-5', 'BHS-101', 'Universal Human Values', 'Tuesday', '14:45', '15:30', 'TL-206', 'Lecture', 'ALL', 'L BHS-101'),

  // Wednesday
  makeSlot('ce-b-w1-p2', 'sub-ce-3', 'BIT-103', 'Programming in C', 'Wednesday', '09:10', '10:50', 'ITRC-01', 'Lab', 'P2', 'P/2/BIT-103/NiH/ITRC-01'),
  makeSlot('ce-b-w2', 'sub-ce-3', 'BIT-103', 'Programming in C', 'Wednesday', '10:50', '11:40', 'TL-206', 'Lecture', 'ALL', 'L (NiH)'),
  makeSlot('ce-b-w3', 'sub-ce-1', 'BSM-110', 'Engineering Mathematics I', 'Wednesday', '14:45', '15:30', 'TL-206', 'Lecture', 'ALL', 'L (MH)'),
  makeSlot('ce-b-w4', 'sub-ce-5', 'BHS-101', 'Universal Human Values', 'Wednesday', '15:30', '16:15', 'TL-206', 'Lecture', 'ALL', 'L BHS-101'),

  // Thursday
  makeSlot('ce-b-th1', 'sub-ce-2', 'BSM-131', 'Engineering Physics', 'Thursday', '09:10', '10:00', 'TL-206', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('ce-b-th2', 'sub-ce-1', 'BSM-110', 'Engineering Mathematics I', 'Thursday', '10:00', '10:50', 'TL-206', 'Lecture', 'ALL', 'L (MH)'),
  makeSlot('ce-b-th3', 'sub-ce-5', 'BHS-101', 'Universal Human Values', 'Thursday', '14:00', '14:45', 'TL-206', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('ce-b-th4', 'sub-ce-5', 'BHS-101', 'Universal Human Values', 'Thursday', '14:45', '15:30', 'TL-206', 'Tutorial', 'P1', 'T1/BHS-101/TL-206'),
  makeSlot('ce-b-th5', 'sub-ce-1', 'BSM-110', 'Engineering Mathematics I', 'Thursday', '15:30', '16:15', 'TL-206', 'Tutorial', 'P1', 'T1/BSM-110/AKS/TL-206'),

  // Friday
  makeSlot('ce-b-f1', 'sub-ce-2', 'BSM-131', 'Engineering Physics', 'Friday', '09:10', '10:00', 'TL-206', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('ce-b-f2', 'sub-ce-1', 'BSM-110', 'Engineering Mathematics I', 'Friday', '10:00', '10:50', 'TL-206', 'Lecture', 'ALL', 'L (MH)'),
  makeSlot('ce-b-f3', 'sub-ce-4', 'BCE-121', 'Engineering Graphics', 'Friday', '14:45', '15:30', 'TL-206', 'Lecture', 'ALL', 'L BCE-121 (NC)'),
  makeSlot('ce-b-f4', 'sub-ce-5', 'BHS-101', 'Universal Human Values', 'Friday', '15:30', '16:15', 'TL-206', 'Tutorial', 'P2', 'T2/BHS-101/TL-206'),

  // Saturday
  makeSlot('ce-b-s1', 'sub-ce-2', 'BSM-131', 'Engineering Physics', 'Saturday', '09:10', '10:00', 'TL-206', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('ce-b-s2', 'sub-ce-1', 'BSM-110', 'Engineering Mathematics I', 'Saturday', '10:00', '10:50', 'TL-206', 'Tutorial', 'P2', 'T2/BSM-110/AKS/TL-206'),
  makeSlot('ce-b-s3-p1', 'sub-ce-3', 'BIT-103', 'Programming in C', 'Saturday', '10:50', '12:30', 'ITRC-01', 'Lab', 'P1', 'P/1/BIT-103/NiH/ITRC-01')
]

// --------------------------------------------------------------------------
// 2. COMPUTER SCIENCE & ENGINEERING (CSE) - Pages 3, 4, 5, 6 (SEC-A, B, C, D)
// --------------------------------------------------------------------------
const CSE_A_SUBJECTS = [
  { id: 'sub-cse-1', code: 'BSM-110', name: 'Engineering Mathematics-I', faculty: 'Dr. Kumari Kanta (KK) & Deepali Maurya (DM)', min_threshold: 75 },
  { id: 'sub-cse-2', code: 'BSM-131', name: 'Engineering Physics', faculty: 'Physics Dept.', min_threshold: 75 },
  { id: 'sub-cse-3', code: 'BCS-110', name: 'Introduction to C Programming', faculty: 'SKS, Vaibhavi / Harsh', min_threshold: 75 },
  { id: 'sub-cse-4', code: 'BCS-111', name: 'Web Designing-1', faculty: 'Dr. Meenu, Anushka / Shreyansh', min_threshold: 75 },
  { id: 'sub-cse-5', code: 'BHS-101', name: 'Universal Human Values: Understanding Harmony', faculty: 'Dept. Faculty', min_threshold: 75 }
]

const CSE_SEC_A_SLOTS = [
  // Monday
  makeSlot('cse-a-m1-p2', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Monday', '09:10', '10:50', 'Physics Lab', 'Lab', 'P2', 'P/2/BSM-131 Physics Lab'),
  makeSlot('cse-a-m2', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Monday', '10:50', '11:40', 'TL-109', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('cse-a-m3', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Monday', '11:40', '12:30', 'TL-109', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('cse-a-m4-p1', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Monday', '14:00', '17:00', 'ITRC-03', 'Lab', 'P1', 'P/1/BCS-111 (Dr. Meenu, Anushka)'),
  makeSlot('cse-a-m4-p2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Monday', '14:00', '15:30', 'ITRC-04', 'Lab', 'P2', 'P/2/BCS-110 (SKS, Vaibhavi)'),

  // Tuesday
  makeSlot('cse-a-t1-p1', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Tuesday', '09:10', '10:50', 'Physics Lab', 'Lab', 'P1', 'P/1/BSM-131 Physics Lab'),
  makeSlot('cse-a-t2', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Tuesday', '10:50', '11:40', 'TL-109', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('cse-a-t3', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Tuesday', '11:40', '12:30', 'TL-109', 'Lecture', 'ALL', 'L BCS-111 (Dr. Meenu)'),
  makeSlot('cse-a-t4-p2', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Tuesday', '14:00', '17:00', 'ITRC-03', 'Lab', 'P2', 'P/2/BCS-111 (Dr. Meenu, Shreyansh)'),

  // Wednesday
  makeSlot('cse-a-w1', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Wednesday', '10:50', '11:40', 'TL-109', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('cse-a-w2', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Wednesday', '11:40', '12:30', 'TL-109', 'Lecture', 'ALL', 'L BCS-111 (Dr. Meenu)'),

  // Thursday
  makeSlot('cse-a-th1', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Thursday', '09:10', '10:00', 'TL-109', 'Lecture', 'ALL', 'L BSM-110 (KK)'),
  makeSlot('cse-a-th2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Thursday', '10:00', '10:50', 'TL-109', 'Lecture', 'ALL', 'L BCS-110 (SKS)'),
  makeSlot('cse-a-th3-p1', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Thursday', '14:00', '14:45', 'TL-109', 'Tutorial', 'P1', 'T1/BSM-110/DM/TL-109'),
  makeSlot('cse-a-th4', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Thursday', '14:45', '15:30', 'TL-109', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('cse-a-th5-p1', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Thursday', '15:30', '16:15', 'TL-109', 'Tutorial', 'P1', 'T1/BHS-101/TL-109'),

  // Friday
  makeSlot('cse-a-f1', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Friday', '09:10', '10:00', 'TL-109', 'Lecture', 'ALL', 'L BSM-110 (KK)'),
  makeSlot('cse-a-f2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Friday', '10:00', '10:50', 'TL-109', 'Lecture', 'ALL', 'L BCS-110 (SKS)'),
  makeSlot('cse-a-f3', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Friday', '14:00', '14:45', 'TL-109', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('cse-a-f4-p2', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Friday', '14:45', '15:30', 'TL-109', 'Tutorial', 'P2', 'T2/BSM-110/DM/TL-109'),
  makeSlot('cse-a-f5-p2', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Friday', '15:30', '16:15', 'TL-109', 'Tutorial', 'P2', 'T2/BHS-101/TL-109'),

  // Saturday
  makeSlot('cse-a-s1', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Saturday', '09:10', '10:00', 'TL-109', 'Lecture', 'ALL', 'L BSM-110 (KK)'),
  makeSlot('cse-a-s2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Saturday', '10:00', '10:50', 'TL-109', 'Lecture', 'ALL', 'L BCS-110 (SKS)'),
  makeSlot('cse-a-s3-p1', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Saturday', '10:50', '12:30', 'ITRC-04', 'Lab', 'P1', 'P/1/BCS-110/ITRC-04/SKS, HARSH')
]

const CSE_SEC_B_SLOTS = [
  // Monday
  makeSlot('cse-b-m1', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Monday', '09:10', '10:00', 'TL-109', 'Lecture', 'ALL', 'L BSM-110 (KK)'),
  makeSlot('cse-b-m2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Monday', '10:00', '10:50', 'TL-109', 'Lecture', 'ALL', 'L BCS-110 (SKS)'),
  makeSlot('cse-b-m3-p1', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Monday', '10:50', '12:30', 'ITRC-04', 'Lab', 'P1', 'P/1/BCS-110 (SKS, MKS)'),
  makeSlot('cse-b-m4', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Monday', '14:00', '14:45', 'TL-109', 'Tutorial', 'P1', 'T1/BSM-110/SS/TL-109'),
  makeSlot('cse-b-m5', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Monday', '14:45', '15:30', 'TL-109', 'Lecture', 'ALL', 'L BHS-101'),

  // Tuesday
  makeSlot('cse-b-t1', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Tuesday', '09:10', '10:00', 'TL-109', 'Lecture', 'ALL', 'L BSM-110 (KK)'),
  makeSlot('cse-b-t2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Tuesday', '10:00', '10:50', 'TL-109', 'Lecture', 'ALL', 'L BCS-110 (SKS)'),
  makeSlot('cse-b-t3-p2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Tuesday', '10:50', '12:30', 'ITRC-04', 'Lab', 'P2', 'P/2/BCS-110 (SKS, MKS)'),
  makeSlot('cse-b-t4', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Tuesday', '14:00', '14:45', 'TL-109', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('cse-b-t5', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Tuesday', '14:45', '15:30', 'TL-109', 'Tutorial', 'P2', 'T2/BSM-110/SS/TL-109'),
  makeSlot('cse-b-t6', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Tuesday', '15:30', '16:15', 'TL-109', 'Tutorial', 'P2', 'T2/BHS-101/TL-109'),

  // Wednesday
  makeSlot('cse-b-w1', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Wednesday', '09:10', '10:00', 'TL-109', 'Lecture', 'ALL', 'L BSM-110 (KK)'),
  makeSlot('cse-b-w2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Wednesday', '10:00', '10:50', 'TL-109', 'Lecture', 'ALL', 'L BCS-110 (SKS)'),
  makeSlot('cse-b-w3', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Wednesday', '14:45', '15:30', 'TL-109', 'Lecture', 'ALL', 'L BCS-111'),

  // Thursday
  makeSlot('cse-b-th1', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Thursday', '10:50', '11:40', 'TL-109', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('cse-b-th2', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Thursday', '11:40', '12:30', 'TL-109', 'Lecture', 'ALL', 'L BCS-111 (Dr. Meenu)'),
  makeSlot('cse-b-th3-p1', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Thursday', '14:45', '17:00', 'ITRC-03', 'Lab', 'P1', 'P/1/BCS-111 (G6, VDB)'),

  // Friday
  makeSlot('cse-b-f1', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Friday', '10:50', '11:40', 'TL-109', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('cse-b-f2', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Friday', '11:40', '12:30', 'TL-109', 'Lecture', 'ALL', 'L BCS-111 (Dr. Meenu)'),
  makeSlot('cse-b-f3-p2', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Friday', '14:00', '17:00', 'ITRC-03', 'Lab', 'P2', 'P/2/BCS-111 (G1, VDB)'),
  makeSlot('cse-b-f4-p1', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Friday', '14:00', '15:30', 'Physics Lab', 'Lab', 'P1', 'P/1/BSM-131 Physics Lab'),

  // Saturday
  makeSlot('cse-b-s1-p2', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Saturday', '09:10', '10:50', 'Physics Lab', 'Lab', 'P2', 'P/2/BSM-131 Physics Lab'),
  makeSlot('cse-b-s2', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Saturday', '10:50', '11:40', 'TL-109', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('cse-b-s3', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Saturday', '11:40', '12:30', 'TL-109', 'Tutorial', 'P1', 'T1/BHS-101/TL-109')
]

const CSE_SEC_C_SLOTS = [
  // Monday
  makeSlot('cse-c-m1', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Monday', '10:50', '11:40', 'TL-201', 'Lecture', 'ALL', 'L BSM-110 (KK)'),
  makeSlot('cse-c-m2', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Monday', '11:40', '12:30', 'TL-201', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('cse-c-m3', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Monday', '14:45', '15:30', 'TL-201', 'Tutorial', 'P1', 'T1/BSM-110/NK/TL-201'),
  makeSlot('cse-c-m4', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Monday', '15:30', '16:15', 'TL-201', 'Tutorial', 'P2', 'T2/BHS-101/TL-201'),

  // Tuesday
  makeSlot('cse-c-t1-p2', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Tuesday', '09:10', '12:30', 'ITRC-02', 'Lab', 'P2', 'P/2/BCS-111 (G7, PS)'),
  makeSlot('cse-c-t1-p1', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Tuesday', '10:50', '12:30', 'ITRC-03', 'Lab', 'P1', 'P/1/BCS-110 (RAM, VAIBHAVI)'),
  makeSlot('cse-c-t2', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Tuesday', '14:00', '14:45', 'TL-201', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('cse-c-t3', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Tuesday', '14:45', '15:30', 'TL-201', 'Tutorial', 'P2', 'T2/BSM-110/NK/TL-201'),
  makeSlot('cse-c-t4', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Tuesday', '15:30', '16:15', 'TL-201', 'Tutorial', 'P1', 'T1/BHS-101/TL-201'),

  // Wednesday
  makeSlot('cse-c-w1', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Wednesday', '10:50', '11:40', 'TL-201', 'Lecture', 'ALL', 'L BSM-110 (KK)'),
  makeSlot('cse-c-w2', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Wednesday', '11:40', '12:30', 'TL-201', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('cse-c-w3-p1', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Wednesday', '14:00', '17:00', 'ITRC-02', 'Lab', 'P1', 'P/1/BCS-111 (G6, Divyanshi)'),

  // Thursday
  makeSlot('cse-c-th1', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Thursday', '09:10', '10:00', 'TL-201', 'Lecture', 'ALL', 'L BCS-111 (GF-6)'),
  makeSlot('cse-c-th2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Thursday', '10:00', '10:50', 'TL-201', 'Lecture', 'ALL', 'L BCS-110 (RAM)'),
  makeSlot('cse-c-th3-p1', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Thursday', '10:50', '12:30', 'Physics Lab', 'Lab', 'P1', 'P/1/BSM-131 Physics Lab'),
  makeSlot('cse-c-th4', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Thursday', '14:00', '14:45', 'TL-201', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('cse-c-th5', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Thursday', '14:45', '15:30', 'TL-201', 'Lecture', 'ALL', 'L BSM-131'),

  // Friday
  makeSlot('cse-c-f1', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Friday', '09:10', '10:00', 'TL-201', 'Lecture', 'ALL', 'L BCS-111 (GF-6)'),
  makeSlot('cse-c-f2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Friday', '10:00', '10:50', 'TL-201', 'Lecture', 'ALL', 'L BCS-110 (RAM)'),
  makeSlot('cse-c-f3', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Friday', '14:45', '15:30', 'TL-201', 'Lecture', 'ALL', 'L BSM-110 (KK)'),
  makeSlot('cse-c-f4-p2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Friday', '15:30', '17:00', 'ITRC-01', 'Lab', 'P2', 'P/2/BCS-110 (RAM, HARSH)'),

  // Saturday
  makeSlot('cse-c-s1', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Saturday', '09:10', '10:00', 'TL-201', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('cse-c-s2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Saturday', '10:00', '10:50', 'TL-201', 'Lecture', 'ALL', 'L BCS-110 (RAM)'),
  makeSlot('cse-c-s3-p2', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Saturday', '10:50', '12:30', 'Physics Lab', 'Lab', 'P2', 'P/2/BSM-131 Physics Lab')
]

const CSE_SEC_D_SLOTS = [
  // Monday
  makeSlot('cse-d-m1', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Monday', '09:10', '10:00', 'TL-201', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('cse-d-m2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Monday', '10:00', '10:50', 'TL-201', 'Lecture', 'ALL', 'L BCS-110 (RAM)'),
  makeSlot('cse-d-m3-p1', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Monday', '14:00', '17:00', 'ITRC-01', 'Lab', 'P1', 'P/1/BCS-111 (G6, AM)'),
  makeSlot('cse-d-m3-p2', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Monday', '14:00', '15:30', 'Physics Lab', 'Lab', 'P2', 'P/2/BSM-131 Physics Lab'),

  // Tuesday
  makeSlot('cse-d-t1', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Tuesday', '09:10', '10:00', 'TL-201', 'Lecture', 'ALL', 'L BCS-110 (RAM)'),
  makeSlot('cse-d-t2', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Tuesday', '10:00', '10:50', 'TL-201', 'Lecture', 'ALL', 'L BCS-111 (Dr. Meenu)'),
  makeSlot('cse-d-t3', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Tuesday', '10:50', '11:40', 'TL-201', 'Lecture', 'ALL', 'L BSM-110 (HP)'),
  makeSlot('cse-d-t4', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Tuesday', '11:40', '12:30', 'TL-201', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('cse-d-t5-p2', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Tuesday', '14:00', '17:00', 'ITRC-03', 'Lab', 'P2', 'P/2/BCS-111 (G7, SG)'),

  // Wednesday
  makeSlot('cse-d-w1', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Wednesday', '09:10', '10:00', 'TL-201', 'Lecture', 'ALL', 'L BCS-110 (RAM)'),
  makeSlot('cse-d-w2', 'sub-cse-4', 'BCS-111', 'Web Designing-1', 'Wednesday', '10:00', '10:50', 'TL-201', 'Lecture', 'ALL', 'L BCS-111 (Dr. Meenu)'),
  makeSlot('cse-d-w3-p1', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Wednesday', '10:50', '12:30', 'Physics Lab', 'Lab', 'P1', 'P/1/BSM-131 Physics Lab'),
  makeSlot('cse-d-w4-p1', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Wednesday', '14:00', '15:30', 'ITRC-04', 'Lab', 'P1', 'P/1/BCS-110 (RAM, MKS)'),

  // Thursday
  makeSlot('cse-d-th1', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Thursday', '10:50', '11:40', 'TL-201', 'Lecture', 'ALL', 'L BSM-110 (HP)'),
  makeSlot('cse-d-th2', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Thursday', '11:40', '12:30', 'TL-201', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('cse-d-th3', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Thursday', '15:30', '16:15', 'TL-201', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('cse-d-th4', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Thursday', '16:15', '17:00', 'TL-201', 'Tutorial', 'P1', 'T1/BHS-101/TL-201'),

  // Friday
  makeSlot('cse-d-f1', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Friday', '10:50', '11:40', 'TL-201', 'Lecture', 'ALL', 'L BSM-110 (HP)'),
  makeSlot('cse-d-f2', 'sub-cse-2', 'BSM-131', 'Engineering Physics', 'Friday', '11:40', '12:30', 'TL-201', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('cse-d-f3', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Friday', '15:30', '16:15', 'TL-201', 'Tutorial', 'P1', 'T1/BSM-110/SS/TL-201'),
  makeSlot('cse-d-f4', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Friday', '16:15', '17:00', 'TL-201', 'Tutorial', 'P2', 'T2/BHS-101/TL-201'),

  // Saturday
  makeSlot('cse-d-s1-p2', 'sub-cse-3', 'BCS-110', 'Introduction to C Programming', 'Saturday', '09:10', '10:50', 'ITRC-03', 'Lab', 'P2', 'P/2/BCS-110 (RAM, SKS)'),
  makeSlot('cse-d-s2', 'sub-cse-5', 'BHS-101', 'Universal Human Values', 'Saturday', '10:50', '11:40', 'TL-201', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('cse-d-s3', 'sub-cse-1', 'BSM-110', 'Engineering Mathematics-I', 'Saturday', '11:40', '12:30', 'TL-201', 'Tutorial', 'P2', 'T2/BSM-110/SS/TL-201')
]

// --------------------------------------------------------------------------
// 3. INFORMATION TECHNOLOGY (IT) - Pages 7 & 8 (SEC-A & SEC-B)
// --------------------------------------------------------------------------
const IT_SUBJECTS = [
  { id: 'sub-it-1', code: 'BSM-110', name: 'Engineering Mathematics I', faculty: 'Dr. Vinod Baniya (VB) & Khushboo Maurya / Disha Gupta', min_threshold: 75 },
  { id: 'sub-it-2', code: 'BSM-131', name: 'Engineering Physics', faculty: 'Physics Dept.', min_threshold: 75 },
  { id: 'sub-it-3', code: 'BIT-103', name: 'Programming in C', faculty: 'Prof. S P Singh + Mr. Dharmesh Sonkar', min_threshold: 75 },
  { id: 'sub-it-4', code: 'BIT-104', name: 'Internet and Web Designing', faculty: 'Ms. Nida Shakeel (NS) / Mr. Tejbahadur (TH)', min_threshold: 75 },
  { id: 'sub-it-5', code: 'BHS-101', name: 'Universal Human Values', faculty: 'Dept. Faculty', min_threshold: 75 }
]

const IT_SEC_A_SLOTS = [
  // Monday
  makeSlot('it-a-m1-p1', 'sub-it-4', 'BIT-104', 'Internet and Web Designing', 'Monday', '09:10', '12:30', 'ITRC-03', 'Lab', 'P1', 'P/1/BIT-104 (NS)'),
  makeSlot('it-a-m1-p2', 'sub-it-3', 'BIT-103', 'Programming in C', 'Monday', '09:10', '10:50', 'CL-02', 'Lab', 'P2', 'P/2/BIT-103 (DS)'),
  makeSlot('it-a-m2', 'sub-it-5', 'BHS-101', 'Universal Human Values', 'Monday', '14:00', '14:45', 'TL-203', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('it-a-m3', 'sub-it-2', 'BSM-131', 'Engineering Physics', 'Monday', '14:45', '15:30', 'TL-203', 'Lecture', 'ALL', 'L BSM-131'),

  // Tuesday
  makeSlot('it-a-t1-p2', 'sub-it-4', 'BIT-104', 'Internet and Web Designing', 'Tuesday', '09:10', '12:30', 'ITRC-03', 'Lab', 'P2', 'P/2/BIT-104 (NS)'),
  makeSlot('it-a-t1-p1', 'sub-it-3', 'BIT-103', 'Programming in C', 'Tuesday', '09:10', '10:50', 'CL-02', 'Lab', 'P1', 'P/1/BIT-103 (DS)'),
  makeSlot('it-a-t2', 'sub-it-5', 'BHS-101', 'Universal Human Values', 'Tuesday', '14:00', '14:45', 'TL-203', 'Lecture', 'ALL', 'L BHS-101'),

  // Wednesday
  makeSlot('it-a-w1', 'sub-it-1', 'BSM-110', 'Engineering Mathematics I', 'Wednesday', '09:10', '10:00', 'TL-203', 'Lecture', 'ALL', 'L BSM-110 (VB)'),
  makeSlot('it-a-w2', 'sub-it-3', 'BIT-103', 'Programming in C', 'Wednesday', '10:00', '10:50', 'TL-203', 'Lecture', 'ALL', 'L BIT-103 (SPS)'),
  makeSlot('it-a-w3', 'sub-it-4', 'BIT-104', 'Internet and Web Designing', 'Wednesday', '14:00', '14:45', 'TL-203', 'Lecture', 'ALL', 'L BIT-104 (NS)'),
  makeSlot('it-a-w4', 'sub-it-1', 'BSM-110', 'Engineering Mathematics I', 'Wednesday', '14:45', '15:30', 'TL-203', 'Tutorial', 'P2', 'T2/BSM-110/KM/TL-203'),
  makeSlot('it-a-w5-p2', 'sub-it-2', 'BSM-131', 'Engineering Physics', 'Wednesday', '15:30', '17:00', 'Physics Lab', 'Lab', 'P2', 'P/2/BSM-131 Physics Lab'),

  // Thursday
  makeSlot('it-a-th1', 'sub-it-1', 'BSM-110', 'Engineering Mathematics I', 'Thursday', '09:10', '10:00', 'TL-203', 'Lecture', 'ALL', 'L BSM-110 (VB)'),
  makeSlot('it-a-th2', 'sub-it-3', 'BIT-103', 'Programming in C', 'Thursday', '10:00', '10:50', 'TL-203', 'Lecture', 'ALL', 'L BIT-103 (SPS)'),
  makeSlot('it-a-th3', 'sub-it-1', 'BSM-110', 'Engineering Mathematics I', 'Thursday', '14:00', '14:45', 'TL-203', 'Tutorial', 'P1', 'T1/BSM-110/KM/TL-203'),
  makeSlot('it-a-th4', 'sub-it-5', 'BHS-101', 'Universal Human Values', 'Thursday', '14:45', '15:30', 'TL-203', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('it-a-th5', 'sub-it-5', 'BHS-101', 'Universal Human Values', 'Thursday', '15:30', '16:15', 'TL-203', 'Tutorial', 'P1', 'T1/BHS-101/TL-203'),

  // Friday
  makeSlot('it-a-f1', 'sub-it-2', 'BSM-131', 'Engineering Physics', 'Friday', '10:50', '11:40', 'TL-203', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('it-a-f2', 'sub-it-3', 'BIT-103', 'Programming in C', 'Friday', '11:40', '12:30', 'TL-203', 'Lecture', 'ALL', 'L BIT-103 (SPS)'),
  makeSlot('it-a-f3', 'sub-it-5', 'BHS-101', 'Universal Human Values', 'Friday', '14:00', '14:45', 'TL-203', 'Tutorial', 'P2', 'T2/BHS-101/TL-203'),
  makeSlot('it-a-f4', 'sub-it-1', 'BSM-110', 'Engineering Mathematics I', 'Friday', '14:45', '15:30', 'TL-203', 'Lecture', 'ALL', 'L BSM-110 (VB)'),
  makeSlot('it-a-f5-p1', 'sub-it-2', 'BSM-131', 'Engineering Physics', 'Friday', '15:30', '17:00', 'Physics Lab', 'Lab', 'P1', 'P/1/BSM-131 Physics Lab'),

  // Saturday
  makeSlot('it-a-s1', 'sub-it-2', 'BSM-131', 'Engineering Physics', 'Saturday', '10:50', '11:40', 'TL-203', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('it-a-s2', 'sub-it-4', 'BIT-104', 'Internet and Web Designing', 'Saturday', '11:40', '12:30', 'TL-203', 'Lecture', 'ALL', 'L BIT-104 (NS)')
]

const IT_SEC_B_SLOTS = [
  // Monday
  makeSlot('it-b-m1', 'sub-it-1', 'BSM-110', 'Engineering Mathematics I', 'Monday', '09:10', '10:00', 'TL-203', 'Lecture', 'ALL', 'L BSM-110 (VB)'),
  makeSlot('it-b-m2', 'sub-it-3', 'BIT-103', 'Programming in C', 'Monday', '10:00', '10:50', 'TL-203', 'Lecture', 'ALL', 'L BIT-103 (SPS)'),
  makeSlot('it-b-m3', 'sub-it-2', 'BSM-131', 'Engineering Physics', 'Monday', '10:50', '11:40', 'TL-203', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('it-b-m4', 'sub-it-5', 'BHS-101', 'Universal Human Values', 'Monday', '11:40', '12:30', 'TL-203', 'Lecture', 'ALL', 'L BHS-101'),

  // Tuesday
  makeSlot('it-b-t1', 'sub-it-1', 'BSM-110', 'Engineering Mathematics I', 'Tuesday', '09:10', '10:00', 'TL-203', 'Lecture', 'ALL', 'L BSM-110 (VB)'),
  makeSlot('it-b-t2', 'sub-it-3', 'BIT-103', 'Programming in C', 'Tuesday', '10:00', '10:50', 'TL-203', 'Lecture', 'ALL', 'L BIT-103 (SPS)'),
  makeSlot('it-b-t3', 'sub-it-2', 'BSM-131', 'Engineering Physics', 'Tuesday', '10:50', '11:40', 'TL-110', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('it-b-t4', 'sub-it-5', 'BHS-101', 'Universal Human Values', 'Tuesday', '15:30', '16:15', 'TL-203', 'Tutorial', 'P2', 'T2/BHS-101/TL-203'),
  makeSlot('it-b-t5', 'sub-it-1', 'BSM-110', 'Engineering Mathematics I', 'Tuesday', '16:15', '17:00', 'TL-203', 'Tutorial', 'P1', 'T1/BSM-110/DG/TL-203'),

  // Wednesday
  makeSlot('it-b-w1-p1', 'sub-it-2', 'BSM-131', 'Engineering Physics', 'Wednesday', '09:10', '10:50', 'Physics Lab', 'Lab', 'P1', 'P/1/BSM-131 Physics Lab'),
  makeSlot('it-b-w2', 'sub-it-2', 'BSM-131', 'Engineering Physics', 'Wednesday', '10:50', '11:40', 'TL-203', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('it-b-w3', 'sub-it-5', 'BHS-101', 'Universal Human Values', 'Wednesday', '11:40', '12:30', 'TL-203', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('it-b-w4-p1', 'sub-it-4', 'BIT-104', 'Internet and Web Designing', 'Wednesday', '14:00', '17:00', 'ITRC-03', 'Lab', 'P1', 'P/1/BIT-104 (TH)'),
  makeSlot('it-b-w4-p2', 'sub-it-3', 'BIT-103', 'Programming in C', 'Wednesday', '14:00', '15:30', 'CL-02', 'Lab', 'P2', 'P/2/BIT-103 (SPS/DS)'),

  // Thursday
  makeSlot('it-b-th1-p2', 'sub-it-2', 'BSM-131', 'Engineering Physics', 'Thursday', '09:10', '10:50', 'Physics Lab', 'Lab', 'P2', 'P/2/BSM-131 Physics Lab'),
  makeSlot('it-b-th2', 'sub-it-1', 'BSM-110', 'Engineering Mathematics I', 'Thursday', '10:50', '11:40', 'TL-203', 'Lecture', 'ALL', 'L BSM-110 (VB)'),
  makeSlot('it-b-th3', 'sub-it-5', 'BHS-101', 'Universal Human Values', 'Thursday', '11:40', '12:30', 'TL-203', 'Tutorial', 'P2', 'T2/BHS-101/TL-203'),
  makeSlot('it-b-th4-p2', 'sub-it-4', 'BIT-104', 'Internet and Web Designing', 'Thursday', '14:00', '17:00', 'ITRC-02', 'Lab', 'P2', 'P/2/BIT-104 (TH)'),

  // Friday
  makeSlot('it-b-f1', 'sub-it-3', 'BIT-103', 'Programming in C', 'Friday', '09:10', '10:00', 'TL-203', 'Lecture', 'ALL', 'L BIT-103 (SPS)'),
  makeSlot('it-b-f2', 'sub-it-1', 'BSM-110', 'Engineering Mathematics I', 'Friday', '10:00', '10:50', 'TL-203', 'Tutorial', 'P2', 'T2/BSM-110/DG/TL-203'),
  makeSlot('it-b-f3', 'sub-it-4', 'BIT-104', 'Internet and Web Designing', 'Friday', '15:30', '16:15', 'TL-203', 'Lecture', 'ALL', 'L BIT-104 (TH)'),

  // Saturday
  makeSlot('it-b-s1', 'sub-it-4', 'BIT-104', 'Internet and Web Designing', 'Saturday', '09:10', '10:00', 'TL-203', 'Lecture', 'ALL', 'L BIT-104 (TH)'),
  makeSlot('it-b-s2', 'sub-it-5', 'BHS-101', 'Universal Human Values', 'Saturday', '10:00', '10:50', 'TL-203', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('it-b-s3-p1', 'sub-it-3', 'BIT-103', 'Programming in C', 'Saturday', '10:50', '12:30', 'CL-02', 'Lab', 'P1', 'P/1/BIT-103 (SPS/DS)')
]

// --------------------------------------------------------------------------
// 4. CHEMICAL ENGINEERING (CHE) - Page 9 (SEC-A)
// --------------------------------------------------------------------------
const CHE_SUBJECTS = [
  { id: 'sub-che-1', code: 'BSM-110', name: 'Engineering Mathematics -I', faculty: 'Dr. Vinod Baniya (VB) & Abhinav Gaur (AG)', min_threshold: 75 },
  { id: 'sub-che-2', code: 'BSM-131', name: 'Engineering Physics', faculty: 'Physics Dept.', min_threshold: 75 },
  { id: 'sub-che-3', code: 'BIT-103', name: 'Programming in C', faculty: 'Mr. Amritesh Kumar Gupta (AKG)', min_threshold: 75 },
  { id: 'sub-che-4', code: 'BME-101', name: 'Manufacturing Techniques Workshop', faculty: 'Workshop Dept.', min_threshold: 75 },
  { id: 'sub-che-5', code: 'BHS-101', name: 'Universal Human Values', faculty: 'Dept. Faculty', min_threshold: 75 }
]

const CHE_SEC_A_SLOTS = [
  // Monday
  makeSlot('che-a-m1', 'sub-che-2', 'BSM-131', 'Engineering Physics', 'Monday', '10:00', '10:50', 'TL-110', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('che-a-m2', 'sub-che-1', 'BSM-110', 'Engineering Mathematics -I', 'Monday', '10:50', '11:40', 'TL-110', 'Lecture', 'ALL', 'L BSM-110 (VB)'),
  makeSlot('che-a-m3-p2', 'sub-che-2', 'BSM-131', 'Engineering Physics', 'Monday', '15:30', '17:00', 'Physics Lab', 'Lab', 'P2', 'P/2/BSM-131 Physics Lab'),

  // Tuesday
  makeSlot('che-a-t1', 'sub-che-2', 'BSM-131', 'Engineering Physics', 'Tuesday', '10:00', '10:50', 'TL-110', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('che-a-t2', 'sub-che-1', 'BSM-110', 'Engineering Mathematics -I', 'Tuesday', '10:50', '11:40', 'TL-110', 'Lecture', 'ALL', 'L BSM-110 (VB)'),
  makeSlot('che-a-t3-p1', 'sub-che-2', 'BSM-131', 'Engineering Physics', 'Tuesday', '14:00', '15:30', 'Physics Lab', 'Lab', 'P1', 'P/1/BSM-131 Physics Lab'),
  makeSlot('che-a-t4', 'sub-che-1', 'BSM-110', 'Engineering Mathematics -I', 'Tuesday', '15:30', '16:15', 'TL-110', 'Tutorial', 'P1', 'T/1/BSM-110/AG/TL-110'),

  // Wednesday
  makeSlot('che-a-w1-p2', 'sub-che-3', 'BIT-103', 'Programming in C', 'Wednesday', '09:10', '10:50', 'ITRC-02', 'Lab', 'P2', 'P/2/BIT-103/AKG/ITRC-02'),
  makeSlot('che-a-w2-p1', 'sub-che-4', 'BME-101', 'Manufacturing Workshop', 'Wednesday', '10:00', '12:30', 'Central Workshop', 'Workshop', 'P1', 'P/1/BME-104 Workshop Practice'),
  makeSlot('che-a-w3', 'sub-che-3', 'BIT-103', 'Programming in C', 'Wednesday', '14:45', '15:30', 'TL-110', 'Lecture', 'ALL', 'L BIT-103 (AKG)'),
  makeSlot('che-a-w4', 'sub-che-5', 'BHS-101', 'Universal Human Values', 'Wednesday', '15:30', '16:15', 'TL-110', 'Tutorial', 'P1', 'T/1/BHS-101/TL-110'),

  // Thursday
  makeSlot('che-a-th1', 'sub-che-2', 'BSM-131', 'Engineering Physics', 'Thursday', '10:00', '10:50', 'TL-110', 'Lecture', 'ALL', 'L BSM-131'),
  makeSlot('che-a-th2', 'sub-che-5', 'BHS-101', 'Universal Human Values', 'Thursday', '10:50', '11:40', 'TL-110', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('che-a-th3', 'sub-che-3', 'BIT-103', 'Programming in C', 'Thursday', '11:40', '12:30', 'TL-110', 'Lecture', 'ALL', 'L BIT-103 (AKG)'),
  makeSlot('che-a-th4-p2', 'sub-che-4', 'BME-101', 'Manufacturing Workshop', 'Thursday', '14:00', '17:00', 'Central Workshop', 'Workshop', 'P2', 'P/2/BME-104 Workshop Practice'),

  // Friday
  makeSlot('che-a-f1', 'sub-che-1', 'BSM-110', 'Engineering Mathematics -I', 'Friday', '10:00', '10:50', 'TL-110', 'Lecture', 'ALL', 'L BSM-110 (VB)'),
  makeSlot('che-a-f2', 'sub-che-5', 'BHS-101', 'Universal Human Values', 'Friday', '10:50', '11:40', 'TL-110', 'Lecture', 'ALL', 'L BHS-101'),
  makeSlot('che-a-f3', 'sub-che-3', 'BIT-103', 'Programming in C', 'Friday', '11:40', '12:30', 'TL-110', 'Lecture', 'ALL', 'L BIT-103 (AKG)'),
  makeSlot('che-a-f4', 'sub-che-4', 'BME-101', 'Manufacturing Workshop', 'Friday', '14:00', '15:30', 'TL-110', 'Lecture', 'ALL', 'L BME-101'),
  makeSlot('che-a-f5', 'sub-che-1', 'BSM-110', 'Engineering Mathematics -I', 'Friday', '14:45', '15:30', 'TL-110', 'Tutorial', 'P2', 'T/2/BSM-110/AG/TL-110'),
  makeSlot('che-a-f6', 'sub-che-5', 'BHS-101', 'Universal Human Values', 'Friday', '15:30', '16:15', 'TL-110', 'Tutorial', 'P2', 'T/2/BHS-101/TL-110'),

  // Saturday
  makeSlot('che-a-s1-p1', 'sub-che-3', 'BIT-103', 'Programming in C', 'Saturday', '09:10', '10:50', 'ITRC-01', 'Lab', 'P1', 'P/1/BIT-103/AKG/ITRC-01'),
  makeSlot('che-a-s2', 'sub-che-4', 'BME-101', 'Manufacturing Workshop', 'Saturday', '10:50', '11:40', 'TL-110', 'Lecture', 'ALL', 'L BME-101'),
  makeSlot('che-a-s3', 'sub-che-5', 'BHS-101', 'Universal Human Values', 'Saturday', '11:40', '12:30', 'TL-110', 'Lecture', 'ALL', 'L BHS-101')
]

// --------------------------------------------------------------------------
// 5. MECHANICAL ENGINEERING (ME) - Pages 10 & 11 (SEC-A & SEC-B)
// --------------------------------------------------------------------------
const ME_SUBJECTS = [
  { id: 'sub-me-1', code: 'BSM-110', name: 'Engineering Mathematics-1', faculty: 'Dr. Sajjan Lal (SL) & Mr. Vijay Pratap / Nidhi Verma', min_threshold: 75 },
  { id: 'sub-me-2', code: 'BSM-140', name: 'Environmental Science and Green Chemistry', faculty: 'RKY, CL, Preeti & RS', min_threshold: 75 },
  { id: 'sub-me-3', code: 'BEE-110', name: 'Basic Electrical Engineering', faculty: 'Dr Shekhar Yadav (SY)/Monu (M)/Dr Prabhakar Tiwari', min_threshold: 75 },
  { id: 'sub-me-4', code: 'BME-104', name: 'Manufacturing Practice Workshop', faculty: 'PSY/Nistha, Anjani Kumar Singh/Dr. Kuldeep Kumar/Anuj', min_threshold: 75 },
  { id: 'sub-me-5', code: 'BHS-102', name: 'Technical Writing and Professional Communication', faculty: 'Dept. Faculty', min_threshold: 75 }
]

const ME_SEC_A_SLOTS = [
  // Monday
  makeSlot('me-a-m1', 'sub-me-1', 'BSM-110', 'Engineering Mathematics-1', 'Monday', '09:10', '10:00', 'TL-205', 'Lecture', 'ALL', 'L (SL)'),
  makeSlot('me-a-m2', 'sub-me-3', 'BEE-110', 'Basic Electrical Engineering', 'Monday', '10:00', '10:50', 'TL-205', 'Lecture', 'ALL', 'L (SY)'),
  makeSlot('me-a-m3', 'sub-me-2', 'BSM-140', 'Environmental Science', 'Monday', '10:50', '11:40', 'TL-205', 'Lecture', 'ALL', 'L (RKY)'),
  makeSlot('me-a-m4-p2', 'sub-me-2', 'BSM-140', 'Environmental Science', 'Monday', '14:00', '15:30', 'Chemistry Lab', 'Lab', 'P2', 'P/2 Chemistry Lab'),
  makeSlot('me-a-m4-p1', 'sub-me-5', 'BHS-102', 'Technical Writing', 'Monday', '14:00', '15:30', 'Language Lab', 'Lab', 'P1', 'P/1 Language Lab'),

  // Tuesday
  makeSlot('me-a-t1-p2', 'sub-me-4', 'BME-104', 'Manufacturing Practice', 'Tuesday', '09:10', '12:30', 'Central Workshop', 'Workshop', 'P2', 'P/2 Workshop (PSY/Nistha)'),
  makeSlot('me-a-t2-p1', 'sub-me-2', 'BSM-140', 'Environmental Science', 'Tuesday', '14:00', '15:30', 'Chemistry Lab', 'Lab', 'P1', 'P/1 Chemistry Lab (CL, Preeti)'),
  makeSlot('me-a-t3', 'sub-me-2', 'BSM-140', 'Environmental Science', 'Tuesday', '15:30', '16:15', 'TL-205', 'Lecture', 'ALL', 'L (RKY)'),
  makeSlot('me-a-t4-p2', 'sub-me-5', 'BHS-102', 'Technical Writing', 'Tuesday', '16:15', '17:00', 'TL-205', 'Tutorial', 'P2', 'T2 BHS-102 Tutorial'),

  // Wednesday
  makeSlot('me-a-w1', 'sub-me-2', 'BSM-140', 'Environmental Science', 'Wednesday', '09:10', '10:00', 'TL-205', 'Lecture', 'ALL', 'L (RKY)'),
  makeSlot('me-a-w2', 'sub-me-4', 'BME-104', 'Manufacturing Practice', 'Wednesday', '10:00', '10:50', 'TL-205', 'Lecture', 'ALL', 'L (MG)'),
  makeSlot('me-a-w3-p1', 'sub-me-3', 'BEE-110', 'Basic Electrical Engineering', 'Wednesday', '14:00', '15:30', 'Electrical Lab', 'Lab', 'P1', 'P/1 Electrical Lab (SY/M)'),
  makeSlot('me-a-w4', 'sub-me-5', 'BHS-102', 'Technical Writing', 'Wednesday', '15:30', '16:15', 'TL-205', 'Lecture', 'ALL', 'L BHS-102'),
  makeSlot('me-a-w5-p2', 'sub-me-1', 'BSM-110', 'Engineering Mathematics-1', 'Wednesday', '16:15', '17:00', 'TL-205', 'Tutorial', 'P2', 'T2 Maths Tutorial (VP)'),

  // Thursday
  makeSlot('me-a-th1', 'sub-me-1', 'BSM-110', 'Engineering Mathematics-1', 'Thursday', '09:10', '10:00', 'TL-205', 'Lecture', 'ALL', 'L (SL)'),
  makeSlot('me-a-th2', 'sub-me-3', 'BEE-110', 'Basic Electrical Engineering', 'Thursday', '10:00', '10:50', 'TL-205', 'Lecture', 'ALL', 'L (SY)'),
  makeSlot('me-a-th3', 'sub-me-4', 'BME-104', 'Manufacturing Practice', 'Thursday', '14:00', '14:45', 'TL-205', 'Lecture', 'ALL', 'L (MG)'),
  makeSlot('me-a-th4-p1', 'sub-me-1', 'BSM-110', 'Engineering Mathematics-1', 'Thursday', '14:45', '15:30', 'TL-205', 'Tutorial', 'P1', 'T1 Maths Tutorial (VP)'),

  // Friday
  makeSlot('me-a-f1', 'sub-me-1', 'BSM-110', 'Engineering Mathematics-1', 'Friday', '09:10', '10:00', 'TL-205', 'Lecture', 'ALL', 'L (SL)'),
  makeSlot('me-a-f2', 'sub-me-3', 'BEE-110', 'Basic Electrical Engineering', 'Friday', '10:00', '10:50', 'TL-205', 'Lecture', 'ALL', 'L (SY)'),
  makeSlot('me-a-f3-p2', 'sub-me-5', 'BHS-102', 'Technical Writing', 'Friday', '14:00', '14:45', 'Language Lab', 'Lab', 'P2', 'P/2 Language Lab'),
  makeSlot('me-a-f4-p1', 'sub-me-4', 'BME-104', 'Manufacturing Practice', 'Friday', '14:00', '17:00', 'Central Workshop', 'Workshop', 'P1', 'P/1 Workshop (Anjani Kr. Singh)'),

  // Saturday
  makeSlot('me-a-s1', 'sub-me-5', 'BHS-102', 'Technical Writing', 'Saturday', '09:10', '10:00', 'TL-205', 'Lecture', 'ALL', 'L BHS-102'),
  makeSlot('me-a-s2-p1', 'sub-me-5', 'BHS-102', 'Technical Writing', 'Saturday', '10:00', '10:50', 'TL-205', 'Tutorial', 'P1', 'T1 Comm Tutorial'),
  makeSlot('me-a-s3-p2', 'sub-me-3', 'BEE-110', 'Basic Electrical Engineering', 'Saturday', '10:50', '12:30', 'Electrical Lab', 'Lab', 'P2', 'P/2 Electrical Lab (SY/M)')
]

const ME_SEC_B_SLOTS = [
  // Monday
  makeSlot('me-b-m1-p2', 'sub-me-2', 'BSM-140', 'Environmental Science', 'Monday', '09:10', '10:50', 'Chemistry Lab', 'Lab', 'P2', 'P/2 Chemistry Lab (Preeti & RS)'),
  makeSlot('me-b-m2-p1', 'sub-me-4', 'BME-104', 'Manufacturing Practice', 'Monday', '09:10', '12:30', 'Central Workshop', 'Workshop', 'P1', 'P/1 Workshop (Anjani Kr. Singh)'),
  makeSlot('me-b-m3', 'sub-me-5', 'BHS-102', 'Technical Writing', 'Monday', '14:00', '14:45', 'TL-205', 'Lecture', 'ALL', 'L BHS-102'),
  makeSlot('me-b-m4', 'sub-me-3', 'BEE-110', 'Basic Electrical Engineering', 'Monday', '14:45', '15:30', 'TL-205', 'Lecture', 'ALL', 'L (SY)'),
  makeSlot('me-b-m5-p1', 'sub-me-1', 'BSM-110', 'Engineering Mathematics-1', 'Monday', '15:30', '16:15', 'TL-205', 'Tutorial', 'P1', 'T1/BSM-110/NV/TL-205'),

  // Tuesday
  makeSlot('me-b-t1', 'sub-me-1', 'BSM-110', 'Engineering Mathematics-1', 'Tuesday', '09:10', '10:00', 'TL-205', 'Lecture', 'ALL', 'L (SL)'),
  makeSlot('me-b-t2', 'sub-me-3', 'BEE-110', 'Basic Electrical Engineering', 'Tuesday', '10:00', '10:50', 'TL-205', 'Lecture', 'ALL', 'L (SY)'),
  makeSlot('me-b-t3', 'sub-me-2', 'BSM-140', 'Environmental Science', 'Tuesday', '10:50', '11:40', 'TL-205', 'Lecture', 'ALL', 'L (RKY)'),
  makeSlot('me-b-t4', 'sub-me-4', 'BME-104', 'Manufacturing Practice', 'Tuesday', '11:40', '12:30', 'TL-205', 'Lecture', 'ALL', 'L (MG)'),
  makeSlot('me-b-t5-p2', 'sub-me-4', 'BME-104', 'Manufacturing Practice', 'Tuesday', '14:45', '17:00', 'Central Workshop', 'Workshop', 'P2', 'P/2 Workshop (PSY/Nistha)'),

  // Wednesday
  makeSlot('me-b-w1', 'sub-me-2', 'BSM-140', 'Environmental Science', 'Wednesday', '10:50', '11:40', 'TL-205', 'Lecture', 'ALL', 'L (RKY)'),
  makeSlot('me-b-w2', 'sub-me-5', 'BHS-102', 'Technical Writing', 'Wednesday', '11:40', '12:30', 'TL-205', 'Lecture', 'ALL', 'L BHS-102'),

  // Thursday
  makeSlot('me-b-th1-p1', 'sub-me-3', 'BEE-110', 'Basic Electrical Engineering', 'Thursday', '09:10', '10:50', 'Electrical Lab', 'Lab', 'P1', 'P/1 Electrical Lab (M/PT)'),
  makeSlot('me-b-th2', 'sub-me-2', 'BSM-140', 'Environmental Science', 'Thursday', '10:50', '11:40', 'TL-205', 'Lecture', 'ALL', 'L (RKY)'),
  makeSlot('me-b-th3', 'sub-me-4', 'BME-104', 'Manufacturing Practice', 'Thursday', '11:40', '12:30', 'TL-205', 'Lecture', 'ALL', 'L (MG)'),
  makeSlot('me-b-th4-p2', 'sub-me-5', 'BHS-102', 'Technical Writing', 'Thursday', '14:00', '15:30', 'Language Lab', 'Lab', 'P2', 'P/2 Language Lab'),
  makeSlot('me-b-th5-p2', 'sub-me-1', 'BSM-110', 'Engineering Mathematics-1', 'Thursday', '15:30', '16:15', 'TL-205', 'Tutorial', 'P2', 'T2/BSM-110/NV/TL-205'),

  // Friday
  makeSlot('me-b-f1-p1', 'sub-me-5', 'BHS-102', 'Technical Writing', 'Friday', '09:10', '10:50', 'Language Lab', 'Lab', 'P1', 'P/1 Language Lab'),
  makeSlot('me-b-f2', 'sub-me-1', 'BSM-110', 'Engineering Mathematics-1', 'Friday', '10:50', '11:40', 'TL-205', 'Lecture', 'ALL', 'L (SL)'),
  makeSlot('me-b-f3', 'sub-me-3', 'BEE-110', 'Basic Electrical Engineering', 'Friday', '11:40', '12:30', 'TL-205', 'Lecture', 'ALL', 'L (SY)'),
  makeSlot('me-b-f4-p1', 'sub-me-2', 'BSM-140', 'Environmental Science', 'Friday', '14:00', '15:30', 'Chemistry Lab', 'Lab', 'P1', 'P/1 Chemistry Lab (Preeti & RS)'),
  makeSlot('me-b-f5-p1', 'sub-me-5', 'BHS-102', 'Technical Writing', 'Friday', '15:30', '16:15', 'TL-205', 'Tutorial', 'P1', 'T1/BHS-102/TL-205'),

  // Saturday
  makeSlot('me-b-s1-p2', 'sub-me-3', 'BEE-110', 'Basic Electrical Engineering', 'Saturday', '09:10', '10:50', 'Electrical Lab', 'Lab', 'P2', 'P/2 Electrical Lab (SY/M)'),
  makeSlot('me-b-s2', 'sub-me-1', 'BSM-110', 'Engineering Mathematics-1', 'Saturday', '10:50', '11:40', 'TL-205', 'Lecture', 'ALL', 'L (SL)'),
  makeSlot('me-b-s3-p2', 'sub-me-5', 'BHS-102', 'Technical Writing', 'Saturday', '11:40', '12:30', 'TL-205', 'Tutorial', 'P2', 'T2/BHS-102/TL-205')
]

// --------------------------------------------------------------------------
// 6. ELECTRICAL ENGINEERING (EE) - Pages 12 & 13 (SEC-A & SEC-B)
// --------------------------------------------------------------------------
const EE_SUBJECTS = [
  { id: 'sub-ee-1', code: 'BSM-110', name: 'Engineering Mathematics I', faculty: 'Dr. Amit Kumar Barnwal (AKB) & Rohit Kasera / Vivek Kushwaha', min_threshold: 75 },
  { id: 'sub-ee-2', code: 'BSM-140', name: 'Environmental Science and Green Chemistry', faculty: 'PS, SJ, Preeti, CL & RS', min_threshold: 75 },
  { id: 'sub-ee-3', code: 'BEE-110', name: 'Basic Electrical Engineering', faculty: 'Dr. Awadhesh Kumar (AK) / Dr Rohit Babu (RB) / Utkarsh Shukla (US)', min_threshold: 75 },
  { id: 'sub-ee-4', code: 'BEE-108A', name: 'Electrical Wiring & Estimation', faculty: 'Mr K B Sahay (KBS) / Dr Bindeshwar Singh (BS) / Dr Amit Verma (AV)', min_threshold: 75 },
  { id: 'sub-ee-5', code: 'BHS-102', name: 'Technical Writing and Professional Communication', faculty: 'Dept. Faculty', min_threshold: 75 }
]

const EE_SEC_A_SLOTS = [
  // Monday
  makeSlot('ee-a-m1', 'sub-ee-2', 'BSM-140', 'Environmental Science', 'Monday', '09:10', '10:00', 'TL-202', 'Lecture', 'ALL', 'L (PS)'),
  makeSlot('ee-a-m2', 'sub-ee-1', 'BSM-110', 'Engineering Mathematics I', 'Monday', '10:00', '10:50', 'TL-202', 'Lecture', 'ALL', 'L (AKB)'),
  makeSlot('ee-a-m3-p1', 'sub-ee-4', 'BEE-108A', 'Electrical Wiring', 'Monday', '14:00', '15:30', 'Wiring Lab', 'Lab', 'P1', 'P/1/BEE-108A (KBS/RSG)'),
  makeSlot('ee-a-m4', 'sub-ee-5', 'BHS-102', 'Technical Writing', 'Monday', '15:30', '16:15', 'TL-202', 'Tutorial', 'P2', 'T2/BHS-102/TL-202'),

  // Tuesday
  makeSlot('ee-a-t1', 'sub-ee-3', 'BEE-110', 'Basic Electrical Engineering', 'Tuesday', '10:50', '11:40', 'TL-202', 'Lecture', 'ALL', 'L (AK)'),
  makeSlot('ee-a-t2', 'sub-ee-5', 'BHS-102', 'Technical Writing', 'Tuesday', '11:40', '12:30', 'TL-202', 'Lecture', 'ALL', 'L BHS-102'),
  makeSlot('ee-a-t3', 'sub-ee-5', 'BHS-102', 'Technical Writing', 'Tuesday', '15:30', '16:15', 'TL-202', 'Lecture', 'ALL', 'L BHS-102'),

  // Wednesday
  makeSlot('ee-a-w1-p1', 'sub-ee-5', 'BHS-102', 'Technical Writing', 'Wednesday', '09:10', '10:50', 'Language Lab', 'Lab', 'P1', 'P/1/BHS-102 Lab'),
  makeSlot('ee-a-w2', 'sub-ee-3', 'BEE-110', 'Basic Electrical Engineering', 'Wednesday', '10:50', '11:40', 'TL-202', 'Lecture', 'ALL', 'L (AK)'),
  makeSlot('ee-a-w3', 'sub-ee-4', 'BEE-108A', 'Electrical Wiring', 'Wednesday', '11:40', '12:30', 'TL-202', 'Lecture', 'ALL', 'L (KBS)'),
  makeSlot('ee-a-w4', 'sub-ee-1', 'BSM-110', 'Engineering Mathematics I', 'Wednesday', '14:45', '15:30', 'TL-202', 'Tutorial', 'P2', 'T2/BSM-110/RK/TL-202'),
  makeSlot('ee-a-w5', 'sub-ee-5', 'BHS-102', 'Technical Writing', 'Wednesday', '15:30', '16:15', 'TL-202', 'Tutorial', 'P1', 'T1/BHS-102/TL-202'),
  makeSlot('ee-a-w6-p2', 'sub-ee-5', 'BHS-102', 'Technical Writing', 'Wednesday', '15:30', '17:00', 'Language Lab', 'Lab', 'P2', 'P/2/BHS-102 Lab'),

  // Thursday
  makeSlot('ee-a-th1', 'sub-ee-2', 'BSM-140', 'Environmental Science', 'Thursday', '09:10', '10:00', 'TL-202', 'Lecture', 'ALL', 'L (PS)'),
  makeSlot('ee-a-th2', 'sub-ee-1', 'BSM-110', 'Engineering Mathematics I', 'Thursday', '10:00', '10:50', 'TL-202', 'Lecture', 'ALL', 'L (AKB)'),
  makeSlot('ee-a-th3-p1', 'sub-ee-3', 'BEE-110', 'Basic Electrical Engineering', 'Thursday', '10:50', '12:30', 'Electrical Lab', 'Lab', 'P1', 'P/1/BEE-110 (AK/US)'),
  makeSlot('ee-a-th3-p2', 'sub-ee-2', 'BSM-140', 'Environmental Science', 'Thursday', '10:50', '12:30', 'Chemistry Lab', 'Lab', 'P2', 'P/2/BSM-140 (SJ, Preeti)'),
  makeSlot('ee-a-th4', 'sub-ee-3', 'BEE-110', 'Basic Electrical Engineering', 'Thursday', '14:45', '15:30', 'TL-202', 'Lecture', 'ALL', 'L (AK)'),

  // Friday
  makeSlot('ee-a-f1', 'sub-ee-2', 'BSM-140', 'Environmental Science', 'Friday', '09:10', '10:00', 'TL-202', 'Lecture', 'ALL', 'L (PS)'),
  makeSlot('ee-a-f2', 'sub-ee-1', 'BSM-110', 'Engineering Mathematics I', 'Friday', '10:00', '10:50', 'TL-202', 'Lecture', 'ALL', 'L (AKB)'),
  makeSlot('ee-a-f3-p2', 'sub-ee-3', 'BEE-110', 'Basic Electrical Engineering', 'Friday', '10:50', '12:30', 'Electrical Lab', 'Lab', 'P2', 'P/2/BEE-110 (RB/US)'),
  makeSlot('ee-a-f3-p1', 'sub-ee-2', 'BSM-140', 'Environmental Science', 'Friday', '10:50', '12:30', 'Chemistry Lab', 'Lab', 'P1', 'P/1/BSM-140 (PS, CL)'),
  makeSlot('ee-a-f4', 'sub-ee-4', 'BEE-108A', 'Electrical Wiring', 'Friday', '15:30', '16:15', 'TL-202', 'Lecture', 'ALL', 'L (KBS)'),

  // Saturday
  makeSlot('ee-a-s1', 'sub-ee-4', 'BEE-108A', 'Electrical Wiring', 'Saturday', '09:10', '10:00', 'TL-202', 'Lecture', 'ALL', 'L (KBS)'),
  makeSlot('ee-a-s2', 'sub-ee-1', 'BSM-110', 'Engineering Mathematics I', 'Saturday', '10:00', '10:50', 'TL-202', 'Tutorial', 'P1', 'T1/BSM-110/RK/TL-202'),
  makeSlot('ee-a-s3-p2', 'sub-ee-4', 'BEE-108A', 'Electrical Wiring', 'Saturday', '10:50', '12:30', 'Wiring Lab', 'Lab', 'P2', 'P/2/BEE-108A (RSG/BS)')
]

const EE_SEC_B_SLOTS = [
  // Monday
  makeSlot('ee-b-m1', 'sub-ee-4', 'BEE-108A', 'Electrical Wiring', 'Monday', '10:50', '11:40', 'TL-202', 'Lecture', 'ALL', 'L (KBS)'),
  makeSlot('ee-b-m2', 'sub-ee-3', 'BEE-110', 'Basic Electrical Engineering', 'Monday', '11:40', '12:30', 'TL-202', 'Lecture', 'ALL', 'L (RB)'),
  makeSlot('ee-b-m3', 'sub-ee-1', 'BSM-110', 'Engineering Mathematics I', 'Monday', '14:00', '14:45', 'TL-202', 'Tutorial', 'P2', 'T2/BSM-110/VK/TL-202'),
  makeSlot('ee-b-m4', 'sub-ee-5', 'BHS-102', 'Technical Writing', 'Monday', '14:45', '15:30', 'TL-202', 'Tutorial', 'P2', 'T2/BHS-102/TL-202'),

  // Tuesday
  makeSlot('ee-b-t1', 'sub-ee-2', 'BSM-140', 'Environmental Science', 'Tuesday', '09:10', '10:00', 'TL-202', 'Lecture', 'ALL', 'L (SJ)'),
  makeSlot('ee-b-t2', 'sub-ee-1', 'BSM-110', 'Engineering Mathematics I', 'Tuesday', '10:00', '10:50', 'TL-202', 'Lecture', 'ALL', 'L (AKB)'),
  makeSlot('ee-b-t3-p1', 'sub-ee-3', 'BEE-110', 'Basic Electrical Engineering', 'Tuesday', '10:50', '12:30', 'Electrical Lab', 'Lab', 'P1', 'P/1/BEE-110 (PT/US)'),
  makeSlot('ee-b-t4', 'sub-ee-4', 'BEE-108A', 'Electrical Wiring', 'Tuesday', '14:45', '15:30', 'TL-202', 'Lecture', 'ALL', 'L (KBS)'),
  makeSlot('ee-b-t5-p1', 'sub-ee-5', 'BHS-102', 'Technical Writing', 'Tuesday', '15:30', '17:00', 'Language Lab', 'Lab', 'P1', 'P/1/BHS-102 Lab'),

  // Wednesday
  makeSlot('ee-b-w1', 'sub-ee-2', 'BSM-140', 'Environmental Science', 'Wednesday', '09:10', '10:00', 'TL-202', 'Lecture', 'ALL', 'L (SJ)'),
  makeSlot('ee-b-w2', 'sub-ee-1', 'BSM-110', 'Engineering Mathematics I', 'Wednesday', '10:00', '10:50', 'TL-202', 'Lecture', 'ALL', 'L (AKB)'),
  makeSlot('ee-b-w3-p2', 'sub-ee-3', 'BEE-110', 'Basic Electrical Engineering', 'Wednesday', '15:30', '17:00', 'Electrical Lab', 'Lab', 'P2', 'P/2/BEE-110 (AK/US)'),
  makeSlot('ee-b-w4-p1', 'sub-ee-2', 'BSM-140', 'Environmental Science', 'Wednesday', '15:30', '17:00', 'Chemistry Lab', 'Lab', 'P1', 'P/1/BSM-140 (PS, Preeti)'),

  // Thursday
  makeSlot('ee-b-th1-p1', 'sub-ee-4', 'BEE-108A', 'Electrical Wiring', 'Thursday', '09:10', '10:50', 'Wiring Lab', 'Lab', 'P1', 'P/1/BEE-108A (KBS/AV)'),
  makeSlot('ee-b-th2', 'sub-ee-3', 'BEE-110', 'Basic Electrical Engineering', 'Thursday', '10:50', '11:40', 'TL-202', 'Lecture', 'ALL', 'L (RB)'),
  makeSlot('ee-b-th3', 'sub-ee-5', 'BHS-102', 'Technical Writing', 'Thursday', '11:40', '12:30', 'TL-202', 'Lecture', 'ALL', 'L BHS-102'),
  makeSlot('ee-b-th4-p2', 'sub-ee-2', 'BSM-140', 'Environmental Science', 'Thursday', '15:30', '17:00', 'Chemistry Lab', 'Lab', 'P2', 'P/2/BSM-140 (PS, NK)'),
  makeSlot('ee-b-th5', 'sub-ee-5', 'BHS-102', 'Technical Writing', 'Thursday', '16:15', '17:00', 'TL-202', 'Tutorial', 'P1', 'T1/BHS-102/TL-202'),

  // Friday
  makeSlot('ee-b-f1', 'sub-ee-2', 'BSM-140', 'Environmental Science', 'Friday', '10:50', '11:40', 'TL-202', 'Lecture', 'ALL', 'L (SJ)'),
  makeSlot('ee-b-f2', 'sub-ee-1', 'BSM-110', 'Engineering Mathematics I', 'Friday', '11:40', '12:30', 'TL-202', 'Lecture', 'ALL', 'L (AKB)'),
  makeSlot('ee-b-f3', 'sub-ee-4', 'BEE-108A', 'Electrical Wiring', 'Friday', '14:00', '14:45', 'TL-202', 'Lecture', 'ALL', 'L (KBS)'),
  makeSlot('ee-b-f4', 'sub-ee-3', 'BEE-110', 'Basic Electrical Engineering', 'Friday', '14:45', '15:30', 'TL-202', 'Lecture', 'ALL', 'L (RB)'),
  makeSlot('ee-b-f5-p2', 'sub-ee-5', 'BHS-102', 'Technical Writing', 'Friday', '15:30', '17:00', 'Language Lab', 'Lab', 'P2', 'P/2/BHS-102 Lab'),

  // Saturday
  makeSlot('ee-b-s1-p2', 'sub-ee-4', 'BEE-108A', 'Electrical Wiring', 'Saturday', '09:10', '10:50', 'Wiring Lab', 'Lab', 'P2', 'P/2/BEE-108A (KBS/AV)'),
  makeSlot('ee-b-s2', 'sub-ee-5', 'BHS-102', 'Technical Writing', 'Saturday', '10:50', '11:40', 'TL-202', 'Lecture', 'ALL', 'L BHS-102'),
  makeSlot('ee-b-s3', 'sub-ee-1', 'BSM-110', 'Engineering Mathematics I', 'Saturday', '11:40', '12:30', 'TL-202', 'Tutorial', 'P1', 'T1/BSM-110/VK/TL-202')
]

// --------------------------------------------------------------------------
// 7. ELECTRONICS & COMMUNICATION (ECE) - Pages 14, 15, 16 (SEC-A, B, C)
// --------------------------------------------------------------------------
const ECE_SUBJECTS = [
  { id: 'sub-ece-1', code: 'BSM-110', name: 'Engineering Mathematics - I', faculty: 'Dr. Harish Chandra (HC) / Dr. Manmohan Pandey (MP)', min_threshold: 75 },
  { id: 'sub-ece-2', code: 'BSM-140', name: 'Environmental Science and Green Chemistry', faculty: 'PPP, PS, NK, CL, RS', min_threshold: 75 },
  { id: 'sub-ece-3', code: 'BEE-110', name: 'Basic Electrical Engineering', faculty: 'Dr Rohit Babu (RB) / Dr Divyanshi (DDS) / Dr Anukriti (AS) / Dr Nikhil (NK)', min_threshold: 75 },
  { id: 'sub-ece-4', code: 'BEC-106', name: 'Electronic Components Testing and Measurement', faculty: 'Dr. Pooja Lohia (PL) / Dr. Shalabh Mishra (SKM) / Dr. Pragyey (PKK)', min_threshold: 75 },
  { id: 'sub-ece-5', code: 'BHS-102', name: 'Technical Writing and Professional Communication', faculty: 'Dept. Faculty', min_threshold: 75 }
]

const ECE_SEC_A_SLOTS = [
  // Monday
  makeSlot('ece-a-m1', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Monday', '09:10', '10:00', 'TL-207', 'Lecture', 'ALL', 'L (HC)'),
  makeSlot('ece-a-m2', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Monday', '10:00', '10:50', 'TL-207', 'Lecture', 'ALL', 'L (DDS)'),
  makeSlot('ece-a-m3', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Monday', '14:00', '14:45', 'TL-207', 'Lecture', 'ALL', 'L BHS-102'),
  makeSlot('ece-a-m4', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Monday', '14:45', '15:30', 'TL-207', 'Lecture', 'ALL', 'L (PPP)'),
  makeSlot('ece-a-m5-p1', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Monday', '15:30', '17:00', 'Electrical Lab', 'Lab', 'P1', 'P/1/BEE-110 (RB/AG)'),

  // Tuesday
  makeSlot('ece-a-t1-p1', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Tuesday', '10:50', '12:30', 'Chemistry Lab', 'Lab', 'P1', 'P/1/BSM-140 (PS, NK)'),
  makeSlot('ece-a-t1-p2', 'sub-ece-4', 'BEC-106', 'Electronic Components', 'Tuesday', '10:00', '12:30', 'Electronics Lab', 'Lab', 'P2', 'P/2/BEC-106 (PL/NK)'),
  makeSlot('ece-a-t2', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Tuesday', '14:00', '14:45', 'TL-207', 'Lecture', 'ALL', 'L BHS-102'),
  makeSlot('ece-a-t3', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Tuesday', '14:45', '15:30', 'TL-207', 'Lecture', 'ALL', 'L (PPP)'),
  makeSlot('ece-a-t4-p2', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Tuesday', '15:30', '17:00', 'Electrical Lab', 'Lab', 'P2', 'P/2/BEE-110 (RB/AG)'),

  // Wednesday
  makeSlot('ece-a-w1-p1', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Wednesday', '09:10', '10:50', 'Language Lab', 'Lab', 'P1', 'P/1/BHS-102 Lab'),
  makeSlot('ece-a-w2', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Wednesday', '10:50', '11:40', 'TL-207', 'Lecture', 'ALL', 'L (PPP)'),
  makeSlot('ece-a-w3', 'sub-ece-4', 'BEC-106', 'Electronic Components', 'Wednesday', '11:40', '12:30', 'TL-207', 'Lecture', 'ALL', 'L (PL)'),
  makeSlot('ece-a-w4-p1', 'sub-ece-4', 'BEC-106', 'Electronic Components', 'Wednesday', '14:00', '17:00', 'Electronics Lab', 'Lab', 'P1', 'P/1/BEC-106 (PL/CH)'),
  makeSlot('ece-a-w5-p2', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Wednesday', '15:30', '17:00', 'Language Lab', 'Lab', 'P2', 'P/2/BHS-102 Lab'),

  // Thursday
  makeSlot('ece-a-th1', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Thursday', '09:10', '10:00', 'TL-207', 'Lecture', 'ALL', 'L (HC)'),
  makeSlot('ece-a-th2', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Thursday', '10:00', '10:50', 'TL-207', 'Lecture', 'ALL', 'L (DDS)'),
  makeSlot('ece-a-th3', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Thursday', '14:00', '14:45', 'TL-111', 'Tutorial', 'P1', 'T1/BSM-110/PM/TL-111'),

  // Friday
  makeSlot('ece-a-f1', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Friday', '09:10', '10:00', 'TL-207', 'Lecture', 'ALL', 'L (HC)'),
  makeSlot('ece-a-f2', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Friday', '10:00', '10:50', 'TL-207', 'Lecture', 'ALL', 'L (DDS)'),
  makeSlot('ece-a-f3', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Friday', '14:00', '14:45', 'TL-111', 'Tutorial', 'P2', 'T2/BSM-110/PM/TL-111'),
  makeSlot('ece-a-f4', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Friday', '14:45', '15:30', 'TL-207', 'Tutorial', 'P2', 'T2/BHS-102/TL-207'),

  // Saturday
  makeSlot('ece-a-s1', 'sub-ece-4', 'BEC-106', 'Electronic Components', 'Saturday', '09:10', '10:00', 'TL-207', 'Lecture', 'ALL', 'L (PL)'),
  makeSlot('ece-a-s2', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Saturday', '10:00', '10:50', 'TL-207', 'Tutorial', 'P1', 'T1/BHS-102/TL-207'),
  makeSlot('ece-a-s3-p2', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Saturday', '10:50', '12:30', 'Chemistry Lab', 'Lab', 'P2', 'P/2/BSM-140 (CL & RS)')
]

const ECE_SEC_B_SLOTS = [
  // Monday
  makeSlot('ece-b-m1', 'sub-ece-4', 'BEC-106', 'Electronic Components', 'Monday', '10:50', '11:40', 'TL-207', 'Lecture', 'ALL', 'L (SKM)'),
  makeSlot('ece-b-m2', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Monday', '11:40', '12:30', 'TL-207', 'Lecture', 'ALL', 'L (PPP)'),
  makeSlot('ece-b-m3', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Monday', '15:30', '16:15', 'TL-207', 'Tutorial', 'P1', 'T1/BSM-110/KY'),

  // Tuesday
  makeSlot('ece-b-t1', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Tuesday', '09:10', '10:00', 'TL-207', 'Lecture', 'ALL', 'L (AS)'),
  makeSlot('ece-b-t2', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Tuesday', '10:00', '10:50', 'TL-207', 'Lecture', 'ALL', 'L (HC)'),
  makeSlot('ece-b-t3', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Tuesday', '10:50', '11:40', 'TL-207', 'Lecture', 'ALL', 'L BHS-102'),
  makeSlot('ece-b-t4', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Tuesday', '11:40', '12:30', 'TL-207', 'Lecture', 'ALL', 'L (PPP)'),
  makeSlot('ece-b-t5-p1', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Tuesday', '14:00', '15:30', 'Language Lab', 'Lab', 'P1', 'P/1/BHS-102 Lab'),
  makeSlot('ece-b-t6', 'sub-ece-4', 'BEC-106', 'Electronic Components', 'Tuesday', '15:30', '16:15', 'TL-207', 'Lecture', 'ALL', 'L (SKM)'),

  // Wednesday
  makeSlot('ece-b-w1', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Wednesday', '09:10', '10:00', 'TL-207', 'Lecture', 'ALL', 'L (AS)'),
  makeSlot('ece-b-w2', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Wednesday', '10:00', '10:50', 'TL-207', 'Lecture', 'ALL', 'L (HC)'),
  makeSlot('ece-b-w3-p1', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Wednesday', '14:00', '15:30', 'Language Lab', 'Lab', 'P1', 'P/1/BHS-102 Lab'),
  makeSlot('ece-b-w4', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Wednesday', '15:30', '16:15', 'TL-207', 'Lecture', 'ALL', 'L BHS-102'),

  // Thursday
  makeSlot('ece-b-th1-p1', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Thursday', '09:10', '10:50', 'Chemistry Lab', 'Lab', 'P1', 'P/1/BSM-140 (CL, BR)'),
  makeSlot('ece-b-th1-p2', 'sub-ece-4', 'BEC-106', 'Electronic Components', 'Thursday', '10:00', '12:30', 'Electronics Lab', 'Lab', 'P2', 'P/2/BEC-106 (SKM/GDB)'),
  makeSlot('ece-b-th2', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Thursday', '10:50', '11:40', 'TL-207', 'Tutorial', 'P2', 'T2/BSM-110/KY'),
  makeSlot('ece-b-th3', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Thursday', '11:40', '12:30', 'TL-207', 'Tutorial', 'P2', 'T2/BHS-102/'),
  makeSlot('ece-b-th4-p1', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Thursday', '14:00', '15:30', 'Electrical Lab', 'Lab', 'P1', 'P/1/BEE-110 (AS/SY)'),

  // Friday
  makeSlot('ece-b-f1', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Friday', '10:50', '11:40', 'TL-207', 'Lecture', 'ALL', 'L (HC)'),
  makeSlot('ece-b-f2', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Friday', '11:40', '12:30', 'TL-207', 'Lecture', 'ALL', 'L (AS)'),
  makeSlot('ece-b-f3-p2', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Friday', '14:00', '15:30', 'Electrical Lab', 'Lab', 'P2', 'P/2/BEE-110 (AS/SY)'),
  makeSlot('ece-b-f4-p1', 'sub-ece-4', 'BEC-106', 'Electronic Components', 'Friday', '14:00', '17:00', 'Electronics Lab', 'Lab', 'P1', 'P/1/BEC-106 (SKM/GDB)'),

  // Saturday
  makeSlot('ece-b-s1-p2', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Saturday', '09:10', '10:50', 'Chemistry Lab', 'Lab', 'P2', 'P/2/BSM-140 (PPP, CL)'),
  makeSlot('ece-b-s2', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Saturday', '10:50', '11:40', 'TL-207', 'Lecture', 'ALL', 'L (PPP)'),
  makeSlot('ece-b-s3', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Saturday', '11:40', '12:30', 'TL-207', 'Tutorial', 'P1', 'T1/BHS-102/')
]

const ECE_SEC_C_SLOTS = [
  // Monday
  makeSlot('ece-c-m1-p1', 'sub-ece-4', 'BEC-106', 'Electronic Components', 'Monday', '09:10', '12:30', 'Electronics Lab', 'Lab', 'P1', 'P/1/BEC-106 (R/VSC)'),
  makeSlot('ece-c-m2-p2', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Monday', '09:10', '10:50', 'Electrical Lab', 'Lab', 'P2', 'P/2/BEE-110 (SS/AT)'),
  makeSlot('ece-c-m3-p2', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Monday', '10:50', '12:30', 'Language Lab', 'Lab', 'P2', 'P/2/BHS-102 Lab'),
  makeSlot('ece-c-m4', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Monday', '14:45', '15:30', 'TL-204', 'Lecture', 'ALL', 'L (SJ)'),
  makeSlot('ece-c-m5', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Monday', '15:30', '16:15', 'TL-204', 'Lecture', 'ALL', 'L BHS-102'),

  // Tuesday
  makeSlot('ece-c-t1', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Tuesday', '10:50', '11:40', 'TL-204', 'Lecture', 'ALL', 'L (NK)'),
  makeSlot('ece-c-t2', 'sub-ece-4', 'BEC-106', 'Electronic Components', 'Tuesday', '11:40', '12:30', 'TL-204', 'Lecture', 'ALL', 'L (PKK)'),
  makeSlot('ece-c-t3-p2', 'sub-ece-4', 'BEC-106', 'Electronic Components', 'Tuesday', '14:00', '17:00', 'Electronics Lab', 'Lab', 'P2', 'P/2/BEC-106 (PKK/VSC)'),
  makeSlot('ece-c-t4-p1', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Tuesday', '15:30', '17:00', 'Chemistry Lab', 'Lab', 'P1', 'P/1/BSM-140 (SJ & RS)'),

  // Wednesday
  makeSlot('ece-c-w1', 'sub-ece-4', 'BEC-106', 'Electronic Components', 'Wednesday', '09:10', '10:00', 'TL-204', 'Lecture', 'ALL', 'L (PKK)'),
  makeSlot('ece-c-w2', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Wednesday', '10:00', '10:50', 'TL-204', 'Lecture', 'ALL', 'L (NK)'),
  makeSlot('ece-c-w3-p2', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Wednesday', '10:50', '12:30', 'Chemistry Lab', 'Lab', 'P2', 'P/2/BSM-140 (PS, NK)'),
  makeSlot('ece-c-w4', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Wednesday', '14:45', '15:30', 'TL-204', 'Tutorial', 'P2', 'T2/BSM-110/ST/TL-204'),
  makeSlot('ece-c-w5', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Wednesday', '15:30', '16:15', 'TL-204', 'Tutorial', 'P2', 'T2/BHS-102/TL-204'),

  // Thursday
  makeSlot('ece-c-th1', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Thursday', '09:10', '10:00', 'TL-204', 'Lecture', 'ALL', 'L (MP)'),
  makeSlot('ece-c-th2', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Thursday', '10:00', '10:50', 'TL-204', 'Lecture', 'ALL', 'L (SJ)'),
  makeSlot('ece-c-th3', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Thursday', '14:45', '15:30', 'TL-204', 'Tutorial', 'P1', 'T1/BSM-110/ST/TL-204'),
  makeSlot('ece-c-th4', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Thursday', '15:30', '16:15', 'TL-204', 'Tutorial', 'P1', 'T1/BHS-102/TL-204'),

  // Friday
  makeSlot('ece-c-f1', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Friday', '09:10', '10:00', 'TL-204', 'Lecture', 'ALL', 'L (MP)'),
  makeSlot('ece-c-f2', 'sub-ece-2', 'BSM-140', 'Environmental Science', 'Friday', '10:00', '10:50', 'TL-204', 'Lecture', 'ALL', 'L (SJ)'),
  makeSlot('ece-c-f3', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Friday', '14:45', '15:30', 'TL-204', 'Lecture', 'ALL', 'L (NK)'),
  makeSlot('ece-c-f4-p1', 'sub-ece-3', 'BEE-110', 'Basic Electrical Engineering', 'Friday', '15:30', '17:00', 'Electrical Lab', 'Lab', 'P1', 'P/1/BEE-110 (SS/AT)'),

  // Saturday
  makeSlot('ece-c-s1', 'sub-ece-1', 'BSM-110', 'Engineering Mathematics - I', 'Saturday', '09:10', '10:00', 'TL-204', 'Lecture', 'ALL', 'L (MP)'),
  makeSlot('ece-c-s2', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Saturday', '10:00', '10:50', 'TL-204', 'Lecture', 'ALL', 'L BHS-102'),
  makeSlot('ece-c-s3-p1', 'sub-ece-5', 'BHS-102', 'Technical Writing', 'Saturday', '10:50', '12:30', 'Language Lab', 'Lab', 'P1', 'P/1/BHS-102 Lab')
]

// --------------------------------------------------------------------------
// 8. ECE (IOT) - Page 17 (SEC-A)
// --------------------------------------------------------------------------
const ECE_IOT_SUBJECTS = [
  { id: 'sub-iot-1', code: 'BSM-110', name: 'Engineering Mathematics - I', faculty: 'Dr. Kumar Vineet (KV) & Nandita Tiwari (NT)', min_threshold: 75 },
  { id: 'sub-iot-2', code: 'BSM-140', name: 'Environmental Science and Green Chemistry', faculty: 'PS, PPP, NK, RS', min_threshold: 75 },
  { id: 'sub-iot-3', code: 'BEE-110', name: 'Basic Electrical Engineering', faculty: 'Dr Vivek Patel (VP) / Dr Nikita Prajapati (NP) / Dr Shikha Singh (SS) / Dr Rohit Babu (RB)', min_threshold: 75 },
  { id: 'sub-iot-4', code: 'BEC-106', name: 'Electronic Components Testing and Measurement', faculty: 'Dr. Ram Pravesh (RP) / Dr. Raj Kumar Singh (RK) / Dr. Suyash Kumar', min_threshold: 75 },
  { id: 'sub-iot-5', code: 'BHS-102', name: 'Technical Writing and Professional Communication', faculty: 'Dept. Faculty', min_threshold: 75 }
]

const ECE_IOT_SEC_A_SLOTS = [
  // Monday
  makeSlot('iot-a-m1', 'sub-iot-1', 'BSM-110', 'Engineering Mathematics - I', 'Monday', '09:10', '10:00', 'TL-204', 'Lecture', 'ALL', 'L (KV)'),
  makeSlot('iot-a-m2', 'sub-iot-2', 'BSM-140', 'Environmental Science', 'Monday', '10:00', '10:50', 'TL-204', 'Lecture', 'ALL', 'L (PS)'),
  makeSlot('iot-a-m3', 'sub-iot-4', 'BEC-106', 'Electronic Components', 'Monday', '10:50', '11:40', 'TL-204', 'Lecture', 'ALL', 'L (RP)'),
  makeSlot('iot-a-m4-p2', 'sub-iot-4', 'BEC-106', 'Electronic Components', 'Monday', '14:00', '17:00', 'Electronics Lab', 'Lab', 'P2', 'P/2/BEC-106 (RP/RK)'),
  makeSlot('iot-a-m5-p1', 'sub-iot-3', 'BEE-110', 'Basic Electrical Engineering', 'Monday', '14:45', '16:15', 'Electrical Lab', 'Lab', 'P1', 'P/1/BEE-110 (VP/RB)'),

  // Tuesday
  makeSlot('iot-a-t1', 'sub-iot-1', 'BSM-110', 'Engineering Mathematics - I', 'Tuesday', '09:10', '10:00', 'TL-204', 'Lecture', 'ALL', 'L (KV)'),
  makeSlot('iot-a-t2', 'sub-iot-2', 'BSM-140', 'Environmental Science', 'Tuesday', '10:00', '10:50', 'TL-204', 'Lecture', 'ALL', 'L (PS)'),
  makeSlot('iot-a-t3', 'sub-iot-5', 'BHS-102', 'Technical Writing', 'Tuesday', '14:00', '14:45', 'TL-204', 'Lecture', 'ALL', 'L BHS-102'),
  makeSlot('iot-a-t4', 'sub-iot-1', 'BSM-110', 'Engineering Mathematics - I', 'Tuesday', '14:45', '15:30', 'TL-204', 'Tutorial', 'P1', 'T1/BSM-110/NT/TL-204'),

  // Wednesday
  makeSlot('iot-a-w1', 'sub-iot-5', 'BHS-102', 'Technical Writing', 'Wednesday', '10:50', '11:40', 'TL-204', 'Lecture', 'ALL', 'L BHS-102'),
  makeSlot('iot-a-w2', 'sub-iot-3', 'BEE-110', 'Basic Electrical Engineering', 'Wednesday', '11:40', '12:30', 'TL-204', 'Lecture', 'ALL', 'L (NP)'),
  makeSlot('iot-a-w3', 'sub-iot-5', 'BHS-102', 'Technical Writing', 'Wednesday', '14:00', '14:45', 'TL-204', 'Tutorial', 'P1', 'T1/BHS-102/TL-204'),

  // Thursday
  makeSlot('iot-a-th1-p2', 'sub-iot-5', 'BHS-102', 'Technical Writing', 'Thursday', '09:10', '10:50', 'Language Lab', 'Lab', 'P2', 'P/2/BHS-102 Lab'),
  makeSlot('iot-a-th2', 'sub-iot-1', 'BSM-110', 'Engineering Mathematics - I', 'Thursday', '10:50', '11:40', 'TL-204', 'Lecture', 'ALL', 'L (KV)'),
  makeSlot('iot-a-th3', 'sub-iot-2', 'BSM-140', 'Environmental Science', 'Thursday', '11:40', '12:30', 'TL-204', 'Lecture', 'ALL', 'L (PS)'),
  makeSlot('iot-a-th4-p1', 'sub-iot-4', 'BEC-106', 'Electronic Components', 'Thursday', '14:00', '17:00', 'Electronics Lab', 'Lab', 'P1', 'P/1/BEC-106 (RP/SK)'),
  makeSlot('iot-a-th5-p2', 'sub-iot-2', 'BSM-140', 'Environmental Science', 'Thursday', '14:00', '15:30', 'Chemistry Lab', 'Lab', 'P2', 'P/2/BSM-140 (PPP, NK)'),
  makeSlot('iot-a-th6-p2', 'sub-iot-3', 'BEE-110', 'Basic Electrical Engineering', 'Thursday', '15:30', '17:00', 'Electrical Lab', 'Lab', 'P2', 'P/2/BEE-110 (VP/SS)'),

  // Friday
  makeSlot('iot-a-f1-p1', 'sub-iot-2', 'BSM-140', 'Environmental Science', 'Friday', '09:10', '10:50', 'Chemistry Lab', 'Lab', 'P1', 'P/1/BSM-140 (NK & RS)'),
  makeSlot('iot-a-f2', 'sub-iot-4', 'BEC-106', 'Electronic Components', 'Friday', '10:50', '11:40', 'TL-204', 'Lecture', 'ALL', 'L (RP)'),
  makeSlot('iot-a-f3', 'sub-iot-3', 'BEE-110', 'Basic Electrical Engineering', 'Friday', '11:40', '12:30', 'TL-204', 'Lecture', 'ALL', 'L (NP)'),
  makeSlot('iot-a-f4', 'sub-iot-1', 'BSM-110', 'Engineering Mathematics - I', 'Friday', '15:30', '16:15', 'TL-204', 'Tutorial', 'P2', 'T2/BSM-110/NT/TL-204'),

  // Saturday
  makeSlot('iot-a-s1-p1', 'sub-iot-5', 'BHS-102', 'Technical Writing', 'Saturday', '09:10', '10:50', 'Language Lab', 'Lab', 'P1', 'P/1/BHS-102 Lab'),
  makeSlot('iot-a-s2', 'sub-iot-5', 'BHS-102', 'Technical Writing', 'Saturday', '10:50', '11:40', 'TL-204', 'Tutorial', 'P2', 'T2/BHS-102/TL-204'),
  makeSlot('iot-a-s3', 'sub-iot-3', 'BEE-110', 'Basic Electrical Engineering', 'Saturday', '11:40', '12:30', 'TL-204', 'Lecture', 'ALL', 'L (NP)')
]

// --------------------------------------------------------------------------
// 9. BBA - Pages 18 & 19 (SEC-A & SEC-B)
// --------------------------------------------------------------------------
const BBA_SUBJECTS = [
  { id: 'sub-bba-1', code: 'BBA-114', name: 'Financial Accounting', faculty: 'Dr. Ugrasen (UG) / Dr. Anjali Singh (AS) / Ms. Swati Gupta (SG)', min_threshold: 75 },
  { id: 'sub-bba-2', code: 'BBA-115', name: 'Principles and Practices of Management', faculty: 'Dr. Javed Alam (JA) / Dr. Indal Kumar (IK) / Ms. Akriti Singh (AKS)', min_threshold: 75 },
  { id: 'sub-bba-3', code: 'BBA-116', name: 'Quantitative Techniques for Business Research', faculty: 'Dr. Poonam Ojha (PO) / Dr. Vivaswan Singh (VS) / Ms. Shambhavi (ST)', min_threshold: 75 },
  { id: 'sub-bba-4', code: 'BBA-A01', name: 'Business Communication for Managers', faculty: 'Dr. Abdul Jadid (AJ) / Mr. Sachin Srivastava (SS) / Mr. Badal Sharma (BAS)', min_threshold: 75 },
  { id: 'sub-bba-5', code: 'BHM-121', name: 'Industrial Psychology', faculty: 'Dr. Rajput Neetu Kumari / Ms. Deepshikha Singh', min_threshold: 75 },
  { id: 'sub-bba-6', code: 'AUC-108', name: 'Intellectual Property Rights', faculty: 'Dr. Asim Hasan (AH) / Dr. M. Osama (MO)', min_threshold: 75 }
]

const BBA_SEC_A_SLOTS = [
  // Monday
  makeSlot('bba-a-m1', 'sub-bba-1', 'BBA-114', 'Financial Accounting', 'Monday', '10:00', '10:50', 'TL-113', 'Lecture', 'ALL', 'L (UG)'),
  makeSlot('bba-a-m2', 'sub-bba-3', 'BBA-116', 'Quantitative Techniques', 'Monday', '10:50', '11:40', 'TL-113', 'Tutorial', 'P1', 'T1/BBA-116/TL-113/ST'),
  makeSlot('bba-a-m3', 'sub-bba-1', 'BBA-114', 'Financial Accounting', 'Monday', '11:40', '12:30', 'TL-113', 'Tutorial', 'P1', 'T1/BBA-114/TL-113/SG'),
  makeSlot('bba-a-m4', 'sub-bba-5', 'BHM-121', 'Industrial Psychology', 'Monday', '14:00', '14:45', 'TL-113', 'Tutorial', 'P1', 'T1 BHM-121'),

  // Tuesday
  makeSlot('bba-a-t1', 'sub-bba-5', 'BHM-121', 'Industrial Psychology', 'Tuesday', '09:10', '10:00', 'TL-113', 'Lecture', 'ALL', 'L BHM-121'),
  makeSlot('bba-a-t2', 'sub-bba-1', 'BBA-114', 'Financial Accounting', 'Tuesday', '10:50', '11:40', 'TL-113', 'Tutorial', 'P2', 'T2/BBA-114/TL-113/SG'),
  makeSlot('bba-a-t3', 'sub-bba-2', 'BBA-115', 'Principles of Management', 'Tuesday', '11:40', '12:30', 'TL-113', 'Lecture', 'ALL', 'L (JA)'),
  makeSlot('bba-a-t4', 'sub-bba-4', 'BBA-A01', 'Business Communication', 'Tuesday', '14:00', '14:45', 'TL-113', 'Lecture', 'ALL', 'L (AJ)'),

  // Wednesday
  makeSlot('bba-a-w1', 'sub-bba-5', 'BHM-121', 'Industrial Psychology', 'Wednesday', '09:10', '10:00', 'TL-113', 'Lecture', 'ALL', 'L BHM-121'),
  makeSlot('bba-a-w2', 'sub-bba-1', 'BBA-114', 'Financial Accounting', 'Wednesday', '10:00', '10:50', 'TL-113', 'Lecture', 'ALL', 'L (UG)'),
  makeSlot('bba-a-w3', 'sub-bba-3', 'BBA-116', 'Quantitative Techniques', 'Wednesday', '10:50', '11:40', 'TL-113', 'Tutorial', 'P2', 'T2/BBA-116/TL-113/ST'),
  makeSlot('bba-a-w4', 'sub-bba-2', 'BBA-115', 'Principles of Management', 'Wednesday', '11:40', '12:30', 'TL-113', 'Tutorial', 'P1', 'T1/BBA-115/TL-113/AKS'),
  makeSlot('bba-a-w5', 'sub-bba-3', 'BBA-116', 'Quantitative Techniques', 'Wednesday', '14:00', '14:45', 'TL-113', 'Lecture', 'ALL', 'L (PO)'),
  makeSlot('bba-a-w6', 'sub-bba-5', 'BHM-121', 'Industrial Psychology', 'Wednesday', '14:45', '15:30', 'TL-113', 'Tutorial', 'P2', 'T2/BHM-121/TL-113'),

  // Thursday
  makeSlot('bba-a-th1', 'sub-bba-5', 'BHM-121', 'Industrial Psychology', 'Thursday', '09:10', '10:00', 'TL-113', 'Lecture', 'ALL', 'L BHM-121'),
  makeSlot('bba-a-th2', 'sub-bba-6', 'AUC-108', 'Intellectual Property Rights', 'Thursday', '10:00', '10:50', 'TL-113', 'Lecture', 'ALL', 'L (AH)'),
  makeSlot('bba-a-th3', 'sub-bba-4', 'BBA-A01', 'Business Communication', 'Thursday', '10:50', '11:40', 'TL-113', 'Tutorial', 'P2', 'T2/BBA-A01/TL-113/BAS'),
  makeSlot('bba-a-th4', 'sub-bba-2', 'BBA-115', 'Principles of Management', 'Thursday', '11:40', '12:30', 'TL-113', 'Lecture', 'ALL', 'L (JA)'),
  makeSlot('bba-a-th5', 'sub-bba-4', 'BBA-A01', 'Business Communication', 'Thursday', '14:00', '14:45', 'TL-113', 'Lecture', 'ALL', 'L (AJ)'),
  makeSlot('bba-a-th6', 'sub-bba-3', 'BBA-116', 'Quantitative Techniques', 'Thursday', '14:45', '15:30', 'TL-113', 'Lecture', 'ALL', 'L (PO)'),

  // Friday
  makeSlot('bba-a-f1', 'sub-bba-6', 'AUC-108', 'Intellectual Property Rights', 'Friday', '10:00', '10:50', 'TL-113', 'Lecture', 'ALL', 'L (AH)'),
  makeSlot('bba-a-f2', 'sub-bba-4', 'BBA-A01', 'Business Communication', 'Friday', '10:50', '11:40', 'TL-113', 'Tutorial', 'P1', 'T1/BBA-A01/TL-113/BAS'),
  makeSlot('bba-a-f3', 'sub-bba-2', 'BBA-115', 'Principles of Management', 'Friday', '11:40', '12:30', 'TL-113', 'Lecture', 'ALL', 'L (JA)'),
  makeSlot('bba-a-f4', 'sub-bba-3', 'BBA-116', 'Quantitative Techniques', 'Friday', '14:00', '14:45', 'TL-113', 'Lecture', 'ALL', 'L (PO)'),

  // Saturday
  makeSlot('bba-a-s1', 'sub-bba-2', 'BBA-115', 'Principles of Management', 'Saturday', '09:10', '10:00', 'TL-113', 'Tutorial', 'P2', 'T2/BBA-115/TL-113/AKS'),
  makeSlot('bba-a-s2', 'sub-bba-4', 'BBA-A01', 'Business Communication', 'Saturday', '10:00', '10:50', 'TL-113', 'Lecture', 'ALL', 'L (AJ)'),
  makeSlot('bba-a-s3', 'sub-bba-1', 'BBA-114', 'Financial Accounting', 'Saturday', '11:40', '12:30', 'TL-113', 'Lecture', 'ALL', 'L (UG)')
]

const BBA_SEC_B_SLOTS = [
  // Monday
  makeSlot('bba-b-m1', 'sub-bba-3', 'BBA-116', 'Quantitative Techniques', 'Monday', '10:00', '10:50', 'TL-114', 'Lecture', 'ALL', 'L (VS)'),
  makeSlot('bba-b-m2', 'sub-bba-5', 'BHM-121', 'Industrial Psychology', 'Monday', '10:50', '11:40', 'TL-114', 'Lecture', 'ALL', 'L BHM-121'),
  makeSlot('bba-b-m3', 'sub-bba-2', 'BBA-115', 'Principles of Management', 'Monday', '11:40', '12:30', 'TL-114', 'Tutorial', 'P1', 'T1/BBA-115/TL-114/AKJ'),
  makeSlot('bba-b-m4', 'sub-bba-4', 'BBA-A01', 'Business Communication', 'Monday', '14:00', '14:45', 'TL-114', 'Lecture', 'ALL', 'L (SS)'),

  // Tuesday
  makeSlot('bba-b-t1', 'sub-bba-3', 'BBA-116', 'Quantitative Techniques', 'Tuesday', '10:00', '10:50', 'TL-114', 'Tutorial', 'P1', 'T1 BBA-116 (SY)'),
  makeSlot('bba-b-t2', 'sub-bba-5', 'BHM-121', 'Industrial Psychology', 'Tuesday', '10:50', '11:40', 'TL-114', 'Tutorial', 'P1', 'T1/BHM-121/TL-114'),
  makeSlot('bba-b-t3', 'sub-bba-1', 'BBA-114', 'Financial Accounting', 'Tuesday', '11:40', '12:30', 'TL-114', 'Lecture', 'ALL', 'L (AS)'),
  makeSlot('bba-b-t4', 'sub-bba-2', 'BBA-115', 'Principles of Management', 'Tuesday', '14:00', '14:45', 'TL-114', 'Lecture', 'ALL', 'L (IK)'),
  makeSlot('bba-b-t5', 'sub-bba-4', 'BBA-A01', 'Business Communication', 'Tuesday', '14:45', '15:30', 'TL-114', 'Lecture', 'ALL', 'L (SS)'),

  // Wednesday
  makeSlot('bba-b-w1', 'sub-bba-5', 'BHM-121', 'Industrial Psychology', 'Wednesday', '09:10', '10:00', 'TL-114', 'Lecture', 'ALL', 'L BHM-121'),
  makeSlot('bba-b-w2', 'sub-bba-6', 'AUC-108', 'Intellectual Property Rights', 'Wednesday', '10:00', '10:50', 'TL-114', 'Lecture', 'ALL', 'L (MO)'),
  makeSlot('bba-b-w3', 'sub-bba-1', 'BBA-114', 'Financial Accounting', 'Wednesday', '10:50', '11:40', 'TL-114', 'Tutorial', 'P1', 'T1 BBA-114 (SG)'),
  makeSlot('bba-b-w4', 'sub-bba-1', 'BBA-114', 'Financial Accounting', 'Wednesday', '11:40', '12:30', 'TL-114', 'Lecture', 'ALL', 'L (AS)'),
  makeSlot('bba-b-w5', 'sub-bba-5', 'BHM-121', 'Industrial Psychology', 'Wednesday', '14:00', '14:45', 'TL-114', 'Tutorial', 'P2', 'T2 BHM-121'),
  makeSlot('bba-b-w6', 'sub-bba-4', 'BBA-A01', 'Business Communication', 'Wednesday', '14:45', '15:30', 'TL-114', 'Tutorial', 'P1', 'T1 BBA-A01 (KUS)'),

  // Thursday
  makeSlot('bba-b-th1', 'sub-bba-2', 'BBA-115', 'Principles of Management', 'Thursday', '09:10', '10:00', 'TL-114', 'Lecture', 'ALL', 'L (IK)'),
  makeSlot('bba-b-th2', 'sub-bba-3', 'BBA-116', 'Quantitative Techniques', 'Thursday', '10:00', '10:50', 'TL-114', 'Tutorial', 'P2', 'T2 BBA-116 (SY)'),
  makeSlot('bba-b-th3', 'sub-bba-3', 'BBA-116', 'Quantitative Techniques', 'Thursday', '11:40', '12:30', 'TL-114', 'Lecture', 'ALL', 'L (VS)'),
  makeSlot('bba-b-th4', 'sub-bba-4', 'BBA-A01', 'Business Communication', 'Thursday', '14:00', '14:45', 'TL-114', 'Tutorial', 'P2', 'T2 BBA-A01 (KUS)'),
  makeSlot('bba-b-th5', 'sub-bba-2', 'BBA-115', 'Principles of Management', 'Thursday', '14:45', '15:30', 'TL-114', 'Tutorial', 'P2', 'T2/BBA-115/TL-114/AKJ'),

  // Friday
  makeSlot('bba-b-f1', 'sub-bba-6', 'AUC-108', 'Intellectual Property Rights', 'Friday', '10:00', '10:50', 'TL-114', 'Lecture', 'ALL', 'L (MO)'),
  makeSlot('bba-b-f2', 'sub-bba-2', 'BBA-115', 'Principles of Management', 'Friday', '11:40', '12:30', 'TL-114', 'Lecture', 'ALL', 'L (IK)'),
  makeSlot('bba-b-f3', 'sub-bba-5', 'BHM-121', 'Industrial Psychology', 'Friday', '14:00', '14:45', 'TL-114', 'Lecture', 'ALL', 'L BHM-121'),
  makeSlot('bba-b-f4', 'sub-bba-4', 'BBA-A01', 'Business Communication', 'Friday', '14:45', '15:30', 'TL-114', 'Lecture', 'ALL', 'L (SS)'),

  // Saturday
  makeSlot('bba-b-s1', 'sub-bba-1', 'BBA-114', 'Financial Accounting', 'Saturday', '09:10', '10:00', 'TL-114', 'Tutorial', 'P2', 'T2 BBA-114 (SG)'),
  makeSlot('bba-b-s2', 'sub-bba-1', 'BBA-114', 'Financial Accounting', 'Saturday', '10:50', '11:40', 'TL-114', 'Lecture', 'ALL', 'L (AS)'),
  makeSlot('bba-b-s3', 'sub-bba-3', 'BBA-116', 'Quantitative Techniques', 'Saturday', '11:40', '12:30', 'TL-114', 'Lecture', 'ALL', 'L (VS)')
]

// --------------------------------------------------------------------------
// 10. B.PHARM (Bachelor of Pharmacy) - Page 20 (Sem: I)
// --------------------------------------------------------------------------
const BPHARM_SUBJECTS = [
  { id: 'sub-ph-1', code: 'BPT101T', name: 'Basics of Python Programming for Pharmaceutical Sciences (Theory)', faculty: 'Dr. Smriti Ojha', min_threshold: 75 },
  { id: 'sub-ph-2', code: 'BPT102T', name: 'General Pharmacy (Theory)', faculty: 'Anuj Srivastava', min_threshold: 75 },
  { id: 'sub-ph-3', code: 'BPT103T', name: 'Healthcare Psychology and Communication Skills (Theory)', faculty: 'Mrs. Susmita Chand', min_threshold: 75 },
  { id: 'sub-ph-4', code: 'BPT104T', name: 'Human Anatomy, Physiology and Pathophysiology I (Theory)', faculty: 'Dr Saba Parveen', min_threshold: 75 },
  { id: 'sub-ph-5', code: 'BPT105T', name: 'Introduction to Pharmacognosy (Theory)', faculty: 'Dr Anju Verma', min_threshold: 75 },
  { id: 'sub-ph-6', code: 'BPT106T', name: 'Pharmaceutical Inorganic and Analytical Chemistry (Theory)', faculty: 'Dr Gauri Shankar', min_threshold: 75 },
  { id: 'sub-ph-7', code: 'BPT107P', name: 'General Pharmacy (Practical)', faculty: 'Mr Ramashankar Dubey / Anuj Srivastava / Sarfaraz Hussain', min_threshold: 75 },
  { id: 'sub-ph-8', code: 'BPT108P', name: 'Healthcare Psychology and Communication Skills (Practical)', faculty: 'Mr Sandeep Singh / Susmita Chand / Anuj Srivastava', min_threshold: 75 },
  { id: 'sub-ph-9', code: 'BPT109P', name: 'Human Anatomy, Physiology and Pathophysiology I (Practical)', faculty: 'Dr Rohit Kumar / Safina Khatoon / Mr Pratik Vishwakarma', min_threshold: 75 },
  { id: 'sub-ph-10', code: 'BPT110P', name: 'Introduction to Pharmacognosy (Practical)', faculty: 'Dr Anju Verma / Aparna Mishra / Aradhana', min_threshold: 75 },
  { id: 'sub-ph-11', code: 'BPT111P', name: 'Pharmaceutical Inorganic and Analytical Chemistry (Practical)', faculty: 'Dr Gauri Shankar / Mr. Tasneef Ahmed / Nitin Kumar', min_threshold: 75 }
]

const BPHARM_SLOTS = [
  // Monday
  makeSlot('ph-m1-p1', 'sub-ph-8', 'BPT108P', 'Healthcare Psychology (Practical)', 'Monday', '09:10', '10:50', 'L-115', 'Lab', 'P1', 'P/1/BPT108P (SKS/SP)'),
  makeSlot('ph-m1-p2', 'sub-ph-8', 'BPT108P', 'Healthcare Psychology (Practical)', 'Monday', '10:50', '12:30', 'L-115', 'Lab', 'P2', 'P/2/BPT108P (SC/SKS)'),
  makeSlot('ph-m2-p1', 'sub-ph-9', 'BPT109P', 'Human Anatomy & Physiology (Practical)', 'Monday', '14:00', '16:15', 'HAP Lab', 'Lab', 'P1', 'P/1/BPT109P/RK/SY - HAP Lab'),
  makeSlot('ph-m2-p2', 'sub-ph-10', 'BPT110P', 'Pharmacognosy (Practical)', 'Monday', '14:00', '16:15', 'Micro Lab', 'Lab', 'P2', 'P/2/BPT110P/AV/AD - Micro Lab'),

  // Tuesday
  makeSlot('ph-t1', 'sub-ph-5', 'BPT105T', 'Introduction to Pharmacognosy', 'Tuesday', '09:10', '10:00', 'CH-206', 'Lecture', 'ALL', 'L (AV)'),
  makeSlot('ph-t2', 'sub-ph-4', 'BPT104T', 'Human Anatomy & Physiology', 'Tuesday', '10:00', '10:50', 'CH-206', 'Lecture', 'ALL', 'L (DSP)'),
  makeSlot('ph-t3', 'sub-ph-6', 'BPT106T', 'Pharmaceutical Inorganic Chemistry', 'Tuesday', '10:50', '11:40', 'CH-206', 'Lecture', 'ALL', 'L (GS)'),
  makeSlot('ph-t4-p1', 'sub-ph-8', 'BPT108P', 'Healthcare Psychology (Practical)', 'Tuesday', '14:00', '15:30', 'Micro Lab', 'Lab', 'P1', 'P/3/BPT108P/SC/SKS - Micro Lab'),

  // Wednesday
  makeSlot('ph-w1', 'sub-ph-4', 'BPT104T', 'Human Anatomy & Physiology', 'Wednesday', '09:10', '10:00', 'CH-206', 'Lecture', 'ALL', 'L (DSP)'),
  makeSlot('ph-w2', 'sub-ph-2', 'BPT102T', 'General Pharmacy', 'Wednesday', '10:00', '10:50', 'CH-206', 'Lecture', 'ALL', 'L (AJ)'),
  makeSlot('ph-w3', 'sub-ph-6', 'BPT106T', 'Pharmaceutical Inorganic Chemistry', 'Wednesday', '10:50', '11:40', 'CH-206', 'Lecture', 'ALL', 'L (GS)'),
  makeSlot('ph-w4', 'sub-ph-3', 'BPT103T', 'Healthcare Psychology', 'Wednesday', '11:40', '12:30', 'CH-206', 'Lecture', 'ALL', 'L (SC)'),
  makeSlot('ph-w5-p1', 'sub-ph-10', 'BPT110P', 'Pharmacognosy (Practical)', 'Wednesday', '14:00', '16:15', 'Micro Lab', 'Lab', 'P1', 'P/1/BPT110P/AV/AD'),
  makeSlot('ph-w5-p2', 'sub-ph-11', 'BPT111P', 'Analytical Chemistry (Practical)', 'Wednesday', '14:00', '16:15', 'Chemistry Lab', 'Lab', 'P2', 'P/2/BPT111P/GS/TA'),

  // Thursday
  makeSlot('ph-th1', 'sub-ph-1', 'BPT101T', 'Basics of Python Programming', 'Thursday', '10:00', '10:50', 'CH-206', 'Lecture', 'ALL', 'L (SO)'),
  makeSlot('ph-th2', 'sub-ph-4', 'BPT104T', 'Human Anatomy & Physiology', 'Thursday', '10:50', '11:40', 'CH-206', 'Lecture', 'ALL', 'L (DSP)'),
  makeSlot('ph-th3', 'sub-ph-5', 'BPT105T', 'Introduction to Pharmacognosy', 'Thursday', '11:40', '12:30', 'CH-206', 'Lecture', 'ALL', 'L (AV)'),
  makeSlot('ph-th4-p1', 'sub-ph-11', 'BPT111P', 'Analytical Chemistry (Practical)', 'Thursday', '14:00', '16:15', 'Chemistry Lab', 'Lab', 'P1', 'P/1/BPT111P/GS/TA'),
  makeSlot('ph-th4-p2', 'sub-ph-7', 'BPT107P', 'General Pharmacy (Practical)', 'Thursday', '14:00', '16:15', 'P\'ceutics Lab', 'Lab', 'P2', 'P/2/BPT107P/AJ/SH'),

  // Friday
  makeSlot('ph-f1', 'sub-ph-2', 'BPT102T', 'General Pharmacy', 'Friday', '09:10', '10:00', 'CH-206', 'Lecture', 'ALL', 'L (AJ)'),
  makeSlot('ph-f2', 'sub-ph-6', 'BPT106T', 'Pharmaceutical Inorganic Chemistry', 'Friday', '10:00', '10:50', 'CH-206', 'Lecture', 'ALL', 'L (GS)'),
  makeSlot('ph-f3', 'sub-ph-4', 'BPT104T', 'Human Anatomy & Physiology', 'Friday', '10:50', '11:40', 'CH-206', 'Lecture', 'ALL', 'L (DSP)'),
  makeSlot('ph-f4-p1', 'sub-ph-7', 'BPT107P', 'General Pharmacy (Practical)', 'Friday', '14:00', '16:15', 'P\'ceutics Lab', 'Lab', 'P1', 'P/1/BPT107P/AJ/SH'),
  makeSlot('ph-f4-p2', 'sub-ph-9', 'BPT109P', 'Human Anatomy & Physiology (Practical)', 'Friday', '14:00', '16:15', 'HAP Lab', 'Lab', 'P2', 'P/2/BPT109P/RK/SY'),

  // Saturday
  makeSlot('ph-s1', 'sub-ph-1', 'BPT101T', 'Basics of Python Programming', 'Saturday', '09:10', '10:00', 'CH-206', 'Lecture', 'ALL', 'L (SO)'),
  makeSlot('ph-s2', 'sub-ph-5', 'BPT105T', 'Introduction to Pharmacognosy', 'Saturday', '10:00', '10:50', 'CH-206', 'Lecture', 'ALL', 'L (AV)'),
  makeSlot('ph-s3', 'sub-ph-2', 'BPT102T', 'General Pharmacy', 'Saturday', '10:50', '11:40', 'CH-206', 'Lecture', 'ALL', 'L (AJ)')
]

/**
 * Main Database Resolver for First Year
 * Matches Department and Section accurately according to MMMUT 1st Year Timetables.
 * For non-first-year students, returns an empty clean database ({ subjects: [], slots: [] }).
 */
export function getFirstYearBranchSchedule(department = '', section = 'SEC-A', yearOfStudy = '', semester = '') {
  // If yearOfStudy or semester indicates higher years (2nd, 3rd, 4th, PG), keep database completely clean
  if (yearOfStudy) {
    const yr = yearOfStudy.toLowerCase()
    if (yr.includes('2') || yr.includes('3') || yr.includes('4') || yr.includes('post') || yr.includes('other')) {
      return { subjects: [], slots: [] }
    }
  }

  if (semester) {
    const sem = semester.toLowerCase()
    if (sem.includes('3') || sem.includes('4') || sem.includes('5') || sem.includes('6') || sem.includes('7') || sem.includes('8')) {
      return { subjects: [], slots: [] }
    }
  }

  const dept = (department || '').toLowerCase()
  const secUpper = (section || '').toUpperCase().trim()
  const isSecB = secUpper === 'B' || secUpper === 'SEC-B' || secUpper.endsWith('-B') || secUpper.endsWith(' B') || secUpper.includes('SEC B')
  const isSecC = secUpper === 'C' || secUpper === 'SEC-C' || secUpper.endsWith('-C') || secUpper.endsWith(' C') || secUpper.includes('SEC C')
  const isSecD = secUpper === 'D' || secUpper === 'SEC-D' || secUpper.endsWith('-D') || secUpper.endsWith(' D') || secUpper.includes('SEC D')

  // 1. Civil Engineering
  if (dept.includes('civil') || dept === 'ce' || dept.includes('(ce)')) {
    return {
      branchName: 'Civil Engineering',
      section: isSecB ? 'SEC-B' : 'SEC-A',
      room: 'TL-206',
      subjects: CE_SUBJECTS.map(s => ({ ...s })),
      slots: (isSecB ? CE_SEC_B_SLOTS : CE_SEC_A_SLOTS).map(s => ({ ...s }))
    }
  }

  // 2. Computer Science & Engineering (CSE)
  if (dept.includes('computer') || dept.includes('cse')) {
    let slots = CSE_SEC_A_SLOTS
    let sectionName = 'SEC-A'
    let room = 'TL-109'

    if (isSecD) {
      slots = CSE_SEC_D_SLOTS
      sectionName = 'SEC-D'
      room = 'TL-201'
    } else if (isSecC) {
      slots = CSE_SEC_C_SLOTS
      sectionName = 'SEC-C'
      room = 'TL-201'
    } else if (isSecB) {
      slots = CSE_SEC_B_SLOTS
      sectionName = 'SEC-B'
      room = 'TL-109'
    }

    return {
      branchName: 'Computer Science & Engineering',
      section: sectionName,
      room,
      subjects: CSE_A_SUBJECTS.map(s => ({ ...s })),
      slots: slots.map(s => ({ ...s }))
    }
  }

  // 3. Information Technology (IT)
  if (dept.includes('information') || dept === 'it' || dept.includes('(it)')) {
    return {
      branchName: 'Information Technology',
      section: isSecB ? 'SEC-B' : 'SEC-A',
      room: 'TL-203',
      subjects: IT_SUBJECTS.map(s => ({ ...s })),
      slots: (isSecB ? IT_SEC_B_SLOTS : IT_SEC_A_SLOTS).map(s => ({ ...s }))
    }
  }

  // 4. Chemical Engineering (CHE)
  if (dept.includes('chemical') || /\b(che|ch)\b/i.test(dept)) {
    return {
      branchName: 'Chemical Engineering',
      section: 'SEC-A',
      room: 'TL-110',
      subjects: CHE_SUBJECTS.map(s => ({ ...s })),
      slots: CHE_SEC_A_SLOTS.map(s => ({ ...s }))
    }
  }

  // 5. Mechanical Engineering (ME)
  if (dept.includes('mech') || dept === 'me' || dept.includes('(me)') || dept.includes('production') || dept.includes('manufactur')) {
    return {
      branchName: 'Mechanical Engineering',
      section: isSecB ? 'SEC-B' : 'SEC-A',
      room: 'TL-205',
      subjects: ME_SUBJECTS.map(s => ({ ...s })),
      slots: (isSecB ? ME_SEC_B_SLOTS : ME_SEC_A_SLOTS).map(s => ({ ...s }))
    }
  }

  // 6. Electrical Engineering (EE)
  if ((dept.includes('electr') && !dept.includes('comm')) || dept === 'ee' || dept.includes('(ee)')) {
    return {
      branchName: 'Electrical Engineering',
      section: isSecB ? 'SEC-B' : 'SEC-A',
      room: 'TL-202',
      subjects: EE_SUBJECTS.map(s => ({ ...s })),
      slots: (isSecB ? EE_SEC_B_SLOTS : EE_SEC_A_SLOTS).map(s => ({ ...s }))
    }
  }

  // 7. ECE (IoT)
  if (dept.includes('iot')) {
    return {
      branchName: 'Electronics & Communication Engineering (IoT)',
      section: 'SEC-A',
      room: 'TL-204',
      subjects: ECE_IOT_SUBJECTS.map(s => ({ ...s })),
      slots: ECE_IOT_SEC_A_SLOTS.map(s => ({ ...s }))
    }
  }

  // 8. Electronics & Communication Engineering (ECE)
  if (dept.includes('electro') || dept.includes('ece') || dept.includes('comm')) {
    let slots = ECE_SEC_A_SLOTS
    let sectionName = 'SEC-A'
    let room = 'TL-207'

    if (isSecC) {
      slots = ECE_SEC_C_SLOTS
      sectionName = 'SEC-C'
      room = 'TL-204'
    } else if (isSecB) {
      slots = ECE_SEC_B_SLOTS
      sectionName = 'SEC-B'
      room = 'TL-207'
    }

    return {
      branchName: 'Electronics & Communication Engineering',
      section: sectionName,
      room,
      subjects: ECE_SUBJECTS.map(s => ({ ...s })),
      slots: slots.map(s => ({ ...s }))
    }
  }

  // 9. BBA
  if (dept.includes('bba') || dept.includes('business') || dept.includes('management')) {
    return {
      branchName: 'Bachelor of Business Administration',
      section: isSecB ? 'SEC-B' : 'SEC-A',
      room: isSecB ? 'TL-114' : 'TL-113',
      subjects: BBA_SUBJECTS.map(s => ({ ...s })),
      slots: (isSecB ? BBA_SEC_B_SLOTS : BBA_SEC_A_SLOTS).map(s => ({ ...s }))
    }
  }

  // 10. B.Pharm
  if (dept.includes('pharm') || dept.includes('bpt') || dept.includes('b.pharm')) {
    return {
      branchName: 'Bachelor of Pharmacy',
      section: 'Sem I',
      room: 'L-115 / CH-206',
      subjects: BPHARM_SUBJECTS.map(s => ({ ...s })),
      slots: BPHARM_SLOTS.map(s => ({ ...s }))
    }
  }

  // Fallback for AI/DS or other tech branches in 1st year (standard CSE pattern)
  return {
    branchName: department || 'Engineering',
    section: section || 'SEC-A',
    room: 'TL-109',
    subjects: CSE_A_SUBJECTS.map(s => ({ ...s })),
    slots: CSE_SEC_A_SLOTS.map(s => ({ ...s }))
  }
}
