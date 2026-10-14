-- ==============================================================================
-- Attendo: Smart Campus Attendance Tracker - Supabase SQL Schema
-- Run this script in the Supabase SQL Editor or via MCP
-- ==============================================================================

-- 1. Create Profiles Table (Linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  college_name TEXT NOT NULL,
  department TEXT NOT NULL,
  year_of_study TEXT NOT NULL,
  semester TEXT NOT NULL,
  section TEXT DEFAULT 'SEC-A',
  lab_group TEXT DEFAULT 'P1',
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Subjects / Courses Table
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT,
  name TEXT NOT NULL,
  faculty TEXT,
  min_threshold INTEGER DEFAULT 75,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Timetable Entries Table
CREATE TABLE IF NOT EXISTS public.timetable_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  day TEXT NOT NULL CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  room TEXT,
  semester TEXT,
  faculty TEXT,
  group_name TEXT DEFAULT 'ALL',
  type TEXT DEFAULT 'Lecture',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Attendance Records Table (Mutually Exclusive Status)
CREATE TABLE IF NOT EXISTS public.attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  timetable_id UUID REFERENCES public.timetable_entries(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'cancelled', 'holiday')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Ensure unique log per student, date, and class session
  CONSTRAINT unique_student_session_attendance UNIQUE (user_id, subject_id, date, timetable_id)
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timetable_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Subjects Policies
CREATE POLICY "Users can manage their own subjects" 
  ON public.subjects FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Timetable Policies
CREATE POLICY "Users can manage their own timetable" 
  ON public.timetable_entries FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Attendance Records Policies
CREATE POLICY "Users can manage their own attendance" 
  ON public.attendance_records FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ==============================================================================
-- AUTOMATIC STUDENT ID GENERATOR TRIGGER (e.g. STU-2026-8492)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_student_signup()
RETURNS TRIGGER AS $$
DECLARE
  generated_student_id TEXT;
BEGIN
  -- Generate unique student ID if not provided in metadata
  generated_student_id := COALESCE(
    NEW.raw_user_meta_data->>'student_id',
    'STU-' || EXTRACT(YEAR FROM CURRENT_DATE)::TEXT || '-' || LPAD(FLOOR(RANDOM() * 9000 + 1000)::TEXT, 4, '0')
  );

  INSERT INTO public.profiles (
    id,
    student_id,
    full_name,
    college_name,
    department,
    year_of_study,
    semester,
    section,
    lab_group,
    email
  ) VALUES (
    NEW.id,
    generated_student_id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student'),
    COALESCE(NEW.raw_user_meta_data->>'college_name', 'M.M.M. University of Technology, Gorakhpur'),
    COALESCE(NEW.raw_user_meta_data->>'department', 'Mechanical Engineering'),
    COALESCE(NEW.raw_user_meta_data->>'year_of_study', '1st Year'),
    COALESCE(NEW.raw_user_meta_data->>'semester', 'Semester 1'),
    COALESCE(NEW.raw_user_meta_data->>'section', 'SEC-A'),
    COALESCE(NEW.raw_user_meta_data->>'lab_group', 'P1'),
    NEW.email
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_student_signup();
