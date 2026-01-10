"""
agent.py

This file orchestrates the AI reasoning flow for FitAgent.
It connects input data → prompt construction → AI response parsing.

At this stage, the AI response is mocked.
Real LLM integration will be added in a later step.
"""

from app.schemas import FitAgentInput, FitAgentOutput
from app.prompt import build_fitagent_prompt


def run_fitagent_analysis(payload: FitAgentInput) -> FitAgentOutput:
    """
    Orchestrates the FitAgent reasoning process.

    Steps:
    1. Build the AI prompt using input data
    2. (Future) Send prompt to LLM
    3. (Future) Parse LLM response
    4. Return structured output
    """

    # Step 1: Build prompt (for future LLM usage)
    _prompt = build_fitagent_prompt(
        skills=payload.skills,
        interests=payload.interests,
        job_description=payload.job_description,
    )

    # NOTE:
    # At this stage, we are NOT calling any LLM.
    # This is a mocked response to keep the pipeline intact.

    return FitAgentOutput(
        match_summary="AI analysis pending integration.",
        skill_gaps="AI analysis pending integration.",
        recommendation="AI analysis pending integration.",
        resume_text="AI-generated resume content will appear here.",
        confidence_score=0,
    )
