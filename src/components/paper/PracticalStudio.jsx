import React, { useState } from 'react';
import Button from '../common/Button.jsx';
import { exportToDocx } from '../../services/exportService.js';
import { getSyllabusDataForClass, ALL_CLASSES } from '../../config/syllabus/index.js';

export default function PracticalStudio({ onPracticalGenerated }) {
  const [selectedClass, setSelectedClass] = useState('Class 12');
  const syllabusBundle = getSyllabusDataForClass(selectedClass);
  const availableSubjects = syllabusBundle ? Object.keys(syllabusBundle.subjects) : [];
  const [selectedSubject, setSelectedSubject] = useState(availableSubjects[0] || 'Physics (Code 042)');

  const [activeSubTab, setActiveSubTab] = useState('auto');
  const [manualTopic, setManualTopic] = useState('');
  const [experimentCount, setExperimentCount] = useState(2);
  const [vivaCount, setVivaCount] = useState(5);
  const [generatedStudio, setGeneratedStudio] = useState(null);
  const [activeFileTab, setActiveFileTab] = useState('practical');

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
        title: `To design, conduct and document the experimental evaluation of ${topic}.`,
        apparatus: 'Standard Laboratory Workstation / Apparatus / Hardware Setup',
        principle: `According to standard CBSE practical guidelines for ${selectedSubject}.`,
        procedure: [
          'Verify workstation / apparatus layout with relevant laboratory precautions.',
          'Record experimental observations across minimum 3 repeated trials.',
          'Calculate deviations, identify errors and plot relevant graphs/data tables.',
          'State experimental inference and precautions.'
        ],
        marking: 'Aim & Apparatus (1M) + Procedure (2M) + Table & Graphs (3M) + Result (1M) = 7 Marks'
      });
    }

    const vivaQuestions = [];
    for (let i = 0; i < vivaCount; i++) {
      const topic = (topicsPool.length > 0) ? topicsPool[(i + 1) % topicsPool.length] : fallbackTopic;
      vivaQuestions.push({
        qNo: i + 1,
        question: `What is the core working principle and physical significance of "${topic}"?`,
        modelAnswer: `Expected Answer: The student must clearly state the governing formula of ${topic}, describe the source of experimental discrepancies, and define precision.`
      });
    }

    const projectFileGuideline = {
      projectTitle: `Comprehensive Investigative Academic Project on ${topicsPool[0] || fallbackTopic}`,
      sections: [
        '1. Student Declaration & Certificate of Authenticity',
        '2. Acknowledgement & Dedication',
        '3. Objective, Significance and Scope of the Investigation',
        '4. Theoretical Framework & CBSE Alignment',
        '5. Experimental / Field Observation Records',
        '6. Graphs, Code Blocks, Charts & Analysis Tables',
        '7. Learning Outcomes, Bibliography & References'
      ]
    };

    const compiled = {
      schoolName: "ARDEN PROGRESSIVE SCHOOL",
      title: `CBSE Practical Examination & Assessment 2026-27`,
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
            🧪 Practical Exam, Viva Voce & Project Studio
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Multi-File Single-Click Engine
            </span>
          </h3>
          <p className="text-slate-400 mt-0.5">
            Generates 4 separate print-ready files in a single click: Practical Sheet, Viva Bank, Project Guide, and Answer Key.
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
            Type or Paste Custom Topics (One per line):
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
          ⚡ Single Click: Generate Practical, Viva, Project & Answer Files
        </Button>
      </div>

      {generatedStudio && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="no-print flex flex-wrap justify-between items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setActiveFileTab('practical')}
                className={`px-3 py-1 rounded transition ${activeFileTab === 'practical' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                1. Practical Question Paper
              </button>
              <button
                type="button"
                onClick={() => setActiveFileTab('viva')}
                className={`px-3 py-1 rounded transition ${activeFileTab === 'viva' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                2. Viva-Voce Sheet
              </button>
              <button
                type="button"
                onClick={() => setActiveFileTab('project')}
                className={`px-3 py-1 rounded transition ${activeFileTab === 'project' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                3. Project Guidelines
              </button>
              <button
                type="button"
                onClick={() => setActiveFileTab('answers')}
                className={`px-3 py-1 rounded transition ${activeFileTab === 'answers' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                4. Evaluation Key & Answers
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
              >
                🖨️ Print Active Tab (A4)
              </button>
              <button
                type="button"
                onClick={() => exportToDocx({ paperHeader: { schoolName: generatedStudio.schoolName, examName: `${generatedStudio.title} - ${activeFileTab.toUpperCase()}`, subjectName: generatedStudio.subject, className: generatedStudio.className, maxMarks: 30, timeAllowed: '2 Hours' } })}
                className="bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold"
              >
                📝 DOCX
              </button>
            </div>
          </div>

          {/* Bound to #cbse-print-region for clean A4 printing */}
          <div id="cbse-print-region" className="bg-white text-black p-8 sm:p-12 rounded-xl shadow-xl space-y-4 font-serif">
            {activeFileTab === 'practical' && (
              <div className="space-y-4">
                <div className="text-center border-b-2 border-black pb-3">
                  <h1 className="text-xl font-bold uppercase text-black">{generatedStudio.schoolName}</h1>
                  <h2 className="text-sm font-bold uppercase text-black">LABORATORY PRACTICAL EXAMINATION</h2>
                  <div className="flex justify-between text-xs font-bold pt-2 border-t border-black mt-2">
                    <span>CLASS: {generatedStudio.className}</span>
                    <span>SUBJECT: {generatedStudio.subject}</span>
                    <span>MAX. MARKS: {generatedStudio.maxMarks}</span>
                    <span>TIME: 2.5 HOURS</span>
                  </div>
                </div>

                <table className="cbse-table-grid w-full border-collapse border border-black text-xs">
                  <thead>
                    <tr className="bg-gray-100 border-b border-black text-black">
                      <th className="border border-black p-2 w-16 text-center">Exp. No</th>
                      <th className="border border-black p-2 text-left">Experiment Aim & Laboratory Guidelines</th>
                      <th className="border border-black p-2 w-20 text-center">Weightage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedStudio.experiments.map((exp) => (
                      <tr key={exp.expNo} className="border-b border-black avoid-break-inside">
                        <td className="border border-black p-2 text-center font-bold">{exp.expNo}</td>
                        <td className="border border-black p-2 text-justify space-y-1 font-sans">
                          <p className="font-bold text-black">{exp.title}</p>
                          <p className="text-gray-800 text-[11px]"><strong className="text-black">Apparatus Required:</strong> {exp.apparatus}</p>
                          <p className="text-gray-800 text-[11px]"><strong className="text-black">Working Protocol:</strong> {exp.principle}</p>
                        </td>
                        <td className="border border-black p-2 text-center font-bold">[7 Marks]</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeFileTab === 'viva' && (
              <div className="space-y-4">
                <div className="text-center border-b-2 border-black pb-3">
                  <h1 className="text-xl font-bold uppercase text-black">{generatedStudio.schoolName}</h1>
                  <h2 className="text-sm font-bold uppercase text-black">VIVA-VOCE QUESTION BANK (EXAMINER COPY)</h2>
                  <div className="flex justify-between text-xs font-bold pt-2 border-t border-black mt-2">
                    <span>CLASS: {generatedStudio.className}</span>
                    <span>SUBJECT: {generatedStudio.subject}</span>
                    <span>MAX. VIVA MARKS: 5 MARKS</span>
                  </div>
                </div>

                <table className="cbse-table-grid w-full border-collapse border border-black text-xs">
                  <thead>
                    <tr className="bg-gray-100 border-b border-black text-black">
                      <th className="border border-black p-2 w-16 text-center">Q.No</th>
                      <th className="border border-black p-2 text-left">Viva Questions</th>
                      <th className="border border-black p-2 w-20 text-center">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedStudio.vivaQuestions.map((v) => (
                      <tr key={v.qNo} className="border-b border-black avoid-break-inside font-sans">
                        <td className="border border-black p-2 text-center font-bold">{v.qNo}</td>
                        <td className="border border-black p-2 text-justify font-medium text-black">{v.question}</td>
                        <td className="border border-black p-2 text-center font-bold">[1 Mark]</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeFileTab === 'project' && (
              <div className="space-y-4">
                <div className="text-center border-b-2 border-black pb-3">
                  <h1 className="text-xl font-bold uppercase text-black">{generatedStudio.schoolName}</h1>
                  <h2 className="text-sm font-bold uppercase text-black">INVESTIGATIVE PROJECT FILE - FORMAT & INDEX</h2>
                  <div className="flex justify-between text-xs font-bold pt-2 border-t border-black mt-2">
                    <span>CLASS: {generatedStudio.className}</span>
                    <span>SUBJECT: {generatedStudio.subject}</span>
                    <span>PROJECT WEIGHTAGE: 8 MARKS</span>
                  </div>
                </div>

                <div className="border border-black p-4 space-y-3 text-xs leading-relaxed font-sans">
                  <h3 className="font-bold text-sm text-black uppercase border-b border-black pb-1">Mandatory Project Architecture:</h3>
                  <p className="font-bold text-black">{generatedStudio.projectFileGuideline.projectTitle}</p>
                  <ol className="list-decimal pl-5 space-y-1 text-black font-medium">
                    {generatedStudio.projectFileGuideline.sections.map((sec, idx) => (
                      <li key={idx}>{sec}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {activeFileTab === 'answers' && (
              <div className="space-y-4">
                <div className="text-center border-b-2 border-black pb-3">
                  <h1 className="text-xl font-bold uppercase text-black">{generatedStudio.schoolName}</h1>
                  <h2 className="text-sm font-bold uppercase text-black">CONFIDENTIAL: VIVA-VOCE MODEL ANSWERS</h2>
                  <div className="flex justify-between text-xs font-bold pt-2 border-t border-black mt-2">
                    <span>CLASS: {generatedStudio.className}</span>
                    <span>SUBJECT: {generatedStudio.subject}</span>
                    <span>EXAMINER ONLY</span>
                  </div>
                </div>

                <table className="cbse-table-grid w-full border-collapse border border-black text-xs">
                  <thead>
                    <tr className="bg-gray-100 border-b border-black text-black">
                      <th className="border border-black p-2 w-16 text-center">Q.No</th>
                      <th className="border border-black p-2 text-left">Question & Expected Model Answer</th>
                      <th className="border border-black p-2 w-20 text-center">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedStudio.vivaQuestions.map((v) => (
                      <tr key={v.qNo} className="border-b border-black avoid-break-inside font-sans">
                        <td className="border border-black p-2 text-center font-bold">{v.qNo}</td>
                        <td className="border border-black p-2">
                          <p className="font-bold text-black mb-1">{v.question}</p>
                          <pre className="font-sans text-black whitespace-pre-wrap">{v.modelAnswer}</pre>
                        </td>
                        <td className="border border-black p-2 text-center font-bold">[1 Mark]</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
