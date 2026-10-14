import { SOCIALS } from './certificationLinks'
import { createPendingAction } from './adminApprovalGate'

export type SocialPlatform = 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'x' | 'linkedin' | 'whatsapp'

export function generatePost(platform: SocialPlatform, message: string) {
  const base = "https://kpata-academy-hd20u4min-kpata-academy.vercel.app"
  return `${message}\n${base}\nHandle: ${SOCIALS[platform]}`
}

export function queueMarketingForApproval(message: string) {
  const platforms: SocialPlatform[] = ['facebook','instagram','youtube','tiktok','x','linkedin','whatsapp']
  return platforms.map(p => createPendingAction({
    type: 'MARKETING' as const,
    title: `Post to ${p}`,
    description: message,
    proposedAction: `POST to ${p}`,
    data: { platform: p, content: generatePost(p, message) },
    platform: p
  }))
}