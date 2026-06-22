/* ======================================================== */
/* StudyPilot Official Curriculum Catalog                   */
/* CBSE Grade 10 | Official NCERT textbook links only       */
/* ======================================================== */

(function () {
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
    "Computer Science": "https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/Computer_Applications_Sec_2025-26.pdf",
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
        id: "cbse7_science_ch1",
        num: 1,
        key: "g7_ch1",
        grade: 7,
        title: "Nutrition in Plants",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Study how plants make food, how chlorophyll works, and why photosynthesis matters.",
        highlights: ["Photosynthesis", "Chlorophyll and sunlight", "Autotrophic nutrition"],
        keywords: ["nutrition", "plants", "photosynthesis", "chlorophyll", "food"],
      },
      {
        id: "cbse7_science_ch2",
        num: 2,
        key: "g7_ch2",
        grade: 7,
        title: "Heat",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Explore temperature, transfer of heat, and how heat moves by conduction, convection, and radiation.",
        highlights: ["Temperature and heat", "Conduction and convection", "Radiation"],
        keywords: ["heat", "temperature", "conduction", "convection", "radiation"],
      },
      {
        id: "cbse7_science_ch3",
        num: 3,
        key: "g7_ch3",
        grade: 7,
        title: "Acids, Bases and Salts",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Revise indicators, neutralisation, and everyday examples of acidic and basic substances.",
        highlights: ["Acids and bases", "Indicators", "Neutralisation"],
        keywords: ["acid", "base", "salt", "indicator", "neutralisation"],
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
        g6_ch1: [
          { q: "Which of these is a source of food?", options: ["Plants", "Rocks", "Books", "Clouds"], answer: 0, explain: "Plants are a source of food." },
          { q: "Why do we need food?", options: ["For energy and growth", "To make noise", "To stay asleep", "To stop breathing"], answer: 0, explain: "Food gives energy and helps us grow." },
          { q: "Which is a healthy food choice?", options: ["Fruit", "Stone", "Plastic", "Sand"], answer: 0, explain: "Fruit is nutritious and healthy." },
        ],
        g6_ch2: [
          { q: "Which property helps us identify materials?", options: ["Colour and hardness", "Music", "Speed", "Temperature only"], answer: 0, explain: "Materials can be grouped by properties." },
          { q: "What does transparent mean?", options: ["You can see through it", "It is always heavy", "It is edible", "It is magnetic"], answer: 0, explain: "Transparent materials allow light to pass through." },
          { q: "Which is insoluble in water?", options: ["Sand", "Salt", "Sugar", "Honey"], answer: 0, explain: "Sand does not dissolve in water." },
        ],
        g6_ch3: [
          { q: "What is used to measure length?", options: ["Metre scale", "Clock", "Thermometer", "Compass"], answer: 0, explain: "Length is measured using standard units like metre." },
          { q: "Which object shows motion?", options: ["A moving car", "A fixed wall", "A chair", "A book on a shelf"], answer: 0, explain: "Motion means change in position." },
          { q: "Which unit is commonly used for distance?", options: ["Metre", "Litre", "Gram", "Second"], answer: 0, explain: "Distance is measured in metres or kilometres." },
        ],
      },
    },
    7: {
      Science: {
        g7_ch1: [
          { q: "What process do plants use to make food?", options: ["Photosynthesis", "Respiration", "Digestion", "Evaporation"], answer: 0, explain: "Plants make food by photosynthesis." },
          { q: "Which pigment helps plants trap sunlight?", options: ["Chlorophyll", "Melanin", "Haemoglobin", "Starch"], answer: 0, explain: "Chlorophyll absorbs sunlight." },
          { q: "Plants are called what kind of organisms?", options: ["Autotrophs", "Parasites", "Carnivores", "Consumers"], answer: 0, explain: "Plants make their own food, so they are autotrophs." },
        ],
        g7_ch2: [
          { q: "What is heat?", options: ["A form of energy", "A type of stone", "A metal only", "A gas only"], answer: 0, explain: "Heat is a form of energy." },
          { q: "Which method transfers heat through solids?", options: ["Conduction", "Evaporation", "Condensation", "Fusion"], answer: 0, explain: "Conduction transfers heat through solids." },
          { q: "Heat from the Sun reaches us by:", options: ["Radiation", "Conduction", "Friction", "Sound"], answer: 0, explain: "Heat travels from the Sun by radiation." },
        ],
        g7_ch3: [
          { q: "What do acids taste like?", options: ["Sour", "Sweet", "Bitter", "Salty"], answer: 0, explain: "Acids usually taste sour." },
          { q: "What does neutralisation produce?", options: ["Salt and water", "Only heat", "Only gas", "Only acid"], answer: 0, explain: "Neutralisation produces salt and water." },
          { q: "Which is a base?", options: ["Soap", "Vinegar", "Lemon juice", "Orange juice"], answer: 0, explain: "Soap is basic." },
        ],
      },
    },
    8: {
      Science: {
        g8_ch1: [
          { q: "What helps loosen the soil before sowing?", options: ["Ploughing", "Freezing", "Painting", "Typing"], answer: 0, explain: "Ploughing loosens and aerates the soil." },
          { q: "What is added to soil to increase fertility?", options: ["Manure", "Plastic", "Ink", "Oil"], answer: 0, explain: "Manure improves soil fertility." },
          { q: "What should grains be protected from in storage?", options: ["Moisture", "Sunlight", "Books", "Bells"], answer: 0, explain: "Stored grains must be kept dry." },
        ],
        g8_ch2: [
          { q: "Which is a useful microorganism?", options: ["Yeast", "Stone", "Dust", "Plastic"], answer: 0, explain: "Yeast is a useful microorganism." },
          { q: "Why is food preserved?", options: ["To stop spoilage", "To make it loud", "To turn it blue", "To increase weight"], answer: 0, explain: "Preservation stops food from spoiling." },
          { q: "Which can cause diseases?", options: ["Some bacteria", "Rocks", "Tables", "Pencils"], answer: 0, explain: "Some microbes are harmful and cause disease." },
        ],
        g8_ch3: [
          { q: "A push or pull is called:", options: ["Force", "Heat", "Light", "Sound"], answer: 0, explain: "Force means push or pull." },
          { q: "Pressure depends on:", options: ["Force and area", "Colour and shape", "Taste and smell", "Weight only"], answer: 0, explain: "Pressure depends on force applied over area." },
          { q: "Which is an example of force?", options: ["Kicking a ball", "Reading a book", "Sleeping", "Drawing a line"], answer: 0, explain: "Kicking a ball applies force." },
        ],
      },
    },
    9: {
      Science: {
        g9_ch1: [
          { q: "Which state of matter has fixed shape and fixed volume?", options: ["Solid", "Liquid", "Gas", "Plasma"], answer: 0, explain: "Solids keep both shape and volume." },
          { q: "What happens during evaporation?", options: ["Liquid changes to gas", "Gas changes to liquid", "Solid changes to gas only", "Nothing"], answer: 0, explain: "Evaporation is liquid to gas at the surface." },
          { q: "Which is a method of separating insoluble solids from liquids?", options: ["Filtration", "Sublimation", "Melting", "Condensation"], answer: 0, explain: "Filtration separates an insoluble solid from a liquid." },
        ],
        g9_ch3: [
          { q: "The law of conservation of mass says:", options: ["Mass can disappear", "Mass is always constant in a reaction", "Atoms are destroyed", "Molecules never form"], answer: 1, explain: "Mass is conserved in a chemical reaction." },
          { q: "Which unit is commonly used for atomic mass?", options: ["kg", "u", "m", "N"], answer: 1, explain: "Atomic mass is measured in unified atomic mass units (u)." },
          { q: "What is a molecule?", options: ["A single proton", "A group of atoms chemically bonded", "Any mixture", "A cell part"], answer: 1, explain: "Molecules are groups of atoms bonded together." },
        ],
        g9_ch9: [
          { q: "What does inertia mean?", options: ["Resistance to change in motion", "Speed of light", "Friction only", "Weight of a body"], answer: 0, explain: "Inertia is resistance to change in state of motion." },
          { q: "Momentum is equal to:", options: ["mass x velocity", "force x time only", "mass / velocity", "weight x area"], answer: 0, explain: "Momentum equals mass multiplied by velocity." },
          { q: "Newton's first law is also called the law of:", options: ["Action and reaction", "Inertia", "Gravity", "Energy"], answer: 1, explain: "Newton's first law describes inertia." },
        ],
      },
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
      "Computer Science": [
        ["Devices", "What is a computer used for?", "Processing information and helping with tasks."],
        ["Files", "What is a folder?", "A place to organize files."],
        ["Safety", "Why should we be careful online?", "To protect personal information."],
      ],
    },
    7: {
      Science: [
        ["Nutrition in Plants", "What do plants need for photosynthesis?", "Sunlight, water, carbon dioxide, and chlorophyll."],
        ["Heat", "What is conduction?", "Heat transfer through direct contact."],
        ["Acids, Bases and Salts", "What happens in neutralisation?", "An acid and a base form salt and water."],
      ],
      Mathematics: [
        ["Integers", "What is an integer?", "A whole number that can be positive, negative, or zero."],
        ["Simple Equations", "What is an equation?", "A mathematical statement with an equal sign."],
        ["Fractions", "What is a proper fraction?", "A fraction with numerator smaller than denominator."],
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
      "Computer Science": [
        ["Hardware", "What is hardware?", "The physical parts of a computer."],
        ["Internet", "What is a browser?", "Software used to open websites."],
        ["Spreadsheets", "What does a cell contain?", "Data such as text, number, or formula."],
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
      "Computer Science": [
        ["Networks", "What is a network?", "A group of connected computers."],
        ["Presentations", "Why use slides?", "To present information clearly."],
        ["Algorithms", "What is an algorithm?", "A step-by-step way to solve a problem."],
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
      "Computer Science": [
        ["Basics of IT", "What is the difference between RAM and ROM?", "RAM is temporary memory; ROM is permanent memory."],
        ["Cyber Safety", "Why are strong passwords important?", "They protect accounts and personal data."],
        ["Office Tools", "What does a spreadsheet help you do?", "Store data and calculate values like sum and average."],
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
      "Computer Science": [
        ["Networking", "What is the World Wide Web?", "A system of linked web pages accessed through browsers."],
        ["HTML", "What does the href attribute do?", "It defines the destination of a link."],
        ["Cyber Ethics", "What is netiquette?", "Good and respectful online behaviour."],
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
    findKnowledge,
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
})();
