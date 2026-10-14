import { getFirstYearBranchSchedule } from './firstYearDatabase'

/**
 * Returns complete, pre-configured subjects and weekly timetable slots
 * with respect to the branch and section for 1st Year.
 * For other years (2nd, 3rd, 4th), keeps the database clean (empty)
 * while ensuring 100% compatibility for any timetable uploaded via OCR or added manually.
 */
export function getBranchSchedulePreset(departmentName = '', section = 'SEC-A', labGroup = 'P1', yearOfStudy = '1st Year', semester = 'Semester 1') {
  return getFirstYearBranchSchedule(departmentName, section, yearOfStudy, semester)
}

export { getFirstYearBranchSchedule }
