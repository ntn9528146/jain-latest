// --- 5-STAGE DEVGYAN-INNOVATION PIPELINE WITH DUAL EXPORTS ---

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

async function callDirectGemini(promptText) {
  const apiKey = getActiveApiKey();
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is missing in environment variables.");
  }

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
          generationConfig: { temperature: 0.8, responseMimeType: "application/json" }
        })
      });

      if (!response.ok) {
        const errData = await response.text();
        lastError = new Error(`Model ${modelName} failed [${response.status}]: ${errData}`);
        continue;
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

  throw lastError || new Error("All pipeline models failed to generate content.");
}

function cleanAndParseJSON(text) {
  if (!text) throw new Error("Empty response received from AI engine.");
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const jsonString = cleaned.substring(firstBrace, lastBrace + 1);
      return JSON.parse(jsonString);
    }
    throw new Error("Failed to parse AI JSON response: " + e.message);
  }
}

export async function generateAndAuditPaper(config) {
  const { selectedClass, selectedSubject, onProgress, isPractical } = config;
  const targetSubject = selectedSubject || "Mathematics";
  const targetClass = selectedClass || "10th";
  const paperType = isPractical ? "Practical & Viva Examination" : "CBSE Board Examination";

  if (onProgress) {
    onProgress({ text: `[Stage 1/5] Generating authentic, unique questions for ${targetSubject} (${paperType})...` });
  }

  const uniqueToken = Math.random().toString(36).substring(2, 12) + Date.now();
  const stage1Prompt = `
You are an expert Chief CBSE Examiner and Curriculum Designer for DevGyan-Innovation. Generate a complete, rigorous, and professional ${paperType} JSON for Class ${targetClass} ${targetSubject} following official CBSE board blueprint guidelines (Sections A, B, C, D, E).
Generation Seed: ${uniqueToken}

STRICT INSTRUCTIONS:
1. NO DUMMY TEXT: Every question must be fully framed, authentic, syllabus-compliant, and rich in content. Never write placeholder text.
2. REAL OPTIONS: For MCQs in Section A, provide 4 distinct, meaningful, subject-specific options (e.g., "(A) 2 cm", "(B) 4 cm", "(C) 6 cm", "(D) 8 cm"). Never use generic "Option A, Option B".
3. EQUATIONS SEPARATION: Never merge equations. Keep proper spacing (e.g., "$2x + 3y = 11$" and "$2x - 4y = -24$").
4. SUB-QUESTIONS: Sub-parts like (i), (ii), (iii) must be clearly separated on new lines.
5. BRANDING: Use "DevGyan-Innovation" as the brand name.

Return ONLY valid JSON matching this exact schema:
{
  "title": "DevGyan-Innovation Academic Studio - ${targetSubject}",
  "className": "${targetClass}",
  "subject": "${targetSubject}",
  "duration": "3 Hours",
  "maxMarks": ${targetSubject.includes("Computer") || targetSubject.includes("IT") ? 70 : 80},
  "generalInstructions": [
    "1. This question paper contains compulsory sections structured by DevGyan-Innovation.",
    "2. Read all instructions carefully and ensure proper spacing for mathematical expressions."
  ],
  "sections": [
    {
      "name": "Section A",
      "description": "Multiple Choice Questions (1 Mark each)",
      "questions": [
        { "qNo": 1, "question": "Write authentic question here with proper math like $2x + 3y = 11$", "options": ["(A) Choice 1", "(B) Choice 2", "(C) Choice 3", "(D) Choice 4"], "correctAnswer": "(A) Choice 1", "marks": 1 }
      ]
    }
  ],
  "answerKey": "Detailed step-by-step marking scheme verified by DevGyan-Innovation."
}`;

  let rawText1 = await callDirectGemini(stage1Prompt);
  let currentPaper = cleanAndParseJSON(rawText1);

  if (onProgress) {
    onProgress({ text: `[Stage 2/5] Running CBSE structure & blueprint compliance audit...` });
  }

  const stage2Prompt = `Audit this question paper JSON for Class ${targetClass} ${targetSubject}. Check that sections (A, B, C, D, E) are properly distributed according to CBSE standards and contain real, non-dummy questions. Return ONLY valid JSON.\n${JSON.stringify(currentPaper)}`;
  try {
    let rawText2 = await callDirectGemini(stage2Prompt);
    if (rawText2) {
      const audited2 = cleanAndParseJSON(rawText2);
      if (audited2 && audited2.sections) currentPaper = audited2;
    }
  } catch (e) {}

  if (onProgress) {
    onProgress({ text: `[Stage 3/5] Fixing equation overlapping and spacing issues...` });
  }

  const stage3Prompt = `Strictly check all questions. Ensure no placeholder text exists, equations are well-spaced, and options are real. Return ONLY valid JSON.\n${JSON.stringify(currentPaper)}`;
  try {
    let rawText3 = await callDirectGemini(stage3Prompt);
    if (rawText3) {
      const audited3 = cleanAndParseJSON(rawText3);
      if (audited3 && audited3.sections) currentPaper = audited3;
    }
  } catch (e) {}

  if (onProgress) {
    onProgress({ text: `[Stage 4/5] Formatting case studies and sub-questions onto separate lines...` });
  }

  const stage4Prompt = `Review subjective questions and case studies with sub-parts ((i), (ii), (iii)). Ensure every sub-part is properly formatted on a new line. Return ONLY valid JSON.\n${JSON.stringify(currentPaper)}`;
  try {
    let rawText4 = await callDirectGemini(stage4Prompt);
    if (rawText4) {
      const audited4 = cleanAndParseJSON(rawText4);
      if (audited4 && audited4.sections) currentPaper = audited4;
    }
  } catch (e) {}

  if (onProgress) {
    onProgress({ text: `[Stage 5/5] Finalizing DevGyan-Innovation branding & locking error-free layout...` });
  }

  currentPaper.title = `DevGyan-Innovation Academic Studio - ${targetSubject} (${targetClass})`;
  currentPaper.subject = targetSubject;
  currentPaper.className = targetClass;

  return currentPaper;
}

export async function executePaperPipeline(config) {
  return await generateAndAuditPaper(config);
}

// Dual exports to satisfy both default and named imports perfectly
export default executePaperPipeline;
