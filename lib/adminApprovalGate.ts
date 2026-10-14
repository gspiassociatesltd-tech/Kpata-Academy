// lib/adminApprovalGate.ts - Governance Phase 5 - ALL ACTIONS NEED ADMIN APPROVAL
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXECUTED'

export type PendingAction = {
  id: string
  type: 'SELF_IMPROVEMENT' | 'MARKETING'
  title: string
  description: string
  proposedAction: string
  data: any
  status: ApprovalStatus
  createdAt: string
  approvedBy?: string
  approvedAt?: string
  platform?: string
}

let QUEUE: PendingAction[] = []

export function createPendingAction(action: Omit<PendingAction, 'id' | 'status' | 'createdAt'>) {
  const item: PendingAction = {
    ...action,
    id: `${action.type}-${Date.now()}`,
    status: 'PENDING',
    createdAt: new Date().toISOString()
  }
  QUEUE.push(item)
  console.log(`[GATE] NEW PENDING: ${item.title} needs ADMIN approval`)
  return item
}

export function approveAction(id: string, admin: string = "Godwin Abaniwo") {
  const a = QUEUE.find(x => x.id === id)
  if (a) {
    a.status = 'APPROVED'
    a.approvedBy = admin
    a.approvedAt = new Date().toISOString()
    a.status = 'EXECUTED'
    console.log(`[GATE] APPROVED by ${admin}: ${a.title}`)
  }
  return a
}

export function rejectAction(id: string) {
  const a = QUEUE.find(x => x.id === id)
  if (a) a.status = 'REJECTED'
  return a
}

export function getPending() { return QUEUE.filter(x => x.status === 'PENDING') }
export function getAll() { return QUEUE }