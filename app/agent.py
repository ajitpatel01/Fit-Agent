import json
import re
from groq import Groq

from app.config import settings
from app.schemas import FitAgentInput, FitAgentOutput
from app.prompt import build_fitagent_prompt

from app.schemas import ResumeConfidenceOutput
from app.prompt import build_resume_confidence_prompt



def extract_json(text: str) -> dict:
    """
    Safely extract the first JSON object from LLM output.
    Works even if the model adds explanation text.
    """
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise ValueError("No JSON object found in LLM response")
    return json.loads(match.group())


def run_fitagent_analysis(payload: FitAgentInput) -> FitAgentOutput:
    """
    Runs AI-powered analysis using Groq with robust JSON handling.
    """

    if not settings.GROQ_API_KEY:
        raise RuntimeError("GROQ_API_KEY is not set in environment variables")

    client = Groq(api_key=settings.GROQ_API_KEY)

    prompt = build_fitagent_prompt(
        skills=payload.skills,
        interests=payload.interests,
        job_description=payload.job_description,
    )

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.3,
    )

    raw_output = response.choices[0].message.content

    parsed_output = extract_json(raw_output)

    return FitAgentOutput(**parsed_output)


def run_resume_confidence_analysis(
    structured_resume: dict,
    job_description: str
) -> ResumeConfidenceOutput:
    """
    Runs ATS-style resume confidence analysis using Groq.
    """

    if not settings.GROQ_API_KEY:
        raise RuntimeError("GROQ_API_KEY is not set in environment variables")

    client = Groq(api_key=settings.GROQ_API_KEY)

    prompt = build_resume_confidence_prompt(
        structured_resume=structured_resume,
        job_description=job_description,
    )

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": prompt["system"]},
            {"role": "user", "content": prompt["user"]},
        ],
        temperature=0.2,
    )

    raw_output = response.choices[0].message.content

    parsed_output = extract_json(raw_output)

    return ResumeConfidenceOutput(**parsed_output)
