// 🔴 DEBUG: confirm script is loaded
console.log("script.js loaded");

// -----------------------------------
// Auto-resize textarea helper (FINAL)
// -----------------------------------

function autoResizeTextarea(el) {
  // Hard reset to force recalculation
  el.style.height = "0px";

  // Set height based on content + buffer
  el.style.height = el.scrollHeight + 6 + "px";
}

// Attach auto-resize to all textareas
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("textarea").forEach((ta) => {
    // Resize on load (for pre-filled text)
    autoResizeTextarea(ta);

    // Resize while typing
    ta.addEventListener("input", () => autoResizeTextarea(ta));

    // Resize on paste (important for long JDs)
    ta.addEventListener("paste", () => {
      setTimeout(() => autoResizeTextarea(ta), 0);
    });

    // Resize on programmatic value changes
    ta.addEventListener("change", () => autoResizeTextarea(ta));
  });
});


// -----------------------------------
// Main Analyze Function
// -----------------------------------
async function analyzeFit() {
  console.log("Analyze button clicked");

  const skillsEl = document.getElementById("skills");
  const interestsEl = document.getElementById("interests");
  const jdEl = document.getElementById("job_description");

  const outputDiv = document.getElementById("output");
  const analyzeBtn = document.getElementById("analyzeBtn");

  const skills = skillsEl?.value.trim();
  const interests = interestsEl?.value.trim();
  const jobDescription = jdEl?.value.trim();

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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skills,
        interests,
        job_description: jobDescription,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
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

// -----------------------------------
// Render AI Output
// -----------------------------------
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

// -----------------------------------
// DOM Ready
// -----------------------------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  // Attach button handler
  const btn = document.getElementById("analyzeBtn");
  if (btn) {
    btn.addEventListener("click", analyzeFit);
  }

  // Enable auto-growing textareas
  document.querySelectorAll("textarea").forEach((t) => {
    autoResize(t);
    t.addEventListener("input", () => autoResize(t));
  });
});
