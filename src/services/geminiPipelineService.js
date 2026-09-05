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
  const rawSub = String(options.subject || options.selectedSubject || 'Hindi Core');
  const subject = rawSub.replace(/\s*\([^)]*\)/g, '').trim();
  const examType = String(options.examType || options.examName || 'Pre-Board Examination').replace(/\(\s*\d+%\s*SYLLABUS\s*\)/gi, '').trim();
  const isPYQ = Boolean(options.isPYQ || options.includePYQ || examType.toLowerCase().includes('pyq'));
  const isHindi = subject.toLowerCase().includes('hindi') || rawSub.toLowerCase().includes('hindi');
  const isPracticalStudio = Boolean(options.isPractical || options.mode === 'practical' || examType.toLowerCase().includes('practical'));
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

  const secPrompt = activeSections.map((s, idx) => 
    `Section ${String.fromCharCode(65 + idx)}: Exactly ${s.count} Qs (${s.label})`
  ).join('\n');

  // Practical/Viva prompt customization vs Theory prompt
  const modeInstruction = isPracticalStudio
    ? (isHindi
        ? `MODE: CBSE व्यावहारिक/परियोजना मूल्यांकन (ALS & Portfolio). हिंदी में कोई प्रयोगशाला (Laboratory/Apparatus) प्रयोग नहीं होते हैं। आपको शुद्ध हिंदी में: (1) श्रवण एवं वाचन कौशल (ASL) प्रश्न, (2) परियोजना कार्य शीर्षक व शोध रूपरेखा, और (3) शिक्षक के लिए संपूर्ण 10 मौखिक (Viva-Voce) प्रश्न व उनके आदर्श उत्तर तैयार करने हैं।`
        : `MODE: CBSE Practical & Viva Voce Assessment. Generate genuine subject experiments/programs/viva questions. NO DUMMY PLACEHOLDERS.`)
    : `MODE: CBSE Official Board Examination. Complete theory paper.`;

  const prompt = `You are a Senior CBSE Chief Board Paper Setter & Evaluator for ${subject} (${selectedClass}).
${modeInstruction}

MANDATORY RULES:
1. QUESTION COUNT: Must have EXACTLY ${totalExpectedQuestions} questions, continuously numbered 1 to ${totalExpectedQuestions}.
2. BLUEPRINT:
${secPrompt}
3. MARKS SUM: Exactly ${finalMarks}.
4. LANGUAGE SPECIFICATION:
${isHindi 
  ? 'STRICTLY WRITE IN PURE DEVNAGARI HINDI (मङ्गल Font Style). Do not use English words in Hindi questions or solutions.' 
  : 'Write in high academic CBSE standard English.'}
5. EXHAUSTIVE MARKING SCHEME (NO SHORTCUTS / NO GENERAL HINTS):
   - For writing skills (Letter/Article/Notice): You MUST write the FULL model letter or essay in answerKey. DO NOT JUST GIVE FORMAT POINTS.
   - For numericals: Full formula + substitution + calculation steps + final unit.
   - For derivations: Complete line-by-line mathematical derivation.
   - For literature: Complete model answer addressing every part of the question.
   - For diagram-based physics/biology/chemistry questions: Write detailed labels for graphs and circuit parts.
6. NO DUMMY SAVED DATA: Compile everything freshly using official CBSE curriculum.
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
          "answerKey": "EXHAUSTIVE step-by-step complete solution"
        }
      ]
    }
  ],
  "blueprintSummary": [
    { "unitName": "Unit 1", "questionsCount": 4, "marksAssigned": 12 }
  ]
}`;

  onProgress({ stage: 3, text: `Gemini 3.6 Flash generating official ${totalExpectedQuestions} questions with deep answer key...` });

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

  // Auto-inject Vector Diagrams where diagrams are specified
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
