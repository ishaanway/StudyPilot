/* ======================================================== */
/* StudyPilot — CBSE Grade 7 Syllabus Data Module          */
/* CBSE 2026-27 | NEP 2020 Aligned | NCERT New Textbooks   */
/* Includes: Tamil (Samacheer Kalvi / TNTEXTBOOKS)          */
/* ======================================================== */

(function () {

  /* ─────────────────────────────────────────────
     CBSE 2026-27 COMPLETE CHAPTER DATA
     New textbooks per NEP 2020 / NCF-SE 2023
  ───────────────────────────────────────────── */
  const SYLLABUS = {

    /* ══════════════════════════════════
       SCIENCE — NCERT Curiosity (2026-27)
    ══════════════════════════════════ */
    Science: [
      { id: "s_ch1",  num: 1,  title: "The Ever-Evolving World of Science",               desc: "Scientific methods, observation, hypothesis, controlled experiments, tools of science and the nature of scientific inquiry.", keywords: ["hypothesis","experiment","observation","scientific method","inference","variable"] },
      { id: "s_ch2",  num: 2,  title: "Exploring Substances: Acidic, Basic, Neutral",     desc: "Indicators (litmus, turmeric, red cabbage), acids and bases properties, pH scale, neutralization, daily-life applications.", keywords: ["acid","base","litmus","pH","neutral","salt","indicator","neutralization","vinegar","baking soda"] },
      { id: "s_ch3",  num: 3,  title: "Electricity: Circuits and Components",              desc: "Electric circuit symbols, battery vs cell, heating effect (iron, fuse), magnetic effect (Oersted), electromagnets.", keywords: ["circuit","electricity","battery","fuse","electromagnet","current","heating effect","magnetic effect","oersted","conductor"] },
      { id: "s_ch4",  num: 4,  title: "The World of Metals and Non-metals",                desc: "Physical properties (lustre, malleability, ductility, conductivity), chemical behavior, reaction with water/acid/oxygen.", keywords: ["metal","non-metal","lustre","malleability","ductility","conductor","corrosion","oxide","reaction"] },
      { id: "s_ch5",  num: 5,  title: "Changes Around Us: Physical and Chemical",          desc: "Differentiating physical (reversible, no new substance) from chemical changes (new substance, often irreversible).", keywords: ["physical change","chemical change","rust","crystallization","reversible","irreversible","burning","corrosion"] },
      { id: "s_ch6",  num: 6,  title: "The Skeletal and Muscular Systems",                 desc: "Types of bones and joints, cartilage, tendons, ligaments; voluntary vs involuntary muscles; disorders.", keywords: ["skeleton","muscle","joint","bone","cartilage","tendon","ligament","voluntary","involuntary","pivot","hinge"] },
      { id: "s_ch7",  num: 7,  title: "Water: A Precious Resource",                        desc: "Water cycle, groundwater and water table, causes of depletion, conservation methods, drought, rainwater harvesting.", keywords: ["water cycle","groundwater","water table","aquifer","drought","conservation","transpiration","rainwater harvesting"] },
      { id: "s_ch8",  num: 8,  title: "Light: Reflection and Refraction",                  desc: "Laws of reflection, plane/concave/convex mirrors, real vs virtual images, refraction, lenses, dispersion, human eye.", keywords: ["light","reflection","refraction","mirror","lens","concave","convex","angle of incidence","dispersion","rainbow"] },
      { id: "s_ch9",  num: 9,  title: "Heat and Its Effects",                               desc: "Temperature scales, thermometers, conduction, convection, radiation, insulators, conductors, expansion of materials.", keywords: ["heat","temperature","conduction","convection","radiation","thermometer","insulator","conductor","expansion"] },
      { id: "s_ch10", num: 10, title: "Respiration in Organisms",                          desc: "Aerobic and anaerobic respiration, breathing mechanism (diaphragm), gas exchange in lungs, respiration in plants, insects, fish.", keywords: ["respiration","aerobic","anaerobic","breathing","lungs","diaphragm","oxygen","carbon dioxide","yeast","gill"] },
      { id: "s_ch11", num: 11, title: "Transportation in Plants and Animals",               desc: "Xylem and phloem, transpiration, heart structure, blood components, arteries, veins, capillaries, excretion.", keywords: ["xylem","phloem","transpiration","blood","heart","artery","vein","capillary","circulation","excretion"] },
      { id: "s_ch12", num: 12, title: "Nutrition in Plants",                                desc: "Photosynthesis equation, chlorophyll, autotrophs vs heterotrophs, parasitic plants (Cuscuta), insectivorous plants.", keywords: ["photosynthesis","chlorophyll","nutrition","autotroph","heterotroph","parasite","stomata","glucose","cuscuta"] },
      { id: "s_ch13", num: 13, title: "Nutrition in Animals",                               desc: "Digestive system stages: ingestion → digestion → absorption → assimilation → egestion. Amoeba digestion.", keywords: ["digestion","stomach","intestine","enzyme","absorption","assimilation","saliva","bile","peristalsis","amoeba"] },
      { id: "s_ch14", num: 14, title: "Soil: Our Life",                                     desc: "Soil formation (weathering + humus), horizons (A, B, C, bedrock), types (sandy/loamy/clayey), erosion, conservation.", keywords: ["soil","humus","horizon","sandy","loamy","clayey","erosion","percolation","weathering","conservation"] }
    ],

    /* ══════════════════════════════════
       MATHEMATICS — NCERT Ganita Prakash (2026-27)
       Parts I & II
    ══════════════════════════════════ */
    Mathematics: [
      { id: "m_ch1",  num: 1,  title: "Large Numbers Around Us",             desc: "Indian number system (lakhs, crores), international system (millions, billions), estimation, rounding.", keywords: ["large numbers","place value","lakh","crore","million","billion","estimation","rounding","numeral"] },
      { id: "m_ch2",  num: 2,  title: "Arithmetic Expressions",               desc: "Simplifying expressions using BODMAS/PEMDAS: Brackets, Of, Division, Multiplication, Addition, Subtraction.", keywords: ["bodmas","pemdas","arithmetic","expression","brackets","order of operations","simplify","evaluate"] },
      { id: "m_ch3",  num: 3,  title: "A Peek Beyond the Point",              desc: "Decimal numbers, equivalent decimals, comparing decimals, fractions ↔ decimal conversions, number line.", keywords: ["decimal","fraction","number line","convert","tenths","hundredths","thousandths","equivalent"] },
      { id: "m_ch4",  num: 4,  title: "Expressions using Letter-Numbers",     desc: "Algebra: variables, coefficients, constants, like/unlike terms, formation and evaluation of algebraic expressions.", keywords: ["algebra","variable","coefficient","constant","expression","like terms","unlike terms","evaluate","substitute"] },
      { id: "m_ch5",  num: 5,  title: "Parallel and Intersecting Lines",      desc: "Transversal, corresponding angles, alternate interior/exterior angles, co-interior (supplementary) angles.", keywords: ["parallel","transversal","corresponding angles","alternate angles","co-interior","intersecting","supplementary","180"] },
      { id: "m_ch6",  num: 6,  title: "Ratio and Proportion",                 desc: "Equivalent ratios, proportion, unitary method, direct and inverse proportion with real-life applications.", keywords: ["ratio","proportion","unitary method","equivalent ratio","direct proportion","inverse proportion","scale"] },
      { id: "m_ch7",  num: 7,  title: "Simple Equations",                     desc: "Forming and solving linear equations in one variable using transposition, verification, word problems.", keywords: ["equation","variable","linear","transpose","solve","balance","word problem","one variable","verification"] },
      { id: "m_ch8",  num: 8,  title: "Triangle and Its Properties",          desc: "Types of triangles, angle sum property (180°), exterior angle theorem, Pythagoras theorem, median, altitude.", keywords: ["triangle","angle sum","180 degrees","exterior angle","pythagoras","isosceles","equilateral","scalene","median","altitude"] },
      { id: "m_ch9",  num: 9,  title: "Symmetry",                             desc: "Lines of symmetry, rotational symmetry, order of rotation, angle of rotation, point symmetry, kaleidoscope.", keywords: ["symmetry","line of symmetry","rotational symmetry","order","rotation","kaleidoscope","point symmetry"] },
      { id: "m_ch10", num: 10, title: "Perimeter and Area",                   desc: "Perimeter of polygons, area of rectangle/square/triangle, circumference and area of circles using π.", keywords: ["perimeter","area","rectangle","square","triangle","circle","pi","circumference","polygon"] },
      { id: "m_ch11", num: 11, title: "Data Handling",                        desc: "Data collection, organisation, bar graphs, double bar graphs, mean, median, mode, probability basics.", keywords: ["data","bar graph","mean","median","mode","average","frequency","tally","statistics","probability"] },
      { id: "m_ch12", num: 12, title: "Fractions and Decimals",               desc: "Multiplication and division of fractions, operations on decimal numbers, word problems.", keywords: ["fractions","multiply fractions","divide fractions","decimal","operations","reciprocal","mixed number"] },
      { id: "m_ch13", num: 13, title: "Exponents and Powers",                 desc: "Exponential notation, laws of exponents (product, quotient, power of power), standard form (scientific notation).", keywords: ["exponent","power","base","scientific notation","laws of exponents","squared","cubed","standard form"] },
      { id: "m_ch14", num: 14, title: "Practical Geometry",                   desc: "Constructing parallel lines, triangles (SSS, SAS, ASA, RHS), using ruler, protractor, and compass.", keywords: ["geometry","construction","ruler","compass","protractor","SSS","SAS","ASA","RHS","perpendicular","bisector"] }
    ],

    /* ══════════════════════════════════
       SOCIAL SCIENCE — Exploring Society: India and Beyond
       (2026-27 New Integrated Textbook — Parts I & II)
       Replaces separate History/Geography/Civics
    ══════════════════════════════════ */
    "Social Science": [
      /* — HISTORY STRAND — */
      { id: "ss_h1",  num: "H-1",  strand: "History", title: "Tracing Changes Through a Thousand Years",        desc: "Medieval India (700–1750 CE), historians, sources, maps, how history is written and interpreted.", keywords: ["medieval","historian","source","map","period","india","700 CE"] },
      { id: "ss_h2",  num: "H-2",  strand: "History", title: "New Kings and Kingdoms",                           desc: "Rise of regional kingdoms — Rashtrakutas, Pratiharas, Palas — prashastis, land revenue, warfare.", keywords: ["rashtrakuta","pratihara","pala","dynasty","tribute","revenue","prashasti","regional kingdom"] },
      { id: "ss_h3",  num: "H-3",  strand: "History", title: "The Delhi Sultans",                                 desc: "Five dynasties of the Delhi Sultanate — Qutb-ud-din Aibak, Iltutmish, Razia, Balban; Iqta system.", keywords: ["delhi sultanate","qutub","iltutmish","razia","balban","slave dynasty","iqta","sultan"] },
      { id: "ss_h4",  num: "H-4",  strand: "History", title: "The Mughal Empire",                                 desc: "Babur to Aurangzeb — Mansabdari system, Akbar's reforms, religious policy, Taj Mahal, decline.", keywords: ["mughal","babur","akbar","aurangzeb","mansab","jagir","taj mahal","din-i-ilahi","jizya"] },
      { id: "ss_h5",  num: "H-5",  strand: "History", title: "Rulers and Buildings",                              desc: "Architecture as political power — temples, mosques, forts, gardens, Qutub Minar, Fatehpur Sikri.", keywords: ["architecture","temple","mosque","fort","taj mahal","qutub minar","fatehpur sikri","red fort"] },
      { id: "ss_h6",  num: "H-6",  strand: "History", title: "Towns, Traders and Craftspersons",                 desc: "Medieval towns, trade routes, artisans, guilds, temple towns, and port towns.", keywords: ["trade","craftsperson","guild","temple town","port","spice trade","market","merchant"] },
      { id: "ss_h7",  num: "H-7",  strand: "History", title: "Tribes, Nomads and Settled Communities",           desc: "Tribal societies — Gonds, Ahoms, Banjaras — their conflicts and integration with settled communities.", keywords: ["tribe","nomad","gond","ahom","banjara","forest","pastoral","settled"] },
      { id: "ss_h8",  num: "H-8",  strand: "History", title: "Devotional Paths to the Divine",                   desc: "Bhakti and Sufi movements — Kabir, Mirabai, Tukaram, Guru Nanak, Rumi, Chishti order.", keywords: ["bhakti","sufi","kabir","mirabai","guru nanak","saint","devotion","langar","chishti"] },
      { id: "ss_h9",  num: "H-9",  strand: "History", title: "The Making of Regional Cultures",                  desc: "Regional languages, literature, dance forms (Kathak, Odissi), cuisine and clothing traditions.", keywords: ["regional culture","kathak","odissi","language","literature","tradition","miniature painting"] },
      { id: "ss_h10", num: "H-10", strand: "History", title: "Eighteenth-Century Political Formations",          desc: "Decline of Mughals, rise of Marathas, Sikhs, Jats, Rajputs, and the nawabs.", keywords: ["maratha","sikh","jat","nawab","peshwa","mughal decline","eighteenth century"] },
      /* — GEOGRAPHY STRAND — */
      { id: "ss_g1",  num: "G-1",  strand: "Geography", title: "Environment",                                     desc: "Natural and human environment, lithosphere, hydrosphere, atmosphere, biosphere, ecosystem.", keywords: ["environment","lithosphere","hydrosphere","atmosphere","biosphere","ecosystem","natural","human"] },
      { id: "ss_g2",  num: "G-2",  strand: "Geography", title: "Inside Our Earth",                                desc: "Earth's interior: crust, mantle, core. Rock types: igneous, sedimentary, metamorphic. Rock cycle.", keywords: ["crust","mantle","core","igneous","sedimentary","metamorphic","rock cycle","earthquake","volcano"] },
      { id: "ss_g3",  num: "G-3",  strand: "Geography", title: "Our Changing Earth",                              desc: "Internal and external forces shaping Earth — earthquakes, volcanoes, weathering, erosion, deposition.", keywords: ["earthquake","volcano","weathering","erosion","deposition","plate tectonics","seismograph","landslide"] },
      { id: "ss_g4",  num: "G-4",  strand: "Geography", title: "Air",                                              desc: "Composition of air (N₂ 78%, O₂ 21%), layers of atmosphere, weather vs climate, humidity, wind, precipitation.", keywords: ["atmosphere","troposphere","stratosphere","mesosphere","weather","climate","humidity","precipitation","ozone"] },
      { id: "ss_g5",  num: "G-5",  strand: "Geography", title: "Water",                                            desc: "Water distribution, water cycle (evaporation, condensation, precipitation), ocean currents, tides.", keywords: ["water cycle","ocean","tide","river","salinity","current","precipitation","evaporation","condensation"] },
      { id: "ss_g6",  num: "G-6",  strand: "Geography", title: "Natural Vegetation and Wildlife",                 desc: "Forest types, grasslands, deserts, adaptation of animals and plants, biodiversity conservation.", keywords: ["vegetation","forest","grassland","desert","tropical","temperate","adaptation","wildlife","biodiversity"] },
      { id: "ss_g7",  num: "G-7",  strand: "Geography", title: "Human Environment — Settlement, Transport and Communication", desc: "Rural vs urban settlements, modes of transport (road, rail, air, water), communication technology.", keywords: ["settlement","rural","urban","transport","road","rail","air","communication","internet","migration"] },
      { id: "ss_g8",  num: "G-8",  strand: "Geography", title: "Human-Environment Interactions: Tropical and Subtropical Regions", desc: "Amazon rainforest lifestyle, Ganga-Brahmaputra plains — people, climate, occupations.", keywords: ["tropical","amazon","rainforest","ganga","brahmaputra","monsoon","delta","alluvial soil"] },
      { id: "ss_g9",  num: "G-9",  strand: "Geography", title: "Life in the Temperate Grasslands",               desc: "Prairies (North America), Velds (South Africa) — climate, vegetation, people and occupations.", keywords: ["temperate grassland","prairie","veld","steppe","wheat","corn","shepherd","buffalo"] },
      /* — CIVICS / POLITICAL SCIENCE STRAND — */
      { id: "ss_c1",  num: "C-1",  strand: "Civics", title: "On Equality",                                        desc: "Equality in democracy, Universal Adult Franchise, constitutional equality (Art. 14–17), dignity.", keywords: ["equality","democracy","franchise","discrimination","dignity","constitution","article 14","article 17"] },
      { id: "ss_c2",  num: "C-2",  strand: "Civics", title: "Role of the Government in Health",                   desc: "Public vs private health services, government's responsibility, primary health care, case studies.", keywords: ["health","government","public health","hospital","primary health care","policy","welfare"] },
      { id: "ss_c3",  num: "C-3",  strand: "Civics", title: "How the State Government Works",                     desc: "State legislature (Vidhan Sabha), MLAs, Chief Minister, Cabinet, governor, elections and governance.", keywords: ["MLA","chief minister","legislature","cabinet","state government","assembly","constituency","governor"] },
      { id: "ss_c4",  num: "C-4",  strand: "Civics", title: "Growing Up as Boys and Girls",                       desc: "Gender roles and stereotypes, domestic work, valuing all types of work, equality.", keywords: ["gender","stereotype","domestic work","equality","society","role","discrimination","bias"] },
      { id: "ss_c5",  num: "C-5",  strand: "Civics", title: "Women Change the World",                             desc: "Women's education and literacy struggles, Rokeya Sakhawat Hossain, women's achievements.", keywords: ["women","education","literacy","rights","rokeya","gender bias","achievement","movement"] },
      { id: "ss_c6",  num: "C-6",  strand: "Civics", title: "Understanding Media",                                desc: "Types of mass media (TV, radio, newspaper, internet), media and democracy, accountability.", keywords: ["media","television","radio","newspaper","journalism","democracy","press","accountability"] },
      { id: "ss_c7",  num: "C-7",  strand: "Civics", title: "Understanding Advertising",                          desc: "How advertisements work, brand values, stereotypes in advertising, social messaging.", keywords: ["advertisement","brand","consumer","marketing","stereotype","social media","commercial","propaganda"] },
      { id: "ss_c8",  num: "C-8",  strand: "Civics", title: "Markets Around Us",                                  desc: "Retail vs wholesale markets, weekly markets, shopping complexes, producers and consumers, supply chain.", keywords: ["market","retail","wholesale","consumer","producer","supply chain","shopping","weekly market"] }
    ],

    /* ══════════════════════════════════
       ENGLISH — NCERT Poorvi (2026-27)
       Replaces Honeycomb in new curriculum
    ══════════════════════════════════ */
    English: [
      { id: "e_ch1",  num: 1,  title: "Three Questions (Leo Tolstoy)",                   desc: "A king seeks answers: Who is the most important person? What is the right time? What is the right action?", keywords: ["three questions","tolstoy","king","present moment","hermit","enemy","moral lesson"] },
      { id: "e_ch2",  num: 2,  title: "A Gift of Chappals",                               desc: "Mridu visits cousins, finds a stray kitten, and compassionately gives away grandfather's chappals.", keywords: ["chappal","mridu","grandfather","cat","compassion","gift","family","Poorvi"] },
      { id: "e_ch3",  num: 3,  title: "The Tiny Teacher",                                 desc: "Informational text about ants — their colony, communication, work division, and life cycle.", keywords: ["ant","colony","queen","worker","soldier","tiny teacher","insect","communication"] },
      { id: "e_ch4",  num: 4,  title: "Gopal and the Hilsa-Fish",                        desc: "Witty story — Gopal carries a Hilsa-fish through town without anyone talking about it to win a bet.", keywords: ["gopal","hilsa","fish","king","bet","clever","distraction","humour"] },
      { id: "e_ch5",  num: 5,  title: "Quality (John Galsworthy)",                       desc: "German shoemaker Gessler refuses to compromise on craftsmanship even as mass-produced boots ruin his business.", keywords: ["quality","shoemaker","gessler","craftsmanship","pride","galsworthy","mass production","dedication"] },
      { id: "e_ch6",  num: 6,  title: "Expert Detectives",                               desc: "Maya and Nishad befriend the reclusive Mr Nath and try to figure out his mysterious background.", keywords: ["detective","mr nath","maya","nishad","mystery","recluse","investigation","friend"] },
      { id: "e_ch7",  num: 7,  title: "The Invention of Vita-Wonk (Roald Dahl)",        desc: "Mr Wonka invents a potion that makes people older — a fantastical science-fiction story.", keywords: ["vita-wonk","wonka","roald dahl","invention","age","potion","fiction","fantasy"] },
      { id: "e_ch8",  num: 8,  title: "Fire: Friend and Foe",                            desc: "Informational essay on the history of fire, the fire triangle (fuel, heat, oxygen), and fire safety.", keywords: ["fire","combustion","oxygen","triangle of fire","extinguisher","safety","fossil fuel","discovery"] },
      { id: "e_ch9",  num: 9,  title: "A Bicycle in Good Repair (Jerome K. Jerome)",    desc: "Humorous story about a friend who 'repairs' Jerome's bicycle by dismantling it completely.", keywords: ["bicycle","humor","repair","jerome","friend","comedy","machine","sarcasm"] },
      { id: "e_ch10", num: 10, title: "The Story of Cricket",                            desc: "Evolution of cricket from 16th-century England — rules, equipment, famous matches, India's rise.", keywords: ["cricket","history","england","test match","bat","wicket","over","sport","India","IPL"] }
    ],

    /* ══════════════════════════════════
       HINDI — NCERT Malhar (2026-27)
       Replaces Vasant in new curriculum
    ══════════════════════════════════ */
    Hindi: [
      { id: "hi_ch1",  num: 1,  title: "हम पंछी उन्मुक्त গগन के (शिवमंगल सिंह 'सुमन')",  desc: "स्वतंत्रता की चाह में पक्षियों का गीत — पिंजरे की कैद से मुक्ति की आकांक्षा।", keywords: ["पक्षी","स्वतंत्रता","पिंजरा","গগন","उड़ान","Malhar","hum panchhi"] },
      { id: "hi_ch2",  num: 2,  title: "दादी माँ (शिवप्रसाद सिंह)",                          desc: "पोते और दादी माँ का मार्मिक संबंध — त्याग, ममता और परिवार की गहरी याद।", keywords: ["दादी","परिवार","त्याग","ममता","बचपन","relationship","daadi maa"] },
      { id: "hi_ch3",  num: 3,  title: "हिमालय की बेटियाँ (नागार्जुन)",                     desc: "नदियों को हिमालय की बेटियाँ कहकर उनकी प्रकृति और महत्ता का वर्णन।", keywords: ["हिमालय","नदी","गंगा","यमुना","river","daughters","nature"] },
      { id: "hi_ch4",  num: 4,  title: "कठपुतली (भवानीप्रसाद मिश्र)",                       desc: "कठपुतलियाँ धागे से मुक्ति की बात करती हैं — स्वतंत्रता का जीवंत प्रतीक।", keywords: ["कठपुतली","धागा","मुक्ति","स्वतंत्रता","puppet","freedom","kathputli"] },
      { id: "hi_ch5",  num: 5,  title: "मिठाईवाला (भगवतीप्रसाद वाजपेयी)",                  desc: "एक मिठाई बेचने वाले की मार्मिक कहानी जो बच्चों में अपने खोए बच्चों की झलक पाता है।", keywords: ["मिठाई","बच्चे","मिठाईवाला","sweetmeat","seller","sorrow","compassion"] },
      { id: "hi_ch6",  num: 6,  title: "रक्त और हमारा शरीर (यतीश अग्रवाल)",               desc: "रक्त के घटक — RBC, WBC, प्लेटलेट्स, रक्त समूह (A,B,AB,O) और रक्तदान का महत्व।", keywords: ["रक्त","blood","RBC","WBC","platelet","blood group","hemoglobin","donation"] },
      { id: "hi_ch7",  num: 7,  title: "पापा खो गए (विजय तेंडुलकर)",                       desc: "एक बच्ची और जानवरों की मदद से उसे सुरक्षित घर पहुँचाने की नाटकीय एवं भावपूर्ण कहानी।", keywords: ["पापा","खो गए","बच्ची","safety","drama","vijay tendulkar","child"] },
      { id: "hi_ch8",  num: 8,  title: "शाम — एक किसान (सर्वेश्वर दयाल सक्सेना)",         desc: "शाम के वातावरण में प्रकृति की सुंदरता और किसान की थकान का काव्यात्मक चित्रण।", keywords: ["शाम","किसान","प्रकृति","sunset","farmer","poetry","nature","Malhar"] },
      { id: "hi_ch9",  num: 9,  title: "चिड़िया की बच्ची (जैनेंद्र कुमार)",                desc: "मानवीय संवेदना और एक घायल चिड़िया के प्रति करुणा की भावनात्मक कहानी।", keywords: ["चिड़िया","पक्षी","करुणा","compassion","bird","chidiya","injured"] },
      { id: "hi_ch10", num: 10, title: "अपूर्व अनुभव (सुनीता विलियम्स पर आधारित)",       desc: "अंतरिक्ष यात्री सुनीता विलियम्स के ISS पर जीवन के अनुभव — भारोहीनता, दिनचर्या।", keywords: ["अंतरिक्ष","सुनीता विलियम्स","space","astronaut","ISS","weightlessness"] },
      { id: "hi_ch11", num: 11, title: "रहीम के दोहे",                                       desc: "अब्दुर्रहीम खान-ए-खाना के प्रसिद्ध दोहे — नीति, जीवन-दर्शन और मानवीय मूल्य।", keywords: ["रहीम","दोहे","rahim","dohe","नीति","couplets","wisdom","values"] },
      { id: "hi_ch12", num: 12, title: "कंचा (इस्मत चुगताई)",                               desc: "बचपन में कंचे के प्रति दीवानगी की मजेदार और भावनात्मक स्मृति कथा।", keywords: ["कंचा","बचपन","marble","childhood","game","ismat chughtai","memory"] }
    ],

    /* ══════════════════════════════════
       TAMIL — Samacheer Kalvi / TNTEXTBOOKS
       7th Standard Tamil (Term I, II, III)
    ══════════════════════════════════ */
    Tamil: [
      /* — TERM I — */
      { id: "ta_t1_ch1", num: "T1-1", term: "Term I", title: "என் தமிழே (கவிதை)",                    desc: "தமிழ் மொழியின் சிறப்பை வாழ்த்தும் கவிதை — தமிழ்த் தாய் வாழ்த்து.", keywords: ["tamil","தமிழ்","language","poetry","kavithai","en thamizhe"] },
      { id: "ta_t1_ch2", num: "T1-2", term: "Term I", title: "இலக்கணம் — பெயர்ச்சொல், வினைச்சொல்", desc: "தமிழ் இலக்கணம்: பெயர்ச்சொல் (noun) மற்றும் வினைச்சொல் (verb) வகைகள் மற்றும் பயன்கள்.", keywords: ["noun","verb","பெயர்ச்சொல்","வினைச்சொல்","grammar","ilakkanam","Tamil grammar"] },
      { id: "ta_t1_ch3", num: "T1-3", term: "Term I", title: "கதை — ஒரு விவசாயியின் கனவு",           desc: "நிலத்தை நேசிக்கும் ஒரு விவசாயி மற்றும் அவரது கனவு குறித்த ஊக்கமளிக்கும் கதை.", keywords: ["farmer","vivasayi","dream","land","story","kathai","agriculture"] },
      { id: "ta_t1_ch4", num: "T1-4", term: "Term I", title: "திருக்குறள் — அன்பு அதிகாரம்",        desc: "வள்ளுவரின் காதல் மற்றும் அன்பு குறித்த திருக்குறள் பாடல்கள் — விளக்கம் மற்றும் பொருள்.", keywords: ["thirukkural","valluvar","love","anbu","couplet","kural","ethics"] },
      { id: "ta_t1_ch5", num: "T1-5", term: "Term I", title: "வரலாற்று பாடம் — சங்க காலம்",        desc: "சங்க இலக்கியம், அகம் மற்றும் புறம் பாடல்கள், சங்ககால வாழ்க்கை முறை.", keywords: ["sangam","சங்கம்","akam","puram","literature","ancient Tamil","history"] },
      /* — TERM II — */
      { id: "ta_t2_ch1", num: "T2-1", term: "Term II", title: "இலக்கணம் — இடைச்சொல், உரிச்சொல்",  desc: "தமிழ் இலக்கணம்: இடைச்சொல் (particle) மற்றும் உரிச்சொல் (intensifier) வகைகள்.", keywords: ["particle","idaichol","uri","Tamil grammar","parts of speech","இலக்கணம்"] },
      { id: "ta_t2_ch2", num: "T2-2", term: "Term II", title: "கவிதை — தாய்த்திரு நாடு",            desc: "தாய்நாட்டின் மீது அன்பு மற்றும் பற்று பற்றிய தேசியப் கவிதை.", keywords: ["patriotism","தாய்நாடு","nation","kavithai","poetry","motherland"] },
      { id: "ta_t2_ch3", num: "T2-3", term: "Term II", title: "கதை — புத்திசாலி யார்?",              desc: "ஒரு மன்னர் மற்றும் மூன்று சகோதரர்களின் அறிவுக்கான போட்டியைப் பற்றிய நகைச்சுவை கதை.", keywords: ["clever","puththisali","king","brothers","wisdom","kathai","story"] },
      { id: "ta_t2_ch4", num: "T2-4", term: "Term II", title: "திருக்குறள் — ஒழுக்கம் அதிகாரம்",   desc: "வள்ளுவர் கூறும் ஒழுக்கத்தின் சிறப்பு — வாழ்க்கையில் நடத்தையின் முக்கியத்துவம்.", keywords: ["thirukkural","ethics","conduct","ozhukkam","valluvar","morals","discipline"] },
      { id: "ta_t2_ch5", num: "T2-5", term: "Term II", title: "இலக்கியம் — சிலப்பதிகாரம் அறிமுகம்", desc: "ஐம்பெருங்காப்பியங்களில் ஒன்றான சிலப்பதிகாரம் — கோவலன், கண்ணகி கதை அறிமுகம்.", keywords: ["silappathikaram","kovalan","kannagi","epic","ilangovadigal","classical Tamil","literature"] },
      /* — TERM III — */
      { id: "ta_t3_ch1", num: "T3-1", term: "Term III", title: "இலக்கணம் — சொல் வகைகள் மீள்பார்வை", desc: "பெயர்ச்சொல், வினைச்சொல், இடைச்சொல், உரிச்சொல் — அனைத்து வகைகளும் மீட்டல்.", keywords: ["parts of speech","Tamil grammar","revision","sol vagaikal","noun","verb","particle"] },
      { id: "ta_t3_ch2", num: "T3-2", term: "Term III", title: "கவிதை — இயற்கை அழகு",               desc: "தமிழ் நாட்டின் இயற்கை அழகை வருணிக்கும் கவிதை — மலை, காடு, நதி, கடல்.", keywords: ["nature","iyal kai","mountain","forest","river","sea","beauty","kavithai"] },
      { id: "ta_t3_ch3", num: "T3-3", term: "Term III", title: "கதை — மன்னன் மன்னிப்பு",             desc: "தவறை ஒப்புக்கொண்டு மன்னிப்பு கேட்பதன் மகத்துவத்தை விளக்கும் கதை.", keywords: ["forgiveness","king","mannipu","mistake","story","kathai","character","moral"] },
      { id: "ta_t3_ch4", num: "T3-4", term: "Term III", title: "திருக்குறள் — கல்வி அதிகாரம்",      desc: "கல்வியின் சிறப்பு — வள்ளுவர் கூறும் கற்றலின் அவசியம் மற்றும் ஞானத்தின் மதிப்பு.", keywords: ["education","karppu","thirukkural","knowledge","learning","valluvar","wisdom","kural"] },
      { id: "ta_t3_ch5", num: "T3-5", term: "Term III", title: "இலக்கியம் — கம்பராமாயணம் அறிமுகம்", desc: "கம்பரின் ராமாயணம் — இராமன், சீதை, இலட்சுமணன் கதாப்பாத்திரங்கள் மற்றும் சிறப்பு.", keywords: ["kambaramayanam","kambar","rama","sita","lakshmana","ramayana","Tamil epic","literature"] }
    ],

    /* ══════════════════════════════════
       COMPUTER SCIENCE (AI & Computational Thinking — 2026-27)
       Enhanced per NEP 2020 focus on Coding & AI
    ══════════════════════════════════ */
    "Computer Science": [
      { id: "cs_ch1", num: 1, title: "Introduction to Computers and ICT",          desc: "History, generations (1st–5th), types (micro, mini, mainframe, supercomputer), ICT and digital world.", keywords: ["computer","ICT","generation","hardware","software","supercomputer","mainframe","digital"] },
      { id: "cs_ch2", num: 2, title: "Input and Output Devices",                    desc: "Keyboard, mouse, scanner, microphone, monitor, printer, speaker — functions, examples, and I/O processing.", keywords: ["input","output","keyboard","mouse","monitor","printer","scanner","microphone","touchscreen"] },
      { id: "cs_ch3", num: 3, title: "MS Windows and File Management",              desc: "Desktop, taskbar, files, folders, creating/renaming/deleting, clipboard operations, Control Panel.", keywords: ["windows","operating system","desktop","folder","file","taskbar","control panel","clipboard"] },
      { id: "cs_ch4", num: 4, title: "MS Word — Advanced Features",                desc: "Formatting tools, headers/footers, tables, mail merge, spell check, WordArt, clipboard.", keywords: ["ms word","formatting","header","footer","mail merge","spell check","table","font","wordart"] },
      { id: "cs_ch5", num: 5, title: "MS Excel — Spreadsheets",                     desc: "Worksheets, cells, rows, columns, formulas (SUM, AVERAGE, MAX, MIN), charts, absolute/relative references.", keywords: ["excel","spreadsheet","cell","formula","SUM","AVERAGE","chart","row","column","absolute reference"] },
      { id: "cs_ch6", num: 6, title: "Introduction to the Internet",                desc: "Internet history, URL, HTTP/HTTPS, web browsers, search engines, email, social media, cyber safety.", keywords: ["internet","browser","URL","search engine","email","website","http","https","safety","cyber"] },
      { id: "cs_ch7", num: 7, title: "Algorithms, Flowcharts and Scratch Programming", desc: "What is an algorithm, flowchart symbols (start/end, process, decision, I/O), pseudocode, Scratch basics.", keywords: ["algorithm","flowchart","pseudocode","scratch","programming","sequence","loop","condition","decision"] },
      { id: "cs_ch8", num: 8, title: "Introduction to Artificial Intelligence",     desc: "What is AI, machine learning basics, AI applications (face recognition, voice assistants), ethics of AI.", keywords: ["artificial intelligence","AI","machine learning","voice assistant","robot","ethics","data","automation"] }
    ]
  };

  /* ─────────────────────────────────────────────
     QUIZ QUESTION BANK (CBSE 2026-27)
  ───────────────────────────────────────────── */
  const QUIZ_BANK = {
    Science: {
      ch2: [
        { q: "What colour does blue litmus paper turn in an acid?", options: ["Remains blue", "Turns red", "Turns yellow", "Turns green"], answer: 1, explain: "Acids turn blue litmus paper red. This is a key identifying property of acids." },
        { q: "Which of the following is a base?", options: ["Lemon juice", "Vinegar", "Baking soda (NaHCO₃)", "Tamarind juice"], answer: 2, explain: "Baking soda is a base (alkali). It tastes bitter, feels soapy, and turns red litmus blue." },
        { q: "What is produced when acid + base react?", options: ["More acid", "Salt and water", "Carbon dioxide only", "Hydrogen gas only"], answer: 1, explain: "Acid + Base → Salt + Water + Heat. This neutralization reaction produces salt and water." },
        { q: "Which natural indicator turns pink/red in acid and green in base?", options: ["Litmus", "Turmeric", "Red cabbage juice", "Phenolphthalein"], answer: 2, explain: "Red cabbage juice (anthocyanin) turns pink/red in acids and green/yellow in bases." },
        { q: "The pH value of a neutral substance is:", options: ["0", "7", "14", "1"], answer: 1, explain: "Neutral substances (like pure water) have a pH of exactly 7. Below 7 = acid, above 7 = base." }
      ],
      ch3: [
        { q: "A battery is defined as:", options: ["A single cell", "Two or more cells connected together", "A fuse wire", "A current meter"], answer: 1, explain: "A battery is a combination of two or more cells joined positive-to-negative." },
        { q: "Which device uses the magnetic effect of electric current?", options: ["Electric Heater", "Electric Fuse", "Electric Bell", "Electric Iron"], answer: 2, explain: "An electric bell uses an electromagnet (magnetic effect) to strike a gong repeatedly." },
        { q: "A fuse wire melts when:", options: ["Voltage drops", "Current exceeds safe limit", "Temperature falls", "Resistance is zero"], answer: 1, explain: "Fuse wire has a low melting point. Excess current causes it to melt, safely breaking the circuit." },
        { q: "Who discovered that current creates a magnetic field?", options: ["Edison", "Hans Christian Oersted", "Faraday", "Newton"], answer: 1, explain: "Oersted (1820) first observed that a compass needle deflected near a current-carrying wire." },
        { q: "What effect is used in an electric toaster?", options: ["Magnetic effect", "Chemical effect", "Heating effect", "Lighting effect"], answer: 2, explain: "A toaster uses Nichrome wire that heats due to resistance when current passes — the heating effect." }
      ],
      ch8: [
        { q: "The angle of incidence always equals:", options: ["Angle of refraction", "Angle of reflection", "Angle of deviation", "Critical angle"], answer: 1, explain: "Law of Reflection: angle of incidence = angle of reflection (both measured from the normal)." },
        { q: "A concave mirror is also called a:", options: ["Diverging mirror", "Converging mirror", "Plane mirror", "Flat mirror"], answer: 1, explain: "A concave mirror converges incoming parallel light rays to a focal point — hence 'converging mirror'." },
        { q: "Which mirror is used in vehicle rear-view mirrors?", options: ["Concave", "Plane", "Convex", "Parabolic"], answer: 2, explain: "Convex mirrors diverge light and provide a wider field of view — ideal for rear-view mirrors." },
        { q: "Refraction occurs because light travels at:", options: ["Same speed everywhere", "Different speeds in different media", "Infinite speed in glass", "Zero speed in water"], answer: 1, explain: "Light bends (refracts) when it moves between media because its speed changes (e.g., faster in air, slower in glass)." },
        { q: "Which part of the eye controls the amount of light entering?", options: ["Retina", "Lens", "Iris", "Cornea"], answer: 2, explain: "The iris controls the pupil size, regulating the amount of light entering the eye." }
      ]
    },

    Mathematics: {
      ch2: [
        { q: "Solve: 40 ÷ (5 × 2) − 3", options: ["5", "1", "13", "0"], answer: 1, explain: "BODMAS: Brackets first (5×2=10), then 40÷10=4, then 4−3=1." },
        { q: "In BODMAS, 'O' stands for:", options: ["Operation", "Of (Exponents/Orders)", "Over", "Object"], answer: 1, explain: "'O' in BODMAS stands for 'Of' representing exponents, powers, or square roots." },
        { q: "Calculate: 18 − 6 ÷ 2 + 5", options: ["11", "20", "14", "9"], answer: 1, explain: "Division first: 6÷2=3. Then left-to-right: 18−3+5 = 20." },
        { q: "Simplify: 5 × [12 − (4 + 3)]", options: ["25", "45", "15", "53"], answer: 0, explain: "Inner brackets: 4+3=7. Outer: 12−7=5. Multiply: 5×5=25." },
        { q: "Which operation comes first in: 14 + 3 × 2 − 8 ÷ 4?", options: ["Addition", "Multiplication & Division", "Subtraction", "Left to right"], answer: 1, explain: "BODMAS: Multiplication and Division come before Addition and Subtraction." }
      ],
      ch7: [
        { q: "Solve for x: 2x + 5 = 13", options: ["x = 3", "x = 4", "x = 9", "x = 6"], answer: 1, explain: "Transpose 5: 2x = 8. Divide by 2: x = 4." },
        { q: "Solve for y: 3y − 7 = 11", options: ["y = 6", "y = 4", "y = 18", "y = 3"], answer: 0, explain: "Transpose −7: 3y = 18. Divide by 3: y = 6." },
        { q: "If 5x = 35, find x:", options: ["5", "6", "7", "8"], answer: 2, explain: "Divide both sides by 5: x = 35 ÷ 5 = 7." },
        { q: "Solve: x/4 + 3 = 7", options: ["x = 8", "x = 16", "x = 4", "x = 28"], answer: 1, explain: "Transpose 3: x/4 = 4. Multiply by 4: x = 16." },
        { q: "Which equation means '6 more than twice y equals 22'?", options: ["y + 6 = 22", "2y + 6 = 22", "2y − 6 = 22", "6y + 2 = 22"], answer: 1, explain: "'Twice y' = 2y; '6 more' = +6. So equation is 2y + 6 = 22." }
      ],
      ch8: [
        { q: "Sum of angles in a triangle equals:", options: ["90°", "180°", "270°", "360°"], answer: 1, explain: "Angle Sum Property: all three interior angles of any triangle add up to 180°." },
        { q: "In a right triangle with sides 3 cm and 4 cm, the hypotenuse is:", options: ["5 cm", "7 cm", "6 cm", "12 cm"], answer: 0, explain: "Pythagoras: hyp² = 3² + 4² = 9+16=25. Hypotenuse = 5 cm." },
        { q: "Exterior angle of a triangle equals:", options: ["The adjacent interior angle", "Sum of the two non-adjacent interior angles", "180°", "90°"], answer: 1, explain: "Exterior Angle Theorem: exterior angle = sum of the two remote (non-adjacent) interior angles." },
        { q: "A triangle with all three sides equal is:", options: ["Scalene", "Isosceles", "Equilateral", "Right-angled"], answer: 2, explain: "Equilateral triangle: all three sides equal, all angles = 60°." },
        { q: "Which is true about an isosceles triangle?", options: ["All sides different", "Two sides are equal", "All angles are 60°", "Always has a right angle"], answer: 1, explain: "Isosceles triangle has exactly two equal sides, and the base angles opposite those sides are also equal." }
      ]
    },

    "Social Science": {
      ss_h3: [
        { q: "Who founded the Delhi Sultanate?", options: ["Babur", "Iltutmish", "Qutb-ud-din Aibak", "Balban"], answer: 2, explain: "Qutb-ud-din Aibak (1206) founded the Delhi Sultanate, beginning the Slave (Mamluk) Dynasty." },
        { q: "Who was the first female ruler of Delhi Sultanate?", options: ["Mumtaz Mahal", "Razia Sultan", "Noor Jahan", "Chand Bibi"], answer: 1, explain: "Razia Sultan (1236–1240) was the only female sultan who ruled independently from Delhi." },
        { q: "The Iqta system involved:", options: ["A tax on farmers", "Grant of land revenue collection rights to military officers", "A religious court", "Type of army"], answer: 1, explain: "Iqta was a system where revenue collection rights from a territory were granted to a military official (iqtadar)." },
        { q: "Which dynasty ruled FIRST in the Delhi Sultanate?", options: ["Lodi", "Tughlaq", "Slave Dynasty", "Sayyid"], answer: 2, explain: "The Slave (Mamluk) Dynasty (1206–1290) was the first of the five dynasties of the Delhi Sultanate." },
        { q: "Qutub Minar was begun by:", options: ["Akbar", "Qutb-ud-din Aibak and completed by Iltutmish", "Shah Jahan", "Humayun"], answer: 1, explain: "Qutb-ud-din Aibak started construction; his successor Iltutmish completed and added storeys to the Qutub Minar." }
      ],
      ss_g4: [
        { q: "Which atmospheric layer contains the ozone layer?", options: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"], answer: 1, explain: "The ozone layer is in the stratosphere (15–35 km), absorbing harmful UV radiation from the sun." },
        { q: "Where does all weather occur?", options: ["Stratosphere", "Mesosphere", "Thermosphere", "Troposphere"], answer: 3, explain: "All weather phenomena (rain, snow, wind, clouds) occur in the troposphere (0–12 km)." },
        { q: "Wind blows from:", options: ["Low to high pressure", "High to low pressure", "Equal to equal pressure", "Cold to warm"], answer: 1, explain: "Wind always moves from areas of high atmospheric pressure to areas of low atmospheric pressure." },
        { q: "Humidity refers to:", options: ["Amount of rainfall", "Amount of water vapour in air", "Air temperature", "Air pressure"], answer: 1, explain: "Humidity is the measure of water vapour content in the atmosphere. High humidity = more moisture in air." },
        { q: "What percentage of the atmosphere is nitrogen?", options: ["21%", "1%", "78%", "50%"], answer: 2, explain: "Nitrogen makes up ~78% of Earth's atmosphere. Oxygen is ~21%, and other gases make up ~1%." }
      ],
      ss_c1: [
        { q: "Universal Adult Franchise means:", options: ["Only educated adults vote", "All adults 18+ can vote regardless of caste/religion/gender", "Only wealthy citizens vote", "Voting by politicians only"], answer: 1, explain: "In India, all citizens aged 18+ have the right to vote, regardless of caste, gender, religion, or wealth." },
        { q: "Which article abolishes untouchability?", options: ["Article 14", "Article 15", "Article 17", "Article 21"], answer: 2, explain: "Article 17 of the Indian Constitution abolishes untouchability and makes its practice an offence." },
        { q: "Equality before law means:", options: ["Rich get better protection", "All persons get equal legal protection without discrimination", "Only upper castes are equal", "Adults only"], answer: 1, explain: "Article 14 guarantees equal protection of laws to all persons within India — no one is above the law." },
        { q: "Rosa Parks became a civil rights symbol by:", options: ["Becoming a President", "Refusing to give up her bus seat to a white man", "Writing the US Constitution", "Starting a school"], answer: 1, explain: "Rosa Parks refused to give up her seat on a Montgomery bus in 1955, sparking the US Civil Rights Movement." },
        { q: "The Indian Constitution came into effect on:", options: ["15 August 1947", "26 January 1950", "26 November 1949", "2 October 1948"], answer: 1, explain: "The Indian Constitution came into effect (was enacted) on 26 January 1950 — celebrated as Republic Day." }
      ]
    },

    English: {
      ch1: [
        { q: "In 'Three Questions', who reveals the answers to the king?", options: ["Prime Minister", "The Hermit (through events)", "A wounded man", "His general"], answer: 1, explain: "The hermit doesn't directly answer — through the day's events (saving a wounded man), the king discovers the answers himself." },
        { q: "According to the story, the most important time is:", options: ["The past", "The future", "The present moment", "Morning"], answer: 2, explain: "Tolstoy's moral: the present moment is the most important time, as it is the only time when you can act." },
        { q: "Who wrote 'Three Questions'?", options: ["Ruskin Bond", "R.K. Narayan", "Leo Tolstoy", "Anton Chekhov"], answer: 2, explain: "Leo Tolstoy, the great Russian novelist and moral philosopher, wrote 'Three Questions'." },
        { q: "The king visits the hermit because:", options: ["To steal", "Hermits only see common people", "To deliver a message", "To test the hermit"], answer: 1, explain: "The hermit only received common people, so the king disguised himself, leaving his horse and guards behind." },
        { q: "The wounded man was:", options: ["A friend of the king", "An enemy who had come to kill the king", "A lost traveller", "The hermit's helper"], answer: 1, explain: "He was the king's enemy who had ambushed the bodyguards. The king saved his life, making him a loyal friend." }
      ],
      ch5: [
        { q: "In 'Quality', the shoemaker's name was:", options: ["Mr. Smith", "Gessler", "Galsworthy", "Henry"], answer: 1, explain: "The shoemaker protagonist was named Gessler — a German craftsman of exceptional quality." },
        { q: "The main theme of 'Quality' is:", options: ["Importance of money", "Value of true craftsmanship over profit", "Evils of capitalism", "A love story"], answer: 1, explain: "Galsworthy celebrates Gessler's absolute dedication to making perfect boots — even at the cost of his own life." },
        { q: "Why does Gessler's business decline?", options: ["He makes bad shoes", "He moves away", "Mass-produced, advertised boots attract customers away", "He retires"], answer: 2, explain: "Large manufacturers with cheap machine-made boots and advertising drew customers away from Gessler's handcrafted shop." },
        { q: "Who wrote 'Quality'?", options: ["O. Henry", "John Galsworthy", "Roald Dahl", "Jerome K. Jerome"], answer: 1, explain: "John Galsworthy (1867–1933), British author and Nobel Laureate (1932), wrote 'Quality'." },
        { q: "At the end, the narrator learns Gessler had:", options: ["Moved abroad", "Retired happily", "Died of starvation while still working", "Sold his shop for profit"], answer: 2, explain: "Gessler literally starved to death — spending all his earnings on leather, refusing to advertise or compromise quality." }
      ]
    },

    Tamil: {
      term1: [
        { q: "திருக்குறளின் ஆசிரியர் யார்?", options: ["கம்பர்", "திருவள்ளுவர்", "இளங்கோவடிகள்", "சுந்தரர்"], answer: 1, explain: "திருக்குறளை இயற்றியவர் திருவள்ளுவர் — இவர் 133 அதிகாரங்களில் 1330 குறள்கள் எழுதியுள்ளார்." },
        { q: "சிலப்பதிகாரத்தின் ஆசிரியர் யார்?", options: ["கம்பர்", "திருவள்ளுவர்", "இளங்கோவடிகள்", "நக்கீரர்"], answer: 2, explain: "சிலப்பதிகாரம் என்னும் காப்பியத்தை இயற்றியவர் இளங்கோவடிகள்." },
        { q: "சங்க இலக்கியம் எந்த இரண்டு வகையாக பிரிக்கப்படுகிறது?", options: ["அகம் மற்றும் புறம்", "கதை மற்றும் கவிதை", "உரைநடை மற்றும் செய்யுள்", "தமிழ் மற்றும் சமஸ்கிருதம்"], answer: 0, explain: "சங்க இலக்கியம் அகம் (காதல் பற்றியது) மற்றும் புறம் (வீரம், அரசு, சமூகம் பற்றியது) என இரண்டு வகையாக பிரிக்கப்படுகிறது." },
        { q: "பெயர்ச்சொல் என்பது:", options: ["செயலை குறிக்கும் சொல்", "பொருள், இடம், நபர் ஆகியவற்றின் பெயரை குறிக்கும் சொல்", "உணர்வை வெளிப்படுத்தும் சொல்", "செயல்படுவோரை குறிக்கும் சொல்"], answer: 1, explain: "பெயர்ச்சொல் (Noun) என்பது ஒரு பொருள், இடம், நபர் அல்லது கருத்தின் பெயரை குறிக்கும் சொல்." },
        { q: "திருக்குறளில் எத்தனை அதிகாரங்கள் உள்ளன?", options: ["100", "133", "108", "150"], answer: 1, explain: "திருக்குறளில் மொத்தம் 133 அதிகாரங்கள் உள்ளன — ஒவ்வொரு அதிகாரத்திலும் 10 குறள்கள் உள்ளன, மொத்தம் 1330 குறள்கள்." }
      ],
      term2: [
        { q: "கம்பராமாயணத்தின் ஆசிரியர் யார்?", options: ["திருவள்ளுவர்", "இளங்கோவடிகள்", "கம்பர்", "ஔவையார்"], answer: 2, explain: "கம்பராமாயணத்தை இயற்றியவர் கம்பர் — இது வால்மீகி ராமாயணத்தின் தமிழாக்கம்." },
        { q: "சிலப்பதிகாரத்தின் கதாநாயகி யார்?", options: ["சீதை", "கண்ணகி", "திரௌபதி", "மீராபாய்"], answer: 1, explain: "சிலப்பதிகாரத்தின் கதாநாயகி கண்ணகி — கோவலனின் மனைவி; நீதிக்காக போர்த்த மாதர்." },
        { q: "வினைச்சொல் என்பது:", options: ["பொருளின் பெயரை குறிக்கும் சொல்", "செயலை குறிக்கும் சொல்", "உணர்வை வெளிப்படுத்தும் சொல்", "இடத்தை குறிக்கும் சொல்"], answer: 1, explain: "வினைச்சொல் (Verb) என்பது ஒரு செயலை அல்லது நிலையை குறிக்கும் சொல். உதாரணம்: ஓடு, படி, பாடு." },
        { q: "திருக்குறள் எத்தனை பால்களாக பிரிக்கப்படுகிறது?", options: ["2", "3", "4", "5"], answer: 1, explain: "திருக்குறள் மூன்று பால்களாக பிரிக்கப்படுகிறது: அறத்துப்பால், பொருட்பால், காமத்துப்பால்." },
        { q: "ஐம்பெருங்காப்பியங்களில் ஒன்று:", options: ["திருக்குறள்", "சிலப்பதிகாரம்", "புறநானூறு", "அகநானூறு"], answer: 1, explain: "சிலப்பதிகாரம் ஐம்பெருங்காப்பியங்களில் ஒன்று — மற்றவை: மணிமேகலை, சீவக சிந்தாமணி, வளையாபதி, குண்டலகேசி." }
      ]
    },

    "Computer Science": {
      ch5: [
        { q: "In MS Excel, the formula to add A1 to A10 is:", options: ["=ADD(A1:A10)", "=TOTAL(A1:A10)", "=SUM(A1:A10)", "=PLUS(A1:A10)"], answer: 2, explain: "=SUM(A1:A10) adds all values from cell A1 through A10 in Excel." },
        { q: "The intersection of a row and column in Excel is called:", options: ["Field", "Cell", "Box", "Record"], answer: 1, explain: "A cell is the intersection of a row and column (e.g., B3 = Column B, Row 3)." },
        { q: "Which formula finds the average of B1 to B5?", options: ["=AVG(B1:B5)", "=AVERAGE(B1:B5)", "=MEAN(B1:B5)", "=SUM(B1:B5)/4"], answer: 1, explain: "=AVERAGE(B1:B5) is the correct Excel formula for computing the arithmetic mean." },
        { q: "An absolute cell reference in Excel uses:", options: ["@ symbol", "# symbol", "$ symbol", "& symbol"], answer: 2, explain: "Absolute references use the $ sign (e.g., $A$1) to lock the cell reference so it doesn't change when copied." },
        { q: "Best chart type to show trends over time:", options: ["Pie chart", "Bar chart", "Line chart", "Scatter chart"], answer: 2, explain: "Line charts are ideal for displaying data trends over time periods." }
      ],
      ch6: [
        { q: "HTTP stands for:", options: ["High Transfer Text Protocol", "HyperText Transfer Protocol", "Hyper Terminal Transfer Program", "Home Text Transfer Protocol"], answer: 1, explain: "HTTP (HyperText Transfer Protocol) is the protocol for transferring web pages on the internet." },
        { q: "A search engine helps you to:", options: ["Send emails", "Create websites", "Find information online", "Store files online"], answer: 2, explain: "Search engines like Google index web pages and help users find information using keywords." },
        { q: "URL stands for:", options: ["Unique Resource Link", "Uniform Resource Locator", "Unified Resource Language", "Universal Reference Locator"], answer: 1, explain: "URL (Uniform Resource Locator) is the unique address of a resource on the internet." },
        { q: "Which is a web browser?", options: ["MS Word", "Google Chrome", "MS Excel", "Photoshop"], answer: 1, explain: "Google Chrome is a web browser. Other browsers include Firefox, Safari, and Edge." },
        { q: "Safe internet practice:", options: ["Share password with friends", "Download from unknown sites", "Never share personal info with strangers online", "Click all pop-up ads"], answer: 2, explain: "Fundamental cyber safety: never share personal information (name, address, passwords) with unknown people online." }
      ]
    }
  };

  /* ─────────────────────────────────────────────
     AI TUTOR KNOWLEDGE BASE (Offline fallback)
  ───────────────────────────────────────────── */
  const KNOWLEDGE_BASE = {
    "acids": `<h3>Acids, Bases & Salts — Curiosity Ch 2</h3>
      <ul>
        <li><strong>Acids:</strong> Sour taste, turn <strong>blue litmus RED</strong>, pH &lt; 7. Examples: lemon juice, vinegar, HCl.</li>
        <li><strong>Bases:</strong> Bitter taste, soapy feel, turn <strong>red litmus BLUE</strong>, pH &gt; 7. Examples: baking soda, soap, NaOH.</li>
        <li><strong>Neutralization:</strong> Acid + Base → Salt + Water + Heat. pH reaches 7.</li>
        <li><strong>Indicators:</strong> Litmus, turmeric (yellow in acid, red in base), red cabbage juice (anthocyanin).</li>
      </ul>`,
    "electricity": `<h3>Electricity: Circuits & Components — Curiosity Ch 3</h3>
      <ul>
        <li><strong>Battery:</strong> Two or more cells connected positive-to-negative.</li>
        <li><strong>Heating Effect:</strong> Current heats resistance wire — used in irons, toasters, fuses (melt to break overloaded circuit).</li>
        <li><strong>Magnetic Effect:</strong> Current around a wire creates a magnetic field (Oersted, 1820). Electromagnets and electric bells use this.</li>
      </ul>`,
    "changes": `<h3>Physical vs Chemical Changes — Curiosity Ch 5</h3>
      <ul>
        <li><strong>Physical:</strong> No new substance formed. Often reversible. Examples: melting, tearing, dissolving.</li>
        <li><strong>Chemical:</strong> New substance(s) formed. Usually irreversible, may release heat/gas/colour change. Examples: rusting, burning, baking.</li>
      </ul>`,
    "light": `<h3>Light: Reflection & Refraction — Curiosity Ch 8</h3>
      <ul>
        <li><strong>Law of Reflection:</strong> Angle of incidence = Angle of reflection (both from the normal).</li>
        <li><strong>Concave mirror:</strong> Converges light → torches, car headlights, shaving mirrors.</li>
        <li><strong>Convex mirror:</strong> Diverges light, wider view → rear-view mirrors.</li>
        <li><strong>Refraction:</strong> Light bends as it passes between media (different speeds). Used in lenses and glasses.</li>
      </ul>`,
    "respiration": `<h3>Respiration in Organisms — Curiosity Ch 10</h3>
      <ul>
        <li><strong>Aerobic:</strong> Glucose + O₂ → CO₂ + H₂O + Energy. Occurs in mitochondria.</li>
        <li><strong>Anaerobic:</strong> Without oxygen. Yeast: Glucose → Ethanol + CO₂. Muscles: Glucose → Lactic acid.</li>
        <li><strong>Breathing:</strong> Inhalation (diaphragm contracts, chest expands). Exhalation (diaphragm relaxes).</li>
      </ul>`,
    "photosynthesis": `<h3>Nutrition in Plants — Curiosity Ch 12</h3>
      <ul>
        <li><strong>Photosynthesis:</strong> 6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ (Glucose) + 6O₂</li>
        <li>Chlorophyll (in chloroplasts) captures sunlight. Stomata allow gas exchange.</li>
        <li>Autotrophs make own food; heterotrophs depend on others. Parasitic plants (Cuscuta) have no chlorophyll.</li>
      </ul>`,
    "bodmas": `<h3>BODMAS Order of Operations — Ganita Prakash Ch 2</h3>
      <ol><li><strong>B</strong>rackets</li><li><strong>O</strong>f (Exponents)</li><li><strong>D</strong>ivision & <strong>M</strong>ultiplication (L→R)</li><li><strong>A</strong>ddition & <strong>S</strong>ubtraction (L→R)</li></ol>
      <p><em>Example:</em> 10 − 2 × 3 + 1 → Multiply first: 2×3=6 → 10−6+1 = 5</p>`,
    "expressions": `<h3>Arithmetic Expressions — Ganita Prakash Ch 2</h3>
      <p>Follow <strong>BODMAS</strong>: Brackets → Of → Division/Multiplication → Addition/Subtraction.</p>`,
    "lines": `<h3>Parallel Lines & Transversal — Ganita Prakash Ch 5</h3>
      <ul>
        <li><strong>Corresponding Angles:</strong> Same position at each intersection. <em>Equal.</em></li>
        <li><strong>Alternate Interior Angles:</strong> Z-shaped, opposite sides of transversal. <em>Equal.</em></li>
        <li><strong>Co-interior Angles:</strong> Same side between parallel lines. <em>Sum = 180°.</em></li>
      </ul>`,
    "algebra": `<h3>Algebraic Expressions — Ganita Prakash Ch 4</h3>
      <ul>
        <li><strong>Variable:</strong> A letter representing an unknown (x, y, n).</li>
        <li><strong>Coefficient:</strong> Number multiplying the variable (in 3x, coefficient = 3).</li>
        <li><strong>Like Terms:</strong> Same variable — can be added: 3x + 5x = 8x.</li>
        <li><strong>Unlike Terms:</strong> Different variables — cannot be combined: 3x + 2y stays as is.</li>
      </ul>`,
    "equation": `<h3>Simple Equations — Ganita Prakash Ch 7</h3>
      <ul>
        <li>Goal: find the value of the unknown variable.</li>
        <li><strong>Transposing:</strong> Move terms across = (sign changes: + → −, × → ÷).</li>
        <li><em>Example:</em> 2x + 5 = 13 → 2x = 8 → x = 4.</li>
      </ul>`,
    "triangle": `<h3>Triangle Properties — Ganita Prakash Ch 8</h3>
      <ul>
        <li><strong>Angle Sum Property:</strong> All three angles of a triangle = 180°.</li>
        <li><strong>Exterior Angle:</strong> = sum of the two non-adjacent interior angles.</li>
        <li><strong>Pythagoras:</strong> In right triangle: Hyp² = Base² + Height².</li>
      </ul>`,
    "mughal": `<h3>Mughal Empire — Social Science (History Strand H-4)</h3>
      <ul>
        <li><strong>Babur (1526):</strong> Defeated Ibrahim Lodi at Panipat, founded empire.</li>
        <li><strong>Akbar:</strong> Greatest Mughal — Mansabdari system, Din-i-Ilahi, religious tolerance.</li>
        <li><strong>Shah Jahan:</strong> Built Taj Mahal (1632–53) for wife Mumtaz Mahal.</li>
        <li><strong>Aurangzeb:</strong> Reimposed Jizya, extended empire but caused regional revolts.</li>
      </ul>`,
    "delhi sultanate": `<h3>Delhi Sultans — Social Science (History Strand H-3)</h3>
      <ul>
        <li>Five Dynasties: Slave → Khilji → Tughlaq → Sayyid → Lodi (1206–1526).</li>
        <li><strong>Qutb-ud-din Aibak:</strong> First sultan; began Qutub Minar.</li>
        <li><strong>Razia Sultan:</strong> First female ruler (1236–40).</li>
        <li><strong>Iqta System:</strong> Revenue collection rights granted to military officers.</li>
      </ul>`,
    "atmosphere": `<h3>Air — Social Science (Geography Strand G-4)</h3>
      <ul>
        <li><strong>Composition:</strong> Nitrogen (78%), Oxygen (21%), other gases (1%).</li>
        <li><strong>Troposphere:</strong> 0–12 km — all weather occurs here.</li>
        <li><strong>Stratosphere:</strong> 12–50 km — ozone layer absorbs UV rays.</li>
        <li><strong>Wind:</strong> Moves from High → Low pressure.</li>
      </ul>`,
    "soil": `<h3>Soil — Curiosity Ch 14</h3>
      <ul>
        <li><strong>Formation:</strong> Weathering of rocks + decomposition of organic matter (humus).</li>
        <li><strong>Horizons:</strong> A (topsoil) → B (subsoil) → C (rock fragments) → Bedrock.</li>
        <li><strong>Types:</strong> Sandy (gritty, poor retention), Loamy (best for crops), Clayey (smooth, retains water).</li>
      </ul>`,
    "equality": `<h3>On Equality — Social Science (Civics Strand C-1)</h3>
      <ul>
        <li><strong>Universal Adult Franchise:</strong> All citizens 18+ can vote, regardless of caste/gender/religion.</li>
        <li><strong>Article 17:</strong> Abolishes untouchability in India.</li>
        <li><strong>Rosa Parks (1955):</strong> Refused to give bus seat to a white man — sparked US Civil Rights Movement.</li>
      </ul>`,
    "government": `<h3>State Government — Social Science (Civics Strand C-3)</h3>
      <ul>
        <li><strong>MLA:</strong> Member of Legislative Assembly — elected to Vidhan Sabha from a constituency.</li>
        <li><strong>Chief Minister:</strong> Head of state government; leads the Cabinet.</li>
        <li><strong>Governor:</strong> Constitutional head of the state, appointed by the President.</li>
      </ul>`,
    "quality": `<h3>Quality — English Ch 5 (John Galsworthy)</h3>
      <ul>
        <li>German shoemaker <strong>Gessler</strong> makes handcrafted boots of exceptional quality.</li>
        <li>He refuses to advertise or compromise — loses business to mass-produced cheap boots.</li>
        <li>He ultimately <strong>starves to death</strong>, spending everything on leather.</li>
        <li><strong>Theme:</strong> True craftsmanship is admirable even if it leads to ruin.</li>
      </ul>`,
    "honeycomb": `<h3>English — Poorvi (Grade 7 Textbook, CBSE 2026-27)</h3>
      <p>The new Grade 7 English textbook is <strong>Poorvi</strong> (replacing Honeycomb). Key chapters:</p>
      <ul>
        <li><strong>Three Questions</strong> (Tolstoy) — the present moment is what matters.</li>
        <li><strong>Quality</strong> (Galsworthy) — craftsmanship vs commercialism.</li>
        <li><strong>Fire: Friend and Foe</strong> — fire triangle, safety.</li>
        <li><strong>The Story of Cricket</strong> — evolution of cricket.</li>
      </ul>`,
    "thirukkural": `<h3>திருக்குறள் — Tamil</h3>
      <ul>
        <li>ஆசிரியர்: <strong>திருவள்ளுவர்</strong></li>
        <li>133 அதிகாரங்கள், 1330 குறள்கள்.</li>
        <li>மூன்று பால்கள்: அறத்துப்பால், பொருட்பால், காமத்துப்பால்.</li>
        <li>நீதி, வாழ்க்கை, அன்பு குறித்த காலமிழந்த ஞானம்.</li>
      </ul>`,
    "silappathikaram": `<h3>சிலப்பதிகாரம் — Tamil</h3>
      <ul>
        <li>ஆசிரியர்: <strong>இளங்கோவடிகள்</strong></li>
        <li>ஐம்பெருங்காப்பியங்களில் ஒன்று.</li>
        <li>கதாப்பாத்திரங்கள்: கோவலன், கண்ணகி (நீதிக்காக போர்த்த தெய்வம்).</li>
        <li>மதுரை, புகார், வஞ்சி என மூன்று நகரங்களில் நடக்கும் கதை.</li>
      </ul>`,
    "excel": `<h3>MS Excel — Computer Science Ch 5</h3>
      <ul>
        <li><strong>Cell:</strong> Intersection of row and column (e.g., A1, B3).</li>
        <li><strong>Formulas:</strong> =SUM(A1:A10), =AVERAGE(B1:B5), =MAX(C1:C10), =MIN(D1:D5).</li>
        <li><strong>Absolute Reference:</strong> $A$1 — doesn't change when copied.</li>
        <li><strong>Charts:</strong> Line (trends), Bar (comparison), Pie (proportions).</li>
      </ul>`,
    "internet": `<h3>Internet — Computer Science Ch 6</h3>
      <ul>
        <li><strong>URL:</strong> Uniform Resource Locator — web address of a page.</li>
        <li><strong>HTTP/HTTPS:</strong> Protocol for data transfer. HTTPS is encrypted (secure).</li>
        <li><strong>Browser:</strong> Google Chrome, Firefox, Safari — to access websites.</li>
        <li><strong>Cyber Safety:</strong> Never share passwords or personal info online.</li>
      </ul>`
  };

  /* ─────────────────────────────────────────────
     CHAPTER-TO-QUIZ MAPPING
  ───────────────────────────────────────────── */
  const CHAPTER_QUIZ_MAP = {
    Science: [
      { label: "Ch 2: Acids, Bases & Neutral", key: "ch2" },
      { label: "Ch 3: Electricity Circuits", key: "ch3" },
      { label: "Ch 8: Light — Reflection & Refraction", key: "ch8" }
    ],
    Mathematics: [
      { label: "Ch 2: Arithmetic Expressions (BODMAS)", key: "ch2" },
      { label: "Ch 7: Simple Equations", key: "ch7" },
      { label: "Ch 8: Triangle and Its Properties", key: "ch8" }
    ],
    "Social Science": [
      { label: "History — Ch H-3: Delhi Sultans", key: "ss_h3" },
      { label: "Geography — Ch G-4: Air (Atmosphere)", key: "ss_g4" },
      { label: "Civics — Ch C-1: On Equality", key: "ss_c1" }
    ],
    English: [
      { label: "Ch 1: Three Questions (Tolstoy)", key: "ch1" },
      { label: "Ch 5: Quality (Galsworthy)", key: "ch5" }
    ],
    Tamil: [
      { label: "Term I: Tamil Literature & Grammar", key: "term1" },
      { label: "Term II: Epics & Grammar", key: "term2" }
    ],
    "Computer Science": [
      { label: "Ch 5: MS Excel — Spreadsheets", key: "ch5" },
      { label: "Ch 6: Introduction to the Internet", key: "ch6" }
    ]
  };

  /* ─────────────────────────────────────────────
     DEFAULT FLASHCARDS — 40 cards across all subjects
  ───────────────────────────────────────────── */
  const DEFAULT_FLASHCARDS = [
    // Science (10)
    { id: "f_s1",  subject: "Science", question: "What does blue litmus turn to in an acid?", answer: "Red. (Acids turn blue litmus red; bases turn red litmus blue.)", ease: 0, nextReview: "" },
    { id: "f_s2",  subject: "Science", question: "What is neutralization?", answer: "Acid + Base → Salt + Water + Heat. The pH of the product is 7 (neutral).", ease: 0, nextReview: "" },
    { id: "f_s3",  subject: "Science", question: "What is an electromagnet?", answer: "A temporary magnet created by passing electric current through a coil of wire wound around an iron core.", ease: 0, nextReview: "" },
    { id: "f_s4",  subject: "Science", question: "Difference between physical and chemical change?", answer: "Physical: no new substance, often reversible (melting ice). Chemical: new substance formed, usually irreversible (rusting).", ease: 0, nextReview: "" },
    { id: "f_s5",  subject: "Science", question: "Why is tungsten used in bulb filaments?", answer: "Tungsten has a very high melting point (3422°C) and high resistance, causing it to glow white-hot without melting.", ease: 0, nextReview: "" },
    { id: "f_s6",  subject: "Science", question: "Write the equation for aerobic respiration.", answer: "Glucose + Oxygen → Carbon dioxide + Water + Energy (ATP). Occurs in mitochondria.", ease: 0, nextReview: "" },
    { id: "f_s7",  subject: "Science", question: "Write the photosynthesis word equation.", answer: "CO₂ + H₂O + Sunlight (Chlorophyll) → Glucose + Oxygen. Chloroplasts capture sunlight.", ease: 0, nextReview: "" },
    { id: "f_s8",  subject: "Science", question: "What is the Law of Reflection?", answer: "Angle of incidence = Angle of reflection (both measured from the normal to the surface).", ease: 0, nextReview: "" },
    { id: "f_s9",  subject: "Science", question: "Why are convex mirrors used in rear-view mirrors?", answer: "Convex mirrors diverge light, providing a wider field of view — you can see more of the road behind.", ease: 0, nextReview: "" },
    { id: "f_s10", subject: "Science", question: "Name the three types of soil.", answer: "Sandy (gritty, poor water retention), Loamy (best for agriculture), Clayey (smooth, high water retention).", ease: 0, nextReview: "" },
    // Mathematics (8)
    { id: "f_m1",  subject: "Mathematics", question: "What does BODMAS stand for?", answer: "Brackets, Of (exponents), Division, Multiplication, Addition, Subtraction — the order of operations.", ease: 0, nextReview: "" },
    { id: "f_m2",  subject: "Mathematics", question: "Solve: 18 − 6 ÷ 2 + 5 using BODMAS", answer: "20. Division first: 6÷2=3. Then: 18−3+5 = 20.", ease: 0, nextReview: "" },
    { id: "f_m3",  subject: "Mathematics", question: "What are corresponding angles?", answer: "Angles in matching positions when a transversal intersects two parallel lines. They are always equal.", ease: 0, nextReview: "" },
    { id: "f_m4",  subject: "Mathematics", question: "Solve: 2x + 5 = 13", answer: "x = 4. Transpose 5: 2x = 8. Divide by 2: x = 4.", ease: 0, nextReview: "" },
    { id: "f_m5",  subject: "Mathematics", question: "State the Angle Sum Property of triangles.", answer: "The sum of all three interior angles of any triangle is always 180°.", ease: 0, nextReview: "" },
    { id: "f_m6",  subject: "Mathematics", question: "State the Pythagoras theorem.", answer: "In a right-angled triangle: Hypotenuse² = Base² + Perpendicular². (e.g., 3²+4²=5²)", ease: 0, nextReview: "" },
    { id: "f_m7",  subject: "Mathematics", question: "Area formula for a triangle?", answer: "Area = ½ × Base × Height.", ease: 0, nextReview: "" },
    { id: "f_m8",  subject: "Mathematics", question: "What are like and unlike terms?", answer: "Like terms: same variable (3x+5x=8x — can add). Unlike terms: different variables (3x+2y — cannot add).", ease: 0, nextReview: "" },
    // Social Science (6)
    { id: "f_h1",  subject: "Social Science", question: "Who was the first Sultan of Delhi?", answer: "Qutb-ud-din Aibak (1206–1210) — founded the Slave (Mamluk) Dynasty.", ease: 0, nextReview: "" },
    { id: "f_h2",  subject: "Social Science", question: "Who built the Taj Mahal and for whom?", answer: "Shah Jahan built it (1632–1653) as a mausoleum for his wife Mumtaz Mahal in Agra.", ease: 0, nextReview: "" },
    { id: "f_h3",  subject: "Social Science", question: "What was Akbar's Mansabdari system?", answer: "A hierarchical ranking system for Mughal officials (mansabdars), determining their salary and number of troops.", ease: 0, nextReview: "" },
    { id: "f_g1",  subject: "Social Science", question: "What are Earth's three main layers?", answer: "Crust (outermost), Mantle (thickest), Core (innermost — outer liquid iron, inner solid).", ease: 0, nextReview: "" },
    { id: "f_g2",  subject: "Social Science", question: "What % of the atmosphere is nitrogen?", answer: "~78%. Oxygen is ~21%. The remaining ~1% includes CO₂, argon, and other gases.", ease: 0, nextReview: "" },
    { id: "f_c1",  subject: "Social Science", question: "What is Universal Adult Franchise?", answer: "The right of ALL citizens aged 18+ to vote, regardless of caste, religion, gender, or economic status.", ease: 0, nextReview: "" },
    // English (4)
    { id: "f_e1",  subject: "English", question: "What are Tolstoy's Three Questions?", answer: "(1) Who is the most important person? (2) What is the right time? (3) What is the most important thing to do?", ease: 0, nextReview: "" },
    { id: "f_e2",  subject: "English", question: "What is the moral of 'Quality' by Galsworthy?", answer: "True craftsmanship and dedication to one's work is admirable — even if it leads to financial ruin.", ease: 0, nextReview: "" },
    { id: "f_e3",  subject: "English", question: "What is the 'fire triangle'?", answer: "Three components needed for fire: Fuel + Heat + Oxygen. Remove any one and the fire goes out.", ease: 0, nextReview: "" },
    { id: "f_e4",  subject: "English", question: "Name the Grade 7 English textbook (CBSE 2026-27).", answer: "Poorvi — the new NCERT English textbook replacing Honeycomb, aligned with NEP 2020.", ease: 0, nextReview: "" },
    // Tamil (6)
    { id: "f_ta1", subject: "Tamil", question: "திருக்குறளின் ஆசிரியர் யார்?", answer: "திருவள்ளுவர் — 133 அதிகாரங்கள், 1330 குறள்கள், மூன்று பால்கள் (அறம், பொருள், காமம்).", ease: 0, nextReview: "" },
    { id: "f_ta2", subject: "Tamil", question: "சிலப்பதிகாரம் யார் எழுதியது?", answer: "இளங்கோவடிகள் — ஐம்பெருங்காப்பியங்களில் ஒன்று. கண்ணகி கதாநாயகி.", ease: 0, nextReview: "" },
    { id: "f_ta3", subject: "Tamil", question: "சங்க இலக்கியம் என்ன?", answer: "தமிழின் பழமையான இலக்கியம் — அகம் (காதல் பற்றியது) மற்றும் புறம் (வீரம், அரசு பற்றியது) என இரண்டு வகை.", ease: 0, nextReview: "" },
    { id: "f_ta4", subject: "Tamil", question: "பெயர்ச்சொல் என்றால் என்ன?", answer: "பொருள், இடம், நபர் அல்லது கருத்தின் பெயரை குறிக்கும் சொல். எ.கா: மரம், தமிழ்நாடு, ராம்.", ease: 0, nextReview: "" },
    { id: "f_ta5", subject: "Tamil", question: "கம்பராமாயணத்தின் ஆசிரியர் யார்?", answer: "கம்பர் — வால்மீகி ராமாயணத்தை தமிழில் மொழிமாற்றம் செய்தார்.", ease: 0, nextReview: "" },
    { id: "f_ta6", subject: "Tamil", question: "திருக்குறளில் எத்தனை பால்கள்?", answer: "மூன்று பால்கள்: 1) அறத்துப்பால் (தர்மம்), 2) பொருட்பால் (செல்வம்/அரசு), 3) காமத்துப்பால் (காதல்).", ease: 0, nextReview: "" },
    // Computer Science (4)
    { id: "f_cs1", subject: "Computer Science", question: "What does HTTP stand for?", answer: "HyperText Transfer Protocol — the protocol for transferring web pages on the internet.", ease: 0, nextReview: "" },
    { id: "f_cs2", subject: "Computer Science", question: "Excel formula for average of A1 to A10?", answer: "=AVERAGE(A1:A10) — adds all values and divides by the count (10).", ease: 0, nextReview: "" },
    { id: "f_cs3", subject: "Computer Science", question: "What is an algorithm?", answer: "A finite, step-by-step set of instructions to solve a problem or complete a task. Must be unambiguous and effective.", ease: 0, nextReview: "" },
    { id: "f_cs4", subject: "Computer Science", question: "What is an absolute cell reference in Excel?", answer: "A reference that does NOT change when a formula is copied. Uses $ signs: $A$1 (locked row AND column).", ease: 0, nextReview: "" }
  ];

  /* ─────────────────────────────────────────────
     PUBLIC API
  ───────────────────────────────────────────── */
  window.CBSE7Syllabus = {
    getSyllabus: () => SYLLABUS,
    getSubjects: () => Object.keys(SYLLABUS),
    getChapters: (subject) => SYLLABUS[subject] || [],
    getQuizBank: () => QUIZ_BANK,
    getQuizChapters: (subject) => CHAPTER_QUIZ_MAP[subject] || [],
    getKnowledgeBase: () => KNOWLEDGE_BASE,
    getDefaultFlashcards: () => DEFAULT_FLASHCARDS,
    findKnowledge: function (query) {
      const q = query.toLowerCase();
      const kb = KNOWLEDGE_BASE;
      // Direct key match
      for (const key in kb) { if (q.includes(key)) return kb[key]; }
      // Broader regex pattern matching
      const patterns = {
        "acid|base|litmus|ph|neutral|salt|neutraliz": "acids",
        "circuit|fuse|electromagnet|oersted|heating effect|magnetic effect|battery": "electricity",
        "rust|physical change|chemical change|reversible|irreversible|burn|corrode": "changes",
        "reflect|refract|mirror|lens|concave|convex|light ray|dispersion": "light",
        "aerob|anaerob|breath|lung|diaphragm|respirat|gill": "respiration",
        "chlorophyll|photosynth|stomata|autotroph|cuscuta": "photosynthesis",
        "bodmas|pemdas|order of op|simplif|bracket": "bodmas",
        "parallel|transversal|alternate|correspond|co-interior|supplementary": "lines",
        "algebra|variable|coeffici|like term|expression": "algebra",
        "equat|transpose|solve for|linear": "equation",
        "triangle|pythagoras|hypotenuse|angle sum|exterior angle|isosceles": "triangle",
        "mughal|akbar|babur|aurangzeb|shah jahan|mansab": "mughal",
        "delhi sultan|slave dynasty|qutub|razia|iltutmish|iqta": "delhi sultanate",
        "atmospher|nitrogen|oxygen|troposphere|stratosphere|wind|humidity|ozone": "atmosphere",
        "humus|horizon|sandy|loamy|clayey|erosion|soil": "soil",
        "equality|adult franchise|article 17|untouchability|rosa parks": "equality",
        "mla|state government|legislature|governor|chief minister|assembly": "government",
        "gessler|quality|shoemaker|galsworthy|craftsmanship": "quality",
        "honeycomb|poorvi|english textbook|three questions|tolstoy": "honeycomb",
        "thirukkural|திருக்குறள்|valluvar|வள்ளுவர்|kural": "thirukkural",
        "silappathikaram|சிலப்பதிகாரம்|ilangovadigal|kannagi|kovalan": "silappathikaram",
        "excel|spreadsheet|sum\\(|average\\(|cell|formula|worksheet": "excel",
        "internet|browser|url|http|search engine|cyber|website": "internet"
      };
      for (const pattern in patterns) {
        if (new RegExp(pattern).test(q)) return kb[patterns[pattern]];
      }
      return null;
    }
  };
})();
