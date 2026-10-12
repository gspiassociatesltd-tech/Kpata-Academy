
export type Lesson = { id: string; title: string; duration: string; type: string; content: string; toolTip?: string; resources?: string[]; }
export type Course = { slug: string; phase: string; title: string; provider: string; level: string; hours: number; score: number; cost: string; tool: string; description: string; outcomes: string[]; lessons: Lesson[]; }
export const COURSES: Course[] = [
  { slug: 'google-ai-essentials', phase: 'Phase 1', title: 'Google AI Essentials', provider: 'Google', level: 'Beginner', hours: 10, score: 9, cost: 'FREE Certificate', tool: 'Gemini, ChatGPT, NotebookLM', description: 'Learn to use AI to be more productive. No tech background needed. Official Google certificate via Coursera.', outcomes: ['Understand AI','Write effective prompts','Use AI to draft and summarize','Apply AI responsibly','Earn Google certificate'], lessons: [
    { id: '1', title: 'Introduction to AI', duration: '30 min', type: 'video', content: 'What is AI? Difference between AI, Machine Learning, Generative AI. Real examples at work. Limitations: hallucinations, bias, privacy. Objective: Explain AI and identify where it helps.', toolTip: 'Try Gemini.google.com - What is generative AI?', resources: ['Coursera Module 1'] },
    { id: '2', title: 'Maximize Productivity with AI Tools', duration: '45 min', type: 'text', content: 'Tools: Gemini for reasoning, ChatGPT for writing, NotebookLM for docs. Hands-on: Create meeting agenda in Gemini, summarize PDF in NotebookLM. Formula: Role + Task + Context + Format.', toolTip: 'NotebookLM - Upload PDF ask 5 bullets', resources: ['notebooklm.google.com'] },
    { id: '3', title: 'Art of Effective Prompting', duration: '60 min', type: 'text', content: '5 strategies: Be specific, Give context, Provide examples, Specify format, Iterate. Exercise: Draft email prompt, comparison table prompt, summary prompt. Fix vague prompts.', toolTip: 'Guide: promptingguide.ai', resources: ['Google Prompting Essentials'] },
    { id: '4', title: 'Use AI Responsibly', duration: '25 min', type: 'text', content: 'Responsible AI: Check facts, no private data, disclose AI use, recognize bias. Principles. When not to use AI. Quiz.', toolTip: 'ai.google/responsibilities', resources: [] },
    { id: '5', title: 'Get Certified - Final Project', duration: '30 min', type: 'task', content: 'Coursera > Google AI Essentials > Audit free > Modules 1-5 > Final project: 5 prompts for your job > 80% pass > LinkedIn certificate.', toolTip: 'Coursera Audit = free', resources: [] },
  ]},
  { slug: 'microsoft-ai-900', phase: 'Phase 2', title: 'Microsoft Azure AI Fundamentals AI-900', provider: 'Microsoft', level: 'Intermediate', hours: 20, score: 10, cost: 'FREE voucher Fest 2026', tool: 'Azure AI Studio, Copilot', description: 'Official Microsoft cert. AI workloads, ML, vision, NLP, generative AI on Azure. High demand remote.', outcomes: ['AI workloads','ML on Azure','Vision NLP','Generative AI Azure OpenAI','Prepare AI-900 exam'], lessons: [
    { id: '1', title: 'AI Workloads and Considerations', duration: '35 min', type: 'video', content: 'Predictive vs generative. Workloads: generation, search, classification. Responsible AI: fairness, reliability, privacy. Framework.', toolTip: 'Microsoft Learn AI-900 Module1', resources: ['learn.microsoft.com/ai-900'] },
    { id: '2', title: 'ML Fundamentals on Azure', duration: '50 min', type: 'text', content: 'ML: training vs inference. Datasets, features, labels. Azure ML Studio no-code model. Regression vs classification. Lab: Automated ML predict sales.', toolTip: 'ml.azure.com Free tier', resources: [] },
    { id: '3', title: 'Computer Vision and NLP', duration: '60 min', type: 'text', content: 'Vision: classification, object detection, OCR. NLP: sentiment, key phrase, entity. Language Studio hands-on. Document Intelligence invoices. Lab: Vision Studio image description.', toolTip: 'ai.azure.com Try Vision', resources: [] },
    { id: '4', title: 'Generative AI with Azure OpenAI', duration: '45 min', type: 'text', content: 'Azure OpenAI GPT-4, DALL-E. Prompt in Azure, content filters, grounding. Build chatbot with own data RAG. Lab: Deploy GPT-3.5, add PDF data, chat.', toolTip: 'Azure AI Studio Chat playground', resources: [] },
    { id: '5', title: 'Prepare and Book AI-900 Exam FREE', duration: '30 min', type: 'task', content: 'Complete Learn path 6 modules, practice assessment, voucher appears during Fest 2026 100% discount, book Pearson Vue online 45 questions 65 mins pass 700.', toolTip: 'Microsoft Learn Fest', resources: [] },
  ]},
  { slug: 'google-data-analytics', phase: 'Phase 3', title: 'Google Data Analytics Professional', provider: 'Google', level: 'Advanced', hours: 60, score: 10, cost: 'FREE via Financial Aid', tool: 'SQL, BigQuery, Looker Studio', description: 'Top remote job cert. Cleaning, analysis, visualization. Portfolio employers hire for $20-50/hr.', outcomes: ['Cleaning SQL Sheets','BigQuery analysis','Looker Tableau viz','R basics','3 portfolio case studies'], lessons: [
    { id: '1', title: 'Foundations Data Everywhere', duration: '40 min', type: 'video', content: 'Lifecycle Ask Prepare Process Analyze Share Act. Analyst vs scientist vs engineer. Tools overview. Setup Sheets BigQuery sandbox Kaggle. Dataset Cyclistic.', toolTip: 'Kaggle.com datasets', resources: ['Google Module1'] },
    { id: '2', title: 'Prepare and Clean Data with SQL', duration: '90 min', type: 'text', content: 'SQL SELECT WHERE JOIN GROUP BY. BigQuery free tier public datasets. Cleaning duplicates nulls standardization. Lab: Top 10 products sales query BigQuery.', toolTip: 'BigQuery console.cloud.google.com/bigquery', resources: ['SQL Bolt'] },
    { id: '3', title: 'Analyze and Visualize', duration: '90 min', type: 'task', content: 'Calculations pivots VLOOKUP Sheets. Visualization right chart. Looker Studio Connect BigQuery dashboard filters scorecards time series. Tableau Public intro. Lab: Sales dashboard KPI map trend.', toolTip: 'Looker Studio lookerstudio.google.com', resources: [] },
    { id: '4', title: 'Case Study and Portfolio', duration: '60 min', type: 'task', content: 'Cyclistic case study: problem, sources, cleaning, analysis, viz, recommendations. Present portfolio GitHub Pages Notion. Hiring managers checklist.', toolTip: 'Notion or Google Sites portfolio', resources: [] },
    { id: '5', title: 'Get Certificate and Apply Jobs', duration: '30 min', type: 'task', content: '8 courses Coursera Financial Aid Click Financial aid Fill 2 paragraphs Approved 15 days 100% free 2-6 months Capstone 3 dashboards job ready Apply LinkedIn Upwork Turing Arc.', toolTip: 'Coursera Aid guide', resources: [] },
  ]},
];
export const BUILD_STATUS = {
  overall: 68,
  phases: [
    { name: 'Platform Core', percent: 100, status: 'DONE', desc: 'Next.js 14, Vercel, no crash' },
    { name: 'Courses Structure', percent: 90, status: 'DONE', desc: '3 courses, 15 real lessons English' },
    { name: 'Lesson Player', percent: 85, status: 'LIVE', desc: 'Video placeholder, content, tools, next/prev, mark done' },
    { name: 'Certs Integration', percent: 60, status: 'BUILDING', desc: 'Supabase fallback works, needs env vars' },
    { name: 'User Progress', percent: 30, status: 'NEXT', desc: 'Save done to Supabase dashboard' },
    { name: 'Multilingual', percent: 10, status: 'PLANNED', desc: 'EN first, then HA/YO/IG/PID after stable' },
    { name: 'Assessments', percent: 0, status: 'PLANNED', desc: 'Quizzes per lesson final exam' },
  ],
  nextSteps: ['Add user auth progress saving','Connect Supabase env LIVE certs','Add YouTube embeds per lesson','Add quizzes','Translation after stable'],
  totalSteps: 7
};
export function getCourse(slug: string){ return COURSES.find(c=>c.slug===slug) }
