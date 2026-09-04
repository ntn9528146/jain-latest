export function buildComprehensiveCbsePaper({
  selectedClass = 'Class 12',
  subject = 'Computer Science (Code 083)',
  examType = 'Pre-Board Examination',
  difficulty = 'Standard CBSE Balanced',
  theoryMarks = 70,
  matrix = [],
  activeUnits = []
}) {
  const activeSections = matrix.filter((m) => m.enabled && m.count > 0);
  let globalQNo = 1;

  const topicDistribution = {};
  activeUnits.forEach((u) => {
    topicDistribution[u.name] = { unitName: u.name, questionsCount: 0, marksAssigned: 0 };
  });

  const compiledSections = activeSections.map((sec, sIdx) => {
    const questions = [];

    for (let i = 0; i < sec.count; i++) {
      const unit = activeUnits[i % activeUnits.length] || { name: `${subject} Core Unit` };
      const sub = (unit.subtopics && unit.subtopics.length > 0)
        ? unit.subtopics[i % unit.subtopics.length]
        : unit.name;

      if (topicDistribution[unit.name]) {
        topicDistribution[unit.name].questionsCount += 1;
        topicDistribution[unit.name].marksAssigned += sec.marks;
      }

      const qObj = generateRealisticQuestion({
        qNo: globalQNo++,
        typeId: sec.id,
        marks: sec.marks,
        subject,
        topic: sub,
        unitName: unit.name,
        index: i
      });

      questions.push(qObj);
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
      examName: examType,
      subjectName: subject,
      className: selectedClass,
      maxMarks: theoryMarks,
      timeAllowed: theoryMarks > 50 ? "3 Hours" : "2 Hours"
    },
    generalInstructions: [
      "All questions are compulsory. However, internal choices have been provided in select questions.",
      "Section A consists of multiple choice questions carrying 1 mark each.",
      "Section B contains Very Short Answer questions carrying 2 marks each.",
      "Section C contains Short Answer questions carrying 3 marks each.",
      "Section D contains Long Answer questions carrying 5 marks each.",
      "Section E contains Case-Based/Integrated questions carrying 4 marks each.",
      "Use of calculators or unauthorized digital media is strictly prohibited."
    ],
    sections: compiledSections,
    blueprintSummary: Object.values(topicDistribution)
  };
}

function generateRealisticQuestion({ qNo, typeId, marks, subject, topic, unitName, index }) {
  const isCS = subject.toLowerCase().includes('computer') || subject.toLowerCase().includes('it') || subject.toLowerCase().includes('informa');
  const isMath = subject.toLowerCase().includes('math');
  const isScience = subject.toLowerCase().includes('physics') || subject.toLowerCase().includes('science') || subject.toLowerCase().includes('chem');

  if (typeId === 'mcq') {
    if (isCS) {
      const csQuestions = [
        {
          q: `Which of the following Python modes will open a file for both reading and writing in binary format without truncating existing data?`,
          opts: `(A) 'r+'\n(B) 'rb+'\n(C) 'wb+'\n(D) 'ab'`,
          ans: `(B) 'rb+'\nExplanation: 'rb+' opens the binary file in read-and-write mode with file pointer at the beginning without truncating data.`
        },
        {
          q: `Identify the valid SQL clause used to filter grouped rows in a query:`,
          opts: `(A) WHERE\n(B) ORDER BY\n(C) HAVING\n(D) GROUP FILTER`,
          ans: `(C) HAVING\nExplanation: HAVING clause is applied after grouping to filter aggregated results.`
        },
        {
          q: `In a Python stack implementation using a list, which built-in method represents the POP operation?`,
          opts: `(A) stack.remove()\n(B) stack.delete()\n(C) stack.pop()\n(D) stack.push()`,
          ans: `(C) stack.pop()\nExplanation: In Python, list.pop() deletes and returns the top-most item of the stack.`
        }
      ];
      const item = csQuestions[index % csQuestions.length];
      return {
        qNo, marks, topicName: unitName,
        questionText: `${item.q}\n${item.opts}`,
        answerKey: `Correct Option: ${item.ans}`
      };
    }

    if (isMath) {
      return {
        qNo, marks, topicName: unitName,
        questionText: `Evaluate the domain of the function f(x) = sin⁻¹(2x - 1):\n(A) [0, 1]\n(B) [-1, 1]\n(C) [0, π]\n(D) (-1, 1)`,
        answerKey: `Correct Option: (A) [0, 1]\nExplanation: -1 ≤ 2x - 1 ≤ 1 => 0 ≤ 2x ≤ 2 => 0 ≤ x ≤ 1.`
      };
    }

    return {
      qNo, marks, topicName: unitName,
      questionText: `Which of the following statements correctly applies to "${topic}" under standard CBSE guidelines?\n(A) It directly follows the fundamental conservation law.\n(B) It varies inversely with the primary parameter.\n(C) It remains independent of external perturbations.\n(D) Both (A) and (B).`,
      answerKey: `Correct Option: (A)\nExplanation: According to the core principle of ${topic}, the fundamental conservation criterion is satisfied.`
    };
  }

  if (typeId === 'ar') {
    return {
      qNo, marks, topicName: unitName,
      questionText: `Given below are Assertion (A) and Reason (R):\nAssertion (A): The operational validity of "${topic}" is essential during system analysis.\nReason (R): It governs the underlying state transitions under isolated conditions.\nSelect the correct answer:\n(A) Both (A) and (R) are true and (R) is the correct explanation of (A).\n(B) Both (A) and (R) are true but (R) is not the correct explanation of (A).\n(C) (A) is true but (R) is false.\n(D) Both (A) and (R) are false.`,
      answerKey: `Correct Option: (A)\nExplanation: Both assertions and analytical reasons are factually verified.`
    };
  }

  if (typeId === 'vsa') {
    return {
      qNo, marks: 2, topicName: unitName,
      questionText: `State the primary purpose of "${topic}". Mention two key rules or equations associated with its practical application in ${subject}.`,
      answerKey: `• Definition and purpose of ${topic}: 1 Mark.\n• Two fundamental equations/rules (0.5 + 0.5): 1 Mark.`
    };
  }

  if (typeId === 'sa') {
    return {
      qNo, marks: 3, topicName: unitName,
      questionText: `Explain the detailed working methodology of "${topic}". Illustrate your answer with a neat labeled circuit diagram, mathematical proof, or code block as relevant to ${subject}.`,
      answerKey: `• Conceptual statement and working principle: 1 Mark.\n• Well-labeled diagram / expression / code: 1 Mark.\n• Practical significance and final derivation step: 1 Mark.`
    };
  }

  if (typeId === 'case_study') {
    return {
      qNo, marks: 4, topicName: unitName,
      questionText: `Read the following source-based excerpt carefully and answer the questions:\n"During an operational setup involving ${topic}, an engineer recorded unexpected variations when the input parameters were increased by 50%."\n(i) Identify the governing theorem or function illustrated in this scenario. [1 Mark]\n(ii) State the consequence of this variation on output efficiency. [1 Mark]\n(iii) Suggest two corrective adjustments to stabilize the observed reading. [2 Marks]`,
      answerKey: `(i) Governing Principle: ${topic} [1 Mark].\n(ii) Impact Analysis: Causes non-linear distortion [1 Mark].\n(iii) Two corrective measures (1 Mark each): Proper impedance matching and noise filtering [2 Marks].`
    };
  }

  return {
    qNo, marks: 5, topicName: unitName,
    questionText: `(a) Derive or formulate the complete theoretical expression for "${topic}" from fundamental principles.\n(b) A system configured according to this concept is deployed under edge constraints. Analyze the failure modes and write the comprehensive step-by-step resolution protocol.`,
    answerKey: `(a) Detailed step-by-step derivation/formulation with diagrams: 3 Marks.\n(b) Edge failure diagnosis (1M) and remediation strategy (1M): 2 Marks.`
  };
}
