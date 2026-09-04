import React, { useState } from 'react';
import { exportToDocx, exportToSlides, printElementById } from '../../services/exportService.js';

const PaperViewer = ({ paperData, onClose }) => {
  const [activeTab, setActiveTab] = useState('paper');

  if (!paperData) return null;

  const handlePrint = () => {
    printElementById('printable-paper-core');
  };

  const cleanExamTitle = (paperData.paperHeader?.examName || 'PRE-BOARD EXAMINATION')
    .replace(/\(\s*\d+%\s*SYLLABUS\s*\)/gi, '')
    .trim();

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
            🔑 Detailed Marking Scheme
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
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/30"
          >
            🖨️ Print Active Tab (A4)
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
              {/* Official School Header with Logo on Left */}
              <div className="border-b-2 border-black pb-3 relative">
                <div className="flex items-center justify-center relative">
                  {/* Left School Logo Badge */}
                  <div className="absolute left-0 top-0 h-14 w-14 rounded-full border-2 border-black flex flex-col items-center justify-center bg-slate-100 font-bold text-xs text-center leading-none">
                    <span className="text-[14px]">🏫</span>
                    <span className="text-[8px] font-black mt-0.5">APS</span>
                  </div>

                  <div className="text-center px-16">
                    <p className="text-[9pt] font-bold tracking-widest uppercase text-gray-700">CENTRAL BOARD OF SECONDARY EDUCATION</p>
                    <h1 className="text-xl font-black uppercase tracking-tight text-black">{paperData.paperHeader?.schoolName}</h1>
                    <h2 className="text-sm font-bold uppercase text-black">{cleanExamTitle}</h2>
                  </div>
                </div>

                {/* Sub-Header: Class, Subject, Time Allowed and Maximum Marks with clean gap */}
                <table className="w-full border-t border-b border-black text-xs font-bold mt-3">
                  <tbody>
                    <tr>
                      <td className="text-left py-1.5 w-1/4">CLASS: {paperData.paperHeader?.className}</td>
                      <td className="text-center py-1.5 w-2/4">SUBJECT: {paperData.paperHeader?.subjectName}</td>
                      <td className="text-right py-1.5 w-1/4">
                        TIME: {paperData.paperHeader?.timeAllowed} &nbsp;&nbsp;|&nbsp;&nbsp; MAX. MARKS: {paperData.paperHeader?.maxMarks}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Instructions */}
              <div className="text-xs bg-gray-50 p-3 rounded border border-black space-y-1">
                <p className="font-bold uppercase tracking-wider text-black">General Instructions:</p>
                <ol className="list-decimal pl-4 space-y-0.5 text-black">
                  {paperData.generalInstructions?.map((ins, idx) => (
                    <li key={idx}>{ins}</li>
                  ))}
                </ol>
              </div>

              {/* 3-Column Question Paper Grid */}
              <div className="space-y-6 pt-2">
                {paperData.sections?.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-2 avoid-split">
                    <div className="text-center font-bold text-xs uppercase tracking-widest py-1 border border-black bg-gray-100 text-black">
                      {sec.sectionTitle}
                    </div>

                    <table className="cbse-grid w-full border-collapse border border-black text-xs">
                      <thead>
                        <tr className="bg-gray-100 border-b border-black text-black">
                          <th className="border border-black p-2 w-12 text-center">Q.No</th>
                          <th className="border border-black p-2 text-left">Question Details</th>
                          <th className="border border-black p-2 w-16 text-center">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sec.questions?.map((q) => (
                          <tr key={q.qNo} className="border-b border-black avoid-split">
                            <td className="border border-black p-2 align-top text-center font-bold">{q.qNo}</td>
                            <td className="border border-black p-2 align-top text-left font-sans leading-relaxed">
                              <div className="whitespace-pre-line text-black font-sans">{q.questionText}</div>
                            </td>
                            <td className="border border-black p-2 align-top text-center font-bold">[{q.marks}]</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-black text-xs font-bold text-black">
                <span>*** End of Question Paper ***</span>
                <span className="font-sans">Page 1 of Paper</span>
              </div>
            </div>
          )}

          {/* ================= PART 2: DETAILED MARKING SCHEME ================= */}
          {(activeTab === 'answerKey' || activeTab === 'all') && (
            <div className={`space-y-4 ${activeTab === 'all' ? 'page-break pt-6' : ''}`}>
              <div className="border-b-2 border-black pb-2 text-center">
                <h2 className="text-base font-black uppercase text-black">CONFIDENTIAL: OFFICIAL MARKING SCHEME & STEP BREAKDOWN</h2>
                <p className="text-xs font-bold text-black">
                  {cleanExamTitle} • {paperData.paperHeader?.subjectName} ({paperData.paperHeader?.className})
                </p>
              </div>

              <table className="cbse-grid w-full border-collapse border border-black text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-black text-black">
                    <th className="border border-black p-2 w-12 text-center">Q.No</th>
                    <th className="border border-black p-2 text-left">Detailed Step-Wise Value Points & Model Solution</th>
                    <th className="border border-black p-2 w-16 text-center">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {paperData.sections?.flatMap((s) => s.questions)?.map((q) => (
                    <tr key={q.qNo} className="border-b border-black avoid-split">
                      <td className="border border-black p-2 align-top text-center font-bold">{q.qNo}</td>
                      <td className="border border-black p-2 align-top text-left font-sans">
                        <div className="text-[10px] font-bold text-gray-700 uppercase mb-1">
                          Unit: {q.topicName || 'Syllabus Topic'}
                        </div>
                        <pre className="whitespace-pre-wrap leading-relaxed text-black font-sans text-xs bg-slate-50 p-2 rounded border border-gray-200">{q.answerKey}</pre>
                      </td>
                      <td className="border border-black p-2 align-top text-center font-bold">[{q.marks}]</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ================= PART 3: TOPIC BLUEPRINT ================= */}
          {(activeTab === 'blueprint' || activeTab === 'all') && (
            <div className={`space-y-4 ${activeTab === 'all' ? 'page-break pt-6' : ''}`}>
              <div className="border-b-2 border-black pb-2">
                <h2 className="text-base font-black uppercase text-black">CBSE QUESTION PAPER BLUEPRINT MATRIX</h2>
                <p className="text-xs text-black">Mapped against total {paperData.paperHeader?.maxMarks} marks.</p>
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
                    <tr key={idx} className="border-b border-black avoid-split font-sans">
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
};

export default PaperViewer;
