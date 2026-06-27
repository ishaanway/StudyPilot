# Exhibition Guide for StudyPilot

This guide is written specifically to help a Grade 7 student demonstrate **StudyPilot** at a school exhibition. It contains a script, demonstration walkthrough, and answers to questions the judges might ask.

---

## 1. The 10-Second Elevator Pitch
*Say this as the judges walk up to your desk:*

> "Welcome to **StudyPilot**! This is an AI-powered academic operating system built to help students manage school life, study smart, and stay motivated. It acts as a personal dashboard, calendar, and AI tutor—customized specifically for the new CBSE 2026 syllabus."

---

## 2. Walkthrough Demonstration Script
*Follow these steps to show off the app:*

### Step 1: The Setup (Onboarding)
- Go to the **Profile** screen and click **Reset All Data**.
- *Say to the judge:* 
  > "When a student opens StudyPilot for the first time, they go through a quick setup. I'll enter my name, select my grade (Grade 7), choose the CBSE board, choose my subjects, and set my daily goal."
- Fill out the wizard and click **Get Started**.
- The main dashboard appears with a personalized greeting: *"Hello, [Your Name]!"*

### Step 2: The Dashboard & Streak
- *Point to the progress ring and streak badge:*
  > "This is the Dashboard. It keeps me organized. On the right, you can see my **Study Streak** and a **Progress Ring**. If I check off a task on my today's list, watch how the progress ring automatically fills up and updates my streak!"
- Click a checkbox to mark a task as completed. The ring animates and fills.
- *Point to the AI Coach Suggestions box:*
  > "StudyPilot includes an **AI Coach** that gives smart recommendations. Right now, it suggests a study session. If I click **Start Now** or **Schedule at 7 PM**, the AI updates my timetable instantly."
- Click the suggestion button and show how it adds an item to the timeline.

### Step 3: The Planner & CBSE Syllabus
- Click **Planner** on the sidebar.
- *Say to the judge:*
  > "For 2026, CBSE introduced new NCERT textbooks: **Curiosity** for Science and **Ganita Prakash** for Mathematics. In the left panel of our planner, we have preloaded the actual chapters for these textbooks."
- Expand *Science Ch 3 (Electricity: Circuits and Components)* in the accordion.
- *Show them scheduling:*
  > "I can read about the chapter topics, and if I have an exam coming up, I can click **Schedule Revision**. It opens a calendar box pre-filled with the topic."
- Click **AI Auto-Schedule Revision** at the top:
  > "Instead of planning manually, our **AI Auto-Scheduler** looks at my upcoming exams and free evening blocks, then automatically generates optimized revision sessions to prevent study burnout."

### Step 4: The AI Tutor & Interactive Quiz
- Click **AI Tutor** on the sidebar.
- *Show the Chatbot:*
  > "If I'm stuck on a concept, I can chat with my Study Pilot. I can click one of the quick prompts, like explaining *physical and chemical changes* or *BODMAS rules*."
- Click the suggestion chip *"Explain physical/chemical changes"*. Show how the bot prints a structured explanation.
- *Show the Quiz:*
  > "On the right panel, I can test myself. Let's take a Science quiz on Chapter 3."
- Click **Start Quiz** on Science. Click an answer option. If correct, show the green outline. If incorrect, show the red outline and point out the detailed explanation:
  > "The quiz doesn't just grade me; it explains *why* an answer is correct or incorrect so I can learn from my mistakes immediately."
- Click the **Flashcards** tab:
  > "These flashcards use a **Spaced Repetition Algorithm**. When I flip the card, I can rate it as Easy, Medium, or Hard. The system uses this rating to schedule when I need to review it next, which helps me remember things longer."

### Step 5: The Toolbox (Pomodoro & Career)
- Click **Toolbox** on the sidebar.
- Show the **Pomodoro Timer**:
  > "To help me focus, I use the Pomodoro timer. It sets a 25-minute focus session followed by a break. I can also play ambient sounds like rain or lofi study beats in the background."
- Click the career or notes tools in the toolbox menu:
  > "Imagine I have a page of my textbook. I can open the official PDF directly inside the app and study the same content without leaving StudyPilot."
- Once the progress bar hits 100%, show the formula boxes:
  > "It renders formulas in professional formatting, and I can click **Save to Notes** to instantly add it to my Notion-style notes board!"

---

## 3. Potential Questions from Judges (and how to answer them)

**Q1: What technologies did you use to build this app?**
- *Answer:* "I built this using pure HTML5 for layout structure, custom CSS3 for the responsive styling and dark mode theme, and Vanilla JavaScript for the state management and database simulator."

**Q2: How does the app save my information? Is there a database?**
- *Answer:* "Yes! To make it completely reliable and run without internet, we simulated a database using browser **LocalStorage**. The file `js/db.js` coordinates all reading and writing, meaning that if you close the browser or reload the page, all your tasks, profiles, and calendar schedules remain saved."

**Q3: How does the AI Scheduler work? Is it using real AI?**
- *Answer:* "It uses a rules-based scheduling algorithm. It analyzes the student's exam dates (stored in the database), finds open gaps in their weekly timetable (excluding school hours), and inserts study blocks, prioritizing subjects with upcoming deadlines and balancing them to avoid burnout."

**Q4: How did you implement dark mode?**
- *Answer:* "I defined custom style variables at the top of our stylesheet (`main.css`) for backgrounds, borders, and text. When the user clicks the theme toggle in the sidebar, a JavaScript function toggles the `data-theme` attribute on our document, causing all colors to transition smoothly to our dark mode values."

**Q5: How did you get the math formulas to render so clearly?**
- *Answer:* "We integrated **KaTeX**, which is a fast LaTeX math typesetting library. It parses formulas like `\(Current = \frac{Charge}{Time}\)` in our code and displays them as clean, professional mathematical equations."
