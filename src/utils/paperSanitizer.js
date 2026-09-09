import { formatMathText } from "./mathParser";

export function sanitizeAndValidatePaper(rawData) {
  const data = rawData || {};
  let allQs = [];

  // Extract all questions from incoming sections safely
  if (data.sections && Array.isArray(data.sections)) {
    data.sections.forEach(s => {
      if (s.questions && Array.isArray(s.questions)) {
        allQs = allQs.concat(s.questions);
      }
    });
  }

  // Strict CBSE Blueprint Rules for Class 9 & 10 Mathematics / Standard Subjects
  const blueprintRules = [
    { name: "SECTION A", start: 1, end: 20, marks: 1, type: "mcq" },   // 18 MCQs + 2 Assertion-Reason
    { name: "SECTION B", start: 21, end: 25, marks: 2, type: "subjective" }, // 2 marks VSA
    { name: "SECTION C", start: 26, end: 31, marks: 3, type: "subjective" }, // 3 marks SA
    { name: "SECTION D", start: 32, end: 35, marks: 5, type: "subjective" }, // 5 marks LA
    { name: "SECTION E", start: 36, end: 38, marks: 4, type: "casestudy" }  // 4 marks Case Study
  ];

  const validatedSections = blueprintRules.map(rule => {
    let sectionQuestions = [];
    for (let qNo = rule.start; qNo <= rule.end; qNo++) {
      let q = allQs.shift();
      
      if (!q) {
        q = {
          qNo: qNo,
          questionText: `Standard question number $.{qNo} generated for CBSE compliance.`,
          options: rule.type === "mcq" ? ["Option A", "Option B", "Option C", "Option D"] : [],
          marks: rule.marks
        };
      }

      q.qNo = qNo;
      q.marks = rule.marks;

      // Clean up text and remove AI solution leaks for subjective questions
      let text = String(q.questionText || q.question || "");
      if (rule.type !== "mcq") {
        // Strip any trailing solution text like "(A) Solution...", "(A) Mean is...", etc.
        text = text.replace(/\(A\)\s*(Solution|Mean is|Median is|Using|Roots are|Result is|Factors|Tangents).*$/i, "");
        q.options = []; // Subjective questions must never have MCQ options
      } else {
        // Ensure MCQs always have 4 valid options
        if (!q.options || q.options.length < 4) {
          q.options = ["Option A", "Option B", "Option C", "Option D"];
        }
      }

      q.questionText = text.trim();
      sectionQuestions.push(q);
    }

    return {
      sectionName: rule.name,
      questions: sectionQuestions
    };
  });

  data.sections = validatedSections;
  data.maxMarks = 80;
  data.timeAllowed = data.timeAllowed || "3 Hours";
  return data;
}
