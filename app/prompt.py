"""
prompt.py

This file defines the prompt template and instructions used by FitAgent.
It is responsible for controlling AI behavior, reasoning scope, and output format.

There is NO AI API call in this file.
This file only returns a formatted prompt string.
"""


def build_fitagent_prompt(
    skills: str,
    interests: str,
    job_description: str,
) -> str:
    """
    Constructs the full prompt for the FitAgent AI reasoning step.

    The AI is instructed to:
    - Understand the student's profile
    - Understand the internship requirements
    - Compare skill overlap
    - Identify missing skills
    - Generate JD-aligned resume content
    - Assign a confidence score
    - Return output in a strict JSON format
    """

    return f"""
You are FitAgent, an AI assistant designed to evaluate how well a student's profile
matches a given internship role.

You must reason carefully, step-by-step internally, but ONLY return the final result
in the exact JSON format specified below.

========================
STUDENT PROFILE
========================
Skills:
{skills}

Interests:
{interests}

========================
INTERNSHIP DESCRIPTION
========================
{job_description}

========================
TASK INSTRUCTIONS
========================
1. Analyze the student's skills and interests.
2. Analyze the internship job description.
3. Identify overlapping skills and strengths.
4. Identify missing or weak skills required by the internship.
5. Generate a short, clear internship match summary.
6. Provide a concise explanation of skill gaps.
7. Provide a practical recommendation for the student.
8. Rewrite resume content aligned with the job description.
9. Assign a confidence score between 0 and 100 based on overall fit.

========================
OUTPUT RULES (VERY IMPORTANT)
========================
- You MUST return valid JSON only.
- Do NOT include explanations, markdown, or extra text.
- Do NOT change key names.
- Do NOT add or remove fields.
- Keep the language clear and professional.

========================
REQUIRED OUTPUT FORMAT
========================
{{
  "match_summary": "string",
  "skill_gaps": "string",
  "recommendation": "string",
  "resume_text": "string",
  "confidence_score": number
}}
"""
def build_resume_confidence_prompt(
    structured_resume: dict,
    job_description: str
) -> dict:
    """
    Builds system and user prompts for ATS-style resume confidence analysis.
    """

    system_prompt = """
You are an ATS-style Resume Confidence Analyzer.

Your task is to evaluate how well a resume matches a given job description.

Rules you MUST follow:
- You must ONLY return valid JSON.
- You must follow the exact JSON schema provided.
- Do NOT add or remove fields.
- Do NOT include explanations outside JSON.
- Do NOT use markdown.
- Do NOT hallucinate skills, experience, or education.
- Base all analysis strictly on the provided resume content and job description.
- Scores must be integers between 0 and 100.

Evaluation logic:
- Confidence score represents how well the resume would pass an ATS screening.
- Penalize vague language, missing keywords, weak impact statements, and poor alignment with the job description.
- Reward clarity, relevance, quantified impact, and direct keyword alignment.

For each resume section:
- Identify concrete issues.
- Explain why those issues reduce ATS confidence.
- Provide actionable improvement suggestions.
- Show exact before → after line rewrites based on the resume text.

Finally:
- Generate a fully improved resume text (content only, no formatting).
- Assign a new confidence score based on the improved resume.

Failure to follow these rules is considered an invalid response.
""".strip()

    user_prompt = f"""
You are given:

1) A structured resume divided into sections.
2) A job description.

Structured Resume:
{{
  "profile": "{structured_resume.get('profile', '')}",
  "skills": "{structured_resume.get('skills', '')}",
  "experience": "{structured_resume.get('experience', '')}",
  "projects": "{structured_resume.get('projects', '')}",
  "education": "{structured_resume.get('education', '')}"
}}

Job Description:
\"\"\"
{job_description}
\"\"\"

You MUST return your response strictly in the following JSON format and nothing else:

{{
  "current_confidence_score": 0,
  "confidence_summary": "",
  "section_analysis": {{
    "profile": {{
      "issues": [],
      "why_it_matters": "",
      "suggestions": [],
      "before_after_examples": [
        {{
          "before": "",
          "after": ""
        }}
      ]
    }},
    "skills": {{
      "issues": [],
      "why_it_matters": "",
      "suggestions": [],
      "before_after_examples": []
    }},
    "experience": {{
      "issues": [],
      "why_it_matters": "",
      "suggestions": [],
      "before_after_examples": []
    }},
    "projects": {{
      "issues": [],
      "why_it_matters": "",
      "suggestions": [],
      "before_after_examples": []
    }},
    "education": {{
      "issues": [],
      "why_it_matters": "",
      "suggestions": [],
      "before_after_examples": []
    }}
  }},
  "improved_resume_text": "",
  "improved_confidence_score": 0
}}

Important:
- Return ONLY valid JSON.
- Use the resume content exactly as provided for before/after examples.
- Do NOT invent experience or skills.
- If a section is already strong, explicitly state that.
""".strip()

    return {
        "system": system_prompt,
        "user": user_prompt
    }
