import React, { useState } from 'react';
import { exportToPrint, exportToDocx, exportToSlides } from '../../services/exportService.js';

export default function PaperViewer({ paperData, onClose }) {
  const [activeTab, setActiveTab] = useState('paper');

  if (!paperData) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-4">
      <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex flex-wrap justify-between items-center gap-3">
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
            🔑 Model Answers & Marking Scheme
          </button>
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'blueprint' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            📊 Topic-Wise Blueprint Breakdown
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button onClick={exportToPrint} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl transition">
            🖨️ Print / Save PDF
          </button>
          <button onClick={() => exportToDocx(paperData)} className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl font-semibold transition">
            📝 Export DOCX (Word)
          </button>
          <button onClick={() => exportToSlides(paperData)} className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl font-semibold transition">
            📽️ Class Slide Deck
          </button>
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-white px-2 py-1 text-sm font-bold">
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {activeTab === 'paper' && (
          <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-xl font-serif text-sm leading-relaxed space-y-6">
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <p className="font-bold text-xs uppercase tracking-widest text-slate-600">CBSE BOARD EVALUATION SERIES</p>
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
                <div key={sIdx} className="space-y-4">
                  <div className="text-center font-sans font-bold border-b border-slate-400 pb-1 text-xs uppercase tracking-wider text-slate-800">
                    {sec.sectionTitle}
                  </div>

                  <div className="space-y-3">
                    {sec.questions?.map((q) => (
                      <div key={q.qNo} className="flex justify-between items-start gap-4 text-justify">
                        <div className="space-y-1 flex-1">
                          <span className="font-bold mr-2">Q{q.qNo}.</span>
                          <span className="whitespace-pre-line">{q.questionText}</span>
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

        {activeTab === 'answerKey' && (
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-emerald-400 font-sans">
                Official CBSE Step-Wise Value Points & Model Answers
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Class {paperData.paperHeader.className} • {paperData.paperHeader.subjectName}</span>
            </div>

            <div className="divide-y divide-slate-800">
              {paperData.sections?.flatMap((s) => s.questions)?.map((q) => (
                <div key={q.qNo} className="py-3.5 space-y-1.5">
                  <div className="flex justify-between items-center text-white font-sans font-bold">
                    <span>Question {q.qNo} ({q.marks} Mark{q.marks > 1 ? 's' : ''})</span>
                    <span className="text-[10px] text-indigo-300 font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{q.topicName || 'CBSE Unit'}</span>
                  </div>
                  <pre className="text-emerald-300 text-[11px] font-mono whitespace-pre-wrap bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                    {q.answerKey}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'blueprint' && (
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
            <div>
              <h3 className="text-sm font-bold text-white">Unit & Topic-Wise Question Paper Blueprint</h3>
              <p className="text-[11px] text-slate-400">Strict mapping of how many questions and marks were generated from each chosen unit.</p>
            </div>

            <table className="w-full text-left font-mono">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Syllabus Unit / Chapter Name</th>
                  <th className="p-3 text-center">Questions Formulated</th>
                  <th className="p-3 text-right">Marks Weightage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {paperData.blueprintSummary?.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30">
                    <td className="p-3 font-sans font-semibold text-white">{item.unitName}</td>
                    <td className="p-3 text-center text-amber-300 font-bold">{item.questionsCount} Qs</td>
                    <td className="p-3 text-right text-emerald-400 font-bold">{item.marksAssigned} Marks</td>
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
