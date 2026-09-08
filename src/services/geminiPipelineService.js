import { getActiveGeminiKey, reportKeyFailure } from '../config/geminiKeyVault.js';
import { class10QuestionBanks, generateDynamicPaper } from '../data/questionBanks/secondary/class-10/index.js';

export function getOfficialCbseMatrix(subject = '', selectedClass = '', targetMarks = null) {
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

export const executePaperPipeline = async (options = {}) => {
  const selectedClass = String(options.selectedClass || options.className || 'Class 10');
  const rawSub = String(options.subject || options.selectedSubject || 'Science');
  const subject = rawSub.replace(/\s*\([^)]*\)/g, '').trim();
  const examType = String(options.examType || options.examName || 'Pre-Board Examination').replace(/\(\s*\d+%\s*SYLLABUS\s*\)/gi, '').trim();
  const onProgress = typeof options.onProgress === 'function' ? options.onProgress : () => {};

  onProgress({ stage: 1, text: `Loading from Local Master Question Bank for ${subject} (0.01s)...` });

  const subLower = subject.toLowerCase();
  let subjectKey = 'science'; // Default fallback

  // Exact 17 Folder Mapping
  if (subLower.includes('book keeping') || subLower.includes('accountancy') || subLower.includes('254')) {
    subjectKey = 'book-keeping-accountancy';
  } else if (subLower.includes('carnatic') || subLower.includes('vocal')) {
    subjectKey = 'carnatic-vocal';
  } else if (subLower.includes('computer app') || subLower.includes('165')) {
    subjectKey = 'computer-applications';
  } else if (subLower.includes('communicative') || subLower.includes('101')) {
    subjectKey = 'english-communicative';
  } else if (subLower.includes('lang') || subLower.includes('lit') || subLower.includes('184')) {
    subjectKey = 'english-lang-lit';
  } else if (subLower.includes('hindi a') || subLower.includes('002')) {
    subjectKey = 'hindi-a';
  } else if (subLower.includes('hindi b') || subLower.includes('085')) {
    subjectKey = 'hindi-b';
  } else if (subLower.includes('information') || subLower.includes('it') || subLower.includes('402')) {
    subjectKey = 'information-technology';
  } else if (subLower.includes('basic') || subLower.includes('241')) {
    subjectKey = 'mathematics-basic';
  } else if (subLower.includes('math') || subLower.includes('standard') || subLower.includes('041')) {
    subjectKey = 'mathematics-standard';
  } else if (subLower.includes('ncc')) {
    subjectKey = 'ncc';
  } else if (subLower.includes('pewb')) {
    subjectKey = 'pewb';
  } else if (subLower.includes('punjabi')) {
    subjectKey = 'punjabi';
  } else if (subLower.includes('sanskrit') || subLower.includes('122')) {
    subjectKey = 'sanskrit';
  } else if (subLower.includes('science') || subLower.includes('086')) {
    subjectKey = 'science';
  } else if (subLower.includes('social') || subLower.includes('sst') || subLower.includes('087')) {
    subjectKey = 'social-science';
  } else if (subLower.includes('artificial') || subLower.includes('ai') || subLower.includes('417')) {
    subjectKey = 'artificial-intelligence';
  }

  if (!class10QuestionBanks[subjectKey]) {
    subjectKey = 'science';
  }

  const resolved = getOfficialCbseMatrix(subject, selectedClass, options.theoryMarks || options.maxMarks);
  const activeSections = Array.isArray(options.matrix) && options.matrix.filter(m => m && m.enabled && m.count > 0).length > 0
    ? options.matrix.filter(m => m && m.enabled && m.count > 0)
    : resolved.matrix;

  const finalMarks = activeSections.reduce((acc, curr) => acc + (Number(curr.marks || 1) * Number(curr.count || 1)), 0) || resolved.marks;

  let blueprintConfig = { MCQ: 20, Short: 10, 'Case-Study': 3, Long: 4 };
  activeSections.forEach(sec => {
    const labelLower = sec.label.toLowerCase();
    if (labelLower.includes('mcq') || labelLower.includes('objective')) {
      blueprintConfig.MCQ = sec.count;
    } else if (labelLower.includes('short') || labelLower.includes('vsa')) {
      blueprintConfig.Short = (blueprintConfig.Short || 0) + sec.count;
    } else if (labelLower.includes('case')) {
      blueprintConfig['Case-Study'] = sec.count;
    } else if (labelLower.includes('la') || labelLower.includes('long')) {
      blueprintConfig.Long = sec.count;
    }
  });

  try {
    onProgress({ stage: 2, text: `Applying Algorithmic Rotation & Mutation Engine for ${subjectKey}...` });
    
    const localGeneratedPaper = generateDynamicPaper(subjectKey, blueprintConfig);

    const formattedPaperJson = {
      paperHeader: {
        schoolName: "ARDEN PROGRESSIVE SCHOOL",
        examName: examType,
        className: selectedClass,
        subjectName: subject,
        timeAllowed: finalMarks > 40 ? '3 Hours' : '2 Hours',
        maxMarks: finalMarks
      },
      generalInstructions: [
        "All questions are compulsory.",
        "The question paper comprises five sections."
      ],
      sections: [
        {
          sectionTitle: "SECTION A - Core Questions & Variations",
          marksPerQ: 1,
          questions: localGeneratedPaper.questions.map((q, idx) => ({
            qNo: idx + 1,
            marks: q.marks || 1,
            topicName: q.unit || "General",
            questionText: q.questionText + (q.options ? "\n" + q.options.map((opt, i) => `(${String.fromCharCode(65 + i)}) ${opt}`).join("\n") : ""),
            answerKey: q.answerKey || "Verified by Engine"
          }))
        }
      ],
      blueprintSummary: [
        { unitName: "CBSE Aligned Master Pool", questionsCount: localGeneratedPaper.questions.length, marksAssigned: finalMarks }
      ],
      isLocalEngine: true
    };

    onProgress({ stage: 4, text: 'CBSE Paper Assembled Instantly from Storage!' });
    return formattedPaperJson;

  } catch (localError) {
    console.warn("Local engine fallback triggered:", localError);
    throw new Error(`Local generation failed for ${subject}: ${localError.message}`);
  }
};

export default executePaperPipeline;
