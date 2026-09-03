export const secondarySyllabus = {
  category: 'Secondary School (Class 9th & 10th)',
  defaultTheoryMarks: 80,
  defaultInternalMarks: 20,
  classes: ['Class 9', 'Class 10'],
  subjects: {
    'Information Technology (Code 402)': {
      fixedTheoryMarks: 50,
      fixedPracticalMarks: 50,
      units: [
        {
          id: 'sec_it_1',
          name: 'Part A: Employability Skills',
          subtopics: ['Communication Skills-II', 'Self-Management Skills-II', 'ICT Skills-II', 'Entrepreneurial & Green Skills']
        },
        {
          id: 'sec_it_2',
          name: 'Part B: Digital Documentation (Advanced)',
          subtopics: ['Apply Styles in LibreOffice Writer', 'Insert and Use Images', 'Create and Customize Table of Contents', 'Mail Merge']
        },
        {
          id: 'sec_it_3',
          name: 'Part B: Electronic Spreadsheet (Advanced)',
          subtopics: ['Consolidate Data & Subtotals', 'Scenarios & Goal Seek', 'Linking Multiple Sheets', 'Macros in Calc']
        },
        {
          id: 'sec_it_4',
          name: 'Part B: Database Management System (RDBMS)',
          subtopics: ['Relational Concepts & Keys', 'Create Table via Design View/Wizard', 'Execute SQL Queries', 'Forms and Reports']
        }
      ]
    },
    'Mathematics (Standard & Basic)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        {
          id: 'sec_math_1',
          name: 'Unit I: Number Systems & Algebra',
          subtopics: ['Real Numbers (Fundamental Theorem of Arithmetic)', 'Polynomials (Zeroes of Quadratic)', 'Pair of Linear Equations', 'Quadratic Equations & Arithmetic Progressions']
        },
        {
          id: 'sec_math_2',
          name: 'Unit II: Coordinate Geometry & Triangles',
          subtopics: ['Distance and Section Formulae', 'Similarity Criteria for Triangles & Proofs', 'Circles: Tangent properties']
        },
        {
          id: 'sec_math_3',
          name: 'Unit III: Trigonometry & Mensuration',
          subtopics: ['Trigonometric Ratios & Identities', 'Heights and Distances (Angle of Elevation/Depression)', 'Surface Areas and Volumes of Combinations']
        },
        {
          id: 'sec_math_4',
          name: 'Unit IV: Statistics and Probability',
          subtopics: ['Mean, Median, Mode of Grouped Data', 'Classical Probability Problems']
        }
      ]
    },
    'Science (Code 086)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        {
          id: 'sec_sci_1',
          name: 'Unit I: Chemical Substances - Nature and Behaviour',
          subtopics: ['Chemical Reactions & Balancing', 'Acids, Bases & Salts', 'Metals and Non-metals', 'Carbon and its Compounds']
        },
        {
          id: 'sec_sci_2',
          name: 'Unit II: World of Living',
          subtopics: ['Life Processes (Nutrition, Respiration, Transport, Excretion)', 'Control and Coordination', 'Reproduction & Heredity']
        },
        {
          id: 'sec_sci_3',
          name: 'Unit III: Natural Phenomena & Effects of Current',
          subtopics: ['Light: Reflection & Refraction', 'Human Eye and Colorful World', 'Electricity & Ohm’s Law', 'Magnetic Effects of Current']
        }
      ]
    }
  }
};
