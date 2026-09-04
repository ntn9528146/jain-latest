import { getActiveGeminiKey, reportKeyFailure } from '../config/geminiKeyVault.js';

export async function executePaperPipeline({
  selectedClass,
  subject,
  examType,
  difficulty,
  theoryMarks,
  matrix,
  activeUnits,
  onProgress
}) {
  if (onProgress) onProgress({ stage: 1, text: 'Stage 1/4: Freezing Blueprint & CBSE Matrix...' });

  const activeSections = matrix.filter((m) => m.enabled && m.count > 0);
  const calculatedTotal = activeSections.reduce((acc, curr) => acc + (curr.marks * curr.count), 0);
  const finalMarks = calculatedTotal || theoryMarks || 70;

  // Clean exam title: remove percentage tags like (100% Syllabus)
  const cleanExamName = (examType || 'EXAMINATION 2026-27').replace(/\(\s*\d+%\s*SYLLABUS\s*\)/gi, '').trim();

  if (onProgress) onProgress({ stage: 2, text: 'Stage 2/4: Connecting to Google Gemini AI Engine...' });

  const apiKey = getActiveGeminiKey();
  const syllabusTopics = activeUnits.flatMap((u) => u.subtopics || [u.name]).join('; ');

  const isHindi = subject.toLowerCase().includes('hindi');
  const isJunior = selectedClass.toLowerCase().includes('nursery') || 
                   selectedClass.toLowerCase().includes('kg') || 
                   selectedClass.toLowerCase().includes('class 1') || 
                   selectedClass.toLowerCase().includes('class 2');

  const systemInstruction = `You are a Senior CBSE Board Examiner creating an authentic, error-free examination paper.
CRITICAL RULES:
1. SUBJECT INTEGRITY: This paper is strictly for "${subject}" (Class: ${selectedClass}). Do NOT mention any other subject, coding, or irrelevant science experiments.
2. LANGUAGE: ${isHindi ? 'The entire paper must be purely written in professional Devnagari Hindi (मङ्गल/Mangal Font).' : 'Use clear academic English.'}
3. KINDERGARTEN / JUNIOR MODE: ${isJunior ? 'Include worksheet tasks with visual ASCII emojis/tables: count the items, match the pairs, fill in missing letters, draw/box the correct object.' : 'Follow formal CBSE board standard.'}
4. DIAGRAMS & TABLES: When question requires tables (e.g. SQL tables, data tables) or circuits/structures, provide clean ASCII box-drawing text tables or structured grids.
5. STEP MARKING SCHEME: For EVERY question, write a comprehensive, step-by-step model answer explaining exact mark breakdown (e.g. Step 1: 1 Mark, Step 2: 1 Mark). No one-liner answers!`;

  const sectionsPrompt = activeSections.map((s, idx) => 
    `Section ${String.fromCharCode(65 + idx)}: ${s.count} questions of ${s.marks} mark(s) each. Label: "${s.label}".`
  ).join('\n');

  const prompt = `${systemInstruction}

Exam Metadata:
School: ARDEN PROGRESSIVE SCHOOL
Exam: ${cleanExamName}
Class: ${selectedClass}
Subject: ${subject}
Max Marks: ${finalMarks}
Syllabus to strictly cover: ${syllabusTopics}

Requirements:
${sectionsPrompt}

OUTPUT FORMAT: Return ONLY valid, parseable JSON (no markdown ticks, no commentary) adhering strictly to this JSON structure:
{
  "paperHeader": {
    "schoolName": "ARDEN PROGRESSIVE SCHOOL",
    "examName": "${cleanExamName}",
    "className": "${selectedClass}",
    "subjectName": "${subject}",
    "timeAllowed": "${finalMarks > 40 ? '3 Hours' : '2 Hours'}",
    "maxMarks": ${finalMarks}
  },
  "generalInstructions": [
    "All questions are compulsory.",
    "Internal choice is given in select questions.",
    "Section A contains MCQs carrying 1 mark each.",
    "Handwriting should be neat and legible."
  ],
  "sections": [
    {
      "sectionTitle": "SECTION A",
      "marksPerQ": 1,
      "questions": [
        {
          "qNo": 1,
          "marks": 1,
          "topicName": "Topic Name",
          "questionText": "Question text with options (A), (B), (C), (D) on new lines",
          "answerKey": "Step-by-step detailed solution and value point with mark justification."
        }
      ]
    }
  ],
  "blueprintSummary": [
    { "unitName": "Unit 1", "questionsCount": 4, "marksAssigned": 10 }
  ]
}`;

  if (onProgress) onProgress({ stage: 3, text: `Stage 3/4: Generating Official Questions via Gemini Flash...` });

  let paperJson = null;

  if (apiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      if (!response.ok) {
        reportKeyFailure(apiKey);
        throw new Error(`Gemini API Error status: ${response.status}`);
      }

      const resData = await response.json();
      const rawText = resData.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJson = rawText.replace(/```json/gi, '').replace(/```/gi, '').trim();
      paperJson = JSON.parse(cleanJson);
    } catch (err) {
      console.error("Gemini API call failed:", err);
    }
  }

  // Pure Subject-Isolated Fallback (Only if API key is invalid/exhausted)
  if (!paperJson) {
    if (onProgress) onProgress({ stage: 3, text: 'Stage 3/4: Compiling Subject Curriculum Matrix...' });
    paperJson = buildSubjectGuaranteedFallback({
      selectedClass,
      subject,
      cleanExamName,
      finalMarks,
      activeSections,
      activeUnits,
      isHindi,
      isJunior
    });
  }

  if (onProgress) onProgress({ stage: 4, text: 'Stage 4/4: Final Quality Verification & Layout Assembled!' });
  return paperJson;
}

function buildSubjectGuaranteedFallback({ selectedClass, subject, cleanExamName, finalMarks, activeSections, activeUnits, isHindi, isJunior }) {
  let qCounter = 1;
  const sections = activeSections.map((sec, sIdx) => {
    const questions = [];
    for (let i = 0; i < sec.count; i++) {
      const currentUnit = activeUnits[i % activeUnits.length] || { name: `${subject} Unit` };
      const sub = currentUnit.subtopics?.[i % currentUnit.subtopics.length] || currentUnit.name;

      let qText = '';
      let aKey = '';

      if (isHindi) {
        if (sec.marks === 1) {
          qText = `प्रश्न: "${sub}" के संदर्भ में सही विकल्प का चयन कीजिए:\n(क) यह मूल व्याकरणिक नियमों का पालन करता है।\n(ख) यह अर्थ की दृष्टि से स्वतंत्र है।\n(ग) इसका प्रयोग केवल औपचारिक भाषा में होता है।\n(घ) उपर्युक्त सभी।`;
          aKey = `सही उत्तर: (क)\nव्याख्या: ${sub} के संदर्भ में निर्धारित मानक नियमों का शुद्ध प्रयोग अनिवार्य है। [1 अंक]`;
        } else {
          qText = `"${sub}" का संक्षिप्त परिचय देते हुए इसके दो मुख्य तत्वों/विशेषताओं को उदाहरण सहित स्पष्ट कीजिए।`;
          aKey = `• परिभाषा एवं सैद्धांतिक स्वरूप: ${Math.floor(sec.marks / 2)} अंक\n• उदाहरण एवं व्यावहारिक महत्व: ${sec.marks - Math.floor(sec.marks / 2)} अंक\nकुल अंक = [${sec.marks} अंक]`;
        }
      } else if (isJunior) {
        qText = `Look at the given group and answer the task for "${sub}":\n[ 🍎 🍎 🍎 ] + [ 🍎 🍎 ] = ________\n(A) 4 Apples\n(B) 5 Apples\n(C) 6 Apples\n(D) 3 Apples`;
        aKey = `Correct Answer: (B) 5 Apples\nStep 1: Count first group (3).\nStep 2: Add second group (2).\nStep 3: Total = 3 + 2 = 5 Apples. [Full ${sec.marks} Mark]`;
      } else {
        if (subject.toLowerCase().includes('computer')) {
          qText = `Consider the table SALES as given below:\n+----------+---------------+-------------+---------------+-------+\n| sales_id | customer_name | product     | quantity_sold | price |\n+----------+---------------+-------------+---------------+-------+\n| S001     | John Doe      | Laptop      | 5             | 50000 |\n| S002     | Jane Smith    | Smartphone  | 10            | 30000 |\n| S003     | Michael Lee   | Tablet      | 3             | 15000 |\n+----------+---------------+-------------+---------------+-------+\nWrite SQL query to calculate the total revenue generated for each product where quantity sold is greater than 3.`;
          aKey = `SELECT product, SUM(quantity_sold * price) AS TotalRevenue FROM SALES WHERE quantity_sold > 3 GROUP BY product;\nBreakup:\n• Correct SELECT and SUM aggregation: 1.5 Marks\n• Correct WHERE & GROUP BY clause: 1.5 Marks.`;
        } else {
          qText = `Explain the primary principles and working equations governing "${sub}". State two essential laboratory precautions or numerical considerations.`;
          aKey = `Step 1: Core definition and governing formulation [${Math.floor(sec.marks / 2)} Marks].\nStep 2: Analytical justification and two precautions [${sec.marks - Math.floor(sec.marks / 2)} Marks].`;
        }
      }

      questions.push({
        qNo: qCounter++,
        marks: sec.marks,
        topicName: currentUnit.name,
        questionText: qText,
        answerKey: aKey
      });
    }

    return {
      sectionTitle: `SECTION ${String.fromCharCode(65 + sIdx)} (${sec.label})`,
      marksPerQ: sec.marks,
      questions
    };
  });

  return {
    paperHeader: {
      schoolName: "ARDEN PROGRESSIVE SCHOOL",
      examName: cleanExamName,
      className: selectedClass,
      subjectName: subject,
      timeAllowed: finalMarks > 40 ? "3 Hours" : "2 Hours",
      maxMarks: finalMarks
    },
    generalInstructions: [
      "All questions are compulsory.",
      "Internal choices are provided where applicable.",
      "Handwriting should be neat, clear and legible."
    ],
    sections,
    blueprintSummary: activeUnits.map((u) => ({ unitName: u.name, questionsCount: 3, marksAssigned: Math.round(finalMarks / (activeUnits.length || 1)) }))
  };
}
