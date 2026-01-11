# FitAgent – AI Internship Fit & Resume Analyzer

FitAgent is a minimal AI-powered web application that evaluates how well a student’s profile aligns with a given internship role.

It uses **prompt-driven Large Language Model (LLM) reasoning** to compare a student’s skills and interests against an internship job description and generates clear, explainable outputs such as match analysis, skill gaps, recommendations, and a JD-aligned resume.

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

FitAgent implements this as a **backend API with a minimal web interface**, using a single AI reasoning step.

---

## How FitAgent Works

FitAgent operates as a **single AI reasoning agent**:

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

## AI Reasoning Approach

- A carefully designed prompt instructs the AI to:
  - Understand the student profile
  - Understand internship requirements
  - Compare skill overlap
  - Identify missing skills
  - Rewrite resume content aligned with the job description
  - Assign a confidence score
- The AI response is constrained to a **strict JSON format**
- Robust JSON extraction ensures schema-safe outputs even if the model adds extra text

This demonstrates **prompt design, reasoning control, and safe AI integration**.

---

## High-Level System Flow

```text
User Input (Web Form)
        ↓
Frontend (HTML + JavaScript)
        ↓
FastAPI Backend
        ↓
Prompt Construction
        ↓
LLM Reasoning (Groq)
        ↓
Structured JSON Response
        ↓
Frontend Output Rendering
```
## Project Structure
```
fitagent/
│
├── app/
│   ├── main.py        # FastAPI app entry point
│   ├── routes.py      # /analyze API endpoint
│   ├── schemas.py     # Input/output data models
│   ├── prompt.py      # Prompt design and instructions
│   ├── agent.py       # AI reasoning orchestration
│   └── config.py      # Environment & API key handling
│
├── frontend/
│   ├── index.html     # Single-page UI
│   ├── styles.css     # Minimal styling
│   └── script.js      # API calls and output rendering
│
├── tests/
│   └── sample_input.json
│
├── .gitignore
├── requirements.txt
├── README.md
└── run.md

```
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
- **AI:** Large Language Model, Groq LLM (LLaMA 3.1 family), Prompt-based reasoning (no training, no pipelines)

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
