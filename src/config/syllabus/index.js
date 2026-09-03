import { kindergartenSyllabus } from './kindergarten.js';
import { primarySyllabus } from './primary.js';
import { middleSyllabus } from './middle.js';
import { secondarySyllabus } from './secondary.js';
import { seniorSecondarySyllabus } from './seniorSecondary.js';

export function getSyllabusDataForClass(selectedClass) {
  if (kindergartenSyllabus.classes.includes(selectedClass)) {
    return { ...kindergartenSyllabus, categoryKey: 'kindergarten' };
  }
  if (primarySyllabus.classes.includes(selectedClass)) {
    return { ...primarySyllabus, categoryKey: 'primary' };
  }
  if (middleSyllabus.classes.includes(selectedClass)) {
    return { ...middleSyllabus, categoryKey: 'middle' };
  }
  if (secondarySyllabus.classes.includes(selectedClass)) {
    return { ...secondarySyllabus, categoryKey: 'secondary' };
  }
  if (seniorSecondarySyllabus.classes.includes(selectedClass)) {
    return { ...seniorSecondarySyllabus, categoryKey: 'seniorSecondary' };
  }
  return null;
}

export const ALL_CLASSES = [
  'Nursery', 'LKG', 'UKG',
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8',
  'Class 9', 'Class 10',
  'Class 11', 'Class 12'
];
