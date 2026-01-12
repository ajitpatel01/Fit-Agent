async function analyzeFit() {
    const skills = document.getElementById("skills").value.trim();
    const interests = document.getElementById("interests").value.trim();
    const jobDescription = document.getElementById("job_description").value.trim();

    const outputDiv = document.getElementById("output");
    const analyzeBtn = document.getElementById("analyzeBtn");

    /* =========================
       VALIDATION
       ========================= */

    if (!skills || !interests || !jobDescription) {
        outputDiv.innerHTML = `
            <div class="output-block" style="color:#f87171;">
                Please fill in all fields before analyzing.
            </div>
        `;
        return;
    }

    /* =========================
       LOADING STATE
       ========================= */

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "Analyzing...";
    outputDiv.innerHTML = `
        <div class="output-block" style="color:#9ca3af;">
            Running AI analysis…
        </div>
    `;

    try {
        // ✅ SAME-ORIGIN REQUEST (FIXED)
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

        const text = await response.text();

        if (!response.ok) {
            console.error("API Error:", text);
            throw new Error(text);
        }

        const data = JSON.parse(text);
        outputDiv.innerHTML = renderOutput(data);

    } catch (error) {
        console.error("Frontend Error:", error);
        outputDiv.innerHTML = `
            <div class="output-block" style="color:#f87171;">
                Error: Unable to analyze fit. Please try again.
            </div>
        `;
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = "Analyze Fit";
    }
}

/* =========================
   OUTPUT RENDERING
   ========================= */

function renderOutput(data) {
    const confidence = parseFloat(data.confidence_score) || 0;
    const confidencePercent = Math.min(Math.max(confidence, 0), 100);

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

        <div class="output-block">
            <div class="output-title">Confidence Score</div>
            <div class="confidence">${confidencePercent}%</div>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width:${confidencePercent}%"></div>
            </div>
        </div>
    `;
}

/* =========================
   SINGLE EVENT BINDING
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("analyzeBtn");
    if (btn) {
        btn.addEventListener("click", analyzeFit);
    }
});
