'use client';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function PublicPortfolioPage() {
  const { user_id } = useParams();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    if (!user_id) return;
    const fetchProjects = async () => {
      try {
        // Fetch public projects only
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects?user_id=${user_id}`);
        const data = await res.json();
        // Filter only public projects
        const publicProjects = data.filter((p: any) => p.portfolio_ready === true);
        setProjects(publicProjects);
        if (publicProjects.length > 0) {
          setUserName(publicProjects[0].user_id || 'User');
        }
      } catch (err) {
        setError('Failed to load portfolio');
      }
      setLoading(false);
    };
    fetchProjects();
  }, [user_id]);

  if (loading) return <Layout><div className="text-center py-20">Loading portfolio...</div></Layout>;
  if (error) return <Layout><div className="text-center py-20 text-red-500">{error}</div></Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-2">{userName}'s Portfolio</h1>
        <p className="text-gray-400 mb-6">Public projects completed at Kpata Academy</p>

        {projects.length === 0 ? (
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <p className="text-gray-400">No public projects yet.</p>
            <p className="text-sm text-gray-500 mt-2">This user hasn't made any projects public.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-gray-400 mt-1">{p.description || 'No description'}</p>
                <p className="text-sm text-gray-500 mt-2">Type: {p.project_type}</p>
                {p.content && p.content.lesson_id && (
                  <p className="text-sm text-blue-400 mt-2">📚 Academy Project</p>
                )}
                <div className="mt-4 flex gap-2">
                  <span className="bg-green-600 text-xs px-2 py-1 rounded">🌐 Public</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
