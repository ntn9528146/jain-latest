import React from 'react';
import { formatMathText } from '../../utils/mathParser';

export default function PaperViewer({ paperData, onClose }) {
  const data = paperData || {};
  const schoolName = data.schoolName || "EXAMINATION DEPARTMENT";
  const className = data.className || data.class || "10th";
  const subject = data.subject || "MATHEMATICS";
  const timeAllowed = data.timeAllowed || "3 Hours";
  const maxMarks = data.maxMarks || 80;
  const sections = data.sections || [];

  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8 shadow-md rounded-2xl relative">
      {onClose && (
        <div className="flex justify-end mb-4 print:hidden">
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-1.5 rounded-xl text-xs font-bold transition"
          >
            ← Back to Generator
          </button>
        </div>
      )}

      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide">{schoolName}</h1>
        <div className="flex justify-between font-bold text-sm mt-2 px-4">
          <span>CLASS: {className}</span>
          <span>SUBJECT: {subject}</span>
        </div>
        <div className="flex justify-center space-x-6 text-sm font-semibold mt-1">
          <span>TIME: {timeAllowed}</span>
          <span>|</span>
          <span>MAX. MARKS: {maxMarks}</span>
        </div>
      </div>

      {sections.length === 0 ? (
        <div className="p-6 text-center text-gray-700">No questions found in this paper.</div>
      ) : (
        sections.map((section, sIndex) => (
          <div key={sIndex} className="mb-6">
            <h2 className="bg-gray-200 font-bold p-2 border border-black text-center uppercase text-sm mb-4">
              {section.sectionName || section.title || `Section ${sIndex + 1}`}
            </h2>
            {(section.questions || []).map((q, qIndex) => (
              <div key={qIndex} className="mb-4 flex justify-between items-start text-sm text-black">
                <div className="flex-1 pr-4">
                  <div className="font-medium flex items-start">
                    <span className="w-8 shrink-0 font-bold">{q.qNo || qIndex + 1}.</span>
                    <div 
                      className="flex-1 text-black"
                      dangerouslySetInnerHTML={{ __html: formatMathText(q.questionText || q.question || '') }}
                    />
                  </div>
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 gap-1 mt-2 pl-8">
                      {q.options.map((opt, oIndex) => {
                        const optLabel = String.fromCharCode(65 + oIndex);
                        return (
                          <div key={oIndex} className="flex items-start text-black">
                            <span className="mr-2 font-semibold">({optLabel})</span>
                            <span dangerouslySetInnerHTML={{ __html: formatMathText(String(opt)) }} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0 font-bold pl-2 text-black">
                  [{q.marks || 1}]
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
