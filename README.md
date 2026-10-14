# Attendo - Smart Campus Attendance Tracker

Modern, responsive web app for college academic attendance tracking, timetable management, and safe bunk calculations tailored for university students across all branches and sections.

---

## 🛠️ Backend Architecture (Dual-Mode)

The application uses an **intelligent dual-mode backend architecture**:

### 1. Local Storage Engine (Active by default)
- **Status:** **100% Finished and fully functional.**
- **No external server or database setup required** to test and run the app.
- Features included out of the box:
  - Student registration & login with auto-generated Student ID (`STU-YYYY-XXXX`).
  - Section (`SEC-A`) and Lab Sub-batch (`Group P1` / `Group P2`) selection.
  - MMMUT Gorakhpur Semester 1 Timetable mapping for Lectures, Labs, Workshops, and Tutorials.
  - Strict P1/P2 lab segregation in Today's Schedule and Attendance Checklist.
  - Real-time attendance percentage, bunk calculations, and recovery alerts.
  - Complete data isolation per student and clean initial state (starts at 0%).

### 2. Live Cloud Database (Supabase + PostgreSQL)
- **Status:** **100% Coded and ready to connect in 2 minutes.**
- Complete SQL schema with Row-Level Security (RLS) is provided in [`supabase_schema.sql`](./supabase_schema.sql).
- Follow these steps whenever you wish to go live:
  1. Create a free project at [supabase.com](https://supabase.com).
  2. Open the **SQL Editor** in your Supabase Dashboard and paste the contents of [`supabase_schema.sql`](./supabase_schema.sql), then click **Run**.
  3. Create a `.env` file in the project root:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-public-key
     ```
  4. Restart Vite (`npm run dev`). The application will automatically detect the credentials and switch to live cloud synchronization!

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Production build
npm run build
```
