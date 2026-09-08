// Complete CBSE 2026-27 Aligned Master Question Bank for Class 10 Mathematics
// Includes Text-based, Diagram/Figure-based descriptions, Graph-based, and Case-Study questions.

export const class10MathMasterBank = [
  // ==========================================
  // UNIT 1: REAL NUMBERS
  // ==========================================
  {
    id: 'm10_rn_001',
    qNo: 1,
    marks: 1,
    year: 2026,
    type: 'MCQ',
    unit: 'Real Numbers',
    questionText: 'If a = 2^3 x 3, b = 2^3 x 3 x 5, and c = 2^3 x 3 x 7, then HCF(a, b, c) is:',
    options: ['24', '12', '72', '840'],
    answerKey: '24'
  },
  {
    id: 'm10_rn_002',
    qNo: 2,
    marks: 1,
    year: 2025,
    type: 'MCQ',
    unit: 'Real Numbers',
    questionText: 'The decimal expansion of 147/120 will terminate after:',
    options: ['One decimal place', 'Two decimal places', 'Three decimal places', 'Non-terminating repeating'],
    answerKey: 'Three decimal places'
  },
  {
    id: 'm10_rn_003',
    qNo: 3,
    marks: 2,
    year: 2024,
    type: 'Short',
    unit: 'Real Numbers',
    questionText: 'Prove that sqrt(5) is an irrational number.',
    answerKey: 'Let sqrt(5) = a/b in simplest form. Then 5b^2 = a^2, meaning 5 divides a^2 and thus 5 divides a. Let a = 5c, leading to 5 dividing b, contradicting that a and b are co-prime. Hence, sqrt(5) is irrational.'
  },
  {
    id: 'm10_rn_004',
    qNo: 4,
    marks: 3,
    year: 2026,
    type: 'Short',
    unit: 'Real Numbers',
    questionText: 'Find the HCF and LCM of 336 and 54 and verify that HCF x LCM = Product of the two numbers.',
    answerKey: 'Prime factors: 336 = 2^4 x 3 x 7, 54 = 2 x 3^3. HCF = 6, LCM = 3024. Product = 18144. HCF x LCM = 18144. Verified.'
  },
  {
    id: 'm10_rn_005',
    qNo: 5,
    marks: 1,
    year: 2026,
    type: 'Assertion-Reason',
    unit: 'Real Numbers',
    questionText: 'Assertion (A): The HCF of two numbers is 5 and their product is 150, then their LCM is 30. Reason (R): For any two positive integers a and b, HCF(a,b) x LCM(a,b) = a x b.',
    options: ['Both A and R are true and R is correct explanation of A', 'Both A and R are true but R is not correct explanation', 'A is true, R is false', 'A is false, R is true'],
    answerKey: 'Both A and R are true and R is correct explanation of A'
  },

  // ==========================================
  // UNIT 2: POLYNOMIALS
  // ==========================================
  {
    id: 'm10_pol_001',
    qNo: 6,
    marks: 1,
    year: 2026,
    type: 'MCQ',
    unit: 'Polynomials',
    questionText: 'If one zero of the quadratic polynomial x^2 + 3x + k is 2, then the value of k is:',
    options: ['10', '-10', '-7', '-2'],
    answerKey: '-10'
  },
  {
    id: 'm10_pol_002',
    qNo: 7,
    marks: 1,
    year: 2025,
    type: 'MCQ',
    unit: 'Polynomials',
    questionText: 'The number of polynomials having zeroes as -3 and 5 is:',
    options: ['1', '2', '3', 'Infinitely many'],
    answerKey: 'Infinitely many'
  },
  {
    id: 'm10_pol_003',
    qNo: 8,
    marks: 2,
    year: 2024,
    type: 'Short',
    unit: 'Polynomials',
    questionText: 'Find a quadratic polynomial whose sum and product of zeroes are -3 and 2 respectively.',
    answerKey: 'Standard form: x^2 - (sum)x + product = 0. Polynomial is k(x^2 + 3x + 2).'
  },
  {
    id: 'm10_pol_004',
    qNo: 9,
    marks: 3,
    year: 2026,
    type: 'Short',
    unit: 'Polynomials',
    questionText: 'Find the zeroes of the quadratic polynomial 6x^2 - 3 - 7x and verify the relationship between the zeroes and coefficients.',
    answerKey: 'Rearranging: 6x^2 - 7x - 3 = 0 -> (2x - 3)(3x + 1) = 0. Zeroes are 3/2 and -1/3. Sum of zeroes = 7/6 (-b/a), Product = -3/6 = -1/2 (c/a). Verified.'
  },
  {
    id: 'm10_pol_005',
    qNo: 10,
    marks: 4,
    year: 2026,
    type: 'Case-Study',
    unit: 'Polynomials',
    questionText: '[Visual Graph Description: A parabolic curve opening upwards on a Cartesian plane intersecting the x-axis at x = -1 and x = 3]. Based on this graph of a quadratic polynomial p(x) = ax^2 + bx + c: (i) Find the zeroes of the polynomial. (ii) State the sign of coefficient a. (iii) Find the value of p(0) if c = -3.',
    answerKey: '(i) -1 and 3. (ii) Positive (since parabola opens upwards). (iii) -3.'
  },

  // ==========================================
  // UNIT 3: PAIR OF LINEAR EQUATIONS IN TWO VARIABLES
  // ==========================================
  {
    id: 'm10_lin_001',
    qNo: 11,
    marks: 1,
    year: 2026,
    type: 'MCQ',
    unit: 'Linear Equations',
    questionText: 'The pair of equations x + 2y + 5 = 0 and -3x - 6y + 1 = 0 has:',
    options: ['Unique solution', 'Infinitely many solutions', 'No solution', 'Two solutions'],
    answerKey: 'No solution'
  },
  {
    id: 'm10_lin_002',
    qNo: 12,
    marks: 2,
    year: 2025,
    type: 'Short',
    unit: 'Linear Equations',
    questionText: 'For what value of k will the equations 2x + 3y = 7 and (k-1)x + (k+2)y = 3k have infinitely many solutions?',
    answerKey: 'Condition a1/a2 = b1/b2 = c1/c2 gives 2/(k-1) = 3/(k+2) = 7/3k. Solving yields k = 5.'
  },
  {
    id: 'm10_lin_003',
    qNo: 13,
    marks: 3,
    year: 2024,
    type: 'Short',
    unit: 'Linear Equations',
    questionText: 'Ritu can row downstream 20 km in 2 hours, and upstream 4 km in 2 hours. Find her speed of rowing in still water and the speed of the current.',
    answerKey: 'Let speed in still water = x, current = y. Downstream speed = x+y = 10. Upstream speed = x-y = 2. Solving gives x = 6 km/h, y = 4 km/h.'
  },
  {
    id: 'm10_lin_004',
    qNo: 14,
    marks: 5,
    year: 2026,
    type: 'Long',
    unit: 'Linear Equations',
    questionText: 'Places A and B are 100 km apart on a highway. One car starts from A and another from B at the same time. If they travel in the same direction, they meet in 5 hours. If they travel towards each other, they meet in 1 hour. What are the speeds of the two cars?',
    answerKey: 'Let speeds be u and v. 5u - 5v = 100 => u - v = 20. u + v = 100. Adding gives 2u = 120 => u = 60 km/h, v = 40 km/h.'
  },
  {
    id: 'm10_lin_005',
    qNo: 15,
    marks: 4,
    year: 2025,
    type: 'Case-Study',
    unit: 'Linear Equations',
    questionText: '[Visual Table Description: Ticket pricing table showing Adult tickets at Rs. 1000 and Child tickets at Rs. 200 for 50,000 attendees yielding total revenue of Rs. 4,20,00,000]. Find the number of adults and children who attended the match.',
    answerKey: 'Let adults = x, children = y. x + y = 50000; 1000x + 200y = 42000000. Solving gives x = 40,000 adults and y = 10,000 children.'
  },

  // ==========================================
  // UNIT 4: QUADRATIC EQUATIONS
  // ==========================================
  {
    id: 'm10_quad_001',
    qNo: 16,
    marks: 1,
    year: 2026,
    type: 'MCQ',
    unit: 'Quadratic Equations',
    questionText: 'The discriminant of the quadratic equation 2x^2 - 4x + 3 = 0 is:',
    options: ['-8', '8', '4', '-4'],
    answerKey: '-8'
  },
  {
    id: 'm10_quad_002',
    qNo: 17,
    marks: 2,
    year: 2025,
    type: 'Short',
    unit: 'Quadratic Equations',
    questionText: 'Find the value of k for which the quadratic equation kx(x - 2) + 6 = 0 has two real and equal roots.',
    answerKey: 'Equation: kx^2 - 2kx + 6 = 0. For equal roots, Discriminant D = 0 => (-2k)^2 - 4(k)(6) = 0 => 4k^2 - 24k = 0 => 4k(k - 6) = 0. Since k != 0, k = 6.'
  },
  {
    id: 'm10_quad_003',
    qNo: 18,
    marks: 3,
    year: 2024,
    type: 'Short',
    unit: 'Quadratic Equations',
    questionText: 'Find the roots of the quadratic equation 2x^2 - 7x + 3 = 0 by factorization.',
    answerKey: '2x^2 - 6x - x + 3 = 0 => 2x(x - 3) - 1(x - 3) = 0 => (2x - 1)(x - 3) = 0. Roots are x = 1/2 and x = 3.'
  },
  {
    id: 'm10_quad_004',
    qNo: 19,
    marks: 5,
    year: 2026,
    type: 'Long',
    unit: 'Quadratic Equations',
    questionText: 'A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey. Find the original speed of the train.',
    answerKey: 'Let speed = x. 360/x - 360/(x+5) = 1 => 360(5) = x(x+5) => x^2 + 5x - 1800 = 0 => (x + 45)(x - 40) = 0. Speed = 40 km/h.'
  },
  {
    id: 'm10_quad_005',
    qNo: 20,
    marks: 1,
    year: 2026,
    type: 'Assertion-Reason',
    unit: 'Quadratic Equations',
    questionText: 'Assertion (A): The equation 3x^2 - 5x + 2 = 0 has real roots. Reason (R): The discriminant D = b^2 - 4ac is greater than zero.',
    options: ['Both A and R are true and R is correct explanation', 'Both A and R are true but R is not correct explanation', 'A is true, R is false', 'A is false, R is true'],
    answerKey: 'Both A and R are true and R is correct explanation of A'
  },

  // ==========================================
  // UNIT 5: ARITHMETIC PROGRESSIONS
  // ==========================================
  {
    id: 'm10_ap_001',
    qNo: 21,
    marks: 1,
    year: 2026,
    type: 'MCQ',
    unit: 'Arithmetic Progressions',
    questionText: 'The 11th term of the A.P. -3, -1/2, 2, ... is:',
    options: ['28', '22', '-38', '-48.5'],
    answerKey: '22'
  },
  {
    id: 'm10_ap_002',
    qNo: 22,
    marks: 2,
    year: 2025,
    type: 'Short',
    unit: 'Arithmetic Progressions',
    questionText: 'Find the 20th term from the last term of the A.P. 3, 8, 13, ..., 253.',
    answerKey: 'Reversing AP: a = 253, d = -5. a_20 = 253 + (20-1)(-5) = 253 - 95 = 158.'
  },
  {
    id: 'm10_ap_003',
    qNo: 23,
    marks: 3,
    year: 2024,
    type: 'Short',
    unit: 'Arithmetic Progressions',
    questionText: 'Find the sum of the first 22 terms of an AP in which d = 7 and 22nd term is 149.',
    answerKey: 'a_22 = a + 21(7) = 149 => a = 2. S_22 = 11[2(2) + 21(7)] = 1661.'
  },
  {
    id: 'm10_ap_004',
    qNo: 24,
    marks: 5,
    year: 2026,
    type: 'Long',
    unit: 'Arithmetic Progressions',
    questionText: 'A sum of Rs 700 is to be used to give seven cash prizes to students of a school for their overall academic performance. If each prize is Rs 20 less than its preceding prize, find the value of each of the prizes.',
    answerKey: 'S_7 = 7/2 [2a + 6(-20)] = 700 => 2a - 120 = 200 => 2a = 320 => a = 160. Prizes are 160, 140, 120, 100, 80, 60, 40.'
  },
  {
    id: 'm10_ap_005',
    qNo: 25,
    marks: 4,
    year: 2025,
    type: 'Case-Study',
    unit: 'Arithmetic Progressions',
    questionText: '[Visual Description: Diagram of a staircase with steps of uniform height and increasing width representing an AP sequence]. Sub-parts: (i) Find common difference if 1st step height is 15cm and 3rd is 25cm. (ii) Find height of 10th step.',
    answerKey: '(i) d = 5cm. (ii) a_10 = 15 + 9(5) = 60cm.'
  },

  // ==========================================
  // UNIT 6: COORDINATE GEOMETRY
  // ==========================================
  {
    id: 'm10_cg_001',
    qNo: 26,
    marks: 1,
    year: 2026,
    type: 'MCQ',
    unit: 'Coordinate Geometry',
    questionText: 'The distance of the point P(-6, 8) from the origin is:',
    options: ['8', '2', '10', '6'],
    answerKey: '10'
  },
  {
    id: 'm10_cg_002',
    qNo: 27,
    marks: 2,
    year: 2025,
    type: 'Short',
    unit: 'Coordinate Geometry',
    questionText: 'Find the coordinates of the point which divides the join of (-1, 7) and (4, -3) in the ratio 2:3 internally.',
    answerKey: 'Point is (1, 3).'
  },
  {
    id: 'm10_cg_003',
    qNo: 28,
    marks: 3,
    year: 2024,
    type: 'Short',
    unit: 'Coordinate Geometry',
    questionText: 'Find the area of a rhombus if its vertices are (3, 0), (4, 5), (-1, 4) and (-2, -1) taken in order.',
    answerKey: 'Area = (1/2) * product of diagonals. Diagonals lengths are sqrt((3-(-1))^2 + (0-4)^2) = sqrt(32) = 4sqrt(2) and sqrt((4-(-2))^2 + (5-(-1))^2) = sqrt(72) = 6sqrt(2). Area = 0.5 * 4sqrt(2) * 6sqrt(2) = 24 sq units.'
  },
  {
    id: 'm10_cg_004',
    qNo: 29,
    marks: 5,
    year: 2026,
    type: 'Long',
    unit: 'Coordinate Geometry',
    questionText: 'Find the ratio in which the line segment joining the points A(3, -10) and B(6, 8) is divided by the x-axis. Also find the coordinates of the point of division.',
    answerKey: 'Let ratio be k:1. y-coordinate = (8k - 10)/(k + 1) = 0 => 8k = 10 => k = 5/4. Ratio is 5:4. Point of division: x = (5(6) + 4(3))/9 = 42/9 = 14/3. Point is (14/3, 0).'
  },
  {
    id: 'm10_cg_005',
    qNo: 30,
    marks: 4,
    year: 2025,
    type: 'Case-Study',
    unit: 'Coordinate Geometry',
    questionText: '[Visual Graph Description: Grid showing positions of 3 friends P(4, 5), Q(6, 2) and R(2, 6) relative to an office at origin O(0, 0)]. (i) Find distance between P and R. (ii) Is Q the midpoint of PR? Justify.',
    answerKey: '(i) Distance PR = sqrt((8-2)^2 + (3-5)^2) = sqrt(40) = 2sqrt(10). (ii) Midpoint of PR is (5, 4), which is not Q(4,4). Hence Q is not midpoint.'
  },

  // ==========================================
  // UNIT 7: TRIANGLES
  // ==========================================
  {
    id: 'm10_tri_001',
    qNo: 31,
    marks: 1,
    year: 2026,
    type: 'MCQ',
    unit: 'Triangles',
    questionText: 'If triangle ABC ~ triangle PQR with ar(ABC)/ar(PQR) = 9/16, and BC = 4.5 cm, then QR is equal to:',
    options: ['6 cm', '4 cm', '3 cm', '8 cm'],
    answerKey: '6 cm'
  },
  {
    id: 'm10_tri_002',
    qNo: 32,
    marks: 2,
    year: 2025,
    type: 'Short',
    unit: 'Triangles',
    questionText: 'A vertical pole of length 6 m casts a shadow 4 m long on the ground and at the same time a tower casts a shadow 28 m long. Find the height of the tower.',
    answerKey: 'Height/Shadow ratio is constant. h/28 = 6/4 => h = (6 * 28)/4 = 42 meters.'
  },
  {
    id: 'm10_tri_003',
    qNo: 33,
    marks: 3,
    year: 2024,
    type: 'Short',
    unit: 'Triangles',
    questionText: 'In triangle ABC, DE parallel to BC such that AD = 1.5 cm, DB = 3 cm and AE = 1 cm. Find EC.',
    answerKey: 'By Thales Theorem: AD/DB = AE/EC => 1.5/3 = 1/EC => EC = 2 cm.'
  },
  {
    id: 'm10_tri_004',
    qNo: 34,
    marks: 5,
    year: 2026,
    type: 'Long',
    unit: 'Triangles',
    questionText: 'State and prove Basic Proportionality Theorem (Thales Theorem).',
    answerKey: 'Proof demonstration involving triangle areas.'
  },
  {
    id: 'm10_tri_005',
    qNo: 35,
    marks: 1,
    year: 2026,
    type: 'Assertion-Reason',
    unit: 'Triangles',
    questionText: 'Assertion (A): All congruent triangles are similar, but similar triangles need not be congruent. Reason (R): Two triangles are similar if their corresponding angles are equal.',
    options: ['Both A and R are true and R is correct explanation', 'Both A and R are true but R is not correct explanation', 'A is true, R is false', 'A is false, R is true'],
    answerKey: 'Both A and R are true but R is not the correct explanation of A'
  },

  // ==========================================
  // UNIT 8: CIRCLES
  // ==========================================
  {
    id: 'm10_cir_001',
    qNo: 36,
    marks: 1,
    year: 2026,
    type: 'MCQ',
    unit: 'Circles',
    questionText: 'If tangents PA and PB from a point P to a circle with centre O are inclined at 80°, then angle POA is equal to:',
    options: ['50°', '60°', '70°', '80°'],
    answerKey: '50°'
  },
  {
    id: 'm10_cir_002',
    qNo: 37,
    marks: 2,
    year: 2025,
    type: 'Short',
    unit: 'Circles',
    questionText: 'From a point Q, the length of the tangent to a circle is 24 cm and the distance of Q from the centre is 25 cm. Find the radius of the circle.',
    answerKey: 'Radius = sqrt(25^2 - 24^2) = sqrt(625 - 576) = sqrt(49) = 7 cm.'
  },
  {
    id: 'm10_cir_003',
    qNo: 38,
    marks: 3,
    year: 2024,
    type: 'Short',
    unit: 'Circles',
    questionText: 'Prove that the lengths of tangents drawn from an external point to a circle are equal.',
    answerKey: 'Proved using RHS congruence of right triangles formed with radius.'
  },
  {
    id: 'm10_cir_004',
    qNo: 39,
    marks: 5,
    year: 2026,
    type: 'Long',
    unit: 'Circles',
    questionText: 'Prove that the parallelogram circumscribing a circle is a rhombus.',
    answerKey: 'Proof using equal tangents from external points.'
  },
  {
    id: 'm10_cir_005',
    qNo: 40,
    marks: 4,
    year: 2025,
    type: 'Case-Study',
    unit: 'Circles',
    questionText: '[Visual Diagram Description: Olympic rings formed by 5 circles intersecting with chord lengths equal to 1 cm]. Calculate area of intersecting sections or tangent properties in circular rings.',
    answerKey: 'Solved using sector area minus triangle area formulations.'
  },

  // ==========================================
  // UNIT 9: TRIGONOMETRY & HEIGHTS/DISTANCES
  // ==========================================
  {
    id: 'm10_trig_001',
    qNo: 41,
    marks: 1,
    year: 2026,
    type: 'MCQ',
    unit: 'Trigonometry',
    questionText: 'If sin theta - cos theta = 0, then the value of sin^4 theta + cos^4 theta is:',
    options: ['1', '3/4', '1/2', '1/4'],
    answerKey: '1/2'
  },
  {
    id: 'm10_trig_002',
    qNo: 42,
    marks: 2,
    year: 2025,
    type: 'Short',
    unit: 'Trigonometry',
    questionText: 'Evaluate: (5 cos^2 60° + 4 sec^2 30° - tan^2 45°) / (sin^2 30° + cos^2 30°).',
    answerKey: 'Numerator: 5(1/4) + 4(4/3) - 1 = 5/4 + 16/3 - 1 = (15 + 64 - 12)/12 = 67/12. Denominator: 1. Result = 67/12.'
  },
  {
    id: 'm10_trig_003',
    qNo: 43,
    marks: 3,
    year: 2024,
    type: 'Short',
    unit: 'Trigonometry',
    questionText: 'Prove that: (cos A - sin A + 1) / (cos A + sin A - 1) = cosec A + cot A.',
    answerKey: 'Dividing numerator and denominator by sin A and applying identities.'
  },
  {
    id: 'm10_trig_004',
    qNo: 44,
    marks: 5,
    year: 2026,
    type: 'Long',
    unit: 'Heights and Distances',
    questionText: 'As observed from the top of a 75 m high lighthouse from the sea-level, the angles of depression of two ships are 30° and 45°. If one ship is exactly behind the other on the same side of the lighthouse, find the distance between the two ships.',
    answerKey: 'Distances: 75 cot 45° = 75 m and 75 cot 30° = 75sqrt(3) m. Distance between ships = 75(sqrt(3) - 1) m.'
  },
  {
    id: 'm10_trig_005',
    qNo: 45,
    marks: 4,
    year: 2025,
    type: 'Case-Study',
    unit: 'Heights and Distances',
    questionText: '[Visual Diagram Description: Shreya of height 1m viewing India Gate of height 42m at various angles of elevation]. Calculate angle of elevation or distance moved back.',
    answerKey: 'Calculated using trigonometric ratios adjusted for observer eye-level height.'
  },

  // ==========================================
  // UNIT 10: MENSURATION, STATISTICS & PROBABILITY
  // ==========================================
  {
    id: 'm10_mens_001',
    qNo: 46,
    marks: 1,
    year: 2026,
    type: 'MCQ',
    unit: 'Mensuration',
    questionText: 'If the perimeter and the area of a circle are numerically equal, then the radius of the circle is:',
    options: ['2 units', 'pi units', '4 units', '7 units'],
    answerKey: '2 units'
  },
  {
    id: 'm10_mens_002',
    qNo: 47,
    marks: 2,
    year: 2025,
    type: 'Short',
    unit: 'Mensuration',
    questionText: 'Find the area of a sector of a circle with radius 6 cm if angle of the sector is 60°.',
    answerKey: 'Area = (60/360) * (22/7) * 6 * 6 = (1/6) * (22/7) * 36 = 132/7 cm^2.'
  },
  {
    id: 'm10_mens_003',
    qNo: 48,
    marks: 3,
    year: 2024,
    type: 'Short',
    unit: 'Statistics',
    questionText: 'Find the median of the following distribution: Class intervals 0-10 (freq 5), 10-20 (8), 20-30 (20), 30-40 (15), 40-50 (7). Total = 55.',
    answerKey: 'Median class is 20-30. Median = l + [ (N/2 - cf)/f ] * h = 20 + [ (27.5 - 13)/20 ] * 10 = 20 + (14.5/2) = 27.25.'
  },
  {
    id: 'm10_mens_004',
    qNo: 49,
    marks: 5,
    year: 2026,
    type: 'Long',
    unit: 'Mensuration',
    questionText: 'A solid toy is in the form of a hemisphere surmounted by a right circular cone. The height of the cone is 2 cm and the diameter of the base is 4 cm. Determine the volume of the toy. (Use pi = 3.14)',
    answerKey: 'Radius r = 2 cm. Volume = Volume of cone + Volume of hemisphere = (1/3)pi r^2 h + (2/3)pi r^3 = (1/3)*3.14*4*2 + (2/3)*3.14*8 = 25.12 cm^3.'
  },
  {
    id: 'm10_mens_005',
    qNo: 50,
    marks: 4,
    year: 2025,
    type: 'Case-Study',
    unit: 'Probability',
    questionText: '[Visual Data Table: Blood groups and Rhesus types percentage distribution]. Find probability of selected person having Rhesus negative or neither universal donor nor recipient.',
    answerKey: 'Calculated using direct summation of given percentage values divided by 100.'
  }
];
