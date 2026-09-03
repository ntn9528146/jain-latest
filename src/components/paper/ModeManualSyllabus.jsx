import React, { useState } from 'react';
import Button from '../common/Button.jsx';

export default function ModeManualSyllabus({ onGenerateManual }) {
  const [syllabusText, setSyllabusText] = useState('');
  const [totalMarks, setTotalMarks] = useState(80);
  const [totalQuestions, setTotalQuestions] = useState(34);
  const [difficulty, setDifficulty] = useState('Standard Balanced (60% Medium, 20% Easy, 20% HOTS)');

  // Auto extract topics from pasted text
  const detectedChapters = syllabusText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 3 && !line.startsWith('#'));

  const handleGenerate = () => {
    if (!syllabusText.trim()) {
      alert('Please paste or write your custom syllabus outline first.');
      return;
    }

    onGenerateManual({
      type: 'manual',
      totalMarks,
      totalQuestions,
      difficulty,
      chaptersCount: detectedChapters.length,
      chapters: detectedChapters
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 text-xs">
      <div>
        <h3 className="text-sm font-bold text-white">Mode 2: Manual Syllabus & Custom Blueprint Extractor</h3>
        <p className="text-slate-400 mt-0.5">Paste raw topics or lesson plans. The engine will extract units and balance questions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-slate-400 text-[10px] uppercase mb-1">Total Exam Marks</label>
          <input
            type="number"
            value={totalMarks}
            onChange={(e) => setTotalMarks(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-[10px] uppercase mb-1">Total Question Count</label>
          <input
            type="number"
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-[10px] uppercase mb-1">Cognitive Level</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
          >
            <option>Standard Balanced (60% Medium, 20% Easy, 20% HOTS)</option>
            <option>Competency & Case-Study Heavy (CBSE 2026-27 Spec)</option>
            <option>Remedial / Foundation Test (70% Easy)</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-slate-400 text-[10px] uppercase font-bold">Paste Syllabus Chapters / Sub-topics (One per line)</label>
          <span className="text-[10px] text-indigo-400 font-bold">{detectedChapters.length} Chapters Identified</span>
        </div>
        <textarea
          rows="5"
          value={syllabusText}
          onChange={(e) => setSyllabusText(e.target.value)}
          placeholder="Paste or write syllabus here:&#10;Chapter 1: Nutrition in Plants&#10;Chapter 2: Acids, Bases and Salts&#10;Chapter 3: Motion and Time..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-[11px]"
        />
      </div>

      <Button onClick={handleGenerate}>
        Extract Units & Build Custom Blueprint ({totalMarks} Marks, {totalQuestions} Questions)
      </Button>
    </div>
  );
}
