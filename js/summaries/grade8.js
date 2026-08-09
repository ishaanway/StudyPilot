/* StudyPilot NCERT Chapter Summaries - Grade 8 */
(function () {
  window.NCERT_ALL_SUMMARIES = window.NCERT_ALL_SUMMARIES || {};
  window.NCERT_ALL_SUMMARIES["8"] = {
    "Mathematics": [
      {
        num: 1,
        title: "Rational Numbers",
        concept: "Properties of rational numbers, closure, commutativity, associativity, distributive law, and number line representation.",
        points: [
          "A rational number is expressible as $\\frac{p}{q}$ ($p, q \\in \\mathbb{Z}, q \\neq 0$).",
          "Closure, Commutative ($a+b=b+a$), and Associative ($a+(b+c)=(a+b)+c$) properties hold for addition and multiplication of rational numbers.",
          "Additive Identity is $0$ ($a+0=a$); Additive Inverse of $\\frac{a}{b}$ is $-\\frac{a}{b}$.",
          "Multiplicative Identity is $1$ ($a \\times 1 = a$); Multiplicative Inverse (reciprocal) of $\\frac{a}{b}$ is $\\frac{b}{a}$.",
          "Distributivity of multiplication over addition: $a(b + c) = ab + ac$. Between any two rational numbers, there exist infinitely many rational numbers."
        ],
        formula: "a(b + c) = ab + ac, \\quad \\frac{a}{b} \\times \\frac{b}{a} = 1",
        sample_question: "Find three rational numbers strictly between $\\frac{1}{4}$ and $\\frac{1}{2}$.",
        sample_answer: "Convert to common denominator 16: $\\frac{1}{4} = \\frac{4}{16}$ and $\\frac{1}{2} = \\frac{8}{16}$. Three rational numbers are $\\frac{5}{16}, \\frac{6}{16}=\\frac{3}{8}, \\frac{7}{16}$.",
        memory_hook: "Add 0 stays same; Multiply 1 stays same; Flip for reciprocal!"
      },
      {
        num: 2,
        title: "Linear Equations in One Variable",
        concept: "Solving first-degree linear equations with variables on one and both sides, and solving word problems.",
        points: [
          "A linear equation in one variable has the highest power of the variable as 1 (e.g. $ax + b = c$).",
          "Transposition method moves terms across the '=' sign by changing their sign ($+ \\leftrightarrow -$, $\\times \\leftrightarrow \\div$).",
          "When variables appear on both sides ($ax + b = cx + d$), bring variable terms to one side and constants to the other ($x(a-c) = d-b$).",
          "Equations reducible to linear form: Cross-multiplication applies to $\\frac{ax+b}{cx+d} = \\frac{m}{n} \\implies n(ax+b) = m(cx+d)$."
        ],
        formula: "\\frac{ax+b}{cx+d} = \\frac{m}{n} \\implies n(ax+b) = m(cx+d)",
        sample_question: "The ages of Rahul and Haroon are in the ratio $5:7$. Four years later the sum of their ages will be 56 years. Find their present ages.",
        sample_answer: "Let ages be $5x$ and $7x$. $(5x+4) + (7x+4) = 56 \\implies 12x + 8 = 56 \\implies 12x = 48 \\implies x = 4$. Rahul is $20$ years and Haroon is $28$ years.",
        memory_hook: "Cross-multiply fractions, gather $x$ terms on the left!"
      },
      {
        num: 3,
        title: "Understanding Quadrilaterals",
        concept: "Polygons, interior/exterior angle sum formulas, properties of parallelograms, rhombuses, rectangles, squares, kites.",
        points: [
          "Sum of interior angles of an $n$-sided convex polygon $= (n - 2) \\times 180^\\circ$.",
          "Sum of exterior angles of ANY convex polygon is always strictly $360^\\circ$.",
          "Parallelogram properties: Opposite sides are equal, opposite angles are equal, diagonals bisect each other, adjacent angles are supplementary ($180^\\circ$).",
          "Rhombus: All 4 sides equal; diagonals bisect each other perpendicularly at $90^\\circ$.",
          "Rectangle: All 4 angles equal $90^\\circ$; diagonals are equal in length. Square: All 4 sides equal, all angles $90^\\circ$, diagonals equal and perpendicular."
        ],
        formula: "\\text{Interior Sum} = (n-2) \\times 180^\\circ, \\quad \\text{Exterior Sum} = 360^\\circ, \\quad \\text{Each regular ext angle} = \\frac{360^\\circ}{n}",
        sample_question: "Find the number of sides of a regular polygon whose each exterior angle measures $45^\\circ$.",
        sample_answer: "Number of sides $n = \\frac{360^\\circ}{\\text{Exterior Angle}} = \\frac{360^\\circ}{45^\\circ} = 8$ sides (an octagon).",
        memory_hook: "Exterior angles always total $360^\\circ$; Rhombus diagonals cross at $90^\\circ$."
      },
      {
        num: 4,
        title: "Data Handling",
        concept: "Frequency distributions, grouped histograms, pie charts (circle graphs), and theoretical probability calculations.",
        points: [
          "Grouped frequency distributions organize large datasets into continuous class intervals with lower and upper class limits.",
          "Histograms display continuous grouped data using contiguous vertical bars without gaps between bars.",
          "Pie Chart: Circular representation where the central angle for each component sector is $\\theta = \\frac{\\text{Component Value}}{\\text{Total Value}} \\times 360^\\circ$.",
          "Probability: $P(E) = \\frac{\\text{Favourable Outcomes}}{\\text{Total Possible Outcomes}}$. For rolling a fair 6-sided die, $P(\\text{Prime Number } \\{2,3,5\\}) = \\frac{3}{6} = \\frac{1}{2}$."
        ],
        formula: "\\text{Sector Angle } \\theta = \\frac{\\text{Value}}{\\text{Total}} \\times 360^\\circ, \\quad P(E) = \\frac{n(E)}{n(S)}",
        sample_question: "In a pie chart representing a monthly budget of $\\text{₹}36,000$, find the central angle for food expenditure of $\\text{₹}9,000$.",
        sample_answer: "$\\theta = \\frac{9000}{36000} \\times 360^\\circ = \\frac{1}{4} \\times 360^\\circ = 90^\\circ$.",
        memory_hook: "Pie sector angle = Part over Total times 360 degrees."
      },
      {
        num: 5,
        title: "Square and Square Roots",
        concept: "Properties of perfect squares, Pythagorean triplets, finding square roots by prime factorisation and long division.",
        points: [
          "A natural number $m$ is a square if $m = n^2$. Square numbers can only end in digits 0, 1, 4, 5, 6, or 9 (never 2, 3, 7, 8).",
          "The sum of the first $n$ odd natural numbers is always $n^2$ ($1 + 3 + 5 + \\dots + (2n-1) = n^2$).",
          "Pythagorean Triplet formula for any integer $m > 1$: $(2m)^2 + (m^2 - 1)^2 = (m^2 + 1)^2$.",
          "Methods to find $\\sqrt{N}$: 1) Repeated subtraction of odd numbers, 2) Prime Factorisation (grouping into pairs), 3) Long Division Method (ideal for large numbers and decimals)."
        ],
        formula: "(2m)^2 + (m^2 - 1)^2 = (m^2 + 1)^2, \\quad \\sum_{i=1}^n (2i-1) = n^2",
        sample_question: "Write a Pythagorean triplet whose smallest member is 6.",
        sample_answer: "Let $2m = 6 \\implies m = 3$. $m^2 - 1 = 3^2 - 1 = 8$, $m^2 + 1 = 3^2 + 1 = 10$. Triplet: $(6, 8, 10)$. Verification: $6^2 + 8^2 = 36 + 64 = 100 = 10^2$.",
        memory_hook: "Odd sum makes square; Triplet base is $2m, m^2-1, m^2+1$."
      },
      {
        num: 6,
        title: "Cube and Cube Roots",
        concept: "Cubes of natural numbers, prime factorisation for cube roots, Hardy-Ramanujan numbers, and estimation.",
        points: [
          "A number $m = n^3$ is a perfect cube. Cubes of even numbers are always even; cubes of odd numbers are always odd.",
          "Hardy-Ramanujan Number 1729: Smallest number expressible as the sum of two cubes in two different ways ($1729 = 12^3 + 1^3 = 10^3 + 9^3$).",
          "Finding cube root $\\sqrt[3]{N}$ by prime factorisation requires grouping prime factors into triplets of three identical factors.",
          "Estimation method: Group digits into triplets starting from unit's place; unit's digit of cube determines unit's digit of root."
        ],
        formula: "\\sqrt[3]{a \\times b} = \\sqrt[3]{a} \\times \\sqrt[3]{b}, \\quad 1729 = 12^3 + 1^3 = 10^3 + 9^3",
        sample_question: "Find the cube root of 13824 using prime factorisation.",
        sample_answer: "$13824 = 2^9 \\times 3^3 = (2^3 \\times 3)^3 = (8 \\times 3)^3 = 24^3$. Therefore, $\\sqrt[3]{13824} = 24$.",
        memory_hook: "Square roots pair in 2s; Cube roots group in 3s!"
      },
      {
        num: 7,
        title: "Comparing Quantities",
        concept: "Percentages, discount, marked price, profit/loss, GST, compound interest formula compounded annually and half-yearly.",
        points: [
          "Discount $= \\text{Marked Price (MP)} - \\text{Sale Price (SP)}$; $\\text{Discount } \\% = \\frac{\\text{Discount}}{\\text{MP}} \\times 100$.",
          "Goods and Services Tax (GST) is charged on the supply of goods and added to the bill value.",
          "Compound Interest Formula: $A = P\\left(1 + \\frac{R}{100}\\right)^n$, where $A$ is Amount, $P$ is Principal, $R$ is rate $\\%$, and $n$ is time in years.",
          "Compounded Half-Yearly: Rate is halved ($R' = R/2$) and time periods are doubled ($n' = 2n$): $A = P\\left(1 + \\frac{R/2}{100}\\right)^{2n}$.",
          "Compound Interest: $\\text{CI} = A - P$."
        ],
        formula: "A = P\\left(1 + \\frac{R}{100}\\right)^n, \\quad \\text{CI} = A - P, \\quad A_{\\text{half}} = P\\left(1 + \\frac{R}{200}\\right)^{2n}",
        sample_question: "Find the compound interest on $\\text{₹}10,000$ for $2$ years at $10\\%$ per annum compounded annually.",
        sample_answer: "$A = 10000\\left(1 + \\frac{10}{100}\\right)^2 = 10000 \\times \\left(\\frac{11}{10}\\right)^2 = 10000 \\times \\frac{121}{100} = \\text{₹}12,100$. $\\text{CI} = 12100 - 10000 = \\text{₹}2,100$.",
        memory_hook: "Half-yearly compounding? Half the rate, double the time periods!"
      },
      {
        num: 8,
        title: "Algebraic Expressions and Identities",
        concept: "Polynomial multiplication, standard algebraic identities, and binomial expansions.",
        points: [
          "Multiplication of polynomials: Multiply each term of the first polynomial with every term of the second using distributive law.",
          "Standard Identity 1: $(a + b)^2 = a^2 + 2ab + b^2$.",
          "Standard Identity 2: $(a - b)^2 = a^2 - 2ab + b^2$.",
          "Standard Identity 3: $(a + b)(a - b) = a^2 - b^2$.",
          "Standard Identity 4: $(x + a)(x + b) = x^2 + (a + b)x + ab$."
        ],
        formula: "(a+b)^2 = a^2+2ab+b^2, \\quad (a-b)^2 = a^2-2ab+b^2, \\quad a^2-b^2 = (a+b)(a-b)",
        sample_question: "Evaluate $103 \\times 97$ without direct multiplication using algebraic identities.",
        sample_answer: "$103 \\times 97 = (100 + 3)(100 - 3) = 100^2 - 3^2 = 10000 - 9 = 9,991$.",
        memory_hook: "Identity 3: $(a+b)(a-b) = a^2 - b^2$ is the shortcut king!"
      },
      {
        num: 9,
        title: "Mensuration",
        concept: "Area of trapezium, general quadrilaterals, rhombus, surface areas and volumes of cube, cuboid, and cylinder.",
        points: [
          "Area of Trapezium $= \\frac{1}{2} \\times (\\text{Sum of parallel sides}) \\times \\text{Height} = \\frac{1}{2}(a + b)h$.",
          "Area of Rhombus $= \\frac{1}{2} \\times d_1 \\times d_2$ (product of diagonals).",
          "Cuboid: Total Surface Area $= 2(lb + bh + hl)$; Lateral Surface Area $= 2h(l + b)$; Volume $= l \\times b \\times h$.",
          "Cube: $\\text{TSA} = 6s^2$; $\\text{LSA} = 4s^2$; $\\text{Volume} = s^3$.",
          "Right Circular Cylinder: Curved Surface Area $= 2\\pi rh$; Total Surface Area $= 2\\pi r(r + h)$; Volume $= \\pi r^2 h$."
        ],
        formula: "A_{\\text{trap}} = \\frac{1}{2}(a+b)h, \\quad V_{\\text{cuboid}} = lbh, \\quad V_{\\text{cyl}} = \\pi r^2 h, \\quad \\text{CSA}_{\\text{cyl}} = 2\\pi rh",
        sample_question: "A cylindrical water tank has radius $r = 7\\text{ m}$ and height $h = 10\\text{ m}$. Find its volume and total surface area.",
        sample_answer: "$\\text{Volume} = \\pi r^2 h = \\frac{22}{7} \\times 7^2 \\times 10 = 1,540\\text{ m}^3$. $\\text{TSA} = 2\\pi r(r + h) = 2 \\times \\frac{22}{7} \\times 7 \\times (7 + 10) = 44 \\times 17 = 748\\text{ m}^2$.",
        memory_hook: "Trapezium = Half sum of bases times height; Cylinder volume = Base circle area times height."
      },
      {
        num: 10,
        title: "Exponents and Powers",
        concept: "Negative integral exponents, laws of exponents, and expressing tiny/huge numbers in standard scientific notation.",
        points: [
          "Negative exponent rule: $a^{-m} = \\frac{1}{a^m}$ ($a \\neq 0$).",
          "Laws of exponents: 1) $a^m \\times a^n = a^{m+n}$, 2) $a^m \\div a^n = a^{m-n}$, 3) $(a^m)^n = a^{mn}$, 4) $a^m \\times b^m = (ab)^m$, 5) $\\frac{a^m}{b^m} = \\left(\\frac{a}{b}\\right)^m$, 6) $a^0 = 1$.",
          "Standard Scientific Notation: Expressed as $k \\times 10^n$, where $1.0 \\le k < 10$ and $n$ is an integer.",
          "Very small numbers have negative powers of 10 ($0.000007\\text{ m} = 7 \\times 10^{-6}\\text{ m}$); huge numbers have positive powers ($150,000,000\\text{ km} = 1.5 \\times 10^8\\text{ km}$)."
        ],
        formula: "a^{-m} = \\frac{1}{a^m}, \\quad k \\times 10^n \\quad (1 \\le k < 10)",
        sample_question: "Simplify $\\left(\\frac{1}{3}\\right)^{-2} + \\left(\\frac{1}{4}\\right)^{-2} + \\left(\\frac{1}{2}\\right)^{-3}$.",
        sample_answer: "$3^2 + 4^2 + 2^3 = 9 + 16 + 8 = 33$.",
        memory_hook: "Negative power flips fraction upside down!"
      },
      {
        num: 11,
        title: "Direct and Inverse Proportions",
        concept: "Direct variation ($x/y = k$), inverse variation ($xy = k$), and solving real-world rate/work problems.",
        points: [
          "Direct Proportion: Two quantities $x$ and $y$ vary directly if an increase in $x$ causes a proportional increase in $y$ ($\\frac{x}{y} = k$ or $\\frac{x_1}{y_1} = \\frac{x_2}{y_2}$). Examples: Cost vs quantity, distance vs time at constant speed.",
          "Inverse Proportion: Two quantities $x$ and $y$ vary inversely if an increase in $x$ causes a proportional decrease in $y$ ($x \\times y = k$ or $x_1 y_1 = x_2 y_2$). Examples: Number of workers vs days to complete work, speed vs time for fixed distance.",
          "Step 1: Identify if the relation is Direct (ratio constant) or Inverse (product constant).",
          "Step 2: Equate ratios or products to solve for the missing variable."
        ],
        formula: "\\text{Direct: } \\frac{x_1}{y_1} = \\frac{x_2}{y_2}, \\quad \\text{Inverse: } x_1 y_1 = x_2 y_2",
        sample_question: "If 15 workers can build a wall in 48 hours, how many workers will be required for the same work in 30 hours?",
        sample_answer: "Inverse proportion: $x_1 y_1 = x_2 y_2 \\implies 15 \\times 48 = x_2 \\times 30 \\implies x_2 = \\frac{720}{30} = 24$ workers.",
        memory_hook: "Direct = Divide constant ($x/y$); Inverse = Multiply constant ($xy$)."
      },
      {
        num: 12,
        title: "Factorisation",
        concept: "Common monomial factors, regrouping terms, identity factorisation, splitting middle terms, and algebraic division.",
        points: [
          "Factorisation expresses an algebraic expression as the product of irreducible factors.",
          "Method 1: Common factor extraction (e.g. $2x + 4 = 2(x + 2)$).",
          "Method 2: Regrouping terms (e.g. $xy + x + y + 1 = x(y+1) + 1(y+1) = (x+1)(y+1)$).",
          "Method 3: Using identities: $a^2 - b^2 = (a+b)(a-b)$; $a^2 \\pm 2ab + b^2 = (a \\pm b)^2$.",
          "Method 4: Splitting the middle term for $x^2 + px + q = (x + a)(x + b)$ where $a + b = p$ and $ab = q$.",
          "Division of a polynomial by a monomial/polynomial by canceling common factors."
        ],
        formula: "x^2 + (a+b)x + ab = (x+a)(x+b), \\quad a^2 - b^2 = (a+b)(a-b)",
        sample_question: "Factorise $x^2 + 9x + 20$.",
        sample_answer: "Find two numbers whose product is 20 and sum is 9 $\\implies 4$ and $5$. $x^2 + 4x + 5x + 20 = x(x+4) + 5(x+4) = (x+4)(x+5)$.",
        memory_hook: "Find two numbers: multiply to the last number, add to the middle!"
      },
      {
        num: 13,
        title: "Introduction to Graphs",
        concept: "Cartesian coordinate system, plotting $(x, y)$ coordinates, linear graphs, and real-life graph interpretations.",
        points: [
          "Cartesian coordinate plane has a horizontal X-axis and vertical Y-axis intersecting at the Origin $O(0, 0)$.",
          "A point $P(x, y)$ has x-coordinate (abscissa: distance from y-axis) and y-coordinate (ordinate: distance from x-axis).",
          "A Line Graph displays data that changes continuously over uninterrupted time intervals.",
          "A Linear Graph is a line graph consisting of a single unbroken straight line.",
          "Independent variable is typically plotted on the X-axis (e.g. Time), and dependent variable on the Y-axis (e.g. Distance/Temperature)."
        ],
        formula: "\\text{Point: } P(\\text{Abscissa } x, \\text{Ordinate } y), \\quad \\text{Origin} = (0, 0)",
        sample_question: "Plot the points $A(2, 3)$ and $B(4, 7)$ and find the slope of the line passing through them.",
        sample_answer: "$\\text{Slope } m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{7 - 3}{4 - 2} = \\frac{4}{2} = 2$.",
        memory_hook: "Abscissa goes across ($x$); Ordinate climbs up ($y$)."
      }
    ],
    "Science": [
      {
        num: 1,
        title: "Crop Production and Management",
        concept: "Agricultural practices, soil preparation, high-yield sowing, organic manure vs fertilisers, irrigation, and storage.",
        points: [
          "Kharif Crops: Sown in rainy season (June–Sept), e.g. Paddy, Maize, Soyabean, Cotton, Groundnut.",
          "Rabi Crops: Sown in winter season (Oct–March), e.g. Wheat, Gram, Pea, Mustard, Linseed.",
          "Seven Agricultural Practices: 1) Soil preparation (ploughing & leveling), 2) Sowing healthy seeds (using seed drill), 3) Adding Manure and Fertilisers, 4) Irrigation, 5) Protecting from weeds (Weeding), 6) Harvesting, 7) Safe Storage in silos/granaries.",
          "Manure (organic, improves soil texture/water retention) vs Chemical Fertilisers (NPK, rich in specific nutrients but causes soil/water degradation with overuse).",
          "Modern Irrigation: Sprinkler system (uneven sandy soil) and Drip system (delivers water drop by drop directly at roots, zero wastage)."
        ],
        formula: "\\text{Fertiliser NPK} = \\text{Nitrogen } (\\text{N}) + \\text{Phosphorus } (\\text{P}) + \\text{Potassium } (\\text{K})",
        sample_question: "Explain why drip irrigation is considered the most water-efficient irrigation technique.",
        sample_answer: "Drip irrigation delivers water drop by drop directly to the plant root zone via narrow tubing, preventing surface evaporation, runoff, and weed growth. It is ideal for water-scarce regions.",
        memory_hook: "Kharif = Monsoon Paddy; Rabi = Winter Wheat; Drip = Direct to Roots."
      },
      {
        num: 2,
        title: "Microorganisms: Friend and Foe",
        concept: "Classification of microbes (bacteria, fungi, protozoa, algae, viruses), beneficial uses, pathogenesis, and food preservation.",
        points: [
          "Four major microbe groups: Bacteria (Lactobacillus, Rhizobium), Fungi (Yeast, Penicillium), Protozoa (Amoeba, Paramecium), Algae (Spirogyra, Chlamydomonas).",
          "Viruses: Microscopic entities that reproduce ONLY inside the host organism's living cells (Influenza, Polio, COVID-19).",
          "Commercial & Medical Benefits: Lactobacillus turns milk into curd; Yeast causes fermentation producing alcohol and raising bread dough; Antibiotics (Penicillin by Alexander Fleming); Vaccines develop antibodies.",
          "Nitrogen Fixation: Rhizobium bacteria in leguminous root nodules convert atmospheric nitrogen into plant-absorbable nitrates.",
          "Food Preservation: Pasteurisation (heating milk to $70^\\circ\\text{C}$ for 15–30 sec, then rapid chilling), salting, sugaring, oil & vinegar, chemical preservatives (Sodium benzoate)."
        ],
        formula: "\\text{Fermentation: Glucose } \\xrightarrow{\\text{Yeast (Anaerobic)}} \\text{Ethanol} + \\text{CO}_2 \\uparrow",
        sample_question: "What is pasteurisation and who discovered this preservation technique?",
        sample_answer: "Discovered by Louis Pasteur, milk is heated to about $70^\\circ\\text{C}$ for 15 to 30 seconds and then suddenly chilled to prevent the growth of spoilage microorganisms.",
        memory_hook: "Rhizobium fixes Nitrogen; Fleming discovered Penicillin; Pasteur chilled milk!"
      },
      {
        num: 3,
        title: "Coal and Petroleum",
        concept: "Exhaustible fossil fuels, carbonisation of coal, petroleum refining, and natural gas (CNG).",
        points: [
          "Fossil fuels formed over millions of years from buried prehistoric organic matter under intense heat and pressure.",
          "Coal: Formed by slow carbonisation of dense swamp forests. Destructive distillation yields: Coke (almost pure carbon), Coal Tar (synthetic dyes/drugs/perfumes), Coal Gas (industrial fuel).",
          "Petroleum (Black Gold): Formed from dead marine organisms. Crude oil is separated by Fractional Distillation into LPG, Petrol, Kerosene, Diesel, Lubricating Oil, Paraffin wax, and Bitumen (road surfacing).",
          "Natural Gas: Stored under high pressure as Compressed Natural Gas (CNG); clean-burning fuel that produces less air pollution.",
          "PCRA (Petroleum Conservation Research Association) tips: Drive at constant moderate speeds, turn off engines at traffic lights, maintain correct tyre pressure."
        ],
        formula: "\\text{Dead Flora } \\xrightarrow{\\text{Heat, Pressure (Millions of Years)}} \\text{Coal (Carbonisation)}",
        sample_question: "Why are fossil fuels classified as exhaustible natural resources?",
        sample_answer: "Their formation requires millions of years from buried organic matter, while their current rate of human consumption is vastly faster than their slow geological replenishment.",
        memory_hook: "Destructive Distillation $\\to$ Coke, Coal Tar, Coal Gas; CNG is Clean Natural Gas."
      },
      {
        num: 4,
        title: "Combustion and Flame",
        concept: "Combustion requirements, ignition temperature, fire suppression, flame structure, and calorific value of fuels.",
        points: [
          "Combustion is a chemical reaction where a substance reacts with oxygen releasing heat and light. Three requirements (Fire Triangle): Combustible Fuel, Oxygen/Air, and Ignition Temperature.",
          "Ignition Temperature is the lowest temperature at which a substance catches fire. Inflammable substances have very low ignition temperatures (petrol, alcohol, LPG).",
          "Fire Extinguishers: Water cools fuel below ignition temperature (cannot be used for electrical or oil fires); $\\text{CO}_2$ extinguishers blanket the fire and displace oxygen.",
          "Structure of a Candle Flame: 1) Innermost dark zone (unburnt wax vapors, least hot), 2) Middle luminous yellow zone (incomplete combustion, moderately hot), 3) Outermost non-luminous blue zone (complete combustion, hottest part used by goldsmiths).",
          "Calorific Value: Amount of heat energy produced on complete combustion of $1\\text{ kg}$ of fuel, measured in $\\text{kJ/kg}$ (Hydrogen has highest: $150,000\\text{ kJ/kg}$; LPG: $55,000\\text{ kJ/kg}$)."
        ],
        formula: "\\text{Calorific Value} = \\frac{\\text{Heat Produced (kJ)}}{\\text{Mass of Fuel (kg)}} \\quad [\\text{kJ/kg}]",
        sample_question: "Why is carbon dioxide ($\\text{CO}_2$) the best fire extinguisher for electrical fires?",
        sample_answer: "$\\text{CO}_2$ is heavier than oxygen, blanketing the fire like a protective shield to cut off air supply. Being a non-conductor of electricity, it does not harm electrical circuits or give shocks.",
        memory_hook: "Outer blue zone = Hottest; Middle yellow = Carbon glow; Inner dark = Unburnt wax."
      },
      {
        num: 5,
        title: "Conservation of Plants and Animals",
        concept: "Deforestation consequences, biosphere reserves, national parks, sanctuaries, Red Data Book, and endemic species.",
        points: [
          "Deforestation causes soil erosion, desertification, loss of habitat, greenhouse warming ($\\uparrow \\text{CO}_2$), and disruption of the water cycle.",
          "Biosphere Reserve: Large protected area for wildlife, plant resources, and traditional tribal lifestyles (e.g. Pachmarhi Biosphere Reserve).",
          "National Park: Strictly protected habitat where wildlife can freely utilize natural resources (e.g. Jim Corbett, Kaziranga, Satpura). Wildlife Sanctuary: Protected area where human activities are restricted to prevent animal disturbance.",
          "Endemic Species: Species of plants and animals found exclusively in a particular geographical area and nowhere else (e.g. Giant Squirrel and Sal trees in Pachmarhi).",
          "Red Data Book: Published by IUCN to keep an international record of all endangered plants and animal species."
        ],
        formula: "\\text{Deforestation } \\to \\text{Soil Erosion } \\to \\text{Desertification (Fertile land turns desert)}",
        sample_question: "Differentiate between a Wildlife Sanctuary and a National Park.",
        sample_answer: "A Wildlife Sanctuary protects animal species from hunting and poaching with limited permitted human entry; A National Park is strictly government-controlled with zero human exploitation, grazing, or forestry allowed.",
        memory_hook: "Red Data Book = Endangered list; Endemic = Found only here!"
      },
      {
        num: 6,
        title: "Reproduction in Animals",
        concept: "Sexual vs asexual reproduction, fertilisation (internal/external), embryo development, and cloning.",
        points: [
          "Sexual reproduction involves fusion of male gamete (Sperm produced by testes) and female gamete (Ovum/Egg produced by ovaries) to form a single-celled Zygote.",
          "Internal Fertilisation occurs inside the female body (humans, cows, birds); External Fertilisation occurs outside the female body in water (frogs, fish).",
          "Development: Zygote divides repeatedly to form an Embryo, which implants into the uterine wall and develops into a Foetus (all body parts identifiable).",
          "Viviparous animals give birth to live young (mammals); Oviparous animals lay eggs (birds, reptiles). Metamorphosis transforms larvae into adults (tadpole to frog via thyroxine).",
          "Asexual reproduction in animals: Binary fission in Amoeba; Budding in Hydra; Dolly the sheep was the first cloned mammal created by Ian Wilmut (1996)."
        ],
        formula: "\\text{Sperm (n)} + \\text{Ovum (n)} \\xrightarrow{\\text{Fertilisation}} \\text{Zygote (2n)} \\longrightarrow \\text{Embryo} \\longrightarrow \\text{Foetus}",
        sample_question: "Differentiate between internal and external fertilisation with an example for each.",
        sample_answer: "Internal fertilisation takes place inside the female body (e.g., humans, dogs); External fertilisation takes place outside the female body, typically in water where gametes fuse externally (e.g., frogs, fish).",
        memory_hook: "Zygote (1 cell) $\\to$ Embryo (ball of cells) $\\to$ Foetus (recognizable organs)."
      },
      {
        num: 7,
        title: "Reaching the Age of Adolescence",
        concept: "Puberty, endocrine glands, hormones, human sex determination ($XX/XY$), and nutritional adolescent health.",
        points: [
          "Puberty is the period during which adolescent boys and girls become sexually mature and capable of reproduction.",
          "Changes: Sudden growth in height, voice deepening and Adam's apple development in boys, sweat/sebaceous gland activity, mental and emotional maturation.",
          "Sex Hormones: Testes secrete Testosterone (male characteristics); Ovaries secrete Estrogen (female traits); Pituitary master gland regulates all endocrine secretion.",
          "Sex Determination in Humans: All human unfertilized eggs carry an $X$ chromosome. Sperm carry either an $X$ or a $Y$ chromosome. $X\\text{-sperm} + X\\text{-egg} \\implies XX$ (Girl); $Y\\text{-sperm} + X\\text{-egg} \\implies XY$ (Boy).",
          "Adolescent Nutrition: Balanced diet rich in Iron (builds blood/haemoglobin preventing anemia), Calcium (bone density), and Proteins."
        ],
        formula: "X \\text{ (Egg)} + Y \\text{ (Sperm)} = XY \\text{ (Boy)}, \\quad X \\text{ (Egg)} + X \\text{ (Sperm)} = XX \\text{ (Girl)}",
        sample_question: "Explain why the father's sperm determines the biological sex of an unborn baby, not the mother.",
        sample_answer: "The mother always contributes an $X$ chromosome through her ovum. The father produces two types of sperm ($50\\% X$ and $50\\% Y$). The sex of the baby depends entirely on whether an $X$ or $Y$ sperm fertilizes the egg.",
        memory_hook: "XX = Female, XY = Male; Sperm decides the sex!"
      },
      {
        num: 8,
        title: "Force and Pressure",
        concept: "Push and pull, contact vs non-contact forces, pressure formula ($P=F/A$), atmospheric and liquid pressure.",
        points: [
          "Force is a push or pull acting upon an object resulting from its interaction with another object (measured in Newtons, $\\text{N}$).",
          "Contact Forces: Muscular force, Frictional force. Non-Contact Forces: Gravitational force, Electrostatic force, Magnetic force.",
          "Effects of force: Can change state of motion (speed up, slow down, stop), change direction of moving object, or change shape/size.",
          "Pressure: Force acting perpendicular per unit area: $\\text{Pressure} = \\frac{\\text{Force}}{\\text{Area}}$ (SI unit is Pascal, $\\text{Pa} = \\text{N/m}^2$). Smaller contact area creates much greater pressure (sharp knife cuts easily; wide straps on school bags reduce shoulder pressure).",
          "Liquid pressure increases with depth and acts equally in all directions at the same depth. Atmospheric pressure is the immense weight of the air column above us."
        ],
        formula: "P = \\frac{F}{A} \\quad [\\text{Pascal or N/m}^2], \\quad P_{\\text{liquid}} = \\rho g h",
        sample_question: "Why do porter porters place a thick round cloth turban on their heads when carrying heavy luggage?",
        sample_answer: "The cloth turban increases the contact surface area ($A$) between the luggage and the head. Since $\\text{Pressure} = \\frac{\\text{Force}}{\\text{Area}}$, increasing area reduces pressure on the head, making the heavy load easier to bear.",
        memory_hook: "Smaller area = Huge pressure (sharp needle); Bigger area = Gentle pressure (wide strap)."
      },
      {
        num: 9,
        title: "Friction",
        concept: "Origin of friction (surface irregularities), static/sliding/rolling friction, advantages, disadvantages, and ball bearings.",
        points: [
          "Friction is an opposing contact force that acts parallel to surfaces in contact, resisting relative motion.",
          "Cause: Microscopic interlocking of irregularities on the two contact surfaces.",
          "Three types of friction in order of magnitude: $\\text{Static Friction} > \\text{Sliding Friction} > \\text{Rolling Friction}$.",
          "Friction is a 'Necessary Evil': Essential for walking without slipping, writing with pen on paper, braking vehicles; Disadvantageous because it causes heat generation and mechanical wear-and-tear.",
          "Methods to alter friction: Increase by grooving vehicle tyres and sports shoes; Decrease by using lubricants (oil, grease, graphite) or replacing sliding with rolling using Ball Bearings."
        ],
        formula: "f_{\\text{static}} > f_{\\text{sliding}} > f_{\\text{rolling}}",
        sample_question: "Why are ball bearings installed in bicycle hubs, electric fans, and ceiling motors?",
        sample_answer: "Ball bearings convert sliding friction into rolling friction. Because rolling friction is substantially smaller than sliding friction, it drastically reduces energy loss and mechanical wear.",
        memory_hook: "Rolling is easiest; Interlocking causes drag; Lubricant smoothens bumps."
      },
      {
        num: 10,
        title: "Sound",
        concept: "Production by vibrating bodies, propagation medium, human vocal cords, amplitude/frequency, loudness (dB), pitch, and noise pollution.",
        points: [
          "Sound is produced by vibrating mechanical bodies and propagates as a longitudinal mechanical wave.",
          "Sound strictly requires a material medium (solid, liquid, or gas) to propagate; it CANNOT travel through a vacuum.",
          "Speed of sound: Fast in solids (steel $\\approx 5000\\text{ m/s}$) $>$ Liquids (water $\\approx 1500\\text{ m/s}$) $>$ Gases (air $\\approx 340\\text{ m/s}$).",
          "Human Voice: Produced by vibration of two vocal cords stretched across the Larynx (voice box).",
          "Wave characteristics: Amplitude determines Loudness ($L \\propto \\text{Amplitude}^2$ in decibels, $\\text{dB}$); Frequency ($\\text{Hz}$) determines Pitch/Shrillness.",
          "Audible frequency range for human ears: $20\\text{ Hz}$ to $20,000\\text{ Hz}$ ($20\\text{ kHz}$). Infrasound ($<20\\text{ Hz}$); Ultrasound ($>20,000\\text{ Hz}$)."
        ],
        formula: "\\text{Frequency } \\nu = \\frac{\\text{Oscillations}}{\\text{Time (s)}} \\text{ [Hz]}, \\quad \\text{Loudness } \\propto A^2, \\quad \\text{Audible: } 20\\text{ Hz} - 20\\text{ kHz}",
        sample_question: "A pendulum oscillates 40 times in 4 seconds. Calculate its Time Period and Frequency.",
        sample_answer: "$\\text{Frequency} = \\frac{40\\text{ oscillations}}{4\\text{ seconds}} = 10\\text{ Hz}$. $\\text{Time Period } T = \\frac{1}{\\text{Frequency}} = \\frac{1}{10} = 0.1\\text{ seconds}$.",
        memory_hook: "High amplitude = Loud roar; High frequency = Shrill whistle; Vacuum = Total silence."
      },
      {
        num: 11,
        title: "Chemical Effects of Electric Current",
        concept: "Electrolytes, electrical conductivity of liquids, chemical dissociation, and electroplating principles/applications.",
        points: [
          "Pure distilled water is a poor conductor of electricity; adding acids, bases, or mineral salts releases free ions, making it a conducting electrolyte.",
          "Chemical effect of current: When electric current passes through a conducting solution, chemical reactions occur (evolution of gas bubbles at electrodes, metal deposition, or colour changes).",
          "Electrolysis of Water: Passing current through acidified water breaks it down into Hydrogen gas (at Cathode, negative electrode) and Oxygen gas (at Anode, positive electrode) in a $2:1$ volume ratio.",
          "Electroplating: Process of depositing a thin protective/decorative layer of a superior metal over an inferior metal using electricity.",
          "Applications: Chromium plating on car bumpers/taps (scratch-resistant shine), Zinc plating on iron (prevents rust), Gold/Silver plating on imitation jewellery."
        ],
        formula: "2\\text{H}_2\\text{O} \\xrightarrow{\\text{Electricity}} 2\\text{H}_2 \\uparrow \\text{ (Cathode)} + \\text{O}_2 \\uparrow \\text{ (Anode)}",
        sample_question: "Describe the process of electroplating a copper spoon with silver.",
        sample_answer: "Make the copper spoon the Cathode (negative terminal) and a pure silver plate the Anode (positive terminal). Dip both in a silver nitrate ($\\text{AgNO}_3$) electrolyte solution. Electric current dissolves silver from anode and deposits it as a smooth layer onto the spoon.",
        memory_hook: "Cathode gets coated (Negative terminal); Anode gives up metal (Positive terminal)."
      },
      {
        num: 12,
        title: "Some Natural Phenomena",
        concept: "Static electricity, charging by friction, lightning safety, electroscopes, and earthquake seismology.",
        points: [
          "Charging by friction: Rubbing two uncharged objects transfers electrons (glass rod rubbed with silk acquires positive charge; ebonite rod with fur acquires negative charge).",
          "Fundamental electrostatic law: Like charges repel each other ($+ \\leftrightarrow +$, $- \\leftrightarrow -$); Unlike charges attract each other ($+ \\rightarrow \\leftarrow -$).",
          "An Electroscope detects the presence and nature of electric charge on a body using diverging gold/aluminium leaves.",
          "Lightning: Massive natural electrostatic discharge between oppositely charged clouds or between cloud and ground. Lightning Conductors (thick copper rods grounded deep in earth) protect buildings.",
          "Earthquakes: Tremors caused by sudden disturbances/fractures deep within Earth's crust along fault zones. Measured on Richter Scale (logarithmic: magnitude 7 is 1000 times more destructive than magnitude 5); recorded by a Seismograph."
        ],
        formula: "\\text{Richter Scale is Logarithmic: Each unit increase } = 10\\times \\text{ amplitude / } 31.6\\times \\text{ energy}",
        sample_question: "How does a lightning conductor protect a tall building from lightning strikes?",
        sample_answer: "A thick copper metallic rod with sharp spikes extends higher than the roof and connects to a copper plate buried deep in moist earth. When lightning strikes, it safely channels the immense electrical current into the ground without damaging the building structure.",
        memory_hook: "Electroscope leaves diverge on charge; Lightning rod grounds the surge."
      },
      {
        num: 13,
        title: "Light",
        concept: "Laws of reflection, regular vs diffuse reflection, periscopes, human eye anatomy, vision defects, and Braille system.",
        points: [
          "Two Laws of Reflection: 1) Angle of Incidence equals Angle of Reflection ($\\angle i = \\angle r$), 2) Incident ray, reflected ray, and normal at the point of incidence all lie in the same plane.",
          "Regular Reflection occurs on smooth polished surfaces (mirrors) producing clear images; Diffuse/Irregular Reflection occurs on rough surfaces, scattering light in all directions.",
          "Multiple Reflections: Two mirrors inclined at angle $\\theta$ form $n = \\frac{360^\\circ}{\\theta} - 1$ images (used in Kaleidoscopes and Periscopes).",
          "Human Eye Anatomy: Cornea (transparent outer protective dome), Iris (controls pupil aperture size and eye colour), Crystalline Lens (flexible convex lens), Retina (contains photoreceptor Rods for dim light and Cones for colour/bright light), Optic Nerve (transmits electrical nerve signals to brain).",
          "Blind Spot: Point on retina where the optic nerve leaves the eyeball, possessing no rods or cones (zero vision).",
          "Braille System: Tactile reading and writing system for visually challenged individuals using 63 raised dot patterns invented by Louis Braille (1821)."
        ],
        formula: "\\angle i = \\angle r, \\quad n = \\frac{360^\\circ}{\\theta} - 1 \\text{ (Number of images)}",
        sample_question: "Two plane mirrors are placed parallel to each other facing inward. How many images of an object placed between them are formed?",
        sample_answer: "For parallel mirrors, $\\theta = 0^\\circ$. The number of images formed is theoretically infinite ($n = \\infty$) due to continuous repeated reflections between the two mirrors.",
        memory_hook: "Cones see Colour and clarity; Rods see in the Dark; $\\angle i = \\angle r$."
      }
    ],
    "Social Science": [
      {
        num: 1,
        title: "Resources",
        concept: "Resource classification, natural/human-made/human resources, ubiquity vs localization, and sustainable development.",
        points: [
          "A resource is anything of utility that satisfies human needs, provided it is technologically accessible, economically feasible, and culturally acceptable.",
          "Classification: Natural (soil, minerals, air), Human-Made (roads, bridges, technology), and Human Resources (people's skills, knowledge, and health).",
          "Renewable (replenished fast, e.g. solar, wind) vs Non-renewable (finite stocks, e.g. coal, petroleum).",
          "Ubiquitous (found everywhere, e.g. air) vs Localised (found in specific regions, e.g. copper, iron ore).",
          "Sustainable Development: Balancing the use of resources to satisfy current needs while conserving them for future generations."
        ],
        formula: "\\text{Sustainable Development} = \\text{Resource Conservation} + \\text{Minimal Waste} + \\text{Future Security}",
        sample_question: "Why are human beings considered the most important resource?",
        sample_answer: "People possess the intelligence, knowledge, technology, and skills to discover, transform, and extract value from raw natural materials, converting them into useful finished resources.",
        memory_hook: "Utility makes a resource; Human skills unlock its value."
      },
      {
        num: 2,
        title: "Land, Soil, Water, Natural Vegetation and Wildlife Resources",
        concept: "Land use, soil horizons, factors of soil formation, soil conservation methods, water harvesting, and CITES.",
        points: [
          "Soil Formation Factors: Parent Rock (color/texture/minerals), Climate (temperature/rainfall rate of weathering), Relief (altitude/slope), Organic matter/Humus, and Time.",
          "Soil Conservation Techniques: Contour Ploughing (ploughing parallel to contour lines), Terrace Farming (step farming on slopes), Shelter Belts (planting windbreak tree rows), Mulching, and Check Dams.",
          "Water conservation: Rainwater harvesting collects rooftop runoff to recharge groundwater aquifers.",
          "Natural Vegetation Zones: Evergreen Forests (dense canopy, heavy rainfall), Deciduous Forests (shed leaves in dry season), Thorny Shrubs (arid deserts), Tundra (mosses and lichens).",
          "CITES (Convention on International Trade in Endangered Species): Global treaty banning commercial trade in endangered wild animals and plants."
        ],
        formula: "\\text{Soil} = f(\\text{Parent Rock, Climate, Relief, Organisms, Time})",
        sample_question: "Explain two effective methods used for soil conservation in hilly and mountainous terrains.",
        sample_answer: "1) Terrace Farming: Broad flat step-like terraces cut into steep slopes reduce surface water runoff and soil erosion. 2) Contour Ploughing: Ploughing along natural contour lines creates natural barriers to water flow.",
        memory_hook: "Terrace steps on hills, Shelter belts in plains, CITES protects wild species."
      },
      {
        num: 3,
        title: "Agriculture",
        concept: "Farming systems, subsistence vs commercial farming, shifting cultivation, plantation agriculture, and major food/cash crops.",
        points: [
          "Agricultural inputs (seeds, fertilisers, machinery, labour) $\\to$ Operations (ploughing, sowing, spraying) $\\to$ Outputs (crops, dairy, wool).",
          "Subsistence Agriculture: Farming to meet family needs using low technology (Intensive Subsistence in monsoon Asia; Primitive Shifting cultivation / Slash-and-Burn; Nomadic Herding).",
          "Commercial Agriculture: Crops grown for sale in market using high capital and machinery (Commercial grain farming, Mixed farming, Plantations).",
          "Plantations: Single cash crop grown over a vast estate for industry (Tea in Assam, Coffee in Brazil, Rubber in Malaysia).",
          "Major Crops: Rice (high temp, high humidity, alluvial clayey soil), Wheat (moderate temp, well-drained loamy soil), Cotton (black soil, 210 frost-free days), Jute (Golden fibre, high rainfall)."
        ],
        formula: "\\text{Farm System} = \\text{Inputs (Seeds, Capital)} \\to \\text{Processes (Sow, Harvest)} \\to \\text{Outputs (Crops)}",
        sample_question: "Differentiate between intensive subsistence farming and commercial grain farming.",
        sample_answer: "Intensive subsistence uses small landholdings, manual family labour, and simple tools to produce food for family consumption; Commercial grain farming uses massive automated farms, heavy machinery, and high capital to produce wheat/maize for commercial market sale.",
        memory_hook: "Subsistence = Survival; Commercial = Cash & Market; Cotton needs 210 Frost-Free Days!"
      },
      {
        num: 4,
        title: "Industries",
        concept: "Classification of secondary manufacturing industries by raw material, size, and ownership; industrial clusters.",
        points: [
          "Secondary economic activities transform raw materials into higher-value finished products for consumers.",
          "Classification by Raw Materials: Agro-based (food processing, cotton textiles), Mineral-based (iron & steel), Marine-based (fish oil), Forest-based (paper, furniture).",
          "Classification by Size: Small-scale (cottage handicrafts, low capital) and Large-scale (automobiles, heavy machinery).",
          "Classification by Ownership: Private Sector (Tata), Public Sector (SAIL, BHEL), Joint Sector (Maruti Udyog), Cooperative Sector (Amul, Sudha Dairy).",
          "Industrial Hubs: Iron and Steel at Jamshedpur (TISCO, near Subarnarekha river/iron ore) and Pittsburgh, USA; Information Technology at Silicon Valley, California and Bengaluru, India."
        ],
        formula: "\\text{Industry} = \\text{Raw Materials} + \\text{Power} + \\text{Labour} + \\text{Transport} + \\text{Market}",
        sample_question: "Why is Bengaluru renowned as the Silicon Plateau of India?",
        sample_answer: "Bengaluru has a pleasant mild climate year-round, top engineering and scientific institutions, abundant skilled IT professionals, and supportive state government IT policies.",
        memory_hook: "Agro, Mineral, Marine, Forest = Materials; Small vs Large = Size; Private, Public, Joint, Co-op = Ownership."
      },
      {
        num: 5,
        title: "Human Resources",
        concept: "Global population distribution, population density, factors affecting growth (birth/death rates, migration), and population pyramids.",
        points: [
          "Human resources are the ultimate asset of a nation, shaped by education, health, and skill levels.",
          "Population Density $= \\frac{\\text{Total Population}}{\\text{Total Land Area}}$ (Average density of India is over $382\\text{ persons/sq km}$; highest in Gangetic plains).",
          "Natural Population Growth Rate $= \\text{Birth Rate} - \\text{Death Rate}$; Migration is movement in (Immigration) and out (Emigration) of a region.",
          "Population Pyramid (Age-Sex Pyramid): Graphical representation of population structure by age cohorts and gender.",
          "Pyramid Shapes: Broad base and rapidly narrowing top indicates high birth and high death rates (Kenya); Triangular stable pyramid shows low birth and death rates (Japan, ageing population)."
        ],
        formula: "\\text{Population Density} = \\frac{\\text{Total Population}}{\\text{Total Area (km}^2)}, \\quad \\text{Growth} = \\text{Births} - \\text{Deaths} + \\text{Net Migration}",
        sample_question: "What does a population pyramid with a broad base and narrow top indicate about a country?",
        sample_answer: "It indicates a high birth rate (many young children at base) alongside a high death rate where relatively few people survive into old age.",
        memory_hook: "Broad base = High births; Narrow top = High deaths; Density = People per sq km."
      },
      {
        num: 6,
        title: "How, When and Where (Modern History)",
        concept: "Colonial periodisation, critique of James Mill's tripartite division, official colonial archives, and surveys.",
        points: [
          "Scottish economist James Mill divided Indian history into three biased religious periods in 1817: 'Hindu', 'Muslim', and 'British'.",
          "Historians re-periodised history into Ancient, Medieval, and Modern (Colonial) to reflect socio-economic structural shifts.",
          "Colonialism is the process of subjugation of one country by another, leading to political, economic, social, and cultural subjugation.",
          "British Archives: The British believed in recording every policy, treaty, and order, setting up Record Rooms attached to administrative offices and National Archives of India in New Delhi.",
          "Colonial surveys (topographical, revenue, botanical, archaeological, census every 10 years) were conducted to control and exploit territory efficiently."
        ],
        formula: "\\text{Colonialism} = \\text{Political Domination} + \\text{Economic Exploitation} + \\text{Cultural Subjugation}",
        sample_question: "Why did the British administration conduct detailed surveys and maintain record rooms across India?",
        sample_answer: "The British believed that to govern and tax a country effectively, they needed comprehensive knowledge of its topography, soil quality, flora, fauna, cropping patterns, local customs, and revenue histories.",
        memory_hook: "Mill divided by religion; British recorded everything in archives!"
      },
      {
        num: 7,
        title: "From Trade to Territory: The Company Establishes Power",
        concept: "East India Company trade monopoly, Battle of Plassey (1757), Battle of Buxar (1764), Subsidiary Alliance, and Doctrine of Lapse.",
        points: [
          "English East India Company received a Royal Charter from Queen Elizabeth I in 1600, granting exclusive monopoly on eastern trade.",
          "Battle of Plassey (1757): Robert Clive defeated Nawab Sirajuddaulah of Bengal through the treachery of commander Mir Jafar, marking the start of British political rule in India.",
          "Battle of Buxar (1764): British defeated combined armies of Mir Qasim, Shuja-ud-Daula, and Shah Alam II, securing Diwani (revenue collecting) rights of Bengal, Bihar, and Orissa in 1765.",
          "Subsidiary Alliance (Lord Wellesley): Indian rulers were forbidden from maintaining independent armies, forced to pay for British subsidiary forces, and had to accept a British Resident at their court.",
          "Doctrine of Lapse (Lord Dalhousie): If an Indian ruler died without a natural male heir, his kingdom was annexed to British territory (Satara, Sambalpur, Nagpur, Jhansi)."
        ],
        formula: "1600 \\text{ (Charter)} \\to 1757 \\text{ (Plassey)} \\to 1764 \\text{ (Buxar)} \\to 1765 \\text{ (Diwani Rights)}",
        sample_question: "Explain the terms and impact of the Subsidiary Alliance system introduced by Lord Wellesley.",
        sample_answer: "Indian rulers had to disband their independent armies, station British troops at their own expense, and accept a British Resident. If a ruler failed to make payments, part of his territory was ceded to the Company (e.g. Awadh and Hyderabad).",
        memory_hook: "Plassey 1757 started it; Diwani 1765 funded it; Doctrine of Lapse annexed it!"
      },
      {
        num: 8,
        title: "Ruling the Countryside",
        concept: "Colonial land revenue settlements (Permanent Settlement, Ryotwari, Mahalwari) and the Blue Indigo Rebellion.",
        points: [
          "Permanent Settlement (1793 by Lord Cornwallis in Bengal): Revenue amount fixed permanently; Rajas and Taluqdars recognized as Zamindars collecting fixed rent from peasants.",
          "Mahalwari System (1822 by Holt Mackenzie in North-Western Provinces): Revenue estimated village by village (Mahal) and revised periodically; collected by the village headman.",
          "Ryotwari / Munro System (by Thomas Munro in South India): Revenue settled directly with individual cultivating peasants (Ryots).",
          "Forced Indigo Cultivation: Nij system (planters grew indigo directly on leased land) and Ryoti system (planters forced peasants to sign agreements/sattas taking cash advances).",
          "Blue Rebellion (1859): Thousands of Bengal ryots unitedly refused to grow indigo, attacked planters' factories with spears and bows, forcing the British government to appoint the Indigo Commission."
        ],
        formula: "\\text{Settlements: } \\text{Permanent (Zamindars)} \\mid \\text{Mahalwari (Village Headman)} \\mid \\text{Ryotwari (Ryots)}",
        sample_question: "Why did Bengal ryots stage the historic Blue Rebellion against indigo planters in 1859?",
        sample_answer: "Planters paid ryots meager fixed prices for indigo, forcing them to cultivate indigo on their most fertile food-crop lands. The deep indigo roots exhausted the soil for rice, plunging farmers into unending debt traps.",
        memory_hook: "Cornwallis = Zamindari; Munro = Ryotwari; Blue Rebellion freed Bengal ryots!"
      },
      {
        num: 9,
        title: "Tribals, Dikus and Vision of Golden Age & 1857 Rebellion",
        concept: "Tribal livelihoods, forest laws, Birsa Munda rebellion, and the Great Revolt of 1857 (Sepoy Mutiny).",
        points: [
          "Tribal groups practiced Jhum (shifting cultivation), hunting-gathering (Khonds of Orissa), and pastoralism (Gaddis, Bakarwals).",
          "Colonial forest laws classified forests as 'Reserved' (producing timber for railway sleepers), evicting tribals and turning them into indentured tea plantation and coal mine labourers.",
          "Birsa Munda Movement in Chotanagpur (1890s): Led the Ulgulan (Great Tumult) against Dikus (outsiders: British, moneylenders, zamindars) to establish Munda Raj.",
          "Great Revolt of 1857: Triggered on 29 March 1857 when Mangal Pandey mutinied at Barrackpore against greased cartridges (cow/pig fat). Sepoys marched from Meerut to Delhi, declaring Bahadur Shah Zafar Emperor of India.",
          "1858 Government of India Act: Power transferred from East India Company to the British Crown under Queen Victoria, ending Company rule."
        ],
        formula: "1857 \\text{ (Revolt)} \\xrightarrow{\\text{Act of 1858}} \\text{Company Rule Ends } \\to \\text{Direct Crown Rule (Viceroy)}",
        sample_question: "What immediate cause sparked the 1857 Indian Sepoy Mutiny at Meerut and Delhi?",
        sample_answer: "The introduction of the new Enfield rifle cartridges greased with cow and pig fat, which sepoys had to bite off before loading, insulting both Hindu and Muslim religious beliefs.",
        memory_hook: "Birsa fought Dikus; 1857 united sepoys; 1858 brought Crown rule."
      },
      {
        num: 10,
        title: "Indian Constitution, Secularism, Judiciary and Marginalisation",
        concept: "Constitutional democracy, Indian secularism, independent judiciary, Public Interest Litigation (PIL), and marginalisation.",
        points: [
          "The Indian Constitution ensures fundamental rights (Equality, Freedom, Freedom of Religion, Cultural & Educational, Constitutional Remedies).",
          "Indian Secularism: Principled distance where the state does not establish any official religion, ensuring equal freedom of conscience and non-discrimination.",
          "Independent Judiciary: Structure comprises Supreme Court of India (New Delhi, headed by CJI) $\\to$ High Courts in states $\\to$ District Subordinate Courts.",
          "Public Interest Litigation (PIL): Introduced in the 1980s by Supreme Court, allowing any citizen or group to file a petition on behalf of underprivileged victims of rights violations.",
          "Marginalisation: Social, economic, and political exclusion of Adivasis (tribals), Dalits, and religious minorities; addressed via Article 17 (abolition of Untouchability) and SC/ST Prevention of Atrocities Act (1989)."
        ],
        formula: "\\text{Judicial Hierarchy: Supreme Court (Apex)} \\longrightarrow \\text{High Courts} \\longrightarrow \\text{District Courts}",
        sample_question: "What is Public Interest Litigation (PIL) and why was it revolutionary in the Indian justice system?",
        sample_answer: "PIL allows any public-spirited individual or NGO to approach the High Court or Supreme Court directly to seek justice for marginalized citizens who cannot afford legal representation due to poverty or illiteracy.",
        memory_hook: "Article 17 bans untouchability; PIL brings justice to the poorest!"
      }
    ],
    "English": [
      {
        num: 1,
        title: "Unit 1: The Best Christmas Present in the World & The Ant and the Cricket",
        concept: "Historic Christmas Truce of 1914 during World War I; fable on foresight and hard work.",
        points: [
          "The narrator finds a hidden wartime letter inside an antique roll-top desk written by British soldier Jim Macpherson to his wife Connie.",
          "The letter describes the spontaneous Christmas Truce of 1914 in No Man's Land between British and German soldiers sharing sausages, schnapps, and a friendly football match.",
          "The narrator delivers the letter to 101-year-old Connie in a nursing home, who mistakes him for Jim returning home—her 'best Christmas present'.",
          "Fable 'The Ant and the Cricket' contrasts the prudent ant who works through summer with the frivolous cricket who starves in winter ('Folks call this a fable. I’ll warrant it true').",
          "Grammar focus: Past Perfect tense ($had + V_3$) vs Simple Past tense."
        ],
        formula: "\\text{Past Perfect: } \\text{Earlier Action } (had + V_3) \\text{ before Simple Past Action } (V_2)",
        sample_question: "What was the miraculous event that occurred in No Man's Land on Christmas Day in 1914?",
        sample_answer: "British and German soldiers laid down their weapons, walked into No Man's Land, sang carols, shook hands, shared Christmas rations, and played a game of football in peace.",
        memory_hook: "Humanity transcends trenches; Ants work in summer to eat in winter."
      },
      {
        num: 2,
        title: "Unit 2: The Tsunami & Geography Lesson",
        concept: "Human courage and animal sixth-sense during the 2004 Indian Ocean Tsunami; aerial poetic perspective on human divisions.",
        points: [
          "Real-life survivor accounts from the devastating 26 December 2004 Indian Ocean Tsunami in the Andaman & Nicobar Islands and Tamil Nadu coast.",
          "Tilly Smith, a 10-year-old British schoolgirl, recognized tsunami warning signs (frothing, receding sea) learned in geography class, saving hundreds of lives on Phuket beach.",
          "Animal Sixth Sense: Wild and domestic animals (elephants, flamingos, dogs) fled to higher ground before the giant tsunami waves struck, with very low animal casualties.",
          "Poem 'Geography Lesson' (Zulfikar Ghose): From a jet plane at 10,000 feet, the poet realizes cities grow near rivers naturally, but laments from orbit that humans build walls and hate one another.",
          "Grammar focus: Active and Passive voice transformations."
        ],
        formula: "\\text{Active: Subject + Verb + Object} \\longleftrightarrow \\text{Passive: Object + is/was + } V_3 \\text{ + by Subject}",
        sample_question: "How did 10-year-old Tilly Smith save lives on the beach during the 2004 Tsunami?",
        sample_answer: "She remembered her geography teacher's video showing sea water bubbling, frothing, and rapidly receding. She sounded the alarm immediately, prompting her family and tourists to evacuate.",
        memory_hook: "Tilly remembered her geography lesson; Earth has no borders from above."
      },
      {
        num: 3,
        title: "Unit 3: Glimpses of the Past & Macavity: The Mystery Cat",
        concept: "Pictorial narrative of India's 1757–1857 freedom struggle; T.S. Eliot's humorous verse on the elusive master criminal cat.",
        points: [
          "Glimpses of the Indian freedom struggle from 1757 to 1857: British East India Company's superior weapons, exploitation of Indian farmers, and decline of local artisans.",
          "Raja Ram Mohan Roy preached that the core truth of all religions is one and advocated modern scientific education.",
          "Discontent spread through oppressive taxes, 1856 religious cartridges, and the 1857 uprising led by Mangal Pandey, Rani Lakshmibai, Begum Hazrat Mahal, and Kunwar Singh.",
          "Poem 'Macavity: The Mystery Cat' (T.S. Eliot): A notorious feline mastermind ('Hidden Paw') who defies Scotland Yard and breaks the law of gravity, disappearing before police arrive.",
          "Grammar focus: Direct and Indirect reported speech conversions."
        ],
        formula: "\\text{Reported Speech: Present Tenses change to corresponding Past Tenses}",
        sample_question: "How does T.S. Eliot portray Macavity's criminal genius in 'The Mystery Cat'?",
        sample_answer: "Macavity is described as a 'Napoleon of Crime' who breaks human laws and the law of gravity. Whenever a crime is committed, Scotland Yard arrives only to find that 'Macavity's not there!'.",
        memory_hook: "1757 to 1857 sparked the First War of Independence; Macavity is never at the crime scene!"
      },
      {
        num: 4,
        title: "Unit 4: Bepin Choudhury's Lapse of Memory & The Last Bargain",
        concept: "Satyajit Ray's psychological comedic prank; Rabindranath Tagore's poem on spiritual freedom and human dignity.",
        points: [
          "Bepin Choudhury is tricked into believing he suffered selective amnesia about a trip to Ranchi in 1958 by strangers who recount vivid details.",
          "Distressed, Bepin visits Ranchi and consults Dr. Chanda, only to discover a letter revealing it was an elaborate theatrical prank orchestrated by his friend Chunilal, whom Bepin had refused to help in hard times.",
          "Theme: Intellectual arrogance humbled by creative wit and the importance of supporting friends in adversity.",
          "Poem 'The Last Bargain' (Rabindranath Tagore): A speaker seeks employment but rejects power (King's sword), wealth (Old man's gold), and fleeting beauty (Fair maiden's smile), accepting only a child playing with sea shells who bargains with 'nothing', securing true inner freedom.",
          "Grammar focus: Idioms, phrasal verbs, and conditional sentences."
        ],
        formula: "\\text{True Value} = \\text{Freedom and Selfless Love} > \\text{Power, Gold, or Flattery}",
        sample_question: "Why did Chunilal play the Ranchi memory prank on Bepin Choudhury?",
        sample_answer: "Chunilal was facing severe financial hardship and asked his old friend Bepin for help finding a job. When Bepin coldly refused, Chunilal used his fertile imagination to play a harmless psychological trick.",
        memory_hook: "Chunilal's clever revenge; Tagore's bargain with a child's free smile."
      },
      {
        num: 5,
        title: "Unit 5: The Summit Within & The School Boy",
        concept: "Major H.P.S. Ahluwalia's Everest ascent and conquest of the internal spiritual summit; William Blake's plea against rigid schooling.",
        points: [
          "Major Ahluwalia, a member of India's successful 1965 Everest expedition, reflects that climbing Mount Everest is both a physical mountaineering triumph and a deep internal spiritual transformation.",
          "Climbing mountains demands three qualities: Endurance, Persistence, and Willpower. Conquering the 'summit within'—one's own ego, fears, and limitations—is more challenging than scaling rock peaks.",
          "Mountains are a means of communion with the divine and test man's humility against nature.",
          "Poem 'The School Boy' (William Blake): A young boy loves the summer morning, singing birds, and nature, but laments being caged in a dreary classroom under the cruel eye of an authoritarian teacher.",
          "Grammar focus: Participles (present and past) and formal expository essay writing."
        ],
        formula: "\\text{Summit of Mind} = \\text{Endurance} + \\text{Persistence} + \\text{Willpower} + \\text{Humility}",
        sample_question: "According to Major Ahluwalia, what are the three physical and mental qualities essential for climbing Everest?",
        sample_answer: "Endurance, persistence, and willpower. The physical ascent tests endurance, while the internal journey demands unwavering persistence and mental determination.",
        memory_hook: "The hardest mountain to conquer is the summit within your own mind!"
      },
      {
        num: 6,
        title: "Unit 6: This is Jody's Fawn & On the Grasshopper and Cricket",
        concept: "Moral responsibility towards wildlife; John Keats's sonnet celebrating the continuous music of nature.",
        points: [
          "Jody's father Penny is bitten by a rattlesnake and saved by using a doe's liver to draw out the poison, leaving her young fawn motherless.",
          "Jody feels deep ethical responsibility, tracking the defenseless fawn through the wilderness, carrying it home in his arms, and feeding it milk with his fingers.",
          "Themes: Moral accountability, empathy for nature, and growing up through compassionate action.",
          "Poem 'On the Grasshopper and Cricket' (John Keats): A Petrarcan sonnet declaring 'The poetry of earth is never dead'. The grasshopper carries the song of summer, while the cricket sings by the warm winter stove.",
          "Grammar focus: Transitive and Intransitive verbs and descriptive narrative paragraphs."
        ],
        formula: "\\text{Keats's Law: Earth's Poetry is Eternal } (\\text{Summer = Grasshopper, Winter = Cricket})",
        sample_question: "Why was Jody desperate to find and bring the orphaned fawn to his home?",
        sample_answer: "His father's life had been saved by killing the mother doe. Jody felt that leaving the helpless fawn to starve in the forest would be ungrateful and deeply immoral.",
        memory_hook: "Jody saved the fawn; Earth's music never stops across seasons."
      }
    ]
  };
})();
