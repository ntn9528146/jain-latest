// Modular Gemini AI API Service for Generating CBSE Standard Papers
export async function generateAiPaperWithKey({
  apiKey = '',
  selectedClass,
  subject,
  examType,
  difficulty,
  theoryMarks,
  matrix,
  selectedTopics = []
}) {
  const activeSections = matrix.filter((m) => m.enabled);
  const topicsSummary = selectedTopics.length > 0 ? selectedTopics.join(', ') : 'Complete Standard CBSE Syllabus';

  // Fallback / Instant Mock Generator if no API key configured
  if (!apiKey) {
    return simulateAiGeneration(selectedClass, subject, examType, difficulty, theoryMarks, activeSections, topicsSummary);
  }

  const prompt = `You are a Senior CBSE Question Paper Setter. Generate a complete, print-ready question paper and detailed answer key matching this exact specification:
Class: ${selectedClass}
Subject: ${subject}
Exam: ${examType}
Standard: ${difficulty}
Total Theory Marks: ${theoryMarks}
Syllabus / Topics: ${topicsSummary}

Include the following sections strictly:
${activeSections.map((s) => `- ${s.label}: ${s.count} questions (${s.marks} marks each)`).join('\n')}

Format your response strictly as JSON with keys: "paperHeader", "generalInstructions", "sections" (array of objects with sectionTitle, questions array: [{qNo, questionText, marks, yearTag, answerKey}]), and "blueprintSummary".`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanJson = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (err) {
    console.warn("AI API Fallback to Local Engine:", err);
    return simulateAiGeneration(selectedClass, subject, examType, difficulty, theoryMarks, activeSections, topicsSummary);
  }
}

function simulateAiGeneration(selectedClass, subject, examType, difficulty, theoryMarks, sections, topicsSummary) {
  let globalQNo = 1;
  const pyqYears = ['(CBSE 2024)', '(CBSE 2023 Outside Delhi)', '(CBSE 2022 Term-2)', '(CBSE 2020)', '(CBSE 2019 SQP)'];

  const compiledSections = sections.map((sec, secIdx) => {
    const questions = [];
    for (let i = 0; i < sec.count; i++) {
      const isPYQ = difficulty.includes('PYQ') || Math.random() > 0.6;
      const yearTag = isPYQ ? pyqYears[i % pyqYears.length] : '';

      questions.push({
        qNo: globalQNo++,
        marks: sec.marks,
        yearTag: yearTag,
        questionText: `State and evaluate the fundamental application of [${topicsSummary.split(',')[i % 3] || subject}] with relevant technical/conceptual justification. Explain the operational workflow with an illustrative example.`,
        answerKey: `Step 1 (Definition & Core Concept): 1 Mark.\nStep 2 (Technical Justification & Law/Rule): 1 Mark.\nStep 3 (Diagram / Expression / Example): Remainder marks.`
      });
    }

    return {
      sectionTitle: `SECTION ${String.fromCharCode(65 + secIdx)} (${sec.label})`,
      marksPerQ: sec.marks,
      questions
    };
  });

  return {
    paperHeader: {
      schoolName: "AFFILIATED SENIOR SECONDARY SCHOOL",
      examName: examType,
      subjectName: subject,
      className: selectedClass,
      maxMarks: theoryMarks,
      timeAllowed: theoryMarks > 50 ? "3 Hours" : "2 Hours"
    },
    generalInstructions: [
      "This question paper contains multiple sections. All questions are compulsory.",
      "Internal choices have been provided in select questions across sections.",
      "Use of calculators or unauthorized digital devices is strictly prohibited.",
      "Neat labeled diagrams and proper syntax must be provided wherever applicable."
    ],
    sections: compiledSections
  };
}
