# FitAgent – AI Internship Fit & Resume Confidence Booster (ATS-Style)

FitAgent is a minimal AI-powered web application that evaluates how well a student’s profile and resume align with a given internship or job role.

It uses **prompt-driven Large Language Model (LLM) reasoning** to:

- Compare a student’s skills and interests against an internship job description (**FitAgent v1**)
- Analyze a full resume PDF against a job description and provide ATS-style confidence boosting (**FitAgent v2**)

The project is intentionally simple and focused to demonstrate **AI reasoning, prompt engineering, and end-to-end integration**, without model training or complex system design.

---

## Assignment Objective

This project fulfills the assignment requirement to build a basic AI agent or script that:

- Takes a student profile (skills and interests)
- Takes an internship description
- Produces:
  - Internship match summary
  - Skill gap explanation
  - Simple recommendation text
  - A new resume aligned with the job description
  - Confidence / ATS-style score

FitAgent implements this as a **backend API with a minimal web interface**, using controlled AI reasoning steps.

---

## How FitAgent Works

FitAgent operates as two clean AI reasoning flows:

---

### ✅ FitAgent v1 — Internship Fit Analyzer

### Inputs
- Student skills (free-text)
- Student interests (free-text)
- Internship job description (free-text)

### Outputs
- Internship match summary
- Skill gap analysis
- Actionable recommendation
- JD-aligned resume content
- Numeric confidence / ATS score

All outputs are generated in **one controlled LLM call**, ensuring predictable and explainable results.

---

### ✅ FitAgent v2 — Resume Confidence Booster (ATS-Style)

FitAgent v2 upgrades the system into a resume-level ATS evaluator.

### Inputs
- Resume PDF upload
- Job description text

### Outputs
- Current ATS confidence score
- Section-wise weaknesses (Profile, Skills, Experience, Projects, Education)
- Exact reasons confidence is low
- Before → After line-level improvements
- Fully improved resume text
- Improved confidence score

This mimics how real ATS resume scoring tools work.

---

## AI Reasoning Approach

- A carefully designed prompt instructs the AI to:
  - Understand the student profile or resume sections
  - Understand internship/job requirements
  - Compare skill overlap and missing keywords
  - Identify weak resume sections
  - Suggest improvements with examples
  - Rewrite resume content aligned with the job description
  - Assign ATS-style confidence scores

- The AI response is constrained to a **strict JSON format**
- Robust JSON extraction ensures schema-safe outputs even if the model adds extra text
- Pydantic validation ensures predictable frontend-safe responses

This demonstrates **prompt design, reasoning control, and safe AI integration**.

---

## High-Level System Flow

### FitAgent v1 Flow

```text
Typed Skills + Interests + Job Description
        ↓
Prompt Construction
        ↓
LLM Reasoning (Groq)
        ↓
Structured JSON Response
        ↓
Frontend Output Rendering

```

## FitAgent v2 Flow
```
Resume PDF + Job Description
        ↓
PDF Text Extraction (pypdf)
        ↓
Resume Section Structuring (rule-based)
        ↓
Prompt-Driven ATS Reasoning
        ↓
Weakness Detection + Suggestions
        ↓
Improved Resume Reconstruction
        ↓
Old Score → New Score
```

## Project Structure
```
fitagent/
│
├── app/
│   ├── main.py                  # FastAPI app entry point
│   ├── routes.py                # /analyze and /analyze-resume endpoints
│   ├── schemas.py               # Request/response models (v1 + v2)
│   ├── prompt.py                # Prompt templates for both flows
│   ├── agent.py                 # AI reasoning orchestration
│   ├── resume_parser.py         # PDF resume extraction module (v2)
│   ├── resume_structurer.py     # Resume section structuring logic (v2)
│   └── config.py                # Environment & API keys
│
├── frontend/
│   └── index.html               # Main UI (v1 + v2)
│
├── static/
│   ├── styles.css               # Glassmorphism UI theme
│   └── script.js                # Frontend logic for both endpoints
│
├── requirements.txt
├── README.md
└── run.md



```

---

## Tech Stack

- **Backend:** Python, FastAPI  
- **Frontend:** HTML, CSS, JavaScript  
- **AI:** Groq LLM (LLaMA 3.1 family), Prompt-based reasoning (no training, no pipelines)

---

## Why This Project Is Relevant

FitAgent reflects how AI features are prototyped in real-world product teams:

Clear problem definition

Controlled and structured use of LLMs

Emphasis on explainability and reasoning

ATS-style resume confidence scoring behavior

Modular backend architecture (parser + structurer + agent separation)

Simple, maintainable system design

It demonstrates practical AI engineering, not over-engineered solutions.

---

## Running the Project

Instructions to run the project locally are provided in `run.md`.

Quick start: 
pip install -r requirements.txt
uvicorn app.main:app --reload


Live Demo: https://fit-agent.onrender.com
