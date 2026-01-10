# FitAgent – AI Internship Fit & Resume Analyzer

FitAgent is a lightweight AI-powered web application that evaluates how well a student’s profile aligns with a given internship role.  
It uses prompt-driven Large Language Model (LLM) reasoning to generate explainable insights such as skill alignment, gaps, recommendations, and JD-aligned resume content.

The project is intentionally minimal and focused, designed to demonstrate **AI reasoning, prompt engineering, and backend–frontend integration** without model training or complex ML pipelines.

---

## Project Overview

FitAgent works as a **single AI reasoning agent** wrapped inside a simple web interface.

### User Inputs
- Student skills (text)
- Student interests (text)
- Internship job description (text)

### AI Outputs
- Internship match summary
- Skill gap explanation
- Personalized recommendation
- Resume content aligned with the job description
- Confidence / ATS-style score

All outputs are generated in **one controlled AI call**, keeping the system predictable and explainable.

---

## What the Project Does

- Understands student background from free-text input  
- Analyzes internship requirements from the job description  
- Compares skill overlap and identifies missing areas  
- Generates human-readable recommendations  
- Rewrites resume content aligned with the internship role  
- Produces a simple numeric confidence score  

This showcases how **LLMs can be used as reasoning engines** in real-world product features.

---

## High-Level System Design

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

yaml
Copy code

The architecture is intentionally simple to keep the focus on **AI reasoning and prompt control**.

---

## Project Structure

fitagent/
│
├── app/
│ ├── main.py # Application entry point
│ ├── routes.py # Single API endpoint
│ ├── schemas.py # Input and output data models
│ ├── prompt.py # Prompt design and instructions
│ ├── agent.py # AI reasoning orchestration
│ └── config.py # Environment and API key handling
│
├── frontend/
│ ├── index.html # Single-page UI
│ ├── styles.css # Minimal styling
│ └── script.js # Form submission and API calls
│
├── tests/
│ └── sample_input.json # Example input for testing
│
├── .env
├── .gitignore
├── requirements.txt
├── README.md
└── run.md

yaml
Copy code

---

## Key Design Highlights

- Single AI agent design  
- Prompt-centric reasoning approach  
- No model training or data pipelines  
- Clean backend–frontend integration  
- Explainable, human-readable AI output  
- Minimal and focused implementation  

---

## Tech Stack

- **Backend:** Python, FastAPI  
- **Frontend:** HTML, CSS, JavaScript  
- **AI:** Large Language Model (prompt-based reasoning)

---

## Why This Project Is Relevant

FitAgent reflects how AI features are prototyped in real-world product teams:

- Clear problem definition  
- Controlled and structured use of LLMs  
- Emphasis on explainability and reasoning  
- Simple, maintainable system design  

It demonstrates **practical AI engineering**, not over-engineered solutions.

---

## Running the Project

Instructions to run the project locally are provided in `run.md`.