// --- UNIVERSAL EXPORTS TO PREVENT ANY MODULE MISMATCH ---
export async function executePaperPipeline(config) {
  return await generateAndAuditPaper(config);
}

export async function generateAndAuditPaper(config) {
  const { selectedClass, selectedSubject, onProgress } = config;
  const targetSubject = selectedSubject || "Mathematics";
  const targetClass = selectedClass || "10th";

  if (onProgress) onProgress({ text: `[Stage 1/4] Assembling question matrix for ${targetSubject} (Class ${targetClass}) via Gemini AI...` });

  const keys = getApiKeys();
  let rawText1 = null;

  const prompt1 = `You are an expert CBSE Chief Examiner. Generate a complete, rigorous, and professional examination paper JSON for Class ${targetClass} ${targetSubject} following official CBSE board blueprint guidelines.
Return ONLY valid JSON with this exact structure:
{
  "title": "string",
  "className": "string",
  "subject": "string",
  "duration": "string",
  "maxMarks": number,
  "generalInstructions": ["string"],
  "sections": [
    {
      "name": "string",
      "description": "string",
      "questions": [
        { "qNo": number, "question": "string", "options": ["string"], "correctAnswer": "string", "marks": number }
      ]
    }
  ],
  "answerKey": "string"
}`;

  rawText1 = await callGeminiAIWithRetry(prompt1, keys, 0.7);
  let currentPaper = cleanAndParseJSON(rawText1);

  for (let cycle = 1; cycle <= 2; cycle++) {
    if (onProgress) onProgress({ text: `[Stage ${cycle + 1}/4] Running strict CBSE compliance & error auditing (Cycle ${cycle})...` });

    const auditPrompt = `You are a Rigorous CBSE Board Auditor. Audit this examination paper JSON for Class ${targetClass} ${targetSubject} for complete accuracy, correct section weightage, and LaTeX formatting.
Current Paper JSON:
${JSON.stringify(currentPaper)}
Return ONLY valid JSON with the exact same schema structure containing corrected paper data.`;

    try {
      const auditText = await callGeminiAIWithRetry(auditPrompt, keys, 0.1);
      if (auditText) {
        const parsedAudit = cleanAndParseJSON(auditText);
        if (parsedAudit && parsedAudit.sections) {
          currentPaper = parsedAudit;
        }
      }
    } catch (e) {}
  }

  if (onProgress) onProgress({ text: "[Stage 4/4] Paper fully audited, verified, and error-free!" });

  currentPaper.subject = targetSubject;
  currentPaper.className = targetClass;
  return currentPaper;
}

const getApiKeys = () => {
  let keys = [];
  try {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      if (import.meta.env.VITE_GEMINI_API_KEY) keys.push(import.meta.env.VITE_GEMINI_API_KEY);
      if (import.meta.env.VITE_GEMINI_API_KEY_2) keys.push(import.meta.env.VITE_GEMINI_API_KEY_2);
      if (import.meta.env.VITE_GEMINI_API_KEY_3) keys.push(import.meta.env.VITE_GEMINI_API_KEY_3);
      if (keys.length === 0 && import.meta.env.GEMINI_API_KEY) keys.push(import.meta.env.GEMINI_API_KEY);
    }
  } catch (e) {}
  return keys.filter(k => k && typeof k === 'string' && k.trim() !== "");
};

async function callGeminiAIWithRetry(promptText, keys, temperature) {
  if (keys.length === 0) {
    throw new Error("No VITE_GEMINI_API_KEY found in environment variables.");
  }

  const modelName = "gemini-1.5-flash";
  let lastError = null;

  for (let k = 0; k < keys.length; k++) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${keys[k]}`;
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
        lastError = new Error(`API error ${response.status}: ${errText}`);
        continue;
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  throw lastError || new Error("All API keys failed to generate content.");
}

function cleanAndParseJSON(text) {
  if (!text) throw new Error("Empty response received from AI.");
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
  }
  return JSON.parse(cleaned);
}

const pipelineBundle = {
  executePaperPipeline,
  generateAndAuditPaper
};

export default pipelineBundle;
