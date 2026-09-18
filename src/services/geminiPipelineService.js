// --- EXACT .ENV MATCHING CHAT-STYLE PIPELINE SERVICE ---

const getAllAvailableApiKeys = () => {
  const keys = [];
  try {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      if (import.meta.env.VITE_GEMINI_API_KEY_1) keys.push(import.meta.env.VITE_GEMINI_API_KEY_1);
      if (import.meta.env.VITE_GEMINI_API_KEY_2) keys.push(import.meta.env.VITE_GEMINI_API_KEY_2);
      if (import.meta.env.VITE_GEMINI_API_KEY_3) keys.push(import.meta.env.VITE_GEMINI_API_KEY_3);
      if (import.meta.env.VITE_GEMINI_API_KEY) keys.push(import.meta.env.VITE_GEMINI_API_KEY);
    }
    if (typeof window !== 'undefined') {
      const stored1 = localStorage.getItem('VITE_GEMINI_API_KEY');
      const stored2 = localStorage.getItem('gemini_api_key');
      if (stored1 && !keys.includes(stored1)) keys.push(stored1);
      if (stored2 && !keys.includes(stored2)) keys.push(stored2);
    }
  } catch (e) {}
  
  if (keys.length === 0) keys.push("");
  return keys;
};

async function callGeminiWithAllKeys(promptText, keyIndex = 0) {
  const keys = getAllAvailableApiKeys();
  const apiKey = keys[keyIndex % keys.length];
  
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY_1 is missing in environment variables.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: { temperature: 0.3 }
      })
    });

    if (!response.ok) {
      const errData = await response.text();
      if ((response.status === 429 || response.status === 503) && keyIndex < keys.length + 2) {
        return await callGeminiWithAllKeys(promptText, keyIndex + 1);
      }
      throw new Error(`Gemini API failed [${response.status}]: ${errData}`);
    }

    const data = await response.json();
    const textResult = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!textResult) throw new Error("Empty response received from AI engine.");
    return textResult;
  } catch (err) {
    if (keyIndex < keys.length + 2) {
      return await callGeminiWithAllKeys(promptText, keyIndex + 1);
    }
    throw err;
  }
}

export async function generateAndAuditPaper(config) {
  const { selectedClass, selectedSubject, onProgress, isPractical } = config;
  const targetSubject = selectedSubject || "Physics";
  const targetClass = selectedClass || "12th";
  const paperType = isPractical ? "Practical & Viva Examination" : "CBSE Board Examination (2025-26 Pattern)";

  const maxMarksVal = targetSubject.includes("Computer") || targetSubject.includes("IT") || targetSubject.includes("AI") || targetSubject.includes("Physics") || targetSubject.includes("Chemistry") || targetSubject.includes("Biology") ? 70 : 80;

  if (onProgress) {
    onProgress({ text: `[Generating] Connecting .env API pool for official CBSE 2025-26 paper (${targetSubject})...` });
  }

  const promptText = `
You are an expert CBSE Chief Curriculum Designer. Create a complete, 100% error-free official ${paperType} for Class ${targetClass} ${targetSubject} following strict CBSE 2025-26 bylaws and guidelines.

Strict Rules:
1. No placeholders or truncation. Every single question must be fully written with correct spellings and proper scientific terms.
2. Format Section A MCQs with options properly without prefixing duplicate letters like (A) inside the option text.
3. Ensure all mathematical formulas and fractions use proper LaTeX syntax.
4. Structure the output as a clean JSON object containing title, className, subject, maxMarks, generalInstructions, sections (array of sections, each having name, description, and questions array with qNo, question, options, marks), and answerKey.

Return ONLY valid JSON.
`;

  const rawText = await callGeminiWithAllKeys(promptText, 0);
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
  }

  let paper;
  try {
    paper = JSON.parse(cleaned);
  } catch (e) {
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      paper = JSON.parse(cleaned.substring(firstBrace, lastBrace + 1));
    } else {
      throw new Error("Failed to parse paper structure from AI.");
    }
  }

  paper.title = `DevGyan-Innovation Academic Studio - ${targetSubject} (${targetClass})`;
  paper.subject = targetSubject;
  paper.className = targetClass;
  paper.maxMarks = maxMarksVal;

  return paper;
}

export default async function executePaperPipeline(config) {
  return await generateAndAuditPaper(config);
}
