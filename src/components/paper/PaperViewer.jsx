import React, { useState } from 'react';
import { exportToDocx, exportToSlides } from '../../services/exportService.js';

export default function PaperViewer({ paperData, onClose }) {
  const [activeTab, setActiveTab] = useState('paper'); // 'paper' | 'answerKey' | 'blueprint' | 'all'

  if (!paperData) return null;

  const handlePrint = (mode = 'current') => {
    if (mode === 'all') {
      setActiveTab('all');
      setTimeout(() => {
        window.print();
      }, 250);
    } else {
      window.print();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-4">
      {/* Top Controls Toolbar (Hidden during printing) */}
      <div className="no-print bg-slate-950 px-6 py-3 border-b border-slate-800 flex flex-wrap justify-between items-center gap-3">
        {/* Navigation Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('paper')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'paper' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            📄 Question Paper
          </button>
          <button
            onClick={() => setActiveTab('answerKey')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'answerKey' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            🔑 Marking Scheme & Answers
          </button>
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'blueprint' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            📊 Topic Blueprint
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'all' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            📑 Full Dossier (Combined)
          </button>
        </div>

        {/* Print & Export Actions */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => handlePrint(activeTab)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/30"
          >
            🖨️ Print Current Tab
          </button>
          <button
            onClick={() => handlePrint('all')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition"
          >
            🖨️ Print All (Paper + Answers + Blueprint)
          </button>
          <button
            onClick={() => exportToDocx(paperData)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl font-semibold transition"
          >
            📝 Word (DOCX)
          </button>
          <button
            onClick={() => exportToSlides(paperData)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl font-semibold transition"
          >
            📽️ Slides
          </button>
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-white px-2 py-1 text-sm font-bold">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Printable Body Container */}
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* ================= PART 1: QUESTION PAPER ================= */}
        {(activeTab === 'paper' || activeTab === 'all') && (
          <div className="printable-document bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-xl font-serif text-sm leading-relaxed space-y-6">
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <p className="font-bold text-[10px] uppercase tracking-widest text-slate-600">CBSE BOARD EVALUATION SERIES 2026-27</p>
              <h1 className="text-2xl font-black uppercase tracking-tight">{paperData.paperHeader.schoolName}</h1>
              <h2 className="text-base font-bold uppercase">{paperData.paperHeader.examName}</h2>
              <div className="flex justify-between items-center pt-3 text-xs font-sans font-bold border-t border-slate-300 mt-2">
                <span>CLASS: {paperData.paperHeader.className}</span>
                <span>SUBJECT: {paperData.paperHeader.subjectName}</span>
                <span>TIME: {paperData.paperHeader.timeAllowed}</span>
                <span>MAX. MARKS: {paperData.paperHeader.maxMarks}</span>
              </div>
            </div>

            <div className="font-sans text-xs bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
              <p className="font-bold uppercase tracking-wider text-slate-700">General Instructions:</p>
              <ol className="list-decimal pl-4 space-y-0.5 text-slate-600">
                {paperData.generalInstructions?.map((ins, idx) => (
                  <li key={idx}>{ins}</li>
                ))}
              </ol>
            </div>

            <div className="space-y-6 pt-2">
              {paperData.sections?.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-4 avoid-break-inside">
                  <div className="text-center font-sans font-bold border-b border-slate-400 pb-1 text-xs uppercase tracking-wider text-slate-800">
                    {sec.sectionTitle}
                  </div>

                  <div className="space-y-3">
                    {sec.questions?.map((q) => (
                      <div key={q.qNo} className="flex justify-between items-start gap-4 text-justify avoid-break-inside">
                        <div className="space-y-1 flex-1">
                          <span className="font-bold mr-2">Q{q.qNo}.</span>
                          <span className="whitespace-pre-line">{q.questionText}</span>
                          {q.yearTag && (
                            <span className="ml-2 font-sans text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-200">
                              {q.yearTag}
                            </span>
                          )}
                        </div>
                        <span className="font-sans font-bold text-xs shrink-0">[{q.marks}]</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-6 border-t border-slate-300 text-xs font-sans text-slate-500 uppercase tracking-widest">
              *** End of Question Paper ***
            </div>
          </div>
        )}

        {/* ================= PART 2: MARKING SCHEME & ANSWERS ================= */}
        {(activeTab === 'answerKey' || activeTab === 'all') && (
          <div className={`printable-document ${activeTab === 'all' ? 'page-break-before mt-8' : ''} bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-xl space-y-5`}>
            <div className="border-b-2 border-slate-900 pb-3 text-center">
              <h2 className="text-lg font-black uppercase tracking-tight">CONFIDENTIAL - MARKING SCHEME & VALUE POINTS</h2>
              <p className="text-xs font-sans font-semibold text-slate-600">
                {paperData.paperHeader.examName} • {paperData.paperHeader.subjectName} (Class {paperData.paperHeader.className})
              </p>
            </div>

            <div className="divide-y divide-slate-300">
              {paperData.sections?.flatMap((s) => s.questions)?.map((q) => (
                <div key={q.qNo} className="py-3.5 space-y-1 avoid-break-inside text-xs">
                  <div className="flex justify-between font-bold font-sans text-slate-900">
                    <span>Question {q.qNo} [{q.marks} Mark{q.marks > 1 ? 's' : ''}]</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-300">
                      {q.topicName || 'CBSE Core Unit'}
                    </span>
                  </div>
                  <pre className="font-sans text-[11.5px] leading-relaxed whitespace-pre-wrap bg-slate-50 p-2.5 rounded border border-slate-200 text-slate-800">
                    {q.answerKey}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PART 3: TOPIC-WISE BLUEPRINT ================= */}
        {(activeTab === 'blueprint' || activeTab === 'all') && (
          <div className={`printable-document ${activeTab === 'all' ? 'page-break-before mt-8' : ''} bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-xl space-y-4`}>
            <div className="border-b-2 border-slate-900 pb-3">
              <h2 className="text-base font-black uppercase">CBSE QUESTION PAPER BLUEPRINT & WEIGHTAGE MATRIX</h2>
              <p className="text-xs font-sans text-slate-600">
                Chapter-wise distribution verified against total {paperData.paperHeader.maxMarks} marks.
              </p>
            </div>

            <table className="w-full text-left border border-slate-300 text-xs">
              <thead className="bg-slate-100 uppercase text-[10px] font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2.5 border-r border-slate-300">Unit / Chapter Focus</th>
                  <th className="p-2.5 text-center border-r border-slate-300">Total Questions Formulated</th>
                  <th className="p-2.5 text-right">Aggregate Marks Weightage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {paperData.blueprintSummary?.map((item, idx) => (
                  <tr key={idx} className="avoid-break-inside">
                    <td className="p-2.5 border-r border-slate-200 font-semibold">{item.unitName}</td>
                    <td className="p-2.5 text-center border-r border-slate-200 font-mono">{item.questionsCount} Qs</td>
                    <td className="p-2.5 text-right font-mono font-bold">{item.marksAssigned} Marks</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
