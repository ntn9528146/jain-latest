import React, { useState } from 'react';
import { exportToDocx, exportToSlides, printElementById, formatClassWithSuperscript } from '../../services/exportService.js';

export default function PaperViewer({ paperData, onClose }) {
  const [activeTab, setActiveTab] = useState('paper');

  if (!paperData) return null;

  const handlePrint = () => {
    printElementById('printable-paper-core');
  };

  const cleanExamTitle = (paperData.paperHeader?.examName || 'PRE-BOARD EXAMINATION')
    .replace(/\(\s*\d+%\s*SYLLABUS\s*\)/gi, '')
    .trim()
    .toUpperCase();

  const classFormatted = formatClassWithSuperscript(paperData.paperHeader?.className || '12');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-4 font-serif">
      {/* Top Controls Toolbar */}
      <div className="no-print bg-slate-950 px-6 py-3 border-b border-slate-800 flex flex-wrap justify-between items-center gap-3">
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-sans font-semibold">
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

        <div className="flex items-center gap-2 text-xs font-sans">
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
        <div id="printable-paper-core" className="bg-white text-black p-8 sm:p-12 rounded-xl shadow-xl space-y-4">
          {(activeTab === 'paper' || activeTab === 'all') && (
            <div className="space-y-4">
              {/* Official CBSE Header */}
              <div className="border-b-2 border-black pb-2 text-center relative">
                <div className="absolute left-0 top-0 h-14 w-14 rounded-full border-2 border-black flex flex-col items-center justify-center bg-slate-100 font-bold text-xs leading-none">
                  <span className="text-[16px]">🏫</span>
                  <span className="text-[8px] font-black mt-0.5">APS</span>
                </div>

                <p className="text-[14pt] font-bold tracking-wider uppercase text-black">CENTRAL BOARD OF SECONDARY EDUCATION</p>
                <h1 className="text-[16pt] font-bold uppercase tracking-tight text-black mt-1">
                  {paperData.paperHeader?.schoolName || 'ARDEN PROGRESSIVE SCHOOL'}
                </h1>
                <h2 className="text-[14pt] font-bold uppercase text-black mt-0.5">{cleanExamTitle}</h2>

                <table className="w-full border-t-2 border-b-2 border-black text-[14pt] font-bold uppercase mt-3">
                  <tbody>
                    <tr>
                      <td className="text-left py-1 w-1/4" dangerouslySetInnerHTML={{ __html: `CLASS: ${classFormatted}` }} />
                      <td className="text-center py-1 w-2/4">SUBJECT: {paperData.paperHeader?.subjectName}</td>
                      <td className="text-right py-1 w-1/4 whitespace-nowrap">
                        TIME: {paperData.paperHeader?.timeAllowed} &nbsp;|&nbsp; MAX. MARKS: {paperData.paperHeader?.maxMarks}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Instructions */}
              <div className="p-3 border border-black rounded space-y-1">
                <p className="text-[14pt] font-bold uppercase text-black">GENERAL INSTRUCTIONS:</p>
                <ol className="list-decimal pl-5 text-[12pt] font-normal text-black space-y-0.5">
                  {paperData.generalInstructions?.map((ins, idx) => (
                    <li key={idx}>{ins}</li>
                  ))}
                </ol>
              </div>

              {/* Sections & 3-Column Table Grid */}
              <div className="space-y-5 pt-2">
                {paperData.sections?.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-2 avoid-split">
                    <div className="text-center text-[14pt] font-bold uppercase py-1 border border-black bg-gray-100 text-black">
                      {sec.sectionTitle}
                    </div>

                    <table className="cbse-grid w-full border-collapse border border-black text-[12pt]">
                      <thead>
                        <tr className="bg-gray-100 border-b border-black text-black">
                          <th className="border border-black p-2 w-12 text-center font-bold">Q.No</th>
                          <th className="border border-black p-2 text-left font-bold">Question Details</th>
                          <th className="border border-black p-2 w-16 text-center font-bold">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sec.questions?.map((q) => (
                          <tr key={q.qNo} className="border-b border-black avoid-split">
                            <td className="border border-black p-2 align-top text-center font-normal">{q.qNo}</td>
                            <td className="border border-black p-2 align-top text-left font-normal leading-relaxed">
                              <div className="whitespace-pre-line text-black font-normal">{q.questionText}</div>
                            </td>
                            <td className="border border-black p-2 align-top text-center font-normal">[{q.marks}]</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-black text-xs font-bold text-black font-sans">
                <span>*** End of Question Paper ***</span>
                <span>Page 1 of Evaluation Set</span>
              </div>
            </div>
          )}

          {/* Marking Scheme */}
          {(activeTab === 'answerKey' || activeTab === 'all') && (
            <div className={`space-y-4 ${activeTab === 'all' ? 'page-break pt-6' : ''}`}>
              <div className="border-b-2 border-black pb-2 text-center">
                <p className="text-[14pt] font-bold uppercase text-black">CENTRAL BOARD OF SECONDARY EDUCATION</p>
                <h1 className="text-[16pt] font-bold uppercase text-black">{paperData.paperHeader?.schoolName}</h1>
                <h2 className="text-[14pt] font-bold uppercase text-black mt-1">CONFIDENTIAL: OFFICIAL MARKING SCHEME & STEP BREAKDOWN</h2>
              </div>

              <table className="cbse-grid w-full border-collapse border border-black text-[12pt]">
                <thead>
                  <tr className="bg-gray-100 border-b border-black text-black">
                    <th className="border border-black p-2 w-12 text-center font-bold">Q.No</th>
                    <th className="border border-black p-2 text-left font-bold">Step-Wise Value Points & Model Solution</th>
                    <th className="border border-black p-2 w-16 text-center font-bold">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {paperData.sections?.flatMap((s) => s.questions)?.map((q) => (
                    <tr key={q.qNo} className="border-b border-black avoid-split">
                      <td className="border border-black p-2 align-top text-center font-normal">{q.qNo}</td>
                      <td className="border border-black p-2 align-top text-left font-normal">
                        <pre className="whitespace-pre-wrap leading-relaxed text-black font-serif text-[12pt] font-normal">{q.answerKey}</pre>
                      </td>
                      <td className="border border-black p-2 align-top text-center font-normal">[{q.marks}]</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Blueprint */}
          {(activeTab === 'blueprint' || activeTab === 'all') && (
            <div className={`space-y-4 ${activeTab === 'all' ? 'page-break pt-6' : ''}`}>
              <div className="border-b-2 border-black pb-2 text-center">
                <h2 className="text-[14pt] font-bold uppercase text-black">CBSE QUESTION PAPER BLUEPRINT MATRIX</h2>
                <p className="text-xs text-black font-sans">Total Evaluation Marks: {paperData.paperHeader?.maxMarks}</p>
              </div>

              <table className="cbse-grid w-full border-collapse border border-black text-[12pt]">
                <thead>
                  <tr className="bg-gray-100 border-b border-black text-black">
                    <th className="border border-black p-2 text-left font-bold">Syllabus Unit Focus</th>
                    <th className="border border-black p-2 text-center w-36 font-bold">Questions Count</th>
                    <th className="border border-black p-2 text-right w-36 font-bold">Marks Weightage</th>
                  </tr>
                </thead>
                <tbody>
                  {paperData.blueprintSummary?.map((item, idx) => (
                    <tr key={idx} className="border-b border-black avoid-split">
                      <td className="border border-black p-2 font-normal text-black">{item.unitName}</td>
                      <td className="border border-black p-2 text-center font-normal text-black">{item.questionsCount} Qs</td>
                      <td className="border border-black p-2 text-right font-normal text-black">{item.marksAssigned} Marks</td>
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
