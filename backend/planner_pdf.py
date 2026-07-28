"""Planner chapter PDF catalog, cache, and extraction helpers."""

from __future__ import annotations

import re
import sys
from functools import lru_cache
from pathlib import Path
from typing import Any
from urllib.request import urlopen


PROJECT_ROOT = Path(__file__).resolve().parent.parent
CHAPTER_CACHE_DIR = PROJECT_ROOT / "assets" / "books" / "ncert" / "planner_chapters"
TEXT_CACHE_DIR = CHAPTER_CACHE_DIR / "text"


def _build_chapter_entry(
    chapter_id: str,
    grade: int,
    subject: str,
    chapter_number: int,
    book_code: str,
) -> dict[str, Any]:
    return {
        "id": chapter_id,
        "grade": grade,
        "subject": subject,
        "chapter_number": chapter_number,
        "book_code": book_code,
        "title": f"Chapter {chapter_number}",
        "pdf_url": f"https://ncert.nic.in/textbook/pdf/{book_code}{chapter_number:02d}.pdf",
        "file_name": f"{chapter_id}.pdf",
        "local_url": f"/api/planner/chapters/{chapter_id}/file",
    }


def _build_static_entry(
    chapter_id: str,
    grade: int,
    subject: str,
    chapter_number: int,
    title: str,
    pdf_url: str,
    file_name: str,
) -> dict[str, Any]:
    return {
        "id": chapter_id,
        "grade": grade,
        "subject": subject,
        "chapter_number": chapter_number,
        "book_code": chapter_id,
        "title": title,
        "pdf_url": pdf_url,
        "file_name": file_name,
        "local_url": f"/api/planner/chapters/{chapter_id}/file",
    }


PLANNER_CHAPTER_PDFS: dict[str, dict[str, Any]] = {}

for number in range(1, 13):
    chapter_id = f"s_ch{number}"
    PLANNER_CHAPTER_PDFS[chapter_id] = _build_chapter_entry(chapter_id, 7, "Science", number, "gecu1")

for number in range(1, 9):
    chapter_id = f"m_ch{number}"
    PLANNER_CHAPTER_PDFS[chapter_id] = _build_chapter_entry(chapter_id, 7, "Mathematics", number, "gegp1")

for offset, number in enumerate(range(9, 16), start=1):
    chapter_id = f"m_ch{number}"
    PLANNER_CHAPTER_PDFS[chapter_id] = _build_chapter_entry(chapter_id, 7, "Mathematics", offset, "gegp2")

PLANNER_CHAPTER_PDFS.update(
    {
        # Social Science Part 1
        "ss_ch1": _build_static_entry("ss_ch1", 7, "Social Science", 1, "Geographical Diversity of India", "https://ncert.nic.in/textbook/pdf/gees101.pdf", "ss_ch1.pdf"),
        "ss_ch2": _build_static_entry("ss_ch2", 7, "Social Science", 2, "Understanding the Weather", "https://ncert.nic.in/textbook/pdf/gees102.pdf", "ss_ch2.pdf"),
        "ss_ch3": _build_static_entry("ss_ch3", 7, "Social Science", 3, "Climate of India", "https://ncert.nic.in/textbook/pdf/gees103.pdf", "ss_ch3.pdf"),
        "ss_ch4": _build_static_entry("ss_ch4", 7, "Social Science", 4, "New Beginnings: Cities and States", "https://ncert.nic.in/textbook/pdf/gees104.pdf", "ss_ch4.pdf"),
        "ss_ch5": _build_static_entry("ss_ch5", 7, "Social Science", 5, "The Rise of Empires", "https://ncert.nic.in/textbook/pdf/gees105.pdf", "ss_ch5.pdf"),
        "ss_ch6": _build_static_entry("ss_ch6", 7, "Social Science", 6, "The Age of Reorganisation", "https://ncert.nic.in/textbook/pdf/gees106.pdf", "ss_ch6.pdf"),
        "ss_ch7": _build_static_entry("ss_ch7", 7, "Social Science", 7, "The Gupta Era: An Age of Tireless Creativity", "https://ncert.nic.in/textbook/pdf/gees107.pdf", "ss_ch7.pdf"),
        "ss_ch8": _build_static_entry("ss_ch8", 7, "Social Science", 8, "How the Land Becomes Sacred", "https://ncert.nic.in/textbook/pdf/gees108.pdf", "ss_ch8.pdf"),
        "ss_ch9": _build_static_entry("ss_ch9", 7, "Social Science", 9, "From the Rulers to the Ruled: Types of Governments", "https://ncert.nic.in/textbook/pdf/gees109.pdf", "ss_ch9.pdf"),
        "ss_ch10": _build_static_entry("ss_ch10", 7, "Social Science", 10, "The Constitution of India – An Introduction", "https://ncert.nic.in/textbook/pdf/gees110.pdf", "ss_ch10.pdf"),
        "ss_ch11": _build_static_entry("ss_ch11", 7, "Social Science", 11, "From Barter to Money", "https://ncert.nic.in/textbook/pdf/gees111.pdf", "ss_ch11.pdf"),
        "ss_ch12": _build_static_entry("ss_ch12", 7, "Social Science", 12, "Understanding Markets", "https://ncert.nic.in/textbook/pdf/gees112.pdf", "ss_ch12.pdf"),
        # Social Science Part 2
        "ss_ch13": _build_static_entry("ss_ch13", 7, "Social Science", 13, "The Story of Indian Farming", "https://ncert.nic.in/textbook/pdf/gees201.pdf", "ss_ch13.pdf"),
        "ss_ch14": _build_static_entry("ss_ch14", 7, "Social Science", 14, "India and Her Neighbours", "https://ncert.nic.in/textbook/pdf/gees202.pdf", "ss_ch14.pdf"),
        "ss_ch15": _build_static_entry("ss_ch15", 7, "Social Science", 15, "Empires and Kingdoms: 6th to 10th Centuries", "https://ncert.nic.in/textbook/pdf/gees203.pdf", "ss_ch15.pdf"),
        "ss_ch16": _build_static_entry("ss_ch16", 7, "Social Science", 16, "Turning Tides: 11th and 12th Centuries", "https://ncert.nic.in/textbook/pdf/gees204.pdf", "ss_ch16.pdf"),
        "ss_ch17": _build_static_entry("ss_ch17", 7, "Social Science", 17, "India, a Home to Many", "https://ncert.nic.in/textbook/pdf/gees205.pdf", "ss_ch17.pdf"),
        "ss_ch18": _build_static_entry("ss_ch18", 7, "Social Science", 18, "The State, the Government, and You", "https://ncert.nic.in/textbook/pdf/gees206.pdf", "ss_ch18.pdf"),
        "ss_ch19": _build_static_entry("ss_ch19", 7, "Social Science", 19, "Infrastructure: Engine of India's Development", "https://ncert.nic.in/textbook/pdf/gees207.pdf", "ss_ch19.pdf"),
        "ss_ch20": _build_static_entry("ss_ch20", 7, "Social Science", 20, "Banks and the Magic of Finance", "https://ncert.nic.in/textbook/pdf/gees208.pdf", "ss_ch20.pdf"),
        # English
        "en_u1": _build_static_entry("en_u1", 7, "English", 1, "Unit 1: Learning Together", "https://ncert.nic.in/textbook/pdf/gepr101.pdf", "en_u1.pdf"),
        "en_u2": _build_static_entry("en_u2", 7, "English", 2, "Unit 2: Wit and Humour", "https://ncert.nic.in/textbook/pdf/gepr102.pdf", "en_u2.pdf"),
        "en_u3": _build_static_entry("en_u3", 7, "English", 3, "Unit 3: Dreams and Discoveries", "https://ncert.nic.in/textbook/pdf/gepr103.pdf", "en_u3.pdf"),
        "en_u4": _build_static_entry("en_u4", 7, "English", 4, "Unit 4: Travel and Adventure", "https://ncert.nic.in/textbook/pdf/gepr104.pdf", "en_u4.pdf"),
        "en_u5": _build_static_entry("en_u5", 7, "English", 5, "Unit 5: Bravehearts", "https://ncert.nic.in/textbook/pdf/gepr105.pdf", "en_u5.pdf"),
    }
)

# --- Grade 6 ---
for cid, num, title, subject in [
    ("g6_m_ch1", 1, "Patterns in Mathematics", "Mathematics"),
    ("g6_m_ch2", 2, "Lines and Angles", "Mathematics"),
    ("g6_m_ch3", 3, "Number Play", "Mathematics"),
    ("g6_m_ch4", 4, "Data Handling and Presentation", "Mathematics"),
    ("g6_m_ch5", 5, "Prime Time", "Mathematics"),
    ("g6_m_ch6", 6, "Perimeter and Area", "Mathematics"),
    ("g6_m_ch7", 7, "Fractions", "Mathematics"),
    ("g6_m_ch8", 8, "Playing with Constructions", "Mathematics"),
    ("g6_m_ch9", 9, "Symmetry", "Mathematics"),
    ("g6_m_ch10", 10, "The Other Side of Zero", "Mathematics"),
    ("g6_s_ch1", 1, "The Wonderful World of Science", "Science"),
    ("g6_s_ch2", 2, "Diversity in the Living World", "Science"),
    ("g6_s_ch3", 3, "Mindful Eating: A Path to a Healthy Body", "Science"),
    ("g6_s_ch4", 4, "Exploring Magnets", "Science"),
    ("g6_s_ch5", 5, "Measurement of Length and Motion", "Science"),
    ("g6_s_ch6", 6, "Materials Around Us", "Science"),
    ("g6_s_ch7", 7, "Temperature and its Measurement", "Science"),
    ("g6_s_ch8", 8, "A Journey through States of Water", "Science"),
    ("g6_s_ch9", 9, "Methods of Separation in Everyday Life", "Science"),
    ("g6_s_ch10", 10, "Living Creatures: Exploring their Characteristics", "Science"),
    ("g6_s_ch11", 11, "Nature's Treasures", "Science"),
    ("g6_s_ch12", 12, "Beyond Earth", "Science"),
    ("g6_ss_ch1", 1, "Locating Places on the Earth", "Social Science"),
    ("g6_ss_ch2", 2, "Oceans and Continents", "Social Science"),
    ("g6_ss_ch3", 3, "Landforms and Life", "Social Science"),
    ("g6_ss_ch4", 4, "Timeline and Sources of History", "Social Science"),
    ("g6_ss_ch5", 5, "India, That Is Bharat", "Social Science"),
    ("g6_ss_ch6", 6, "The Beginnings of Indian Civilisation", "Social Science"),
    ("g6_ss_ch7", 7, "India's Cultural Roots", "Social Science"),
    ("g6_ss_ch8", 8, "Unity in Diversity, or 'Many in the One'", "Social Science"),
    ("g6_ss_ch9", 9, "Family and Community", "Social Science"),
    ("g6_ss_ch10", 10, "Grassroots Democracy – Part 1: Governance", "Social Science"),
    ("g6_ss_ch11", 11, "Grassroots Democracy – Part 2: Local Government in Rural Areas", "Social Science"),
    ("g6_ss_ch12", 12, "Grassroots Democracy – Part 3: Local Government in Urban Areas", "Social Science"),
    ("g6_ss_ch13", 13, "The Value of Work", "Social Science"),
    ("g6_ss_ch14", 14, "Economic Activities Around Us", "Social Science"),
    ("g6_en_u1", 1, "Unit 1 – Fables and Folk Tales", "English"),
    ("g6_en_u2", 2, "Unit 2 – Friendship", "English"),
    ("g6_en_u3", 3, "Unit 3 – Nurturing Nature", "English"),
    ("g6_en_u4", 4, "Unit 4 – Sports and Wellness", "English"),
    ("g6_en_u5", 5, "Unit 5 – Culture and Tradition", "English"),
]:
    PLANNER_CHAPTER_PDFS[cid] = _build_static_entry(cid, 6, subject, num, title, f"/assets/books/ncert/planner_chapters/{cid}.pdf", f"{cid}.pdf")

# --- Grade 8 ---
for cid, num, title, subject in [
    ("g8_s_ch1", 1, "Exploring the Investigative World of Science", "Science"),
    ("g8_s_ch2", 2, "The Invisible Living World: Beyond Our Naked Eye", "Science"),
    ("g8_s_ch3", 3, "Health: The Ultimate Treasure", "Science"),
    ("g8_s_ch4", 4, "Electricity: Magnetic and Heating Effects", "Science"),
    ("g8_s_ch5", 5, "Exploring Forces", "Science"),
    ("g8_s_ch6", 6, "Pressure, Winds, Storms and Cyclones", "Science"),
    ("g8_s_ch7", 7, "Particulate Nature of Matter", "Science"),
    ("g8_s_ch8", 8, "Nature of Matter: Elements, Compounds and Mixtures", "Science"),
    ("g8_s_ch9", 9, "The Amazing World of Solutes, Solvents and Solutions", "Science"),
    ("g8_s_ch10", 10, "Light: Mirrors and Lenses", "Science"),
    ("g8_s_ch11", 11, "Keeping Time with the Skies", "Science"),
    ("g8_s_ch12", 12, "How Nature Works in Harmony", "Science"),
    ("g8_s_ch13", 13, "Our Home: Earth, a Unique Life-Sustaining Planet", "Science"),
    ("g8_m_ch1", 1, "A Square and A Cube", "Mathematics"),
    ("g8_m_ch2", 2, "Power Play", "Mathematics"),
    ("g8_m_ch3", 3, "A Story of Numbers", "Mathematics"),
    ("g8_m_ch4", 4, "Quadrilaterals", "Mathematics"),
    ("g8_m_ch5", 5, "Number Play", "Mathematics"),
    ("g8_m_ch6", 6, "We Distribute, Yet Things Multiply", "Mathematics"),
    ("g8_m_ch7", 7, "Proportional Reasoning – 1", "Mathematics"),
    ("g8_m_ch8", 8, "Fractions in Disguise", "Mathematics"),
    ("g8_m_ch9", 9, "The Baudhayana–Pythagoras Theorem", "Mathematics"),
    ("g8_m_ch10", 10, "Proportional Reasoning – 2", "Mathematics"),
    ("g8_m_ch11", 11, "Exploring Some Geometric Themes", "Mathematics"),
    ("g8_m_ch12", 12, "Tales by Dots and Lines", "Mathematics"),
    ("g8_m_ch13", 13, "Algebra Play", "Mathematics"),
    ("g8_m_ch14", 14, "Area", "Mathematics"),
    ("g8_ss_ch1", 1, "India: Location and Physical Features", "Social Science"),
    ("g8_ss_ch2", 2, "Climate and Natural Vegetation", "Social Science"),
    ("g8_ss_ch3", 3, "Agriculture and Natural Resources", "Social Science"),
    ("g8_ss_ch4", 4, "Industries and Human Settlements", "Social Science"),
    ("g8_ss_ch5", 5, "Sources for Indian History", "Social Science"),
    ("g8_ss_ch6", 6, "The Rise of New Kingdoms", "Social Science"),
    ("g8_ss_ch7", 7, "The Delhi Sultanate", "Social Science"),
    ("g8_ss_ch8", 8, "The Mughal Empire", "Social Science"),
    ("g8_ss_ch9", 9, "Regional Kingdoms", "Social Science"),
    ("g8_ss_ch10", 10, "The Coming of Europeans", "Social Science"),
    ("g8_ss_ch11", 11, "The Indian Constitution", "Social Science"),
    ("g8_ss_ch12", 12, "Parliament and Government", "Social Science"),
    ("g8_ss_ch13", 13, "Judiciary and Rule of Law", "Social Science"),
    ("g8_ss_ch14", 14, "Local Self-Government", "Social Science"),
    ("g8_ss_ch15", 15, "Markets and Economy", "Social Science"),
    ("g8_ss_ch16", 16, "Sustainable Development", "Social Science"),
    ("g8_ss_ch17", 17, "India's Cultural Heritage", "Social Science"),
    ("g8_ss_ch18", 18, "India's Diversity", "Social Science"),
    ("g8_ss_ch19", 19, "India and the Modern World", "Social Science"),
    ("g8_ss_ch20", 20, "Responsible Citizenship", "Social Science"),
    ("g8_en_u1", 1, "Unit 1 – Wit and Wisdom", "English"),
    ("g8_en_u2", 2, "Unit 2 – Values and Dispositions", "English"),
    ("g8_en_u3", 3, "Unit 3 – Mystery and Magic", "English"),
    ("g8_en_u4", 4, "Unit 4 – Environment", "English"),
    ("g8_en_u5", 5, "Unit 5 – Science and Curiosity", "English"),
    ("g8_ta_ch1", 1, "தமிழ் 8ஆம் வகுப்பு - பருவம் 1", "Tamil"),
    ("g8_ta_ch2", 2, "தமிழ் 8ஆம் வகுப்பு - பருவம் 2", "Tamil"),
    ("g8_ta_ch3", 3, "தமிழ் 8ஆம் வகுப்பு - பருவம் 3", "Tamil"),
]:
    PLANNER_CHAPTER_PDFS[cid] = _build_static_entry(cid, 8, subject, num, title, f"/assets/books/ncert/planner_chapters/{cid}.pdf", f"{cid}.pdf")

# --- Grade 9 ---
for cid, num, title, subject in [
    ("g9_s_ch1", 1, "Exploration: Entering Secondary Science", "Science"),
    ("g9_s_ch2", 2, "Cell: The Building Block of Life", "Science"),
    ("g9_s_ch3", 3, "Tissues in Action", "Science"),
    ("g9_s_ch4", 4, "Describing Motion Around Us", "Science"),
    ("g9_s_ch5", 5, "Exploring Mixtures and Separation", "Science"),
    ("g9_s_ch6", 6, "How Forces Affect Motion", "Science"),
    ("g9_s_ch7", 7, "Work, Energy and Simple Machines", "Science"),
    ("g9_s_ch8", 8, "Journey Inside the Atom", "Science"),
    ("g9_s_ch9", 9, "Atomic Foundations of Matter", "Science"),
    ("g9_s_ch10", 10, "Sound Waves: Characteristics & Apps", "Science"),
    ("g9_s_ch11", 11, "Reproduction: How Life Continues", "Science"),
    ("g9_s_ch12", 12, "Patterns in Life: Diversity & Class", "Science"),
    ("g9_s_ch13", 13, "Earth as a System: Energy & Matter", "Science"),
    ("g9_m_ch1", 1, "Orienting Yourself: Use of Coordinates", "Mathematics"),
    ("g9_m_ch2", 2, "Introduction to Linear Polynomials", "Mathematics"),
    ("g9_m_ch3", 3, "The World of Numbers", "Mathematics"),
    ("g9_m_ch4", 4, "Exploring Algebraic Identities", "Mathematics"),
    ("g9_m_ch5", 5, "I'm Up and Down, and Round and Round", "Mathematics"),
    ("g9_m_ch6", 6, "Measuring Space: Perimeter and Area", "Mathematics"),
    ("g9_m_ch7", 7, "Mathematics of Maybe: Probability", "Mathematics"),
    ("g9_m_ch8", 8, "Predicting What Comes Next: Sequences", "Mathematics"),
    ("g9_m_ch9", 9, "Congruence", "Mathematics"),
    ("g9_m_ch10", 10, "Parallel Lines", "Mathematics"),
    ("g9_m_ch11", 11, "Area", "Mathematics"),
    ("g9_m_ch12", 12, "Three-Dimensional Shapes", "Mathematics"),
    ("g9_m_ch13", 13, "Introduction to Trigonometric Ratios", "Mathematics"),
    ("g9_m_ch14", 14, "Symmetry", "Mathematics"),
    ("g9_m_ch15", 15, "Mathematical Modelling", "Mathematics"),
    ("g9_ss_ch1", 1, "India and World: Land & People", "Social Science"),
    ("g9_ss_ch2", 2, "Understanding Earth's Surface", "Social Science"),
    ("g9_ss_ch3", 3, "Climate and Natural Systems", "Social Science"),
    ("g9_ss_ch4", 4, "Resources & Sustainable Living", "Social Science"),
    ("g9_ss_ch5", 5, "Early Human Societies", "Social Science"),
    ("g9_ss_ch6", 6, "Ancient Civilisations", "Social Science"),
    ("g9_ss_ch7", 7, "Early Indian Kingdoms", "Social Science"),
    ("g9_ss_ch8", 8, "Cultural Traditions of India", "Social Science"),
    ("g9_ss_ch9", 9, "The Constitution of India", "Social Science"),
    ("g9_ss_ch10", 10, "Democracy and Governance", "Social Science"),
    ("g9_ss_ch11", 11, "Electoral Process", "Social Science"),
    ("g9_ss_ch12", 12, "Local Government", "Social Science"),
    ("g9_ss_ch13", 13, "Economic Activities", "Social Science"),
    ("g9_ss_ch14", 14, "Development & Sustainability", "Social Science"),
    ("g9_ss_ch15", 15, "India in Contemporary World", "Social Science"),
    ("g9_ss_ch16", 16, "Responsible Citizenship", "Social Science"),
    ("g9_en_u1", 1, "Unit 1 – How I Taught My Grandmother / Bharat Our Land", "English"),
    ("g9_en_u2", 2, "Unit 2 – The Pot Maker / Gifts of Grace", "English"),
    ("g9_en_u3", 3, "Unit 3 – Winds of Change / Canvas of Soil", "English"),
    ("g9_en_u4", 4, "Unit 4 – Vitamin-M / I Cannot Remember My Mother", "English"),
    ("g9_en_u5", 5, "Unit 5 – Limitless Possibilities / Nine Gold Medals", "English"),
    ("g9_en_u6", 6, "Unit 6 – Twin Melodies / A Friend Found in Music", "English"),
    ("g9_en_u7", 7, "Unit 7 – Carrier of Words / Words", "English"),
    ("g9_en_u8", 8, "Unit 8 – Follow That Dream / Believe in Yourself", "English"),
    ("g9_ta_ch1", 1, "தமிழ் 9ஆம் வகுப்பு - பருவம் 1", "Tamil"),
    ("g9_ta_ch2", 2, "தமிழ் 9ஆம் வகுப்பு - பருவம் 2", "Tamil"),
    ("g9_ta_ch3", 3, "தமிழ் 9ஆம் வகுப்பு - பருவம் 3", "Tamil"),
]:
    PLANNER_CHAPTER_PDFS[cid] = _build_static_entry(cid, 9, subject, num, title, f"/assets/books/ncert/planner_chapters/{cid}.pdf", f"{cid}.pdf")

# --- Grade 10 ---
for cid, num, title, subject in [
    ("g10_m_ch1", 1, "Real Numbers", "Mathematics"),
    ("g10_m_ch2", 2, "Polynomials", "Mathematics"),
    ("g10_m_ch3", 3, "Pair of Linear Equations in Two Variables", "Mathematics"),
    ("g10_m_ch4", 4, "Quadratic Equations", "Mathematics"),
    ("g10_m_ch5", 5, "Arithmetic Progressions", "Mathematics"),
    ("g10_m_ch6", 6, "Triangles", "Mathematics"),
    ("g10_m_ch7", 7, "Coordinate Geometry", "Mathematics"),
    ("g10_m_ch8", 8, "Introduction to Trigonometry", "Mathematics"),
    ("g10_m_ch9", 9, "Some Applications of Trigonometry", "Mathematics"),
    ("g10_m_ch10", 10, "Circles", "Mathematics"),
    ("g10_m_ch11", 11, "Areas Related to Circles", "Mathematics"),
    ("g10_m_ch12", 12, "Surface Areas and Volumes", "Mathematics"),
    ("g10_m_ch13", 13, "Statistics", "Mathematics"),
    ("g10_m_ch14", 14, "Probability", "Mathematics"),
    ("g10_s_ch1", 1, "Chemical Reactions and Equations", "Science"),
    ("g10_s_ch2", 2, "Acids, Bases and Salts", "Science"),
    ("g10_s_ch3", 3, "Metals and Non-metals", "Science"),
    ("g10_s_ch4", 4, "Carbon and Its Compounds", "Science"),
    ("g10_s_ch5", 5, "Life Processes", "Science"),
    ("g10_s_ch6", 6, "Control and Coordination", "Science"),
    ("g10_s_ch7", 7, "How Do Organisms Reproduce?", "Science"),
    ("g10_s_ch8", 8, "Heredity", "Science"),
    ("g10_s_ch9", 9, "Light – Reflection and Refraction", "Science"),
    ("g10_s_ch10", 10, "Human Eye and Colourful World", "Science"),
    ("g10_s_ch11", 11, "Electricity", "Science"),
    ("g10_s_ch12", 12, "Magnetic Effects of Electric Current", "Science"),
    ("g10_s_ch13", 13, "Our Environment", "Science"),
    ("g10_s_ch14", 14, "Sources of Energy", "Science"),
    ("g10_ss_ch1", 1, "Rise of Nationalism in Europe", "Social Science"),
    ("g10_ss_ch2", 2, "Nationalism in India", "Social Science"),
    ("g10_ss_ch3", 3, "Making of a Global World", "Social Science"),
    ("g10_ss_ch4", 4, "Age of Industrialisation", "Social Science"),
    ("g10_ss_ch5", 5, "Print Culture and Modern World", "Social Science"),
    ("g10_ss_ch6", 6, "Resources and Development", "Social Science"),
    ("g10_ss_ch7", 7, "Forest and Wildlife Resources", "Social Science"),
    ("g10_ss_ch8", 8, "Water Resources", "Social Science"),
    ("g10_ss_ch9", 9, "Agriculture", "Social Science"),
    ("g10_ss_ch10", 10, "Minerals and Energy Resources", "Social Science"),
    ("g10_ss_ch11", 11, "Manufacturing Industries", "Social Science"),
    ("g10_ss_ch12", 12, "Lifelines of National Economy", "Social Science"),
    ("g10_ss_ch13", 13, "Power Sharing", "Social Science"),
    ("g10_ss_ch14", 14, "Federalism", "Social Science"),
    ("g10_ss_ch15", 15, "Gender, Religion and Caste", "Social Science"),
    ("g10_ss_ch16", 16, "Political Parties", "Social Science"),
    ("g10_ss_ch17", 17, "Outcomes of Democracy", "Social Science"),
    ("g10_ss_ch18", 18, "Development", "Social Science"),
    ("g10_ss_ch19", 19, "Sectors of the Indian Economy", "Social Science"),
    ("g10_ss_ch20", 20, "Money and Credit", "Social Science"),
    ("g10_ss_ch21", 21, "Globalisation and Indian Economy", "Social Science"),
    ("g10_ss_ch22", 22, "Consumer Rights", "Social Science"),
    ("g10_en_u1", 1, "First Flight: A Letter to God", "English"),
    ("g10_en_u2", 2, "First Flight: Nelson Mandela – Long Walk to Freedom", "English"),
    ("g10_en_u3", 3, "First Flight: Two Stories about Flying", "English"),
    ("g10_en_u4", 4, "First Flight: From the Diary of Anne Frank", "English"),
    ("g10_en_u5", 5, "First Flight: Glimpses of India", "English"),
    ("g10_en_u6", 6, "First Flight: Mijbil the Otter", "English"),
    ("g10_en_u7", 7, "First Flight: Madam Rides the Bus", "English"),
    ("g10_en_u8", 8, "First Flight: The Sermon at Benares", "English"),
    ("g10_en_u9", 9, "First Flight: The Proposal", "English"),
    ("g10_en_u10", 10, "Footprints: A Triumph of Surgery", "English"),
    ("g10_en_u11", 11, "Footprints: The Thief's Story", "English"),
    ("g10_en_u12", 12, "Footprints: The Midnight Visitor", "English"),
    ("g10_en_u13", 13, "Footprints: A Question of Trust", "English"),
    ("g10_en_u14", 14, "Footprints: Footprints Without Feet", "English"),
    ("g10_en_u15", 15, "Footprints: The Making of a Scientist", "English"),
    ("g10_en_u16", 16, "Footprints: The Necklace", "English"),
    ("g10_en_u17", 17, "Footprints: Bholi", "English"),
    ("g10_en_u18", 18, "Footprints: The Book That Saved the Earth", "English"),
    ("g10_ta_ch1", 1, "தமிழ் 10ஆம் வகுப்பு - பருவம் 1", "Tamil"),
    ("g10_ta_ch2", 2, "தமிழ் 10ஆம் வகுப்பு - பருவம் 2", "Tamil"),
    ("g10_ta_ch3", 3, "தமிழ் 10ஆம் வகுப்பு - பருவம் 3", "Tamil"),
]:
    PLANNER_CHAPTER_PDFS[cid] = _build_static_entry(cid, 10, subject, num, title, f"/assets/books/ncert/planner_chapters/{cid}.pdf", f"{cid}.pdf")



def _runtime_site_packages() -> list[Path]:
    home = Path.home()
    base = home / ".cache" / "codex-runtimes" / "codex-primary-runtime" / "dependencies" / "python" / "Lib" / "site-packages"
    return [base] if base.exists() else []


def _ensure_pdf_runtime() -> None:
    for path in _runtime_site_packages():
        path_str = str(path)
        if path_str not in sys.path:
            sys.path.append(path_str)


@lru_cache(maxsize=1)
def _load_pypdf_reader():
    _ensure_pdf_runtime()
    from pypdf import PdfReader  # type: ignore

    return PdfReader


def chapter_catalog(grade: int | None = None, subjects: list[str] | None = None) -> list[dict[str, Any]]:
    subject_set = {str(subject or "").strip().lower() for subject in (subjects or []) if str(subject or "").strip()}
    items: list[dict[str, Any]] = []

    for item in PLANNER_CHAPTER_PDFS.values():
        if grade is not None and int(item["grade"]) != int(grade):
            continue
        if subject_set and str(item["subject"]).strip().lower() not in subject_set:
            continue
        path = CHAPTER_CACHE_DIR / str(item["file_name"])
        items.append(
            {
                **item,
                "downloaded": path.exists() and path.stat().st_size > 0,
            }
        )
    return sorted(items, key=lambda item: (int(item["grade"]), str(item["subject"]), str(item["id"])))


def chapter_resource(chapter_id: str) -> dict[str, Any] | None:
    key = str(chapter_id or "").strip()
    item = PLANNER_CHAPTER_PDFS.get(key)
    if not item:
        return None
    path = CHAPTER_CACHE_DIR / str(item["file_name"])
    return {
        **item,
        "downloaded": path.exists() and path.stat().st_size > 0,
    }


def chapter_file_path(chapter_id: str) -> Path:
    item = chapter_resource(chapter_id)
    if not item:
        raise KeyError(f"Unknown planner chapter: {chapter_id}")
    return CHAPTER_CACHE_DIR / str(item["file_name"])


def ensure_chapter_downloaded(chapter_id: str) -> dict[str, Any]:
    item = chapter_resource(chapter_id)
    if not item:
        raise KeyError(f"Unknown planner chapter: {chapter_id}")

    CHAPTER_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    target = CHAPTER_CACHE_DIR / str(item["file_name"])
    if target.exists() and target.stat().st_size > 0:
        return {**item, "downloaded": True}

    from urllib.request import Request
    req = Request(str(item["pdf_url"]), headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=90) as response:
        target.write_bytes(response.read())

    return {**item, "downloaded": True}


def prefetch_chapters(grade: int, subjects: list[str] | None = None) -> list[dict[str, Any]]:
    results: list[dict[str, Any]] = []
    for item in chapter_catalog(grade=grade, subjects=subjects):
        try:
            results.append(ensure_chapter_downloaded(str(item["id"])))
        except Exception as exc:  # pragma: no cover - best effort cache warmup
            results.append({**item, "downloaded": False, "error": str(exc)})
    return results


def extract_chapter_text(chapter_id: str, max_chars: int = 22000) -> str:
    path = chapter_file_path(chapter_id)
    if not path.exists():
        raise FileNotFoundError(f"Chapter PDF not found for {chapter_id}")

    TEXT_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_path = TEXT_CACHE_DIR / f"{chapter_id}.txt"
    if cache_path.exists() and cache_path.stat().st_size > 0:
        cached = cache_path.read_text(encoding="utf-8", errors="ignore")
        return cached[:max_chars]

    PdfReader = _load_pypdf_reader()
    reader = PdfReader(str(path))
    chunks: list[str] = []
    for page in reader.pages:
        text = page.extract_text() or ""
        if text.strip():
            chunks.append(text)

    cleaned = _clean_pdf_text("\n".join(chunks))
    cache_path.write_text(cleaned, encoding="utf-8")
    return cleaned[:max_chars]


def _clean_pdf_text(text: str) -> str:
    lines: list[str] = []
    for raw in str(text or "").splitlines():
        line = re.sub(r"\s+", " ", raw).strip()
        if not line:
            continue
        if re.fullmatch(r"\d+", line):
            continue
        lines.append(line)
    return "\n".join(lines)
