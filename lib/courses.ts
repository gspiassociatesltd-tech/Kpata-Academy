
export type Lesson = {
  id: string
  title: string
  duration: string
  type: 'video' | 'text' | 'task' | 'tool'
  content: string
  toolTip?: string
  pidgin?: string
}

export type Course = {
  slug: string
  phase: string
  title: string
  provider: string
  level: string
  hours: number
  score: number
  cost: string
  tool: string
  description: string
  outcomes: string[]
  lessons: Lesson[]
}

export const COURSES: Course[] = [
  {
    slug: 'google-ai-essentials',
    phase: 'Phase 1',
    title: 'Google AI Essentials',
    provider: 'Google',
    level: 'Beginner',
    hours: 10,
    score: 9,
    cost: 'FREE - Certificate included',
    tool: 'Gemini + ChatGPT',
    description: 'Foundation - Learn to use AI at work. Most recognized cert for beginners. Self-paced, no experience needed.',
    outcomes: ['Write better prompts', 'Use Gemini at work', 'Automate emails & docs', 'Get Google certificate'],
    lessons: [
      { id: '1', title: 'What is AI? (No big grammar)', duration: '25 min', type: 'video', content: 'AI no be magic. Na computer wey don learn from plenty data. We go show you with MOTOMA battery example: Instead of writing proposal manually 2 hours, AI go do am 5 mins.', toolTip: 'Tool: Gemini - Ask: "Explain AI like I am 10"', pidgin: 'AI na computer wey don go school pass you' },
      { id: '2', title: 'Prompt Like Pro - The 3 Rules', duration: '35 min', type: 'text', content: 'Rule 1: Give ROLE (You are expert marketer). Rule 2: Give TASK (Write proposal for...). Rule 3: Give FORMAT (Use table, 200 words). Example prompt for MOTOMA: You are sales expert for batteries in Nigeria. Write proposal for Dangote to buy 100 Motoma batteries. Use simple English, show ROI. Format: 1 page.', toolTip: 'Tool: ChatGPT - Use this exact prompt', pidgin: 'If you no tell AI wetin you want, e go give you nonsense' },
      { id: '3', title: 'Hands-on: Write MOTOMA Proposal with AI', duration: '45 min', type: 'task', content: 'TASK: Go to Gemini (gemini.google.com). Paste prompt from Lesson 2. Generate proposal. Then ask Gemini to translate to Hausa & Yoruba. Screenshot result. This is your first AI project!', toolTip: 'Tool: Gemini - Free', pidgin: 'Do am now, no just read' },
      { id: '4', title: 'Get Your Google Certificate FREE', duration: '20 min', type: 'tool', content: 'Go to Coursera - Google AI Essentials. Enroll FREE (audit). Complete 5 modules (you already know 70% from this course). Quiz: 80% to pass. Certificate added to LinkedIn automatically. Kpata will apply on your behalf if you get stuck.', toolTip: 'Tool: Coursera - Search Google AI Essentials', pidgin: 'Certificate go enter LinkedIn sharp sharp' },
    ]
  },
  {
    slug: 'microsoft-ai-900',
    phase: 'Phase 2',
    title: 'Microsoft AI-900 + AZ-900 + DP-900',
    provider: 'Microsoft',
    level: 'Intermediate',
    hours: 25,
    score: 10,
    cost: 'FREE Voucher - AI Skills Fest 2026 - Never Expires!',
    tool: 'Azure AI + Copilot',
    description: 'Builder level - 3 certs in one. Most valuable for remote jobs. Microsoft gives FREE exam voucher during fest.',
    outcomes: ['Azure AI fundamentals', 'Cloud basics', 'Data fundamentals', '3 Microsoft badges + FREE voucher'],
    lessons: [
      { id: '1', title: 'Why Microsoft Certs Pay $30/hr?', duration: '20 min', type: 'video', content: 'Companies using Microsoft 365 pay $30-50/hr for support. AI-900 proves you know AI, AZ-900 proves cloud, DP-900 proves data. Together = Junior AI Engineer. Remote jobs on Upwork, LinkedIn.', toolTip: 'Tool: LinkedIn Jobs - Search AI-900 remote', pidgin: 'Microsoft cert na visa for remote work' },
      { id: '2', title: 'Azure AI Studio - Build Your First Bot', duration: '50 min', type: 'text', content: 'Go to ai.azure.com. Create project "Motoma Support Bot". Upload MOTOMA battery FAQ PDF. Azure will create chatbot that answers "How long does Motoma battery last?" automatically. No code needed! This is what AI-900 teaches.', toolTip: 'Tool: Azure AI Studio - Free tier', pidgin: 'You go build bot without writing code' },
      { id: '3', title: 'Get FREE Voucher - Step by Step', duration: '30 min', type: 'task', content: 'TASK: 1. Go to Microsoft Learn (learn.microsoft.com) 2. Search AI Skills Fest 2026 3. Complete AI-900 learning path (12 hours, self-paced) 4. At end, voucher appears in dashboard - 100% discount for exam. 5. Book exam at Pearson Vue - FREE. Kpata Academy will guide you on WhatsApp if stuck.', toolTip: 'Tool: Microsoft Learn - Free', pidgin: 'Voucher no go expire, take your time' },
    ]
  },
  {
    slug: 'google-data-analytics',
    phase: 'Phase 3',
    title: 'Google Data Analytics - Top Remote Job Cert',
    provider: 'Google',
    level: 'Advanced',
    hours: 60,
    score: 10,
    cost: 'FREE via Coursera Financial Aid',
    tool: 'Looker Studio + Sheets AI + BigQuery',
    description: 'Specialist - $20-50/hr remote. Companies pay for people who turn data to money. Portfolio > certificate.',
    outcomes: ['SQL & BigQuery', 'Looker dashboards', 'Motoma sales analysis project', 'Portfolio for Upwork'],
    lessons: [
      { id: '1', title: 'Data = Money - Motoma Example', duration: '30 min', type: 'video', content: 'MOTOMA sells 1000 batteries/month. Data shows: Lagos buys more in hot season, Abuja buys in rainy season. If you know this, you stock right = more profit. Data Analyst finds this pattern. That is the job!', toolTip: 'Tool: Google Sheets - Import sample data', pidgin: 'Data tell you where money dey hide' },
      { id: '2', title: 'Build Motoma Sales Dashboard', duration: '60 min', type: 'task', content: 'TASK: 1. Open Looker Studio (lookerstudio.google.com) FREE 2. Connect sample Google Sheet with Motoma sales 3. Create dashboard: Sales by State, Best battery type, Monthly trend 4. Share link - this is portfolio piece #1. Employers love dashboards!', toolTip: 'Tool: Looker Studio - Free', pidgin: 'Dashboard go make you look like pro' },
      { id: '3', title: 'Get Google Data Analytics Certificate', duration: '40 min', type: 'tool', content: '8 courses on Coursera. Financial Aid: Click "Financial aid available" → fill 2 paragraphs → approved in 15 days → 100% FREE. Complete at your pace (3 months OK). Capstone project = Motoma dashboard. Certificate + portfolio = remote job ready.', toolTip: 'Tool: Coursera Financial Aid', pidgin: 'No pay shishi, just apply for aid' },
    ]
  },
]

export function getCourse(slug: string) {
  return COURSES.find(c => c.slug === slug)
}
export function getCoursesByPhase(phase: string) {
  return COURSES.filter(c => c.phase === phase)
}
