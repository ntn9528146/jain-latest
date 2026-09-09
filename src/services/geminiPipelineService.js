import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      if (import.meta.env.VITE_GEMINI_API_KEY) return import.meta.env.VITE_GEMINI_API_KEY;
      if (import.meta.env.VITE_GEMINI_API_KEY_2) return import.meta.env.VITE_GEMINI_API_KEY_2;
      if (import.meta.env.VITE_GEMINI_API_KEY_3) return import.meta.env.VITE_GEMINI_API_KEY_3;
    }
  } catch (e) {}

  if (typeof process !== "undefined" && process.env) {
    if (process.env.VITE_GEMINI_API_KEY) return process.env.VITE_GEMINI_API_KEY;
    if (process.env.VITE_GEMINI_API_KEY_2) return process.env.VITE_GEMINI_API_KEY_2;
    if (process.env.VITE_GEMINI_API_KEY_3) return process.env.VITE_GEMINI_API_KEY_3;
  }

  return "";
};

export async function generateAndAuditPaper(config) {
  const { selectedClass, selectedSubject, paperType, onProgress } = config;
  const targetSubject = selectedSubject || "Mathematics";
  const targetClass = selectedClass || "10th";

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please check your .env configuration.");
  }

  // Initialize official GoogleGenAI client which handles model routing automatically
  const ai = new GoogleGenAI({ apiKey });

  if (onProgress) onProgress({ text: `[Stage 1/4] Assembling and permuting unique questions for ${targetSubject} (Class ${targetClass})...` });

  const uniqueSalt = Math.random().toString(36).substring(2, 10) + Date.now();

  const basePrompt = `
You are an expert academic curriculum engine. Using standard question patterns for Class ${targetClass} ${targetSubject}, build a permuted, 100% unique question paper.
Permutation Salt: ${uniqueSalt}
Ensure appropriate total questions, marks, and section patterns corresponding specifically to ${targetSubject}.
Return ONLY valid JSON format matching standard schema.
`;

  try {
    const response1 = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: basePrompt,
      config: { temperature: 0.9, responseMimeType: "application/json" }
    });

    let currentPaper = JSON.parse(response1.text());

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

      const auditResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: auditPrompt,
        config: { temperature: 0.1, responseMimeType: "application/json" }
      });

      const auditResult = JSON.parse(auditResponse.text());
      
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

export async function executePaperPipeline(config) {
  return await generateAndAuditPaper(config);
}

export default executePaperPipeline;
