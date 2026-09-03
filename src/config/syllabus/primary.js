export const primarySyllabus = {
  category: 'Primary Level (Class 1 to 5)',
  defaultTheoryMarks: 80,
  defaultInternalMarks: 20,
  classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
  subjects: {
    'English Language & Literature': {
      units: [
        {
          id: 'pri_eng_1',
          name: 'Reading Comprehension & Prose',
          subtopics: ['Unseen story comprehension', 'Poem recitation & central message', 'Vocabulary, Antonyms and Synonyms']
        },
        {
          id: 'pri_eng_2',
          name: 'Applied Grammar & Creative Writing',
          subtopics: ['Nouns, Pronouns, Adjectives, Verbs', 'Tenses (Present, Past, Future)', 'Paragraph writing, Leave Application, Picture composition']
        }
      ]
    },
    'Hindi (हिंदी साहित्य व व्याकरण)': {
      units: [
        {
          id: 'pri_hin_1',
          name: 'अपठित बोध एवं पाठ्यपुस्तक',
          subtopics: ['अपठित गद्यांश व पद्यांश', 'साहित्यिक कहानियाँ व कविताएँ', 'कठिन शब्दार्थ एवं वाक्य प्रयोग']
        },
        {
          id: 'pri_hin_2',
          name: 'व्यावहारिक व्याकरण एवं रचनात्मक लेखन',
          subtopics: ['मात्रा ज्ञान, संज्ञा, सर्वनाम, विशेषण, क्रिया', 'लिंग, वचन, विलोम, पर्यायवाची शब्द', 'अनुच्छेद लेखन, प्रार्थना पत्र व संवाद']
        }
      ]
    },
    'Mathematics': {
      units: [
        {
          id: 'pri_math_1',
          name: 'Number System & Basic Operations',
          subtopics: ['Numbers up to 5-digits, Place/Face Value', 'Addition & Subtraction with carrying', 'Multiplication Tables & Long Division']
        },
        {
          id: 'pri_math_2',
          name: 'Fractions, Decimals & Measurement',
          subtopics: ['Introduction to Fractions & Decimals', 'Units of Length, Weight and Capacity', 'Indian Currency & Money Word Problems']
        },
        {
          id: 'pri_math_3',
          name: 'Geometry, Time & Data Handling',
          subtopics: ['Perimeter and Area of 2D shapes', 'Clock Reading, Elapsed Time & Calendar', 'Pictographs and Simple Bar Graphs']
        }
      ]
    },
    'Environmental Studies (EVS) / General Science': {
      units: [
        {
          id: 'pri_evs_1',
          name: 'Living Organisms & Human Body',
          subtopics: ['Parts of a Plant & Photosynthesis basics', 'Animal Classification, Habitats & Food Chain', 'Human Organ Systems (Digestive, Respiratory)']
        },
        {
          id: 'pri_evs_2',
          name: 'Our Surroundings, Matter & Resources',
          subtopics: ['Water Cycle & Water Conservation', 'Light, Shadow, Force and Energy basics', 'Community Helpers, Local Governance & Safety Rules']
        }
      ]
    },
    'Social Science (Classes 3-5)': {
      units: [
        {
          id: 'pri_sst_1',
          name: 'Our Country India & Heritage',
          subtopics: ['Physical Divisions of India (Mountains, Plains, Deserts)', 'National Symbols, Festivals and Heritage', 'Fundamental Rights, Duties and Local Panchayat']
        }
      ]
    },
    'Computer Science & IT Fundamentals': {
      units: [
        {
          id: 'pri_cs_1',
          name: 'Computer Hardware & Creative Tools',
          subtopics: ['Input, Output and Storage Devices', 'Operating System Basics & Desktop Navigation', 'Drawing in Paint, Typing & Word Processing in MS Word']
        }
      ]
    },
    'Third Language (Sanskrit / French / Regional)': {
      units: [
        {
          id: 'pri_l3_1',
          name: 'Basic Vocabulary & Alphabet',
          subtopics: ['Alphabet and Phonetics', 'Greetings, Numbers 1 to 20, Family terms', 'Simple sentence framing']
        }
      ]
    }
  }
};
