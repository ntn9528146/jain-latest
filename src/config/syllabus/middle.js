export const middleSyllabus = {
  category: 'Middle School (Class 6th to 8th)',
  defaultTheoryMarks: 80,
  defaultInternalMarks: 20,
  classes: ['Class 6', 'Class 7', 'Class 8'],
  subjects: {
    'Science': {
      units: [
        {
          id: 'm_sci_1',
          name: 'Food & Living World (Biology)',
          subtopics: ['Components of Food & Nutrients', 'Cell Structure and Microorganisms', 'Respiration & Reproduction in Plants/Animals']
        },
        {
          id: 'm_sci_2',
          name: 'Matter & Materials (Chemistry)',
          subtopics: ['Acids, Bases and Salts', 'Physical and Chemical Changes', 'Synthetic Fibres, Metals and Non-Metals']
        },
        {
          id: 'm_sci_3',
          name: 'Energy & Motion (Physics)',
          subtopics: ['Motion, Force and Pressure', 'Sound & Light Reflection', 'Electricity: Chemical Effects and Circuits']
        }
      ]
    },
    'Mathematics': {
      units: [
        {
          id: 'm_math_1',
          name: 'Number System & Algebra',
          subtopics: ['Rational Numbers & Exponents', 'Linear Equations in One Variable', 'Algebraic Expressions and Factorization']
        },
        {
          id: 'm_math_2',
          name: 'Geometry & Mensuration',
          subtopics: ['Understanding Quadrilaterals', 'Area and Surface Area of Solids', 'Visualising Solid Shapes']
        },
        {
          id: 'm_math_3',
          name: 'Commercial Maths & Statistics',
          subtopics: ['Comparing Quantities (Percentage, Profit & Loss, SI/CI)', 'Data Handling & Pie Charts']
        }
      ]
    },
    'Computer Science': {
      units: [
        {
          id: 'm_cs_1',
          name: 'Foundations of Coding & Algorithms',
          subtopics: ['Flowcharts and Algorithm Design', 'Introduction to Python / Block Coding', 'Variables, Loops and Conditions']
        },
        {
          id: 'm_cs_2',
          name: 'Cyber Safety & Digital Citizenship',
          subtopics: ['Safe Internet Browsing', 'Cyber bullying and digital footprint', 'Computer Hardware and Cloud storage']
        }
      ]
    }
  }
};
