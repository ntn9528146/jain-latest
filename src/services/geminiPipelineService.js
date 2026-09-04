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
  let text = raw.replace(/```json/gi, '').replace(/```/gi, '').trim();

  // Repair unquoted values like "answerKey": (i) ...
  text = text.replace(/"(answerKey|questionText|topicName)"\s*:\s*([^"{\[\d\n][^\n,}]*)/g, (match, key, val) => {
    const trimmedVal = val.trim().replace(/"/g, '\\"');
    return `"${key}": "${trimmedVal}"`;
  });

  try {
    return JSON.parse(text);
  } catch (err) {
    const sanitized = text.replace(/(?<=:\s*"[^"]*)\n(?=[^"]*")/g, '\\n');
    return JSON.parse(sanitized);
  }
}

export const executePaperPipeline = async (options = {}) => {
  const selectedClass = String(options.selectedClass || options.className || 'Class 12');
  const rawSub = String(options.subject || options.selectedSubject || 'Physics');
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

  onProgress({ stage: 1, text: `CBSE Official Pattern Locked: ${totalExpectedQuestions} Questions (${finalMarks} Marks)` });

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

  const instructionsText = profile.instructions.map((ins, i) => `${i + 1}. ${ins}`).join('\n');

  const prompt = `You are a Senior CBSE Board Examiner for ${subject} (${selectedClass}).
OFFICIAL INSTRUCTIONS & BLUEPRINT:
${instructionsText}

MANDATORY RULES:
1. QUESTION COUNT: Total questions must be EXACTLY ${totalExpectedQuestions}. Continuously numbered from 1 to ${totalExpectedQuestions}.
2. SECTION LAYOUT:
${secPrompt}
3. MARKS TALLY: Total marks must sum exactly to ${finalMarks}.
4. NO CODES IN QUESTIONS: Do not include code strings like "(Code 083)" in question text.
5. ${isPYQ ? 'Append authentic tags like [CBSE 2023].' : 'Do not append fake year tags.'}
6. ${isHindi ? 'Output strictly in pure Devnagari Hindi (मङ्गल font).' : 'Output in formal CBSE academic English.'}
7. Provide step-by-step marking scheme for every single question.
8. RETURN VALID JSON ONLY (no markdown fences).

School: ARDEN PROGRESSIVE SCHOOL
Exam: ${examType}
Class: ${selectedClass}
Subject: ${subject}
Max Marks: ${finalMarks}
Topics: ${syllabusTopics}

JSON Schema:
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
          "questionText": "Question text\\n(A) Option 1\\n(B) Option 2\\n(C) Option 3\\n(D) Option 4",
          "answerKey": "(A) Correct Option [1 Mark]"
        }
      ]
    }
  ],
  "blueprintSummary": [
    { "unitName": "Unit 1", "questionsCount": 4, "marksAssigned": 12 }
  ]
}`;

  onProgress({ stage: 3, text: `Gemini 3.6 Flash assembling official ${totalExpectedQuestions}-question paper...` });

  const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
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
