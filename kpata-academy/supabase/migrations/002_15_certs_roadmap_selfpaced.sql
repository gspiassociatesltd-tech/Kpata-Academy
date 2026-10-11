
-- KPATA ACADEMY - 15 CERTS ROADMAP + SELF-PACED ENGINE
-- Date: 2026-10-02 - Master Builder Build

-- 1. External Certifications Table (Real Free Certs)
CREATE TABLE IF NOT EXISTS external_certifications (
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

-- 2. Update courses to be self-paced (if not exists)
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_self_paced BOOLEAN DEFAULT TRUE;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS estimated_days INTEGER;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS certification_id UUID REFERENCES external_certifications(id);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS tool_choice_guide TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS phase TEXT;

-- 3. Certification Progress Tracking
CREATE TABLE IF NOT EXISTS certification_progress (
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

-- 4. Opportunity Engine Upgrade
CREATE TABLE IF NOT EXISTS opportunities (
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

-- SEED DATA: 15 Internationally Recognized FREE Certifications
INSERT INTO external_certifications (name, provider, category, cost, duration, url, employability_score, voucher_info, tool_guidance, roadmap_phase) VALUES
-- PHASE 1: 0-30 Days
('Google AI Essentials', 'Google / Coursera', 'ai_foundation', 'Free audit + cert', '10 hours', 'https://www.coursera.org/googleai', 9, 'Free via audit, shareable certificate from Google', '{"problem": "Need AI literacy fast", "recommended_tools": ["Gemini", "ChatGPT"], "why": "Fastest, gold standard 2026, required in Upwork jobs"}', 'phase1_0_30'),
('IBM AI Fundamentals', 'IBM SkillsBuild', 'ai_foundation', '100% Free', '15 hours', 'https://skillsbuild.org', 8, 'Digital badge via Credly, 1000+ free courses', '{"problem": "Understand AI for business", "recommended_tools": ["IBM Watson", "ChatGPT"], "why": "Enterprise AI, Watson, good for business use-case"}', 'phase1_0_30'),
('Anthropic Claude 101 & AI Fluency', 'Anthropic Academy', 'ai_foundation', '100% Free', '6-7 hours', 'https://www.anthropic.com/academy', 9, 'Free LinkedIn certificate, 56% pay premium for AI skills', '{"problem": "Master prompting", "recommended_tools": ["Claude 3.5 Sonnet"], "why": "Best for prompt writing, AI evaluation, content creation"}', 'phase1_0_30'),

-- PHASE 2: 30-90 Days
('Microsoft AI-900 Azure AI Fundamentals', 'Microsoft Learn', 'ai_foundation', 'Free training + free voucher during AI Skills Fest 2026', '20 hours', 'https://learn.microsoft.com', 10, 'FREE exam voucher during AI Skills Fest, never expires', '{"problem": "Cloud AI role", "recommended_tools": ["Azure AI Studio", "Copilot"], "why": "Classic resume combo, never expires"}', 'phase2_30_90'),
('Microsoft DP-900 Data Fundamentals', 'Microsoft Learn', 'data', 'Free training + free voucher', '15 hours', 'https://learn.microsoft.com', 9, 'Part of fundamentals trio AZ-900 + AI-900 + DP-900', '{"problem": "Data role entry", "recommended_tools": ["Azure Data Studio", "Power BI"], "why": "Entry point for data analysts"}', 'phase2_30_90'),
('Microsoft AZ-900 Azure Fundamentals', 'Microsoft Learn', 'cloud', 'Free training + free voucher', '15 hours', 'https://learn.microsoft.com', 9, 'One-and-done credential', '{"problem": "Cloud literacy", "recommended_tools": ["Azure Portal"], "why": "Foundational for all cloud jobs"}', 'phase2_30_90'),
('AWS Certified AI Practitioner (AIF-C01)', 'AWS Skill Builder', 'ai_foundation', 'Free training, $100 exam but FREE Cloud Practitioner voucher if you pass', '20 hours', 'https://skillbuilder.aws', 10, 'Pass AI Practitioner = Free Cloud Practitioner exam voucher until Nov 30 2026', '{"problem": "AI + Cloud combined", "recommended_tools": ["AWS Bedrock", "PartyRock"], "why": "AWS is #1 cloud, non-technical friendly"}', 'phase2_30_90'),
('AWS Cloud Practitioner', 'AWS Skill Builder', 'cloud', 'Free via promo', '20 hours', 'https://skillbuilder.aws', 9, 'Free via AI Practitioner promo', '{"problem": "Cloud career start", "recommended_tools": ["AWS Console", "Cloud Quest Game"], "why": "Game-based learning, free"}', 'phase2_30_90'),
('Cisco Intro to Cybersecurity', 'Cisco NetAcad', 'cybersecurity', '100% Free', '15 hours', 'https://netacad.com', 8, 'Self-paced, no prerequisites', '{"problem": "Remote support job", "recommended_tools": ["Cisco Packet Tracer"], "why": "Required for remote support, IT helpdesk"}', 'phase2_30_90'),

-- PHASE 3: 90-180 Days
('Google Data Analytics Certificate', 'Google / Coursera', 'data', 'Free audit', '3-6 months self-paced', 'https://www.coursera.org/professional-certificates/google-data-analytics', 10, 'Top 12 certs for remote jobs 2026, employer consortium', '{"problem": "Data analyst remote job", "recommended_tools": ["BigQuery", "Tableau Public", "Sheets"], "why": "High-paying remote, no degree needed"}', 'phase3_90_180'),
('HubSpot Content Marketing & SEO', 'HubSpot Academy', 'marketing', '100% Free', '6 hours', 'https://academy.hubspot.com', 8, 'Instant certificate, recognized by employers', '{"problem": "Marketing freelance", "recommended_tools": ["HubSpot CRM", "Canva AI", "Jasper"], "why": "Inbound marketing, content creation with AI"}', 'phase3_90_180'),
('Meta Digital Marketing Associate', 'Meta Blueprint', 'marketing', 'Free training, exam $99 but often free voucher', '20 hours', 'https://www.facebook.com/business/learn', 8, 'For social media WFH roles', '{"problem": "Social media manager", "recommended_tools": ["Meta Ads Manager", "Canva"], "why": "100% WFH social media roles"}', 'phase3_90_180'),
('freeCodeCamp Responsive Web Design + Python', 'freeCodeCamp', 'development', '100% Free', '300 hours self-paced', 'https://www.freecodecamp.org', 9, 'Projects-based, portfolio proves skills', '{"problem": "Build real products", "recommended_tools": ["VS Code", "Replit", "GitHub Copilot"], "why": "Skills + projects get you hired, not certs alone"}', 'phase3_90_180'),
('HP LIFE AI for Business', 'HP Foundation', 'ai_foundation', '100% Free', '5 hours', 'https://www.life-global.org', 7, 'Huge in Nigeria, business focus', '{"problem": "Business owner using AI", "recommended_tools": ["HP LIFE tools", "ChatGPT for business"], "why": "Entrepreneur track, good for NiChAm Trade"}', 'phase3_90_180'),
('Google Project Management', 'Google / Coursera', 'development', 'Free audit', '6 months self-paced', 'https://www.coursera.org/professional-certificates/google-project-management', 9, 'High-paying remote, no degree', '{"problem": "Remote project manager", "recommended_tools": ["Trello + AI", "Notion AI", "Asana"], "why": "Project management with AI tools"}', 'phase3_90_180')
ON CONFLICT DO NOTHING;

-- Seed self-paced courses mapped to certs
INSERT INTO courses (title, description, difficulty, duration_hours, languages, is_published, is_self_paced, estimated_days, phase) VALUES
('30-Day AI Mastery: Tool Choice + Google AI Essentials', 'Self-paced. Learn WHEN to use WHICH AI tool. Build 2 projects. Ready for Google AI Essentials free cert. Kpata applies on your behalf.', 'beginner', 40, ARRAY['en','ha','yo','ig','pcm'], true, true, 30, 'phase1_0_30'),
('Builder Track: Microsoft & AWS AI + Cloud', 'Self-paced. AZ-900 + AI-900 + DP-900 + AWS AI Practitioner. Free vouchers. Tool guidance for cloud solutions.', 'intermediate', 80, ARRAY['en','ha','yo','ig','pcm'], true, true, 60, 'phase2_30_90'),
('Specialist Track: Data, Marketing & Portfolio to Earn', 'Self-paced. Google Data Analytics + HubSpot + Meta + freeCodeCamp. Portfolio-first, employable online.', 'intermediate', 150, ARRAY['en','ha','yo','ig','pcm'], true, true, 90, 'phase3_90_180')
ON CONFLICT DO NOTHING;
