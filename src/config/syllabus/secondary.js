export const secondarySyllabus = {
  category: 'Secondary School (Classes 9 and 10)',
  defaultTheoryMarks: 80,
  defaultInternalMarks: 20,
  classes: ['Class 9', 'Class 10'],
  subjects: {
    'Mathematics Standard (Code 041)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sec_math_1', name: 'Unit I: Number Systems & Real Numbers', subtopics: ['Fundamental Theorem of Arithmetic', 'Irrationality Proofs', 'Polynomials: Zeroes & Factorisation'] },
        { id: 'sec_math_2', name: 'Unit II: Algebra (Equations & Progressions)', subtopics: ['Linear Equations in Two Variables', 'Quadratic Equations (Discriminant & Quadratic Formula)', 'Arithmetic Progressions (nth term & Sum of n terms)'] },
        { id: 'sec_math_3', name: 'Unit III: Coordinate Geometry & Triangles', subtopics: ['Distance & Section Formulae', 'Similarity Criteria for Triangles & Proofs', 'Circles: Tangent properties & Theorems'] },
        { id: 'sec_math_4', name: 'Unit IV: Trigonometry & Mensuration', subtopics: ['Trigonometric Ratios & Identities', 'Heights and Distances (Elevation/Depression)', 'Surface Areas and Volumes of Combinations of Solids'] },
        { id: 'sec_math_5', name: 'Unit V: Statistics & Probability', subtopics: ['Mean, Median and Mode of Grouped Data', 'Classical Definition of Probability'] }
      ]
    },
    'Mathematics Basic (Code 241)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sec_mathb_1', name: 'Unit I & II: Numbers & Fundamental Algebra', subtopics: ['Real Numbers', 'Polynomials & Simple Linear Pairs', 'Standard Quadratic Factorisation and AP Formulae'] },
        { id: 'sec_mathb_2', name: 'Unit III & IV: Coordinate Geometry & Applied Mensuration', subtopics: ['Distance Formula', 'Direct Triangle applications', 'Basic Trigonometric Values', 'Surface Area and Volume calculations'] },
        { id: 'sec_mathb_3', name: 'Unit V: Statistics and Probability', subtopics: ['Direct Mean, Median & Mode of Data', 'Basic Probability questions'] }
      ]
    },
    'Science (Code 086)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sec_sci_chem', name: 'Chemical Substances: Nature & Behaviour', subtopics: ['Chemical Reactions & Equations', 'Acids, Bases and Salts', 'Metals and Non-metals', 'Carbon and its Compounds'] },
        { id: 'sec_sci_bio', name: 'World of Living: Biology', subtopics: ['Life Processes (Nutrition, Respiration, Transportation, Excretion)', 'Control and Coordination in Animals/Plants', 'Reproduction in Organisms', 'Heredity and Evolution basics'] },
        { id: 'sec_sci_phy', name: 'Natural Phenomena & Current Electricity', subtopics: ['Light: Reflection, Refraction & Lens/Mirror Formulae', 'Human Eye and the Colourful World', 'Electricity: Ohm’s Law, Resistance, Heating Effect', 'Magnetic Effects of Electric Current'] },
        { id: 'sec_sci_env', name: 'Natural Resources & Our Environment', subtopics: ['Ecosystem, Food Chains and Food Webs', 'Ozone Layer Depletion & Waste Management'] }
      ]
    },
    'Social Science (Code 087)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sec_sst_hist', name: 'History: India and Contemporary World', subtopics: ['Rise of Nationalism in Europe', 'Nationalism in India', 'Making of a Global World / Age of Industrialisation', 'Print Culture and Modern World'] },
        { id: 'sec_sst_geo', name: 'Geography: Contemporary India', subtopics: ['Resources and Development', 'Forest and Wildlife Resources', 'Water Resources & Multipurpose Projects', 'Agriculture, Minerals & Energy Resources', 'Manufacturing Industries & Lifelines'] },
        { id: 'sec_sst_pol', name: 'Political Science: Democratic Politics', subtopics: ['Power Sharing and Federalism', 'Gender, Religion and Caste', 'Political Parties', 'Outcomes of Democracy'] },
        { id: 'sec_sst_eco', name: 'Economics: Understanding Economic Development', subtopics: ['Development & Per Capita Income', 'Sectors of Indian Economy', 'Money and Credit', 'Globalisation and the Indian Economy'] }
      ]
    },
    'English Language and Literature (Code 184)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sec_eng_read', name: 'Section A: Reading Skills', subtopics: ['Discursive Passage (400-450 words)', 'Case-Based Factual Passage with Visual Data'] },
        { id: 'sec_eng_write', name: 'Section B: Writing Skills and Grammar', subtopics: ['Formal Letter (Complaint, Inquiry, Order, Editor)', 'Analytical Paragraph Writing', 'Tenses, Modals, Subject-Verb Concord, Reported Speech'] },
        { id: 'sec_eng_lit', name: 'Section C: Literature Textbooks', subtopics: ['First Flight: Prose & Poetry', 'Footprints without Feet: Supplementary Reader'] }
      ]
    },
    'English Communicative (Code 101)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sec_engc_1', name: 'Reading & Advanced Composition', subtopics: ['Unseen Comprehension', 'Articles, Speeches, Debate, Story Writing'] },
        { id: 'sec_engc_2', name: 'Grammar & Literature Companion', subtopics: ['Omission, Editing, Sentence Reordering', 'Drama, Fiction and Poetry Analysis'] }
      ]
    },
    'Hindi Course A (Code 002)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sec_hina_1', name: 'अपठित बोध एवं व्यावहारिक व्याकरण', subtopics: ['अपठित गद्यांश व काव्यांश', 'रचना के आधार पर वाक्य भेद, वाच्य', 'पद परिचय, अलंकार (अनुप्रास, यमक, उपमा, रूपक, अतिशयोक्ति)'] },
        { id: 'sec_hina_2', name: 'पाठ्यपुस्तक क्षितिज, कृतिका व रचनात्मक लेखन', subtopics: ['क्षितिज भाग-2 गद्य व काव्य खंड', 'कृतिका भाग-2', 'अनुच्छेद लेखन, पत्र लेखन, स्ववृत्त लेखन, विज्ञापन/ई-मेल'] }
      ]
    },
    'Hindi Course B (Code 085)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sec_hinb_1', name: 'अपठित बोध एवं व्याकरण', subtopics: ['अपठित गद्यांश', 'पदबंध, रचना के आधार पर वाक्य रूपांतरण, समास, मुहावरे'] },
        { id: 'sec_hinb_2', name: 'पाठ्यपुस्तक स्पर्श, संचयन व लेखन', subtopics: ['स्पर्श भाग-2 गद्य व पद्य', 'संचयन भाग-2', 'अनुच्छेद, सूचना लेखन, विज्ञापन, लघुकथा'] }
      ]
    },
    'Information Technology (Code 402)': {
      fixedTheoryMarks: 50,
      fixedPracticalMarks: 50,
      units: [
        { id: 'sec_it_a', name: 'Part A: Employability Skills', subtopics: ['Communication Skills', 'Self-Management Skills', 'ICT Skills', 'Entrepreneurial Skills', 'Green Skills'] },
        { id: 'sec_it_b', name: 'Part B: Subject Specific Skills', subtopics: ['Digital Documentation (Advanced)', 'Electronic Spreadsheet (Advanced)', 'Database Management System (RDBMS)', 'Web Applications and Security'] }
      ]
    },
    'Artificial Intelligence (Code 417)': {
      fixedTheoryMarks: 50,
      fixedPracticalMarks: 50,
      units: [
        { id: 'sec_ai_1', name: 'Part A: Employability Skills', subtopics: ['Communication, Self-Management, ICT & Green Skills'] },
        { id: 'sec_ai_2', name: 'Part B: AI Project Cycle & Python', subtopics: ['Introduction to AI & Ethics', 'AI Project Cycle (Scoping, Data, Modeling, Evaluation)', 'Computer Vision (CV) & NLP', 'Python for AI (Lists, NumPy, Matplotlib)'] }
      ]
    },
    'Computer Applications (Code 165)': {
      fixedTheoryMarks: 50,
      fixedPracticalMarks: 50,
      units: [
        { id: 'sec_ca_1', name: 'Networking, HTML & Cyberethics', subtopics: ['Internet Basics (Web, URL, Protocols, Search Engines)', 'HTML Basics & Tables, Links, Images', 'Cyberethics, Netiquettes & Software Licenses'] },
        { id: 'sec_ca_2', name: 'Scratch / Python Programming', subtopics: ['Decision making, Loops, Simple algorithm scripts'] }
      ]
    }
  }
};
