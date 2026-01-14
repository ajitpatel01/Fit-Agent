from pypdf import PdfReader
from typing import Optional
from io import BytesIO


class ResumeParsingError(Exception):
    """Raised when resume PDF parsing fails."""
    pass


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extracts raw text from a resume PDF.

    Args:
        file_bytes (bytes): Raw bytes of the uploaded PDF file.

    Returns:
        str: Cleaned plain text extracted from the PDF.

    Raises:
        ResumeParsingError: If the PDF cannot be read or parsed.
    """
    try:
        pdf_stream = BytesIO(file_bytes)
        reader = PdfReader(pdf_stream)
    except Exception as e:
        raise ResumeParsingError(f"Invalid or corrupted PDF file: {str(e)}")

    extracted_text = []

    for page in reader.pages:
        try:
            page_text = page.extract_text()
            if page_text:
                extracted_text.append(page_text)
        except Exception:
            continue  # skip unreadable pages safely

    raw_text = "\n".join(extracted_text)
    cleaned_text = _clean_text(raw_text)

    return cleaned_text


def _clean_text(text: str) -> str:
    """Light cleanup of extracted resume text."""
    if not text:
        return ""

    text = text.replace("\t", " ")
    text = " ".join(text.split())

    return text.strip()
