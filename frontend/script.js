async function analyzeFit() {
    const skills = document.getElementById("skills").value.trim();
    const interests = document.getElementById("interests").value.trim();
    const jobDescription = document.getElementById("job_description").value.trim();

    const outputDiv = document.getElementById("output");
    const analyzeBtn = document.getElementById("analyzeBtn");

    if (!skills || !interests || !jobDescription) {
        outputDiv.innerHTML = "<span style='color:#ff9a9a'>Please fill in all fields.</span>";
        return;
    }

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "Analyzing...";
    outputDiv.innerHTML = "Running AI analysis...";

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
            throw new Error("API request failed");
        }

        const data = await response.json();

        outputDiv.innerHTML = renderOutput(data);

    } catch (error) {
        outputDiv.innerHTML =
            "<span style='color:#ff9a9a'>Error: Unable to analyze fit. Please try again.</span>";
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = "Analyze Fit";
    }
}

function renderOutput(data) {
    return `
        <div class="output-block">
            <div class="output-title">Match Summary</div>
            <div>${data.match_summary}</div>
        </div>

        <div class="output-block">
            <div class="output-title">Skill Gaps</div>
            <div>${data.skill_gaps}</div>
        </div>

        <div class="output-block">
            <div class="output-title">Recommendation</div>
            <div>${data.recommendation}</div>
        </div>

        <div class="output-block">
            <div class="output-title">JD-Aligned Resume</div>
            <div>${data.resume_text}</div>
        </div>

        <div class="output-block confidence">
            Confidence Score: ${data.confidence_score}
        </div>
    `;
}

// Attach button handler safely
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("analyzeBtn");
    if (btn) {
        btn.addEventListener("click", analyzeFit);
    }
});
