// --- ULTIMATE FORMATTING-LOCKED 5-STAGE PIPELINE ---
import { callGeminiApi } from './geminiApiService.js';

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
    onProgress({ text: `[Stage 1/5] Assembling unique question matrix for ${targetSubject} (${paperType})...` });
  }

  const uniqueToken = Math.random().toString(36).substring(2, 12) + Date.now();
  const stage1Prompt = `
You are an expert Chief Examiner for DevGyan-Innovation. Generate a complete, rigorous, and professional ${paperType} JSON for Class ${targetClass} ${targetSubject} following official CBSE guidelines.
Generation Seed: ${uniqueToken}

CRITICAL FORMATTING RULES TO PREVENT ERRORS:
1. EQUATIONS SEPARATION: Never merge two linear or quadratic equations together. Always keep proper spaces or line breaks (e.g., "$2x + 3y = 11$ and $2x - 4y = -24$").
2. TABLES & STATISTICS: For median/mean/mode or data distribution tables, NEVER use LaTeX array strings like \\begin{array}. Write them cleanly in clear textual format or structured table description.
3. SUB-QUESTIONS & CASE STUDIES: Every sub-part like (i), (ii), (iii) MUST be separated clearly or placed on a new line description. Never jam them into a single continuous paragraph.
4. BRANDING: Use "DevGyan-Innovation" as the organization name. Remove any reference to Gemini.

Return ONLY valid JSON matching this schema:
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
      "description": "Multiple Choice Questions",
      "questions": [
        { "qNo": 1, "question": "Sample question with clear math like $2x + 3y = 11$", "options": ["(A) opt1", "(B) opt2", "(C) opt3", "(D) opt4"], "correctAnswer": "(A) opt1", "marks": 1 }
      ]
    }
  ],
  "answerKey": "Detailed step-by-step marking scheme verified by DevGyan-Innovation."
}`;

  let rawText1 = await callGeminiApi(stage1Prompt);
  let currentPaper = cleanAndParseJSON(rawText1);

  if (onProgress) {
    onProgress({ text: `[Stage 2/5] Running CBSE structure & blueprint compliance audit...` });
  }

  const stage2Prompt = `Audit this question paper JSON for Class ${targetClass} ${targetSubject}. Check that sections (A, B, C, D, E) are properly distributed according to CBSE standards. Return ONLY valid JSON.\n${JSON.stringify(currentPaper)}`;
  try {
    let rawText2 = await callGeminiApi(stage2Prompt);
    if (rawText2) {
      const audited2 = cleanAndParseJSON(rawText2);
      if (audited2 && audited2.sections) currentPaper = audited2;
    }
  } catch (e) {}

  if (onProgress) {
    onProgress({ text: `[Stage 3/5] Fixing equation overlapping and spacing issues...` });
  }

  const stage3Prompt = `Strictly check all questions. Ensure no two equations are fused or written together without spacing (e.g. '$2x+3y=11 2x-4y=-24$' is forbidden; separate them cleanly). Ensure proper LaTeX notation for fractions. Return ONLY valid JSON.\n${JSON.stringify(currentPaper)}`;
  try {
    let rawText3 = await callGeminiApi(stage3Prompt);
    if (rawText3) {
      const audited3 = cleanAndParseJSON(rawText3);
      if (audited3 && audited3.sections) currentPaper = audited3;
    }
  } catch (e) {}

  if (onProgress) {
    onProgress({ text: `[Stage 4/5] Formatting case studies and sub-questions onto separate lines...` });
  }

  const stage4Prompt = `Review case studies and subjective questions with sub-parts ((i), (ii), (iii)). Ensure every sub-part is properly formatted on a new line or clearly separated. Return ONLY valid JSON.\n${JSON.stringify(currentPaper)}`;
  try {
    let rawText4 = await callGeminiApi(stage4Prompt);
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

export default executePaperPipeline;
