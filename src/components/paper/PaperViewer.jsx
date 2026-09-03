import React, { useState } from 'react';
import { exportToPrint, exportToDocx, exportToSlides } from '../../services/exportService.js';

export default function PaperViewer({ paperData, onClose }) {
  const [activeTab, setActiveTab] = useState('paper'); // 'paper' | 'answerKey' | 'blueprint'

  if (!paperData) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-4">
      {/* Top Action Bar */}
      <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex flex-wrap justify-between items-center gap-3">
        {/* Toggle Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('paper')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'paper' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            📄 Question Paper (A4 View)
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
            📊 CBSE Blueprint Matrix
          </button>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={exportToPrint}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition"
          >
            🖨️ Print / Save PDF
          </button>
          <button
            onClick={() => exportToDocx(paperData)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl font-semibold transition"
          >
            📝 Export DOCX (Word)
          </button>
          <button
            onClick={() => exportToSlides(paperData)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl font-semibold transition"
          >
            📽️ Class Slide Deck
          </button>
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-white px-2 py-1 text-sm font-bold">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Printable A4 View Container */}
      <div className="p-6 max-w-4xl mx-auto">
        {activeTab === 'paper' && (
          <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-xl font-serif text-sm leading-relaxed space-y-6">
            {/* Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <p className="font-bold text-xs uppercase tracking-widest text-slate-600">CBSE BOARD EVALUATION SERIES 2026-27</p>
              <h1 className="text-2xl font-black uppercase tracking-tight">{paperData.paperHeader.schoolName}</h1>
              <h2 className="text-base font-bold uppercase">{paperData.paperHeader.examName}</h2>
              <div className="flex justify-between items-center pt-3 text-xs font-sans font-bold border-t border-slate-300 mt-2">
                <span>CLASS: {paperData.paperHeader.className}</span>
                <span>SUBJECT: {paperData.paperHeader.subjectName}</span>
                <span>TIME: {paperData.paperHeader.timeAllowed}</span>
                <span>MAX. MARKS: {paperData.paperHeader.maxMarks}</span>
              </div>
            </div>

            {/* General Instructions */}
            <div className="font-sans text-xs bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
              <p className="font-bold uppercase tracking-wider text-slate-700">General Instructions:</p>
              <ol className="list-decimal pl-4 space-y-0.5 text-slate-600">
                {paperData.generalInstructions?.map((ins, idx) => (
                  <li key={idx}>{ins}</li>
                ))}
              </ol>
            </div>

            {/* Sections & Questions */}
            <div className="space-y-6 pt-2">
              {paperData.sections?.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <div className="text-center font-sans font-bold border-b border-slate-400 pb-1 text-xs uppercase tracking-wider text-slate-800">
                    {sec.sectionTitle}
                  </div>

                  <div className="space-y-3">
                    {sec.questions?.map((q) => (
                      <div key={q.qNo} className="flex justify-between items-start gap-4 text-justify">
                        <div className="space-y-1 flex-1">
                          <span className="font-bold mr-2">Q{q.qNo}.</span>
                          <span>{q.questionText}</span>
                          {q.yearTag && (
                            <span className="ml-2 font-sans text-[11px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
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

            <div className="text-center pt-8 border-t border-slate-200 text-xs font-sans text-slate-500 uppercase tracking-widest">
              *** End of Question Paper ***
            </div>
          </div>
        )}

        {/* Tab 2: Marking Scheme */}
        {activeTab === 'answerKey' && (
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs font-mono">
            <h3 className="text-sm font-bold text-emerald-400 font-sans">Official CBSE Step-Wise Marking Scheme & Value Points</h3>
            <div className="divide-y divide-slate-800">
              {paperData.sections?.flatMap((s) => s.questions)?.map((q) => (
                <div key={q.qNo} className="py-3 space-y-1">
                  <div className="flex justify-between text-white font-sans font-bold">
                    <span>Question {q.qNo} ({q.marks} Mark{q.marks > 1 ? 's' : ''})</span>
                    <span className="text-slate-400 font-mono text-[11px]">{q.yearTag}</span>
                  </div>
                  <pre className="text-slate-300 text-[11px] whitespace-pre-wrap bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    {q.answerKey}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Blueprint Matrix */}
        {activeTab === 'blueprint' && (
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white">CBSE Sectional Weightage & Competency Grid</h3>
            <table className="w-full text-left font-mono">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Section Title</th>
                  <th className="p-3 text-center">Marks / Q</th>
                  <th className="p-3 text-center">Total Questions</th>
                  <th className="p-3 text-right">Aggregate Weightage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {paperData.sections?.map((sec, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-sans font-semibold text-white">{sec.sectionTitle}</td>
                    <td className="p-3 text-center">{sec.marksPerQ} M</td>
                    <td className="p-3 text-center text-amber-300 font-bold">{sec.questions?.length}</td>
                    <td className="p-3 text-right text-emerald-400 font-bold">{sec.marksPerQ * sec.questions?.length} Marks</td>
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
