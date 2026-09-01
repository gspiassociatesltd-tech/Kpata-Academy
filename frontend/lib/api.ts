const API_BASE = process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL}';

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || `API error: ${res.status}`);
  }
  return res.json();
}

// Competitions
export const getCompetitions = () => fetchAPI('/api/competitions');
export const discoverCompetitions = () => fetchAPI('/api/competitions/discover', { method: 'POST' });
export const generateProposal = (competition_id: string) =>
  fetchAPI('/api/submissions/generate?competition_id=' + competition_id, { method: 'POST' });
export const getSubmissions = () => fetchAPI('/api/submissions');
export const updateSubmissionStatus = (id: string, status: string) =>
  fetchAPI(`/api/submissions/${id}/status?status=${status}`, { method: 'PUT' });

// Improvements
export const getProposals = () => fetchAPI('/api/improvements/proposals');
export const analyzeImprovements = () => fetchAPI('/api/improvements/analyze', { method: 'POST' });
export const approveProposal = (id: string) =>
  fetchAPI(`/api/improvements/proposals/${id}/approve`, { method: 'POST' });
export const rejectProposal = (id: string) =>
  fetchAPI(`/api/improvements/proposals/${id}/reject`, { method: 'POST' });

// Learn & Earn
export const getWalletBalance = (userId: string) => fetchAPI(`/api/wallet/balance?user_id=${userId}`);
export const getEarnings = (userId: string) => fetchAPI(`/api/wallet/earnings?user_id=${userId}`);
export const requestWithdrawal = (userId: string, amount: number, method: string, phone?: string, account_details?: string) =>
  fetchAPI(`/api/wallet/withdraw?user_id=${userId}`, {
    method: 'POST',
    body: JSON.stringify({ amount, method, phone, account_details }),
  });
export const getMicrotasks = () => fetchAPI('/api/microtasks');
export const submitMicrotask = (userId: string, microtask_id: string, units_completed: number) =>
  fetchAPI(`/api/microtasks/submit?user_id=${userId}`, {
    method: 'POST',
    body: JSON.stringify({ microtask_id, units_completed }),
  });
export const getGigs = () => fetchAPI('/api/gigs');
export const applyGig = (userId: string, gig_id: string, proposal: string) =>
  fetchAPI(`/api/gigs/apply?user_id=${userId}`, {
    method: 'POST',
    body: JSON.stringify({ gig_id, proposal }),
  });
export const generateReferral = (userId: string) =>
  fetchAPI(`/api/referrals/generate?user_id=${userId}`, { method: 'POST' });
export const getReferralEarnings = (userId: string) =>
  fetchAPI(`/api/referrals/earnings?user_id=${userId}`);
export const requestMentorship = (userId: string, mentor_id: string) =>
  fetchAPI(`/api/mentorships/request?user_id=${userId}&mentor_id=${mentor_id}`, { method: 'POST' });

// ============================================================
// PORTFOLIO API
// ============================================================
export const getProjects = (userId: string) => fetchAPI(`/api/projects?user_id=${userId}`);
export const createProject = (userId: string, data: any) =>
  fetchAPI(`/api/projects?user_id=${userId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
export const updateProject = (projectId: string, userId: string, data: any) =>
  fetchAPI(`/api/projects/${projectId}?user_id=${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
export const deleteProject = (projectId: string, userId: string) =>
  fetchAPI(`/api/projects/${projectId}?user_id=${userId}`, { method: 'DELETE' });
