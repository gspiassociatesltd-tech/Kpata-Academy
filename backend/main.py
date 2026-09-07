from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
import uuid
import subprocess
from supabase import create_client, Client

app = FastAPI(title="Kpata Academy API", version="0.3")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://kpata-academy.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase: Client = create_client(
    "https://jerevwabgkyndactvabn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplcmV2d2FiZ2t5bmRhY3R2YWJuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzEwNjk3NCwiZXhwIjoyMTAyNjgyOTc0fQ.ebYZT-CrmPCmp0nuohBnOUxwosDI6fTlYRVb2c07fdU"
)

@app.get("/")
def root():
    return {"message": "Kpata Academy API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

# ============================================================
# LEARN & EARN
# ============================================================
class WithdrawRequest(BaseModel):
    amount: float
    method: str
    phone: Optional[str] = None
    account_details: Optional[str] = None

class MicrotaskSubmit(BaseModel):
    microtask_id: str
    units_completed: int

class GigApply(BaseModel):
    gig_id: str
    proposal: str

@app.get("/api/wallet/balance")
def get_wallet_balance(user_id: str):
    data = supabase.table("wallets").select("*").eq("user_id", user_id).execute()
    if not data.data:
        supabase.table("wallets").insert({"user_id": user_id, "balance": 0, "certification_savings": 0}).execute()
        data = supabase.table("wallets").select("*").eq("user_id", user_id).execute()
    return data.data[0] if data.data else {"balance": 0, "certification_savings": 0}

@app.get("/api/wallet/earnings")
def get_earnings(user_id: str):
    data = supabase.table("earnings_log").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return data.data

@app.post("/api/wallet/withdraw")
def request_withdrawal(withdraw: WithdrawRequest, user_id: str):
    wallet = supabase.table("wallets").select("*").eq("user_id", user_id).execute()
    if not wallet.data or wallet.data[0]["balance"] < withdraw.amount:
        return {"error": "Insufficient balance"}, 400
    withdrawal_data = {
        "user_id": user_id,
        "amount": withdraw.amount,
        "method": withdraw.method,
        "phone": withdraw.phone,
        "account_details": withdraw.account_details,
        "status": "pending"
    }
    result = supabase.table("withdrawals").insert(withdrawal_data).execute()
    if result.data:
        new_balance = wallet.data[0]["balance"] - withdraw.amount
        supabase.table("wallets").update({"balance": new_balance}).eq("user_id", user_id).execute()
        supabase.table("earnings_log").insert({
            "user_id": user_id,
            "source": "withdrawal",
            "amount": -withdraw.amount,
            "description": f"Withdrawal via {withdraw.method}",
            "status": "completed"
        }).execute()
        return {"message": "Withdrawal request submitted", "withdrawal_id": result.data[0]["id"]}
    return {"error": "Failed to process withdrawal"}, 500

@app.get("/api/microtasks")
def list_microtasks():
    data = supabase.table("microtasks").select("*").eq("status", "active").execute()
    return data.data

@app.post("/api/microtasks/submit")
def submit_microtask(submission: MicrotaskSubmit, user_id: str):
    task = supabase.table("microtasks").select("*").eq("id", submission.microtask_id).execute()
    if not task.data:
        return {"error": "Microtask not found"}, 404
    reward = task.data[0]["reward_per_unit"] * submission.units_completed
    submission_data = {
        "user_id": user_id,
        "microtask_id": submission.microtask_id,
        "units_completed": submission.units_completed,
        "reward": reward,
        "status": "pending_review"
    }
    result = supabase.table("microtask_submissions").insert(submission_data).execute()
    if result.data:
        wallet = supabase.table("wallets").select("*").eq("user_id", user_id).execute()
        if wallet.data:
            new_balance = wallet.data[0]["balance"] + reward
            supabase.table("wallets").update({"balance": new_balance}).eq("user_id", user_id).execute()
        else:
            supabase.table("wallets").insert({"user_id": user_id, "balance": reward, "certification_savings": 0}).execute()
        supabase.table("earnings_log").insert({
            "user_id": user_id,
            "source": "microtask",
            "amount": reward,
            "description": f"Microtask: {task.data[0]['title']}",
            "status": "pending_review"
        }).execute()
        return {"message": "Microtask submitted", "reward": reward, "submission_id": result.data[0]["id"]}
    return {"error": "Failed to submit microtask"}, 500

@app.get("/api/gigs")
def list_gigs():
    data = supabase.table("gigs").select("*").eq("status", "open").execute()
    return data.data

@app.post("/api/gigs/apply")
def apply_gig(apply: GigApply, user_id: str):
    existing = supabase.table("gig_applications").select("*").eq("gig_id", apply.gig_id).eq("user_id", user_id).execute()
    if existing.data:
        return {"error": "Already applied"}, 400
    application_data = {
        "gig_id": apply.gig_id,
        "user_id": user_id,
        "proposal": apply.proposal,
        "status": "pending"
    }
    result = supabase.table("gig_applications").insert(application_data).execute()
    if result.data:
        return {"message": "Application submitted", "application_id": result.data[0]["id"]}
    return {"error": "Failed to apply"}, 500

@app.post("/api/referrals/generate")
def generate_referral(user_id: str):
    existing = supabase.table("referrals").select("*").eq("referrer_id", user_id).execute()
    if existing.data:
        return {"referral_code": existing.data[0]["id"]}
    result = supabase.table("referrals").insert({"referrer_id": user_id}).execute()
    if result.data:
        return {"referral_code": result.data[0]["id"]}
    return {"error": "Failed to generate referral"}, 500

@app.get("/api/referrals/earnings")
def get_referral_earnings(user_id: str):
    data = supabase.table("referrals").select("*").eq("referrer_id", user_id).execute()
    total_earnings = sum(r.get("commission_earned", 0) for r in data.data)
    return {"total_earnings": total_earnings, "referrals": data.data}

@app.post("/api/mentorships/request")
def request_mentorship(mentor_id: str, user_id: str):
    existing = supabase.table("mentorships").select("*").eq("mentee_id", user_id).execute()
    if existing.data:
        return {"error": "Already in a mentorship"}, 400
    mentorship_data = {
        "mentor_id": mentor_id,
        "mentee_id": user_id,
        "revenue_share": 0.05,
        "status": "active"
    }
    result = supabase.table("mentorships").insert(mentorship_data).execute()
    if result.data:
        return {"message": "Mentorship request sent", "mentorship_id": result.data[0]["id"]}
    return {"error": "Failed to request mentorship"}, 500

# ============================================================
# COMPETITION DISCOVERY
# ============================================================
@app.get("/api/competitions")
def list_competitions():
    data = supabase.table("competitions").select("*").execute()
    return data.data

@app.get("/api/competitions/{competition_id}")
def get_competition(competition_id: str):
    data = supabase.table("competitions").select("*").eq("id", competition_id).execute()
    if not data.data:
        return {"error": "Competition not found"}, 404
    return data.data[0]

@app.post("/api/competitions/discover")
def discover_competitions():
    result = subprocess.run(
        ["python3", "competition_discovery.py"],
        capture_output=True,
        text=True,
        cwd=os.getcwd()
    )
    return {"message": "Discovery triggered", "output": result.stdout}

@app.post("/api/submissions/generate")
def generate_proposal(competition_id: str):
    comp = supabase.table("competitions").select("*").eq("id", competition_id).execute()
    if not comp.data:
        return {"error": "Competition not found"}, 404
    proposal = f"""
# {comp.data[0]['name']} Application

## About Kpata Academy
Kpata Academy is a free, multilingual AI education and creation ecosystem designed for African learners.

## Why We Qualify
- Free AI education for Nigerians
- Multilingual support (English, Hausa, Yorùbá, Igbo, Pidgin)
- African-language AI research pathway
- 10-Tier AI Supervision Architecture
- Founder 100 model validated with real users

## Our Vision
To build Africa's largest AI education and creation ecosystem, starting with Nigeria.

## Requested Support
{comp.data[0]['award_value']}
    """
    submission_data = {
        "competition_id": competition_id,
        "status": "draft",
        "proposal_content": proposal
    }
    result = supabase.table("submissions").insert(submission_data).execute()
    return {"message": "Proposal generated", "proposal": proposal, "submission_id": result.data[0]["id"]}

@app.get("/api/submissions")
def list_submissions():
    data = supabase.table("submissions").select("*").order("created_at", desc=True).execute()
    return data.data

@app.get("/api/submissions/{submission_id}")
def get_submission(submission_id: str):
    data = supabase.table("submissions").select("*").eq("id", submission_id).execute()
    if not data.data:
        return {"error": "Submission not found"}, 404
    return data.data[0]

@app.put("/api/submissions/{submission_id}/status")
def update_submission_status(submission_id: str, status: str):
    data = supabase.table("submissions").update({"status": status}).eq("id", submission_id).execute()
    return {"message": f"Submission {submission_id} status updated to {status}"}

# ============================================================
# SELF-IMPROVEMENT
# ============================================================
@app.get("/api/improvements/proposals")
def list_proposals():
    data = supabase.table("improvement_proposals").select("*").execute()
    return data.data

@app.post("/api/improvements/analyze")
def analyze_improvements():
    result = subprocess.run(
        ["python3", "self_improvement.py"],
        capture_output=True,
        text=True,
        cwd=os.getcwd()
    )
    return {"message": "Analysis complete", "output": result.stdout}

@app.post("/api/improvements/proposals/{proposal_id}/approve")
def approve_proposal(proposal_id: str):
    supabase.table("improvement_proposals").update({
        "status": "approved"
    }).eq("id", proposal_id).execute()
    return {"message": "Proposal approved"}

@app.post("/api/improvements/proposals/{proposal_id}/reject")
def reject_proposal(proposal_id: str):
    supabase.table("improvement_proposals").update({
        "status": "rejected"
    }).eq("id", proposal_id).execute()
    return {"message": "Proposal rejected"}

# ============================================================
# ACADEMY
# ============================================================
@app.get("/api/courses")
def list_courses():
    data = supabase.table("courses").select("*").execute()
    return data.data

@app.get("/api/courses/{course_id}/lessons")
def get_course_lessons(course_id: str):
    data = supabase.table("lessons").select("*").eq("course_id", course_id).order("order_index").execute()
    return data.data

@app.get("/api/lessons/{lesson_id}")
def get_lesson(lesson_id: str):
    lesson = supabase.table("lessons").select("*").eq("id", lesson_id).execute()
    if not lesson.data:
        return {"error": "Lesson not found"}, 404
    exercises = supabase.table("exercises").select("*").eq("lesson_id", lesson_id).execute()
    return {"lesson": lesson.data[0], "exercises": exercises.data}

class ProgressUpdate(BaseModel):
    user_id: str
    lesson_id: str
    status: str
    score: Optional[int] = None

@app.post("/api/progress")
def update_progress(progress: ProgressUpdate):
    existing = supabase.table("user_progress").select("*").eq("user_id", progress.user_id).eq("lesson_id", progress.lesson_id).execute()
    if existing.data:
        result = supabase.table("user_progress").update({
            "status": progress.status,
            "score": progress.score,
            "completed_at": "now()" if progress.status == "completed" else None
        }).eq("id", existing.data[0]["id"]).execute()
    else:
        result = supabase.table("user_progress").insert({
            "user_id": progress.user_id,
            "lesson_id": progress.lesson_id,
            "status": progress.status,
            "score": progress.score
        }).execute()
    return {"message": "Progress updated"}

# ============================================================
# AI TUTOR
# ============================================================
@app.post("/api/tutor")
async def tutor(question: str, lesson_context: str = ""):
    print(f"GROQ_API_KEY: {os.getenv('GROQ_API_KEY', 'NOT SET')}")
    api_key = os.getenv("GROQ_API_KEY", "")
    if api_key:
        import httpx
        print("Entered if block, calling Groq API...")
        payload = {
            "model": "openai/gpt-oss-20b",
            "messages": [
                {"role": "system", "content": "You are a helpful AI tutor for Kpata Academy. Answer questions about AI and machine learning clearly and simply."},
                {"role": "user", "content": f"Lesson context: {lesson_context}\nQuestion: {question}"}
            ],
            "max_tokens": 256
        }
        print(f"Payload: {payload}")
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={"Authorization": f"Bearer {api_key}"},
                json=payload
            )
            print(f"Groq API status: {response.status_code}")
            if response.status_code == 200:
                result = response.json()
                return result["choices"][0]["message"]["content"]
            else:
                print(f"Error response: {response.text}")
                return f"API error: {response.status_code}"
    # Fallback mock
    return "I'm here to help! (This is a mock response – set GROQ_API_KEY for real answers.)"

# ============================================================
# PORTFOLIO
# ============================================================
class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None
    project_type: str
    content: Optional[dict] = None
    portfolio_ready: Optional[bool] = False
    ai_disclosure: Optional[str] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    project_type: Optional[str] = None
    content: Optional[dict] = None
    portfolio_ready: Optional[bool] = None
    ai_disclosure: Optional[str] = None

@app.get("/api/projects")
def list_projects(user_id: str):
    data = supabase.table("projects").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return data.data

@app.post("/api/projects")
def create_project(project: ProjectCreate, user_id: str):
    data = {
        "user_id": user_id,
        "title": project.title,
        "description": project.description,
        "project_type": project.project_type,
        "content": project.content,
        "portfolio_ready": project.portfolio_ready,
        "ai_disclosure": project.ai_disclosure
    }
    result = supabase.table("projects").insert(data).execute()
    if result.data:
        return {"message": "Project created", "project": result.data[0]}
    return {"error": "Failed to create project"}, 500

@app.put("/api/projects/{project_id}")
def update_project(project_id: str, project: ProjectUpdate, user_id: str):
    existing = supabase.table("projects").select("*").eq("id", project_id).eq("user_id", user_id).execute()
    if not existing.data:
        return {"error": "Project not found or not owned by user"}, 404
    update_data = {}
    if project.title is not None:
        update_data["title"] = project.title
    if project.description is not None:
        update_data["description"] = project.description
    if project.project_type is not None:
        update_data["project_type"] = project.project_type
    if project.content is not None:
        update_data["content"] = project.content
    if project.portfolio_ready is not None:
        update_data["portfolio_ready"] = project.portfolio_ready
    if project.ai_disclosure is not None:
        update_data["ai_disclosure"] = project.ai_disclosure
    if not update_data:
        return {"error": "No fields to update"}, 400
    result = supabase.table("projects").update(update_data).eq("id", project_id).execute()
    if result.data:
        return {"message": "Project updated", "project": result.data[0]}
    return {"error": "Failed to update project"}, 500

@app.delete("/api/projects/{project_id}")
def delete_project(project_id: str, user_id: str):
    existing = supabase.table("projects").select("*").eq("id", project_id).eq("user_id", user_id).execute()
    if not existing.data:
        return {"error": "Project not found or not owned by user"}, 404
    result = supabase.table("projects").delete().eq("id", project_id).execute()
    if result.data:
        return {"message": "Project deleted"}
    return {"error": "Failed to delete project"}, 500

# ============================================================
# PORTFOLIO
# ============================================================
class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None
    project_type: str
    content: Optional[dict] = None
    portfolio_ready: Optional[bool] = False
    ai_disclosure: Optional[str] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    project_type: Optional[str] = None
    content: Optional[dict] = None
    portfolio_ready: Optional[bool] = None
    ai_disclosure: Optional[str] = None

@app.get("/api/projects")
def list_projects(user_id: str):
    data = supabase.table("projects").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return data.data

@app.post("/api/projects")
def create_project(project: ProjectCreate, user_id: str):
    data = {
        "user_id": user_id,
        "title": project.title,
        "description": project.description,
        "project_type": project.project_type,
        "content": project.content,
        "portfolio_ready": project.portfolio_ready,
        "ai_disclosure": project.ai_disclosure
    }
    result = supabase.table("projects").insert(data).execute()
    if result.data:
        return {"message": "Project created", "project": result.data[0]}
    return {"error": "Failed to create project"}, 500

@app.put("/api/projects/{project_id}")
def update_project(project_id: str, project: ProjectUpdate, user_id: str):
    existing = supabase.table("projects").select("*").eq("id", project_id).eq("user_id", user_id).execute()
    if not existing.data:
        return {"error": "Project not found or not owned by user"}, 404
    update_data = {}
    if project.title is not None:
        update_data["title"] = project.title
    if project.description is not None:
        update_data["description"] = project.description
    if project.project_type is not None:
        update_data["project_type"] = project.project_type
    if project.content is not None:
        update_data["content"] = project.content
    if project.portfolio_ready is not None:
        update_data["portfolio_ready"] = project.portfolio_ready
    if project.ai_disclosure is not None:
        update_data["ai_disclosure"] = project.ai_disclosure
    if not update_data:
        return {"error": "No fields to update"}, 400
    result = supabase.table("projects").update(update_data).eq("id", project_id).execute()
    if result.data:
        return {"message": "Project updated", "project": result.data[0]}
    return {"error": "Failed to update project"}, 500

@app.delete("/api/projects/{project_id}")
def delete_project(project_id: str, user_id: str):
    existing = supabase.table("projects").select("*").eq("id", project_id).eq("user_id", user_id).execute()
    if not existing.data:
        return {"error": "Project not found or not owned by user"}, 404
    result = supabase.table("projects").delete().eq("id", project_id).execute()
    if result.data:
        return {"message": "Project deleted"}
    return {"error": "Failed to delete project"}, 500
# ============================================================
# ADMIN ENDPOINTS
# ============================================================
@app.post("/api/admin/courses")
def admin_create_course(title: str, description: str = "", difficulty: str = "beginner", is_published: bool = False):
    data = {
        "title": title,
        "description": description,
        "difficulty": difficulty,
        "is_published": is_published
    }
    result = supabase.table("courses").insert(data).execute()
    if result.data:
        return {"message": "Course created", "course": result.data[0]}
    return {"error": "Failed to create course"}, 500

@app.post("/api/admin/lessons")
def admin_create_lesson(course_id: str, title: str, content: str, order_index: int):
    data = {
        "course_id": course_id,
        "title": title,
        "content": content,
        "order_index": order_index
    }
    result = supabase.table("lessons").insert(data).execute()
    if result.data:
        return {"message": "Lesson created", "lesson": result.data[0]}
    return {"error": "Failed to create lesson"}, 500

@app.post("/api/admin/exercises")
def admin_create_exercise(lesson_id: str, question: str, question_type: str, options: list = None, correct_answer: str = None):
    data = {
        "lesson_id": lesson_id,
        "question": question,
        "question_type": question_type,
        "options": options,
        "correct_answer": correct_answer
    }
    result = supabase.table("exercises").insert(data).execute()
    if result.data:
        return {"message": "Exercise created", "exercise": result.data[0]}
    return {"error": "Failed to create exercise"}, 500
# ============================================================
# CERTIFICATIONS
# ============================================================
@app.get("/api/certifications")
def list_certifications():
    data = supabase.table("certifications").select("*").execute()
    return data.data

@app.get("/api/certifications/{slug}")
def get_certification(slug: str):
    data = supabase.table("certifications").select("*").eq("slug", slug).execute()
    if not data.data:
        return {"error": "Certification not found"}, 404
    return data.data[0]
# ============================================================
# CERTIFICATION LESSONS
# ============================================================
@app.get("/api/certifications/{slug}/lessons")
def get_certification_lessons(slug: str):
    # Get certification ID from slug
    cert = supabase.table("certifications").select("id").eq("slug", slug).execute()
    if not cert.data:
        return {"error": "Certification not found"}, 404
    cert_id = cert.data[0]["id"]

    # Get lessons for this certification via the mapping table
    result = supabase.table("certification_lessons")\
        .select("lessons(*)")\
        .eq("certification_id", cert_id)\
        .order("order_index")\
        .execute()

    # Extract lesson data from the result
    lessons = [item["lessons"] for item in result.data if item.get("lessons")]
    return lessons
# ============================================================
# CERTIFICATION LESSONS
# ============================================================
@app.get("/api/certifications/{slug}/lessons")
def get_certification_lessons(slug: str):
    # Get certification id
    cert = supabase.table("certifications").select("id").eq("slug", slug).execute()
    if not cert.data:
        return {"error": "Certification not found"}, 404
    cert_id = cert.data[0]["id"]
    # Get lessons from mapping table, ordered
    result = supabase.table("certification_lessons")\
        .select("lesson_id, order_index, lessons(title, content)")\
        .eq("certification_id", cert_id)\
        .order("order_index")\
        .execute()
    # Extract lessons
    lessons = [item["lessons"] for item in result.data]
    return lessons
# ============================================================
# CERTIFICATION LESSONS
# ============================================================
@app.get("/api/certifications/{slug}/lessons")
def get_certification_lessons(slug: str):
    # Get certification id from slug
    cert = supabase.table("certifications").select("id").eq("slug", slug).execute()
    if not cert.data:
        return {"error": "Certification not found"}, 404
    cert_id = cert.data[0]["id"]

    # Fetch lessons with their order
    result = supabase.table("certification_lessons")\
        .select("lesson_id, order_index, lessons(*)") \
        .eq("certification_id", cert_id) \
        .order("order_index") \
        .execute()

    lessons = []
    for item in result.data:
        lesson = item["lessons"]
        lesson["order_index"] = item["order_index"]
        lessons.append(lesson)
    return lessons
# ============================================================
# TALENT DIRECTORY
# ============================================================
@app.get("/api/talent")
def list_talent():
    # Get all users who have completed all 30 lessons
    # First, get all lesson IDs for the bootcamp course
    lessons = supabase.table("lessons").select("id").eq("course_id", "a1b2c3d4-e5f6-7890-abcd-ef1234567890").execute()
    lesson_ids = [l["id"] for l in lessons.data]
    total_lessons = len(lesson_ids)

    # Get all users who have completed all lessons
    # We'll use a subquery to count completed lessons per user
    # Supabase doesn't support complex joins easily; we'll fetch all progress and filter in Python.
    progress = supabase.table("user_progress").select("user_id, lesson_id, status").execute()
    # Group by user and count completed
    user_completed = {}
    for p in progress.data:
        if p["status"] == "completed":
            user_completed[p["user_id"]] = user_completed.get(p["user_id"], 0) + 1

    certified_users = [uid for uid, count in user_completed.items() if count >= total_lessons]

    # Fetch user details
    if certified_users:
        users = supabase.table("users").select("id, full_name, email").in_("id", certified_users).execute()
        return users.data
    else:
        return []

@app.post("/api/employer/request")
def submit_employer_request(talent_id: str, employer_name: str, employer_email: str, company_name: str = "", job_title: str = "", message: str = ""):
    data = {
        "talent_id": talent_id,
        "employer_name": employer_name,
        "employer_email": employer_email,
        "company_name": company_name,
        "job_title": job_title,
        "message": message,
        "status": "pending"
    }
    result = supabase.table("employer_requests").insert(data).execute()
    if result.data:
        return {"message": "Request submitted successfully", "request_id": result.data[0]["id"]}
    else:
        return {"error": "Failed to submit request"}, 500
# ============================================================
# CREATOR SHOWCASE
# ============================================================
@app.get("/api/creators")
def list_creators():
    data = supabase.table("content_creators").select("*").eq("status", "approved").execute()
    return data.data

@app.post("/api/creators/request")
def submit_creator_request(creator_id: str, client_name: str, client_email: str, company_name: str = "", message: str = ""):
    data = {
        "creator_id": creator_id,
        "client_name": client_name,
        "client_email": client_email,
        "company_name": company_name,
        "message": message,
        "status": "pending"
    }
    result = supabase.table("creator_requests").insert(data).execute()
    if result.data:
        return {"message": "Request submitted successfully", "request_id": result.data[0]["id"]}
    else:
        return {"error": "Failed to submit request"}, 500
@app.post("/api/referrals/register")
def register_referral(referrer_id: str, referred_id: str):
    # Check if referral already exists
    existing = supabase.table("referrals").select("*").eq("referrer_id", referrer_id).eq("referred_id", referred_id).execute()
    if existing.data:
        return {"message": "Referral already recorded"}
    data = {
        "referrer_id": referrer_id,
        "referred_id": referred_id,
        "commission_earned": 0,
        "status": "pending"
    }
    result = supabase.table("referrals").insert(data).execute()
    if result.data:
        return {"message": "Referral recorded"}
    return {"error": "Failed to record referral"}, 500
@app.get("/api/referrals/stats")
def get_referral_stats(user_id: str):
    # Total referrals
    total = supabase.table("referrals").select("id", count="exact").eq("referrer_id", user_id).execute()
    total_count = total.count if total.count else 0

    # Earnings from referrals
    earnings = supabase.table("referrals").select("commission_earned").eq("referrer_id", user_id).execute()
    total_earnings = sum(r.get("commission_earned", 0) for r in earnings.data)

    return {
        "total_referrals": total_count,
        "total_earnings": total_earnings
    }
# ============================================================
# MARKETING DRAFTS
# ============================================================
@app.post("/api/marketing/generate")
def generate_marketing_draft(user_id: str, certification_slug: str):
    # Get user details
    user = supabase.table("users").select("full_name").eq("id", user_id).execute()
    if not user.data:
        return {"error": "User not found"}, 404
    user_name = user.data[0]["full_name"]

    # Get certification details by slug
    cert = supabase.table("certifications").select("id, name").eq("slug", certification_slug).execute()
    if not cert.data:
        return {"error": "Certification not found"}, 404
    cert_id = cert.data[0]["id"]
    cert_name = cert.data[0]["name"]

    # Generate draft using AI (mock for MVP)
    draft = f"""
🎉 Congratulations to {user_name} for earning the **{cert_name}** certification on Kpata Academy!

🚀 Learn AI for free, earn globally recognized certifications, and build your portfolio.

👉 Join now: https://kpata-academy.vercel.app
#AI #EdTech #KpataAcademy #Certification #FreeLearning
    """

    # Save draft to database
    data = {
        "user_id": user_id,
        "certification_id": cert_id,
        "draft_text": draft.strip(),
        "platform": "all",
        "status": "pending"
    }
    result = supabase.table("marketing_drafts").insert(data).execute()
    if result.data:
        return {
            "message": "Draft generated",
            "draft": draft.strip(),
            "draft_id": result.data[0]["id"]
        }
    return {"error": "Failed to save draft"}, 500

@app.get("/api/marketing/drafts")
def list_marketing_drafts(status: str = "pending"):
    data = supabase.table("marketing_drafts").select("*").eq("status", status).execute()
    return data.data

@app.put("/api/marketing/drafts/{draft_id}/approve")
def approve_marketing_draft(draft_id: str):
    result = supabase.table("marketing_drafts").update({"status": "approved"}).eq("id", draft_id).execute()
    if result.data:
        return {"message": "Draft approved", "draft": result.data[0]}
    return {"error": "Draft not found"}, 404
# ============================================================
# TRANSLATION ENDPOINT
# ============================================================
@app.post("/api/translate")
def translate_text(text: str, target_lang: str):
    import httpx
    import os
    if not text:
        return {"translation": ""}
    prompt = f"Translate the following English text into {target_lang} (Hausa, Yoruba, Igbo, or Nigerian Pidgin). Return only the translation, nothing else:\n\n{text}"
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return {"error": "GROQ_API_KEY not set"}, 500
    try:
        with httpx.Client() as client:
            response = client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={"Authorization": f"Bearer {api_key}"},
                json={
                    "model": "openai/gpt-oss-20b",
                    "messages": [
                        {"role": "system", "content": "You are an expert translator."},
                        {"role": "user", "content": prompt}
                    ],
                    "temperature": 0.3,
                    "max_tokens": 512
                },
                timeout=30
            )
            if response.status_code == 200:
                result = response.json()
                return {"translation": result["choices"][0]["message"]["content"].strip()}
            else:
                return {"error": f"Translation failed: {response.status_code}"}, response.status_code
    except Exception as e:
        return {"error": str(e)}, 500
# ============================================================
# PERSISTENT LESSON TRANSLATION
# ============================================================
@app.post("/api/lesson/translate")
def translate_and_save_lesson(lesson_id: str, target_lang: str):
    import httpx
    import os
    from supabase import create_client, Client

    # Fetch lesson and exercises
    lesson = supabase.table("lessons").select("*").eq("id", lesson_id).execute()
    if not lesson.data:
        return {"error": "Lesson not found"}, 404
    lesson_data = lesson.data[0]

    exercises = supabase.table("exercises").select("*").eq("lesson_id", lesson_id).execute()
    exercises_data = exercises.data

    # Translate function
    def translate_text(text: str) -> str:
        if not text or text.strip() == "":
            return text
        prompt = f"Translate the following English text into {target_lang} (Hausa, Yoruba, Igbo, or Nigerian Pidgin). Return only the translation, nothing else:\n\n{text}"
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            return text
        try:
            with httpx.Client() as client:
                response = client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={"Authorization": f"Bearer {api_key}"},
                    json={
                        "model": "openai/gpt-oss-20b",
                        "messages": [
                            {"role": "system", "content": "You are an expert translator."},
                            {"role": "user", "content": prompt}
                        ],
                        "temperature": 0.3,
                        "max_tokens": 512
                    },
                    timeout=30
                )
                if response.status_code == 200:
                    result = response.json()
                    return result["choices"][0]["message"]["content"].strip()
                else:
                    return text
        except Exception:
            return text

    # Update lesson translations
    lesson_translations = lesson_data.get("translations", {})
    if target_lang not in lesson_translations:
        translated_title = translate_text(lesson_data["title"])
        translated_content = translate_text(lesson_data["content"])
        lesson_translations[target_lang] = {
            "title": translated_title,
            "content": translated_content
        }
        supabase.table("lessons").update({"translations": lesson_translations}).eq("id", lesson_id).execute()

    # Update exercise translations
    for ex in exercises_data:
        ex_translations = ex.get("translations", {})
        if target_lang not in ex_translations:
            translated_question = translate_text(ex["question"])
            translated_options = []
            if ex.get("options"):
                for opt in ex["options"]:
                    translated_options.append(translate_text(opt))
            translated_correct = translate_text(ex["correct_answer"]) if ex.get("correct_answer") else ""
            ex_translations[target_lang] = {
                "question": translated_question,
                "options": translated_options,
                "correct_answer": translated_correct
            }
            supabase.table("exercises").update({"translations": ex_translations}).eq("id", ex["id"]).execute()

    # Return the now-translated lesson (with exercises)
    translated_lesson = lesson_data.copy()
    translated_lesson["title"] = lesson_translations[target_lang]["title"]
    translated_lesson["content"] = lesson_translations[target_lang]["content"]

    translated_exercises = []
    for ex in exercises_data:
        new_ex = ex.copy()
        ex_trans = ex.get("translations", {}).get(target_lang, {})
        if ex_trans:
            new_ex["question"] = ex_trans.get("question", ex["question"])
            new_ex["options"] = ex_trans.get("options", ex["options"])
            new_ex["correct_answer"] = ex_trans.get("correct_answer", ex["correct_answer"])
        translated_exercises.append(new_ex)

    return {"lesson": translated_lesson, "exercises": translated_exercises}
# ============================================================
# TUTOR CONVERSATION LOG
# ============================================================
@app.post("/api/tutor/log")
def log_tutor_conversation(user_id: str, lesson_id: str, question: str, response: str, language: str = "en"):
    data = {
        "user_id": user_id,
        "lesson_id": lesson_id,
        "question": question,
        "response": response,
        "language": language,
    }
    result = supabase.table("tutor_conversations").insert(data).execute()
    if result.data:
        return {"message": "Conversation logged", "id": result.data[0]["id"]}
    return {"error": "Failed to log conversation"}, 500
# ============================================================
# TRANSLATION FEEDBACK
# ============================================================
@app.post("/api/translation/feedback")
def submit_translation_feedback(
    lesson_id: str,
    language: str,
    original_text: str,
    suggested_text: str,
    user_id: str,
    exercise_id: str = None
):
    data = {
        "lesson_id": lesson_id,
        "language": language,
        "original_text": original_text,
        "suggested_text": suggested_text,
        "user_id": user_id,
    }
    if exercise_id:
        data["exercise_id"] = exercise_id

    result = supabase.table("translation_feedback").insert(data).execute()
    if result.data:
        return {"message": "Feedback saved", "id": result.data[0]["id"]}
    else:
        return {"error": "Failed to save feedback"}, 500
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


@app.post("/api/admin/lessons")
def admin_create_lesson(course_id: str, title: str, content: str, order_index: int):
    data = {
        "course_id": course_id,
        "title": title,
        "content": content,
        "order_index": order_index
    }
    result = supabase.table("lessons").insert(data).execute()
    if result.data:
        return {"message": "Lesson created", "lesson": result.data[0]}
    return {"error": "Failed to create lesson"}, 500

@app.post("/api/admin/exercises")
def admin_create_exercise(lesson_id: str, question: str, question_type: str, options: list = None, correct_answer: str = None):
    data = {
        "lesson_id": lesson_id,
        "question": question,
        "question_type": question_type,
        "options": options,
        "correct_answer": correct_answer
    }
    result = supabase.table("exercises").insert(data).execute()
    if result.data:
        return {"message": "Exercise created", "exercise": result.data[0]}
    return {"error": "Failed to create exercise"}, 500
