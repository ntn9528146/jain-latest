import React from 'react';
import { formatMathText } from '../../utils/mathParser';

export default function PaperViewer({ paperData }) {
  if (!paperData || !paperData.sections) {
    return <div className="p-6 text-center text-gray-500">No paper data available. Please generate a paper first.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md print:shadow-none">
      <div className="text-center border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase">{paperData.schoolName || "School Name"}</h1>
        <p className="text-sm text-gray-600">CLASS: {paperData.className} | SUBJECT: {paperData.subject}</p>
        <p className="text-sm font-semibold mt-1">TIME: {paperData.timeAllowed || "3 Hours"} | MAX. MARKS: {paperData.maxMarks || 80}</p>
      </div>

      {paperData.sections.map((section, sIndex) => (
        <div key={sIndex} className="mb-6">
          <h2 className="bg-gray-100 font-bold p-2 border-y border-black text-center uppercase text-sm mb-4">
            {section.sectionName}
          </h2>
          {section.questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-4 flex justify-between items-start text-sm">
              <div className="flex-1 pr-4">
                <div className="font-medium flex items-start">
                  <span className="w-8 shrink-0">{q.qNo || qIndex + 1}.</span>
                  <div 
                    className="flex-1"
                    dangerouslySetInnerHTML={{ __html: formatMathText(q.questionText || q.question) }}
                  />
                </div>
                {q.options && q.options.length > 0 && (
                  <div className="grid grid-cols-1 gap-1 mt-2 pl-8">
                    {q.options.map((opt, oIndex) => {
                      const optLabel = String.fromCharCode(65 + oIndex);
                      return (
                        <div key={oIndex} className="flex items-start">
                          <span className="mr-2 font-semibold">({optLabel})</span>
                          <span dangerouslySetInnerHTML={{ __html: formatMathText(opt) }} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="text-right shrink-0 font-semibold pl-2">
                [{q.marks || 1}]
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
