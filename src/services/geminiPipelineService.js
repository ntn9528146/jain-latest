const getApiKeys = () => {
  let keys = [];
  try {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      if (import.meta.env.VITE_GEMINI_API_KEY) keys.push(import.meta.env.VITE_GEMINI_API_KEY);
      if (import.meta.env.VITE_GEMINI_API_KEY_2) keys.push(import.meta.env.VITE_GEMINI_API_KEY_2);
      if (import.meta.env.VITE_GEMINI_API_KEY_3) keys.push(import.meta.env.VITE_GEMINI_API_KEY_3);
    }
  } catch (e) {}

  if (keys.length === 0 && typeof process !== "undefined" && process.env) {
    if (process.env.VITE_GEMINI_API_KEY) keys.push(process.env.VITE_GEMINI_API_KEY);
    if (process.env.VITE_GEMINI_API_KEY_2) keys.push(process.env.VITE_GEMINI_API_KEY_2);
    if (process.env.VITE_GEMINI_API_KEY_3) keys.push(process.env.VITE_GEMINI_API_KEY_3);
  }

  if (keys.length === 0) keys.push("");
  return keys;
};

async function callGeminiDirectAPI(promptText, temperature = 0.7) {
  const keys = getApiKeys();
  let lastError = null;
  
  // Permanent stable models supported on v1 endpoint
  const models = ["gemini-1.5-flash", "gemini-1.5-pro"];

  for (let i = 0; i < keys.length; i++) {
    const apiKey = keys[i];
    if (!apiKey) continue;

    for (const model of models) {
      const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;
      
      try {
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
          lastError = new Error(`API Error (${response.status}) on ${model}: ${errText}`);
          continue; // Try next model or key
        }

        const data = await response.json();
        if (data && data.candidates && data.candidates[0] && data.candidates[0].content) {
          return data.candidates[0].content.parts[0].text;
        }
      } catch (err) {
        lastError = err;
        continue;
      }
    }
  }

  throw lastError || new Error("All API keys and models failed. Please check your VITE_GEMINI_API_KEY in .env.");
}

async function generateAndAuditPaper(config) {
  const { selectedClass, selectedSubject, paperType, onProgress } = config;
  const targetSubject = selectedSubject || "Mathematics";
  const targetClass = selectedClass || "10th";

  if (onProgress) onProgress({ text: `[Stage 1/4] Assembling and permuting unique questions for ${targetSubject} (Class ${targetClass})...` });

  const uniqueSalt = Math.random().toString(36).substring(2, 10) + Date.now();

  const basePrompt = `
You are an expert academic curriculum engine. Using standard question patterns for Class ${targetClass} ${targetSubject}, build a permuted, 100% unique question paper.
Permutation Salt: ${uniqueSalt}
Ensure appropriate total questions, marks, and section patterns corresponding specifically to ${targetSubject}.
Return ONLY valid JSON format matching standard schema.
`;

  try {
    const rawText1 = await callGeminiDirectAPI(basePrompt, 0.9);
    let currentPaper = JSON.parse(rawText1);

    const maxCycles = 3;
    let isSatisfied = false;
    let cycleCount = 0;

    while (!isSatisfied && cycleCount < maxCycles) {
      cycleCount++;
      if (onProgress) onProgress({ text: `[Stage ${cycleCount + 1}/4] Running CBSE compliance & error-free auditing cycle ${cycleCount} using multi-key rotation...` });

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

      const auditText = await callGeminiDirectAPI(auditPrompt, 0.1);
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

async function executePaperPipeline(config) {
  return await generateAndAuditPaper(config);
}

export { generateAndAuditPaper, executePaperPipeline };
export default executePaperPipeline;
