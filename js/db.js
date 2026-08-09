/* ======================================================== */
/* StudyPilot Local Storage Database Engine & Defaults       */
/* ======================================================== */

window.getStudyPilotApiBaseUrl = function () {
  if (window.StudyPilotApi && typeof window.StudyPilotApi.getBaseUrl === "function") {
    return window.StudyPilotApi.getBaseUrl();
  }
  if (window.STUDYPILOT_API_BASE && String(window.STUDYPILOT_API_BASE).trim()) {
    return String(window.STUDYPILOT_API_BASE).replace(/\/+$/, "");
  }
  const meta = document.querySelector('meta[name="studypilot-api-base"]');
  if (meta && meta.getAttribute("content")) {
    return meta.getAttribute("content").replace(/\/+$/, "");
  }
  if (window.location && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const apiParam = params.get("api");
    if (apiParam) {
      return apiParam.replace(/\/+$/, "");
    }
  }
  if (window.location && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    if (window.location.port === "5000") {
      return window.location.origin;
    }
  }
  return "http://127.0.0.1:5000";
};

(function () {
  const DB_PREFIX = "studypilot_";

  // CBSE 7th Grade Full Chapters & Sections table of contents hierarchy
  const CBSE_CURRICULUM = {
    "6": {
      subjects: ["Science", "Mathematics", "Social Science", "English"],
      chapters: {
        "Science": [
          { id: "g6_s_ch1", num: 1, title: "The Wonderful World of Science", desc: "Curiosity Ch 1", sections: [{ id: "g6_s_ch1_1", num: "1.1", title: "What is Science?" }, { id: "g6_s_ch1_2", num: "1.2", title: "Exploring Nature" }] },
          { id: "g6_s_ch2", num: 2, title: "Diversity in the Living World", desc: "Curiosity Ch 2", sections: [{ id: "g6_s_ch2_1", num: "2.1", title: "Plant & Animal Variety" }, { id: "g6_s_ch2_2", num: "2.2", title: "Biodiversity" }] },
          { id: "g6_s_ch3", num: 3, title: "Mindful Eating: A Path to a Healthy Body", desc: "Curiosity Ch 3", sections: [{ id: "g6_s_ch3_1", num: "3.1", title: "Food Components" }, { id: "g6_s_ch3_2", num: "3.2", title: "Balanced Diet" }] },
          { id: "g6_s_ch4", num: 4, title: "Exploring Magnets", desc: "Curiosity Ch 4", sections: [{ id: "g6_s_ch4_1", num: "4.1", title: "Magnetic & Non-magnetic" }, { id: "g6_s_ch4_2", num: "4.2", title: "Poles of Magnet" }] },
          { id: "g6_s_ch5", num: 5, title: "Measurement of Length and Motion", desc: "Curiosity Ch 5", sections: [{ id: "g6_s_ch5_1", num: "5.1", title: "Units of Measurement" }, { id: "g6_s_ch5_2", num: "5.2", title: "Types of Motion" }] },
          { id: "g6_s_ch6", num: 6, title: "Materials Around Us", desc: "Curiosity Ch 6", sections: [{ id: "g6_s_ch6_1", num: "6.1", title: "Properties of Materials" }, { id: "g6_s_ch6_2", num: "6.2", title: "Grouping Objects" }] },
          { id: "g6_s_ch7", num: 7, title: "Temperature and its Measurement", desc: "Curiosity Ch 7", sections: [{ id: "g6_s_ch7_1", num: "7.1", title: "Heat & Temperature" }, { id: "g6_s_ch7_2", num: "7.2", title: "Thermometers" }] },
          { id: "g6_s_ch8", num: 8, title: "A Journey through States of Water", desc: "Curiosity Ch 8", sections: [{ id: "g6_s_ch8_1", num: "8.1", title: "Ice, Water, Steam" }, { id: "g6_s_ch8_2", num: "8.2", title: "Water Cycle" }] },
          { id: "g6_s_ch9", num: 9, title: "Methods of Separation in Everyday Life", desc: "Curiosity Ch 9", sections: [{ id: "g6_s_ch9_1", num: "9.1", title: "Winnowing, Sieving" }, { id: "g6_s_ch9_2", num: "9.2", title: "Filtration & Evaporation" }] },
          { id: "g6_s_ch10", num: 10, title: "Living Creatures: Exploring their Characteristics", desc: "Curiosity Ch 10", sections: [{ id: "g6_s_ch10_1", num: "10.1", title: "Life Processes" }, { id: "g6_s_ch10_2", num: "10.2", title: "Adaptation" }] },
          { id: "g6_s_ch11", num: 11, title: "Nature's Treasures", desc: "Curiosity Ch 11", sections: [{ id: "g6_s_ch11_1", num: "11.1", title: "Air, Water, Soil" }, { id: "g6_s_ch11_2", num: "11.2", title: "Natural Resources" }] },
          { id: "g6_s_ch12", num: 12, title: "Beyond Earth", desc: "Curiosity Ch 12", sections: [{ id: "g6_s_ch12_1", num: "12.1", title: "Sun, Moon, Stars" }, { id: "g6_s_ch12_2", num: "12.2", title: "Solar System" }] }
        ],
        "Mathematics": [
          { id: "g6_m_ch1", num: 1, title: "Patterns in Mathematics", desc: "Ganita Prakash Ch 1", sections: [{ id: "g6_m_ch1_1", num: "1.1", title: "Visual & Number Patterns" }, { id: "g6_m_ch1_2", num: "1.2", title: "Sequence & Rules" }] },
          { id: "g6_m_ch2", num: 2, title: "Lines and Angles", desc: "Ganita Prakash Ch 2", sections: [{ id: "g6_m_ch2_1", num: "2.1", title: "Points, Lines, Rays" }, { id: "g6_m_ch2_2", num: "2.2", title: "Types of Angles" }] },
          { id: "g6_m_ch3", num: 3, title: "Number Play", desc: "Ganita Prakash Ch 3", sections: [{ id: "g6_m_ch3_1", num: "3.1", title: "Operations & Fun with Numbers" }, { id: "g6_m_ch3_2", num: "3.2", title: "Place value & Estimation" }] },
          { id: "g6_m_ch4", num: 4, title: "Data Handling and Presentation", desc: "Ganita Prakash Ch 4", sections: [{ id: "g6_m_ch4_1", num: "4.1", title: "Tally marks & Bar graphs" }, { id: "g6_m_ch4_2", num: "4.2", title: "Interpreting Data" }] },
          { id: "g6_m_ch5", num: 5, title: "Prime Time", desc: "Ganita Prakash Ch 5", sections: [{ id: "g6_m_ch5_1", num: "5.1", title: "Prime & Composite Numbers" }, { id: "g6_m_ch5_2", num: "5.2", title: "HCF & LCM" }] },
          { id: "g6_m_ch6", num: 6, title: "Perimeter and Area", desc: "Ganita Prakash Ch 6", sections: [{ id: "g6_m_ch6_1", num: "6.1", title: "Perimeter of Polygons" }, { id: "g6_m_ch6_2", num: "6.2", title: "Area of Rectangles & Squares" }] },
          { id: "g6_m_ch7", num: 7, title: "Fractions", desc: "Ganita Prakash Ch 7", sections: [{ id: "g6_m_ch7_1", num: "7.1", title: "Proper, Improper & Mixed" }, { id: "g6_m_ch7_2", num: "7.2", title: "Equivalent Fractions" }] },
          { id: "g6_m_ch8", num: 8, title: "Playing with Constructions", desc: "Ganita Prakash Ch 8", sections: [{ id: "g6_m_ch8_1", num: "8.1", title: "Ruler & Compass" }, { id: "g6_m_ch8_2", num: "8.2", title: "Bisecting angles & lines" }] },
          { id: "g6_m_ch9", num: 9, title: "Symmetry", desc: "Ganita Prakash Ch 9", sections: [{ id: "g6_m_ch9_1", num: "9.1", title: "Line Symmetry" }, { id: "g6_m_ch9_2", num: "9.2", title: "Reflection & Patterns" }] },
          { id: "g6_m_ch10", num: 10, title: "The Other Side of Zero", desc: "Ganita Prakash Ch 10", sections: [{ id: "g6_m_ch10_1", num: "10.1", title: "Negative Numbers" }, { id: "g6_m_ch10_2", num: "10.2", title: "Integers on Number Line" }] }
        ],
        "Social Science": [
          { id: "g6_ss_ch1", num: 1, title: "Locating Places on the Earth", desc: "Exploring Society Theme A", sections: [{ id: "g6_ss_ch1_1", num: "1.1", title: "Latitudes & Longitudes" }, { id: "g6_ss_ch1_2", num: "1.2", title: "Globe & Maps" }] },
          { id: "g6_ss_ch2", num: 2, title: "Oceans and Continents", desc: "Exploring Society Theme A", sections: [{ id: "g6_ss_ch2_1", num: "2.1", title: "Seven Continents" }, { id: "g6_ss_ch2_2", num: "2.2", title: "Five Oceans" }] },
          { id: "g6_ss_ch3", num: 3, title: "Landforms and Life", desc: "Exploring Society Theme A", sections: [{ id: "g6_ss_ch3_1", num: "3.1", title: "Mountains, Plateaus, Plains" }, { id: "g6_ss_ch3_2", num: "3.2", title: "Human Adaptations" }] },
          { id: "g6_ss_ch4", num: 4, title: "Timeline and Sources of History", desc: "Exploring Society Theme B", sections: [{ id: "g6_ss_ch4_1", num: "4.1", title: "Manuscripts & Inscriptions" }, { id: "g6_ss_ch4_2", num: "4.2", title: "Dating History" }] },
          { id: "g6_ss_ch5", num: 5, title: "India, That Is Bharat", desc: "Exploring Society Theme B", sections: [{ id: "g6_ss_ch5_1", num: "5.1", title: "Geographical Identity" }, { id: "g6_ss_ch5_2", num: "5.2", title: "Ancient Names" }] },
          { id: "g6_ss_ch6", num: 6, title: "The Beginnings of Indian Civilisation", desc: "Exploring Society Theme B", sections: [{ id: "g6_ss_ch6_1", num: "6.1", title: "Harappan Sites" }, { id: "g6_ss_ch6_2", num: "6.2", title: "Town Planning" }] },
          { id: "g6_ss_ch7", num: 7, title: "India's Cultural Roots", desc: "Exploring Society Theme C", sections: [{ id: "g6_ss_ch7_1", num: "7.1", title: "Vedic Heritage" }, { id: "g6_ss_ch7_2", num: "7.2", title: "Epics & Wisdom" }] },
          { id: "g6_ss_ch8", num: 8, title: "Unity in Diversity, or 'Many in the One'", desc: "Exploring Society Theme C", sections: [{ id: "g6_ss_ch8_1", num: "8.1", title: "Regional Cultures" }, { id: "g6_ss_ch8_2", num: "8.2", title: "Shared Values" }] },
          { id: "g6_ss_ch9", num: 9, title: "Family and Community", desc: "Exploring Society Theme D", sections: [{ id: "g6_ss_ch9_1", num: "9.1", title: "Social Institutions" }, { id: "g6_ss_ch9_2", num: "9.2", title: "Living Together" }] },
          { id: "g6_ss_ch10", num: 10, title: "Grassroots Democracy – Part 1: Governance", desc: "Exploring Society Theme D", sections: [{ id: "g6_ss_ch10_1", num: "10.1", title: "Concept of Democracy" }, { id: "g6_ss_ch10_2", num: "10.2", title: "People's Participation" }] },
          { id: "g6_ss_ch11", num: 11, title: "Grassroots Democracy – Part 2: Local Government in Rural Areas", desc: "Exploring Society Theme D", sections: [{ id: "g6_ss_ch11_1", num: "11.1", title: "Gram Sabha" }, { id: "g6_ss_ch11_2", num: "11.2", title: "Panchayati Raj" }] },
          { id: "g6_ss_ch12", num: 12, title: "Grassroots Democracy – Part 3: Local Government in Urban Areas", desc: "Exploring Society Theme D", sections: [{ id: "g6_ss_ch12_1", num: "12.1", title: "Municipalities" }, { id: "g6_ss_ch12_2", num: "12.2", title: "Civic Amenities" }] },
          { id: "g6_ss_ch13", num: 13, title: "The Value of Work", desc: "Exploring Society Theme E", sections: [{ id: "g6_ss_ch13_1", num: "13.1", title: "Dignity of Labour" }, { id: "g6_ss_ch13_2", num: "13.2", title: "Livelihoods" }] },
          { id: "g6_ss_ch14", num: 14, title: "Economic Activities Around Us", desc: "Exploring Society Theme E", sections: [{ id: "g6_ss_ch14_1", num: "14.1", title: "Production & Services" }, { id: "g6_ss_ch14_2", num: "14.2", title: "Local Economies" }] }
        ],
        "English": [
          { id: "g6_en_u1", num: 1, title: "Unit 1 – Fables and Folk Tales", desc: "Poorvi Unit 1", sections: [{ id: "g6_en_u1_1", num: "1.1", title: "A Bottle of Dew" }, { id: "g6_en_u1_2", num: "1.2", title: "The Raven and the Fox" }, { id: "g6_en_u1_3", num: "1.3", title: "Rama to the Rescue" }] },
          { id: "g6_en_u2", num: 2, title: "Unit 2 – Friendship", desc: "Poorvi Unit 2", sections: [{ id: "g6_en_u2_1", num: "2.1", title: "The Unlikely Best Friends" }, { id: "g6_en_u2_2", num: "2.2", title: "A Friend's Prayer" }, { id: "g6_en_u2_3", num: "2.3", title: "The Chair" }] },
          { id: "g6_en_u3", num: 3, title: "Unit 3 – Nurturing Nature", desc: "Poorvi Unit 3", sections: [{ id: "g6_en_u3_1", num: "3.1", title: "Neem Baba" }, { id: "g6_en_u3_2", num: "3.2", title: "What a Bird Thought" }, { id: "g6_en_u3_3", num: "3.3", title: "Spices that Heal Us" }] },
          { id: "g6_en_u4", num: 4, title: "Unit 4 – Sports and Wellness", desc: "Poorvi Unit 4", sections: [{ id: "g6_en_u4_1", num: "4.1", title: "Change of Heart" }, { id: "g6_en_u4_2", num: "4.2", title: "The Winner" }, { id: "g6_en_u4_3", num: "4.3", title: "Yoga – A Way of Life" }] },
          { id: "g6_en_u5", num: 5, title: "Unit 5 – Culture and Tradition", desc: "Poorvi Unit 5", sections: [{ id: "g6_en_u5_1", num: "5.1", title: "Hamara Bharat – Incredible India!" }, { id: "g6_en_u5_2", num: "5.2", title: "The Kites" }, { id: "g6_en_u5_3", num: "5.3", title: "Ila Sachani: Embroidering Dreams" }, { id: "g6_en_u5_4", num: "5.4", title: "National War Memorial" }] }
        ]
      }
    },
    "8": {
      subjects: ["Science", "Mathematics", "Social Science", "English"],
      chapters: {
        "Science": [
          { id: "g8_s_ch1", num: 1, title: "Crop Production and Management", desc: "Honeydew Science Ch 1", sections: [{ id: "g8_s_ch1_1", num: "1.1", title: "Agricultural Practices" }, { id: "g8_s_ch1_2", num: "1.2", title: "Basic Practices of Crop Production" }] },
          { id: "g8_s_ch2", num: 2, title: "Microorganisms: Friend and Foe", desc: "NCERT Science Ch 2", sections: [{ id: "g8_s_ch2_1", num: "2.1", title: "Microorganisms" }, { id: "g8_s_ch2_2", num: "2.2", title: "Where do Microorganisms Live?" }] },
          { id: "g8_s_ch3", num: 3, title: "Coal and Petroleum", desc: "NCERT Science Ch 3", sections: [{ id: "g8_s_ch3_1", num: "3.1", title: "Coal" }, { id: "g8_s_ch3_2", num: "3.2", title: "Petroleum" }] },
          { id: "g8_s_ch4", num: 4, title: "Combustion and Flame", desc: "NCERT Science Ch 4", sections: [{ id: "g8_s_ch4_1", num: "4.1", title: "What is Combustion?" }, { id: "g8_s_ch4_2", num: "4.2", title: "How Do We Control Fire?" }] },
          { id: "g8_s_ch5", num: 5, title: "Conservation of Plants and Animals", desc: "NCERT Science Ch 5", sections: [{ id: "g8_s_ch5_1", num: "5.1", title: "Deforestation and Its Causes" }, { id: "g8_s_ch5_2", num: "5.2", title: "Biosphere Reserve" }] },
          { id: "g8_s_ch6", num: 6, title: "Reproduction in Animals", desc: "NCERT Science Ch 6", sections: [{ id: "g8_s_ch6_1", num: "6.1", title: "Modes of Reproduction" }, { id: "g8_s_ch6_2", num: "6.2", title: "Sexual Reproduction" }] },
          { id: "g8_s_ch7", num: 7, title: "Reaching the Age of Adolescence", desc: "NCERT Science Ch 7", sections: [{ id: "g8_s_ch7_1", num: "7.1", title: "Adolescence and Puberty" }, { id: "g8_s_ch7_2", num: "7.2", title: "Changes at Puberty" }] },
          { id: "g8_s_ch8", num: 8, title: "Force and Pressure", desc: "NCERT Science Ch 8", sections: [{ id: "g8_s_ch8_1", num: "8.1", title: "Force: A Push or a Pull" }, { id: "g8_s_ch8_2", num: "8.2", title: "Forces are due to an Interaction" }] },
          { id: "g8_s_ch9", num: 9, title: "Friction", desc: "NCERT Science Ch 9", sections: [{ id: "g8_s_ch9_1", num: "9.1", title: "Force of Friction" }, { id: "g8_s_ch9_2", num: "9.2", title: "Factors affecting Friction" }] },
          { id: "g8_s_ch10", num: 10, title: "Sound", desc: "NCERT Science Ch 10", sections: [{ id: "g8_s_ch10_1", num: "10.1", title: "Sound is Produced by a Vibrating Body" }, { id: "g8_s_ch10_2", num: "10.2", title: "Sound Produced by Humans" }] },
          { id: "g8_s_ch11", num: 11, title: "Chemical Effects of Electric Current", desc: "NCERT Science Ch 11", sections: [{ id: "g8_s_ch11_1", num: "11.1", title: "Do Liquids Conduct Electricity?" }, { id: "g8_s_ch11_2", num: "11.2", title: "Electroplating" }] },
          { id: "g8_s_ch12", num: 12, title: "Some Natural Phenomena", desc: "NCERT Science Ch 12", sections: [{ id: "g8_s_ch12_1", num: "12.1", title: "Lightning" }, { id: "g8_s_ch12_2", num: "12.2", title: "Earthquakes" }] },
          { id: "g8_s_ch13", num: 13, title: "Light", desc: "NCERT Science Ch 13", sections: [{ id: "g8_s_ch13_1", num: "13.1", title: "What Makes Things Visible" }, { id: "g8_s_ch13_2", num: "13.2", title: "Laws of Reflection" }] }
        ],
        "Mathematics": [
          { id: "g8_m_ch1", num: 1, title: "Rational Numbers", desc: "NCERT Math Ch 1", sections: [{ id: "g8_m_ch1_1", num: "1.1", title: "Properties of Rational Numbers" }, { id: "g8_m_ch1_2", num: "1.2", title: "Representation on Number Line" }] },
          { id: "g8_m_ch2", num: 2, title: "Linear Equations in One Variable", desc: "NCERT Math Ch 2", sections: [{ id: "g8_m_ch2_1", num: "2.1", title: "Solving Equations" }, { id: "g8_m_ch2_2", num: "2.2", title: "Applications" }] },
          { id: "g8_m_ch3", num: 3, title: "Understanding Quadrilaterals", desc: "NCERT Math Ch 3", sections: [{ id: "g8_m_ch3_1", num: "3.1", title: "Polygons" }, { id: "g8_m_ch3_2", num: "3.2", title: "Sum of Angles" }] },
          { id: "g8_m_ch4", num: 4, title: "Data Handling", desc: "NCERT Math Ch 4", sections: [{ id: "g8_m_ch4_1", num: "4.1", title: "Organising Data" }, { id: "g8_m_ch4_2", num: "4.2", title: "Pie Charts" }] },
          { id: "g8_m_ch5", num: 5, title: "Square and Square Roots", desc: "NCERT Math Ch 5", sections: [{ id: "g8_m_ch5_1", num: "5.1", title: "Properties of Square Numbers" }, { id: "g8_m_ch5_2", num: "5.2", title: "Finding Square Roots" }] },
          { id: "g8_m_ch6", num: 6, title: "Cube and Cube Roots", desc: "NCERT Math Ch 6", sections: [{ id: "g8_m_ch6_1", num: "6.1", title: "Cubes" }, { id: "g8_m_ch6_2", num: "6.2", title: "Cube Roots" }] },
          { id: "g8_m_ch7", num: 7, title: "Comparing Quantities", desc: "NCERT Math Ch 7", sections: [{ id: "g8_m_ch7_1", num: "7.1", title: "Ratios & Percentages" }, { id: "g8_m_ch7_2", num: "7.2", title: "Compound Interest" }] },
          { id: "g8_m_ch8", num: 8, title: "Algebraic Expressions and Identities", desc: "NCERT Math Ch 8", sections: [{ id: "g8_m_ch8_1", num: "8.1", title: "Monomials, Binomials, Polynomials" }, { id: "g8_m_ch8_2", num: "8.2", title: "Standard Identities" }] },
          { id: "g8_m_ch9", num: 9, title: "Mensuration", desc: "NCERT Math Ch 9", sections: [{ id: "g8_m_ch9_1", num: "9.1", title: "Area of Trapezium & Polygons" }, { id: "g8_m_ch9_2", num: "9.2", title: "Surface Area & Volume" }] },
          { id: "g8_m_ch10", num: 10, title: "Exponents and Powers", desc: "NCERT Math Ch 10", sections: [{ id: "g8_m_ch10_1", num: "10.1", title: "Powers with Negative Exponents" }, { id: "g8_m_ch10_2", num: "10.2", title: "Laws of Exponents" }] },
          { id: "g8_m_ch11", num: 11, title: "Direct and Inverse Proportions", desc: "NCERT Math Ch 11", sections: [{ id: "g8_m_ch11_1", num: "11.1", title: "Direct Proportion" }, { id: "g8_m_ch11_2", num: "11.2", title: "Inverse Proportion" }] },
          { id: "g8_m_ch12", num: 12, title: "Factorisation", desc: "NCERT Math Ch 12", sections: [{ id: "g8_m_ch12_1", num: "12.1", title: "Factors of Natural Numbers & Algebraic Expressions" }, { id: "g8_m_ch12_2", num: "12.2", title: "Division of Algebraic Expressions" }] },
          { id: "g8_m_ch13", num: 13, title: "Introduction to Graphs", desc: "NCERT Math Ch 13", sections: [{ id: "g8_m_ch13_1", num: "13.1", title: "A Line Graph" }, { id: "g8_m_ch13_2", num: "13.2", title: "Linear Graphs & Coordinates" }] }
        ],
        "Social Science": [
          { id: "g8_ss_ch1", num: 1, title: "Resources", desc: "NCERT Geography Ch 1", sections: [{ id: "g8_ss_ch1_1", num: "1.1", title: "Types of Resources" }, { id: "g8_ss_ch1_2", num: "1.2", title: "Conserving Resources" }] },
          { id: "g8_ss_ch2", num: 2, title: "Land, Soil, Water, Natural Vegetation", desc: "NCERT Geography Ch 2", sections: [{ id: "g8_ss_ch2_1", num: "2.1", title: "Land & Soil Resources" }, { id: "g8_ss_ch2_2", num: "2.2", title: "Water & Vegetation" }] },
          { id: "g8_ss_ch3", num: 3, title: "Agriculture", desc: "NCERT Geography Ch 3", sections: [{ id: "g8_ss_ch3_1", num: "3.1", title: "Farm Systems" }, { id: "g8_ss_ch3_2", num: "3.2", title: "Major Crops" }] },
          { id: "g8_ss_ch4", num: 4, title: "Industries", desc: "NCERT Geography Ch 4", sections: [{ id: "g8_ss_ch4_1", num: "4.1", title: "Classification of Industries" }, { id: "g8_ss_ch4_2", num: "4.2", title: "Industrial Regions" }] },
          { id: "g8_ss_ch5", num: 5, title: "Human Resources", desc: "NCERT Geography Ch 5", sections: [{ id: "g8_ss_ch5_1", num: "5.1", title: "Distribution of Population" }, { id: "g8_ss_ch5_2", num: "5.2", title: "Population Change" }] },
          { id: "g8_ss_ch6", num: 6, title: "How, When and Where", desc: "NCERT History Ch 1", sections: [{ id: "g8_ss_ch6_1", num: "6.1", title: "How Important are Dates?" }, { id: "g8_ss_ch6_2", num: "6.2", title: "How do we Periodise?" }] },
          { id: "g8_ss_ch7", num: 7, title: "From Trade to Territory", desc: "NCERT History Ch 2", sections: [{ id: "g8_ss_ch7_1", num: "7.1", title: "East India Company Comes East" }, { id: "g8_ss_ch7_2", num: "7.2", title: "Company Rule Expands" }] },
          { id: "g8_ss_ch8", num: 8, title: "Ruling the Countryside", desc: "NCERT History Ch 3", sections: [{ id: "g8_ss_ch8_1", num: "8.1", title: "The Company Becomes the Diwan" }, { id: "g8_ss_ch8_2", num: "8.2", title: "Crops for Europe" }] },
          { id: "g8_ss_ch9", num: 9, title: "Tribals, Dikus and Vision of Golden Age", desc: "NCERT History Ch 4", sections: [{ id: "g8_ss_ch9_1", num: "9.1", title: "How Tribal Groups Lived" }, { id: "g8_ss_ch9_2", num: "9.2", title: "Birsa Munda" }] },
          { id: "g8_ss_ch10", num: 10, title: "The Indian Constitution & Secularism", desc: "NCERT Civics Ch 1", sections: [{ id: "g8_ss_ch10_1", num: "10.1", title: "Why Does a Country Need a Constitution?" }, { id: "g8_ss_ch10_2", num: "10.2", title: "Understanding Secularism" }] }
        ],
        "English": [
          { id: "g8_en_ch1", num: 1, title: "The Best Christmas Present in the World", desc: "Honeydew Ch 1", sections: [{ id: "g8_en_ch1_1", num: "1.1", title: "The Letter from the Trench" }, { id: "g8_en_ch1_2", num: "1.2", title: "The Ant and the Cricket (Poem)" }] },
          { id: "g8_en_ch2", num: 2, title: "The Tsunami", desc: "Honeydew Ch 2", sections: [{ id: "g8_en_ch2_1", num: "2.1", title: "Stories of Survival" }, { id: "g8_en_ch2_2", num: "2.2", title: "Geography Lesson (Poem)" }] },
          { id: "g8_en_ch3", num: 3, title: "Glimpses of the Past", desc: "Honeydew Ch 3", sections: [{ id: "g8_en_ch3_1", num: "3.1", title: "Pictorial History 1757-1857" }, { id: "g8_en_ch3_2", num: "3.2", title: "Macavity: The Mystery Cat (Poem)" }] },
          { id: "g8_en_ch4", num: 4, title: "Bepin Choudhury's Lapse of Memory", desc: "Honeydew Ch 4", sections: [{ id: "g8_en_ch4_1", num: "4.1", title: "The Ranchi Visit Puzzle" }, { id: "g8_en_ch4_2", num: "4.2", title: "The Last Bargain (Poem)" }] },
          { id: "g8_en_ch5", num: 5, title: "The Summit Within", desc: "Honeydew Ch 5", sections: [{ id: "g8_en_ch5_1", num: "5.1", title: "Major H.P.S. Ahluwalia's Everest Expedition" }, { id: "g8_en_ch5_2", num: "5.2", title: "The School Boy (Poem)" }] },
          { id: "g8_en_ch6", num: 6, title: "This is Jody's Fawn", desc: "Honeydew Ch 6", sections: [{ id: "g8_en_ch6_1", num: "6.1", title: "Saving the Fawn" }, { id: "g8_en_ch6_2", num: "6.2", title: "A Short Monsoon Diary" }] }
        ]
      }
    },
    "9": {
      subjects: ["Science", "Mathematics", "Social Science", "English"],
      chapters: {
        "Science": [
          { id: "g9_s_ch1", num: 1, title: "Matter in Our Surroundings", desc: "NCERT Science Ch 1", sections: [{ id: "g9_s_ch1_1", num: "1.1", title: "Physical Nature of Matter" }, { id: "g9_s_ch1_2", num: "1.2", title: "States of Matter" }] },
          { id: "g9_s_ch2", num: 2, title: "Is Matter Around Us Pure", desc: "NCERT Science Ch 2", sections: [{ id: "g9_s_ch2_1", num: "2.1", title: "What is a Mixture?" }, { id: "g9_s_ch2_2", num: "2.2", title: "Types of Solutions" }] },
          { id: "g9_s_ch3", num: 3, title: "Atoms and Molecules", desc: "NCERT Science Ch 3", sections: [{ id: "g9_s_ch3_1", num: "3.1", title: "Laws of Chemical Combination" }, { id: "g9_s_ch3_2", num: "3.2", title: "What is an Atom?" }] },
          { id: "g9_s_ch4", num: 4, title: "Structure of the Atom", desc: "NCERT Science Ch 4", sections: [{ id: "g9_s_ch4_1", num: "4.1", title: "Charged Particles in Matter" }, { id: "g9_s_ch4_2", num: "4.2", title: "Structure of Atom Models" }] },
          { id: "g9_s_ch5", num: 5, title: "The Fundamental Unit of Life", desc: "NCERT Science Ch 5", sections: [{ id: "g9_s_ch5_1", num: "5.1", title: "What are Living Organisms Made of?" }, { id: "g9_s_ch5_2", num: "5.2", title: "Cell Structure & Organelles" }] },
          { id: "g9_s_ch6", num: 6, title: "Tissues", desc: "NCERT Science Ch 6", sections: [{ id: "g9_s_ch6_1", num: "6.1", title: "Plant Tissues" }, { id: "g9_s_ch6_2", num: "6.2", title: "Animal Tissues" }] },
          { id: "g9_s_ch7", num: 7, title: "Motion", desc: "NCERT Science Ch 7", sections: [{ id: "g9_s_ch7_1", num: "7.1", title: "Describing Motion" }, { id: "g9_s_ch7_2", num: "7.2", title: "Equations of Motion" }] },
          { id: "g9_s_ch8", num: 8, title: "Force and Laws of Motion", desc: "NCERT Science Ch 8", sections: [{ id: "g9_s_ch8_1", num: "8.1", title: "Balanced and Unbalanced Forces" }, { id: "g9_s_ch8_2", num: "8.2", title: "Newton's Three Laws" }] },
          { id: "g9_s_ch9", num: 9, title: "Gravitation", desc: "NCERT Science Ch 9", sections: [{ id: "g9_s_ch9_1", num: "9.1", title: "Universal Law of Gravitation" }, { id: "g9_s_ch9_2", num: "9.2", title: "Mass and Weight" }] },
          { id: "g9_s_ch10", num: 10, title: "Work and Energy", desc: "NCERT Science Ch 10", sections: [{ id: "g9_s_ch10_1", num: "10.1", title: "Work Done by a Force" }, { id: "g9_s_ch10_2", num: "10.2", title: "Forms of Energy & Power" }] },
          { id: "g9_s_ch11", num: 11, title: "Sound", desc: "NCERT Science Ch 11", sections: [{ id: "g9_s_ch11_1", num: "11.1", title: "Production & Propagation of Sound" }, { id: "g9_s_ch11_2", num: "11.2", title: "Structure of Human Ear" }] },
          { id: "g9_s_ch12", num: 12, title: "Improvement in Food Resources", desc: "NCERT Science Ch 12", sections: [{ id: "g9_s_ch12_1", num: "12.1", title: "Crop Yield Improvement" }, { id: "g9_s_ch12_2", num: "12.2", title: "Animal Husbandry" }] }
        ],
        "Mathematics": [
          { id: "g9_m_ch1", num: 1, title: "Number Systems", desc: "NCERT Math Ch 1", sections: [{ id: "g9_m_ch1_1", num: "1.1", title: "Irrational Numbers" }, { id: "g9_m_ch1_2", num: "1.2", title: "Real Numbers & Exponents" }] },
          { id: "g9_m_ch2", num: 2, title: "Polynomials", desc: "NCERT Math Ch 2", sections: [{ id: "g9_m_ch2_1", num: "2.1", title: "Polynomials in One Variable" }, { id: "g9_m_ch2_2", num: "2.2", title: "Factor Theorem & Algebraic Identities" }] },
          { id: "g9_m_ch3", num: 3, title: "Coordinate Geometry", desc: "NCERT Math Ch 3", sections: [{ id: "g9_m_ch3_1", num: "3.1", title: "Cartesian Plane" }, { id: "g9_m_ch3_2", num: "3.2", title: "Plotting Points" }] },
          { id: "g9_m_ch4", num: 4, title: "Linear Equations in Two Variables", desc: "NCERT Math Ch 4", sections: [{ id: "g9_m_ch4_1", num: "4.1", title: "Linear Equations" }, { id: "g9_m_ch4_2", num: "4.2", title: "Graph of Linear Equations" }] },
          { id: "g9_m_ch5", num: 5, title: "Introduction to Euclid's Geometry", desc: "NCERT Math Ch 5", sections: [{ id: "g9_m_ch5_1", num: "5.1", title: "Euclid's Definitions & Axioms" }, { id: "g9_m_ch5_2", num: "5.2", title: "Postulates" }] },
          { id: "g9_m_ch6", num: 6, title: "Lines and Angles", desc: "NCERT Math Ch 6", sections: [{ id: "g9_m_ch6_1", num: "6.1", title: "Intersecting & Parallel Lines" }, { id: "g9_m_ch6_2", num: "6.2", title: "Angle Sum Property of a Triangle" }] },
          { id: "g9_m_ch7", num: 7, title: "Triangles", desc: "NCERT Math Ch 7", sections: [{ id: "g9_m_ch7_1", num: "7.1", title: "Congruence of Triangles" }, { id: "g9_m_ch7_2", num: "7.2", title: "Inequalities in a Triangle" }] },
          { id: "g9_m_ch8", num: 8, title: "Quadrilaterals", desc: "NCERT Math Ch 8", sections: [{ id: "g9_m_ch8_1", num: "8.1", title: "Properties of Parallelograms" }, { id: "g9_m_ch8_2", num: "8.2", title: "Mid-point Theorem" }] },
          { id: "g9_m_ch9", num: 9, title: "Circles", desc: "NCERT Math Ch 9", sections: [{ id: "g9_m_ch9_1", num: "9.1", title: "Chords & Angles Subtended" }, { id: "g9_m_ch9_2", num: "9.2", title: "Cyclic Quadrilaterals" }] },
          { id: "g9_m_ch10", num: 10, title: "Heron's Formula", desc: "NCERT Math Ch 10", sections: [{ id: "g9_m_ch10_1", num: "10.1", title: "Area of Triangle by Heron's Formula" }, { id: "g9_m_ch10_2", num: "10.2", title: "Applications" }] },
          { id: "g9_m_ch11", num: 11, title: "Surface Areas and Volumes", desc: "NCERT Math Ch 11", sections: [{ id: "g9_m_ch11_1", num: "11.1", title: "Cone, Sphere & Hemisphere Surface Areas" }, { id: "g9_m_ch11_2", num: "11.2", title: "Volumes of Sphere & Cone" }] },
          { id: "g9_m_ch12", num: 12, title: "Statistics", desc: "NCERT Math Ch 12", sections: [{ id: "g9_m_ch12_1", num: "12.1", title: "Graphical Representation of Data" }, { id: "g9_m_ch12_2", num: "12.2", title: "Histograms & Frequency Polygons" }] }
        ],
        "Social Science": [
          { id: "g9_ss_ch1", num: 1, title: "The French Revolution", desc: "NCERT History Ch 1", sections: [{ id: "g9_ss_ch1_1", num: "1.1", title: "French Society During Late 18th C" }, { id: "g9_ss_ch1_2", num: "1.2", title: "Abolition of Monarchy" }] },
          { id: "g9_ss_ch2", num: 2, title: "Socialism in Europe and Russian Revolution", desc: "NCERT History Ch 2", sections: [{ id: "g9_ss_ch2_1", num: "2.1", title: "Age of Social Change" }, { id: "g9_ss_ch2_2", num: "2.2", title: "The Russian Revolution 1917" }] },
          { id: "g9_ss_ch3", num: 3, title: "Nazism and the Rise of Hitler", desc: "NCERT History Ch 3", sections: [{ id: "g9_ss_ch3_1", num: "3.1", title: "Weimar Republic" }, { id: "g9_ss_ch3_2", num: "3.2", title: "Hitler's Rise to Power" }] },
          { id: "g9_ss_ch4", num: 4, title: "India - Size and Location", desc: "NCERT Geography Ch 1", sections: [{ id: "g9_ss_ch4_1", num: "4.1", title: "Location & Size" }, { id: "g9_ss_ch4_2", num: "4.2", title: "India and the World" }] },
          { id: "g9_ss_ch5", num: 5, title: "Physical Features of India", desc: "NCERT Geography Ch 2", sections: [{ id: "g9_ss_ch5_1", num: "5.1", title: "Major Physiographic Divisions" }, { id: "g9_ss_ch5_2", num: "5.2", title: "Himalayas, Plains, Peninsular Plateau" }] },
          { id: "g9_ss_ch6", num: 6, title: "Drainage", desc: "NCERT Geography Ch 3", sections: [{ id: "g9_ss_ch6_1", num: "6.1", title: "Himalayan & Peninsular River Systems" }, { id: "g9_ss_ch6_2", num: "6.2", title: "Lakes & Role of Rivers" }] },
          { id: "g9_ss_ch7", num: 7, title: "Climate", desc: "NCERT Geography Ch 4", sections: [{ id: "g9_ss_ch7_1", num: "7.1", title: "Climate Controls & Monsoons" }, { id: "g9_ss_ch7_2", num: "7.2", title: "Seasons of India" }] },
          { id: "g9_ss_ch8", num: 8, title: "What is Democracy? Why Democracy?", desc: "NCERT Civics Ch 1", sections: [{ id: "g9_ss_ch8_1", num: "8.1", title: "Features of Democracy" }, { id: "g9_ss_ch8_2", num: "8.2", title: "Arguments for Democracy" }] },
          { id: "g9_ss_ch9", num: 9, title: "Constitutional Design", desc: "NCERT Civics Ch 2", sections: [{ id: "g9_ss_ch9_1", num: "9.1", title: "Democratic Constitution in South Africa" }, { id: "g9_ss_ch9_2", num: "9.2", title: "Making of Indian Constitution" }] },
          { id: "g9_ss_ch10", num: 10, title: "The Story of Village Palampur", desc: "NCERT Economics Ch 1", sections: [{ id: "g9_ss_ch10_1", num: "10.1", title: "Organization of Production" }, { id: "g9_ss_ch10_2", num: "10.2", title: "Farming in Palampur" }] }
        ],
        "English": [
          { id: "g9_en_ch1", num: 1, title: "The Fun They Had", desc: "Beehive Ch 1", sections: [{ id: "g9_en_ch1_1", num: "1.1", title: "Margie and Tommy's Computerized School" }, { id: "g9_en_ch1_2", num: "1.2", title: "The Road Not Taken (Poem)" }] },
          { id: "g9_en_ch2", num: 2, title: "The Sound of Music", desc: "Beehive Ch 2", sections: [{ id: "g9_en_ch2_1", num: "2.1", title: "Evelyn Glennie Listens to Sound Without Hearing It" }, { id: "g9_en_ch2_2", num: "2.2", title: "Bismillah Khan (Shehnai)" }] },
          { id: "g9_en_ch3", num: 3, title: "The Little Girl", desc: "Beehive Ch 3", sections: [{ id: "g9_en_ch3_1", num: "3.1", title: "Kezia and Her Father" }, { id: "g9_en_ch3_2", num: "3.2", title: "Rain on the Roof (Poem)" }] },
          { id: "g9_en_ch4", num: 4, title: "A Truly Beautiful Mind", desc: "Beehive Ch 4", sections: [{ id: "g9_en_ch4_1", num: "4.1", title: "Life of Albert Einstein" }, { id: "g9_en_ch4_2", num: "4.2", title: "The Lake Isle of Innisfree (Poem)" }] },
          { id: "g9_en_ch5", num: 5, title: "The Snake and the Mirror", desc: "Beehive Ch 5", sections: [{ id: "g9_en_ch5_1", num: "5.1", title: "Homeopathic Doctor's Story" }, { id: "g9_en_ch5_2", num: "5.2", title: "A Legend of the Northland (Poem)" }] },
          { id: "g9_en_ch6", num: 6, title: "My Childhood", desc: "Beehive Ch 6", sections: [{ id: "g9_en_ch6_1", num: "6.1", title: "APJ Abdul Kalam's Early Life" }, { id: "g9_en_ch6_2", num: "6.2", title: "No Men Are Foreign (Poem)" }] }
        ]
      }
    },
    "10": {
      subjects: ["Science", "Mathematics", "Social Science", "English"],
      chapters: {
        "Science": [
          { id: "g10_s_ch1", num: 1, title: "Chemical Reactions and Equations", desc: "NCERT Science Ch 1", sections: [{ id: "g10_s_ch1_1", num: "1.1", title: "Chemical Equations" }, { id: "g10_s_ch1_2", num: "1.2", title: "Types of Chemical Reactions" }] },
          { id: "g10_s_ch2", num: 2, title: "Acids, Bases and Salts", desc: "NCERT Science Ch 2", sections: [{ id: "g10_s_ch2_1", num: "2.1", title: "Chemical Properties of Acids & Bases" }, { id: "g10_s_ch2_2", num: "2.2", title: "pH Scale & Salts" }] },
          { id: "g10_s_ch3", num: 3, title: "Metals and Non-metals", desc: "NCERT Science Ch 3", sections: [{ id: "g10_s_ch3_1", num: "3.1", title: "Physical & Chemical Properties" }, { id: "g10_s_ch3_2", num: "3.2", title: "Occurrence & Extraction of Metals" }] },
          { id: "g10_s_ch4", num: 4, title: "Carbon and Its Compounds", desc: "NCERT Science Ch 4", sections: [{ id: "g10_s_ch4_1", num: "4.1", title: "Covalent Bonding in Carbon" }, { id: "g10_s_ch4_2", num: "4.2", title: "Versatile Nature & Functional Groups" }] },
          { id: "g10_s_ch5", num: 5, title: "Life Processes", desc: "NCERT Science Ch 5", sections: [{ id: "g10_s_ch5_1", num: "5.1", title: "Nutrition & Respiration" }, { id: "g10_s_ch5_2", num: "5.2", title: "Transportation & Excretion" }] },
          { id: "g10_s_ch6", num: 6, title: "Control and Coordination", desc: "NCERT Science Ch 6", sections: [{ id: "g10_s_ch6_1", num: "6.1", title: "Nervous System & Reflex Arc" }, { id: "g10_s_ch6_2", num: "6.2", title: "Hormones in Animals & Plants" }] },
          { id: "g10_s_ch7", num: 7, title: "How do Organisms Reproduce?", desc: "NCERT Science Ch 7", sections: [{ id: "g10_s_ch7_1", num: "7.1", title: "Asexual Reproduction" }, { id: "g10_s_ch7_2", num: "7.2", title: "Sexual Reproduction in Plants & Humans" }] },
          { id: "g10_s_ch8", num: 8, title: "Heredity and Evolution", desc: "NCERT Science Ch 8", sections: [{ id: "g10_s_ch8_1", num: "8.1", title: "Accumulation of Variation" }, { id: "g10_s_ch8_2", num: "8.2", title: "Mendel's Laws of Inheritance" }] },
          { id: "g10_s_ch9", num: 9, title: "Light - Reflection and Refraction", desc: "NCERT Science Ch 9", sections: [{ id: "g10_s_ch9_1", num: "9.1", title: "Reflection of Light & Spherical Mirrors" }, { id: "g10_s_ch9_2", num: "9.2", title: "Refraction & Lenses Formula" }] },
          { id: "g10_s_ch10", num: 10, title: "The Human Eye and Colourful World", desc: "NCERT Science Ch 10", sections: [{ id: "g10_s_ch10_1", num: "10.1", title: "Structure of Human Eye & Defects" }, { id: "g10_s_ch10_2", num: "10.2", title: "Prism Dispersion & Atmospheric Refraction" }] },
          { id: "g10_s_ch11", num: 11, title: "Electricity", desc: "NCERT Science Ch 11", sections: [{ id: "g10_s_ch11_1", num: "11.1", title: "Ohm's Law & Resistance" }, { id: "g10_s_ch11_2", num: "11.2", title: "Series & Parallel Combination of Resistors" }] },
          { id: "g10_s_ch12", num: 12, title: "Magnetic Effects of Electric Current", desc: "NCERT Science Ch 12", sections: [{ id: "g10_s_ch12_1", num: "12.1", title: "Magnetic Field & Field Lines" }, { id: "g10_s_ch12_2", num: "12.2", title: "Solenoid, Electromagnet & Domestic Circuits" }] },
          { id: "g10_s_ch13", num: 13, title: "Our Environment", desc: "NCERT Science Ch 13", sections: [{ id: "g10_s_ch13_1", num: "13.1", title: "Ecosystem & Food Chains" }, { id: "g10_s_ch13_2", num: "13.2", title: "Ozone Layer Depletion & Waste Management" }] }
        ],
        "Mathematics": [
          { id: "g10_m_ch1", num: 1, title: "Real Numbers", desc: "NCERT Math Ch 1", sections: [{ id: "g10_m_ch1_1", num: "1.1", title: "Fundamental Theorem of Arithmetic" }, { id: "g10_m_ch1_2", num: "1.2", title: "Revisiting Irrational Numbers" }] },
          { id: "g10_m_ch2", num: 2, title: "Polynomials", desc: "NCERT Math Ch 2", sections: [{ id: "g10_m_ch2_1", num: "2.1", title: "Geometrical Meaning of Zeroes" }, { id: "g10_m_ch2_2", num: "2.2", title: "Relationship between Zeroes & Coefficients" }] },
          { id: "g10_m_ch3", num: 3, title: "Pair of Linear Equations in Two Variables", desc: "NCERT Math Ch 3", sections: [{ id: "g10_m_ch3_1", num: "3.1", title: "Graphical Method of Solution" }, { id: "g10_m_ch3_2", num: "3.2", title: "Algebraic Methods: Substitution & Elimination" }] },
          { id: "g10_m_ch4", num: 4, title: "Quadratic Equations", desc: "NCERT Math Ch 4", sections: [{ id: "g10_m_ch4_1", num: "4.1", title: "Solution by Factorisation" }, { id: "g10_m_ch4_2", num: "4.2", title: "Quadratic Formula & Nature of Roots" }] },
          { id: "g10_m_ch5", num: 5, title: "Arithmetic Progressions", desc: "NCERT Math Ch 5", sections: [{ id: "g10_m_ch5_1", num: "5.1", title: "nth Term of an AP" }, { id: "g10_m_ch5_2", num: "5.2", title: "Sum of First n Terms of an AP" }] },
          { id: "g10_m_ch6", num: 6, title: "Triangles", desc: "NCERT Math Ch 6", sections: [{ id: "g10_m_ch6_1", num: "6.1", title: "Similar Figures & Basic Proportionality Theorem" }, { id: "g10_m_ch6_2", num: "6.2", title: "Criteria for Similarity of Triangles" }] },
          { id: "g10_m_ch7", num: 7, title: "Coordinate Geometry", desc: "NCERT Math Ch 7", sections: [{ id: "g10_m_ch7_1", num: "7.1", title: "Distance Formula" }, { id: "g10_m_ch7_2", num: "7.2", title: "Section Formula" }] },
          { id: "g10_m_ch8", num: 8, title: "Introduction to Trigonometry", desc: "NCERT Math Ch 8", sections: [{ id: "g10_m_ch8_1", num: "8.1", title: "Trigonometric Ratios" }, { id: "g10_m_ch8_2", num: "8.2", title: "Values at 0, 30, 45, 60, 90 & Identities" }] },
          { id: "g10_m_ch9", num: 9, title: "Some Applications of Trigonometry", desc: "NCERT Math Ch 9", sections: [{ id: "g10_m_ch9_1", num: "9.1", title: "Heights and Distances" }, { id: "g10_m_ch9_2", num: "9.2", title: "Angle of Elevation & Depression" }] },
          { id: "g10_m_ch10", num: 10, title: "Circles", desc: "NCERT Math Ch 10", sections: [{ id: "g10_m_ch10_1", num: "10.1", title: "Tangent to a Circle" }, { id: "g10_m_ch10_2", num: "10.2", title: "Number of Tangents from a Point" }] },
          { id: "g10_m_ch11", num: 11, title: "Areas Related to Circles", desc: "NCERT Math Ch 11", sections: [{ id: "g10_m_ch11_1", num: "11.1", title: "Area of Sector and Segment of a Circle" }, { id: "g10_m_ch11_2", num: "11.2", title: "Combination of Plane Figures" }] },
          { id: "g10_m_ch12", num: 12, title: "Surface Areas and Volumes", desc: "NCERT Math Ch 12", sections: [{ id: "g10_m_ch12_1", num: "12.1", title: "Surface Area of Combination of Solids" }, { id: "g10_m_ch12_2", num: "12.2", title: "Volume of Combination of Solids" }] },
          { id: "g10_m_ch13", num: 13, title: "Statistics", desc: "NCERT Math Ch 13", sections: [{ id: "g10_m_ch13_1", num: "13.1", title: "Mean of Grouped Data" }, { id: "g10_m_ch13_2", num: "13.2", title: "Mode & Median of Grouped Data" }] },
          { id: "g10_m_ch14", num: 14, title: "Probability", desc: "NCERT Math Ch 14", sections: [{ id: "g10_m_ch14_1", num: "14.1", title: "Theoretical Approach to Probability" }, { id: "g10_m_ch14_2", num: "14.2", title: "Events & Sample Spaces" }] }
        ],
        "Social Science": [
          { id: "g10_ss_ch1", num: 1, title: "The Rise of Nationalism in Europe", desc: "NCERT History Ch 1", sections: [{ id: "g10_ss_ch1_1", num: "1.1", title: "The French Revolution and Idea of Nation" }, { id: "g10_ss_ch1_2", num: "1.2", title: "Making of Nationalism in Europe" }] },
          { id: "g10_ss_ch2", num: 2, title: "Nationalism in India", desc: "NCERT History Ch 2", sections: [{ id: "g10_ss_ch2_1", num: "2.1", title: "The First World War & Non-Cooperation" }, { id: "g10_ss_ch2_2", num: "2.2", title: "Towards Civil Disobedience" }] },
          { id: "g10_ss_ch3", num: 3, title: "The Making of a Global World", desc: "NCERT History Ch 3", sections: [{ id: "g10_ss_ch3_1", num: "3.1", title: "Pre-modern World & Silk Routes" }, { id: "g10_ss_ch3_2", num: "3.2", title: "Nineteenth Century 1815-1914" }] },
          { id: "g10_ss_ch4", num: 4, title: "Resources and Development", desc: "NCERT Geography Ch 1", sections: [{ id: "g10_ss_ch4_1", num: "4.1", title: "Types & Development of Resources" }, { id: "g10_ss_ch4_2", num: "4.2", title: "Land Resources & Soil Erosion" }] },
          { id: "g10_ss_ch5", num: 5, title: "Forest and Wildlife Resources", desc: "NCERT Geography Ch 2", sections: [{ id: "g10_ss_ch5_1", num: "5.1", title: "Flora and Fauna in India" }, { id: "g10_ss_ch5_2", num: "5.2", title: "Conservation of Forests" }] },
          { id: "g10_ss_ch6", num: 6, title: "Water Resources", desc: "NCERT Geography Ch 3", sections: [{ id: "g10_ss_ch6_1", num: "6.1", title: "Water Scarcity & Management" }, { id: "g10_ss_ch6_2", num: "6.2", title: "Multi-Purpose River Projects" }] },
          { id: "g10_ss_ch7", num: 7, title: "Agriculture", desc: "NCERT Geography Ch 4", sections: [{ id: "g10_ss_ch7_1", num: "7.1", title: "Types of Farming" }, { id: "g10_ss_ch7_2", num: "7.2", title: "Cropping Pattern & Major Crops" }] },
          { id: "g10_ss_ch8", num: 8, title: "Power Sharing", desc: "NCERT Civics Ch 1", sections: [{ id: "g10_ss_ch8_1", num: "8.1", title: "Stories of Belgium & Sri Lanka" }, { id: "g10_ss_ch8_2", num: "8.2", title: "Forms of Power Sharing" }] },
          { id: "g10_ss_ch9", num: 9, title: "Federalism", desc: "NCERT Civics Ch 2", sections: [{ id: "g10_ss_ch9_1", num: "9.1", title: "What is Federalism?" }, { id: "g10_ss_ch9_2", num: "9.2", title: "Decentralisation in India" }] },
          { id: "g10_ss_ch10", num: 10, title: "Development", desc: "NCERT Economics Ch 1", sections: [{ id: "g10_ss_ch10_1", num: "10.1", title: "What Development Promises" }, { id: "g10_ss_ch10_2", num: "10.2", title: "National Income & Sustainable Development" }] }
        ],
        "English": [
          { id: "g10_en_ch1", num: 1, title: "A Letter to God", desc: "First Flight Ch 1", sections: [{ id: "g10_en_ch1_1", num: "1.1", title: "Lencho's Faith in God" }, { id: "g10_en_ch1_2", num: "1.2", title: "Dust of Snow (Poem)" }] },
          { id: "g10_en_ch2", num: 2, title: "Nelson Mandela: Long Walk to Freedom", desc: "First Flight Ch 2", sections: [{ id: "g10_en_ch2_1", num: "2.1", title: "Inauguration Day Speech" }, { id: "g10_en_ch2_2", num: "2.2", title: "A Tiger in the Zoo (Poem)" }] },
          { id: "g10_en_ch3", num: 3, title: "Two Stories about Flying", desc: "First Flight Ch 3", sections: [{ id: "g10_en_ch3_1", num: "3.1", title: "His First Flight (Seagull)" }, { id: "g10_en_ch3_2", num: "3.2", title: "Black Aeroplane" }] },
          { id: "g10_en_ch4", num: 4, title: "From the Diary of Anne Frank", desc: "First Flight Ch 4", sections: [{ id: "g10_en_ch4_1", num: "4.1", title: "Anne's Diary Entries" }, { id: "g10_en_ch4_2", num: "4.2", title: "Amanda! (Poem)" }] },
          { id: "g10_en_ch5", num: 5, title: "Glimpses of India", desc: "First Flight Ch 5", sections: [{ id: "g10_en_ch5_1", num: "5.1", title: "A Baker from Goa" }, { id: "g10_en_ch5_2", num: "5.2", title: "Coorg" }, { id: "g10_en_ch5_3", num: "5.3", title: "Tea from Assam" }] },
          { id: "g10_en_ch6", num: 6, title: "Mijbil the Otter", desc: "First Flight Ch 6", sections: [{ id: "g10_en_ch6_1", num: "6.1", title: "Gavin Maxwell's Pet Otter" }, { id: "g10_en_ch6_2", num: "6.2", title: "Fog (Poem)" }] }
        ]
      }
    },
    "7": {
      subjects: ["Science", "Mathematics", "Social Science", "English"],
      chapters: {
        Science: [
          { 
            id: "s_ch1", num: 1, title: "The Ever-Evolving World of Science", desc: "Scientific methods, observations, hypothesis testing, and the history of scientific discoveries.",
            sections: [
              { id: "s_ch1_1", num: "1.1", title: "What is Science?" },
              { id: "s_ch1_2", num: "1.2", title: "Scientific Method & Investigations" },
              { id: "s_ch1_3", num: "1.3", title: "History of Discoveries & Indian Contributors" },
              { id: "s_ch1_4", num: "1.4", title: "Lab Safety Guidelines" }
            ]
          },
          { 
            id: "s_ch2", num: 2, title: "Exploring Substances: Acidic, Basic, Neutral", desc: "Indicators (litmus, turmeric), acids and bases properties, neutralization reactions.",
            sections: [
              { id: "s_ch2_1", num: "2.1", title: "Acids, Bases and Indicators" },
              { id: "s_ch2_2", num: "2.2", title: "Litmus, Turmeric, China Rose indicators" },
              { id: "s_ch2_3", num: "2.3", title: "Neutralization Reactions" },
              { id: "s_ch2_4", num: "2.4", title: "Neutralization in Daily Life" }
            ]
          },
          { 
            id: "s_ch3", num: 3, title: "Electricity: Circuits and Components", desc: "Symbols of electrical circuit elements, battery formation, heating effect, magnetic effect, fuses, electromagnets.",
            sections: [
              { id: "s_ch3_1", num: "3.1", title: "Symbols of Electric Components" },
              { id: "s_ch3_2", num: "3.2", title: "Closed and Open Electric Circuits" },
              { id: "s_ch3_3", num: "3.3", title: "Heating Effect of Electric Current" },
              { id: "s_ch3_4", num: "3.4", title: "Magnetic Effect of Electric Current" }
            ]
          },
          { 
            id: "s_ch4", num: 4, title: "The World of Metals and Non-metals", desc: "Physical properties (lustre, malleability, ductility) and chemical behaviors.",
            sections: [
              { id: "s_ch4_1", num: "4.1", title: "Physical Properties of Metals" },
              { id: "s_ch4_2", num: "4.2", title: "Chemical Properties & Reactivity Series" },
              { id: "s_ch4_3", num: "4.3", title: "Uses of Metals and Non-metals" }
            ]
          },
          { 
            id: "s_ch5", num: 5, title: "Changes Around Us: Physical and Chemical", desc: "Differentiating physical changes from chemical reactions (rusting, crystallization).",
            sections: [
              { id: "s_ch5_1", num: "5.1", title: "Physical Changes" },
              { id: "s_ch5_2", num: "5.2", title: "Chemical Changes" },
              { id: "s_ch5_3", num: "5.3", title: "Rusting of Iron & Prevention" },
              { id: "s_ch5_4", num: "5.4", title: "Crystallization" }
            ]
          },
          { 
            id: "s_ch6", num: 6, title: "Adolescence: A Stage of Growth and Change", desc: "Physical changes, hormones, emotional growth, balanced diet during teenage years.",
            sections: [
              { id: "s_ch6_1", num: "6.1", title: "Changes at Puberty" },
              { id: "s_ch6_2", num: "6.2", title: "Secondary Sexual Characteristics & Hormones" },
              { id: "s_ch6_3", num: "6.3", title: "Reproductive Health and Nutrition" }
            ]
          },
          { 
            id: "s_ch7", num: 7, title: "Heat Transfer in Nature", desc: "Conduction, convection, radiation, land and sea breezes.",
            sections: [
              { id: "s_ch7_1", num: "7.1", title: "Heat and Temperature" },
              { id: "s_ch7_2", num: "7.2", title: "Conduction, Convection, and Radiation" },
              { id: "s_ch7_3", num: "7.3", title: "Land Breeze and Sea Breeze" }
            ]
          },
          { 
            id: "s_ch8", num: 8, title: "Measurement of Time and Motion", desc: "Simple pendulum, speed calculations, uniform and non-uniform motion graphs.",
            sections: [
              { id: "s_ch8_1", num: "8.1", title: "Measurement of Time" },
              { id: "s_ch8_2", num: "8.2", title: "Speed and its Calculation" },
              { id: "s_ch8_3", num: "8.3", title: "Uniform and Non-Uniform Motion" },
              { id: "s_ch8_4", num: "8.4", title: "Distance-Time Graphs" }
            ]
          },
          { 
            id: "s_ch9", num: 9, title: "Life Processes in Animals", desc: "Digestion, blood circulation, excretion, and breathing in animal species.",
            sections: [
              { id: "s_ch9_1", num: "9.1", title: "Respiration in Animals" },
              { id: "s_ch9_2", num: "9.2", title: "Circulatory System in Humans" },
              { id: "s_ch9_3", num: "9.3", title: "Excretory System in Humans" }
            ]
          },
          { 
            id: "s_ch10", num: 10, title: "Life Processes in Plants", desc: "Photosynthesis, transport of water and nutrients (Xylem/Phloem), transpiration.",
            sections: [
              { id: "s_ch10_1", num: "10.1", title: "Photosynthesis & Respiration" },
              { id: "s_ch10_2", num: "10.2", title: "Transportation of Water and Minerals" },
              { id: "s_ch10_3", num: "10.3", title: "Transpiration" }
            ]
          },
          { 
            id: "s_ch11", num: 11, title: "Light: Shadows and Reflections", desc: "Rectilinear propagation of light, concave and convex mirrors/lenses.",
            sections: [
              { id: "s_ch11_1", num: "11.1", title: "Rectilinear Propagation of Light" },
              { id: "s_ch11_2", num: "11.2", title: "Spherical Mirrors (Concave/Convex)" },
              { id: "s_ch11_3", num: "11.3", title: "Spherical Lenses" }
            ]
          },
          { 
            id: "s_ch12", num: 12, title: "Earth, Moon, and the Sun", desc: "Phases of the Moon, solar and lunar eclipses, tides, rotation and revolution.",
            sections: [
              { id: "s_ch12_1", num: "12.1", title: "The Solar System & Gravity" },
              { id: "s_ch12_2", num: "12.2", title: "Eclipses (Solar and Lunar)" },
              { id: "s_ch12_3", num: "12.3", title: "Phases of the Moon" }
            ]
          }
        ],
        Mathematics: [
          { 
            id: "m_ch1", num: 1, title: "Large Numbers Around Us", desc: "Place values, estimation, working with very large numbers in daily life.",
            sections: [
              { id: "m_ch1_1", num: "1.1", title: "Indian & International Place Value" },
              { id: "m_ch1_2", num: "1.2", title: "Estimation & Rounding Off" },
              { id: "m_ch1_3", num: "1.3", title: "Large Numbers in Daily Life Problems" }
            ]
          },
          { 
            id: "m_ch2", num: 2, title: "Arithmetic Expressions", desc: "Simplifying order of operations, brackets, BODMAS / PEMDAS rules.",
            sections: [
              { id: "m_ch2_1", num: "2.1", title: "Use of Brackets" },
              { id: "m_ch2_2", num: "2.2", title: "BODMAS Rule & Order of Operations" }
            ]
          },
          { 
            id: "m_ch3", num: 3, title: "A Peek Beyond the Point", desc: "Understanding decimal numbers, fractions, representing decimals on a number line.",
            sections: [
              { id: "m_ch3_1", num: "3.1", title: "Decimals & Tenths/Hundredths" },
              { id: "m_ch3_2", num: "3.2", title: "Decimals on the Number Line" },
              { id: "m_ch3_3", num: "3.3", title: "Decimals Operations" }
            ]
          },
          { 
            id: "m_ch4", num: 4, title: "Expressions using Letter-Numbers", desc: "Introduction to algebraic terms, variables, coefficients, and simple linear expressions.",
            sections: [
              { id: "m_ch4_1", num: "4.1", title: "Concept of Variables" },
              { id: "m_ch4_2", num: "4.2", title: "Algebraic Terms & Coefficients" },
              { id: "m_ch4_3", num: "4.3", title: "Like and Unlike Terms" }
            ]
          },
          { 
            id: "m_ch5", num: 5, title: "Parallel and Intersecting Lines", desc: "Identifying angles: alternate, interior, corresponding angles formed by transversals.",
            sections: [
              { id: "m_ch5_1", num: "5.1", title: "Intersecting Lines & Transversals" },
              { id: "m_ch5_2", num: "5.2", title: "Corresponding and Alternate Angles" },
              { id: "m_ch5_3", num: "5.3", title: "Co-interior Angles" }
            ]
          },
          { 
            id: "m_ch6", num: 6, title: "Number Play", desc: "Factors, multiples, prime factorization, and common divisible rules.",
            sections: [
              { id: "m_ch6_1", num: "6.1", title: "Factors and Multiples" },
              { id: "m_ch6_2", num: "6.2", title: "HCF and LCM Methods" },
              { id: "m_ch6_3", num: "6.3", title: "Divisibility Tests" }
            ]
          },
          { 
            id: "m_ch7", num: 7, title: "A Tale of Three Intersecting Lines", desc: "Properties of triangles, angle sum property, exterior angle theorem.",
            sections: [
              { id: "m_ch7_1", num: "7.1", title: "Properties of Triangles" },
              { id: "m_ch7_2", num: "7.2", title: "Angle Sum Property of a Triangle" },
              { id: "m_ch7_3", num: "7.3", title: "Exterior Angle Theorem" }
            ]
          },
          { 
            id: "m_ch8", num: 8, title: "Working with Fractions", desc: "Addition, subtraction, multiplication, and division of fractional values.",
            sections: [
              { id: "m_ch8_1", num: "8.1", title: "Proper, Improper, and Mixed Fractions" },
              { id: "m_ch8_2", num: "8.2", title: "Multiplication and Division of Fractions" },
              { id: "m_ch8_3", num: "8.3", title: "Fraction Word Problems" }
            ]
          },
          { 
            id: "m_ch9", num: 9, title: "Geometric Twins", desc: "Concept of Congruence: congruent shapes, lines, angles, triangles (SSS, SAS, ASA, RHS).",
            sections: [
              { id: "m_ch9_1", num: "9.1", title: "Concept of Congruence" },
              { id: "m_ch9_2", num: "9.2", title: "Criteria for Triangle Congruence" }
            ]
          },
          { 
            id: "m_ch10", num: 10, title: "Operations with Integers", desc: "Addition, subtraction, multiplication, and division of positive and negative integers.",
            sections: [
              { id: "m_ch10_1", num: "10.1", title: "Addition and Subtraction of Integers" },
              { id: "m_ch10_2", num: "10.2", title: "Multiplication and Division of Integers" },
              { id: "m_ch10_3", num: "10.3", title: "Properties of Integer Operations" }
            ]
          },
          { 
            id: "m_ch11", num: 11, title: "Finding Common Ground", desc: "Data handling: arithmetic mean, median, mode, and bar graphs.",
            sections: [
              { id: "m_ch11_1", num: "11.1", title: "Collection and Organisation of Data" },
              { id: "m_ch11_2", num: "11.2", title: "Mean, Median, and Mode" },
              { id: "m_ch11_3", num: "11.3", title: "Bar Graphs and Double Bar Graphs" }
            ]
          },
          { 
            id: "m_ch12", num: 12, title: "Another Peek Beyond the Point", desc: "Advanced fractions, ratios, rates, and unit conversions.",
            sections: [
              { id: "m_ch12_1", num: "12.1", title: "Advanced Decimals & Percentages" },
              { id: "m_ch12_2", num: "12.2", title: "Ratios and Rates" },
              { id: "m_ch12_3", num: "12.3", title: "Unitary Method" }
            ]
          },
          { 
            id: "m_ch13", num: 13, title: "Connecting the Dots...", desc: "Probability concepts, listing outcomes, experimental vs theoretical probability.",
            sections: [
              { id: "m_ch13_1", num: "13.1", title: "Chance and Probability" },
              { id: "m_ch13_2", num: "13.2", title: "Listing Outcomes and Sample Space" }
            ]
          },
          { 
            id: "m_ch14", num: 14, title: "Constructions and Tilings", desc: "Constructing perpendiculars, bisectors, and pattern tiling shapes.",
            sections: [
              { id: "m_ch14_1", num: "14.1", title: "Construction of Parallel Lines" },
              { id: "m_ch14_2", num: "14.2", title: "Construction of Triangles" },
              { id: "m_ch14_3", num: "14.3", title: "Symmetry & Tilings" }
            ]
          },
          { 
            id: "m_ch15", num: 15, title: "Finding the Unknown", desc: "Simple linear equations: forming and solving single-variable equations.",
            sections: [
              { id: "m_ch15_1", num: "15.1", title: "Forming Simple Linear Equations" },
              { id: "m_ch15_2", num: "15.2", title: "Solving Linear Equations (Transpose)" },
              { id: "m_ch15_3", num: "15.3", title: "Word Problems in Single Variable" }
            ]
          },
        ],
        "Social Science": [
          { id: "ss_ch1", num: 1, title: "Geographical Diversity of India", desc: "Part 1 Theme A – India and the World: Explore relief, physical features, mountains, plains, plateaus, and islands of India.", sections: [{ id: "ss_ch1_1", num: "1.1", title: "Relief & Physical features" }, { id: "ss_ch1_2", num: "1.2", title: "Mountains, Plains, Plateaus" }, { id: "ss_ch1_3", num: "1.3", title: "Coastal & Island regions" }] },
          { id: "ss_ch2", num: 2, title: "Understanding the Weather", desc: "Part 1 Theme A – India and the World: Temperature, air pressure, wind systems, humidity, and weather elements.", sections: [{ id: "ss_ch2_1", num: "2.1", title: "Temperature and Air Pressure" }, { id: "ss_ch2_2", num: "2.2", title: "Wind systems and Humidity" }, { id: "ss_ch2_3", num: "2.3", title: "Measuring weather elements" }] },
          { id: "ss_ch3", num: 3, title: "Climate of India", desc: "Part 1 Theme A – India and the World: Monsoon seasons, climate drivers, and regional climatic variations.", sections: [{ id: "ss_ch3_1", num: "3.1", title: "Factors shaping climate" }, { id: "ss_ch3_2", num: "3.2", title: "Monsoons and Seasons" }, { id: "ss_ch3_3", num: "3.3", title: "Regional climate variations" }] },
          { id: "ss_ch4", num: 4, title: "New Beginnings: Cities and States", desc: "Part 1 Theme B – Tapestry of the Past: Early urban centers, Janapadas, Mahajanapadas, and socio-economic structures.", sections: [{ id: "ss_ch4_1", num: "4.1", title: "Early urban centers" }, { id: "ss_ch4_2", num: "4.2", title: "Janapadas & Mahajanapadas" }, { id: "ss_ch4_3", num: "4.3", title: "Social & economic life" }] },
          { id: "ss_ch5", num: 5, title: "The Rise of Empires", desc: "Part 1 Theme B – Tapestry of the Past: The Mauryan Empire, Ashoka's Dhamma, and imperial administration.", sections: [{ id: "ss_ch5_1", num: "5.1", title: "The Mauryan Empire" }, { id: "ss_ch5_2", num: "5.2", title: "Administration & Ashoka's Dhamma" }, { id: "ss_ch5_3", num: "5.3", title: "Imperial economy & trade" }] },
          { id: "ss_ch6", num: 6, title: "The Age of Reorganisation", desc: "Part 1 Theme B – Tapestry of the Past: Post-Mauryan political changes, regional dynasties, and land grants.", sections: [{ id: "ss_ch6_1", num: "6.1", title: "Political changes" }, { id: "ss_ch6_2", num: "6.2", title: "New dynasties & regional powers" }, { id: "ss_ch6_3", num: "6.3", title: "Society & land grants" }] },
          { id: "ss_ch7", num: 7, title: "The Gupta Era: An Age of Tireless Creativity", desc: "Part 1 Theme B – Tapestry of the Past: Imperial expansion, advances in science, literature, art, and temple architecture.", sections: [{ id: "ss_ch7_1", num: "7.1", title: "Gupta rulers & expansion" }, { id: "ss_ch7_2", num: "7.2", title: "Golden age of Science & Literature" }, { id: "ss_ch7_3", num: "7.3", title: "Art, architecture & temples" }] },
          { id: "ss_ch8", num: 8, title: "How the Land Becomes Sacred", desc: "Part 1 Theme C – Our Cultural Heritage: Sacred geography, pilgrimage sites, traditions, and cultural unity.", sections: [{ id: "ss_ch8_1", num: "8.1", title: "Sacred geography & pilgrimage" }, { id: "ss_ch8_2", num: "8.2", title: "Places of worship & traditions" }, { id: "ss_ch8_3", num: "8.3", title: "Cultural unity in diversity" }] },
          { id: "ss_ch9", num: 9, title: "From the Rulers to the Ruled: Types of Governments", desc: "Part 1 Theme D – Governance and Democracy: Monarchy, oligarchy, democracy, rights, and duties.", sections: [{ id: "ss_ch9_1", num: "9.1", title: "Monarchy, Oligarchy, Democracy" }, { id: "ss_ch9_2", num: "9.2", title: "Key features of democratic rule" }, { id: "ss_ch9_3", num: "9.3", title: "Citizen rights & responsibilities" }] },
          { id: "ss_ch10", num: 10, title: "The Constitution of India – An Introduction", desc: "Part 1 Theme D – Governance and Democracy: Preamble, fundamental rights, duties, and rule of law.", sections: [{ id: "ss_ch10_1", num: "10.1", title: "Preamble and core values" }, { id: "ss_ch10_2", num: "10.2", title: "Fundamental Rights & Duties" }, { id: "ss_ch10_3", num: "10.3", title: "Rule of law & governance" }] },
          { id: "ss_ch11", num: 11, title: "From Barter to Money", desc: "Part 1 Theme E – Economic Life: Evolution of trade, currency development, and modern payment methods.", sections: [{ id: "ss_ch11_1", num: "11.1", title: "Evolution of exchange system" }, { id: "ss_ch11_2", num: "11.2", title: "Forms of money through history" }, { id: "ss_ch11_3", num: "11.3", title: "Modern currency & digital pay" }] },
          { id: "ss_ch12", num: 12, title: "Understanding Markets", desc: "Part 1 Theme E – Economic Life: Local markets, wholesale vs retail, supply chains, and consumer access.", sections: [{ id: "ss_ch12_1", num: "12.1", title: "Weekly markets & neighborhood shops" }, { id: "ss_ch12_2", num: "12.2", title: "Wholesale vs Retail traders" }, { id: "ss_ch12_3", num: "12.3", title: "Market chains & equality" }] },
          { id: "ss_ch13", num: 13, title: "The Story of Indian Farming", desc: "Part 2 Theme A – India and the World: Explore how farming shapes life, food systems, and livelihoods across India.", sections: [{ id: "ss_ch13_1", num: "13.1", title: "Agriculture and livelihoods" }, { id: "ss_ch13_2", num: "13.2", title: "Crops, seasons, and land" }, { id: "ss_ch13_3", num: "13.3", title: "Irrigation, tools, and change" }] },
          { id: "ss_ch14", num: 14, title: "India and Her Neighbours", desc: "Part 2 Theme A – India and the World: Study India's location, nearby countries, and cross-border relationships.", sections: [{ id: "ss_ch14_1", num: "14.1", title: "India on the map" }, { id: "ss_ch14_2", num: "14.2", title: "Neighbouring countries" }, { id: "ss_ch14_3", num: "14.3", title: "Connections across borders" }] },
          { id: "ss_ch15", num: 15, title: "Empires and Kingdoms: 6th to 10th Centuries", desc: "Part 2 Theme B – Tapestry of the Past: Track major kingdoms, administration, and early medieval culture.", sections: [{ id: "ss_ch15_1", num: "15.1", title: "Rise of kingdoms" }, { id: "ss_ch15_2", num: "15.2", title: "Administration and society" }, { id: "ss_ch15_3", num: "15.3", title: "Art, architecture, and inscriptions" }] },
          { id: "ss_ch16", num: 16, title: "Turning Tides: 11th and 12th Centuries", desc: "Part 2 Theme B – Tapestry of the Past: Understand trade, new powers, and changing political worlds.", sections: [{ id: "ss_ch16_1", num: "16.1", title: "Trade and travel" }, { id: "ss_ch16_2", num: "16.2", title: "New powers and alliances" }, { id: "ss_ch16_3", num: "16.3", title: "Cultural exchange" }] },
          { id: "ss_ch17", num: 17, title: "India, a Home to Many", desc: "Part 2 Theme C – Our Cultural Heritage: Learn how India's communities, languages, and traditions live together.", sections: [{ id: "ss_ch17_1", num: "17.1", title: "Diversity in daily life" }, { id: "ss_ch17_2", num: "17.2", title: "Shared heritage" }, { id: "ss_ch17_3", num: "17.3", title: "Living together with respect" }] },
          { id: "ss_ch18", num: 18, title: "The State, the Government, and You", desc: "Part 2 Theme D – Governance and Democracy: Understand civics, state machinery, governance, and citizen roles.", sections: [{ id: "ss_ch18_1", num: "18.1", title: "How state governments work" }, { id: "ss_ch18_2", num: "18.2", title: "Role of citizens" }] },
          { id: "ss_ch19", num: 19, title: "Infrastructure: Engine of India's Development", desc: "Part 2 Theme E – Economic Life: The role of transport, energy, and communication in national development.", sections: [{ id: "ss_ch19_1", num: "19.1", title: "Transport and communication" }, { id: "ss_ch19_2", num: "19.2", title: "Energy and power" }] },
          { id: "ss_ch20", num: 20, title: "Banks and the Magic of Finance", desc: "Part 2 Theme E – Economic Life: Introduction to money, banking systems, savings, and basic financial concepts.", sections: [{ id: "ss_ch20_1", num: "20.1", title: "Introduction to banks" }, { id: "ss_ch20_2", num: "20.2", title: "Financial literacy" }] }
        ],
        "English": [
          {
            id: "en_u1",
            num: 1,
            title: "Unit 1: Learning Together",
            desc: "Read stories and poems on learning, perseverance, and seeing the world.",
            sections: [
              { id: "en_u1_1", num: "1.1", title: "The Day the River Spoke" },
              { id: "en_u1_2", num: "1.2", title: "Try Again" },
              { id: "en_u1_3", num: "1.3", title: "Three Days to See" }
            ]
          },
          {
            id: "en_u2",
            num: 2,
            title: "Unit 2: Wit and Humour",
            desc: "Enjoy stories, poems, and plays filled with wit, humour, and fun.",
            sections: [
              { id: "en_u2_1", num: "2.1", title: "Animals, Birds, and Dr. Dolittle" },
              { id: "en_u2_2", num: "2.2", title: "A Funny Man" },
              { id: "en_u2_3", num: "2.3", title: "Say the Right Thing" }
            ]
          },
          {
            id: "en_u3",
            num: 3,
            title: "Unit 3: Dreams and Discoveries",
            desc: "Explore themes of invention, imagination, and world travel.",
            sections: [
              { id: "en_u3_1", num: "3.1", title: "My Brother's Great Invention" },
              { id: "en_u3_2", num: "3.2", title: "Paper Boats" },
              { id: "en_u3_3", num: "3.3", title: "North, South, East, West" }
            ]
          },
          {
            id: "en_u4",
            num: 4,
            title: "Unit 4: Travel and Adventure",
            desc: "Discover accounts of brave journeys, exploration, and conquering peaks.",
            sections: [
              { id: "en_u4_1", num: "4.1", title: "The Tunnel" },
              { id: "en_u4_2", num: "4.2", title: "Travel" },
              { id: "en_u4_3", num: "4.3", title: "Conquering the Summit" }
            ]
          },
          {
            id: "en_u5",
            num: 5,
            title: "Unit 5: Bravehearts",
            desc: "Honor courage, heroism, and national bravehearts through these lessons.",
            sections: [
              { id: "en_u5_1", num: "5.1", title: "A Homage to Our Brave Soldiers" },
              { id: "en_u5_2", num: "5.2", title: "My Dear Soldiers" },
              { id: "en_u5_3", num: "5.3", title: "Rani Abbakka" }
            ]
          }
        ],
      }
    }
  };

  const DEFAULTS = {
    profile: {
      name: "",
      grade: "7",
      stream: "Science", 
      board: "CBSE",
      subjects: ["Science", "Mathematics", "Social Science", "English"],
      dailyHours: 2,
      goal: "Improve overall grades",
      streak: 0,
      lastActive: "",
      setupComplete: false,
      careerUnlocked: false,
      aiMode: "online",
      mode: "online",
      ollamaModel: "auto",
      backendStudentId: null,
      targetDate: "",
      schoolEmail: "nagaraj957@gmail.com"
    },
    
    tasks: [],

    homework: [],

    exams: [],
    
    calendar: [],
    
    notes: [],
    
    flashcards: [],

    notifications: [],

    // Stores section-level granular progress tracking states (Not Started, Initial Pass, Studied, Revised, Fully Ready)
    chapter_progress: {},

    chapter_workspace: {}
  };

  // Helper local storage wrappers with memory-based fallbacks for when storage is blocked
  const storageFallback = {};

  function get(key) {
    try {
      const data = localStorage.getItem(DB_PREFIX + key);
      return data ? JSON.parse(data) : DEFAULTS[key];
    } catch (e) {
      console.warn("[StudyPilotDB] localStorage.getItem failed, using memory fallback:", e);
      return storageFallback[key] !== undefined ? storageFallback[key] : DEFAULTS[key];
    }
  }

  function set(key, value) {
    try {
      localStorage.setItem(DB_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn("[StudyPilotDB] localStorage.setItem failed, using memory fallback:", e);
      storageFallback[key] = value;
    }
  }

  function toNumberOrNull(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function normalizeSubjects(subjects, fallback) {
    const source = Array.isArray(subjects) ? subjects : fallback;
    return source
      .map((subject) => String(subject || "").trim())
      .filter((sub) => Boolean(sub) && sub !== "Computer Science" && sub !== "Hindi");
  }

  function normalizeProfile(profileData) {
    const profile = profileData || {};
    const fallback = DEFAULTS.profile;
    const dailyHours = Number(profile.dailyHours ?? profile.daily_study_hours ?? fallback.dailyHours);

    return {
      name: String(profile.name ?? fallback.name ?? "").trim(),
      grade: String(profile.grade ?? fallback.grade ?? "7"),
      section: String(profile.section ?? fallback.section ?? "").trim(),
      stream: String(profile.stream ?? fallback.stream ?? "Science"),
      board: String(profile.board ?? profile.school_board ?? fallback.board ?? "State Board").trim() || "State Board",
      subjects: normalizeSubjects(profile.subjects, fallback.subjects),
      dailyHours: Number.isFinite(dailyHours) ? dailyHours : Number(fallback.dailyHours || 0),
      goal: String(profile.goal ?? profile.academic_goal ?? fallback.goal ?? "Improve overall grades").trim() || "Improve overall grades",
      streak: Number.isFinite(Number(profile.streak)) ? Number(profile.streak) : Number(fallback.streak || 0),
      lastActive: String(profile.lastActive ?? fallback.lastActive ?? ""),
      setupComplete: Boolean(profile.setupComplete),
      careerUnlocked: Boolean(profile.careerUnlocked),
      aiMode: String(profile.aiMode ?? profile.mode ?? fallback.aiMode ?? "online"),
      mode: String(profile.mode ?? profile.aiMode ?? fallback.mode ?? "online"),
      ollamaModel: String(profile.ollamaModel ?? fallback.ollamaModel ?? "auto"),
      backendStudentId: toNumberOrNull(profile.backendStudentId ?? profile.student_id ?? profile.id),
      targetDate: String(profile.targetDate ?? fallback.targetDate ?? ""),
      schoolEmail: String(profile.schoolEmail ?? profile.email ?? fallback.schoolEmail ?? "nagaraj957@gmail.com")
    };
  }

  function buildProfilePayload(profileData) {
    const profile = normalizeProfile(profileData);
    return {
      name: profile.name,
      grade: profile.grade,
      section: profile.section,
      school_board: profile.board,
      board: profile.board,
      subjects: profile.subjects,
      daily_study_hours: profile.dailyHours,
      dailyHours: profile.dailyHours,
      academic_goal: profile.goal,
      goal: profile.goal,
      setupComplete: profile.setupComplete,
      careerUnlocked: profile.careerUnlocked,
      streak: profile.streak,
      lastActive: profile.lastActive,
      ollamaModel: profile.ollamaModel,
      targetDate: profile.targetDate,
      schoolEmail: profile.schoolEmail
    };
  }

  function normalizeTaskItem(task) {
    const raw = task || {};
    const status = String(raw.status || (raw.completed ? "completed" : "pending")).toLowerCase();
    return {
      id: String(raw.id ?? raw.task_id ?? ("task_" + Date.now())),
      title: String(raw.title || "Untitled Task"),
      subject: String(raw.subject || "General"),
      duration: Number(raw.duration ?? raw.estimated_minutes ?? 30) || 30,
      completed: Boolean(raw.completed) || status === "completed",
      status: status,
      date: String(raw.date || raw.due_date || "2026-06-22"),
      backendId: toNumberOrNull(raw.id),
      notes: String(raw.description || raw.notes || "")
    };
  }

  function normalizeHomeworkItem(item) {
    const raw = item || {};
    const status = String(raw.status || "pending").toLowerCase();
    return {
      id: String(raw.id ?? ("hw_" + Date.now())),
      title: String(raw.title || "Homework"),
      subject: String(raw.subject || "General"),
      status: status,
      completed: status === "completed" || status === "submitted",
      date: String(raw.date || raw.due_date || "2026-06-22"),
      notes: String(raw.notes || ""),
      backendId: toNumberOrNull(raw.id)
    };
  }

  function normalizeExamItem(exam) {
    const raw = exam || {};
    return {
      id: String(raw.id ?? ("exam_" + Date.now())),
      subject: String(raw.subject || "General"),
      topic: String(raw.topic || raw.title || "Upcoming Exam"),
      title: String(raw.title || raw.topic || "Upcoming Exam"),
      date: String(raw.date || raw.exam_date || "2026-06-22"),
      confidence_level: Number(raw.confidence_level ?? 50) || 50,
      backendId: toNumberOrNull(raw.id)
    };
  }

  function normalizeCalendarEvent(item) {
    const raw = item || {};
    const date = String(raw.date || raw.session_date || "");
    let day = String(raw.day || "");
    if (!day && date) {
      const parsed = new Date(date + "T00:00:00");
      if (!isNaN(parsed.getTime())) {
        day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][parsed.getDay()];
      }
    }

    return {
      id: String(raw.id ?? ("event_" + Date.now())),
      title: String(raw.title || raw.notes || "Study Session"),
      day: day,
      date: date,
      type: String(raw.type || raw.session_type || "study"),
      start: String(raw.start || raw.start_time || "09:00"),
      end: String(raw.end || raw.end_time || "10:00"),
      subject: String(raw.subject || "General"),
      backendId: toNumberOrNull(raw.id)
    };
  }

  let backendCheckPromise = null;

  async function checkBackendOnline() {
    if (window.location.protocol === "file:") return false;
    if (backendCheckPromise !== null) return backendCheckPromise;
    backendCheckPromise = (async () => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 600);
        const res = await fetch(`${window.getStudyPilotApiBaseUrl()}/api/health`, {
          method: "GET",
          signal: controller.signal
        }).catch(() => null);
        clearTimeout(timer);
        return Boolean(res && res.ok);
      } catch (e) {
        return false;
      }
    })();
    return backendCheckPromise;
  }

  async function syncProfileToBackend(profileData) {
    const online = await checkBackendOnline();
    if (!online) return null;

    const profile = normalizeProfile(profileData);
    const payload = buildProfilePayload(profile);

    if (profile.backendStudentId) {
      payload.student_id = profile.backendStudentId;
      payload.id = profile.backendStudentId;
    }

    try {
      const response = await fetch(`${window.getStudyPilotApiBaseUrl()}/api/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Profile sync failed with status ${response.status}`);
      }

      const data = await response.json();
      const item = data && data.item ? data.item : null;
      const savedId = toNumberOrNull(item && (item.student_id ?? item.id));

      if (savedId && savedId !== profile.backendStudentId) {
        const updatedProfile = Object.assign({}, profile, { backendStudentId: savedId });
        set("profile", updatedProfile);
      }

      return item;
    } catch (error) {
      console.debug("[StudyPilotDB] Unable to sync profile to backend:", error);
      return null;
    }
  }

  // Database API
  window.StudyPilotDB = {
    // Expose curriculum database
    getCurriculum: function (grade, stream) {
      const g = String(grade || (this.getProfile() || {}).grade || "7");
      const curriculum = CBSE_CURRICULUM[g] || CBSE_CURRICULUM["7"];
      return {
        subjects: curriculum.subjects || ["Science", "Mathematics", "Social Science", "English"],
        chapters: curriculum.chapters || {}
      };
    },

    init: function () {
      for (let key in DEFAULTS) {
        let hasItem = false;
        try {
          hasItem = !!localStorage.getItem(DB_PREFIX + key);
        } catch (e) {
          hasItem = storageFallback[key] !== undefined;
        }
        if (!hasItem) {
          set(key, DEFAULTS[key]);
        }
      }
      const profile = this.getProfile();
      if (!profile.setupComplete && !String(profile.name || "").trim()) {
        set("tasks", []);
        set("homework", []);
        set("exams", []);
        set("calendar", []);
        set("notes", []);
        set("flashcards", []);
        set("notifications", []);
        set("chapter_progress", {});
        set("chapter_workspace", {});
      }
      this.checkStreak();
      void this.bootstrapFromBackend();
      void this.syncCurriculumFromBackend();
    },

    clearAll: function () {
      for (let key in DEFAULTS) {
        try {
          localStorage.removeItem(DB_PREFIX + key);
        } catch (e) {
          console.warn("[StudyPilotDB] localStorage.removeItem failed:", e);
        }
        delete storageFallback[key];
      }
      this.init();
    },

    // Profile API
    getProfile: function () {
      const profile = get("profile");
      if (profile && Array.isArray(profile.subjects)) {
        const filtered = profile.subjects.filter(s => s !== "Computer Science" && s !== "Hindi");
        if (filtered.length !== profile.subjects.length) {
          profile.subjects = filtered.length > 0 ? filtered : ["Science", "Mathematics", "Social Science", "English"];
          set("profile", profile);
        }
      }
      return profile;
    },
    saveProfile: function (profileData) {
      const normalizedProfile = normalizeProfile(profileData);
      set("profile", normalizedProfile);
      void syncProfileToBackend(normalizedProfile);
    },

    // Tasks API
    getTasks: function () {
      return get("tasks");
    },
    saveTasks: function (tasks) {
      set("tasks", (tasks || []).map(normalizeTaskItem));
    },
    addTask: function (title, subject, duration) {
      const tasks = this.getTasks();
      const newTask = normalizeTaskItem({
        id: "task_" + Date.now(),
        title: title,
        subject: subject,
        duration: parseInt(duration, 10),
        completed: false,
        status: "pending",
        date: "2026-06-22"
      });
      tasks.push(newTask);
      this.saveTasks(tasks);
      this.addNotification(`New task added: "${title}"`, "info");
      return newTask;
    },
    toggleTask: function (id) {
      const tasks = this.getTasks();
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed;
        task.status = task.completed ? "completed" : "pending";
        this.saveTasks(tasks);
      }
    },
    deleteTask: function (id) {
      let tasks = this.getTasks();
      tasks = tasks.filter(t => t.id !== id);
      this.saveTasks(tasks);
    },

    // Homework API
    getHomework: function () {
      return get("homework");
    },
    saveHomework: function (items) {
      set("homework", (items || []).map(normalizeHomeworkItem));
    },

    // Exams API
    getExams: function () {
      return get("exams");
    },
    saveExams: function (exams) {
      set("exams", (exams || []).map(normalizeExamItem));
    },
    addExam: function (subject, topic, date) {
      const exams = this.getExams();
      const newExam = normalizeExamItem({
        id: "exam_" + Date.now(),
        subject: subject,
        topic: topic,
        date: date
      });
      exams.push(newExam);
      this.saveExams(exams);
      this.addNotification(`Upcoming exam added for ${subject} on ${date}.`, "exam");
      return newExam;
    },

    // Calendar API
    getCalendarEvents: function () {
      return get("calendar");
    },
    saveCalendarEvents: function (events) {
      set("calendar", (events || []).map(normalizeCalendarEvent));
    },
    addCalendarEvent: function (title, day, type, start, end, date, subject) {
      const events = this.getCalendarEvents();
      const newEvent = normalizeCalendarEvent({
        id: "event_" + Date.now(),
        title: title,
        day: day,
        date: date || "",
        type: type,
        start: start,
        end: end,
        subject: subject || "General"
      });
      events.push(newEvent);
      this.saveCalendarEvents(events);
      return newEvent;
    },
    deleteCalendarEvent: function (id) {
      let events = this.getCalendarEvents();
      events = events.filter(e => e.id !== id);
      this.saveCalendarEvents(events);
    },

    bootstrapFromBackend: async function () {
      const online = await checkBackendOnline();
      if (!online) return;

      try {
        const response = await fetch(`${window.getStudyPilotApiBaseUrl()}/api/bootstrap`);
        if (!response.ok) return;
        const data = await response.json();
        if (!data || !data.ok || !data.student) return;

        const currentProfile = this.getProfile();
        const activeLocalGrade = currentProfile && currentProfile.grade ? String(currentProfile.grade) : null;
        const mergedProfile = normalizeProfile(Object.assign({}, currentProfile, data.student));

        if (activeLocalGrade) {
          mergedProfile.grade = activeLocalGrade;
        }

        set("profile", mergedProfile);

        if (Array.isArray(data.tasks)) {
          this.saveTasks(data.tasks);
        }
        if (Array.isArray(data.homework)) {
          this.saveHomework(data.homework);
        }
        if (Array.isArray(data.exams)) {
          this.saveExams(data.exams);
        }
        if (Array.isArray(data.study_sessions)) {
          this.saveCalendarEvents(data.study_sessions);
        }

        window.dispatchEvent(new CustomEvent("studypilot_bootstrap"));
      } catch (err) {
        console.debug("[StudyPilotDB] Bootstrap skipped (local mode)");
      }
    },

    // Notes API
    getNotes: function () {
      return get("notes");
    },
    saveNotes: function (notes) {
      set("notes", notes);
    },
    addNote: function (title, body, color) {
      const notes = this.getNotes();
      const newNote = {
        id: "note_" + Date.now(),
        title: title || "Untitled Note",
        body: body || "",
        color: color || "default",
        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
      notes.unshift(newNote);
      this.saveNotes(notes);
      return newNote;
    },
    deleteNote: function (id) {
      let notes = this.getNotes();
      notes = notes.filter(n => n.id !== id);
      this.saveNotes(notes);
    },

    // Flashcards API
    getFlashcards: function () {
      return get("flashcards");
    },
    saveFlashcards: function (cards) {
      set("flashcards", cards);
    },
    addFlashcard: function (subject, question, answer) {
      const cards = this.getFlashcards();
      const newCard = {
        id: "fc_" + Date.now(),
        subject: subject,
        question: question,
        answer: answer,
        ease: 0,
        nextReview: ""
      };
      cards.push(newCard);
      this.saveFlashcards(cards);
      return newCard;
    },

    // Notifications API
    getNotifications: function () {
      return get("notifications");
    },
    saveNotifications: function (notifs) {
      set("notifications", notifs);
    },
    addNotification: function (message, type = "info") {
      const notifs = this.getNotifications();
      const newNotif = {
        id: "notif_" + Date.now(),
        message: message,
        read: false,
        type: type
      };
      notifs.unshift(newNotif);
      this.saveNotifications(notifs);
      window.dispatchEvent(new CustomEvent("studypilot_notification"));
    },

    // Lesson Progress Tracking (Section-level granular tracking)
    getLessonProgress: function () {
      return get("chapter_progress") || {};
    },
    
    saveLessonProgress: function (progress) {
      set("chapter_progress", progress);
    },

    getChapterWorkspace: function () {
      return get("chapter_workspace") || {};
    },

    getChapterWorkspaceEntry: function (chapterId) {
      const workspace = this.getChapterWorkspace();
      return workspace[chapterId] || {};
    },

    saveChapterWorkspaceEntry: function (chapterId, patch) {
      const workspace = this.getChapterWorkspace();
      const current = workspace[chapterId] || {};
      workspace[chapterId] = Object.assign({}, current, patch || {}, {
        updatedAt: new Date().toISOString()
      });
      set("chapter_workspace", workspace);
      return workspace[chapterId];
    },
    
    updateSectionStatus: function (sectionId, status) {
      const progress = this.getLessonProgress();
      progress[sectionId] = status;
      this.saveLessonProgress(progress);
      
      this.addNotification(`Syllabus Update: Status of section set to "${status}".`, "info");
      window.dispatchEvent(new CustomEvent("studypilot_lesson_update"));

      try {
        const profile = this.getProfile();
        const studentId = profile.backendStudentId;
        
        let foundSubject = null;
        let foundChapterTitle = null;
        let foundTopicTitle = null;

        const curriculum = CBSE_CURRICULUM[String(profile.grade || "7")] || CBSE_CURRICULUM["7"];
        if (curriculum && curriculum.chapters) {
          for (const subjectName of Object.keys(curriculum.chapters)) {
            const chapters = curriculum.chapters[subjectName];
            for (const ch of chapters) {
              const sec = ch.sections.find(s => s.id === sectionId);
              if (sec) {
                foundSubject = subjectName;
                foundChapterTitle = ch.title;
                foundTopicTitle = `${ch.num}.${sec.num.split('.').pop()} ${sec.title}`;
                break;
              }
            }
            if (foundSubject) break;
          }
        }

        if (studentId && foundSubject && foundChapterTitle && foundTopicTitle) {
          fetch(`${window.getStudyPilotApiBaseUrl()}/api/curriculum/status`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              student_id: studentId,
              grade: parseInt(profile.grade) || 7,
              subject_name: foundSubject,
              chapter_title: foundChapterTitle,
              topic_title: foundTopicTitle,
              status: status
            })
          }).then(res => res.json())
            .then(data => {
              console.log("[StudyPilotDB] Synced status update to backend:", data);
            }).catch(err => {
              console.warn("[StudyPilotDB] Failed to sync status update:", err);
            });
        }
      } catch (err) {
        console.warn("[StudyPilotDB] Sync error during updateSectionStatus:", err);
      }
    },

    syncCurriculumFromBackend: async function () {
      const profile = this.getProfile();
      const studentId = profile.backendStudentId;
      if (!studentId) return;

      const online = await checkBackendOnline();
      if (!online) return;

      try {
        const response = await fetch(`${window.getStudyPilotApiBaseUrl()}/api/curriculum?student_id=${studentId}`);
        if (!response.ok) throw new Error(`Fetch failed with status ${response.status}`);
        const data = await response.json();
        
        if (data && data.ok && Array.isArray(data.items)) {
          const progress = this.getLessonProgress();
          let changed = false;
          const curriculum = CBSE_CURRICULUM[String(profile.grade || "7")] || CBSE_CURRICULUM["7"];

          data.items.forEach(item => {
            const subjectName = item.subject_name;
            const chTitle = item.chapter_title;
            const topicTitle = item.topic_title;
            const status = item.topic_status;

            let frontendStatus = "Not Started";
            if (status === "Learning") frontendStatus = "Initial Pass";
            else if (status === "Revised") frontendStatus = "Revised";
            else if (status === "Mastered") frontendStatus = "Fully Ready";
            else if (status === "Not Started") frontendStatus = "Not Started";

            if (curriculum && curriculum.chapters[subjectName]) {
              const chapters = curriculum.chapters[subjectName];
              for (const ch of chapters) {
                if (ch.title.toLowerCase() === chTitle.toLowerCase()) {
                  const sec = ch.sections.find(s => {
                    const expectedTitle = `${ch.num}.${s.num.split('.').pop()} ${s.title}`;
                    return expectedTitle.toLowerCase() === topicTitle.toLowerCase();
                  });
                  if (sec) {
                    if (progress[sec.id] !== frontendStatus) {
                      progress[sec.id] = frontendStatus;
                      changed = true;
                    }
                    break;
                  }
                }
              }
            }
          });

          if (changed) {
            this.saveLessonProgress(progress);
            window.dispatchEvent(new CustomEvent("studypilot_lesson_update"));
          }
        }
      } catch (err) {
        console.debug("[StudyPilotDB] Curriculum sync skipped (local mode)");
      }
    },

    // Streak & Date
    checkStreak: function () {
      const profile = this.getProfile();
      if (!profile.setupComplete) return;

      const now = new Date();
      const todayStr = now.toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      let changed = false;
      if (!profile.lastActive) {
        profile.lastActive = todayStr;
        profile.streak = Math.max(1, parseInt(profile.streak, 10) || 1);
        changed = true;
      } else if (profile.lastActive === todayStr) {
        const currStreak = Math.max(1, parseInt(profile.streak, 10) || 1);
        if (profile.streak !== currStreak) {
          profile.streak = currStreak;
          changed = true;
        }
      } else if (profile.lastActive === yesterdayStr) {
        profile.streak = (parseInt(profile.streak, 10) || 0) + 1;
        profile.lastActive = todayStr;
        changed = true;
      } else {
        profile.streak = 1;
        profile.lastActive = todayStr;
        changed = true;
      }

      if (changed) {
        set("profile", profile);
      }
      this.updateStreakDisplay();
    },

    updateStreakDisplay: function () {
      const profile = this.getProfile();
      const streak = Math.max(1, parseInt(profile.streak, 10) || 1);
      const globalBadge = document.getElementById("global-streak-count");
      if (globalBadge) globalBadge.textContent = streak;
      const profileBadge = document.getElementById("profile-streak-count");
      if (profileBadge) profileBadge.textContent = streak;
    }
  };

  window.StudyPilotDB.init();
})();
