// DadWork App - Multimodal Gemini Vision Engine & Study Unit Generator (Multi-Page & Video Support)

const GEMINI_API_STORAGE_KEY = 'dadwork_gemini_api_key';

export function getGeminiApiKey() {
  return localStorage.getItem(GEMINI_API_STORAGE_KEY) || '';
}

export function setGeminiApiKey(key) {
  if (!key) {
    localStorage.removeItem(GEMINI_API_STORAGE_KEY);
  } else {
    localStorage.setItem(GEMINI_API_STORAGE_KEY, key.trim());
  }
}

/**
 * Analyze an uploaded multi-page homework packet or video scan using Gemini 1.5 Flash
 * @param {Array<{data: string, mimeType: string, name?: string}>} pages - Array of page images/videos in base64 data URLs
 * @param {string} preferredStudentId - Optional student hint ('caleb' or 'christian')
 */
export async function analyzeWorksheetPacket(pages, preferredStudentId = '') {
  if (!pages || pages.length === 0) {
    throw new Error('Please upload at least one page or video scan.');
  }

  const apiKey = getGeminiApiKey();

  // If no API key is provided, use the smart simulation engine
  if (!apiKey) {
    console.info('No Gemini API key provided. Using DadWork Smart Multi-Page Simulation Engine.');
    return simulateMultiPageAnalysis(pages, preferredStudentId);
  }

  const promptText = `
You are the AI engine for "DadWork", an interactive homework app built by a loving, witty dad for his two sons:
- Caleb: Middle School. Interests: Marvel movies (Avengers, Spider-Man, Iron Man), Soccer & FIFA, WWE wrestling, NBA basketball, NFL football, video games (Fortnite, Rocket League).
- Christian: Elementary School. Interests: TV shows (Henry Danger / Captain Man), Roblox games (Dandy's World), Minions movies (bananas, silly laughs), Peppa Pig (Daddy Pig muddy puddles), books (Dog Man by Dav Pilkey, Diary of a Wimpy Kid "Zoo-Wee Mama!").

ANALYZE THIS MULTI-PAGE HOMEWORK PACKET / STUDY GUIDE (Containing ${pages.length} page(s) or scan):
1. Review all pages in order.
2. Identify who this homework belongs to (either "caleb" or "christian"). Look at student name handwriting, grade level, topic difficulty. If unclear, default to "${preferredStudentId || 'christian'}".
3. Identify the School Subject: ("Math", "Spelling", "Vocabulary", "Science", "Social Studies", "Reading", or "English").
4. Determine a clear Unit Title summarizing the entire packet.
5. Synthesize the whole packet and produce:
   a) A unified study guide / kitchen table lesson explaining how to perform the exercises across the packet. Write this in a warm, funny Dad tone incorporating the child's specific interests (Marvel/gaming/sports for Caleb, Minions/Dog Man/Henry Danger for Christian).
   b) 4 to 8 key memorization items (flashcards or spelling words with phonetic/meaning clues) synthesizing the core concepts across all pages.
   c) A comprehensive quiz with between 5 and 10 questions (never more than 10) covering the different exercises in the packet. Questions can be multiple-choice (4 options with correctIndex 0-3) or text-input (for spelling/vocab). Provide clear explanations for each question.

RETURN STRICTLY RAW JSON (no markdown formatting, no code fences) with this exact schema:
{
  "studentId": "caleb" or "christian",
  "subject": "Math" | "Spelling" | "Vocabulary" | "Science" | "Social Studies" | "Other",
  "title": "Short Descriptive Title",
  "notes": "Extracted summary of what was covered across the ${pages.length} pages",
  "studyGuide": {
    "summary": "1-2 sentence big picture explanation with dad humor and their favorite interest",
    "keyRules": ["Rule / Step 1", "Rule / Step 2", "Rule / Step 3"],
    "dadExample": "Concrete example problem solved step-by-step with funny analogy"
  },
  "memorizationItems": [
    { "term": "...", "definition": "...", "type": "flashcard" | "spelling" }
  ],
  "quizQuestions": [
    {
      "id": "q1",
      "type": "multiple-choice",
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
      const base64Clean = p.data.includes('base64,') ? p.data.split('base64,')[1] : p.data;
      parts.push({
        inline_data: {
          mime_type: p.mimeType || 'image/jpeg',
          data: base64Clean
        }
      });
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 3000,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API Error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidate) {
      throw new Error('Gemini API returned an empty response.');
    }

    const cleanJson = candidate.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Failed to parse multi-page packet with Gemini API:', error);
    throw error;
  }
}

/**
 * Backward compatibility wrapper
 */
export async function analyzeWorksheetImage(base64Data, mimeType, preferredStudentId = '') {
  return analyzeWorksheetPacket([{ data: base64Data, mimeType }], preferredStudentId);
}

function simulateMultiPageAnalysis(pages, preferredStudentId) {
  const isCaleb = preferredStudentId === 'caleb';
  const pageCount = pages ? pages.length : 1;

  if (isCaleb) {
    return {
      studentId: 'caleb',
      subject: 'Math',
      title: `Middle School Algebra & Geometry (${pageCount}-Page Packet)`,
      notes: `Combined study packet spanning ${pageCount} pages covering algebraic expressions and polygon areas.`,
      studyGuide: {
        summary: `Balancing full-packet math problems is like executing a perfect set-piece in soccer or coordinating a 4-player Fortnite squad!`,
        keyRules: [
          "Isolate the variable on one side by performing inverse operations.",
          "Keep equations balanced: what you do to the left side, you must do to the right.",
          "Check perimeter and area formulas: Perimeter walks the sideline; Area measures inside the turf!"
        ],
        dadExample: "If 3x + 12 = 36: first subtract 12 from both sides to get 3x = 24. Then divide by 3 to isolate x = 8. Boom! Goal from midfield!"
      },
      memorizationItems: [
        { term: "Inverse Operations", definition: "Operations that undo each other (Add ↔ Subtract, Multiply ↔ Divide)", type: "flashcard" },
        { term: "Isolating Variables", definition: "Getting the unknown letter alone on one side of '='", type: "flashcard" },
        { term: "Rectangle Area", definition: "Area = Length × Width", type: "flashcard" },
        { term: "Triangle Area", definition: "Area = 1/2 × Base × Height", type: "flashcard" }
      ],
      quizQuestions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: "From Page 1 of the packet: Solve for x in 2x + 8 = 24",
          options: ["x = 8", "x = 16", "x = 12", "x = 6"],
          correctIndex: 0,
          explanation: "Subtract 8 to get 2x = 16, then divide by 2: x = 8. Clean 3-pointer!"
        },
        {
          id: 'q2',
          type: 'multiple-choice',
          question: "From Page 2: What is the area of a rectangle with length 12m and width 5m?",
          options: ["60 square meters", "34 meters", "17 square meters", "50 square meters"],
          correctIndex: 0,
          explanation: "Area = 12 × 5 = 60 sq meters!"
        },
        {
          id: 'q3',
          type: 'multiple-choice',
          question: "Solve for y: y / 4 = 9",
          options: ["y = 36", "y = 13", "y = 5", "y = 28"],
          correctIndex: 0,
          explanation: "Multiply both sides by 4: 9 × 4 = 36!"
        },
        {
          id: 'q4',
          type: 'multiple-choice',
          question: "If a soccer field has sides of 110m and 75m, what is the total perimeter?",
          options: ["370 meters", "185 meters", "8,250 square meters", "295 meters"],
          correctIndex: 0,
          explanation: "Perimeter = 110 + 75 + 110 + 75 = 370 meters!"
        },
        {
          id: 'q5',
          type: 'multiple-choice',
          question: "What is the inverse of multiplying by 7?",
          options: ["Dividing by 7", "Subtracting 7", "Adding 7", "Squaring 7"],
          correctIndex: 0,
          explanation: "Division is the inverse of multiplication!"
        }
      ]
    };
  } else {
    return {
      studentId: 'christian',
      subject: 'Science',
      title: `Elementary Science: Animal Habitats & Lifecycles (${pageCount}-Page Packet)`,
      notes: `Complete multi-page study packet covering animal habitats, food chains, and adaptations.`,
      studyGuide: {
        summary: `This whole packet shows how animals survive and adapt in nature—just like Toons grouping together in Dandy's World!`,
        keyRules: [
          "Herbivores eat plants (like silly Minions eating bananas!).",
          "Carnivores eat meat; Omnivores eat both plants and meat.",
          "Camouflage helps animals hide from predators like Bark Knight hiding in shadows."
        ],
        dadExample: "A desert camel has long eyelashes to keep sand out of its eyes and humps to store fat for long trips without water. Zoo-Wee Mama!"
      },
      memorizationItems: [
        { term: "Herbivore", definition: "An animal that eats only plants", type: "flashcard" },
        { term: "Carnivore", definition: "An animal that eats only meat", type: "flashcard" },
        { term: "Omnivore", definition: "An animal that eats both plants and animals", type: "flashcard" },
        { term: "Camouflage", definition: "Patterns or colors that help an animal hide", type: "flashcard" }
      ],
      quizQuestions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: "From Page 1 of the packet: An animal that eats only plants and fruits is called a:",
          options: ["Carnivore", "Herbivore", "Robot", "Superhero"],
          correctIndex: 1,
          explanation: "Herbivores eat plants! Bananas count!"
        },
        {
          id: 'q2',
          type: 'multiple-choice',
          question: "From Page 2: What is an animal's natural home called?",
          options: ["A Man Cave", "A Habitat", "A Supermarket", "A Garage"],
          correctIndex: 1,
          explanation: "A Habitat is where an animal naturally lives and finds food!"
        },
        {
          id: 'q3',
          type: 'multiple-choice',
          question: "Why do chameleons change colors to match leaves and branches?",
          options: ["Camouflage to stay safe from predators", "Because they are cold", "To dance", "To jump in puddles"],
          correctIndex: 0,
          explanation: "Camouflage keeps them hidden! Supa Buddy work!"
        },
        {
          id: 'q4',
          type: 'multiple-choice',
          question: "Dog Man is a dog-human superhero. Since dogs eat meat and grains/kibble, what type of eater is he?",
          options: ["Omnivore", "Herbivore", "Plant only", "Fish only"],
          correctIndex: 0,
          explanation: "Omnivores eat both meat and plants!"
        },
        {
          id: 'q5',
          type: 'multiple-choice',
          question: "Which feature helps a polar bear survive freezing Arctic temperatures?",
          options: ["Thick blubber and dense fur", "Bright pink feathers", "A long tail", "Sunscreen"],
          correctIndex: 0,
          explanation: "Thick fat and dense fur keep the polar bear warm!"
        }
      ]
    };
  }
}
