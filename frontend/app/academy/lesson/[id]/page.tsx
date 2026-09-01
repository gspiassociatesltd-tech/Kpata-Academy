'use client';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { createProject } from '@/lib/api';

export default function LessonPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const userId = session?.user?.id || '97b74065-813b-4548-b0b7-f2f1d4512b23';

  const [lesson, setLesson] = useState<any>(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});

  const [tutorQuestion, setTutorQuestion] = useState('');
  const [tutorResponse, setTutorResponse] = useState('');
  const [tutorLoading, setTutorLoading] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8000/api/lessons/${id}`)
      .then(res => res.json())
      .then(data => {
        setLesson(data.lesson);
        setExercises(data.exercises || []);
        const initAnswers: Record<string, string> = {};
        const initFeedbacks: Record<string, string> = {};
        data.exercises?.forEach((ex: any) => {
          initAnswers[ex.id] = '';
          initFeedbacks[ex.id] = '';
        });
        setAnswers(initAnswers);
        setFeedbacks(initFeedbacks);
      })
      .catch(err => setError('Failed to load lesson'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAnswerChange = (exerciseId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [exerciseId]: value }));
  };

  const handleSubmit = (exercise: any) => {
    const userAnswer = answers[exercise.id] || '';
    let correct = false;
    if (exercise.question_type === 'multiple_choice') {
      correct = userAnswer === exercise.correct_answer;
    } else if (exercise.question_type === 'text') {
      correct = userAnswer.toLowerCase().includes(exercise.correct_answer.toLowerCase());
    }
    setFeedbacks(prev => ({
      ...prev,
      [exercise.id]: correct ? '✅ Correct!' : '❌ Try again.'
    }));
  };

  const askTutor = async () => {
    if (!tutorQuestion.trim()) return;
    setTutorLoading(true);
    setTutorResponse('');
    try {
      const res = await fetch(
        `http://localhost:8000/api/tutor?question=${encodeURIComponent(tutorQuestion)}&lesson_context=${encodeURIComponent(lesson?.content || '')}`,
        { method: 'POST' }
      );
      const data = await res.text();
      try {
        const json = JSON.parse(data);
        setTutorResponse(json.message || json.detail || JSON.stringify(json));
      } catch {
        setTutorResponse(data);
      }
    } catch (err) {
      setTutorResponse('Error contacting tutor. Please try again.');
    }
    setTutorLoading(false);
  };

  const saveToPortfolio = async () => {
    if (!lesson) return;
    setSaving(true);
    setSaveMessage('');
    try {
      await createProject(userId, {
        title: lesson.title,
        description: lesson.content,
        project_type: 'academy',
        content: { lesson_id: lesson.id, exercises: exercises.length },
        portfolio_ready: false,
      });
      setSaveMessage('✅ Saved to portfolio!');
    } catch (err) {
      setSaveMessage('❌ Failed to save. Please try again.');
    }
    setSaving(false);
  };

  if (loading) return <Layout><div>Loading lesson...</div></Layout>;
  if (error) return <Layout><div className="text-red-500">{error}</div></Layout>;
  if (!lesson) return <Layout><div>Lesson not found</div></Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <p>{lesson.content}</p>
        </div>

        <h2 className="text-2xl font-bold mb-4">🧪 Exercises</h2>
        {exercises.length === 0 ? (
          <p className="text-gray-400">No exercises for this lesson.</p>
        ) : (
          exercises.map((ex: any) => (
            <div key={ex.id} className="bg-gray-800 p-4 rounded-lg mb-4">
              <p className="font-semibold">{ex.question}</p>
              {ex.question_type === 'multiple_choice' && (
                <div className="mt-2 space-y-2">
                  {ex.options.map((opt: string) => (
                    <label key={opt} className="block">
                      <input
                        type="radio"
                        name={ex.id}
                        value={opt}
                        checked={answers[ex.id] === opt}
                        onChange={() => handleAnswerChange(ex.id, opt)}
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))}
                  <button
                    onClick={() => handleSubmit(ex)}
                    className="mt-2 bg-blue-600 px-4 py-1 rounded"
                  >
                    Submit
                  </button>
                </div>
              )}
              {ex.question_type === 'text' && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={answers[ex.id] || ''}
                    onChange={(e) => handleAnswerChange(ex.id, e.target.value)}
                    className="bg-gray-700 p-2 rounded w-full"
                    placeholder="Type your answer..."
                  />
                  <button
                    onClick={() => handleSubmit(ex)}
                    className="mt-2 bg-blue-600 px-4 py-1 rounded"
                  >
                    Submit
                  </button>
                </div>
              )}
              {feedbacks[ex.id] && (
                <div className="mt-2 text-yellow-400">{feedbacks[ex.id]}</div>
              )}
            </div>
          ))
        )}

        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={saveToPortfolio}
            disabled={saving}
            className="bg-green-600 px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : '💾 Save to Portfolio'}
          </button>
          {saveMessage && <span className="text-sm">{saveMessage}</span>}
        </div>

        <div className="mt-10 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🤖 AI Tutor</h2>
          <p className="text-gray-400 mb-4">Ask a question about this lesson.</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={tutorQuestion}
              onChange={(e) => setTutorQuestion(e.target.value)}
              className="flex-1 bg-gray-700 p-2 rounded"
              placeholder="Ask the AI Tutor..."
            />
            <button
              onClick={askTutor}
              disabled={tutorLoading}
              className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {tutorLoading ? 'Thinking...' : 'Ask'}
            </button>
          </div>
          {tutorResponse && (
            <div className="mt-4 bg-gray-900 p-4 rounded">
              <p className="text-green-400">{tutorResponse}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
