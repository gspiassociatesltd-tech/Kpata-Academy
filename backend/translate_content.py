import os
import time
import httpx
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://jerevwabgkyndactvabn.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplcmV2d2FiZ2t5bmRhY3R2YWJuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzEwNjk3NCwiZXhwIjoyMTAyNjgyOTc0fQ.ebYZT-CrmPCmp0nuohBnOUxwosDI6fTlYRVb2c07fdU")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    print("❌ GROQ_API_KEY not set.")
    exit(1)

LANGUAGES = ["ha", "yo", "ig", "pcm"]

def translate_text(text: str, target_lang: str, retries: int = 5) -> str:
    if not text or text.strip() == "":
        return text
    prompt = f"Translate the following English text into {target_lang} (Hausa, Yoruba, Igbo, or Nigerian Pidgin). Return only the translation, nothing else:\n\n{text}"
    for attempt in range(retries):
        try:
            with httpx.Client() as client:
                response = client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
                    json={
                        "model": "openai/gpt-oss-20b",
                        "messages": [
                            {"role": "system", "content": "You are an expert translator who translates English into Nigerian languages accurately."},
                            {"role": "user", "content": prompt}
                        ],
                        "temperature": 0.3,
                        "max_tokens": 512
                    },
                    timeout=60
                )
                if response.status_code == 200:
                    result = response.json()
                    return result["choices"][0]["message"]["content"].strip()
                elif response.status_code == 429:
                    # Rate limit – wait and retry
                    wait = (attempt + 1) * 3  # exponential backoff
                    print(f"⏳ Rate limit hit. Waiting {wait}s before retry...")
                    time.sleep(wait)
                    continue
                else:
                    print(f"❌ Groq error: {response.status_code} - {response.text}")
                    return text  # fallback to original
        except Exception as e:
            print(f"❌ Translation error: {e}")
            time.sleep(2)
            continue
    print(f"⚠️ Failed after {retries} attempts. Returning original text.")
    return text

def translate_lessons():
    lessons = supabase.table("lessons").select("id, title, content, translations").execute()
    for lesson in lessons.data:
        existing = lesson.get("translations") or {}
        updated = False
        for lang in LANGUAGES:
            if lang not in existing:
                print(f"Translating lesson {lesson['title']} into {lang}...")
                translated_title = translate_text(lesson["title"], lang)
                translated_content = translate_text(lesson["content"], lang)
                existing[lang] = {
                    "title": translated_title,
                    "content": translated_content
                }
                updated = True
                time.sleep(2.5)  # Pause between requests to stay under rate limit
        if updated:
            supabase.table("lessons").update({"translations": existing}).eq("id", lesson["id"]).execute()
            print(f"✅ Updated lesson {lesson['title']}")

def translate_exercises():
    exercises = supabase.table("exercises").select("id, question, options, correct_answer, translations").execute()
    for ex in exercises.data:
        existing = ex.get("translations") or {}
        updated = False
        for lang in LANGUAGES:
            if lang not in existing:
                print(f"Translating exercise {ex['question'][:30]}... into {lang}...")
                translated_question = translate_text(ex["question"], lang)
                translated_correct = translate_text(ex["correct_answer"], lang) if ex.get("correct_answer") else ""
                translated_options = []
                if ex.get("options"):
                    for opt in ex["options"]:
                        translated_options.append(translate_text(opt, lang))
                existing[lang] = {
                    "question": translated_question,
                    "options": translated_options,
                    "correct_answer": translated_correct
                }
                updated = True
                time.sleep(2.5)
        if updated:
            supabase.table("exercises").update({"translations": existing}).eq("id", ex["id"]).execute()
            print(f"✅ Updated exercise {ex['question'][:30]}...")

if __name__ == "__main__":
    print("🚀 Starting translations with retry logic...")
    translate_lessons()
    translate_exercises()
    print("🎉 All translations completed!")
