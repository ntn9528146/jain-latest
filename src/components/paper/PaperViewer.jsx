import React, { useState } from 'react';
import { exportToDocx, exportToSlides } from '../../services/exportService.js';

const PaperViewer = ({ paperData, onClose }) => {
  const [activeTab, setActiveTab] = useState('paper'); // paper | answerKey | blueprint | all

  if (!paperData) return null;

  const handlePrint = (mode = 'current') => {
    if (mode === 'all') {
      setActiveTab('all');
      setTimeout(() => window.print(), 250);
    } else {
      window.print();
    }
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
            📄 Board Question Paper (3-Col Grid)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('answerKey')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'answerKey' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            🔑 Marking Scheme & Step Values
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('blueprint')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'blueprint' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            📊 Topic Blueprint Matrix
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
            onClick={() => handlePrint(activeTab)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition"
          >
            🖨️ Print Active Tab
          </button>
          <button
            type="button"
            onClick={() => handlePrint('all')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition"
          >
            🖨️ Print Complete Package
          </button>
          <button
            type="button"
            onClick={() => exportToDocx(paperData)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl font-semibold transition"
          >
            📝 DOCX
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

      {/* Main Document Body */}
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* ================= 1. QUESTION PAPER (3-Column Layout with Borders) ================= */}
        {(activeTab === 'paper' || activeTab === 'all') && (
          <div className="cbse-board-sheet bg-white text-black p-8 sm:p-12 rounded-xl shadow-xl space-y-4 font-serif">
            <div className="text-center border-b-2 border-black pb-3 space-y-1">
              <p className="text-[10pt] font-bold tracking-wider uppercase text-gray-700">CENTRAL BOARD OF SECONDARY EDUCATION - EVALUATION SERIES</p>
              <h1 className="cbse-header-title text-xl tracking-tight text-black">{paperData.paperHeader?.schoolName}</h1>
              <h2 className="text-sm font-bold uppercase text-black">{paperData.paperHeader?.examName}</h2>
              <div className="flex justify-between items-center text-xs font-bold pt-2 border-t border-black mt-2">
                <span>CLASS: {paperData.paperHeader?.className}</span>
                <span>SUBJECT: {paperData.paperHeader?.subjectName}</span>
                <span>TIME: {paperData.paperHeader?.timeAllowed}</span>
                <span>MAX. MARKS: {paperData.paperHeader?.maxMarks}</span>
              </div>
            </div>

            <div className="text-xs bg-gray-50 p-3 rounded border border-black space-y-1">
              <p className="font-bold uppercase tracking-wider text-black">General Instructions:</p>
              <ol className="list-decimal pl-4 space-y-0.5 text-black">
                {paperData.generalInstructions?.map((ins, idx) => (
                  <li key={idx}>{ins}</li>
                ))}
              </ol>
            </div>

            {/* Sections & 3-Column Table Grid */}
            <div className="space-y-6 pt-2">
              {paperData.sections?.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-2 avoid-break-inside">
                  <div className="text-center font-bold text-xs uppercase tracking-widest py-1 border-t-2 border-b-2 border-black bg-gray-100 text-black">
                    {sec.sectionTitle}
                  </div>

                  <table className="cbse-table-grid w-full border-collapse border border-black text-xs">
                    <thead>
                      <tr className="bg-gray-100 border-b border-black text-black">
                        <th className="cbse-col-qno border border-black p-2">Q.No</th>
                        <th className="cbse-col-text border border-black p-2 text-left">Question Text / Details</th>
                        <th className="cbse-col-marks border border-black p-2">Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sec.questions?.map((q) => (
                        <tr key={q.qNo} className="border-b border-black avoid-break-inside">
                          <td className="cbse-col-qno border border-black p-2 align-top text-center font-bold">
                            {q.qNo}
                          </td>
                          <td className="cbse-col-text border border-black p-2 align-top text-justify">
                            <span className="whitespace-pre-line text-black leading-relaxed">{q.questionText}</span>
                            {q.yearTag && (
                              <span className="inline-block ml-2 text-[10px] font-bold text-gray-800 bg-gray-200 px-1.5 py-0.5 rounded border border-gray-400">
                                {q.yearTag}
                              </span>
                            )}
                          </td>
                          <td className="cbse-col-marks border border-black p-2 align-top text-center font-bold">
                            [{q.marks}]
                          </td>
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

        {/* ================= 2. SEPARATE MARKING SCHEME ================= */}
        {(activeTab === 'answerKey' || activeTab === 'all') && (
          <div className={`cbse-board-sheet ${activeTab === 'all' ? 'page-break-before mt-8' : ''} bg-white text-black p-8 sm:p-12 rounded-xl shadow-xl space-y-4 font-serif`}>
            <div className="border-b-2 border-black pb-2 text-center">
              <h2 className="text-base font-bold uppercase">CONFIDENTIAL: OFFICIAL MARKING SCHEME & VALUE POINTS</h2>
              <p className="text-xs font-bold text-black">
                {paperData.paperHeader?.examName} • {paperData.paperHeader?.subjectName} ({paperData.paperHeader?.className})
              </p>
            </div>

            <table className="cbse-table-grid w-full border-collapse border border-black text-xs">
              <thead>
                <tr className="bg-gray-100 border-b border-black text-black">
                  <th className="cbse-col-qno border border-black p-2">Q.No</th>
                  <th className="cbse-col-text border border-black p-2 text-left">Detailed Step-Wise Value Points / Key</th>
                  <th className="cbse-col-marks border border-black p-2">Marks</th>
                </tr>
              </thead>
              <tbody>
                {paperData.sections?.flatMap((s) => s.questions)?.map((q) => (
                  <tr key={q.qNo} className="border-b border-black avoid-break-inside">
                    <td className="cbse-col-qno border border-black p-2 align-top text-center font-bold">
                      {q.qNo}
                    </td>
                    <td className="cbse-col-text border border-black p-2 align-top">
                      <div className="font-bold text-[10px] text-gray-700 uppercase mb-1">
                        Topic: {q.topicName || 'Core Curriculum'}
                      </div>
                      <pre className="font-serif text-xs whitespace-pre-wrap leading-relaxed text-black">
                        {q.answerKey}
                      </pre>
                    </td>
                    <td className="cbse-col-marks border border-black p-2 align-top text-center font-bold">
                      [{q.marks}]
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= 3. TOPIC BLUEPRINT MATRIX ================= */}
        {(activeTab === 'blueprint' || activeTab === 'all') && (
          <div className={`cbse-board-sheet ${activeTab === 'all' ? 'page-break-before mt-8' : ''} bg-white text-black p-8 sm:p-12 rounded-xl shadow-xl space-y-4 font-serif`}>
            <div className="border-b-2 border-black pb-2">
              <h2 className="text-base font-bold uppercase">CBSE QUESTION PAPER BLUEPRINT & CHAPTER-WISE DISTRIBUTION</h2>
              <p className="text-xs text-black">Mapped against total {paperData.paperHeader?.maxMarks} marks.</p>
            </div>

            <table className="cbse-table-grid w-full border-collapse border border-black text-xs">
              <thead>
                <tr className="bg-gray-100 border-b border-black text-black">
                  <th className="border border-black p-2 text-left">Syllabus Unit / Chapter Name</th>
                  <th className="border border-black p-2 text-center w-36">Questions Count</th>
                  <th className="border border-black p-2 text-right w-36">Total Marks Assigned</th>
                </tr>
              </thead>
              <tbody>
                {paperData.blueprintSummary?.map((item, idx) => (
                  <tr key={idx} className="border-b border-black avoid-break-inside">
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
  );
};

export default PaperViewer;
