const getApiKey = () => {
  try {
    if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
      return import.meta.env.VITE_GEMINI_API_KEY;
    }
  } catch (e) {}
  
  if (typeof process !== "undefined" && process.env && process.env.VITE_GEMINI_API_KEY) {
    return process.env.VITE_GEMINI_API_KEY;
  }
  return "";
};

async function callGeminiAPI(promptText, apiKey, temperature = 0.7) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: { temperature, responseMimeType: "application/json" }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

export async function generateAndAuditPaper(config) {
  const { selectedClass, selectedSubject, paperType, onProgress } = config;
  const targetSubject = selectedSubject || "Mathematics";
  const targetClass = selectedClass || "10th";

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please ensure VITE_GEMINI_API_KEY is present in your environment.");
  }

  if (onProgress) onProgress({ text: `[Stage 1/4] Assembling and permuting unique questions for ${targetSubject} (Class ${targetClass})...` });

  const uniqueSalt = Math.random().toString(36).substring(2, 10) + Date.now();

  const basePrompt = `
You are an expert academic curriculum engine. Using standard question patterns for Class ${targetClass} ${targetSubject}, build a permuted, 100% unique question paper.
Permutation Salt: ${uniqueSalt}
Ensure appropriate total questions, marks, and section patterns corresponding specifically to ${targetSubject}.
Return ONLY valid JSON format matching standard schema.
`;

  try {
    const rawText1 = await callGeminiAPI(basePrompt, apiKey, 0.9);
    let currentPaper = JSON.parse(rawText1);

    const maxCycles = 3;
    let isSatisfied = false;
    let cycleCount = 0;

    while (!isSatisfied && cycleCount < maxCycles) {
      cycleCount++;
      if (onProgress) onProgress({ text: `[Stage ${cycleCount + 1}/4] Running CBSE compliance & error-free auditing cycle ${cycleCount}...` });

      const auditPrompt = `
You are a Rigorous CBSE Board Chief Auditor and Master Validator. 
Audit the following generated examination paper JSON for Class ${targetClass} ${targetSubject}. 

CHECK & FIX THE FOLLOWING STRICTLY:
1. CBSE GUIDELINES & FORMAT: Verify that sections, total number of questions, total marks, and question types precisely match the official CBSE pattern for ${targetSubject}.
2. ERROR PURGING: Remove any mathematical syntax errors (e.g., broken square roots, incorrect superscripts/subscripts like a3b3 instead of a^3b^3), missing options in MCQs, or leaked answer hints in subjective questions.
3. UNIQUENESS & ACCURACY: Ensure every question is linguistically and numerically sound, professional, and error-free.

Here is the current paper JSON to inspect and correct:
${JSON.stringify(currentPaper)}

Return ONLY a JSON object with two fields:
{
  "satisfied": true/false (set to true ONLY when the paper is 100% error-free and compliant),
  "paper": { ...corrected paper object matching standard schema... }
}
`;

      const auditText = await callGeminiAPI(auditPrompt, apiKey, 0.1);
      const auditResult = JSON.parse(auditText);
      
      if (auditResult && auditResult.paper) {
        currentPaper = auditResult.paper;
      }

      if (auditResult && auditResult.satisfied === true) {
        isSatisfied = true;
      }
    }

    if (onProgress) onProgress({ text: "[Stage 4/4] Paper fully audited, verified, and error-free!" });

    currentPaper.subject = targetSubject;
    currentPaper.className = targetClass;
    return currentPaper;

  } catch (err) {
    console.error("Multi-stage auditor error:", err);
    throw new Error("Failed during multi-stage paper auditing: " + err.message);
  }
}

// Export both names to prevent any module import mismatch
export async function executePaperPipeline(config) {
  return await generateAndAuditPaper(config);
}
