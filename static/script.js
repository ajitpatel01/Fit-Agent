// 🔴 STEP 3 DEBUG LINE (DO NOT REMOVE YET)
console.log("script.js loaded");

async function analyzeFit() {
  console.log("Analyze button clicked"); // 👈 debug

  const skills = document.getElementById("skills")?.value.trim();
  const interests = document.getElementById("interests")?.value.trim();
  const jobDescription = document.getElementById("job_description")?.value.trim();

  const outputDiv = document.getElementById("output");
  const analyzeBtn = document.getElementById("analyzeBtn");

  if (!skills || !interests || !jobDescription) {
    outputDiv.innerHTML =
      "<span style='color:#ff9a9a'>Please fill in all fields.</span>";
    return;
  }

  analyzeBtn.disabled = true;
  analyzeBtn.textContent = "Analyzing...";
  outputDiv.innerHTML = "Running AI analysis...";

  try {
    const response = await fetch("/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        skills,
        interests,
        job_description: jobDescription
      })
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    outputDiv.innerHTML = renderOutput(data);

  } catch (err) {
    console.error("Frontend fetch error:", err);
    outputDiv.innerHTML =
      "<span style='color:#ff9a9a'>Error: Unable to analyze fit. Please try again.</span>";
  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = "Analyze My Fit →";
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

// Attach handler AFTER DOM loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded"); // 👈 debug
  const btn = document.getElementById("analyzeBtn");
  if (btn) {
    btn.addEventListener("click", analyzeFit);
  }
});
