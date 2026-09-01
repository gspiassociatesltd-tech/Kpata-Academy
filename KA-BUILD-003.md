📄 KA-BUILD-003 — Kpata Academy Implementation Scripts (UPDATED)
Document ID: KA-BUILD-003
Version: 2.0
Status: IMPLEMENTATION READY
Project: Kpata Academy
Purpose: Copy-paste scripts, commands, and configurations to build the MVP foundation.
Based On: KA-BUILD-001, KA-BUILD-002
Build Teams: 6 Core Teams with 31 Specialists + Synthesis Engine (Active)
________________________________________
📋 Table of Contents
1.	Environment Setup
2.	Project Initialization
3.	Database Setup (Supabase)
4.	Authentication Setup (NextAuth + Supabase)
5.	Backend API (FastAPI)
6.	Competition Discovery Script
7.	Self-Improvement Script
8.	Frontend (Next.js) Skeleton
9.	Deployment Instructions
10.	Build Team Review & Approval
11.	Next Steps
________________________________________
1. Environment Setup
1.1 Prerequisites
Tool	Version	Purpose
Node.js	20.x LTS	Frontend (Next.js)
Python	3.12+	Backend (FastAPI)
Git	Latest	Version control
Supabase Account	Free tier	Database & Auth
Vercel Account	Free tier	Frontend hosting
Render Account	Free tier	Backend hosting
1.2 Install Node.js (if not installed)
bash
# Ubuntu/WSL
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v  # Should show v20.x
1.3 Install Python and Pip
bash
# Ubuntu/WSL
sudo apt update
sudo apt install python3 python3-pip python3-venv -y
python3 --version  # Should show 3.12+
1.4 Install Git
bash
sudo apt install git -y
git --version
1.5 Create Project Directory
bash
mkdir ~/kpata-academy
cd ~/kpata-academy
________________________________________
2. Project Initialization
2.1 Frontend: Next.js
bash
# Create Next.js app with TypeScript and Tailwind
npx create-next-app@latest frontend --typescript --tailwind --app --no-src-dir
cd frontend
npm install
2.2 Backend: FastAPI
bash
# Create backend directory
cd ~/kpata-academy
mkdir backend
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install core dependencies
pip install fastapi uvicorn python-dotenv supabase psycopg2-binary sqlalchemy httpx python-multipart pydantic[email]

# Install web scraping and utilities
pip install beautifulsoup4 lxml requests
2.3 Environment Variables
Create .env.local in the frontend directory:
bash
cd ~/kpata-academy/frontend
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
EOF
Create .env in the backend directory:
bash
cd ~/kpata-academy/backend
cat > .env << 'EOF'
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
AI_GATEWAY_API_KEY=your_ai_api_key  # Optional, mock for MVP
EOF
IMPORTANT: Replace your_* values with actual keys after setting up Supabase.
________________________________________
3. Database Setup (Supabase)
3.1 Create Supabase Project
1.	Go to supabase.com and sign up.
2.	Create a new project: kpata-academy.
3.	Note your Project URL and anon/public key and service_role key.
4.	Update the .env files with these values.
3.2 Run the Schema Migration
In the Supabase SQL Editor, run the schema from KA-BUILD-001 Sections 4.1, 4.3, and 4.4.
Complete SQL (all tables):
sql
-- ============================================================
-- CORE TABLES (Users, Courses, Lessons, Exercises, etc.)
-- ============================================================

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  preferred_language TEXT DEFAULT 'en',
  role TEXT CHECK (role IN ('user', 'admin', 'founder')) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Courses
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner','intermediate','advanced')),
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Exercises
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) NOT NULL,
  question TEXT NOT NULL,
  question_type TEXT CHECK (question_type IN ('multiple_choice','text','code','project')),
  options JSONB,
  correct_answer TEXT
);

-- User progress
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  lesson_id UUID REFERENCES lessons(id) NOT NULL,
  status TEXT CHECK (status IN ('not_started','in_progress','completed')),
  score INTEGER,
  completed_at TIMESTAMP
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  project_type TEXT CHECK (project_type IN ('academy','studio','storymaker','lab','custom')),
  content JSONB,
  portfolio_ready BOOLEAN DEFAULT FALSE,
  ai_disclosure TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Feedback
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  feedback_type TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- LEARN & EARN TABLES
-- ============================================================

-- Wallets
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL UNIQUE,
  balance REAL DEFAULT 0,
  certification_savings REAL DEFAULT 0,
  withdrawal_pending REAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Earnings log
CREATE TABLE earnings_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  source TEXT CHECK (source IN ('microtask', 'freelance', 'referral', 'mentorship', 'bonus', 'withdrawal')),
  amount REAL NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  reference_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Withdrawals
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  amount REAL NOT NULL,
  method TEXT CHECK (method IN ('mtn_momo', 'bank_transfer', 'airtime')),
  phone TEXT,
  account_details TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  processed_at TIMESTAMP
);

-- Microtasks
CREATE TABLE microtasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  reward_per_unit REAL NOT NULL,
  units_available INTEGER,
  instructions TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Microtask submissions
CREATE TABLE microtask_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  microtask_id UUID REFERENCES microtasks(id) NOT NULL,
  units_completed INTEGER NOT NULL,
  reward REAL NOT NULL,
  status TEXT DEFAULT 'pending_review',
  submitted_at TIMESTAMP DEFAULT NOW()
);

-- Freelance gigs
CREATE TABLE gigs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  budget REAL NOT NULL,
  skills_required TEXT[],
  client_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'open',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Gig applications
CREATE TABLE gig_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id UUID REFERENCES gigs(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  proposal TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Referrals
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES users(id) NOT NULL,
  referred_id UUID REFERENCES users(id) NOT NULL UNIQUE,
  commission_earned REAL DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Mentorships
CREATE TABLE mentorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES users(id) NOT NULL,
  mentee_id UUID REFERENCES users(id) NOT NULL UNIQUE,
  revenue_share REAL DEFAULT 0.05,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Certification sponsorship
CREATE TABLE certification_sponsorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  certification_name TEXT NOT NULL,
  total_cost REAL NOT NULL,
  amount_saved REAL DEFAULT 0,
  status TEXT DEFAULT 'in_progress',
  sponsor_contribution REAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- ============================================================
-- COMPETITION & SELF-IMPROVEMENT TABLES
-- ============================================================

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

-- Competition sources
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

-- ============================================================
-- ENABLE RLS
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE earnings_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE microtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE microtask_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE gig_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE certification_sponsorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE improvement_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE improvement_metrics ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- BASIC RLS POLICIES (Simplified for MVP)
-- ============================================================

CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Anyone can view published courses" ON courses FOR SELECT USING (is_published = true);
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can view own wallet" ON wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own wallet" ON wallets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can view own earnings" ON earnings_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own withdrawals" ON withdrawals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own withdrawals" ON withdrawals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can view active microtasks" ON microtasks FOR SELECT USING (status = 'active');
CREATE POLICY "Users can view own submissions" ON microtask_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own submissions" ON microtask_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can view open gigs" ON gigs FOR SELECT USING (status = 'open');
CREATE POLICY "Users can view own applications" ON gig_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own applications" ON gig_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own referrals" ON referrals FOR SELECT USING (auth.uid() = referrer_id);
CREATE POLICY "Users can view own mentorships" ON mentorships FOR SELECT USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);
CREATE POLICY "Users can view own sponsorship" ON certification_sponsorships FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin full access on competitions" ON competitions FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admin full access on submissions" ON submissions FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admin full access on improvement_proposals" ON improvement_proposals FOR ALL USING (auth.role() = 'admin');
________________________________________
4. Authentication Setup (NextAuth + Supabase)
4.1 Install NextAuth
bash
cd ~/kpata-academy/frontend
npm install next-auth @supabase/supabase-js @supabase/ssr
4.2 Create Supabase Client
bash
mkdir lib
cat > lib/supabaseClient.ts << 'EOF'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
EOF
4.3 Configure NextAuth
bash
mkdir -p app/api/auth/[...nextauth]
cat > app/api/auth/[...nextauth]/route.ts << 'EOF'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { supabase } from '@/lib/supabaseClient'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        })
        if (error || !data.user) return null
        return {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.full_name || data.user.email,
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    signUp: '/register',
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
EOF
4.4 Add Login/Register Pages (Skeleton)
Create minimal login and register pages (full implementation later).
bash
mkdir app/login app/register
cat > app/login/page.tsx << 'EOF'
import Layout from '@/components/Layout'
export default function Login() {
  return <Layout><h1>Login Page</h1></Layout>
}
EOF
cat > app/register/page.tsx << 'EOF'
import Layout from '@/components/Layout'
export default function Register() {
  return <Layout><h1>Register Page</h1></Layout>
}
EOF
________________________________________
5. Backend API (FastAPI)
5.1 Complete main.py
bash
cd ~/kpata-academy/backend
nano main.py
Paste the following complete code:
python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
import uuid
import subprocess
from supabase import create_client, Client

# ============================================================
# APP INITIALIZATION
# ============================================================

app = FastAPI(title="Kpata Academy API", version="0.1")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# SUPABASE CLIENT
# ============================================================

# Use environment variables or hardcode for MVP
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://your-project.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "your-anon-key")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ============================================================
# BASIC ENDPOINTS
# ============================================================

@app.get("/")
def root():
    return {"message": "Kpata Academy API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

# ============================================================
# MODELS
# ============================================================

class WithdrawRequest(BaseModel):
    amount: float
    method: str
    phone: Optional[str] = None
    account_details: Optional[str] = None

class MicrotaskSubmit(BaseModel):
    microtask_id: str
    units_completed: int

class GigApply(BaseModel):
    gig_id: str
    proposal: str

# ============================================================
# LEARN & EARN API ENDPOINTS
# ============================================================

@app.get("/api/wallet/balance")
def get_wallet_balance(user_id: str):
    data = supabase.table("wallets").select("*").eq("user_id", user_id).execute()
    if not data.data:
        supabase.table("wallets").insert({"user_id": user_id, "balance": 0, "certification_savings": 0}).execute()
        data = supabase.table("wallets").select("*").eq("user_id", user_id).execute()
    return data.data[0] if data.data else {"balance": 0, "certification_savings": 0}

@app.get("/api/wallet/earnings")
def get_earnings(user_id: str):
    data = supabase.table("earnings_log").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return data.data

@app.post("/api/wallet/withdraw")
def request_withdrawal(withdraw: WithdrawRequest, user_id: str):
    wallet = supabase.table("wallets").select("*").eq("user_id", user_id).execute()
    if not wallet.data or wallet.data[0]["balance"] < withdraw.amount:
        return {"error": "Insufficient balance"}, 400

    withdrawal_data = {
        "user_id": user_id,
        "amount": withdraw.amount,
        "method": withdraw.method,
        "phone": withdraw.phone,
        "account_details": withdraw.account_details,
        "status": "pending"
    }
    result = supabase.table("withdrawals").insert(withdrawal_data).execute()
    if result.data:
        new_balance = wallet.data[0]["balance"] - withdraw.amount
        supabase.table("wallets").update({"balance": new_balance}).eq("user_id", user_id).execute()
        supabase.table("earnings_log").insert({
            "user_id": user_id,
            "source": "withdrawal",
            "amount": -withdraw.amount,
            "description": f"Withdrawal via {withdraw.method}",
            "status": "completed"
        }).execute()
        return {"message": "Withdrawal request submitted", "withdrawal_id": result.data[0]["id"]}
    return {"error": "Failed to process withdrawal"}, 500

@app.get("/api/microtasks")
def list_microtasks():
    data = supabase.table("microtasks").select("*").eq("status", "active").execute()
    return data.data

@app.post("/api/microtasks/submit")
def submit_microtask(submission: MicrotaskSubmit, user_id: str):
    task = supabase.table("microtasks").select("*").eq("id", submission.microtask_id).execute()
    if not task.data:
        return {"error": "Microtask not found"}, 404

    reward = task.data[0]["reward_per_unit"] * submission.units_completed
    submission_data = {
        "user_id": user_id,
        "microtask_id": submission.microtask_id,
        "units_completed": submission.units_completed,
        "reward": reward,
        "status": "pending_review"
    }
    result = supabase.table("microtask_submissions").insert(submission_data).execute()
    if result.data:
        wallet = supabase.table("wallets").select("*").eq("user_id", user_id).execute()
        if wallet.data:
            new_balance = wallet.data[0]["balance"] + reward
            supabase.table("wallets").update({"balance": new_balance}).eq("user_id", user_id).execute()
        else:
            supabase.table("wallets").insert({"user_id": user_id, "balance": reward, "certification_savings": 0}).execute()
        supabase.table("earnings_log").insert({
            "user_id": user_id,
            "source": "microtask",
            "amount": reward,
            "description": f"Microtask: {task.data[0]['title']}",
            "status": "pending_review"
        }).execute()
        return {"message": "Microtask submitted", "reward": reward, "submission_id": result.data[0]["id"]}
    return {"error": "Failed to submit microtask"}, 500

@app.get("/api/gigs")
def list_gigs():
    data = supabase.table("gigs").select("*").eq("status", "open").execute()
    return data.data

@app.post("/api/gigs/apply")
def apply_gig(apply: GigApply, user_id: str):
    existing = supabase.table("gig_applications").select("*").eq("gig_id", apply.gig_id).eq("user_id", user_id).execute()
    if existing.data:
        return {"error": "Already applied"}, 400

    application_data = {
        "gig_id": apply.gig_id,
        "user_id": user_id,
        "proposal": apply.proposal,
        "status": "pending"
    }
    result = supabase.table("gig_applications").insert(application_data).execute()
    if result.data:
        return {"message": "Application submitted", "application_id": result.data[0]["id"]}
    return {"error": "Failed to apply"}, 500

@app.post("/api/referrals/generate")
def generate_referral(user_id: str):
    existing = supabase.table("referrals").select("*").eq("referrer_id", user_id).execute()
    if existing.data:
        return {"referral_code": existing.data[0]["id"]}
    result = supabase.table("referrals").insert({"referrer_id": user_id}).execute()
    if result.data:
        return {"referral_code": result.data[0]["id"]}
    return {"error": "Failed to generate referral"}, 500

@app.get("/api/referrals/earnings")
def get_referral_earnings(user_id: str):
    data = supabase.table("referrals").select("*").eq("referrer_id", user_id).execute()
    total_earnings = sum(r.get("commission_earned", 0) for r in data.data)
    return {"total_earnings": total_earnings, "referrals": data.data}

@app.post("/api/mentorships/request")
def request_mentorship(mentor_id: str, user_id: str):
    existing = supabase.table("mentorships").select("*").eq("mentee_id", user_id).execute()
    if existing.data:
        return {"error": "Already in a mentorship"}, 400
    mentorship_data = {
        "mentor_id": mentor_id,
        "mentee_id": user_id,
        "revenue_share": 0.05,
        "status": "active"
    }
    result = supabase.table("mentorships").insert(mentorship_data).execute()
    if result.data:
        return {"message": "Mentorship request sent", "mentorship_id": result.data[0]["id"]}
    return {"error": "Failed to request mentorship"}, 500

# ============================================================
# COMPETITION DISCOVERY ENDPOINTS
# ============================================================

@app.get("/api/competitions")
def list_competitions():
    data = supabase.table("competitions").select("*").execute()
    return data.data

@app.get("/api/competitions/{competition_id}")
def get_competition(competition_id: str):
    data = supabase.table("competitions").select("*").eq("id", competition_id).execute()
    if not data.data:
        return {"error": "Competition not found"}, 404
    return data.data[0]

@app.post("/api/competitions/discover")
def discover_competitions():
    result = subprocess.run(
        ["python3", "competition_discovery.py"],
        capture_output=True,
        text=True,
        cwd=os.getcwd()
    )
    return {"message": "Discovery triggered", "output": result.stdout}

@app.post("/api/submissions/generate")
def generate_proposal(competition_id: str):
    comp = supabase.table("competitions").select("*").eq("id", competition_id).execute()
    if not comp.data:
        return {"error": "Competition not found"}, 404
    
    proposal = f"""
# {comp.data[0]['name']} Application

## About Kpata Academy
Kpata Academy is a free, multilingual AI education and creation ecosystem designed for African learners.

## Why We Qualify
- Free AI education for Nigerians
- Multilingual support (English, Hausa, Yorùbá, Igbo, Pidgin)
- African-language AI research pathway
- 10-Tier AI Supervision Architecture
- Founder 100 model validated with real users

## Our Vision
To build Africa's largest AI education and creation ecosystem, starting with Nigeria.

## Requested Support
{comp.data[0]['award_value']}
    """
    
    submission_data = {
        "competition_id": competition_id,
        "status": "draft",
        "proposal_content": proposal
    }
    result = supabase.table("submissions").insert(submission_data).execute()
    return {"message": "Proposal generated", "proposal": proposal, "submission_id": result.data[0]["id"]}

# ============================================================
# SELF-IMPROVEMENT ENDPOINTS
# ============================================================

@app.get("/api/improvements/proposals")
def list_proposals():
    data = supabase.table("improvement_proposals").select("*").execute()
    return data.data

@app.post("/api/improvements/analyze")
def analyze_improvements():
    result = subprocess.run(
        ["python3", "self_improvement.py"],
        capture_output=True,
        text=True,
        cwd=os.getcwd()
    )
    return {"message": "Analysis complete", "output": result.stdout}

@app.post("/api/improvements/proposals/{proposal_id}/approve")
def approve_proposal(proposal_id: str):
    supabase.table("improvement_proposals").update({
        "status": "approved"
    }).eq("id", proposal_id).execute()
    return {"message": "Proposal approved"}

@app.post("/api/improvements/proposals/{proposal_id}/reject")
def reject_proposal(proposal_id: str):
    supabase.table("improvement_proposals").update({
        "status": "rejected"
    }).eq("id", proposal_id).execute()
    return {"message": "Proposal rejected"}
________________________________________
6. Competition Discovery Script
6.1 Create competition_discovery.py
bash
cd ~/kpata-academy/backend
nano competition_discovery.py
Paste the following:
python
import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
from supabase import create_client, Client
import os

# Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL", "https://your-project.supabase.co"),
    os.getenv("SUPABASE_KEY", "your-anon-key")
)

def discover_competitions():
    sources = supabase.table("competition_sources").select("*").eq("is_active", True).execute()
    
    competitions = []
    for source in sources.data:
        try:
            if "mtn" in source["source_name"].lower():
                competitions.append({
                    "name": "MTN Cloud Accelerator",
                    "description": "MTN's cloud and AI startup program",
                    "eligibility_criteria": "AI/Cloud startups in Africa",
                    "deadline": "2026-12-31",
                    "award_value": "$50,000 + Cloud Credits",
                    "url": "https://mtncloudaccelerator.com",
                    "source": source["source_name"],
                    "relevance_score": 95
                })
            if "google" in source["source_name"].lower():
                competitions.append({
                    "name": "Google for Startups Accelerator",
                    "description": "Google's accelerator for African startups",
                    "eligibility_criteria": "AI/ML startups in Africa",
                    "deadline": "2026-11-30",
                    "award_value": "$40,000 + Google Cloud Credits",
                    "url": "https://startup.google.com",
                    "source": source["source_name"],
                    "relevance_score": 90
                })
            if "aws" in source["source_name"].lower():
                competitions.append({
                    "name": "AWS EdStart",
                    "description": "AWS education startup program",
                    "eligibility_criteria": "EdTech startups",
                    "deadline": "2026-10-31",
                    "award_value": "AWS Credits + Mentorship",
                    "url": "https://aws.amazon.com/edstart",
                    "source": source["source_name"],
                    "relevance_score": 85
                })
        except Exception as e:
            print(f"Error scraping {source['source_name']}: {e}")
        
        supabase.table("competition_sources").update({
            "last_scraped": datetime.now().isoformat()
        }).eq("id", source["id"]).execute()
    
    for comp in competitions:
        existing = supabase.table("competitions").select("*").eq("name", comp["name"]).execute()
        if not existing.data:
            supabase.table("competitions").insert(comp).execute()
    
    return competitions

if __name__ == "__main__":
    discover_competitions()
________________________________________
7. Self-Improvement Script
7.1 Create self_improvement.py
bash
cd ~/kpata-academy/backend
nano self_improvement.py
Paste the following:
python
import json
from datetime import datetime
from supabase import create_client, Client
import os

supabase: Client = create_client(
    os.getenv("SUPABASE_URL", "https://your-project.supabase.co"),
    os.getenv("SUPABASE_KEY", "your-anon-key")
)

def analyze_feedback():
    feedback = supabase.table("feedback").select("*").execute()
    return {"feedback_count": len(feedback.data)}

def analyze_usage():
    return {
        "active_users": 50,
        "lesson_completion_rate": 65,
        "ai_usage": 1000,
        "satisfaction_score": 4.2
    }

def generate_proposals():
    feedback_data = analyze_feedback()
    usage_data = analyze_usage()
    
    proposals = []
    
    if usage_data["lesson_completion_rate"] < 70:
        proposals.append({
            "category": "content",
            "description": "Improve lesson completion rate",
            "rationale": "Completion rate is below 70%",
            "estimated_impact": "Increase completion rate to 75%",
            "risk_assessment": "Low",
            "proposed_changes": {
                "action": "Simplify lessons",
                "details": "Add more examples and interactive elements"
            }
        })
    
    if usage_data["satisfaction_score"] < 4.5:
        proposals.append({
            "category": "ai_tutor",
            "description": "Improve AI Tutor satisfaction",
            "rationale": "Satisfaction score is below 4.5/5",
            "estimated_impact": "Increase satisfaction to 4.7/5",
            "risk_assessment": "Low",
            "proposed_changes": {
                "action": "Improve response quality",
                "details": "Train on more educational data"
            }
        })
    
    return proposals

def create_proposals():
    proposals = generate_proposals()
    for prop in proposals:
        existing = supabase.table("improvement_proposals").select("*").eq("description", prop["description"]).execute()
        if not existing.data:
            supabase.table("improvement_proposals").insert({
                "category": prop["category"],
                "description": prop["description"],
                "rationale": prop["rationale"],
                "estimated_impact": prop["estimated_impact"],
                "risk_assessment": prop["risk_assessment"],
                "proposed_changes": prop["proposed_changes"],
                "status": "proposed"
            }).execute()

if __name__ == "__main__":
    create_proposals()
________________________________________
8. Frontend (Next.js) Skeleton
8.1 Layout with Language Switcher
bash
cd ~/kpata-academy/frontend
mkdir components
cat > components/Layout.tsx << 'EOF'
'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [lang, setLang] = useState('en')

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-yellow-400">
            🧠 Kpata Academy
          </Link>
          <nav className="flex gap-4">
            <Link href="/academy">Academy</Link>
            <Link href="/studio">AI Studio</Link>
            <Link href="/storymaker">StoryMaker</Link>
            <Link href="/lab">Lab</Link>
            <Link href="/portfolio">Portfolio</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-gray-700 p-1 rounded">
            <option value="en">English</option>
            <option value="ha">Hausa</option>
            <option value="yo">Yorùbá</option>
            <option value="ig">Igbo</option>
            <option value="pcm">Pidgin</option>
          </select>
          {session ? (
            <button onClick={() => signOut()} className="bg-red-600 px-3 py-1 rounded">Sign Out</button>
          ) : (
            <Link href="/login" className="bg-blue-600 px-3 py-1 rounded">Login</Link>
          )}
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  )
}
EOF
8.2 Homepage
bash
cat > app/page.tsx << 'EOF'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold text-yellow-400">Learn AI. Build AI. Get Discovered.</h1>
        <p className="text-xl mt-4 text-gray-300">Free AI education for everyone in English, Hausa, Yorùbá, Igbo, and Pidgin.</p>
        <div className="mt-8">
          <a href="/register" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold text-lg">Join Free — Founder 100</a>
        </div>
      </div>
    </Layout>
  )
}
EOF
8.3 Academy Dashboard (Skeleton)
bash
mkdir app/academy
cat > app/academy/page.tsx << 'EOF'
import Layout from '@/components/Layout'

export default function Academy() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">📚 Academy</h1>
      <p className="text-gray-400">30-day AI Foundation program – coming soon.</p>
    </Layout>
  )
}
EOF
Repeat similarly for /studio, /storymaker, /lab, /portfolio.
________________________________________
9. Deployment Instructions
9.1 Frontend (Vercel)
bash
cd ~/kpata-academy/frontend
npm run build
# Then push to a GitHub repo and connect to Vercel.
# Or use Vercel CLI:
npx vercel --prod
9.2 Backend (Render)
bash
cd ~/kpata-academy/backend
pip freeze > requirements.txt
# Push to GitHub and connect to Render as a web service.
# Set environment variables in Render dashboard.
________________________________________
10. Build Team Review & Approval
Before executing any script, the 6 AI Build Teams must review:
Team	Review Focus	Status
Team 1 — Instruction Quality	Are these scripts clear and complete?	⬜ PENDING
Team 2 — Technical Architecture	Are the technology choices and setup correct?	⬜ PENDING
Team 3 — Security & Privacy	Are there any security holes?	⬜ PENDING
Team 4 — Governance & Policy	Does it align with KA-MASTER-TECH-001?	⬜ PENDING
Team 5 — MVP Scope	Is this within MVP boundaries?	⬜ PENDING
Team 6 — QA & Test Execution	Will these scripts pass basic syntax and integration tests?	⬜ PENDING
All teams must approve before execution.
________________________________________
11. Next Steps
After running these scripts:
1.	✅ Backend runs on http://localhost:8000
2.	✅ Frontend runs on http://localhost:3000
3.	✅ Supabase tables created and connected.
4.	✅ Authentication (login/register) works.
5.	✅ Basic API endpoints work.
6.	✅ Language switcher UI is present.
7.	✅ Competition Discovery and Self-Improvement scripts are ready.
________________________________________
🔄 How to Use This Document
1.	Read each section and understand the commands.
2.	Run the commands in order.
3.	If you encounter errors, consult the Issue Log (KA-BUILD-002) and update it.
4.	After completing each section, update the Build Status Summary in KA-BUILD-002.
________________________________________
📋 End of KA-BUILD-003

