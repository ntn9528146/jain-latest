// Official CBSE Board Structure Registry (Classes 9 to 12) - Verified 2025-26

export const CBSE_REGISTRY = {
  // 1. Hindi Core (Code 302, Class 12) - Exactly 12 Questions, 80 Marks
  hindiCore12: {
    marks: 80,
    time: "3 घंटे",
    instructions: [
      "यह प्रश्न-पत्र तीन खण्डों में विभाजित है।",
      "खंड - क में अपठित बोध पर आधारित प्रश्न पूछे गए हैं। सभी प्रश्नों के उत्तर देना अनिवार्य है।",
      "खंड - ख में पाठ्यपुस्तक अभिव्यक्ति और माध्यम से प्रश्न पूछे गए हैं। प्रश्नों में आंतरिक विकल्प दिए गए हैं।",
      "खंड - ग में पाठ्यपुस्तक आरोह तथा वितान से प्रश्न पूछे गए हैं। प्रश्नों में आंतरिक विकल्प दिए गए हैं।",
      "तीनों खंडों के प्रश्नों के उत्तर देना अनिवार्य है।",
      "यथासंभव तीनों खंडों के प्रश्नों के उत्तर क्रमशः लिखिए।"
    ],
    matrix: [
      { label: "खंड क: अपठित गद्यांश (प्रश्न 1) एवं अपठित पद्यांश (प्रश्न 2)", count: 2, marks: 9, enabled: true },
      { label: "खंड ख: अभिव्यक्ति और माध्यम - रचनात्मक लेख व प्रश्न (प्रश्न 3 से 5)", count: 3, marks: 7.33, enabled: true },
      { label: "खंड ग: आरोह भाग-2 व वितान भाग-2 प्रश्न (प्रश्न 6 से 12)", count: 7, marks: 5.71, enabled: true }
    ]
  },

  // 2. Hindi Course-B (085) / Course-A (002) Class 10 - Exactly 16 Questions, 80 Marks
  hindi10: {
    marks: 80,
    time: "3 घंटे",
    instructions: [
      "इस प्रश्नपत्र में कुल चार खंड हैं– क, ख, ग, घ।",
      "इस प्रश्नपत्र में कुल 16 प्रश्न हैं। सभी प्रश्न अनिवार्य हैं।",
      "प्रश्नपत्र में आंतरिक विकल्प दिए गए हैं। प्रश्नों के उत्तर दिए गए निर्देशों का पालन करते हुए लिखिए।"
    ],
    matrix: [
      { label: "खंड 'क': अपठित गद्यांश व काव्यांश (Q1-2)", count: 2, marks: 7, enabled: true },
      { label: "खंड 'ख': व्यावहारिक व्याकरण (Q3-6)", count: 4, marks: 4, enabled: true },
      { label: "खंड 'ग': पाठ्यपुस्तक स्पर्श व संचयन (Q7-11)", count: 5, marks: 6, enabled: true },
      { label: "खंड 'घ': रचनात्मक लेखन (Q12-16)", count: 5, marks: 4, enabled: true }
    ]
  },

  // 3. Accountancy (055, Class 12) - Exactly 34 Questions, 80 Marks
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
      { label: "Part A & B: Objective MCQs (20 Questions - 1M)", count: 20, marks: 1, enabled: true },
      { label: "Part A & B: Short Answer Type I (6 Questions - 3M)", count: 6, marks: 3, enabled: true },
      { label: "Part A & B: Short Answer Type II (3 Questions - 4M)", count: 3, marks: 4, enabled: true },
      { label: "Part A & B: Long Answer Type (5 Questions - 6M)", count: 5, marks: 6, enabled: true }
    ]
  },

  // 4. Business Studies (054, Class 12) - Exactly 34 Questions, 80 Marks
  bst: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "This question paper contains 34 questions. All questions are compulsory.",
      "Marks are indicated against each question.",
      "Answers to questions carrying 3 marks may be from 50 to 75 words.",
      "Answers to questions carrying 4 marks may be about 150 words.",
      "Answers to questions carrying 6 marks may be about 200 words."
    ],
    matrix: [
      { label: "Objective Type MCQs (Q1 to Q20 - 1M)", count: 20, marks: 1, enabled: true },
      { label: "Short Answer Type (Q21 to Q24 - 3M)", count: 4, marks: 3, enabled: true },
      { label: "Short Answer Type (Q25 to Q30 - 4M)", count: 6, marks: 4, enabled: true },
      { label: "Long Answer Type (Q31 to Q34 - 6M)", count: 4, marks: 6, enabled: true }
    ]
  },

  // 5. Economics (030, Class 12) - Exactly 34 Questions, 80 Marks
  economics: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "This question paper contains two sections: Section A – Macro Economics and Section B – Indian Economic Development.",
      "This paper contains 20 Multiple Choice Questions of 1 mark each.",
      "This paper contains 4 Short Answer Questions of 3 marks each.",
      "This paper contains 6 Short Answer Questions of 4 marks each.",
      "This paper contains 4 Long Answer Questions of 6 marks each."
    ],
    matrix: [
      { label: "Section A & B: MCQs (20 Questions - 1M)", count: 20, marks: 1, enabled: true },
      { label: "Section A & B: SA Type I (4 Questions - 3M)", count: 4, marks: 3, enabled: true },
      { label: "Section A & B: SA Type II (6 Questions - 4M)", count: 6, marks: 4, enabled: true },
      { label: "Section A & B: LA Type (4 Questions - 6M)", count: 4, marks: 6, enabled: true }
    ]
  },

  // 6. Mathematics (041 / 241, Classes 9-12) - Exactly 38 Questions, 80 Marks
  math: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "This question paper contains 38 questions. All Questions are compulsory.",
      "This Question Paper is divided into 5 Sections A, B, C, D and E.",
      "In Section A, Questions 1-18 are MCQs and 19-20 are Assertion-Reason based questions of 1 mark each.",
      "In Section B, Questions 21-25 are Very Short Answer (VSA) carrying 02 marks each.",
      "In Section C, Questions 26-31 are Short Answer (SA) carrying 03 marks each.",
      "In Section D, Questions 32-35 are Long Answer (LA) carrying 05 marks each.",
      "In Section E, Questions 36-38 are Case study-based carrying 4 marks each."
    ],
    matrix: [
      { label: "Section A: MCQs (Q1-18) & A-R (Q19-20) [1M]", count: 20, marks: 1, enabled: true },
      { label: "Section B: VSA Type (Q21-25) [2M]", count: 5, marks: 2, enabled: true },
      { label: "Section C: SA Type (Q26-31) [3M]", count: 6, marks: 3, enabled: true },
      { label: "Section D: LA Type (Q32-35) [5M]", count: 4, marks: 5, enabled: true },
      { label: "Section E: Case Study Units (Q36-38) [4M]", count: 3, marks: 4, enabled: true }
    ]
  },

  // 7. Senior Sciences (Physics 042, Chemistry 043, Biology 044) - Exactly 33 Questions, 70 Marks
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
      { label: "Section A: MCQs & Assertion-Reason (Q1-16) [1M]", count: 16, marks: 1, enabled: true },
      { label: "Section B: SA Type I (Q17-21) [2M]", count: 5, marks: 2, enabled: true },
      { label: "Section C: SA Type II (Q22-28) [3M]", count: 7, marks: 3, enabled: true },
      { label: "Section D: Case-Based Questions (Q29-30) [4M]", count: 2, marks: 4, enabled: true },
      { label: "Section E: Long Answer LA (Q31-33) [5M]", count: 3, marks: 5, enabled: true }
    ]
  },

  // 8. Secondary Science Class 10 (086) - Exactly 39 Questions, 80 Marks
  science10: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "This question paper consists of 39 questions in 3 sections. Section A is Biology, Section B is Chemistry and Section C is Physics.",
      "All questions are compulsory. However, an internal choice is provided in some questions."
    ],
    matrix: [
      { label: "Section A: Biology (Q1-13) [MCQs, VSA, SA, LA, Case]", count: 13, marks: 2.08, enabled: true },
      { label: "Section B: Chemistry (Q14-26) [MCQs, VSA, SA, LA, Case]", count: 13, marks: 2.08, enabled: true },
      { label: "Section C: Physics (Q27-39) [MCQs, VSA, SA, LA, Case]", count: 13, marks: 2, enabled: true }
    ]
  },

  // 9. Computer Science (083) & Informatics Practices (065) - Exactly 37 Questions, 70 Marks
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
      { label: "Section A: Objective MCQs (Q1 to Q21) [1M]", count: 21, marks: 1, enabled: true },
      { label: "Section B: Short Answer Type I (Q22 to Q28) [2M]", count: 7, marks: 2, enabled: true },
      { label: "Section C: Short Answer Type II (Q29 to Q31) [3M]", count: 3, marks: 3, enabled: true },
      { label: "Section D: Programming / LA (Q32 to Q35) [4M]", count: 4, marks: 4, enabled: true },
      { label: "Section E: Case Study / Code Analysis (Q36 to Q37) [5M]", count: 2, marks: 5, enabled: true }
    ]
  },

  // 10. Social Science Class 10 (087) - Exactly 38 Questions, 80 Marks
  sst: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "There are 38 questions in the Question paper. All questions are compulsory.",
      "The question paper has Four Sections – A-History, B-Geography, C-Political Science, and D-Economics.",
      "Each Section is of 20 Marks and has MCQs, VSA, SA, LAs and CBQ.",
      "The map-based questions carry 5 marks (Q9 in Section A-History 2 marks and Q19 in Section B-Geography 3 marks)."
    ],
    matrix: [
      { label: "Section A: History (MCQs, VSA, SA, LA & Q9 Map 2M)", count: 9, marks: 2.22, enabled: true },
      { label: "Section B: Geography (MCQs, VSA, SA, LA & Q19 Map 3M)", count: 10, marks: 2, enabled: true },
      { label: "Section C: Political Science (MCQs, VSA, SA, LA, CBQ)", count: 9, marks: 2.22, enabled: true },
      { label: "Section D: Economics (MCQs, VSA, SA, LA, CBQ)", count: 10, marks: 2, enabled: true }
    ]
  },

  // 11. English Language & Literature (184, Class 10) - Exactly 11 Questions
  english10: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "This question paper comprises 11 questions. All questions are compulsory.",
      "The question paper contains THREE sections – Section A: Reading Skills, Section B: Grammar and Creative Writing Skills, Section C: Literature Textbook."
    ],
    matrix: [
      { label: "Section A: Reading Skills (Q1-2: Discursive & Factual Passages)", count: 2, marks: 10, enabled: true },
      { label: "Section B: Grammar & Creative Writing Skills (Q3-5)", count: 3, marks: 6.66, enabled: true },
      { label: "Section C: Literature Textbook (Q6-11)", count: 6, marks: 6.66, enabled: true }
    ]
  },

  // 12. English Core (301, Class 12) - Exactly 13 Questions
  english12: {
    marks: 80,
    time: "3 Hours",
    instructions: [
      "This question paper comprises 13 questions in THREE sections: Section A: Reading, Section B: Writing, Section C: Literature."
    ],
    matrix: [
      { label: "Section A: Reading Skills (Passages 1 & 2)", count: 2, marks: 11, enabled: true },
      { label: "Section B: Creative Writing Skills (Notice, Letter, Article/Report)", count: 4, marks: 4.5, enabled: true },
      { label: "Section C: Literature Textbook & Supplementary Extracts", count: 7, marks: 5.71, enabled: true }
    ]
  }
};

export function resolveSubjectRegistry(subject = '', selectedClass = '') {
  const sub = subject.toLowerCase();
  const cls = selectedClass.toLowerCase();
  const isSenior = cls.includes('11') || cls.includes('12');

  if (sub.includes('hindi')) {
    return isSenior ? CBSE_REGISTRY.hindiCore12 : CBSE_REGISTRY.hindi10;
  }
  if (sub.includes('account') || sub.includes('055')) return CBSE_REGISTRY.accountancy;
  if (sub.includes('business') || sub.includes('054') || sub.includes('bst')) return CBSE_REGISTRY.bst;
  if (sub.includes('eco') || sub.includes('030')) return CBSE_REGISTRY.economics;
  if (sub.includes('math') || sub.includes('041') || sub.includes('241')) return CBSE_REGISTRY.math;
  if (sub.includes('computer') || sub.includes('083') || sub.includes('ip') || sub.includes('065')) return CBSE_REGISTRY.cs;
  if (sub.includes('social') || sub.includes('sst') || sub.includes('087')) return CBSE_REGISTRY.sst;
  if (sub.includes('english')) return isSenior ? CBSE_REGISTRY.english12 : CBSE_REGISTRY.english10;
  if (sub.includes('physics') || sub.includes('chem') || sub.includes('bio')) {
    return isSenior ? CBSE_REGISTRY.science12 : CBSE_REGISTRY.science10;
  }

  return isSenior ? CBSE_REGISTRY.hindiCore12 : CBSE_REGISTRY.science10;
}
