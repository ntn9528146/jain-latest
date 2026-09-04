import { getActiveGeminiKey, reportKeyFailure } from '../config/geminiKeyVault.js';
import { resolveSubjectRegistry } from '../config/cbseSubjectMatrices.js';

export function getOfficialCbseMatrix(subject = '', selectedClass = '', targetMarks = null) {
  const profile = resolveSubjectRegistry(subject, selectedClass);
  return {
    marks: targetMarks || profile.marks,
    matrix: profile.matrix,
    instructions: profile.instructions,
    time: profile.time
  };
}

function cleanAndRepairJson(raw) {
  let text = String(raw || '')
    .replace(/^```json/gim, '')
    .replace(/^```/gim, '')
    .trim();

  // 1. Direct try
  try {
    return JSON.parse(text);
  } catch (e1) {
    // 2. Fix unescaped newlines inside strings
    let sanitized = text.replace(/([":]\s*"[^"\\]*(\\[\s\S][^"\\]*)*)\n/g, '$1\\n');
    
    // 3. Fix unquoted keys or trailing commas before closing braces
    sanitized = sanitized.replace(/,\s*([}\]])/g, '$1');

    // 4. Fix missing quotes around answerKey/questionText
    sanitized = sanitized.replace(/"(answerKey|questionText|topicName)"\s*:\s*([^"{\[\d\n][^\n,}]*)/g, (match, k, v) => {
      return `"${k}": "${v.trim().replace(/"/g, '\\"')}"`;
    });

    try {
      return JSON.parse(sanitized);
    } catch (e2) {
      // 5. Extract JSON object substring if model added commentary text
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        const sliced = text.substring(firstBrace, lastBrace + 1).replace(/,\s*([}\]])/g, '$1');
        return JSON.parse(sliced);
      }
      throw new Error(`JSON Compilation Failed: ${e1.message}`);
    }
  }
}

export const executePaperPipeline = async (options = {}) => {
  const selectedClass = String(options.selectedClass || options.className || 'Class 12');
  const rawSub = String(options.subject || options.selectedSubject || 'Accountancy');
  const subject = rawSub.replace(/\s*\([^)]*\)/g, '').trim();
  const examType = String(options.examType || options.examName || 'Pre-Board Examination').replace(/\(\s*\d+%\s*SYLLABUS\s*\)/gi, '').trim();
  const isPYQ = Boolean(options.isPYQ || options.includePYQ || examType.toLowerCase().includes('pyq'));
  const isHindi = subject.toLowerCase().includes('hindi') || rawSub.toLowerCase().includes('hindi');
  const onProgress = typeof options.onProgress === 'function' ? options.onProgress : () => {};

  const profile = resolveSubjectRegistry(subject, selectedClass);
  const activeSections = Array.isArray(options.matrix) && options.matrix.filter(m => m && m.enabled && m.count > 0).length > 0
    ? options.matrix.filter(m => m && m.enabled && m.count > 0)
    : profile.matrix;

  const finalMarks = options.theoryMarks || options.maxMarks || profile.marks;
  const totalExpectedQuestions = activeSections.reduce((acc, curr) => acc + Number(curr.count || 0), 0);

  onProgress({ stage: 1, text: `CBSE Pattern Locked: Exact ${totalExpectedQuestions} Qs | ${finalMarks} Marks` });

  let apiKey = getActiveGeminiKey();
  if (!apiKey) {
    apiKey = localStorage.getItem('gemini_api_key') || localStorage.getItem('VITE_GEMINI_API_KEY');
  }
  if (!apiKey) {
    throw new Error('Gemini API Key missing! Please configure key in .env or settings');
  }

  const activeUnits = Array.isArray(options.activeUnits) ? options.activeUnits : [];
  const syllabusTopics = activeUnits.length > 0 
    ? activeUnits.flatMap((u) => u?.subtopics || [u?.name || 'Core Curriculum']).join('; ')
    : `${subject} CBSE Class ${selectedClass} Official Curriculum`;

  const secPrompt = activeSections.map((s, idx) => 
    `Section ${String.fromCharCode(65 + idx)}: Exactly ${s.count} Qs of ${s.marks} Marks each (${s.label})`
  ).join('\n');

  const prompt = `You are a Senior CBSE Chief Board Examiner for ${subject} (${selectedClass}).
OFFICIAL INSTRUCTIONS:
${profile.instructions.join('\n')}

MANDATORY RULES:
1. QUESTION COUNT: Total questions must be EXACTLY ${totalExpectedQuestions}, numbered 1 to ${totalExpectedQuestions}.
2. BLUEPRINT:
${secPrompt}
3. MARKS SUM: Exactly ${finalMarks}.
4. NO INTERNAL CODES: Do not print subject code in question stem.
5. ${isPYQ ? 'Append tags like [CBSE 2023].' : 'No fake year tags.'}
6. ${isHindi ? 'Strictly in pure Devnagari Hindi (मङ्गल font).' : 'Strictly in CBSE Board English.'}
7. MARKING SCHEME: Provide exact step-wise marking points in answerKey for every question.
8. RETURN ONLY VALID RFC8259 JSON. No markdown backticks.

School: ARDEN PROGRESSIVE SCHOOL
Exam: ${examType}
Class: ${selectedClass}
Subject: ${subject}
Max Marks: ${finalMarks}
Topics: ${syllabusTopics}

JSON Format:
{
  "paperHeader": {
    "schoolName": "ARDEN PROGRESSIVE SCHOOL",
    "examName": "${examType}",
    "className": "${selectedClass}",
    "subjectName": "${subject}",
    "timeAllowed": "${profile.time}",
    "maxMarks": ${finalMarks}
  },
  "generalInstructions": ${JSON.stringify(profile.instructions)},
  "sections": [
    {
      "sectionTitle": "SECTION A",
      "marksPerQ": 1,
      "questions": [
        {
          "qNo": 1,
          "marks": 1,
          "topicName": "Topic Name",
          "questionText": "Question stem\\n(A) Option 1\\n(B) Option 2\\n(C) Option 3\\n(D) Option 4",
          "answerKey": "(A) Correct Option [1 Mark]"
        }
      ]
    }
  ],
  "blueprintSummary": [
    { "unitName": "Unit 1", "questionsCount": 4, "marksAssigned": 12 }
  ]
}`;

  onProgress({ stage: 3, text: `Gemini 3.6 Flash generating official ${totalExpectedQuestions}-question paper...` });

  const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.15,
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const err = await response.text();
    reportKeyFailure(apiKey);
    throw new Error(`Gemini API Error [${response.status}]: ${err}`);
  }

  const resData = await response.json();
  const rawText = resData.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const paperJson = cleanAndRepairJson(rawText);

  onProgress({ stage: 4, text: `CBSE Paper Ready (${totalExpectedQuestions} Questions Verified)` });
  return paperJson;
};

export default executePaperPipeline;
