export const kindergartenSyllabus = {
  category: 'Kindergarten (Nursery, LKG, UKG)',
  defaultMarks: 50,
  defaultInternal: 50,
  classes: ['Nursery', 'LKG', 'UKG'],
  subjects: {
    'Early English': {
      units: [
        {
          id: 'kg_eng_1',
          name: 'Phonics & Alphabet Recognition',
          subtopics: ['Letter tracing A-Z', 'Phonic sounds', 'Three-letter rhyming words (CVC)']
        },
        {
          id: 'kg_eng_2',
          name: 'Picture Comprehension & Vocabulary',
          subtopics: ['Match picture with word', 'Identify fruits, animals, colors', 'Opposites words']
        }
      ]
    },
    'Early Numeracy (Maths)': {
      units: [
        {
          id: 'kg_math_1',
          name: 'Number Concepts & Counting (1-50)',
          subtopics: ['Trace & write numbers', 'Count and circle correct number', 'What comes before/after']
        },
        {
          id: 'kg_math_2',
          name: 'Shapes & Spatial Understanding',
          subtopics: ['Basic 2D shapes (Circle, Triangle, Square)', 'Big vs Small comparison', 'Patterns']
        }
      ]
    },
    'Environmental Awareness (EVS)': {
      units: [
        {
          id: 'kg_evs_1',
          name: 'My Self & Surroundings',
          subtopics: ['Parts of human body', 'My family and home', 'Good manners & hygienic habits']
        }
      ]
    }
  }
};
