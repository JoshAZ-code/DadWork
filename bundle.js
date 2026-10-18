// DadWork App - Complete Self-Contained Bundle
// Includes: Multi-Page Packet Tray, Video Scans, Visual Biological Diagram Labeling Engine & Cross-Device Sharing

(function() {
  'use strict';

  // Global error safety shield
  window.addEventListener('error', function(e) {
    console.error('DadWork Runtime Error:', e);
    const main = document.getElementById('app-main');
    if (main && !main.innerHTML.trim()) {
      main.innerHTML = `
        <div style="max-width: 500px; margin: 40px auto; padding: 24px; background: #fff1f2; border: 2px solid #fecdd3; border-radius: 16px; font-family: sans-serif; text-align: center;">
          <h3 style="color: #9f1239; margin-bottom: 8px;">DadWork App Notice</h3>
          <p style="color: #4c0519; font-size: 14px; margin-bottom: 16px;">${e.message || 'Error initializing app'}</p>
          <button onclick="localStorage.clear(); location.reload();" style="padding: 8px 16px; background: #e11d48; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
            Reset Local Data & Reload
          </button>
        </div>
      `;
    }
  });

  // ==========================================
  // 1. PROFILES & TAILORED DAD HUMOR DATA
  // ==========================================
  const STUDENTS = {
    caleb: {
      id: 'caleb',
      name: 'Caleb',
      gradeLevel: 'Middle School',
      theme: {
        primary: '#2563eb',
        secondary: '#0f172a',
        accent: '#f59e0b',
        badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
        gradient: 'from-blue-600 via-indigo-700 to-slate-900',
        avatarEmoji: '⚡',
        favoriteTag: 'Marvel & Sports Champ'
      },
      interests: [
        'Marvel Movies (Avengers, Spider-Man, Iron Man, Thor)',
        'Soccer & FIFA',
        'NBA Basketball & Buzzer Beaters',
        'NFL Football & Touchdowns',
        'WWE Wrestling & WrestleMania Hype',
        'Video Games: Fortnite, Rocket League & FIFA'
      ],
      dadTone: 'Sarcastic-affectionate sports coach dad who loves gaming and superhero banter',
      dialogue: {
        welcome: [
          "What's good, Caleb! Ready to drop a 40-point game on this homework packet?",
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
        primary: '#f59e0b',
        secondary: '#dc2626',
        accent: '#10b981',
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
          "Captain Man and Kid Danger need your super brain to crack this homework packet!",
          "BEE-DOO BEE-DOO! Homework alert! Get your banana snack and let's roll!",
          "Bark Knight reporting for duty! Sniffing out 100% scores with Christian!"
        ],
        lessonIntro: [
          "Alright little dude, Dad's pulling up a chair! Let's solve this packet like a Dog Man comic strip.",
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

  // ==========================================
  // 2. BIOLOGICAL DIAGRAM ENGINES & DATA
  // ==========================================
  const BIOLOGICAL_DIAGRAMS = {
    insect: {
      id: 'insect',
      title: "Insect & Bug Anatomy (3 Main Body Regions)",
      description: "Every true insect has 3 main body segments, 2 antennae, and 6 jointed legs attached to the middle thorax!",
      parts: [
        { id: 'A', name: 'Antennae (Feelers)', role: 'Sensory feelers used for smelling, touching, and sensing vibrations/danger', calebDadTip: "Like Spider-Man's Spidey-Sense or a FIFA radar tracking defenders!", christianDadTip: "Like Captain Man's super radar in the Man Cave sniffing out danger! BEE-DOO!" },
        { id: 'B', name: 'Head', role: 'Front body segment containing compound eyes, mouthparts, and the insect brain', calebDadTip: "The command center where Tony Stark's HUD interface sits!", christianDadTip: "Where the bug wears its Minion goggles to look for sweet bananas!" },
        { id: 'C', name: 'Thorax (Middle Section)', role: 'The muscular engine segment! ALL 6 legs and wings are attached right here', calebDadTip: "The turbo engine of a Rocket League Octane car! All 6 wheels/legs plug in here.", christianDadTip: "Kid Danger's jetpack zone! Holds all 6 legs so the bug can zoom!" },
        { id: 'D', name: 'Abdomen (Rear Segment)', role: 'The largest rear section containing the stomach, heart, and sting/defense', calebDadTip: "The fuel tank where the bug digests snacks—like drinking a Fortnite chug jug!", christianDadTip: "The bug's big tummy! Just like Daddy Pig's muddy puddle tummy!" },
        { id: 'E', name: '6 Jointed Legs', role: '3 pairs of jointed legs attached exclusively to the thorax for climbing and running', calebDadTip: "6 legs for maximum agility—even Messi couldn't dribble past that defense!", christianDadTip: "Dog Man counted: 1, 2, 3, 4, 5, 6 paws! Twice as many as Bark Knight!" }
      ]
    },
    flower: {
      id: 'flower',
      title: "Parts of a Flower & Plant Reproduction",
      description: "Flowers have specialized organs for attracting pollinators, creating pollen, and growing seeds!",
      parts: [
        { id: 'A', name: 'Petal', role: 'Brightly colored, scented leaf that attracts bees, butterflies, and pollinators', calebDadTip: "Like the flashy neon skins in Fortnite or vibrant team kits in soccer!", christianDadTip: "Bright and colorful like a giant bunch of Minion bananas! Zoo-Wee Mama!" },
        { id: 'B', name: 'Stamen (Anther & Filament)', role: 'The male reproductive organ that creates yellow powdery pollen', calebDadTip: "The striker on the pitch firing off pollen shots toward the goal!", christianDadTip: "The yellow pollen powder shakers! Rowley would sneeze if he smelled it!" },
        { id: 'C', name: 'Pistil / Carpel (Stigma & Ovary)', role: 'The sticky center tube that catches pollen to fertilize baby seeds', calebDadTip: "The goalkeeper catching the cross! Keeps the seeds safe inside the ovary.", christianDadTip: "Sticky like chewed bubble gum from Swellview! Catches pollen like a net!" },
        { id: 'D', name: 'Sepal', role: 'Small green leaf-like structures that protected the young flower bud before opening', calebDadTip: "Captain America's vibranium shield protecting the baby flower!", christianDadTip: "The cozy green pajamas the flower wore when it was just a tiny baby bud!" },
        { id: 'E', name: 'Stem', role: 'Strong support stalk that carries water and nutrients up from the roots', calebDadTip: "The supply drop elevator carrying water all the way to the top!", christianDadTip: "A giant green drinking straw slurping up muddy puddle water from the ground!" }
      ]
    }
  };

  /**
   * Renders an interactive SVG biological diagram with labeled pins A, B, C, D, E
   */
  function renderBiologicalDiagram(type, activeMarkerId = null, isInteractive = false) {
    if (type === 'insect') {
      return `
        <div class="relative w-full max-w-md mx-auto select-none">
          <svg viewBox="0 0 520 280" class="w-full h-auto drop-shadow-md">
            <!-- Background glow -->
            <rect width="520" height="280" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
            
            <!-- 6 Jointed Legs (attached to thorax at center x: 230-290, y: 140) -->
            <!-- Top 3 legs -->
            <path d="M 230 130 Q 210 70 170 50" fill="none" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
            <path d="M 260 125 Q 260 60 250 40" fill="none" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
            <path d="M 290 130 Q 320 65 350 50" fill="none" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
            <!-- Bottom 3 legs -->
            <path d="M 230 155 Q 210 215 170 235" fill="none" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
            <path d="M 260 160 Q 260 225 250 245" fill="none" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
            <path d="M 290 155 Q 320 220 350 235" fill="none" stroke="#334155" stroke-width="5" stroke-linecap="round"/>

            <!-- Antennae (from head) -->
            <path d="M 125 130 Q 80 100 50 85" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/>
            <circle cx="50" cy="85" r="4" fill="#1e293b"/>
            <path d="M 125 155 Q 80 185 50 200" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/>
            <circle cx="50" cy="200" r="4" fill="#1e293b"/>

            <!-- Body Segment 1: Head (x: 140, y: 142) -->
            <ellipse cx="145" cy="142" rx="32" ry="28" fill="#e2e8f0" stroke="#0f172a" stroke-width="3.5"/>
            <!-- Compound Eyes -->
            <ellipse cx="132" cy="126" rx="8" ry="6" fill="#0f172a"/>
            <ellipse cx="132" cy="158" rx="8" ry="6" fill="#0f172a"/>

            <!-- Body Segment 2: Thorax (Center, x: 260, y: 142) -->
            <ellipse cx="260" cy="142" rx="55" ry="42" fill="#fed7aa" stroke="#c2410c" stroke-width="3.5"/>
            <!-- Wings overlay -->
            <path d="M 250 130 Q 340 70 410 95 Q 350 145 270 140 Z" fill="rgba(147, 197, 253, 0.45)" stroke="#3b82f6" stroke-width="2"/>
            <path d="M 250 155 Q 340 215 410 190 Q 350 140 270 145 Z" fill="rgba(147, 197, 253, 0.45)" stroke="#3b82f6" stroke-width="2"/>

            <!-- Body Segment 3: Abdomen (Rear, x: 395, y: 142) -->
            <ellipse cx="395" cy="142" rx="68" ry="38" fill="#fef08a" stroke="#ca8a04" stroke-width="3.5"/>
            <!-- Abdomen Segment Stripes -->
            <line x1="365" y1="108" x2="365" y2="176" stroke="#a16207" stroke-width="3"/>
            <line x1="395" y1="105" x2="395" y2="179" stroke="#a16207" stroke-width="3"/>
            <line x1="425" y1="108" x2="425" y2="176" stroke="#a16207" stroke-width="3"/>

            <!-- PIN A: Antennae Pointer -->
            <line x1="55" y1="65" x2="80" y2="90" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
            ${renderPinBadge(55, 65, 'A', activeMarkerId === 'A', isInteractive, 'insect')}

            <!-- PIN B: Head Pointer -->
            <line x1="145" y1="75" x2="145" y2="110" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
            ${renderPinBadge(145, 65, 'B', activeMarkerId === 'B', isInteractive, 'insect')}

            <!-- PIN C: Thorax Pointer -->
            <line x1="260" y1="20" x2="260" y2="95" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
            ${renderPinBadge(260, 20, 'C', activeMarkerId === 'C', isInteractive, 'insect')}

            <!-- PIN D: Abdomen Pointer -->
            <line x1="395" y1="65" x2="395" y2="100" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
            ${renderPinBadge(395, 55, 'D', activeMarkerId === 'D', isInteractive, 'insect')}

            <!-- PIN E: 6 Jointed Legs Pointer -->
            <line x1="180" y1="255" x2="200" y2="225" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
            ${renderPinBadge(180, 255, 'E', activeMarkerId === 'E', isInteractive, 'insect')}
          </svg>
        </div>
      `;
    } else if (type === 'flower') {
      return `
        <div class="relative w-full max-w-md mx-auto select-none">
          <svg viewBox="0 0 520 300" class="w-full h-auto drop-shadow-md">
            <rect width="520" height="300" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
            
            <!-- Stem -->
            <path d="M 260 170 Q 260 230 250 280" fill="none" stroke="#16a34a" stroke-width="12" stroke-linecap="round"/>
            <!-- Stem Leaf -->
            <path d="M 255 230 Q 200 220 185 240 Q 225 255 253 238" fill="#22c55e" stroke="#15803d" stroke-width="2.5"/>

            <!-- Sepal (green base leaves) -->
            <path d="M 225 175 Q 260 200 295 175 Q 260 160 225 175 Z" fill="#15803d" stroke="#14532d" stroke-width="2"/>
            <path d="M 215 185 Q 200 160 225 170" fill="#22c55e" stroke="#15803d" stroke-width="3"/>
            <path d="M 305 185 Q 320 160 295 170" fill="#22c55e" stroke="#15803d" stroke-width="3"/>

            <!-- Petals (Red/Pink/Amber) -->
            <ellipse cx="260" cy="75" rx="34" ry="46" fill="#f43f5e" stroke="#be123c" stroke-width="3"/>
            <ellipse cx="205" cy="115" rx="46" ry="34" fill="#fb7185" stroke="#be123c" stroke-width="3"/>
            <ellipse cx="315" cy="115" rx="46" ry="34" fill="#fb7185" stroke="#be123c" stroke-width="3"/>
            <ellipse cx="225" cy="160" rx="42" ry="32" fill="#f43f5e" stroke="#be123c" stroke-width="3"/>
            <ellipse cx="295" cy="160" rx="42" ry="32" fill="#f43f5e" stroke="#be123c" stroke-width="3"/>

            <!-- Stamens (Male Anthers with Pollen) -->
            <path d="M 250 145 Q 220 110 215 85" fill="none" stroke="#ca8a04" stroke-width="3"/>
            <ellipse cx="215" cy="85" rx="7" ry="5" fill="#facc15" stroke="#a16207" stroke-width="2"/>
            <path d="M 270 145 Q 300 110 305 85" fill="none" stroke="#ca8a04" stroke-width="3"/>
            <ellipse cx="305" cy="85" rx="7" ry="5" fill="#facc15" stroke="#a16207" stroke-width="2"/>

            <!-- Center Pistil / Carpel (Female) -->
            <path d="M 255 155 Q 255 110 255 85 Q 260 75 265 85 Q 265 110 265 155 Z" fill="#86efac" stroke="#16a34a" stroke-width="2.5"/>
            <!-- Stigma knob -->
            <ellipse cx="260" cy="78" rx="8" ry="6" fill="#4ade80" stroke="#15803d" stroke-width="2"/>
            <!-- Ovary base -->
            <ellipse cx="260" cy="155" rx="18" ry="16" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/>

            <!-- PIN A: Petal Pointer -->
            <line x1="120" y1="90" x2="175" y2="105" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
            ${renderPinBadge(120, 90, 'A', activeMarkerId === 'A', isInteractive, 'flower')}

            <!-- PIN B: Stamen / Anther Pointer -->
            <line x1="395" y1="75" x2="315" y2="85" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
            ${renderPinBadge(395, 75, 'B', activeMarkerId === 'B', isInteractive, 'flower')}

            <!-- PIN C: Pistil / Stigma Center Pointer -->
            <line x1="260" y1="35" x2="260" y2="70" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
            ${renderPinBadge(260, 35, 'C', activeMarkerId === 'C', isInteractive, 'flower')}

            <!-- PIN D: Sepal Pointer -->
            <line x1="150" y1="185" x2="215" y2="180" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
            ${renderPinBadge(150, 185, 'D', activeMarkerId === 'D', isInteractive, 'flower')}

            <!-- PIN E: Stem Pointer -->
            <line x1="365" y1="245" x2="265" y2="245" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
            ${renderPinBadge(365, 245, 'E', activeMarkerId === 'E', isInteractive, 'flower')}
          </svg>
        </div>
      `;
    }
    return '';
  }

  function renderPinBadge(cx, cy, letter, isActive, isInteractive, diagramType) {
    const bg = isActive ? '#ef4444' : '#1e293b';
    const border = isActive ? '#ffffff' : '#f8fafc';
    const scale = isActive ? 'scale(1.25)' : 'scale(1)';
    const cursor = isInteractive ? 'cursor-pointer' : 'pointer-events-none';
    const clickHandler = isInteractive ? `onclick="window.DadApp.selectDiagramPart('${diagramType}', '${letter}')"` : '';

    return `
      <g class="${cursor} transition-transform" style="transform-origin: ${cx}px ${cy}px; transform: ${scale};" ${clickHandler}>
        <circle cx="${cx}" cy="${cy}" r="17" fill="${bg}" stroke="${border}" stroke-width="3" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"/>
        <text x="${cx}" y="${cy + 5}" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle" font-family="sans-serif">
          ${letter}
        </text>
      </g>
    `;
  }

  // Pre-loaded units including interactive visual biology units!
  const INITIAL_UNITS = [
    {
      id: 'unit_christian_science_1',
      studentId: 'christian',
      title: 'Insect Anatomy: 3 Body Parts & Bug Identification',
      subject: 'Science',
      diagramType: 'insect',
      dateAdded: '2026-10-17',
      notes: 'Elementary Biology: Identifying the head, thorax, abdomen, antennae, and 6 jointed legs of an insect.',
      studyGuide: {
        summary: "Every insect in the world has 3 main body segments, 2 feelers, and 6 legs—just like an army of Minions building gadgets!",
        keyRules: [
          "Head (Pin B): Holds the compound eyes, mouth, and antenna feelers.",
          "Thorax (Pin C): The middle engine! ALL 6 legs and wings connect exclusively to the thorax.",
          "Abdomen (Pin D): The rear section containing the stomach, heart, and stinger.",
          "All insects have exactly 6 legs (3 pairs) and 2 antennae!"
        ],
        dadExample: "If you see a spider with 8 legs, it's NOT an insect! A real insect has 6 legs attached to its thorax and a big abdomen like Daddy Pig's tummy!"
      },
      memorizationItems: [
        { term: "Head", definition: "Front segment with eyes, mouth, and antennae", type: "flashcard" },
        { term: "Thorax", definition: "Middle body section where all 6 legs and wings attach", type: "flashcard" },
        { term: "Abdomen", definition: "Rear segment with digestive organs and stinger", type: "flashcard" },
        { term: "6 Legs", definition: "The exact number of jointed legs every insect has", type: "flashcard" },
        { term: "Antennae", definition: "Sensory organs used to feel, smell, and detect danger", type: "flashcard" }
      ],
      quizQuestions: [
        {
          id: 'ins_q1',
          type: 'multiple-choice',
          diagramType: 'insect',
          activeMarker: 'C',
          question: "Look at the insect diagram: Which letter points to the THORAX (the middle engine section where all 6 legs attach)?",
          options: ["Letter B (Front)", "Letter C (Middle section)", "Letter D (Rear)", "Letter A (Top feelers)"],
          correctIndex: 1,
          explanation: "Letter C is the Thorax! That's the engine room holding all 6 legs and wings!"
        },
        {
          id: 'ins_q2',
          type: 'multiple-choice',
          diagramType: 'insect',
          activeMarker: 'D',
          question: "Look at Pin D on the rear section of the bug. What is this part called?",
          options: ["The Abdomen (Tummy & Organs)", "The Head", "The Thorax", "The Wing"],
          correctIndex: 0,
          explanation: "Letter D is the Abdomen—the bug's tummy and digestion section!"
        },
        {
          id: 'ins_q3',
          type: 'multiple-choice',
          diagramType: 'insect',
          activeMarker: 'A',
          question: "Which letter on the diagram points to the insect's ANTENNAE (used to smell and feel)?",
          options: ["Pin E", "Pin C", "Pin A (Top feelers)", "Pin D"],
          correctIndex: 2,
          explanation: "Pin A points to the antennae! They sniff out food and sense danger like Captain Man!"
        },
        {
          id: 'ins_q4',
          type: 'multiple-choice',
          diagramType: 'insect',
          activeMarker: 'E',
          question: "How many jointed legs (indicated by Pin E) does every true insect have?",
          options: ["4 legs", "6 legs (3 pairs)", "8 legs", "10 legs"],
          correctIndex: 1,
          explanation: "Every insect has exactly 6 legs attached to the thorax! Spiders have 8, so spiders aren't insects!"
        },
        {
          id: 'ins_q5',
          type: 'multiple-choice',
          diagramType: 'insect',
          activeMarker: 'B',
          question: "Which letter points to the HEAD containing the compound eyes and mouthparts?",
          options: ["Pin B", "Pin C", "Pin E", "Pin D"],
          correctIndex: 0,
          explanation: "Pin B is the Head! Where the bug wears its Minion goggles!"
        }
      ],
      attempts: []
    },

    {
      id: 'unit_caleb_biology_1',
      studentId: 'caleb',
      title: 'Plant Biology: Flower Anatomy & Reproduction',
      subject: 'Science',
      diagramType: 'flower',
      dateAdded: '2026-10-17',
      notes: '7th Grade Biology: Labeling petals, stamens, anthers, pistil, sepal, and stem.',
      studyGuide: {
        summary: "Plant anatomy is just like an NFL offensive line: every part has a distinct blocking or scoring assignment to produce seeds!",
        keyRules: [
          "Petal (Pin A): Bright colorful leaves that attract pollinators like bees and hummingbirds.",
          "Stamen (Pin B): The male organ (anther + filament) that manufactures pollen dust.",
          "Pistil (Pin C): The sticky female organ (stigma, style, ovary) that catches pollen to grow seeds.",
          "Sepal (Pin D): Green protective leaves at the base that shielded the baby bud.",
          "Stem (Pin E): The highway that carries water and nutrients up from the soil."
        ],
        dadExample: "Think of pollen like a soccer ball: the Stamen kicks it, the bee acts as the midfielder carrying it, and the sticky Pistil catches it for a goal! Boom!"
      },
      memorizationItems: [
        { term: "Petal", definition: "Colorful leaf designed to attract insect pollinators", type: "flashcard" },
        { term: "Stamen", definition: "The male flower part consisting of the anther and filament", type: "flashcard" },
        { term: "Pistil / Carpel", definition: "The female flower part consisting of stigma, style, and ovary", type: "flashcard" },
        { term: "Sepal", definition: "Protective outer green leaves supporting the petals", type: "flashcard" },
        { term: "Stem", definition: "Structural support stalk transporting water from roots", type: "flashcard" }
      ],
      quizQuestions: [
        {
          id: 'flw_q1',
          type: 'multiple-choice',
          diagramType: 'flower',
          activeMarker: 'A',
          question: "Look at the flower diagram: Which letter points to the PETAL (attracts pollinators)?",
          options: ["Letter B", "Letter A", "Letter D", "Letter E"],
          correctIndex: 1,
          explanation: "Letter A points to the Petal! Flashy like team colors in FIFA!"
        },
        {
          id: 'flw_q2',
          type: 'multiple-choice',
          diagramType: 'flower',
          activeMarker: 'B',
          question: "Which letter indicates the STAMEN (the male organ producing pollen)?",
          options: ["Letter B", "Letter C", "Letter E", "Letter A"],
          correctIndex: 0,
          explanation: "Letter B is the Stamen (with the yellow anther making pollen)!"
        },
        {
          id: 'flw_q3',
          type: 'multiple-choice',
          diagramType: 'flower',
          activeMarker: 'C',
          question: "Pin C points to the sticky center tube that receives pollen. What is this organ called?",
          options: ["The Stem", "The Petal", "The Pistil (or Carpel)", "The Sepal"],
          correctIndex: 2,
          explanation: "Pin C is the Pistil! Its sticky stigma catches pollen to fertilize seeds in the ovary."
        },
        {
          id: 'flw_q4',
          type: 'multiple-choice',
          diagramType: 'flower',
          activeMarker: 'D',
          question: "Which letter points to the SEPAL (the green leaves protecting the young bud)?",
          options: ["Pin A", "Pin B", "Pin D", "Pin E"],
          correctIndex: 2,
          explanation: "Pin D is the Sepal! Nature's Captain America shield for the baby flower bud!"
        },
        {
          id: 'flw_q5',
          type: 'multiple-choice',
          diagramType: 'flower',
          activeMarker: 'E',
          question: "What is the primary function of the STEM (indicated by Pin E)?",
          options: ["To produce seeds", "To attract bees with sweet nectar", "To support the flower and transport water from the roots", "To catch pollen"],
          correctIndex: 2,
          explanation: "The Stem provides structural support and pumps water from the soil up to the flower!"
        }
      ],
      attempts: []
    },

    {
      id: 'unit_christian_math_1',
      studentId: 'christian',
      title: 'Adding 2-Digit Numbers with Regrouping',
      subject: 'Math',
      dateAdded: '2026-10-14',
      notes: 'Elementary worksheet: 2-digit addition carrying the tens place.',
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
      attempts: [
        {
          attemptNumber: 1,
          timestamp: '2026-10-14T16:30:00Z',
          score: 3,
          total: 5,
          percentage: 60,
          timeSeconds: 78,
          pacingVerdict: 'tooFast',
          dadFeedback: "You rushed through like a Minion chasing a cookie! Missed carrying the 1 on problem #3. Slow down next time!"
        },
        {
          attemptNumber: 2,
          timestamp: '2026-10-15T17:15:00Z',
          score: 4,
          total: 5,
          percentage: 80,
          timeSeconds: 154,
          pacingVerdict: 'thoughtful',
          dadFeedback: "Big improvement! Christian took his time, double checked the Ones column, and scored an 80%! One more to 100%!"
        },
        {
          attemptNumber: 3,
          timestamp: '2026-10-16T18:00:00Z',
          score: 5,
          total: 5,
          percentage: 100,
          timeSeconds: 195,
          pacingVerdict: 'thoughtful',
          dadFeedback: "🌟 ZOO-WEE MAMA! 100% PERFECT! Taking your time made all the difference! Dog Man is howling with pride!"
        }
      ]
    },

    {
      id: 'unit_caleb_math_1',
      studentId: 'caleb',
      title: 'Pre-Algebra: Solving One-Step Equations',
      subject: 'Math',
      dateAdded: '2026-10-13',
      notes: 'Middle school pre-algebra: inverse operations (x + 7 = 15, 3x = 24).',
      studyGuide: {
        summary: "Balancing an equation is just like balancing a soccer team or managing your Fortnite inventory.",
        keyRules: [
          "What you do to one side of the equal sign (=), you MUST do to the other side.",
          "To get rid of addition, use subtraction (and vice versa).",
          "To get rid of multiplication, divide both sides."
        ],
        dadExample: "If x + 7 = 15, subtract 7 from both sides: x = 15 - 7 -> x = 8. Smooth as an aerial goal in Rocket League!"
      },
      memorizationItems: [
        { term: "Inverse of Addition (+)", definition: "Subtraction (-)", type: "flashcard" },
        { term: "Inverse of Subtraction (-)", definition: "Addition (+)", type: "flashcard" },
        { term: "Inverse of Multiplication (×)", definition: "Division (÷)", type: "flashcard" },
        { term: "Inverse of Division (÷)", definition: "Multiplication (×)", type: "flashcard" }
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
    }
  ];

  // ==========================================
  // 3. PROGRESSION ENGINE (SVG GRAPH)
  // ==========================================
  function renderUnitProgression(unit, student) {
    const attempts = unit.attempts || [];
    if (attempts.length === 0) {
      return `
        <div class="empty-attempts-card text-center p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
          <div class="text-4xl mb-2">🎯</div>
          <h4 class="font-bold text-slate-800 text-lg">No Quiz Attempts Yet</h4>
          <p class="text-slate-500 text-sm max-w-sm mx-auto mb-4">
            Once ${student.name} completes the quiz for this unit, you'll see a complete progression graph showing how their score and pacing improve across Attempt 1, 2, 3, and beyond!
          </p>
          <button onclick="window.DadApp.startQuiz('${unit.id}')" class="px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all active:scale-95">
            Take First Quiz Attempt
          </button>
        </div>
      `;
    }

    const latestAttempt = attempts[attempts.length - 1];
    const firstAttempt = attempts[0];
    const bestAttempt = [...attempts].sort((a, b) => b.percentage - a.percentage)[0];
    const scoreDelta = latestAttempt.percentage - firstAttempt.percentage;
    const hasMultipleAttempts = attempts.length > 1;

    const svgChart = generateProgressionSVG(attempts, student);

    return `
      <div class="progression-view-container space-y-6">
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${unit.subject === 'Math' ? 'bg-indigo-100 text-indigo-700' : unit.subject === 'Spelling' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                ${unit.subject}
              </span>
              <span class="text-xs text-slate-500 font-medium">${unit.dateAdded}</span>
            </div>
            <h3 class="text-xl font-extrabold text-slate-900">${unit.title}</h3>
            <p class="text-sm text-slate-600 mt-0.5">${unit.notes || 'Interactive study unit with quizzes and memorization exercises.'}</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="text-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
              <div class="text-xs text-slate-500 uppercase font-semibold">Attempts</div>
              <div class="text-2xl font-black text-slate-800">${attempts.length}</div>
            </div>
            <div class="text-center px-4 py-2 rounded-xl border ${latestAttempt.percentage >= 80 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'}">
              <div class="text-xs uppercase font-semibold">Latest Score</div>
              <div class="text-2xl font-black">${latestAttempt.percentage}% <span class="text-xs font-normal">(${latestAttempt.score}/${latestAttempt.total})</span></div>
            </div>
            <button onclick="window.DadApp.startQuiz('${unit.id}')" class="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 text-sm">
              <span>📝 Retake (Attempt #${attempts.length + 1})</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-slate-100 gap-2">
            <div>
              <h4 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>📈</span>
                <span>Attempt-by-Attempt Score & Pacing Curve</span>
              </h4>
              <p class="text-xs text-slate-500">Tracking ${student.name}'s performance progression across each attempt</p>
            </div>
            <div class="flex items-center gap-2">
              ${hasMultipleAttempts ? `
                <span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${scoreDelta > 0 ? 'bg-emerald-100 text-emerald-800' : scoreDelta === 0 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'}">
                  ${scoreDelta > 0 ? `▲ +${scoreDelta}% Growth` : scoreDelta === 0 ? '✦ Score Maintained' : `▼ ${scoreDelta}% Change`}
                </span>
              ` : `
                <span class="text-xs text-slate-400 italic">Complete another attempt to see score growth</span>
              `}
            </div>
          </div>

          <div class="w-full overflow-x-auto pb-2">
            ${svgChart}
          </div>

          <div class="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <div class="text-2xl">💡</div>
            <div class="text-xs text-amber-900 leading-relaxed">
              <strong class="font-bold text-amber-950">Dad's Pacing Rule of Thumb:</strong> 
              Notice how higher scores consistently align with spending thoughtful seconds per question. 
              ${latestAttempt.pacingVerdict === 'thoughtful' 
                ? `<span class="font-bold text-emerald-800">${student.name} took their time (${formatSeconds(latestAttempt.timeSeconds)}) and showed true mastery!</span>`
                : `<span class="font-bold text-rose-800">${student.name} zoomed quickly (${formatSeconds(latestAttempt.timeSeconds)}). Encourage them to slow down and check their answers on the next attempt!</span>`
              }
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h4 class="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <span>📋</span>
            <span>Detailed Breakdown of Each Attempt</span>
          </h4>

          <div class="space-y-3">
            ${attempts.slice().reverse().map((att, idx) => {
              const attemptIdx = attempts.length - idx;
              const isLatest = idx === 0;
              const isBest = att.percentage === bestAttempt.percentage;
              
              return `
                <div class="p-4 rounded-xl border ${isLatest ? 'border-indigo-300 bg-indigo-50/40' : 'border-slate-200 bg-white'} hover:shadow-sm transition-all">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${att.percentage >= 80 ? 'bg-emerald-100 text-emerald-700' : att.percentage >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-700'}">
                        #${att.attemptNumber || attemptIdx}
                      </div>
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-bold text-slate-900">Attempt #${att.attemptNumber || attemptIdx}</span>
                          ${isLatest ? '<span class="text-[10px] uppercase font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full">Most Recent</span>' : ''}
                          ${isBest ? '<span class="text-[10px] uppercase font-black bg-amber-500 text-white px-2 py-0.5 rounded-full">Top Score 🏆</span>' : ''}
                        </div>
                        <div class="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                          <span>📅 ${formatDate(att.timestamp)}</span>
                          <span>•</span>
                          <span>⏱️ Duration: <strong>${formatSeconds(att.timeSeconds)}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center gap-4">
                      <div class="text-right">
                        <div class="text-xl font-black ${att.percentage >= 80 ? 'text-emerald-600' : att.percentage >= 60 ? 'text-amber-600' : 'text-rose-600'}">
                          ${att.percentage}%
                        </div>
                        <div class="text-xs text-slate-500 font-medium">
                          ${att.score} of ${att.total} correct
                        </div>
                      </div>
                      <div class="px-2.5 py-1 rounded-lg text-xs font-semibold ${att.pacingVerdict === 'thoughtful' ? 'bg-emerald-100 text-emerald-800' : att.pacingVerdict === 'tooFast' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}">
                        ${att.pacingVerdict === 'thoughtful' ? '🎯 Thoughtful Focus' : att.pacingVerdict === 'tooFast' ? '⚡ Rushed Pacing' : '⏱️ Steady Rhythm'}
                      </div>
                    </div>
                  </div>

                  ${att.dadFeedback ? `
                    <div class="mt-3 pt-3 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-700">
                      <span class="text-base select-none">💬</span>
                      <div>
                        <strong class="font-bold text-slate-900">Dad's Commentary:</strong>
                        <span class="italic text-slate-600">"${att.dadFeedback}"</span>
                      </div>
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function generateProgressionSVG(attempts, student) {
    const width = 640;
    const height = 220;
    const paddingLeft = 50;
    const paddingRight = 40;
    const paddingTop = 30;
    const paddingBottom = 40;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;
    const yLevels = [0, 20, 40, 60, 80, 100];

    const points = attempts.map((att, i) => {
      const x = attempts.length === 1 
        ? paddingLeft + chartWidth / 2 
        : paddingLeft + (i / (attempts.length - 1)) * chartWidth;
      const y = paddingTop + chartHeight - (att.percentage / 100) * chartHeight;
      return { x, y, ...att, index: i };
    });

    let pathD = '';
    let areaD = '';
    if (points.length === 1) {
      pathD = `M ${points[0].x - 30} ${points[0].y} L ${points[0].x + 30} ${points[0].y}`;
    } else {
      pathD = points.reduce((acc, p, i) => {
        return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
      }, '');
      areaD = `${pathD} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;
    }

    const primaryColor = student.id === 'caleb' ? '#2563eb' : '#f59e0b';

    return `
      <svg viewBox="0 0 ${width} ${height}" class="w-full max-w-[640px] mx-auto overflow-visible select-none" style="min-width: 320px;">
        <defs>
          <linearGradient id="grad-${student.id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0.3" />
            <stop offset="100%" stop-color="${primaryColor}" stop-opacity="0.0" />
          </linearGradient>
        </defs>

        ${yLevels.map(pct => {
          const y = paddingTop + chartHeight - (pct / 100) * chartHeight;
          const isTarget = pct === 80;
          return `
            <line x1="${paddingLeft}" y1="${y}" x2="${width - paddingRight}" y2="${y}" 
                  stroke="${isTarget ? '#10b981' : '#e2e8f0'}" 
                  stroke-width="${isTarget ? '1.5' : '1'}" 
                  stroke-dasharray="${isTarget ? '4 3' : 'none'}" />
            <text x="${paddingLeft - 8}" y="${y + 4}" fill="${isTarget ? '#059669' : '#94a3b8'}" 
                  font-size="10" font-weight="${isTarget ? 'bold' : 'normal'}" text-anchor="end">
              ${pct}%
            </text>
          `;
        }).join('')}

        <text x="${width - paddingRight}" y="${paddingTop + chartHeight - (80 / 100) * chartHeight - 6}" 
              fill="#059669" font-size="9" font-weight="bold" text-anchor="end">
          Target Mastery (80%)
        </text>

        ${areaD ? `<path d="${areaD}" fill="url(#grad-${student.id})" />` : ''}

        <path d="${pathD}" fill="none" stroke="${primaryColor}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

        ${points.map((p, i) => {
          const isMastered = p.percentage >= 80;
          const nodeColor = isMastered ? '#10b981' : p.percentage >= 60 ? '#f59e0b' : '#ef4444';
          const labelY = p.y < 50 ? p.y + 22 : p.y - 12;

          return `
            <g class="cursor-pointer">
              <circle cx="${p.x}" cy="${p.y}" r="8" fill="${nodeColor}" fill-opacity="0.2" />
              <circle cx="${p.x}" cy="${p.y}" r="5" fill="${nodeColor}" stroke="#ffffff" stroke-width="2" />
              <rect x="${p.x - 22}" y="${labelY - 10}" width="44" height="18" rx="6" fill="#1e293b" />
              <text x="${p.x}" y="${labelY + 2}" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">
                ${p.percentage}%
              </text>
              <text x="${p.x}" y="${paddingTop + chartHeight + 16}" fill="#334155" font-size="11" font-weight="bold" text-anchor="middle">
                Attempt #${p.attemptNumber || (i + 1)}
              </text>
              <text x="${p.x}" y="${paddingTop + chartHeight + 28}" fill="#64748b" font-size="9" text-anchor="middle">
                ⏱️ ${formatSeconds(p.timeSeconds)}
              </text>
            </g>
          `;
        }).join('')}
      </svg>
    `;
  }

  function formatSeconds(secs) {
    if (!secs && secs !== 0) return '0s';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  }

  function formatDate(isoString) {
    if (!isoString) return 'Recent';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return 'Recent';
    }
  }

  // ==========================================
  // 4. GEMINI API & SMART VISION ENGINE (MULTI-PAGE & VIDEO & DIAGRAMS)
  // ==========================================
  const GEMINI_API_STORAGE_KEY = 'dadwork_gemini_api_key';

  function getGeminiApiKey() {
    return localStorage.getItem(GEMINI_API_STORAGE_KEY) || '';
  }

  function setGeminiApiKey(key) {
    if (!key) {
      localStorage.removeItem(GEMINI_API_STORAGE_KEY);
    } else {
      localStorage.setItem(GEMINI_API_STORAGE_KEY, key.trim());
    }
  }

  async function extractDocxTextFallback(arrayBuffer) {
    if (!arrayBuffer) return '';
    try {
      const decoder = new TextDecoder('utf-8', { fatal: false });
      const str = decoder.decode(arrayBuffer);
      const matches = str.match(/<w:t[^>]*>([^<]+)<\/w:t>/g);
      if (matches && matches.length > 0) {
        return matches.map(m => m.replace(/<[^>]+>/g, '')).join(' ').trim();
      }
    } catch (e) {
      console.warn('Fallback docx parsing error:', e);
    }
    return '';
  }

  async function analyzeWorksheetPacket(pages, preferredStudentId) {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return simulateMultiPageAnalysis(pages, preferredStudentId);
    }

    const pageCount = pages ? pages.length : 1;
    const promptText = `
You are the AI engine for "DadWork", an interactive homework app built by a loving dad for his two sons:
- Caleb: Middle School. Interests: Marvel movies (Avengers, Spider-Man, Iron Man), Soccer & FIFA, WWE wrestling, NBA basketball, NFL football, video games (Fortnite, Rocket League).
- Christian: Elementary School. Interests: TV shows (Henry Danger / Captain Man), Roblox games (Dandy's World), Minions movies (bananas, silly laughs), Peppa Pig (Daddy Pig muddy puddles), books (Dog Man by Dav Pilkey, Diary of a Wimpy Kid "Zoo-Wee Mama!").

ANALYZE THIS MULTI-PAGE HOMEWORK PACKET / STUDY GUIDE / ATTACHED FILES (Containing ${pageCount} file(s)/page(s): photos, videos, PDFs, or Word documents):
1. Review all pages, documents, and attached materials in order.
2. Check if the homework is a BIOLOGICAL or SCIENTIFIC DIAGRAM to label (e.g., insect/bug parts, flower parts, plant/tree, cell, or human organ).
   If so, set "diagramType" to "insect" or "flower" or "custom".
3. Identify who this homework belongs to (either "caleb" or "christian"). Look at student name handwriting, document headers, grade level, topic difficulty. Default to "${preferredStudentId || 'christian'}".
4. Identify School Subject ("Math", "Spelling", "Vocabulary", "Science", "Social Studies", "Reading", etc.).
5. Determine a clear Unit Title.
6. Synthesize the whole packet / document:
   a) A unified study guide / kitchen table lesson explaining how to perform all exercises across the packet/document.
   b) 4 to 8 key memorization items / flashcards / vocabulary rules.
   c) A comprehensive quiz with up to 10 questions (never more than 10). If it is a biological diagram, include diagram identification questions with "diagramType" and "activeMarker" (A, B, C, D, E).

Return strict raw JSON with:
{
  "studentId": "caleb" | "christian",
  "subject": "Math" | "Spelling" | "Science" | "...",
  "diagramType": "insect" | "flower" | null,
  "title": "Title",
  "notes": "Extracted summary of what was covered across the ${pageCount} file(s)",
  "studyGuide": {
    "summary": "...",
    "keyRules": ["Rule 1", "Rule 2", "Rule 3"],
    "dadExample": "..."
  },
  "memorizationItems": [
    { "term": "...", "definition": "...", "type": "flashcard" | "spelling" }
  ],
  "quizQuestions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "diagramType": "insect" | "flower" | null,
      "activeMarker": "A" | "B" | "C" | "D" | "E" | null,
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "..."
    }
  ]
}
`;

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const parts = [{ text: promptText }];
      pages.forEach(p => {
        if (p.extractedText && (p.isDocx || p.isDoc || p.isTxt)) {
          parts.push({
            text: `\n\n=== ATTACHED HOMEWORK DOCUMENT: "${p.name || 'document'}" ===\n${p.extractedText}\n=== END DOCUMENT ===\n`
          });
        } else if (p.isPdf) {
          const base64Clean = p.data.includes('base64,') ? p.data.split('base64,')[1] : p.data;
          parts.push({
            inline_data: {
              mime_type: 'application/pdf',
              data: base64Clean
            }
          });
        } else {
          const base64Clean = p.data.includes('base64,') ? p.data.split('base64,')[1] : p.data;
          parts.push({
            inline_data: {
              mime_type: p.mimeType || (p.isVideo ? 'video/mp4' : 'image/jpeg'),
              data: base64Clean
            }
          });
        }
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 3000, responseMimeType: "application/json" }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API Error (${response.status})`);
      }
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const clean = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      return JSON.parse(clean);
    } catch (e) {
      console.warn('Gemini request failed, falling back to smart simulation:', e);
      return simulateMultiPageAnalysis(pages, preferredStudentId);
    }
  }

  function simulateMultiPageAnalysis(pages, preferredStudentId) {
    const isCaleb = preferredStudentId === 'caleb';
    const pageCount = pages ? pages.length : 1;
    const fileNames = (pages || []).map(p => (p.name || '').toLowerCase()).join(' ');
    const allText = (pages || []).map(p => (p.extractedText || '').toLowerCase()).join(' ');
    const combined = fileNames + ' ' + allText;

    const firstDocName = (pages || []).find(p => p.name)?.name?.replace(/\.[^/.]+$/, "") || (isCaleb ? "Plant Biology" : "Insect Anatomy");

    // Math Detection
    if (combined.includes('math') || combined.includes('fraction') || combined.includes('multiply') || combined.includes('algebra') || combined.includes('division')) {
      if (isCaleb) {
        return {
          studentId: 'caleb',
          subject: 'Math',
          diagramType: null,
          title: `Fractions & Proportions (${firstDocName})`,
          notes: `Parsed ${pageCount} document(s) on fractions, ratios, and problem solving.`,
          studyGuide: {
            summary: "Math is all about tactical gameplans—treat fractions like splitting up FIFA tournament brackets!",
            keyRules: [
              "Finding Common Denominators: Like aligning your squad before kickoff.",
              "Cross-Multiplication: The ultimate striker pass across the field.",
              "Simplify: Always reduce your final answer to lowest terms for clean points."
            ],
            dadExample: "If you have 3/4 of a pizza and your brother Christian eats 1/2, convert 1/2 to 2/4. 3/4 - 2/4 = 1/4 pizza left for Dad! High IQ move!"
          },
          memorizationItems: [
            { term: "Numerator", definition: "Top number showing how many parts we have", type: "flashcard" },
            { term: "Denominator", definition: "Bottom number showing total parts in the whole", type: "flashcard" },
            { term: "Reciprocal", definition: "Flipping a fraction upside down (e.g., 3/4 becomes 4/3)", type: "flashcard" },
            { term: "Improper Fraction", definition: "A fraction where the numerator is greater than or equal to the denominator", type: "flashcard" }
          ],
          quizQuestions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              question: "What is 3/4 + 1/8 in simplest form?",
              options: ["4/12", "7/8", "1/2", "5/8"],
              correctIndex: 1,
              explanation: "Convert 3/4 into 6/8. Then 6/8 + 1/8 = 7/8! Top shelf snipe!"
            },
            {
              id: 'q2',
              type: 'multiple-choice',
              question: "When dividing two fractions, what step do you take with the second fraction?",
              options: ["Square it", "Add 1 to the denominator", "Find its reciprocal (flip it) and multiply", "Subtract from 1"],
              correctIndex: 2,
              explanation: "Keep, Change, Flip! Flip the second fraction and multiply like a Rocket League aerial redirect!"
            }
          ]
        };
      } else {
        return {
          studentId: 'christian',
          subject: 'Math',
          diagramType: null,
          title: `Math Super Mission: ${firstDocName}`,
          notes: `Parsed ${pageCount} document(s) for Christian's math adventures.`,
          studyGuide: {
            summary: "Captain Man and Kid Danger are cracking super addition and multiplication codes today!",
            keyRules: [
              "Line up numbers neatly in columns.",
              "Carry the 1 when your column reaches 10 or more.",
              "Double check your work like Bark Knight sniffing for clues!"
            ],
            dadExample: "If Minions have 5 bananas and Bob steals 2, you have 3 bananas. Zoo-Wee Mama, that was easy!"
          },
          memorizationItems: [
            { term: "Sum", definition: "The answer when you add numbers together", type: "flashcard" },
            { term: "Difference", definition: "The answer when you subtract numbers", type: "flashcard" },
            { term: "Product", definition: "The result of multiplying numbers", type: "flashcard" }
          ],
          quizQuestions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              question: "What is 24 + 38?",
              options: ["52", "62", "58", "60"],
              correctIndex: 1,
              explanation: "4 + 8 = 12 (write 2, carry 1). 1 + 2 + 3 = 6. Answer is 62! Super brain power!"
            }
          ]
        };
      }
    }

    // Spelling / Vocab Detection
    if (combined.includes('spell') || combined.includes('vocab') || combined.includes('word') || combined.includes('definition')) {
      return {
        studentId: isCaleb ? 'caleb' : 'christian',
        subject: 'Spelling',
        diagramType: null,
        title: `${firstDocName} (Spelling & Vocab Master)`,
        notes: `Extracted vocabulary lists and spelling rules from ${pageCount} document(s).`,
        studyGuide: {
          summary: isCaleb ? "Unlock advanced vocabulary to sound like Tony Stark in the lab!" : "Dog Man and Captain Man spelling mission! Sound it out loud!",
          keyRules: [
            "Break words down into syllables.",
            "Watch out for silent letters and vowel pairs.",
            "Say each syllable slowly before writing."
          ],
          dadExample: isCaleb ? "Vocabulary is like assembling the Infinity Gauntlet—each word is another power stone." : "Zoo-Wee Mama! Spelling words right gets you extra dad jokes at dinner!"
        },
        memorizationItems: [
          { term: "Perseverance", definition: "Continuing through difficulty without giving up", type: "spelling" },
          { term: "Magnificent", definition: "Extremely beautiful, elaborate, or impressive", type: "spelling" },
          { term: "Curiosity", definition: "A strong desire to learn or know something", type: "spelling" }
        ],
        quizQuestions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: "Which spelling is correct for the word meaning 'not giving up'?",
            options: ["Perseverence", "Perseverance", "Purseverance", "Preseverance"],
            correctIndex: 1,
            explanation: "Perseverance! Notice the 'a' near the end. Pure championship grit!"
          }
        ]
      };
    }

    if (isCaleb) {
      return {
        studentId: 'caleb',
        subject: 'Science',
        diagramType: 'flower',
        title: `Biology & Plant Reproduction (${pageCount}-Page Packet)`,
        notes: `Combined science packet spanning ${pageCount} pages on flower anatomy, pollination, and photosynthesis.`,
        studyGuide: {
          summary: "Plant anatomy is just like an NFL offensive line: every part has a distinct blocking or scoring assignment to produce seeds!",
          keyRules: [
            "Petal (Pin A): Bright colorful leaves that attract pollinators like bees and hummingbirds.",
            "Stamen (Pin B): The male organ (anther + filament) that manufactures pollen dust.",
            "Pistil (Pin C): The sticky female organ (stigma, style, ovary) that catches pollen to grow seeds.",
            "Sepal (Pin D): Green protective leaves at the base that shielded the baby bud."
          ],
          dadExample: "Think of pollen like a soccer ball: the Stamen kicks it, the bee acts as the midfielder carrying it, and the sticky Pistil catches it for a goal! Boom!"
        },
        memorizationItems: [
          { term: "Petal", definition: "Colorful leaf designed to attract insect pollinators", type: "flashcard" },
          { term: "Stamen", definition: "The male flower part consisting of anther and filament", type: "flashcard" },
          { term: "Pistil / Carpel", definition: "The female flower part consisting of stigma, style, and ovary", type: "flashcard" },
          { term: "Sepal", definition: "Protective outer green leaves supporting the petals", type: "flashcard" }
        ],
        quizQuestions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            diagramType: 'flower',
            activeMarker: 'A',
            question: "Look at the flower diagram: Which letter points to the PETAL (attracts pollinators)?",
            options: ["Letter B", "Letter A", "Letter D", "Letter E"],
            correctIndex: 1,
            explanation: "Letter A points to the Petal! Flashy like team colors in FIFA!"
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            diagramType: 'flower',
            activeMarker: 'B',
            question: "Which letter indicates the STAMEN (the male organ producing pollen)?",
            options: ["Letter B", "Letter C", "Letter E", "Letter A"],
            correctIndex: 0,
            explanation: "Letter B is the Stamen (with the yellow anther making pollen)!"
          },
          {
            id: 'q3',
            type: 'multiple-choice',
            diagramType: 'flower',
            activeMarker: 'C',
            question: "Pin C points to the sticky center tube that receives pollen. What is this organ called?",
            options: ["The Stem", "The Petal", "The Pistil (or Carpel)", "The Sepal"],
            correctIndex: 2,
            explanation: "Pin C is the Pistil! Its sticky stigma catches pollen to fertilize seeds in the ovary."
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            diagramType: 'flower',
            activeMarker: 'D',
            question: "Which letter points to the SEPAL (the green leaves protecting the young bud)?",
            options: ["Pin A", "Pin B", "Pin D", "Pin E"],
            correctIndex: 2,
            explanation: "Pin D is the Sepal! Nature's Captain America shield for the baby flower bud!"
          },
          {
            id: 'q5',
            type: 'multiple-choice',
            diagramType: 'flower',
            activeMarker: 'E',
            question: "What is the primary function of the STEM (indicated by Pin E)?",
            options: ["To produce seeds", "To attract bees with sweet nectar", "To support the flower and transport water from the roots", "To catch pollen"],
            correctIndex: 2,
            explanation: "The Stem provides structural support and pumps water from the soil up to the flower!"
          }
        ]
      };
    } else {
      return {
        studentId: 'christian',
        subject: 'Science',
        diagramType: 'insect',
        title: `Insect Anatomy: Bug Identification (${pageCount}-Page Packet)`,
        notes: `Elementary science packet spanning ${pageCount} pages on identifying insect body parts.`,
        studyGuide: {
          summary: "Every insect in the world has 3 main body segments, 2 feelers, and 6 legs—just like an army of Minions building gadgets!",
          keyRules: [
            "Head (Pin B): Holds the compound eyes, mouth, and antenna feelers.",
            "Thorax (Pin C): The middle engine! ALL 6 legs and wings connect exclusively to the thorax.",
            "Abdomen (Pin D): The rear section containing the stomach, heart, and stinger.",
            "All insects have exactly 6 legs (3 pairs) and 2 antennae!"
          ],
          dadExample: "A real insect has 6 legs attached to its thorax and a big abdomen like Daddy Pig's tummy! Zoo-Wee Mama!"
        },
        memorizationItems: [
          { term: "Head", definition: "Front segment with eyes, mouth, and antennae", type: "flashcard" },
          { term: "Thorax", definition: "Middle body section where all 6 legs and wings attach", type: "flashcard" },
          { term: "Abdomen", definition: "Rear segment with digestive organs and stinger", type: "flashcard" },
          { term: "6 Legs", definition: "The exact number of jointed legs every insect has", type: "flashcard" }
        ],
        quizQuestions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            diagramType: 'insect',
            activeMarker: 'C',
            question: "Look at the insect diagram: Which letter points to the THORAX (the middle section where all 6 legs attach)?",
            options: ["Letter B", "Letter C (Middle section)", "Letter D", "Letter A"],
            correctIndex: 1,
            explanation: "Letter C is the Thorax! That's the engine room holding all 6 legs and wings!"
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            diagramType: 'insect',
            activeMarker: 'D',
            question: "Look at Pin D on the rear section of the bug. What is this part called?",
            options: ["The Abdomen (Tummy & Organs)", "The Head", "The Thorax", "The Wing"],
            correctIndex: 0,
            explanation: "Letter D is the Abdomen—the bug's tummy and digestion section!"
          },
          {
            id: 'q3',
            type: 'multiple-choice',
            diagramType: 'insect',
            activeMarker: 'A',
            question: "Which letter on the diagram points to the insect's ANTENNAE (used to smell and feel)?",
            options: ["Pin E", "Pin C", "Pin A (Top feelers)", "Pin D"],
            correctIndex: 2,
            explanation: "Pin A points to the antennae! They sniff out food and sense danger like Captain Man!"
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            diagramType: 'insect',
            activeMarker: 'E',
            question: "How many jointed legs (indicated by Pin E) does every true insect have?",
            options: ["4 legs", "6 legs (3 pairs)", "8 legs", "10 legs"],
            correctIndex: 1,
            explanation: "Every insect has exactly 6 legs attached to the thorax!"
          },
          {
            id: 'q5',
            type: 'multiple-choice',
            diagramType: 'insect',
            activeMarker: 'B',
            question: "Which letter points to the HEAD containing the compound eyes and mouthparts?",
            options: ["Pin B", "Pin C", "Pin E", "Pin D"],
            correctIndex: 0,
            explanation: "Pin B is the Head! Where the bug wears its Minion goggles!"
          }
        ]
      };
    }
  }

  // ==========================================
  // 5. QUIZ RUNNER CLASS (WITH VISUAL DIAGRAM SUPPORT)
  // ==========================================
  class QuizRunner {
    constructor(unit, student, onComplete) {
      this.unit = unit;
      this.student = student;
      this.onComplete = onComplete;
      this.questions = (unit.quizQuestions || []).slice(0, 10);
      this.currentIndex = 0;
      this.score = 0;
      this.answers = [];
      this.startTime = null;
      this.timerInterval = null;
      this.elapsedSeconds = 0;
      this.answeredCurrent = false;
    }

    start() {
      this.startTime = Date.now();
      this.startTimer();
      this.render();
    }

    startTimer() {
      this.timerInterval = setInterval(() => {
        this.elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
        const timerEl = document.getElementById('quiz-live-timer');
        if (timerEl) {
          timerEl.textContent = this.formatTime(this.elapsedSeconds);
        }
      }, 1000);
    }

    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    }

    formatTime(secs) {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    render() {
      const container = document.getElementById('quiz-container');
      if (!container) return;

      if (this.currentIndex >= this.questions.length) {
        this.finishQuiz();
        return;
      }

      const q = this.questions[this.currentIndex];
      const progressPercent = Math.round(((this.currentIndex) / this.questions.length) * 100);
      this.answeredCurrent = false;

      // Check if this question has an associated biological diagram
      const diagramType = q.diagramType || this.unit.diagramType || null;
      const activeMarker = q.activeMarker || null;

      container.innerHTML = `
        <div class="quiz-active-card max-w-2xl mx-auto space-y-6">
          <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <span class="text-xl">${this.student.id === 'caleb' ? '⚡' : '🦸‍♂️'}</span>
              <div>
                <div class="text-xs font-bold text-slate-800">${this.student.name}'s Quiz</div>
                <div class="text-[11px] text-slate-500">${this.unit.title}</div>
              </div>
            </div>

            <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700">
              <span class="text-xs">⏱️</span>
              <span id="quiz-live-timer" class="font-mono font-bold text-sm text-slate-900">${this.formatTime(this.elapsedSeconds)}</span>
            </div>

            <div class="text-right">
              <span class="text-xs font-black uppercase text-indigo-600">Question ${this.currentIndex + 1} of ${this.questions.length}</span>
              <div class="w-24 h-2 bg-slate-100 rounded-full overflow-hidden mt-1">
                <div class="h-full bg-indigo-600 transition-all duration-300" style="width: ${progressPercent}%;"></div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div class="space-y-2">
              <span class="text-xs font-black uppercase tracking-wider text-slate-400">Question #${this.currentIndex + 1}</span>
              <h3 class="text-lg sm:text-xl font-black text-slate-900 leading-snug">${q.question}</h3>
            </div>

            <!-- VISUAL DIAGRAM DISPLAY (IF APPLICABLE) -->
            ${diagramType ? `
              <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
                <div class="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>🔬 Biological Diagram Reference</span>
                  ${activeMarker ? `<span class="text-rose-600 font-black">Target Pin: [${activeMarker}]</span>` : ''}
                </div>
                ${renderBiologicalDiagram(diagramType, activeMarker, false)}
              </div>
            ` : ''}

            <div id="question-interaction-zone" class="space-y-3">
              ${q.type === 'multiple-choice' ? this.renderMultipleChoice(q) : this.renderTextInput(q)}
            </div>

            <div id="quiz-dad-reaction-box" class="hidden p-4 rounded-xl border space-y-2"></div>

            <div id="quiz-action-zone" class="pt-2 flex items-center justify-between border-t border-slate-100">
              <div class="text-xs text-slate-400 italic">
                Dad says: "Take your time! Accuracy over speed every time."
              </div>
              <button id="quiz-next-btn" onclick="window.DadApp.nextQuizQuestion()" class="hidden px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2">
                <span>Next Question</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    renderMultipleChoice(q) {
      return q.options.map((opt, idx) => `
        <button type="button" 
                onclick="window.DadApp.submitQuizAnswer(${idx})" 
                class="quiz-option-btn w-full text-left p-4 rounded-xl border-2 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-sm sm:text-base font-semibold text-slate-800 transition-all active:scale-[0.99] flex items-center gap-3"
                id="opt-btn-${idx}">
          <span class="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-black text-xs flex items-center justify-center flex-shrink-0">
            ${String.fromCharCode(65 + idx)}
          </span>
          <span class="flex-1">${opt}</span>
        </button>
      `).join('');
    }

    renderTextInput(q) {
      return `
        <div class="space-y-3">
          <div class="flex gap-2">
            <input id="quiz-text-answer-input" type="text" placeholder="Type your answer here..." 
                   class="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-base font-bold text-slate-800 focus:outline-none focus:border-indigo-500 uppercase tracking-wider" 
                   onkeydown="if(event.key==='Enter') window.DadApp.submitQuizTextAnswer()" />
            <button type="button" onclick="window.DadApp.submitQuizTextAnswer()" class="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all active:scale-95">
              Submit
            </button>
          </div>
          ${q.wordToSpell ? `
            <button type="button" onclick="window.DadApp.speakWord('${q.wordToSpell}')" class="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
              <span>🔊</span> Listen to word read aloud
            </button>
          ` : ''}
        </div>
      `;
    }

    handleAnswer(selectedIdx, textValue = '') {
      if (this.answeredCurrent) return;
      this.answeredCurrent = true;

      const q = this.questions[this.currentIndex];
      let isCorrect = false;

      if (q.type === 'multiple-choice') {
        isCorrect = selectedIdx === q.correctIndex;
        q.options.forEach((_, idx) => {
          const btn = document.getElementById(`opt-btn-${idx}`);
          if (btn) {
            btn.disabled = true;
            if (idx === q.correctIndex) {
              btn.className = "w-full text-left p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-sm sm:text-base font-bold text-emerald-950 flex items-center gap-3";
            } else if (idx === selectedIdx) {
              btn.className = "w-full text-left p-4 rounded-xl border-2 border-rose-400 bg-rose-50 text-sm sm:text-base font-semibold text-rose-950 flex items-center gap-3";
            } else {
              btn.className = "w-full text-left p-4 rounded-xl border border-slate-200 opacity-50 text-sm flex items-center gap-3";
            }
          }
        });
      } else {
        const cleanInput = textValue.trim().toLowerCase();
        const target = (q.wordToSpell || '').trim().toLowerCase();
        isCorrect = cleanInput === target;
        const inputEl = document.getElementById('quiz-text-answer-input');
        if (inputEl) {
          inputEl.disabled = true;
          inputEl.className += isCorrect ? ' border-emerald-500 bg-emerald-50 text-emerald-900' : ' border-rose-400 bg-rose-50 text-rose-900';
        }
      }

      if (isCorrect) {
        this.score += 1;
        this.playAudio('correct');
      } else {
        this.playAudio('incorrect');
      }

      this.answers.push({
        questionIndex: this.currentIndex,
        question: q.question,
        isCorrect,
        explanation: q.explanation || ''
      });

      this.showDadReaction(isCorrect, q);

      const nextBtn = document.getElementById('quiz-next-btn');
      if (nextBtn) {
        nextBtn.classList.remove('hidden');
        nextBtn.focus();
      }
    }

    showDadReaction(isCorrect, q) {
      const box = document.getElementById('quiz-dad-reaction-box');
      if (!box) return;

      box.classList.remove('hidden');
      const quotes = isCorrect ? this.student.dialogue.milestoneQuotes : this.student.dialogue.incorrectHint;
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

      if (isCorrect) {
        box.className = "p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 space-y-1";
        box.innerHTML = `
          <div class="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-emerald-800">
            <span>🎉</span>
            <span>Dad's Live Reaction</span>
          </div>
          <div class="text-sm font-bold">${randomQuote}</div>
          ${q.explanation ? `<div class="text-xs text-emerald-700 mt-1">${q.explanation}</div>` : ''}
        `;
      } else {
        box.className = "p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 space-y-1";
        box.innerHTML = `
          <div class="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-amber-800">
            <span>💡</span>
            <span>Dad's Coaching Hint</span>
          </div>
          <div class="text-sm font-bold">${randomQuote}</div>
          <div class="text-xs text-amber-800 mt-1 font-medium">${q.explanation || 'Review the diagram before the next attempt!'}</div>
        `;
      }
    }

    nextQuestion() {
      this.currentIndex += 1;
      this.render();
    }

    finishQuiz() {
      this.stopTimer();
      const totalQuestions = this.questions.length;
      const percentage = Math.round((this.score / totalQuestions) * 100);
      const avgSecondsPerQ = Math.round(this.elapsedSeconds / (totalQuestions || 1));

      let pacingVerdict = 'steady';
      let pacingComment = '';

      if (avgSecondsPerQ < 10 && percentage < 80) {
        pacingVerdict = 'tooFast';
        const fastQuotes = this.student.dialogue.pacingEncouragement.tooFast;
        pacingComment = fastQuotes[Math.floor(Math.random() * fastQuotes.length)];
      } else if (avgSecondsPerQ >= 15 && percentage >= 80) {
        pacingVerdict = 'thoughtful';
        const goodQuotes = this.student.dialogue.pacingEncouragement.thoughtful;
        pacingComment = goodQuotes[Math.floor(Math.random() * goodQuotes.length)];
      } else {
        pacingVerdict = 'steady';
        pacingComment = `Good steady work! Finished in ${this.formatTime(this.elapsedSeconds)} with ${percentage}% accuracy.`;
      }

      const attemptRecord = {
        attemptNumber: (this.unit.attempts?.length || 0) + 1,
        timestamp: new Date().toISOString(),
        score: this.score,
        total: totalQuestions,
        percentage: percentage,
        timeSeconds: this.elapsedSeconds,
        pacingVerdict: pacingVerdict,
        dadFeedback: pacingComment
      };

      if (percentage >= 80) {
        this.playAudio('fanfare');
        if (window.confetti) {
          window.confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        }
      }

      this.onComplete(attemptRecord);
      this.renderSummary(attemptRecord);
    }

    renderSummary(att) {
      const container = document.getElementById('quiz-container');
      if (!container) return;

      const isMastery = att.percentage >= 80;

      container.innerHTML = `
        <div class="quiz-summary-card max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 text-center animate-fade-in">
          <div class="text-6xl mb-1">${isMastery ? '🏆' : '💪'}</div>

          <div>
            <span class="text-xs font-black uppercase tracking-wider text-slate-400">Attempt #${att.attemptNumber} Complete</span>
            <h2 class="text-3xl font-black text-slate-900 mt-1">
              ${isMastery ? 'Outstanding Job, Champ!' : 'Great Effort! Keep Building!'}
            </h2>
            <p class="text-sm text-slate-500 mt-1">${this.unit.title}</p>
          </div>

          <div class="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <div class="text-xs text-slate-400 uppercase font-semibold">Final Score</div>
              <div class="text-2xl sm:text-3xl font-black ${isMastery ? 'text-emerald-600' : 'text-amber-600'}">
                ${att.percentage}%
              </div>
              <div class="text-[11px] text-slate-500">${att.score}/${att.total} Correct</div>
            </div>

            <div>
              <div class="text-xs text-slate-400 uppercase font-semibold">Time Taken</div>
              <div class="text-2xl sm:text-3xl font-black text-slate-800">
                ${this.formatTime(att.timeSeconds)}
              </div>
              <div class="text-[11px] text-slate-500">${Math.round(att.timeSeconds / att.total)}s / question</div>
            </div>

            <div>
              <div class="text-xs text-slate-400 uppercase font-semibold">Pacing Style</div>
              <div class="text-lg sm:text-xl font-black ${att.pacingVerdict === 'thoughtful' ? 'text-emerald-600' : att.pacingVerdict === 'tooFast' ? 'text-rose-600' : 'text-blue-600'} mt-1">
                ${att.pacingVerdict === 'thoughtful' ? '🎯 Thoughtful' : att.pacingVerdict === 'tooFast' ? '⚡ Rushed' : '⏱️ Steady'}
              </div>
              <div class="text-[10px] text-slate-400">${att.pacingVerdict === 'thoughtful' ? 'Mastery focus!' : 'Check your work!'}</div>
            </div>
          </div>

          <div class="p-5 rounded-2xl ${isMastery ? 'bg-emerald-50 border border-emerald-200 text-emerald-950' : 'bg-amber-50 border border-amber-200 text-amber-950'} text-left space-y-2">
            <div class="flex items-center gap-2 font-black text-xs uppercase tracking-wider ${isMastery ? 'text-emerald-800' : 'text-amber-800'}">
              <span>👨‍👦</span>
              <span>Dad's Post-Quiz Report Card</span>
            </div>
            <div class="text-sm font-bold leading-relaxed">"${att.dadFeedback}"</div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button onclick="window.DadApp.viewUnitProgression('${this.unit.id}')" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
              <span>📈</span>
              <span>View Unit Progression Graph</span>
            </button>

            <button onclick="window.DadApp.shareResultToDad('${this.unit.id}', ${att.attemptNumber})" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
              <span>💬</span>
              <span>Text/Send Result to Dad</span>
            </button>

            <button onclick="window.DadApp.startQuiz('${this.unit.id}')" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2">
              <span>🔄 Retake Quiz</span>
            </button>
          </div>
        </div>
      `;
    }

    playAudio(type) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        if (type === 'correct') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523.25, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1);
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'incorrect') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.25);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'fanfare') {
          [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
            gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);
            osc.start(ctx.currentTime + i * 0.1);
            osc.stop(ctx.currentTime + i * 0.1 + 0.35);
          });
        }
      } catch (e) {}
    }
  }

  // ==========================================
  // 6. STUDY VIEW RENDERER (WITH DIAGRAM EXPLORER & PACKET VIEWER)
  // ==========================================
  function renderStudyView(unit, student) {
    const guide = unit.studyGuide || {
      summary: "Welcome to this study unit!",
      keyRules: ["Read through carefully", "Take notes", "Practice before the quiz"],
      dadExample: "Work through step by step."
    };
    const memorizationItems = unit.memorizationItems || [];
    const isSpelling = unit.subject === 'Spelling';
    const isMath = unit.subject === 'Math';
    const diagramType = unit.diagramType || null;
    const packetPages = unit.sourcePages || (unit.sourcePhotoUrl ? [unit.sourcePhotoUrl] : []);

    return `
      <div class="study-session-container space-y-6 max-w-4xl mx-auto">
        <div class="flex items-center justify-between">
          <button onclick="window.DadApp.navigate('units')" class="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all active:scale-95">
            <span>←</span> Back to All Homework Units
          </button>
          <div class="flex items-center gap-2">
            ${packetPages.length > 0 ? `
              <button onclick="window.DadApp.togglePacketViewer()" class="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
                <span>📄</span>
                <span>Original Packet (${packetPages.length} Pages)</span>
              </button>
            ` : ''}
            <button onclick="window.DadApp.copyUnitShareLink('${unit.id}')" class="px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
              <span>📤</span>
              <span>Send Link to ${student.name}</span>
            </button>
          </div>
        </div>

        <!-- Original Packet Modal / Drawer -->
        <div id="packet-original-viewer" class="hidden bg-white p-5 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 class="font-black text-slate-900 text-sm flex items-center gap-2">
              <span>📄</span>
              <span>Original Scanned Packet Pages (${packetPages.length})</span>
            </h4>
            <button onclick="window.DadApp.togglePacketViewer()" class="text-xs font-bold text-slate-400 hover:text-slate-700">Close ✕</button>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto p-1">
            ${packetPages.map((src, i) => {
              const p = typeof src === 'string' ? {
                data: src,
                name: `Item ${i + 1}`,
                isPdf: src.startsWith('data:application/pdf') || src.includes('.pdf'),
                isVideo: src.startsWith('data:video/'),
                isDocx: src.includes('.docx') || src.startsWith('data:application/vnd.openxmlformats'),
                isDoc: src.includes('.doc')
              } : src;

              if (p.isPdf) {
                return `
                  <div class="rounded-xl border border-rose-200 p-3 bg-rose-50/40 flex flex-col items-center justify-between text-center h-36">
                    <span class="text-3xl mt-1">📄</span>
                    <span class="text-[10px] font-black text-rose-700 uppercase">PDF Document</span>
                    <span class="text-[10px] font-bold text-slate-700 truncate max-w-[120px]" title="${p.name || 'document.pdf'}">${p.name || 'document.pdf'}</span>
                    <a href="${p.data}" target="_blank" download="${p.name || 'homework.pdf'}" class="text-[10px] font-bold text-rose-700 bg-white border border-rose-200 px-2 py-1 rounded-lg hover:bg-rose-50 shadow-xs">
                      Open PDF ↗
                    </a>
                  </div>
                `;
              }
              if (p.isDocx || p.isDoc || p.isTxt) {
                return `
                  <div class="rounded-xl border border-blue-200 p-3 bg-blue-50/40 flex flex-col items-center justify-between text-center h-36">
                    <span class="text-3xl mt-1">${p.isDocx ? '📝' : '📃'}</span>
                    <span class="text-[10px] font-black text-blue-700 uppercase">${p.isDocx ? 'Word DOCX' : 'Document'}</span>
                    <span class="text-[10px] font-bold text-slate-700 truncate max-w-[120px]" title="${p.name || 'document.docx'}">${p.name || 'document.docx'}</span>
                    ${p.data ? `<a href="${p.data}" download="${p.name || 'document.docx'}" class="text-[10px] font-bold text-blue-700 bg-white border border-blue-200 px-2 py-1 rounded-lg hover:bg-blue-50 shadow-xs">Download ↗</a>` : ''}
                  </div>
                `;
              }
              if (p.isVideo) {
                return `
                  <div class="rounded-xl border border-amber-200 p-3 bg-amber-50/40 flex flex-col items-center justify-between text-center h-36">
                    <span class="text-3xl mt-1">🎥</span>
                    <span class="text-[10px] font-black text-amber-700 uppercase">Video Scan</span>
                    <span class="text-[10px] font-bold text-slate-700 truncate max-w-[120px]" title="${p.name || 'video_scan.mp4'}">${p.name || 'video_scan.mp4'}</span>
                    <a href="${p.data}" target="_blank" download="${p.name || 'video_scan.mp4'}" class="text-[10px] font-bold text-amber-700 bg-white border border-amber-200 px-2 py-1 rounded-lg hover:bg-amber-50 shadow-xs">
                      View Video ↗
                    </a>
                  </div>
                `;
              }
              return `
                <div class="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 text-center">
                  <img src="${p.data || src}" class="w-full h-28 object-contain bg-slate-900/5 cursor-pointer" onclick="window.open('${p.data || src}')" title="Click to view full size" />
                  <div class="text-[10px] font-bold text-slate-600 py-1 bg-white border-t border-slate-100 truncate px-1">${p.name || `Page ${i + 1}`}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-gradient-to-r ${student.theme.gradient} text-white shadow-lg relative overflow-hidden">
          <div class="relative z-10">
            <div class="text-xs uppercase tracking-widest font-black opacity-80 mb-1">Interactive Study Unit</div>
            <h2 class="text-2xl sm:text-3xl font-black mb-2">${unit.title}</h2>
            <p class="text-sm sm:text-base opacity-95 max-w-2xl">${guide.summary}</p>
          </div>
          <div class="absolute -right-4 -bottom-4 text-8xl opacity-15 select-none pointer-events-none">
            ${student.id === 'caleb' ? '⚽' : '🦸‍♂️'}
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button id="tab-btn-lesson" onclick="window.DadApp.switchStudyTab('lesson')" class="study-tab-btn flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 bg-white text-slate-900 shadow-sm">
            <span>📖</span>
            <span>1. Kitchen Table Lesson</span>
          </button>
          <button id="tab-btn-memory" onclick="window.DadApp.switchStudyTab('memory')" class="study-tab-btn flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900">
            <span>🧠</span>
            <span>2. Memorization (${memorizationItems.length})</span>
          </button>
          ${diagramType ? `
            <button id="tab-btn-diagram" onclick="window.DadApp.switchStudyTab('diagram')" class="study-tab-btn flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 bg-emerald-50/50">
              <span>🔬</span>
              <span>3. Interactive Diagram Explorer</span>
            </button>
          ` : ''}
          ${isMath ? `
            <button id="tab-btn-scratchpad" onclick="window.DadApp.switchStudyTab('scratchpad')" class="study-tab-btn flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900">
              <span>✏️</span>
              <span>4. Math Scratchpad</span>
            </button>
          ` : ''}
          <button onclick="window.DadApp.startQuiz('${unit.id}')" class="flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95">
            <span>🎯</span>
            <span>Take Unit Quiz</span>
          </button>
        </div>

        <!-- TAB 1: Kitchen Table Lesson -->
        <div id="study-panel-lesson" class="study-panel space-y-6">
          <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-amber-100 text-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
                👨‍👦
              </div>
              <div>
                <h3 class="text-lg font-black text-slate-900">Dad's Kitchen Table Walkthrough</h3>
                <p class="text-xs text-slate-500">
                  ${student.id === 'caleb' 
                    ? 'Breaking this down like game film before the big kickoff.' 
                    : 'Pulling up a chair with silly cartoons and super-hero hints!'}
                </p>
              </div>
            </div>

            <div class="space-y-3">
              <h4 class="text-xs font-black uppercase tracking-wider text-slate-400">Tactical Rules To Remember</h4>
              <div class="grid grid-cols-1 gap-2.5">
                ${guide.keyRules.map((rule, idx) => `
                  <div class="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span class="w-6 h-6 rounded-full bg-slate-800 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      ${idx + 1}
                    </span>
                    <p class="text-sm text-slate-700 font-medium leading-relaxed">${rule}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
              <div class="flex items-center gap-2 text-xs font-black text-blue-900 uppercase tracking-wider">
                <span>💡</span>
                <span>Dad's Real-Life Example & Analogy</span>
              </div>
              <p class="text-sm text-blue-950 font-medium leading-relaxed">
                ${guide.dadExample}
              </p>
            </div>

            <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <div class="text-xs text-slate-500 italic">
                "Understand the rules first, then crush the practice!" - Dad
              </div>
              <button onclick="window.DadApp.switchStudyTab('memory')" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2">
                <span>Next: Memorization Practice</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        <!-- TAB 2: Memorization -->
        <div id="study-panel-memory" class="study-panel space-y-6 hidden">
          <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>🧠</span>
                  <span>Active Memorization & Review</span>
                </h3>
                <p class="text-xs text-slate-500">Tap cards to flip them. Master all ${memorizationItems.length} concepts!</p>
              </div>
              ${isSpelling ? `
                <div class="flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                  <span>🔊</span>
                  <span>Spelling Audio Bee Enabled</span>
                </div>
              ` : ''}
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${memorizationItems.map((item, idx) => `
                <div class="memory-card relative cursor-pointer select-none h-44 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:border-blue-400 hover:shadow-md transition-all p-5 flex flex-col justify-between"
                     onclick="window.DadApp.toggleCardFlip(this)">
                  <div class="card-front flex-1 flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Card #${idx + 1}</span>
                      ${isSpelling ? `
                        <button type="button" onclick="event.stopPropagation(); window.DadApp.speakWord('${item.term}')" class="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all text-xs" title="Listen to word">
                          🔊 Read Aloud
                        </button>
                      ` : '<span class="text-xs text-slate-400">Tap to Flip ↻</span>'}
                    </div>
                    <div class="my-auto text-center">
                      <div class="text-lg sm:text-xl font-black text-slate-900">${item.term}</div>
                    </div>
                    <div class="text-[11px] text-center text-slate-400 italic">Click card to reveal definition/answer</div>
                  </div>

                  <div class="card-back hidden flex-1 flex flex-col justify-between">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-black uppercase tracking-wider text-emerald-600">Answer / Key</span>
                      <span class="text-xs text-slate-400">Tap to Flip ↻</span>
                    </div>
                    <div class="my-auto text-center">
                      <div class="text-sm sm:text-base font-bold text-slate-800 leading-snug">${item.definition}</div>
                    </div>
                    <div class="text-[11px] text-center text-emerald-600 font-bold">✓ Got it!</div>
                  </div>
                </div>
              `).join('')}
            </div>

            ${isSpelling ? `
              <div class="mt-6 p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                <h4 class="text-sm font-black text-amber-900 flex items-center gap-2">
                  <span>🎤</span>
                  <span>Dad's Audio Spelling Bee Challenge</span>
                </h4>
                <p class="text-xs text-amber-800">
                  Click "Speak Word", listen carefully to Dad's dictation, type it in, and check if you got it right!
                </p>
                <div class="flex flex-col sm:flex-row gap-2 max-w-lg">
                  <input id="spelling-test-input" type="text" placeholder="Type what you hear..." class="flex-1 px-4 py-2.5 rounded-xl border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold uppercase tracking-wider" />
                  <button onclick="window.DadApp.checkSpellingInput('${memorizationItems[0]?.term || ''}')" class="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all active:scale-95">
                    Check Spelling
                  </button>
                </div>
                <div id="spelling-test-feedback" class="text-xs font-bold min-h-[1.5rem]"></div>
              </div>
            ` : ''}

            <div class="pt-4 flex items-center justify-between border-t border-slate-100">
              <span class="text-xs text-slate-500">Feeling confident? Test what you learned!</span>
              <button onclick="window.DadApp.startQuiz('${unit.id}')" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2">
                <span>Ready for the Quiz!</span>
                <span>🎯</span>
              </button>
            </div>
          </div>
        </div>

        <!-- TAB 3: Interactive Biological Diagram Explorer -->
        ${diagramType ? `
          <div id="study-panel-diagram" class="study-panel space-y-6 hidden">
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>🔬</span>
                    <span>Interactive Diagram Explorer: ${BIOLOGICAL_DIAGRAMS[diagramType]?.title || 'Biology Parts'}</span>
                  </h3>
                  <p class="text-xs text-slate-500">Tap any glowing letter badge on the diagram to see what that body part does and hear Dad's analogy!</p>
                </div>
                <div class="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <span>💡 Tap pins to explore</span>
                </div>
              </div>

              <!-- Interactive Diagram SVG -->
              <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                ${renderBiologicalDiagram(diagramType, null, true)}
              </div>

              <!-- Selected Part Details Card (Dynamic) -->
              <div id="diagram-part-detail-box" class="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 text-slate-900 space-y-2">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center">?</span>
                  <h4 class="font-extrabold text-sm text-indigo-950" id="diagram-part-name">Tap on Pin A, B, C, D, or E above to explore!</h4>
                </div>
                <p class="text-xs text-indigo-900 font-medium" id="diagram-part-role">Each pin points to an essential part of the biological organism.</p>
                <div class="pt-2 border-t border-indigo-200/60 text-xs italic text-indigo-800" id="diagram-part-dad-tip">
                  Dad's Tip: Tap a pin to hear how it works!
                </div>
              </div>

              <!-- All Parts Reference Grid -->
              <div class="space-y-3 pt-2">
                <h4 class="text-xs font-black uppercase tracking-wider text-slate-400">All Labeled Parts at a Glance</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  ${(BIOLOGICAL_DIAGRAMS[diagramType]?.parts || []).map(p => `
                    <div class="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all flex items-start gap-3 cursor-pointer"
                         onclick="window.DadApp.selectDiagramPart('${diagramType}', '${p.id}')">
                      <span class="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        ${p.id}
                      </span>
                      <div class="space-y-0.5">
                        <div class="font-bold text-slate-900 text-sm">${p.name}</div>
                        <div class="text-xs text-slate-500">${p.role}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="pt-4 flex items-center justify-between border-t border-slate-100">
                <span class="text-xs text-slate-500">Know your diagram parts? Take the quiz!</span>
                <button onclick="window.DadApp.startQuiz('${unit.id}')" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2">
                  <span>Take Diagram Quiz!</span>
                  <span>🎯</span>
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- TAB 4: Scratchpad (if math) -->
        ${isMath ? `
          <div id="study-panel-scratchpad" class="study-panel space-y-6 hidden">
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>✏️</span>
                    <span>Interactive Kitchen Table Scratchpad</span>
                  </h3>
                  <p class="text-xs text-slate-500">Show your math work step by step, carry digits, or sketch shapes!</p>
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="window.DadApp.clearScratchpad()" class="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all">
                    Clear Canvas
                  </button>
                </div>
              </div>

              <div class="border-2 border-slate-200 rounded-2xl overflow-hidden bg-[#fafafa] relative shadow-inner">
                <canvas id="math-scratchpad-canvas" width="760" height="340" class="w-full touch-none cursor-crosshair block"></canvas>
              </div>

              <div class="flex items-center justify-between text-xs text-slate-500">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                  <span>Dad's Rule: Showing your work helps prevent silly math errors!</span>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  // ==========================================
  // 7. MAIN DADWORK APPLICATION COORDINATOR
  // ==========================================
  const STORAGE_KEY_UNITS = 'dadwork_study_units_v1';
  const STORAGE_KEY_STUDENT = 'dadwork_selected_student';

  class DadWorkApp {
    constructor() {
      this.currentStudentId = localStorage.getItem(STORAGE_KEY_STUDENT) || 'christian';
      this.currentView = 'dashboard';
      this.activeUnitId = null;
      this.activeQuizRunner = null;
      this.selectedSubjectFilter = 'ALL';

      this.packetPages = [];
      this.units = this.loadUnits();
      this.scratchpadCtx = null;

      this.checkForSharedUrlUnit();
      this.init();
    }

    loadUnits() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_UNITS);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Error loading units, resetting defaults:', e);
      }
      localStorage.setItem(STORAGE_KEY_UNITS, JSON.stringify(INITIAL_UNITS));
      return [...INITIAL_UNITS];
    }

    saveUnits() {
      localStorage.setItem(STORAGE_KEY_UNITS, JSON.stringify(this.units));
    }

    getStudent() {
      return STUDENTS[this.currentStudentId] || STUDENTS.christian;
    }

    getStudentUnits(studentId = null) {
      const sId = studentId || this.currentStudentId;
      return this.units.filter(u => u.studentId === sId);
    }

    getActiveUnit() {
      return this.units.find(u => u.id === this.activeUnitId) || null;
    }

    init() {
      window.DadApp = this;
      this.renderHeader();
      this.renderCurrentView();
    }

    checkForSharedUrlUnit() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const hash = window.location.hash;

        const paramUnitId = urlParams.get('unit');
        const paramStudent = urlParams.get('student');
        if (paramStudent && STUDENTS[paramStudent]) {
          this.currentStudentId = paramStudent;
        }

        if (paramUnitId) {
          const found = this.units.find(u => u.id === paramUnitId);
          if (found) {
            this.activeUnitId = found.id;
            this.currentStudentId = found.studentId;
            this.currentView = 'study';
            return;
          }
        }

        if (hash && hash.includes('unit_data=')) {
          const base64Str = hash.split('unit_data=')[1];
          const jsonStr = decodeURIComponent(escape(atob(base64Str)));
          const sharedUnit = JSON.parse(jsonStr);
          if (sharedUnit && sharedUnit.id) {
            const exists = this.units.find(u => u.id === sharedUnit.id);
            if (!exists) {
              this.units.unshift(sharedUnit);
              this.saveUnits();
            }
            this.activeUnitId = sharedUnit.id;
            this.currentStudentId = sharedUnit.studentId || 'christian';
            this.currentView = 'study';
            history.replaceState(null, '', window.location.pathname);
          }
        }
      } catch (e) {
        console.warn('Could not parse shared unit from URL:', e);
      }
    }

    switchStudent(studentId) {
      if (!STUDENTS[studentId]) return;
      this.currentStudentId = studentId;
      localStorage.setItem(STORAGE_KEY_STUDENT, studentId);
      this.renderHeader();
      this.renderCurrentView();
    }

    navigate(viewName, unitId = null) {
      this.currentView = viewName;
      if (unitId) {
        this.activeUnitId = unitId;
      }
      this.renderHeader();
      this.renderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderHeader() {
      const headerContainer = document.getElementById('app-header');
      if (!headerContainer) return;

      const student = this.getStudent();
      const otherStudentId = student.id === 'caleb' ? 'christian' : 'caleb';
      const otherStudent = STUDENTS[otherStudentId];

      headerContainer.innerHTML = `
        <div class="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="flex items-center gap-3 cursor-pointer" onclick="window.DadApp.navigate('dashboard')">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-black text-xl shadow-md">
              👨‍👦
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-lg font-black tracking-tight text-slate-900">DadWork</span>
                <span class="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">Homework Coach</span>
              </div>
              <div class="text-[11px] text-slate-500 font-medium">Multi-Page Packets, Diagrams & Dad Humor</div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="window.DadApp.switchStudent('${otherStudentId}')" 
                    class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 shadow-sm transition-all text-xs font-bold text-slate-800"
                    title="Switch to ${otherStudent.name}">
              <span class="text-base">${student.theme.avatarEmoji}</span>
              <div class="text-left">
                <div class="text-[10px] text-slate-400 font-semibold uppercase leading-tight">Current:</div>
                <div class="text-xs font-black text-indigo-600">${student.name} (${student.gradeLevel})</div>
              </div>
              <span class="text-slate-400 text-[10px]">⇄ Switch</span>
            </button>

            <button onclick="window.DadApp.navigate('upload')" 
                    class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5">
              <span>📷</span>
              <span>Add Homework Packet</span>
            </button>
          </div>
        </div>

        <div class="border-t border-slate-200/80 bg-white">
          <div class="max-w-6xl mx-auto px-4 flex items-center justify-between overflow-x-auto text-xs font-bold">
            <div class="flex items-center gap-1 py-1">
              <button onclick="window.DadApp.navigate('dashboard')" class="nav-tab px-3 py-2 rounded-lg transition-all ${this.currentView === 'dashboard' ? 'text-indigo-600 bg-indigo-50 font-black' : 'text-slate-600 hover:text-slate-900'}">
                📊 Dashboard
              </button>
              <button onclick="window.DadApp.navigate('units')" class="nav-tab px-3 py-2 rounded-lg transition-all ${this.currentView === 'units' || this.currentView === 'study' ? 'text-indigo-600 bg-indigo-50 font-black' : 'text-slate-600 hover:text-slate-900'}">
                📚 ${student.name}'s Units
              </button>
              <button onclick="window.DadApp.navigate('jokes')" class="nav-tab px-3 py-2 rounded-lg transition-all ${this.currentView === 'jokes' ? 'text-indigo-600 bg-indigo-50 font-black' : 'text-slate-600 hover:text-slate-900'}">
                😂 Dad Joke Locker
              </button>
            </div>

            <div class="flex items-center gap-1">
              <button onclick="window.DadApp.navigate('settings')" class="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1 text-[11px]">
                <span>⚙️</span>
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    renderCurrentView() {
      const main = document.getElementById('app-main');
      if (!main) return;

      switch (this.currentView) {
        case 'dashboard':
          main.innerHTML = this.renderDashboard();
          break;
        case 'units':
          main.innerHTML = this.renderUnitsList();
          break;
        case 'study':
          this.renderStudy();
          break;
        case 'quiz':
          this.renderQuizContainer();
          break;
        case 'progression':
          this.renderProgressionView();
          break;
        case 'upload':
          main.innerHTML = this.renderUploadView();
          break;
        case 'jokes':
          main.innerHTML = this.renderDadJokeLocker();
          break;
        case 'settings':
          main.innerHTML = this.renderSettingsView();
          break;
        default:
          main.innerHTML = this.renderDashboard();
      }
    }

    renderDashboard() {
      const student = this.getStudent();
      const units = this.getStudentUnits();
      
      let totalAttempts = 0;
      let completedUnits = 0;
      let totalScoreSum = 0;
      let scoredAttemptsCount = 0;

      units.forEach(u => {
        const atts = u.attempts || [];
        totalAttempts += atts.length;
        if (atts.length > 0) {
          completedUnits += 1;
          const latest = atts[atts.length - 1];
          totalScoreSum += latest.percentage;
          scoredAttemptsCount += 1;
        }
      });

      const avgScore = scoredAttemptsCount > 0 ? Math.round(totalScoreSum / scoredAttemptsCount) : 0;
      const randomWelcome = student.dialogue.welcome[Math.floor(Math.random() * student.dialogue.welcome.length)];

      return `
        <div class="space-y-6 max-w-6xl mx-auto">
          <div class="rounded-3xl p-6 sm:p-8 bg-gradient-to-r ${student.theme.gradient} text-white shadow-xl relative overflow-hidden">
            <div class="relative z-10 max-w-2xl space-y-2">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
                <span>${student.theme.avatarEmoji}</span>
                <span>${student.name} • ${student.theme.favoriteTag}</span>
              </div>
              <h1 class="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                ${randomWelcome}
              </h1>
              <p class="text-xs sm:text-sm text-white/90 leading-relaxed pt-1">
                Dad is in your corner! Explore diagrams, practice flashcards, and take quizzes without rushing to unlock new dad jokes!
              </p>
            </div>
            <div class="absolute -right-4 -bottom-6 text-9xl opacity-20 select-none pointer-events-none">
              ${student.id === 'caleb' ? '⚽' : '🍌'}
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
              <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Homework Units</div>
              <div class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">${units.length}</div>
              <div class="text-xs text-slate-500 mt-0.5">${completedUnits} completed</div>
            </div>

            <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
              <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Mastery</div>
              <div class="text-2xl sm:text-3xl font-black ${avgScore >= 80 ? 'text-emerald-600' : 'text-amber-600'} mt-1">
                ${avgScore}%
              </div>
              <div class="text-xs text-slate-500 mt-0.5">Across all attempts</div>
            </div>

            <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
              <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Quiz Tries</div>
              <div class="text-2xl sm:text-3xl font-black text-indigo-600 mt-1">${totalAttempts}</div>
              <div class="text-xs text-slate-500 mt-0.5">Progression history</div>
            </div>

            <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
              <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Dad Joke Vault</div>
              <div class="text-2xl sm:text-3xl font-black text-amber-500 mt-1">
                ${student.dadJokes.filter(j => j.unlocked).length} / ${student.dadJokes.length}
              </div>
              <div class="text-xs text-slate-500 mt-0.5">Score 80%+ to unlock</div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 class="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>📚</span>
                  <span>Active Units & Progression Graphs</span>
                </h2>
                <p class="text-xs text-slate-500">Includes visual biology diagrams, math equations, and spelling units.</p>
              </div>
              <button onclick="window.DadApp.navigate('upload')" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all active:scale-95 flex items-center gap-1.5 self-start sm:self-auto">
                <span>+</span>
                <span>Snap / Upload Multi-Page Packet</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              ${units.map(unit => {
                const atts = unit.attempts || [];
                const latest = atts[atts.length - 1];
                const first = atts[0];
                const growth = latest && first ? (latest.percentage - first.percentage) : 0;
                const pageCount = unit.sourcePages ? unit.sourcePages.length : (unit.sourcePhotoUrl ? 1 : 0);

                return `
                  <div class="p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all bg-white flex flex-col justify-between space-y-4">
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-1.5">
                          <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${unit.subject === 'Math' ? 'bg-indigo-100 text-indigo-700' : unit.subject === 'Spelling' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                            ${unit.subject}
                          </span>
                          ${unit.diagramType ? `<span class="text-[10px] font-black uppercase bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">🔬 Diagram</span>` : ''}
                        </div>
                        <div class="flex items-center gap-2">
                          ${pageCount > 1 ? `<span class="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">📄 ${pageCount} Pages</span>` : ''}
                          <span class="text-xs text-slate-400 font-medium">${unit.dateAdded}</span>
                        </div>
                      </div>

                      <h3 class="font-extrabold text-slate-900 text-base leading-snug hover:text-indigo-600 cursor-pointer" onclick="window.DadApp.openStudyUnit('${unit.id}')">
                        ${unit.title}
                      </h3>
                      <p class="text-xs text-slate-500 line-clamp-2 mt-1">${unit.studyGuide?.summary || unit.notes || 'Interactive homework unit.'}</p>
                    </div>

                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        ${latest ? `
                          <div class="flex items-center gap-2">
                            <span class="text-sm font-black ${latest.percentage >= 80 ? 'text-emerald-600' : 'text-amber-600'}">${latest.percentage}%</span>
                            <span class="text-xs text-slate-400">(${latest.score}/${latest.total})</span>
                            ${growth > 0 ? `<span class="text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">▲ +${growth}%</span>` : ''}
                          </div>
                          <div class="text-[10px] text-slate-400 mt-0.5">${atts.length} attempt${atts.length > 1 ? 's' : ''} logged</div>
                        ` : `
                          <span class="text-xs text-slate-400 italic">No attempts yet</span>
                        `}
                      </div>

                      <div class="flex items-center gap-2">
                        <button onclick="window.DadApp.copyUnitShareLink('${unit.id}')" class="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all" title="Copy link to send to ${student.name}">
                          📤 Send Link
                        </button>
                        ${atts.length > 0 ? `
                          <button onclick="window.DadApp.viewUnitProgression('${unit.id}')" class="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all" title="View progression curve">
                            📈 Graph
                          </button>
                        ` : ''}
                        <button onclick="window.DadApp.openStudyUnit('${unit.id}')" class="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all">
                          Study →
                        </button>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    }

    renderUnitsList() {
      const student = this.getStudent();
      const units = this.getStudentUnits();
      const subjects = ['ALL', 'Math', 'Spelling', 'Vocabulary', 'Science', 'Social Studies'];

      const filtered = this.selectedSubjectFilter === 'ALL' 
        ? units 
        : units.filter(u => u.subject.toLowerCase() === this.selectedSubjectFilter.toLowerCase());

      return `
        <div class="space-y-6 max-w-6xl mx-auto">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 class="text-2xl font-black text-slate-900">${student.name}'s Homework Units</h1>
              <p class="text-xs text-slate-500">Captured study guides, memorization decks, and quizzes.</p>
            </div>
            <button onclick="window.DadApp.navigate('upload')" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 self-start sm:self-auto">
              <span>📷</span>
              <span>Snap / Upload Multi-Page Packet</span>
            </button>
          </div>

          <div class="flex items-center gap-2 overflow-x-auto pb-1">
            ${subjects.map(s => `
              <button onclick="window.DadApp.setSubjectFilter('${s}')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.selectedSubjectFilter === s ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
                ${s}
              </button>
            `).join('')}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${filtered.map(unit => {
              const atts = unit.attempts || [];
              const latest = atts[atts.length - 1];

              return `
                <div class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-1.5">
                        <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${unit.subject === 'Math' ? 'bg-indigo-100 text-indigo-700' : unit.subject === 'Spelling' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                          ${unit.subject}
                        </span>
                        ${unit.diagramType ? `<span class="text-[10px] font-black uppercase bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">🔬 Diagram</span>` : ''}
                      </div>
                      <span class="text-[11px] text-slate-400 font-medium">${unit.dateAdded}</span>
                    </div>
                    <h3 class="font-extrabold text-slate-900 text-base leading-snug cursor-pointer hover:text-indigo-600" onclick="window.DadApp.openStudyUnit('${unit.id}')">
                      ${unit.title}
                    </h3>
                    <p class="text-xs text-slate-500 line-clamp-2 mt-1.5">${unit.studyGuide?.summary || unit.notes || 'Homework unit'}</p>
                  </div>

                  <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div class="text-xs">
                      ${latest ? `
                        <span class="font-black ${latest.percentage >= 80 ? 'text-emerald-600' : 'text-amber-600'}">${latest.percentage}%</span>
                        <span class="text-slate-400 text-[11px]">(${atts.length} try)</span>
                      ` : '<span class="text-slate-400 italic">Not taken yet</span>'}
                    </div>

                    <div class="flex items-center gap-1.5">
                      <button onclick="window.DadApp.copyUnitShareLink('${unit.id}')" class="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all" title="Copy shareable link">
                        📤
                      </button>
                      ${atts.length > 0 ? `
                        <button onclick="window.DadApp.viewUnitProgression('${unit.id}')" class="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all" title="View progression curve">
                          📈
                        </button>
                      ` : ''}
                      <button onclick="window.DadApp.openStudyUnit('${unit.id}')" class="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all">
                        Open →
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    setSubjectFilter(s) {
      this.selectedSubjectFilter = s;
      this.renderCurrentView();
    }

    openStudyUnit(unitId) {
      this.activeUnitId = unitId;
      this.navigate('study', unitId);
    }

    togglePacketViewer() {
      const viewer = document.getElementById('packet-original-viewer');
      if (viewer) {
        viewer.classList.toggle('hidden');
      }
    }

    selectDiagramPart(diagramType, partId) {
      const diagram = BIOLOGICAL_DIAGRAMS[diagramType];
      if (!diagram) return;
      const part = diagram.parts.find(p => p.id === partId);
      if (!part) return;

      const student = this.getStudent();
      const tip = student.id === 'caleb' ? part.calebDadTip : part.christianDadTip;

      const nameEl = document.getElementById('diagram-part-name');
      const roleEl = document.getElementById('diagram-part-role');
      const tipEl = document.getElementById('diagram-part-dad-tip');

      if (nameEl) nameEl.textContent = `Pin ${part.id}: ${part.name}`;
      if (roleEl) roleEl.textContent = part.role;
      if (tipEl) tipEl.textContent = `Dad says: "${tip}"`;

      // Read name aloud
      this.speakWord(part.name);
    }

    renderStudy() {
      const main = document.getElementById('app-main');
      if (!main) return;
      const unit = this.getActiveUnit();
      if (!unit) {
        this.navigate('units');
        return;
      }
      const student = this.getStudent();
      main.innerHTML = renderStudyView(unit, student);
      this.initScratchpad();
    }

    switchStudyTab(tabName) {
      ['lesson', 'memory', 'diagram', 'scratchpad'].forEach(t => {
        const el = document.getElementById(`study-panel-${t}`);
        const btn = document.getElementById(`tab-btn-${t}`);
        if (el) {
          if (t === tabName) el.classList.remove('hidden');
          else el.classList.add('hidden');
        }
        if (btn) {
          if (t === tabName) {
            btn.className = "study-tab-btn flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 bg-white text-slate-900 shadow-sm";
          } else {
            btn.className = "study-tab-btn flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900";
          }
        }
      });
      if (tabName === 'scratchpad') {
        setTimeout(() => this.initScratchpad(), 50);
      }
    }

    toggleCardFlip(cardElement) {
      const front = cardElement.querySelector('.card-front');
      const back = cardElement.querySelector('.card-back');
      if (front && back) {
        front.classList.toggle('hidden');
        back.classList.toggle('hidden');
      }
    }

    speakWord(word) {
      if (!word) return;
      try {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(word);
          utterance.rate = 0.85;
          utterance.pitch = 1.0;
          window.speechSynthesis.speak(utterance);
        }
      } catch (e) {
        console.warn('Speech synthesis unavailable:', e);
      }
    }

    checkSpellingInput(targetWord) {
      const input = document.getElementById('spelling-test-input');
      const feedback = document.getElementById('spelling-test-feedback');
      if (!input || !feedback) return;

      const value = input.value.trim().toLowerCase();
      const cleanTarget = (targetWord || '').trim().toLowerCase();

      if (value === cleanTarget) {
        feedback.className = "text-xs font-bold text-emerald-700";
        feedback.textContent = `🎉 YES! "${targetWord.toUpperCase()}" is 100% correct! Super Hero level spelling!`;
      } else {
        feedback.className = "text-xs font-bold text-rose-700";
        feedback.textContent = `❌ Close! Check the spelling: ${cleanTarget.split('').join('-').toUpperCase()}. Try typing it again!`;
      }
    }

    initScratchpad() {
      const canvas = document.getElementById('math-scratchpad-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      this.scratchpadCtx = ctx;

      let drawing = false;
      const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
          x: (clientX - rect.left) * (canvas.width / rect.width),
          y: (clientY - rect.top) * (canvas.height / rect.height)
        };
      };

      canvas.onmousedown = canvas.ontouchstart = (e) => {
        e.preventDefault();
        drawing = true;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      };

      canvas.onmousemove = canvas.ontouchmove = (e) => {
        if (!drawing) return;
        e.preventDefault();
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      };

      window.onmouseup = window.ontouchend = () => {
        drawing = false;
      };
    }

    clearScratchpad() {
      const canvas = document.getElementById('math-scratchpad-canvas');
      if (!canvas || !this.scratchpadCtx) return;
      this.scratchpadCtx.clearRect(0, 0, canvas.width, canvas.height);
    }

    startQuiz(unitId) {
      this.activeUnitId = unitId;
      this.navigate('quiz', unitId);
    }

    renderQuizContainer() {
      const main = document.getElementById('app-main');
      if (!main) return;
      const unit = this.getActiveUnit();
      if (!unit) {
        this.navigate('units');
        return;
      }
      const student = this.getStudent();

      main.innerHTML = `<div id="quiz-container" class="py-4"></div>`;

      this.activeQuizRunner = new QuizRunner(unit, student, (attemptRecord) => {
        if (!unit.attempts) unit.attempts = [];
        unit.attempts.push(attemptRecord);
        this.saveUnits();

        if (attemptRecord.percentage >= 80) {
          const lockedJokes = student.dadJokes.filter(j => !j.unlocked);
          if (lockedJokes.length > 0) {
            lockedJokes[0].unlocked = true;
          }
        }
      });

      this.activeQuizRunner.start();
    }

    submitQuizAnswer(selectedIdx) {
      if (this.activeQuizRunner) {
        this.activeQuizRunner.handleAnswer(selectedIdx);
      }
    }

    submitQuizTextAnswer() {
      const input = document.getElementById('quiz-text-answer-input');
      if (this.activeQuizRunner && input) {
        this.activeQuizRunner.handleAnswer(null, input.value);
      }
    }

    nextQuizQuestion() {
      if (this.activeQuizRunner) {
        this.activeQuizRunner.nextQuestion();
      }
    }

    viewUnitProgression(unitId) {
      this.activeUnitId = unitId;
      this.navigate('progression', unitId);
    }

    renderProgressionView() {
      const main = document.getElementById('app-main');
      if (!main) return;
      const unit = this.getActiveUnit();
      if (!unit) {
        this.navigate('units');
        return;
      }
      const student = this.getStudent();

      main.innerHTML = `
        <div class="max-w-4xl mx-auto space-y-6">
          <div class="flex items-center justify-between">
            <button onclick="window.DadApp.navigate('units')" class="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all active:scale-95">
              <span>←</span> Back to All Homework Units
            </button>
            <div class="flex items-center gap-2">
              <button onclick="window.DadApp.copyUnitShareLink('${unit.id}')" class="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
                <span>📤</span>
                <span>Send to ${student.name}</span>
              </button>
              <button onclick="window.DadApp.openStudyUnit('${unit.id}')" class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm">
                Open Study Guide →
              </button>
            </div>
          </div>

          ${renderUnitProgression(unit, student)}
        </div>
      `;
    }

    // ==========================================
    // MULTI-PAGE PACKET INTAKE SYSTEM
    // ==========================================
    renderUploadView() {
      const student = this.getStudent();
      const pageCount = this.packetPages.length;

      return `
        <div class="max-w-3xl mx-auto space-y-6">
          <div class="text-center space-y-2">
            <div class="text-4xl mb-1">📸 ➔ 📑 ➔ 📁</div>
            <h1 class="text-2xl sm:text-3xl font-black text-slate-900">Upload Homework, Worksheets & Study Files</h1>
            <p class="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Snap pages with camera, choose from photo library, record a video scan, or upload documents directly (PDFs, Word DOCX, and docs)! DadWork combines everything into a single tailored study unit.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center">
                  ${pageCount}
                </span>
                <span class="text-sm font-black text-slate-900">
                  ${pageCount === 0 ? 'No Materials Captured Yet' : `${pageCount} File${pageCount > 1 ? 's' : ''}/Page${pageCount > 1 ? 's' : ''} in this Packet`}
                </span>
              </div>

              ${pageCount > 0 ? `
                <button onclick="window.DadApp.clearPacketPages()" class="text-xs font-bold text-rose-600 hover:text-rose-800 transition-all flex items-center gap-1">
                  <span>🗑️</span>
                  <span>Clear All</span>
                </button>
              ` : ''}
            </div>

            ${pageCount > 0 ? `
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                ${this.packetPages.map((p, idx) => `
                  <div class="relative group rounded-2xl border-2 border-indigo-200 bg-slate-50 overflow-hidden shadow-sm flex flex-col justify-between">
                    <div class="relative bg-slate-900/5 h-36 flex items-center justify-center overflow-hidden">
                      ${p.isVideo ? `
                        <div class="text-center p-3">
                          <span class="text-3xl">🎥</span>
                          <div class="text-[10px] font-bold text-slate-600 mt-1 truncate max-w-[100px]">${p.name || 'Video Scan'}</div>
                          <div class="text-[9px] text-slate-400 font-mono">${p.sizeFormatted || ''}</div>
                        </div>
                      ` : p.isPdf ? `
                        <div class="text-center p-3 flex flex-col items-center">
                          <span class="text-3xl">📄</span>
                          <span class="text-[10px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full mt-1">PDF DOCUMENT</span>
                          <div class="text-[10px] font-bold text-slate-700 mt-1 truncate max-w-[110px]" title="${p.name}">${p.name}</div>
                          <div class="text-[9px] text-slate-400 font-mono">${p.sizeFormatted || ''}</div>
                        </div>
                      ` : p.isDocx || p.isDoc ? `
                        <div class="text-center p-3 flex flex-col items-center">
                          <span class="text-3xl">📝</span>
                          <span class="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1">WORD DOCX</span>
                          <div class="text-[10px] font-bold text-slate-700 mt-1 truncate max-w-[110px]" title="${p.name}">${p.name}</div>
                          <div class="text-[9px] text-slate-400 font-mono">${p.sizeFormatted || ''}</div>
                        </div>
                      ` : p.isTxt ? `
                        <div class="text-center p-3 flex flex-col items-center">
                          <span class="text-3xl">📃</span>
                          <span class="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full mt-1">TEXT FILE</span>
                          <div class="text-[10px] font-bold text-slate-700 mt-1 truncate max-w-[110px]" title="${p.name}">${p.name}</div>
                          <div class="text-[9px] text-slate-400 font-mono">${p.sizeFormatted || ''}</div>
                        </div>
                      ` : `
                        <img src="${p.data}" class="w-full h-full object-cover" />
                      `}
                      <button onclick="window.DadApp.removePacketPage(${idx})" class="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shadow-md hover:bg-rose-700 transition-all" title="Remove this page">
                        ✕
                      </button>
                    </div>
                    <div class="p-2 bg-white text-center border-t border-slate-100 flex items-center justify-between text-xs">
                      <span class="font-bold text-slate-800">Item ${idx + 1}</span>
                      <span class="text-[10px] text-slate-400 font-mono font-bold">${p.isPdf ? 'PDF' : p.isDocx ? 'DOCX' : p.isVideo ? 'VIDEO' : p.isTxt ? 'TXT' : 'IMAGE'}</span>
                    </div>
                  </div>
                `).join('')}

                <label class="cursor-pointer border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-1 bg-indigo-50/20 hover:bg-indigo-50/50 transition-all h-44">
                  <span class="text-2xl text-indigo-600">+</span>
                  <span class="text-xs font-bold text-indigo-700">Add Page / File</span>
                  <span class="text-[10px] text-indigo-400">Photo, PDF, DOCX</span>
                  <input type="file" accept="image/*,video/*,.pdf,.docx,.doc,.txt,.rtf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/*" multiple class="hidden" onchange="window.DadApp.handlePacketFileInput(event)" />
                </label>
              </div>
            ` : `
              <div class="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-3"
                   ondragover="event.preventDefault();"
                   ondrop="window.DadApp.handlePacketDrop(event)">
                <div class="text-4xl">📚</div>
                <div class="text-sm font-bold text-slate-700">Add homework: Photos, Videos, PDFs, or Word Documents (.docx)</div>
                <div class="text-xs text-slate-400">Snap pages with camera, choose from photo library, record a video scan, or upload PDF / DOCX study guides!</div>
              </div>
            `}

            <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
              <label class="cursor-pointer px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2">
                <span>📸</span>
                <span>${pageCount === 0 ? 'Snap Page 1' : 'Snap Next Page'}</span>
                <input type="file" accept="image/*" capture="environment" class="hidden" onchange="window.DadApp.handlePacketFileInput(event)" />
              </label>

              <label class="cursor-pointer px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 transition-all active:scale-95 flex items-center gap-2">
                <span>🖼️</span>
                <span>Choose Photos</span>
                <input type="file" accept="image/*" multiple class="hidden" onchange="window.DadApp.handlePacketFileInput(event)" />
              </label>

              <label class="cursor-pointer px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2" title="Select files such as PDFs, Word DOCX, or text worksheets">
                <span>📁</span>
                <span>Upload Files (PDF, Word DOCX)</span>
                <input type="file" accept=".pdf,.docx,.doc,.txt,.rtf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/*" multiple class="hidden" onchange="window.DadApp.handlePacketFileInput(event)" />
              </label>

              <label class="cursor-pointer px-4 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm border border-amber-200 transition-all active:scale-95 flex items-center gap-2" title="Record or upload a quick video flipping through the pages">
                <span>🎥</span>
                <span>Record Video Scan</span>
                <input type="file" accept="video/*" capture="environment" class="hidden" onchange="window.DadApp.handlePacketFileInput(event)" />
              </label>
            </div>
          </div>

          <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <span class="text-xs font-bold text-slate-500 uppercase">Assigned To:</span>
              <div class="flex items-center gap-1.5">
                <button onclick="window.DadApp.switchStudent('christian')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.currentStudentId === 'christian' ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600'}">
                  Christian (Elementary) 🦸‍♂️
                </button>
                <button onclick="window.DadApp.switchStudent('caleb')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.currentStudentId === 'caleb' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600'}">
                  Caleb (Middle School) ⚡
                </button>
              </div>
            </div>

            ${pageCount > 0 ? `
              <button onclick="window.DadApp.startPacketAnalysis()" class="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
                <span>🚀 Analyze Whole Packet (${pageCount} Items) →</span>
              </button>
            ` : `
              <div class="text-xs text-slate-400 italic">Add at least 1 page or document to start analysis</div>
            `}
          </div>

          <div id="upload-analyzing-spinner" class="hidden bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
            <div class="inline-block animate-spin text-5xl">⚙️</div>
            <h3 class="text-lg font-black text-slate-900" id="analyzing-status-title">DadWork AI is Analyzing the Entire Packet...</h3>
            <p class="text-xs text-slate-500 max-w-sm mx-auto" id="analyzing-status-sub">
              Reading all pages and documents, detecting biological diagrams and exercises, building customized Kitchen Table analogies, and assembling the comprehensive quiz!
            </p>
          </div>

          <div id="upload-confirmation-modal" class="hidden bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5"></div>
        </div>
      `;
    }

    handlePacketFileInput(e) {
      if (e.target && e.target.files && e.target.files.length > 0) {
        this.addFilesToPacket(Array.from(e.target.files));
      }
    }

    handlePacketDrop(e) {
      e.preventDefault();
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        this.addFilesToPacket(Array.from(e.dataTransfer.files));
      }
    }

    async addFilesToPacket(files) {
      const formatBytes = (bytes) => {
        if (!bytes) return '';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
      };

      const readFileAsDataURL = (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result || '');
          reader.onerror = () => resolve('');
          reader.readAsDataURL(file);
        });
      };

      const readFileAsText = (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result || '');
          reader.onerror = () => resolve('');
          reader.readAsText(file);
        });
      };

      const readFileAsArrayBuffer = (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = () => resolve(null);
          reader.readAsArrayBuffer(file);
        });
      };

      for (const file of files) {
        const fileName = file.name || 'document';
        const lowerName = fileName.toLowerCase();
        const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v|avi|mkv)$/i.test(lowerName);
        const isPdf = file.type === 'application/pdf' || lowerName.endsWith('.pdf');
        const isDocx = lowerName.endsWith('.docx') || file.type.includes('wordprocessingml');
        const isDoc = lowerName.endsWith('.doc') || file.type.includes('msword');
        const isTxt = file.type.startsWith('text/') || /\.(txt|md|csv|rtf|json)$/i.test(lowerName);

        let dataUrl = '';
        let extractedText = '';
        let mimeType = file.type;

        if (isDocx) {
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          const buffer = await readFileAsArrayBuffer(file);
          if (buffer) {
            try {
              if (window.mammoth) {
                const res = await window.mammoth.extractRawText({ arrayBuffer: buffer });
                extractedText = (res && res.value) ? res.value.trim() : '';
              } else {
                extractedText = await extractDocxTextFallback(buffer);
              }
            } catch (err) {
              console.warn('Docx extraction error, trying fallback:', err);
              extractedText = await extractDocxTextFallback(buffer);
            }
          }
          dataUrl = await readFileAsDataURL(file);
        } else if (isTxt) {
          mimeType = file.type || 'text/plain';
          extractedText = await readFileAsText(file);
          dataUrl = await readFileAsDataURL(file);
        } else if (isPdf) {
          mimeType = 'application/pdf';
          dataUrl = await readFileAsDataURL(file);
        } else {
          dataUrl = await readFileAsDataURL(file);
          if (!mimeType) {
            mimeType = isVideo ? 'video/mp4' : 'image/jpeg';
          }
        }

        this.packetPages.push({
          data: dataUrl,
          mimeType: mimeType || (isPdf ? 'application/pdf' : isVideo ? 'video/mp4' : isDocx ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'image/jpeg'),
          name: fileName,
          size: file.size,
          sizeFormatted: formatBytes(file.size),
          isVideo: isVideo,
          isPdf: isPdf,
          isDocx: isDocx,
          isDoc: isDoc || isDocx || isTxt,
          isTxt: isTxt,
          extractedText: extractedText,
          textPreview: extractedText ? extractedText.slice(0, 180).trim() : ''
        });
      }

      this.renderCurrentView();
    }

    removePacketPage(index) {
      this.packetPages.splice(index, 1);
      this.renderCurrentView();
    }

    clearPacketPages() {
      this.packetPages = [];
      this.renderCurrentView();
    }

    async startPacketAnalysis() {
      if (this.packetPages.length === 0) return;

      const spinner = document.getElementById('upload-analyzing-spinner');
      const confirmBox = document.getElementById('upload-confirmation-modal');

      if (spinner) spinner.classList.remove('hidden');

      try {
        const result = await analyzeWorksheetPacket(this.packetPages, this.currentStudentId);
        if (spinner) spinner.classList.add('hidden');
        if (confirmBox) {
          confirmBox.classList.remove('hidden');
          this.renderUploadConfirmation(result);
        }
      } catch (err) {
        if (spinner) spinner.classList.add('hidden');
        alert(`Could not analyze packet: ${err.message}. DadWork will use smart simulation.`);
      }
    }

    renderUploadConfirmation(parsedData) {
      const confirmBox = document.getElementById('upload-confirmation-modal');
      if (!confirmBox) return;

      const pageThumbnails = this.packetPages.map(p => ({
        data: p.data,
        name: p.name,
        mimeType: p.mimeType,
        sizeFormatted: p.sizeFormatted,
        isPdf: p.isPdf,
        isDocx: p.isDocx,
        isDoc: p.isDoc,
        isTxt: p.isTxt,
        isVideo: p.isVideo,
        textPreview: p.textPreview
      }));

      window._pendingNewUnit = {
        id: `unit_${parsedData.studentId}_${Date.now()}`,
        studentId: parsedData.studentId || this.currentStudentId,
        subject: parsedData.subject || 'Math',
        diagramType: parsedData.diagramType || null,
        title: parsedData.title || 'New Study Unit',
        notes: parsedData.notes || `Homework material (${this.packetPages.length} file(s)/page(s))`,
        dateAdded: new Date().toISOString().split('T')[0],
        sourcePhotoUrl: pageThumbnails[0] ? pageThumbnails[0].data : null,
        sourcePages: pageThumbnails,
        studyGuide: parsedData.studyGuide,
        memorizationItems: parsedData.memorizationItems || [],
        quizQuestions: parsedData.quizQuestions || [],
        attempts: []
      };

      confirmBox.innerHTML = `
        <div class="space-y-4 text-left">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="text-2xl">✅</span>
              <div>
                <h3 class="text-lg font-black text-slate-900">Homework Materials Analyzed! Does this look right?</h3>
                <p class="text-xs text-slate-500">Synthesized ${this.packetPages.length} item(s) into one cohesive unit</p>
              </div>
            </div>
          </div>

          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Attached Materials (${this.packetPages.length})</div>
            <div class="flex items-center gap-2 overflow-x-auto pb-1">
              ${this.packetPages.map((p, idx) => `
                <div class="w-16 h-16 rounded-xl border border-slate-300 overflow-hidden flex-shrink-0 bg-white flex flex-col items-center justify-center p-1 text-center">
                  ${p.isVideo ? '<span class="text-xl">🎥</span><span class="text-[8px] font-bold text-amber-700">VIDEO</span>'
                    : p.isPdf ? '<span class="text-xl">📄</span><span class="text-[8px] font-bold text-rose-700">PDF</span>'
                    : p.isDocx || p.isDoc ? '<span class="text-xl">📝</span><span class="text-[8px] font-bold text-blue-700">DOCX</span>'
                    : p.isTxt ? '<span class="text-xl">📃</span><span class="text-[8px] font-bold text-slate-600">TXT</span>'
                    : `<img src="${p.data}" class="w-full h-full object-cover" />`}
                </div>
              `).join('')}
            </div>
          </div>

          <div class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Assigned Student</label>
              <div class="flex items-center gap-3">
                <label class="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-slate-200 bg-slate-50 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/50">
                  <input type="radio" name="confirm-student" value="christian" ${window._pendingNewUnit.studentId === 'christian' ? 'checked' : ''} onchange="window._pendingNewUnit.studentId = 'christian'" />
                  <span class="text-sm font-bold">Christian (Elementary) 🦸‍♂️</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-slate-200 bg-slate-50 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/50">
                  <input type="radio" name="confirm-student" value="caleb" ${window._pendingNewUnit.studentId === 'caleb' ? 'checked' : ''} onchange="window._pendingNewUnit.studentId = 'caleb'" />
                  <span class="text-sm font-bold">Caleb (Middle School) ⚡</span>
                </label>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Subject</label>
                <input type="text" id="confirm-subject-input" value="${window._pendingNewUnit.subject}" 
                       class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                       onchange="window._pendingNewUnit.subject = this.value" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Unit Title</label>
                <input type="text" id="confirm-title-input" value="${window._pendingNewUnit.title}" 
                       class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                       onchange="window._pendingNewUnit.title = this.value" />
              </div>
            </div>

            ${window._pendingNewUnit.diagramType ? `
              <div class="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 font-bold flex items-center gap-2">
                <span>🔬</span>
                <span>Detected Biological Diagram: [${window._pendingNewUnit.diagramType.toUpperCase()}] with visual labeling quiz questions enabled!</span>
              </div>
            ` : ''}

            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <div><strong>Summary:</strong> ${window._pendingNewUnit.studyGuide?.summary}</div>
              <div class="text-slate-500">✨ Generated: ${window._pendingNewUnit.memorizationItems.length} memorization cards & ${window._pendingNewUnit.quizQuestions.length} quiz questions covering the full packet.</div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button onclick="window.DadApp.navigate('upload')" class="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-all">
              Cancel
            </button>
            <button onclick="window.DadApp.confirmAndSavePendingUnit()" class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2">
              <span>✓ Confirm & Start Studying</span>
            </button>
          </div>
        </div>
      `;
    }

    confirmAndSavePendingUnit() {
      if (!window._pendingNewUnit) return;
      const unit = window._pendingNewUnit;
      this.units.unshift(unit);
      this.saveUnits();

      this.packetPages = [];

      if (unit.studentId !== this.currentStudentId) {
        this.switchStudent(unit.studentId);
      }

      this.openStudyUnit(unit.id);
    }

    copyUnitShareLink(unitId) {
      const unit = this.units.find(u => u.id === unitId);
      if (!unit) return;

      const student = STUDENTS[unit.studentId] || this.getStudent();
      let shareUrl = '';

      const isInitial = INITIAL_UNITS.some(u => u.id === unit.id);
      if (isInitial) {
        shareUrl = `${window.location.origin}${window.location.pathname}?unit=${unit.id}&student=${unit.studentId}`;
      } else {
        const unitCopy = { ...unit };
        delete unitCopy.sourcePages;
        delete unitCopy.sourcePhotoUrl;
        const jsonStr = JSON.stringify(unitCopy);
        const base64Str = btoa(unescape(encodeURIComponent(jsonStr)));
        shareUrl = `${window.location.origin}${window.location.pathname}#unit_data=${base64Str}`;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert(`Link copied to clipboard for ${student.name}!\n\nSend this link to ${student.name}'s iPad, phone, or laptop.`);
        }).catch(() => {
          prompt(`Copy this link to send to ${student.name}:`, shareUrl);
        });
      } else {
        prompt(`Copy this link to send to ${student.name}:`, shareUrl);
      }
    }

    shareResultToDad(unitId, attemptNumber) {
      const unit = this.units.find(u => u.id === unitId);
      if (!unit) return;
      const att = unit.attempts?.[attemptNumber - 1] || unit.attempts?.[unit.attempts.length - 1];
      if (!att) return;

      const student = this.getStudent();
      const message = `Dad! ${student.name} just finished "${unit.title}"!\nScore: ${att.percentage}% (${att.score}/${att.total})\nTime: ${Math.floor(att.timeSeconds / 60)}m ${att.timeSeconds % 60}s\nPacing: ${att.pacingVerdict}\nFeedback: "${att.dadFeedback}"`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message).then(() => {
          alert(`Copied quiz result to clipboard!\n\nYou can now text or message this directly to Dad.`);
        }).catch(() => {
          prompt('Copy this message to text Dad:', message);
        });
      } else {
        prompt('Copy this message to text Dad:', message);
      }
    }

    renderDadJokeLocker() {
      const student = this.getStudent();
      const jokes = student.dadJokes;

      return `
        <div class="max-w-4xl mx-auto space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 class="text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>😂</span>
                <span>${student.name}'s Dad Joke Locker</span>
              </h1>
              <p class="text-xs text-slate-500">
                Corny dad jokes, puns, and goofy lines unlocked every time ${student.name} scores 80%+ on a quiz!
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${jokes.map((j, idx) => `
              <div class="p-5 rounded-2xl border ${j.unlocked ? 'bg-amber-50/50 border-amber-200 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'} transition-all space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-black uppercase tracking-wider ${j.unlocked ? 'text-amber-800' : 'text-slate-400'}">
                    Joke #${idx + 1}
                  </span>
                  <span class="text-xs px-2 py-0.5 rounded-md font-bold ${j.unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                    ${j.unlocked ? '🔓 Unlocked' : '🔒 Locked (Score 80%+)'}
                  </span>
                </div>

                ${j.unlocked ? `
                  <div class="text-sm font-bold text-slate-900 leading-snug">
                    "${j.setup}"
                  </div>
                  <div class="text-sm font-extrabold text-amber-900 pt-1 border-t border-amber-200/60">
                    👉 "${j.punchline}"
                  </div>
                ` : `
                  <div class="text-xs text-slate-400 italic">
                    Complete a quiz unit with 80% or better to reveal this groan-worthy Dad Joke!
                  </div>
                `}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    renderSettingsView() {
      const currentKey = getGeminiApiKey();

      return `
        <div class="max-w-xl mx-auto space-y-6">
          <div class="space-y-1">
            <h1 class="text-2xl font-black text-slate-900">DadWork Settings & AI Setup</h1>
            <p class="text-xs text-slate-500">Configure your Google Gemini API key or manage stored homework units.</p>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🤖</span>
              <div>
                <h3 class="font-bold text-slate-900 text-sm">Google Gemini Vision API Key</h3>
                <p class="text-xs text-slate-500">Optional. Enter your key for custom multi-page photo & video analysis.</p>
              </div>
            </div>

            <div class="space-y-2">
              <input type="password" id="gemini-key-input" value="${currentKey}" placeholder="AIzaSy..." 
                     class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <div class="text-[11px] text-slate-400">
                Stored strictly on your device in browser localStorage.
              </div>
            </div>

            <div class="flex items-center gap-2 pt-1">
              <button onclick="window.DadApp.saveApiKey()" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-95">
                Save API Key
              </button>
              ${currentKey ? `
                <button onclick="window.DadApp.clearApiKey()" class="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-all">
                  Remove Key
                </button>
              ` : ''}
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center gap-3">
              <span class="text-2xl">💾</span>
              <div>
                <h3 class="font-bold text-slate-900 text-sm">Homework Units & Quiz History</h3>
                <p class="text-xs text-slate-500">Export or backup your boys' progress and score history.</p>
              </div>
            </div>

            <div class="flex items-center gap-3 pt-1">
              <button onclick="window.DadApp.exportData()" class="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all">
                Export All Units (JSON)
              </button>
              <button onclick="window.DadApp.resetDefaults()" class="px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs transition-all">
                Reset to Sample Data
              </button>
            </div>
          </div>
        </div>
      `;
    }

    saveApiKey() {
      const input = document.getElementById('gemini-key-input');
      if (input) {
        setGeminiApiKey(input.value);
        alert('Gemini API Key saved successfully!');
        this.renderCurrentView();
      }
    }

    clearApiKey() {
      setGeminiApiKey('');
      alert('API Key removed. DadWork will now use smart simulation.');
      this.renderCurrentView();
    }

    exportData() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.units, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `dadwork_backup_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }

    resetDefaults() {
      if (confirm("Reset homework units back to default sample units for Caleb and Christian?")) {
        localStorage.removeItem(STORAGE_KEY_UNITS);
        this.units = [...INITIAL_UNITS];
        this.saveUnits();
        this.renderCurrentView();
      }
    }
  }

  // Auto-boot DadWorkApp
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new DadWorkApp());
  } else {
    new DadWorkApp();
  }

})();
