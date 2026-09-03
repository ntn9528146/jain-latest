export const primarySyllabus = {
  category: 'Primary School (Class 1st to 5th)',
  defaultTheoryMarks: 80,
  defaultInternalMarks: 20,
  classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
  subjects: {
    'Mathematics': {
      units: [
        {
          id: 'p_math_1',
          name: 'Numbers & Arithmetic Operations',
          subtopics: ['4-digit Place Value & Face Value', 'Addition & Subtraction Word Problems', 'Multiplication & Short Division']
        },
        {
          id: 'p_math_2',
          name: 'Geometry & Measurement',
          subtopics: ['Perimeter of 2D shapes', 'Units of length, mass and capacity', 'Time reading & Calendar problems']
        },
        {
          id: 'p_math_3',
          name: 'Data Handling & Fractions',
          subtopics: ['Pictographs & Bar Graphs', 'Like & Unlike Fractions intro', 'Money transaction calculation']
        }
      ]
    },
    'Environmental Studies (EVS)': {
      units: [
        {
          id: 'p_evs_1',
          name: 'Living Organisms & Nature',
          subtopics: ['Plant parts & their functions', 'Animal habitats & food chains', 'Sources of water & conservation']
        },
        {
          id: 'p_evs_2',
          name: 'Community, Shelter & Transport',
          subtopics: ['Means of transport & communication', 'Community helpers', 'Safety rules and first aid']
        }
      ]
    },
    'English Language & Grammar': {
      units: [
        {
          id: 'p_eng_1',
          name: 'Reading & Literature',
          subtopics: ['Unseen Comprehension passage', 'Poem recitation & central idea', 'Story sequencing']
        },
        {
          id: 'p_eng_2',
          name: 'Applied Grammar & Writing',
          subtopics: ['Nouns, Pronouns, Adjectives', 'Tenses (Simple Present & Past)', 'Short Paragraph / Leave Application']
        }
      ]
    }
  }
};
