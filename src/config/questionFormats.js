export const ALL_QUESTION_TYPES = [
  { id: 'mcq', label: 'Multiple Choice Questions (MCQ)', defaultMarks: 1, defaultCount: 16, enabled: true },
  { id: 'ar', label: 'Assertion & Reasoning (A/R)', defaultMarks: 1, defaultCount: 4, enabled: true },
  { id: 'tf_fib', label: 'Fill in the Blanks / True-False', defaultMarks: 1, defaultCount: 4, enabled: false },
  { id: 'vsa', label: 'Very Short Answer (VSA)', defaultMarks: 2, defaultCount: 5, enabled: true },
  { id: 'sa', label: 'Short Answer (SA-I / SA-II)', defaultMarks: 3, defaultCount: 7, enabled: true },
  { id: 'la', label: 'Long Answer (LA - Descriptive)', defaultMarks: 5, defaultCount: 3, enabled: true },
  { id: 'case_study', label: 'Competency / Case-Based Integrated', defaultMarks: 4, defaultCount: 3, enabled: true },
  { id: 'viva_practical', label: 'Practical Lab / Viva Voce Questions', defaultMarks: 5, defaultCount: 2, enabled: false }
];

export function autoBalanceQuestions(targetMarks) {
  // Balanced default question allocation according to target marks
  if (targetMarks <= 25) {
    return [
      { id: 'mcq', label: 'Multiple Choice Questions (MCQ)', marks: 1, count: 5, enabled: true },
      { id: 'vsa', label: 'Very Short Answer (VSA)', marks: 2, count: 3, enabled: true },
      { id: 'sa', label: 'Short Answer (SA)', marks: 3, count: 3, enabled: true },
      { id: 'case_study', label: 'Case Study / Application', marks: 5, count: 1, enabled: true }
    ];
  } else if (targetMarks <= 40) {
    return [
      { id: 'mcq', label: 'Multiple Choice Questions (MCQ)', marks: 1, count: 10, enabled: true },
      { id: 'vsa', label: 'Very Short Answer (VSA)', marks: 2, count: 3, enabled: true },
      { id: 'sa', label: 'Short Answer (SA)', marks: 3, count: 4, enabled: true },
      { id: 'la', label: 'Long Answer (LA)', marks: 4, count: 3, enabled: true }
    ];
  } else if (targetMarks === 70) {
    // 70 Marks (Physics, Chemistry, CS, Biology, IP)
    return [
      { id: 'mcq', label: 'Section A: MCQs (1 Mark each)', marks: 1, count: 18, enabled: true },
      { id: 'vsa', label: 'Section B: VSA (2 Marks each)', marks: 2, count: 7, enabled: true },
      { id: 'sa', label: 'Section C: SA (3 Marks each)', marks: 3, count: 5, enabled: true },
      { id: 'la', label: 'Section D: LA (5 Marks each)', marks: 5, count: 3, enabled: true },
      { id: 'case_study', label: 'Section E: Case Study (4 Marks each)', marks: 4, count: 2, enabled: true }
    ];
  } else {
    // Standard 80 Marks (Maths, Science, SST, English, Hindi, Accounts)
    return [
      { id: 'mcq', label: 'Section A: MCQs (1 Mark each)', marks: 1, count: 20, enabled: true },
      { id: 'vsa', label: 'Section B: VSA (2 Marks each)', marks: 2, count: 5, enabled: true },
      { id: 'sa', label: 'Section C: SA (3 Marks each)', marks: 3, count: 6, enabled: true },
      { id: 'la', label: 'Section D: LA (5 Marks each)', marks: 5, count: 4, enabled: true },
      { id: 'case_study', label: 'Section E: Case Study (4 Marks each)', marks: 4, count: 3, enabled: true }
    ];
  }
}
