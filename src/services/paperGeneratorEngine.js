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
      const unit = activeUnits[i % activeUnits.length] || { name: `${subject} Unit` };
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
  const isCS = subject.toLowerCase().includes('computer') || subject.toLowerCase().includes('it');
  const isMath = subject.toLowerCase().includes('math');

  if (typeId === 'mcq') {
    if (isCS) {
      const csQuestions = [
        {
          q: `Which of the following Python modes will open a file for both reading and writing in binary format without truncating existing data?`,
          opts: `(A) 'r+'\n(B) 'rb+'\n(C) 'wb+'\n(D) 'ab'`,
          ans: `(B) 'rb+'\nExplanation: 'rb+' opens the binary file in read-and-write mode with file pointer at the beginning without truncating data.`
        },
        {
          q: `Identify the valid SQL clause used to filter grouped rows in an aggregate query:`,
          opts: `(A) WHERE\n(B) ORDER BY\n(C) HAVING\n(D) GROUP FILTER`,
          ans: `(C) HAVING\nExplanation: The HAVING clause is specifically evaluated after GROUP BY to filter grouped results.`
        },
        {
          q: `In a Python stack implementation using a list, which built-in method represents the POP operation?`,
          opts: `(A) stack.remove()\n(B) stack.delete()\n(C) stack.pop()\n(D) stack.push()`,
          ans: `(C) stack.pop()\nExplanation: In Python lists, pop() removes and returns the last element, conforming to LIFO.`
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
      questionText: `Which of the following statements correctly applies to "${topic}"?\n(A) It satisfies the fundamental conservation law under isolated state.\n(B) It varies inversely with the primary parameter.\n(C) It remains independent of ambient perturbation.\n(D) Both (A) and (B).`,
      answerKey: `Correct Option: (A)\nExplanation: Governed by the foundational law of ${topic}.`
    };
  }

  if (typeId === 'ar') {
    return {
      qNo, marks, topicName: unitName,
      questionText: `Given below are Assertion (A) and Reason (R):\nAssertion (A): Practical evaluation of "${topic}" is essential during system analysis.\nReason (R): It dictates the boundary constraints under standard testing conditions.\nSelect the correct option:\n(A) Both (A) and (R) are true and (R) is the correct explanation of (A).\n(B) Both (A) and (R) are true but (R) is not the correct explanation of (A).\n(C) (A) is true but (R) is false.\n(D) Both (A) and (R) are false.`,
      answerKey: `Correct Option: (A)\nExplanation: Both assertions and functional reasons are empirically verified.`
    };
  }

  if (typeId === 'vsa') {
    return {
      qNo, marks: 2, topicName: unitName,
      questionText: `State the primary purpose of "${topic}". Mention two key rules or equations associated with its practical application in ${subject}.`,
      answerKey: `• Core definition and working objective: 1 Mark.\n• Two governing rules/equations (0.5 + 0.5): 1 Mark.`
    };
  }

  if (typeId === 'sa') {
    return {
      qNo, marks: 3, topicName: unitName,
      questionText: `Explain the working principle of "${topic}". Illustrate your answer with a neat labeled circuit diagram, mathematical proof, or code block as applicable to ${subject}.`,
      answerKey: `• Conceptual statement: 1 Mark.\n• Diagram/proof/code illustration: 1 Mark.\n• Analysis and final derivation step: 1 Mark.`
    };
  }

  if (typeId === 'case_study') {
    return {
      qNo, marks: 4, topicName: unitName,
      questionText: `Read the following source-based case study carefully and answer the questions:\n"During an operational setup involving ${topic}, unexpected deviations were observed when the operational frequency was adjusted by 25%."\n(i) Identify the governing principle illustrated here. [1 Mark]\n(ii) State the consequence of this variation on output efficiency. [1 Mark]\n(iii) Suggest two corrective adjustments to stabilize the system. [2 Marks]`,
      answerKey: `(i) Governing Principle: ${topic} [1 Mark].\n(ii) Effect: Causes harmonic attenuation [1 Mark].\n(iii) Remedial measures (1 Mark each): Input calibration and filtering [2 Marks].`
    };
  }

  return {
    qNo, marks: 5, topicName: unitName,
    questionText: `(a) Derive or formulate the complete theoretical expression for "${topic}".\n(b) When configured under constrained boundary conditions, analyze the probable failure modes and provide a step-by-step resolution protocol.`,
    answerKey: `(a) Comprehensive derivation/model with notation: 3 Marks.\n(b) Failure mode diagnosis (1M) and remediation protocol (1M): 2 Marks.`
  };
}
