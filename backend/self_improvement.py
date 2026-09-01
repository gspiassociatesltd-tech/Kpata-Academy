import json
from datetime import datetime
from supabase import create_client, Client
import os

supabase: Client = create_client(
    "https://jerevwabgkyndactvabn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplcmV2d2FiZ2t5bmRhY3R2YWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMDY5NzQsImV4cCI6MjEwMjY4Mjk3NH0.oDGMA7loD_QD7xcsA1uI5zXzBexQFvRT6x9Phwb_P5Y"
)

def analyze_feedback():
    feedback = supabase.table("feedback").select("*").execute()
    return {"feedback_count": len(feedback.data)}

def analyze_usage():
    return {
        "active_users": 50,
        "lesson_completion_rate": 65,
        "ai_usage": 1000,
        "satisfaction_score": 4.2
    }

def generate_proposals():
    feedback_data = analyze_feedback()
    usage_data = analyze_usage()
    
    proposals = []
    
    if usage_data["lesson_completion_rate"] < 70:
        proposals.append({
            "category": "content",
            "description": "Improve lesson completion rate",
            "rationale": "Completion rate is below 70%",
            "estimated_impact": "Increase completion rate to 75%",
            "risk_assessment": "Low",
            "proposed_changes": {
                "action": "Simplify lessons",
                "details": "Add more examples and interactive elements"
            }
        })
    
    if usage_data["satisfaction_score"] < 4.5:
        proposals.append({
            "category": "ai_tutor",
            "description": "Improve AI Tutor satisfaction",
            "rationale": "Satisfaction score is below 4.5/5",
            "estimated_impact": "Increase satisfaction to 4.7/5",
            "risk_assessment": "Low",
            "proposed_changes": {
                "action": "Improve response quality",
                "details": "Train on more educational data"
            }
        })
    
    return proposals

def create_proposals():
    proposals = generate_proposals()
    for prop in proposals:
        existing = supabase.table("improvement_proposals").select("*").eq("description", prop["description"]).execute()
        if not existing.data:
            supabase.table("improvement_proposals").insert({
                "category": prop["category"],
                "description": prop["description"],
                "rationale": prop["rationale"],
                "estimated_impact": prop["estimated_impact"],
                "risk_assessment": prop["risk_assessment"],
                "proposed_changes": prop["proposed_changes"],
                "status": "proposed"
            }).execute()

if __name__ == "__main__":
    create_proposals()
