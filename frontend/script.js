async function analyzeFit() {
    const skills = document.getElementById("skills").value;
    const interests = document.getElementById("interests").value;
    const jobDescription = document.getElementById("job_description").value;

    const resultBox = document.getElementById("result");
    resultBox.textContent = "Analyzing...";

    try {
        const response = await fetch("http://127.0.0.1:8000/analyze", {
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
