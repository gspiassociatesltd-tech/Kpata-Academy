'use client';
import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [newCourse, setNewCourse] = useState({ title: '', description: '', difficulty: 'beginner', is_published: false });
  const [newLesson, setNewLesson] = useState({ course_id: '', title: '', content: '', order_index: 1 });
  const [newExercise, setNewExercise] = useState({ lesson_id: '', question: '', question_type: 'multiple_choice', options: '[]', correct_answer: '' });

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      setMessage('Failed to load courses');
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses?title=${encodeURIComponent(newCourse.title)}&description=${encodeURIComponent(newCourse.description)}&difficulty=${newCourse.difficulty}&is_published=${newCourse.is_published}`, { method: 'POST' });
      const data = await res.json();
      if (data.message) {
        setMessage('✅ Course created!');
        setNewCourse({ title: '', description: '', difficulty: 'beginner', is_published: false });
        fetchCourses();
      } else {
        setMessage('❌ Failed to create course');
      }
    } catch (err) {
      setMessage('❌ Error creating course');
    }
    setLoading(false);
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/lessons?course_id=${newLesson.course_id}&title=${encodeURIComponent(newLesson.title)}&content=${encodeURIComponent(newLesson.content)}&order_index=${newLesson.order_index}`, { method: 'POST' });
      const data = await res.json();
      if (data.message) {
        setMessage('✅ Lesson created!');
        setNewLesson({ course_id: '', title: '', content: '', order_index: 1 });
      } else {
        setMessage('❌ Failed to create lesson');
      }
    } catch (err) {
      setMessage('❌ Error creating lesson');
    }
    setLoading(false);
  };

  const handleCreateExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const options = JSON.parse(newExercise.options);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/exercises?lesson_id=${newExercise.lesson_id}&question=${encodeURIComponent(newExercise.question)}&question_type=${newExercise.question_type}&correct_answer=${encodeURIComponent(newExercise.correct_answer)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ options })
      });
      const data = await res.json();
      if (data.message) {
        setMessage('✅ Exercise created!');
        setNewExercise({ lesson_id: '', question: '', question_type: 'multiple_choice', options: '[]', correct_answer: '' });
      } else {
        setMessage('❌ Failed to create exercise');
      }
    } catch (err) {
      setMessage('❌ Error creating exercise');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🛠️ Admin Console</h1>
        {message && <div className="bg-gray-800 p-3 rounded mb-4">{message}</div>}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Create Course */}
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-bold mb-3">📚 New Course</h2>
            <form onSubmit={handleCreateCourse}>
              <input type="text" placeholder="Title" value={newCourse.title} onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} className="w-full bg-gray-700 p-2 rounded mb-2" required />
              <input type="text" placeholder="Description" value={newCourse.description} onChange={(e) => setNewCourse({...newCourse, description: e.target.value})} className="w-full bg-gray-700 p-2 rounded mb-2" />
              <select value={newCourse.difficulty} onChange={(e) => setNewCourse({...newCourse, difficulty: e.target.value})} className="w-full bg-gray-700 p-2 rounded mb-2">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <label className="flex items-center gap-2 mb-2">
                <input type="checkbox" checked={newCourse.is_published} onChange={(e) => setNewCourse({...newCourse, is_published: e.target.checked})} />
                Published
              </label>
              <button type="submit" disabled={loading} className="bg-blue-600 px-4 py-2 rounded w-full">Create Course</button>
            </form>
          </div>

          {/* Create Lesson */}
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-bold mb-3">📖 New Lesson</h2>
            <form onSubmit={handleCreateLesson}>
              <select value={newLesson.course_id} onChange={(e) => setNewLesson({...newLesson, course_id: e.target.value})} className="w-full bg-gray-700 p-2 rounded mb-2" required>
                <option value="">Select Course</option>
                {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
              <input type="text" placeholder="Lesson Title" value={newLesson.title} onChange={(e) => setNewLesson({...newLesson, title: e.target.value})} className="w-full bg-gray-700 p-2 rounded mb-2" required />
              <textarea placeholder="Content" value={newLesson.content} onChange={(e) => setNewLesson({...newLesson, content: e.target.value})} className="w-full bg-gray-700 p-2 rounded mb-2" rows={2} required />
              <input type="number" placeholder="Order Index" value={newLesson.order_index} onChange={(e) => setNewLesson({...newLesson, order_index: parseInt(e.target.value)})} className="w-full bg-gray-700 p-2 rounded mb-2" required />
              <button type="submit" disabled={loading} className="bg-green-600 px-4 py-2 rounded w-full">Create Lesson</button>
            </form>
          </div>

          {/* Create Exercise */}
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-bold mb-3">🧪 New Exercise</h2>
            <form onSubmit={handleCreateExercise}>
              <input type="text" placeholder="Lesson ID" value={newExercise.lesson_id} onChange={(e) => setNewExercise({...newExercise, lesson_id: e.target.value})} className="w-full bg-gray-700 p-2 rounded mb-2" required />
              <input type="text" placeholder="Question" value={newExercise.question} onChange={(e) => setNewExercise({...newExercise, question: e.target.value})} className="w-full bg-gray-700 p-2 rounded mb-2" required />
              <select value={newExercise.question_type} onChange={(e) => setNewExercise({...newExercise, question_type: e.target.value})} className="w-full bg-gray-700 p-2 rounded mb-2">
                <option value="multiple_choice">Multiple Choice</option>
                <option value="text">Text</option>
              </select>
              <input type="text" placeholder='Options (JSON array, e.g. ["A","B","C"])' value={newExercise.options} onChange={(e) => setNewExercise({...newExercise, options: e.target.value})} className="w-full bg-gray-700 p-2 rounded mb-2" />
              <input type="text" placeholder="Correct Answer" value={newExercise.correct_answer} onChange={(e) => setNewExercise({...newExercise, correct_answer: e.target.value})} className="w-full bg-gray-700 p-2 rounded mb-2" />
              <button type="submit" disabled={loading} className="bg-purple-600 px-4 py-2 rounded w-full">Create Exercise</button>
            </form>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-bold mb-3">📋 Existing Courses</h2>
          {courses.length === 0 ? <p className="text-gray-400">No courses yet.</p> : courses.map((c) => <div key={c.id} className="border-b border-gray-700 py-2"><strong>{c.title}</strong> — {c.difficulty} {c.is_published ? '✅' : '🔒'}</div>)}
        </div>
      </div>
    </Layout>
  );
}
