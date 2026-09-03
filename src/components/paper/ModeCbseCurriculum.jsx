import React, { useState, useEffect } from 'react';
import Button from '../common/Button.jsx';
import QuestionMatrix from './QuestionMatrix.jsx';
import { getSyllabusDataForClass, ALL_CLASSES } from '../../config/syllabus/index.js';
import { autoBalanceQuestions } from '../../config/questionFormats.js';
import { EXAM_CATEGORIES, DIFFICULTY_LEVELS } from '../../config/examTypes.js';
import { getAutoSelectedSyllabusUnits } from '../../services/syllabusSelectorService.js';

export default function ModeCbseCurriculum({ onGeneratePaper, loading }) {
  const [selectedClass, setSelectedClass] = useState('Class 12');
  const [selectedExamType, setSelectedExamType] = useState(EXAM_CATEGORIES[3]?.name || 'Pre-Board Examination');
  const [difficulty, setDifficulty] = useState(DIFFICULTY_LEVELS[1]?.label || 'Standard CBSE Balanced');

  const syllabusBundle = getSyllabusDataForClass(selectedClass);
  const availableSubjects = syllabusBundle ? Object.keys(syllabusBundle.subjects) : [];
  const [selectedSubject, setSelectedSubject] = useState(availableSubjects[0] || 'Computer Science (Code 083)');

  const currentSubjectData = syllabusBundle?.subjects[selectedSubject] || {};
  const [theoryMarks, setTheoryMarks] = useState(currentSubjectData.fixedTheoryMarks || 70);
  const [practicalMarks, setPracticalMarks] = useState(currentSubjectData.fixedPracticalMarks || 30);

  const [matrix, setMatrix] = useState(autoBalanceQuestions(theoryMarks));
  const [expandedUnits, setExpandedUnits] = useState({});
  const [selectedUnits, setSelectedUnits] = useState({});
  const [selectedSubtopics, setSelectedSubtopics] = useState({});

  // Auto-sync syllabus according to selected Exam Pattern
  const applyAutoSyllabusSelection = (unitsList, examName) => {
    const autoResult = getAutoSelectedSyllabusUnits(unitsList, examName);
    setSelectedUnits(autoResult.selectedUnits);
    setSelectedSubtopics(autoResult.selectedSubtopics);
  };

  useEffect(() => {
    if (currentSubjectData.units) {
      applyAutoSyllabusSelection(currentSubjectData.units, selectedExamType);
    }
  }, [selectedExamType, selectedSubject, selectedClass]);

  const handleClassChange = (newClass) => {
    setSelectedClass(newClass);
    const nextBundle = getSyllabusDataForClass(newClass);
    const firstSub = nextBundle ? Object.keys(nextBundle.subjects)[0] : '';
    setSelectedSubject(firstSub);

    const subData = nextBundle?.subjects[firstSub] || {};
    const thMarks = subData.fixedTheoryMarks || (firstSub.includes('Math') ? 80 : 70);
    setTheoryMarks(thMarks);
    setPracticalMarks(subData.fixedPracticalMarks || (firstSub.includes('Math') ? 20 : 30));
    setMatrix(autoBalanceQuestions(thMarks));
  };

  const handleSubjectChange = (newSub) => {
    setSelectedSubject(newSub);
    const subData = syllabusBundle?.subjects[newSub] || {};
    const thMarks = subData.fixedTheoryMarks || (newSub.includes('Math') ? 80 : 70);
    setTheoryMarks(thMarks);
    setPracticalMarks(subData.fixedPracticalMarks || (newSub.includes('Math') ? 20 : 30));
    setMatrix(autoBalanceQuestions(thMarks));
  };

  const toggleExpand = (unitId) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const toggleUnitCheck = (unit) => {
    const nextState = !selectedUnits[unit.id];
    setSelectedUnits((prev) => ({ ...prev, [unit.id]: nextState }));
    const updatedSubs = { ...selectedSubtopics };
    (unit.subtopics || []).forEach((sub) => {
      updatedSubs[`${unit.id}_${sub}`] = nextState;
    });
    setSelectedSubtopics(updatedSubs);
  };

  const toggleSubCheck = (unitId, sub) => {
    const key = `${unitId}_${sub}`;
    setSelectedSubtopics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    const activeUnitsList = (currentSubjectData.units || []).filter((u) => selectedUnits[u.id]);

    if (onGeneratePaper) {
      onGeneratePaper({
        selectedClass,
        selectedSubject,
        examType: selectedExamType,
        difficulty,
        theoryMarks,
        practicalMarks,
        matrix,
        activeUnits: activeUnitsList
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 text-xs">
      <div>
        <h3 className="text-sm font-bold text-white">Mode 1: Official CBSE Curriculum & Dynamic Exam Engine</h3>
        <p className="text-slate-400 mt-0.5">Syllabus units automatically adapt to the chosen exam pattern.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-slate-400 text-[10px] uppercase mb-1">Class (K-12)</label>
          <select
            value={selectedClass}
            onChange={(e) => handleClassChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
          >
            {ALL_CLASSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-400 text-[10px] uppercase mb-1">Subject ({availableSubjects.length} Available)</label>
          <select
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-indigo-300 font-bold"
          >
            {availableSubjects.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-400 text-[10px] uppercase mb-1">Examination Pattern</label>
          <select
            value={selectedExamType}
            onChange={(e) => setSelectedExamType(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
          >
            {EXAM_CATEGORIES.map((e) => (
              <option key={e.id} value={e.name}>{e.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-400 text-[10px] uppercase mb-1">Difficulty / Standard</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-amber-300 font-semibold"
          >
            {DIFFICULTY_LEVELS.map((d) => (
              <option key={d.id} value={d.label}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Marks Adjustment Controller */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-slate-400 text-[11px] block">Evaluation Distribution:</span>
          <span className="font-bold text-white text-xs">
            Theory & Internal/Practical Marks (Adjustable for All Classes)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[10px] uppercase">Theory Marks:</span>
            <button
              type="button"
              onClick={() => {
                const next = Math.max(10, theoryMarks - 5);
                setTheoryMarks(next);
                setMatrix(autoBalanceQuestions(next));
              }}
              className="h-6 w-6 rounded bg-slate-900 border border-slate-700 text-white font-bold text-xs"
            >−</button>
            <span className="font-mono font-bold text-indigo-400 text-sm w-8 text-center">{theoryMarks}</span>
            <button
              type="button"
              onClick={() => {
                const next = theoryMarks + 5;
                setTheoryMarks(next);
                setMatrix(autoBalanceQuestions(next));
              }}
              className="h-6 w-6 rounded bg-slate-900 border border-slate-700 text-white font-bold text-xs"
            >+</button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[10px] uppercase">Practical / Internal:</span>
            <button
              type="button"
              onClick={() => setPracticalMarks(Math.max(0, practicalMarks - 5))}
              className="h-6 w-6 rounded bg-slate-900 border border-slate-700 text-white font-bold text-xs"
            >−</button>
            <span className="font-mono font-bold text-amber-400 text-sm w-8 text-center">{practicalMarks}</span>
            <button
              type="button"
              onClick={() => setPracticalMarks(practicalMarks + 5)}
              className="h-6 w-6 rounded bg-slate-900 border border-slate-700 text-white font-bold text-xs"
            >+</button>
          </div>
        </div>
      </div>

      <QuestionMatrix matrix={matrix} onChange={setMatrix} targetMarks={theoryMarks} />

      {/* Expandable Syllabus Checkbox List */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Syllabus Units for {selectedSubject} ({selectedExamType}):
          </p>
          <span className="text-[10px] font-mono text-indigo-400">
            Auto-Checked for {selectedExamType}
          </span>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {currentSubjectData.units?.map((unit) => {
            const isExpanded = expandedUnits[unit.id];
            const isChecked = !!selectedUnits[unit.id];

            return (
              <div key={unit.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-3 flex items-center justify-between hover:bg-slate-800/30">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleUnitCheck(unit)}
                      className="h-4 w-4 rounded bg-slate-900 border-slate-700 text-indigo-600 cursor-pointer"
                    />
                    <span className="font-semibold text-white">{unit.name}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(unit.id)}
                    className="h-7 w-7 rounded-lg bg-slate-900 hover:bg-indigo-600 border border-slate-800 flex items-center justify-center font-bold text-indigo-300 hover:text-white transition"
                  >
                    {isExpanded ? '−' : '+'}
                  </button>
                </div>

                {isExpanded && (
                  <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 pl-9 space-y-2">
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Sub-Topics in this Unit:</p>
                    {unit.subtopics?.map((sub, sIdx) => {
                      const subKey = `${unit.id}_${sub}`;
                      return (
                        <label key={sIdx} className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                          <input
                            type="checkbox"
                            checked={!!selectedSubtopics[subKey]}
                            onChange={() => toggleSubCheck(unit.id, sub)}
                            className="h-3.5 w-3.5 rounded bg-slate-950 border-slate-700 text-indigo-500 cursor-pointer"
                          />
                          <span className="text-[11px]">{sub}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Button onClick={handleGenerate} disabled={loading} className="w-full">
        {loading ? 'Compiling Paper & Blueprint...' : '⚡ Generate CBSE Question Paper, Answer Key & Blueprint'}
      </Button>
    </div>
  );
}
