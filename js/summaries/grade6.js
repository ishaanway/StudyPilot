/* StudyPilot NCERT Chapter Summaries - Grade 6 */
(function () {
  window.NCERT_ALL_SUMMARIES = window.NCERT_ALL_SUMMARIES || {};
  window.NCERT_ALL_SUMMARIES["6"] = {
    "Mathematics": [
      {
        num: 1,
        title: "Patterns in Mathematics",
        concept: "Exploration of visual, numerical, and geometric patterns to develop early algebraic thinking.",
        points: [
          "A sequence is an ordered list of numbers following a definite mathematical rule.",
          "Arithmetic growth patterns increase or decrease by a constant difference at each consecutive step.",
          "Geometric patterns in shapes (dot grids, matchstick arrangements) translate into general algebraic formulas like $2n$ or $2n + 1$.",
          "Recognizing symmetry and repetition in patterns forms the foundation of number theory and functions."
        ],
        formula: "\\text{General Term: } T_n = a + (n - 1)d",
        sample_question: "Find the 10th term in the matchstick pattern where each stage adds 3 sticks: 4, 7, 10, 13...",
        sample_answer: "The rule is $T_n = 3n + 1$. For $n = 10$, $T_{10} = 3(10) + 1 = 31$ sticks.",
        memory_hook: "Pattern = Rule + Step (Find the common difference first!)."
      },
      {
        num: 2,
        title: "Lines and Angles",
        concept: "Fundamental elements of plane geometry: points, rays, line segments, and angle classifications.",
        points: [
          "A point marks an exact location with no dimensions; a line extends infinitely in both directions ($\\\\overleftrightarrow{AB}$).",
          "A line segment has two fixed endpoints ($\\\\overline{AB}$); a ray has one fixed starting endpoint and extends indefinitely ($\\\\overrightarrow{AB}$).",
          "Angles are formed when two rays share a common vertex, measured in degrees ($^\\circ$) using a protractor.",
          "Angle classifications: Acute ($< 90^\\circ$), Right ($= 90^\\circ$), Obtuse ($90^\\circ < \\theta < 180^\\circ$), Straight ($= 180^\\circ$), Reflex ($180^\\circ < \\theta < 360^\\circ$), Complete ($= 360^\\circ$)."
        ],
        formula: "\\text{Right Angle} = 90^\\circ, \\quad \\text{Straight Angle} = 180^\\circ",
        sample_question: "Classify an angle measuring $135^\\circ$ and state between which two standard angles it lies.",
        sample_answer: "It is an obtuse angle because it is greater than $90^\\circ$ (right angle) and less than $180^\\circ$ (straight angle).",
        memory_hook: "Acute = Cute/Small (<90°), Obtuse = Obese/Large (>90°)."
      },
      {
        num: 3,
        title: "Number Play",
        concept: "Place value notation, estimation, large numbers, and the Indian vs International numeral systems.",
        points: [
          "Indian System periods: Ones, Thousands, Lakhs, Crores (commas: 3, 2, 2 digits from the right).",
          "International System periods: Ones, Thousands, Millions, Billions (commas: 3, 3, 3 digits from the right).",
          "Relation: $1\\text{ Lakh} = 100\\text{ Thousand}$, $10\\text{ Lakhs} = 1\\text{ Million}$, $1\\text{ Crore} = 10\\text{ Million}$.",
          "Rounding off and estimation allow quick approximations in real-life budgeting and measurement.",
          "Roman numerals use seven basic symbols: I (1), V (5), X (10), L (50), C (100), D (500), M (1000)."
        ],
        formula: "1\\text{ Crore} = 10\\text{ Million} = 10^7, \\quad 1\\text{ Lakh} = 100,000 = 10^5",
        sample_question: "Write 7,452,389 with Indian system commas and in words.",
        sample_answer: "Indian notation: 74,52,389. Words: Seventy-four lakh, fifty-two thousand, three hundred eighty-nine.",
        memory_hook: "Indian: 3, then 2, 2, 2. International: 3, 3, 3 always!"
      },
      {
        num: 4,
        title: "Data Handling and Presentation",
        concept: "Systematic collection, organization into tally frequency tables, pictographs, and bar graphs.",
        points: [
          "Raw data is an unorganized collection of initial observations, measurements, or counts.",
          "Tally marks group counts in bundles of 5 (four vertical strokes and a diagonal fifth stroke: $\\\\cancel{||||}$).",
          "Pictographs represent numerical values using pictures or symbols with a defined key or scale.",
          "Bar graphs display categorical data using bars of uniform width and equal spacing, where height represents frequency."
        ],
        formula: "\\text{Scale: } 1\\text{ unit length} = k\\text{ items}",
        sample_question: "In a pictograph where 1 symbol represents 15 students, how many symbols are drawn for 75 students?",
        sample_answer: "Number of symbols = $75 \\div 15 = 5$ complete symbols.",
        memory_hook: "Tally 5s make counting fast; Bar heights show exact scale."
      },
      {
        num: 5,
        title: "Prime Time",
        concept: "Factors, multiples, prime & composite numbers, divisibility rules, HCF, and LCM.",
        points: [
          "A factor divides a number completely with zero remainder; a multiple is the product of that number and any integer.",
          "Prime numbers have exactly two distinct factors (1 and itself). 2 is the only even prime number; 1 is neither prime nor composite.",
          "Divisibility Tests: 2 (even last digit), 3 (sum of digits divisible by 3), 4 (last 2 digits divisible by 4), 5 (ends in 0 or 5), 9 (sum of digits divisible by 9), 11 (difference between odd and even place digit sums is 0 or multiple of 11).",
          "HCF (Highest Common Factor) is the greatest divisor of given numbers; LCM (Lowest Common Multiple) is the smallest common multiple.",
          "Golden Relation for any two numbers: $\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b$."
        ],
        formula: "\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b",
        sample_question: "Find the HCF and LCM of 12 and 18, and verify their product.",
        sample_answer: "Prime factors: $12 = 2^2 \\times 3$, $18 = 2 \\times 3^2$. $\\text{HCF} = 2 \\times 3 = 6$, $\\text{LCM} = 2^2 \\times 3^2 = 36$. Verification: $6 \\times 36 = 216 = 12 \\times 18$.",
        memory_hook: "HCF = Common lowest powers; LCM = All factors highest powers."
      },
      {
        num: 6,
        title: "Perimeter and Area",
        concept: "Measurement of the outer boundary (perimeter) and enclosed 2D region (area) of rectilinear figures.",
        points: [
          "Perimeter is the total length of the continuous boundary enclosing a closed plane geometric figure.",
          "Perimeter of a Rectangle: $P = 2 \\times (\\text{Length} + \\text{Breadth})$; Perimeter of a Square: $P = 4 \\times \\text{Side}$.",
          "Perimeter of an equilateral triangle $= 3 \\times \\text{Side}$; regular hexagon $= 6 \\times \\text{Side}$.",
          "Area is the measure of the flat surface region enclosed inside a closed two-dimensional shape.",
          "Area of a Rectangle: $A = l \\times b$; Area of a Square: $A = s \\times s = s^2$."
        ],
        formula: "P_{\\text{rect}} = 2(l + b), \\quad A_{\\text{rect}} = l \\times b, \\quad A_{\\text{sq}} = s^2",
        sample_question: "Find the cost of fencing a square park of side $25\\text{ m}$ at $\\text{₹}20$ per metre.",
        sample_answer: "Perimeter $= 4 \\times 25\\text{ m} = 100\\text{ m}$. Total Cost $= 100 \\times 20 = \\text{₹}2,000$.",
        memory_hook: "Perimeter = Walk around fence; Area = Carpet inside the room."
      },
      {
        num: 7,
        title: "Fractions",
        concept: "Understanding parts of a whole or collection, fraction types, equivalent fractions, and basic operations.",
        points: [
          "A fraction represents a part of a whole divided into equal portions: $\\frac{a}{b}$ (numerator $a$, denominator $b \\neq 0$).",
          "Proper Fraction: $a < b$ (value $< 1$). Improper Fraction: $a \\ge b$ (value $\\ge 1$). Mixed Fraction: Whole number + Proper fraction ($2\\frac{1}{3} = \\frac{7}{3}$).",
          "Equivalent fractions are generated by multiplying or dividing numerator and denominator by the same non-zero number.",
          "Like fractions have identical denominators; addition/subtraction simply combines their numerators over the common denominator.",
          "To compare or operate on unlike fractions, convert them to equivalent fractions using the LCM of their denominators."
        ],
        formula: "\\frac{a}{c} + \\frac{b}{c} = \\frac{a + b}{c}, \\quad \\frac{a}{b} = \\frac{a \\times k}{b \\times k}",
        sample_question: "Solve $\\frac{2}{3} + \\frac{3}{5}$.",
        sample_answer: "$\\text{LCM}(3, 5) = 15$. $\\frac{2 \\times 5}{15} + \\frac{3 \\times 3}{15} = \\frac{10 + 9}{15} = \\frac{19}{15} = 1\\frac{4}{15}$.",
        memory_hook: "Unlike denominators? Find LCM first!"
      },
      {
        num: 8,
        title: "Playing with Constructions",
        concept: "Practical geometric constructions using ruler, compass, and divider with step-by-step precision.",
        points: [
          "A circle is constructed by fixing a compass radius around a designated centre point.",
          "A perpendicular bisector divides a line segment into two equal halves at a $90^\\circ$ angle.",
          "An angle bisector divides any given angle into two congruent equal angles.",
          "Standard angles ($60^\\circ, 120^\\circ, 90^\\circ, 45^\\circ, 30^\\circ$) are constructed using only a compass and straightedge without a protractor."
        ],
        formula: "\\text{Perpendicular Bisector} \\implies \\angle = 90^\\circ \\text{ and } AP = PB",
        sample_question: "How do you construct a $30^\\circ$ angle using compass and ruler only?",
        sample_answer: "Construct a standard $60^\\circ$ angle by drawing intersecting arcs with equal compass radius, then bisect the $60^\\circ$ angle with the compass to get $30^\\circ$.",
        memory_hook: "Arcs from both ends with radius > half-length find the perpendicular bisector."
      },
      {
        num: 9,
        title: "Symmetry",
        concept: "Line symmetry, mirror reflections, and balanced geometric designs in nature and human art.",
        points: [
          "A figure has line symmetry if a line divides it into two identical halves that coincide exactly when folded along that line.",
          "The line of symmetry is also called the axis of symmetry or mirror line.",
          "Number of lines of symmetry: Equilateral Triangle (3), Square (4), Rectangle (2), Regular Pentagon (5), Circle (infinitely many).",
          "Reflection symmetry preserves distance, size, and shape, but reverses left and right (lateral inversion)."
        ],
        formula: "\\text{Regular polygon with } n \\text{ sides has } n \\text{ lines of symmetry}",
        sample_question: "How many lines of symmetry does a regular hexagon have?",
        sample_answer: "A regular hexagon has 6 lines of symmetry (3 joining opposite vertices and 3 joining midpoints of opposite sides).",
        memory_hook: "Fold along the line: if edges match perfectly, it is symmetric!"
      },
      {
        num: 10,
        title: "The Other Side of Zero",
        concept: "Introduction to negative integers, number line orientation, absolute value, and integer addition/subtraction.",
        points: [
          "Integers consist of negative whole numbers, zero, and positive whole numbers ($\\{\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots\\}$).",
          "On a horizontal number line, numbers to the right are positive and increase in value; numbers to the left are negative and decrease.",
          "Zero ($0$) is neither positive nor negative; it separates positive integers from negative integers.",
          "Addition rule: Adding a positive moves right; adding a negative moves left. Subtracting a negative equals adding a positive ($a - (-b) = a + b$)."
        ],
        formula: "a - (-b) = a + b, \\quad -(-a) = +a",
        sample_question: "Calculate $(-15) - (-25) + (-10)$.",
        sample_answer: "$(-15) + 25 - 10 = 10 - 10 = 0$.",
        memory_hook: "Subtracting a negative is like taking away a debt: you get positive!"
      }
    ],
    "Science": [
      {
        num: 1,
        title: "The Wonderful World of Science",
        concept: "Scientific inquiry, observation, questioning, hypothesis, experimentation, and critical thinking.",
        points: [
          "Science is a systematic study of the natural world through careful observation, inquiry, and evidence-based experiments.",
          "The scientific method includes: Observation $\\to$ Asking Questions $\\to$ Hypothesizing $\\to$ Experimentation $\\to$ Analysis $\\to$ Conclusion.",
          "Scientific models and controlled experiments help verify patterns in nature, from microscopic cells to massive galaxies.",
          "Cultivating scientific curiosity helps solve everyday environmental, technological, and medical challenges."
        ],
        formula: "\\text{Observation} \\longrightarrow \\text{Hypothesis} \\longrightarrow \\text{Experiment} \\longrightarrow \\text{Verified Theory}",
        sample_question: "What are the essential steps of a fair scientific experiment?",
        sample_answer: "Identify the problem, formulate a hypothesis, keep all variables constant except the independent variable being tested, record data, and draw verified conclusions.",
        memory_hook: "Observe $\\to$ Question $\\to$ Test $\\to$ Discover!"
      },
      {
        num: 2,
        title: "Diversity in the Living World",
        concept: "Habitats, environmental adaptations, biotic and abiotic components, and biodiversity conservation.",
        points: [
          "Habitat is the natural dwelling environment where an organism finds food, water, shelter, and breeding conditions.",
          "Major habitats: Terrestrial (deserts, forests, grasslands, mountains) and Aquatic (freshwater ponds/rivers, marine oceans).",
          "Biotic components are living organisms (plants, animals, microbes); Abiotic components are non-living factors (air, water, light, temperature, soil).",
          "Adaptations: Camels have long legs, padded feet, and hump for desert survival; Fish have streamlined bodies, fins, and gills to extract dissolved oxygen in water."
        ],
        formula: "\\text{Ecosystem} = \\text{Biotic Factors} + \\text{Abiotic Factors}",
        sample_question: "Explain two key adaptations that help cactus survive in dry desert habitats.",
        sample_answer: "1) Leaves are reduced to spines to minimize water loss through transpiration; 2) Stems are green and fleshy to store water and carry out photosynthesis.",
        memory_hook: "Adaptation = Survival gear custom-built for the habitat."
      },
      {
        num: 3,
        title: "Mindful Eating: A Path to a Healthy Body",
        concept: "Nutrient classifications, dietary functions, balanced diet, testing for starch/protein/fats, and deficiency diseases.",
        points: [
          "Major nutrients: Carbohydrates and Fats (Energy providers), Proteins (Body building and tissue repair), Vitamins and Minerals (Protective nutrients).",
          "Dietary fibre (Roughage) and Water do not provide energy but are vital for proper digestion and bowel movement.",
          "Chemical Tests: Iodine solution turns starch blue-black; Copper sulphate + Caustic soda (Biuret test) turns protein violet; Translucent grease patch on paper confirms fat.",
          "A balanced diet contains all essential nutrients in proper proportions according to age, gender, and physical activity.",
          "Deficiency diseases: Scurvy (Vitamin C), Rickets (Vitamin D), Beriberi (Vitamin B1), Night blindness (Vitamin A), Goitre (Iodine), Anemia (Iron)."
        ],
        formula: "\\text{Starch} + \\text{Iodine} \\longrightarrow \\text{Blue-Black Complex}",
        sample_question: "How do you test a food sample for the presence of protein in the laboratory?",
        sample_answer: "Mash the food into a paste with water in a test tube. Add 2 drops of Copper Sulphate solution and 10 drops of Caustic Soda (NaOH). Shake well; a violet/purple color confirms protein.",
        memory_hook: "Iodine = Starch Blue-Black; Biuret = Protein Purple; Translucent spot = Fat."
      },
      {
        num: 4,
        title: "Exploring Magnets",
        concept: "Magnetic properties, North-South polarity, magnetic attraction/repulsion, compass navigation, and demagnetization.",
        points: [
          "Magnetic materials are attracted to magnets (iron, cobalt, nickel); Non-magnetic materials are not (wood, plastic, copper, aluminium).",
          "Every magnet has two magnetic poles: North (N) and South (S), where magnetic attraction is concentrated and strongest.",
          "Fundamental Law of Magnetism: Like poles repel each other ($N-N$ or $S-S$); Unlike poles attract each other ($N-S$).",
          "A freely suspended bar magnet always aligns itself along the Earth's geographic North-South direction.",
          "Magnets lose their magnetism if heated, hammered, or dropped from height; stored in pairs with soft iron keepers."
        ],
        formula: "\\text{Like Poles Repel } (N \\leftrightarrow N), \\quad \\text{Unlike Poles Attract } (N \\rightarrow \\leftarrow S)",
        sample_question: "Why is repulsion considered the only sure test for magnetism?",
        sample_answer: "A magnet attracts both an opposite magnetic pole and unmagnetized magnetic materials (like iron). Repulsion occurs only between two like magnetic poles, confirming both are magnets.",
        memory_hook: "Likes Push Away, Opposites Attract, Suspended points North!"
      },
      {
        num: 5,
        title: "Measurement of Length and Motion",
        concept: "Standard International (SI) units, measuring tools, parallax error prevention, and motion classifications.",
        points: [
          "SI unit of length is the metre ($\\text{m}$); $1\\text{ m} = 100\\text{ cm} = 1000\\text{ mm}$, $1\\text{ km} = 1000\\text{ m}$.",
          "Standard units ensure uniform and accurate measurements globally, replacing non-standard body units (cubit, handspan).",
          "When taking ruler measurements, place the scale exactly parallel and keep eye position directly above the reading mark to avoid parallax error.",
          "Types of Motion: Rectilinear (straight line motion, like a marching squad), Circular (motion along circular path, like fan blades), Periodic (repeats at regular time intervals, like a pendulum), Rotational (spinning on its own fixed axis)."
        ],
        formula: "1\\text{ km} = 10^3\\text{ m} = 10^5\\text{ cm} = 10^6\\text{ mm}",
        sample_question: "Identify the types of motion present in a rolling bicycle wheel moving along a straight road.",
        sample_answer: "The wheel exhibits Rotational motion (spinning on its axle) and Rectilinear motion (translating forward along the straight road).",
        memory_hook: "Straight = Rectilinear, Circle = Circular, Repeating = Periodic, Spinning = Rotational."
      },
      {
        num: 6,
        title: "Materials Around Us",
        concept: "Classification of materials by physical properties: appearance, hardness, solubility, density/buoyancy, and transparency.",
        points: [
          "Lustre: Metals (gold, copper, aluminium) have a shiny lustrous surface when freshly cut; non-metals are usually dull.",
          "Hardness: Hard materials cannot be easily compressed or scratched (diamond, iron); Soft materials compress easily (sponge, chalk, wax).",
          "Solubility: Substances that dissolve completely in water are soluble (salt, sugar); substances that do not dissolve are insoluble (sand, chalk powder).",
          "Density & Floating: Objects denser than water sink (iron nail, stone); objects less dense than water float (dry leaf, oil, cork).",
          "Transparency: Transparent (see clearly through, like glass/water), Translucent (see partially, like butter paper/frosted glass), Opaque (cannot see through, like wood/metal)."
        ],
        formula: "\\text{Density } \\rho = \\frac{\\text{Mass}}{\\text{Volume}} \\quad (\\rho_{\\text{object}} < \\rho_{\\text{water}} \\implies \\text{Floats})",
        sample_question: "Classify clear glass, tracing paper, and a wooden board as transparent, translucent, or opaque.",
        sample_answer: "Clear glass is transparent (transmits light completely); Tracing paper is translucent (diffuses light partially); Wooden board is opaque (blocks light completely).",
        memory_hook: "Clear = Transparent, Blurry = Translucent, Blocked = Opaque."
      },
      {
        num: 7,
        title: "Temperature and its Measurement",
        concept: "Distinction between heat and temperature, Celsius/Kelvin scales, clinical vs laboratory thermometers.",
        points: [
          "Temperature is the quantitative measure of the degree of hotness or coldness of an object, measured using a thermometer.",
          "Clinical Thermometer: Measures human body temperature with a range of $35^\\circ\\text{C}$ to $42^\\circ\\text{C}$ ($94^\\circ\\text{F}$ to $108^\\circ\\text{F}$); has a kink/constriction to prevent mercury backflow.",
          "Laboratory Thermometer: Measures chemical/liquid temperatures with a typical range of $-10^\\circ\\text{C}$ to $110^\\circ\\text{C}$; has no kink and must be read while immersed.",
          "Normal human body temperature is approximately $37.0^\\circ\\text{C}$ ($98.6^\\circ\\text{F}$)."
        ],
        formula: "^\\circ\\text{F} = \\left(\\frac{9}{5} \\times ^\\circ\\text{C}\\right) + 32, \\quad \\text{K} = ^\\circ\\text{C} + 273.15",
        sample_question: "Why can a laboratory thermometer NOT be used to measure human body temperature?",
        sample_answer: "A laboratory thermometer does not have a kink in its capillary tube. As soon as it is removed from the mouth, the mercury level drops immediately, giving an inaccurate reading.",
        memory_hook: "Kink in clinical keeps reading locked; Lab thermometer must stay dipped!"
      },
      {
        num: 8,
        title: "A Journey through States of Water",
        concept: "Phase changes of water, latent heat, evaporation, condensation, precipitation, and the global hydrological cycle.",
        points: [
          "Water exists in three reversible physical states: Solid (ice), Liquid (water), and Gas (water vapor / steam).",
          "Evaporation: Slow conversion of liquid water into vapor at any temperature below its boiling point ($100^\\circ\\text{C}$), enhanced by heat, wind speed, surface area, and dry air.",
          "Condensation: Process where water vapor cools and transforms back into liquid water droplets (forming clouds, dew, and fog).",
          "Precipitation: Water droplets in clouds combine, become heavy, and fall as rain, snow, sleet, or hail.",
          "The continuous natural circulation of water between oceans, atmosphere, and land is called the Water Cycle."
        ],
        formula: "\\text{Ice } \\xrightleftharpoons[\\text{Freeze}]{\\text{Melt}} \\text{ Water } \\xrightleftharpoons[\\text{Condense}]{\\text{Evaporate}} \\text{ Water Vapour}",
        sample_question: "Why do tiny water droplets appear on the outer surface of a glass tumbler containing ice-cold water?",
        sample_answer: "Water vapor present in the surrounding air comes in contact with the cold outer surface of the glass, cools down, and condenses into liquid water droplets.",
        memory_hook: "Evaporate up $\\to$ Condense into clouds $\\to$ Precipitate down $\\to$ Flow to sea!"
      },
      {
        num: 9,
        title: "Methods of Separation in Everyday Life",
        concept: "Physical separation methods: handpicking, threshing, winnowing, sieving, sedimentation, decantation, filtration, and evaporation.",
        points: [
          "Handpicking separates visibly different impurities by hand (stones from grain pulses).",
          "Threshing separates harvested grain seeds from dry stalks by beating or mechanical threshers.",
          "Winnowing separates lighter husk particles from heavier grain seeds using blowing wind.",
          "Sedimentation allows heavier insoluble solid particles to settle down at the bottom of a liquid; Decantation carefully pours off the clear upper liquid without disturbing sediment.",
          "Filtration uses a porous filter paper to separate fine insoluble solids from liquid; Evaporation evaporates the solvent liquid to recover dissolved soluble solids (salt from seawater)."
        ],
        formula: "\\text{Seawater } \\xrightarrow{\\text{Evaporation}} \\text{ Water Vapour (escapes)} + \\text{ Solid Salt (remains)}",
        sample_question: "How would you separate a mixture of sand and salt in water?",
        sample_answer: "1) Dissolve the mixture in water; salt dissolves while sand remains insoluble. 2) Filter the solution; sand is retained on filter paper. 3) Heat the filtrate; water evaporates leaving pure salt behind.",
        memory_hook: "Heavy settle = Sedimentation; Pour off = Decantation; Paper trap = Filtration."
      },
      {
        num: 10,
        title: "Living Creatures: Exploring their Characteristics",
        concept: "Fundamental characteristics distinguishing living organisms from non-living matter.",
        points: [
          "Cellular Organisation: All living organisms are composed of microscopic functional units called cells.",
          "Nutrition & Respiration: Organisms require energy from food and utilize oxygen to release energy through cellular respiration.",
          "Growth & Development: Living organisms exhibit irreversible increase in size, mass, and structural complexity.",
          "Response to Stimuli: Organisms detect and respond to changes in environment (e.g. Mimosa pudica leaves fold when touched).",
          "Excretion & Reproduction: Removal of toxic metabolic waste products (excretion) and producing offspring of their own kind to sustain species (reproduction)."
        ],
        formula: "\\text{Glucose} + \\text{Oxygen} \\longrightarrow \\text{Carbon Dioxide} + \\text{Water} + \\text{Energy (ATP)}",
        sample_question: "State any four universal characteristics shared by all living organisms.",
        sample_answer: "1) Cellular structure, 2) Growth and development, 3) Respiration and metabolism, 4) Response to environmental stimuli, and 5) Ability to reproduce.",
        memory_hook: "MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition."
      },
      {
        num: 11,
        title: "Nature's Treasures",
        concept: "Natural resources, air/water/soil conservation, renewable vs exhaustible resources, and sustainable usage.",
        points: [
          "Natural resources are materials supplied by nature that support life and human economic activity (air, water, fertile soil, forests, minerals).",
          "Renewable Resources: Replenished naturally over short periods (sunlight, wind energy, tidal energy, rainfall).",
          "Non-Renewable Resources: Exhaustible reserves formed over millions of years that cannot be quickly replaced (coal, petroleum, natural gas, metal ores).",
          "Soil Conservation: Preventing topsoil loss through afforestation, contour ploughing, crop rotation, and building check dams.",
          "Principle of 3 R's: Reduce consumption, Reuse items, and Recycle waste materials to protect ecosystems."
        ],
        formula: "\\text{Sustainability} = \\text{Resource Use Rate} \\le \\text{Natural Regeneration Rate}",
        sample_question: "Differentiate between renewable and non-renewable natural resources with two examples each.",
        sample_answer: "Renewable resources regenerate naturally and do not exhaust easily (e.g., solar energy, wind); Non-renewable resources are limited and exhaust with continuous use (e.g., coal, crude petroleum).",
        memory_hook: "Reduce, Reuse, Recycle to protect Earth's Treasures!"
      },
      {
        num: 12,
        title: "Beyond Earth",
        concept: "Celestial bodies, solar system architecture, planets, lunar phases, constellations, and space exploration.",
        points: [
          "The Solar System comprises the central Sun, 8 planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune), dwarf planets, asteroids, and comets.",
          "Planets revolve around the Sun in fixed elliptical orbits and rotate on their own internal axes.",
          "Moon Phases: The Moon does not emit its own light; it reflects sunlight. The changing illuminated portion visible from Earth produces lunar phases from New Moon (Amavasya) to Full Moon (Purnima).",
          "Constellations are recognizable patterns formed by groups of stars in the night sky (e.g. Ursa Major / Saptarshi, Orion the Hunter).",
          "Pole Star (Dhruva Tara) remains stationary in the northern sky and has guided navigation for centuries."
        ],
        formula: "\\text{Planets from Sun: } \\text{My Very Educated Mother Just Served Us Noodles}",
        sample_question: "Why do we observe different phases of the Moon during a month?",
        sample_answer: "The Moon revolves around Earth while illuminated by the Sun. We see only that part of the Moon's illuminated hemisphere which faces Earth at that point in its 29.5-day orbit.",
        memory_hook: "M-V-E-M-J-S-U-N: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune."
      }
    ],
    "Social Science": [
      {
        num: 1,
        title: "Locating Places on the Earth",
        concept: "Globe, geographical grid, parallels of latitude, meridians of longitude, and standard time calculation.",
        points: [
          "The globe is a true spherical three-dimensional model of the Earth tilted at an angle of $23.5^\\circ$.",
          "Latitudes are horizontal parallel circles measured north and south from the Equator ($0^\\circ$) up to the North Pole ($90^\\circ\\text{N}$) and South Pole ($90^\\circ\\text{S}$).",
          "Important Latitudes: Tropic of Cancer ($23.5^\\circ\\text{N}$), Tropic of Capricorn ($23.5^\\circ\\text{S}$), Arctic Circle ($66.5^\\circ\\text{N}$), Antarctic Circle ($66.5^\\circ\\text{S}$).",
          "Longitudes are vertical semi-circles running from North to South Pole, measured east and west from the Prime Meridian ($0^\\circ$) at Greenwich, London.",
          "Time calculation: Earth rotates $360^\\circ$ in 24 hours ($15^\\circ = 1\\text{ hour}$ or $1^\\circ = 4\\text{ minutes}$). Indian Standard Time (IST) is based on $82.5^\\circ\\text{E}$ longitude (+5 hrs 30 mins ahead of GMT)."
        ],
        formula: "\\text{Time Difference} = \\text{Longitude Difference} \\times 4\\text{ minutes}, \\quad \\text{IST} = \\text{GMT} + 5\\text{h } 30\\text{m}",
        sample_question: "If it is 12:00 noon at Greenwich ($0^\\circ$), calculate the local time at $82.5^\\circ\\text{E}$ (IST).",
        sample_answer: "Time difference $= 82.5 \\times 4\\text{ min} = 330\\text{ min} = 5\\text{ hours } 30\\text{ minutes}$. Since it is East of Greenwich, add the time: $12:00 + 5:30 = 5:30\\text{ PM}$.",
        memory_hook: "East = Gain Time (+), West = Lose Time (-). Latitudes are Flat, Longitudes are Long!"
      },
      {
        num: 2,
        title: "Oceans and Continents",
        concept: "Lithosphere and hydrosphere: Seven continents, five major oceans, and global distribution of land and water.",
        points: [
          "Earth's surface is approximately $71\\%$ water (Hydrosphere) and $29\\%$ land (Lithosphere).",
          "Seven Continents (by size): Asia (largest, home to Himalayas), Africa, North America, South America, Antarctica (frozen continent), Europe, Australia (island continent).",
          "Five Oceans (by size): Pacific Ocean (deepest, contains Mariana Trench), Atlantic Ocean ('S' shaped), Indian Ocean (named after a country), Southern Ocean, Arctic Ocean.",
          "The Isthmus of Panama connects North and South America; the Strait of Gibraltar connects the Atlantic Ocean to the Mediterranean Sea."
        ],
        formula: "\\text{Global Surface} \\approx 71\\% \\text{ Hydrosphere} + 29\\% \\text{ Lithosphere}",
        sample_question: "Name the continent through which the Equator, Tropic of Cancer, and Tropic of Capricorn all pass.",
        sample_answer: "Africa is the only continent through which the Equator, Tropic of Cancer, and Tropic of Capricorn all pass.",
        memory_hook: "Asia is biggest; Pacific is deepest; Antarctica is frozen white."
      },
      {
        num: 3,
        title: "Landforms and Life",
        concept: "Major landform categories (mountains, plateaus, plains) and their influence on human settlements and agriculture.",
        points: [
          "Mountains: High relief, steep slopes, cold climate. Types: Fold mountains (Himalayas, Alps), Block mountains (Vosges, Black Forest), Volcanic mountains (Mt Kilimanjaro, Mt Fuji).",
          "Plateaus: Elevated flat-topped tablelands rich in mineral reserves (Deccan Plateau in India, Chota Nagpur plateau, Tibetan Plateau - roof of the world).",
          "Plains: Large stretches of flat land formed by river silt and alluvium deposits (Indo-Gangetic Plains), highly fertile and densely populated.",
          "Landforms dictate agricultural productivity, transportation networks, climate, and population density."
        ],
        formula: "\\text{Types of Mountains: } \\text{Fold } + \\text{Block } + \\text{Volcanic}",
        sample_question: "Why are river plains the most densely populated regions in the world?",
        sample_answer: "River plains have fertile alluvial soil for agriculture, abundant freshwater supply, gentle flat terrain for building transport roads and railways, and favorable living climates.",
        memory_hook: "Mountains = Peaks, Plateaus = Tables, Plains = Fields."
      },
      {
        num: 4,
        title: "Timeline and Sources of History",
        concept: "Chronological timekeeping (BC/BCE and AD/CE), archaeological artifacts, inscriptions, coins, and manuscripts.",
        points: [
          "BCE stands for Before Common Era (counted backwards towards zero); CE stands for Common Era (counted forwards from year 1).",
          "Archaeological Sources: Monuments, excavated tools, pottery, beads, weapons, and skeletal remains discovered through scientific excavation.",
          "Epigraphical Sources: Inscriptions engraved on hard durable surfaces like stone pillars, rock edicts (Ashokan edicts), and copper plates.",
          "Numismatic Sources: Study of ancient coins revealing names of rulers, trade routes, metal metallurgy, and economic prosperity.",
          "Literary Sources: Handwritten manuscripts on palm leaves and birch bark, religious texts (Vedas, Puranas), and secular epics."
        ],
        formula: "\\text{Historical Sources} = \\text{Archaeological (Monuments, Coins, Inscriptions)} + \\text{Literary (Manuscripts, Texts)}",
        sample_question: "Differentiate between an inscription and a manuscript.",
        sample_answer: "An inscription is engraved on hard surfaces like stone or metal and survives for thousands of years; A manuscript is handwritten on perishable materials like palm leaves or birch bark.",
        memory_hook: "Inscriptions = Chiseled in stone; Manuscripts = Written on leaves."
      },
      {
        num: 5,
        title: "India, That Is Bharat",
        concept: "Geographical boundaries, peninsular topography, natural physical divisions, and timeless cultural heritage.",
        points: [
          "India is located in the Northern and Eastern Hemispheres, bounded by the Great Himalayas in the north, Arabian Sea in the west, Bay of Bengal in the east, and Indian Ocean in the south.",
          "Total geographical area is $3.28\\text{ million sq km}$, making India the 7th largest nation in the world.",
          "Physical Divisions: 1) Northern Mountain Wall (Himadri, Himachal, Shiwalik), 2) Northern Fertile Plains, 3) Great Indian Desert (Thar), 4) Peninsular Plateau, 5) Coastal Plains (Western & Eastern Ghats), 6) Island Groups (Lakshadweep and Andaman & Nicobar).",
          "India shares international terrestrial borders with 7 nations: Pakistan, Afghanistan, China, Nepal, Bhutan, Bangladesh, and Myanmar."
        ],
        formula: "\\text{Area} = 3.28\\text{ million km}^2, \\quad \\text{Coastline} \\approx 7,516.6\\text{ km}",
        sample_question: "Name the six distinct physiographic divisions of India.",
        sample_answer: "1. The Northern Mountains (Himalayas), 2. The Northern Plains, 3. The Peninsular Plateau, 4. The Indian Desert, 5. The Coastal Plains, 6. The Islands.",
        memory_hook: "Mountains $\\to$ Plains $\\to$ Desert $\\to$ Plateau $\\to$ Coasts $\\to$ Islands."
      },
      {
        num: 6,
        title: "The Beginnings of Indian Civilisation",
        concept: "Harappan (Indus Valley) Civilisation: Urban architecture, Great Bath, drainage system, craft guilds, and trade.",
        points: [
          "The Harappan Civilisation flourished around 2600–1900 BCE along the Indus river basin (major sites: Harappa, Mohenjo-daro, Lothal, Kalibangan, Dholavira).",
          "Town Planning: Cities were divided into a raised Western Citadel (administrative public buildings) and a Lower Town (residential brick quarters).",
          "Great Bath at Mohenjo-daro: A massive watertight brick tank lined with bitumen/tar used for special ritual bathing.",
          "Advanced Engineering: Grid pattern streets intersecting at right angles and covered street drainage systems connected to house soak pits.",
          "Economy & Craft: Bronze casting, terracotta figurines, standard stone weights (chert), steatite seals with unicorn/pashupati motifs, and dockyard port at Lothal for overseas trade."
        ],
        formula: "\\text{Harappan Urban Model: } \\text{Citadel (Upper)} + \\text{Lower Town} + \\text{Grid Drainage}",
        sample_question: "Describe the unique features of the drainage system in Harappan cities.",
        sample_answer: "Drains were laid out in straight lines with gentle slopes, constructed with baked bricks, covered with stone slabs, and fitted with inspection manholes at regular intervals for cleaning.",
        memory_hook: "Grid Streets + Covered Drains + Baked Bricks = Harappan Genius!"
      },
      {
        num: 7,
        title: "India's Cultural Roots",
        concept: "Vedic philosophy, Upanishadic inquiries, Ashrama system, Ramayana & Mahabharata epics, and ethical frameworks.",
        points: [
          "Four Vedas: Rigveda (oldest, containing 1028 hymns like Gayatri Mantra), Samaveda (melodies/music), Yajurveda (rituals/sacrifices), Atharvaveda (daily life and medicine).",
          "Upanishads signify 'sitting near the guru' to explore deep philosophical inquiries about Atman (individual soul) and Brahman (universal truth).",
          "Four Ashramas (stages of life): Brahmacharya (student/learning), Grihastha (householder/family), Vanaprastha (meditation/forest retreat), Sannyasa (renunciation/spiritual liberation).",
          "The two timeless epics—Ramayana (composed by Maharishi Valmiki) and Mahabharata (by Maharishi Ved Vyasa containing Bhagavad Gita)—codified Dharma and moral ideals."
        ],
        formula: "\\text{4 Vedas: } \\text{Rig } + \\text{Sama } + \\text{Yajur } + \\text{Atharva}",
        sample_question: "What was the central philosophical dialogue explored in the Upanishads?",
        sample_answer: "The Upanishads explored the nature of ultimate reality (Brahman), the inner self (Atman), and the fundamental truth that Atman and Brahman are interconnected.",
        memory_hook: "Vedas = Chants & Knowledge; Upanishads = Soul & Philosophy."
      },
      {
        num: 8,
        title: "Unity in Diversity, or 'Many in the One'",
        concept: "India's composite multicultural heritage, linguistic variety, geographic contrasts (Ladakh vs Kerala), and syncretic unity.",
        points: [
          "Diversity refers to the richness of varied cultures, languages, religions, geographic terrains, foods, and traditional festivals coexisting in one nation.",
          "Case Study - Ladakh: Cold high-altitude desert in Himalayas; economy relies on pashmina wool from sheep and goat rearing; Buddhism and Islam flourish alongside Tibetan trade routes.",
          "Case Study - Kerala: Coastal southwestern state rich in spices (pepper, cloves, cardamom); historical trade with Arabs, Chinese (Cheena-vala fishing nets), and Europeans created religious harmony (Christianity, Judaism, Islam, Hinduism).",
          "Despite distinct geography, India exhibits 'Unity in Diversity' (a phrase coined by Jawaharlal Nehru), demonstrated through the united national freedom struggle."
        ],
        formula: "\\text{Composite Heritage} = \\text{Geographic Variety} + \\text{Shared National Identity}",
        sample_question: "Compare the economic livelihoods of people in Ladakh and Kerala.",
        sample_answer: "Ladakh relies on pastoral nomadism (pashmina sheep, yaks) and Himalayan trade; Kerala relies on spice cultivation, fishing (cheena-vala), and maritime coastal commerce.",
        memory_hook: "Ladakh Pashmina Snow + Kerala Spices Sea = One Incredible India."
      },
      {
        num: 9,
        title: "Family and Community",
        concept: "Social organization, mutual interdependence, gender equality, and civic responsibilities in community living.",
        points: [
          "Family is the foundational primary social unit of human society (nuclear family and extended joint family).",
          "Community life involves cooperative sharing of common public resources (water bodies, school buildings, parks, health centres).",
          "Recognizing the dignity of domestic household labour and ending gender stereotypes is essential for a fair society.",
          "Civic awareness means actively participating in neighborhood cleanliness, protecting public property, and resolving disputes cooperatively."
        ],
        formula: "\\text{Healthy Society} = \\text{Mutual Respect} + \\text{Equal Opportunity} + \\text{Civic Participation}",
        sample_question: "Explain why community cooperation is necessary in managing neighborhood resources.",
        sample_answer: "Community cooperation ensures equitable distribution of shared resources (drinking water, waste disposal, parks) and helps solve local disputes peacefully without costly external intervention.",
        memory_hook: "Cooperation in Community creates Harmony in Society."
      },
      {
        num: 10,
        title: "Grassroots Democracy – Governance",
        concept: "Panchayati Raj structure: Gram Sabha, Gram Panchayat, and direct democratic citizen participation.",
        points: [
          "Panchayati Raj is the 3-tier system of local self-government in rural India ensuring direct democracy at village level.",
          "Gram Sabha is the supreme village general assembly consisting of all registered adult voters (18+ years) living in the panchayat area.",
          "Gram Panchayat is the elected executive executive body chosen by the Gram Sabha for a 5-year term, headed by the Sarpanch (Panchayat President).",
          "Panchayat Secretary is a government-appointed officer who calls Gram Sabha meetings and maintains official records and financial accounts.",
          "Functions: Construction of village roads, drainage, water supply, schools, implementing government welfare schemes, and collecting local taxes."
        ],
        formula: "\\text{Gram Sabha (All Voters)} \\xrightarrow{\\text{Elects & Holds Accountable}} \\text{Gram Panchayat (Sarpanch + Ward Wardens)}",
        sample_question: "What is the crucial relationship between the Gram Sabha and the Gram Panchayat?",
        sample_answer: "The Gram Sabha is the legislative body of all adult voters that elects, supervises, and holds the Gram Panchayat executive accountable, approving all village budgets and development plans.",
        memory_hook: "Gram Sabha = Everyone over 18; Gram Panchayat = Elected leaders who execute."
      },
      {
        num: 11,
        title: "Local Government in Rural Areas",
        concept: "Three tiers of Panchayati Raj: Gram Panchayat, Panchayat Samiti (Block level), and Zilla Parishad (District level).",
        points: [
          "Tier 1 (Village Level): Gram Panchayat responsible for basic civic amenities in individual villages.",
          "Tier 2 (Block / Tehsil Level): Panchayat Samiti (Janpad Panchayat) coordinates development plans across a cluster of Gram Panchayats.",
          "Tier 3 (District Level): Zilla Parishad manages district-wide developmental plans, allocates state funds, and oversees agricultural/health infrastructure.",
          "Constitutional reservation guarantees seats for Women (at least 33% to 50%), Scheduled Castes (SC), and Scheduled Tribes (ST) to ensure inclusive democracy."
        ],
        formula: "\\text{Zilla Parishad (District)} \\longrightarrow \\text{Panchayat Samiti (Block)} \\longrightarrow \\text{Gram Panchayat (Village)}",
        sample_question: "Describe the three tiers of the Panchayati Raj system in India.",
        sample_answer: "1. Gram Panchayat at the village level, 2. Panchayat Samiti (Block/Janpad Panchayat) at the intermediate block level, and 3. Zilla Parishad at the apex district level.",
        memory_hook: "Village $\\to$ Block $\\to$ District (Gram $\\to$ Samiti $\\to$ Zilla)."
      },
      {
        num: 12,
        title: "Local Government in Urban Areas",
        concept: "Urban governance: Municipal Corporations, Municipal Councils, Ward Committees, and civic service delivery.",
        points: [
          "Municipal Corporation (Nagar Nigam) governs large metropolitan cities (population $> 10\\text{ lakhs}$); headed by the Mayor and managed by the Municipal Commissioner.",
          "Municipal Council (Nagar Palika) governs smaller towns and cities with smaller populations.",
          "A city is divided into several administrative Wards; residents elect Ward Councillors who formulate local policies and budgets.",
          "Responsibilities: Water purification supply, waste disposal/garbage collection, street lighting, public hospitals, birth/death registration, and city zoning.",
          "Sources of Revenue: Property tax, water tax, commercial entertainment tax, and state government financial grants."
        ],
        formula: "\\text{Large City} \\to \\text{Municipal Corporation (Mayor)}, \\quad \\text{Town} \\to \\text{Municipal Council (President)}",
        sample_question: "What is the difference between a Ward Councillor and the Municipal Commissioner?",
        sample_answer: "A Ward Councillor is an elected political representative who debates and creates policies for their ward; The Municipal Commissioner is a government-appointed IAS officer who implements those decisions.",
        memory_hook: "Councillors make the budget; Commissioner executes the work!"
      },
      {
        num: 13,
        title: "The Value of Work",
        concept: "Dignity of labour, unorganized vs organized employment, domestic care work, and gender wage gaps.",
        points: [
          "All honest work that contributes to societal welfare possesses inherent value and deserves dignity (Dignity of Labour).",
          "Domestic and caregiving work (cooking, cleaning, elderly care, childcare) performed predominantly by women is economically vital but often unpaid and undervalued.",
          "Agricultural and construction daily-wage labourers face seasonal unemployment, low wages, lack of job security, and absence of social security benefits.",
          "Government laws on Minimum Wages and welfare schemes aim to protect workers from economic exploitation."
        ],
        formula: "\\text{Economic Justice} = \\text{Equal Pay for Equal Work} + \\text{Social Security}",
        sample_question: "Why is domestic work often referred to as 'invisible' and 'unpaid' labour?",
        sample_answer: "Domestic work (cooking, childcare, household chores) is performed inside families without monetary wages and is not calculated in formal economic GDP statistics, despite requiring long daily hours.",
        memory_hook: "Every job deserves respect; Care work is valuable work!"
      },
      {
        num: 14,
        title: "Economic Activities Around Us",
        concept: "Three sectors of economic activity: Primary (agriculture/extraction), Secondary (manufacturing), and Tertiary (services).",
        points: [
          "Primary Sector: Extraction and harvesting of raw natural resources directly from nature (farming, forestry, fishing, dairy, mining).",
          "Secondary Sector: Processing raw materials into finished manufactured industrial goods (cotton into textiles, sugarcane into sugar, iron ore into steel).",
          "Tertiary Sector: Provides supportive services that facilitate production and trade (transport, banking, telecommunications, teaching, healthcare).",
          "All three sectors are deeply interdependent: agricultural crops (primary) are transported (tertiary) to textile mills (secondary) to make cloth."
        ],
        formula: "\\text{Economy} = \\text{Primary (Extract)} + \\text{Secondary (Manufacture)} + \\text{Tertiary (Serve)}",
        sample_question: "Classify into sectors: Dairy farming, Making cotton shirts, Banking, and Pottery.",
        sample_answer: "Dairy farming = Primary; Making cotton shirts & Pottery = Secondary (manufacturing/craft); Banking = Tertiary (service).",
        memory_hook: "Grow it = Primary; Make it = Secondary; Deliver it = Tertiary!"
      }
    ],
    "English": [
      {
        num: 1,
        title: "Unit 1: Fables and Folk Tales",
        concept: "Moral storytelling, narrative plot structure, character analysis, and overcoming adversity through intelligence.",
        points: [
          "Fables use animal characters with human traits to convey universal ethical morals (e.g. 'A Bottle of Dew', 'The Raven and the Fox').",
          "Hard work, honesty, and pragmatic wisdom triumph over superstition, shortcuts, and greed.",
          "Literary Devices: Personification (giving human speech to animals/objects) and Irony (unexpected outcomes).",
          "Grammar focus: Proper use of direct vs indirect reported speech, action verbs, and sequence connectors in narrative writing."
        ],
        formula: "\\text{Story Plot} = \\text{Exposition} \\to \\text{Rising Action} \\to \\text{Climax} \\to \\text{Resolution / Moral}",
        sample_question: "What is the central moral lesson taught in the story 'A Bottle of Dew'?",
        sample_answer: "Real wealth is achieved not through magical alchemy or superstition, but through dedicated hard work, patient agriculture, and sensible investments.",
        memory_hook: "Fables teach wisdom through clever animal tales!"
      },
      {
        num: 2,
        title: "Unit 2: Friendship",
        concept: "Empathy, loyalty, accepting individual differences, and true companionship across social divides.",
        points: [
          "True friendship is built on mutual respect, selflessness, trust, and supporting companions through adversity.",
          "Stories highlight empathy for differently-abled peers and compassion for stray animals.",
          "Poetic elements: Rhyme schemes ($AABB$, $ABAB$), alliteration (repetition of initial consonant sounds), and sensory imagery.",
          "Grammar focus: Degrees of comparison (positive, comparative, superlative adjectives) and descriptive paragraph composition."
        ],
        formula: "\\text{Adjectives: } \\text{Positive (kind)} \\to \\text{Comparative (kinder)} \\to \\text{Superlative (kindest)}",
        sample_question: "How is the spirit of true companionship reflected in 'A Friend in Need'?",
        sample_answer: "A true friend offers unconditional help during difficult crises without expecting selfish rewards, standing firmly by their friend when others depart.",
        memory_hook: "A friend in need is a friend indeed!"
      },
      {
        num: 3,
        title: "Unit 3: Nurturing Nature",
        concept: "Environmental conservation, beauty of seasons, plant care, and compassionate connection with wildlife.",
        points: [
          "Themes celebrate the resilience of nature in Ruskin Bond's 'The Cherry Tree'—the patience required to nurture a living sapling into a fruitful tree.",
          "Poems explore birds' perspectives on the world ('What a Bird Thought'), moving from a small egg nest to the vast blue sky.",
          "Literary Devices: Metaphor, vivid visual imagery, and stanza structures that reflect natural rhythms.",
          "Grammar focus: Subject-verb agreement (concord) and informal letter writing to express love for nature."
        ],
        formula: "\\text{Subject-Verb Concord: } \\text{Singular Subject} \\leftrightarrow \\text{Singular Verb} (\\text{He runs}), \\text{Plural} \\leftrightarrow \\text{Plural} (\\text{They run})",
        sample_question: "What does Rakesh's dedication in 'The Cherry Tree' symbolize about human relationship with nature?",
        sample_answer: "It symbolizes that living with nature requires patience, protection against hardships (goats, frost), and deep satisfaction in watching life grow from one's own efforts.",
        memory_hook: "Nurture nature today to enjoy its shade tomorrow!"
      },
      {
        num: 4,
        title: "Unit 4: Sports and Wellness",
        concept: "Physical fitness, true sportsmanship, resilience under failure, and embracing healthy lifestyle habits.",
        points: [
          "Sports teach discipline, teamwork, perseverance, emotional balance, and grace in both victory and defeat.",
          "Stories examine character growth when an athlete chooses fair play and integrity over cheating for a temporary medal.",
          "Poetry inspires determination to overcome physical limitations and mental doubts through sustained practice.",
          "Grammar focus: Modal auxiliaries (can, could, must, should, ought to) and writing structured sports diary entries."
        ],
        formula: "\\text{Modals: } \\text{Ability (can)} \\mid \\text{Obligation (must)} \\mid \\text{Advice (should)}",
        sample_question: "Why is true sportsmanship considered more valuable than simply winning a trophy?",
        sample_answer: "True sportsmanship builds character, respects opponents, upholds fair rules, and demonstrates integrity, which outlasts any temporary medal.",
        memory_hook: "Play hard, play fair, respect all!"
      },
      {
        num: 5,
        title: "Unit 5: Culture and Tradition",
        concept: "Celebration of diverse Indian festivals, traditional handicrafts, folk dances, and national unity.",
        points: [
          "Themes explore the joy of cultural festivals (Kite flying during Makar Sankranti, Diwali lights, Eid sweets, Pongal harvests).",
          "Rich artisanal traditions—handloom weaving, pottery, folk paintings (Madhubani, Warli)—reflect India's generational heritage.",
          "Poems celebrate the vibrant energy and playful spirit of traditional outdoor games and seasonal festivities.",
          "Grammar focus: Prepositions of time and place (in, on, at, under, between) and creative dialogue writing."
        ],
        formula: "\\text{Prepositions: } \\text{At (exact time/point)}, \\text{On (days/surfaces)}, \\text{In (months/enclosed spaces)}",
        sample_question: "How do seasonal festivals like Makar Sankranti celebrate both agriculture and community bonding?",
        sample_answer: "They mark the transition of the Sun and the harvesting of winter crops, bringing families together outdoors through shared feasts, kite flying, and gratitude to nature.",
        memory_hook: "Traditions unite generations with joy and color!"
      }
    ]
  };
})();
