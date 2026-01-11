async function analyzeFit() {
    const skills = document.getElementById("skills").value.trim();
    const interests = document.getElementById("interests").value.trim();
    const jobDescription = document.getElementById("job_description").value.trim();

    const resultBox = document.getElementById("result");
    resultBox.textContent = "Analyzing...";

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                skills: skills,
                interests: interests,
                job_description: jobDescription
            })
        });

        if (!response.ok) {
            throw new Error("API error");
        }

        const data = await response.json();

        resultBox.textContent =
            "Match Summary:\n" + data.match_summary + "\n\n" +
            "Skill Gaps:\n" + data.skill_gaps + "\n\n" +
            "Recommendation:\n" + data.recommendation + "\n\n" +
            "Resume Text:\n" + data.resume_text + "\n\n" +
            "Confidence Score: " + data.confidence_score;

    } catch (error) {
        resultBox.textContent = "Error: Unable to analyze fit.";
    }
}
