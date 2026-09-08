export const secondarySyllabus = {
  classes: ['Class 9', 'Class 10'],
  subjects: {
    'Mathematics Standard (Code 041)': {
      units: [
        { id: 'm1', name: 'Number Systems', marks: 6, subtopics: ['Real Numbers', 'Fundamental Theorem of Arithmetic', 'Proofs of irrationality of root 2, root 3, root 5'] },
        { id: 'm2', name: 'Algebra', marks: 20, subtopics: ['Polynomials', 'Pair of Linear Equations in Two Variables', 'Quadratic Equations', 'Arithmetic Progressions'] },
        { id: 'm3', name: 'Coordinate Geometry', marks: 6, subtopics: ['Lines in two-dimensions', 'Distance Formula', 'Section Formula'] },
        { id: 'm4', name: 'Geometry', marks: 15, subtopics: ['Similar Triangles', 'Circles and Tangents'] },
        { id: 'm5', name: 'Trigonometry', marks: 12, subtopics: ['Introduction to Trigonometry', 'Trigonometric Identities', 'Heights and Distances'] },
        { id: 'm6', name: 'Mensuration', marks: 10, subtopics: ['Areas Related to Circles', 'Surface Areas and Volumes'] },
        { id: 'm7', name: 'Statistics and Probability', marks: 11, subtopics: ['Statistics (Mean, Median, Mode)', 'Probability'] }
      ]
    },
    'Mathematics Basic (Code 241)': {
      units: [
        { id: 'mb1', name: 'Number Systems', marks: 6, subtopics: ['Real Numbers', 'Fundamental Theorem of Arithmetic'] },
        { id: 'mb2', name: 'Algebra', marks: 20, subtopics: ['Polynomials', 'Pair of Linear Equations', 'Quadratic Equations', 'Arithmetic Progressions'] },
        { id: 'mb3', name: 'Coordinate Geometry', marks: 6, subtopics: ['Coordinate geometry basics', 'Distance Formula', 'Section Formula'] },
        { id: 'mb4', name: 'Geometry', marks: 15, subtopics: ['Triangles', 'Circles'] },
        { id: 'mb5', name: 'Trigonometry', marks: 12, subtopics: ['Introduction to Trigonometry', 'Trigonometric Identities', 'Heights and Distances'] },
        { id: 'mb6', name: 'Mensuration', marks: 10, subtopics: ['Areas Related to Circles', 'Surface Areas and Volumes'] },
        { id: 'mb7', name: 'Statistics and Probability', marks: 11, subtopics: ['Statistics', 'Probability'] }
      ]
    },
    'Science (Code 086)': {
      units: [
        { id: 's1', name: 'Chemical Substances - Nature and Behaviour', marks: 25, subtopics: ['Chemical Reactions and Equations', 'Acids, Bases and Salts', 'Metals and Non-metals', 'Carbon and its Compounds'] },
        { id: 's2', name: 'World of Living', marks: 25, subtopics: ['Life Processes', 'Control and Coordination', 'Reproduction', 'Heredity and Evolution'] },
        { id: 's3', name: 'Natural Phenomena', marks: 12, subtopics: ['Reflection and Refraction of Light', 'Human Eye and Colourful World'] },
        { id: 's4', name: 'Effects of Current', marks: 13, subtopics: ['Electricity', 'Magnetic Effects of Electric Current'] },
        { id: 's5', name: 'Natural Resources', marks: 5, subtopics: ['Our Environment'] }
      ]
    },
    'Social Science (Code 087)': {
      units: [
        { id: 'ss1', name: 'History', marks: 20, subtopics: ['The Rise of Nationalism in Europe', 'Nationalism in India', 'The Making of a Global World', 'Print Culture and the Modern World'] },
        { id: 'ss2', name: 'Geography', marks: 20, subtopics: ['Resources and Development', 'Water Resources', 'Agriculture', 'Minerals and Energy Resources', 'Manufacturing Industries', 'Lifelines of National Economy'] },
        { id: 'ss3', name: 'Political Science', marks: 20, subtopics: ['Power-sharing', 'Federalism', 'Gender, Religion and Caste', 'Political Parties', 'Outcomes of Democracy'] },
        { id: 'ss4', name: 'Economics', marks: 20, subtopics: ['Development', 'Sectors of the Indian Economy', 'Money and Credit', 'Globalisation and the Indian Economy', 'Consumer Rights'] }
      ]
    },
    'English Language and Literature (Code 184)': {
      units: [
        { id: 'el1', name: 'Reading Comprehension', marks: 20, subtopics: ['Discursive Passage', 'Case-based Factual Passage'] },
        { id: 'el2', name: 'Writing Skills and Grammar', marks: 20, subtopics: ['Tenses and Modals', 'Subject-Verb Concord', 'Reported Speech', 'Formal Letters', 'Analytical Paragraph'] },
        { id: 'el3', name: 'Language through Literature', marks: 40, subtopics: ['First Flight Prose', 'First Flight Poetry', 'Footprints Without Feet'] }
      ]
    },
    'English Communicative (Code 101)': {
      units: [
        { id: 'ec1', name: 'Reading Skills', marks: 22, subtopics: ['Unseen Prose Passage', 'Unseen Factual Passage'] },
        { id: 'ec2', name: 'Writing Skills', marks: 22, subtopics: ['Notice Writing', 'Message Writing', 'Bio Sketch', 'Formal Letters', 'Informal Letters'] },
        { id: 'ec3', name: 'Grammar', marks: 10, subtopics: ['Integrated Grammar Exercises', 'Editing and Omission', 'Sentence Reordering'] },
        { id: 'ec4', name: 'Literature Textbook', marks: 26, subtopics: ['Prose Extracts', 'Poetry Extracts', 'Drama Extracts'] }
      ]
    },
    'Hindi Course A (Code 002)': {
      units: [
        { id: 'ha1', name: 'Ghand Khand', marks: 25, subtopics: ['Apathit Gadyansh', 'Kshitij Prose - Netaji ka Chashma', 'Balgobin Bhagat', 'Lakhnavi Andaz', 'Manviya Karuna ki Divya Chamak', 'Ek Kahani Yeh Bhi'] },
        { id: 'ha2', name: 'Kavya Khand', marks: 20, subtopics: ['Surdas ke Pad', 'Tulsidas - Ram-Lakshman-Parashuram Samvad', 'Dev - Sawaiye aur Kavitt', 'Jayshankar Prasad - Atmakathya', 'Suryakant Tripathi - Utsah aur At Nahi Rahi Hai', 'Nagarjun - Yah Danturit Muskan aur Fasal', 'Girija Kumar Mathur - Chhaya Mat Chhuo', 'Manglesh Dabral - sangatkar'] },
        { id: 'ha3', name: 'Kritika', marks: 10, subtopics: ['Mata ki Anchal', 'George Pancham ki Naak', 'Sana Sana Hath Jodi', 'Hiaiya Jhulan Jhulani हैरानी ho Rama!'] },
        { id: 'ha4', name: 'Vyakaran', marks: 16, subtopics: ['Rachanadharit Vakya Bhed', 'Vachya', 'Pad Parichay', 'Alankar'] },
        { id: 'ha5', name: 'Lekhan', marks: 9, subtopics: ['Anuchhed Lekhan', 'Patra Lekhan', 'Vigyapan Lekhan', 'Sandesh Lekhan'] }
      ]
    },
    'Hindi Course B (Code 085)': {
      units: [
        { id: 'hb1', name: 'Apathit Bodh', marks: 14, subtopics: ['Apathit Gadyansh 1', 'Apathit Gadyansh 2'] },
        { id: 'hb2', name: 'Vyakaran', marks: 16, subtopics: ['Padbandh', 'Vakya Rupantaran', 'Samas', 'Muhavare'] },
        { id: 'hb3', name: 'Sparsh & Sanchayan', marks: 28, subtopics: ['Sparsh Prose Chapters', 'Sparsh Poetry Chapters', 'Sanchayan Chapters'] },
        { id: 'hb4', name: 'Rachnatmak Lekhan', marks: 22, subtopics: ['Anuchhed Lekhan', 'Patra Lekhan', 'Soochana Lekhan', 'Vigyapan Lekhan', 'Laghu Katha / E-mail Lekhan'] }
      ]
    },
    'Sanskrit': {
      units: [
        { id: 'sk1', name: 'Apathit Avbodhanam', marks: 10, subtopics: ['Unseen Passage Comprehension'] },
        { id: 'sk2', name: 'Rachnatmak Karyam', marks: 15, subtopics: ['Patra Lekhan', 'Chitra Varnan', 'Anuchhed Lekhan', 'Sanskrit Translation'] },
        { id: 'sk3', name: 'Anuprayogik Vyakaran', marks: 25, subtopics: ['Sandhi', 'Samas', 'Pratyaya', 'Vachya', 'Samay', 'Avyaya'] },
        { id: 'sk4', name: 'Pathtit Avbodhanam', marks: 30, subtopics: ['Shemushi Textbook Prose Extracts', 'Shemushi Textbook Poetry Extracts', 'Shemushi Textbook Drama Extracts'] }
      ]
    },
    'Urdu': {
      units: [
        { id: 'u1', name: 'Reading & Comprehension', marks: 20, subtopics: ['Unseen Prose Passage', 'Unseen Poetry Passage'] },
        { id: 'u2', name: 'Writing Skills', marks: 25, subtopics: ['Mazmoon Nigari', 'Darkhast Nigari', 'Khutoot Nigari'] },
        { id: 'u3', name: 'Functional Grammar', marks: 20, subtopics: ['Fail ki Aqsam', 'Ism aur Sifat', 'Rumuz-o-Auqaf', 'Muhavare aur Zarbul-Imsal'] },
        { id: 'u4', name: 'Literature', marks: 15, subtopics: ['Prose Textual Questions', 'Poetry Textual Questions'] }
      ]
    },
    'Punjabi': {
      units: [
        { id: 'p1', name: 'Reading Skill', marks: 10, subtopics: ['Anditta Paira', 'Anditti Kav Tukdi'] },
        { id: 'p2', name: 'Grammar', marks: 12, subtopics: ['Virodhi Shabad', 'Ling', 'Vismik', 'Shabad Shudhi', 'Kirya', 'Muhavare'] },
        { id: 'p3', name: 'Writing Skill', marks: 18, subtopics: ['Lekh Rachna', 'Patr Rachna', 'Tasvir Adharit Varnan'] },
        { id: 'p4', name: 'Textbooks & Literature', marks: 40, subtopics: ['Sahit Mala Prose', 'Sahit Mala Poetry', 'Vangi Supplementary'] }
      ]
    },
    'Information Technology (Code 402)': {
      units: [
        { id: 'it1', name: 'Employability Skills', marks: 10, subtopics: ['Communication Skills-II', 'Self-Management Skills-II', 'ICT Skills-II', 'Entrepreneurial Skills-II', 'Green Skills-II'] },
        { id: 'it2', name: 'Subject Specific Skills', marks: 40, subtopics: ['Digital Documentation (Advanced)', 'Electronic Spreadsheet (Advanced)', 'Database Management System', 'Web Applications and Security'] }
      ]
    },
    'Artificial Intelligence (Code 417)': {
      units: [
        { id: 'ai1', name: 'Employability Skills', marks: 10, subtopics: ['Communication Skills', 'Self-Management Skills', 'ICT Skills', 'Entrepreneurial Skills', 'Green Skills'] },
        { id: 'ai2', name: 'Subject Specific Skills', marks: 40, subtopics: ['Introduction to AI', 'AI Project Cycle', 'Computer Vision', 'Natural Language Processing', 'Evaluation'] }
      ]
    },
    'Computer Applications (Code 165)': {
      units: [
        { id: 'ca1', name: 'Networking and HTML', marks: 25, subtopics: ['Internet Basics', 'HTML Fundamentals', 'Creating Tables in HTML', 'Links and Images in HTML'] },
        { id: 'ca2', name: 'Cyber Ethics and Python', marks: 25, subtopics: ['Cyber Safety', 'Python Basics', 'Conditional Statements in Python', 'Loops in Python'] }
      ]
    },
    'NCC': {
      units: [
        { id: 'ncc1', name: 'Common Subjects', marks: 70, subtopics: ['National Integration', 'Drill Practice', 'Weapon Training (.22 Rifle)', 'Adventure Training', 'Personality Development and Leadership', 'Disaster Management'] }
      ]
    },
    'Art Education': {
      units: [
        { id: 'ae1', name: 'History of Arts', marks: 20, subtopics: ['Indian Art Heritage', 'Mughal and Pahari Miniature Paintings', 'Modern Indian Art Trends'] },
        { id: 'ae2', name: 'Visual Arts, Music, Theatre, Dance', marks: 16, subtopics: ['Still Life Sketching', 'Design and Rangoli', 'Basic Music Theory', 'Dramatic Expression'] },
        { id: 'ae3', name: 'Analytical Note on Unseen Image', marks: 4, subtopics: ['Visual Evaluation of Artworks'] }
      ]
    },
    'PEWB': {
      units: [
        { id: 'pe1', name: 'Theory', marks: 20, subtopics: ['Changing Trends & Career in Physical Education', 'Olympic Movement', 'Physical Fitness, Wellness & Lifestyle', 'Test, Measurement & Evaluation', 'Fundamentals of Anatomy & Physiology in Sports'] },
        { id: 'pe2', name: 'Practical & Sports File', marks: 80, subtopics: ['Physical Fitness Test', 'Sports Proficiency Demonstration', 'Yoga Asanas', 'Practical Record File'] }
      ]
    },
    'Elements of Book Keeping & Accountancy': {
      units: [
        { id: 'bk1', name: 'Capital and Revenue', marks: 8, subtopics: ['Capital and Revenue Receipts', 'Capital and Revenue Expenditures'] },
        { id: 'bk2', name: 'Depreciation', marks: 12, subtopics: ['Straight Line Method', 'Diminishing Balance Method'] },
        { id: 'bk3', name: 'Bank Reconciliation Statement', marks: 14, subtopics: ['Causes of Differences', 'Preparation of BRS'] },
        { id: 'bk4', name: 'Bills of Exchange', marks: 10, subtopics: ['Nature and Terms', 'Journal Entries and Ledger'] },
        { id: 'bk5', name: 'Final Accounts', marks: 14, subtopics: ['Trading Account', 'Profit and Loss Account', 'Balance Sheet'] },
        { id: 'bk6', name: 'Accounting from Incomplete Records', marks: 12, subtopics: ['Statement of Profit', 'Statement of Affairs Method'] },
        { id: 'bk7', name: 'Project Work', marks: 30, subtopics: ['Comprehensive Accounting Project', 'Project Viva Voce'] }
      ]
    },
    'Carnatic Vocal': {
      units: [
        { id: 'cv1', name: 'Theory', marks: 30, subtopics: ['Raga Classification', '72 Melakarta Scheme', 'Life History of Composers', 'Musical Terminology'] },
        { id: 'cv2', name: 'Practical', marks: 50, subtopics: ['Alankaras Rendition', 'Varnams Practice', 'Kriti Rendition', 'Kalpana Swaras'] },
        { id: 'cv3', name: 'Internal Assessment', marks: 20, subtopics: ['Periodic Assessments', 'Portfolio and Viva'] }
      ]
    }
  }
};
