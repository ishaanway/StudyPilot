/* StudyPilot NCERT Chapter Summaries - Grade 9 */
(function () {
  window.NCERT_ALL_SUMMARIES = window.NCERT_ALL_SUMMARIES || {};
  window.NCERT_ALL_SUMMARIES["9"] = {
    "Mathematics": [
      {
        num: 1,
        title: "Number Systems",
        concept: "Real numbers, rational vs irrational numbers, decimal expansions, rationalising the denominator, and laws of real exponents.",
        points: [
          "Real numbers ($\\mathbb{R}$) consist of Rational numbers $\\mathbb{Q}$ ($p/q$ form, terminating or non-terminating recurring decimals) and Irrational numbers (non-terminating non-recurring decimals, e.g. $\\sqrt{2}, \\sqrt{3}, \\pi$).",
          "Every real number is represented by a unique point on the real number line (Dedekind-Cantor axiom).",
          "Rationalisation: To rationalise the denominator of $\\frac{1}{a + \\sqrt{b}}$, multiply numerator and denominator by its conjugate $(a - \\sqrt{b})$ using identity $(a+\\sqrt{b})(a-\\sqrt{b}) = a^2 - b$.",
          "Laws of Exponents for Real Numbers: $a^p \\cdot a^q = a^{p+q}$, $\\frac{a^p}{a^q} = a^{p-q}$, $(a^p)^q = a^{pq}$, $a^p b^p = (ab)^p$, $a^{-p} = \\frac{1}{a^p}$, $a^0 = 1$."
        ],
        formula: "\\frac{1}{a + \\sqrt{b}} = \\frac{a - \\sqrt{b}}{a^2 - b}, \\quad a^{p/q} = \\sqrt[q]{a^p} = (\\sqrt[q]{a})^p",
        sample_question: "Rationalise the denominator of $\\frac{1}{7 + 3\\sqrt{2}}$.",
        sample_answer: "$\\frac{1}{7 + 3\\sqrt{2}} \\times \\frac{7 - 3\\sqrt{2}}{7 - 3\\sqrt{2}} = \\frac{7 - 3\\sqrt{2}}{7^2 - (3\\sqrt{2})^2} = \\frac{7 - 3\\sqrt{2}}{49 - 18} = \\frac{7 - 3\\sqrt{2}}{31}$.",
        memory_hook: "Conjugate changes the plus to minus to eliminate the root!"
      },
      {
        num: 2,
        title: "Polynomials",
        concept: "Degrees, zeros of polynomials, Remainder Theorem, Factor Theorem, and algebraic identities.",
        points: [
          "A polynomial in one variable $x$ is $P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0$ where $n$ is a non-negative integer.",
          "A real number $k$ is a zero of polynomial $P(x)$ if $P(k) = 0$. A non-zero constant polynomial has zero degree and no zeros.",
          "Remainder Theorem: If polynomial $P(x)$ is divided by $(x - a)$, the remainder is $P(a)$.",
          "Factor Theorem: $(x - a)$ is a factor of $P(x)$ if and only if $P(a) = 0$.",
          "Standard Identities: $(x+y+z)^2 = x^2+y^2+z^2+2xy+2yz+2zx$; $(x \\pm y)^3 = x^3 \\pm y^3 \\pm 3xy(x \\pm y)$; $x^3+y^3+z^3-3xyz = (x+y+z)(x^2+y^2+z^2-xy-yz-zx)$ (if $x+y+z=0$, then $x^3+y^3+z^3 = 3xyz$)."
        ],
        formula: "x^3 + y^3 + z^3 = 3xyz \\quad \\text{if } x + y + z = 0",
        sample_question: "If $x + y + z = 0$, evaluate $28^3 + (-15)^3 + (-13)^3$ without actual cubing.",
        sample_answer: "Since $28 + (-15) + (-13) = 0$, $x^3 + y^3 + z^3 = 3xyz = 3(28)(-15)(-13) = 3 \\times 28 \\times 195 = 16,380$.",
        memory_hook: "If sum of terms is zero, sum of cubes is $3xyz$!"
      },
      {
        num: 3,
        title: "Coordinate Geometry",
        concept: "Cartesian plane, coordinate axes, four quadrants, abscissa ($x$) and ordinate ($y$), plotting points.",
        points: [
          "Cartesian coordinate system: Two perpendicular number lines intersect at Origin $O(0, 0)$—Horizontal X-axis and Vertical Y-axis.",
          "Four Quadrants: Quadrant I $(+, +)$, Quadrant II $(-, +)$, Quadrant III $(-, -)$, Quadrant IV $(+, -)$.",
          "Any point on the X-axis has coordinates $(x, 0)$ with $y = 0$; Any point on the Y-axis has coordinates $(0, y)$ with $x = 0$.",
          "Coordinates $P(x, y)$: $x$ is the Abscissa (perpendicular distance from Y-axis) and $y$ is the Ordinate (perpendicular distance from X-axis)."
        ],
        formula: "Q_1(+, +), \\quad Q_2(-, +), \\quad Q_3(-, -), \\quad Q_4(+, -), \\quad \\text{Origin } O(0, 0)",
        sample_question: "In which quadrant or on which axis do the points $(-3, 5)$, $(4, -2)$, and $(0, -7)$ lie?",
        sample_answer: "$(-3, 5)$ lies in Quadrant II; $(4, -2)$ lies in Quadrant IV; $(0, -7)$ lies on the negative Y-axis.",
        memory_hook: "Across first (Abscissa), Up/Down second (Ordinate)."
      },
      {
        num: 4,
        title: "Linear Equations in Two Variables",
        concept: "Standard form $ax + by + c = 0$, finding infinite solutions, and plotting straight line graphs.",
        points: [
          "An equation of the form $ax + by + c = 0$ ($a, b, c \\in \\mathbb{R}, a^2 + b^2 \\neq 0$) is a linear equation in two variables.",
          "A linear equation in two variables possesses infinitely many distinct ordered pair solutions $(x, y)$.",
          "The geometric graph of every linear equation in two variables is a straight line; every point on the line is a solution of the equation.",
          "Graph of $x = a$ is a line parallel to the Y-axis; Graph of $y = b$ is a line parallel to the X-axis ($y = 0$ is the X-axis, $x = 0$ is the Y-axis)."
        ],
        formula: "ax + by + c = 0, \\quad x = a \\parallel \\text{Y-axis}, \\quad y = b \\parallel \\text{X-axis}",
        sample_question: "Find four distinct solutions for the linear equation $2x + y = 7$.",
        sample_answer: "For $x = 0, y = 7 \\implies (0, 7)$; For $x = 1, y = 5 \\implies (1, 5)$; For $x = 2, y = 3 \\implies (2, 3)$; For $x = 3, y = 1 \\implies (3, 1)$.",
        memory_hook: "Every line has infinite points, and every point is a solution!"
      },
      {
        num: 5,
        title: "Introduction to Euclid's Geometry",
        concept: "Euclid's definitions, common axioms, and 5 geometric postulates (specifically the 5th Parallel Postulate).",
        points: [
          "Euclid of Alexandria organized geometry into 13 books called 'Elements'.",
          "Definitions: A point has no part; A line is breadthless length; A surface has length and breadth only.",
          "Key Axioms: Things equal to the same thing are equal to one another ($a=b, c=b \\implies a=c$); If equals are added to equals, wholes are equal; The whole is greater than the part ($A > A_{\\text{part}}$).",
          "Euclid's 5 Postulates: 1) A straight line may be drawn from any point to another point, 2) A terminated line can be produced indefinitely, 3) A circle can be drawn with any centre and radius, 4) All right angles are equal to one another ($90^\\circ = 90^\\circ$), 5) If a straight line falling on two lines makes interior angles on the same side summing to $< 180^\\circ$, the lines will meet on that side if produced indefinitely."
        ],
        formula: "\\text{Euclid's 5th Postulate: } \\angle 1 + \\angle 2 < 180^\\circ \\implies \\text{Lines Intersect}",
        sample_question: "State Euclid's Axiom regarding the comparison of a whole with its parts.",
        sample_answer: "'The whole is greater than the part.' If quantity $A$ is composed of parts $B$ and $C$ such that $A = B + C$, then $A > B$ and $A > C$.",
        memory_hook: "Axioms apply across all mathematics; Postulates apply strictly to geometry."
      },
      {
        num: 6,
        title: "Lines and Angles",
        concept: "Linear pair axiom, vertically opposite angles, parallel lines with transversals, and triangle angle sum theorem.",
        points: [
          "Linear Pair Axiom: If a ray stands on a straight line, the sum of two adjacent angles formed is $180^\\circ$.",
          "Theorem: If two lines intersect, the vertically opposite angles are equal ($\\angle 1 = \\angle 3$).",
          "Parallel Lines intersected by Transversal: Corresponding angles are equal; Alternate interior angles are equal; Interior angles on the same side of the transversal sum to $180^\\circ$ (co-interior angles).",
          "Lines parallel to the same line are parallel to each other ($l \\parallel m, m \\parallel n \\implies l \\parallel n$).",
          "Angle Sum Property of Triangle: Sum of all three angles is $180^\\circ$. Exterior angle of a triangle equals the sum of its two interior opposite angles."
        ],
        formula: "\\angle 1 + \\angle 2 = 180^\\circ, \\quad \\angle_{\\text{alt int}} = \\text{Equal}, \\quad \\angle A + \\angle B + \\angle C = 180^\\circ",
        sample_question: "In $\\Delta ABC$, if $\\angle A = 50^\\circ$ and $\\angle B = 60^\\circ$, find the exterior angle at vertex $C$.",
        sample_answer: "Exterior angle $= \\angle A + \\angle B = 50^\\circ + 60^\\circ = 110^\\circ$.",
        memory_hook: "Z-angles are alternate and equal; F-angles are corresponding and equal; C-angles add to 180°."
      },
      {
        num: 7,
        title: "Triangles",
        concept: "Triangle congruence criteria (SAS, ASA, AAS, SSS, RHS), isosceles triangle theorems, and triangle inequalities.",
        points: [
          "Congruence Criteria: SAS (Side-Angle-Side), ASA (Angle-Side-Angle), AAS (Angle-Angle-Side), SSS (Side-Side-Side), RHS (Right angle-Hypotenuse-Side).",
          "CPCTC: Corresponding Parts of Congruent Triangles are Congruent.",
          "Isosceles Triangle Theorem: Angles opposite to equal sides of an isosceles triangle are equal ($AB = AC \\implies \\angle C = \\angle B$). Converse is also true.",
          "Triangle Inequalities: In any triangle, the angle opposite the longer side is larger ($a > b \\implies \\angle A > \\angle B$); The sum of any two sides is greater than the third side ($a + b > c$)."
        ],
        formula: "\\Delta ABC \\cong \\Delta PQR \\implies \\text{CPCTC (All corresponding sides & angles equal)}",
        sample_question: "Prove that the angles opposite to equal sides of an isosceles triangle are equal.",
        sample_answer: "In $\\Delta ABC$ with $AB = AC$, draw angle bisector $AD$ of $\\angle A$ meeting $BC$ at $D$. In $\\Delta ABD$ and $\\Delta ACD$: $AB = AC$ (given), $\\angle BAD = \\angle CAD$ (by construction), $AD = AD$ (common). By SAS congruence, $\\Delta ABD \\cong \\Delta ACD$. By CPCTC, $\\angle B = \\angle C$.",
        memory_hook: "Equal sides $\\implies$ Equal opposite angles; CPCTC seals the proof!"
      },
      {
        num: 8,
        title: "Quadrilaterals",
        concept: "Properties of parallelograms, diagonal bisectors, Mid-Point Theorem, and its converse.",
        points: [
          "Sum of all four interior angles of a quadrilateral is $360^\\circ$.",
          "A quadrilateral is a parallelogram if: 1) Opposite sides are equal, 2) Opposite angles are equal, 3) Diagonals bisect each other, OR 4) A pair of opposite sides is equal and parallel.",
          "A diagonal divides a parallelogram into two congruent triangles.",
          "Mid-Point Theorem: The line segment joining the midpoints of any two sides of a triangle is parallel to the third side and equal to half of it ($DE \\parallel BC$ and $DE = \\frac{1}{2}BC$).",
          "Converse of Mid-Point Theorem: A line drawn through the midpoint of one side of a triangle parallel to another side bisects the third side."
        ],
        formula: "\\text{Mid-Point Theorem: } DE \\parallel BC \\quad \\text{and} \\quad DE = \\frac{1}{2}BC",
        sample_question: "In $\\Delta ABC$, $D$ and $E$ are midpoints of $AB$ and $AC$. If $BC = 12\\text{ cm}$, find the length of $DE$.",
        sample_answer: "By the Mid-Point Theorem, $DE = \\frac{1}{2}BC = \\frac{1}{2}(12\\text{ cm}) = 6\\text{ cm}$.",
        memory_hook: "Midpoint joiner is parallel and exactly half the third side!"
      },
      {
        num: 9,
        title: "Circles",
        concept: "Chords, perpendicular from centre, subtended angles, cyclic quadrilaterals, and angle in a semicircle.",
        points: [
          "Equal chords of a circle subtend equal angles at the centre, and are equidistant from the centre.",
          "The perpendicular drawn from the centre of a circle to a chord bisects the chord ($OM \\perp AB \\implies AM = MB$).",
          "There is one and only one circle passing through three given non-collinear points.",
          "The angle subtended by an arc at the centre is double the angle subtended by it at any point on the remaining circumference ($\\angle AOB = 2\\angle APB$).",
          "Angles in the same segment of a circle are equal ($\\angle APB = \\angle AQB$). Angle in a semicircle is a right angle ($90^\\circ$).",
          "Cyclic Quadrilateral: All four vertices lie on a circle. The sum of either pair of opposite angles is $180^\\circ$ ($\\angle A + \\angle C = 180^\\circ$)."
        ],
        formula: "\\angle AOB = 2\\angle APB, \\quad \\angle_{\\text{semicircle}} = 90^\\circ, \\quad \\angle A + \\angle C = 180^\\circ \\text{ (Cyclic Quad)}",
        sample_question: "In a cyclic quadrilateral $ABCD$, if $\\angle A = 70^\\circ$, find the measure of opposite angle $\\angle C$.",
        sample_answer: "In a cyclic quadrilateral, opposite angles are supplementary: $\\angle A + \\angle C = 180^\\circ \\implies 70^\\circ + \\angle C = 180^\\circ \\implies \\angle C = 110^\\circ$.",
        memory_hook: "Centre angle is double circumference angle; Cyclic opposites add to 180°."
      },
      {
        num: 10,
        title: "Heron's Formula",
        concept: "Calculation of triangle areas from three given side lengths without height, semi-perimeter $s$, and applications.",
        points: [
          "When all three side lengths $a, b, c$ of a triangle are known, Heron's Formula calculates the area directly.",
          "Step 1: Calculate Semi-perimeter: $s = \\frac{a + b + c}{2}$.",
          "Step 2: Apply Heron's Area Formula: $\\text{Area} = \\sqrt{s(s - a)(s - b)(s - c)}$.",
          "For an Equilateral Triangle with side $a$: $s = \\frac{3a}{2} \\implies \\text{Area} = \\frac{\\sqrt{3}}{4}a^2$.",
          "Applied to find areas of quadrilaterals by dividing them into two triangles with a known diagonal."
        ],
        formula: "s = \\frac{a+b+c}{2}, \\quad \\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}, \\quad A_{\\text{equilateral}} = \\frac{\\sqrt{3}}{4}a^2",
        sample_question: "Find the area of a triangle with sides $a = 13\\text{ cm}, b = 14\\text{ cm}, c = 15\\text{ cm}$.",
        sample_answer: "$s = \\frac{13+14+15}{2} = 21\\text{ cm}$. $\\text{Area} = \\sqrt{21(21-13)(21-14)(21-15)} = \\sqrt{21 \\times 8 \\times 7 \\times 6} = \\sqrt{7056} = 84\\text{ cm}^2$.",
        memory_hook: "Half the perimeter is $s$; Multiply $(s-a)(s-b)(s-c)$, times $s$, then square root!"
      },
      {
        num: 11,
        title: "Surface Areas and Volumes",
        concept: "Surface areas and volumes of 3D curved solids: Right circular cones, Spheres, and Hemispheres.",
        points: [
          "Right Circular Cone ($r$ = radius, $h$ = vertical height, $l = \\sqrt{r^2 + h^2}$ = slant height): Curved Surface Area $= \\pi rl$; Total Surface Area $= \\pi r(l + r)$; Volume $= \\frac{1}{3}\\pi r^2 h$.",
          "Sphere (radius $r$): Surface Area $= 4\\pi r^2$; Volume $= \\frac{4}{3}\\pi r^3$.",
          "Hemisphere (radius $r$): Curved Surface Area $= 2\\pi r^2$; Total Surface Area $= 3\\pi r^2$; Volume $= \\frac{2}{3}\\pi r^3$.",
          "Relation: The volume of a cone is exactly $\\frac{1}{3}$ the volume of a cylinder of the same radius and height."
        ],
        formula: "l = \\sqrt{r^2+h^2}, \\quad V_{\\text{cone}} = \\frac{1}{3}\\pi r^2 h, \\quad SA_{\\text{sphere}} = 4\\pi r^2, \\quad V_{\\text{sphere}} = \\frac{4}{3}\\pi r^3",
        sample_question: "Find the total surface area and volume of a hemisphere of radius $r = 21\\text{ cm}$ (use $\\pi = 22/7$).",
        sample_answer: "$\\text{TSA} = 3\\pi r^2 = 3 \\times \\frac{22}{7} \\times 21^2 = 3 \\times 22 \\times 63 = 4,158\\text{ cm}^2$. $\\text{Volume} = \\frac{2}{3}\\pi r^3 = \\frac{2}{3} \\times \\frac{22}{7} \\times 21^3 = 19,404\\text{ cm}^3$.",
        memory_hook: "Hemisphere TSA $= 3\\pi r^2$ (curved $2\\pi r^2$ + top circle $\\pi r^2$); Sphere SA $= 4\\pi r^2$."
      },
      {
        num: 12,
        title: "Statistics",
        concept: "Bar charts, histograms with uniform and varying class widths, frequency polygons, measures of central tendency for ungrouped data.",
        points: [
          "Histogram with varying class widths: Adjusted frequency (height of rectangle) $= \\frac{\\text{Frequency of Class}}{\\text{Class Width}} \\times \\text{Minimum Class Width}$.",
          "Frequency Polygon: Formed by joining the midpoints (class marks $x_i = \\frac{\\text{Upper Limit} + \\text{Lower Limit}}{2}$) of histogram bars with straight lines.",
          "Mean of ungrouped data: $\\bar{x} = \\frac{\\sum x_i}{n}$.",
          "Median of ungrouped data: Arrange in ascending order. If $n$ is odd, Median $= \\left(\\frac{n+1}{2}\\right)^{\\text{th}}$ observation; If $n$ is even, Median $= \\text{Mean of } \\left(\\frac{n}{2}\\right)^{\\text{th}} \\text{ and } \\left(\\frac{n}{2} + 1\\right)^{\\text{th}}$ observations.",
          "Mode is the most frequently occurring value in the dataset."
        ],
        formula: "\\bar{x} = \\frac{\\sum x_i}{n}, \\quad x_i = \\frac{\\text{Upper} + \\text{Lower}}{2}, \\quad \\text{Median (even } n) = \\frac{x_{n/2} + x_{n/2+1}}{2}",
        sample_question: "Find the median of the 8 scores: 15, 6, 8, 12, 10, 9, 14, 11.",
        sample_answer: "Arrange in ascending order: 6, 8, 9, 10, 11, 12, 14, 15 ($n = 8$, even). 4th term $= 10$, 5th term $= 11$. $\\text{Median} = \\frac{10 + 11}{2} = 10.5$.",
        memory_hook: "Class mark is the midpoint; Even $n$ takes average of two middle terms!"
      }
    ],
    "Science": [
      {
        num: 1,
        title: "Matter in Our Surroundings",
        concept: "Kinetic particle theory of matter, states of matter, latent heat of fusion/vaporization, sublimation, and evaporation factors.",
        points: [
          "Matter is composed of particulate particles possessing mass and volume. Particles have spaces between them, attract each other, and move continuously with kinetic energy proportional to temperature.",
          "Three states: Solids (definite shape & volume, negligible compressibility), Liquids (fixed volume, variable shape), Gases (no fixed shape or volume, high compressibility like CNG/LPG).",
          "Latent Heat of Fusion: Heat required to change $1\\text{ kg}$ of solid into liquid at atmospheric pressure at its melting point ($3.34 \\times 10^5\\text{ J/kg}$ for ice at $0^\\circ\\text{C}$).",
          "Latent Heat of Vaporization: Heat required to change $1\\text{ kg}$ of liquid into vapor at its boiling point (steam at $100^\\circ\\text{C}$ causes more severe burns than boiling water at $100^\\circ\\text{C}$ due to extra latent heat).",
          "Sublimation: Direct transition from solid to gas without entering liquid phase (Camphor, Ammonium Chloride, Dry Ice / solid $\\text{CO}_2$).",
          "Evaporation is a surface phenomenon occurring below boiling point; rate increases with higher surface area, temperature, wind speed, and lower humidity, causing a cooling effect (sweating, earthen pots)."
        ],
        formula: "\\text{Kelvin} = ^\\circ\\text{C} + 273.15, \\quad \\text{Steam burns worse than boiling water due to Latent Heat } L_v",
        sample_question: "Why does water kept in an earthen pot (matka) become pleasantly cool during hot summer days?",
        sample_answer: "The porous walls of the earthen pot have microscopic pores through which water continuously seeps to the outer surface. This water evaporates, absorbing latent heat of vaporization from the remaining water inside, cooling it down.",
        memory_hook: "Steam has bonus Latent Heat; Evaporation cools by stealing heat!"
      },
      {
        num: 2,
        title: "Is Matter Around Us Pure",
        concept: "Mixtures vs pure substances, true solutions, suspensions, colloids, Tyndall effect, and chemical concentration.",
        points: [
          "Pure Substance: Single type of particles with uniform chemical composition (Elements like Iron, Gold; Compounds like $\\text{H}_2\\text{O}, \\text{NaCl}$).",
          "Mixtures: Contain two or more substances in variable proportions. Homogeneous (uniform composition throughout, e.g. salt solution, brass alloy) vs Heterogeneous (non-uniform, e.g. sand in water, oil-water emulsion).",
          "True Solution: Homogeneous mixture with particle size $< 1\\text{ nm}$ ($10^{-9}\\text{ m}$); transparent, does not scatter light, passes through filter paper.",
          "Colloid: Heterogeneous mixture with particle size between $1\\text{ nm}$ and $1000\\text{ nm}$ (milk, fog, blood, smoke); scatters visible light beams (Tyndall Effect); stable.",
          "Suspension: Heterogeneous mixture with large visible particles $> 1000\\text{ nm}$ that settle upon standing (chalk in water, muddy pond water).",
          "Concentration of Solution: $\\text{Mass } \\% = \\frac{\\text{Mass of Solute}}{\\text{Mass of Solution}} \\times 100$."
        ],
        formula: "\\text{Concentration } (w/w\\%) = \\frac{\\text{Mass of Solute}}{\\text{Mass of Solute} + \\text{Mass of Solvent}} \\times 100",
        sample_question: "Calculate the concentration in mass percentage of a solution containing $40\\text{ g}$ of common salt in $320\\text{ g}$ of water.",
        sample_answer: "$\\text{Mass of Solute} = 40\\text{ g}$, $\\text{Mass of Solution} = 40 + 320 = 360\\text{ g}$. $\\text{Concentration} = \\frac{40}{360} \\times 100 = \\frac{100}{9} = 11.1\\%$.",
        memory_hook: "True solution $<1\\text{ nm}$; Colloid $1-1000\\text{ nm}$ (Tyndall beam); Suspension $>1000\\text{ nm}$ (settles)."
      },
      {
        num: 3,
        title: "Atoms and Molecules",
        concept: "Laws of chemical combination, Dalton's atomic theory, atomic mass unit ($u$), criss-cross valency formula writing, and mole concept.",
        points: [
          "Law of Conservation of Mass (Antoine Lavoisier): Mass can neither be created nor destroyed in a chemical reaction ($M_{\\text{reactants}} = M_{\\text{products}}$).",
          "Law of Constant Proportions (Joseph Proust): In a chemical substance, elements are always present in definite proportions by mass (water $\\text{H}_2\\text{O}$ is always $1:8$ by mass of $\\text{H}:\\text{O}$).",
          "Dalton's Atomic Theory: All matter consists of indivisible atoms of an element having identical mass and chemical properties.",
          "Atomic Mass Unit ($1\\text{ u}$): Exactly $\\frac{1}{12}^{\\text{th}}$ the mass of one Carbon-12 atom.",
          "Writing Formulae: Balance charges/valencies using criss-cross method (Aluminium Oxide: $\\text{Al}^{3+}$ and $\\text{O}^{2-} \\implies \\text{Al}_2\\text{O}_3$; Calcium Hydroxide: $\\text{Ca}^{2+}$ and $\\text{OH}^- \\implies \\text{Ca(OH)}_2$).",
          "Mole Concept: $1\\text{ mole} = 6.022 \\times 10^{23}$ particles (Avogadro's Number, $N_A$); Mass of 1 mole of atoms equals its atomic mass in grams (Molar Mass)."
        ],
        formula: "n = \\frac{m}{M} = \\frac{N}{N_A}, \\quad N_A = 6.022 \\times 10^{23} \\text{ particles/mol}, \\quad 1\\text{ u} = \\frac{1}{12} m(^{12}\\text{C})",
        sample_question: "Calculate the number of moles and molecules present in $36\\text{ g}$ of pure water ($\\text{H}_2\\text{O}$).",
        sample_answer: "Molar mass of $\\text{H}_2\\text{O} = 2(1) + 16 = 18\\text{ g/mol}$. Number of moles $n = \\frac{36}{18} = 2\\text{ moles}$. Number of molecules $= 2 \\times 6.022 \\times 10^{23} = 1.2044 \\times 10^{24}$ molecules.",
        memory_hook: "Criss-cross valencies to write formula; 1 mole = $6.022 \\times 10^{23}$ (Avogadro's constant)."
      },
      {
        num: 4,
        title: "Structure of the Atom",
        concept: "Subatomic particles ($p^+, e^-, n^0$), Thomson/Rutherford/Bohr atomic models, electron orbits ($2n^2$), valency, isotopes, and isobars.",
        points: [
          "Subatomic particles: Electron ($e^-$, discovered by J.J. Thomson in cathode rays, $-1.6 \\times 10^{-19}\\text{ C}$), Proton ($p^+$, E. Goldstein in canal rays, $+1.6 \\times 10^{-19}\\text{ C}$), Neutron ($n^0$, J. Chadwick in 1932, neutral mass $\\approx p^+$).",
          "Thomson's Plum Pudding Model: Positively charged sphere with electrons embedded like raisins in pudding.",
          "Rutherford's Alpha-Particle Scattering Experiment: Bombarded gold foil with $\\alpha$-particles ($^4\\text{He}^{2+}$); most passed straight through, few deflected, 1 in 12,000 rebounded $180^\\circ$, concluding that a tiny, dense, positively charged Nucleus exists at the centre.",
          "Bohr's Model: Electrons revolve in discrete energy levels / shells ($K, L, M, N$ with maximum capacity $2n^2$: 2, 8, 18, 32); do not radiate energy while in stable orbits.",
          "Atomic Number ($Z$) $= \\text{Number of protons}$; Mass Number ($A$) $= \\text{Protons} + \\text{Neutrons}$.",
          "Isotopes: Atoms of same element having same $Z$ but different $A$ ($^1_1\\text{H}, ^2_1\\text{H}, ^3_1\\text{H}$; $^{35}_{17}\\text{Cl}, ^{37}_{17}\\text{Cl}$); Isobars: Atoms of different elements with same $A$ but different $Z$ ($^{40}_{18}\\text{Ar}$ and $^{40}_{20}\\text{Ca}$)."
        ],
        formula: "\\text{Max electrons per shell } = 2n^2, \\quad A = Z + N, \\quad \\text{Avg Mass } = \\sum (\\% \\times M_i)",
        sample_question: "An element $X$ has atomic number $Z = 12$ and mass number $A = 24$. Write its electronic configuration, valency, and name.",
        sample_answer: "Electrons $= 12$. Electronic configuration: $K=2, L=8, M=2$. It donates 2 valence electrons, so its Valency is 2. The element is Magnesium (Mg).",
        memory_hook: "Bohr shells fill $2, 8, 18, 32$; Isotopes = Same element, different weight."
      },
      {
        num: 5,
        title: "The Fundamental Unit of Life",
        concept: "Cell theory, prokaryotic vs eukaryotic cells, plasma membrane osmosis, nucleus, and organelles (mitochondria, chloroplasts, lysosomes).",
        points: [
          "Robert Hooke discovered cells in cork (1665); Leeuwenhoek observed free living cells; Schleiden and Schwann proposed Cell Theory; Virchow added 'Omnis cellula e cellula' (all cells arise from pre-existing cells).",
          "Plasma Membrane: Flexible lipid-protein bilayer; selectively permeable. Osmosis is the diffusion of water across a semipermeable membrane (Hypotonic solution $\\to$ cell swells/endosmosis; Hypertonic solution $\\to$ cell shrinks/plasmolysis).",
          "Prokaryotes (bacteria, lack membrane-bound nucleus and organelles, single circular chromosome in nucleoid) vs Eukaryotes (plants/animals, true nucleus with nuclear envelope).",
          "Mitochondria: 'Powerhouse of the cell'; possesses its own DNA and ribosomes; generates ATP (Adenosine Triphosphate) via cellular respiration.",
          "Plastids: Chloroplasts (green chlorophyll for photosynthesis), Chromoplasts (coloured pigments in flowers/fruits), Leucoplasts (colourless storage of starch/proteins).",
          "Lysosomes: 'Suicidal bags of the cell' containing powerful digestive enzymes; Endoplasmic Reticulum (RER with ribosomes synthesizes proteins; SER synthesizes lipids/detoxifies drugs); Golgi Apparatus packages macromolecules."
        ],
        formula: "\\text{ATP} = \\text{Adenosine Triphosphate (Universal Cellular Energy Currency)}",
        sample_question: "Why are lysosomes called the 'suicide bags' of a cell?",
        sample_answer: "When a cell suffers metabolic damage or infection, lysosomes may burst and their powerful hydrolytic digestive enzymes digest and destroy their own host cell.",
        memory_hook: "Mitochondria = Powerhouse (ATP); Lysosomes = Suicide bags; Chloroplast = Food factory."
      },
      {
        num: 6,
        title: "Tissues",
        concept: "Plant tissues (meristematic vs permanent) and animal tissues (epithelial, connective, muscular, nervous).",
        points: [
          "A tissue is a cluster of similar cells performing a specialized physiological function with common origin.",
          "Plant Meristematic Tissues: Actively dividing cells—Apical (root/stem tip growth in length), Intercalary (internode growth in grasses), Lateral/Cambium (girth/thickness growth).",
          "Plant Permanent Tissues: Simple (Parenchyma stores food, Chlorenchyma photosynthesizes, Aerenchyma provides buoyancy, Collenchyma provides flexibility, Sclerenchyma with lignin gives hardness in coconut husk) and Complex (Xylem transports water/minerals with tracheids, vessels, xylem parenchyma/fibres; Phloem transports sugars with sieve tubes, companion cells).",
          "Animal Epithelial Tissue: Protective barrier—Squamous (diffusion in alveoli), Cuboidal (kidney tubules), Columnar (ciliated in respiratory tract), Stratified (skin).",
          "Animal Connective Tissue: Blood (plasma fluid matrix with RBCs, WBCs, platelets), Bone (hard calcium-phosphorus matrix), Cartilage (smooth joints in nose/ear), Ligaments (connect Bone to Bone), Tendons (connect Muscle to Bone), Areolar, Adipose (fat storage/insulation).",
          "Nervous Tissue: Neurons consisting of Cyton/Cell body, Dendrites (receive signals), and long Axon with Myelin sheath transmitting electrical nerve impulses."
        ],
        formula: "\\text{Ligament} = \\text{Bone to Bone}, \\quad \\text{Tendon} = \\text{Muscle to Bone}",
        sample_question: "Differentiate between tendon and ligament connective tissues.",
        sample_answer: "Tendons are tough, inelastic, fibrous cords that connect skeletal muscles to bones; Ligaments are highly elastic, flexible tissues with great strength that connect bone to bone at joints.",
        memory_hook: "B-B-L: Bone to Bone is Ligament; M-T-B: Muscle to Bone is Tendon."
      },
      {
        num: 7,
        title: "Motion",
        concept: "Distance vs displacement, speed, velocity, acceleration, kinematic equations, and distance-time/velocity-time graphs.",
        points: [
          "Distance is scalar (actual path length, always positive); Displacement is vector (shortest straight-line distance from initial to final position; can be zero, positive, or negative).",
          "Speed is scalar ($\\text{Distance}/\\text{Time}$); Velocity is vector ($\\text{Displacement}/\\text{Time}$).",
          "Acceleration is the rate of change of velocity: $a = \\frac{v - u}{t}$ (SI unit is $\\text{m/s}^2$). Negative acceleration is Retardation / Deceleration.",
          "Three Equations of Uniformly Accelerated Motion: 1) $v = u + at$, 2) $s = ut + \\frac{1}{2}at^2$, 3) $v^2 = u^2 + 2as$.",
          "Graphical Analysis: Slope of Distance-Time ($s-t$) graph gives Speed; Slope of Velocity-Time ($v-t$) graph gives Acceleration; Area under $v-t$ graph gives Total Distance/Displacement.",
          "Uniform Circular Motion: Speed is constant ($v = \\frac{2\\pi r}{T}$), but direction changes continuously, meaning it is an accelerated motion directed toward the centre (Centripetal acceleration)."
        ],
        formula: "v = u + at, \\quad s = ut + \\frac{1}{2}at^2, \\quad v^2 = u^2 + 2as, \\quad v_{\\text{circ}} = \\frac{2\\pi r}{T}",
        sample_question: "A racing car starts from rest and accelerates uniformly at $4\\text{ m/s}^2$. What distance will it cover in $10\\text{ seconds}$?",
        sample_answer: "$u = 0$, $a = 4\\text{ m/s}^2$, $t = 10\\text{ s}$. Using $s = ut + \\frac{1}{2}at^2$: $s = 0(10) + \\frac{1}{2}(4)(10^2) = 2 \\times 100 = 200\\text{ metres}$.",
        memory_hook: "Slope of v-t gives acceleration; Area under v-t gives displacement!"
      },
      {
        num: 8,
        title: "Force and Laws of Motion",
        concept: "Newton's three laws of motion, inertia, linear momentum ($p=mv$), force derivation ($F=ma$), and conservation of momentum.",
        points: [
          "Newton's First Law (Law of Inertia): An object continues in its state of rest or uniform motion in a straight line unless acted upon by an unbalanced external force. Inertia is measured by mass (heavier mass $=$ greater inertia).",
          "Momentum ($p$): Product of mass and velocity ($p = mv$, vector quantity, SI unit $\\text{kg}\\cdot\\text{m/s}$).",
          "Newton's Second Law of Motion: The rate of change of momentum of an object is directly proportional to the applied unbalanced force in the direction of force: $F = \\frac{\\Delta p}{\\Delta t} = m \\frac{v - u}{t} = ma$ (SI unit Newton, $1\\text{ N} = 1\\text{ kg}\\cdot\\text{m/s}^2$).",
          "Impulse: Force $\\times$ Time $= \\Delta p$. A cricket fielder pulls his hands backward to increase time $\\Delta t$, reducing impact force $F$.",
          "Newton's Third Law: To every action, there is always an equal and opposite reaction ($F_{AB} = -F_{BA}$); action and reaction act on two DIFFERENT objects simultaneously.",
          "Law of Conservation of Linear Momentum: In an isolated system with no external force, total initial momentum equals total final momentum ($m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$)."
        ],
        formula: "F = ma, \\quad p = mv, \\quad F_{AB} = -F_{BA}, \\quad m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2",
        sample_question: "A bullet of mass $20\\text{ g}$ is fired horizontally with a velocity of $150\\text{ m/s}$ from a pistol of mass $2\\text{ kg}$. Calculate the recoil velocity of the pistol.",
        sample_answer: "By conservation of momentum: $m_1 v_1 + m_2 v_2 = 0 \\implies (0.02\\text{ kg})(150) + (2\\text{ kg})v_2 = 0 \\implies 3 + 2v_2 = 0 \\implies v_2 = -1.5\\text{ m/s}$ (recoils backward at $1.5\\text{ m/s}$).",
        memory_hook: "1st: Inertia; 2nd: $F=ma$; 3rd: Action = -Reaction; Momentum is never lost!"
      },
      {
        num: 9,
        title: "Gravitation",
        concept: "Universal Law of Gravitation, free fall, acceleration due to gravity ($g=9.8\\text{ m/s}^2$), mass vs weight, Archimedes' Principle, and buoyancy.",
        points: [
          "Universal Law of Gravitation (Isaac Newton): Every object in the universe attracts every other object with a force proportional to the product of their masses and inversely proportional to the square of the distance between them: $F = G \\frac{m_1 m_2}{r^2}$ ($G = 6.673 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$).",
          "Acceleration due to Gravity ($g$): Gravitational acceleration near Earth's surface $g = \\frac{GM}{R^2} \\approx 9.8\\text{ m/s}^2$ (independent of falling object's mass). Value is slightly higher at poles than equator because Earth is flattened at poles ($R_{\\text{pole}} < R_{\\text{equator}}$).",
          "Mass is the constant measure of matter in a body (scalar, $\\text{kg}$); Weight is the gravitational force acting on it ($W = mg$, vector, $\\text{N}$). On the Moon, gravity is $\\frac{1}{6}^{\\text{th}}$ of Earth, so $W_{\\text{moon}} = \\frac{1}{6} W_{\\text{earth}}$.",
          "Archimedes' Principle: When a body is immersed fully or partially in a fluid, it experiences an upward buoyant force equal to the weight of the fluid displaced by it ($F_{\\text{buoyant}} = \\rho_{\\text{fluid}} V_{\\text{displaced}} g$).",
          "Relative Density: $\\text{Relative Density} = \\frac{\\text{Density of Substance}}{\\text{Density of Water at } 4^\\circ\\text{C}}$ (unitless ratio; if $>1$, substance sinks in water; if $<1$, it floats)."
        ],
        formula: "F = G\\frac{M m}{R^2}, \\quad g = \\frac{GM}{R^2} = 9.8\\text{ m/s}^2, \\quad W = mg, \\quad W_{\\text{moon}} = \\frac{1}{6}W_{\\text{earth}}",
        sample_question: "An object has a mass of $60\\text{ kg}$ on Earth. What will be its mass and weight on the Moon? (Take $g = 10\\text{ m/s}^2$).",
        sample_answer: "Mass remains constant everywhere $= 60\\text{ kg}$. Weight on Earth $W = mg = 60 \\times 10 = 600\\text{ N}$. Weight on Moon $W_{\\text{moon}} = \\frac{1}{6} \\times 600 = 100\\text{ N}$.",
        memory_hook: "Mass stays constant everywhere; Weight changes with gravity ($W=mg$); Archimedes upthrust = Displaced fluid weight."
      },
      {
        num: 10,
        title: "Work and Energy",
        concept: "Work done ($W=F s \\cos\\theta$), Kinetic Energy ($E_k=\\frac{1}{2}mv^2$), Potential Energy ($E_p=mgh$), Law of Conservation of Energy, and Power in Watts.",
        points: [
          "Scientific definition of Work: Work is done only when a force produces displacement along the line of action ($W = F \\times s$, SI unit Joule, $1\\text{ J} = 1\\text{ N}\\cdot\\text{m}$). Positive work when displacement is along force; Negative work when opposing force (friction); Zero work when force is perpendicular to displacement (carrying load on head horizontally, $\\cos 90^\\circ = 0$).",
          "Kinetic Energy ($E_k$): Energy possessed by an object due to its motion: $E_k = \\frac{1}{2}mv^2$. Work-Energy Theorem states that Net Work Done equals change in kinetic energy ($W = \\Delta E_k = \\frac{1}{2}mv^2 - \\frac{1}{2}mu^2$).",
          "Gravitational Potential Energy ($E_p$): Energy stored due to elevation height: $E_p = mgh$.",
          "Law of Conservation of Energy: Energy can neither be created nor destroyed; it only transforms from one form to another. Total mechanical energy remains constant in a free fall ($E_k + E_p = \\text{Constant}$).",
          "Power: Rate of doing work: $P = \\frac{W}{t}$ (SI unit Watt, $1\\text{ W} = 1\\text{ J/s}$; $1\\text{ kW} = 1000\\text{ W}$; $1\\text{ Horsepower} = 746\\text{ W}$).",
          "Commercial Unit of Electrical Energy: $1\\text{ Kilowatt-hour (kWh)} = 1\\text{ Unit} = 1000\\text{ W} \\times 3600\\text{ s} = 3.6 \\times 10^6\\text{ Joules}$."
        ],
        formula: "W = F \\cdot s, \\quad E_k = \\frac{1}{2}mv^2, \\quad E_p = mgh, \\quad P = \\frac{W}{t}, \\quad 1\\text{ kWh} = 3.6 \\times 10^6\\text{ J}",
        sample_question: "Calculate the electrical energy in units (kWh) consumed in 30 days by a $1000\\text{ W}$ heater operated for $5\\text{ hours}$ daily.",
        sample_answer: "Power $= 1\\text{ kW}$. Energy per day $= 1\\text{ kW} \\times 5\\text{ h} = 5\\text{ kWh}$. Energy in 30 days $= 5 \\times 30 = 150\\text{ kWh} = 150\\text{ units}$.",
        memory_hook: "Kinetic $= \\frac{1}{2}mv^2$; Potential $= mgh$; $1\\text{ kWh} = 3.6\\text{ MJ}$."
      },
      {
        num: 11,
        title: "Sound",
        concept: "Longitudinal sound waves (compressions/rarefactions), wave equation ($v=\\nu\\lambda$), echo calculation ($2d=vt$), reverberation, ultrasound, and human ear anatomy.",
        points: [
          "Sound propagates as a mechanical longitudinal wave creating alternating regions of high pressure/density (Compressions, $C$) and low pressure/density (Rarefactions, $R$).",
          "Wave Parameters: Wavelength ($\\lambda$, distance between consecutive compressions), Frequency ($\\nu$, cycles/sec in $\\text{Hz}$), Time Period ($T = 1/\\nu$), Wave Speed ($v = \\nu \\lambda$).",
          "Reflection of Sound: Sound reflects following laws of reflection. Echo: Reflected sound heard distinctly from original sound. To hear a distinct echo in air (at $22^\\circ\\text{C}, v = 344\\text{ m/s}$), the minimum distance to the reflecting obstacle must be $d = \\frac{v \\times 0.1\\text{ s}}{2} = 17.2\\text{ metres}$.",
          "Reverberation: Persistence of sound due to repeated multiple reflections in an enclosed hall; reduced by using sound-absorbing materials (curtains, compressed fibreboard, upholstered seats).",
          "Ultrasound ($>20\\text{ kHz}$): Used in Echocardiography (ECG), Ultrasonography (foetal monitoring), cleaning delicate engine parts, and SONAR (Sound Navigation and Ranging, measuring ocean depth: $2d = vt$).",
          "Human Ear Anatomy: Outer Ear (Pinna collects sound $\\to$ Auditory canal $\\to$ Eardrum/Tympanum), Middle Ear (three bones: Malleus/Hammer, Incus/Anvil, Stapes/Stirrup amplify vibrations), Inner Ear (Cochlea converts pressure waves into electrical nerve impulses sent to brain via auditory nerve)."
        ],
        formula: "v = \\nu \\lambda, \\quad 2d = v \\cdot t \\text{ (Echo / SONAR)}, \\quad d_{\\text{min, echo}} = 17.2\\text{ m}",
        sample_question: "A SONAR device on a submarine sends out an ultrasonic pulse and receives the echo from the ocean floor after $3\\text{ seconds}$. If the speed of sound in seawater is $1530\\text{ m/s}$, calculate the ocean depth.",
        sample_answer: "$2d = v \\times t \\implies 2d = 1530 \\times 3 = 4590 \\implies d = \\frac{4590}{2} = 2,295\\text{ metres}$.",
        memory_hook: "$v = \\nu \\lambda$; Echo needs $17.2\\text{ m}$; SONAR sends ultrasound down and back ($2d = vt$)."
      },
      {
        num: 12,
        title: "Improvement in Food Resources",
        concept: "Crop variety improvement (hybridisation/genetics), plant nutrition (macro/micronutrients), manure vs fertilisers, cropping patterns, and animal husbandry.",
        points: [
          "Crop Variety Improvement: Developing high-yield, disease-resistant, climate-resilient crop varieties through Hybridisation (cross-breeding genetically dissimilar plants) or Genetic Modification.",
          "Crop Nutrient Management: Plants require 16 essential nutrients: From Air (C, O), Water (H, O), Soil Macronutrients (N, P, K, Ca, Mg, S - needed in large amounts), Soil Micronutrients (Fe, Mn, B, Zn, Cu, Mo, Cl - needed in trace amounts).",
          "Manure (Compost, Vermicompost using earthworms, Green manure) enriches soil humus without pollution; Chemical Fertilisers provide instant high NPK but cause soil salinity and eutrophication with long-term overuse.",
          "Cropping Patterns: Mixed Cropping (two crops grown simultaneously on same land without pattern, e.g. Wheat + Mustard), Intercropping (grown in alternate structured rows, e.g. Soyabean + Maize), Crop Rotation (sequential planting of different crops to restore nitrogen).",
          "Animal Husbandry: Cattle Farming (Milk/Draught; exotic breeds Jersey/Brown Swiss crossed with indigenous Red Sindhi/Sahiwal), Poultry Farming (Layers for eggs, Broilers for meat), Fish Farming (Capture fishery and Aquaculture/Mariculture; Composite fish culture combining Catla surface feeders, Rohu column feeders, Mrigal bottom feeders), Beekeeping/Apiculture (Italian bee Apis mellifera for high honey yield)."
        ],
        formula: "\\text{Composite Fish Culture} = \\text{Catla (Surface)} + \\text{Rohu (Middle)} + \\text{Mrigal (Bottom)}",
        sample_question: "Explain the advantages of composite fish culture in freshwater pond aquaculture.",
        sample_answer: "Composite fish farming combines 5–6 compatible fish species with different feeding habits in the same pond (Catla feeds on surface, Rohu in middle column, Mrigal and Common Carp at bottom). They do not compete for food, utilizing all pond nutrients efficiently to achieve maximum fish yield.",
        memory_hook: "Macronutrients = N-P-K-Ca-Mg-S; Catla on Top, Rohu in Middle, Mrigal at Bottom."
      }
    ],
    "Social Science": [
      {
        num: 1,
        title: "The French Revolution",
        concept: "Old Regime estate hierarchy, 1789 Storming of the Bastille, Declaration of Rights of Man, Reign of Terror, and global legacy.",
        points: [
          "Causes: French society under Louis XVI was divided into Three Estates: 1st Estate (Clergy) and 2nd Estate (Nobility) enjoyed tax exemptions and feudal privileges; 3rd Estate ($97\\%$ peasants, bourgeoisie) paid all taxes (Tithe to church, Taille to state).",
          "Financial bankruptcy, subsistence crises, and Enlightenment philosophers (Voltaire, Rousseau's Social Contract, Montesquieu's Separation of Powers) ignited revolution.",
          "Outbreak: 14 July 1789—Storming of the Bastille prison fortress symbolizing royal tyranny. National Assembly drafted the 1791 Constitution and Declaration of the Rights of Man and of the Citizen ('Liberty, Equality, Fraternity').",
          "Reign of Terror (1793–1794): Maximilien Robespierre's Jacobin regime executed enemies via the Guillotine; followed by the corrupt Directory, paving the way for Napoleon Bonaparte's rise in 1799.",
          "Legacy: Abolition of feudalism, spread of democratic rights, freedom of speech, and inspiration for anti-colonial struggles worldwide (Tipu Sultan, Raja Ram Mohan Roy)."
        ],
        formula: "\\text{French Revolution Legacy} = \\text{Liberty} + \\text{Equality} + \\text{Fraternity}",
        sample_question: "Describe the three estates into which 18th-century French society was divided.",
        sample_answer: "The First Estate comprised the Catholic Clergy; the Second Estate comprised the Landed Nobility (both exempt from taxes); the Third Estate comprised the remaining $97\\%$ of the population (peasants, merchants, lawyers, artisans) who bore the entire tax burden.",
        memory_hook: "14 July 1789 Bastille fell; 3rd Estate carried the tax burden of Clergy and Nobility."
      },
      {
        num: 2,
        title: "Socialism in Europe and the Russian Revolution",
        concept: "Socialist ideologies (Karl Marx), 1905 Bloody Sunday, 1917 February & October Bolshevik Revolutions, and Stalin's collectivisation.",
        points: [
          "Socialist vision: Karl Marx argued that industrial workers must overthrow capitalist private property to establish a communist society where production means are socially owned.",
          "1905 Revolution: Triggered when Father Gapon's peaceful worker procession was fired upon at Winter Palace ('Bloody Sunday'), forcing Tsar Nicholas II to create the consultative Duma parliament.",
          "February Revolution 1917: Food shortages and catastrophic WWI military defeats led to strikes in Petrograd; Tsar abdicated and a Provisional Government was formed.",
          "October Revolution 1917: Vladimir Lenin and the Bolshevik Party seized state power, declaring peace, nationalising banks/land, and establishing the USSR.",
          "Stalin's Collectivisation (from 1929): Forced individual peasant farms into collective state farms (Kolkhoz) to eliminate Kulaks (wealthy peasants) and mechanize agriculture."
        ],
        formula: "1917 \\text{ (February: Tsar Abdicates)} \\longrightarrow 1917 \\text{ (October: Lenin's Bolsheviks Seize Power)}",
        sample_question: "What were Vladimir Lenin's famous 'April Theses' demands upon returning to Russia in 1917?",
        sample_answer: "1) Russia must exit the First World War immediately, 2) Land must be transferred to the cultivating peasants, and 3) All commercial banks must be nationalised.",
        memory_hook: "April Theses: War ends, Land to peasants, Banks nationalised; Kolkhoz = Collective farms."
      },
      {
        num: 3,
        title: "Nazism and the Rise of Hitler",
        concept: "Weimar Republic collapse, 1929 Great Depression, Adolf Hitler's totalitarian Nazi state, Holocaust, and WWII defeat.",
        points: [
          "Defeat in WWI and the humiliating Treaty of Versailles (1919) imposed war guilt, territorial losses, and devastating reparations on the new Weimar Republic.",
          "The Great Depression of 1929 caused catastrophic unemployment in Germany; Adolf Hitler's Nazi Party (NSDAP) used fiery propaganda, mass rallies, and swastika symbols to emerge as the largest party.",
          "Destruction of Democracy: 1933 Enabling Act established Hitler's dictatorship; civil liberties suspended, trade unions banned, and Gestapo secret police created.",
          "Nazi Ideology: Pseudo-scientific racial hierarchy placing 'Nordic Aryan' Germans at top and Jews at bottom as 'undesirables'; Lebensraum (living space) foreign policy.",
          "The Holocaust (Final Solution): Systematic industrial mass murder of 6 million European Jews, Romani, and political dissidents in concentration death camps (Auschwitz, Treblinka)."
        ],
        formula: "\\text{Treaty of Versailles} + \\text{1929 Economic Depression} \\xrightarrow{\\text{Nazi Propaganda}} \\text{Hitler's Dictatorship}",
        sample_question: "How did the 1933 Enabling Act dismantle democracy and establish dictatorship in Germany?",
        sample_answer: "The Enabling Act bypassed the German Reichstag parliament, granting Hitler supreme power to pass laws, decree budgets, and sign international treaties by personal decree without constitutional oversight.",
        memory_hook: "Versailles resentment + 1929 Crash $\\to$ Hitler's totalitarian Reich and Holocaust."
      },
      {
        num: 4,
        title: "India - Size and Location",
        concept: "Latitudinal/longitudinal extent, Standard Meridian ($82^\\circ 30'\\text{E}$), total land area, and strategic maritime location.",
        points: [
          "Location: Entirely in the Northern Hemisphere; Latitudinal extent $8^\\circ 4'\\text{N}$ to $37^\\circ 6'\\text{N}$; Longitudinal extent $68^\\circ 7'\\text{E}$ to $97^\\circ 25'\\text{E}$.",
          "Tropic of Cancer ($23^\\circ 30'\\text{N}$) divides India into almost two equal halves, passing through 8 states (Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram).",
          "Total land area is $3.28\\text{ million sq km}$ ($2.4\\%$ of global surface area, 7th largest nation in the world). Land boundary $= 15,200\\text{ km}$; Coastline $= 7,516.6\\text{ km}$.",
          "Standard Meridian of India ($82^\\circ 30'\\text{E}$) passes through Mirzapur (UP); chosen as standard time (IST) to prevent a 2-hour local time lag between Arunachal Pradesh and Gujarat.",
          "Strategic position at the head of the Indian Ocean connects trans-Indian Ocean trade routes between Europe and East Asia."
        ],
        formula: "\\text{Extent: } 8^\\circ 4'\\text{N} - 37^\\circ 6'\\text{N}, \\quad 68^\\circ 7'\\text{E} - 97^\\circ 25'\\text{E}, \\quad \\text{IST Meridian} = 82^\\circ 30'\\text{E}",
        sample_question: "Why was $82^\\circ 30'\\text{E}$ longitude chosen as the Standard Meridian of India?",
        sample_answer: "The longitudinal spread of India is approximately $30^\\circ$, causing a 2-hour solar time difference between Arunachal Pradesh in the east and Gujarat in the west. $82^\\circ 30'\\text{E}$ passes centrally through Mirzapur, providing a uniform Indian Standard Time (IST) for the whole nation.",
        memory_hook: "$82.5^\\circ\\text{E}$ is IST (+5:30 GMT); 3.28 million sq km area; 8 states touch Tropic of Cancer."
      },
      {
        num: 5,
        title: "Physical Features of India",
        concept: "Plate tectonics, Northern Himalayas (Himadri, Himachal, Shiwalik), Northern Plains (Bhabar, Terai, Bhangar, Khadar), Peninsular Plateau, Desert, and Islands.",
        points: [
          "Formation: Collision of the northward-drifting Indo-Australian tectonic plate with the Eurasian plate crumpled sediments in the Tethys geosyncline, uplifting the Himalayas.",
          "Himalayan Ranges (North to South): 1) Greater Himalayas / Himadri (highest peaks, Mt Everest $8848\\text{ m}$, Kanchenjunga), 2) Lesser Himalayas / Himachal (hill stations, Pir Panjal range), 3) Outer Himalayas / Shiwaliks (young sedimentary foothills, Duns like Dehradun).",
          "Northern Plains: Formed by alluvial silt of Indus, Ganga, Brahmaputra systems. Soil zones: Bhabar (pebble belt where streams disappear), Terai (marshy wet forest belt), Bhangar (older, less fertile alluvium with kankar nodules), Khadar (newer, highly fertile flood-plain alluvium).",
          "Peninsular Plateau: Central Highlands (Malwa plateau, Chota Nagpur) and Deccan Plateau (black basalt soil / Deccan Trap); flanked by Western Ghats (continuous, higher, e.g. Anamudi peak) and Eastern Ghats (discontinuous, eroded by rivers, e.g. Mahendragiri).",
          "Islands: Lakshadweep (coral origin in Arabian Sea) and Andaman & Nicobar (volcanic peaks in Bay of Bengal, Barren Island active volcano)."
        ],
        formula: "\\text{Himalayas (North to South): Himadri (Highest)} \\to \\text{Himachal} \\to \\text{Shiwaliks (Foothills)}",
        sample_question: "Differentiate between Bhangar and Khadar alluvial soils of the Northern Plains.",
        sample_answer: "Bhangar is the older alluvium lying above floodplains, darker in color, containing calcareous kankar nodules, and less fertile; Khadar is the newer alluvium deposited every year by floods, fine-grained, and exceptionally fertile for intensive agriculture.",
        memory_hook: "Khadar = Khad/Fertile New; Bhangar = Old with Kankar; Himadri = Highest snowy peak."
      },
      {
        num: 6,
        title: "Drainage",
        concept: "Himalayan vs Peninsular river systems, drainage patterns, major lakes, and river pollution control.",
        points: [
          "Drainage Basin is the geographical area drained by a single river system. Drainage patterns: Dendritic (tree-like), Trellis, Rectangular, Radial (radiating from central peak).",
          "Himalayan Rivers (Perennial, snow-fed, deep gorges, large meanders and deltas): Indus System ($2900\\text{ km}$, originates near Mansarovar), Ganga System ($2500\\text{ km}$, Bhagirathi + Alaknanda at Devprayag), Brahmaputra System (Tsangpo in Tibet, forms world's largest Sundarban delta with Ganga).",
          "Peninsular Rivers (Seasonal, rain-fed, shallow valleys): East-flowing forming deltas (Mahanadi, Godavari - Dakshin Ganga, Krishna, Kaveri); West-flowing forming estuaries into Arabian Sea (Narmada, Tapi flowing through rift valleys).",
          "Lakes: Freshwater lakes (Wular in J&K formed by tectonics, Dal, Nainital) and Saltwater lagoons (Chilika Lake in Odisha - largest saltwater lake, Pulicat, Sambhar salt lake in Rajasthan).",
          "National River Conservation Plan (NRCP) and Namami Gange aim to reduce industrial effluent discharge and treat urban sewage."
        ],
        formula: "\\text{Ganga Origin: Bhagirathi } + \\text{Alaknanda } \\xrightarrow{\\text{Devprayag}} \\text{Ganga River}",
        sample_question: "Differentiate between Himalayan and Peninsular river systems in India.",
        sample_answer: "Himalayan rivers are perennial (fed by glaciers and rain), have long courses with deep gorges, and form vast fertile deltas (Ganga, Brahmaputra); Peninsular rivers are seasonal (rain-fed), shorter, flow through fixed shallow valleys, with Narmada/Tapi forming estuaries.",
        memory_hook: "Himalayan = Perennial with deltas; Narmada & Tapi = Westward rift valley estuaries; Godavari = Dakshin Ganga."
      },
      {
        num: 7,
        title: "Climate",
        concept: "Monsoon mechanism, factors influencing climate (Latitude, Altitude, Pressure/Winds, ITCZ, El Niño), and the four seasons.",
        points: [
          "Climate is the average weather condition over a large area for over 30 years; India has a 'Monsoon' type of climate.",
          "Factors controlling climate: Latitude, Altitude, Pressure and Wind systems, Distance from sea (Continentality), Ocean currents, Relief features (Himalayas block cold Siberian winds and trap monsoon clouds).",
          "Monsoon Mechanism: Differential heating of land and water, shift of Inter-Tropical Convergence Zone (ITCZ) over Ganga plain, high pressure over Madagascar, heating of Tibetan plateau, and subtropical westerly/easterly Jet Streams.",
          "El Niño-Southern Oscillation (ENSO): Periodic warming of eastern Pacific ocean waters off Peru, weakening Indian monsoon rainfall and causing droughts.",
          "Four Seasons: 1) Cold Weather Season (Dec–Feb; Western Cyclonic Disturbances bring Mahawat rain for Rabi wheat), 2) Hot Weather Season (March–May; hot dry 'Loo' winds and Kaal Baisakhi thunderstorms), 3) Advancing Monsoon (June–Sept; Southwest monsoon winds split into Arabian Sea and Bay of Bengal branches; Mawsynram receives world's highest rainfall), 4) Retreating Monsoon (Oct–Nov; Northeast monsoon brings rain to Tamil Nadu coast)."
        ],
        formula: "\\text{Monsoon Drivers: ITCZ shift } + \\text{Tibetan Low Pressure } + \\text{Madagascar High Pressure } + \\text{Jet Streams}",
        sample_question: "Why does Mawsynram in Meghalaya receive the highest average annual rainfall in the world?",
        sample_answer: "Mawsynram is situated in the funnel-shaped Khasi Hills. The moisture-laden Bay of Bengal branch of the southwest monsoon is trapped inside this relief funnel and forced to rise rapidly, causing continuous, intense orographic precipitation.",
        memory_hook: "Loo = Hot summer wind; Mawsynram = Rain capital; Tamil Nadu gets Retreating NE Monsoon."
      },
      {
        num: 8,
        title: "What is Democracy? Why Democracy?",
        concept: "Definitions, core principles of democratic governance, critique of non-democratic regimes, arguments for and against.",
        points: [
          "Democracy is a form of government in which rulers are elected by the people.",
          "Four Core Democratic Features: 1) Major decisions are taken by elected political leaders, 2) Free, fair, and periodic elections offering genuine choice (unlike single-party China or military Pakistan under Musharraf), 3) Universal Adult Franchise: One person, one vote, one value (critique of Fiji or Saudi Arabia where voting was historically restricted), 4) Rule of Law and respect for fundamental citizen rights (unlike Zimbabwe under Robert Mugabe's ZANU-PF).",
          "Arguments Against Democracy: Leaders change frequently causing instability; consultative debates delay decisions; political competition can lead to corruption.",
          "Arguments For Democracy: More accountable form of government; improves quality of decision-making through consultation; provides peaceful methods to resolve conflicts; enhances human dignity; allows citizens to correct their own mistakes."
        ],
        formula: "\\text{True Democracy} = \\text{Free & Fair Elections} + 1\\text{ Person } 1\\text{ Vote } 1\\text{ Value} + \\text{Rule of Law} + \\text{Independent Judiciary}",
        sample_question: "Explain why democracy is considered superior to all other forms of government.",
        sample_answer: "Democracy is superior because it is an accountable government based on public consultation, ensures human equality and dignity via universal adult franchise, resolves social conflicts peacefully, and provides constitutional mechanisms for citizens to correct errors through free elections.",
        memory_hook: "Democracy = Government OF the people, BY the people, FOR the people."
      },
      {
        num: 9,
        title: "Constitutional Design & Electoral Politics",
        concept: "South African anti-apartheid struggle, making of Indian Constitution, Preamble values, and Election Commission oversight.",
        points: [
          "South Africa's democratic transition: Nelson Mandela spent 27 years on Robben Island fighting racial Apartheid; in 1994, a non-racial rainbow nation was born with one of the world's most progressive constitutions.",
          "Making of Indian Constitution: Constituent Assembly of 299 members chaired by Dr. Rajendra Prasad (Drafting Committee chaired by Dr. B.R. Ambedkar); adopted on 26 November 1949 and enacted on 26 January 1950 (Republic Day).",
          "Preamble Principles: Sovereign, Socialist, Secular, Democratic, Republic, securing Justice, Liberty, Equality, and Fraternity.",
          "Electoral Process in India: Delimitation of Lok Sabha constituencies ($543$ seats), Reserved Constituencies for SCs ($84$) and STs ($47$), Voters' List (Electoral Roll), Filing Nominations, Campaigning, Voting by Electronic Voting Machines (EVMs with VVPAT), and Counting.",
          "Independent Election Commission of India (ECI): Constitutionally independent body exercising Model Code of Conduct to ensure free and fair polls."
        ],
        formula: "\\text{Constituent Assembly: Adopted 26 Nov 1949 } \\longrightarrow \\text{Enacted 26 Jan 1950 (Republic Day)}",
        sample_question: "What powers make the Election Commission of India (ECI) truly independent and powerful?",
        sample_answer: "The Chief Election Commissioner (CEC) cannot be removed easily by the government, enforces the Model Code of Conduct, reprimands ministers, orders repolls in rigged booths, and controls all government election staff during polls.",
        memory_hook: "Dr. Ambedkar drafted Constitution; ECI enforces the Model Code of Conduct."
      },
      {
        num: 10,
        title: "The Story of Village Palampur & People as Resource / Poverty as a Challenge",
        concept: "Four factors of production, Green Revolution, human capital formation (health/education), poverty lines, and MGNREGA.",
        points: [
          "Four Factors of Production: 1) Land (fixed natural resource), 2) Labour (skilled and unskilled workers), 3) Physical Capital (Fixed capital: machinery, tools, buildings; Working capital: raw materials and cash in hand), 4) Human Capital (knowledge and enterprise combining the other three).",
          "Green Revolution (late 1960s): Introduced High Yielding Variety (HYV) seeds, chemical fertilisers, tractors, and tube-well irrigation, dramatically boosting wheat/rice yields but depleting groundwater tables.",
          "People as Resource: Transforming human population into productive Human Capital through sustained investments in education, vocational training, and healthcare (Virtuous Cycle).",
          "Poverty Estimation: Calorie norm ($2400\\text{ kcal/day}$ in rural areas, $2100\\text{ kcal/day}$ in urban areas) and monthly per capita expenditure.",
          "Poverty Alleviation Schemes: MGNREGA 2005 (guarantees 100 days of wage employment per year to rural households, with $33\\%$ reserved for women), PMRY, Antyodaya Anna Yojana (food grains for the poorest of the poor)."
        ],
        formula: "\\text{Production} = \\text{Land} + \\text{Labour} + \\text{Physical Capital} + \\text{Human Capital (Enterprise)}",
        sample_question: "What are the key features and guarantees provided under MGNREGA 2005?",
        sample_answer: "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA 2005) guarantees at least 100 days of guaranteed wage employment annually to every rural household whose adult members volunteer for unskilled manual work, with one-third of jobs reserved for women and unemployment allowance if work is not provided within 15 days.",
        memory_hook: "Land + Labour + Capital + Human Knowledge = Wealth; MGNREGA = 100 Days Work Guarantee."
      }
    ],
    "English": [
      {
        num: 1,
        title: "Unit 1: The Fun They Had & The Road Not Taken",
        concept: "Isaac Asimov's science-fiction vision of futuristic digital schooling; Robert Frost's timeless poem on life-defining choices.",
        points: [
          "Isaac Asimov sets 'The Fun They Had' in the year 2157: 11-year-old Margie and Tommy learn alone at home from mechanical robotic screens with computerized slots for homework.",
          "They discover an old printed paper book describing traditional schools where children from the entire neighborhood gathered in a real building, laughed, studied the same lessons together, and were taught by human teachers.",
          "Margie reflects wistfully on 'the fun they had' in ancient social community classrooms.",
          "Poem 'The Road Not Taken' (Robert Frost): A traveler at a yellow wood fork chooses 'the one less traveled by', illustrating that personal life choices define one's destiny ('And that has made all the difference').",
          "Grammar focus: Conditional clauses ('If... then') and reflective personal essays."
        ],
        formula: "\\text{Frost's Law: } \\text{Choosing the unconventional path less traveled } \\longrightarrow \\text{Makes all the difference}",
        sample_question: "How does Margie's robotic screen classroom in 2157 contrast with the traditional human classrooms described in the old book?",
        sample_answer: "Margie studied in isolation at home before a mechanical screen that assigned rigid computerized tests, whereas old schools were vibrant community spaces where children learned together from compassionate human teachers.",
        memory_hook: "Margie missed human schools; Frost took the road less traveled."
      },
      {
        num: 2,
        title: "Unit 2: The Sound of Music & Wind",
        concept: "Evelyn Glennie's triumph over profound deafness; Ustad Bismillah Khan's Shehnai mastery; Subramania Bharati's poem on resilience.",
        points: [
          "Part 1: Evelyn Glennie became profoundly deaf at age 11 but mastered percussion by sensing musical vibrational frequencies through her body, bare feet, and cheekbones under percussionist Ron Forbes's guidance.",
          "Part 2: Ustad Bismillah Khan transformed the Shehnai from a crude court pungi into an acclaimed classical concert instrument, playing from the banks of the sacred Ganga and earning the Bharat Ratna (2001).",
          "Poem 'Wind' (Subramania Bharati): Wind destroys weak structures and blow out weak fires, but makes strong fires roar; symbolizing that adversity breaks the weak but strengthens the resolute.",
          "Grammar focus: Passive voice construction and writing biographical profiles."
        ],
        formula: "\\text{Resilience Formula: Weak fires extinguished by wind; Strong fires roar louder!}",
        sample_question: "How did percussionist Ron Forbes guide Evelyn Glennie to perceive music without relying on her ears?",
        sample_answer: "He tuned two large drums to different notes and told her to feel the vibrations through her body. Evelyn discovered she could feel the higher drum from the waist up and the lower drum from the waist down.",
        memory_hook: "Evelyn felt sound through vibrations; Bismillah made Shehnai immortal; Wind tests inner strength."
      },
      {
        num: 3,
        title: "Unit 3: The Little Girl & Rain on the Roof",
        concept: "Katherine Mansfield's portrayal of father-daughter emotional bonding; Coates Kinney's nostalgic rain poem.",
        points: [
          "Kezia fears her strict, giant-like father Mr. Burney, who speaks harshly; she stutters in his presence.",
          "Kezia makes a surprise pincushion birthday gift for him, accidentally stuffing it with his important Port Authority speech papers, receiving a severe ruler beating on her hands.",
          "When her mother and grandmother are hospitalized, Kezia has a terrifying nightmare; her father lovingly carries her into his bed, tucks her in, and comforts her, revealing his hidden warmth and exhausted love.",
          "Poem 'Rain on the Roof' (Coates Kinney): The rhythmic patter of rain on shingles revives fond childhood memories of his loving mother tucking him into bed.",
          "Grammar focus: Adverbs of manner/frequency and diary entry writing."
        ],
        formula: "\\text{Parental Love: Harsh discipline often conceals deep, protective care under exhausting stress}",
        sample_question: "How did Kezia's perception of her father change on the night she had a nightmare?",
        sample_answer: "When she woke up screaming from a nightmare, her father scooped her into his arms, carried her to his warm bedroom, and fell asleep beside her. Kezia realized his strictness came from hard work and exhaustion, feeling his big, loving heart beating against her.",
        memory_hook: "Kezia found her father's big heart; Rain on the roof brings nostalgic memories."
      },
      {
        num: 4,
        title: "Unit 4: A Truly Beautiful Mind & The Lake Isle of Innisfree",
        concept: "Albert Einstein's scientific genius and lifelong pacifism; W.B. Yeats's longing for peaceful solitary nature.",
        points: [
          "Biographical sketch of Albert Einstein: From a slow-speaking, rebellious child in Munich to the revolutionary physicist who published his Special Theory of Relativity ($E = mc^2$) in 1905 and won the 1921 Nobel Prize in Physics.",
          "Humanitarian Vision: Einstein fled Nazi Germany to the USA in 1933; warned President Roosevelt about atomic bombs; devastated by Hiroshima-Nagasaki in 1945, he spent his later life campaigning for world peace, nuclear disarmament, and a World Government.",
          "Poem 'The Lake Isle of Innisfree' (W.B. Yeats): The poet longs to escape London's gray pavements for the tranquil solitude of Innisfree, building a small wattle cabin with nine bean rows and a hive for the honeybee.",
          "Grammar focus: Relative clauses (who, which, that, where) and formal letters."
        ],
        formula: "E = mc^2 \\quad (\\text{Mass-Energy Equivalence: Energy } = \\text{Mass} \\times c^2)",
        sample_question: "Why did Albert Einstein write a letter to US President Franklin D. Roosevelt in 1939?",
        sample_answer: "Einstein warned Roosevelt that Nazi German scientists had discovered uranium nuclear fission and could construct an atomic bomb capable of destroying an entire port and territory.",
        memory_hook: "$E=mc^2$ revolutionized physics; Einstein championed global peace; Innisfree offers quiet solitude."
      },
      {
        num: 5,
        title: "Unit 5: The Snake and the Mirror & A Legend of the Northland",
        concept: "Vaikom Muhammad Basheer's comedic encounter with a vain cobra; ballad on punishing selfishness.",
        points: [
          "A homeopathic doctor living in a poor, rat-infested rented room admires himself in a mirror, planning to shave daily and smile attractively to woo a wealthy bride.",
          "Suddenly a venomous cobra lands on his shoulder and coils around his left arm. Petrified, the doctor turns into a 'stone image in the flesh'.",
          "The cobra catches sight of its own reflection in the mirror, uncoils, and slithers onto the table to admire its beauty, allowing the doctor to sprint away safely to his friend's house.",
          "Ballad 'A Legend of the Northland' (Phoebe Cary): Saint Peter asks an old greedy woman baking cakes for a single slice; she refuses to give even the thinnest wafer and is cursed into a woodpecker, boring into dry wood for food.",
          "Grammar focus: Expressions using 'make' and 'do', and humorous first-person storytelling."
        ],
        formula: "\\text{Irony: Human vanity meets Snake vanity } \\longrightarrow \\text{Life saved!}",
        sample_question: "What saved the homeopathic doctor's life when the deadly cobra was coiled on his arm?",
        sample_answer: "The mirror on his table. When the cobra looked into the mirror, it became fascinated by its own reflection and slithered down to look closer, giving the doctor a chance to run for his life.",
        memory_hook: "Vain doctor saved by a vain cobra; Saint Peter cursed the greedy baker."
      },
      {
        num: 6,
        title: "Unit 6: My Childhood & No Men Are Foreign",
        concept: "Dr. APJ Abdul Kalam's early life in Rameswaram, communal harmony, and James Kirkup's message of universal human brotherhood.",
        points: [
          "Dr. APJ Abdul Kalam recounts his upbringing in Rameswaram: Father Jainulabdeen taught honesty and self-discipline; Mother Ashiamma showed generosity.",
          "Communal Harmony: Kalam grew up with Hindu friends (Ramanadha Sastry, Aravindan, Sivaprakasan); when a new conservative teacher forced Kalam to sit at the back because he was Muslim, Lakshmana Sastry reprimanded the teacher for spreading religious division.",
          "Science teacher Sivasubramania Iyer challenged rigid caste orthodoxies by serving food to Kalam inside his own conservative kitchen.",
          "Poem 'No Men Are Foreign' (James Kirkup): All human beings walk upon the same Earth, breathe the same air, are warmed by the same Sun, and are buried in the same ground; war and hatred only poison our shared planet.",
          "Grammar focus: Inversion with negative adverbs and persuasive speeches."
        ],
        formula: "\\text{Universal Brotherhood: In every land lives the same human soul, fed by sun and peaceful harvests}",
        sample_question: "How did high priest Lakshmana Sastry respond when a new schoolteacher segregated young Kalam on religious grounds?",
        sample_answer: "He summoned the teacher immediately and stated sternly that he must not spread the poison of social inequality and communal intolerance in the minds of innocent children, demanding an apology or resignation.",
        memory_hook: "Kalam learned harmony in Rameswaram; No men are foreign, all breathe the same air."
      }
    ]
  };
})();
