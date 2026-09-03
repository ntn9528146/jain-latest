export const seniorSecondarySyllabus = {
  category: 'Senior Secondary (Classes 11 and 12)',
  classes: ['Class 11', 'Class 12'],
  subjects: {
    'Physics (Code 042)': {
      fixedTheoryMarks: 70,
      fixedPracticalMarks: 30,
      units: [
        { id: 'sr_phy_1', name: 'Unit I & II: Electrostatics & Current Electricity', subtopics: ['Electric Charges, Fields & Gauss Law', 'Electrostatic Potential & Capacitors', 'Drift Velocity, Ohm’s Law & Kirchhoff’s Rules', 'Potentiometer & Wheatstone Bridge'] },
        { id: 'sr_phy_2', name: 'Unit III & IV: Magnetic Effects, EMI & Alternating Currents', subtopics: ['Biot-Savart & Ampere’s Law, Moving Coil Galvanometer', 'Faraday’s Laws & Lenz’s Law, Self/Mutual Inductance', 'LCR Series Circuit, Resonance, Power Factor & Transformers'] },
        { id: 'sr_phy_3', name: 'Unit V & VI: EM Waves & Optics', subtopics: ['Electromagnetic Spectrum & Maxwell Equations', 'Ray Optics: Lenses, Prisms & Optical Instruments', 'Wave Optics: Huygens Principle, Interference & Single Slit Diffraction'] },
        { id: 'sr_phy_4', name: 'Unit VII, VIII & IX: Modern Physics & Semiconductors', subtopics: ['Dual Nature of Radiation & Photoelectric Effect', 'Atoms & Nuclei: Bohr Model, Mass Defect, Nuclear Fission/Fusion', 'Semiconductor Electronics: p-n Junction Diode, Rectifiers & Logic Gates'] }
      ]
    },
    'Chemistry (Code 043)': {
      fixedTheoryMarks: 70,
      fixedPracticalMarks: 30,
      units: [
        { id: 'sr_chem_1', name: 'Physical Chemistry', subtopics: ['Solutions: Colligative Properties & Raoult’s Law', 'Electrochemistry: Nernst Equation & Kohlrausch’s Law', 'Chemical Kinetics: Rate Law, Order, Arrhenius Equation'] },
        { id: 'sr_chem_2', name: 'Inorganic Chemistry', subtopics: ['d- and f-Block Elements: Electronic Configuration, Oxidation States', 'Coordination Compounds: Werner’s Theory, VBT, CFT and Isomerism'] },
        { id: 'sr_chem_3', name: 'Organic Chemistry', subtopics: ['Haloalkanes and Haloarenes', 'Alcohols, Phenols and Ethers', 'Aldehydes, Ketones and Carboxylic Acids', 'Amines and Diazonium Salts', 'Biomolecules: Carbohydrates, Proteins and Nucleic Acids'] }
      ]
    },
    'Mathematics (Code 041)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sr_math_1', name: 'Unit I & II: Relations, Functions & Algebra', subtopics: ['Types of Relations, Equivalence Relations, Invertible Functions', 'Inverse Trigonometric Functions & Principal Values', 'Matrices & Matrix Multiplication', 'Determinants, Adjoint, Inverse & System of Equations'] },
        { id: 'sr_math_2', name: 'Unit III: Calculus', subtopics: ['Continuity and Differentiability, Chain Rule', 'Applications of Derivatives: Tangents, Rate of Change, Maxima & Minima', 'Integrals: Definite & Indefinite Integration, By Parts, Partial Fractions', 'Applications of Integrals: Area under Simple Curves', 'Differential Equations: Order, Degree, Variable Separable, Linear DE'] },
        { id: 'sr_math_3', name: 'Unit IV, V & VI: Vectors, 3D Geometry, LPP & Probability', subtopics: ['Vectors: Dot & Cross Product', 'Three Dimensional Geometry: Direction Cosines & Line Equations', 'Linear Programming Problem: Graphical Feasible Region', 'Conditional Probability, Bayes’ Theorem & Multiplication Rule'] }
      ]
    },
    'Applied Mathematics (Code 241)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sr_amath_1', name: 'Numbers, Quantification & Numerical Applications', subtopics: ['Modulo Arithmetic, Congruence, Alligation & Mixtures', 'Boats and Streams, Pipes and Cisterns, Races'] },
        { id: 'sr_amath_2', name: 'Calculus & Linear Programming', subtopics: ['Marginal Cost & Marginal Revenue', 'Optimization in Business & LPP'] },
        { id: 'sr_amath_3', name: 'Probability, Financial Mathematics & Time Series', subtopics: ['Poisson & Normal Distribution', 'Perpetuity, Sinking Funds, EMI, Amortization', 'Secular Trend & Moving Averages'] }
      ]
    },
    'Biology (Code 044)': {
      fixedTheoryMarks: 70,
      fixedPracticalMarks: 30,
      units: [
        { id: 'sr_bio_1', name: 'Reproduction & Genetics', subtopics: ['Sexual Reproduction in Flowering Plants', 'Human Reproduction & Reproductive Health', 'Principles of Inheritance and Variation (Mendelian)', 'Molecular Basis of Inheritance (DNA Replication, Transcription, Translation)'] },
        { id: 'sr_bio_2', name: 'Biotechnology, Evolution & Ecology', subtopics: ['Origin of Life & Adaptive Radiation', 'Biotechnology: Principles, Processes & Applications', 'Organisms and Populations, Ecosystem, Biodiversity & Conservation'] }
      ]
    },
    'Computer Science (Code 083)': {
      fixedTheoryMarks: 70,
      fixedPracticalMarks: 30,
      units: [
        { id: 'sr_cs_1', name: 'Unit I: Computational Thinking and Programming - 2', subtopics: ['Python Revision Tour (Loops, Functions, Scope, Arguments)', 'Exception Handling (try-except-finally)', 'File Handling: Text, Binary (pickle), CSV Files', 'Data Structure: Linear Stack using Python Lists'] },
        { id: 'sr_cs_2', name: 'Unit II: Computer Networks', subtopics: ['Topologies, Transmission Media, Network Devices (Router, Gateway, Switch)', 'Protocols: TCP/IP, DNS, HTTP, FTP, SMTP, POP3', 'Network Layout Design Case Study'] },
        { id: 'sr_cs_3', name: 'Unit III: Database Management & SQL-Python Connectivity', subtopics: ['Relational Concepts & Keys', 'SQL Queries: GROUP BY, HAVING, Aggregate Functions', 'Equi-Join & Natural Join between two tables', 'mysql.connector module and cursor methods'] }
      ]
    },
    'Informatics Practices (Code 065)': {
      fixedTheoryMarks: 70,
      fixedPracticalMarks: 30,
      units: [
        { id: 'sr_ip_1', name: 'Data Handling using Pandas and Data Visualization', subtopics: ['Pandas Series: Creation, Indexing, Slicing', 'Pandas DataFrame: Attributes, Head/Tail, Add/Drop rows & cols', 'Matplotlib: Line Plot, Bar Chart, Histogram & Labels'] },
        { id: 'sr_ip_2', name: 'Database Query using SQL & Societal Impacts', subtopics: ['Math, String & Date Functions in SQL', 'Aggregate Functions & GROUP BY', 'Cybercrime, Phishing, Hacking, IPR, Digital Footprints & E-waste'] }
      ]
    },
    'Accountancy (Code 055)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sr_acc_1', name: 'Accounting for Partnership Firms', subtopics: ['Partnership Fundamentals, P&L Appropriation, Goodwill', 'Admission, Retirement and Death of a Partner', 'Dissolution of a Partnership Firm'] },
        { id: 'sr_acc_2', name: 'Accounting for Companies & Financial Statements', subtopics: ['Issue and Forfeiture of Shares & Pro-rata Allotment', 'Issue and Redemption of Debentures', 'Financial Statement Analysis & Comparative/Common Size', 'Accounting Ratios & Cash Flow Statement'] }
      ]
    },
    'Business Studies (Code 054)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sr_bst_1', name: 'Principles and Functions of Management', subtopics: ['Nature & Significance of Management, Fayol & Taylor Principles', 'Business Environment, Planning & Organizing', 'Staffing, Directing and Controlling'] },
        { id: 'sr_bst_2', name: 'Business Finance and Marketing', subtopics: ['Financial Management & Financial Markets (Capital & Money Market)', 'Marketing Mix (Product, Price, Place, Promotion)', 'Consumer Protection Act 2019'] }
      ]
    },
    'Economics (Code 030)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sr_eco_1', name: 'Introductory Macroeconomics', subtopics: ['National Income Accounting & Aggregates', 'Money and Banking (Central Bank & Commercial Banks)', 'Determination of Income and Employment, Multiplier', 'Government Budget and Balance of Payments'] },
        { id: 'sr_eco_2', name: 'Indian Economic Development', subtopics: ['Development Experience (1947-90) & Economic Reforms 1991', 'Poverty, Human Capital, Rural Development, Employment', 'Sustainable Development & Comparative Development of India, China, Pakistan'] }
      ]
    },
    'Political Science (Code 028)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sr_pol_1', name: 'Contemporary World Politics', subtopics: ['End of Bipolarity & Disintegration of USSR', 'Alternative Centres of Power (ASEAN, EU, China, Japan)', 'Contemporary South Asia & International Organisations (UNO)', 'Security in Contemporary World, Environment and Globalisation'] },
        { id: 'sr_pol_2', name: 'Politics in India since Independence', subtopics: ['Challenges of Nation Building & Linguistic States', 'Era of One-Party Dominance & Planned Development', 'India’s External Relations & Democratic Crisis 1975-77', 'Regional Aspirations and Recent Trends in Indian Politics'] }
      ]
    },
    'History (Code 027)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sr_hist_1', name: 'Themes in Indian History Part I, II & III', subtopics: ['Bricks, Beads and Bones (Harappan Civilisation)', 'Kings, Farmers and Towns (Early States & Economies)', 'Kinship, Caste and Class & Thinkers, Beliefs and Buildings', 'Bhakti-Sufi Traditions & Vijayanagara Empire', 'Colonialism and Countryside & Mahatma Gandhi and National Movement', 'Framing the Constitution'] }
      ]
    },
    'Geography (Code 029)': {
      fixedTheoryMarks: 70,
      fixedPracticalMarks: 30,
      units: [
        { id: 'sr_geo_1', name: 'Fundamentals of Human Geography & India: People and Economy', subtopics: ['Human Geography: Nature and Scope, World Population', 'Human Activities (Primary, Secondary, Tertiary)', 'India: Population, Migration, Human Settlements, Water, Minerals & Transport'] }
      ]
    },
    'Physical Education (Code 048)': {
      fixedTheoryMarks: 70,
      fixedPracticalMarks: 30,
      units: [
        { id: 'sr_ped_1', name: 'Management of Sporting Events & Children with Special Needs', subtopics: ['Knockout and League Tournaments, Fixture Calculation', 'Yoga as Preventive Measures for Lifestyle Diseases', 'Physical Education & Sports for CWSN'] },
        { id: 'sr_ped_2', name: 'Physiology, Biomechanics & Training in Sports', subtopics: ['Sports & Nutrition, Test and Measurement in Sports', 'Physiology and Injuries in Sports (Soft tissue, Fractures)', 'Biomechanics & Sports: Levers, Equilibrium, Projectiles', 'Training in Sports: Circuit Training, Strength, Endurance'] }
      ]
    },
    'Hindi Core (Code 302)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sr_hinc_1', name: 'अपठित बोध एवं अभिव्यक्ति और माध्यम', subtopics: ['अपठित गद्यांश व पद्यांश', 'जनसंचार माध्यम, फीचर लेखन, विशेष रिपोर्ट, आलेख'] },
        { id: 'sr_hinc_2', name: 'आरोह भाग-2 एवं वितान भाग-2', subtopics: ['काव्य खंड (हरिवंश राय बच्चन, तुलसीदास, निराला)', 'गद्य खंड (भक्तिन, बाज़ार दर्शन, पहलवान की ढोलक)', 'वितान: सिल्वर वैडिंग, जूझ, अतीत में दबे पाँव'] }
      ]
    },
    'Hindi Elective (Code 002)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sr_hine_1', name: 'अपठित बोध एवं अभिव्यक्ति व माध्यम', subtopics: ['अपठित गद्यांश व काव्यांश', 'रचनात्मक लेखन, नाटक, कहानी, रेडियो नाटक की संरचना'] },
        { id: 'sr_hine_2', name: 'अंतरा भाग-2 एवं अंतराल भाग-2', subtopics: ['काव्य खंड (जयशंकर प्रसाद, सूर्यकांत त्रिपाठी निराला, केदारनाथ सिंह)', 'गद्य खंड (रामचंद्र शुक्ल, हजारी प्रसाद द्विवेदी, निर्मल वर्मा)', 'अंतराल: सूरदास की झोंपड़ी, आरोहण, बिस्कोहर की माटी, अपना मालवा'] }
      ]
    },
    'English Core (Code 301)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        { id: 'sr_engc_1', name: 'Section A & B: Reading & Advanced Writing Skills', subtopics: ['Discursive & Case-based Comprehension Passages', 'Notice, Formal/Informal Invitations & Replies', 'Letter to Editor / Application for Job with Bio-data', 'Article Writing and Report Writing'] },
        { id: 'sr_engc_2', name: 'Section C: Literature (Flamingo & Vistas)', subtopics: ['Flamingo: The Last Lesson, Lost Spring, Deep Water, The Rattrap, Indigo, Poets and Pancakes', 'Flamingo Poems: My Mother at Sixty-Six, Keeping Quiet, A Thing of Beauty, A Roadside Stand', 'Vistas: The Third Level, The Tiger King, Journey to the End of the Earth, The Enemy, On the Face of It, Memories of Childhood'] }
      ]
    }
  }
};
