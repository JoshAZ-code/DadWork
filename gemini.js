// DadWork App - Multimodal Gemini Vision Engine & Study Unit Generator

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
 * Analyze an uploaded worksheet or study guide image using Gemini 1.5 Flash (or smart fallback)
 * @param {string} base64Data - Base64 data URL of the uploaded image
 * @param {string} mimeType - Image mime type (image/jpeg, image/png, etc.)
 * @param {string} preferredStudentId - Optional student hint ('caleb' or 'christian')
 */
export async function analyzeWorksheetImage(base64Data, mimeType, preferredStudentId = '') {
  const apiKey = getGeminiApiKey();

  // If no API key is provided, use the smart simulation engine to give immediate high-quality results
  if (!apiKey) {
    console.info('No Gemini API key provided. Using DadWork Smart Simulation Engine.');
    return simulateImageAnalysis(preferredStudentId);
  }

  // Base64 payload without data prefix
  const base64Clean = base64Data.includes('base64,') 
    ? base64Data.split('base64,')[1] 
    : base64Data;

  const promptText = `
You are the AI engine for "DadWork", an interactive homework app built by a loving, witty dad for his two sons:
- Caleb: Middle School. Interests: Marvel movies (Iron Man, Spider-Man, Avengers), Soccer & FIFA, WWE wrestling, NBA basketball, NFL football, video games (Fortnite, Rocket League).
- Christian: Elementary School. Interests: TV shows (Henry Danger / Captain Man), Roblox games (Dandy's World), Minions movies (bananas, silly laughs), Peppa Pig (Daddy Pig muddy puddles), books (Dog Man by Dav Pilkey, Diary of a Wimpy Kid "Zoo-Wee Mama!").

ANALYZE THIS HOMEWORK / STUDY GUIDE PAGE:
1. Identify who this homework belongs to (either "caleb" or "christian"). Look at student name handwriting, grade level, topic difficulty. If unclear, default to "${preferredStudentId || 'christian'}".
2. Identify the School Subject: ("Math", "Spelling", "Vocabulary", "Science", "Social Studies", "Reading", or "English").
3. Determine a clear Unit Title (e.g. "Pre-Algebra: Solving One-Step Equations" or "Week 6 Phonics & Spelling List").
4. Extract the core concepts and produce:
   a) A brief study guide / kitchen table lesson explaining how to perform the exercises. Write this in a warm, funny Dad tone incorporating the child's specific interests (e.g. Marvel/Fortnite analogies for Caleb, or Minions/Dog Man/Henry Danger for Christian).
   b) 4 to 8 memorization items (flashcards or spelling words with phonetic/meaning clues).
   c) A quiz with between 5 and 10 questions (never more than 10). Questions can be multiple-choice (with 4 options and correctIndex 0-3) or text-input (for spelling/vocab). Provide clear explanations for each question.

RETURN STRICTLY RAW JSON (no markdown formatting, no code fences) with this exact schema:
{
  "studentId": "caleb" or "christian",
  "subject": "Math" | "Spelling" | "Vocabulary" | "Science" | "Social Studies" | "Other",
  "title": "Short Descriptive Title",
  "notes": "Extracted summary of what was on the page",
  "studyGuide": {
    "summary": "1-2 sentence big picture explanation with dad humor and their favorite interest",
    "keyRules": ["Step 1 / Rule 1", "Step 2 / Rule 2", "Step 3 / Rule 3"],
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

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: promptText },
              {
                inline_data: {
                  mime_type: mimeType || 'image/jpeg',
                  data: base64Clean
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2500,
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

    // Clean JSON if needed
    const cleanJson = candidate.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const parsed = JSON.parse(cleanJson);
    return parsed;
  } catch (error) {
    console.error('Failed to parse image with Gemini API:', error);
    throw error;
  }
}

/**
 * Smart fallback simulation engine when testing without an active API key
 */
function simulateImageAnalysis(preferredStudentId) {
  const isCaleb = preferredStudentId === 'caleb';
  
  if (isCaleb) {
    return {
      studentId: 'caleb',
      subject: 'Math',
      title: 'Middle School Geometry: Area & Perimeter of Polygons',
      notes: 'Worksheet on finding perimeter and area of rectangles, triangles, and soccer fields.',
      studyGuide: {
        summary: "Perimeter is walking the entire sideline of a soccer pitch; Area is counting how much turf grass is inside!",
        keyRules: [
          "Perimeter: Add up ALL outer sides (P = 2L + 2W for rectangles).",
          "Area of Rectangle: Multiply Length times Width (A = L × W).",
          "Area of Triangle: Half of the base times height (A = 1/2 × b × h) - just like splitting the soccer field on a diagonal pass!"
        ],
        dadExample: "If an NFL endzone is 10 yards long and 50 yards wide: Area = 10 × 50 = 500 sq yards! Touchdown!"
      },
      memorizationItems: [
        { term: "Rectangle Area Formula", definition: "A = Length × Width", type: "flashcard" },
        { term: "Triangle Area Formula", definition: "A = 1/2 × base × height", type: "flashcard" },
        { term: "Perimeter", definition: "The total distance around the outside edge of a shape", type: "flashcard" },
        { term: "Square Units", definition: "Units used for Area (e.g. cm², ft², yards²)", type: "flashcard" }
      ],
      quizQuestions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: "What is the area of a rectangle with a length of 8 meters and a width of 6 meters?",
          options: ["48 square meters", "28 meters", "14 square meters", "36 square meters"],
          correctIndex: 0,
          explanation: "Area = 8 × 6 = 48 sq meters. Clean 3-pointer from downtown!"
        },
        {
          id: 'q2',
          type: 'multiple-choice',
          question: "Find the perimeter of a square where each side is 9 feet long.",
          options: ["18 feet", "81 square feet", "36 feet", "27 feet"],
          correctIndex: 2,
          explanation: "Perimeter = 4 × 9 = 36 feet all the way around!"
        },
        {
          id: 'q3',
          type: 'multiple-choice',
          question: "What is the area of a triangle with base = 10 cm and height = 6 cm? (Remember: 1/2 × b × h)",
          options: ["60 cm²", "30 cm²", "16 cm²", "32 cm²"],
          correctIndex: 1,
          explanation: "1/2 of 10 is 5; 5 × 6 = 30 cm²! Calculated!"
        },
        {
          id: 'q4',
          type: 'multiple-choice',
          question: "If a FIFA soccer pitch has sides of 100 meters and 70 meters, what is the total perimeter?",
          options: ["340 meters", "170 meters", "7,000 square meters", "240 meters"],
          correctIndex: 0,
          explanation: "Perimeter = 100 + 70 + 100 + 70 = 340 meters! World Cup ready!"
        },
        {
          id: 'q5',
          type: 'multiple-choice',
          question: "Which of the following units represents an AREA measurement?",
          options: ["14 inches", "25 square feet (ft²)", "10 pounds", "32 seconds"],
          correctIndex: 1,
          explanation: "Area is always measured in square units!"
        }
      ]
    };
  } else {
    // Default Christian
    return {
      studentId: 'christian',
      subject: 'Science',
      title: 'Elementary Science: Animals, Habitats & Adaptation',
      notes: 'Science study sheet on animal coverings, herbivores vs carnivores, and habitats.',
      studyGuide: {
        summary: "Animals adapt to their environment just like Toons use special items in Dandy's World!",
        keyRules: [
          "Herbivores only eat plants, leaves, and fruits (like silly Minions eating bananas!).",
          "Carnivores eat other animals/meat (like Petey the Cat chasing a fish!).",
          "Omnivores eat BOTH plants and meat (like humans and dogs!).",
          "Camouflage helps animals blend into their surroundings to stay safe from danger."
        ],
        dadExample: "A polar bear has thick white fur. The white fur camouflages in snow, and the thick fat keeps it warm while splashing in icy water better than muddy puddles!"
      },
      memorizationItems: [
        { term: "Herbivore", definition: "An animal that eats only plants (like cows and rabbits)", type: "flashcard" },
        { term: "Carnivore", definition: "An animal that eats only other animals/meat (like lions)", type: "flashcard" },
        { term: "Omnivore", definition: "An animal that eats both plants and animals (like bears)", type: "flashcard" },
        { term: "Camouflage", definition: "Colors or patterns that help an animal hide in its habitat", type: "flashcard" },
        { term: "Habitat", definition: "The natural home or environment of a plant or animal", type: "flashcard" }
      ],
      quizQuestions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: "An animal that only eats plants and fruits (like a Minion eating bananas) is called a:",
          options: ["Carnivore", "Herbivore", "Robot", "Superhero"],
          correctIndex: 1,
          explanation: "Herbivores eat plants! Bananas count!"
        },
        {
          id: 'q2',
          type: 'multiple-choice',
          question: "What is an animal's natural home called?",
          options: ["A Man Cave", "A Habitat", "A Playground", "A Supermarket"],
          correctIndex: 1,
          explanation: "A Habitat is where an animal naturally lives, finds food, and stays safe!"
        },
        {
          id: 'q3',
          type: 'multiple-choice',
          question: "Why do chameleons change colors to match leaves and branches?",
          options: ["To show off their fashion", "Camouflage to hide from predators", "Because they are sleepy", "To jump in muddy puddles"],
          correctIndex: 1,
          explanation: "Camouflage helps them hide! Zoo-Wee Mama!"
        },
        {
          id: 'q4',
          type: 'multiple-choice',
          question: "Dog Man is a dog-human superhero. If dogs eat meat and kibble, what kind of eater are they?",
          options: ["Omnivore (eats both)", "Carnivore only", "Plant eater only", "Dinosaur"],
          correctIndex: 0,
          explanation: "Dogs are omnivores and can eat both meat and veggies/grains!"
        },
        {
          id: 'q5',
          type: 'multiple-choice',
          question: "Which animal is best adapted to live in the freezing Arctic snow?",
          options: ["A desert camel", "A tropical parrot", "A polar bear with thick blubber", "Daddy Pig in shorts"],
          correctIndex: 2,
          explanation: "Polar bears have thick fat and warm fur for the freezing cold!"
        }
      ]
    };
  }
}
