// 🔴 DEBUG: confirm script is loaded
console.log("script.js loaded");

// -----------------------------------
// Auto-resize textarea helper
// -----------------------------------
function autoResizeTextarea(el) {
  el.style.height = "0px";
  el.style.height = el.scrollHeight + 6 + "px";
}

// -----------------------------------
// DOM Ready
// -----------------------------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  // Auto-resize all textareas
  document.querySelectorAll("textarea").forEach((ta) => {
    autoResizeTextarea(ta);
    ta.addEventListener("input", () => autoResizeTextarea(ta));
    ta.addEventListener("paste", () =>
      setTimeout(() => autoResizeTextarea(ta), 0)
    );
    ta.addEventListener("change", () => autoResizeTextarea(ta));
  });

  // FitAgent v1 button
  const analyzeBtn = document.getElementById("analyzeBtn");
  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", analyzeFit);
  }

  // FitAgent v2 button
  const resumeBtn = document.getElementById("resumeAnalyzeBtn");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", analyzeResumeConfidence);
  }
});

// ===================================
// FitAgent v1 — Analyze Fit
// ===================================
async function analyzeFit() {
  console.log("FitAgent v1 analyze clicked");

  const skills = document.getElementById("skills")?.value.trim();
  const interests = document.getElementById("interests")?.value.trim();
  const jobDescription =
    document.getElementById("job_description")?.value.trim();

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
      headers: { "Content-Type": "application/json" },
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
    outputDiv.innerHTML = renderFitOutput(data);

  } catch (err) {
    console.error("FitAgent v1 error:", err);
    outputDiv.innerHTML =
      "<span style='color:#ff9a9a'>Error: Unable to analyze fit.</span>";
  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = "Analyze My Fit →";
  }
}

// -----------------------------------
// Render FitAgent v1 Output
// -----------------------------------
function renderFitOutput(data) {
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

// ===================================
// FitAgent v2 — Resume Confidence Booster
// ===================================
async function analyzeResumeConfidence() {
  console.log("FitAgent v2 resume analysis clicked");

  const fileInput = document.getElementById("resume_pdf");
  const jdText = document.getElementById("resume_jd")?.value.trim();
  const outputDiv = document.getElementById("resume_output");
  const btn = document.getElementById("resumeAnalyzeBtn");

  if (!fileInput.files.length || !jdText) {
    outputDiv.innerHTML =
      "<span style='color:#ff9a9a'>Please upload a resume PDF and add a job description.</span>";
    return;
  }

  const formData = new FormData();
  formData.append("resume_pdf", fileInput.files[0]);
  formData.append("job_description", jdText);

  btn.disabled = true;
  btn.textContent = "Analyzing...";
  outputDiv.innerHTML = "Running ATS-style resume analysis...";

  try {
    const response = await fetch("/analyze-resume", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    outputDiv.innerHTML = renderResumeOutput(data);

  } catch (err) {
    console.error("FitAgent v2 error:", err);
    outputDiv.innerHTML =
      "<span style='color:#ff9a9a'>Error: Unable to analyze resume.</span>";
  } finally {
    btn.disabled = false;
    btn.textContent = "Boost Resume Confidence →";
  }
}

// -----------------------------------
// Render FitAgent v2 Output (ATS-style)
// -----------------------------------
function renderResumeOutput(data) {
  let sectionsHtml = "";

  for (const [section, details] of Object.entries(data.section_analysis)) {
    sectionsHtml += `
      <div class="output-block">
        <div class="output-title">${section.toUpperCase()}</div>

        <div><strong>Issues:</strong>
          <ul>
            ${details.issues.map(i => `<li>${i}</li>`).join("")}
          </ul>
        </div>

        <div><strong>Why it matters:</strong> ${details.why_it_matters}</div>

        <div><strong>Suggestions:</strong>
          <ul>
            ${details.suggestions.map(s => `<li>${s}</li>`).join("")}
          </ul>
        </div>

        ${details.before_after_examples.map(ex => `
          <div style="margin-top:10px;">
            <strong>Before:</strong>
            <div>${ex.before}</div>
            <strong>After:</strong>
            <div>${ex.after}</div>
          </div>
        `).join("")}
      </div>
    `;
  }

  return `
    <div class="output-block confidence">
      Current Confidence Score: ${data.current_confidence_score}
    </div>

    <div class="output-block">
      <div class="output-title">Summary</div>
      <div>${data.confidence_summary}</div>
    </div>

    ${sectionsHtml}

    <div class="output-block">
      <div class="output-title">Improved Resume</div>
      <pre style="white-space:pre-wrap;line-height:1.7">${data.improved_resume_text}</pre>
    </div>

    <div class="output-block confidence">
      Improved Confidence Score: ${data.improved_confidence_score}
    </div>
  `;
}
