-- KPATA ACADEMY - FIXED SCHEMA v2 (Idempotent)
-- This version will NOT error if tables already exist
-- If you want a fresh start, run the CLEANUP script first (see below)

-- OPTIONAL CLEANUP (only if you want to start fresh - uncomment to use):
-- DROP TABLE IF EXISTS earnings_log, wallets, improvement_proposals, competition_sources, submissions, competitions, feedback, audit_log, ai_interactions, portfolio_items, projects, user_progress, exercises, lessons, courses, user_consents, users CASCADE;


-- KA-BUILD-001 v2.0 + v3.0 MERGED SCHEMA
-- Core Tables
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  full_name TEXT NOT NULL,
  preferred_language TEXT DEFAULT 'en',
  avatar_url TEXT,
  role TEXT CHECK (role IN ('user', 'admin', 'founder')) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS user_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  consent_type TEXT NOT NULL,
  consented BOOLEAN NOT NULL,
  version TEXT NOT NULL,
  consent_date TIMESTAMP DEFAULT NOW(),
  revoked_date TIMESTAMP
);
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner','intermediate','advanced')),
  duration_hours INTEGER,
  languages TEXT[] DEFAULT ARRAY['en'],
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) NOT NULL,
  question TEXT NOT NULL,
  question_type TEXT CHECK (question_type IN ('multiple_choice','text','code','project')),
  options JSONB,
  correct_answer TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  lesson_id UUID REFERENCES lessons(id) NOT NULL,
  status TEXT CHECK (status IN ('not_started','in_progress','completed')),
  score INTEGER,
  completed_at TIMESTAMP,
  started_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  project_type TEXT CHECK (project_type IN ('academy','studio','storymaker','lab','custom')),
  content JSONB,
  portfolio_ready BOOLEAN DEFAULT FALSE,
  ai_disclosure TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  project_id UUID REFERENCES projects(id),
  title TEXT NOT NULL,
  description TEXT,
  skills TEXT[],
  ai_contribution TEXT,
  human_contribution TEXT,
  evidence_url TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS ai_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  session_id UUID,
  model TEXT,
  prompt TEXT,
  response TEXT,
  supervision_results JSONB,
  cost REAL,
  tokens_used INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  feedback_type TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
-- NEW in v3.0
CREATE TABLE IF NOT EXISTS competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  eligibility_criteria TEXT,
  deadline TIMESTAMP,
  award_value TEXT,
  url TEXT,
  source TEXT,
  status TEXT CHECK (status IN ('active','pending','submitted','won','lost','ineligible')) DEFAULT 'active',
  relevance_score INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id UUID REFERENCES competitions(id) NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW(),
  status TEXT CHECK (status IN ('draft','submitted','shortlisted','selected','rejected')) DEFAULT 'draft',
  proposal_content TEXT,
  attachment_url TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS competition_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_name TEXT NOT NULL,
  url TEXT NOT NULL,
  last_scraped TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS improvement_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  rationale TEXT,
  estimated_impact TEXT,
  risk_assessment TEXT,
  proposed_changes JSONB,
  status TEXT CHECK (status IN ('proposed','approved','implemented','rejected','monitoring')) DEFAULT 'proposed',
  implemented_at TIMESTAMP,
  impact_measured TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
-- Learn & Earn
CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL UNIQUE,
  balance REAL DEFAULT 0,
  certification_savings REAL DEFAULT 0,
  withdrawal_pending REAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS earnings_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  source TEXT CHECK (source IN ('microtask', 'freelance', 'referral', 'mentorship', 'bonus', 'withdrawal')),
  amount REAL NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  reference_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);
