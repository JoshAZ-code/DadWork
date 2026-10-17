// DadWork App - Interactive Study Guide, Memorization Hub & Math Scratchpad

export function renderStudyView(unit, student) {
  const guide = unit.studyGuide || {
    summary: "Welcome to this study unit!",
    keyRules: ["Read through carefully", "Take notes", "Practice before the quiz"],
    dadExample: "Work through step by step."
  };

  const memorizationItems = unit.memorizationItems || [];
  const isSpelling = unit.subject === 'Spelling';
  const isMath = unit.subject === 'Math';

  return `
    <div class="study-session-container space-y-6 max-w-4xl mx-auto">
      <!-- Breadcrumb / Back button -->
      <div class="flex items-center justify-between">
        <button onclick="window.DadApp.navigate('units')" class="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all active:scale-95">
          <span>←</span> Back to All Homework Units
        </button>
        <div class="flex items-center gap-2">
          <span class="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${student.id === 'caleb' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-900'}">
            ${student.name} • ${unit.subject}
          </span>
        </div>
      </div>

      <!-- Unit Title & Dad Welcome Banner -->
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

      <!-- Study Mode Switcher Tabs -->
      <div class="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button id="tab-btn-lesson" onclick="window.DadApp.switchStudyTab('lesson')" class="study-tab-btn flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 bg-white text-slate-900 shadow-sm">
          <span>📖</span>
          <span>1. Dad's Kitchen Table Lesson</span>
        </button>
        <button id="tab-btn-memory" onclick="window.DadApp.switchStudyTab('memory')" class="study-tab-btn flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900">
          <span>🧠</span>
          <span>2. Memorization & Practice (${memorizationItems.length})</span>
        </button>
        ${isMath ? `
          <button id="tab-btn-scratchpad" onclick="window.DadApp.switchStudyTab('scratchpad')" class="study-tab-btn flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900">
            <span>✏️</span>
            <span>3. Math Scratchpad</span>
          </button>
        ` : ''}
        <button onclick="window.DadApp.startQuiz('${unit.id}')" class="flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95">
          <span>🎯</span>
          <span>3. Take Unit Quiz</span>
        </button>
      </div>

      <!-- TAB 1: Dad's Kitchen Table Lesson -->
      <div id="study-panel-lesson" class="study-panel space-y-6">
        <!-- Dad's Playbook / Kitchen Table Guide -->
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

          <!-- Key Rules & Steps -->
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

          <!-- Dad's Concrete Example -->
          <div class="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div class="flex items-center gap-2 text-xs font-black text-blue-900 uppercase tracking-wider">
              <span>💡</span>
              <span>Dad's Real-Life Example & Analogy</span>
            </div>
            <p class="text-sm text-blue-950 font-medium leading-relaxed">
              ${guide.dadExample}
            </p>
          </div>

          <!-- Bottom Action -->
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

      <!-- TAB 2: Memorization & Flashcards Hub -->
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

          <!-- Flashcard Carousel / Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${memorizationItems.map((item, idx) => `
              <div class="memory-card relative cursor-pointer select-none h-44 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:border-blue-400 hover:shadow-md transition-all p-5 flex flex-col justify-between"
                   onclick="window.DadApp.toggleCardFlip(this)">
                <!-- Front Side -->
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

                <!-- Back Side (Initially Hidden) -->
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

          <!-- Audio Spelling Practice (If subject is spelling) -->
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

          <!-- Bottom Quiz Trigger -->
          <div class="pt-4 flex items-center justify-between border-t border-slate-100">
            <span class="text-xs text-slate-500">Feeling confident? Test what you learned!</span>
            <button onclick="window.DadApp.startQuiz('${unit.id}')" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2">
              <span>Ready for the Quiz!</span>
              <span>🎯</span>
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 3: Interactive Math Scratchpad (If subject is math) -->
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

            <!-- Canvas Element -->
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
