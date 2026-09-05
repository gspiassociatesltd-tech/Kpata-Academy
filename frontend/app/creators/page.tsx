'use client';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://kpata-academy-backend.onrender.com';

export default function CreatorsPage() {
  const { data: session } = useSession();
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    company_name: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/creators`)
      .then(res => res.json())
      .then(data => setCreators(data))
      .catch(err => console.error('Failed to load creators', err))
      .finally(() => setLoading(false));
  }, []);

  const handleContactClick = (creator: any) => {
    setSelectedCreator(creator);
    setShowForm(true);
    setSubmitted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCreator) return;
    try {
      const res = await fetch(`${API_BASE}/api/creator/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creator_id: selectedCreator.id,
          client_name: formData.client_name,
          client_email: formData.client_email,
          company_name: formData.company_name,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({
          client_name: '',
          client_email: '',
          company_name: '',
          message: '',
        });
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (err) {
      alert('Error submitting request.');
    }
  };

  if (loading) return <Layout><div>Loading creators...</div></Layout>;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🎨 Creator Showcase</h1>
        <p className="text-gray-400 mb-6">Discover and hire approved content creators for your projects.</p>

        {creators.length === 0 ? (
          <p className="text-gray-400">No creators available yet. Check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {creators.map((creator) => (
              <div key={creator.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold">{creator.full_name}</h3>
                <p className="text-sm text-blue-400">✅ Approved Creator</p>
                <p className="text-gray-400 mt-2">{creator.bio || 'No bio provided'}</p>
                <p className="text-sm text-gray-500">Expertise: {creator.expertise || 'General'}</p>
                {creator.portfolio_url && (
                  <a href={creator.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline">Portfolio</a>
                )}
                <button
                  onClick={() => handleContactClick(creator)}
                  className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  📩 Request Service
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Contact Request Modal */}
        {showForm && selectedCreator && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-2">Contact {selectedCreator.full_name}</h2>
              <p className="text-gray-400 text-sm mb-4">Fill in your details and they will get back to you.</p>
              {submitted ? (
                <div>
                  <p className="text-green-400">✅ Request sent successfully!</p>
                  <button
                    onClick={() => setShowForm(false)}
                    className="mt-4 bg-blue-600 px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="block text-sm mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="client_name"
                      value={formData.client_name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 p-2 rounded"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm mb-1">Your Email *</label>
                    <input
                      type="email"
                      name="client_email"
                      value={formData.client_email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 p-2 rounded"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm mb-1">Company Name</label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      className="w-full bg-gray-700 p-2 rounded"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm mb-1">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full bg-gray-700 p-2 rounded"
                    />
                  </div>
                  <button type="submit" className="w-full bg-green-600 py-2 rounded hover:bg-green-700">
                    Send Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-full mt-2 bg-gray-600 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
