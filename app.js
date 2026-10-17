// DadWork App - Core Application Coordinator

import { STUDENTS, INITIAL_UNITS } from './profiles.js';
import { renderUnitProgression } from './progression.js';
import { QuizRunner } from './quiz.js';
import { renderStudyView } from './study.js';
import { analyzeWorksheetImage, getGeminiApiKey, setGeminiApiKey } from './gemini.js';

const STORAGE_KEY_UNITS = 'dadwork_study_units_v1';
const STORAGE_KEY_JOKES = 'dadwork_unlocked_jokes_v1';
const STORAGE_KEY_STUDENT = 'dadwork_selected_student';

class DadWorkApp {
  constructor() {
    this.currentStudentId = localStorage.getItem(STORAGE_KEY_STUDENT) || 'christian';
    this.currentView = 'dashboard'; // 'dashboard', 'units', 'study', 'quiz', 'progression', 'upload', 'jokes', 'settings'
    this.activeUnitId = null;
    this.activeQuizRunner = null;
    this.selectedSubjectFilter = 'ALL';

    this.units = this.loadUnits();
    this.scratchpadDrawing = false;
    this.scratchpadCtx = null;

    this.init();
  }

  loadUnits() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_UNITS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved units, initializing defaults:', e);
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
    // Expose app instance globally for inline onclick handlers
    window.DadApp = this;

    // Attach navigation listeners
    this.renderHeader();
    this.renderCurrentView();
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
        <!-- Logo & Title -->
        <div class="flex items-center gap-3 cursor-pointer" onclick="window.DadApp.navigate('dashboard')">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-black text-xl shadow-md">
            👨‍👦
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-lg font-black tracking-tight text-slate-900">DadWork</span>
              <span class="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">Homework Coach</span>
            </div>
            <div class="text-[11px] text-slate-500 font-medium">Study Guides, Quizzes & Dad Humor</div>
          </div>
        </div>

        <!-- Student Switcher & Action Tabs -->
        <div class="flex items-center gap-2">
          <!-- Active Boy Badge & Toggle -->
          <button onclick="window.DadApp.switchStudent('${otherStudentId}')" 
                  class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 shadow-sm transition-all text-xs font-bold text-slate-800"
                  title="Switch to ${otherStudent.name}">
            <span class="text-base">${student.theme.avatarEmoji}</span>
            <div class="text-left">
              <div class="text-[10px] text-slate-400 font-semibold uppercase leading-tight">Current:</div>
              <div class="text-xs font-black text-indigo-600">${student.name} (${student.gradeLevel})</div>
            </div>
            <span class="text-slate-400 text-[10px]">⇄ Switch to ${otherStudent.name}</span>
          </button>

          <!-- Upload Homework Button -->
          <button onclick="window.DadApp.navigate('upload')" 
                  class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5">
            <span>📷</span>
            <span>Add Homework</span>
          </button>
        </div>
      </div>

      <!-- Navigation Bar -->
      <div class="border-t border-slate-200/80 bg-white">
        <div class="max-w-6xl mx-auto px-4 flex items-center justify-between overflow-x-auto text-xs font-bold">
          <div class="flex items-center gap-1 py-1">
            <button onclick="window.DadApp.navigate('dashboard')" class="nav-tab px-3 py-2 rounded-lg transition-all ${this.currentView === 'dashboard' ? 'text-indigo-600 bg-indigo-50 font-black' : 'text-slate-600 hover:text-slate-900'}">
              📊 Dashboard
            </button>
            <button onclick="window.DadApp.navigate('units')" class="nav-tab px-3 py-2 rounded-lg transition-all ${this.currentView === 'units' || this.currentView === 'study' ? 'text-indigo-600 bg-indigo-50 font-black' : 'text-slate-600 hover:text-slate-900'}">
              📚 ${student.name}'s Homework Units
            </button>
            <button onclick="window.DadApp.navigate('jokes')" class="nav-tab px-3 py-2 rounded-lg transition-all ${this.currentView === 'jokes' ? 'text-indigo-600 bg-indigo-50 font-black' : 'text-slate-600 hover:text-slate-900'}">
              😂 Dad Joke Locker
            </button>
          </div>

          <div class="flex items-center gap-1">
            <button onclick="window.DadApp.navigate('settings')" class="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1 text-[11px]">
              <span>⚙️</span>
              <span>Settings & Key</span>
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

  // --- DASHBOARD VIEW ---
  renderDashboard() {
    const student = this.getStudent();
    const units = this.getStudentUnits();
    
    // Total attempts across all units
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
        <!-- Hero Banner with Boy-Specific Interests and Dad Humor -->
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
              Dad is in your corner! Review your study guides, practice without rushing, and take on the quizzes to unlock new dad jokes!
            </p>
          </div>
          <div class="absolute -right-4 -bottom-6 text-9xl opacity-20 select-none pointer-events-none">
            ${student.id === 'caleb' ? '⚽' : '🍌'}
          </div>
        </div>

        <!-- Dad Management Overview Metrics -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Homework Units</div>
            <div class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">${units.length}</div>
            <div class="text-xs text-slate-500 mt-0.5">${completedUnits} completed at least once</div>
          </div>

          <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Quiz Mastery</div>
            <div class="text-2xl sm:text-3xl font-black ${avgScore >= 80 ? 'text-emerald-600' : 'text-amber-600'} mt-1">
              ${avgScore}%
            </div>
            <div class="text-xs text-slate-500 mt-0.5">Across all recent attempts</div>
          </div>

          <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Quiz Attempts</div>
            <div class="text-2xl sm:text-3xl font-black text-indigo-600 mt-1">${totalAttempts}</div>
            <div class="text-xs text-slate-500 mt-0.5">Tracking improvement curve</div>
          </div>

          <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Dad Joke Vault</div>
            <div class="text-2xl sm:text-3xl font-black text-amber-500 mt-1">
              ${student.dadJokes.filter(j => j.unlocked).length} / ${student.dadJokes.length}
            </div>
            <div class="text-xs text-slate-500 mt-0.5">Score 80%+ to unlock more!</div>
          </div>
        </div>

        <!-- Active Homework Units Table / Cards -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>📚</span>
                <span>Active Units & Progression Highlights</span>
              </h2>
              <p class="text-xs text-slate-500">Click any unit to review the study guide, take a quiz, or view the attempt-by-attempt graph.</p>
            </div>
            <button onclick="window.DadApp.navigate('upload')" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all active:scale-95 flex items-center gap-1.5 self-start sm:self-auto">
              <span>+</span>
              <span>Snap / Upload New Homework</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            ${units.map(unit => {
              const atts = unit.attempts || [];
              const latest = atts[atts.length - 1];
              const first = atts[0];
              const growth = latest && first ? (latest.percentage - first.percentage) : 0;

              return `
                <div class="p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all bg-white flex flex-col justify-between space-y-4">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${unit.subject === 'Math' ? 'bg-indigo-100 text-indigo-700' : unit.subject === 'Spelling' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                        ${unit.subject}
                      </span>
                      <span class="text-xs text-slate-400 font-medium">${unit.dateAdded}</span>
                    </div>

                    <h3 class="font-extrabold text-slate-900 text-base leading-snug hover:text-indigo-600 cursor-pointer" onclick="window.DadApp.openStudyUnit('${unit.id}')">
                      ${unit.title}
                    </h3>
                    <p class="text-xs text-slate-500 line-clamp-2 mt-1">${unit.studyGuide?.summary || unit.notes || 'Interactive homework unit.'}</p>
                  </div>

                  <!-- Attempt Progression Summary -->
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
                      ${atts.length > 0 ? `
                        <button onclick="window.DadApp.viewUnitProgression('${unit.id}')" class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all flex items-center gap-1" title="View attempt-by-attempt progression graph">
                          <span>📈</span>
                          <span>Graph</span>
                        </button>
                      ` : ''}
                      <button onclick="window.DadApp.openStudyUnit('${unit.id}')" class="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all">
                        Study & Quiz →
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

  // --- ALL UNITS VIEW ---
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
            <p class="text-xs text-slate-500">All captured study guides, memorization lists, and quizzes saved over time.</p>
          </div>
          <button onclick="window.DadApp.navigate('upload')" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 self-start sm:self-auto">
            <span>📷</span>
            <span>Snap / Upload New Homework</span>
          </button>
        </div>

        <!-- Subject Filters -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1">
          ${subjects.map(s => `
            <button onclick="window.DadApp.setSubjectFilter('${s}')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.selectedSubjectFilter === s ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
              ${s}
            </button>
          `).join('')}
        </div>

        <!-- Units Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${filtered.map(unit => {
            const atts = unit.attempts || [];
            const latest = atts[atts.length - 1];

            return `
              <div class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${unit.subject === 'Math' ? 'bg-indigo-100 text-indigo-700' : unit.subject === 'Spelling' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                      ${unit.subject}
                    </span>
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
                      <span class="text-slate-400 text-[11px]">(${atts.length} attempt${atts.length > 1 ? 's' : ''})</span>
                    ` : '<span class="text-slate-400 italic">Not taken yet</span>'}
                  </div>

                  <div class="flex items-center gap-1.5">
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

  // --- STUDY VIEW ---
  openStudyUnit(unitId) {
    this.activeUnitId = unitId;
    this.navigate('study', unitId);
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
    ['lesson', 'memory', 'scratchpad'].forEach(t => {
      const el = document.getElementById(`study-panel-${t}`);
      const btn = document.getElementById(`tab-btn-${t}`);
      if (el) {
        if (t === tabName) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
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
      console.warn('Speech synthesis error:', e);
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

  // --- MATH SCRATCHPAD ENGINE ---
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

  // --- QUIZ VIEW ---
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
      // On quiz complete callback
      if (!unit.attempts) unit.attempts = [];
      unit.attempts.push(attemptRecord);
      this.saveUnits();

      // Check if unlocked a dad joke!
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

  // --- PROGRESSION GRAPH VIEW ---
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
          <button onclick="window.DadApp.openStudyUnit('${unit.id}')" class="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all">
            Open Study Guide & Exercises →
          </button>
        </div>

        ${renderUnitProgression(unit, student)}
      </div>
    `;
  }

  // --- UPLOAD & CAMERA INTAKE VIEW ---
  renderUploadView() {
    const student = this.getStudent();

    return `
      <div class="max-w-2xl mx-auto space-y-6">
        <div class="text-center space-y-2">
          <div class="text-4xl mb-1">📸</div>
          <h1 class="text-2xl font-black text-slate-900">Upload Homework or Study Guide</h1>
          <p class="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Take a photo with your phone camera or select an image from Google Photos / gallery. DadWork will read the page, identify student & subject, and create a custom study unit!
          </p>
        </div>

        <!-- File / Camera Drop Zone -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-dashed border-slate-300 hover:border-indigo-500 transition-all text-center space-y-4 shadow-sm"
             id="upload-dropzone"
             ondragover="event.preventDefault(); this.classList.add('border-indigo-500', 'bg-indigo-50/20');"
             ondragleave="this.classList.remove('border-indigo-500', 'bg-indigo-50/20');"
             ondrop="window.DadApp.handleFileDrop(event)">
          
          <div class="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl mx-auto">
            📷
          </div>

          <div class="space-y-1">
            <h3 class="font-bold text-slate-800 text-base">Take Photo or Choose from Google Photos</h3>
            <p class="text-xs text-slate-500">Supports JPG, PNG, WebP up to 15MB</p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <!-- Native Mobile Camera Capture Button -->
            <label class="cursor-pointer px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2">
              <span>📸 Snap with Camera</span>
              <input type="file" accept="image/*" capture="environment" class="hidden" onchange="window.DadApp.handleFileSelected(event)" />
            </label>

            <!-- Media / Google Photos Picker -->
            <label class="cursor-pointer px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 transition-all active:scale-95 flex items-center gap-2">
              <span>🖼️ Pick from Photos / Gallery</span>
              <input type="file" accept="image/*" class="hidden" onchange="window.DadApp.handleFileSelected(event)" />
            </label>
          </div>
        </div>

        <!-- Target Student Selection Hint -->
        <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
          <div class="text-xs text-slate-600">
            <strong>Preferred Child Hint:</strong> Auto-detection looks at the worksheet name, but defaults to:
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.DadApp.switchStudent('christian')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${this.currentStudentId === 'christian' ? 'bg-amber-500 text-white' : 'bg-white border text-slate-600'}">
              Christian
            </button>
            <button onclick="window.DadApp.switchStudent('caleb')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${this.currentStudentId === 'caleb' ? 'bg-blue-600 text-white' : 'bg-white border text-slate-600'}">
              Caleb
            </button>
          </div>
        </div>

        <!-- Loading / Analyzing State (Hidden by default) -->
        <div id="upload-analyzing-spinner" class="hidden bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
          <div class="inline-block animate-spin text-5xl">⚙️</div>
          <h3 class="text-lg font-black text-slate-900" id="analyzing-status-title">DadWork AI is Analyzing the Worksheet...</h3>
          <p class="text-xs text-slate-500 max-w-sm mx-auto" id="analyzing-status-sub">
            Extracting problems, building kitchen table analogies, and prepping the interactive quiz!
          </p>
        </div>

        <!-- Confirmation Modal / Drawer (Filled after analysis) -->
        <div id="upload-confirmation-modal" class="hidden bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5"></div>
      </div>
    `;
  }

  handleFileDrop(e) {
    e.preventDefault();
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      this.processImageFile(dt.files[0]);
    }
  }

  handleFileSelected(e) {
    if (e.target && e.target.files && e.target.files.length > 0) {
      this.processImageFile(e.target.files[0]);
    }
  }

  processImageFile(file) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result;
      const mimeType = file.type || 'image/jpeg';
      await this.runWorksheetAnalysis(base64Data, mimeType);
    };
    reader.readAsDataURL(file);
  }

  async runWorksheetAnalysis(base64Data, mimeType) {
    const spinner = document.getElementById('upload-analyzing-spinner');
    const dropzone = document.getElementById('upload-dropzone');
    const confirmBox = document.getElementById('upload-confirmation-modal');

    if (dropzone) dropzone.classList.add('hidden');
    if (spinner) spinner.classList.remove('hidden');

    try {
      const result = await analyzeWorksheetImage(base64Data, mimeType, this.currentStudentId);
      if (spinner) spinner.classList.add('hidden');
      if (confirmBox) {
        confirmBox.classList.remove('hidden');
        this.renderUploadConfirmation(result, base64Data);
      }
    } catch (err) {
      if (spinner) spinner.classList.add('hidden');
      if (dropzone) dropzone.classList.remove('hidden');
      alert(`Could not analyze worksheet: ${err.message}. If you don't have an API key, DadWork will use smart simulation.`);
    }
  }

  renderUploadConfirmation(parsedData, base64Data) {
    const confirmBox = document.getElementById('upload-confirmation-modal');
    if (!confirmBox) return;

    // Cache temporarily on window for final save
    window._pendingNewUnit = {
      id: `unit_${parsedData.studentId}_${Date.now()}`,
      studentId: parsedData.studentId || this.currentStudentId,
      subject: parsedData.subject || 'Math',
      title: parsedData.title || 'New Study Unit',
      notes: parsedData.notes || 'Captured homework worksheet',
      dateAdded: new Date().toISOString().split('T')[0],
      sourcePhotoUrl: base64Data,
      studyGuide: parsedData.studyGuide,
      memorizationItems: parsedData.memorizationItems || [],
      quizQuestions: parsedData.quizQuestions || [],
      attempts: []
    };

    const targetStudent = STUDENTS[window._pendingNewUnit.studentId] || this.getStudent();

    confirmBox.innerHTML = `
      <div class="space-y-4 text-left">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <span class="text-2xl">✅</span>
            <div>
              <h3 class="text-lg font-black text-slate-900">Worksheet Analyzed! Does this look right?</h3>
              <p class="text-xs text-slate-500">Quick Dad check before generating study units & quizzes</p>
            </div>
          </div>
        </div>

        <!-- Editable / Confirmable Fields -->
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

          <!-- Preview summary -->
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <div><strong>Summary:</strong> ${window._pendingNewUnit.studyGuide?.summary}</div>
            <div class="text-slate-500">✨ Generated: ${window._pendingNewUnit.memorizationItems.length} memorization cards & ${window._pendingNewUnit.quizQuestions.length} quiz questions.</div>
          </div>
        </div>

        <!-- Confirm Action Buttons -->
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

    // Switch active student if assigned to other boy
    if (unit.studentId !== this.currentStudentId) {
      this.switchStudent(unit.studentId);
    }

    // Navigate straight to study view!
    this.openStudyUnit(unit.id);
  }

  // --- DAD JOKE LOCKER VIEW ---
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

  // --- SETTINGS VIEW ---
  renderSettingsView() {
    const currentKey = getGeminiApiKey();

    return `
      <div class="max-w-xl mx-auto space-y-6">
        <div class="space-y-1">
          <h1 class="text-2xl font-black text-slate-900">DadWork Settings & AI Setup</h1>
          <p class="text-xs text-slate-500">Configure your Google Gemini API key or manage stored homework units.</p>
        </div>

        <!-- Gemini API Key Card -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🤖</span>
            <div>
              <h3 class="font-bold text-slate-900 text-sm">Google Gemini Vision API Key</h3>
              <p class="text-xs text-slate-500">Optional. Enter your key to run direct OCR & question generation on photos.</p>
            </div>
          </div>

          <div class="space-y-2">
            <input type="password" id="gemini-key-input" value="${currentKey}" placeholder="AIzaSy..." 
                   class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <div class="text-[11px] text-slate-400">
              Stored locally on your device in browser localStorage. Never sent to any external server.
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

        <!-- Data Backup & Restore -->
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
    alert('API Key removed. DadWork will now use smart simulation for worksheet parsing.');
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

// Start application once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new DadWorkApp();
});
