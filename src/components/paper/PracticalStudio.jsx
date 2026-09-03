import React, { useState } from 'react';
import Button from '../common/Button.jsx';
import { exportToPrint, exportToDocx } from '../../services/exportService.js';

export default function PracticalStudio({ selectedClass, selectedSubject, units = [], onPracticalGenerated }) {
  const [activeSubTab, setActiveSubTab] = useState('auto'); // auto | manual
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
        apparatus: 'Standard Laboratory Workstation / Apparatus / IDE Environment',
        theory: `Based on standard CBSE experimental procedure for ${selectedSubject}.`,
        steps: ['Set up apparatus / environment.', 'Take initial readings or test cases.', 'Calculate standard deviation / error margin.', 'Tabulate observations and write final result.'],
        marking: 'Aim & Apparatus (1M) + Procedure (2M) + Observations & Graph (3M) + Results (1M) = 7 Marks'
      });
    }

    const vivaQuestions = [];
    for (let i = 0; i < vivaCount; i++) {
      const topic = topicsPool[(i + 2) % topicsPool.length] || selectedSubject;
      vivaQuestions.push({
        qNo: i + 1,
        question: `What is the significance of ${topic} during experimental analysis?`,
        expectedAnswer: `Expected Answer: The candidate must state the governing principle of ${topic}, state potential sources of experimental error, and explain how accuracy is preserved.`
      });
    }

    const projectFileGuideline = {
      projectTitle: `Comprehensive Investigative Project on ${topicsPool[0] || selectedSubject}`,
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
      title: `CBSE Practical Examination & Viva-Voce Evaluation`,
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
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            🧪 Practical Exam, Viva Voce & Project File Studio
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              CBSE Assessment
            </span>
          </h3>
          <p className="text-slate-400 mt-0.5">
            Generate laboratory experiment sheets, one-click viva questions with answers, and project file guidelines.
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
        <div>
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
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

      <Button onClick={handleGeneratePractical} className="w-full">
        ⚡ Compile Practical Paper, Viva Voce Key & Project Guidelines (Single Click)
      </Button>

      {generatedStudio && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-emerald-400">Generated Practical Assessment Deck</span>
            <div className="flex gap-2">
              <button onClick={exportToPrint} className="bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs">
                🖨️ Print Practical Deck
              </button>
              <button
                onClick={() => exportToDocx({ paperHeader: { schoolName: generatedStudio.schoolName, examName: generatedStudio.title, subjectName: generatedStudio.subject, className: generatedStudio.className, maxMarks: 30, timeAllowed: '2 Hours' } })}
                className="bg-slate-800 text-slate-200 border border-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs"
              >
                📝 Export Word DOCX
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <h4 className="font-bold text-indigo-300 uppercase tracking-wider text-xs">Part 1: Laboratory Experiments Assigned</h4>
            {generatedStudio.experiments.map((exp) => (
              <div key={exp.expNo} className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <p className="font-bold text-white">Experiment {exp.expNo}: {exp.title}</p>
                <p className="text-slate-400 text-[11px]"><strong className="text-slate-300">Apparatus:</strong> {exp.apparatus}</p>
                <p className="text-slate-400 text-[11px]"><strong className="text-slate-300">Marking Scheme:</strong> {exp.marking}</p>
              </div>
            ))}

            <h4 className="font-bold text-amber-300 uppercase tracking-wider text-xs pt-2">Part 2: Viva-Voce Question Bank with Model Answers</h4>
            <div className="space-y-2">
              {generatedStudio.vivaQuestions.map((v) => (
                <div key={v.qNo} className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                  <p className="font-bold text-white">Q{v.qNo}. {v.question}</p>
                  <p className="text-emerald-300 text-[11px] font-mono">{v.expectedAnswer}</p>
                </div>
              ))}
            </div>

            <h4 className="font-bold text-purple-300 uppercase tracking-wider text-xs pt-2">Part 3: Project File Guidelines & Table of Contents</h4>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 text-[11px] space-y-1">
              <p className="font-bold text-white">{generatedStudio.projectFileGuideline.projectTitle}</p>
              <ul className="list-disc pl-4 space-y-0.5">
                {generatedStudio.projectFileGuideline.sections.map((sec, idx) => (
                  <li key={idx}>{sec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
