FitAgent – AI Internship Fit & Resume Analyzer
Project Overview

FitAgent is a lightweight AI-powered web application that acts as a single AI reasoning agent wrapped inside a simple web interface.

The user provides:

Student skills (text)

Student interests (text)

Internship job description (text)

Based on this input, the system performs a one-step AI analysis and generates:

An internship match summary

Skill gap explanation

Personalized recommendation

Resume content aligned with the job description

A confidence / ATS-style score

The entire analysis is handled in one controlled AI call, without any model training or machine learning pipelines.

What the Project Does

Understands student background from free-text input

Analyzes internship requirements from a job description

Compares skill overlap and missing areas

Generates explainable recommendations

Rewrites resume content aligned to the internship role

Produces a simple numeric confidence score

This demonstrates how LLMs can be used as reasoning engines in real product features.

High-Level System Design
Frontend (HTML + JavaScript)
        ↓
FastAPI Backend
        ↓
Prompt Construction
        ↓
LLM Reasoning
        ↓
Structured Response
        ↓
Frontend Output Rendering


The system is intentionally simple to keep the focus on AI reasoning and prompt control.

Project Structure
fitagent/
│
├── app/
│   ├── main.py        # Application entry point
│   ├── routes.py      # Single API endpoint
│   ├── schemas.py     # Input and output data models
│   ├── prompt.py      # Prompt design and instructions
│   ├── agent.py       # AI reasoning orchestration
│   └── config.py      # Environment and API key handling
│
├── frontend/
│   ├── index.html     # Single-page UI
│   ├── styles.css     # Minimal styling
│   └── script.js      # Form submission and API calls
│
├── tests/
│   └── sample_input.json   # Example input for testing
│
├── .env
├── .gitignore
├── requirements.txt
├── README.md
└── run.md

Key Design Highlights

Single AI agent design

Prompt-centric reasoning approach

No model training or data pipelines

Clean backend–frontend integration

Explainable, human-readable AI output

Minimal and focused implementation

Tech Stack

Backend: Python, FastAPI

Frontend: HTML, CSS, JavaScript

AI: Large Language Model (prompt-based reasoning)

Why This Project Is Relevant

FitAgent reflects how AI features are prototyped in real-world product teams:

Clear problem definition

Controlled use of LLMs

Emphasis on reasoning and explainability

Simple, maintainable system design
