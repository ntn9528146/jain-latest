import React from "react";
import { formatMathText } from "../../utils/mathParser";

export default function PaperViewer({ paperData, onClose }) {
  const data = paperData || {};
  const schoolName = data.schoolName || "EXAMINATION DEPARTMENT";
  const className = data.className || data.class || "10th";
  // Dynamically resolve subject from generated paper data or fallback cleanly
  const subject = data.subject || "ACADEMIC EXAMINATION";
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

      {/* Authentic CBSE Board Top Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-xl font-bold uppercase tracking-wider">{schoolName}</h1>
        <h2 className="text-sm font-bold uppercase tracking-wide mt-1">SUBJECT: {subject} ({className.toUpperCase()})</h2>
        <div className="flex justify-between font-bold text-sm mt-3 px-4 border-t border-dashed border-gray-400 pt-2">
          <span>Maximum Marks: {maxMarks}</span>
          <span>Time Allowed: {timeAllowed}</span>
        </div>
      </div>

      {/* CBSE General Instructions Block */}
      <div className="mb-6 p-4 border border-black bg-slate-50 text-xs leading-relaxed">
        <p className="font-bold underline mb-1">General Instructions:</p>
        <p className="italic mb-2">Read the following instructions carefully and follow them:</p>
        <ul className="list-decimal pl-5 space-y-1 font-sans">
          <li>This question paper contains multiple sections. All questions are compulsory.</li>
          <li>Proper internal choices have been provided where applicable.</li>
          <li>Draw neat and clean diagrams wherever required. Use of calculators is not allowed.</li>
        </ul>
      </div>

      {sections.length === 0 ? (
        <div className="p-6 text-center text-gray-700">No questions found in this paper.</div>
      ) : (
        sections.map((section, sIndex) => {
          const sName = section.sectionName || section.title || `SECTION ${String.fromCharCode(65 + sIndex)}`;
          const isMCQSection = sName.toLowerCase().includes("a") || sName.toLowerCase().includes("mcq") || sIndex === 0;

          return (
            <div key={sIndex} className="mb-8">
              <div className="bg-slate-200 border-y-2 border-black py-1.5 px-4 mb-4 text-center">
                <h3 className="font-bold uppercase text-sm tracking-wide">{sName}</h3>
                <p className="text-[11px] italic text-gray-800">
                  {isMCQSection ? "Multiple Choice Questions (Each question carries 1 mark)" : "Standard Descriptive Answer Type Questions"}
                </p>
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
