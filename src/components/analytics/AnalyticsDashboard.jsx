import React from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Cell,
  PieChart,
  Pie
} from 'recharts'
import { FileSpreadsheet } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { getAttendanceColor } from '../../lib/utils'

export function AnalyticsDashboard({ stats, subjects = [] }) {
  const { user, showToast } = useAuth()
  const { isDark } = useTheme()

  const {
    overallPercentage = 100,
    totalConducted = 0,
    totalAttended = 0,
    totalMissed = 0,
    totalCancelled = 0,
    totalHolidays = 0
  } = stats || {}

  const barChartData = (stats?.subjects || subjects).map(s => ({
    name: s.code || s.name.slice(0, 10),
    fullName: s.name,
    percentage: s.percentage,
    attended: s.attended,
    conducted: s.conducted
  }))

  const pieData = [
    { name: 'Attended', value: totalAttended, color: '#10b981' },
    { name: 'Missed', value: totalMissed, color: '#f43f5e' },
    { name: 'Cancelled', value: totalCancelled, color: '#f59e0b' },
    { name: 'Holidays', value: totalHolidays, color: '#38bdf8' }
  ].filter(d => d.value > 0)

  const handleExportCsv = () => {
    const rows = [
      ['Student ID', user?.student_id || 'STU-NEW'],
      ['Student Name', user?.full_name || 'Student'],
      ['College', user?.college_name || 'College / University'],
      ['Department', user?.department || 'Branch / Department'],
      ['Batch Section', user?.section || 'Section'],
      ['Lab Sub-batch', user?.lab_group === 'ALL' ? 'Single Batch' : `Group ${user?.lab_group || 'P1'}`],
      ['Semester', user?.semester || 'Semester'],
      ['Report Date', new Date().toLocaleDateString()],
      ['Overall Percentage', `${overallPercentage}%`],
      ['Total Conducted', totalConducted],
      ['Total Attended', totalAttended],
      ['Total Missed', totalMissed],
      [''],
      ['Subject Code', 'Subject Name', 'Attended', 'Conducted', 'Attendance %', 'Status']
    ]

    ;(stats?.subjects || subjects).forEach(s => {
      rows.push([
        s.code || 'N/A',
        `"${s.name}"`,
        s.attended,
        s.conducted,
        `${s.percentage}%`,
        s.percentage >= 75 ? 'Healthy' : s.percentage >= 65 ? 'Warning' : 'Critical'
      ])
    })

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `Attendance_Report_${user?.student_id || 'student'}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    showToast('Downloaded attendance CSV report', 'info')
  }

  return (
    <div className="space-y-4">
      {/* Analytics Header & CSV Export */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 sm:p-6 rounded-3xl theme-card shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
            Academic Performance & Audit
          </h2>
          <p className="text-xs text-[#86868b] mt-0.5">
            Compare courses against the 75% college criterion and export compliance sheets.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-4 py-2.5 rounded-xl mac-btn-primary text-xs font-semibold inline-flex items-center gap-1.5 transition shrink-0"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Subject Comparison Bar Chart (2 cols) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-3xl theme-card shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">Course Attendance (%)</h3>
              <p className="text-[11px] text-[#86868b]">Red dashed line indicates 75% threshold</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -25, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#23242c' : '#f0f0f4'} />
                <XAxis dataKey="name" stroke={isDark ? '#86868b' : '#86868b'} fontSize={11} />
                <YAxis domain={[0, 100]} stroke={isDark ? '#86868b' : '#86868b'} fontSize={11} unit="%" />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: isDark ? '#121318' : '#ffffff', 
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', 
                    color: isDark ? '#f5f5f7' : '#1d1d1f',
                    borderRadius: '16px', 
                    fontSize: '11px',
                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.15)'
                  }}
                  formatter={(value, name, item) => [
                    `${value}% (${item.payload.attended}/${item.payload.conducted})`,
                    item.payload.fullName
                  ]}
                />
                <ReferenceLine y={75} stroke="#f43f5e" strokeDasharray="3 3" strokeWidth={1.5} />
                <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                  {barChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.percentage >= 75 ? '#10b981' : entry.percentage >= 65 ? '#f59e0b' : '#f43f5e'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sessions Distribution Donut Chart (1 col) */}
        <div className="p-5 sm:p-6 rounded-3xl theme-card flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="text-xs font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-0.5">Session Breakdown</h3>
            <p className="text-[11px] text-[#86868b] mb-4">Total recorded distribution</p>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`slice-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: isDark ? '#121318' : '#ffffff', 
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', 
                      color: isDark ? '#f5f5f7' : '#1d1d1f',
                      borderRadius: '16px', 
                      fontSize: '11px',
                      boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.15)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-2 text-[#86868b]">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium">{item.name}</span>
                  </span>
                  <span className="font-mono font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Subject Tabular Summary */}
      <div className="p-5 sm:p-6 rounded-3xl theme-card overflow-hidden shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-4">Academic Registry</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] dark:border-white/[0.06] text-[#86868b] font-semibold text-[11px]">
                <th className="py-3 px-3">Course</th>
                <th className="py-3 px-3">Faculty</th>
                <th className="py-3 px-3 text-center">Attended</th>
                <th className="py-3 px-3 text-center">Conducted</th>
                <th className="py-3 px-3 text-center">Percentage</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {(stats?.subjects || subjects).map((sub) => {
                const color = getAttendanceColor(sub.percentage)
                return (
                  <tr key={sub.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition">
                    <td className="py-3 px-3">
                      <span className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{sub.name}</span>
                      {sub.code && <span className="ml-2 text-[10px] font-mono font-semibold text-[#86868b]">{sub.code}</span>}
                    </td>
                    <td className="py-3 px-3 text-[#86868b] text-[11px]">
                      {sub.faculty || '—'}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {sub.attended}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-[#86868b]">
                      {sub.conducted}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`font-mono font-bold ${color.text}`}>
                        {sub.percentage}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono ${color.badge}`}>
                        {color.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
