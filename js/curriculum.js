/* ======================================================== */
/* StudyPilot Official Curriculum Catalog                   */
/* CBSE Grade 10 | Official NCERT textbook links + local PDF cache */
/* ======================================================== */

(function () {
  const LOCAL_BOOK_ROOT = "/assets/books/ncert";
  const PLANNER_BOOK_ROOT = `${LOCAL_BOOK_ROOT}/planner_chapters`;

  const SCIENCE_CHAPTERS = [
    {
      id: "cbse10_science_ch2",
      num: 2,
      key: "ch2",
      title: "Acids, Bases and Salts",
      textbookUrl: "https://ncert.nic.in/textbook/pdf/jesc102.pdf",
      textbookPage: "https://ncert.nic.in/textbook.php?jesc1=2-13",
      summary: "Study acids, bases, indicators, pH, neutralisation, and everyday applications from the official NCERT chapter.",
      highlights: [
        "Acids, bases, and indicators",
        "pH scale and neutral substances",
        "Neutralisation and daily-life uses",
      ],
      keywords: ["acid", "base", "salt", "indicator", "ph", "neutralisation", "neutralization", "baking soda", "vinegar", "litmus"],
    },
    {
      id: "cbse10_science_ch9",
      num: 9,
      key: "ch9",
      title: "Light - Reflection and Refraction",
      textbookUrl: "https://ncert.nic.in/textbook/pdf/jesc109.pdf",
      textbookPage: "https://ncert.nic.in/textbook.php?jesc1=9-13",
      summary: "Focus on reflection, refraction, mirrors, lenses, dispersion, and atmospheric refraction with the official NCERT text.",
      highlights: [
        "Laws of reflection",
        "Refraction through lenses and slabs",
        "Dispersion, twinkling, and rainbow formation",
      ],
      keywords: ["light", "reflection", "refraction", "mirror", "lens", "dispersion", "rainbow", "twinkling", "atmospheric refraction"],
    },
    {
      id: "cbse10_science_ch11",
      num: 11,
      key: "ch11",
      title: "Electricity",
      textbookUrl: "https://ncert.nic.in/textbook/pdf/jesc111.pdf",
      textbookPage: "https://ncert.nic.in/textbook.php?jesc1=11-13",
      summary: "Cover electric current, circuits, potential difference, Ohm's law, resistance, and heating effect from the NCERT chapter.",
      highlights: [
        "Current, circuit, and potential difference",
        "Ohm's law and resistance",
        "Heating effect and circuit safety",
      ],
      keywords: ["electricity", "current", "circuit", "ohm", "resistance", "potential difference", "ammeter", "voltmeter", "fuse", "heating effect"],
    },
  ];

  const QUIZ_BANK = {
    Science: {
      ch2: [
        { q: "What does blue litmus turn into in an acid?", options: ["Red", "Green", "Blue", "Yellow"], answer: 0, explain: "Acids turn blue litmus red." },
        { q: "What is the pH of a neutral solution?", options: ["0", "7", "10", "14"], answer: 1, explain: "Neutral substances have a pH of 7." },
        { q: "What is formed when an acid reacts with a base?", options: ["Salt and water", "Only heat", "Only gas", "Only acid"], answer: 0, explain: "Neutralisation usually produces salt and water." },
        { q: "Which of these is a base?", options: ["Vinegar", "Lemon juice", "Baking soda", "Orange juice"], answer: 2, explain: "Baking soda is basic." },
        { q: "Which acid is commonly present in vinegar?", options: ["Sulphuric acid", "Acetic acid", "Hydrochloric acid", "Nitric acid"], answer: 1, explain: "Vinegar contains acetic acid." },
      ],
      ch9: [
        { q: "A convex lens usually does what to parallel rays?", options: ["Diverges them", "Reflects them", "Converges them", "Stops them"], answer: 2, explain: "A convex lens converges parallel rays to a focus." },
        { q: "What is true about the angle of incidence and angle of reflection?", options: ["They are equal", "Incidence is always larger", "Reflection is always zero", "They are unrelated"], answer: 0, explain: "The law of reflection says both angles are equal." },
        { q: "The image in a plane mirror is usually:", options: ["Real and inverted", "Virtual and erect", "Real and erect", "Virtual and inverted"], answer: 1, explain: "Plane mirrors form virtual, erect images." },
        { q: "Why do stars twinkle?", options: ["Ocean waves", "Atmospheric refraction", "Magnetic fields", "Sound waves"], answer: 1, explain: "Starlight passes through changing layers of air." },
        { q: "A rainbow is formed because of:", options: ["Dispersion of sunlight", "Sound reflection", "Friction", "Evaporation only"], answer: 0, explain: "Water droplets disperse sunlight into colours." },
      ],
      ch11: [
        { q: "What is the SI unit of electric current?", options: ["Volt", "Ohm", "Ampere", "Watt"], answer: 2, explain: "Current is measured in ampere (A)." },
        { q: "Which device measures current?", options: ["Voltmeter", "Ammeter", "Thermometer", "Barometer"], answer: 1, explain: "An ammeter is connected in series to measure current." },
        { q: "Ohm's law is written as:", options: ["V = IR", "I = VR", "R = VI", "P = VI"], answer: 0, explain: "Voltage is current multiplied by resistance." },
        { q: "What happens to a fuse when current is too high?", options: ["It becomes brighter", "It melts and breaks the circuit", "It increases current", "Nothing"], answer: 1, explain: "A fuse protects the circuit by melting on overload." },
        { q: "Which effect of current is used in an electric heater?", options: ["Magnetic effect", "Heating effect", "Chemical effect", "Gravitational effect"], answer: 1, explain: "A heater works due to the heating effect of current." },
      ],
    },
  };

  const OFFICIAL_SOURCE_URLS = {
    Science: "https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/Science_Sec_2025-26.pdf",
    Mathematics: "https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/Maths_Sec_2025-26.pdf",
    "Social Science": "https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/Social_Science_Sec_2025-26.pdf",
    English: "https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/English_LL_2025-26.pdf",
  };

  const TEXTBOOK_CATALOG = {
    ncert: {
      6: {
        Mathematics: {
          bookTitle: "Ganita Prakash (Class 6 Mathematics)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/fegp1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?fegp1=0-10",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade6-mathematics-ganita-prakash.pdf`,
          sourceLabel: "Official NCERT Grade 6 Mathematics textbook",
        },
        Science: {
          bookTitle: "Curiosity (Class 6 Science)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/fesc1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?fesc1=0-12",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade6-science-curiosity.pdf`,
          sourceLabel: "Official NCERT Grade 6 Science textbook",
        },
        "Social Science": {
          bookTitle: "Exploring Society: India and Beyond (Class 6)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/fess1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?fess1=0-14",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade6-social-science.pdf`,
          sourceLabel: "Official NCERT Grade 6 Social Science textbook",
        },
        English: {
          bookTitle: "Poorvi (Class 6 English)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/fepr1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?fepr1=0-5",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade6-english-poorvi.pdf`,
          sourceLabel: "Official NCERT Grade 6 English textbook",
        },
      },
      7: {
        Science: {
          bookTitle: "Curiosity (Class 7 Science)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/gecu1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?gecu1=0-12",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade7-science-curiosity.pdf`,
          sourceLabel: "Official NCERT Grade 7 Science textbook",
        },
        Mathematics: {
          bookTitle: "Mathematics (Class 7)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/gemh1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?gemh1=0-15",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade7-mathematics.pdf`,
          sourceLabel: "Official NCERT Grade 7 Mathematics textbook",
        },
        "Social Science": [
          {
            bookTitle: "Exploring Society: India and Beyond Part 1",
            pdfUrl: "https://ncert.nic.in/textbook/pdf/gees1ps.pdf",
            pageUrl: "https://ncert.nic.in/textbook.php?gees1=0-12",
            localPdfUrl: `${LOCAL_BOOK_ROOT}/grade7-social-science-part1.pdf`,
            sourceLabel: "Official NCERT Grade 7 Social Science textbook, Part 1",
          },
          {
            bookTitle: "Exploring Society: India and Beyond Part 2",
            pdfUrl: "https://ncert.nic.in/textbook/pdf/gees2ps.pdf",
            pageUrl: "https://ncert.nic.in/textbook.php?gees2=0-8",
            localPdfUrl: `${LOCAL_BOOK_ROOT}/grade7-social-science-part2.pdf`,
            sourceLabel: "Official NCERT Grade 7 Social Science textbook, Part 2",
          },
        ],
        English: [
          {
            bookTitle: "Poorvi (Class 7 English)",
            pdfUrl: "https://ncert.nic.in/textbook/pdf/gepr1ps.pdf",
            pageUrl: "https://ncert.nic.in/textbook.php?gepr1=0-11",
            localPdfUrl: `${LOCAL_BOOK_ROOT}/grade7-english-poorvi.pdf`,
            sourceLabel: "Official NCERT Grade 7 English textbook",
          },
        ],
      },
      8: {
        Mathematics: {
          bookTitle: "Mathematics (Class 8)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/hemh1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?hemh1=0-13",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade8-mathematics.pdf`,
          sourceLabel: "Official NCERT Grade 8 Mathematics textbook",
        },
        Science: {
          bookTitle: "Science (Class 8)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/hesc1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?hesc1=0-13",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade8-science.pdf`,
          sourceLabel: "Official NCERT Grade 8 Science textbook",
        },
        English: {
          bookTitle: "Honeydew (Class 8 English)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/hehd1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?hehd1=0-10",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade8-english-honeydew.pdf`,
          sourceLabel: "Official NCERT Grade 8 English textbook",
        },
        "Social Science": {
          bookTitle: "Social Science (Class 8)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/hess1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?hess1=0-10",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade8-social-science.pdf`,
          sourceLabel: "Official NCERT Grade 8 Social Science textbook",
        },
      },
      9: {
        Mathematics: {
          bookTitle: "Mathematics (Class 9)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/iemh1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?iemh1=0-12",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade9-mathematics.pdf`,
          sourceLabel: "Official NCERT Grade 9 Mathematics textbook",
        },
        Science: {
          bookTitle: "Science (Class 9)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/iesc1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?iesc1=0-12",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade9-science.pdf`,
          sourceLabel: "Official NCERT Grade 9 Science textbook",
        },
        English: {
          bookTitle: "Beehive (Class 9 English)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/iebe1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?iebe1=0-11",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade9-english-beehive.pdf`,
          sourceLabel: "Official NCERT Grade 9 English textbook",
        },
        "Social Science": {
          bookTitle: "Social Science (Class 9)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/iess1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?iess1=0-6",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade9-social-science.pdf`,
          sourceLabel: "Official NCERT Grade 9 Social Science textbook",
        },
      },
      10: {
        Mathematics: {
          bookTitle: "Mathematics (Class 10)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/jemh1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?jemh1=0-14",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade10-mathematics.pdf`,
          sourceLabel: "Official NCERT Grade 10 Mathematics textbook",
        },
        Science: {
          bookTitle: "Science (Class 10)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/jesc1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?jesc1=1-16",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade10-science.pdf`,
          sourceLabel: "Official NCERT Grade 10 Science textbook",
        },
        English: {
          bookTitle: "First Flight (Class 10 English)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/jeff1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?jeff1=0-11",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade10-english-first-flight.pdf`,
          sourceLabel: "Official NCERT Grade 10 English textbook",
        },
        "Social Science": {
          bookTitle: "Social Science (Class 10)",
          pdfUrl: "https://ncert.nic.in/textbook/pdf/jess1ps.pdf",
          pageUrl: "https://ncert.nic.in/textbook.php?jess1=0-5",
          localPdfUrl: `${LOCAL_BOOK_ROOT}/grade10-social-science.pdf`,
          sourceLabel: "Official NCERT Grade 10 Social Science textbook",
        },
      },
    },
  };

  const SCIENCE_CHAPTERS_BY_GRADE = {
    6: [
      {
        id: "cbse6_science_ch1",
        num: 1,
        key: "g6_ch1",
        grade: 6,
        title: "Food and Its Sources",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Understand where food comes from and how living things depend on plants and animals for energy.",
        highlights: ["Sources of food", "Plant and animal foods", "Healthy eating habits"],
        keywords: ["food", "source", "nutrition", "plants", "animals"],
      },
      {
        id: "cbse6_science_ch2",
        num: 2,
        key: "g6_ch2",
        grade: 6,
        title: "Sorting Materials into Groups",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Learn how materials are grouped by properties like texture, hardness, transparency, and solubility.",
        highlights: ["Properties of materials", "Soluble and insoluble", "Transparent and opaque"],
        keywords: ["sorting", "materials", "properties", "soluble", "transparent", "opaque"],
      },
      {
        id: "cbse6_science_ch3",
        num: 3,
        key: "g6_ch3",
        grade: 6,
        title: "Motion and Measurement of Distances",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Use standard units, compare lengths, and identify how motion is measured in everyday life.",
        highlights: ["Standard units", "Length and distance", "Simple motion ideas"],
        keywords: ["motion", "measurement", "distance", "length", "unit"],
      },
    ],
    7: [
      {
        id: "scert7_science_ch1",
        num: 1,
        key: "g7_ch1",
        grade: 7,
        title: "Measurement",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Study of physical quantities, standard units, and measuring instruments.",
        highlights: ["Physical Quantities and Units", "Measurement of Area, Volume and Density", "Astronomical Unit and Light Year"],
        keywords: ["measurement", "units", "density", "volume", "light year"],
      },
      {
        id: "scert7_science_ch2",
        num: 2,
        key: "g7_ch2",
        grade: 7,
        title: "Force and Motion",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Understanding distance, displacement, speed, velocity, and acceleration.",
        highlights: ["Distance and Displacement", "Speed, Velocity and Acceleration", "Center of Gravity and Stability"],
        keywords: ["force", "motion", "speed", "velocity", "acceleration"],
      },
      {
        id: "scert7_science_ch3",
        num: 3,
        key: "g7_ch3",
        grade: 7,
        title: "Matter Around Us",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Elements, compounds, mixtures, and chemical symbols.",
        highlights: ["What is Matter?", "Elements and Compounds", "Mixtures and Separation Methods"],
        keywords: ["matter", "elements", "compounds", "mixtures", "symbols"],
      },
    ],
    8: [
      {
        id: "cbse8_science_ch1",
        num: 1,
        key: "g8_ch1",
        grade: 8,
        title: "Crop Production and Management",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Learn how farmers prepare soil, sow seeds, water crops, and store grains safely.",
        highlights: ["Preparation of soil", "Manure and irrigation", "Storage of grains"],
        keywords: ["crop", "production", "soil", "irrigation", "storage"],
      },
      {
        id: "cbse8_science_ch2",
        num: 2,
        key: "g8_ch2",
        grade: 8,
        title: "Microorganisms: Friend and Foe",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Study useful and harmful microorganisms, food preservation, and the role of microbes in life.",
        highlights: ["Bacteria and fungi", "Food preservation", "Diseases and vaccines"],
        keywords: ["microorganism", "microbes", "bacteria", "fungi", "preservation"],
      },
      {
        id: "cbse8_science_ch3",
        num: 3,
        key: "g8_ch3",
        grade: 8,
        title: "Force and Pressure",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Understand push and pull, pressure, and how forces act in daily situations.",
        highlights: ["Force as push/pull", "Pressure", "Applications in daily life"],
        keywords: ["force", "pressure", "push", "pull", "motion"],
      },
    ],
    9: [
      {
        id: "cbse9_science_ch1",
        num: 1,
        key: "g9_ch1",
        grade: 9,
        title: "Matter in Our Surroundings",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Study states of matter, diffusion, evaporation, and changes of state from the official CBSE science syllabus.",
        highlights: ["States of matter", "Diffusion and evaporation", "Change of state"],
        keywords: ["matter", "surroundings", "evaporation", "diffusion", "solid", "liquid", "gas"],
      },
      {
        id: "cbse9_science_ch2",
        num: 2,
        key: "g9_ch2",
        grade: 9,
        title: "Is Matter Around Us Pure",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Revision on mixtures, solutions, suspensions, and separation methods from the CBSE science syllabus.",
        highlights: ["Mixtures and solutions", "Suspensions and colloids", "Separation techniques"],
        keywords: ["pure", "mixture", "solution", "suspension", "colloid", "separation"],
      },
      {
        id: "cbse9_science_ch3",
        num: 3,
        key: "g9_ch3",
        grade: 9,
        title: "Atoms and Molecules",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Revise laws of chemical combination, atomic mass, molecular mass, and formula writing.",
        highlights: ["Law of conservation of mass", "Atomic and molecular mass", "Chemical formulae"],
        keywords: ["atom", "molecule", "formula", "mass", "conservation", "chemical combination"],
      },
      {
        id: "cbse9_science_ch5",
        num: 5,
        key: "g9_ch5",
        grade: 9,
        title: "The Fundamental Unit of Life",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Learn about cell structure, organelles, and the cell as the basic unit of life.",
        highlights: ["Cell membrane and nucleus", "Plant and animal cells", "Cell organelles"],
        keywords: ["cell", "life", "membrane", "nucleus", "organelle", "tissue"],
      },
      {
        id: "cbse9_science_ch9",
        num: 9,
        key: "g9_ch9",
        grade: 9,
        title: "Force and Laws of Motion",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Focus on force, inertia, momentum, and Newton's laws of motion.",
        highlights: ["Inertia and momentum", "Newton's laws", "Balanced and unbalanced force"],
        keywords: ["force", "motion", "newton", "momentum", "inertia", "law of motion"],
      },
    ],
    10: SCIENCE_CHAPTERS,
  };

  const QUIZ_BANK_BY_GRADE = {
    6: {
      Science: {
        s_ch1: [
          { q: "Which of these is a primary source of food for humans?", options: ["Plants and Animals", "Rocks and Soil", "Sunlight directly", "Water only"], answer: 0, explain: "Plants and animals provide all food sources for human nutrition." },
          { q: "Which part of the mustard plant is edible?", options: ["Seeds and Leaves", "Roots only", "Flowers only", "Bark"], answer: 0, explain: "Mustard seeds yield oil and mustard leaves are eaten as vegetables." },
          { q: "Animals that feed only on plants are called:", options: ["Herbivores", "Carnivores", "Omnivores", "Decomposers"], answer: 0, explain: "Herbivores feed exclusively on plants (e.g. cows, deer)." },
          { q: "What sweet liquid do bees collect from flowers to make honey?", options: ["Nectar", "Pollen", "Sap", "Water"], answer: 0, explain: "Bees collect sweet floral nectar and convert it into honey." },
          { q: "Which of the following is a dairy product?", options: ["Butter and Cheese", "Honey", "Rice", "Cotton"], answer: 0, explain: "Butter and cheese are processed from milk." }
        ],
        s_ch2: [
          { q: "Which component of food gives maximum energy per gram?", options: ["Fats", "Carbohydrates", "Proteins", "Vitamins"], answer: 0, explain: "Fats yield more than twice the energy per gram compared to carbohydrates." },
          { q: "Deficiency of Vitamin C leads to which disease?", options: ["Scurvy", "Rickets", "Beriberi", "Goitre"], answer: 0, explain: "Scurvy causes bleeding gums and is caused by Vitamin C deficiency." },
          { q: "Which mineral is required for strong bones and teeth?", options: ["Calcium", "Iodine", "Iron", "Sodium"], answer: 0, explain: "Calcium is essential for bone structure and tooth enamel strength." },
          { q: "What iodine solution test indicates the presence of starch?", options: ["Blue-black color change", "Bright red color change", "Green color change", "No change"], answer: 0, explain: "Adding iodine solution to starch turns it a distinct blue-black color." },
          { q: "Proteins are primarily required by the body for:", options: ["Growth and cell repair", "Instant energy", "Insulation", "Vision"], answer: 0, explain: "Proteins are body-building nutrients needed for growth and tissue repair." }
        ]
      },
      Mathematics: {
        m_ch1: [
          { q: "What is the correct priority order of operations in BODMAS?", options: ["Brackets, Orders, Division/Multiplication, Addition/Subtraction", "Addition first", "Multiplication first", "Left to right strictly"], answer: 0, explain: "BODMAS defines standard precedence: Brackets, Orders, Div/Mult, Add/Sub." },
          { q: "What is 100 + 50 × 2 using BODMAS rules?", options: ["200", "300", "250", "150"], answer: 0, explain: "Multiplication comes before addition: 50 × 2 = 100, then 100 + 100 = 200." },
          { q: "Which property states that a + b = b + a for whole numbers?", options: ["Commutative property", "Associative property", "Distributive property", "Closure property"], answer: 0, explain: "Commutative property allows changing order without altering addition sum." },
          { q: "What is the additive identity for any integer a?", options: ["0", "1", "-a", "10"], answer: 0, explain: "Adding 0 to any number leaves its value unchanged (a + 0 = a)." },
          { q: "Evaluate: 24 ÷ (4 + 2)", options: ["4", "8", "6", "12"], answer: 0, explain: "Solve Brackets first: (4 + 2) = 6; then 24 ÷ 6 = 4." }
        ]
      }
    },
    7: {
      Science: {
        s_ch1: [
          { q: "What is the standard SI unit of density?", options: ["kg/m³", "g/cm³", "kg/m²", "N/m³"], answer: 0, explain: "Density is mass per unit volume, so its SI unit is kg/m³." },
          { q: "What is the value of 1 Astronomical Unit (AU)?", options: ["1.496 × 10¹¹ metres", "9.46 × 10¹⁵ metres", "3 × 10⁸ metres", "1.5 × 10⁶ metres"], answer: 0, explain: "1 AU is average Earth-Sun distance (approx 149.6 million km)." },
          { q: "A light year is a unit of:", options: ["Astronomical distance", "Time duration", "Light intensity", "Mass"], answer: 0, explain: "A light year measures distance light travels in one year (approx 9.46 × 10¹⁵ m)." },
          { q: "Which tool is used for accurate liquid volume measurement in labs?", options: ["Graduated Measuring Cylinder", "Spring Balance", "Meter Ruler", "Stopwatch"], answer: 0, explain: "Measuring cylinders are calibrated for liquid volume." },
          { q: "Why are SI units accepted globally in scientific research?", options: ["To ensure uniform, accurate measurement worldwide", "To make numbers larger", "To eliminate decimals", "For speed only"], answer: 0, explain: "International System (SI) units ensure global consistency in measurements." }
        ],
        s_ch2: [
          { q: "Which indicator turns blue litmus paper RED?", options: ["Acidic solution", "Basic solution", "Neutral water", "Salt solution"], answer: 0, explain: "Acids turn blue litmus red (e.g., lemon juice, vinegar)." },
          { q: "What is produced during a neutralisation reaction between an Acid and a Base?", options: ["Salt + Water + Heat", "Oxygen gas only", "Acidic gas", "Pure metal"], answer: 0, explain: "Acid + Base → Salt + Water with evolution of heat." },
          { q: "Which natural indicator is extracted from lichens?", options: ["Litmus", "Turmeric", "China Rose", "Phenolphthalein"], answer: 0, explain: "Litmus is a natural dye extracted from lichens." },
          { q: "What is the pH of a neutral solution like pure distilled water?", options: ["7", "0", "14", "1"], answer: 0, explain: "Neutral solutions have a pH value of 7." },
          { q: "What remedy is given to relieve acidity in the human stomach?", options: ["Antacid (e.g. Milk of Magnesia)", "Lemon juice", "Concentrated HCl", "Vinegar"], answer: 0, explain: "Antacids contain mild bases like Magnesium Hydroxide to neutralize stomach acid." }
        ],
        s_ch3: [
          { q: "What is required for electric current to flow continuously in a circuit?", options: ["A closed conducting loop with a voltage source", "An open switch", "Insulated air gap", "Wooden wire"], answer: 0, explain: "Current flows only through a closed, uninterrupted conducting loop." },
          { q: "How are cells arranged to form a battery?", options: ["Positive terminal of one cell connected to negative of next", "Positive to positive", "Negative to negative", "Parallel side-by-side without wire"], answer: 0, explain: "Connecting positive to negative in series combines voltage into a battery." },
          { q: "Which safety component melts and breaks the circuit during overloading?", options: ["Electric Fuse", "Copper Wire", "Switch", "Voltmeter"], answer: 0, explain: "A fuse contains a low melting point wire that melts during high current spikes." },
          { q: "What effect of electric current is utilized in an electromagnet?", options: ["Magnetic effect", "Heating effect", "Cooling effect", "Optical effect"], answer: 0, explain: "Electric current flowing through a coiled wire creates a magnetic field." },
          { q: "What is the SI unit of electric current?", options: ["Ampere (A)", "Volt (V)", "Ohm (Ω)", "Watt (W)"], answer: 0, explain: "Electric current is measured in Amperes." }
        ],
        s_ch4: [
          { q: "Which property of metals allows them to be beaten into thin sheets?", options: ["Malleability", "Ductility", "Lustre", "Sonority"], answer: 0, explain: "Malleability is the ability to be hammered into thin foils (e.g. gold, aluminum)." },
          { q: "Which metal is liquid at room temperature?", options: ["Mercury (Hg)", "Sodium (Na)", "Iron (Fe)", "Gold (Au)"], answer: 0, explain: "Mercury is the only metal that remains liquid at room temperature." },
          { q: "Non-metals generally have low thermal and electrical conductivity EXCEPT:", options: ["Graphite (Carbon)", "Sulphur", "Phosphorus", "Iodine"], answer: 0, explain: "Graphite is an allotrope of carbon that conducts electricity well." },
          { q: "Which gas is evolved when metals react with dilute acids?", options: ["Hydrogen gas (H₂)", "Oxygen gas (O₂)", "Carbon dioxide (CO₂)", "Nitrogen gas (N₂)"], answer: 0, explain: "Metal + Acid → Metal Salt + Hydrogen gas (burns with a pop sound)." },
          { q: "The property of metals to produce a ringing sound when struck is:", options: ["Sonority", "Malleability", "Ductility", "Hardness"], answer: 0, explain: "Sonorous metals ring when struck, making them useful for bells." }
        ],
        s_ch5: [
          { q: "Which of the following is a chemical change?", options: ["Rusting of iron", "Melting of ice", "Tearing a paper", "Boiling water"], answer: 0, explain: "Rusting forms a new substance (iron oxide) and is irreversible." },
          { q: "What two substances are essential for iron rusting to occur?", options: ["Oxygen and Moisture (Water)", "Nitrogen and Sunlight", "Carbon dioxide and Heat", "Hydrogen and Oil"], answer: 0, explain: "Rusting requires both oxygen from air and water/moisture." },
          { q: "Depositing a thin layer of zinc metal on iron to prevent rusting is called:", options: ["Galvanisation", "Crystallisation", "Evaporation", "Neutralisation"], answer: 0, explain: "Galvanisation coats iron with protective zinc layer." },
          { q: "Obtaining pure large crystals of a substance from its hot saturated solution is:", options: ["Crystallisation", "Rusting", "Combustion", "Decantation"], answer: 0, explain: "Crystallisation is a physical process producing pure solid crystals." },
          { q: "Which of these indicates a chemical reaction has taken place?", options: ["Change in colour, gas evolution, or heat release", "Change in state only", "Cutting into smaller pieces", "Bending a wire"], answer: 0, explain: "Chemical changes involve new substances with gas evolution, heat or color change." }
        ],
        s_ch6: [
          { q: "What is the period of life when the body undergoes changes leading to reproductive maturity?", options: ["Adolescence", "Infancy", "Old age", "Childhood"], answer: 0, explain: "Adolescence (approx ages 11 to 19) is the stage of growth to reproductive maturity." },
          { q: "Which male hormone is responsible for secondary sexual characteristics during puberty?", options: ["Testosterone", "Estrogen", "Insulin", "Thyroxine"], answer: 0, explain: "Testosterone secreted by testes stimulates male physical changes at puberty." },
          { q: "The protruding voice box seen in teenage boys is known as:", options: ["Adam's Apple", "Thyroid gland", "Larynx ring", "Pharynx knob"], answer: 0, explain: "The growing larynx in teenage boys protrudes as the Adam's Apple." },
          { q: "Which endocrine gland controls the activity of other glands and is called the master gland?", options: ["Pituitary gland", "Adrenal gland", "Thyroid gland", "Pancreas"], answer: 0, explain: "The Pituitary gland secretes hormones regulating other endocrine glands." },
          { q: "Why is Iron an essential nutrient for adolescents, especially growing girls?", options: ["It builds hemoglobin for blood formation", "It hardens bones only", "It provides instant glucose", "It prevents fever"], answer: 0, explain: "Iron is required for hemoglobin and red blood cell production." }
        ],
        s_ch7: [
          { q: "Heat transfer in solids occurs primarily through:", options: ["Conduction", "Convection", "Radiation", "Evaporation"], answer: 0, explain: "Conduction transfers heat particle-to-particle in solids without mass movement." },
          { q: "Heat transfer in liquids and gases takes place by:", options: ["Convection", "Conduction", "Radiation", "Refraction"], answer: 0, explain: "Convection circulates fluid currents (warm fluid rises, cool fluid sinks)." },
          { q: "How does heat energy from the Sun reach the Earth through vacuum space?", options: ["Radiation", "Conduction", "Convection", "Induction"], answer: 0, explain: "Radiation transfers heat via electromagnetic waves without any physical medium." },
          { q: "During the day in coastal areas, breeze blowing from sea towards land is called:", options: ["Sea Breeze", "Land Breeze", "Trade Wind", "Monsoon"], answer: 0, explain: "Land heats faster than sea during day; warm air rises and cool sea air blows inland." },
          { q: "Why do we wear dark-coloured clothes in winter?", options: ["Dark colors absorb more radiant heat", "Dark colors reflect heat", "Dark colors produce heat", "They are lightweight"], answer: 0, explain: "Dark surfaces absorb maximum radiation, keeping the body warm." }
        ],
        s_ch8: [
          { q: "What is the formula for calculating average speed?", options: ["Total Distance / Total Time", "Distance × Time", "Time / Distance", "Mass × Acceleration"], answer: 0, explain: "Speed = Distance divided by Time (m/s or km/h)." },
          { q: "A simple pendulum executes which type of motion?", options: ["Periodic / Oscillatory motion", "Linear motion", "Circular motion", "Random motion"], answer: 0, explain: "A swinging pendulum moves to-and-fro periodically about a central mean position." },
          { q: "The time taken by a simple pendulum to complete one full oscillation is called its:", options: ["Time Period", "Frequency", "Amplitude", "Velocity"], answer: 0, explain: "Time period is the time needed for 1 complete to-and-fro swing." },
          { q: "What does a horizontal straight line parallel to time-axis indicate in a Distance-Time graph?", options: ["The object is at rest (speed = 0)", "The object is accelerating", "The object is moving at constant speed", "The object is returning"], answer: 0, explain: "Distance remaining constant as time increases means the object is stationary." },
          { q: "What instrument in vehicles measures instantaneous speed directly in km/h?", options: ["Speedometer", "Odometer", "Anemometer", "Tachometer"], answer: 0, explain: "Speedometer displays real-time speed in km/h." }
        ],
        s_ch9: [
          { q: "What is the primary function of Red Blood Cells (RBCs) in human blood?", options: ["Transporting Oxygen using Hemoglobin", "Fighting infections", "Clotting blood", "Digesting food"], answer: 0, explain: "RBCs contain red pigment Hemoglobin which binds and carries oxygen to cells." },
          { q: "Which blood vessels carry oxygenated blood away from the heart to body organs?", options: ["Arteries", "Veins", "Capillaries", "Lymph vessels"], answer: 0, explain: "Arteries carry oxygen-rich blood under high pressure away from heart." },
          { q: "What component of blood is responsible for blood clotting at a wound?", options: ["Platelets", "WBCs", "Plasma", "RBCs"], answer: 0, explain: "Platelets form a mesh clot to stop bleeding from cuts." },
          { q: "The major excretory product filtered by human kidneys and excreted in urine is:", options: ["Urea", "Uric acid", "Ammonia", "Glucose"], answer: 0, explain: "Kidneys filter nitrogenous waste Urea from bloodstream into urine." },
          { q: "Which muscular chamber of the human heart pumps oxygenated blood to the body?", options: ["Left Ventricle", "Right Ventricle", "Right Atrium", "Left Atrium"], answer: 0, explain: "The thick-walled Left Ventricle pumps oxygenated blood into aorta." }
        ],
        s_ch10: [
          { q: "What tissue transports water and dissolved minerals from roots to leaves in plants?", options: ["Xylem", "Phloem", "Epidermis", "Stomata"], answer: 0, explain: "Xylem vessels form a continuous pipeline transporting water and minerals upward." },
          { q: "What tissue transports synthesized food (sugar/sucrose) from leaves to all plant parts?", options: ["Phloem", "Xylem", "Cortex", "Pith"], answer: 0, explain: "Phloem conducts prepared organic food bidirectionally across the plant." },
          { q: "The evaporation of water vapour from stomata in leaves is called:", options: ["Transpiration", "Photosynthesis", "Respiration", "Guttation"], answer: 0, explain: "Transpiration releases water vapour from leaf stomatal pores." },
          { q: "How does transpiration help tall trees receive water from soil?", options: ["It creates a suction pull (Transpiration Pull)", "It pushes water down", "It stops root absorption", "It melts water"], answer: 0, explain: "Transpiration suction pull draws water column up tall trunks." },
          { q: "What tiny pores on leaf surfaces regulate gas exchange and transpiration?", options: ["Stomata", "Chloroplasts", "Guard cells", "Veins"], answer: 0, explain: "Stomata are microscopic pores flanked by guard cells." }
        ]
      },
      Mathematics: {
        m_ch1: [
          { q: "What is the product of two negative integers?", options: ["Positive integer", "Negative integer", "Zero always", "Fraction"], answer: 0, explain: "(-a) × (-b) = +(a × b). Product of two negative signs is positive." },
          { q: "What is (-15) + (-10)?", options: ["-25", "25", "-5", "5"], answer: 0, explain: "Adding two negative numbers yields a negative sum: -15 - 10 = -25." },
          { q: "Evaluate: (-36) ÷ 4", options: ["-9", "9", "-4", "0"], answer: 0, explain: "Dividing negative by positive results in negative quotient: -36 / 4 = -9." },
          { q: "What is the identity element for multiplication of integers?", options: ["1", "0", "-1", "10"], answer: 0, explain: "Multiplying any integer by 1 leaves it unchanged (a × 1 = a)." },
          { q: "What property is shown by: a × (b + c) = (a × b) + (a × c)?", options: ["Distributive property over addition", "Commutative property", "Associative property", "Closure property"], answer: 0, explain: "Distributive property distributes multiplication across addition terms." }
        ],
        m_ch2: [
          { q: "According to BODMAS, which operation is performed first in: 20 - 4 × 3?", options: ["Multiplication (4 × 3)", "Subtraction (20 - 4)", "Left to right strictly", "Any order"], answer: 0, explain: "Multiplication has higher priority than subtraction: 4 × 3 = 12, then 20 - 12 = 8." },
          { q: "Evaluate: (15 - 5) × (2 + 3)", options: ["50", "25", "30", "100"], answer: 0, explain: "Evaluate brackets first: (10) × (5) = 50." },
          { q: "What is the value of 2³ × 3¹?", options: ["24", "18", "12", "36"], answer: 0, explain: "2³ = 8; 3¹ = 3; 8 × 3 = 24." },
          { q: "Simplify: 100 ÷ 10 ÷ 2", options: ["5", "20", "50", "1"], answer: 0, explain: "Same precedence operations work left-to-right: 100 ÷ 10 = 10; then 10 ÷ 2 = 5." },
          { q: "What is the value of 5 + 0 × 10?", options: ["5", "50", "0", "15"], answer: 0, explain: "Multiplication first: 0 × 10 = 0; then 5 + 0 = 5." }
        ],
        m_ch5: [
          { q: "When a transversal intersects two parallel lines, alternate interior angles are:", options: ["Equal", "Supplementary (add to 180°)", "Complementary", "Unequal"], answer: 0, explain: "Alternate interior angles formed on opposite sides of transversal between parallel lines are equal." },
          { q: "If two parallel lines are cut by a transversal, corresponding angles are:", options: ["Equal", "Complementary", "180°", "Zero"], answer: 0, explain: "Corresponding angles in matching corner positions are equal." },
          { q: "What is the sum of co-interior angles on the same side of a transversal intersecting parallel lines?", options: ["180°", "90°", "360°", "45°"], answer: 0, explain: "Co-interior angles add up to 180° (supplementary)." },
          { q: "Two angles are supplementary if their measures add up to:", options: ["180°", "90°", "360°", "270°"], answer: 0, explain: "Supplementary angles sum to 180°." },
          { q: "When two straight lines intersect at a point, vertically opposite angles are:", options: ["Equal", "Supplementary", "90°", "Variable"], answer: 0, explain: "Vertically opposite angles facing each other across an intersection are equal." }
        ]
      }
    },
    8: {
      Science: {
        s_ch1: [
          { q: "Loosening and turning of soil before sowing seeds is:", options: ["Ploughing / Tilling", "Harvesting", "Weeding", "Threshing"], answer: 0, explain: "Ploughing aerates and loosens soil for root growth." },
          { q: "Organic substance obtained from decomposed plant/animal waste is:", options: ["Manure", "Fertilizer", "Pesticide", "Weedicide"], answer: 0, explain: "Manure is natural organic decomposed waste." },
          { q: "Separating grain seeds from harvested chaff is called:", options: ["Threshing", "Sowing", "Irrigation", "Ploughing"], answer: 0, explain: "Threshing loosens grain from stalks." },
          { q: "Which bacterium living in root nodules fixes atmospheric nitrogen?", options: ["Rhizobium", "Lactobacillus", "Yeast", "Amoeba"], answer: 0, explain: "Rhizobium bacteria fix nitrogen in leguminous roots." },
          { q: "Modern water-saving irrigation method suitable for uneven land is:", options: ["Sprinkler System", "Chain pump", "Moat", "Rahat"], answer: 0, explain: "Sprinkler irrigation sprays water evenly." }
        ]
      }
    },
    9: {
      Science: {
        s_ch1: [
          { q: "Which state of matter has definite shape and fixed volume?", options: ["Solid", "Liquid", "Gas", "Plasma"], answer: 0, explain: "Solids retain fixed shape and volume." },
          { q: "Process of liquid converting to gas below its boiling point is:", options: ["Evaporation", "Sublimation", "Condensation", "Melting"], answer: 0, explain: "Evaporation occurs at liquid surface below boiling point." },
          { q: "Direct change from solid to gas without liquid state is:", options: ["Sublimation", "Evaporation", "Fusion", "Freezing"], answer: 0, explain: "Sublimation converts solid directly to gas (e.g. camphor)." },
          { q: "SI unit of temperature is:", options: ["Kelvin (K)", "Celsius (°C)", "Fahrenheit (°F)", "Joule (J)"], answer: 0, explain: "Kelvin is the SI unit of temperature." },
          { q: "Rate of evaporation increases with increase in:", options: ["Surface area and temperature", "Humidity", "Cold wind", "Pressure"], answer: 0, explain: "Higher temperature and surface area accelerate evaporation." }
        ]
      }
    },
    10: {
      Science: QUIZ_BANK.Science,
    },
  };

  const GRADE_FLASHCARD_SPECS = {
    6: {
      Science: [
        ["Food and Its Sources", "Why do students study food sources?", "To know how plants and animals provide food and energy."],
        ["Sorting Materials", "What does transparent mean?", "It means we can see through the material."],
        ["Motion and Measurement", "What unit is used for length?", "The metre is the standard unit for length."],
      ],
      Mathematics: [
        ["Numbers", "What is a whole number?", "A counting number including zero."],
        ["Fractions", "What does the denominator show?", "The total number of equal parts."],
        ["Geometry", "What is a point?", "A point shows exact position and has no size."],
      ],
      "Social Science": [
        ["Our Community", "What is a community?", "People living and working together in an area."],
        ["Maps", "What does a map help us do?", "Find places and directions."],
        ["Resources", "What is a resource?", "Anything useful to people."],
      ],
      English: [
        ["Grammar", "What is a noun?", "A naming word."],
        ["Reading", "What do we do in comprehension?", "Read and understand the passage."],
        ["Writing", "What is a sentence?", "A group of words that makes complete sense."],
      ],
    },
    7: {
      Science: [
        ["Measurement", "What is a light year?", "The distance travelled by light in one year, which is 9.46 * 10^15 metres."],
        ["Force and Motion", "What is velocity?", "The rate of change of displacement, measured in m/s."],
        ["Matter Around Us", "What is an element?", "A substance made of only one kind of atom, which cannot be broken down chemically."],
      ],
      Mathematics: [
        ["Number System", "What is the product of a negative integer and a positive integer?", "A negative integer."],
        ["Measurements", "What is the formula for the area of a parallelogram?", "Base multiplied by height (b * h)."],
        ["Algebra", "What is a variable?", "A symbol, usually a letter like x or y, that represents an unknown value in an equation."],
      ],
      "Social Science": [
        ["Environment", "What is the environment?", "Everything around us in nature and society."],
        ["History", "What does chronology mean?", "Arranging events in time order."],
        ["Civics", "What is a rule?", "A guideline that helps people live together."],
      ],
      English: [
        ["Tenses", "Why do we use tenses?", "To show the time of an action."],
        ["Writing", "What is a notice?", "A short formal message."],
        ["Reading", "What is the main idea?", "The most important point of a text."],
      ],
    },
    8: {
      Science: [
        ["Crop Production", "Why do farmers plough soil?", "To loosen soil and help roots grow better."],
        ["Microorganisms", "Which microbe helps in baking?", "Yeast."],
        ["Force and Pressure", "What is pressure?", "Force acting on a unit area."],
      ],
      Mathematics: [
        ["Linear Equations", "What is the goal of solving an equation?", "Find the value of the unknown."],
        ["Exponents", "What does a power show?", "Repeated multiplication."],
        ["Mensuration", "What does area measure?", "The surface inside a shape."],
      ],
      "Social Science": [
        ["Resources", "What is sustainable use?", "Using resources without wasting them."],
        ["History", "Why study the colonial period?", "To understand major changes in society and economy."],
        ["Civics", "What is justice?", "Fair treatment for everyone."],
      ],
      English: [
        ["Grammar", "What is a clause?", "A group of words with a subject and verb."],
        ["Writing", "What should a formal letter include?", "Clear format, purpose, and respectful tone."],
        ["Literature", "Why do we discuss theme?", "To understand the deeper message of the text."],
      ],
    },
    9: {
      Science: [
        ["Matter in Our Surroundings", "Which state of matter has fixed shape and fixed volume?", "Solid has fixed shape and fixed volume."],
        ["Atoms and Molecules", "What does the law of conservation of mass say?", "Mass remains conserved in a chemical reaction."],
        ["The Fundamental Unit of Life", "What is the basic structural and functional unit of life?", "The cell is the basic unit of life."],
      ],
      Mathematics: [
        ["Number Systems", "How do we describe irrational numbers?", "They cannot be written as p/q where q is not zero."],
        ["Polynomials", "What is the degree of a polynomial?", "The highest power of the variable."],
        ["Coordinate Geometry", "What is the origin on the Cartesian plane?", "The origin is the point (0, 0)."],
      ],
      "Social Science": [
        ["Democratic Politics-I", "What is democracy?", "A form of government chosen by the people through elections."],
        ["History", "What ideas drove the French Revolution?", "Liberty, equality, and fraternity."],
        ["Economics", "What is the basic idea of production in Palampur?", "Farming is the main economic activity."],
      ],
      English: [
        ["Reading Skills", "What does inference mean in reading comprehension?", "Using clues to reach a logical conclusion."],
        ["Writing Skills", "What does a formal letter usually include?", "Address, date, subject, salutation, body, and closing."],
        ["Grammar", "Why do we revise subject-verb agreement?", "To match the verb with the subject correctly."],
      ],
    },
    10: {
      Science: [
        ["Acids, Bases and Salts", "What is neutralisation?", "An acid reacts with a base to form salt and water."],
        ["Light - Reflection and Refraction", "What does a convex lens do to parallel rays?", "It converges them to a focus."],
        ["Electricity", "What is Ohm's law?", "Voltage equals current multiplied by resistance."],
      ],
      Mathematics: [
        ["Real Numbers", "What do we use the Euclid division algorithm for?", "To find the HCF of two positive integers."],
        ["Pair of Linear Equations", "What does a pair of linear equations represent?", "Two straight lines that may intersect, coincide, or be parallel."],
        ["Statistics", "What does the mean measure?", "The average value of a data set."],
      ],
      "Social Science": [
        ["History", "What idea became central in the rise of nationalism in Europe?", "The idea of a nation state."],
        ["Geography", "What is the main focus of resources and development?", "Using resources sustainably."],
        ["Political Science", "What does consumer rights protect?", "The rights of buyers against unfair trade practices."],
      ],
      English: [
        ["Reading Skills", "What is the main goal of reading comprehension?", "To understand and interpret the text accurately."],
        ["Writing Skills", "What should a formal letter keep?", "A clear format, tone, and purpose."],
        ["Literature", "Why do we study theme and message?", "To understand what the writer wants to convey."],
      ],
    },
  };

  function subjectKey(value) {
    return cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  }

  function buildFlashcardsForGrade(grade) {
    const gradeSpecs = GRADE_FLASHCARD_SPECS[grade];
    if (!gradeSpecs) return [];
    const sourceBySubject = OFFICIAL_SOURCE_URLS;
    const cards = [];

    Object.keys(gradeSpecs).forEach(subject => {
      const sourceUrl = sourceBySubject[subject] || "";
      gradeSpecs[subject].forEach((entry, index) => {
        cards.push({
          id: `g${grade}_${subjectKey(subject)}_${index + 1}`,
          grade: String(grade),
          subject,
          topic: entry[0],
          question: entry[1],
          answer: entry[2],
          sourceUrl,
        });
      });
    });

    return cards;
  }

  const GRADE_FLASHCARDS = {
    6: buildFlashcardsForGrade(6),
    7: buildFlashcardsForGrade(7),
    8: buildFlashcardsForGrade(8),
    9: buildFlashcardsForGrade(9),
    10: buildFlashcardsForGrade(10),
  };

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function escapeHTML(value) {
    return cleanText(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalize(value) {
    return cleanText(value).toLowerCase();
  }

  function getScienceChapters(grade = 10) {
    const chapters = SCIENCE_CHAPTERS_BY_GRADE[grade];
    if (!chapters) return [];
    return chapters.map(chapter => ({ ...chapter }));
  }

  function getChapterByKey(key, grade = null) {
    const chapters = grade ? getScienceChapters(grade) : Object.values(SCIENCE_CHAPTERS_BY_GRADE).flat();
    return chapters.find(chapter => chapter.key === key || chapter.id === key) || null;
  }

  function getChapterByQuery(query, grade = 10) {
    const lower = normalize(query);
    if (!lower) return null;
    const chapters = getScienceChapters(grade);
    return chapters.find(chapter =>
      chapter.key === lower ||
      chapter.id === lower ||
      chapter.title.toLowerCase().includes(lower) ||
      chapter.keywords.some(keyword => lower.includes(keyword))
    ) || null;
  }

  function getChapterStatus(chapterId) {
    if (!window.StudyPilotDB || typeof window.StudyPilotDB.getCurriculumProgress !== "function") {
      return "Not Started";
    }
    const progress = window.StudyPilotDB.getCurriculumProgress();
    return (progress && progress[chapterId] && progress[chapterId].status) || "Not Started";
  }

  function buildKnowledgeHtml(chapter) {
    const status = getChapterStatus(chapter.id);
    const highlights = chapter.highlights.map(item => `<li>${escapeHTML(item)}</li>`).join("");
    return `
      <div class="official-knowledge-card">
        <p class="text-muted text-xs">CBSE Grade ${escapeHTML(chapter.grade || 10)} Science - Official NCERT source</p>
        <h3>${escapeHTML(chapter.title)}</h3>
        <p>${escapeHTML(chapter.summary)}</p>
        <ul class="chapter-highlights">${highlights}</ul>
        <p><strong>Status:</strong> ${escapeHTML(status)}</p>
        <p>
          <a href="${chapter.textbookUrl}" target="_blank" rel="noopener noreferrer">Open official chapter PDF</a>
          &nbsp;|&nbsp;
          <a href="${chapter.textbookPage}" target="_blank" rel="noopener noreferrer">Open textbook page</a>
        </p>
      </div>
    `;
  }

  function getSubjects(grade = 10) {
    return getSubjectsForGrade(grade);
  }

  function getSubjectsForGrade(grade = 10) {
    const cards = GRADE_FLASHCARDS[grade];
    if (cards && cards.length > 0) {
      return [...new Set(cards.map(card => card.subject))];
    }

    return Object.keys(OFFICIAL_SOURCE_URLS);
  }

  function getBookCatalog(boardKey = "ncert", grade = 10, subject = "") {
    const board = TEXTBOOK_CATALOG[boardKey] || {};
    const gradeCatalog = board[Number(grade)] || {};
    if (!subject) {
      return Object.values(gradeCatalog).flatMap(entry => Array.isArray(entry) ? entry.map(item => ({ ...item })) : [{ ...entry }]);
    }

    const book = gradeCatalog[subject];
    if (!book) return [];
    return Array.isArray(book) ? book.map(item => ({ ...item })) : [{ ...book }];
  }

  function getTextbookResource(boardKey = "ncert", grade = 10, subject = "") {
    const catalog = getBookCatalog(boardKey, grade, subject);
    return catalog[0] ? { ...catalog[0] } : null;
  }

  function getQuizChapters(subject, grade = 10) {
    if (normalize(subject) !== "science") return [];
    const chapters = getScienceChapters(grade);
    if (!chapters.length) return [];
    return chapters.map(chapter => ({
      key: chapter.key,
      label: `Ch ${chapter.num}: ${chapter.title}`,
      officialUrl: chapter.textbookUrl,
      textbookPage: chapter.textbookPage,
    }));
  }

  function getQuizBank(grade = 10) {
    const quizBank = QUIZ_BANK_BY_GRADE[grade];
    if (!quizBank) return {};
    return JSON.parse(JSON.stringify(quizBank));
  }

  function getFlashcardsForGrade(grade = 10, subject = "") {
    const deck = GRADE_FLASHCARDS[grade];
    if (!deck) return [];
    const cards = Object.values(deck).flat();
    if (!subject) return JSON.parse(JSON.stringify(cards));
    return JSON.parse(JSON.stringify(cards.filter(card => card.subject === subject)));
  }

  function findKnowledge(query, grade = 10) {
    const chapter = getChapterByQuery(query, grade);
    if (chapter) {
      return buildKnowledgeHtml(chapter);
    }

    if (/grade\s*(6|7|8|9|10)|class\s*(vi|vii|viii|ix|x)|cbse|ncert/.test(normalize(query))) {
      const chapters = getScienceChapters(grade);
      return `
        <div class="official-knowledge-card">
          <p>Official Grade ${grade} Science is connected to the NCERT textbook only for these chapters right now:</p>
          <ul class="chapter-highlights">
            ${chapters.map(chapter => `<li>Ch ${chapter.num}: ${escapeHTML(chapter.title)}</li>`).join("")}
          </ul>
          <p>Choose a chapter to open the official PDF in a new tab.</p>
        </div>
      `;
    }

    return null;
  }

  // Comprehensive Database of Real, Topic-Specific NCERT Chapter Summaries in POINTS
  const NCERT_CHAPTER_SUMMARIES = {
    "7": {
      "Science": [
        {
          num: 1,
          title: "The Ever-Evolving World of Science / Nutrition in Plants",
          concept: "Autotrophic nutrition and chlorophyll-mediated photosynthesis in green plants.",
          points: [
            "Autotrophs (green plants) synthesize their own food using carbon dioxide, water, and solar energy captured by chlorophyll.",
            "Photosynthesis Equation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (occurring within leaf chloroplasts).",
            "Stomata surrounded by guard cells regulate carbon dioxide uptake and water vapor release (transpiration).",
            "Heterotrophic modes: Insectivorous plants (Pitcher plant traps insects for nitrogen), Saprotrophs (Fungi secrete digestive juices on dead organic matter), Parasites (Cuscuta absorbs nutrients from host trees).",
            "Symbiosis: Mutualistic relationship where both organisms benefit, such as Lichens (alga provides carbohydrates, fungus provides shelter and water)."
          ],
          formula: "6CO_2 + 6H_2O \\xrightarrow{\\text{Sunlight, Chlorophyll}} C_6H_{12}O_6 + 6O_2",
          sample_question: "Differentiate between a parasite and a saprotroph with one NCERT textbook example each.",
          sample_answer: "Parasites (e.g. Cuscuta) take nutrition from a living host organism and harm it; Saprotrophs (e.g. Fungi/Mushroom) feed on dead and decaying matter by external digestion.",
          memory_hook: "Auto = Self (Plants), Hetero = Other (Animals), Sapro = Rotten/Dead."
        },
        {
          num: 2,
          title: "Acids, Bases and Salts / Nutrition in Animals",
          concept: "Chemical indicators, litmus tests, neutralization reactions, and alimentary digestion.",
          points: [
            "Acids are sour in taste and turn Blue litmus RED (pH < 7, e.g. Citric acid in lemon, Acetic acid in vinegar).",
            "Bases are bitter, soapy to touch, and turn Red litmus BLUE (pH > 7, e.g. Sodium hydroxide, Baking soda).",
            "Neutralization reaction: Acid + Base → Salt + Water + Heat (e.g. HCl + NaOH → NaCl + H₂O).",
            "Human Digestion stages: Ingestion (mouth with saliva), Digestion (stomach HCl and pepsin), Absorption (small intestine villi), Assimilation (cell use), Egestion (large intestine anus).",
            "Bile juice produced by the liver and stored in the gallbladder emulsifies fats for pancreatic lipase digestion."
          ],
          formula: "\\text{Acid} + \\text{Base} \\longrightarrow \\text{Salt} + \\text{Water} + \\text{Heat}",
          sample_question: "Explain why an antacid tablet is taken when suffering from acidity in the stomach.",
          sample_answer: "The stomach produces excess hydrochloric acid (HCl). Antacids containing mild bases like magnesium hydroxide [Milk of Magnesia] neutralize the excess acid, relieving pain.",
          memory_hook: "BRA = Blue to Red = Acid. RBB = Red to Blue = Base."
        },
        {
          num: 3,
          title: "Electricity: Circuits and Components / Heat",
          concept: "Electric circuits, Ohm's law, heating effects, safety fuses, and heat transfer mechanisms.",
          points: [
            "An electric circuit is a continuous closed loop allowing electric charges to flow from the positive to negative terminal of a battery.",
            "Heating effect of current (Joule's Heating): When current flows through high-resistance wire (Nichrome in heaters), it becomes red-hot and produces heat ($H = I^2Rt$).",
            "Electric Fuse: A safety device with a low melting point wire that melts and breaks the circuit during short circuits or power overloads.",
            "Electromagnet: A coil of insulated wire wrapped around an iron core that acts as a magnet when electric current is switched on (used in electric bells and cranes).",
            "Three Modes of Heat Transfer: Conduction (solids, direct particle contact), Convection (fluids, density currents), Radiation (no medium needed, vacuum waves)."
          ],
          formula: "H = I^2 R t \\quad \\text{and} \\quad V = I R",
          sample_question: "What is an electromagnet and how can you increase its magnetic strength?",
          sample_answer: "An electromagnet is a temporary magnet created by passing electric current through a solenoid coil around a soft iron core. Strength is increased by: 1) Increasing electric current, 2) Increasing number of coil turns.",
          memory_hook: "Conduction = Contact, Convection = Current, Radiation = Rays."
        },
        {
          num: 6,
          title: "Adolescence: A Stage of Growth and Change",
          concept: "Human growth phase, puberty, secondary sexual traits, and endocrine hormonal control.",
          points: [
            "Adolescence is the biological period between childhood and adulthood (approx. 11 to 19 years) leading to reproductive maturity.",
            "Puberty triggers sudden growth in height, muscle mass, enlargement of larynx (Adam's apple in boys), and voice change.",
            "Secondary Sexual Characteristics: Facial hair and broader shoulders in boys; breast development and onset of menstruation (menarche) in girls.",
            "Endocrine Glands: Ductless glands that release hormones directly into blood (Pituitary master gland, Thyroid thyroxine, Pancreas insulin, Adrenal adrenaline, Testes testosterone, Ovaries estrogen).",
            "Nutritional Needs: Rapid adolescent cell division requires a balanced diet high in protein, calcium, and iron (to prevent anemia)."
          ],
          formula: "\\text{Height Percentage} = \\frac{\\text{Present Height (cm)}}{\\% \\text{ of Full Height at Age}} \\times 100",
          sample_question: "Name the hormones secreted by testes and ovaries and describe their key functions.",
          sample_answer: "Testes secrete Testosterone (initiates male puberty and sperm production); Ovaries secrete Estrogen (initiates female puberty, breast development, and ovum maturation).",
          memory_hook: "Pituitary commands -> Endocrine responds -> Hormones target organs."
        }
      ],
      "Mathematics": [
        {
          num: 1,
          title: "Integers",
          concept: "Rules for positive and negative integers, arithmetic properties, and multiplication/division rules.",
          points: [
            "Integers include positive numbers, negative numbers, and zero (... -3, -2, -1, 0, 1, 2, 3 ...).",
            "Multiplication sign rules: $(+) \\times (+) = (+)$, $(-) \\times (-) = (+)$, $(+) \\times (-) = (-)$, $(-) \\times (+) = (-)$.",
            "Closure, Commutative ($a + b = b + a$) and Associative ($a + (b + c) = (a + b) + c$) properties hold for addition and multiplication.",
            "Distributive Property of Multiplication over Addition: $a \\times (b + c) = (a \\times b) + (a \\times c)$.",
            "Division by zero is undefined ($a \\div 0 = \\text{undefined}$); $a \\div 1 = a$."
          ],
          formula: "a \\times (b + c) = a \\times b + a \\times c",
          sample_question: "Verify the distributive property for $a = -2, b = 3, c = 5$.",
          sample_answer: "LHS: $-2 \\times (3 + 5) = -2 \\times 8 = -16$. RHS: $(-2 \\times 3) + (-2 \\times 5) = -6 + (-10) = -16$. LHS = RHS.",
          memory_hook: "Same signs = Positive product; Different signs = Negative product."
        },
        {
          num: 2,
          title: "Fractions and Decimals",
          concept: "Operations on proper, improper, mixed fractions, decimal place value, and multiplication/division.",
          points: [
            "Fractions: Proper (numerator < denominator), Improper (numerator > denominator), Mixed fraction ($2\\frac{1}{3}$).",
            "Multiplication of fractions: $\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}$.",
            "Reciprocal of a non-zero fraction $\\frac{a}{b}$ is $\\frac{b}{a}$. Division rule: $\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$.",
            "Decimal multiplication: Multiply as whole numbers, then place decimal point matching the sum of decimal places.",
            "Dividing by 10, 100, 1000 shifts the decimal point to the left by 1, 2, or 3 places respectively."
          ],
          formula: "\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}",
          sample_question: "Solve $\\frac{3}{5} \\div \\frac{9}{20}$.",
          sample_answer: "$\\frac{3}{5} \\times \\frac{20}{9} = \\frac{3 \\times 20}{5 \\times 9} = \\frac{60}{45} = \\frac{4}{3} = 1\\frac{1}{3}$.",
          memory_hook: "Keep, Change, Flip (KCF) for fraction division!"
        },
        {
          num: 6,
          title: "The Triangle and Its Properties",
          concept: "Median, altitude, exterior angle theorem, angle sum property, and Pythagoras theorem.",
          points: [
            "Angle Sum Property of a Triangle: The sum of the interior angles of any triangle is always $180^\\circ$.",
            "Exterior Angle Theorem: An exterior angle of a triangle is equal to the sum of its two interior opposite angles ($\\angle \\text{ext} = \\angle 1 + \\angle 2$).",
            "Triangle Inequality Property: The sum of the lengths of any two sides of a triangle is strictly greater than the third side ($a + b > c$).",
            "Pythagoras Theorem (in right-angled triangles): $\\text{Hypotenuse}^2 = \\text{Base}^2 + \\text{Perpendicular}^2$ ($c^2 = a^2 + b^2$).",
            "Hypotenuse is always the longest side of a right-angled triangle."
          ],
          formula: "a^2 + b^2 = c^2 \\quad \\text{and} \\quad \\angle A + \\angle B + \\angle C = 180^\\circ",
          sample_question: "Can a triangle have sides of length $3\\text{ cm}, 6\\text{ cm}, 10\\text{ cm}$? Explain why or why not.",
          sample_answer: "No. For a valid triangle, $a + b > c$. Here $3 + 6 = 9\\text{ cm}$, which is NOT greater than $10\\text{ cm}$.",
          memory_hook: "Pythagoras: $3-4-5$, $5-12-13$, $8-15-17$ are Pythagorean triplets."
        }
      ]
    },
    "6": {
      "Science": [
        {
          num: 1,
          title: "Patterns in the World of Science / Food Sources",
          concept: "Food components, dietary sources, nutrients, and healthy balanced diets.",
          points: [
            "Food provides energy, growth, cell repair, and disease resistance.",
            "Major nutrients: Carbohydrates & Fats (energy givers), Proteins (body builders), Vitamins & Minerals (protective foods).",
            "Testing for nutrients: Iodine test for starch (turns blue-black), Copper sulfate + Caustic soda for protein (turns violet).",
            "Roughage (dietary fiber) and water help eliminate undigested food and prevent constipation.",
            "Deficiency diseases: Scurvy (Vit C), Rickets (Vit D), Goitre (Iodine), Anemia (Iron)."
          ],
          formula: "\\text{Carbohydrate} + \\text{Iodine} \\longrightarrow \\text{Blue-Black Complex}",
          sample_question: "Describe how you would test a food sample for the presence of starch.",
          sample_answer: "Add 2-3 drops of dilute iodine solution to the mashed food sample. Appearance of a blue-black color confirms starch.",
          memory_hook: "Iodine + Starch = Blue-Black; Biuret + Protein = Violet."
        }
      ]
    },
    "10": {
      "Science": [
        {
          num: 1,
          title: "Chemical Reactions and Equations",
          concept: "Balancing equations, types of reactions, oxidation, reduction, and corrosion prevention.",
          points: [
            "Law of Conservation of Mass: Total mass of reactants equals total mass of products in a balanced chemical equation.",
            "Combination: Two or more reactants form one product ($A + B \\to AB$, e.g. $\\text{CaO} + \\text{H}_2\\text{O} \\to \\text{Ca(OH)}_2$).",
            "Decomposition: Single reactant breaks down on heating, light, or electricity ($2\\text{FeSO}_4 \\to \\text{Fe}_2\\text{O}_3 + \\text{SO}_2 + \\text{SO}_3$).",
            "Displacement & Double Displacement: More reactive metal displaces less reactive metal ($\\text{Fe} + \\text{CuSO}_4 \\to \\text{FeSO}_4 + \\text{Cu}$).",
            "Redox reactions: Oxidation is gain of oxygen/loss of hydrogen; Reduction is loss of oxygen/gain of hydrogen."
          ],
          formula: "\\text{Redox}: \\text{CuO} + \\text{H}_2 \\xrightarrow{\\Delta} \\text{Cu} + \\text{H}_2\\text{O}",
          sample_question: "Why is respiration considered an exothermic reaction?",
          sample_answer: "During respiration, glucose combines with oxygen in cells releasing substantial energy: $\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\to 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{Energy}$.",
          memory_hook: "OIL RIG: Oxidation Is Loss of electrons/gain of O; Reduction Is Gain of electrons."
        }
      ]
    }
  };

  function getChapterSummary(grade, subject, queryOrTitle, chapterIndex) {
    const gStr = String(grade || "7");
    let sKey = String(subject || "Science").trim();
    if (sKey.toLowerCase().includes("math")) sKey = "Mathematics";
    else if (sKey.toLowerCase().includes("social") || sKey.toLowerCase() === "sst") sKey = "Social Science";
    else if (sKey.toLowerCase().includes("eng")) sKey = "English";
    else if (sKey.toLowerCase().includes("sci")) sKey = "Science";

    const qStr = String(queryOrTitle || "").toLowerCase().trim();
    const chIdx = chapterIndex ? parseInt(chapterIndex, 10) : null;

    // Merge window.NCERT_ALL_SUMMARIES if available
    const globalSummaries = window.NCERT_ALL_SUMMARIES || {};
    const localSummaries = NCERT_CHAPTER_SUMMARIES || {};
    const gradeData = (globalSummaries[gStr] && globalSummaries[gStr][sKey]) 
      ? globalSummaries[gStr] 
      : (localSummaries[gStr] || {});

    // Try exact subject key then fuzzy match
    let gradeList = gradeData[sKey];
    if (!gradeList) {
      const sKeyLower = sKey.toLowerCase();
      const foundKey = Object.keys(gradeData).find(k => k.toLowerCase().includes(sKeyLower) || sKeyLower.includes(k.toLowerCase()));
      gradeList = foundKey ? gradeData[foundKey] : [];
    }
    if ((!gradeList || gradeList.length === 0) && globalSummaries[gStr] && globalSummaries[gStr][sKey]) {
      gradeList = globalSummaries[gStr][sKey];
    }
    gradeList = gradeList || [];

    // 1. Fastest: match by chapter number index
    if (chIdx && chIdx >= 1) {
      const byNum = gradeList.find(item => item.num === chIdx);
      if (byNum) return byNum;
    }

    // 2. Parse chapter number from label like "Ch 3: Atoms" or "Unit 2: ..."
    const chNumMatch = qStr.match(/(?:ch|chapter|unit|lesson)\s*(\d+)/i);
    if (chNumMatch) {
      const parsedNum = parseInt(chNumMatch[1], 10);
      const byParsed = gradeList.find(item => item.num === parsedNum);
      if (byParsed) return byParsed;
    }

    // 3. Keyword/title match
    if (qStr) {
      for (const item of gradeList) {
        const itemTitle = (item.title || "").toLowerCase();
        if (itemTitle === qStr) return item;
        const qClean = qStr.replace(/^(?:ch|chapter|unit)\s*\d+[\s:\-]+/i, "").trim();
        if (qClean && (itemTitle.includes(qClean) || qClean.includes(itemTitle))) {
          return item;
        }
        const qWords = qClean.replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => w.length > 3);
        const matchCount = qWords.filter(w => itemTitle.includes(w)).length;
        if (matchCount >= 2 || (qWords.length === 1 && itemTitle.includes(qWords[0]))) {
          return item;
        }
      }
    }

    // 4. Fallback to index if in range
    if (chIdx && chIdx <= gradeList.length && chIdx >= 1) {
      return gradeList[chIdx - 1];
    }

    // 5. Fallback: first item
    if (gradeList.length > 0) {
      return gradeList[0];
    }

    return null;
  }

  function getSubjectSummary(subject, grade = 10) {
    if (normalize(subject) !== "science") {
      return [];
    }
    return getScienceChapters(grade);
  }

  const catalog = {
    board: "CBSE",
    grade: 10,
    subject: "Science",
    textbookPage: "https://ncert.nic.in/textbook.php?jesc1=1-16",
    getBoards: () => ["CBSE"],
    getGrades: () => [6, 7, 8, 9, 10],
    getSubjects,
    getSubjectsForGrade,
    getChapters: (subject) => {
      const profile = window.StudyPilotDB && typeof window.StudyPilotDB.getProfile === "function"
        ? window.StudyPilotDB.getProfile()
        : null;
      const grade = profile ? profile.grade : 10;
      return getSubjectSummary(subject, grade);
    },
    getScienceChapters,
    getChapterByKey,
    getQuizChapters,
    getQuizBank,
    getFlashcardsForGrade,
    getBookCatalog,
    getTextbookResource,
    findKnowledge,
    getChapterSummary,
    NCERT_CHAPTER_SUMMARIES,
    getOfficialTextbookUrl: (chapterKey) => {
      const chapter = getChapterByKey(chapterKey);
      return chapter ? chapter.textbookUrl : "";
    },
    getOfficialTextbookPage: (chapterKey) => {
      const chapter = getChapterByKey(chapterKey);
      return chapter ? chapter.textbookPage : "";
    },
    getChapterStatus,
  };

  window.StudyPilotCurriculum = catalog;
  window.StudyPilotSyllabus = catalog;
  window.QUIZ_BANK_BY_GRADE = QUIZ_BANK_BY_GRADE;
})();

