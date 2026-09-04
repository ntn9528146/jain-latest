import React, { useState } from 'react';
import Button from '../common/Button.jsx';
import { exportToDocx } from '../../services/exportService.js';

export default function PracticalStudio({ selectedClass, selectedSubject, units = [], onPracticalGenerated }) {
  const [activeSubTab, setActiveSubTab] = useState('auto');
  const [manualTopic, setManualTopic] = useState('');
  const [experimentCount, setExperimentCount] = useState(2);
  const [vivaCount, setVivaCount] = useState(5);
  const [generatedStudio, setGeneratedStudio] = useState(null);

  const handleGeneratePractical = () => {
    const topicsPool = activeSubTab === 'manual' && manualTopic.trim()
      ? manualTopic.split('\n').filter((t) => t.trim())
      : units.flatMap((u) => u.subtopics || [u.name]);

    const experiments = [];
    for (let i = 0; i < experimentCount; i++) {
      const topic = topicsPool[i % topicsPool.length] || selectedSubject;
      experiments.push({
        expNo: i + 1,
        title: `To investigate, demonstrate and document the practical implementation of ${topic}.`,
        apparatus: 'Standard Laboratory Workstation / Apparatus / Hardware Components',
        theory: `Based on standard CBSE experimental guidelines for ${selectedSubject}.`,
        steps: [
          'Set up apparatus / environment following standard laboratory safeguards.',
          'Take experimental readings / write execution test cases across minimum 3 iterations.',
          'Calculate deviations, identify errors and plot relevant graph/tables.',
          'State experimental conclusion and precaution.'
        ],
        marking: 'Aim & Apparatus (1M) + Procedure (2M) + Observation/Execution (3M) + Result (1M) = 7 Marks'
      });
    }

    const vivaQuestions = [];
    for (let i = 0; i < vivaCount; i++) {
      const topic = topicsPool[(i + 2) % topicsPool.length] || selectedSubject;
      vivaQuestions.push({
        qNo: i + 1,
        question: `What is the significance and underlying scientific/technical principle of ${topic}?`,
        expectedAnswer: `Expected Answer: The candidate must state the governing formula/law of ${topic}, identify potential sources of experimental error, and justify data precision.`
      });
    }

    const projectFileGuideline = {
      projectTitle: `Investigative Academic Project: Comprehensive Study of ${topicsPool[0] || selectedSubject}`,
      sections: [
        '1. Certificate of Authenticity & Student Declaration',
        '2. Acknowledgement & Dedication',
        '3. Objective and Scope of the Investigation',
        '4. Theoretical Framework & CBSE Alignment',
        '5. Experimental / Coding / Field Data Collection',
        '6. Observations, Charts, Source Code & Data Tables',
        '7. Conclusions, Bibliography & Web References'
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
              CBSE Assessment
            </span>
          </h3>
          <p className="text-slate-400 mt-0.5">
            Compile and print laboratory experiments, viva voce banks with model answers, and project file formats.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
          <button
            onClick={() => setActiveSubTab('auto')}
            className={`px-3 py-1 rounded-lg font-semibold ${activeSubTab === 'auto' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            Auto from CBSE Syllabus
          </button>
          <button
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
            placeholder="e.g. Logic Gate Simulation with IC 7404&#10;Python MySQL School Library Management System&#10;Titration of Oxalic Acid vs KMnO4..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-[11px]"
          />
        </div>
      )}

      <div className="no-print grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <span className="text-slate-400 text-[10px] uppercase block">Selected Class</span>
          <span className="font-bold text-white">{selectedClass}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase block">Selected Subject</span>
          <span className="font-bold text-indigo-300">{selectedSubject}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase block">Lab Experiments</span>
          <select
            value={experimentCount}
            onChange={(e) => setExperimentCount(Number(e.target.value))}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-white font-bold"
          >
            <option value={1}>1 Experiment</option>
            <option value={2}>2 Experiments</option>
            <option value={3}>3 Experiments</option>
          </select>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase block">Viva Questions</span>
          <select
            value={vivaCount}
            onChange={(e) => setVivaCount(Number(e.target.value))}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-white font-bold"
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

      {/* Generated Practical Deck Display & Printable View */}
      {generatedStudio && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="no-print flex justify-between items-center">
            <span className="text-sm font-bold text-emerald-400">Generated Practical Assessment Deck</span>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-lg shadow-indigo-600/30"
              >
                🖨️ Print Practical & Viva Deck (A4)
              </button>
              <button
                onClick={() => exportToDocx({ paperHeader: { schoolName: generatedStudio.schoolName, examName: generatedStudio.title, subjectName: generatedStudio.subject, className: generatedStudio.className, maxMarks: 30, timeAllowed: '2 Hours' } })}
                className="bg-slate-800 text-slate-200 border border-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs"
              >
                📝 Export Word DOCX
              </button>
            </div>
          </div>

          <div className="printable-document bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-xl space-y-6">
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

            {/* Part 1: Experiments */}
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

            {/* Part 2: Viva Voce */}
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

            {/* Part 3: Project Guidelines */}
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
}
