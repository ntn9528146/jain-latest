// Official CBSE Board Structure Registry (Classes 9 to 12) - Session 2025-26

export const CBSE_REGISTRY = {
  // 1. Accountancy (Code 055) - Exactly 34 Qs, 80 Marks
  accountancy: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "This question paper contains 34 questions. All questions are compulsory.",
      "This question paper is divided into two parts, Part A and B.",
      "Part - A is compulsory for all candidates.",
      "Part - B has two options: (i) Analysis of Financial Statements and (ii) Computerised Accounting.",
      "Question 1 to 16 and 27 to 30 carry 1 mark each.",
      "Questions 17 to 20, 31 and 32 carry 3 marks each.",
      "Questions from 21, 22 and 33 carry 4 marks each.",
      "Questions from 23 to 26 and 34 carry 6 marks each."
    ],
    matrix: [
      { label: "Part A & B: Objective MCQs (Q1-16 & Q27-30)", count: 20, marks: 1, enabled: true },
      { label: "Part A & B: Short Answer Type I (Q17-20, Q31, Q32)", count: 6, marks: 3, enabled: true },
      { label: "Part A & B: Short Answer Type II (Q21, Q22, Q33)", count: 3, marks: 4, enabled: true },
      { label: "Part A & B: Long Answer Type (Q23-26, Q34)", count: 5, marks: 6, enabled: true }
    ]
  },

  // 2. Business Studies (Code 054) - Exactly 34 Qs, 80 Marks
  bst: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "This question paper contains 34 questions. All questions are compulsory.",
      "Marks are indicated against each question.",
      "Answers should be brief and to the point.",
      "Answers to the questions carrying 3 marks may be from 50 to 75 words.",
      "Answers to the questions carrying 4 marks may be about 150 words.",
      "Answers to the questions carrying 6 marks may be about 200 words."
    ],
    matrix: [
      { label: "Objective Type MCQs (Q1 to Q20)", count: 20, marks: 1, enabled: true },
      { label: "Short Answer Type (Q21 to Q24)", count: 4, marks: 3, enabled: true },
      { label: "Short Answer Type (Q25 to Q30)", count: 6, marks: 4, enabled: true },
      { label: "Long Answer Type (Q31 to Q34)", count: 4, marks: 6, enabled: true }
    ]
  },

  // 3. Economics (Code 030) - Exactly 34 Qs, 80 Marks
  economics: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "This question paper contains two sections: Section A – Macro Economics and Section B – Indian Economic Development.",
      "This paper contains 20 Multiple Choice Questions of 1 mark each.",
      "This paper contains 4 Short Answer Questions of 3 marks each (60-80 words).",
      "This paper contains 6 Short Answer Questions of 4 marks each (80-100 words).",
      "This paper contains 4 Long Answer Questions of 6 marks each (100-150 words)."
    ],
    matrix: [
      { label: "Macro & Indian Eco: MCQs (20 Questions)", count: 20, marks: 1, enabled: true },
      { label: "Macro & Indian Eco: SA Type I (4 Questions)", count: 4, marks: 3, enabled: true },
      { label: "Macro & Indian Eco: SA Type II (6 Questions)", count: 6, marks: 4, enabled: true },
      { label: "Macro & Indian Eco: LA Type (4 Questions)", count: 4, marks: 6, enabled: true }
    ]
  },

  // 4. Mathematics (Code 041) & Applied Maths (Code 241) (Classes 9, 10, 11, 12) - Exactly 38 Qs, 80 Marks
  math: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "This question paper contains 38 questions. All Questions are compulsory.",
      "This Question Paper is divided into 5 Sections A, B, C, D and E.",
      "In Section A, Question numbers 1-18 are MCQs and 19-20 are Assertion-Reason based questions of 1 mark each.",
      "In Section B, Question numbers 21-25 are Very Short Answer (VSA) carrying 02 marks each.",
      "In Section C, Question numbers 26-31 are Short Answer (SA) carrying 03 marks each.",
      "In Section D, Question numbers 32-35 are Long Answer (LA) carrying 05 marks each.",
      "In Section E, Question numbers 36-38 are Case study-based questions carrying 4 marks each."
    ],
    matrix: [
      { label: "Section A: MCQs (Q1-18) & A-R (Q19-20)", count: 20, marks: 1, enabled: true },
      { label: "Section B: Very Short Answer VSA (Q21-25)", count: 5, marks: 2, enabled: true },
      { label: "Section C: Short Answer SA (Q26-31)", count: 6, marks: 3, enabled: true },
      { label: "Section D: Long Answer LA (Q32-35)", count: 4, marks: 5, enabled: true },
      { label: "Section E: Case Study Based (Q36-38)", count: 3, marks: 4, enabled: true }
    ]
  },

  // 5. Senior Sciences (Physics 042, Chemistry 043, Biology 044) - Exactly 33 Qs, 70 Marks
  science12: {
    marks: 70,
    time: "3 Hours",
    instructions: [
      "There are 33 questions in this question paper with internal choice. All questions are compulsory.",
      "Section A consists of 16 multiple-choice questions carrying 1 mark each.",
      "Section B consists of 5 short answer questions carrying 2 marks each.",
      "Section C consists of 7 short answer questions carrying 3 marks each.",
      "Section D consists of 2 case-based questions carrying 4 marks each.",
      "Section E consists of 3 long answer questions carrying 5 marks each."
    ],
    matrix: [
      { label: "Section A: MCQs & Assertion-Reason (Q1 to Q16)", count: 16, marks: 1, enabled: true },
      { label: "Section B: SA Type I (Q17 to Q21)", count: 5, marks: 2, enabled: true },
      { label: "Section C: SA Type II (Q22 to Q28)", count: 7, marks: 3, enabled: true },
      { label: "Section D: Case-Based Questions (Q29 to Q30)", count: 2, marks: 4, enabled: true },
      { label: "Section E: Long Answer LA (Q31 to Q33)", count: 3, marks: 5, enabled: true }
    ]
  },

  // 6. Science Class 10 (Code 086) & Class 9 - Exactly 39 Qs, 80 Marks
  science10: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "This question paper consists of 39 questions in 3 sections. Section A is Biology, Section B is Chemistry and Section C is Physics.",
      "All questions are compulsory. However, an internal choice is provided in some questions."
    ],
    matrix: [
      { label: "Section A: Biology (MCQs, VSA, SA, LA, Case-Based)", count: 13, marks: 2, enabled: true },
      { label: "Section B: Chemistry (MCQs, VSA, SA, LA, Case-Based)", count: 13, marks: 2, enabled: true },
      { label: "Section C: Physics (MCQs, VSA, SA, LA, Case-Based)", count: 13, marks: 2.15, enabled: true }
    ]
  },

  // 7. Computer Science Class 12 (083) & Class 11 - Exactly 37 Qs, 70 Marks
  cs: {
    marks: 70,
    time: "3 Hours",
    instructions: [
      "This question paper contains 37 questions. All questions are compulsory.",
      "The paper is divided into 5 Sections: A, B, C, D and E.",
      "Section A consists of 21 questions (1 to 21) carrying 1 Mark each.",
      "Section B consists of 7 questions (22 to 28) carrying 2 Marks each.",
      "Section C consists of 3 questions (29 to 31) carrying 3 Marks each.",
      "Section D consists of 4 questions (32 to 35) carrying 4 Marks each.",
      "Section E consists of 2 questions (36 to 37) carrying 5 Marks each.",
      "All programming questions are to be answered using Python Language only."
    ],
    matrix: [
      { label: "Section A: Objective MCQs (Q1 to Q21)", count: 21, marks: 1, enabled: true },
      { label: "Section B: Short Answer Type I (Q22 to Q28)", count: 7, marks: 2, enabled: true },
      { label: "Section C: Short Answer Type II (Q29 to Q31)", count: 3, marks: 3, enabled: true },
      { label: "Section D: Programming / LA (Q32 to Q35)", count: 4, marks: 4, enabled: true },
      { label: "Section E: Case Study / Code Analysis (Q36 to Q37)", count: 2, marks: 5, enabled: true }
    ]
  },

  // 8. Informatics Practices Class 12 (065) & Class 11 - Exactly 37 Qs, 70 Marks
  ip: {
    marks: 70,
    time: "3 Hours",
    instructions: [
      "The examination paper contains five sections: Section A to Section E.",
      "Section A consists of 21 questions (1 to 21) carrying 1 Mark each.",
      "Section B consists of 7 questions (22 to 28) carrying 2 Marks each.",
      "Section C consists of 4 questions (29 to 32) carrying 3 Marks each.",
      "Section D consists of 2 questions (33 to 34) carrying 4 Marks each.",
      "Section E consists of 3 questions (35 to 37) carrying 5 Marks each."
    ],
    matrix: [
      { label: "Section A: Objective MCQs (Q1 to Q21)", count: 21, marks: 1, enabled: true },
      { label: "Section B: Short Answer (Q22 to Q28)", count: 7, marks: 2, enabled: true },
      { label: "Section C: Short Answer (Q29 to Q32)", count: 4, marks: 3, enabled: true },
      { label: "Section D: Practical / Case (Q33 to Q34)", count: 2, marks: 4, enabled: true },
      { label: "Section E: Long Answer (Q35 to Q37)", count: 3, marks: 5, enabled: true }
    ]
  },

  // 9. Physical Education Class 12 (048) - Exactly 37 Qs, 70 Marks
  ped: {
    marks: 70,
    time: "3 Hours",
    instructions: [
      "The question paper consists of 5 sections and 37 Questions.",
      "Section A consists of question 1-18 carrying 1 mark each and is multiple choice.",
      "Section B consists of questions 19-24 carrying 2 marks each (Attempt any 5).",
      "Section C consists of Question 25-30 carrying 3 marks each (Attempt any 5).",
      "Section D consists of Question 31-33 carrying 4 marks each and are case studies.",
      "Section E consists of Question 34-37 carrying 5 marks each (Attempt any 3)."
    ],
    matrix: [
      { label: "Section A: MCQs (Q1 to Q18)", count: 18, marks: 1, enabled: true },
      { label: "Section B: VSA Type (Q19 to Q24)", count: 6, marks: 2, enabled: true },
      { label: "Section C: SA Type (Q25 to Q30)", count: 6, marks: 3, enabled: true },
      { label: "Section D: Case Studies (Q31 to Q33)", count: 3, marks: 4, enabled: true },
      { label: "Section E: Long Answer Type (Q34 to Q37)", count: 4, marks: 5, enabled: true }
    ]
  },

  // 10. Geography Class 12 (029) - Exactly 30 Qs, 70 Marks
  geography: {
    marks: 70,
    time: "3 Hours",
    instructions: [
      "This question paper contains 30 questions. All questions are compulsory.",
      "This question paper is divided into five sections: Section-A, B, C, D and E.",
      "Section A - Question number 1 to 17 are Multiple Choice type questions carrying 1 mark each.",
      "Section B - Question number 18 and 19 are Source based questions carrying 3 marks each.",
      "Section C - Question number 20 to 23 are Short Answer type questions carrying 3 marks each.",
      "Section D - Question number 24 to 28 are Long Answer type questions carrying 5 marks each.",
      "Section E - Question number 29 and 30 are Map based questions carrying 5 marks each."
    ],
    matrix: [
      { label: "Section A: MCQs (Q1 to Q17)", count: 17, marks: 1, enabled: true },
      { label: "Section B: Source Based (Q18 to Q19)", count: 2, marks: 3, enabled: true },
      { label: "Section C: Short Answer (Q20 to Q23)", count: 4, marks: 3, enabled: true },
      { label: "Section D: Long Answer (Q24 to Q28)", count: 5, marks: 5, enabled: true },
      { label: "Section E: Map Based (Q29 to Q30)", count: 2, marks: 5, enabled: true }
    ]
  },

  // 11. Social Science Class 10 (087) & Class 9 - Exactly 38 Qs, 80 Marks
  sst: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "There are 38 questions in the Question paper. All questions are compulsory.",
      "The question paper has Four Sections – A-History, B-Geography, C-Political Science, and D-Economics.",
      "Each Section is of 20 Marks and has MCQs, VSA, SA, LAs and CBQ.",
      "The map-based questions, carry 5 marks with two parts- Q9 in Section A-History (2 marks) and Q19 in Section B-Geography (3 marks)."
    ],
    matrix: [
      { label: "Section A: History (MCQs, VSA, SA, LA & Q9 Map 2M)", count: 9, marks: 2.22, enabled: true },
      { label: "Section B: Geography (MCQs, VSA, SA, LA & Q19 Map 3M)", count: 10, marks: 2, enabled: true },
      { label: "Section C: Political Science (MCQs, VSA, SA, LA, CBQ)", count: 9, marks: 2.22, enabled: true },
      { label: "Section D: Economics (MCQs, VSA, SA, LA, CBQ)", count: 10, marks: 2, enabled: true }
    ]
  },

  // 12. Hindi Course-B (085), Course-A (002), Hindi Core (302) & Elective (002)
  hindi: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "इस प्रश्न-पत्र में कुल तीन/चार खण्ड हैं।",
      "सभी प्रश्नों के उत्तर देना अनिवार्य है। दिए गए निर्देशों का पालन करते हुए प्रश्नों के उत्तर दीजिए।",
      "यथासंभव तीनों/चारों खंडों के प्रश्नों के उत्तर क्रमशः लिखिए।"
    ],
    matrix: [
      { label: "खंड 'क': अपठित बोध (अपठित गद्यांश व काव्यांश)", count: 2, marks: 8, enabled: true },
      { label: "खंड 'ख': व्यावहारिक व्याकरण / अभिव्यक्ति और माध्यम", count: 4, marks: 4, enabled: true },
      { label: "खंड 'ग': पाठ्यपुस्तक (पठित पद्यांश, गद्यांश व प्रश्न)", count: 6, marks: 5, enabled: true },
      { label: "खंड 'घ': रचनात्मक लेखन (अनुच्छेद, पत्र, ई-मेल आदि)", count: 4, marks: 5, enabled: true }
    ]
  },

  // 13. English Language & Literature (184), Core (301), Communicative (101)
  english: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "This question paper comprises 3/4 sections: Reading Skills, Writing & Grammar, Literature Textbook.",
      "All questions are compulsory. Attempt questions based on specific instructions for each Part."
    ],
    matrix: [
      { label: "Section A: Reading Skills (Passages & Case Comprehension)", count: 2, marks: 10, enabled: true },
      { label: "Section B: Creative Writing Skills and Applied Grammar", count: 4, marks: 5, enabled: true },
      { label: "Section C: Literature Textbook & Supplementary Extracts", count: 5, marks: 8, enabled: true }
    ]
  },

  // 14. Sanskrit (Code 122) - Exactly 18 Qs, 80 Marks
  sanskrit: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "अस्मिन् प्रश्नपत्रे 18 प्रश्नाः सन्ति। सर्वे प्रश्नाः अनिवार्याः सन्ति।",
      "अस्मिन् प्रश्नपत्रे चत्वारः खण्डाः सन्ति:",
      "'क' खण्डः : अपठितावबोधनम् (10 अङ्काः)",
      "'ख' खण्डः : रचनात्मककार्यम् (15 अङ्काः)",
      "'ग' खण्डः : अनुप्रयुक्तव्याकरणम् (25 अङ्काः)",
      "'घ' खण्डः : पठितावबोधनम् (30 अङ्काः)"
    ],
    matrix: [
      { label: "खण्डः 'क': अपठितावबोधनम्", count: 1, marks: 10, enabled: true },
      { label: "खण्डः 'ख': रचनात्मककार्यम्", count: 4, marks: 3.75, enabled: true },
      { label: "खण्डः 'ग': अनुप्रयुक्तव्याकरणम्", count: 7, marks: 3.57, enabled: true },
      { label: "खण्डः 'घ': पठितावबोधनम्", count: 6, marks: 5, enabled: true }
    ]
  },

  // 15. Skill Subjects (IT 402, AI 417) - Exactly 21 Qs, 50 Marks
  skillSubjects: {
    marks: 50,
    time: "2 Hours",
    instructions: [
      "This question paper consists of 21 questions in two sections: Section A & Section B.",
      "Section A has Objective type questions (24 marks). Section B has Subjective type questions (26 marks)."
    ],
    matrix: [
      { label: "Section A: Objective Type Questions (Employability & Subject)", count: 11, marks: 2, enabled: true },
      { label: "Section B: Subject Specific Short & Competency Type", count: 10, marks: 2.8, enabled: true }
    ]
  }
};

export function resolveSubjectRegistry(subject = '', selectedClass = '') {
  const sub = subject.toLowerCase();
  const cls = selectedClass.toLowerCase();
  const isSenior = cls.includes('11') || cls.includes('12');

  if (sub.includes('account') || sub.includes('055')) return CBSE_REGISTRY.accountancy;
  if (sub.includes('business') || sub.includes('054') || sub.includes('bst')) return CBSE_REGISTRY.bst;
  if (sub.includes('eco') || sub.includes('030')) return CBSE_REGISTRY.economics;
  if (sub.includes('geo') || sub.includes('029')) return CBSE_REGISTRY.geography;
  if (sub.includes('physical') || sub.includes('048') || sub.includes('ped')) return CBSE_REGISTRY.ped;
  if (sub.includes('computer') || sub.includes('083')) return CBSE_REGISTRY.cs;
  if (sub.includes('informatics') || sub.includes('065') || sub.includes('ip')) return CBSE_REGISTRY.ip;
  if (sub.includes('402') || sub.includes('417') || sub.includes('skill') || sub.includes('artificial intel')) return CBSE_REGISTRY.skillSubjects;
  if (sub.includes('math') || sub.includes('041') || sub.includes('241')) return CBSE_REGISTRY.math;
  if (sub.includes('sanskrit') || sub.includes('122')) return CBSE_REGISTRY.sanskrit;
  if (sub.includes('hindi') || sub.includes('085') || sub.includes('302') || sub.includes('002')) return CBSE_REGISTRY.hindi;
  if (sub.includes('english') || sub.includes('184') || sub.includes('301') || sub.includes('101') || sub.includes('001')) return CBSE_REGISTRY.english;
  if (sub.includes('social') || sub.includes('sst') || sub.includes('087')) return CBSE_REGISTRY.sst;

  if (sub.includes('physics') || sub.includes('chem') || sub.includes('bio') || sub.includes('042') || sub.includes('043') || sub.includes('044')) {
    return isSenior ? CBSE_REGISTRY.science12 : CBSE_REGISTRY.science10;
  }
  if (sub.includes('science')) {
    return isSenior ? CBSE_REGISTRY.science12 : CBSE_REGISTRY.science10;
  }

  return CBSE_REGISTRY.math;
}
