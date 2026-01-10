from fastapi import APIRouter

from app.schemas import FitAgentInput, FitAgentOutput

router = APIRouter()


@router.post(
    "/analyze",
    response_model=FitAgentOutput,
    summary="Analyze internship fit",
    description="Performs a dummy analysis of student profile against internship description",
)
def analyze_fit(payload: FitAgentInput) -> FitAgentOutput:
    """
    Temporary placeholder endpoint.
    This will be replaced with AI-powered logic in later steps.
    """

    return FitAgentOutput(
        match_summary="This is a placeholder match summary.",
        skill_gaps="This is a placeholder skill gap analysis.",
        recommendation="This is a placeholder recommendation.",
        resume_text="This is placeholder resume content aligned to the job description.",
        confidence_score=75,
    )
