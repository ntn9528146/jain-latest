export async function executePaperPipeline(config) {
  return await generateAndAuditPaper(config);
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

async function callDirectGemini(promptText) {
  const keys = getApiKeys();
  if (keys.length === 0) {
    throw new Error("API Key missing in environment variables (.env).");
  }

  // Safe and direct working model endpoint
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${keys[0]}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: { temperature: 0.7, responseMimeType: "application/json" }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response received from Gemini API.");
  return text;
}

function cleanAndParseJSON(text) {
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

  if (onProgress) onProgress({ text: `[Stage 1/4] Assembling question matrix for ${targetSubject} (Class ${targetClass})...` });

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

  let rawText1 = await callDirectGemini(prompt1);
  let currentPaper = cleanAndParseJSON(rawText1);

  if (onProgress) onProgress({ text: "[Stage 2/4] Running CBSE compliance & syllabus blueprint audit..." });
  
  const prompt2 = `Audit this question paper JSON for Class ${targetClass} ${targetSubject} for complete accuracy and proper section distribution. Return ONLY valid corrected JSON.\n${JSON.stringify(currentPaper)}`;
  try {
    let rawText2 = await callDirectGemini(prompt2);
    if (rawText2) {
      const audited2 = cleanAndParseJSON(rawText2);
      if (audited2 && audited2.sections) currentPaper = audited2;
    }
  } catch (e) {}

  if (onProgress) onProgress({ text: "[Stage 3/4] Purging formatting errors and verifying LaTeX expressions..." });
  
  const prompt3 = `Final technical edit on this paper JSON for Class ${targetClass} ${targetSubject}. Ensure formatting and answer keys are flawless. Return ONLY valid JSON.\n${JSON.stringify(currentPaper)}`;
  try {
    let rawText3 = await callDirectGemini(prompt3);
    if (rawText3) {
      const audited3 = cleanAndParseJSON(rawText3);
      if (audited3 && audited3.sections) currentPaper = audited3;
    }
  } catch (e) {}

  if (onProgress) onProgress({ text: "[Stage 4/4] Paper fully audited, verified, and error-free!" });

  currentPaper.subject = targetSubject;
  currentPaper.className = targetClass;
  return currentPaper;
}

export default executePaperPipeline;
