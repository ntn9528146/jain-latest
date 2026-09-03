export const seniorSecondarySyllabus = {
  category: 'Senior Secondary (Class 11th & 12th)',
  classes: ['Class 11', 'Class 12'],
  subjects: {
    'Computer Science (Code 083)': {
      fixedTheoryMarks: 70,
      fixedPracticalMarks: 30,
      units: [
        {
          id: 'sr_cs_1',
          name: 'Unit I: Computational Thinking and Programming - 2',
          subtopics: [
            'Python Revision Tour (Tokens, Loops, Strings, Lists, Tuples, Dict)',
            'Functions: Scope, Arguments, Return Values',
            'Exception Handling (try, except, finally)',
            'File Handling: Text Files, Binary Files (pickle module), CSV Files (csv module)',
            'Data Structures: Linear Stack implementation using Python Lists'
          ]
        },
        {
          id: 'sr_cs_2',
          name: 'Unit II: Computer Networks',
          subtopics: [
            'Network Topologies, Types (LAN, MAN, WAN, PAN)',
            'Transmission Media (Twisted pair, Coaxial, Optical Fiber, Wireless)',
            'Network Devices (Modem, Hub, Switch, Gateway, Router)',
            'Protocols (TCP/IP, HTTP, FTP, DNS, SMTP, POP3)',
            'Network Security & Cyber Law Basics',
            'Case Study: 4-Block School/Corporate Network Layout Design'
          ]
        },
        {
          id: 'sr_cs_3',
          name: 'Unit III: Database Management (MySQL & Python-DB Connectivity)',
          subtopics: [
            'Database Concepts, Keys (Primary, Alternate, Candidate, Foreign)',
            'SQL Commands: DDL (CREATE, DROP, ALTER) & DML (SELECT, INSERT, UPDATE, DELETE)',
            'Aggregate Functions: COUNT, SUM, AVG, MIN, MAX with GROUP BY & HAVING',
            'Joins: Equi-join and Natural Join between two tables',
            'Python-MySQL Connectivity: mysql.connector, cursor(), execute(), fetchall()'
          ]
        }
      ]
    },
    'Physics (Code 042)': {
      fixedTheoryMarks: 70,
      fixedPracticalMarks: 30,
      units: [
        {
          id: 'sr_phy_1',
          name: 'Unit I & II: Electrostatics & Current Electricity',
          subtopics: ['Coulomb’s Law & Electric Dipole', 'Gauss’s Theorem & Applications', 'Capacitors and Dielectrics', 'Kirchhoff’s Rules & Wheatstone Bridge']
        },
        {
          id: 'sr_phy_2',
          name: 'Unit III & IV: Magnetic Effects, EMI & AC',
          subtopics: ['Biot-Savart Law & Ampere’s Law', 'Faraday’s Laws of Induction & Lenz’s Law', 'LCR Series Alternating Circuit & Transformers']
        },
        {
          id: 'sr_phy_3',
          name: 'Unit VI & IX: Optics & Semiconductor Electronics',
          subtopics: ['Ray Optics (Lenses, Prisms, Microscopes, Telescopes)', 'Wave Optics (Interference, Diffraction)', 'p-n Junction Diode, Rectifiers & Band Theory']
        }
      ]
    },
    'Mathematics (Code 041)': {
      fixedTheoryMarks: 80,
      fixedPracticalMarks: 20,
      units: [
        {
          id: 'sr_math_1',
          name: 'Unit I & II: Relations, Functions & Algebra',
          subtopics: ['Types of Relations & Equivalence', 'Inverse Trigonometric Functions', 'Matrices Operations & Determinants Inverse']
        },
        {
          id: 'sr_math_2',
          name: 'Unit III: Calculus',
          subtopics: ['Continuity and Differentiability', 'Applications of Derivatives (Rate of Change, Maxima/Minima)', 'Integrals (Definite & Indefinite)', 'Differential Equations (Order, Degree & Solutions)']
        },
        {
          id: 'sr_math_3',
          name: 'Unit IV & V: Vectors, 3D Geometry & Probability',
          subtopics: ['Dot & Cross Product of Vectors', 'Direction Cosines & Shortest Distance between Lines', 'Conditional Probability & Bayes’ Theorem']
        }
      ]
    }
  }
};
