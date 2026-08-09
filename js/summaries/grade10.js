/* StudyPilot NCERT Chapter Summaries - Grade 10 */
(function () {
  window.NCERT_ALL_SUMMARIES = window.NCERT_ALL_SUMMARIES || {};
  window.NCERT_ALL_SUMMARIES["10"] = {
    "Mathematics": [
      {
        num: 1,
        title: "Real Numbers",
        concept: "Fundamental Theorem of Arithmetic, prime factorisation to find HCF/LCM, and proving irrationality of $\\sqrt{2}, \\sqrt{3}, \\sqrt{5}$.",
        points: [
          "Fundamental Theorem of Arithmetic: Every composite number can be expressed (factorised) uniquely as a product of primes, apart from the order of factors.",
          "Golden Formula: For any two positive integers $a$ and $b$, $\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b$.",
          "Theorem: If prime $p$ divides $a^2$, then $p$ divides $a$ (where $a$ is a positive integer).",
          "Proof of Irrationality by Contradiction: Assuming $\\sqrt{2} = p/q$ in simplest co-prime form leads to $2$ dividing both $p$ and $q$, contradicting that $p$ and $q$ are co-prime; therefore $\\sqrt{2}$ is irrational.",
          "Decimal expansion of rational number $p/q$ terminates if and only if the prime factorisation of $q$ is of the form $2^n 5^m$ ($n, m \\in \\mathbb{W}$)."
        ],
        formula: "\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b, \\quad q = 2^n 5^m \\implies \\text{Terminating Decimal}",
        sample_question: "Given that $\\text{HCF}(306, 657) = 9$, find $\\text{LCM}(306, 657)$.",
        sample_answer: "$\\text{LCM} = \\frac{a \\times b}{\\text{HCF}} = \\frac{306 \\times 657}{9} = 34 \\times 657 = 22,338$.",
        memory_hook: "HCF $\\times$ LCM = Product of two numbers; $2^n 5^m$ denominator terminates!"
      },
      {
        num: 2,
        title: "Polynomials",
        concept: "Geometric meaning of zeros of a polynomial, relationships between zeros and coefficients for quadratic and cubic polynomials.",
        points: [
          "Geometric meaning: The zeros of a polynomial $P(x)$ are the exact x-coordinates of the points where the graph $y = P(x)$ intersects the X-axis.",
          "Quadratic polynomial $P(x) = ax^2 + bx + c$ ($a \\neq 0$) has at most 2 zeros ($\\alpha, \\beta$), forming a parabolic curve.",
          "Relationships between Zeros and Coefficients for $ax^2 + bx + c$: 1) Sum of Zeros: $\\alpha + \\beta = -\\frac{b}{a} = -\\frac{\\text{coeff of } x}{\\text{coeff of } x^2}$; 2) Product of Zeros: $\\alpha\\beta = \\frac{c}{a} = \\frac{\\text{constant term}}{\\text{coeff of } x^2}$.",
          "Forming a Quadratic Polynomial: $P(x) = k[x^2 - (\\alpha + \\beta)x + \\alpha\\beta]$.",
          "Cubic polynomial $ax^3 + bx^2 + cx + d$ has $\\alpha+\\beta+\\gamma = -b/a$, $\\alpha\\beta+\\beta\\gamma+\\gamma\\alpha = c/a$, $\\alpha\\beta\\gamma = -d/a$."
        ],
        formula: "\\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}, \\quad P(x) = k[x^2 - (\\alpha+\\beta)x + \\alpha\\beta]",
        sample_question: "Find the zeros of $x^2 + 7x + 10$ and verify the relationship between zeros and coefficients.",
        sample_answer: "$x^2 + 7x + 10 = (x+2)(x+5) = 0 \\implies \\alpha = -2, \\beta = -5$. Sum: $\\alpha+\\beta = -2+(-5) = -7 = -\\frac{b}{a} = -\\frac{7}{1}$. Product: $\\alpha\\beta = (-2)(-5) = 10 = \\frac{c}{a} = \\frac{10}{1}$ ✓.",
        memory_hook: "Sum is $-b/a$; Product is $c/a$; Parabola touches X-axis at zeros."
      },
      {
        num: 3,
        title: "Pair of Linear Equations in Two Variables",
        concept: "System of linear equations ($a_1 x + b_1 y + c_1 = 0$), algebraic methods (Substitution, Elimination), and consistency conditions.",
        points: [
          "Conditions for consistency of two lines $a_1x + b_1y + c_1 = 0$ and $a_2x + b_2y + c_2 = 0$:",
          "1. Intersecting Lines: $\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2} \\implies$ Unique single solution (Consistent).",
          "2. Coincident Lines: $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2} \\implies$ Infinitely many solutions (Consistent & Dependent).",
          "3. Parallel Lines: $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2} \\implies$ Zero solutions (Inconsistent).",
          "Substitution Method: Express one variable in terms of the other from equation 1 and substitute into equation 2.",
          "Elimination Method: Multiply equations by suitable coefficients to eliminate one variable by addition or subtraction."
        ],
        formula: "\\text{Unique: } \\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}, \\quad \\text{No Solution: } \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}, \\quad \\text{Infinite: } \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}",
        sample_question: "Solve the system of equations by elimination: $2x + 3y = 11$ and $2x - 4y = -24$.",
        sample_answer: "Subtract equation 2 from equation 1: $(2x+3y) - (2x-4y) = 11 - (-24) \\implies 7y = 35 \\implies y = 5$. Substitute $y=5$ into eq 1: $2x + 3(5) = 11 \\implies 2x = 11 - 15 = -4 \\implies x = -2$. Solution: $(-2, 5)$.",
        memory_hook: "Unequal ratios $\\implies$ 1 point cross; Equal all $\\implies$ Same line; Parallel $\\implies$ Never meet!"
      },
      {
        num: 4,
        title: "Quadratic Equations",
        concept: "Standard form $ax^2 + bx + c = 0$, factorisation method, Quadratic Formula (Shreedharacharya Rule), and Discriminant roots nature.",
        points: [
          "A quadratic equation in variable $x$ has the standard form $ax^2 + bx + c = 0$ ($a, b, c \\in \\mathbb{R}, a \\neq 0$).",
          "Roots of the equation are the values of $x$ that satisfy $ax^2 + bx + c = 0$.",
          "Quadratic Formula (Shreedharacharya's Rule): $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.",
          "Discriminant: $D = b^2 - 4ac$ determines the nature of roots:",
          "1) If $D > 0$: Two distinct real roots ($x = \\frac{-b \\pm \\sqrt{D}}{2a}$).",
          "2) If $D = 0$: Two equal real roots ($x = -\\frac{b}{2a}, -\\frac{b}{2a}$).",
          "3) If $D < 0$: No real roots (roots are complex/imaginary)."
        ],
        formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad D = b^2 - 4ac",
        sample_question: "Find the discriminant and nature of roots for $2x^2 - 4x + 3 = 0$.",
        sample_answer: "$a = 2, b = -4, c = 3$. $D = b^2 - 4ac = (-4)^2 - 4(2)(3) = 16 - 24 = -8$. Since $D < 0$, the equation has no real roots.",
        memory_hook: "$D > 0$ Two roots; $D = 0$ Twin roots; $D < 0$ Zero real roots."
      },
      {
        num: 5,
        title: "Arithmetic Progressions",
        concept: "Definition of AP, common difference $d$, $n^{\\text{th}}$ general term formula, and sum of first $n$ terms ($S_n$).",
        points: [
          "An Arithmetic Progression is a sequence in which each term is obtained by adding a fixed constant common difference ($d$) to the preceding term ($a, a+d, a+2d, \\dots$).",
          "Common Difference: $d = a_{k+1} - a_k$ (can be positive, negative, or zero).",
          "$n^{\\text{th}}$ General Term Formula: $a_n = a + (n - 1)d$, where $a$ is the first term and $n$ is the number of terms.",
          "$n^{\\text{th}}$ term from the end of an AP with last term $l$: $a_n' = l - (n - 1)d$.",
          "Sum of First $n$ Terms ($S_n$): $S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l)$ where $l = a_n$ is the last term.",
          "Arithmetic Mean between $a$ and $b$: $AM = \\frac{a + b}{2}$."
        ],
        formula: "a_n = a + (n - 1)d, \\quad S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l), \\quad \\sum_{i=1}^n i = \\frac{n(n+1)}{2}",
        sample_question: "Find the 20th term and sum of the first 20 terms of the AP: $3, 8, 13, 18\\dots$",
        sample_answer: "$a = 3, d = 8 - 3 = 5, n = 20$. $a_{20} = 3 + (20 - 1)5 = 3 + 95 = 98$. $S_{20} = \\frac{20}{2}(3 + 98) = 10 \\times 101 = 1,010$.",
        memory_hook: "$a_n = a + (n-1)d$; Sum is average of first and last times $n$!"
      },
      {
        num: 6,
        title: "Triangles",
        concept: "Similarity of geometric figures, Basic Proportionality Theorem (Thales's Theorem), and similarity criteria (AAA, SAS, SSS).",
        points: [
          "Two polygons of the same number of sides are similar if: 1) Corresponding angles are equal, and 2) Corresponding sides are in the same ratio (proportional).",
          "Basic Proportionality Theorem (BPT / Thales's Theorem): If a line is drawn parallel to one side of a triangle intersecting the other two sides, it divides the two sides in the same ratio ($\\frac{AD}{DB} = \\frac{AE}{EC}$).",
          "Converse of BPT: If a line divides any two sides of a triangle in the same ratio, it is parallel to the third side.",
          "Similarity Criteria for Triangles: 1) AAA (or AA) Similarity, 2) SSS Similarity (proportional sides), 3) SAS Similarity (one angle equal, adjacent sides proportional).",
          "If two triangles are similar, the ratio of their perimeters equals the ratio of their corresponding sides."
        ],
        formula: "\\text{BPT: } DE \\parallel BC \\iff \\frac{AD}{DB} = \\frac{AE}{EC}, \\quad \\Delta ABC \\sim \\Delta DEF \\implies \\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{AC}{DF}",
        sample_question: "In $\\Delta ABC$, $DE \\parallel BC$. If $AD = 1.5\\text{ cm}, DB = 3\\text{ cm}, AE = 1\\text{ cm}$, find $EC$.",
        sample_answer: "By BPT: $\\frac{AD}{DB} = \\frac{AE}{EC} \\implies \\frac{1.5}{3} = \\frac{1}{EC} \\implies \\frac{1}{2} = \\frac{1}{EC} \\implies EC = 2\\text{ cm}$.",
        memory_hook: "Parallel line cuts sides in equal ratio (BPT); AA similarity proves triangles similar fast!"
      },
      {
        num: 7,
        title: "Coordinate Geometry",
        concept: "Cartesian distance formula, Section formula for internal division, midpoint formula, and collinearity tests.",
        points: [
          "Distance Formula: Distance between two points $P(x_1, y_1)$ and $Q(x_2, y_2)$ is $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$. Distance from origin $O(0, 0)$ is $\\sqrt{x^2 + y^2}$.",
          "Section Formula (Internal Division): Coordinates of point $P(x, y)$ dividing line segment joining $A(x_1, y_1)$ and $B(x_2, y_2)$ internally in ratio $m_1 : m_2$ are: $P\\left(\\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}\\right)$.",
          "Midpoint Formula (when ratio is $1:1$): $M\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$.",
          "Centroid of a Triangle with vertices $(x_1, y_1), (x_2, y_2), (x_3, y_3)$: $G\\left(\\frac{x_1 + x_2 + x_3}{3}, \\frac{y_1 + y_2 + y_3}{3}\\right)$."
        ],
        formula: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}, \\quad P(x, y) = \\left(\\frac{m_1 x_2 + m_2 x_1}{m_1+m_2}, \\frac{m_1 y_2 + m_2 y_1}{m_1+m_2}\\right)",
        sample_question: "Find the coordinates of the point which divides the join of $(-1, 7)$ and $(4, -3)$ in the ratio $2:3$.",
        sample_answer: "$x = \\frac{2(4) + 3(-1)}{2+3} = \\frac{8 - 3}{5} = \\frac{5}{5} = 1$. $y = \\frac{2(-3) + 3(7)}{2+3} = \\frac{-6 + 21}{5} = \\frac{15}{5} = 3$. Point is $(1, 3)$.",
        memory_hook: "Section formula: Cross-multiply ratios ($m_1$ with point 2, $m_2$ with point 1)."
      },
      {
        num: 8,
        title: "Introduction to Trigonometry",
        concept: "Six trigonometric ratios, standard angle values ($0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$), and fundamental Pythagorean identities.",
        points: [
          "Trigonometric Ratios in right-angled $\\Delta ABC$ (angle $\\theta$): $\\sin\\theta = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}$, $\\cos\\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}$, $\\tan\\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{\\sin\\theta}{\\cos\\theta}$.",
          "Reciprocal Ratios: $\\text{cosec}\\theta = \\frac{1}{\\sin\\theta}$, $\\sec\\theta = \\frac{1}{\\cos\\theta}$, $\\cot\\theta = \\frac{1}{\\tan\\theta} = \\frac{\\cos\\theta}{\\sin\\theta}$.",
          "Standard Values Table: $\\sin 0^\\circ=0, \\sin 30^\\circ=\\frac{1}{2}, \\sin 45^\\circ=\\frac{1}{\\sqrt{2}}, \\sin 60^\\circ=\\frac{\\sqrt{3}}{2}, \\sin 90^\\circ=1$; $\\cos\\theta$ runs in reverse; $\\tan 45^\\circ=1, \\tan 30^\\circ=\\frac{1}{\\sqrt{3}}, \\tan 60^\\circ=\\sqrt{3}$.",
          "Fundamental Pythagorean Identities: 1) $\\sin^2\\theta + \\cos^2\\theta = 1$, 2) $1 + \\tan^2\\theta = \\sec^2\\theta$, 3) $1 + \\cot^2\\theta = \\text{cosec}^2\\theta$."
        ],
        formula: "\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta, \\quad 1 + \\cot^2\\theta = \\text{cosec}^2\\theta",
        sample_question: "Prove that $\\frac{\\sin\\theta}{1 + \\cos\\theta} + \\frac{1 + \\cos\\theta}{\\sin\\theta} = 2\\text{cosec}\\theta$.",
        sample_answer: "$\\text{LHS} = \\frac{\\sin^2\\theta + (1+\\cos\\theta)^2}{\\sin\\theta(1+\\cos\\theta)} = \\frac{\\sin^2\\theta + 1 + 2\\cos\\theta + \\cos^2\\theta}{\\sin\\theta(1+\\cos\\theta)} = \\frac{(\\sin^2\\theta+\\cos^2\\theta) + 1 + 2\\cos\\theta}{\\sin\\theta(1+\\cos\\theta)} = \\frac{2 + 2\\cos\\theta}{\\sin\\theta(1+\\cos\\theta)} = \\frac{2(1+\\cos\\theta)}{\\sin\\theta(1+\\cos\\theta)} = \\frac{2}{\\sin\\theta} = 2\\text{cosec}\\theta = \\text{RHS}$.",
        memory_hook: "SOH-CAH-TOA: Sin Opp/Hyp, Cos Adj/Hyp, Tan Opp/Adj; $\\sin^2+\\cos^2=1$."
      },
      {
        num: 9,
        title: "Some Applications of Trigonometry",
        concept: "Line of sight, angle of elevation, angle of depression, and solving heights and distances problems.",
        points: [
          "Line of sight is the straight line drawn from the observer's eye to the object viewed.",
          "Angle of Elevation: Angle formed by the line of sight with the horizontal when viewing an object above horizontal level.",
          "Angle of Depression: Angle formed by the line of sight with the horizontal when viewing an object below horizontal level (Angle of Depression $=$ Angle of Elevation from object by alternate interior angles).",
          "Step 1: Draw a neat labeled geometric right triangle diagram.",
          "Step 2: Identify known and unknown sides, choose appropriate ratio (usually $\\tan\\theta = \\frac{\\text{Height}}{\\text{Base}}$), and solve algebraically."
        ],
        formula: "\\tan\\theta = \\frac{\\text{Height}}{\\text{Distance / Base}}, \\quad \\text{Angle of Elevation} = \\text{Angle of Depression}",
        sample_question: "A tower stands vertically on the ground. From a point $15\\text{ m}$ away from its foot, the angle of elevation of its top is $60^\\circ$. Find the height of the tower.",
        sample_answer: "Let height be $h$. In right triangle: $\\tan 60^\\circ = \\frac{h}{15} \\implies \\sqrt{3} = \\frac{h}{15} \\implies h = 15\\sqrt{3}\\text{ m} \\approx 25.98\\text{ metres}$.",
        memory_hook: "Looking up = Elevation; Looking down = Depression; $\\tan\\theta$ connects Height to Base."
      },
      {
        num: 10,
        title: "Circles",
        concept: "Tangents to a circle, radius perpendicularity at contact point, and equal lengths of external tangents.",
        points: [
          "A Tangent to a circle touches the circle at exactly one point (Point of Contact); A Secant intersects the circle in two distinct points.",
          "There is no tangent from an inside point; Exactly 1 tangent at a point on the circle; Exactly 2 tangents from an external point.",
          "Theorem 1: The tangent at any point of a circle is perpendicular to the radius through the point of contact ($OP \\perp PT$).",
          "Theorem 2: The lengths of tangents drawn from an external point to a circle are equal ($PA = PB$).",
          "The centre of the circle lies on the angle bisector of the angle between two external tangents ($OP$ bisects $\\angle APB$)."
        ],
        formula: "OP \\perp PT, \\quad PA = PB \\text{ (Tangents from external point $P$)}",
        sample_question: "Prove that the lengths of tangents drawn from an external point to a circle are equal.",
        sample_answer: "Let tangents from external point $P$ touch circle (centre $O$) at $A$ and $B$. In right triangles $\\Delta OAP$ and $\\Delta OBP$: $OA = OB$ (radii), $OP = OP$ (common hypotenuse), $\\angle OAP = \\angle OBP = 90^\\circ$ (radius $\\perp$ tangent). By RHS congruence, $\\Delta OAP \\cong \\Delta OBP$. By CPCTC, $PA = PB$.",
        memory_hook: "Radius meets Tangent at $90^\\circ$; Tangents from external point are identical twins ($PA=PB$)."
      },
      {
        num: 11,
        title: "Areas Related to Circles",
        concept: "Circumference, sector area of angle $\\theta$, arc length, and major/minor segment areas.",
        points: [
          "Circle Perimeter (Circumference) $= 2\\pi r = \\pi d$; Circle Area $= \\pi r^2$.",
          "Length of an arc of a sector with central angle $\\theta$: $L = \\frac{\\theta}{360^\\circ} \\times 2\\pi r$.",
          "Area of a Sector with central angle $\\theta$: $\\text{Area} = \\frac{\\theta}{360^\\circ} \\times \\pi r^2 = \\frac{1}{2} L r$.",
          "Area of Minor Segment $= \\text{Area of Sector } OAPB - \\text{Area of } \\Delta OAB = \\frac{\\theta}{360^\\circ}\\pi r^2 - \\frac{1}{2}r^2\\sin\\theta$.",
          "Area of Major Sector $= \\pi r^2 - \\text{Area of Minor Sector}$; Area of Major Segment $= \\pi r^2 - \\text{Area of Minor Segment}$."
        ],
        formula: "A_{\\text{sector}} = \\frac{\\theta}{360^\\circ} \\pi r^2, \\quad L_{\\text{arc}} = \\frac{\\theta}{360^\\circ} 2\\pi r, \\quad A_{\\text{segment}} = \\frac{\\theta}{360^\\circ}\\pi r^2 - \\frac{1}{2}r^2\\sin\\theta",
        sample_question: "Find the area of a sector of a circle of radius $6\\text{ cm}$ if the angle of the sector is $60^\\circ$ (use $\\pi = 22/7$).",
        sample_answer: "$\\text{Area} = \\frac{60^\\circ}{360^\\circ} \\times \\frac{22}{7} \\times 6^2 = \\frac{1}{6} \\times \\frac{22}{7} \\times 36 = \\frac{22 \\times 6}{7} = \\frac{132}{7} = 18.86\\text{ cm}^2$.",
        memory_hook: "Sector is a pizza slice ($\\frac{\\theta}{360}\\pi r^2$); Segment is slice minus triangle!"
      },
      {
        num: 12,
        title: "Surface Areas and Volumes",
        concept: "Surface areas and volumes of combinations of solids (cuboids, cones, cylinders, hemispheres, spheres) and shape conversions.",
        points: [
          "Combination of Solids: Total Surface Area is the sum of exposed surfaces (NOT the sum of individual TSAs!). E.g., Toy = Cone atop Hemisphere: $\\text{TSA} = \\text{CSA}_{\\text{cone}} + \\text{CSA}_{\\text{hemisphere}} = \\pi rl + 2\\pi r^2$.",
          "Total Volume of Combination equals the direct sum of individual component volumes ($V = V_{\\text{cone}} + V_{\\text{hemisphere}} = \\frac{1}{3}\\pi r^2 h + \\frac{2}{3}\\pi r^3$).",
          "Solid Conversion: When a solid of one shape is melted and recast into another shape, the Volume remains strictly conserved ($V_{\\text{initial}} = V_{\\text{final}}$).",
          "Formulas: Cylinder ($2\\pi rh, \\pi r^2 h$), Cone ($\\pi rl, \\frac{1}{3}\\pi r^2 h$), Sphere ($4\\pi r^2, \\frac{4}{3}\\pi r^3$), Hemisphere ($2\\pi r^2, 3\\pi r^2, \\frac{2}{3}\\pi r^3$)."
        ],
        formula: "\\text{TSA}_{\\text{toy}} = \\pi rl + 2\\pi r^2, \\quad V_{\\text{melted}} = V_{\\text{recast}}",
        sample_question: "A metallic sphere of radius $4.2\\text{ cm}$ is melted and recast into the shape of a cylinder of radius $6\\text{ cm}$. Find the height of the cylinder.",
        sample_answer: "Volume of sphere $=$ Volume of cylinder: $\\frac{4}{3}\\pi r_1^3 = \\pi r_2^2 h \\implies \\frac{4}{3}(4.2)^3 = 6^2 \\times h \\implies \\frac{4}{3}(74.088) = 36h \\implies 98.784 = 36h \\implies h = 2.744\\text{ cm}$.",
        memory_hook: "Melting preserves Volume; Exposed outer surface makes Surface Area."
      },
      {
        num: 13,
        title: "Statistics",
        concept: "Mean of grouped data (Direct, Assumed Mean methods), Mode of grouped data, Median of grouped data, and empirical relationship.",
        points: [
          "Mean of Grouped Data: 1) Direct Method: $\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}$; 2) Assumed Mean Method: $\\bar{x} = a + \\frac{\\sum f_i d_i}{\\sum f_i}$ (where $d_i = x_i - a$ and $x_i = \\frac{\\text{Upper}+\\text{Lower}}{2}$).",
          "Mode of Grouped Data: Modal class has highest frequency $f_1$. $\\text{Mode} = l + \\left(\\frac{f_1 - f_0}{2f_1 - f_0 - f_2}\\right) \\times h$ ($l$ = lower limit, $f_0$ = preceding frequency, $f_2$ = succeeding frequency, $h$ = class size).",
          "Median of Grouped Data: Median class is the class whose cumulative frequency ($cf$) is just greater than $n/2$. $\\text{Median} = l + \\left(\\frac{\\frac{n}{2} - cf}{f}\\right) \\times h$.",
          "Empirical Relationship: $3\\text{ Median} = \\text{Mode} + 2\\text{ Mean}$."
        ],
        formula: "\\text{Mode} = l + \\left(\\frac{f_1-f_0}{2f_1-f_0-f_2}\\right)h, \\quad \\text{Median} = l + \\left(\\frac{\\frac{n}{2}-cf}{f}\\right)h, \\quad 3\\text{ Median} = \\text{Mode} + 2\\text{ Mean}",
        sample_question: "In a statistical frequency distribution, if $\\text{Mean} = 24$ and $\\text{Mode} = 12$, find the Median using the empirical formula.",
        sample_answer: "$3\\text{ Median} = \\text{Mode} + 2\\text{ Mean} = 12 + 2(24) = 12 + 48 = 60 \\implies \\text{Median} = \\frac{60}{3} = 20$.",
        memory_hook: "3 Median = Mode + 2 Mean (Three Medals = 1 Model + 2 Men)."
      },
      {
        num: 14,
        title: "Probability",
        concept: "Classical probability $P(E) = n(E)/n(S)$, complementary events $P(\\bar{E}) = 1 - P(E)$, impossible and sure events, playing cards, and dice.",
        points: [
          "Classical Theoretical Probability: $P(E) = \\frac{\\text{Number of outcomes favourable to } E}{\\text{Total number of possible equally likely outcomes}}$ ($0 \\le P(E) \\le 1$).",
          "Sure/Certain Event has $P = 1$; Impossible Event has $P = 0$.",
          "Complementary Event $\\bar{E}$ (Not $E$): $P(E) + P(\\bar{E}) = 1 \\implies P(\\bar{E}) = 1 - P(E)$.",
          "Standard Playing Card Deck (52 cards): 26 Red (13 Hearts $\\heartsuit$, 13 Diamonds $\\diamondsuit$), 26 Black (13 Spades $\\spadesuit$, 13 Clubs $\\clubsuit$); 12 Face Cards (4 Kings, 4 Queens, 4 Jacks); 4 Aces.",
          "Pair of Dice: Total possible outcomes $n(S) = 6 \\times 6 = 36$."
        ],
        formula: "P(E) = \\frac{n(E)}{n(S)}, \\quad P(E) + P(\\bar{E}) = 1, \\quad 0 \\le P(E) \\le 1",
        sample_question: "One card is drawn from a well-shuffled deck of 52 cards. Find the probability of getting: 1) A King of red colour, 2) A face card.",
        sample_answer: "1) King of red colour (King of Hearts, King of Diamonds) $= 2$ cards $\\implies P = \\frac{2}{52} = \\frac{1}{26}$. 2) Face cards $= 12$ cards $\\implies P = \\frac{12}{52} = \\frac{3}{13}$.",
        memory_hook: "Sum of all probabilities $= 1$; 12 Face cards in a 52-card deck."
      }
    ],
    "Science": [
      {
        num: 1,
        title: "Chemical Reactions and Equations",
        concept: "Law of conservation of mass, balancing chemical equations, reaction types (combination, decomposition, displacement, redox), corrosion, and rancidity.",
        points: [
          "Law of Conservation of Mass: Total mass of reactants equals total mass of products; atoms of each element must balance on both sides.",
          "Combination Reaction: Two or more reactants combine to form a single product ($A + B \\to AB$, e.g. Quicklime to Slaked lime: $\\text{CaO} + \\text{H}_2\\text{O} \\to \\text{Ca(OH)}_2 + \\text{Heat}$).",
          "Decomposition Reaction: Single reactant breaks down on heating, electricity, or light: Thermal ($2\\text{FeSO}_4 \\xrightarrow{\\Delta} \\text{Fe}_2\\text{O}_3 + \\text{SO}_2 + \\text{SO}_3$), Electrolytic ($2\\text{H}_2\\text{O} \\xrightarrow{\\text{elec}} 2\\text{H}_2 + \\text{O}_2$), Photolytic ($2\\text{AgCl} \\xrightarrow{h\\nu} 2\\text{Ag} + \\text{Cl}_2$ in black/white photography).",
          "Displacement: More reactive metal displaces less reactive metal ($\\text{Fe} + \\text{CuSO}_4 \\to \\text{FeSO}_4 + \\text{Cu}$); Double Displacement / Precipitation: Mutual exchange of ions ($\\text{Na}_2\\text{SO}_4 + \\text{BaCl}_2 \\to \\text{BaSO}_4 \\downarrow \\text{ (white ppt)} + 2\\text{NaCl}$).",
          "Redox: Oxidation is gain of oxygen / loss of hydrogen; Reduction is loss of oxygen / gain of hydrogen ($\\text{CuO} + \\text{H}_2 \\xrightarrow{\\Delta} \\text{Cu} + \\text{H}_2\\text{O}$).",
          "Corrosion: Slow destruction of metals by moisture and oxygen (green coating on copper $\\text{CuCO}_3 \\cdot \\text{Cu(OH)}_2$, black coating on silver $\\text{Ag}_2\\text{S}$). Rancidity: Oxidation of fats and oils prevented by nitrogen flushing and antioxidants."
        ],
        formula: "\\text{Redox: } \\text{CuO} + \\text{H}_2 \\xrightarrow{\\Delta} \\text{Cu (Reduced)} + \\text{H}_2\\text{O (Oxidised)}",
        sample_question: "Why is respiration considered an exothermic reaction?",
        sample_answer: "During digestion, food is broken down into glucose. In cellular respiration, glucose combines with oxygen in cells, releasing substantial biochemical energy along with carbon dioxide and water: $\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\to 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{Energy (ATP)}$.",
        memory_hook: "OIL RIG: Oxidation Is Loss of electrons/gain of O; Reduction Is Gain of electrons/loss of O."
      },
      {
        num: 2,
        title: "Acids, Bases and Salts",
        concept: "Chemical properties of acids and bases, pH scale ($0-14$), preparation and properties of Bleaching Powder, Baking Soda, Washing Soda, and POP.",
        points: [
          "Acids release $\\text{H}^+$ (or $\\text{H}_3\\text{O}^+$ hydronium) ions in aqueous solution; Bases release $\\text{OH}^-$ ions. Acid $+$ Metal $\\to$ Salt $+ \\text{H}_2 \\uparrow$ (burns with pop sound). Acid $+$ Carbonate $\\to$ Salt $+ \\text{H}_2\\text{O} + \\text{CO}_2 \\uparrow$ (turns lime water milky).",
          "pH Scale ($0-14$): $\\text{pH} < 7$ is Acidic; $\\text{pH} = 7$ is Neutral; $\\text{pH} > 7$ is Basic. Universal indicator measures $\\text{H}^+$ concentration ($-\\log[\\text{H}^+]$).",
          "Everyday pH: Tooth decay starts when mouth $\\text{pH} < 5.5$; Acid rain has $\\text{pH} < 5.6$; Stomach secretes $\\text{HCl}$ (relieved by Milk of Magnesia $\\text{Mg(OH)}_2$); Nettle sting injects methanoic acid (neutralized by dock plant base).",
          "Chlor-Alkali Process: Electrolysis of brine ($2\\text{NaCl} + 2\\text{H}_2\\text{O} \\to 2\\text{NaOH} + \\text{Cl}_2 + \\text{H}_2$).",
          "Salts: 1) Bleaching Powder: $\\text{Ca(OH)}_2 + \\text{Cl}_2 \\to \\text{CaOCl}_2 + \\text{H}_2\\text{O}$; 2) Baking Soda: $\\text{NaHCO}_3$ (releases $\\text{CO}_2$ on heating to make cakes fluffy); 3) Washing Soda: $\\text{Na}_2\\text{CO}_3 \\cdot 10\\text{H}_2\\text{O}$; 4) Plaster of Paris (POP): $\\text{CaSO}_4 \\cdot \\frac{1}{2}\\text{H}_2\\text{O}$ (sets into hard Gypsum $\\text{CaSO}_4 \\cdot 2\\text{H}_2\\text{O}$ on adding water)."
        ],
        formula: "\\text{POP to Gypsum: } \\text{CaSO}_4 \\cdot \\frac{1}{2}\\text{H}_2\\text{O} + 1\\frac{1}{2}\\text{H}_2\\text{O} \\longrightarrow \\text{CaSO}_4 \\cdot 2\\text{H}_2\\text{O}",
        sample_question: "Why should curd and sour foodstuffs NOT be stored in brass and copper vessels?",
        sample_answer: "Curd and sour substances contain organic acids. These acids react chemically with copper and brass metals to form toxic, poisonous metallic salts that cause severe food poisoning.",
        memory_hook: "Baking soda $= \\text{NaHCO}_3$; Washing soda $= 10\\text{H}_2\\text{O}$; POP has half water molecule."
      },
      {
        num: 3,
        title: "Metals and Non-metals",
        concept: "Reactivity series, ionic bonding, metallurgy (roasting/calcination/electrolytic refining), and corrosion prevention.",
        points: [
          "Reactivity Series: $\\text{K} > \\text{Na} > \\text{Ca} > \\text{Mg} > \\text{Al} > \\text{Zn} > \\text{Fe} > \\text{Pb} > [\\text{H}] > \\text{Cu} > \\text{Hg} > \\text{Ag} > \\text{Au}$.",
          "Ionic Compounds: Formed by complete transfer of electrons from metals to non-metals (e.g. $\\text{Na}^+ \\text{Cl}^-$). High melting points, soluble in water, conduct electricity in molten/aqueous state.",
          "Extraction of Metals: 1) Low reactivity (Cinnabar $\\text{HgS}$ heated in air); 2) Medium reactivity: Roasting (heating sulphide ores in excess air: $2\\text{ZnS} + 3\\text{O}_2 \\to 2\\text{ZnO} + 2\\text{SO}_2$) and Calcination (heating carbonate ores in limited air: $\\text{ZnCO}_3 \\to \\text{ZnO} + \\text{CO}_2$), followed by reduction with Carbon; 3) High reactivity: Electrolytic reduction of molten chlorides ($\\text{Na, Al}$).",
          "Thermite Reaction: $\\text{Fe}_2\\text{O}_3 + 2\\text{Al} \\to 2\\text{Fe (molten)} + \\text{Al}_2\\text{O}_3 + \\text{Heat}$ (used to weld railway tracks).",
          "Alloying: Stainless Steel ($\\text{Fe} + \\text{Ni} + \\text{Cr}$); Brass ($\\text{Cu} + \\text{Zn}$); Bronze ($\\text{Cu} + \\text{Sn}$); Solder ($\\text{Pb} + \\text{Sn}$ has low melting point); Amalgam is an alloy of mercury."
        ],
        formula: "\\text{Thermite: } \\text{Fe}_2\\text{O}_3 + 2\\text{Al} \\longrightarrow 2\\text{Fe (liquid)} + \\text{Al}_2\\text{O}_3 + \\text{Heat}",
        sample_question: "Differentiate between roasting and calcination in metallurgy with balanced equations.",
        sample_answer: "Roasting heats sulphide ores in excess air ($2\\text{ZnS} + 3\\text{O}_2 \\xrightarrow{\\Delta} 2\\text{ZnO} + 2\\text{SO}_2$); Calcination heats carbonate ores in limited/no air to expel $\\text{CO}_2$ ($\\text{ZnCO}_3 \\xrightarrow{\\Delta} \\text{ZnO} + \\text{CO}_2$).",
        memory_hook: "Roasting needs Oxygen (Sulphides); Calcination Carbonates in closed kiln; K-Na-Ca-Mg-Al top reactive."
      },
      {
        num: 4,
        title: "Carbon and Its Compounds",
        concept: "Tetravalency, catenation, homologous series, functional groups, reactions of ethanol/ethanoic acid, and soap micelle formation.",
        points: [
          "Versatility of Carbon: Covalent bonding, Tetravalency (forms 4 covalent bonds), and Catenation (unique ability to form long carbon chains and rings).",
          "Saturated Hydrocarbons (Alkanes: $\\text{C}_n\\text{H}_{2n+2}$, single bonds) vs Unsaturated Hydrocarbons (Alkenes: $\\text{C}_n\\text{H}_{2n}$, double bond; Alkynes: $\\text{C}_n\\text{H}_{2n-2}$, triple bond).",
          "Functional Groups: Alcohol ($-\\text{OH}$), Aldehyde ($-\\text{CHO}$), Ketone ($>\\text{C}=\\text{O}$), Carboxylic Acid ($-\\text{COOH}$), Halogen ($-Cl, -Br$). Homologous series differ by $-\\text{CH}_2-$ unit and $14\\text{ u}$ molecular mass.",
          "Reactions: Combustion (exothermic); Oxidation ($\\text{CH}_3\\text{CH}_2\\text{OH} \\xrightarrow{\\text{Alk. }\\text{KMnO}_4} \\text{CH}_3\\text{COOH}$); Addition (Hydrogenation of vegetable oils using Ni catalyst); Substitution (Methane $+$ Chlorine in sunlight).",
          "Esterification: $\\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{conc. }\\text{H}_2\\text{SO}_4} \\text{CH}_3\\text{COOC}_2\\text{H}_5 \\text{ (sweet ester)} + \\text{H}_2\\text{O}$. Saponification breaks ester into soap.",
          "Cleansing Action of Soap: Soap molecule has an ionic hydrophilic head (dissolves in water) and a hydrocarbon hydrophobic tail (dissolves in oily dirt), forming spherical Micelles that trap grease and wash away in water."
        ],
        formula: "\\text{Esterification: } \\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{H}^+} \\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O}",
        sample_question: "Explain the mechanism of micelle formation and the cleansing action of soap.",
        sample_answer: "Soap molecules have a hydrophobic hydrocarbon tail that attracts oily grease dirt and a hydrophilic ionic head that faces outward in water. They arrange into radial spherical clusters called Micelles, trapping the oil droplet at the core so it rinses away easily.",
        memory_hook: "Hydrophilic head loves water; Hydrophobic tail grabs grease; Ester smells sweet."
      },
      {
        num: 5,
        title: "Life Processes",
        concept: "Nutrition, human digestive system, double circulation in heart, aerobic vs anaerobic respiration, and nephron excretion.",
        points: [
          "Autotrophic Nutrition (Photosynthesis) and Heterotrophic Nutrition (Holozoic in Amoeba and humans).",
          "Human Digestive System: Mouth (salivary amylase digests starch) $\\to$ Stomach ($\\text{HCl}$ activates pepsin, mucus protects lining) $\\to$ Small Intestine (Bile emulsifies fats, pancreatic trypsin & lipase digest proteins/lipids; Villi absorb nutrients into blood) $\\to$ Large Intestine (absorbs water).",
          "Respiration: Glucose (6C) in cytoplasm $\\to$ Pyruvate (3C). Aerobic in Mitochondria $\\to 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + 38\\text{ ATP}$; Anaerobic in Yeast $\\to \\text{Ethanol} + \\text{CO}_2 + 2\\text{ ATP}$; In muscle lack of $\\text{O}_2 \\to \\text{Lactic Acid} + 2\\text{ ATP}$ (cramps).",
          "Human Circulatory System: 4-chambered heart exhibits Double Circulation (Pulmonary loop to lungs and Systemic loop to body). Blood pressure measured by Sphygmomanometer (Normal: $120/80\\text{ mm Hg}$).",
          "Transportation in Plants: Xylem (unidirectional upward transport of water/minerals driven by transpiration pull); Phloem (bidirectional translocation of sucrose using ATP).",
          "Excretory System: Pair of Kidneys with $1\\text{ million}$ Nephrons (Bowman's Capsule filters blood, Glomerulus, tubular selective reabsorption of glucose/amino acids/salts, collecting duct forms urine)."
        ],
        formula: "\\text{Double Circulation: } \\text{Right Ventricle} \\xrightarrow{\\text{Lungs}} \\text{Left Atrium} \\to \\text{Left Ventricle} \\xrightarrow{\\text{Body}} \\text{Right Atrium}",
        sample_question: "Why is double circulation necessary in human beings and birds?",
        sample_answer: "Humans and birds are warm-blooded organisms requiring constant high energy to maintain constant body temperature. Double circulation completely separates oxygenated and deoxygenated blood, ensuring highly efficient oxygen delivery.",
        memory_hook: "Amylase = Starch; Pepsin/Trypsin = Protein; Lipase = Fat; Nephron = Kidney filter."
      },
      {
        num: 6,
        title: "Control and Coordination",
        concept: "Neuron structure, reflex arc, human brain anatomy, plant phytohormones/tropisms, and endocrine hormones.",
        points: [
          "Neuron Structure: Dendrite $\\to$ Cyton/Cell Body $\\to$ Axon $\\to$ Nerve Ending $\\to$ Synapse (neurotransmitter chemical gap).",
          "Reflex Arc: Automatic, rapid, involuntary response bypassing conscious brain: Receptor $\\to$ Sensory Neuron $\\to$ Spinal Cord Relay Neuron $\\to$ Motor Neuron $\\to$ Effector Muscle.",
          "Human Brain (Cranium): 1) Forebrain (Cerebrum: thinking, memory, sensory interpretation), 2) Midbrain (auditory/visual reflexes), 3) Hindbrain (Cerebellum maintains balance/posture; Medulla controls involuntary breathing/blood pressure/vomiting; Pons regulates respiration).",
          "Plant Phytohormones: Auxin (promotes cell elongation, causes phototropism), Gibberellins (stem growth), Cytokinins (rapid cell division in fruits/seeds), Abscisic Acid (stress hormone, wilting of leaves/inhibits growth).",
          "Plant Tropisms: Phototropism (light), Geotropism (gravity), Hydrotropism (water), Chemotropism (pollen tube growth towards ovule).",
          "Endocrine Glands: Pituitary (Growth hormone; gigantism/dwarfism), Thyroid (Thyroxine; needs iodine to prevent Goitre), Pancreas (Insulin regulates blood sugar; deficiency causes Diabetes), Adrenal (Adrenaline: fight or flight response)."
        ],
        formula: "\\text{Reflex Arc: Receptor } \\longrightarrow \\text{Sensory Neuron } \\longrightarrow \\text{Spinal Cord } \\longrightarrow \\text{Motor Neuron } \\longrightarrow \\text{Effector}",
        sample_question: "Explain how auxin promotes phototropism (bending of shoot towards light).",
        sample_answer: "When light shines from one side of a plant shoot, auxin diffuses to the shaded side of the shoot. The high auxin concentration stimulates cells on the shaded side to grow longer than cells on the illuminated side, causing the shoot to bend towards light.",
        memory_hook: "Cerebellum = Balance; Medulla = Involuntary vitals; Auxin = Bends to light; Insulin = Lowers sugar."
      },
      {
        num: 7,
        title: "How do Organisms Reproduce?",
        concept: "Asexual reproduction methods, flowering plant sexual reproduction, human reproductive anatomy, menstrual cycle, and contraception.",
        points: [
          "Asexual Reproduction: Binary/Multiple Fission (Amoeba, Leishmania, Plasmodium), Fragmentation (Spirogyra), Regeneration (Planaria), Budding (Hydra), Vegetative Propagation (Bryophyllum leaves, grafting), Spore Formation (Rhizopus).",
          "Flower Reproduction: Stamen (anther + filament) produces Pollen; Carpel/Pistil (stigma + style + ovary with ovule). Pollination (self/cross) $\\to$ Pollen tube grows $\\to$ Double fertilisation $\\to$ Ovule becomes Seed, Ovary becomes Fruit.",
          "Male Reproductive System: Testes (scrotum maintains $2-2.5^\\circ\\text{C}$ lower temp for sperm), Vas Deferens, Prostate & Seminal Vesicles (add fluid nutrition).",
          "Female Reproductive System: Ovaries (release 1 egg/month), Fallopian Tube / Oviduct (site of fertilisation), Uterus (implantation of embryo via Placenta disc providing $\\text{O}_2$ and glucose).",
          "Menstruation: Monthly shedding of thick uterine lining and blood if ovum is not fertilised ($28\\text{ day}$ cycle).",
          "Contraceptive Methods: 1) Barrier (condoms prevent STDs like HIV-AIDS, Gonorrhoea, Syphilis), 2) Chemical (oral hormonal pills), 3) IUCDs (Copper-T in uterus), 4) Surgical (Vasectomy in males, Tubectomy in females)."
        ],
        formula: "\\text{Pollination } \\to \\text{Fertilisation in Fallopian Tube / Oviduct } \\to \\text{Zygote } \\to \\text{Implantation in Uterus}",
        sample_question: "What is the function of the placenta in human embryonic development?",
        sample_answer: "The placenta is a specialized vascular disc embedded in the uterine wall containing villi on the embryo's side. It provides a large surface area for glucose, oxygen, and nutrients to diffuse from mother to embryo, and removes embryonic waste into the mother's blood.",
        memory_hook: "Fertilisation happens in Fallopian tube; Placenta feeds fetus; Vasectomy = Vas deferens cut."
      },
      {
        num: 8,
        title: "Heredity and Evolution",
        concept: "Mendelian genetics, monohybrid ($3:1$) & dihybrid ($9:3:3:1$) crosses, laws of inheritance, and human chromosomal sex determination.",
        points: [
          "Gregor Johann Mendel (Father of Genetics) conducted hybridization experiments on garden pea plants (Pisum sativum) with 7 pairs of contrasting traits.",
          "Monohybrid Cross (Height: Tall $TT \\times$ Dwarf $tt$): F1 generation is all Tall ($Tt$); F2 generation shows Phenotypic ratio $3 : 1$ (3 Tall : 1 Dwarf) and Genotypic ratio $1 : 2 : 1$ ($1TT : 2Tt : 1tt$).",
          "Law of Dominance: Dominant allele expresses itself in heterozygous condition; Recessive allele expresses only in homozygous state.",
          "Dihybrid Cross (Round Yellow $RRYY \\times$ Wrinkled Green $rryy$): F2 Phenotypic ratio is $9 : 3 : 3 : 1$ (Law of Independent Assortment).",
          "Sex Determination in Humans: Humans have 23 pairs of chromosomes (22 autosome pairs + 1 sex chromosome pair). Females have $XX$; Males have $XY$. Father's sperm determines child's sex ($50\\%$ chance of boy or girl)."
        ],
        formula: "\\text{Monohybrid F2: } 3:1 \\text{ (Phenotype)}, 1:2:1 \\text{ (Genotype)}; \\quad \\text{Dihybrid F2: } 9:3:3:1",
        sample_question: "A cross between a pure tall plant ($TT$) and a pure dwarf plant ($tt$) produces F1 progeny. What will be the phenotype and genotype in F1 and F2 generations?",
        sample_answer: "F1 generation: All plants are Tall (Genotype $Tt$). In F2 generation (self-pollination of F1): Phenotype is 3 Tall : 1 Dwarf ($3:1$); Genotype is $1TT : 2Tt : 1tt$ ($1:2:1$).",
        memory_hook: "Monohybrid $= 3:1$; Dihybrid $= 9:3:3:1$; Sperm carries either X or Y."
      },
      {
        num: 9,
        title: "Light - Reflection and Refraction",
        concept: "Mirror formula, lens formula, magnification, Snell's law of refraction, refractive index, and optical power of lens in Dioptres.",
        points: [
          "Mirror Formula: $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$ (where $u$ is object distance, $v$ is image distance, $f$ is focal length; Sign convention: $u$ is always negative).",
          "Magnification by Mirror: $m = \\frac{h'}{h} = -\\frac{v}{u}$ (negative $m \\implies$ Real/inverted image; positive $m \\implies$ Virtual/erect).",
          "Refraction Laws & Snell's Law: $\\frac{\\sin i}{\\sin r} = n_{21} = \\frac{n_2}{n_1} = \\frac{v_1}{v_2}$ (constant refractive index for a given pair of media). Ray bends TOWARDS normal when entering denser medium ($v$ decreases).",
          "Lens Formula: $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$. Magnification by Lens: $m = \\frac{h'}{h} = +\\frac{v}{u}$.",
          "Convex lens focal length is positive ($+f$); Concave lens focal length is negative ($-f$).",
          "Power of a Lens: $P = \\frac{1}{f\\text{ (in metres)}}$ (SI unit Dioptre, $\\text{D}$). Convex lens has positive power ($+P$); Concave lens has negative power ($-P$)."
        ],
        formula: "\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u} \\text{ (Mirror)}, \\quad \\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u} \\text{ (Lens)}, \\quad P = \\frac{1}{f\\text{ (m)}} \\text{ [Dioptre]}, \\quad n = \\frac{c}{v}",
        sample_question: "A doctor prescribes a corrective lens of power $-2.0\\text{ D}$. Find the focal length and identify the type of lens.",
        sample_answer: "$f = \\frac{1}{P} = \\frac{1}{-2.0} = -0.5\\text{ m} = -50\\text{ cm}$. The negative focal length indicates it is a Concave (diverging) lens prescribed to correct Myopia (short-sightedness).",
        memory_hook: "Mirror adds in formula ($+$); Lens subtracts ($-$). Negative power = Concave (Myopia)."
      },
      {
        num: 10,
        title: "The Human Eye and the Colourful World",
        concept: "Accommodation, vision defects (myopia, hypermetropia, presbyopia), prism dispersion, atmospheric refraction, and Rayleigh scattering.",
        points: [
          "Power of Accommodation: Ability of ciliary muscles to adjust crystalline eye lens curvature (focal length). Least distance of distinct vision (near point) $= 25\\text{ cm}$; Far point is Infinity ($\\infty$).",
          "Defects of Vision: 1) Myopia (Near-sightedness: image forms in front of retina; corrected by Concave lens); 2) Hypermetropia (Far-sightedness: image forms behind retina; corrected by Convex lens); 3) Presbyopia (old age loss of accommodation; corrected by Bi-focal lens); 4) Cataract (cloudy lens; corrected by surgery).",
          "Prism Dispersion: White light separates into 7 spectral colours (VIBGYOR) because different wavelengths refract through different angles (Red bends least with largest $\\lambda$; Violet bends most with smallest $\\lambda$).",
          "Atmospheric Refraction: Continuous bending of starlight through air layers of varying refractive index causes Twinkling of Stars, Advanced Sunrise (2 mins early), and Delayed Sunset (2 mins late). Planets do not twinkle because they are extended sources.",
          "Scattering of Light & Tyndall Effect: Rayleigh scattering intensity $\\propto \\frac{1}{\\lambda^4}$. Fine air particles scatter shorter blue wavelengths most, making clear sky appear Blue; at sunrise/sunset, light travels longer path through atmosphere, blue scatters away, leaving Red light to reach our eyes."
        ],
        formula: "\\text{Rayleigh Scattering } \\propto \\frac{1}{\\lambda^4}, \\quad \\text{VIBGYOR (Red has max } \\lambda, \\text{ Violet has min } \\lambda)",
        sample_question: "Why does the clear sky appear blue during midday, but reddish at sunrise and sunset?",
        sample_answer: "Sunlight collides with atmospheric air molecules. Blue light has a shorter wavelength and scatters much more strongly than red (Rayleigh scattering), filling the sky with blue light. At sunrise/sunset, sunlight travels a much longer distance through thick atmosphere; blue light scatters away before reaching our eyes, leaving the longer red wavelengths.",
        memory_hook: "Myopia $\\to$ Concave; Hypermetropia $\\to$ Convex; Red bends least, Violet bends most."
      },
      {
        num: 11,
        title: "Electricity",
        concept: "Electric current ($I=Q/t$), potential difference ($V=W/Q$), Ohm's law ($V=IR$), resistance factors ($R=\\rho l/A$), series/parallel circuits, Joule's heating, and electric power.",
        points: [
          "Electric Current: Rate of flow of electric charges: $I = \\frac{Q}{t}$ (SI unit Ampere, $1\\text{ A} = 1\\text{ C/s}$; measured by Ammeter connected in Series).",
          "Electric Potential Difference: Work done to move a unit positive charge between two points: $V = \\frac{W}{Q}$ (SI unit Volt, $1\\text{ V} = 1\\text{ J/C}$; measured by Voltmeter connected in Parallel).",
          "Ohm's Law: At constant temperature, $V \\propto I \\implies V = IR$ ($R$ is resistance in Ohms, $\\Omega$).",
          "Resistance Factors: $R = \\rho \\frac{l}{A}$ (proportional to length $l$, inversely proportional to cross-sectional area $A$; $\\rho$ is Resistivity in $\\Omega\\cdot\\text{m}$, independent of dimensions, dependent on temperature and material).",
          "Circuit Combinations: 1) Series: $R_s = R_1 + R_2 + R_3$ (same current $I$, voltage divides); 2) Parallel: $\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$ (same voltage $V$, current divides; equivalent resistance is smaller than the smallest resistor).",
          "Joule's Law of Heating: $H = I^2 R t = V I t = \\frac{V^2}{R} t$ (in Joules). Electric Power: $P = VI = I^2 R = \\frac{V^2}{R}$ (Watts, $1\\text{ kWh} = 3.6 \\times 10^6\\text{ J}$)."
        ],
        formula: "V = IR, \\quad R = \\rho \\frac{l}{A}, \\quad R_s = \\sum R_i, \\quad \\frac{1}{R_p} = \\sum \\frac{1}{R_i}, \\quad H = I^2 R t, \\quad P = VI = I^2 R = \\frac{V^2}{R}",
        sample_question: "Three resistors $2\\,\\Omega, 3\\,\\Omega, 6\\,\\Omega$ are connected in parallel across a $6\\text{ V}$ battery. Find the equivalent resistance and total current drawn.",
        sample_answer: "$\\frac{1}{R_p} = \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6} = \\frac{3+2+1}{6} = \\frac{6}{6} = 1 \\implies R_p = 1\\,\\Omega$. Total current $I = \\frac{V}{R_p} = \\frac{6\\text{ V}}{1\\,\\Omega} = 6\\text{ Amperes}$.",
        memory_hook: "Series adds directly ($R_1+R_2$); Parallel adds reciprocals ($1/R_1+1/R_2$); Power is $VI$."
      },
      {
        num: 12,
        title: "Magnetic Effects of Electric Current",
        concept: "Magnetic field lines, Right-Hand Thumb Rule, Solenoid, Fleming's Left-Hand Rule (motor principle), electromagnetic induction, and domestic safety circuits.",
        points: [
          "Magnetic Field Lines: Emerge from North pole and enter South pole outside magnet; continuous closed loops; tangent gives field direction; NEVER intersect each other (otherwise two directions of magnetic field would exist at one point).",
          "Right-Hand Thumb Rule (Maxwell): Grasp current-carrying wire with right hand, thumb pointing along current $\\implies$ curled fingers indicate concentric magnetic field line circles.",
          "Solenoid: Helical coil of insulated copper wire; inside a current-carrying solenoid, magnetic field lines are uniform parallel straight lines, acting like a strong bar magnet.",
          "Fleming's Left-Hand Rule (Electric Motor): Stretch Thumb (Force/Motion), Forefinger (Magnetic Field), Centre finger (Current) mutually perpendicular $\\implies$ predicts Lorentz magnetic force direction on current wire ($F = B I l$). Electric motor converts electrical energy into mechanical rotation.",
          "Electromagnetic Induction (Michael Faraday): Relative motion between a conductor and magnetic field induces an electric current (Fleming's Right-Hand Rule).",
          "Domestic Electric Circuits: Live wire (Red/Brown, $+220\\text{ V}$), Neutral wire (Black/Blue, $0\\text{ V}$), Earth wire (Green/Yellow, safety grounding to prevent electric shocks). Fuse/MCB melts or trips during Short Circuit (Live and Neutral touch directly) or Overloading."
        ],
        formula: "\\text{Left Hand (Motor): Thumb (Force), Forefinger (Field), Middle (Current)} \\implies \\text{FBI}",
        sample_question: "State the principle of an electric motor and Fleming's Left-Hand Rule.",
        sample_answer: "An electric motor operates on the principle that when a rectangular current-carrying coil is placed in a magnetic field, it experiences mutually opposite magnetic forces on its parallel arms (Fleming's Left-Hand Rule), generating continuous rotational torque.",
        memory_hook: "FBI on Left Hand: Force (Thumb), B-Field (Forefinger), I-Current (Middle)."
      },
      {
        num: 13,
        title: "Our Environment",
        concept: "Ecosystem structure, food chains/webs, 10% energy transfer law, biological magnification, and ozone layer depletion.",
        points: [
          "Ecosystem: Biotic community (Producers/autotrophs, Consumers/herbivores-carnivores, Decomposers) interacting with abiotic environment.",
          "Food Chain: Sequential transfer of food energy from one trophic level to the next: Producers ($T_1$) $\\to$ Primary Consumers ($T_2$) $\\to$ Secondary Consumers ($T_3$) $\\to$ Tertiary Consumers ($T_4$).",
          "Lindeman's 10% Law of Energy: Only $10\\%$ of energy entering a trophic level is transferred to the next higher level; $90\\%$ is lost as metabolic heat and respiration. This limits food chains to 3–4 trophic levels.",
          "Biological Magnification: Progressive accumulation of non-biodegradable toxic pesticides (DDT) in increasing concentrations at successive higher trophic levels, reaching maximum concentration in top predators (humans).",
          "Ozone Layer ($\\text{O}_3$) in Stratosphere: Formed by $h\\nu$ UV light splitting $\\text{O}_2 \\to \\text{O} + \\text{O}$, then $\\text{O} + \\text{O}_2 \\to \\text{O}_3$. Protects life by shielding harmful UV radiation (causes skin cancer, cataracts). Depleted by Chlorofluorocarbons (CFCs), managed by 1987 UNEP Montreal Protocol freezing CFC production.",
          "Waste Management: Biodegradable waste (decomposed by microbes) vs Non-biodegradable plastics/glass."
        ],
        formula: "\\text{10\\% Law: } 1000\\text{ J (Plant)} \\longrightarrow 100\\text{ J (Deer)} \\longrightarrow 10\\text{ J (Lion)}, \\quad \\text{O}_2 \\xrightarrow{\\text{UV}} \\text{O} + \\text{O} \\implies \\text{O} + \\text{O}_2 \\to \\text{O}_3",
        sample_question: "If $20,000\\text{ Joules}$ of solar energy is captured by green plants (producers), how much energy will be available to the top carnivore in the food chain: Plant $\\to$ Deer $\\to$ Lion?",
        sample_answer: "Producers capture energy $= 20,000\\text{ J}$. Primary consumers (Deer) receive $10\\% = 2,000\\text{ J}$. Secondary consumers (Lion) receive $10\\% = 200\\text{ Joules}$.",
        memory_hook: "10% energy moves up each step; Pesticides magnify to the top (Biomagnification)!"
      }
    ],
    "Social Science": [
      {
        num: 1,
        title: "The Rise of Nationalism in Europe",
        concept: "French Revolution legacy, Napoleonic Code (1804), Romanticism, 1848 revolutions, Unification of Germany & Italy, and Balkan crisis.",
        points: [
          "Frédéric Sorrieu's 1848 utopian print envisioned a world of democratic and social republics marching past the Statue of Liberty.",
          "Napoleonic Code (Civil Code of 1804): Abolished feudal privileges based on birth, established equality before law, secured property rights, standardized weights and measures.",
          "Liberal Nationalism: Advocated individual freedom, representative government by consent, end of autocracy, and free movement of goods (Zollverein customs union of 1834).",
          "Unification of Germany (1871): Led by Prussian Chief Minister Otto von Bismarck using 'Blood and Iron' policy, defeating Denmark, Austria, and France in three wars; Kaiser William I proclaimed Emperor.",
          "Unification of Italy (1861): Giuseppe Mazzini (founded Young Italy), Count Cavour (diplomatic alliances), and Giuseppe Garibaldi (Red Shirts army) united Italy under King Victor Emmanuel II.",
          "Balkan Crisis: Intense ethnic rivalries among Slavic nationalities emerging from collapsing Ottoman Empire sparked imperial conflicts, triggering World War I (1914)."
        ],
        formula: "\\text{German Unification (Bismarck: Blood & Iron)} + \\text{Italian Unification (Cavour, Mazzini, Garibaldi)}",
        sample_question: "Explain the role played by Count Camillo de Cavour in the unification of Italy.",
        sample_answer: "Cavour, Prime Minister of Piedmont-Sardinia, was a skilled diplomat who engineered a secret military alliance with France in 1859, successfully defeating the Austrian empire and annexing Lombardy, laying the foundation for Italian unification.",
        memory_hook: "Bismarck used Blood & Iron; Cavour used Diplomacy; Garibaldi led Red Shirts."
      },
      {
        num: 2,
        title: "Nationalism in India",
        concept: "Mahatma Gandhi's Satyagraha, Rowlatt Act & Jallianwala Bagh (1919), Non-Cooperation Movement, Dandi March, and Civil Disobedience.",
        points: [
          "Idea of Satyagraha: Pure soul-force and non-violent resistance based on the supremacy of truth (Early experiments: Champaran 1917 for indigo farmers, Kheda 1917 for revenue remission, Ahmedabad 1918 for cotton mill workers).",
          "Rowlatt Act (1919) allowed detention without trial. Jallianwala Bagh Massacre (13 April 1919): General Dyer opened fire on peaceful Baisakhi gathering in Amritsar, killing hundreds.",
          "Non-Cooperation Movement (1920–1922): Launched alongside Khilafat Committee (Ali brothers) to surrender colonial titles, boycott British goods, government schools, and law courts; called off after Chauri Chaura violence (1922).",
          "Civil Disobedience Movement (1930): Launched with the historic Dandi Salt March (12 March – 6 April 1930, $240\\text{ miles}$ from Sabarmati to Dandi coast) where Gandhi manufactured salt breaking the British salt monopoly tax.",
          "Gandhi-Irwin Pact (1931) and Poona Pact (1932): Signed between Mahatma Gandhi and Dr. B.R. Ambedkar, securing reserved legislative seats for Depressed Classes within the general electorate.",
          "Collective Belonging: Visualised through Bankim Chandra Chattopadhyay's 'Vande Mataram', Abanindranath Tagore's Bharat Mata painting, tricolour flags, and folklore revival."
        ],
        formula: "1919 \\text{ (Jallianwala Bagh)} \\to 1920 \\text{ (Non-Cooperation)} \\to 1930 \\text{ (Salt March & Civil Disobedience)} \\to 1942 \\text{ (Quit India)}",
        sample_question: "Why did Mahatma Gandhi choose 'Salt' as the central symbol of nationwide protest in the Civil Disobedience Movement?",
        sample_answer: "Salt was an indispensable dietary necessity consumed equally by the rich and the poor. The British government's monopoly over its manufacture and the oppressive salt tax affected every single Indian, making it a universal symbol of colonial oppression.",
        memory_hook: "Champaran $\\to$ Kheda $\\to$ Ahmedabad; Salt March broke colonial monopoly; Poona Pact united electorates."
      },
      {
        num: 3,
        title: "The Making of a Global World",
        concept: "Pre-modern Silk Routes, Columbian biological exchange, indentured labour migration, 1929 Great Depression, and Bretton Woods institutions.",
        points: [
          "Pre-modern Global Links: Ancient Silk Routes connected Asia with Europe and North Africa, exchanging Chinese silk, Indian spices, pottery, precious metals, and religious ideas (Buddhism, Islam, Christianity).",
          "Columbian Exchange: Christopher Columbus discovered the Americas, introducing potatoes, maize, tomatoes, chilies to Europe; European conquerors used biological warfare (Smallpox virus) to decimate indigenous populations lacking immunity.",
          "19th-Century Global Economy: Three flows: Flow of Trade (grain/cotton), Flow of Labour (indentured Indian/Chinese workers to Caribbean sugar plantations under bonded contracts), Flow of Capital.",
          "The Great Depression (1929–1935): Triggered by agricultural overproduction and US Wall Street Stock Market Crash (Oct 1929); global trade halved, banks collapsed, causing worldwide unemployment and poverty.",
          "Post-War Bretton Woods System (1944): Established the International Monetary Fund (IMF) and World Bank (IBRD) to maintain international economic stability and fixed currency exchange rates based on the US Dollar."
        ],
        formula: "\\text{Bretton Woods Twins (1944)} = \\text{IMF (Financial Stability)} + \\text{World Bank (Reconstruction)}",
        sample_question: "Explain how biological disease (Smallpox) proved to be the most lethal weapon of Spanish conquerors in the Americas.",
        sample_answer: "America's indigenous inhabitants had lived in biological isolation for centuries and had no acquired immunity against European diseases like Smallpox. Once introduced, smallpox spread rapidly as a deadly epidemic, wiping out entire communities without firing a bullet.",
        memory_hook: "Silk Routes traded goods & ideas; Smallpox conquered America; Bretton Woods built IMF and World Bank."
      },
      {
        num: 4,
        title: "Resources and Development",
        concept: "Resource planning, Rio Earth Summit (1992), Agenda 21, land degradation, and major Indian soil classifications.",
        points: [
          "Resource Planning in India: 1) Identification and inventory through mapping, 2) Evolving a planning structure with appropriate technology and institutional setup, 3) Matching resource plans with overall National Development Plans.",
          "Rio de Janeiro Earth Summit 1992: Adopted Agenda 21 to achieve global sustainable development, combat environmental damage, poverty, and disease.",
          "Major Soil Types of India:",
          "1. Alluvial Soil: Most widespread and fertile; deposited by Indus, Ganga, Brahmaputra; rich in potash and lime (Khadar and Bhangar).",
          "2. Black / Regur Soil: Formed from volcanic basalt lava on Deccan Trap; clayey, retains moisture, ideal for Cotton cultivation.",
          "3. Red and Yellow Soil: Develops on crystalline igneous rocks; red due to iron diffusion, turns yellow when hydrated.",
          "4. Laterite Soil: Formed under high temperature and heavy tropical leaching; acidic, poor humus, suitable for Cashew nuts and tea with heavy fertilisers.",
          "5. Arid Soil (Sandy/saline in Rajasthan) and Forest Soil (Loamy on mountain valley slopes)."
        ],
        formula: "\\text{Black Soil} = \\text{Basalt Lava} \\implies \\text{Regur (Cotton Soil)}, \\quad \\text{Alluvial} = \\text{River Silt}",
        sample_question: "Describe the characteristics and agricultural significance of Black (Regur) Soil.",
        sample_answer: "Black soil is fine-grained, clayey, possesses deep moisture-retention capacity, develops deep cracks in summer for aeration, and is extremely rich in calcium carbonate, magnesium, and potash, making it ideal for growing cotton.",
        memory_hook: "Alluvial = River Plains; Black Regur = Cotton Deccan; Laterite = Leached Cashews."
      },
      {
        num: 5,
        title: "Forest and Wildlife Resources",
        concept: "Biodiversity, IUCN conservation status categories, reserved/protected forests, Project Tiger (1973), and community conservation.",
        points: [
          "IUCN Species Categories: Normal, Endangered (Tiger, Indian Rhino, Lion-tailed Macaque), Vulnerable (Blue Sheep, Gangetic Dolphin), Rare (Himalayan Brown Bear), Endemic (Andaman Teal), Extinct (Asiatic Cheetah declared extinct in India in 1952, Dodo).",
          "Forest Administrative Classification: 1) Reserved Forests (more than $50\\%$ of total forests, permanently dedicated to timber production and wildlife, strictly protected), 2) Protected Forests (one-third of forests, protected from further depletion), 3) Unclassed Forests (managed by communities/private individuals in Northeast).",
          "Project Tiger (launched 1973): Pioneer conservation initiative creating Corbett (Uttarakhand), Ranthambore (Rajasthan), Sundarbans (West Bengal), Kanha (MP), and Periyar (Kerala).",
          "Community Conservation Movements: Chipko Movement in Garhwal Himalayas (hugging trees to prevent commercial logging); Beej Bachao Andolan in Tehri (reviving indigenous crop seeds without synthetic chemicals); Joint Forest Management (JFM) involving local village committees in forest restoration."
        ],
        formula: "\\text{Conservation} = \\text{Government Laws (Wildlife Act 1972)} + \\text{Community Protection (Chipko, JFM)}",
        sample_question: "Explain the philosophy and success of the Chipko Movement in the Himalayas.",
        sample_answer: "Led by local Himalayan villagers like Sunderlal Bahuguna, villagers embraced forest trees to prevent commercial loggers from felling them, demonstrating that indigenous community action can protect biodiversity and restore ecological balance.",
        memory_hook: "Project Tiger 1973; Chipko hugged trees; Reserved forests are strictly protected."
      },
      {
        num: 6,
        title: "Water Resources",
        concept: "Freshwater scarcity, multipurpose river valley dams (temples of modern India), rainwater harvesting, and traditional conservation.",
        points: [
          "Water Scarcity: Caused by over-exploitation, excessive extraction for commercial agriculture (tube-wells), industrial pollution, and unequal access across social classes.",
          "Multipurpose River Valley Projects (Jawaharlal Nehru called them 'Temples of Modern India'): Integrate flood control, irrigation canals, hydroelectricity, inland navigation, and fish breeding (Bhakra-Nangal on Satluj, Hirakud on Mahanadi, Sardar Sarovar on Narmada).",
          "Disadvantages & Protests: Submergence of fertile forests/farms, displacement of local tribal communities, siltation in reservoirs triggering floods, induced seismicity; sparked movements like Narmada Bachao Andolan.",
          "Traditional Rainwater Harvesting Techniques: 1) Guls and Kuls (diversion channels in Western Himalayas), 2) Khadins (Jaisalmer) and Johads (Rajasthan) in floodplains, 3) Rooftop Tankas (underground storage tanks in Bikaner, Barmer), 4) Bamboo Drip Irrigation in Meghalaya (taps spring water using bamboo pipes)."
        ],
        formula: "\\text{Multipurpose Dam} = \\text{Hydroelectricity} + \\text{Irrigation} + \\text{Flood Control} - \\text{Ecological Displacement}",
        sample_question: "Compare the advantages and environmental criticisms of large multipurpose dams.",
        sample_answer: "Advantages: Hydroelectric power generation, extensive irrigation, and flood mitigation; Criticisms: Submergence of biodiversity, massive displacement of tribal communities, reservoir siltation, and degradation of downstream aquatic ecosystems.",
        memory_hook: "Nehru called dams modern temples; Tankas store rainwater in Rajasthan; Bamboo drips in Meghalaya."
      },
      {
        num: 7,
        title: "Agriculture & Minerals and Energy Resources",
        concept: "Cropping seasons (Kharif, Rabi, Zaid), major food/cash crops, metallic/non-metallic minerals, fossil fuels, and renewable energy.",
        points: [
          "Cropping Seasons: 1) Rabi (sown winter Oct–Dec, harvested summer April–June: Wheat, Barley, Mustard, Peas), 2) Kharif (sown onset of monsoon June–July, harvested Sept–Oct: Paddy, Maize, Jowar, Bajra, Cotton, Jute), 3) Zaid (short summer season March–June: Watermelon, Cucumber, Vegetables).",
          "Major Crops: Rice (staple food, needs $>100\\text{ cm}$ rain, $>25^\\circ\\text{C}$ temp); Wheat (second staple, $50-75\\text{ cm}$ rain); Millets (Jowar, Bajra, Ragi rich in iron/calcium); Tea (beverage, well-drained fertile acidic soil on hill slopes in Assam/Darjeeling).",
          "Minerals: Ferrous (contain iron, e.g. Magnetite $70\\%$ Fe, Hematite $50-60\\%$ Fe in Kudremukh/Bailadila) vs Non-Ferrous (Bauxite for aluminium in Odisha, Copper in Khetri, Rajasthan).",
          "Conventional Energy: Coal (Anthracite highest quality, Bituminous, Lignite brown coal, Peat), Petroleum (Mumbai High $63\\%$, Gujarat, Digboi Assam), Natural Gas (HVJ pipeline).",
          "Non-Conventional Energy: Solar Energy (Bhadla Solar Park), Wind Energy (Tamil Nadu wind farms from Nagercoil to Madurai), Biogas (Gobar gas), Nuclear (Tarapur, Rawatbhata, Kudankulam)."
        ],
        formula: "\\text{Coal Ranks (Carbon \\%): } \\text{Anthracite (Highest)} > \\text{Bituminous} > \\text{Lignite} > \\text{Peat (Lowest)}",
        sample_question: "Differentiate between conventional and non-conventional sources of energy with two examples each.",
        sample_answer: "Conventional energy sources are exhaustible fossil fuels used traditionally that cause air pollution (e.g. Coal, Petroleum); Non-conventional energy sources are renewable, eco-friendly, inexhaustible natural sources (e.g. Solar energy, Wind energy).",
        memory_hook: "Rabi = Winter Wheat; Kharif = Monsoon Rice; Anthracite = King of Coal; Mumbai High = Oil giant."
      },
      {
        num: 8,
        title: "Power Sharing & Federalism",
        concept: "Belgium accommodation vs Sri Lanka majoritarianism, forms of power sharing, federal division of powers (Union, State, Concurrent lists).",
        points: [
          "Ethnic Contrast: Belgium (59% Dutch, 40% French) accommodated diversity through equal minister representation, community governments, avoiding civil war (Brussels model); Sri Lanka (74% Sinhala, 18% Tamil) enacted 1956 Majoritarian Sinhala Act, causing a brutal civil war.",
          "Reasons for Power Sharing: Prudential (reduces chances of social conflict and political instability) and Moral (power sharing is the very spirit of democracy).",
          "Forms of Power Sharing: Horizontal (Legislature, Executive, Judiciary - Checks and Balances); Vertical (Federal: Union $\\to$ State $\\to$ Local); Social Groups (reservations for SC/ST/women); Political Parties & Pressure Groups (Coalitions).",
          "Federalism Key Features: Two or more tiers of government, jurisdictions constitutionally guaranteed, independent judiciary settles disputes, financial autonomy secured.",
          "Three Legislative Lists: 1) Union List (97 subjects of national importance: Defence, Foreign Affairs, Banking; Central Parliament makes laws), 2) State List (Police, Trade, Agriculture, Health; State Legislatures make laws), 3) Concurrent List (Education, Forests, Marriage, Trade Unions; both can make laws, Central law prevails in conflict). Residuary subjects go to Union Government."
        ],
        formula: "\\text{Constitutional Lists: Union (National)} \\mid \\text{State (Regional)} \\mid \\text{Concurrent (Shared: Center Prevails)}",
        sample_question: "Differentiate between the horizontal and vertical division of power in a democracy.",
        sample_answer: "Horizontal power sharing places different organs of government at the same level (Legislature, Executive, Judiciary) creating a system of checks and balances; Vertical power sharing divides power among different hierarchical levels of government (Central, State, and Local Panchayats).",
        memory_hook: "Belgium accommodated; Sri Lanka suffered majoritarianism; Checks & balances keep power balanced."
      },
      {
        num: 9,
        title: "Gender, Religion and Caste & Political Parties",
        concept: "Gender inequalities, communalism vs secularism, caste in politics, functions of political parties, national vs state party criteria.",
        points: [
          "Gender Politics: Sexual division of labour limits women to unpaid domestic work; Feminist movements fight for equal rights and political representation ($33\\%$ reservation for women in local Panchayats and Parliament).",
          "Communalism: Belief that religion is the principal basis of social community, pitting religious groups against one another; Indian Secular State has no official state religion, ensuring freedom of faith (Articles 25–28).",
          "Caste in Politics: Caste considerations dictate candidate selection and vote-bank mobilization, but politics also influences caste by breaking down rigid sub-caste hierarchies.",
          "Political Parties: Organized groups of people who come together to contest elections and hold power in government. Three components: Leaders, Active Members, and Followers.",
          "Functions of Political Parties: Contest elections, put forward policies/programs, make laws, form and run governments, play the role of Opposition, shape public opinion.",
          "Criteria for Recognized Parties by ECI: National Party (wins $\\ge 6\\%$ votes in Lok Sabha or 4 State Assemblies AND $\\ge 4$ Lok Sabha seats); State Party (wins $\\ge 6\\%$ votes in State Legislative Assembly AND $\\ge 2$ Assembly seats)."
        ],
        formula: "\\text{National Party Criteria} = 6\\% \\text{ Votes in 4 States} + 4 \\text{ Lok Sabha Seats}",
        sample_question: "What are the essential functions performed by political parties in a modern democracy?",
        sample_answer: "Political parties select candidates to contest elections, formulate distinct policies and manifestos, debate and pass laws in legislatures, form and operate executive governments, act as a watchdog Opposition, and bridge citizens with government administration.",
        memory_hook: "Parties contest, govern, and oppose; Secularism protects all faiths equally."
      },
      {
        num: 10,
        title: "Development & Sectors of the Indian Economy / Money and Credit",
        concept: "HDI vs per capita income, Primary/Secondary/Tertiary economic shift, organized vs unorganized sector, formal credit vs informal moneylenders.",
        points: [
          "Development: Different people have different, sometimes conflicting developmental goals (Income, Freedom, Security, Respect).",
          "Measuring Development: World Bank uses Per Capita Income ($PCI = \\frac{\\text{Total National Income}}{\\text{Total Population}}$); UNDP Human Development Index (HDI) combines Per Capita Income, Life Expectancy at birth, and Educational Attainment (Literacy/Schooling years).",
          "Sectors of Economy: Primary (agriculture/mining), Secondary (manufacturing/factories), Tertiary (services: banking, IT, transport). Over 50 years, the Tertiary sector has emerged as the largest contributor to India's GDP, but Primary sector still employs nearly half the workforce (disguised unemployment).",
          "Organized Sector (registered, job security, fixed working hours, paid leave, PF) vs Unorganized Sector (low wages, no job security, no benefits, informal).",
          "Money & Credit: Money eliminates 'double coincidence of wants' as universal medium of exchange. Terms of Credit: Interest rate, Collateral (asset pledged as security), Documentation, and Mode of repayment.",
          "Formal Credit Sources (Banks, Cooperatives; regulated by RBI, low fair interest) vs Informal Credit Sources (Moneylenders, traders; charge exorbitant interest traps). Self-Help Groups (SHGs: 15–20 rural women pooling savings) provide collateral-free microcredit."
        ],
        formula: "\\text{HDI} = f(\\text{Per Capita Income, Life Expectancy, Mean Years of Schooling}), \\quad \\text{PCI} = \\frac{\\text{GDP}}{\\text{Population}}",
        sample_question: "Why are formal sources of credit (banks/cooperatives) preferred over informal moneylenders in rural India?",
        sample_answer: "Formal lenders charge reasonable, transparent interest rates monitored by the Reserve Bank of India (RBI), whereas informal moneylenders charge extortionate interest rates, use coercive recovery methods, and trap poor farmers in generational debt cycles.",
        memory_hook: "UNDP measures health, education, and income; RBI regulates banks; SHGs empower rural women."
      }
    ],
    "English": [
      {
        num: 1,
        title: "Unit 1: A Letter to God & Dust of Snow, Fire and Ice",
        concept: "Lencho's unshakeable faith in God and the irony of human suspicion; Robert Frost's poetic meditations on nature's healing and human destruction.",
        points: [
          "Lencho, a dedicated peasant farmer, loses his entire ripe corn harvest to a devastating hailstorm; with unshakeable faith, he writes a letter addressed directly to 'God' requesting 100 pesos.",
          "The kind postmaster and postal employees collect 70 pesos from their own salaries to preserve Lencho's faith and mail it to him signed 'God'.",
          "Irony: Lencho receives the 70 pesos, believes God could never make a mistake, and writes back asking for the remaining 30 pesos, warning God not to send it through the post office because 'the post office employees are a bunch of crooks'.",
          "Poem 'Dust of Snow' (Robert Frost): A crow shakes down snow from a poisonous hemlock tree onto the poet, instantly transforming his depressive mood and saving his day from regret.",
          "Poem 'Fire and Ice' (Robert Frost): The world could end through burning desire/greed ('Fire') or cold hatred/indifference ('Ice'); both are equally destructive.",
          "Grammar focus: Relative pronouns (who, whose, which) and metaphor analysis."
        ],
        formula: "\\text{Irony: Post office workers showed angelic charity } \\longleftrightarrow \\text{Lencho called them 'crooks'}",
        sample_question: "Explain the profound situational irony at the conclusion of 'A Letter to God'.",
        sample_answer: "The postmaster and postal workers selflessly sacrificed their own salaries to help Lencho keep his faith in God. Ironically, Lencho suspected those very benevolent workers of stealing the missing 30 pesos, calling them a 'bunch of crooks'.",
        memory_hook: "Lencho's letter asked for 100 pesos; Dust of snow saved a gloomy day; Fire = Desire, Ice = Hate."
      },
      {
        num: 2,
        title: "Unit 2: Nelson Mandela: Long Walk to Freedom & A Tiger in the Zoo",
        concept: "Nelson Mandela's historic presidential inauguration, triumph over Apartheid, twin obligations, and the captive tiger's sorrow.",
        points: [
          "On 10 May 1994, Nelson Mandela is inaugurated as South Africa's first Black President at the Union Buildings amphitheatre in Pretoria, celebrating the end of racial Apartheid.",
          "Mandela reflects that true courage is not the absence of fear, but the triumph over it. A man who takes away another man's freedom is a prisoner of hatred.",
          "Twin Obligations: Every citizen owes an obligation to his family and parents, and an obligation to his community, people, and country.",
          "Poem 'A Tiger in the Zoo' (Leslie Norris): Contrasts the fierce majesty of a wild tiger stalking in long grass near water holes to hunt deer, with the pathetic, pacing prisoner locked behind concrete zoo bars ignoring visitors.",
          "Grammar focus: Conjunctions and writing formal commemorative speeches."
        ],
        formula: "\\text{True Courage} = \\text{Triumph over fear}, \\quad \\text{Freedom is indivisible for all humans}",
        sample_question: "What are the 'twin obligations' that Nelson Mandela speaks of in his autobiography?",
        sample_answer: "1) Obligations to one's family, parents, wife, and children; 2) Obligations to one's people, community, and nation. Under Apartheid oppression, a Black South African was brutally prevented from fulfilling either obligation.",
        memory_hook: "10 May 1994 inaugurated democratic South Africa; Courage triumphs over fear; Tiger belongs in the wild."
      },
      {
        num: 3,
        title: "Unit 3: Two Stories about Flying & How to Tell Wild Animals, The Ball Poem",
        concept: "Overcoming paralysis of fear to achieve flight; mysterious black aeroplane in storm; coping with loss in poetry.",
        points: [
          "Part 1 ('His First Flight' by Liam O'Flaherty): A young seagull is terrified of flying over the vast sea; his mother starves him and tempts him with a piece of fish, forcing him to dive into open air, where his wings instinctively spread and he soars.",
          "Part 2 ('Black Aeroplane' by Frederick Forsyth): A pilot flying an old Dakota through blinding black storm clouds is guided to a safe runway by a mysterious black plane with no lights; at control tower, he discovers no other plane was in the sky.",
          "Poem 'How to Tell Wild Animals' (Carolyn Wells): Humorous guide identifying Asian Lion (roars), Bengal Tiger (black stripes on yellow ground), Leopard (leaps continuously), Hyena (laughs), Crocodile (weeps).",
          "Poem 'The Ball Poem' (John Berryman): A young boy loses his bouncing ball into the dark harbour water. The poet refuses to intrude with money for a new ball because the boy must learn the 'epistemology of loss'—that worldly possessions will be lost, and one must stand up resiliently.",
          "Grammar focus: Adverbial clauses of condition and time."
        ],
        formula: "\\text{First Flight Law: Necessity and courage conquer the fear of the unknown}",
        sample_question: "What profound life lesson does the young boy learn in John Berryman's 'The Ball Poem'?",
        sample_answer: "The boy learns the harsh reality of loss—that treasured things will slip away in a world of possessions, and money cannot replace emotional memories. He learns resilience and how to stand up after grief.",
        memory_hook: "Hunger pushed the seagull to fly; Black plane guided through storm; Ball lost teaches resilience."
      },
      {
        num: 4,
        title: "Unit 4: From the Diary of Anne Frank & Amanda!",
        concept: "Anne Frank's intimate wartime diary of Jewish life in hiding; Robin Klein's poem on adolescent escapism from parental nagging.",
        points: [
          "13-year-old Jewish girl Anne Frank names her diary 'Kitty', finding that 'paper has more patience than people' to express her inner thoughts.",
          "She describes her school life in Amsterdam, her humorous punishment essays assigned by math teacher Mr. Keesing for being a chatterbox ('A Chatterbox', 'An Incorrigible Chatterbox', 'Quack, Quack, Quack, Said Mistress Chatterbox'), winning his respect with witty poetry.",
          "The diary chronicles her family's two years of confinement in the secret annex during Nazi occupation before betrayal and death in Bergen-Belsen camp.",
          "Poem 'Amanda!' (Robin Klein): A young girl escapes her mother's endless nagging instructions ('Don't bite your nails', 'Sit up straight') into rich imaginative daydreams—fantasizing about being a tranquil mermaid in an emerald sea, an orphan walking barefoot in soft dust, and golden-haired Rapunzel in a peaceful tower.",
          "Grammar focus: Idioms, phrasal expressions, and diary writing techniques."
        ],
        formula: "\\text{Paper has more patience than people (Anne Frank)}",
        sample_question: "Why did Anne Frank decide to keep a personal diary and name it 'Kitty'?",
        sample_answer: "Anne felt that although she had loving parents and friends, she had no true confidant to share her innermost feelings with. Believing that 'paper has more patience than people', she made the diary her trusted friend and named it Kitty.",
        memory_hook: "Anne named her diary Kitty; Amanda dreamed of being a free mermaid."
      },
      {
        num: 5,
        title: "Unit 5: Glimpses of India & The Trees",
        concept: "Three vivid cultural travelogues (Goa bakers, Coorg warriors, Assam tea gardens); Adrienne Rich's feminist environmental poem.",
        points: [
          "Part 1 ('A Baker from Goa' by Lucio Rodrigues): Traditional Portuguese-era bread bakers (Paders) with their distinct bamboo thud and musical chime, wearing traditional Kabai dresses, were central to Goan village weddings (bol) and feasts.",
          "Part 2 ('Coorg' by Lokesh Abrol): Smallest district of Karnataka, land of rolling coffee estates, evergreen rainforests, spices, and fiercely independent martial people of Greek or Arab descent (wearing Kuppia robes, Kodavus permitted to carry firearms without license).",
          "Part 3 ('Tea from Assam' by Arup Kumar Dutta): Pranjol and Rajvir travel through Assam's endless sea of emerald tea bushes; Rajvir recounts legends of tea discovery: Chinese Emperor Shennong (leaves blew into boiling water) and Buddhist monk Bodhidharma (cut off eyelids to banish sleep, sprouting tea plants).",
          "Poem 'The Trees' (Adrienne Rich): Decorative indoor trees break through veranda glass, roots disengaging from floors, moving out into the empty forest to restore nature—symbolizing women breaking free from patriarchal domestic confinement.",
          "Grammar focus: Descriptive travelogue writing and figurative imagery."
        ],
        formula: "\\text{Glimpses of India: Goa (Pader Baker)} + \\text{Coorg (Coffee & Kodavus)} + \\text{Assam (Tea Legends)}",
        sample_question: "What are the two fascinating legends regarding the discovery of tea described in 'Tea from Assam'?",
        sample_answer: "1) Chinese Legend: Emperor Shennong was boiling drinking water when tea leaves from burning twigs blew into the pot, giving it a delicious flavor. 2) Indian Legend: Buddhist ascetic Bodhidharma cut off his eyelids during meditation; ten tea plants sprouted from his eyelids whose leaves banished sleep.",
        memory_hook: "Goa = Pader Bread; Coorg = Coffee & Kodavus; Assam = Tea Capital; Trees break out to forest."
      },
      {
        num: 6,
        title: "Unit 6: Mijbil the Otter & Fog, Madam Rides the Bus, Custard the Dragon",
        concept: "Gavin Maxwell's London otter pet; Valli's journey of self-discovery; Ogden Nash's parody ballad on courage.",
        points: [
          "Gavin Maxwell brings a wild otter (named Mijbil / Lutrogale perspicillata maxwelli) from Tigris marshes in Iraq to London; Mijbil loves playing with running tap water, marbles, and ping-pong balls on sloping suitcases.",
          "Poem 'Fog' (Carl Sandburg): A short 6-line haiku-like metaphor comparing silent rolling harbor fog to a cat that 'comes on little cat feet' and looks over city and harbor before moving on.",
          "'Madam Rides the Bus' (Vallikkannan): 8-year-old village girl Valli saves 60 paise, meticulously plans her first solo bus ride to town, experiences the joy of independence and the shock of seeing a running cow struck dead, learning the bittersweet reality of life and mortality.",
          "Poem 'The Tale of Custard the Dragon' (Ogden Nash): Belinda lives with Ink (kitten), Blink (mouse), Mustard (dog), and Custard (cowardly dragon crying for a nice safe cage). When a fierce pirate attacks with pistols and cutlass, all brave pets flee while cowardly Custard devours the pirate in one gulp, demonstrating that true courage acts in crisis rather than boasting.",
          "Grammar focus: Humorous ballad rhyme schemes ($AABB$) and narrative dialogue writing."
        ],
        formula: "\\text{True Bravery: Silent action in crisis (Custard)} > \\text{Boastful words in peace (Ink, Blink, Mustard)}",
        sample_question: "How did 8-year-old Valli demonstrate maturity and planning in organizing her first solo bus ride?",
        sample_answer: "Valli listened carefully to regular bus passengers, calculated the exact fare (30 paise each way), resisted tempting candy/merry-go-rounds at the village fair to save 60 paise, timed her ride for the afternoon while her mother slept, and politely refused treats from strangers.",
        memory_hook: "Mijbil the playful otter; Valli planned her bus ride; Custard the dragon ate the pirate!"
      }
    ]
  };
})();
