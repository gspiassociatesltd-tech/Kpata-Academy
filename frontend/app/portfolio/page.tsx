'use client';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getProjects, createProject, updateProject, deleteProject } from '@/lib/api';

export default function PortfolioPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id || '97b74065-813b-4548-b0b7-f2f1d4512b23';
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', project_type: 'academy' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects(userId);
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, [userId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject(userId, newProject);
      setNewProject({ title: '', description: '', project_type: 'academy' });
      setShowForm(false);
      loadProjects();
    } catch (err) {
      setError('Failed to create project');
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateProject(id, userId, editData);
      setEditingId(null);
      setEditData({});
      loadProjects();
    } catch (err) {
      setError('Failed to update project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await deleteProject(id, userId);
      loadProjects();
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  const togglePortfolioReady = async (id: string, current: boolean) => {
    try {
      await updateProject(id, userId, { portfolio_ready: !current });
      loadProjects();
    } catch (err) {
      setError('Failed to update portfolio status');
    }
  };

  if (loading) return <Layout><div>Loading projects...</div></Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📁 My Portfolio</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Project
          </button>
        </div>

        {error && <div className="bg-red-800 p-3 rounded mb-4">{error}</div>}

        {showForm && (
          <form onSubmit={handleCreate} className="bg-gray-800 p-4 rounded mb-6">
            <div className="mb-3">
              <label className="block text-sm">Title</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full bg-gray-700 p-2 rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm">Description</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full bg-gray-700 p-2 rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm">Type</label>
              <select
                value={newProject.project_type}
                onChange={(e) => setNewProject({ ...newProject, project_type: e.target.value })}
                className="w-full bg-gray-700 p-2 rounded"
              >
                <option value="academy">Academy</option>
                <option value="studio">AI Studio</option>
                <option value="storymaker">StoryMaker</option>
                <option value="lab">Lab</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <button type="submit" className="bg-green-600 px-4 py-2 rounded">Create</button>
            <button type="button" onClick={() => setShowForm(false)} className="ml-2 bg-gray-600 px-4 py-2 rounded">Cancel</button>
          </form>
        )}

        {projects.length === 0 ? (
          <p className="text-gray-400">No projects yet. Create one above.</p>
        ) : (
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.id} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{p.title}</h3>
                    <p className="text-gray-400">{p.description}</p>
                    <p className="text-sm text-gray-500">Type: {p.project_type}</p>
                    <p className="text-sm text-gray-500">
                      Portfolio: {p.portfolio_ready ? '✅ Public' : '🔒 Private'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePortfolioReady(p.id, p.portfolio_ready)}
                      className="text-sm bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700"
                    >
                      {p.portfolio_ready ? 'Make Private' : 'Make Public'}
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(p.id);
                        setEditData(p);
                      }}
                      className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {editingId === p.id && (
                  <div className="mt-3 border-t border-gray-700 pt-3">
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full bg-gray-700 p-2 rounded mb-2"
                      placeholder="Title"
                    />
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="w-full bg-gray-700 p-2 rounded mb-2"
                      placeholder="Description"
                    />
                    <button
                      onClick={() => handleUpdate(p.id)}
                      className="bg-green-600 px-4 py-1 rounded hover:bg-green-700 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => { setEditingId(null); setEditData({}); }}
                      className="bg-gray-600 px-4 py-1 rounded hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
