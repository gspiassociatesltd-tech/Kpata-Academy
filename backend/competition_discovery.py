import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
from supabase import create_client, Client
import os

# Supabase client (using the correct URL and full anon key)
supabase: Client = create_client(
    "https://jerevwabgkyndactvabn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplcmV2d2FiZ2t5bmRhY3R2YWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMDY5NzQsImV4cCI6MjEwMjY4Mjk3NH0.oDGMA7loD_QD7xcsA1uI5zXzBexQFvRT6x9Phwb_P5Y"
)

def discover_competitions():
    # 1. Get all active competition sources
    sources = supabase.table("competition_sources").select("*").eq("is_active", True).execute()
    print(f"🔍 Found {len(sources.data)} sources")

    competitions = []

    for source in sources.data:
        print(f"📡 Scraping: {source['source_name']}")
        try:
            # Mock data — in real implementation, scrape the URL
            if "mtn" in source["source_name"].lower():
                competitions.append({
                    "name": "MTN Cloud Accelerator",
                    "description": "MTN's cloud and AI startup program",
                    "eligibility_criteria": "AI/Cloud startups in Africa",
                    "deadline": "2026-12-31",
                    "award_value": "$50,000 + Cloud Credits",
                    "url": "https://mtncloudaccelerator.com",
                    "source": source["source_name"],
                    "relevance_score": 95
                })
            if "google" in source["source_name"].lower():
                competitions.append({
                    "name": "Google for Startups Accelerator",
                    "description": "Google's accelerator for African startups",
                    "eligibility_criteria": "AI/ML startups in Africa",
                    "deadline": "2026-11-30",
                    "award_value": "$40,000 + Google Cloud Credits",
                    "url": "https://startup.google.com",
                    "source": source["source_name"],
                    "relevance_score": 90
                })
            if "aws" in source["source_name"].lower():
                competitions.append({
                    "name": "AWS EdStart",
                    "description": "AWS education startup program",
                    "eligibility_criteria": "EdTech startups",
                    "deadline": "2026-10-31",
                    "award_value": "AWS Credits + Mentorship",
                    "url": "https://aws.amazon.com/edstart",
                    "source": source["source_name"],
                    "relevance_score": 85
                })
        except Exception as e:
            print(f"❌ Error scraping {source['source_name']}: {e}")

        # Update last_scraped timestamp
        supabase.table("competition_sources").update({
            "last_scraped": datetime.now().isoformat()
        }).eq("id", source["id"]).execute()

    # Insert competitions into the database
    inserted = 0
    for comp in competitions:
        existing = supabase.table("competitions").select("*").eq("name", comp["name"]).execute()
        if not existing.data:
            supabase.table("competitions").insert(comp).execute()
            inserted += 1
            print(f"✅ Inserted: {comp['name']}")
        else:
            print(f"⏭️ Skipped (already exists): {comp['name']}")

    print(f"✅ Discovered {len(competitions)} competitions, inserted {inserted} new")
    return competitions

if __name__ == "__main__":
    discover_competitions()
