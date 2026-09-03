import React, { useState } from 'react';
import Button from '../common/Button.jsx';
import { getSyllabusDataForClass, ALL_CLASSES } from '../../config/syllabus/index.js';

export default function ModeCbseCurriculum({ onGeneratePaper }) {
  const [selectedClass, setSelectedClass] = useState('Class 12');
  const syllabusBundle = getSyllabusDataForClass(selectedClass);

  const availableSubjects = syllabusBundle ? Object.keys(syllabusBundle.subjects) : [];
  const [selectedSubject, setSelectedSubject] = useState(availableSubjects[0] || '');

  // Marks Configuration (Fixed for 9-12, customizable for Nursery-8th)
  const isHigherSecondary = ['Class 9', 'Class 10', 'Class 11', 'Class 12'].includes(selectedClass);
  const currentSubjectData = syllabusBundle?.subjects[selectedSubject] || {};

  const [theoryMarks, setTheoryMarks] = useState(
    currentSubjectData.fixedTheoryMarks || syllabusBundle?.defaultTheoryMarks || 80
  );
  const [internalMarks, setInternalMarks] = useState(
    currentSubjectData.fixedPracticalMarks || syllabusBundle?.defaultInternalMarks || 20
  );

  // Expand / Collapse state for subtopics
  const [expandedUnits, setExpandedUnits] = useState({});
  // Selected Units checklist
  const [selectedUnits, setSelectedUnits] = useState({});
  // Selected Subtopics checklist
  const [selectedSubtopics, setSelectedSubtopics] = useState({});

  const toggleExpand = (unitId) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const toggleUnitCheck = (unit) => {
    const nextState = !selectedUnits[unit.id];
    setSelectedUnits((prev) => ({ ...prev, [unit.id]: nextState }));

    // Auto select / deselect all its subtopics
    const updatedSubs = { ...selectedSubtopics };
    unit.subtopics.forEach((sub) => {
      updatedSubs[`${unit.id}_${sub}`] = nextState;
    });
    setSelectedSubtopics(updatedSubs);
  };

  const toggleSubCheck = (unitId, sub) => {
    const key = `${unitId}_${sub}`;
    setSelectedSubtopics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    onGeneratePaper({
      selectedClass,
      selectedSubject,
      theoryMarks,
      internalMarks,
      selectedUnits,
      selectedSubtopics
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5 text-xs">
      <div>
        <h3 className="text-sm font-bold text-white">Mode 3: Official CBSE Curriculum Checkbox Engine</h3>
        <p className="text-slate-400 mt-0.5">Click (+) to expand specific sub-topics. Checked topics are strictly adhered to in the generated paper.</p>
      </div>

      {/* Class & Subject Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-400 text-[10px] uppercase mb-1">Select Class (K-12)</label>
          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              const nextBundle = getSyllabusDataForClass(e.target.value);
              const firstSub = nextBundle ? Object.keys(nextBundle.subjects)[0] : '';
              setSelectedSubject(firstSub);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
          >
            {ALL_CLASSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-400 text-[10px] uppercase mb-1">Select Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-indigo-300 font-bold"
          >
            {availableSubjects.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Marks Weightage Controller (80+20 default for Junior, customizable) */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-slate-400 text-[11px] block">CBSE Evaluation Weightage:</span>
          <span className="font-bold text-white text-xs">
            {isHigherSecondary ? 'Standard Board Pattern Locked' : 'Junior Secondary (80+20 Default - Fully Adjustable)'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[10px] uppercase">Theory Marks:</span>
            <input
              type="number"
              value={theoryMarks}
              disabled={isHigherSecondary}
              onChange={(e) => setTheoryMarks(Number(e.target.value))}
              className={`w-16 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-center font-mono font-bold ${isHigherSecondary ? 'text-indigo-400' : 'text-emerald-400'}`}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[10px] uppercase">Internal / Viva:</span>
            <input
              type="number"
              value={internalMarks}
              disabled={isHigherSecondary}
              onChange={(e) => setInternalMarks(Number(e.target.value))}
              className={`w-16 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-center font-mono font-bold ${isHigherSecondary ? 'text-amber-400' : 'text-emerald-400'}`}
            />
          </div>
        </div>
      </div>

      {/* Units & Subtopics Accordion with Checkboxes */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Units & Sub-Topics for {selectedSubject} ({selectedClass}):
        </p>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
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
                      className="h-4 w-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
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

                {/* Expanded Subtopics Checkbox List */}
                {isExpanded && (
                  <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 pl-9 space-y-2">
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Sub-Topics in this Unit:</p>
                    {unit.subtopics.map((sub, sIdx) => {
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

      <Button onClick={handleGenerate}>
        Generate CBSE Aligned Question Paper & Marking Scheme
      </Button>
    </div>
  );
}
