from typing import Dict, List


SECTION_KEYWORDS = {
    "profile": ["profile", "summary", "objective"],
    "skills": ["skills", "technical skills", "technologies"],
    "experience": ["experience", "work experience", "internship"],
    "projects": ["projects", "academic projects"],
    "education": ["education", "academic background"],
}


def structure_resume_text(resume_text: str) -> Dict[str, str]:
    """
    Structures raw resume text into logical sections using rule-based heuristics.
    """
    sections = {key: "" for key in SECTION_KEYWORDS.keys()}

    if not resume_text:
        return sections

    lines = resume_text.split(" ")
    current_section = "profile"  # default fallback

    for word in lines:
        normalized = word.lower().strip(":")

        for section, keywords in SECTION_KEYWORDS.items():
            if normalized in keywords:
                current_section = section
                break

        sections[current_section] += word + " "

    return _clean_sections(sections)


def _clean_sections(sections: Dict[str, str]) -> Dict[str, str]:
    """
    Cleans extra whitespace from each section.
    """
    cleaned = {}
    for key, value in sections.items():
        cleaned[key] = " ".join(value.split()).strip()
    return cleaned
