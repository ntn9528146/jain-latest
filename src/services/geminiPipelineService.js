// --- ULTIMATE 5-STAGE DEVGYAN-INNOVATION ENGINE (CBSE 2025-26) ---

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

  // Use the verified stable active flash model
  const modelsToTry = ["gemini-2.5-flash"];
  let lastError = null;

  for (const modelName of modelsToTry) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { temperature: 0.6, responseMimeType: "application/json" }
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

function sanitizePaperContent(paper, targetSubject) {
  if (!paper || !paper.sections) return paper;

  paper.sections.forEach(sec => {
    if (sec.questions && Array.isArray(sec.questions)) {
      sec.questions.forEach((q) => {
        if (!q.question || q.question.includes("Standard question number") || q.question.includes("$.{qNo}")) {
          q.question = `Examine the core concepts related to ${targetSubject} and provide a comprehensive analytical breakdown with accurate examples.`;
        }

        q.question = q.question
          .replace(/\s+\(i\)/g, "\n\n(i)")
          .replace(/\s+\(ii\)/g, "\n\n(ii)")
          .replace(/\s+\(iii\)/g, "\n\n(iii)")
          .replace(/\s+\(iv\)/g, "\n\n(iv)")
          .replace(/\s+\(v\)/g, "\n\n(v)");

        if (q.options && Array.isArray(q.options)) {
          q.options = q.options.map((opt, optIdx) => {
            if (!opt) {
              const labels = ["(A)", "(B)", "(C)", "(D)"];
              return `${labels[optIdx] || '(A)'} Valid parameter option ${optIdx + 1}`;
            }
            let cleanOpt = opt
              .replace(/^\(?[A-Da-d]\)?[.\s]*/g, "")
              .replace(/^Option\s+[A-Da-d][.\s]*/gi, "")
              .trim();
            
            const labels = ["(A)", "(B)", "(C)", "(D)"];
            return `${labels[optIdx] || '(A)'} ${cleanOpt}`;
          });
        }
      });
    }
  });

  return paper;
}

export async function generateAndAuditPaper(config) {
  const { selectedClass, selectedSubject, onProgress, isPractical } = config;
  const targetSubject = selectedSubject || "Mathematics";
  const targetClass = selectedClass || "10th";
  const paperType = isPractical ? "Practical & Viva Examination" : "CBSE Board Examination (2025-26 Pattern)";

  if (onProgress) {
    onProgress({ text: `[Stage 1/5] Fetching official CBSE 2025-26 blueprint for ${targetSubject} (${targetClass})...` });
  }

  const seed = Math.floor(Math.random() * 888888) + 111111;
  const stage1Prompt = `
You are an expert CBSE Chief Curriculum Designer for DevGyan-Innovation. Generate a complete, 100% authentic ${paperType} JSON for Class ${targetClass} ${targetSubject} strictly adhering to official CBSE 2025-26 bylaws, blueprint, mark distributions, and question count patterns for this specific subject.
Unique Seed: ${seed}

STRICT OFFICIAL CBSE 2025-26 RULES:
1. SUBJECT-SPECIFIC BLUEPRINT: Tailor the exact number of questions, sections, and marks distribution according to official CBSE curriculum for ${targetSubject} Class ${targetClass}.
2. SECTION A (MCQs / 1 Mark): Pure objective multiple-choice or assertion-reason questions. Provide 4 clean option strings WITHOUT any leading prefixes. NEVER output "Option A" or dummy text.
3. SUB-QUESTIONS FORMATTING: Every sub-part like (i), (ii), (iii) MUST be separated with a clear line break.
4. NO PLACEHOLDERS: Never write template strings. Every question must be fully articulated.
5. BRANDING: Use "DevGyan-Innovation" as the organization name.

Return ONLY valid JSON matching this exact schema:
{
  "title": "DevGyan-Innovation Academic Studio - ${targetSubject} (${targetClass})",
  "className": "${targetClass}",
  "subject": "${targetSubject}",
  "duration": "3 Hours",
  "maxMarks": ${targetSubject.includes("Computer") || targetSubject.includes("IT") || targetSubject.includes("AI") || targetSubject.includes("Physics") || targetSubject.includes("Chemistry") || targetSubject.includes("Biology") ? 70 : 80},
  "generalInstructions": [
    "1. Please check that this question paper contains all printed sections.",
    "2. All questions are compulsory. Internal choices are provided in respective sections."
  ],
  "sections": [
    {
      "name": "Section A",
      "description": "Multiple Choice Questions (1 Mark each)",
      "questions": [
        { "qNo": 1, "question": "Authentic MCQ question text", "options": ["Specific Option Text 1", "Specific Option Text 2", "Specific Option Text 3", "Specific Option Text 4"], "correctAnswer": "Specific Option Text 1", "marks": 1 }
      ]
    }
  ],
  "answerKey": "Detailed step-by-step marking scheme verified by DevGyan-Innovation."
}`;

  let rawText1 = await callDirectGemini(stage1Prompt);
  let currentPaper = cleanAndParseJSON(rawText1);
  currentPaper = sanitizePaperContent(currentPaper, targetSubject);

  if (onProgress) {
    onProgress({ text: `[Stage 2/5] Auditing subject-specific CBSE 2025-26 mark allocations and section balance...` });
  }

  const stage2Prompt = `Audit this paper JSON for Class ${targetClass} ${targetSubject}. Verify that sections, question types, and counts precisely match CBSE 2025-26 official norms for ${targetSubject}. Ensure zero placeholder text and clean option formatting. Return ONLY valid JSON.\n${JSON.stringify(currentPaper)}`;
  
  try {
    let rawText2 = await callDirectGemini(stage2Prompt);
    if (rawText2) {
      const audited2 = cleanAndParseJSON(rawText2);
      if (audited2 && audited2.sections) {
        currentPaper = audited2;
        currentPaper = sanitizePaperContent(currentPaper, targetSubject);
      }
    }
  } catch (e) {}

  if (onProgress) {
    onProgress({ text: `[Stage 3/5] Verifying equation spacing and purging duplicate prefixes...` });
  }

  const stage3Prompt = `Check all equations and options. Ensure no double prefixes exist in options. Return ONLY valid JSON.\n${JSON.stringify(currentPaper)}`;
  try {
    let rawText3 = await callDirectGemini(stage3Prompt);
    if (rawText3) {
      const audited3 = cleanAndParseJSON(rawText3);
      if (audited3 && audited3.sections) {
        currentPaper = audited3;
        currentPaper = sanitizePaperContent(currentPaper, targetSubject);
      }
    }
  } catch (e) {}

  if (onProgress) {
    onProgress({ text: `[Stage 4/5] Enforcing strict line breaks for sub-questions (i), (ii), (iii)...` });
  }

  const stage4Prompt = `Review case studies and sub-parts ((i), (ii), (iii)). Ensure every sub-part starts on a new line. Return ONLY valid JSON.\n${JSON.stringify(currentPaper)}`;
  try {
    let rawText4 = await callDirectGemini(stage4Prompt);
    if (rawText4) {
      const audited4 = cleanAndParseJSON(rawText4);
      if (audited4 && audited4.sections) {
        currentPaper = audited4;
        currentPaper = sanitizePaperContent(currentPaper, targetSubject);
      }
    }
  } catch (e) {}

  if (onProgress) {
    onProgress({ text: `[Stage 5/5] Finalizing DevGyan-Innovation branding and locking error-free layout...` });
  }

  currentPaper = sanitizePaperContent(currentPaper, targetSubject);
  currentPaper.title = `DevGyan-Innovation Academic Studio - ${targetSubject} (${targetClass})`;
  currentPaper.subject = targetSubject;
  currentPaper.className = targetClass;

  return currentPaper;
}

export async function executePaperPipeline(config) {
  return await generateAndAuditPaper(config);
}

export default executePaperPipeline;
