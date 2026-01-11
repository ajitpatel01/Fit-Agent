from fastapi import APIRouter

from app.schemas import FitAgentInput, FitAgentOutput
from app.agent import run_fitagent_analysis

router = APIRouter()


@router.post(
    "/analyze",
    response_model=FitAgentOutput,
    summary="Analyze internship fit",
    description="Analyzes student profile against internship description",
)
def analyze_fit(payload: FitAgentInput) -> FitAgentOutput:
    """
    API endpoint that triggers FitAgent analysis.
    """

    result = run_fitagent_analysis(payload)
    return result
