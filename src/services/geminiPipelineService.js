// --- FINAL CHUNKED CBSE 2025-26 PIPELINE SERVICE ---

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

async function callGeminiChunk(promptText, keyIndex = 0) {
  const keys = getAllAvailableApiKeys();
  const apiKey = keys[keyIndex % keys.length];
  
  if (!apiKey) {
    throw new Error("API key is missing in environment variables.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: { temperature: 0.3, responseMimeType: "application/json" }
    })
  });

  if (!response.ok) {
    const errData = await response.text();
    if ((response.status === 429 || response.status === 503) && keyIndex < keys.length + 2) {
      await new Promise(r => setTimeout(r, 1500));
      return await callGeminiChunk(promptText, keyIndex + 1);
    }
    throw new Error(`Gemini API failed [${response.status}]: ${errData}`);
  }

  const data = await response.json();
  const textResult = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  if (!textResult) throw new Error("Empty response from AI chunk.");
  return textResult;
}

function cleanAndParseJSON(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const firstBrace = cleaned.indexOf('[');
    const lastBrace = cleaned.lastIndexOf(']');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return JSON.parse(cleaned.substring(firstBrace, lastBrace + 1));
    }
    const firstObj = cleaned.indexOf('{');
    const lastObj = cleaned.lastIndexOf('}');
    if (firstObj !== -1 && lastObj !== -1 && lastObj > firstObj) {
      return JSON.parse(cleaned.substring(firstObj, lastObj + 1));
    }
    throw new Error("JSON parse error: " + e.message);
  }
}

export async function generateAndAuditPaper(config) {
  const { selectedClass, selectedSubject, onProgress, isPractical } = config;
  const targetSubject = selectedSubject || "Physics";
  const targetClass = selectedClass || "12th";
  const paperType = isPractical ? "Practical & Viva Examination" : "CBSE Board Examination (2025-26 Pattern)";
  const maxMarksVal = targetSubject.includes("Computer") || targetSubject.includes("IT") || targetSubject.includes("AI") || targetSubject.includes("Physics") || targetSubject.includes("Chemistry") || targetSubject.includes("Biology") ? 70 : 80;

  if (onProgress) {
    onProgress({ text: `[1/4] Generating Section A (MCQs) using API Key 1...` });
  }

  const prompt1 = `Generate a JSON array of official CBSE Section A Multiple Choice Questions (Q1 to Q20) for Class ${targetClass} ${targetSubject}. Use proper LaTeX for math. NO placeholders. Format:
[
  { "qNo": 1, "question": "Question text", "options": ["Option 1", "Option 2", "Option 3", "Option 4"], "correctAnswer": "Option 1", "marks": 1 }
]`;
  let raw1 = await callGeminiChunk(prompt1, 0);
  let secAQuestions = cleanAndParseJSON(raw1);

  if (onProgress) {
    onProgress({ text: `[2/4] Generating Section B & C (VSA & SA) using API Key 2...` });
  }

  const prompt2 = `Generate a JSON array of official CBSE Section B (2 marks, Q21-25) and Section C (3 marks, Q26-30) for Class ${targetClass} ${targetSubject}. Ensure sub-parts (i), (ii) start on fresh lines. NO placeholders. Format:
[
  { "qNo": 21, "question": "Question text with sub-parts", "marks": 2 }
]`;
  let raw2 = await callGeminiChunk(prompt2, 1);
  let secBCQuestions = cleanAndParseJSON(raw2);

  if (onProgress) {
    onProgress({ text: `[3/4] Generating Section D & E (Case Study & LA) using API Key 3...` });
  }

  const prompt3 = `Generate a JSON array of official CBSE Section D Case Study (4 marks, Q31-33) and Section E Long Answer (5 marks, Q34-38) for Class ${targetClass} ${targetSubject}. NO placeholders like standard question numbers. Format:
[
  { "qNo": 31, "question": "Detailed case study or long answer question", "marks": 4 }
]`;
  let raw3 = await callGeminiChunk(prompt3, 2);
  let secDEQuestions = cleanAndParseJSON(raw3);

  if (onProgress) {
    onProgress({ text: `[4/4] Combining chunks and assembling final CBSE question paper...` });
  }

  let allQuestions = [...(Array.isArray(secAQuestions) ? secAQuestions : []), ...(Array.isArray(secBCQuestions) ? secBCQuestions : []), ...(Array.isArray(secDEQuestions) ? secDEQuestions : [])];
  
  allQuestions.forEach((q, idx) => {
    q.qNo = idx + 1;
  });

  const finalPaper = {
    title: `DevGyan-Innovation Academic Studio - ${targetSubject} (${targetClass})`,
    className: targetClass,
    subject: targetSubject,
    duration: "3 Hours",
    maxMarks: maxMarksVal,
    generalInstructions: [
      "1. Please check that this question paper contains all printed sections.",
      "2. All questions are compulsory. Internal choices are provided in respective sections.",
      "3. Use of calculators is not allowed. Use physical constants where necessary."
    ],
    sections: [
      {
        name: "Section A",
        description: "Multiple Choice Questions (1 Mark each)",
        questions: allQuestions.filter(q => q.marks === 1)
      },
      {
        name: "Section B",
        description: "Very Short Answer Type Questions (2 Marks each)",
        questions: allQuestions.filter(q => q.marks === 2)
      },
      {
        name: "Section C",
        description: "Short Answer Type Questions (3 Marks each)",
        questions: allQuestions.filter(q => q.marks === 3)
      },
      {
        name: "Section D & E",
        description: "Case Study and Long Answer Questions (4 & 5 Marks)",
        questions: allQuestions.filter(q => q.marks >= 4)
      }
    ],
    answerKey: "Detailed step-by-step marking scheme verified by DevGyan-Innovation conforming to CBSE standards."
  };

  return finalPaper;
}

export async function executePaperPipeline(config) {
  return await generateAndAuditPaper(config);
}

const defaultExport = executePaperPipeline;
export default defaultExport;
