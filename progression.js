// DadWork App - Unit Progression & Multi-Attempt Visualization Engine

export function renderUnitProgression(unit, student) {
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

  // Calculate metrics
  const latestAttempt = attempts[attempts.length - 1];
  const firstAttempt = attempts[0];
  const bestAttempt = [...attempts].sort((a, b) => b.percentage - a.percentage)[0];
  const scoreDelta = latestAttempt.percentage - firstAttempt.percentage;
  
  const hasMultipleAttempts = attempts.length > 1;

  // Render SVG Chart
  const svgChart = generateProgressionSVG(attempts, student);

  return `
    <div class="progression-view-container space-y-6">
      <!-- Unit Header & Status Summary -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${unit.subject === 'Math' ? 'bg-indigo-100 text-indigo-700' : unit.subject === 'Spelling' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
              ${unit.subject}
            </span>
            <span class="text-xs text-slate-500 font-medium">Unit ID: ${unit.id.substring(0, 10)}...</span>
          </div>
          <h3 class="text-xl font-extrabold text-slate-900">${unit.title}</h3>
          <p class="text-sm text-slate-600 mt-0.5">${unit.notes || 'Interactive study unit with quizzes and memorization exercises.'}</p>
        </div>

        <div class="flex items-center gap-3">
          <div class="text-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
            <div class="text-xs text-slate-500 uppercase font-semibold">Total Attempts</div>
            <div class="text-2xl font-black text-slate-800">${attempts.length}</div>
          </div>
          <div class="text-center px-4 py-2 rounded-xl border ${latestAttempt.percentage >= 80 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'}">
            <div class="text-xs uppercase font-semibold">Latest Score</div>
            <div class="text-2xl font-black">${latestAttempt.percentage}% <span class="text-xs font-normal">(${latestAttempt.score}/${latestAttempt.total})</span></div>
          </div>
          <button onclick="window.DadApp.startQuiz('${unit.id}')" class="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 text-sm">
            <span>📝</span>
            <span>Retake Quiz (Attempt #${attempts.length + 1})</span>
          </button>
        </div>
      </div>

      <!-- Progression Graph Card -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-slate-100 gap-2">
          <div>
            <h4 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>📈</span>
              <span>Attempt-by-Attempt Score & Pacing Curve</span>
            </h4>
            <p class="text-xs text-slate-500">Visualizing ${student.name}'s performance evolution from 1st to latest attempt</p>
          </div>
          <div class="flex items-center gap-2">
            ${hasMultipleAttempts ? `
              <span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${scoreDelta > 0 ? 'bg-emerald-100 text-emerald-800' : scoreDelta === 0 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'}">
                ${scoreDelta > 0 ? `▲ +${scoreDelta}% Growth` : scoreDelta === 0 ? '✦ Score Maintained' : `▼ ${scoreDelta}% Change`}
              </span>
            ` : `
              <span class="text-xs text-slate-400 italic">Complete a 2nd attempt to see growth delta</span>
            `}
          </div>
        </div>

        <!-- SVG Progression Visualization -->
        <div class="w-full overflow-x-auto pb-2">
          ${svgChart}
        </div>

        <!-- Dad Pacing Insight Box -->
        <div class="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <div class="text-2xl">💡</div>
          <div class="text-xs text-amber-900 leading-relaxed">
            <strong class="font-bold text-amber-950">Dad's Pacing Rule of Thumb:</strong> 
            We do NOT rush for high speeds! Notice how higher scores frequently align with spending thoughtful seconds per question. 
            ${latestAttempt.pacingVerdict === 'thoughtful' 
              ? `<span class="font-bold text-emerald-800">${student.name} took their time (${formatSeconds(latestAttempt.timeSeconds)}) and showed true mastery!</span>`
              : `<span class="font-bold text-rose-800">${student.name} zoomed quickly (${formatSeconds(latestAttempt.timeSeconds)}). Encourage them to slow down on the next attempt!</span>`
            }
          </div>
        </div>
      </div>

      <!-- Attempt History Details Table / Cards -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h4 class="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <span>📋</span>
          <span>Detailed Breakdown of Each Attempt</span>
        </h4>

        <div class="space-y-3">
          ${attempts.slice().reverse().map((att, idx) => {
            const attemptIdx = attempts.length - idx; // 1-indexed attempt
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

// Generate a clean responsive SVG line chart
function generateProgressionSVG(attempts, student) {
  const width = 640;
  const height = 220;
  const paddingLeft = 50;
  const paddingRight = 40;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Grid levels (0%, 20%, 40%, 60%, 80%, 100%)
  const yLevels = [0, 20, 40, 60, 80, 100];

  // Map coordinates
  const points = attempts.map((att, i) => {
    const x = attempts.length === 1 
      ? paddingLeft + chartWidth / 2 
      : paddingLeft + (i / (attempts.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (att.percentage / 100) * chartHeight;
    return { x, y, ...att, index: i };
  });

  // Build SVG path
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
  const fillColor = student.id === 'caleb' ? 'rgba(37, 99, 235, 0.12)' : 'rgba(245, 158, 11, 0.15)';

  return `
    <svg viewBox="0 0 ${width} ${height}" class="w-full max-w-[640px] mx-auto overflow-visible select-none" style="min-width: 320px;">
      <defs>
        <linearGradient id="grad-${student.id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0.3" />
          <stop offset="100%" stop-color="${primaryColor}" stop-opacity="0.0" />
        </linearGradient>
      </defs>

      <!-- Background Horizontal Grid Lines & Y-Axis Labels -->
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

      <!-- Target Mastery Label -->
      <text x="${width - paddingRight}" y="${paddingTop + chartHeight - (80 / 100) * chartHeight - 6}" 
            fill="#059669" font-size="9" font-weight="bold" text-anchor="end">
        Target Mastery (80%)
      </text>

      <!-- Shaded Area Under Curve (if > 1 point) -->
      ${areaD ? `<path d="${areaD}" fill="url(#grad-${student.id})" />` : ''}

      <!-- Score Curve Line -->
      <path d="${pathD}" fill="none" stroke="${primaryColor}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Nodes for Each Attempt -->
      ${points.map((p, i) => {
        const isMastered = p.percentage >= 80;
        const nodeColor = isMastered ? '#10b981' : p.percentage >= 60 ? '#f59e0b' : '#ef4444';
        const labelY = p.y < 50 ? p.y + 22 : p.y - 12;

        return `
          <g class="cursor-pointer transition-transform hover:scale-110">
            <!-- Outer Glow -->
            <circle cx="${p.x}" cy="${p.y}" r="8" fill="${nodeColor}" fill-opacity="0.2" />
            <!-- Inner Dot -->
            <circle cx="${p.x}" cy="${p.y}" r="5" fill="${nodeColor}" stroke="#ffffff" stroke-width="2" />
            
            <!-- Score Bubble Text -->
            <rect x="${p.x - 22}" y="${labelY - 10}" width="44" height="18" rx="6" fill="#1e293b" />
            <text x="${p.x}" y="${labelY + 2}" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">
              ${p.percentage}%
            </text>

            <!-- X-Axis Attempt & Time Label -->
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
  if (m === 0) return `${s}s`;
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
