from app.agent import run_fitagent_analysis, run_resume_confidence_analysis

from app.resume_parser import extract_text_from_pdf
from app.resume_structurer import structure_resume_text
#from app.agent import run_resume_confidence_analysis

from fastapi import APIRouter, UploadFile, File, Form

from app.schemas import FitAgentInput, FitAgentOutput, ResumeConfidenceOutput
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


@router.post(
    "/analyze-resume",
    response_model=ResumeConfidenceOutput,
    summary="Analyze resume confidence",
    description="Analyzes resume PDF against job description and returns ATS confidence",
)
async def analyze_resume(
    resume_pdf: UploadFile = File(...),
    job_description: str = Form(...)
):
    """
    Analyze resume PDF against a job description and return ATS confidence.
    """

    # 1️⃣ Basic validation: file type
    if resume_pdf.content_type != "application/pdf":
        raise ValueError("Only PDF resumes are supported")

    # 2️⃣ Read PDF bytes (async-safe)
    pdf_bytes = await resume_pdf.read()

    if not pdf_bytes:
        raise ValueError("Uploaded PDF is empty")

        # 3️⃣ Extract text from PDF
    resume_text = extract_text_from_pdf(pdf_bytes)

    if not resume_text:
        raise ValueError("Could not extract text from the resume PDF")

    # 4️⃣ Structure resume into sections
    structured_resume = structure_resume_text(resume_text)

        # 5️⃣ Call AI resume confidence agent
    ai_result = run_resume_confidence_analysis(
        structured_resume=structured_resume,
        job_description=job_description
    )

    # 6️⃣ Return AI-generated ATS analysis
    return ai_result




