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

  // Helper to strip accidental AI solution leaks from subjective question text
  const cleanQuestionText = (text, marks) => {
    if (!text) return "";
    let clean = String(text);
    // If marks > 1, strip any trailing "(A) Solution..." or similar AI artifacts
    if (Number(marks) > 1) {
      clean = clean.replace(/\(A\)\s*(Result is|Factors|Using|Proof|Tangents are|Detailed|Speeds|301 is not).*$/i, "");
    }
    return clean.trim();
  };

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

      {/* CBSE Header Format */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-xl font-bold uppercase tracking-wider">{schoolName}</h1>
        <div className="flex justify-between font-bold text-sm mt-3 px-4">
          <span>CLASS: {className}</span>
          <span>SUBJECT: {subject}</span>
        </div>
        <div className="flex justify-center space-x-6 text-sm font-semibold mt-1">
          <span>TIME ALLOWED: {timeAllowed}</span>
          <span>|</span>
          <span>MAX. MARKS: {maxMarks}</span>
        </div>
      </div>

      {sections.length === 0 ? (
        <div className="p-6 text-center text-gray-700">No questions found in this paper.</div>
      ) : (
        sections.map((section, sIndex) => {
          const sName = section.sectionName || section.title || `SECTION ${String.fromCharCode(65 + sIndex)}`;
          const isMCQSection = sName.toLowerCase().includes("a") || sName.toLowerCase().includes("mcq") || sIndex === 0;

          return (
            <div key={sIndex} className="mb-8">
              <div className="bg-slate-100 border-y-2 border-black py-1.5 px-4 mb-4 text-center">
                <h2 className="font-bold uppercase text-sm tracking-wide">{sName}</h2>
                <p className="text-[11px] italic text-gray-700">
                  {isMCQSection ? "Multiple Choice Questions (Each question carries 1 mark)" : "Short/Long Answer Type Questions"}
                </p>
              </div>

              {(section.questions || []).map((q, qIndex) => {
                const qMarks = Number(q.marks || 1);
                const cleanedText = cleanQuestionText(q.questionText || q.question || "", qMarks);
                const showOptions = qMarks === 1 && q.options && q.options.length > 0;

                return (
                  <div key={qIndex} className="mb-5 flex justify-between items-start text-sm leading-relaxed">
                    <div className="flex-1 pr-4">
                      <div className="flex items-start">
                        <span className="w-8 shrink-0 font-bold">{q.qNo || qIndex + 1}.</span>
                        <div 
                          className="flex-1"
                          dangerouslySetInnerHTML={{ __html: formatMathText(cleanedText) }}
                        />
                      </div>

                      {/* Options rendered vertically like CBSE sample paper */}
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
