"""CBSE syllabus knowledge base helpers for StudyPilot."""

from __future__ import annotations

import ast
import json
import re
from pathlib import Path
from typing import Any

from backend.database import execute, fetch_all, fetch_one


PROJECT_ROOT = Path(__file__).resolve().parent.parent
NCERT_MANIFEST_PATH = PROJECT_ROOT / "docs" / "syllabus_sources" / "ncert_manifest.json"


SEED_ENTRIES: list[dict[str, Any]] = [
    {
        "grade": 6,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 1,
        "chapter_title": "Food and Its Sources",
        "summary": "Introduces the idea that food comes from plants and animals and builds healthy eating vocabulary for younger learners.",
        "keywords": "food sources plants animals nutrition healthy eating",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 6,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 2,
        "chapter_title": "Sorting Materials into Groups",
        "summary": "Covers properties such as hardness, transparency, solubility, and grouping materials by shared features.",
        "keywords": "sorting materials properties transparent opaque soluble insoluble",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 6,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 3,
        "chapter_title": "Motion and Measurement of Distances",
        "summary": "Explains measurement, standard units, and simple ideas of motion using familiar everyday examples.",
        "keywords": "motion measurement distance unit length metre",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 7,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 1,
        "chapter_title": "Nutrition in Plants",
        "summary": "Teaches photosynthesis, chlorophyll, and how plants make food from sunlight, water, and carbon dioxide.",
        "keywords": "nutrition plants photosynthesis chlorophyll food",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 7,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 2,
        "chapter_title": "Heat",
        "summary": "Introduces temperature, heat transfer, and the three common modes of heat movement.",
        "keywords": "heat temperature conduction convection radiation",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 7,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 3,
        "chapter_title": "Acids, Bases and Salts",
        "summary": "Builds understanding of indicators, neutralisation, and everyday acidic and basic substances.",
        "keywords": "acid base salt indicator neutralisation",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 8,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 1,
        "chapter_title": "Crop Production and Management",
        "summary": "Explains how soil is prepared, seeds are sown, and crops are cared for and stored safely.",
        "keywords": "crop production soil manure irrigation storage",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 8,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 2,
        "chapter_title": "Microorganisms: Friend and Foe",
        "summary": "Introduces helpful and harmful microbes, food preservation, and diseases caused by microorganisms.",
        "keywords": "microorganism microbes bacteria fungi preservation disease",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 8,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 3,
        "chapter_title": "Force and Pressure",
        "summary": "Covers push and pull, pressure, and how force changes the motion of objects.",
        "keywords": "force pressure push pull motion",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 9,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 1,
        "chapter_title": "Matter in Our Surroundings",
        "summary": "Explains the states of matter, diffusion, evaporation, and how matter behaves around us.",
        "keywords": "matter surroundings diffusion evaporation solid liquid gas",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 9,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 2,
        "chapter_title": "Is Matter Around Us Pure",
        "summary": "Covers mixtures, solutions, suspensions, colloids, and separation methods.",
        "keywords": "pure matter mixture solution suspension colloid separation",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 9,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 3,
        "chapter_title": "Atoms and Molecules",
        "summary": "Introduces laws of chemical combination, atomic mass, molecular mass, and formula writing.",
        "keywords": "atom molecule formula mass conservation chemical combination",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 10,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 1,
        "chapter_title": "Chemical Reactions and Equations",
        "summary": "Covers chemical equations, balancing reactions, combination, decomposition, displacement, double displacement, and oxidation-reduction reactions.",
        "keywords": "chemical reaction equation balancing combination decomposition displacement oxidation reduction",
        "source_url": "https://ncert.nic.in/textbook/pdf/jesc101.pdf",
        "source_type": "NCERT Official",
    },
    {
        "grade": 10,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 2,
        "chapter_title": "Acids, Bases and Salts",
        "summary": "Introduces acids, bases, indicators, pH, and neutralisation with original study help focused on everyday applications.",
        "keywords": "acid base salt indicator ph neutralisation neutralization vinegar baking soda litmus",
        "source_url": "https://ncert.nic.in/textbook/pdf/jesc102.pdf",
        "source_type": "NCERT Official",
    },
    {
        "grade": 7,
        "subject": "Mathematics",
        "book_title": "Mathematics",
        "chapter_number": 2,
        "chapter_title": "Arithmetic Expressions & Order of Operations",
        "summary": "Simplifying order of operations, brackets, BODMAS / PEMDAS rules, and calculating complex arithmetic expressions.",
        "keywords": "arithmetic expression order operations bodmas brackets pemdas calculation",
        "source_url": "https://ncert.nic.in/textbook/pdf/gemh102.pdf",
        "source_type": "NCERT Official",
    },
    {
        "grade": 8,
        "subject": "Mathematics",
        "book_title": "Mathematics",
        "chapter_number": 1,
        "chapter_title": "Rational Numbers",
        "summary": "Properties of rational numbers, closure, commutativity, associativity, and representation on number lines.",
        "keywords": "rational numbers closure commutativity associativity number line",
        "source_url": "https://ncert.nic.in/textbook/pdf/hemh101.pdf",
        "source_type": "NCERT Official",
    },
    {
        "grade": 9,
        "subject": "Mathematics",
        "book_title": "Mathematics",
        "chapter_number": 1,
        "chapter_title": "Number Systems",
        "summary": "Irrational numbers, real numbers, decimal expansions, and laws of exponents for real numbers.",
        "keywords": "number systems irrational real numbers decimal expansion exponents",
        "source_url": "https://ncert.nic.in/textbook/pdf/iemh101.pdf",
        "source_type": "NCERT Official",
    },
    {
        "grade": 10,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 9,
        "chapter_title": "Light - Reflection and Refraction",
        "summary": "Covers reflection, refraction, mirrors, lenses, dispersion, and atmospheric refraction using the official NCERT chapter as the source link.",
        "keywords": "light reflection refraction mirror lens dispersion rainbow atmospheric refraction",
        "source_url": "https://ncert.nic.in/textbook/pdf/jesc109.pdf",
        "source_type": "NCERT Official",
    },
    {
        "grade": 10,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 11,
        "chapter_title": "Electricity",
        "summary": "Explains electric current, circuits, potential difference, Ohm's law, resistance, and circuit safety with official textbook links only.",
        "keywords": "electricity current circuit ohm resistance potential difference ammeter voltmeter fuse heating effect",
        "source_url": "https://ncert.nic.in/textbook/pdf/jesc111.pdf",
        "source_type": "NCERT Official",
    },
]


def clean_text(value: object) -> str:
    return " ".join(str(value or "").split()).strip()


def seed_knowledge_base() -> None:
    """Populate the SQLite knowledge table the first time the app runs."""

    existing = fetch_one("SELECT COUNT(*) AS total FROM knowledge_entries")
    if existing and int(existing.get("total", 0)) > 0:
        return

    for entry in SEED_ENTRIES:
        execute(
            """
            INSERT INTO knowledge_entries (
                grade, subject, book_title, chapter_number, chapter_title,
                summary, keywords, source_url, source_type
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                entry["grade"],
                entry["subject"],
                entry["book_title"],
                entry["chapter_number"],
                entry["chapter_title"],
                entry["summary"],
                entry["keywords"],
                entry["source_url"],
                entry["source_type"],
            ),
        )


GRADE_7_SYLLABUS = {
    "Science": {
        "book_title": "Samacheer Kalvi Science",
        "chapters": [
            {
                "num": 1,
                "title": "Measurement",
                "desc": "Study of physical quantities, standard units, and measuring instruments.",
                "sections": [
                    {"num": "1.1", "title": "Physical Quantities and Units"},
                    {"num": "1.2", "title": "Measurement of Area, Volume and Density"},
                    {"num": "1.3", "title": "Astronomical Unit and Light Year"}
                ]
            },
            {
                "num": 2,
                "title": "Force and Motion",
                "desc": "Understanding distance, displacement, speed, velocity, and acceleration.",
                "sections": [
                    {"num": "2.1", "title": "Distance and Displacement"},
                    {"num": "2.2", "title": "Speed, Velocity and Acceleration"},
                    {"num": "2.3", "title": "Center of Gravity and Stability"}
                ]
            },
            {
                "num": 3,
                "title": "Matter Around Us",
                "desc": "Elements, compounds, mixtures, and chemical symbols.",
                "sections": [
                    {"num": "3.1", "title": "What is Matter?"},
                    {"num": "3.2", "title": "Elements and Compounds"},
                    {"num": "3.3", "title": "Mixtures and Separation Methods"}
                ]
            },
            {
                "num": 4,
                "title": "Atomic Structure",
                "desc": "Atoms, subatomic particles, atomic number, and valency.",
                "sections": [
                    {"num": "4.1", "title": "Dalton's Atomic Theory"},
                    {"num": "4.2", "title": "Protons, Neutrons and Electrons"},
                    {"num": "4.3", "title": "Valency and Chemical Formulas"}
                ]
            },
            {
                "num": 5,
                "title": "Reproduction and Modification in Plants",
                "desc": "Pollination, fertilization, and vegetative modifications of roots, stems, and leaves.",
                "sections": [
                    {"num": "5.1", "title": "Asexual and Sexual Reproduction"},
                    {"num": "5.2", "title": "Pollination and Fertilization"},
                    {"num": "5.3", "title": "Modifications of Vegetative Organs"}
                ]
            },
            {
                "num": 6,
                "title": "Health and Hygiene",
                "desc": "Food components, balanced diet, personal hygiene, and diseases.",
                "sections": [
                    {"num": "6.1", "title": "Components of Food and Balanced Diet"},
                    {"num": "6.2", "title": "Personal Hygiene and Cleanliness"},
                    {"num": "6.3", "title": "Infectious and Non-infectious Diseases"}
                ]
            },
            {
                "num": 7,
                "title": "Visual Communication",
                "desc": "Working with digital presentation tools and visual media files.",
                "sections": [
                    {"num": "7.1", "title": "File formats and media types"},
                    {"num": "7.2", "title": "Creating visual slides and presentations"}
                ]
            }
        ]
    },
    "Mathematics": {
        "book_title": "Samacheer Kalvi Mathematics",
        "chapters": [
            {
                "num": 1,
                "title": "Number System",
                "desc": "Addition, subtraction, multiplication, and division of integers.",
                "sections": [
                    {"num": "1.1", "title": "Addition and Subtraction of Integers"},
                    {"num": "1.2", "title": "Multiplication of Integers"},
                    {"num": "1.3", "title": "Division of Integers"}
                ]
            },
            {
                "num": 2,
                "title": "Measurements",
                "desc": "Area of parallelogram, rhombus, and trapezium.",
                "sections": [
                    {"num": "2.1", "title": "Area of Parallelogram"},
                    {"num": "2.2", "title": "Area of Rhombus"},
                    {"num": "2.3", "title": "Area of Trapezium"}
                ]
            },
            {
                "num": 3,
                "title": "Algebra",
                "desc": "Algebraic expressions, variables, terms, coefficients, and simple linear equations.",
                "sections": [
                    {"num": "3.1", "title": "Variables and Constants"},
                    {"num": "3.2", "title": "Terms and Coefficients of Expressions"},
                    {"num": "3.3", "title": "Simple Linear Equations"}
                ]
            },
            {
                "num": 4,
                "title": "Direct and Inverse Proportion",
                "desc": "Direct and indirect variation calculations and applications.",
                "sections": [
                    {"num": "4.1", "title": "Direct Proportion"},
                    {"num": "4.2", "title": "Inverse Proportion"},
                    {"num": "4.3", "title": "Unitary Method Applications"}
                ]
            },
            {
                "num": 5,
                "title": "Geometry",
                "desc": "Angles, transversals, and construction of triangles.",
                "sections": [
                    {"num": "5.1", "title": "Types of Angles and Pairs"},
                    {"num": "5.2", "title": "Angles in Transversals"},
                    {"num": "5.3", "title": "Construction of Triangles"}
                ]
            },
            {
                "num": 6,
                "title": "Information Processing",
                "desc": "Systematic listing, counting techniques, and scheduling.",
                "sections": [
                    {"num": "6.1", "title": "Systematic Listing"},
                    {"num": "6.2", "title": "Counting Techniques"}
                ]
            }
        ]
    },
    "Social Science": {
        "book_title": "Exploring Society: India and Beyond",
        "chapters": [
            {
                "num": 1,
                "title": "Geographical Diversity of India",
                "desc": "Part 1 Theme A – India and the World: Relief, physical features, mountains, plains, plateaus, and island regions.",
                "sections": [
                    {"num": "1.1", "title": "Relief & Physical features"},
                    {"num": "1.2", "title": "Mountains, Plains, Plateaus"},
                    {"num": "1.3", "title": "Coastal & Island regions"}
                ]
            },
            {
                "num": 2,
                "title": "Understanding the Weather",
                "desc": "Part 1 Theme A – India and the World: Temperature, air pressure, wind systems, humidity, and weather elements.",
                "sections": [
                    {"num": "2.1", "title": "Temperature and Air Pressure"},
                    {"num": "2.2", "title": "Wind systems and Humidity"},
                    {"num": "2.3", "title": "Measuring weather elements"}
                ]
            },
            {
                "num": 3,
                "title": "Climate of India",
                "desc": "Part 1 Theme A – India and the World: Monsoon seasons, climate drivers, and regional climatic variations.",
                "sections": [
                    {"num": "3.1", "title": "Factors shaping climate"},
                    {"num": "3.2", "title": "Monsoons and Seasons"},
                    {"num": "3.3", "title": "Regional climate variations"}
                ]
            },
            {
                "num": 4,
                "title": "New Beginnings: Cities and States",
                "desc": "Part 1 Theme B – Tapestry of the Past: Early urban centers, Janapadas, Mahajanapadas, and socio-economic structures.",
                "sections": [
                    {"num": "4.1", "title": "Early urban centers"},
                    {"num": "4.2", "title": "Janapadas & Mahajanapadas"},
                    {"num": "4.3", "title": "Social & economic life"}
                ]
            },
            {
                "num": 5,
                "title": "The Rise of Empires",
                "desc": "Part 1 Theme B – Tapestry of the Past: The Mauryan Empire, Ashoka's Dhamma, and imperial administration.",
                "sections": [
                    {"num": "5.1", "title": "The Mauryan Empire"},
                    {"num": "5.2", "title": "Administration & Ashoka's Dhamma"},
                    {"num": "5.3", "title": "Imperial economy & trade"}
                ]
            },
            {
                "num": 6,
                "title": "The Age of Reorganisation",
                "desc": "Part 1 Theme B – Tapestry of the Past: Post-Mauryan political changes, regional dynasties, and land grants.",
                "sections": [
                    {"num": "6.1", "title": "Political changes"},
                    {"num": "6.2", "title": "New dynasties & regional powers"},
                    {"num": "6.3", "title": "Society & land grants"}
                ]
            },
            {
                "num": 7,
                "title": "The Gupta Era: An Age of Tireless Creativity",
                "desc": "Part 1 Theme B – Tapestry of the Past: Imperial expansion, advances in science, literature, art, and temple architecture.",
                "sections": [
                    {"num": "7.1", "title": "Gupta rulers & expansion"},
                    {"num": "7.2", "title": "Golden age of Science & Literature"},
                    {"num": "7.3", "title": "Art, architecture & temples"}
                ]
            },
            {
                "num": 8,
                "title": "How the Land Becomes Sacred",
                "desc": "Part 1 Theme C – Our Cultural Heritage: Sacred geography, pilgrimage sites, traditions, and cultural unity.",
                "sections": [
                    {"num": "8.1", "title": "Sacred geography & pilgrimage"},
                    {"num": "8.2", "title": "Places of worship & traditions"},
                    {"num": "8.3", "title": "Cultural unity in diversity"}
                ]
            },
            {
                "num": 9,
                "title": "From the Rulers to the Ruled: Types of Governments",
                "desc": "Part 1 Theme D – Governance and Democracy: Monarchy, oligarchy, democracy, rights, and duties.",
                "sections": [
                    {"num": "9.1", "title": "Monarchy, Oligarchy, Democracy"},
                    {"num": "9.2", "title": "Key features of democratic rule"},
                    {"num": "9.3", "title": "Citizen rights & responsibilities"}
                ]
            },
            {
                "num": 10,
                "title": "The Constitution of India – An Introduction",
                "desc": "Part 1 Theme D – Governance and Democracy: Preamble, fundamental rights, duties, and rule of law.",
                "sections": [
                    {"num": "10.1", "title": "Preamble and core values"},
                    {"num": "10.2", "title": "Fundamental Rights & Duties"},
                    {"num": "10.3", "title": "Rule of law & governance"}
                ]
            },
            {
                "num": 11,
                "title": "From Barter to Money",
                "desc": "Part 1 Theme E – Economic Life: Evolution of trade, currency development, and modern payment methods.",
                "sections": [
                    {"num": "11.1", "title": "Evolution of exchange system"},
                    {"num": "11.2", "title": "Forms of money through history"},
                    {"num": "11.3", "title": "Modern currency & digital pay"}
                ]
            },
            {
                "num": 12,
                "title": "Understanding Markets",
                "desc": "Part 1 Theme E – Economic Life: Local markets, wholesale vs retail, supply chains, and consumer access.",
                "sections": [
                    {"num": "12.1", "title": "Weekly markets & neighborhood shops"},
                    {"num": "12.2", "title": "Wholesale vs Retail traders"},
                    {"num": "12.3", "title": "Market chains & equality"}
                ]
            },
            {
                "num": 13,
                "title": "The Story of Indian Farming",
                "desc": "Part 2 Theme A – India and the World: Explore how farming shapes life, food systems, and livelihoods across India.",
                "sections": [
                    {"num": "13.1", "title": "Agriculture and livelihoods"},
                    {"num": "13.2", "title": "Crops, seasons, and land"},
                    {"num": "13.3", "title": "Irrigation, tools, and change"}
                ]
            },
            {
                "num": 14,
                "title": "India and Her Neighbours",
                "desc": "Part 2 Theme A – India and the World: Study India's location, nearby countries, and cross-border relationships.",
                "sections": [
                    {"num": "14.1", "title": "India on the map"},
                    {"num": "14.2", "title": "Neighbouring countries"},
                    {"num": "14.3", "title": "Connections across borders"}
                ]
            },
            {
                "num": 15,
                "title": "Empires and Kingdoms: 6th to 10th Centuries",
                "desc": "Part 2 Theme B – Tapestry of the Past: Track major kingdoms, administration, and early medieval culture.",
                "sections": [
                    {"num": "15.1", "title": "Rise of kingdoms"},
                    {"num": "15.2", "title": "Administration and society"},
                    {"num": "15.3", "title": "Art, architecture, and inscriptions"}
                ]
            },
            {
                "num": 16,
                "title": "Turning Tides: 11th and 12th Centuries",
                "desc": "Part 2 Theme B – Tapestry of the Past: Understand trade, new powers, and changing political worlds.",
                "sections": [
                    {"num": "16.1", "title": "Trade and travel"},
                    {"num": "16.2", "title": "New powers and alliances"},
                    {"num": "16.3", "title": "Cultural exchange"}
                ]
            },
            {
                "num": 17,
                "title": "India, a Home to Many",
                "desc": "Part 2 Theme C – Our Cultural Heritage: Learn how India's communities, languages, and traditions live together.",
                "sections": [
                    {"num": "17.1", "title": "Diversity in daily life"},
                    {"num": "17.2", "title": "Shared heritage"},
                    {"num": "17.3", "title": "Living together with respect"}
                ]
            },
            {
                "num": 18,
                "title": "The State, the Government, and You",
                "desc": "Part 2 Theme D – Governance and Democracy: Understand civics, state machinery, governance, and citizen roles.",
                "sections": [
                    {"num": "18.1", "title": "How state governments work"},
                    {"num": "18.2", "title": "Role of citizens"}
                ]
            },
            {
                "num": 19,
                "title": "Infrastructure: Engine of India's Development",
                "desc": "Part 2 Theme E – Economic Life: The role of transport, energy, and communication in national development.",
                "sections": [
                    {"num": "19.1", "title": "Transport and communication"},
                    {"num": "19.2", "title": "Energy and power"}
                ]
            },
            {
                "num": 20,
                "title": "Banks and the Magic of Finance",
                "desc": "Part 2 Theme E – Economic Life: Introduction to money, banking systems, savings, and basic financial concepts.",
                "sections": [
                    {"num": "20.1", "title": "Introduction to banks"},
                    {"num": "20.2", "title": "Financial literacy"}
                ]
            }
        ]
    },
    "English": {
        "book_title": "Poorvi",
        "chapters": [
            {
                "num": 1,
                "title": "Unit 1: Learning Together",
                "desc": "Unit on collaborative learning, poetry, and stories highlighting human connection.",
                "sections": [
                    {"num": "1.1", "title": "The Day the River Spoke"},
                    {"num": "1.2", "title": "Try Again"},
                    {"num": "1.3", "title": "Three Days to See"}
                ]
            },
            {
                "num": 2,
                "title": "Unit 2: Wit and Humour",
                "desc": "Folk tales, humorous anecdotes, and light-hearted prose.",
                "sections": [
                    {"num": "2.1", "title": "Animals, Birds, and Dr. Dolittle"},
                    {"num": "2.2", "title": "A Funny Man"},
                    {"num": "2.3", "title": "Say the Right Thing"}
                ]
            },
            {
                "num": 3,
                "title": "Unit 3: Dreams and Discoveries",
                "desc": "Inspirational accounts of scientific discoveries and personal achievements.",
                "sections": [
                    {"num": "3.1", "title": "My Brother's Great Invention"},
                    {"num": "3.2", "title": "Paper Boats"},
                    {"num": "3.3", "title": "North, South, East, West"}
                ]
            },
            {
                "num": 4,
                "title": "Unit 4: Travel and Adventure",
                "desc": "Travelogues, exploratory journeys, and poems of adventure.",
                "sections": [
                    {"num": "4.1", "title": "The Tunnel"},
                    {"num": "4.2", "title": "Travel"},
                    {"num": "4.3", "title": "Conquering the Summit"}
                ]
            },
            {
                "num": 5,
                "title": "Unit 5: Bravehearts",
                "desc": "Stories of valour, courage, and historic heroes of India.",
                "sections": [
                    {"num": "5.1", "title": "A Homage to Our Brave Soldiers"},
                    {"num": "5.2", "title": "My Dear Soldiers"},
                    {"num": "5.3", "title": "Rani Abbakka"}
                ]
            }
        ]
    },
}



def seed_grade_7_nodes(board_id: int) -> None:
    # Delete existing grade 7 nodes under source_provider = 'NCERT Official' to prevent duplicates
    execute("DELETE FROM syllabus_nodes WHERE source_provider = 'NCERT Official' AND grade = 7")

    grade_id = execute(
        """
        INSERT INTO syllabus_nodes (
            parent_id, node_type, source_provider, board, grade, title, content, order_index
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (board_id, "grade", "NCERT Official", "CBSE", 7, "Grade 7", "Official NCERT Grade 7 curriculum", 7),
    )

    for subject_name, subject_data in GRADE_7_SYLLABUS.items():
        book_title = subject_data["book_title"]
        subject_id = execute(
            """
            INSERT INTO syllabus_nodes (
                parent_id, node_type, source_provider, board, grade, subject, title, content, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (grade_id, "subject", "NCERT Official", "CBSE", 7, subject_name, subject_name, "", 1),
        )

        book_id = execute(
            """
            INSERT INTO syllabus_nodes (
                parent_id, node_type, source_provider, board, grade, subject, book_title, title, content, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                subject_id,
                "book",
                "NCERT Official",
                "CBSE",
                7,
                subject_name,
                book_title,
                book_title,
                f"Official Grade 7 {subject_name} book.",
                1,
            ),
        )

        for ch_index, ch in enumerate(subject_data["chapters"], start=1):
            ch_id = execute(
                """
                INSERT INTO syllabus_nodes (
                    parent_id, node_type, source_provider, board, grade, subject, book_title,
                    chapter_number, title, content, order_index
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    book_id,
                    "chapter",
                    "NCERT Official",
                    "CBSE",
                    7,
                    subject_name,
                    book_title,
                    ch["num"],
                    ch["title"],
                    ch["desc"],
                    ch_index,
                ),
            )

            for sec_index, sec in enumerate(ch["sections"], start=1):
                try:
                    sec_num = int(sec["num"].split(".")[-1])
                except:
                    sec_num = sec_index

                execute(
                    """
                    INSERT INTO syllabus_nodes (
                        parent_id, node_type, source_provider, board, grade, subject, book_title,
                        chapter_number, section_number, title, content, order_index
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        ch_id,
                        "section",
                        "NCERT Official",
                        "CBSE",
                        7,
                        subject_name,
                        book_title,
                        ch["num"],
                        sec_num,
                        sec["title"],
                        f"Section {sec['num']}: {sec['title']}",
                        sec_index,
                    ),
                )


def seed_official_curriculum_catalog() -> None:
    """Seed an official-textbook syllabus tree from the NCERT manifest."""

    # First, load the manifest catalog if not already loaded
    existing = fetch_one(
        """
        SELECT COUNT(*) AS total
        FROM syllabus_nodes
        WHERE source_provider = 'NCERT Official'
        """
    )
    board_id = None
    if not existing or int(existing["total"]) == 0:
        if NCERT_MANIFEST_PATH.exists():
            manifest = json.loads(NCERT_MANIFEST_PATH.read_text(encoding="utf-8"))
            classes = manifest.get("classes", [])
            if classes:
                execute("DELETE FROM syllabus_nodes WHERE source_provider = 'NCERT Official'")

                board_id = execute(
                    """
                    INSERT INTO syllabus_nodes (
                        node_type, source_provider, board, title, content, source_url, order_index
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    ("board", "NCERT Official", "CBSE", "CBSE", "Official NCERT textbook catalog metadata.", manifest.get("source", ""), 1),
                )

                for class_entry in classes:
                    grade = class_entry.get("grade")
                    if grade is None or int(grade) < 6 or int(grade) > 10:
                        continue

                    grade_id = execute(
                        """
                        INSERT INTO syllabus_nodes (
                            parent_id, node_type, source_provider, board, grade, title, content, source_url, order_index
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """,
                        (
                            board_id,
                            "grade",
                            "NCERT Official",
                            "CBSE",
                            int(grade),
                            f"Grade {grade}",
                            class_entry.get("label", ""),
                            manifest.get("source", ""),
                            int(grade),
                        ),
                    )

                    for subject_index, subject_entry in enumerate(class_entry.get("subjects", []), start=1):
                        subject_name = subject_entry.get("subject", "")
                        if int(grade) == 10 and subject_name.lower() == "science":
                            continue

                        subject_id = execute(
                            """
                            INSERT INTO syllabus_nodes (
                                parent_id, node_type, source_provider, board, grade, subject, title, content, source_url, order_index
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                            """,
                            (
                                grade_id,
                                "subject",
                                "NCERT Official",
                                "CBSE",
                                int(grade),
                                subject_name,
                                subject_name,
                                "",
                                manifest.get("source", ""),
                                subject_index,
                            ),
                        )

                        for book_index, book_entry in enumerate(subject_entry.get("books", []), start=1):
                            book_title = book_entry.get("title", "")
                            book_id = execute(
                                """
                                INSERT INTO syllabus_nodes (
                                    parent_id, node_type, source_provider, board, grade, subject, book_title, title,
                                    content, source_url, order_index
                                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                                """,
                                (
                                    subject_id,
                                    "book",
                                    "NCERT Official",
                                    "CBSE",
                                    int(grade),
                                    subject_name,
                                    book_title,
                                    book_title,
                                    "Official textbook metadata only.",
                                    book_entry.get("page_url", ""),
                                    book_index,
                                ),
                            )

                            for chapter_index, chapter_entry in enumerate(book_entry.get("chapters", []), start=1):
                                chapter_label = clean_text(chapter_entry.get("label", f"Chapter {chapter_index}"))
                                execute(
                                    """
                                    INSERT INTO syllabus_nodes (
                                        parent_id, node_type, source_provider, board, grade, subject, book_title,
                                        chapter_number, title, content, source_url, pdf_url, order_index
                                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                                    """,
                                    (
                                        book_id,
                                        "chapter",
                                        "NCERT Official",
                                        "CBSE",
                                        int(grade),
                                        subject_name,
                                        book_title,
                                        chapter_index,
                                        chapter_label,
                                        f"Official NCERT chapter link for {subject_name} {book_title}.",
                                        chapter_entry.get("page_url", ""),
                                        chapter_entry.get("pdf_url", ""),
                                        chapter_index,
                                    ),
                                )

    # Now, check if Grade 7 is seeded. If not, seed it.
    grade7_existing = fetch_one(
        """
        SELECT COUNT(*) AS total
        FROM syllabus_nodes
        WHERE source_provider = 'NCERT Official' AND grade = 7
        """
    )
    if not grade7_existing or int(grade7_existing["total"]) == 0:
        if board_id is None:
            board_row = fetch_one("SELECT id FROM syllabus_nodes WHERE source_provider = 'NCERT Official' AND node_type = 'board' LIMIT 1")
            if board_row:
                board_id = board_row["id"]
            else:
                board_id = execute(
                    """
                    INSERT INTO syllabus_nodes (
                        node_type, source_provider, board, title, content, source_url, order_index
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    ("board", "NCERT Official", "CBSE", "CBSE", "Official NCERT textbook catalog metadata.", "https://ncert.nic.in/textbook.php", 1),
                )
        seed_grade_7_nodes(board_id)

    manual_science = fetch_one(
        """
        SELECT COUNT(*) AS total
        FROM syllabus_nodes
        WHERE source_provider = 'NCERT Official Science'
          AND grade = 10
          AND subject = 'Science'
        """
    )
    if manual_science and int(manual_science["total"]) == 0:
        board_id = fetch_one("SELECT id FROM syllabus_nodes WHERE source_provider = 'NCERT Official' AND node_type = 'board' LIMIT 1")
        board_ref = board_id["id"] if board_id else None
        grade_ref = execute(
            """
            INSERT INTO syllabus_nodes (
                parent_id, node_type, source_provider, board, grade, title, content, source_url, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (board_ref, "grade", "NCERT Official Science", "CBSE", 10, "Grade 10", "Official NCERT Science chapters only.", "", 10),
        )
        subject_ref = execute(
            """
            INSERT INTO syllabus_nodes (
                parent_id, node_type, source_provider, board, grade, subject, title, content, source_url, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (grade_ref, "subject", "NCERT Official Science", "CBSE", 10, "Science", "Science", "Official Grade 10 Science textbook links.", "", 1),
        )
        book_ref = execute(
            """
            INSERT INTO syllabus_nodes (
                parent_id, node_type, source_provider, board, grade, subject, book_title, title, content, source_url, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                subject_ref,
                "book",
                "NCERT Official Science",
                "CBSE",
                10,
                "Science",
                "Science",
                "NCERT Science",
                "Official textbook page for Grade 10 Science.",
                "https://ncert.nic.in/textbook.php?jesc1=1-16",
                1,
            ),
        )

        chapters = [
            (2, "Acids, Bases and Salts", "https://ncert.nic.in/textbook/pdf/jesc102.pdf"),
            (9, "Light - Reflection and Refraction", "https://ncert.nic.in/textbook/pdf/jesc109.pdf"),
            (11, "Electricity", "https://ncert.nic.in/textbook/pdf/jesc111.pdf"),
        ]
        for index, (chapter_number, title, source_url) in enumerate(chapters, start=1):
            execute(
                """
                INSERT INTO syllabus_nodes (
                    parent_id, node_type, source_provider, board, grade, subject, book_title,
                    chapter_number, title, content, source_url, pdf_url, order_index
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    book_ref,
                    "chapter",
                    "NCERT Official Science",
                    "CBSE",
                    10,
                    "Science",
                    "Science",
                    chapter_number,
                    title,
                    f"Official NCERT chapter link for Grade 10 Science chapter {chapter_number}.",
                    source_url,
                    source_url,
                    index,
                ),
            )


def _tokenize(text: str) -> set[str]:
    stopwords = {
        "what",
        "is",
        "the",
        "and",
        "a",
        "an",
        "to",
        "of",
        "for",
        "me",
        "in",
        "on",
        "about",
        "explain",
        "tell",
        "my",
        "please",
        "chapter",
        "chapters",
        "subject",
    }
    words = re.findall(r"[a-z0-9]+", text.lower())
    return {word for word in words if word not in stopwords}


def _expand_query_tokens(tokens: set[str]) -> set[str]:
    aliases = {
        "photosynthesis": {"photosynthesis", "nutrition", "chlorophyll", "plants"},
        "respiration": {"respiration", "breathing", "cellular"},
        "evaporation": {"evaporation", "heat", "water"},
        "light": {"light", "reflection", "refraction", "mirror", "lens"},
        "electricity": {"electricity", "current", "circuit", "resistance", "ohm"},
        "acid": {"acid", "acids", "base", "bases", "salt", "pH"},
        "acids": {"acid", "acids", "base", "bases", "salt", "pH"},
        "math": {"math", "mathematics", "algebra", "fraction", "equation"},
        "mathematics": {"math", "mathematics", "algebra", "fraction", "equation"},
    }

    expanded = set(tokens)
    for token in tokens:
        expanded.update(aliases.get(token, set()))
    return expanded


def _extract_arithmetic_expression(query: str) -> str:
    text = re.sub(r"\s+", " ", query).strip()
    text = text.replace("×", "*").replace("÷", "/").replace("−", "-").replace("–", "-")

    prefix_patterns = [
        r"^(what is|whats|what's|calculate|compute|solve|evaluate)\s*[:\-]?\s*",
        r"^(can you\s+)?(what is|whats|what's|calculate|compute|solve|evaluate)\s*[:\-]?\s*",
    ]
    for pattern in prefix_patterns:
      text = re.sub(pattern, "", text, flags=re.IGNORECASE)

    text = text.strip().rstrip("?.!")
    candidate = re.sub(r"[^0-9\.\+\-\*\/\(\)\s]", " ", text)
    candidate = re.sub(r"\s+", " ", candidate).strip()
    return candidate


def _safe_eval_arithmetic(expression: str) -> str | None:
    if not expression or not re.search(r"[0-9]", expression) or not re.search(r"[\+\-\*\/]", expression):
        return None

    allowed_binops = {
        ast.Add: lambda a, b: a + b,
        ast.Sub: lambda a, b: a - b,
        ast.Mult: lambda a, b: a * b,
        ast.Div: lambda a, b: a / b,
        ast.FloorDiv: lambda a, b: a // b,
        ast.Mod: lambda a, b: a % b,
    }
    allowed_unary = {
        ast.UAdd: lambda a: a,
        ast.USub: lambda a: -a,
    }

    def _eval(node: ast.AST) -> float:
        if isinstance(node, ast.Expression):
            return _eval(node.body)
        if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
            return float(node.value)
        if isinstance(node, ast.UnaryOp) and type(node.op) in allowed_unary:
            return allowed_unary[type(node.op)](_eval(node.operand))
        if isinstance(node, ast.BinOp) and type(node.op) in allowed_binops:
            left = _eval(node.left)
            right = _eval(node.right)
            return float(allowed_binops[type(node.op)](left, right))
        raise ValueError("Unsupported arithmetic expression")

    try:
        parsed = ast.parse(expression, mode="eval")
        value = _eval(parsed)
    except Exception:
        return None

    if value.is_integer():
        return str(int(value))
    return ("{:.10f}".format(value)).rstrip("0").rstrip(".")


def simple_math_answer(query: str) -> str | None:
    """Return a direct answer for basic arithmetic questions."""

    expression = _extract_arithmetic_expression(query)
    value = _safe_eval_arithmetic(expression)
    if value is None:
        return None
    return f"{expression} = {value}"


def infer_subject_from_query(query: str, fallback_subject: str = "") -> str:
    text = (query or "").lower()
    
    math_keywords = [
        "math", "arithmetic", "expression", "equation", "fraction", "decimal", "algebra",
        "geometry", "bodmas", "number", "ratio", "percent", "probability", "triangle",
        "congruence", "integer", "polynomial", "trigonometry", "derivative", "calculus",
        "quadratic", "pythagoras", "perimeter", "area", "volume", "graph"
    ]
    science_keywords = [
        "science", "acid", "base", "salt", "circuit", "electric", "heat", "plant", "animal",
        "light", "cell", "photosynthesis", "magnet", "motion", "matter", "crop", "sound",
        "atom", "molecule", "tissue", "gravity", "gravitation", "friction", "microorganism",
        "combustion", "flame", "reflection", "refraction", "organism", "reproduction",
        "chemical", "reaction", "element", "compound", "biology", "physics", "chemistry",
        "heredity", "genetics", "ecosystem"
    ]
    ss_keywords = [
        "history", "geography", "civics", "economics", "social", "sst", "land", "earth",
        "continent", "ocean", "empire", "government", "constitution", "revolution", "resource",
        "agriculture", "industry", "freedom", "democracy", "parliament", "ruler", "dynasty"
    ]
    english_keywords = [
        "english", "grammar", "story", "poem", "fable", "unit", "passage", "comprehension",
        "noun", "verb", "adjective", "tense", "vocabulary", "prose", "poet"
    ]

    for kw in math_keywords:
        if kw in text:
            return "Mathematics"
    for kw in science_keywords:
        if kw in text:
            return "Science"
    for kw in ss_keywords:
        if kw in text:
            return "Social Science"
    for kw in english_keywords:
        if kw in text:
            return "English"

    return fallback_subject or ""


def search_knowledge(query: str, grade: int | str | None = None, subject: str | None = None, limit: int = 4) -> list[dict]:
    """Return the most relevant syllabus entries for a question."""

    target_subject = subject or infer_subject_from_query(query)
    entries = fetch_all("SELECT * FROM knowledge_entries ORDER BY grade, subject, chapter_number")

    if grade is not None and str(grade).strip():
        entries = [e for e in entries if str(e.get("grade")) == str(grade)]

    if target_subject:
        entries = [e for e in entries if str(e.get("subject", "")).lower() == target_subject.lower()]

    query_tokens = _expand_query_tokens(_tokenize(query))
    query_text = (query or "").lower().strip()

    scored: list[tuple[int, dict]] = []
    for entry in entries:
        score = 0
        matched_token = False
        entry_text = " ".join(
            [
                str(entry.get("subject", "")),
                str(entry.get("book_title", "")),
                str(entry.get("chapter_title", "")),
                str(entry.get("summary", "")),
                str(entry.get("keywords", "")),
            ]
        ).lower()

        chapter_title = str(entry.get("chapter_title", "")).lower()
        if query_text and chapter_title and (chapter_title in query_text or query_text in chapter_title):
            score += 10

        for token in query_tokens:
            if token in entry_text:
                score += 3
                matched_token = True

        if score > 0 or matched_token:
            scored.append((score, entry))

    scored.sort(key=lambda pair: (-pair[0], pair[1]["grade"], pair[1]["subject"], pair[1]["chapter_number"]))
    results = [entry for _, entry in scored[:limit]]

    # If no database entries matched for that subject, build entry from curriculum chapter list
    if not results and target_subject and grade:
        ch_list = get_subject_chapter_list(grade, target_subject)
        best_match = None
        highest_match_count = -1
        
        # Check explicit chapter number in query (e.g. "chapter 6" -> 6)
        ch_num_match = re.search(r'(?:chapter|ch|unit|lesson)\s*(\d+)', query_text)
        req_ch_num = int(ch_num_match.group(1)) if ch_num_match else None

        for ch in ch_list:
            ch_num = ch.get("chapter_number")
            ch_t = ch.get("chapter_title", "").lower()
            match_count = 0

            if req_ch_num is not None and ch_num == req_ch_num:
                match_count += 50

            for t in query_tokens:
                if len(t) > 2 and t in ch_t:
                    match_count += 3

            # Fuzzy keyword matching for typos
            if "adolescen" in query_text or "groth" in query_text or "puberty" in query_text:
                if "adolescence" in ch_t or "growth" in ch_t:
                    match_count += 35

            if match_count > highest_match_count:
                highest_match_count = match_count
                best_match = ch

        if not best_match and req_ch_num and req_ch_num <= len(ch_list):
            best_match = ch_list[req_ch_num - 1]
        elif not best_match and ch_list:
            best_match = ch_list[0]

        if best_match:
            return [{
                "grade": int(grade),
                "subject": target_subject,
                "book_title": f"NCERT Grade {grade} {target_subject}",
                "chapter_number": best_match.get("chapter_number", 1),
                "chapter_title": best_match.get("chapter_title", "Chapter"),
                "summary": f"Key concepts, definitions, formulas, and step-by-step exercise solutions for {best_match.get('chapter_title')}.",
                "source_url": "NCERT Local Library"
            }]

    return results


def format_knowledge_context(entries: list[dict]) -> str:
    if not entries:
        return "No matching syllabus entries were found in the local SCERT knowledge base."

    lines = ["Relevant SCERT syllabus context:"]
    for entry in entries:
        lines.append(
            f"- Grade {entry['grade']} {entry['subject']} | {entry['book_title']} Ch {entry['chapter_number']}: "
            f"{entry['chapter_title']}. {entry['summary']}"
        )
    return "\n".join(lines)


def get_subject_chapter_list(grade: str | int, subject: str) -> list[dict]:
    g_str = str(grade)
    s_norm = subject.lower().strip()

    entries = fetch_all(
        "SELECT * FROM knowledge_entries WHERE strftime('%s', grade)=? AND LOWER(subject)=? ORDER BY chapter_number",
        (g_str, s_norm)
    )
    if not entries:
        entries = fetch_all(
            "SELECT * FROM knowledge_entries WHERE LOWER(subject)=? ORDER BY chapter_number",
            (s_norm,)
        )
    if entries:
        matched_entries = [e for e in entries if str(e.get("grade")) == g_str]
        if matched_entries:
            return matched_entries

    curr_dict = {
        "6": {
            "Mathematics": ["Patterns in Mathematics", "Lines and Angles", "Number Play", "Data Handling and Presentation", "Prime Time", "Perimeter and Area", "Fractions", "Playing with Constructions", "Symmetry", "The Other Side of Zero"],
            "Science": ["The Wonderful World of Science", "Diversity in the Living World", "Mindful Eating: A Path to a Healthy Body", "Exploring Magnets", "Measurement of Length and Motion", "Materials Around Us", "Temperature and its Measurement", "A Journey through States of Water", "Methods of Separation in Everyday Life", "Living Creatures: Exploring their Characteristics", "Nature's Treasures", "Beyond Earth"],
            "Social Science": ["Locating Places on the Earth", "Oceans and Continents", "Landforms and Life", "Timeline and Sources of History", "India, That Is Bharat", "The Beginnings of Indian Civilisation", "India's Cultural Roots", "Unity in Diversity, or 'Many in the One'", "Family and Community", "Grassroots Democracy – Governance", "Local Government in Rural Areas", "Local Government in Urban Areas", "The Value of Work", "Economic Activities Around Us"],
            "English": ["Unit 1: Fables and Folk Tales", "Unit 2: Friendship", "Unit 3: Nurturing Nature", "Unit 4: Sports and Wellness", "Unit 5: Culture and Tradition"]
        },
        "7": {
            "Science": ["The Ever-Evolving World of Science", "Exploring Substances: Acidic, Basic, Neutral", "Electricity: Circuits and Components", "The World of Metals and Non-metals", "Changes Around Us: Physical and Chemical", "Adolescence: A Stage of Growth and Change", "Heat Transfer in Nature", "Measurement of Time and Motion", "Life Processes in Animals", "Life Processes in Plants", "Light: Shadows and Reflections", "Earth, Moon, and the Sun"],
            "Mathematics": ["Large Numbers Around Us", "Arithmetic Expressions & Order of Operations", "A Peek Beyond the Point (Decimals)", "Expressions using Letter-Numbers (Algebra)", "Parallel and Intersecting Lines", "Number Play (Factors & Multiples)", "Properties of Triangles", "Working with Fractions", "Geometric Twins (Congruence)", "Operations with Integers", "Data Handling (Mean, Median, Mode)", "Percentages & Ratios", "Probability & Chance", "Geometric Constructions", "Finding the Unknown (Simple Equations)"],
            "Social Science": ["Geographical Diversity of India", "Understanding the Weather", "Climate of India", "New Beginnings: Cities and States", "The Rise of Empires", "The Age of Reorganisation", "Gupta Era: Age of Tireless Creativity", "How the Land Becomes Sacred", "Types of Governments", "The Constitution of India", "From Barter to Money", "Understanding Markets", "The Story of Indian Farming", "India and Her Neighbours", "Empires and Kingdoms (6th-10th C)", "Turning Tides (11th-12th C)", "India, a Home to Many", "State Government and You", "Infrastructure and National Growth", "Banks and Financial Literacy"],
            "English": ["Unit 1: Learning Together", "Unit 2: Wit and Humour", "Unit 3: Dreams and Discoveries", "Unit 4: Travel and Adventure", "Unit 5: Bravehearts"]
        },
        "8": {
            "Mathematics": ["Rational Numbers", "Linear Equations in One Variable", "Understanding Quadrilaterals", "Data Handling", "Square and Square Roots", "Cube and Cube Roots", "Comparing Quantities", "Algebraic Expressions and Identities", "Mensuration", "Exponents and Powers", "Direct and Inverse Proportions", "Factorisation", "Introduction to Graphs"],
            "Science": ["Crop Production and Management", "Microorganisms: Friend and Foe", "Coal and Petroleum", "Combustion and Flame", "Conservation of Plants and Animals", "Reproduction in Animals", "Reaching the Age of Adolescence", "Force and Pressure", "Friction", "Sound", "Chemical Effects of Electric Current", "Some Natural Phenomena", "Light"],
            "Social Science": ["Resources", "Land, Soil, Water, Natural Vegetation", "Agriculture", "Industries", "Human Resources", "How, When and Where", "From Trade to Territory", "Ruling the Countryside", "Tribals, Dikus and Vision of Golden Age", "Indian Constitution & Secularism"],
            "English": ["Unit 1: The Best Christmas Present in the World", "Unit 2: The Tsunami", "Unit 3: Glimpses of the Past", "Unit 4: Bepin Choudhury's Lapse of Memory", "Unit 5: The Summit Within", "Unit 6: This is Jody's Fawn"]
        },
        "9": {
            "Mathematics": ["Number Systems", "Polynomials", "Coordinate Geometry", "Linear Equations in Two Variables", "Introduction to Euclid's Geometry", "Lines and Angles", "Triangles", "Quadrilaterals", "Circles", "Heron's Formula", "Surface Areas and Volumes", "Statistics"],
            "Science": ["Matter in Our Surroundings", "Is Matter Around Us Pure", "Atoms and Molecules", "Structure of the Atom", "The Fundamental Unit of Life", "Tissues", "Motion", "Force and Laws of Motion", "Gravitation", "Work and Energy", "Sound", "Improvement in Food Resources"],
            "Social Science": ["The French Revolution", "Socialism in Europe and Russian Revolution", "Nazism and the Rise of Hitler", "India - Size and Location", "Physical Features of India", "Drainage", "Climate", "What is Democracy? Why Democracy?", "Constitutional Design", "The Story of Village Palampur"],
            "English": ["Unit 1: The Fun They Had", "Unit 2: The Sound of Music", "Unit 3: The Little Girl", "Unit 4: A Truly Beautiful Mind", "Unit 5: The Snake and the Mirror", "Unit 6: My Childhood"]
        },
        "10": {
            "Mathematics": ["Real Numbers", "Polynomials", "Pair of Linear Equations in Two Variables", "Quadratic Equations", "Arithmetic Progressions", "Triangles", "Coordinate Geometry", "Introduction to Trigonometry", "Some Applications of Trigonometry", "Circles", "Areas Related to Circles", "Surface Areas and Volumes", "Statistics", "Probability"],
            "Science": ["Chemical Reactions and Equations", "Acids, Bases and Salts", "Metals and Non-metals", "Carbon and Its Compounds", "Life Processes", "Control and Coordination", "How do Organisms Reproduce?", "Heredity and Evolution", "Light - Reflection and Refraction", "The Human Eye and Colourful World", "Electricity", "Magnetic Effects of Electric Current", "Our Environment"],
            "Social Science": ["The Rise of Nationalism in Europe", "Nationalism in India", "The Making of a Global World", "Resources and Development", "Forest and Wildlife Resources", "Water Resources", "Agriculture", "Power Sharing", "Federalism", "Development"],
            "English": ["Unit 1: A Letter to God", "Unit 2: Nelson Mandela: Long Walk to Freedom", "Unit 3: Two Stories about Flying", "Unit 4: From the Diary of Anne Frank", "Unit 5: Glimpses of India", "Unit 6: Mijbil the Otter"]
        }
    }

    sub_dict = curr_dict.get(g_str, {}).get(subject, [])
    return [{"chapter_number": idx + 1, "chapter_title": t, "summary": f"NCERT Grade {g_str} {subject} Chapter {idx + 1}"} for idx, t in enumerate(sub_dict)]


def offline_answer(query: str, entries: list[dict], grade: int | str = "7", subject: str = "Science") -> str:
    # 1. Direct arithmetic answer
    math_ans = simple_math_answer(query)
    if math_ans:
        return f"### Mathematics Calculation\n**Question:** {query}\n**Answer:** {math_ans}"

    lower = (query or "").lower().strip()

    # 2. Key math & science definitions and doubt solvers
    if "lcm" in lower or "hcf" in lower or "gcd" in lower or "least common multiple" in lower or "highest common factor" in lower:
        return (
            f"### Mathematics: LCM vs HCF (NCERT Grade {grade})\n\n"
            "**1. HCF (Highest Common Factor / GCD):**\n"
            "The largest positive integer that divides two or more given numbers without leaving a remainder.\n"
            "• *Example for 12 and 18:*\n"
            "  Factors of 12 = {1, 2, 3, 4, **6**, 12}\n"
            "  Factors of 18 = {1, 2, 3, **6**, 9, 18}\n"
            "  Common Factors = {1, 2, 3, 6} → **HCF = 6**\n\n"
            "**2. LCM (Least Common Multiple):**\n"
            "The smallest positive integer that is a multiple of two or more given numbers.\n"
            "• *Example for 12 and 18:*\n"
            "  Multiples of 12 = {12, 24, **36**, 48, 60...}\n"
            "  Multiples of 18 = {18, **36**, 54, 72...}\n"
            "  Common Multiples = {36, 72, 108...} → **LCM = 36**\n\n"
            "**⭐ Fundamental NCERT Formula:**\n"
            "$$\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b$$\n"
            "*Verification:* $6 \\times 36 = 216$ and $12 \\times 18 = 216$ ✓"
        )

    if "pythagor" in lower or "hypotenuse" in lower:
        return (
            f"### Mathematics: Pythagoras Theorem (NCERT Grade {grade})\n\n"
            "In any right-angled triangle, the square of the hypotenuse ($c$) is equal to the sum of the squares of the other two sides ($a$ and $b$):\n\n"
            "$$a^2 + b^2 = c^2$$\n\n"
            "• **Example:** If base $a = 3\\text{ cm}$ and perpendicular $b = 4\\text{ cm}$:\n"
            "$$c^2 = 3^2 + 4^2 = 9 + 16 = 25 \\implies c = \\sqrt{25} = 5\\text{ cm}$$"
        )

    if "quadratic" in lower or ("formula" in lower and "equation" in lower):
        return (
            f"### Mathematics: Quadratic Formula (NCERT Grade {grade})\n\n"
            "For any quadratic equation in standard form: $$ax^2 + bx + c = 0$$\n\n"
            "$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\n"
            "• **Discriminant ($D = b^2 - 4ac$):**\n"
            "  - $D > 0$: Two distinct real roots.\n"
            "  - $D = 0$: Two equal real roots.\n"
            "  - $D < 0$: No real roots."
        )

    if "photosynthesis" in lower:
        return (
            f"### Science: Photosynthesis (NCERT Grade {grade})\n"
            "**Photosynthesis** is the process by which green plants manufacture glucose and oxygen from carbon dioxide, water, and sunlight using **chlorophyll**.\n\n"
            "**Chemical Equation:**\n"
            "$$6CO_2 + 6H_2O \\xrightarrow{\\text{Sunlight, Chlorophyll}} C_6H_{12}O_6 + 6O_2$$\n\n"
            "• **Location:** Leaf chloroplasts.\n"
            "• **Inputs:** Carbon dioxide (from air), Water (from roots), Sunlight.\n"
            "• **Outputs:** Glucose (stored as starch), Oxygen (released to air)."
        )

    if "gravity" in lower:
        return (
            f"### Science: Discovery of Gravity (NCERT Grade {grade})\n"
            "**Gravity** is the universal force of attraction acting between all matter.\n\n"
            "• **Discovered By:** Sir Isaac Newton in 1687.\n"
            "• **Key Concept:** Mass attracts other mass. Gravitational attraction keeps Earth, the Moon, and planets in stable orbit."
        )

    if "bodmas" in lower:
        return (
            f"### Mathematics: BODMAS Rule (NCERT Grade {grade})\n"
            "The **BODMAS** rule defines the correct priority order for solving arithmetic expressions:\n\n"
            "1. **B**rackets: Solve `()` `[]` `{}` first.\n"
            "2. **O**rders: Evaluate powers and square roots.\n"
            "3. **D**ivision and **M**ultiplication: Left to right.\n"
            "4. **A**ddition and **S**ubtraction: Left to right.\n\n"
            "**Example:** $40 \\div (5 \\times 2) - 3 = 40 \\div 10 - 3 = 4 - 3 = 1$."
        )

    if "acid" in lower or "base" in lower:
        return (
            f"### Science: Acids, Bases and Salts (NCERT Grade {grade})\n"
            "• **Acids:** Sour taste, turn blue litmus **RED** (pH < 7).\n"
            "• **Bases:** Bitter taste, slippery feel, turn red litmus **BLUE** (pH > 7).\n"
            "• **Neutralisation:** Acid + Base $\\rightarrow$ Salt + Water + Heat."
        )

    # 3. Database match answer
    if entries:
        primary = entries[0]
        subj = primary.get("subject", subject)
        ch_title = primary.get("chapter_title", "Chapter")
        ch_num = primary.get("chapter_number", 1)
        summary = primary.get("summary", "")
        return (
            f"### CBSE Grade {primary.get('grade', grade)} {subj}\n"
            f"**Chapter {ch_num}: {ch_title}**\n\n"
            f"{summary}\n\n"
            f"**Study Guidance:** Focus on key NCERT definitions, solved examples, and textbook exercise questions."
        )

    # 4. Fallback NCERT guidance
    return (
        f"### CBSE Grade {grade} NCERT Study Assistance\n\n"
        f"Here is guidance for **{query}** from your Grade {grade} NCERT syllabus:\n"
        f"Review your Grade {grade} NCERT textbook. Focus on core definitions, formulas, and step-by-step exercise problems."
    )


def search_syllabus_nodes(
    query: str,
    grade: int | None = None,
    subject: str | None = None,
    board: str | None = None,
    limit: int = 8,
) -> list[dict]:
    """Search the full imported syllabus tree for matching titles and content."""

    tokens = [token for token in _tokenize(query) if len(token) > 2]
    if not tokens:
      tokens = [query.lower().strip()]

    clauses = []
    params: list[object] = []
    for token in tokens[:6]:
        clauses.append("(LOWER(title) LIKE ? OR LOWER(content) LIKE ?)")
        params.extend([f"%{token}%", f"%{token}%"])

    where_sql = " OR ".join(clauses) if clauses else "1=1"
    if grade is not None:
        where_sql = f"({where_sql}) AND (grade IS NULL OR grade = ?)"
        params.append(int(grade))
    if subject:
        where_sql = f"({where_sql}) AND (subject IS NULL OR LOWER(subject) LIKE ?)"
        params.append(f"%{subject.lower().strip()}%")

    board_order = ""
    order_params = []
    if board:
        board_order = "CASE WHEN LOWER(board) = ? THEN 1 ELSE 2 END,"
        order_params.append(board.lower().strip())

    rows = fetch_all(
        f"""
        SELECT * FROM syllabus_nodes
        WHERE {where_sql}
        ORDER BY
          {board_order}
          CASE node_type
            WHEN 'section' THEN 1
            WHEN 'chapter' THEN 2
            WHEN 'book' THEN 3
            WHEN 'subject' THEN 4
            WHEN 'grade' THEN 5
            ELSE 6
          END,
          grade,
          subject,
          book_title,
          chapter_number,
          section_number
        LIMIT ?
        """,
        (*params, *order_params, limit),
    )
    return rows


def solve_simple_arithmetic(query: str) -> str | None:
    """Solve a math question like '1x231321', '15+26', '25²', '100/4' safely."""

    text = re.sub(r"\s+", " ", query or "").strip()
    text = text.replace("\u00d7", "*").replace("x", "*").replace("X", "*").replace("\u00f7", "/").replace("\u2212", "-").replace("\u2013", "-")
    text = text.replace("²", "**2").replace("³", "**3").replace("^", "**")
    
    text = re.sub(
        r"^(can you\s+)?(what is|whats|what's|calculate|compute|solve|evaluate)\s*[:\-]?\s*",
        "",
        text,
        flags=re.IGNORECASE,
    )
    expression = re.sub(r"[^0-9\.\+\-\*\/\(\)\s]", " ", text)
    expression = re.sub(r"\s+", " ", expression).strip().rstrip("?.!")

    if not expression or not re.search(r"[0-9]", expression):
        return None

    # Check if there is an operator
    has_op = any(op in expression for op in ["+", "-", "*", "/", "**"]) or "**2" in text or "**3" in text
    if not has_op:
        return None

    allowed_binops = {
        ast.Add: lambda a, b: a + b,
        ast.Sub: lambda a, b: a - b,
        ast.Mult: lambda a, b: a * b,
        ast.Div: lambda a, b: a / b,
        ast.Pow: lambda a, b: a ** b,
        ast.FloorDiv: lambda a, b: a // b,
        ast.Mod: lambda a, b: a % b,
    }
    allowed_unary = {
        ast.UAdd: lambda a: a,
        ast.USub: lambda a: -a,
    }

    def _eval(node: ast.AST) -> float:
        if isinstance(node, ast.Expression):
            return _eval(node.body)
        if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
            return float(node.value)
        if isinstance(node, ast.UnaryOp) and type(node.op) in allowed_unary:
            return allowed_unary[type(node.op)](_eval(node.operand))
        if isinstance(node, ast.BinOp) and type(node.op) in allowed_binops:
            left = _eval(node.left)
            right = _eval(node.right)
            return float(allowed_binops[type(node.op)](left, right))
        raise ValueError("Unsupported arithmetic expression")

    try:
        parsed = ast.parse(expression, mode="eval")
        value = _eval(parsed)
    except Exception:
        return None

    answer = str(int(value)) if float(value).is_integer() else ("{:.10f}".format(value)).rstrip("0").rstrip(".")
    pretty_expr = expression.replace("**2", "²").replace("**3", "³").replace("**", "^").replace("*", " × ")
    return f"{pretty_expr} = {answer}"


def classify_tutor_intent(question: str) -> tuple[str, dict]:
    """
    Classify the student's input into distinct intents:
    - greeting: hi, hello, yoo, yo, hey, sup, namaste
    - casual_chat: thanks, ok, lol, cool, great, awesome, bye
    - simple_math: 1x231321, 15+26, 25², 100/4
    - subject_list: maths, science, english, social science
    - quiz_request: quiz, mcq, test me, generate a quiz
    - chapter_summary: summarize, summary, recap
    - ncert_concept: explain photosynthesis, what is bodmas, etc.
    """
    text = (question or "").strip().lower()
    
    # 1. Greetings
    greetings = {"hi", "hello", "hey", "yoo", "yo", "sup", "namaste", "good morning", "good afternoon", "good evening"}
    if text in greetings or any(text == g or text.startswith(g + " ") or text.startswith(g + "!") or text.startswith(g + ",") for g in greetings):
        return ("greeting", {})

    # 2. Casual chat
    casuals = {"thanks", "thank you", "ok", "okay", "lol", "cool", "great", "awesome", "nice", "bye", "goodnight"}
    if text in casuals or any(text == c or text.startswith(c + " ") or text.startswith(c + "!") for c in casuals):
        return ("casual_chat", {})

    # 3. Simple math
    math_ans = solve_simple_arithmetic(question)
    if math_ans:
        return ("simple_math", {"answer": math_ans})

    # 4. Subject list
    subject_map = {
        "maths": "Mathematics", "math": "Mathematics", "mathematics": "Mathematics",
        "science": "Science",
        "english": "English",
        "social science": "Social Science", "sst": "Social Science", "social": "Social Science"
    }
    if text in subject_map:
        return ("subject_list", {"subject": subject_map[text]})

    # 5. Quiz request
    if "quiz" in text or "mcq" in text or "test me" in text or "practice question" in text:
        return ("quiz_request", {})

    # 6. Chapter summary
    if "summarize" in text or "summary" in text or "recap" in text:
        return ("chapter_summary", {})

    # 7. NCERT concept / Study question
    return ("ncert_concept", {})
