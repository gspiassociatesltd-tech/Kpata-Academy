'use client';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://kpata-academy-backend.onrender.com';

export default function MarketingDraftsPage() {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchDrafts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/marketing/drafts?status=pending`);
      const data = await res.json();
      setDrafts(data);
    } catch (err) {
      setMessage('Failed to load drafts');
    }
    setLoading(false);
  };

  useEffect(() => { fetchDrafts(); }, []);

  const handleApprove = async (draftId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/marketing/drafts/${draftId}/approve`, { method: 'PUT' });
      if (res.ok) {
        setMessage('✅ Draft approved!');
        fetchDrafts();
      } else {
        setMessage('❌ Failed to approve');
      }
    } catch (err) {
      setMessage('❌ Error approving');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setMessage('📋 Copied to clipboard!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) return <Layout><div>Loading drafts...</div></Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">📢 Marketing Drafts</h1>
        <p className="text-gray-400 mb-6">Review and approve auto‑generated posts before publishing.</p>

        {message && <div className="bg-gray-800 p-3 rounded mb-4">{message}</div>}

        {drafts.length === 0 ? (
          <p className="text-gray-400">No pending drafts.</p>
        ) : (
          drafts.map((draft) => (
            <div key={draft.id} className="bg-gray-800 p-6 rounded-lg mb-4 border border-gray-700">
              <div className="whitespace-pre-wrap text-sm">{draft.draft_text}</div>
              <div className="mt-4 flex gap-3 flex-wrap">
                <button
                  onClick={() => handleApprove(draft.id)}
                  className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 text-sm"
                >
                  ✅ Approve & Post
                </button>
                <button
                  onClick={() => copyToClipboard(draft.draft_text)}
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  📋 Copy Draft
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Created: {new Date(draft.created_at).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
