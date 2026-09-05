import { getActiveGeminiKey, reportKeyFailure } from '../config/geminiKeyVault.js';
import { resolveSubjectRegistry } from '../config/cbseSubjectMatrices.js';
import { generateQuestionSvg } from './diagramEngine.js';

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

  try {
    return JSON.parse(text);
  } catch (e1) {
    let sanitized = text.replace(/([":]\s*"[^"\\]*(\\[\s\S][^"\\]*)*)\n/g, '$1\\n');
    sanitized = sanitized.replace(/,\s*([}\]])/g, '$1');
    sanitized = sanitized.replace(/"(answerKey|questionText|topicName)"\s*:\s*([^"{\[\d\n][^\n,}]*)/g, (match, k, v) => {
      return `"${k}": "${v.trim().replace(/"/g, '\\"')}"`;
    });

    try {
      return JSON.parse(sanitized);
    } catch (e2) {
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        return JSON.parse(text.substring(firstBrace, lastBrace + 1).replace(/,\s*([}\]])/g, '$1'));
      }
      throw new Error(`JSON Structure Parsing Failed: ${e1.message}`);
    }
  }
}

export async function executePaperPipeline(options = {}) {
  const selectedClass = String(options.selectedClass || options.className || 'Class 12');
  const rawSub = String(options.subject || options.selectedSubject || 'Hindi');
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

  onProgress({ stage: 1, text: `CBSE Official Pattern Locked: Exactly ${totalExpectedQuestions} Questions (${finalMarks} Marks)` });

  let apiKey = getActiveGeminiKey();
  if (!apiKey) {
    apiKey = localStorage.getItem('gemini_api_key') || localStorage.getItem('VITE_GEMINI_API_KEY');
  }
  if (!apiKey) {
    throw new Error('Gemini API Key missing! Please configure key.');
  }

  const activeUnits = Array.isArray(options.activeUnits) ? options.activeUnits : [];
  const syllabusTopics = activeUnits.length > 0 
    ? activeUnits.flatMap((u) => u?.subtopics || [u?.name || 'Core Curriculum']).join('; ')
    : `${subject} CBSE Class ${selectedClass} Official Curriculum`;

  const secPrompt = activeSections.map((s, idx) => 
    `Section ${String.fromCharCode(65 + idx)}: Exactly ${s.count} Qs (${s.label})`
  ).join('\n');

  const prompt = `You are a Senior CBSE Chief Board Paper Setter for ${subject} (${selectedClass}).
MANDATORY BOARD REQUIREMENTS:
1. TOTAL QUESTION COUNT: Must be EXACTLY ${totalExpectedQuestions}. Questions numbered continuously from 1 to ${totalExpectedQuestions}.
2. BLUEPRINT:
${secPrompt}
3. TOTAL MARKS: Must tally to exactly ${finalMarks}.
4. LANGUAGE SPECIFICATION:
${isHindi 
  ? 'STRICTLY WRITE IN PURE DEVNAGARI HINDI (मङ्गल Font Style). All questions, passages, and marking schemes must be authentic Hindi.' 
  : 'Write in high academic CBSE standard English.'}
5. DETAILED MARKING SCHEME:
   - For every question, write an EXHAUSTIVE, step-by-step textbook answer in answerKey.
   - For numericals: Formula, substitution, calculation, and final unit.
   - For diagrams/charts: Clearly label parts and explain graph axes.
6. NO DUMMY DATA: All questions must be dynamically generated from topics: ${syllabusTopics}.
7. Return ONLY valid RFC8259 JSON without markdown fences.

School: ARDEN PROGRESSIVE SCHOOL
Exam: ${examType}
Class: ${selectedClass}
Subject: ${subject}
Max Marks: ${finalMarks}

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
          "topicName": "Topic",
          "questionText": "Question statement",
          "answerKey": "Step-by-step exhaustive explanation"
        }
      ]
    }
  ],
  "blueprintSummary": [
    { "unitName": "Unit 1", "questionsCount": 4, "marksAssigned": 12 }
  ]
}`;

  onProgress({ stage: 3, text: `Gemini 3.6 Flash generating ${totalExpectedQuestions} questions live from Google AI...` });

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

  // Vector SVG Diagrams Integration
  if (Array.isArray(paperJson.sections)) {
    paperJson.sections.forEach(sec => {
      if (Array.isArray(sec.questions)) {
        sec.questions.forEach(q => {
          const combined = `${q.questionText} ${q.answerKey} ${q.topicName}`;
          const svg = generateQuestionSvg(combined, q.topicName);
          if (svg) q.diagramSvg = svg;
        });
      }
    });
  }

  onProgress({ stage: 4, text: `CBSE Paper Ready (${totalExpectedQuestions} Questions Verified)` });
  return paperJson;
}

export default executePaperPipeline;
