
-- NUCLEAR WIPE - Drops ALL tables in public schema - Kpata Academy
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;



-- KPATA ACADEMY - FRESH START COMPLETE SCHEMA v4.0
-- Date: 2026-10-11 - Includes: Core + 15 Free Certs Roadmap + Self-Paced
-- Run this on a CLEAN Supabase project

-- ========== CLEANUP FIRST (Safe to run even if tables don't exist) ==========
DROP TABLE IF EXISTS opportunities CASCADE;
DROP TABLE IF EXISTS certification_progress CASCADE;
DROP TABLE IF EXISTS external_certifications CASCADE;
DROP TABLE IF EXISTS earnings_log CASCADE;
DROP TABLE IF EXISTS wallets CASCADE;
DROP TABLE IF EXISTS improvement_proposals CASCADE;
DROP TABLE IF EXISTS competition_sources CASCADE;
DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS competitions CASCADE;
DROP TABLE IF EXISTS feedback CASCADE;
DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS ai_interactions CASCADE;
DROP TABLE IF EXISTS portfolio_items CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS user_progress CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS user_consents CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ========== CORE TABLES ==========
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  language TEXT DEFAULT 'en' CHECK (language IN ('en','ha','yo','ig','pcm')),
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student','admin','mentor')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  consent_type TEXT NOT NULL,
  granted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- COURSES: Now self-paced, no duration_hours, uses estimated_days
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner','intermediate','advanced')),
  estimated_days INTEGER DEFAULT 30,
  duration_text TEXT DEFAULT 'Self-paced',
  languages TEXT[] DEFAULT ARRAY['en','ha','yo','ig','pcm'],
  is_published BOOLEAN DEFAULT TRUE,
  is_self_paced BOOLEAN DEFAULT TRUE,
  phase TEXT CHECK (phase IN ('phase1_0_30','phase2_30_90','phase3_90_180')) DEFAULT 'phase1_0_30',
  tool_choice_guide TEXT,
  certification_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  order_index INTEGER,
  tool_guidance JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) NOT NULL,
  question TEXT NOT NULL,
  question_type TEXT CHECK (question_type IN ('text','code','choice')),
  expected_answer TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  lesson_id UUID REFERENCES lessons(id) NOT NULL,
  status TEXT CHECK (status IN ('not_started','in_progress','completed')) DEFAULT 'not_started',
  score INTEGER,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  tools_used TEXT[],
  why_tool_choice TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  project_id UUID REFERENCES projects(id),
  title TEXT NOT NULL,
  url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ai_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  prompt TEXT,
  response TEXT,
  tool_recommended TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action TEXT,
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('bug','feature','improvement')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========== COMPETITIONS & OPPORTUNITIES ==========
CREATE TABLE competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  provider TEXT,
  url TEXT,
  deadline TIMESTAMP,
  reward TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  competition_id UUID REFERENCES competitions(id) NOT NULL,
  project_url TEXT,
  status TEXT DEFAULT 'submitted',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE competition_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_scanned TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE improvement_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL UNIQUE,
  balance DECIMAL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE earnings_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES wallets(id) NOT NULL,
  amount DECIMAL NOT NULL,
  source TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========== 15 CERTS ROADMAP + SELF-PACED ==========
CREATE TABLE external_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  category TEXT CHECK (category IN ('ai_foundation','cloud','data','cybersecurity','marketing','development')),
  cost TEXT DEFAULT 'Free',
  duration TEXT,
  url TEXT,
  badge_type TEXT DEFAULT 'Digital Badge',
  employability_score INTEGER CHECK (employability_score BETWEEN 1 AND 10),
  is_free BOOLEAN DEFAULT TRUE,
  voucher_info TEXT,
  tool_guidance JSONB,
  roadmap_phase TEXT CHECK (roadmap_phase IN ('phase1_0_30','phase2_30_90','phase3_90_180')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE certification_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  certification_id UUID REFERENCES external_certifications(id) NOT NULL,
  status TEXT CHECK (status IN ('not_started','in_training','ready_to_apply','applied','won','lost')) DEFAULT 'not_started',
  training_progress INTEGER DEFAULT 0,
  portfolio_ready BOOLEAN DEFAULT FALSE,
  applied_date TIMESTAMP,
  certificate_url TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, certification_id)
);

CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('free_cert_voucher','freelance_gig','fellowship','scholarship','competition')),
  provider TEXT,
  url TEXT,
  deadline TIMESTAMP,
  eligibility TEXT,
  reward TEXT,
  status TEXT DEFAULT 'active',
  relevance_score INTEGER,
  certification_id UUID REFERENCES external_certifications(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========== SEED 15 CERTS ==========
INSERT INTO external_certifications (name, provider, category, cost, duration, url, employability_score, voucher_info, tool_guidance, roadmap_phase) VALUES
('Google AI Essentials', 'Google / Coursera', 'ai_foundation', 'Free audit', '10 hours', 'https://www.coursera.org/googleai', 9, 'Free via audit, shareable certificate from Google', '{"problem": "Need AI literacy fast", "recommended_tools": ["Gemini", "ChatGPT"], "why": "Gold standard 2026, required in Upwork jobs"}', 'phase1_0_30'),
('IBM AI Fundamentals', 'IBM SkillsBuild', 'ai_foundation', '100% Free', '15 hours', 'https://skillsbuild.org', 8, 'Digital badge via Credly, 1000+ free courses', '{"problem": "Understand AI for business", "recommended_tools": ["IBM Watson", "ChatGPT"], "why": "Enterprise AI"}', 'phase1_0_30'),
('Anthropic Claude 101 & AI Fluency', 'Anthropic Academy', 'ai_foundation', '100% Free', '6-7 hours', 'https://www.anthropic.com/academy', 9, 'Free LinkedIn certificate, 56% pay premium', '{"problem": "Master prompting", "recommended_tools": ["Claude 3.5 Sonnet"], "why": "Best for prompt writing"}', 'phase1_0_30'),
('Microsoft AI-900 Azure AI Fundamentals', 'Microsoft Learn', 'ai_foundation', 'Free training + free voucher during AI Skills Fest 2026', '20 hours', 'https://learn.microsoft.com', 10, 'FREE voucher during AI Skills Fest, never expires', '{"problem": "Cloud AI role", "recommended_tools": ["Azure AI Studio", "Copilot"], "why": "Never expires"}', 'phase2_30_90'),
('Microsoft DP-900 Data Fundamentals', 'Microsoft Learn', 'data', 'Free training + voucher', '15 hours', 'https://learn.microsoft.com', 9, 'Part of trio AZ-900 + AI-900 + DP-900', '{"problem": "Data role entry", "recommended_tools": ["Azure Data Studio", "Power BI"], "why": "Entry for data analysts"}', 'phase2_30_90'),
('Microsoft AZ-900 Azure Fundamentals', 'Microsoft Learn', 'cloud', 'Free training + voucher', '15 hours', 'https://learn.microsoft.com', 9, 'One-and-done credential', '{"problem": "Cloud literacy", "recommended_tools": ["Azure Portal"], "why": "Foundational for cloud"}', 'phase2_30_90'),
('AWS Certified AI Practitioner (AIF-C01)', 'AWS Skill Builder', 'ai_foundation', 'Free training, $100 exam but FREE Cloud voucher if pass', '20 hours', 'https://skillbuilder.aws', 10, 'Pass AI = Free Cloud exam voucher until Nov 30 2026', '{"problem": "AI + Cloud combined", "recommended_tools": ["AWS Bedrock", "PartyRock"], "why": "AWS #1 cloud"}', 'phase2_30_90'),
('AWS Cloud Practitioner', 'AWS Skill Builder', 'cloud', 'Free via promo', '20 hours', 'https://skillbuilder.aws', 9, 'Free via AI promo', '{"problem": "Cloud career start", "recommended_tools": ["AWS Console", "Cloud Quest Game"], "why": "Game-based"}', 'phase2_30_90'),
('Cisco Intro to Cybersecurity', 'Cisco NetAcad', 'cybersecurity', '100% Free', '15 hours', 'https://netacad.com', 8, 'Self-paced', '{"problem": "Remote support job", "recommended_tools": ["Packet Tracer"], "why": "IT helpdesk"}', 'phase2_30_90'),
('Google Data Analytics Certificate', 'Google / Coursera', 'data', 'Free audit', '3-6 months self-paced', 'https://www.coursera.org/professional-certificates/google-data-analytics', 10, 'Top 12 remote job certs', '{"problem": "Data analyst remote", "recommended_tools": ["BigQuery", "Tableau Public"], "why": "High-paying remote"}', 'phase3_90_180'),
('HubSpot Content Marketing & SEO', 'HubSpot Academy', 'marketing', '100% Free', '6 hours', 'https://academy.hubspot.com', 8, 'Instant certificate', '{"problem": "Marketing freelance", "recommended_tools": ["HubSpot CRM", "Canva AI"], "why": "Inbound marketing"}', 'phase3_90_180'),
('Meta Digital Marketing Associate', 'Meta Blueprint', 'marketing', 'Free training', '20 hours', 'https://www.facebook.com/business/learn', 8, 'WFH roles', '{"problem": "Social media manager", "recommended_tools": ["Meta Ads Manager"], "why": "100% WFH"}', 'phase3_90_180'),
('freeCodeCamp Web Design + Python', 'freeCodeCamp', 'development', '100% Free', '300 hours self-paced', 'https://www.freecodecamp.org', 9, 'Projects-based', '{"problem": "Build real products", "recommended_tools": ["VS Code", "GitHub Copilot"], "why": "Portfolio proves skills"}', 'phase3_90_180'),
('HP LIFE AI for Business', 'HP Foundation', 'ai_foundation', '100% Free', '5 hours', 'https://www.life-global.org', 7, 'Huge in Nigeria', '{"problem": "Business owner using AI", "recommended_tools": ["ChatGPT for business"], "why": "Entrepreneur track"}', 'phase3_90_180'),
('Google Project Management', 'Google / Coursera', 'development', 'Free audit', '6 months self-paced', 'https://www.coursera.org/professional-certificates/google-project-management', 9, 'No degree needed', '{"problem": "Remote PM", "recommended_tools": ["Trello + AI", "Notion AI"], "why": "PM with AI tools"}', 'phase3_90_180');

-- SEED COURSES SELF-PACED
INSERT INTO courses (title, description, difficulty, estimated_days, duration_text, phase, tool_choice_guide) VALUES
('30-Day AI Mastery: Tool Choice + Google AI Essentials', 'Self-paced. Learn WHEN to use WHICH AI tool. Build 2 projects. Ready for Google AI Essentials free cert. Kpata applies on your behalf.', 'beginner', 30, 'Self-paced ~30 days', 'phase1_0_30', 'Problem → Tool → Why in EN/HA/YO/IG/PID'),
('Builder Track: Microsoft & AWS AI + Cloud (Self-Paced)', 'Self-paced. AZ-900 + AI-900 + DP-900 + AWS AI Practitioner. Free vouchers. Tool guidance for cloud solutions.', 'intermediate', 60, 'Self-paced ~60 days', 'phase2_30_90', 'Cloud problem → Azure vs AWS tool choice'),
('Specialist Track: Data, Marketing & Portfolio to Earn (Self-Paced)', 'Self-paced. Google Data Analytics + HubSpot + Meta + freeCodeCamp. Portfolio-first, employable online.', 'intermediate', 90, 'Self-paced ~90 days', 'phase3_90_180', 'Client problem → Right stack → Portfolio');

-- SEED OPPORTUNITIES (Free vouchers)
INSERT INTO opportunities (title, type, provider, url, reward, relevance_score) VALUES
('Microsoft AI Skills Fest 2026 - Free AI-900 Voucher', 'free_cert_voucher', 'Microsoft', 'https://learn.microsoft.com', 'Free $99 exam voucher', 10),
('AWS AI Practitioner Pass = Free Cloud Practitioner Exam', 'free_cert_voucher', 'AWS', 'https://skillbuilder.aws', 'Free $100 voucher until Nov 30 2026', 10),
('Upwork: Jobs requiring Google AI Essentials - 100% WFH', 'freelance_gig', 'Upwork', 'https://www.upwork.com', 'USD remote jobs', 9);
