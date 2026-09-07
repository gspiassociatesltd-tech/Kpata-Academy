'use client';
import Layout from '@/components/Layout';
import { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { createProject } from '@/lib/api';
import Link from 'next/link';
import { uiTranslations } from '@/lib/uiTranslations';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://kpata-academy-backend.onrender.com';

// Declare webkitSpeechRecognition for TypeScript
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function LessonPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const lang = searchParams?.get('lang') || 'en';
  const { data: session } = useSession();
  const userId = session?.user?.id || '97b74065-813b-4548-b0b7-f2f1d4512b23';
  const t = uiTranslations[lang] || uiTranslations.en;

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

  const [nextLesson, setNextLesson] = useState<any>(null);
  const [prevLesson, setPrevLesson] = useState<any>(null);

  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Translation feedback
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Load lesson (use persistent translation if needed)
  useEffect(() => {
    if (!id) return;
    const fetchLesson = async () => {
      setLoading(true);
      try {
        let data;
        if (lang !== 'en') {
          const res = await fetch(`${API_BASE}/api/lesson/translate?lesson_id=${id}&target_lang=${lang}`, { method: 'POST' });
          if (!res.ok) throw new Error('Translation failed');
          data = await res.json();
          if (data.lesson) {
            setLesson(data.lesson);
            setExercises(data.exercises || []);
          } else {
            throw new Error('No lesson data');
          }
        } else {
          const res = await fetch(`${API_BASE}/api/lessons/${id}`);
          if (!res.ok) throw new Error('Failed to fetch lesson');
          data = await res.json();
          setLesson(data.lesson);
          setExercises(data.exercises || []);
        }
        // Initialize answers and feedbacks
        const initAnswers: Record<string, string> = {};
        const initFeedbacks: Record<string, string> = {};
        (exercises.length > 0 ? exercises : []).forEach((ex: any) => {
          initAnswers[ex.id] = '';
          initFeedbacks[ex.id] = '';
        });
        setAnswers(initAnswers);
        setFeedbacks(initFeedbacks);
      } catch (err) {
        console.error(err);
        setError(t.failedToLoad);
      }
      setLoading(false);
    };
    fetchLesson();
  }, [id, lang]);

  // Fetch course lessons for navigation
  useEffect(() => {
    if (!lesson) return;
    fetch(`${API_BASE}/api/courses/${lesson.course_id}/lessons`)
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a: any, b: any) => a.order_index - b.order_index);
        const currentIndex = sorted.findIndex((l: any) => l.id === lesson.id);
        if (currentIndex !== -1) {
          setNextLesson(currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null);
          setPrevLesson(currentIndex > 0 ? sorted[currentIndex - 1] : null);
        }
      })
      .catch(err => console.error('Failed to load course lessons', err));
  }, [lesson]);

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
      [exercise.id]: correct ? t.correct : t.tryAgain
    }));
  };

  // AI Tutor
  const askTutor = async () => {
    if (!tutorQuestion.trim()) return;
    setTutorLoading(true);
    setTutorResponse('');
    try {
      const res = await fetch(
        `${API_BASE}/api/tutor?question=${encodeURIComponent(tutorQuestion)}&lesson_context=${encodeURIComponent(lesson?.content || '')}`,
        { method: 'POST' }
      );
      const data = await res.text();
      try {
        const json = JSON.parse(data);
        setTutorResponse(json.message || json.detail || JSON.stringify(json));
        // Log the conversation
        if (userId) {
          await fetch(`${API_BASE}/api/tutor/log`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: userId,
              lesson_id: id,
              question: tutorQuestion,
              response: json.message || json.detail || JSON.stringify(json),
              language: lang,
            }),
          });
        }
      } catch {
        setTutorResponse(data);
      }
    } catch (err) {
      setTutorResponse(t.tryAgain);
    }
    setTutorLoading(false);
  };

  // Voice Input
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'ha' ? 'ha-NG' : lang === 'yo' ? 'yo-NG' : lang === 'ig' ? 'ig-NG' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTutorQuestion(transcript);
    };
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    recognition.start();
    recognitionRef.current = recognition;
  };

  // Voice Output
  // Voice Output
const speakResponse = () => {
  if (!tutorResponse) return;
  if ('speechSynthesis' in window) {
    // Clean the text: remove markdown formatting (e.g., **, \n, etc.)
    let cleanText = tutorResponse
      .replace(/\*\*/g, '')           // Remove bold markers
      .replace(/\\n/g, ' ')           // Replace newlines with spaces
      .replace(/[#*_`]/g, '')         // Remove other markdown symbols
      .replace(/\s+/g, ' ')           // Collapse multiple spaces
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'ha' ? 'ha-NG' : lang === 'yo' ? 'yo-NG' : lang === 'ig' ? 'ig-NG' : 'en-US';
    
    // Try to find a native-sounding voice (if available)
    const voices = window.speechSynthesis.getVoices();
    const nativeVoice = voices.find(v => v.lang.startsWith(utterance.lang.slice(0, 2)) && v.localService);
    if (nativeVoice) utterance.voice = nativeVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Text-to-speech is not supported in your browser.');
  }
};

  // Translation Feedback
  const submitFeedback = async () => {
    if (!feedbackText.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/api/translation/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lesson_id: id,
          language: lang,
          original_text: lesson?.content || '',
          suggested_text: feedbackText,
          user_id: userId,
        }),
      });
      if (res.ok) {
        setFeedbackSent(true);
        setFeedbackText('');
        setTimeout(() => setFeedbackSent(false), 3000);
      } else {
        alert('Failed to send feedback. Please try again.');
      }
    } catch (err) {
      alert('Error sending feedback.');
    }
  };

  // Save to Portfolio
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
      setSaveMessage('✅ ' + (lang === 'ha' ? 'Ajiye zuwa portfolio!' : 'Saved to portfolio!'));
    } catch (err) {
      setSaveMessage('❌ ' + (lang === 'ha' ? 'An kasa ajiyewa. Da fatan za a sake gwadawa.' : 'Failed to save. Please try again.'));
    }
    setSaving(false);
  };

  if (loading) return <Layout><div>{t.loading}</div></Layout>;
  if (error) return <Layout><div className="text-red-500">{error}</div></Layout>;
  if (!lesson) return <Layout><div>{t.lessonNotFound}</div></Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        {lang !== 'en' && (
          <p className="text-sm text-blue-400">{t.translatedTo} {lang}</p>
        )}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <p>{lesson.content}</p>
          {lang !== 'en' && (
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setShowFeedback(!showFeedback)}
                className="text-xs text-blue-400 hover:underline"
              >
                💬 Suggest better translation
              </button>
            </div>
          )}
          {showFeedback && (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Your suggested translation..."
                className="flex-1 bg-gray-700 p-1 rounded text-sm"
              />
              <button
                onClick={submitFeedback}
                className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Send
              </button>
              <button
                onClick={() => setShowFeedback(false)}
                className="bg-gray-600 px-3 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          )}
          {feedbackSent && (
            <p className="text-green-400 text-sm mt-1">✅ Thanks! Your suggestion has been saved.</p>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4">{t.exercises}</h2>
        {exercises.length === 0 ? (
          <p className="text-gray-400">{t.noExercises}</p>
        ) : (
          exercises.map((ex: any) => (
            <div key={ex.id} className="bg-gray-800 p-4 rounded-lg mb-4">
              <p className="font-semibold">{ex.question}</p>
              {ex.question_type === 'multiple_choice' && ex.options && (
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
                    {t.submit}
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
                    placeholder={t.askTutor}
                  />
                  <button
                    onClick={() => handleSubmit(ex)}
                    className="mt-2 bg-blue-600 px-4 py-1 rounded"
                  >
                    {t.submit}
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
            {saving ? t.thinking : t.saveToPortfolio}
          </button>
          {saveMessage && <span className="text-sm">{saveMessage}</span>}
        </div>

        <div className="mt-8 flex justify-between items-center border-t border-gray-700 pt-6">
          <div>
            {prevLesson ? (
              <Link href={`/academy/lesson/${prevLesson.id}?lang=${lang}`} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 inline-block">
                {t.previousLesson}
              </Link>
            ) : (
              <span className="text-gray-500 px-4 py-2 inline-block opacity-50 cursor-not-allowed">{t.previousLesson}</span>
            )}
          </div>
          <div>
            {nextLesson ? (
              <Link href={`/academy/lesson/${nextLesson.id}?lang=${lang}`} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 inline-block">
                {t.nextLesson}
              </Link>
            ) : (
              <span className="text-gray-500 px-4 py-2 inline-block">{t.completedCourse}</span>
            )}
          </div>
        </div>

        <div className="mt-10 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">{t.aiTutor}</h2>
          <p className="text-gray-400 mb-4">{t.askTutor}</p>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={tutorQuestion}
              onChange={(e) => setTutorQuestion(e.target.value)}
              className="flex-1 bg-gray-700 p-2 rounded"
              placeholder={t.askTutor}
            />
            <button
              onClick={askTutor}
              disabled={tutorLoading}
              className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {tutorLoading ? t.thinking : t.askButton}
            </button>
            <button
              onClick={startListening}
              disabled={isListening}
              className={`px-4 py-2 rounded ${isListening ? 'bg-red-600' : 'bg-blue-600'} hover:bg-blue-700 disabled:opacity-50`}
            >
              {isListening ? t.listening : t.speak}
            </button>
            </button>
              {tutorResponse && (
              <button
                
              onClick={speakResponse}
              disabled={isSpeaking}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {isSpeaking ? t.speaking : t.listen}
           </button>
            )}
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
