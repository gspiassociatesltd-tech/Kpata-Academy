'use client';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { getProposals, analyzeImprovements, approveProposal, rejectProposal } from '@/lib/api';

export default function ImprovementsPage() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getProposals();
      setProposals(data);
    } catch (e) {
      setMessage('Error loading proposals');
    }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      await analyzeImprovements();
      setMessage('Analysis complete. New proposals may have been created.');
      await loadData();
    } catch (e) {
      setMessage('Analysis failed.');
    }
    setLoading(false);
  };

  const handleApprove = async (id: string) => {
    setLoading(true);
    try {
      await approveProposal(id);
      setMessage('Proposal approved.');
      await loadData();
    } catch (e) {
      setMessage('Approval failed.');
    }
    setLoading(false);
  };

  const handleReject = async (id: string) => {
    setLoading(true);
    try {
      await rejectProposal(id);
      setMessage('Proposal rejected.');
      await loadData();
    } catch (e) {
      setMessage('Rejection failed.');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🔄 Platform Improvements</h1>
          <button
            onClick={handleAnalyze}
            className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : '🧠 Analyze & Suggest'}
          </button>
        </div>
        {message && <div className="bg-gray-800 p-3 rounded mb-4">{message}</div>}

        {proposals.length === 0 ? (
          <p className="text-gray-400">No improvement proposals yet. Click "Analyze & Suggest".</p>
        ) : (
          proposals.map((p: any) => (
            <div key={p.id} className="bg-gray-800 p-4 rounded mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold capitalize">{p.category}</h3>
                  <p>{p.description}</p>
                  <p className="text-sm text-gray-400">Rationale: {p.rationale}</p>
                  <p className="text-sm text-green-400">Impact: {p.estimated_impact}</p>
                  <p className="text-sm text-yellow-400">Risk: {p.risk_assessment}</p>
                  <p className="text-sm">Status: <span className="capitalize font-semibold">{p.status}</span></p>
                </div>
                {p.status === 'proposed' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(p.id)} className="bg-green-600 px-3 py-1 rounded">✅ Approve</button>
                    <button onClick={() => handleReject(p.id)} className="bg-red-600 px-3 py-1 rounded">❌ Reject</button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
