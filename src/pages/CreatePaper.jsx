import React, { useState } from 'react';
import { generatePaper } from '../services/paperEngine';
import { pythonQuestions } from '../data/topic-python';

export default function CreatePaper({ faculty, onLogout }) {
  const [selectedCurriculum, setSelectedCurriculum] = useState("class12_cs083");
  const [schoolName, setSchoolName] = useState("ARDEN PROGRESSIVE SCHOOL");
  const [examTitle, setExamTitle] = useState("HALF YEARLY EXAMINATION 2026-27");
  const [paperData, setPaperData] = useState(null);

  const handleGenerate = () => {
    const paper = generatePaper(selectedCurriculum, pythonQuestions);
    setPaperData(paper);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white px-6 py-3.5 flex justify-between items-center print:hidden border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-sm">P</div>
          <span className="font-bold text-sm tracking-wide">PaperPilot Online Suite</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-slate-400">Logged in: <strong className="text-white">{faculty?.facultyId || 'Faculty'}</strong></span>
          <button onClick={onLogout} className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 p-6 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full">
        {/* Left Control Panel */}
        <div className="w-full lg:w-96 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit space-y-5 print:hidden">
          <div>
            <h3 className="text-base font-bold text-slate-900">Blueprint Settings</h3>
            <p className="text-xs text-slate-500">Configure school details and syllabus standard.</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Institution Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Assessment Name</label>
              <input
                type="text"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Curriculum Class & Subject</label>
              <select
                value={selectedCurriculum}
                onChange={(e) => setSelectedCurriculum(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="class12_cs083">CBSE Class 12 - Computer Science (083)</option>
                <option value="class10_it402">CBSE Class 10 - Info Technology (402)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold text-xs shadow-md shadow-indigo-100 transition"
          >
            ⚡ Generate Paper Instantly
          </button>
        </div>

        {/* Right Preview Panel */}
        <div className="flex-1 flex flex-col items-center">
          {paperData && (
            <div className="w-full max-w-3xl flex justify-between items-center mb-4 print:hidden">
              <span className="text-xs font-semibold text-slate-500">A4 Printable Output Document</span>
              <button
                onClick={handlePrint}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
              >
                📄 Print / Save as PDF
              </button>
            </div>
          )}

          {/* Printable A4 Sheet */}
          <div className="w-full max-w-3xl bg-white shadow-sm border border-slate-200 p-10 min-h-[900px] print:shadow-none print:border-none print:p-0">
            {paperData ? (
              <div>
                {/* School Header */}
                <div className="text-center border-b-2 border-slate-900 pb-4 mb-5">
                  <h1 className="text-xl font-black uppercase tracking-wider">{schoolName}</h1>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5 uppercase tracking-wide">{examTitle}</p>
                  <p className="text-xs font-medium text-slate-600 mt-1">{paperData.meta.title}</p>
                  <div className="flex justify-between text-xs font-bold mt-4 pt-2 border-t border-dashed border-slate-300">
                    <span>Time Allowed: {paperData.meta.time}</span>
                    <span>Maximum Marks: {paperData.meta.maxMarks}</span>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-[11px] text-slate-700 bg-slate-50 border border-slate-200 p-3 rounded-lg mb-6 leading-relaxed">
                  <p className="font-bold mb-1">General Instructions:</p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>This question paper contains {paperData.sections.length} sections.</li>
                    <li>Section A has multiple choice questions. All questions carry equal marks.</li>
                    <li>Write clear and clean code snippets where required.</li>
                  </ul>
                </div>

                {/* Question Sections */}
                {paperData.sections.map((sec) => (
                  <div key={sec.id} className="mb-6">
                    <div className="bg-slate-100 border-y border-slate-300 py-1 text-center font-bold text-xs tracking-wider uppercase mb-3">
                      {sec.name}
                    </div>

                    <div className="space-y-3.5">
                      {sec.questions.map((q, idx) => (
                        <div key={q.id} className="text-xs leading-normal">
                          <div className="flex justify-between items-baseline gap-2">
                            <p className="text-slate-900 font-medium">
                              <span className="font-bold mr-1.5">Q{idx + 1}.</span>
                              {q.text}
                            </p>
                            <span className="font-bold text-[11px] text-slate-600 shrink-0">[{q.marks}]</span>
                          </div>

                          {q.options && (
                            <div className="grid grid-cols-2 gap-2 mt-2 ml-5 text-[11px] text-slate-800">
                              {q.options.map((opt, oIdx) => (
                                <div key={oIdx}>
                                  <span className="font-semibold">({String.fromCharCode(97 + oIdx)})</span> {opt}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center text-slate-400 text-xs">
                <span className="text-3xl mb-2">📑</span>
                <p>Click "Generate Paper Instantly" to create your first CBSE paper.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
