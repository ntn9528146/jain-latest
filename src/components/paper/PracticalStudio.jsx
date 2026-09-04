import React, { useState } from 'react';
import Button from '../common/Button.jsx';
import { exportToDocx } from '../../services/exportService.js';
import { getSyllabusDataForClass, ALL_CLASSES } from '../../config/syllabus/index.js';

const PracticalStudio = ({ onPracticalGenerated }) => {
  const [selectedClass, setSelectedClass] = useState('Class 12');
  const syllabusBundle = getSyllabusDataForClass(selectedClass);
  const availableSubjects = syllabusBundle ? Object.keys(syllabusBundle.subjects) : [];
  const [selectedSubject, setSelectedSubject] = useState(availableSubjects[0] || 'Physics (Code 042)');

  const [activeSubTab, setActiveSubTab] = useState('auto');
  const [manualTopic, setManualTopic] = useState('');
  const [experimentCount, setExperimentCount] = useState(2);
  const [vivaCount, setVivaCount] = useState(5);
  const [generatedStudio, setGeneratedStudio] = useState(null);

  const handleClassChange = (newClass) => {
    setSelectedClass(newClass);
    const nextBundle = getSyllabusDataForClass(newClass);
    const subjects = nextBundle ? Object.keys(nextBundle.subjects) : [];
    setSelectedSubject(subjects[0] || '');
  };

  const currentUnits = syllabusBundle?.subjects[selectedSubject]?.units || [];

  const handleGeneratePractical = () => {
    const topicsPool = activeSubTab === 'manual' && manualTopic.trim()
      ? manualTopic.split('\n').filter((t) => t.trim())
      : currentUnits.flatMap((u) => u.subtopics || [u.name]);

    const fallbackTopic = selectedSubject || 'Core Laboratory Skill';

    const experiments = [];
    for (let i = 0; i < experimentCount; i++) {
      const topic = (topicsPool.length > 0) ? topicsPool[i % topicsPool.length] : fallbackTopic;
      experiments.push({
        expNo: i + 1,
        title: `To investigate, demonstrate and document the practical implementation of ${topic}.`,
        apparatus: 'Standard Laboratory Workstation / Apparatus / Hardware Setup',
        theory: `Based on official CBSE practical curriculum guidelines for ${selectedSubject}.`,
        steps: [
          'Set up apparatus / workstation following laboratory safety protocols.',
          'Record experimental readings or execute test scenarios across minimum 3 trials.',
          'Calculate errors / deviations, plot graphs or compile result tables.',
          'State conclusions, practical inferences, and precautionary measures.'
        ],
        marking: 'Aim & Apparatus (1M) + Principle & Procedure (2M) + Observation/Tabulation (3M) + Result (1M) = 7 Marks'
      });
    }

    const vivaQuestions = [];
    for (let i = 0; i < vivaCount; i++) {
      const topic = (topicsPool.length > 0) ? topicsPool[(i + 1) % topicsPool.length] : fallbackTopic;
      vivaQuestions.push({
        qNo: i + 1,
        question: `What is the core working principle and significance of ${topic} during experimental analysis?`,
        expectedAnswer: `Expected Answer: The candidate must explain the fundamental governing laws of ${topic}, state potential sources of experimental inaccuracies, and justify precision.`
      });
    }

    const projectFileGuideline = {
      projectTitle: `Comprehensive Investigative Academic Project: ${topicsPool[0] || fallbackTopic}`,
      sections: [
        '1. Certificate of Authenticity & Student Declaration',
        '2. Acknowledgement & Dedication',
        '3. Aim, Objectives and Scope of the Investigation',
        '4. Theoretical Framework & CBSE Syllabus Alignment',
        '5. Experimental / Data Collection / Implementation Records',
        '6. Observations, Charts, Code Blocks & Statistical Tables',
        '7. Learning Outcomes, Bibliography & References'
      ]
    };

    const compiled = {
      schoolName: "AFFILIATED SENIOR SECONDARY SCHOOL",
      title: `CBSE Practical Examination & Viva-Voce Evaluation 2026-27`,
      subject: selectedSubject,
      className: selectedClass,
      maxMarks: 30,
      experiments,
      vivaQuestions,
      projectFileGuideline
    };

    setGeneratedStudio(compiled);
    if (onPracticalGenerated) onPracticalGenerated(selectedSubject);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5 text-xs">
      <div className="no-print flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            🧪 Practical Exam, Viva Voce & Project File Studio
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Dynamic CBSE Selector
            </span>
          </h3>
          <p className="text-slate-400 mt-0.5">
            Select any class and subject to compile laboratory experiments, viva sheets, and project files.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
          <button
            type="button"
            onClick={() => setActiveSubTab('auto')}
            className={`px-3 py-1 rounded-lg font-semibold ${activeSubTab === 'auto' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            Auto from CBSE Syllabus
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('manual')}
            className={`px-3 py-1 rounded-lg font-semibold ${activeSubTab === 'manual' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            Custom Manual Topics
          </button>
        </div>
      </div>

      {activeSubTab === 'manual' && (
        <div className="no-print">
          <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">
            Type or Paste Custom Practical / Project Topics (One per line):
          </label>
          <textarea
            rows="3"
            value={manualTopic}
            onChange={(e) => setManualTopic(e.target.value)}
            placeholder="e.g. Verification of Ohm's Law&#10;Study of Logic Gates&#10;Analysis of Fertilizer Samples..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-[11px]"
          />
        </div>
      )}

      {/* Class & Subject Dropdowns */}
      <div className="no-print grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-slate-400 text-[10px] uppercase block mb-1 font-bold">Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => handleClassChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold"
          >
            {ALL_CLASSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-slate-400 text-[10px] uppercase block mb-1 font-bold">Select Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-indigo-300 font-bold"
          >
            {availableSubjects.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-slate-400 text-[10px] uppercase block mb-1 font-bold">Lab Experiments</label>
          <select
            value={experimentCount}
            onChange={(e) => setExperimentCount(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold"
          >
            <option value={1}>1 Experiment</option>
            <option value={2}>2 Experiments</option>
            <option value={3}>3 Experiments</option>
          </select>
        </div>

        <div>
          <label className="text-slate-400 text-[10px] uppercase block mb-1 font-bold">Viva Questions</label>
          <select
            value={vivaCount}
            onChange={(e) => setVivaCount(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold"
          >
            <option value={3}>3 Viva Questions</option>
            <option value={5}>5 Viva Questions</option>
            <option value={10}>10 Viva Questions</option>
          </select>
        </div>
      </div>

      <div className="no-print">
        <Button onClick={handleGeneratePractical} className="w-full">
          ⚡ Compile Practical Paper, Viva Voce Key & Project Guidelines
        </Button>
      </div>

      {generatedStudio && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="no-print flex justify-between items-center">
            <span className="text-sm font-bold text-emerald-400">
              Generated Practical Deck ({generatedStudio.subject} - {generatedStudio.className})
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-lg shadow-indigo-600/30"
              >
                🖨️ Print Practical & Viva Deck (A4)
              </button>
              <button
                type="button"
                onClick={() => exportToDocx({ paperHeader: { schoolName: generatedStudio.schoolName, examName: generatedStudio.title, subjectName: generatedStudio.subject, className: generatedStudio.className, maxMarks: 30, timeAllowed: '2 Hours' } })}
                className="bg-slate-800 text-slate-200 border border-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs"
              >
                📝 Export Word DOCX
              </button>
            </div>
          </div>

          <div className="printable-document bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-xl space-y-6 font-sans">
            <div className="text-center border-b-2 border-slate-900 pb-3">
              <h2 className="text-xl font-black uppercase">{generatedStudio.schoolName}</h2>
              <h3 className="text-sm font-bold uppercase">{generatedStudio.title}</h3>
              <div className="flex justify-between text-xs font-bold pt-2 border-t border-slate-300 mt-2">
                <span>CLASS: {generatedStudio.className}</span>
                <span>SUBJECT: {generatedStudio.subject}</span>
                <span>MAX. MARKS: {generatedStudio.maxMarks}</span>
                <span>TIME: 2.5 HOURS</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold border-b border-slate-300 pb-1 uppercase tracking-wider text-xs">
                Part A: Laboratory Practical Experiments
              </h4>
              {generatedStudio.experiments.map((exp) => (
                <div key={exp.expNo} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1 avoid-break-inside">
                  <p className="font-bold text-slate-900">Experiment {exp.expNo}: {exp.title}</p>
                  <p className="text-slate-700 text-[11px]"><strong className="text-slate-900">Apparatus Required:</strong> {exp.apparatus}</p>
                  <p className="text-slate-700 text-[11px]"><strong className="text-slate-900">Marking Scheme:</strong> {exp.marking}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-2 page-break-before">
              <h4 className="font-bold border-b border-slate-300 pb-1 uppercase tracking-wider text-xs">
                Part B: Viva-Voce Question Bank with Expected Answers
              </h4>
              <div className="space-y-2.5">
                {generatedStudio.vivaQuestions.map((v) => (
                  <div key={v.qNo} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 avoid-break-inside">
                    <p className="font-bold text-slate-900">Q{v.qNo}. {v.question}</p>
                    <p className="text-emerald-800 text-[11px] font-sans italic">{v.expectedAnswer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 avoid-break-inside">
              <h4 className="font-bold border-b border-slate-300 pb-1 uppercase tracking-wider text-xs">
                Part C: Project File Structure & Guidelines
              </h4>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] space-y-1">
                <p className="font-bold text-slate-900">{generatedStudio.projectFileGuideline.projectTitle}</p>
                <ol className="list-decimal pl-4 space-y-0.5 text-slate-700">
                  {generatedStudio.projectFileGuideline.sections.map((sec, idx) => (
                    <li key={idx}>{sec}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticalStudio;
