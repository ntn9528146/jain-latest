import React from "react";
import { formatMathText } from "../../utils/mathParser";

export default function PaperViewer({ paperData, onClose }) {
  const rawData = paperData || {};
  const schoolName = rawData.schoolName || "EXAMINATION DEPARTMENT";
  const className = rawData.className || rawData.class || "10th";
  const subject = rawData.subject || "MATHEMATICS";
  const timeAllowed = rawData.timeAllowed || "3 Hours";
  const maxMarks = rawData.maxMarks || 80;

  let incomingSections = rawData.sections || [];
  let allQs = [];
  incomingSections.forEach(s => { if (s.questions) allQs = allQs.concat(s.questions); });

  // Guarantee exact CBSE distribution matching the General Instructions
  const sectionRules = [
    { name: "SECTION A", start: 1, end: 20, marks: 1, isMcq: true },   // Q1-20 (18 MCQs + 2 Assertion-Reason)
    { name: "SECTION B", start: 21, end: 25, marks: 2, isMcq: false }, // Q21-25 (2 marks)[cite: 1]
    { name: "SECTION C", start: 26, end: 31, marks: 3, isMcq: false }, // Q26-31 (3 marks)[cite: 1]
    { name: "SECTION D", start: 32, end: 35, marks: 5, isMcq: false }, // Q32-35 (5 marks)[cite: 1]
    { name: "SECTION E", start: 36, end: 38, marks: 4, isMcq: false }  // Q36-38 (4 marks Case Study)[cite: 1]
  ];

  const enforcedSections = sectionRules.map((rule, sIdx) => {
    let sectionQuestions = [];
    for (let qNo = rule.start; qNo <= rule.end; qNo++) {
      // Find if AI generated a question for this qNo
      let found = allQs.find(q => Number(q.qNo) === qNo);
      if (!found && allQs.length > 0) {
        // Fallback: pick next available question from pool
        found = allQs.shift();
      }
      if (!found) {
        // Fallback generator if pool runs out
        found = {
          qNo: qNo,
          questionText: `Question number ${qNo} for ${subject} - Class ${className}.`,
          options: rule.isMcq ? ["Option A", "Option B", "Option C", "Option D"] : [],
          marks: rule.marks
        };
      } else {
        found.qNo = qNo;
        found.marks = rule.marks;
        if (rule.isMcq && (!found.options || found.options.length === 0)) {
          found.options = ["Option A", "Option B", "Option C", "Option D"];
        } else if (!rule.isMcq) {
          found.options = [];
        }
      }
      sectionQuestions.push(found);
    }
    return {
      sectionName: rule.name,
      questions: sectionQuestions
    };
  });

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
          <span>Maximum marks: {maxMarks}[cite: 1]</span>
          <span>Time : {timeAllowed}[cite: 1]</span>
        </div>
      </div>

      {/* Official CBSE General Instructions Box matching Sample Paper */}
      <div className="mb-6 p-4 border border-black bg-slate-50 text-xs leading-relaxed font-sans">
        <p className="font-bold uppercase tracking-wider mb-1">General Instructions</p>
        <p className="italic mb-2 underline">Read the following instructions carefully and follow them[cite: 1]:</p>
        <ol className="list-decimal pl-5 space-y-1.5 font-normal">
          <li>This question paper contains <b>38 questions</b>. All Questions are compulsory[cite: 1].</li>
          <li>This Question Paper is divided into <b>5 Sections A, B, C, D and E</b>[cite: 1].</li>
          <li>In <b>Section A</b>, Question numbers 1-18 are multiple choice questions (MCQs) and question no. 19 and 20 are Assertion-Reason based questions of 1 mark each[cite: 1].</li>
          <li>In <b>Section B</b>, Question numbers 21-25 are very short answer (VSA) type questions, carrying 02 marks each[cite: 1].</li>
          <li>In <b>Section C</b>, Question numbers 26-31 are short answer (SA) type questions, carrying 03 marks each[cite: 1].</li>
          <li>In <b>Section D</b>, Question numbers 32-35 are long answer (LA) type questions, carrying 05 marks each[cite: 1].</li>
          <li>In <b>Section E</b>, Question numbers 36-38 are case study-based questions carrying 4 marks each with sub parts of the values of 1, 1 and 2 marks each respectively[cite: 1].</li>
          <li>There is no overall choice. However, an internal choice in 2 questions of Section B, 2 questions of Section C and 2 questions of Section D has been provided. An internal choice has been provided in all the 2 marks questions of Section E[cite: 1].</li>
          <li>Draw neat and clean figures wherever required. Take $\pi = \frac{22}{7}$ wherever required if not stated[cite: 1].</li>
          <li>Use of calculators is not allowed[cite: 1].</li>
        </ol>
      </div>

      {enforcedSections.map((section, sIndex) => (
        <div key={sIndex} className="mb-8">
          <div className="bg-slate-200 border-y-2 border-black py-1.5 px-4 mb-4 text-center">
            <h3 className="font-bold uppercase text-sm tracking-wide">{section.sectionName}</h3>
          </div>

          {(section.questions || []).map((q, qIndex) => {
            const qMarks = Number(q.marks || 1);
            const showOptions = qMarks === 1 && q.options && q.options.length > 0;

            return (
              <div key={qIndex} className="mb-5 flex justify-between items-start text-sm leading-relaxed">
                <div className="flex-1 pr-4">
                  <div className="flex items-start">
                    <span className="w-8 shrink-0 font-bold">{q.qNo}.</span>
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
      ))}
    </div>
  );
}
