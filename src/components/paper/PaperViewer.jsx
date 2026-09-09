import React from "react";
import { formatMathText } from "../../utils/mathParser";

export default function PaperViewer({ paperData, onClose }) {
  const data = paperData || {};
  const schoolName = data.schoolName || "EXAMINATION DEPARTMENT";
  const className = data.className || data.class || "10th";
  const subject = data.subject || "MATHEMATICS";
  const timeAllowed = data.timeAllowed || "3 Hours";
  const maxMarks = data.maxMarks || 80;
  const sections = data.sections || [];

  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8 shadow-md rounded-2xl relative font-serif">
      {onClose && (
        <div className="flex justify-end mb-4 print:hidden font-sans">
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-1.5 rounded-xl text-xs font-bold transition"
          >
            ← Back to Generator
          </button>
        </div>
      )}

      {/* Authentic CBSE Board Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-xl font-bold uppercase tracking-wider">{schoolName}</h1>
        <h2 className="text-sm font-bold uppercase tracking-wide mt-1">SUBJECT: {subject} ({className.toUpperCase()})</h2>
        <div className="flex justify-between font-bold text-sm mt-3 px-4 border-t border-dashed border-gray-400 pt-2">
          <span>Maximum Marks: {maxMarks}</span>
          <span>Time Allowed: {timeAllowed}</span>
        </div>
      </div>

      {/* Official CBSE General Instructions Box matching Sample Paper */}
      <div className="mb-6 p-4 border border-black bg-slate-50 text-xs leading-relaxed font-sans">
        <p className="font-bold underline mb-1 uppercase tracking-wider">General Instructions:</p>
        <p className="italic mb-2">Read the following instructions carefully and follow them:</p>
        <ol className="list-decimal pl-5 space-y-1.5 font-normal">
          <li>This question paper contains <b>38 questions</b>. All Questions are compulsory.</li>
          <li>This Question Paper is divided into <b>5 Sections</b>: A, B, C, D and E.</li>
          <li><b>Section A</b>: Question numbers 1-18 are Multiple Choice Questions (MCQs) and question no. 19 and 20 are Assertion-Reason based questions of 1 mark each.</li>
          <li><b>Section B</b>: Question numbers 21-25 are Very Short Answer (VSA) type questions, carrying 02 marks each.</li>
          <li><b>Section C</b>: Question numbers 26-31 are Short Answer (SA) type questions, carrying 03 marks each.</li>
          <li><b>Section D</b>: Question numbers 32-35 are Long Answer (LA) type questions, carrying 05 marks each.</li>
          <li><b>Section E</b>: Question numbers 36-38 are case study-based questions carrying 4 marks each with sub-parts.</li>
          <li>There is no overall choice. However, internal choices have been provided in some questions.</li>
          <li>Use of calculators is not allowed.</li>
        </ol>
      </div>

      {sections.length === 0 ? (
        <div className="p-6 text-center text-gray-700">No questions found in this paper.</div>
      ) : (
        sections.map((section, sIndex) => {
          const sName = section.sectionName || section.title || `SECTION ${String.fromCharCode(65 + sIndex)}`;

          return (
            <div key={sIndex} className="mb-8">
              <div className="bg-slate-200 border-y-2 border-black py-1.5 px-4 mb-4 text-center">
                <h3 className="font-bold uppercase text-sm tracking-wide">{sName}</h3>
              </div>

              {(section.questions || []).map((q, qIndex) => {
                const qMarks = Number(q.marks || 1);
                const showOptions = qMarks === 1 && q.options && q.options.length > 0;

                return (
                  <div key={qIndex} className="mb-5 flex justify-between items-start text-sm leading-relaxed">
                    <div className="flex-1 pr-4">
                      <div className="flex items-start">
                        <span className="w-8 shrink-0 font-bold">{q.qNo || qIndex + 1}.</span>
                        <div 
                          className="flex-1"
                          dangerouslySetInnerHTML={{ __html: formatMathText(q.questionText || q.question || "") }}
                        />
                      </div>

                      {showOptions && (
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2 pl-8">
                          {q.options.map((opt, oIndex) => {
                            const optLabel = String.fromCharCode(65 + oIndex);
                            return (
                              <div key={oIndex} className="flex items-start">
                                <span className="mr-2 font-semibold">({optLabel})</span>
                                <span dangerouslySetInnerHTML={{ __html: formatMathText(String(opt)) }} />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0 font-bold pl-2">
                      [{qMarks}]
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}
