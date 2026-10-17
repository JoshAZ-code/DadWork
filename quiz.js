// DadWork App - Interactive Quiz Engine with Thoughtful Timer & Dad Commentary

export class QuizRunner {
  constructor(unit, student, onComplete) {
    this.unit = unit;
    this.student = student;
    this.onComplete = onComplete;
    this.questions = (unit.quizQuestions || []).slice(0, 10); // Ensure max 10
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

    container.innerHTML = `
      <div class="quiz-active-card max-w-2xl mx-auto space-y-6">
        <!-- Top Bar: Timer, Progress & Student Badge -->
        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="text-xl">${this.student.id === 'caleb' ? '⚡' : '🦸‍♂️'}</span>
            <div>
              <div class="text-xs font-bold text-slate-800">${this.student.name}'s Quiz</div>
              <div class="text-[11px] text-slate-500">${this.unit.title}</div>
            </div>
          </div>

          <!-- Thoughtful Timer Badge -->
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

        <!-- Question Card -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div class="space-y-2">
            <span class="text-xs font-black uppercase tracking-wider text-slate-400">Question #${this.currentIndex + 1}</span>
            <h3 class="text-lg sm:text-xl font-black text-slate-900 leading-snug">${q.question}</h3>
          </div>

          <!-- Question Body: Multiple Choice or Text Input -->
          <div id="question-interaction-zone" class="space-y-3">
            ${q.type === 'multiple-choice' ? this.renderMultipleChoice(q) : this.renderTextInput(q)}
          </div>

          <!-- Dad Live Reaction Feedback Box (Appears after answer) -->
          <div id="quiz-dad-reaction-box" class="hidden p-4 rounded-xl border space-y-2"></div>

          <!-- Action Button -->
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
      // Highlight options
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
      // Text input comparison
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

    // Display Dad's Live Reaction
    this.showDadReaction(isCorrect, q);

    // Show next button
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
          <span>Dad's Reaction</span>
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
        <div class="text-xs text-amber-800 mt-1 font-medium">${q.explanation || 'Review the study guide before the next attempt!'}</div>
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

    // Determine thoughtful pacing vs rushed pacing
    // Intent: Reward taking time, flag rushing
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

    // Save attempt record
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

        <!-- Metrics Row -->
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

        <!-- Dad Pacing & Milestone Feedback Box -->
        <div class="p-5 rounded-2xl ${isMastery ? 'bg-emerald-50 border border-emerald-200 text-emerald-950' : 'bg-amber-50 border border-amber-200 text-amber-950'} text-left space-y-2">
          <div class="flex items-center gap-2 font-black text-xs uppercase tracking-wider ${isMastery ? 'text-emerald-800' : 'text-amber-800'}">
            <span>👨‍👦</span>
            <span>Dad's Post-Quiz Report Card</span>
          </div>
          <div class="text-sm font-bold leading-relaxed">"${att.dadFeedback}"</div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button onclick="window.DadApp.viewUnitProgression('${this.unit.id}')" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
            <span>📈</span>
            <span>View Unit Progression Graph</span>
          </button>

          <button onclick="window.DadApp.startQuiz('${this.unit.id}')" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2">
            <span>🔄</span>
            <span>Try Again (Attempt #${att.attemptNumber + 1})</span>
          </button>

          <button onclick="window.DadApp.navigate('units')" class="w-full sm:w-auto px-4 py-3 rounded-xl text-slate-500 hover:text-slate-800 font-bold text-sm transition-all">
            Return to Homework
          </button>
        </div>
      </div>
    `;
  }

  // Synthesize Web Audio sound effects (zero external asset dependencies!)
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
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5
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
    } catch (e) {
      // AudioContext policy or unsupported
    }
  }
}
