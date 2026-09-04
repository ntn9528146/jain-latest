import React, { useState } from 'react';
import Button from '../common/Button.jsx';
import { exportToDocx, printElementById } from '../../services/exportService.js';
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

    const fallbackTopic = selectedSubject || 'Laboratory Practical Skill';
    const isCS = selectedSubject.toLowerCase().includes('computer') || selectedSubject.toLowerCase().includes('it');
    const isChem = selectedSubject.toLowerCase().includes('chem');

    const experiments = [];
    for (let i = 0; i < experimentCount; i++) {
      const topic = topicsPool.length > 0 ? topicsPool[i % topicsPool.length] : fallbackTopic;
      
      let expTitle = `To study, investigate and experimentally verify the characteristics of ${topic}.`;
      let apparatus = 'Standard Laboratory Workstation / Apparatus / Hardware Setup';

      if (isCS) {
        expTitle = `Write a Python program to implement ${topic} with file handling and database connectivity.`;
        apparatus = 'Python 3.x IDLE, MySQL 8.0 Server, Client Terminal';
      } else if (isChem) {
        expTitle = `Prepare a standard solution and perform quantitative chemical titration involving ${topic}.`;
        apparatus = 'Burette, Pipette, Conical Flask, Standard Chemical Reagents';
      }

      experiments.push({
        expNo: i + 1,
        title: expTitle,
        apparatus,
        principle: `According to official CBSE practical curriculum specifications for ${selectedSubject}.`,
        marking: 'Aim & Apparatus (1M) + Procedure (2M) + Observations/Graphs (3M) + Result (1M) = 7 Marks'
      });
    }

    const vivaQuestions = [];
    for (let i = 0; i < vivaCount; i++) {
      const topic = topicsPool.length > 0 ? topicsPool[(i + 1) % topicsPool.length] : fallbackTopic;
      vivaQuestions.push({
        qNo: i + 1,
        question: `What is the core working principle and technical significance of "${topic}"?`,
        modelAnswer: `Candidate must explain the governing principle of ${topic}, state potential sources of experimental error, and justify precision standards.`
      });
    }

    const projectFileGuideline = {
      projectTitle: `Comprehensive Investigative Academic Project on ${topicsPool[0] || fallbackTopic}`,
      sections: [
        '1. Student Declaration & Certificate of Authenticity',
        '2. Acknowledgement & Dedication',
        '3. Objective, Aim and Scope of the Investigation',
        '4. Theoretical Framework & CBSE Curriculum Alignment',
        '5. Experimental / Data Collection Log',
        '6. Graphs, Code Blocks, Charts & Observation Table',
        '7. Conclusions, Bibliography & Web References'
      ]
    };

    const compiled = {
      schoolName: 'ARDEN PROGRESSIVE SCHOOL',
      title: 'CBSE Practical Examination & Assessment 2026-27',
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

  const handlePrintPractical = () => {
    printElementById('printable-practical-core');
  };

  const handleExportDocx = () => {
    if (!generatedStudio) return;

    let secQuestions = [];
    if (activeFileTab === 'practical') {
      secQuestions = generatedStudio.experiments.map((e) => ({
        qNo: e.expNo,
        marks: 7,
        questionText: `${e.title}\nApparatus: ${e.apparatus}\nProtocol: ${e.principle}`,
        answerKey: e.marking
      }));
    } else if (activeFileTab === 'viva' || activeFileTab === 'answers') {
      secQuestions = generatedStudio.vivaQuestions.map((v) => ({
        qNo: v.qNo,
        marks: 1,
        questionText: v.question,
        answerKey: v.modelAnswer
      }));
    } else {
      secQuestions = generatedStudio.projectFileGuideline.sections.map((s, idx) => ({
        qNo: idx + 1,
        marks: 1,
        questionText: s,
        answerKey: 'Verified documentation module'
      }));
    }

    exportToDocx({
      paperHeader: {
        schoolName: generatedStudio.schoolName,
        examName: `${generatedStudio.title} - ${activeFileTab.toUpperCase()}`,
        subjectName: generatedStudio.subject,
        className: generatedStudio.className,
        maxMarks: 30,
        timeAllowed: '2.5 Hours'
      },
      generalInstructions: [
        "Candidates must follow standard safety guidelines.",
        "Perform the assigned experiments systematically."
      ],
      sections: [
        {
          sectionTitle: `EVALUATION MODULE: ${activeFileTab.toUpperCase()}`,
          marksPerQ: 7,
          questions: secQuestions
        }
      ]
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5 text-xs">
      <div className="no-print flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            🧪 Practical Exam, Viva Voce & Project Studio
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Multi-File Single-Click
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
            placeholder="e.g. Verification of Ohm's Law&#10;Logic Gates Simulation..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-[11px]"
          />
        </div>
      )}

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
                onClick={handlePrintPractical}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-lg shadow-indigo-600/30"
              >
                🖨️ Print Active File (A4)
              </button>
              <button
                type="button"
                onClick={handleExportDocx}
                className="bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold"
              >
                📝 Word (DOCX)
              </button>
            </div>
          </div>

          <div id="printable-practical-core" className="bg-white text-black p-8 sm:p-12 rounded-xl shadow-xl space-y-4 font-serif">
            {activeFileTab === 'practical' && (
              <div className="space-y-4">
                <div className="border-b-2 border-black pb-3 relative">
                  <div className="flex items-center justify-center relative">
                    <div className="absolute left-0 top-0 h-14 w-14 rounded-full border-2 border-black flex flex-col items-center justify-center bg-slate-100 font-bold text-xs text-center leading-none">
                      <span className="text-[14px]">🏫</span>
                      <span className="text-[8px] font-black mt-0.5">APS</span>
                    </div>
                    <div className="text-center px-16">
                      <p className="text-xl font-black uppercase text-black">{generatedStudio.schoolName}</p>
                      <p className="text-sm font-bold uppercase text-black">LABORATORY PRACTICAL EXAMINATION</p>
                    </div>
                  </div>

                  <table className="w-full border-t border-b border-black text-xs font-bold mt-3">
                    <tbody>
                      <tr>
                        <td className="text-left py-1.5 w-1/4">CLASS: {generatedStudio.className}</td>
                        <td className="text-center py-1.5 w-2/4">SUBJECT: {generatedStudio.subject}</td>
                        <td className="text-right py-1.5 w-1/4">TIME: 2.5 HOURS &nbsp;|&nbsp; MAX. MARKS: {generatedStudio.maxMarks}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <table className="cbse-grid w-full border-collapse border border-black text-xs">
                  <thead>
                    <tr className="bg-gray-100 border-b border-black text-black">
                      <th className="border border-black p-2 w-16 text-center">Exp. No</th>
                      <th className="border border-black p-2 text-left">Experiment Aim & Guidelines</th>
                      <th className="border border-black p-2 w-20 text-center">Weightage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedStudio.experiments.map((exp) => (
                      <tr key={exp.expNo} className="border-b border-black avoid-split">
                        <td className="border border-black p-2 text-center font-bold">{exp.expNo}</td>
                        <td className="border border-black p-2 text-left space-y-1 font-sans">
                          <p className="font-bold text-black">{exp.title}</p>
                          <p className="text-gray-800 text-[11px]"><strong className="text-black">Apparatus:</strong> {exp.apparatus}</p>
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
                <div className="border-b-2 border-black pb-3 relative">
                  <div className="flex items-center justify-center relative">
                    <div className="absolute left-0 top-0 h-14 w-14 rounded-full border-2 border-black flex flex-col items-center justify-center bg-slate-100 font-bold text-xs text-center leading-none">
                      <span className="text-[14px]">🏫</span>
                      <span className="text-[8px] font-black mt-0.5">APS</span>
                    </div>
                    <div className="text-center px-16">
                      <p className="text-xl font-black uppercase text-black">{generatedStudio.schoolName}</p>
                      <p className="text-sm font-bold uppercase text-black">VIVA-VOCE QUESTION BANK (EXAMINER COPY)</p>
                    </div>
                  </div>

                  <table className="w-full border-t border-b border-black text-xs font-bold mt-3">
                    <tbody>
                      <tr>
                        <td className="text-left py-1.5">CLASS: {generatedStudio.className}</td>
                        <td className="text-center py-1.5">SUBJECT: {generatedStudio.subject}</td>
                        <td className="text-right py-1.5">MAX. VIVA MARKS: 5 MARKS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <table className="cbse-grid w-full border-collapse border border-black text-xs">
                  <thead>
                    <tr className="bg-gray-100 border-b border-black text-black">
                      <th className="border border-black p-2 w-16 text-center">Q.No</th>
                      <th className="border border-black p-2 text-left">Viva Questions</th>
                      <th className="border border-black p-2 w-20 text-center">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedStudio.vivaQuestions.map((v) => (
                      <tr key={v.qNo} className="border-b border-black avoid-split font-sans">
                        <td className="border border-black p-2 text-center font-bold">{v.qNo}</td>
                        <td className="border border-black p-2 text-left font-medium text-black">{v.question}</td>
                        <td className="border border-black p-2 text-center font-bold">[1 Mark]</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeFileTab === 'project' && (
              <div className="space-y-4">
                <div className="border-b-2 border-black pb-3 text-center">
                  <p className="text-xl font-black uppercase text-black">{generatedStudio.schoolName}</p>
                  <p className="text-sm font-bold uppercase text-black">INVESTIGATIVE PROJECT FILE - FORMAT & INDEX</p>
                  <p className="text-xs font-bold text-black mt-1">CLASS: {generatedStudio.className} | SUBJECT: {generatedStudio.subject}</p>
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
                <div className="border-b-2 border-black pb-3 text-center">
                  <p className="text-xl font-black uppercase text-black">{generatedStudio.schoolName}</p>
                  <p className="text-sm font-bold uppercase text-black">CONFIDENTIAL: VIVA-VOCE MODEL ANSWERS</p>
                  <p className="text-xs font-bold text-black mt-1">CLASS: {generatedStudio.className} | SUBJECT: {generatedStudio.subject}</p>
                </div>

                <table className="cbse-grid w-full border-collapse border border-black text-xs">
                  <thead>
                    <tr className="bg-gray-100 border-b border-black text-black">
                      <th className="border border-black p-2 w-16 text-center">Q.No</th>
                      <th className="border border-black p-2 text-left">Question & Detailed Model Answer</th>
                      <th className="border border-black p-2 w-20 text-center">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedStudio.vivaQuestions.map((v) => (
                      <tr key={v.qNo} className="border-b border-black avoid-split font-sans">
                        <td className="border border-black p-2 text-center font-bold">{v.qNo}</td>
                        <td className="border border-black p-2 text-left">
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
