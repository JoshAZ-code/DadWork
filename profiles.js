// DadWork App - Student Profiles, Personas, and Tailored Dad Dialogue

export const STUDENTS = {
  caleb: {
    id: 'caleb',
    name: 'Caleb',
    gradeLevel: 'Middle School',
    theme: {
      primary: '#2563eb', // Athletic royal blue
      secondary: '#0f172a', // Slate midnight
      accent: '#f59e0b', // NBA court amber
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
      gradient: 'from-blue-600 via-indigo-700 to-slate-900',
      avatarEmoji: '⚡',
      favoriteTag: 'Marvel & Sports Champ'
    },
    interests: [
      'Marvel Movies (Avengers, Spider-Man, Iron Man, Thor)',
      'Soccer & FIFA',
      'NBA Basketball & Buzzer Beaters',
      'NFL Football & Hail Mary Touchdowns',
      'WWE Wrestling & WrestleMania Hype',
      'Video Games: Fortnite, Rocket League & FIFA'
    ],
    dadTone: 'Sarcastic-affectionate sports coach dad who loves gaming and superhero banter',
    dialogue: {
      welcome: [
        "What's good, Caleb! Ready to drop a 40-point game on this homework?",
        "Suit up, Avenger! Today's mission: conquering this study guide.",
        "Fortnite lobby is closed until this unit is 100% complete, captain!",
        "Time for the main event! In this corner: Middle School homework. In the other: The Champ!"
      ],
      lessonIntro: [
        "Alright Caleb, gather round the kitchen table. Let's break this down like game film.",
        "Here's the tactical playbook. Read through this before you go rushing onto the field.",
        "Tony Stark didn't build the Iron Man suit in 5 minutes, Caleb. Check out how this works first."
      ],
      pacingEncouragement: {
        thoughtful: [
          "🎯 Masterful clock management! You took your time on every play, just like Mahomes in the 2-minute drill. Accuracy paid off!",
          "🏀 That was pure patience and court vision! You didn't rush your shots, and the scoreboard shows it!",
          "🛡️ Solid tactical pacing! Iron Man runs diagnostics before firing repulsors. Taking your time got you this top score!"
        ],
        tooFast: [
          "⚡ Whoa there, Speedy! You dashed through that like you were outrunning the Fortnite storm! Slow down, read each question twice, and protect the ball!",
          "🚨 Fumble! You fired off answers faster than a Rocket League kickoff without checking your mirrors. Take your time on the next attempt!",
          "⚠️ Timeout called! Middle school tests love tricky wording. Slow down your turbo boost and check your work!"
        ],
        steady: [
          "⚽ Smooth, steady ball control! You kept a great rhythm and worked through the tough questions with grit."
        ]
      },
      milestoneQuotes: [
        "🏆 VICTORY ROYALE! You just wiped the squad and claimed the #1 Victory Umbrella!",
        "🔥 BUZZER BEATER FROM HALF COURT! Steph Curry just gave a slow nod of respect!",
        "💥 STONE COLD STUNNER! Can Dad get a 'HELL YEAH' for this test score?!",
        "⚽ GOOOOOOOAL! Top corner, off the post and in! World Cup level performance!",
        "🚀 CALCULATED! What a save, what a shot, what an aerial goal in Rocket League!",
        "🦸 Thanos couldn't even snap away this grade. Spectacular job, son!"
      ],
      incorrectHint: [
        "Hey, even Michael Jordan missed 9,000 shots in his career. Dust it off and try this hint:",
        "Blocked at the rim! But you get the rebound. Look at the problem this way:",
        "Shield took a hit, but Captain America can do this all day. Let's rethink this:"
      ]
    },
    dadJokes: [
      { id: 'c1', setup: "Why does Spider-Man always get 100% on his spelling tests?", punchline: "Because he has great Web-sight!", unlocked: true },
      { id: 'c2', setup: "Why was the soccer stadium so hot after the game?", punchline: "All the fans left!", unlocked: true },
      { id: 'c3', setup: "Why did the basketball player visit the bank?", punchline: "Because he was dropping so many dimes!", unlocked: false },
      { id: 'c4', setup: "What is Thor's favorite day of the week?", punchline: "Thors-day... but only after he finishes his chores!", unlocked: false },
      { id: 'c5', setup: "Why can't you play soccer in the jungle?", punchline: "Too many cheetahs!", unlocked: false },
      { id: 'c6', setup: "What do you call a wrestler who does his homework in the ring?", punchline: "The Undertaker... of high grades!", unlocked: false }
    ]
  },

  christian: {
    id: 'christian',
    name: 'Christian',
    gradeLevel: 'Elementary School',
    theme: {
      primary: '#f59e0b', // Warm amber / cartoon sun
      secondary: '#dc2626', // Henry Danger hero red
      accent: '#10b981', // Minion goggles / slime green
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      gradient: 'from-amber-400 via-rose-500 to-indigo-600',
      avatarEmoji: '🦸‍♂️',
      favoriteTag: 'Super Hero & Cartoon Master'
    },
    interests: [
      'Henry Danger (Captain Man, Kid Danger, Man Cave)',
      "Dandy's World (Roblox Toons, Ichor, Twisteds)",
      'Minions & Despicable Me (Bananas, Gru, Silly Laughs)',
      'Peppa Pig (Daddy Pig, Muddy Puddles, George)',
      'Dog Man (Dav Pilkey, Bark Knight, Petey the Cat)',
      'Diary of a Wimpy Kid (Zoo-Wee Mama!, Greg Heffley)'
    ],
    dadTone: 'Goofy, big-hearted cartoon dad who loves silly sound effects, superhero sidekick banter, and high energy',
    dialogue: {
      welcome: [
        "Zoo-Wee Mama, Christian! Look who entered the study cave today!",
        "Captain Man and Kid Danger need your super brain to crack this homework mission!",
        "BEE-DOO BEE-DOO! Homework alert! Get your banana snack and let's roll!",
        "Bark Knight reporting for duty! Sniffing out 100% scores with Christian!"
      ],
      lessonIntro: [
        "Alright little dude, Dad's pulling up a chair! Let's solve this like a Dog Man comic strip.",
        "Captain Man says heroes always read the instructions first before pressing the big red button!",
        "Even Daddy Pig knows how to do this one (and you know how silly his tummy is!). Check this out:"
      ],
      pacingEncouragement: {
        thoughtful: [
          "🌟 ZOO-WEE MAMA! Dad watched you take your time, read every single word, and think before clicking! That is how true heroes win!",
          "🦸‍♂️ Super Hero Focus! You didn't rush into battle like a silly Minion; you planned your moves like Kid Danger! Perfect score!",
          "🐶 Bark Knight level detective work! You sniffed out all the sneaky trap answers by taking your sweet time!"
        ],
        tooFast: [
          "🍌 BEE-DOO BEE-DOO! Speed alarm! You zoomed through like a Minion chasing a flying banana! Take a deep breath, slow down, and read carefully with Dad!",
          "🐷 Snort! Slow down, little piggie! You splashed right past three questions without checking your work! Let's take our time on attempt #2!",
          "🧀 Careful! Rushing gives you the 'Cheese Touch' on your quiz score! Slow and steady wins the race!"
        ],
        steady: [
          "🎉 Beautiful pace, buddy! Not too fast, not too slow—just right, like a warm plate of cookies!"
        ]
      },
      milestoneQuotes: [
        "🎉 ZOO-WEE MAMA! That was an incredible score! Rowley is cheering for you!",
        "🍌 BANANAAA! Stuart, Kevin, and Bob are doing backflips in the kitchen right now!",
        "🦸‍♂️ SWELLVIEW IS SAVED! Captain Man just awarded you the Official Super Kid Trophy!",
        "🐶 BARK KNIGHT HIGH PAW! 10 out of 10 paws up! You are a certified Supa Buddy!",
        "🌧️ Splish, Splash, Splosh! Better than jumping up and down in the biggest muddy puddle ever!",
        "⭐ Dad is doing the goofy victory dance right now! (Don't laugh at my moves, buddy!)"
      ],
      incorrectHint: [
        "Don't worry, buddy! Even Captain Man gets stuck in silly traps. Here's a secret Man-Cave clue:",
        "Ruff! Bark Knight smells a hint nearby. Let's look at it like this:",
        "Oops! A little slip on a banana peel. No big deal, try looking at this part again:"
      ]
    },
    dadJokes: [
      { id: 'ch1', setup: "What do Minions say when they make a 100 on their test?", punchline: "BA-NA-NA-TASTIC!", unlocked: true },
      { id: 'ch2', setup: "Why does Daddy Pig love doing math homework?", punchline: "Because he loves counting his snorts and muddy puddles!", unlocked: true },
      { id: 'ch3', setup: "What is Dog Man's favorite subject in school?", punchline: "Bark-itecture and His-tree!", unlocked: false },
      { id: 'ch4', setup: "What did Captain Man say to the messy bedroom?", punchline: "I am OKAY... but this room is a disaster area!", unlocked: false },
      { id: 'ch5', setup: "Why did the banana go to the doctor?", punchline: "Because it wasn't peeling well!", unlocked: false },
      { id: 'ch6', setup: "Why did Greg Heffley eat his homework?", punchline: "Because the teacher said it was a piece of cake! Zoo-Wee Mama!", unlocked: false }
    ]
  }
};

// Initial sample units pre-loaded with multi-attempt history to demonstrate
// the progression graphs immediately for both boys!
export const INITIAL_UNITS = [
  {
    id: 'unit_christian_math_1',
    studentId: 'christian',
    title: 'Adding 2-Digit Numbers with Regrouping',
    subject: 'Math',
    dateAdded: '2026-10-14',
    sourcePhotoUrl: null,
    notes: 'Elementary worksheet from Mrs. Thompson: 2-digit addition carrying the tens.',
    studyGuide: {
      summary: "Adding bigger numbers is like grouping Toons in Dandy's World or packing Minion gadgets!",
      keyRules: [
        "Always start on the RIGHT side (the Ones place).",
        "If the Ones add up to 10 or more, write down the Ones and carry the 1 Ten up to the attic!",
        "Then add the Tens place column, including the 1 you carried up."
      ],
      dadExample: "If you have 28 bananas and Kevin gives you 15 more: First add 8 + 5 = 13. Put down the 3, carry the 1. Now add 1 + 2 + 1 = 4. Total: 43 bananas! Zoo-Wee Mama!"
    },
    memorizationItems: [
      { term: "8 + 7", definition: "15 (Carry the 1, keep the 5)", type: "flashcard" },
      { term: "9 + 6", definition: "15 (Carry the 1, keep the 5)", type: "flashcard" },
      { term: "7 + 5", definition: "12 (Carry the 1, keep the 2)", type: "flashcard" },
      { term: "9 + 8", definition: "17 (Carry the 1, keep the 7)", type: "flashcard" }
    ],
    quizQuestions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: "What is 27 + 15? (Remember: add 7 + 5 first!)",
        options: ["32", "42", "41", "35"],
        correctIndex: 1,
        explanation: "7 + 5 = 12 (write 2, carry 1). Then 1 + 2 + 1 = 4. That makes 42!"
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: "When you add 38 + 24, which column do you add first?",
        options: ["The Hundreds column", "The Tens column", "The Ones column (on the right)", "Whichever column you feel like!"],
        correctIndex: 2,
        explanation: "Always start with the Ones column on the right side!"
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: "Calculate 46 + 39. What is the sum?",
        options: ["85", "75", "84", "79"],
        correctIndex: 0,
        explanation: "6 + 9 = 15 (carry 1). 1 + 4 + 3 = 8. Answer is 85! Supa Buddy work!"
      },
      {
        id: 'q4',
        type: 'multiple-choice',
        question: "Kid Danger collected 19 gadgets and Captain Man brought 26 gadgets. How many in total?",
        options: ["35", "45", "43", "55"],
        correctIndex: 1,
        explanation: "19 + 26 = 45 gadgets inside the Man Cave!"
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        question: "What happens when the Ones column adds up to 9 or less?",
        options: ["You must carry a 1", "You do NOT need to carry anything", "You ask Daddy Pig for help", "You erase everything"],
        correctIndex: 1,
        explanation: "If it is 9 or less, you don't carry any tens over!"
      }
    ],
    // Multi-attempt progression: 6/10 -> 8/10 -> 10/10 to show improvement graph
    attempts: [
      {
        attemptNumber: 1,
        timestamp: '2026-10-14T16:30:00Z',
        score: 3,
        total: 5,
        percentage: 60,
        timeSeconds: 78, // Rushed
        pacingVerdict: 'tooFast',
        dadFeedback: "You rushed through like a Minion chasing a cookie! Missed carrying the 1 on problem #3. Slow down next time!"
      },
      {
        attemptNumber: 2,
        timestamp: '2026-10-15T17:15:00Z',
        score: 4,
        total: 5,
        percentage: 80,
        timeSeconds: 154, // Much more thoughtful!
        pacingVerdict: 'thoughtful',
        dadFeedback: "Big improvement! Christian took his time, double checked the Ones column, and scored an 80%! One more to 100%!"
      },
      {
        attemptNumber: 3,
        timestamp: '2026-10-16T18:00:00Z',
        score: 5,
        total: 5,
        percentage: 100,
        timeSeconds: 195, // Careful, steady, perfect!
        pacingVerdict: 'thoughtful',
        dadFeedback: "🌟 ZOO-WEE MAMA! 100% PERFECT! Taking your time made all the difference! Dog Man is howling with pride!"
      }
    ]
  },

  {
    id: 'unit_christian_spelling_1',
    studentId: 'christian',
    title: 'Week 7 Superhero Spelling Words',
    subject: 'Spelling',
    dateAdded: '2026-10-15',
    notes: 'Phonics & spelling list: rescue, danger, secret, friend, shield.',
    studyGuide: {
      summary: "Superhero vocabulary words straight out of Henry Danger and Dog Man!",
      keyRules: [
        "Watch for silent letters and tricky vowel teams like 'ie' in friend.",
        "Remember: Fri-end ends with 'end'!",
        "Rescue ends with '-cue' like barbecue!"
      ],
      dadExample: "A true 'friend' helps you out when there is 'danger' in Swellview!"
    },
    memorizationItems: [
      { term: "rescue", definition: "To save someone from danger (r-e-s-c-u-e)", type: "spelling" },
      { term: "danger", definition: "Possibility of harm or injury (d-a-n-g-e-r)", type: "spelling" },
      { term: "secret", definition: "Something kept hidden or private (s-e-c-r-e-t)", type: "spelling" },
      { term: "friend", definition: "A person you know and like (f-r-i-e-n-d)", type: "spelling" },
      { term: "shield", definition: "A protective armor plate (s-h-i-e-l-d)", type: "spelling" }
    ],
    quizQuestions: [
      {
        id: 'sp1',
        type: 'text-input',
        question: "Spell the word: Captain Man rushed to the ________ to save the city.",
        wordToSpell: "rescue",
        explanation: "R-E-S-C-U-E!"
      },
      {
        id: 'sp2',
        type: 'text-input',
        question: "Spell the word: Kid Danger warns the citizens of incoming ________.",
        wordToSpell: "danger",
        explanation: "D-A-N-G-E-R!"
      },
      {
        id: 'sp3',
        type: 'text-input',
        question: "Spell the word: Rowley is Greg Heffley's best ________.",
        wordToSpell: "friend",
        explanation: "F-R-I-E-N-D (remember: friends stay till the end)!"
      },
      {
        id: 'sp4',
        type: 'text-input',
        question: "Spell the word: The location of the Man Cave is a top ________.",
        wordToSpell: "secret",
        explanation: "S-E-C-R-E-T!"
      },
      {
        id: 'sp5',
        type: 'text-input',
        question: "Spell the word: Bark Knight uses a heavy steel ________ for defense.",
        wordToSpell: "shield",
        explanation: "S-H-I-E-L-D (i before e)!"
      }
    ],
    attempts: [
      {
        attemptNumber: 1,
        timestamp: '2026-10-15T18:20:00Z',
        score: 3,
        total: 5,
        percentage: 60,
        timeSeconds: 90,
        pacingVerdict: 'thoughtful',
        dadFeedback: "Great try! Christian nailed 'danger' and 'secret'. Remember 'friend' has an 'ie' in the middle!"
      },
      {
        attemptNumber: 2,
        timestamp: '2026-10-16T19:10:00Z',
        score: 5,
        total: 5,
        percentage: 100,
        timeSeconds: 140,
        pacingVerdict: 'thoughtful',
        dadFeedback: "BOOM! 5 out of 5! That's a master spelling bee badge for the Man Cave!"
      }
    ]
  },

  {
    id: 'unit_caleb_math_1',
    studentId: 'caleb',
    title: 'Pre-Algebra: Solving One-Step Equations',
    subject: 'Math',
    dateAdded: '2026-10-13',
    notes: 'Middle school pre-algebra worksheet: inverse operations (x + 7 = 15, 3x = 24).',
    studyGuide: {
      summary: "Balancing an equation is just like balancing a soccer team or managing your Fortnite inventory.",
      keyRules: [
        "What you do to one side of the equal sign (=), you MUST do to the other side.",
        "To get rid of addition, use subtraction (and vice versa).",
        "To get rid of multiplication, divide both sides."
      ],
      dadExample: "If x + 7 = 15, subtract 7 from both sides: x = 15 - 7 -> x = 8. Smooth as an aerial goal in Rocket League!"
    ],
    memorizationItems: [
      { term: "Inverse of Addition (+)", definition: "Subtraction (-)", type: "flashcard" },
      { term: "Inverse of Subtraction (-)", definition: "Addition (+)", type: "flashcard" },
      { term: "Inverse of Multiplication (×)", definition: "Division (÷)", type: "flashcard" },
      { term: "Inverse of Division (÷)", definition: "Multiplication (×)", type: "flashcard" },
      { term: "Variable (x, y, n)", definition: "An unknown value we need to isolate and solve for", type: "flashcard" }
    ],
    quizQuestions: [
      {
        id: 'cq1',
        type: 'multiple-choice',
        question: "Solve for x: x + 9 = 23",
        options: ["x = 32", "x = 14", "x = 12", "x = 16"],
        correctIndex: 1,
        explanation: "Subtract 9 from both sides: 23 - 9 = 14. Clean play!"
      },
      {
        id: 'cq2',
        type: 'multiple-choice',
        question: "Solve for y: 4y = 36",
        options: ["y = 9", "y = 8", "y = 40", "y = 32"],
        correctIndex: 0,
        explanation: "Divide both sides by 4: 36 / 4 = 9. Right on target!"
      },
      {
        id: 'cq3',
        type: 'multiple-choice',
        question: "Solve for m: m - 12 = 18",
        options: ["m = 6", "m = 30", "m = 28", "m = 15"],
        correctIndex: 1,
        explanation: "Add 12 to both sides: 18 + 12 = 30. Touchdown!"
      },
      {
        id: 'cq4',
        type: 'multiple-choice',
        question: "In FIFA, Caleb scored 3 times as many goals as his opponent (3g). If Caleb scored 6 goals (3g = 6), how many did his opponent score?",
        options: ["g = 2", "g = 3", "g = 18", "g = 9"],
        correctIndex: 0,
        explanation: "3g = 6 -> divide by 3 -> g = 2 goals!"
      },
      {
        id: 'cq5',
        type: 'multiple-choice',
        question: "Solve for k: k / 5 = 7",
        options: ["k = 12", "k = 2", "k = 35", "k = 25"],
        correctIndex: 2,
        explanation: "Multiply both sides by 5: 7 × 5 = 35. Calculated!"
      }
    ],
    attempts: [
      {
        attemptNumber: 1,
        timestamp: '2026-10-13T17:00:00Z',
        score: 3,
        total: 5,
        percentage: 60,
        timeSeconds: 95,
        pacingVerdict: 'tooFast',
        dadFeedback: "Fumbled on problem #3 because you subtracted instead of adding inverse! Slow down your turbo boost!"
      },
      {
        attemptNumber: 2,
        timestamp: '2026-10-14T17:45:00Z',
        score: 4,
        total: 5,
        percentage: 80,
        timeSeconds: 180,
        pacingVerdict: 'thoughtful',
        dadFeedback: "Much better pace! Caleb isolated the variables with confidence. One small math slip on problem 5."
      },
      {
        attemptNumber: 3,
        timestamp: '2026-10-16T16:15:00Z',
        score: 5,
        total: 5,
        percentage: 100,
        timeSeconds: 210,
        pacingVerdict: 'thoughtful',
        dadFeedback: "🔥 100% PERFECT! Like a buzzer-beater 3-pointer! Outstanding focus and discipline!"
      }
    ]
  },

  {
    id: 'unit_caleb_science_1',
    studentId: 'caleb',
    title: 'Earth Science: Plate Tectonics & Earthquakes',
    subject: 'Science',
    dateAdded: '2026-10-16',
    notes: '7th Grade Science: Convergent, divergent, transform boundaries and seismic waves.',
    studyGuide: {
      summary: "Tectonic plates crashing into each other is literally WrestleMania at planetary scale!",
      keyRules: [
        "Convergent Boundary: Plates collide (like two NFL linebackers meeting at the line). Forms mountains and deep trenches.",
        "Divergent Boundary: Plates pull apart (creating new crust, like opening a rift zone).",
        "Transform Boundary: Plates slide past each other (building friction until an earthquake strikes!)."
      ],
      dadExample: "Think of an earthquake like the WWE ring shaking when the Big Show gets body slammed. The focus is where the break happens underground!"
    },
    memorizationItems: [
      { term: "Convergent Boundary", definition: "Tectonic plates colliding together, forming mountains", type: "flashcard" },
      { term: "Divergent Boundary", definition: "Tectonic plates pulling apart from each other", type: "flashcard" },
      { term: "Transform Boundary", definition: "Plates sliding horizontally past one another", type: "flashcard" },
      { term: "Epicenter", definition: "The point on Earth's surface directly above where an earthquake starts", type: "flashcard" },
      { term: "Seismograph", definition: "Instrument used to record seismic waves and ground motion", type: "flashcard" }
    ],
    quizQuestions: [
      {
        id: 'sc1',
        type: 'multiple-choice',
        question: "When two continental plates crash into each other at a convergent boundary, what is typically formed?",
        options: ["Mid-ocean ridges", "Mountain ranges (like the Himalayas)", "A giant flat desert", "Hurricanes"],
        correctIndex: 1,
        explanation: "Massive mountain ranges are pushed up when plates collide!"
      },
      {
        id: 'sc2',
        type: 'multiple-choice',
        question: "What is the point on Earth's surface directly above where an earthquake begins called?",
        options: ["The Focus", "The Epicenter", "The Fault Line", "The Crater"],
        correctIndex: 1,
        explanation: "The Epicenter is on the surface; the Focus is deep underground."
      },
      {
        id: 'sc3',
        type: 'multiple-choice',
        question: "The San Andreas Fault in California is an example of which plate boundary?",
        options: ["Divergent", "Convergent", "Transform (sliding past each other)", "Static"],
        correctIndex: 2,
        explanation: "The Pacific and North American plates slide sideways past each other!"
      },
      {
        id: 'sc4',
        type: 'multiple-choice',
        question: "Which scientific instrument records earthquake vibrations?",
        options: ["Thermometer", "Barometer", "Seismograph", "Telescope"],
        correctIndex: 2,
        explanation: "A seismograph measures and records seismic waves!"
      },
      {
        id: 'sc5',
        type: 'multiple-choice',
        question: "At a divergent boundary, what is happening to the tectonic plates?",
        options: ["They are pulling apart from each other", "They are slamming together", "They are melting instantly", "They do not move"],
        correctIndex: 0,
        explanation: "Divergent plates move away from each other, allowing magma to rise!"
      }
    ],
    attempts: [
      {
        attemptNumber: 1,
        timestamp: '2026-10-16T19:30:00Z',
        score: 4,
        total: 5,
        percentage: 80,
        timeSeconds: 165,
        pacingVerdict: 'thoughtful',
        dadFeedback: "Solid 80% on Earth Science! Just confused epicenter vs focus. Take your time to review that card."
      }
    ]
  }
];
