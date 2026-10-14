// lib/marketingEngine.ts
// Kpata Academy Marketing Engine v1.0 - Auto-generates marketing materials & posts to socials
// Socials: Facebook abaniwog, IG gspiassociatesltd, YT godwinabaniwo6755, TikTok user4981039143171, X AbaniwoGodwin, LinkedIn godwin-abaniwo-803268296, WhatsApp 0029Vb7eUeBGzzKTHPIaoe0b

import { SOCIALS } from './certificationLinks'

export type SocialPlatform = 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'x' | 'linkedin' | 'whatsapp'

export type MarketingPost = {
  id: string
  platform: SocialPlatform
  content: string
  hashtags: string[]
  link: string
  imagePrompt?: string
  cta: string
  handle: string
  scheduled?: string
}

export const PLATFORM_LIMITS = {
  facebook: 63206,
  instagram: 2200,
  youtube: 1000,
  tiktok: 2200,
  x: 280,
  linkedin: 3000,
  whatsapp: 4096
}

// TEMPLATES - Auto-generates for each platform
const TEMPLATES = {
  launch: {
    title: "Kpata Academy - 100% FREE - No Registration Needed",
    body: "🚀 Kpata Academy is LIVE! 15 Lessons. Pass First Attempt. Loved for Simplicity. Build Resume When Ready.",
    cta: "Start Learning FREE Today!"
  },
  newCert: {
    title: "NEW CERT ALERT 2026",
    body: "🔥 Industry just changed! New certification detected: {CERT_NAME}. We already updated curriculum!",
    cta: "Learn it FREE on Kpata Academy"
  },
  careerPath: {
    title: "Your AI Career Path 2026",
    body: "💼 Want ${SALARY}? Become {CAREER_TITLE}. Roadmap: {ROADMAP}. 84% professionals getting AI certs in 12 months!",
    cta: "Start your path FREE"
  },
  success: {
    title: "PASS FIRST ATTEMPT",
    body: "✅ Our students pass first attempt because we teach simplicity! 15 lessons, no registration, resume builder included.",
    cta: "Join 1000+ learners"
  }
}

export function generateMarketingPost(
  platform: SocialPlatform,
  type: keyof typeof TEMPLATES,
  variables: Record<string, string> = {}
): MarketingPost {
  const template = TEMPLATES[type]
  const handle = SOCIALS[platform]
  const baseLink = "https://kpata-academy-hd20u4min-kpata-academy.vercel.app"

  let body = template.body
  Object.keys(variables).forEach(key => {
    body = body.replace(`{${key}}`, variables[key])
  })

  const contents: Record<SocialPlatform, string> = {
    facebook: `${template.title}\n\n${body}\n\n👉 ${template.cta}\n🔗 ${baseLink}\n📲 WhatsApp: ${SOCIALS.whatsapp}\n\n#KpataAcademy #FreeAI #AIForEveryone`,
    instagram: `${body}\n\n${template.cta} 👇\nLink in bio\n\n#KpataAcademy #AI2026 #GoogleAI #MicrosoftAI #AWS #LearnAI #FreeCourse #NoRegistration #NigeriaTech`,
    youtube: `${template.title} - ${body}. Full training FREE, no registration needed. 15 lessons, pass first attempt. Build resume when ready. Join WhatsApp: ${SOCIALS.whatsapp}. Start: ${baseLink}`,
    tiktok: `${body} 🤯 FREE! No registration! Link in bio! #ai #aitraining #freecourse #googleai #microsoft #aws #kpatacademy #learnontiktok`,
    x: `${body} ${template.cta} ${baseLink} #KpataAcademy #AI #Free`,
    linkedin: `${template.title}\n\n${body}\n\nAt Kpata Academy, we monitor industry changes daily. When ${variables.CERT_NAME || 'new AI certs'} emerged in 2026, we updated our curriculum automatically.\n\n✅ 100% FREE\n✅ No Registration\n✅ 15 Lessons - Pass First Attempt\n✅ Resume Builder\n✅ Career Paths: $85K-$180K\n\n${template.cta}: ${baseLink}\n\nJoin our WhatsApp for job alerts: ${SOCIALS.whatsapp}\n\n#AI #ArtificialIntelligence #CareerDevelopment #FreeEducation #GoogleAI #Microsoft #AWS #EdTech #Nigeria`,
    whatsapp: `*${template.title}*\n\n${body}\n\n✅ 15 Lessons\n✅ Pass First Attempt\n✅ Build Resume When Ready\n✅ FREE Industry Updates & Jobs\n\n👉 ${template.cta}\n${baseLink}\n\nJoin Channel FREE: ${SOCIALS.whatsapp}`
  }

  const hashtagsMap: Record<SocialPlatform, string[]> = {
    facebook: ['#KpataAcademy', '#FreeAI', '#GoogleAI', '#AI900'],
    instagram: ['#KpataAcademy', '#AI2026', '#LearnAI', '#FreeCourse', '#NigeriaTech', '#AIEssentials'],
    youtube: ['#KpataAcademy', '#FreeTraining'],
    tiktok: ['#ai', '#freecourse', '#learnontiktok', '#kpatacademy'],
    x: ['#KpataAcademy', '#AI', '#Free'],
    linkedin: ['#AI', '#CareerDevelopment', '#FreeEducation', '#GoogleAI', '#EdTech'],
    whatsapp: []
  }

  return {
    id: `${platform}-${type}-${Date.now()}`,
    platform,
    content: contents[platform].substring(0, PLATFORM_LIMITS[platform]),
    hashtags: hashtagsMap[platform],
    link: baseLink,
    cta: template.cta,
    handle,
    imagePrompt: `Kpata Academy poster: ${template.title}, black background yellow text, 100% FREE badge, WhatsApp channel QR`
  }
}

export function generateAllPlatformPosts(type: keyof typeof TEMPLATES, variables?: Record<string, string>): MarketingPost[] {
  const platforms: SocialPlatform[] = ['facebook', 'instagram', 'youtube', 'tiktok', 'x', 'linkedin', 'whatsapp']
  return platforms.map(p => generateMarketingPost(p, type, variables))
}

export function generateFlyerContent(type: string) {
  return {
    headline: "Kpata Academy - 100% FREE",
    subheadline: "No Registration Needed - 15 Lessons - Pass First Attempt",
    benefits: ["FREE Industry Updates", "Job Alerts", "Resume Builder", "Career Paths $85K-$180K", "Auto-Updating Curriculum"],
    cta: "Start Learning FREE",
    link: "https://kpata-academy-hd20u4min-kpata-academy.vercel.app",
    whatsapp: SOCIALS.whatsapp,
    socials: SOCIALS,
    colors: { primary: "#000000", accent: "#FFD700", bg: "#FFFFFF" }
  }
}

// AUTO-POST SIMULATION (Replace with real API later)
export async function schedulePost(post: MarketingPost, when: string) {
  console.log(`[Marketing Engine] Scheduling ${post.platform} post for ${when}`)
  console.log(`Handle: ${post.handle}`)
  console.log(`Content: ${post.content.substring(0, 100)}...`)
  // TODO: Integrate with Meta Graph API for Facebook/IG, X API, LinkedIn API, YouTube Data API
  return { success: true, postId: post.id, platform: post.platform, scheduledFor: when }
}