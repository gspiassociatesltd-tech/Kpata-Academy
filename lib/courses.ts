
export type Lesson = { id: string; title: string; duration: string; type: string; content: string; toolTip?: string; pidgin?: string; }
export type Course = { slug: string; phase: string; title: string; provider: string; level: string; hours: number; score: number; cost: string; tool: string; description: string; outcomes: string[]; lessons: Lesson[]; }
export const COURSES: Course[] = [
  { slug: 'google-ai-essentials', phase: 'Phase 1', title: 'Google AI Essentials', provider: 'Google', level: 'Beginner', hours: 10, score: 9, cost: 'FREE', tool: 'Gemini + ChatGPT', description: 'Foundation cert', outcomes: ['Prompts','Gemini','Automate','Cert'], lessons: [
    { id: '1', title: 'What is AI? (No big grammar)', duration: '25 min', type: 'video', content: 'AI no be magic. MOTOMA example: proposal 2h -> AI 5 mins.', toolTip: 'Tool: Gemini', pidgin: 'AI na computer wey don go school' },
    { id: '2', title: 'Prompt Like Pro', duration: '35 min', type: 'text', content: 'ROLE TASK FORMAT example MOTOMA Dangote 100 batteries', toolTip: 'Tool: ChatGPT', pidgin: 'Tell AI wetin you want' },
    { id: '3', title: 'Hands-on MOTOMA Proposal', duration: '45 min', type: 'task', content: 'Go gemini.google.com paste prompt', toolTip: 'Gemini Free', pidgin: 'Do am now' },
    { id: '4', title: 'Get Google Certificate FREE', duration: '20 min', type: 'tool', content: 'Coursera audit FREE 80% pass', toolTip: 'Coursera', pidgin: 'Cert enter LinkedIn' },
  ]},
  { slug: 'microsoft-ai-900', phase: 'Phase 2', title: 'Microsoft AI-900 + AZ-900 + DP-900', provider: 'Microsoft', level: 'Intermediate', hours: 25, score: 10, cost: 'FREE Voucher', tool: 'Azure AI', description: 'Builder $30/hr', outcomes: ['Azure','Cloud','Data','Badges'], lessons: [
    { id: '1', title: 'Why $30/hr?', duration: '20 min', type: 'video', content: 'M365 $30-50/hr AI-900 AZ-900 DP-900 Junior Engineer', toolTip: 'LinkedIn Jobs', pidgin: 'Visa for remote' },
    { id: '2', title: 'Build First Bot', duration: '50 min', type: 'text', content: 'ai.azure.com Motoma Support Bot FAQ no code', toolTip: 'Azure AI Studio', pidgin: 'No code bot' },
    { id: '3', title: 'FREE Voucher', duration: '30 min', type: 'task', content: 'Microsoft Learn AI Skills Fest voucher', toolTip: 'Microsoft Learn', pidgin: 'No expire' },
  ]},
  { slug: 'google-data-analytics', phase: 'Phase 3', title: 'Google Data Analytics', provider: 'Google', level: 'Advanced', hours: 60, score: 10, cost: 'FREE Aid', tool: 'Looker', description: 'Specialist $50/hr', outcomes: ['SQL','Looker','Motoma','Portfolio'], lessons: [
    { id: '1', title: 'Data = Money', duration: '30 min', type: 'video', content: 'MOTOMA 1000/month Lagos hot season Abuja rainy', toolTip: 'Sheets', pidgin: 'Where money hide' },
    { id: '2', title: 'Build Dashboard', duration: '60 min', type: 'task', content: 'Looker Studio free connect sheet', toolTip: 'Looker', pidgin: 'Look pro' },
    { id: '3', title: 'Get Cert', duration: '40 min', type: 'tool', content: 'Coursera aid 2 paragraphs 15 days FREE', toolTip: 'Financial Aid', pidgin: 'No pay' },
  ]},
];
export function getCourse(slug: string){ return COURSES.find(c=>c.slug===slug) }
