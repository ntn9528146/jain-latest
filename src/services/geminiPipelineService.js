import { getActiveGeminiKey, reportKeyFailure } from '../config/geminiKeyVault.js';

export function getOfficialCbseMatrix(subject = '', selectedClass = '', targetMarks = null) {
  const sub = subject.toLowerCase();
  const cls = selectedClass.toLowerCase();

  if (sub.includes('402') || sub.includes('417') || sub.includes('information tech') || sub.includes('artificial intel') || targetMarks === 50) {
    return {
      marks: 50,
      matrix: [
        { label: 'Section A: Objective Type', count: 6, marks: 1, enabled: true },
        { label: 'Section A: VSA Objective', count: 5, marks: 2, enabled: true },
        { label: 'Section B: Short Answer', count: 6, marks: 2, enabled: true },
        { label: 'Section B: Competency / LA', count: 4, marks: 4, enabled: true }
      ]
    };
  }

  if (sub.includes('math')) {
    return {
      marks: 80,
      matrix: [
        { label: 'Section A: MCQs & AR', count: 20, marks: 1, enabled: true },
        { label: 'Section B: VSA', count: 5, marks: 2, enabled: true },
        { label: 'Section C: SA - I', count: 6, marks: 3, enabled: true },
        { label: 'Section D: LA', count: 4, marks: 5, enabled: true },
        { label: 'Section E: Case Study', count: 3, marks: 4, enabled: true }
      ]
    };
  }

  if (sub.includes('computer') || sub.includes('083') || sub.includes('informatics') || sub.includes('ip')) {
    return {
      marks: 70,
      matrix: [
        { label: 'Section A: Objective MCQs', count: 21, marks: 1, enabled: true },
        { label: 'Section B: SA - I', count: 7, marks: 2, enabled: true },
        { label: 'Section C: SA - II', count: 3, marks: 3, enabled: true },
        { label: 'Section D: LA - I (Programming)', count: 4, marks: 4, enabled: true },
        { label: 'Section E: Case Study / LA - II', count: 2, marks: 5, enabled: true }
      ]
    };
  }

  if (sub.includes('science') && !sub.includes('computer') && (cls.includes('9') || cls.includes('10'))) {
    return {
      marks: 80,
      matrix: [
        { label: 'Section A: MCQs', count: 20, marks: 1, enabled: true },
        { label: 'Section B: VSA', count: 6, marks: 2, enabled: true },
        { label: 'Section C: SA', count: 7, marks: 3, enabled: true },
        { label: 'Section D: LA', count: 3, marks: 5, enabled: true },
        { label: 'Section E: Case Study', count: 3, marks: 4, enabled: true }
      ]
    };
  }

  if (sub.includes('physics') || sub.includes('chemistry') || sub.includes('bio')) {
    return {
      marks: 70,
      matrix: [
        { label: 'Section A: MCQs', count: 16, marks: 1, enabled: true },
        { label: 'Section B: SA - I', count: 5, marks: 2, enabled: true },
        { label: 'Section C: SA - II', count: 7, marks: 3, enabled: true },
        { label: 'Section D: Case Study', count: 2, marks: 4, enabled: true },
        { label: 'Section E: LA', count: 3, marks: 5, enabled: true }
      ]
    };
  }

  return {
    marks: targetMarks || 80,
    matrix: [
      { label: 'Section A: MCQs', count: 20, marks: 1, enabled: true },
      { label: 'Section B: SA - I', count: 4, marks: 3, enabled: true },
      { label: 'Section C: SA - II', count: 6, marks: 4, enabled: true },
      { label: 'Section D: LA', count: 4, marks: 6, enabled: true }
    ]
  };
}

function cleanAndRepairJson(raw) {
  let text = raw.replace(/```json/gi, '').replace(/```/gi, '').trim();

  // Fix unquoted string values like "answerKey": (i) ...
  text = text.replace(/"(answerKey|questionText|topicName)"\s*:\s*([^"{\[\d\n][^\n,}]*)/g, (match, key, val) => {
    const trimmedVal = val.trim().replace(/"/g, '\\"');
    return `"${key}": "${trimmedVal}"`;
  });

  try {
    return JSON.parse(text);
  } catch (err) {
    // Second-pass lenient sanitization for unescaped newlines inside strings
    const sanitized = text.replace(/(?<=:\s*"[^"]*)\n(?=[^"]*")/g, '\\n');
    return JSON.parse(sanitized);
  }
}

export const executePaperPipeline = async (options = {}) => {
  const selectedClass = String(options.selectedClass || options.className || 'Class 12');
  const rawSub = String(options.subject || options.selectedSubject || 'Hindi');
  const subject = rawSub.replace(/\s*\([^)]*\)/g, '').trim();
  const examType = String(options.examType || options.examName || 'Pre-Board Examination').replace(/\(\s*\d+%\s*SYLLABUS\s*\)/gi, '').trim();
  const isPYQ = Boolean(options.isPYQ || options.includePYQ || examType.toLowerCase().includes('pyq'));
  const isHindi = subject.toLowerCase().includes('hindi') || rawSub.toLowerCase().includes('hindi');
  const onProgress = typeof options.onProgress === 'function' ? options.onProgress : () => {};

  const resolved = getOfficialCbseMatrix(subject, selectedClass, options.theoryMarks || options.maxMarks);
  const activeSections = Array.isArray(options.matrix) && options.matrix.filter(m => m && m.enabled && m.count > 0).length > 0
    ? options.matrix.filter(m => m && m.enabled && m.count > 0)
    : resolved.matrix;

  const finalMarks = activeSections.reduce((acc, curr) => acc + (Number(curr.marks || 1) * Number(curr.count || 1)), 0) || resolved.marks;
  const totalExpectedQuestions = activeSections.reduce((acc, curr) => acc + Number(curr.count || 0), 0);

  onProgress({ stage: 1, text: `CBSE ${selectedClass} Pattern Locked (${totalExpectedQuestions} Qs / ${finalMarks} Marks)` });

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
    : `${subject} CBSE Class ${selectedClass} Official Syllabus`;

  const secPrompt = activeSections.map((s, idx) => 
    `Section ${String.fromCharCode(65 + idx)}: Exactly ${s.count} Qs of ${s.marks} Marks each (${s.label})`
  ).join('\n');

  const prompt = `You are a Senior CBSE Board Examiner for ${subject} (${selectedClass}).
MANDATORY RULES:
1. QUESTION COUNT: Total questions must be EXACTLY ${totalExpectedQuestions}.
2. NO SUBJECT CODES: Do not include codes like "(Code 002)" in question text.
3. ${isPYQ ? 'Append authentic past year tags like [CBSE 2023].' : 'Do not append fake year tags.'}
4. Section A MCQs must have question stem and 4 options labeled (A), (B), (C), (D).
5. ${isHindi ? 'Write purely in Devnagari Hindi (मङ्गल font).' : 'Write in standard academic English.'}
6. STRICT JSON COMPLIANCE: Every string value in "questionText" and "answerKey" MUST be enclosed in double quotes. Do not output raw unquoted text after colons!

School: ARDEN PROGRESSIVE SCHOOL
Exam: ${examType}
Class: ${selectedClass}
Subject: ${subject}
Max Marks: ${finalMarks}
Topics: ${syllabusTopics}

Layout:
${secPrompt}

Return ONLY valid JSON format:
{
  "paperHeader": {
    "schoolName": "ARDEN PROGRESSIVE SCHOOL",
    "examName": "${examType}",
    "className": "${selectedClass}",
    "subjectName": "${subject}",
    "timeAllowed": "${finalMarks > 40 ? '3 Hours' : '2 Hours'}",
    "maxMarks": ${finalMarks}
  },
  "generalInstructions": [
    "${isHindi ? 'सभी प्रश्न अनिवार्य हैं।' : 'All questions are compulsory.'}",
    "${isHindi ? 'खंड क के सभी प्रश्न 1 अंक के हैं।' : 'Section A carries 1 mark each.'}"
  ],
  "sections": [
    {
      "sectionTitle": "SECTION A",
      "marksPerQ": 1,
      "questions": [
        {
          "qNo": 1,
          "marks": 1,
          "topicName": "Topic",
          "questionText": "Question stem?\\n(A) Option 1\\n(B) Option 2\\n(C) Option 3\\n(D) Option 4",
          "answerKey": "(A) Correct Option and marking point"
        }
      ]
    }
  ],
  "blueprintSummary": [
    { "unitName": "Unit 1", "questionsCount": 4, "marksAssigned": 12 }
  ]
}`;

  onProgress({ stage: 3, text: `Gemini 3.6 Flash generating CBSE Dossier...` });

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

  onProgress({ stage: 4, text: 'CBSE Paper Assembled!' });
  return paperJson;
};

export default executePaperPipeline;
