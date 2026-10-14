import { createPendingAction } from './adminApprovalGate'

export type IndustryChange = {
  id: string
  title: string
  type: 'NEW_CERT' | 'RETIRED_CERT' | 'UPDATED_CERT'
  provider: string
  impact: 'HIGH' | 'MEDIUM' | 'LOW'
  dateDetected: string
  description: string
  action: string
  link: string
}

export const INDUSTRY_CHANGES: IndustryChange[] = [
  {
    id: 'AB-900-NEW',
    title: 'Microsoft AB-900 Copilot NEW 2026',
    type: 'NEW_CERT',
    provider: 'Microsoft',
    impact: 'HIGH',
    dateDetected: '2026-10-14',
    description: 'New AB series for M365 Copilot admins',
    action: 'ADD as Module 16',
    link: 'https://learn.microsoft.com/en-us/credentials/'
  },
  {
    id: 'MLA-C02',
    title: 'AWS MLA-C01 to MLA-C02 Upgrade',
    type: 'UPDATED_CERT',
    provider: 'AWS',
    impact: 'HIGH',
    dateDetected: '2026-09-28',
    description: 'MLA-C01 retires Sept 28 2026',
    action: 'UPDATE curriculum',
    link: 'https://aws.amazon.com/certification/'
  }
]

export function scanIndustryChanges() {
  return INDUSTRY_CHANGES
}

export function queueChangesForApproval() {
  return scanIndustryChanges().map(c => createPendingAction({
    type: 'SELF_IMPROVEMENT' as const,
    title: c.title,
    description: c.description,
    proposedAction: c.action,
    data: c
  }))
}