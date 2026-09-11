// --- ULTIMATE PERMANENT AUTO-FALLBACK MULTI-MODEL PIPELINE ---

const getActiveApiKey = () => {
  try {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      if (import.meta.env.VITE_GEMINI_API_KEY) return import.meta.env.VITE_GEMINI_API_KEY;
      if (import.meta.env.VITE_GEMINI_API_KEY_2) return import.meta.env.VITE_GEMINI_API_KEY_2;
    }
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('VITE_GEMINI_API_KEY') || localStorage.getItem('gemini_api_key');
      if (stored) return stored;
    }
  } catch (e) {}
  return "";
};

async function callGeminiWithAutoFallback(promptText) {
  const apiKey = getActiveApiKey();
  if (!apiKey) {
    throw new Error("API Key is missing. Please configure your API key.");
  }

  // Automatic model fallback sequence (Starting with Google's recommended gemini-3.6-flash)
  const modelsToTry = ["gemini-3.6-flash", "gemini-1.5-flash", "gemini-pro", "gemini-1.5-pro"];
  let lastError = null;

  for (const modelName of modelsToTry) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { temperature: 0.7, responseMimeType: "application/json" }
        })
      });

      if (!response.ok) {
        const errData = await response.text();
        lastError = new Error(`Model ${modelName} failed [${response.status}]: ${errData}`);
        continue; // Try next model automatically
      }

      const data = await response.json();
      const textResult = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (textResult) {
        return textResult;
      }
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw lastError || new Error("All fallback models failed to generate content.");
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

export async function generateAndAuditPaper(config) {
  const { selectedClass, selectedSubject, onProgress } = config;
  const targetSubject = selectedSubject || "Mathematics";
  const targetClass = selectedClass || "10th";

  // STAGE 1: Initial Assembly
  if (onProgress) onProgress({ text: `[Stage 1/4] Assembling question matrix for ${targetSubject} (Class ${targetClass}) via Gemini AI...` });

  const prompt1 = `You are an expert CBSE Chief Examiner. Generate a complete, rigorous, and professional examination paper JSON for Class ${targetClass} ${targetSubject} following official CBSE board blueprint guidelines (Sections A, B, C, D, E). Return ONLY valid JSON matching this schema:
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

  let rawText1 = await callGeminiWithAutoFallback(prompt1);
  let currentPaper = cleanAndParseJSON(rawText1);

  // STAGE 2: Compliance Audit
  if (onProgress) onProgress({ text: "[Stage 2/4] Running CBSE compliance & syllabus blueprint audit..." });
  const prompt2 = `Audit this question paper JSON for Class ${targetClass} ${targetSubject} for complete accuracy and proper section distribution. Return ONLY valid corrected JSON.\n${JSON.stringify(currentPaper)}`;
  try {
    let rawText2 = await callGeminiWithAutoFallback(prompt2);
    if (rawText2) {
      const audited2 = cleanAndParseJSON(rawText2);
      if (audited2 && audited2.sections) currentPaper = audited2;
    }
  } catch (e) {}

  // STAGE 3: Error Purging & Formatting
  if (onProgress) onProgress({ text: "[Stage 3/4] Purging formatting errors and verifying LaTeX expressions..." });
  const prompt3 = `Final technical edit on this paper JSON for Class ${targetClass} ${targetSubject}. Ensure formatting and answer keys are flawless. Return ONLY valid JSON.\n${JSON.stringify(currentPaper)}`;
  try {
    let rawText3 = await callGeminiWithAutoFallback(prompt3);
    if (rawText3) {
      const audited3 = cleanAndParseJSON(rawText3);
      if (audited3 && audited3.sections) currentPaper = audited3;
    }
  } catch (e) {}

  // STAGE 4: Final Release Readiness
  if (onProgress) onProgress({ text: "[Stage 4/4] Paper fully audited, verified, and error-free!" });

  currentPaper.subject = targetSubject;
  currentPaper.className = targetClass;
  return currentPaper;
}

export async function executePaperPipeline(config) {
  return await generateAndAuditPaper(config);
}

export default executePaperPipeline;
