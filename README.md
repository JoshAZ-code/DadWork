# 👨‍👦 DadWork - Interactive Homework & Study App

A tailored homework study guide and quiz app built by Dad for **Caleb** (Middle School) and **Christian** (Elementary School).

---

## 🌟 Key Features

### 1. Tailored Dialogue, Humor & Analogies
* **Caleb (Middle School)**:
  * Themes & Analogies: Marvel movies (Iron Man, Avengers, Spider-Man), Soccer (FIFA), NBA basketball, NFL football, WWE wrestling, and video games (Fortnite, Rocket League).
  * Tone: Sarcastic-affectionate sports coach dad who loves gaming and superhero banter.
* **Christian (Elementary School)**:
  * Themes & Analogies: TV shows (*Henry Danger* / Captain Man), Roblox (*Dandy's World*), Minions movies (*bananas!*), *Peppa Pig* (Daddy Pig's muddy puddles), *Dog Man* (Dav Pilkey comic style), and *Diary of a Wimpy Kid* ("Zoo-Wee Mama!").
  * Tone: Goofy, energetic cartoon dad with funny sound effects and enthusiastic encouragement.

### 2. Multi-Attempt Progression Graphs (Per Unit)
* Displays an attempt-by-attempt improvement curve (Attempt #1 ➔ Attempt #2 ➔ Attempt #N).
* Shows score growth deltas (e.g., `▲ +40% Growth`), exact dates, duration, and pacing verdicts.
* Full breakdown of past attempts with Dad's witty commentary logged for every quiz try.

### 3. Thoughtful Timer & Pacing Evaluation (No Rushing!)
* Quizzes feature a live timer that tracks exact completion time.
* Pacing is evaluated to reward **deliberate focus and careful reading** rather than blind speed.
* Rushing through questions triggers Dad's speed alarm with tips to slow down and check work on the next try.

### 4. Interactive Study Modes (By Subject)
* **Dad's Kitchen Table Lesson**: Concrete step-by-step rules and real-life analogies.
* **Active Memorization & Review**: Flip-cards with instant reveal and mastery tracking.
* **Audio Spelling Bee**: Built-in Web Speech synthesis speaks words aloud for spelling tests.
* **Interactive Math Scratchpad**: An HTML5 drawing canvas where the boys can write out their math work and show their steps.
* **The Big Quiz (Max 10 Questions)**: Multiple choice and text-input questions with live Dad reactions and Web Audio sound effects.

### 5. Camera & Google Photos Intake
* Upload homework by snapping a picture directly from phone camera or choosing from Google Photos / gallery.
* Powered by Google Gemini Vision API (with a built-in smart simulation engine if no API key is provided).
* Auto-identifies student (Caleb vs. Christian), subject, and extracts structured lessons, cards, and quizzes with a 1-tap confirmation drawer.

### 6. Dad Joke Locker
* High scores (80%+) unlock corny, groan-worthy dad jokes in each boy's personal locker!

---

## 🚀 How to Run the App

In your terminal or Linux VM:
```bash
python3 server.py
```
Then open:
👉 **`http://localhost:8080`**

The app is completely mobile and tablet responsive! You can also bookmark it or tap **"Add to Home Screen"** on Chrome/Safari to use it full-screen like a native app.
