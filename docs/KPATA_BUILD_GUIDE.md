📘 KPATA ACADEMY — COMPLETE BUILD GUIDE
🧠 What We Are Building
Kpata Academy is a free, multilingual AI education and creation platform. It teaches AI skills, helps users build AI-powered products, and creates pathways to certification and earning.

✅ SUCCESSFUL STEPS COMPLETED SO FAR
Step	What We Built	Status
1	Ubuntu/WSL environment setup	✅ Complete
2	Node.js installed	✅ Complete
3	Python installed	✅ Complete
4	Git installed	✅ Complete
5	Next.js frontend created	✅ Complete
6	FastAPI backend created	✅ Complete
7	Supabase project connected	✅ Complete
8	Supabase tables created	✅ Complete
9	Frontend and backend running	✅ Complete
10	Learn & Earn tables created	✅ Complete
11	Competition Discovery tables created	✅ Complete
12	Self-Improvement tables created	✅ Complete
🔄 CURRENT STATUS
Component	Status
Frontend (Next.js)	✅ Running on port 3000
Backend (FastAPI)	✅ Running on port 8000
Supabase connection	⚠️ DNS issue (needs IP address)
Competition Discovery	⏳ Ready to test
Self-Improvement Engine	⏳ Ready to test
🚀 THE COMPLETE BUILD GUIDE (STUDY MATERIAL)
📂 PART 1: ENVIRONMENT SETUP (For Beginners)
Step 1: Open Ubuntu/WSL
If you are using Windows:

Click the Start button.

Type Ubuntu.

Click the Ubuntu app.

You will see a terminal window.

Step 2: Install Node.js
bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
node -v
Step 3: Install Python
bash
sudo apt update
sudo apt install python3 python3-pip python3-venv -y
python3 --version
Step 4: Install Git
bash
sudo apt install git -y
git --version
Step 5: Create the project folder
bash
mkdir ~/kpata-academy
cd ~/kpata-academy
📂 PART 2: FRONTEND (NEXT.JS)
Step 6: Create the frontend
bash
npx create-next-app@latest frontend --typescript --tailwind --app --no-src-dir
Step 7: Enter the frontend folder
bash
cd frontend
Step 8: Install dependencies
bash
npm install
Step 9: Start the frontend
bash
npm run dev
Open browser: http://localhost:3000

📂 PART 3: BACKEND (FASTAPI)
Step 10: Create the backend folder
bash
cd ~/kpata-academy
mkdir backend
cd backend
Step 11: Create a virtual environment
bash
python3 -m venv venv
source venv/bin/activate
Step 12: Install dependencies
bash
pip install fastapi uvicorn python-dotenv supabase psycopg2-binary sqlalchemy httpx python-multipart pydantic[email]
Step 13: Install web scraping libraries
bash
pip install beautifulsoup4 lxml
Step 14: Create main.py
bash
nano main.py
Paste the code from KA-BUILD-003 (or the corrected version from earlier).

📂 PART 4: SUPABASE DATABASE
Step 15: Create a Supabase project
Go to supabase.com.

Sign up and create a new project.

Name it kpata-academy.

Step 16: Get your Supabase keys
In the Supabase dashboard, go to API.

Copy the Project URL and Anon Key.

Step 17: Run the schema SQL
In Supabase, go to SQL Editor.

Click "+ New query".

Paste the schema from KA-BUILD-001 Section 4.

Click Run.

📂 PART 5: LEARN & EARN TABLES
Step 18: Run the Learn & Earn SQL
In Supabase SQL Editor, paste and run:

sql
-- Wallets
CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL UNIQUE,
  balance REAL DEFAULT 0,
  certification_savings REAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Earnings log
CREATE TABLE IF NOT EXISTS earnings_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  source TEXT CHECK (source IN ('microtask', 'freelance', 'referral', 'mentorship', 'bonus')),
  amount REAL NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Withdrawals
CREATE TABLE IF NOT EXISTS withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  amount REAL NOT NULL,
  method TEXT CHECK (method IN ('mtn_momo', 'bank_transfer', 'airtime')),
  phone TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Microtasks
CREATE TABLE IF NOT EXISTS microtasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  reward_per_unit REAL NOT NULL,
  units_available INTEGER,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Microtask submissions
CREATE TABLE IF NOT EXISTS microtask_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  microtask_id UUID REFERENCES microtasks(id) NOT NULL,
  units_completed INTEGER NOT NULL,
  reward REAL NOT NULL,
  status TEXT DEFAULT 'pending_review',
  submitted_at TIMESTAMP DEFAULT NOW()
);

-- Freelance gigs
CREATE TABLE IF NOT EXISTS gigs (
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
CREATE TABLE IF NOT EXISTS gig_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id UUID REFERENCES gigs(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  proposal TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Referrals
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES users(id) NOT NULL,
  referred_id UUID REFERENCES users(id) NOT NULL UNIQUE,
  commission_earned REAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Mentorships
CREATE TABLE IF NOT EXISTS mentorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES users(id) NOT NULL,
  mentee_id UUID REFERENCES users(id) NOT NULL UNIQUE,
  revenue_share REAL DEFAULT 0.05,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
📂 PART 6: COMPETITION DISCOVERY & SELF-IMPROVEMENT
Step 19: Run the Competition Discovery SQL
In Supabase SQL Editor, paste and run:

sql
-- Competitions
CREATE TABLE IF NOT EXISTS competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  eligibility_criteria TEXT,
  deadline TIMESTAMP,
  award_value TEXT,
  url TEXT,
  source TEXT,
  status TEXT CHECK (status IN ('active', 'pending', 'submitted', 'won', 'lost', 'ineligible')) DEFAULT 'active',
  relevance_score INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Submissions
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id UUID REFERENCES competitions(id) NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW(),
  status TEXT CHECK (status IN ('draft', 'submitted', 'shortlisted', 'selected', 'rejected')) DEFAULT 'draft',
  proposal_content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Competition sources
CREATE TABLE IF NOT EXISTS competition_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_name TEXT NOT NULL,
  url TEXT NOT NULL,
  last_scraped TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Improvement proposals
CREATE TABLE IF NOT EXISTS improvement_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  rationale TEXT,
  estimated_impact TEXT,
  risk_assessment TEXT,
  proposed_changes JSONB,
  status TEXT CHECK (status IN ('proposed', 'approved', 'implemented', 'rejected', 'monitoring')) DEFAULT 'proposed',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Improvement metrics
CREATE TABLE IF NOT EXISTS improvement_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES improvement_proposals(id),
  metric_name TEXT NOT NULL,
  before_value REAL,
  after_value REAL,
  change_percentage REAL,
  measured_at TIMESTAMP DEFAULT NOW()
);
📂 PART 7: TESTING THE BACKEND
Step 20: Start the backend
bash
cd ~/kpata-academy/backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 &
Step 21: Test the health endpoint
bash
curl http://localhost:8000/health
Step 22: Test the competitions endpoint
bash
curl http://localhost:8000/api/competitions
🧠 WHAT WE HAVE LEARNED
Lesson	What it means
DNS issues can block Supabase connections	Use IP address or fix /etc/hosts
Always check your imports	Missing import subprocess breaks the backend
CORS is essential for frontend-backend communication	Without it, the frontend cannot talk to the backend
PostgreSQL schemas must be run in the correct order	Foreign keys need referenced tables first

