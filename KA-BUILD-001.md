 KA-BUILD-001 — Kpata Academy MVP Build Specification (UPDATED)
Document ID: KA-BUILD-001
Version: 3.0
Status: BUILD SPECIFICATION
Project: Kpata Academy
Purpose: Implementation-ready specification for the Kpata Academy MVP
Based On: KA-MASTER-TECH-001
Build Teams: 6 Core Teams with 31 Specialists + Synthesis Engine (Enhanced)
________________________________________
📋 Table of Contents
1.	MVP Feature Inventory
2.	Screen-by-Screen Specification
3.	User Journeys
4.	Database Schema
5.	API Specification
6.	Authentication Flows
7.	6 AI Build Teams — Expanded Architecture
8.	Synthesis Engine
9.	Confidence Score & Decision Logic
10.	10-Tier AI Supervision Architecture
11.	AI Gateway Interfaces
12.	Multilingual Implementation
13.	Academy Engine
14.	AI Studio
15.	StoryMaker
16.	Student Lab
17.	Kpata Guide
18.	Portfolio System
19.	Founder 100 System
20.	Admin Console
21.	Security Controls
22.	Governance Controls
23.	Tax Compliance Architecture
24.	Self-Marketing Engine
25.	Testing Requirements
26.	Deployment Procedure
27.	Acceptance Criteria
28.	Zero/Low-Budget Implementation Plan
29.	Exact Build Order
30.	MTN Strategic Alignment
31.	Multi-Language Nigerian LLM Pathway
32.	Build Command Reference
33.	Competition Discovery & Submission Engine
34.	Self-Improvement Engine (6 Month Trial)
________________________________________
1. MVP Feature Inventory
✅ IN SCOPE (MVP)
Category	Features
Learn	30 day AI Foundation Academy, AI Tutor, lessons, exercises, quizzes, assessments, progress tracking
Create	AI Studio (content, video, chatbot, assistant), StoryMaker (photo to video)
Prove	Projects, portfolio, achievements
Guide	Kpata Guide, Teach Me mode, interactive tutorials
Connect	Community feed, Founder 100 cohort, feedback system
Govern	Authentication, consent, privacy, audit, human approval, security
Multilingual	English, Hausa, Yorùbá, Igbo, Nigerian Pidgin (foundation)
Supervision	10 Tier AI Supervision Architecture
Build Governance	6 AI Build Teams with 31 Specialists + Synthesis Engine
Competition Discovery	Automatic search for grants, accelerators, and competitions (e.g., MTN Cloud Accelerator)
Self Improvement	Continuous improvement during the 6 month free trial based on feedback and usage data
Learn & Earn	Digital wallet, microtasks, freelance gigs, referrals, mentorship, certification savings
❌ OUT OF SCOPE (MVP)
Feature	Reason
Full Upwork/Fiverr marketplace	Post MVP
Proprietary foundation LLM	Too expensive
Fully autonomous AI Workforce	Post MVP
Complete Capability Factory	Post MVP
Family Vault / Memories Import	Post MVP
Native Android/iOS apps	Web/PWA first
Enterprise SSO	Post MVP
________________________________________
2. Screen by Screen Specification
(All screens remain as defined in the original document, with the following additions:)
2.11 Competition Dashboard (/competitions)
Element	Description
Header	"Competitions & Opportunities"
Active Competitions	List of open competitions with deadlines
Eligibility Check	Auto shows which competitions Kpata qualifies for
Submission Status	Draft, submitted, shortlisted, won
Apply Button	Triggers AI generated proposal draft
History	Past submissions and outcomes
2.12 Self Improvement Dashboard (/improvements)
Element	Description
Header	"Platform Improvements"
Active Proposals	AI generated improvement suggestions
Approve / Reject	Buttons for human approval
Impact Metrics	Before/after metrics for completed improvements
History	Past improvements and their results
________________________________________
3. User Journeys
(Existing journeys remain, plus:)
3.6 Competition Discovery Journey
text
Admin triggers discovery → AI scrapes sources → Competitions listed → Admin reviews → AI generates proposal → Human approves → Submitted → Track outcome
3.7 Self Improvement Journey
text
User feedback / usage data → AI analyzes → Proposal generated → Human reviews → Approved → Implemented → Impact measured → Logged
________________________________________
4. Database Schema
(All original tables remain, plus:)
4.3 Competition & Self Improvement Tables
sql
-- Competitions
CREATE TABLE competitions (
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
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Submissions
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id UUID REFERENCES competitions(id) NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW(),
  status TEXT CHECK (status IN ('draft','submitted','shortlisted','selected','rejected')) DEFAULT 'draft',
  proposal_content TEXT,
  attachment_url TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Competition sources (for crawling)
CREATE TABLE competition_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_name TEXT NOT NULL,
  url TEXT NOT NULL,
  last_scraped TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Improvement proposals
CREATE TABLE improvement_proposals (
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
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Improvement metrics
CREATE TABLE improvement_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES improvement_proposals(id),
  metric_name TEXT NOT NULL,
  before_value REAL,
  after_value REAL,
  change_percentage REAL,
  measured_at TIMESTAMP DEFAULT NOW()
);
4.4 Learn & Earn Tables
(As defined previously — wallets, earnings_log, withdrawals, microtasks, microtask_submissions, gigs, gig_applications, referrals, mentorships, certification_sponsorships)
________________________________________
5. API Specification
(All original endpoints remain, plus:)
5.4 Competition Discovery Endpoints
Endpoint	Method	Purpose
/api/competitions	GET	List all competitions
/api/competitions/:id	GET	Competition details
/api/competitions/discover	POST	Trigger automatic discovery
/api/submissions/generate	POST	Generate proposal draft
/api/submissions/submit	POST	Submit proposal
5.5 Self Improvement Endpoints
Endpoint	Method	Purpose
/api/improvements/proposals	GET	List improvement proposals
/api/improvements/analyze	POST	Trigger analysis
/api/improvements/proposals/:id/approve	POST	Approve proposal
/api/improvements/proposals/:id/reject	POST	Reject proposal
/api/improvements/metrics	GET	View improvement metrics
________________________________________
6. Authentication Flows
(Unchanged — see original document)
________________________________________
7. 6 AI Build Teams — Expanded Architecture
7.1 Overview
We now have 6 Core Teams with 31 Specialists total, coordinated by the Synthesis Engine.
Team	Name	Specialists
Team 1	Instruction Quality Analysts	5
Team 2	Technical Architecture Board	5
Team 3	Security & Privacy Shield	5
Team 4	Governance & Policy Council	5
Team 5	MVP & Strategic Gatekeepers	5
Team 6 (NEW)	Quality Assurance & Test Execution	6
7.6 Team 6: Quality Assurance & Test Execution
Specialist	Function
Static Code Analyzer	Runs python -m py_compile (Python) or npx tsc --noEmit (TypeScript)
Runtime Simulator	Spins up a lightweight, temporary environment (Docker or subprocess)
Integration Tester	Verifies API endpoints and database queries with test data
Environment Validator	Checks environment variables, file paths, and dependencies
Error Interpreter	Translates test errors into plain English suggestions
Rollback Coordinator	If tests fail, suggests and applies rollback
________________________________________
8. Synthesis Engine
(Unchanged — orchestrates all teams)
________________________________________
9. Confidence Score & Decision Logic
(Unchanged — see original document)
________________________________________
10. 10 Tier AI Supervision Architecture
(Unchanged — see original document)
________________________________________
11. AI Gateway Interfaces
(Unchanged — see original document)
________________________________________
12. Multilingual Implementation
(Unchanged — see original document)
________________________________________
13. Academy Engine
(Unchanged — see original document)
________________________________________
14. AI Studio
(Unchanged — see original document)
________________________________________
15. StoryMaker
(Unchanged — see original document)
________________________________________
16. Student Lab
(Unchanged — see original document)
________________________________________
17. Kpata Guide
(Unchanged — see original document)
________________________________________
18. Portfolio System
(Unchanged — see original document)
________________________________________
19. Founder 100 System
(Unchanged — see original document)
________________________________________
20. Admin Console
(Unchanged, plus new tabs for Competition Dashboard and Self Improvement Dashboard)
________________________________________
21. Security Controls
(Unchanged — see original document)
________________________________________
22. Governance Controls
(Unchanged — see original document)
________________________________________
23. Tax Compliance Architecture
(Unchanged — see original document)
________________________________________
24. Self Marketing Engine
(Unchanged — see original document)
________________________________________
25. Testing Requirements
(Unchanged — see original document)
________________________________________
26. Deployment Procedure
(Unchanged — see original document)
________________________________________
27. Acceptance Criteria
(Unchanged — see original document)
________________________________________
28. Zero/Low Budget Implementation Plan
(Unchanged — see original document)
________________________________________
29. Exact Build Order
Phase 1: Foundation (Weeks 1–2)
1.1 Project setup
1.2 Authentication
1.3 Database schema
1.4 Multilingual foundation
1.5 Kpata Guide (static)
1.6 6 AI Build Teams + Synthesis Engine
Phase 2: Academy (Weeks 3–4)
2.1 Course structure
2.2 Lesson player
2.3 Exercise system
2.4 Progress tracking
2.5 AI Tutor (basic)
Phase 3: Studio & StoryMaker (Weeks 5–6)
3.1 AI Content Creator
3.2 AI Video Workflow
3.3 AI Chatbot Builder
3.4 StoryMaker core
3.5 AI Gateway
Phase 4: Lab, Portfolio, Competition & Self Improvement (Weeks 7–8)
4.1 Student Lab (basic)
4.2 Portfolio system
4.3 AI Supervision (10 Tier)
4.4 Admin Console (basic)
4.5 Competition Discovery & Submission Engine (NEW)
4.6 Self Improvement Engine (NEW)
4.7 Learn & Earn Engine (NEW)
Phase 5: Governance & Launch + Competition Submissions (Week 9–10)
5.1 Governance controls
5.2 Security controls
5.3 Founder 100 system
5.4 Testing
5.5 Deployment
5.6 Launch
5.7 First Competition Submission (NEW)
________________________________________
30. MTN Strategic Alignment
(Unchanged — see original document, plus MTN Cloud Accelerator is a key target for Competition Discovery)
________________________________________
31. Multi Language Nigerian LLM Pathway
(Unchanged — see original document)
________________________________________
32. Build Command Reference
(Unchanged — see original document)
________________________________________
33. Competition Discovery & Submission Engine
33.1 Purpose: Automatically find and apply to competitions, grants, and accelerators (e.g., MTN Cloud Accelerator, Google for Startups, AWS EdStart).
33.2 Sources: MTN Cloud Accelerator, Google for Startups, AWS EdStart, Mastercard Foundation, GIZ Digital Africa, Norwegian Nigeria Tech Fund, Microsoft AI for Good, local Nigerian tech hubs.
33.3 Process:
Scrape sources → Match eligibility → Rank by relevance → Alert admin → AI generate proposal → Human approval → Submit → Track outcome.
33.4 Technical Implementation:
•	Supabase tables: competitions, submissions, competition_sources
•	Python script: competition_discovery.py using requests and BeautifulSoup
•	Endpoints: /api/competitions, /api/competitions/discover, /api/submissions/generate
________________________________________
34. Self Improvement Engine (6 Month Trial)
34.1 Purpose: Continuously improve the platform during the 6 month free trial based on user feedback, usage data, and performance metrics.
34.2 Categories: Content, UI/UX, AI Tutor, Performance, AI Studio, StoryMaker, Kpata Guide, Multilingual, Referral/Share.
34.3 Loop:
Collect data → AI analysis → Generate proposal → Risk assessment → Human approval → Implement → Test → Deploy → Monitor → Report.
34.4 Key Metrics:
•	Lesson completion rate (>70%)
•	Exercise pass rate (>80%)
•	AI Tutor satisfaction (>4.5/5)
•	User retention (>60%)
•	StoryMaker success (>85%)
•	AI Studio daily active (>50%)
•	Multilingual usage (>20%)
34.5 Implementation:
•	Supabase tables: improvement_proposals, improvement_metrics
•	Python script: self_improvement.py
•	Endpoints: /api/improvements/proposals, /api/improvements/analyze, /api/improvements/proposals/:id/approve, /api/improvements/proposals/:id/reject
________________________________________
📋 End of KA BUILD 001 (Updated)
