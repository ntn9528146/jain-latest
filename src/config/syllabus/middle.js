export const middleSyllabus = {
  category: 'Middle School Level (Classes 6 to 8)',
  defaultTheoryMarks: 80,
  defaultInternalMarks: 20,
  classes: ['Class 6', 'Class 7', 'Class 8'],
  subjects: {
    'Science (Physics, Chemistry, Biology)': {
      units: [
        {
          id: 'mid_sci_phy',
          name: 'Physics: Motion, Energy & Natural Forces',
          subtopics: ['Motion, Speed and Distance-Time Graphs', 'Force, Pressure and Friction', 'Sound, Light Reflection & Dispersion', 'Electricity, Chemical Effects & Electric Circuits']
        },
        {
          id: 'mid_sci_chem',
          name: 'Chemistry: Matter & Material Transformation',
          subtopics: ['Physical and Chemical Changes', 'Acids, Bases, Salts and Indicators', 'Metals and Non-Metals: Properties and Reactions', 'Synthetic Fibres, Plastics, Coal and Petroleum']
        },
        {
          id: 'mid_sci_bio',
          name: 'Biology: Living World & Physiology',
          subtopics: ['Cell Structure and Functions', 'Nutrition and Respiration in Plants & Animals', 'Transportation and Excretion in Organisms', 'Microorganisms: Friend and Foe', 'Conservation of Plants and Animals']
        }
      ]
    },
    'Mathematics': {
      units: [
        {
          id: 'mid_math_1',
          name: 'Number System & Commercial Arithmetic',
          subtopics: ['Integers, Rational Numbers and Exponents', 'Comparing Quantities: Ratios, Percentages, Profit & Loss, Simple/Compound Interest']
        },
        {
          id: 'mid_math_2',
          name: 'Algebra & Equations',
          subtopics: ['Algebraic Expressions, Identities & Factorisation', 'Linear Equations in One Variable']
        },
        {
          id: 'mid_math_3',
          name: 'Geometry, Mensuration & Statistics',
          subtopics: ['Lines and Angles, Triangles and its Properties', 'Understanding Quadrilaterals & Practical Geometry', 'Area and Surface Area of Plane and Solid Figures', 'Data Handling: Frequency Tables, Bar Graphs, Histograms and Pie Charts']
        }
      ]
    },
    'Social Science (History, Geography, Civics)': {
      units: [
        {
          id: 'mid_sst_hist',
          name: 'History: India & Modern Transitions',
          subtopics: ['Ancient Civilizations & Empires', 'Medieval Kingdoms, Delhi Sultanate & Mughal Empire', 'Colonial Rule, Revolt of 1857 & Indian National Movement']
        },
        {
          id: 'mid_sst_geo',
          name: 'Geography: Earth, Resources & Development',
          subtopics: ['Solar System, Earth Interior & Plate Tectonics', 'Natural Resources: Land, Soil, Water, Natural Vegetation', 'Agriculture, Major Crops, Minerals and Industries']
        },
        {
          id: 'mid_sst_civ',
          name: 'Civics / Political Science: Democracy & Governance',
          subtopics: ['Indian Constitution and Secularism', 'Parliament and Law Making Process', 'Judiciary and Criminal Justice System', 'Social Justice and Marginalisation']
        }
      ]
    },
    'English Language & Literature': {
      units: [
        {
          id: 'mid_eng_1',
          name: 'Section A & B: Reading & Writing Skills',
          subtopics: ['Discursive & Factual Unseen Passages', 'Formal & Informal Letter Writing', 'Notice, Diary Entry & Analytical Article Writing']
        },
        {
          id: 'mid_eng_2',
          name: 'Section C: Grammar & Literature Textbooks',
          subtopics: ['Reported Speech, Active/Passive Voice, Modals, Subject-Verb Agreement', 'Prose & Poetry Appreciation, Theme Analysis and Character Sketches']
        }
      ]
    },
    'Hindi (हिंदी - भाषा, साहित्य व व्याकरण)': {
      units: [
        {
          id: 'mid_hin_1',
          name: 'अपठित बोध एवं व्याकरण',
          subtopics: ['अपठित गद्यांश व काव्यांश', 'संधि, समास, उपसर्ग, प्रत्यय, मुहावरे', 'अलंकार, वाक्य विचार एवं पदबंध परिचय']
        },
        {
          id: 'mid_hin_2',
          name: 'साहित्य एवं रचनात्मक लेखन',
          subtopics: ['वसंत / पाठ्यपुस्तक के पाठ, कविताएँ एवं एकांकी', 'संवाद लेखन, लघु कथा, विज्ञापन एवं औपचारिक पत्र']
        }
      ]
    },
    'Computer Science & Artificial Intelligence': {
      units: [
        {
          id: 'mid_cs_1',
          name: 'Office Productivity & Cyber Ethics',
          subtopics: ['Advanced MS Excel: Formulas, Charts, Sorting', 'Presentations with Audio/Video in MS PowerPoint', 'Cyber Safety, Phishing, Passwords and Digital Etiquette']
        },
        {
          id: 'mid_cs_2',
          name: 'Coding & Intro to Artificial Intelligence',
          subtopics: ['Algorithmic Thinking and Flowcharts', 'Block Coding / Python Basics (Variables, Loops, Conditions)', 'Domains of AI: Computer Vision, NLP and Data Science']
        }
      ]
    },
    'Third Language (Sanskrit / French / German / Regional)': {
      units: [
        {
          id: 'mid_l3_1',
          name: 'Grammar & Text Comprehension',
          subtopics: ['शब्दरूप व धातुरूप (लट्, लृट्, लङ् लकार) / Verb Conjugations', 'कारक एवं विभक्ति परिचय / Articles & Prepositions', 'सरल अनुवाद एवं अपठित परिच्छेद']
        }
      ]
    }
  }
};
