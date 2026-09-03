export const kindergartenSyllabus = {
  category: 'Foundational Stage (Nursery, LKG, UKG)',
  defaultTheoryMarks: 50,
  defaultInternalMarks: 50,
  classes: ['Nursery', 'LKG', 'UKG'],
  subjects: {
    'Literacy & English Language': {
      units: [
        {
          id: 'kg_eng_1',
          name: 'Pre-Writing Strokes & Phonics',
          subtopics: ['Standing, Sleeping & Slanting lines', 'Curves & Pattern drawing', 'Phonics Sounds & Letter Identification A-Z']
        },
        {
          id: 'kg_eng_2',
          name: 'Vocabulary Building & Sight Words',
          subtopics: ['Two-letter sight words (am, in, on)', 'Three-letter CVC rhyming words', 'Picture naming and storytelling']
        }
      ]
    },
    'Hindi (आरंभिक भाषा ज्ञान)': {
      units: [
        {
          id: 'kg_hin_1',
          name: 'स्वर एवं व्यंजन पहचान',
          subtopics: ['स्वर वर्ण पहचान (अ से अः)', 'व्यंजन वर्ण ट्रेसिंग (क से ज्ञ)', 'चित्र देखकर सही अक्षर मिलान व बालगीत']
        }
      ]
    },
    'Early Numeracy & Mathematics': {
      units: [
        {
          id: 'kg_math_1',
          name: 'Numbers 1 to 50 & Counting',
          subtopics: ['Tracing and writing 1-50', 'Count and circle/match', 'Concept of Zero and what comes after']
        },
        {
          id: 'kg_math_2',
          name: 'Pre-Math Concepts & Shapes',
          subtopics: ['Big vs Small, Tall vs Short', 'Heavy vs Light, More vs Less', 'Basic Shapes: Circle, Square, Triangle, Rectangle']
        }
      ]
    },
    'Environmental Studies & GK': {
      units: [
        {
          id: 'kg_evs_1',
          name: 'Myself, Family & World Around Us',
          subtopics: ['Parts of human body & cleanliness', 'Family members and home', 'Community helpers (Doctor, Teacher, Police)']
        },
        {
          id: 'kg_evs_2',
          name: 'Nature, Animals & Seasons',
          subtopics: ['Domestic and wild animals', 'Common fruits and vegetables', 'Seasons, Days of the week and Good manners']
        }
      ]
    },
    'Creative Arts & Motor Skills': {
      units: [
        {
          id: 'kg_art_1',
          name: 'Visual Art, Craft & Coordination',
          subtopics: ['Primary color recognition', 'Paper tearing, folding & pasting', 'Clay modeling, finger painting & fine motor coordination']
        }
      ]
    }
  }
};
