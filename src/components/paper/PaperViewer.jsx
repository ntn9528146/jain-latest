import React, { useState } from 'react';
import { exportToDocx, exportToSlides, printElementById } from '../../services/exportService.js';

export default function PaperViewer({ paperData, onClose }) {
  const [activeTab, setActiveTab] = useState('paper');

  if (!paperData) return null;

  const handlePrint = () => {
    printElementById('printable-paper-core');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-4">
      {/* Top Controls Toolbar */}
      <div className="no-print bg-slate-950 px-6 py-3 border-b border-slate-800 flex flex-wrap justify-between items-center gap-3">
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('paper')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'paper' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            📄 Board Question Paper
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('answerKey')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'answerKey' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            🔑 Marking Scheme & Answers
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('blueprint')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'blueprint' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            📊 Topic Blueprint
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'all' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            📑 Complete Evaluation Dossier
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={handlePrint}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/30"
          >
            🖨️ Print Document (A4)
          </button>
          <button
            type="button"
            onClick={() => exportToDocx(paperData)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl font-semibold transition"
          >
            📝 Word (DOCX)
          </button>
          <button
            type="button"
            onClick={() => exportToSlides(paperData)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl font-semibold transition"
          >
            📽️ Slides
          </button>
          {onClose && (
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-white px-2 py-1 text-sm font-bold">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Target Print Area */}
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div id="printable-paper-core" className="bg-white text-black p-8 sm:p-12 rounded-xl shadow-xl space-y-4 font-serif">
          {/* ================= PART 1: QUESTION PAPER ================= */}
          {(activeTab === 'paper' || activeTab === 'all') && (
            <div className="space-y-4">
              <div className="text-center border-b-2 border-black pb-3 space-y-1">
                <p className="text-[10pt] font-bold tracking-wider uppercase text-gray-700">CENTRAL BOARD OF SECONDARY EDUCATION - EVALUATION SERIES</p>
                <p className="header-title text-xl font-bold uppercase tracking-tight text-black">{paperData.paperHeader?.schoolName}</p>
                <p className="header-sub text-sm font-bold uppercase text-black">{paperData.paperHeader?.examName}</p>
                <table className="w-full border-t border-b border-black text-xs font-bold my-2">
                  <tbody>
                    <tr>
                      <td className="text-left py-1">CLASS: {paperData.paperHeader?.className}</td>
                      <td className="text-center py-1">SUBJECT: {paperData.paperHeader?.subjectName}</td>
                      <td className="text-right py-1">TIME: {paperData.paperHeader?.timeAllowed} | MAX. MARKS: {paperData.paperHeader?.maxMarks}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-xs bg-gray-50 p-3 rounded border border-black space-y-1">
                <p className="font-bold uppercase tracking-wider text-black">General Instructions:</p>
                <ol className="list-decimal pl-4 space-y-0.5 text-black">
                  {paperData.generalInstructions?.map((ins, idx) => (
                    <li key={idx}>{ins}</li>
                  ))}
                </ol>
              </div>

              <div className="space-y-6 pt-2">
                {paperData.sections?.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-2 no-split">
                    <div className="text-center font-bold text-xs uppercase tracking-widest py-1 border border-black bg-gray-100 text-black">
                      {sec.sectionTitle}
                    </div>

                    <table className="cbse-grid w-full border-collapse border border-black text-xs">
                      <thead>
                        <tr className="bg-gray-100 border-b border-black text-black">
                          <th className="border border-black p-2 w-12 text-center">Q.No</th>
                          <th className="border border-black p-2 text-left">Question Text & Options</th>
                          <th className="border border-black p-2 w-16 text-center">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sec.questions?.map((q) => (
                          <tr key={q.qNo} className="border-b border-black no-split">
                            <td className="border border-black p-2 align-top text-center font-bold">{q.qNo}</td>
                            <td className="border border-black p-2 align-top text-left font-sans leading-relaxed">
                              <div className="whitespace-pre-line text-black">{q.questionText}</div>
                            </td>
                            <td className="border border-black p-2 align-top text-center font-bold">[{q.marks}]</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              <div className="text-center pt-6 border-t border-black text-xs uppercase tracking-widest text-black font-bold">
                *** End of Question Paper ***
              </div>
            </div>
          )}

          {/* ================= PART 2: MARKING SCHEME ================= */}
          {(activeTab === 'answerKey' || activeTab === 'all') && (
            <div className={`space-y-4 ${activeTab === 'all' ? 'page-break pt-6' : ''}`}>
              <div className="border-b-2 border-black pb-2 text-center">
                <p className="header-title text-base font-bold uppercase">CONFIDENTIAL: OFFICIAL MARKING SCHEME</p>
                <p className="text-xs font-bold text-black">
                  {paperData.paperHeader?.examName} • {paperData.paperHeader?.subjectName} ({paperData.paperHeader?.className})
                </p>
              </div>

              <table className="cbse-grid w-full border-collapse border border-black text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-black text-black">
                    <th className="border border-black p-2 w-12 text-center">Q.No</th>
                    <th className="border border-black p-2 text-left">Step-Wise Value Points / Model Answer</th>
                    <th className="border border-black p-2 w-16 text-center">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {paperData.sections?.flatMap((s) => s.questions)?.map((q) => (
                    <tr key={q.qNo} className="border-b border-black no-split">
                      <td className="border border-black p-2 align-top text-center font-bold">{q.qNo}</td>
                      <td className="border border-black p-2 align-top text-left font-sans">
                        <pre className="whitespace-pre-wrap leading-relaxed text-black font-sans text-xs">{q.answerKey}</pre>
                      </td>
                      <td className="border border-black p-2 align-top text-center font-bold">[{q.marks}]</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ================= PART 3: BLUEPRINT ================= */}
          {(activeTab === 'blueprint' || activeTab === 'all') && (
            <div className={`space-y-4 ${activeTab === 'all' ? 'page-break pt-6' : ''}`}>
              <div className="border-b-2 border-black pb-2">
                <p className="header-title text-base font-bold uppercase">CBSE QUESTION PAPER BLUEPRINT MATRIX</p>
                <p className="text-xs text-black">Verified against total {paperData.paperHeader?.maxMarks} marks.</p>
              </div>

              <table className="cbse-grid w-full border-collapse border border-black text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-black text-black">
                    <th className="border border-black p-2 text-left">Syllabus Unit Focus</th>
                    <th className="border border-black p-2 text-center w-36">Questions Count</th>
                    <th className="border border-black p-2 text-right w-36">Marks Weightage</th>
                  </tr>
                </thead>
                <tbody>
                  {paperData.blueprintSummary?.map((item, idx) => (
                    <tr key={idx} className="border-b border-black no-split font-sans">
                      <td className="border border-black p-2 font-semibold text-black">{item.unitName}</td>
                      <td className="border border-black p-2 text-center font-bold text-black">{item.questionsCount} Qs</td>
                      <td className="border border-black p-2 text-right font-bold text-black">{item.marksAssigned} Marks</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
