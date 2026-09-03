import { cbseBlueprints } from "../config/blueprints.js";

export function generatePaper(blueprintKey, questionPool) {
  const blueprint = cbseBlueprints ? cbseBlueprints[blueprintKey] : null;
  if (!blueprint) return null;

  const generatedSections = blueprint.sections.map((section) => {
    const matched = (questionPool || []).filter(
      (q) => q.type === section.type && q.marks === section.marksPerQ
    );

    const shuffled = [...matched].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, section.count);

    return {
      ...section,
      questions: picked
    };
  });

  return {
    meta: blueprint,
    sections: generatedSections
  };
}
