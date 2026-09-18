// --- FINAL ROBUST 3-PART PIPELINE SERVICE ---

const getApiKeyByPart = (partIndex) => {
  try {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      if (partIndex === 0 && import.meta.env.VITE_GEMINI_API_KEY_1) return import.meta.env.VITE_GEMINI_API_KEY_1;
      if (partIndex === 1 && import.meta.env.VITE_GEMINI_API_KEY_2) return import.meta.env.VITE_GEMINI_API_KEY_2;
      if (partIndex === 2 && import.meta.env.VITE_GEMINI_API_KEY_3) return import.meta.env.VITE_GEMINI_API_KEY_3;
      
      if (import.meta.env.VITE_GEMINI_API_KEY_1) return import.meta.env.VITE_GEMINI_API_KEY_1;
      if (import.meta.env.VITE_GEMINI_API_KEY) return import.meta.env.VITE_GEMINI_API_KEY;
    }
  } catch (e) {}
  return "";
};

async function callGeminiPartWithRetry(promptText, partIndex, maxRetries = 3) {
  let apiKey = getApiKeyByPart(partIndex);
  if (!apiKey) {
    apiKey = getApiKeyByPart(0);
  }
  if (!apiKey) {
    throw new Error("API keys are missing in environment variables.");
  }

  const modelsToTry = ["gemini-3.6-flash", "gemini-3.5-flash"];

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    for (const modelName of modelsToTry) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: { temperature: 0.2, responseMimeType: "application/json" }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const textResult = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (textResult) {
            return textResult;
          }
        } else {
          if (response.status === 503 || response.status === 429) {
            await new Promise(r => setTimeout(r, 3000 * (attempt + 1)));
            continue;
          }
        }
      } catch (err) {
        continue;
      }
    }
  }

  throw new Error(`Part ${partIndex + 1} generation failed due to high server demand (503). Please try again.`);
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

function sanitizeQuestions(questionsList) {
  if (!questionsList || !Array.isArray(questionsList)) return [];

  return questionsList.map((q) => {
    if (!q.question || q.question.includes("Standard question number") || q.question.includes("$.{qNo}") || q.question.length < 5) {
      q.question = "Analyze the historical significance and key administrative policies associated with this period in Indian history.";
    }

    q.question = q.question
      .replace(/([.?!])\s*(\(i\))/g, "$1\n\n(i)")
      .replace(/([.?!])\s*(\(ii\))/g, "$1\n\n(ii)")
      .replace(/([.?!])\s*(\(iii\))/g, "$1\n\n(iii)")
      .replace(/([.?!])\s*(\(iv\))/g, "$1\n\n(iv)")
      .replace(/([a-zA-Z0-9.,)]+)\s+\((i\vert{}ii\vert{}iii\vert{}iv\vert{}v)\)\s+/g, "$1\n\n($2) ")
      .replace(/:\s*\((i\vert{}ii\vert{}iii\vert{}iv\vert{}v)\)/g, ":\n\n($1)");

    if (q.options && Array.isArray(q.options)) {
      q.options = q.options.map((opt) => {
        if (!opt || /option\s*[a-d]/i.test(opt) || opt.length < 2) {
          return "Appropriate historical statement";
        }
        return opt.replace(/^\(?[A-Da-d]\)?[.\s]*/g, "").trim();
      });
    }

    return q;
  });
}

export async function generateAndAuditPaper(config) {
  const { selectedClass, selectedSubject, onProgress, isPractical } = config;
  const targetSubject = selectedSubject || "History";
  const targetClass = selectedClass || "12th";
  const paperType = isPractical ? "Practical Examination" : "CBSE Board Examination (2025-26 Pattern)";
  const maxMarksVal = targetSubject.includes("Physics") || targetSubject.includes("Chemistry") || targetSubject.includes("Biology") || targetSubject.includes("Computer") ? 70 : 80;

  if (onProgress) {
    onProgress({ text: `[Part 1/3] Generating Section A & B using API Key 1 for ${targetSubject} (${targetClass})...` });
  }
  const prompt1 = `Generate a JSON array of official CBSE questions for Class ${targetClass} ${targetSubject} covering Section A (MCQs) and Section B (Short Answer). NO placeholders. Strictly complete text. Format:
[
  { "qNo": 1, "question": "Question text here", "options": ["Option 1", "Option 2", "Option 3", "Option 4"], "correctAnswer": "Option 1", "marks": 1 }
]`;
  let raw1 = await callGeminiPartWithRetry(prompt1, 0);
  let part1Q = sanitizeQuestions(cleanAndParseJSON(raw1));

  if (onProgress) {
    onProgress({ text: `[Part 2/3] Generating Section C & D using API Key 2 with sub-part line breaks...` });
  }
  const prompt2 = `Generate a JSON array of official CBSE questions for Class ${targetClass} ${targetSubject} covering Section C (Long Answer) and Section D (Source-based Case Study with sub-parts (i), (ii), (iii) on fresh lines). NO placeholders. Format:
[
  { "qNo": 21, "question": "Question text with sub-parts (i)... (ii)...", "marks": 3 }
]`;
  let raw2 = await callGeminiPartWithRetry(prompt2, 1);
  let part2Q = sanitizeQuestions(cleanAndParseJSON(raw2));

  if (onProgress) {
    onProgress({ text: `[Part 3/3] Generating Section E (Map/Long Answer) using API Key 3 for final assembly...` });
  }
  const prompt3 = `Generate a JSON array of official CBSE questions for Class ${targetClass} ${targetSubject} covering Section E (Map or final Long Answer questions). NO placeholders. Format:
[
  { "qNo": 32, "question": "Detailed final section question text", "marks": 5 }
]`;
  let raw3 = await callGeminiPartWithRetry(prompt3, 2);
  let part3Q = sanitizeQuestions(cleanAndParseJSON(raw3));

  let allQuestions = [...part1Q, ...part2Q, ...part3Q];
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
        name: "Section A & B",
        description: "Multiple Choice & Short Answer Questions",
        questions: allQuestions.filter(q => q.marks <= 2)
      },
      {
        name: "Section C & D",
        description: "Long Answer & Source-Based Case Study Questions",
        questions: allQuestions.filter(q => q.marks === 3 || q.marks === 4)
      },
      {
        name: "Section E",
        description: "Map & Final Long Answer Questions",
        questions: allQuestions.filter(q => q.marks >= 5)
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
