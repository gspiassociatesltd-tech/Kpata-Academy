'use client';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { getCompetitions, discoverCompetitions, generateProposal, getSubmissions } from '@/lib/api';

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const comps = await getCompetitions();
      setCompetitions(comps);
      const subs = await getSubmissions();
      setSubmissions(subs);
    } catch (e) {
      setMessage('Error loading data');
    }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleDiscover = async () => {
    setLoading(true);
    try {
      await discoverCompetitions();
      setMessage('Discovery triggered! Refresh to see new competitions.');
      await loadData();
    } catch (e) {
      setMessage('Discovery failed.');
    }
    setLoading(false);
  };

  const handleGenerate = async (id: string) => {
    setLoading(true);
    try {
      await generateProposal(id);
      setMessage('Proposal generated! Check submissions.');
      await loadData();
    } catch (e) {
      setMessage('Proposal generation failed.');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🏆 Competitions & Opportunities</h1>
          <button
            onClick={handleDiscover}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : '🔍 Discover New'}
          </button>
        </div>
        {message && <div className="bg-gray-800 p-3 rounded mb-4">{message}</div>}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Active Competitions</h2>
            {competitions.length === 0 ? (
              <p className="text-gray-400">No competitions yet. Click "Discover New".</p>
            ) : (
              competitions.map((c: any) => (
                <div key={c.id} className="bg-gray-800 p-4 rounded mb-3">
                  <h3 className="font-bold">{c.name}</h3>
                  <p className="text-sm text-gray-400">{c.description}</p>
                  <p className="text-sm">💰 {c.award_value}</p>
                  <p className="text-sm">📅 {new Date(c.deadline).toLocaleDateString()}</p>
                  <button
                    onClick={() => handleGenerate(c.id)}
                    className="mt-2 bg-yellow-500 text-black px-3 py-1 rounded text-sm"
                    disabled={loading}
                  >
                    Generate Proposal
                  </button>
                </div>
              ))
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">📄 Submissions</h2>
            {submissions.length === 0 ? (
              <p className="text-gray-400">No submissions yet.</p>
            ) : (
              submissions.map((s: any) => (
                <div key={s.id} className="bg-gray-800 p-4 rounded mb-3">
                  <p className="font-bold">Status: <span className="capitalize">{s.status}</span></p>
                  <p className="text-sm text-gray-400">Submitted: {new Date(s.submitted_at).toLocaleDateString()}</p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-blue-400">View Proposal</summary>
                    <pre className="whitespace-pre-wrap text-sm bg-gray-900 p-2 rounded mt-1">{s.proposal_content}</pre>
                  </details>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
