export function getAutoSelectedSyllabusUnits(units = [], examType = '') {
  if (!units || units.length === 0) return { selectedUnits: {}, selectedSubtopics: {} };

  const total = units.length;
  let targetCount = total;

  const lowerExam = examType.toLowerCase();
  if (lowerExam.includes('unit test') || lowerExam.includes('periodic')) {
    // 25% - 35% of syllabus (minimum 1 unit)
    targetCount = Math.max(1, Math.ceil(total * 0.35));
  } else if (lowerExam.includes('half yearly') || lowerExam.includes('term-1') || lowerExam.includes('term 1')) {
    // 50% - 60% of syllabus
    targetCount = Math.max(1, Math.ceil(total * 0.55));
  } else {
    // Pre-Board or Annual: 100% full syllabus
    targetCount = total;
  }

  const selectedUnits = {};
  const selectedSubtopics = {};

  for (let i = 0; i < targetCount; i++) {
    const unit = units[i];
    selectedUnits[unit.id] = true;
    (unit.subtopics || []).forEach((sub) => {
      selectedSubtopics[`${unit.id}_${sub}`] = true;
    });
  }

  return { selectedUnits, selectedSubtopics, targetCount, totalCount: total };
}
