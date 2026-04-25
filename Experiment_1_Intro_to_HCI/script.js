// Experiment 1: Memory & Reaction Test - Professional HCI UI
// Modular Application with Dark Mode, Device Preview, Analytics, and Local Storage

// ================== STATE MANAGEMENT ==================
const state = {
  memoryItems: [
    'Elephant', 'Guitar', 'Mountain', 'Telescope', 'Butterfly',
    'Lighthouse', 'Diamond', 'Thunder', 'Cathedral', 'Phoenix'
  ],
  shownItems: [],
  recallScore: null,
  reactionTimes: [],
  reactionTrial: 0,
  memoryTimer: null,
  memoryTimeLeft: 30,
  memoryPhaseActive: false,
  isDarkMode: localStorage.getItem('theme') === 'dark',
  currentTab: 'tests',
  charts: {
    recallChart: null,
    reactionChart: null
  }
};

// ================ DOM ELEMENTS CACHE ================
const elements = {
  themeToggle: document.getElementById('theme-toggle'),
  navBtns: document.querySelectorAll('.nav-btn'),
  tabContents: document.querySelectorAll('.tab-content'),
  memoryPhase: document.getElementById('memory-phase'),
  responsePhase: document.getElementById('response-phase'),
  resultsTableContainer: document.getElementById('results-table-container'),
  toast: document.getElementById('toast'),
  restartBtn: document.getElementById('restart-btn'),
  startMemoryBtn: null,
  startResponseBtn: null,
  exportDataBtn: document.getElementById('export-data-btn'),
  clearDataBtn: document.getElementById('clear-data-btn'),
  appContainer: document.getElementById('app-container')
};

// ================ INITIALIZATION ================
function initializeApp() {
  // Apply saved theme
  if (state.isDarkMode) {
    document.body.classList.add('dark-mode');
    elements.themeToggle.textContent = '☀️ Light Mode';
  } else {
    elements.themeToggle.textContent = '🌙 Dark Mode';
  }
  
  // Setup event listeners
  setupThemeToggle();
  setupNavigation();
  setupExportImport();
  setupExperimentButtons();
  loadDataFromStorage();
  updateAnalytics();
}

// ================ DARK MODE ================
function setupThemeToggle() {
  elements.themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  state.isDarkMode = !state.isDarkMode;
  document.body.classList.toggle('dark-mode');
  elements.themeToggle.textContent = state.isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
  
  // Refresh charts if they exist
  if (state.charts.recallChart) {
    updateAnalytics();
  }
  
  showToast(state.isDarkMode ? 'Dark mode enabled' : 'Light mode enabled');
}

// ================ NAVIGATION ================
function setupNavigation() {
  elements.navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });
}

function switchTab(tabName) {
  state.currentTab = tabName;
  
  // Update active nav button
  elements.navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  
  // Update active tab content
  elements.tabContents.forEach(tab => {
    tab.classList.toggle('active', tab.id === `${tabName}-tab`);
  });
  
  // Initialize charts on analytics tab
  if (tabName === 'analytics') {
    setTimeout(() => {
      initializeCharts();
      updateAnalytics();
    }, 100);
  }
}

// ================ EXPERIMENT BUTTONS SETUP ================
function setupExperimentButtons() {
  elements.memoryPhase.innerHTML = `<button id="start-memory-btn" class="btn primary">Start Recall Test</button>`;
  elements.responsePhase.innerHTML = `<button id="start-response-btn" class="btn accent">Start Response Test</button>`;
  
  elements.startMemoryBtn = document.getElementById('start-memory-btn');
  elements.startResponseBtn = document.getElementById('start-response-btn');
  
  elements.startMemoryBtn.addEventListener('click', startMemoryTest);
  elements.startResponseBtn.addEventListener('click', startReactionTest);
  elements.restartBtn.addEventListener('click', restartExperiment);
}

// ================ MEMORY TEST ================
function startMemoryTest() {
  state.shownItems = shuffle([...state.memoryItems]);
  state.memoryPhaseActive = true;
  state.memoryTimeLeft = 30;
  
  elements.memoryPhase.innerHTML = `
    <div class="memory-grid" id="memory-grid">
      ${state.shownItems.map(item => `<div class="memory-item">${item}</div>`).join('')}
    </div>
    <div class="progress-bar-bg"><div class="progress-bar" id="memory-progress"></div></div>
    <div id="memory-timer">30s</div>
  `;
  
  updateMemoryProgress();
  state.memoryTimer = setInterval(() => {
    state.memoryTimeLeft--;
    updateMemoryProgress();
    
    if (state.memoryTimeLeft <= 0) {
      clearInterval(state.memoryTimer);
      fadeOutMemoryGrid();
      setTimeout(startRecallPhase, 700);
    }
  }, 1000);
  
  showToast('Memory recall test started! Memorize the items.');
}

function updateMemoryProgress() {
  const timer = document.getElementById('memory-timer');
  const progress = document.getElementById('memory-progress');
  
  if (timer) timer.textContent = state.memoryTimeLeft + 's';
  if (progress) {
    progress.style.width = (100 * (30 - state.memoryTimeLeft) / 30) + '%';
  }
}

function fadeOutMemoryGrid() {
  const grid = document.getElementById('memory-grid');
  if (grid) grid.classList.add('fade-out');
}

function startRecallPhase() {
  state.memoryPhaseActive = false;
  elements.memoryPhase.innerHTML = `
    <form id="recall-form">
      <label for="recall-input">Enter all items you remember (comma separated):</label>
      <input type="text" id="recall-input" autocomplete="off" required>
      <button type="submit" class="btn primary">Submit Recall Answers</button>
    </form>
    <div id="recall-score"></div>
  `;
  
  document.getElementById('recall-form').addEventListener('submit', (e) => {
    e.preventDefault();
    calculateRecallScore();
  });
  
  showToast('Now recall the items you saw!');
}

function calculateRecallScore() {
  const input = document.getElementById('recall-input').value;
  const recalled = input.split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);
  
  const correct = state.shownItems.filter(item => 
    recalled.includes(item.toLowerCase())
  );
  
  const percent = Math.round((correct.length / state.shownItems.length) * 100);
  state.recallScore = {
    shown: state.shownItems.length,
    recalled: correct.length,
    percent
  };
  
  document.getElementById('recall-score').innerHTML = 
    `You recalled <b>${correct.length}</b> out of <b>${state.shownItems.length}</b> items (<b>${percent}%</b>).`;
  
  renderResults();
  saveDataToStorage();
  updateAnalytics();
  showToast(`Recall score: ${percent}%`);
}

// ================ REACTION TEST ================
function startReactionTest() {
  state.reactionTimes = [];
  state.reactionTrial = 0;
  
  elements.responsePhase.innerHTML = `
    <div id="reaction-area">Click start and press SPACE when the color changes!</div>
    <button id="reaction-start-btn" class="btn accent">Start Reaction Test</button>
    <div id="reaction-result"></div>
  `;
  
  document.getElementById('reaction-start-btn').addEventListener('click', nextReactionTrial);
  showToast('Reaction test started! Click start when ready.');
}

function nextReactionTrial() {
  const area = document.getElementById('reaction-area');
  const result = document.getElementById('reaction-result');
  
  area.className = '';
  result.textContent = '';
  area.textContent = 'Get ready...';
  
  setTimeout(() => {
    area.className = 'ready';
    area.textContent = 'Wait for green...';
    
    const delay = 2000 + Math.random() * 3000;
    
    setTimeout(() => {
      area.className = 'go';
      area.textContent = 'GO! Press SPACE!';
      
      const start = performance.now();
      let reacted = false;
      
      function onKey(e) {
        if (e.code === 'Space' && !reacted) {
          reacted = true;
          const time = Math.round(performance.now() - start);
          state.reactionTimes.push(time);
          
          area.className = '';
          area.textContent = 'Reaction time: ' + time + ' ms';
          result.textContent = `Trial ${state.reactionTimes.length}/3`;
          
          window.removeEventListener('keydown', onKey);
          
          setTimeout(() => {
            if (state.reactionTimes.length < 3) {
              nextReactionTrial();
            } else {
              recordReactionTime();
            }
          }, 900);
        }
      }
      
      window.addEventListener('keydown', onKey);
    }, delay);
  }, 700);
}

function recordReactionTime() {
  const avg = Math.round(
    state.reactionTimes.reduce((a, b) => a + b, 0) / state.reactionTimes.length
  );
  
  document.getElementById('reaction-result').innerHTML = 
    `Average Reaction Time: <b>${avg} ms</b>`;
  
  renderResults();
  saveDataToStorage();
  updateAnalytics();
  showToast(`Average reaction: ${avg}ms`);
}

// ================ RESULTS TABLE ================
function renderResults() {
  let html = `<table id="results-table">
    <thead>
      <tr>
        <th>Items Shown</th>
        <th>Items Recalled</th>
        <th>Recall %</th>
        <th>Avg Response (ms)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${state.recallScore ? state.recallScore.shown : '-'}</td>
        <td>${state.recallScore ? state.recallScore.recalled : '-'}</td>
        <td>${state.recallScore ? state.recallScore.percent + '%' : '-'}</td>
        <td>${state.reactionTimes.length === 3 ? Math.round(state.reactionTimes.reduce((a, b) => a + b, 0) / 3) : '-'}</td>
      </tr>
    </tbody>
  </table>`;
  
  elements.resultsTableContainer.innerHTML = html;
}

// ================ ANALYTICS CHARTS ================
function initializeCharts() {
  // Recall Performance Chart
  const recallCtx = document.getElementById('recall-chart');
  if (recallCtx && !state.charts.recallChart) {
    state.charts.recallChart = new Chart(recallCtx, {
      type: 'doughnut',
      data: {
        labels: ['Recalled', 'Missed'],
        datasets: [{
          data: state.recallScore ? [state.recallScore.recalled, state.recallScore.shown - state.recallScore.recalled] : [0, 10],
          backgroundColor: ['#2563eb', '#e5e7eb'],
          borderColor: state.isDarkMode ? '#1e293b' : '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: state.isDarkMode ? '#e2e8f0' : '#1f2937',
              font: { size: 12 }
            }
          }
        }
      }
    });
  }
  
  // Reaction Time Distribution
  const reactionCtx = document.getElementById('reaction-chart');
  if (reactionCtx && !state.charts.reactionChart) {
    state.charts.reactionChart = new Chart(reactionCtx, {
      type: 'bar',
      data: {
        labels: state.reactionTimes.length > 0 ? 
          state.reactionTimes.map((_, i) => `Trial ${i + 1}`) : 
          ['Trial 1', 'Trial 2', 'Trial 3'],
        datasets: [{
          label: 'Response Time (ms)',
          data: state.reactionTimes.length > 0 ? state.reactionTimes : [0, 0, 0],
          backgroundColor: '#3b82f6',
          borderColor: '#2563eb',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: state.isDarkMode ? '#e2e8f0' : '#1f2937',
              font: { size: 12 }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: state.isDarkMode ? '#cbd5e1' : '#6b7280'
            },
            grid: {
              color: state.isDarkMode ? '#334155' : '#e5e7eb'
            }
          },
          x: {
            ticks: {
              color: state.isDarkMode ? '#cbd5e1' : '#6b7280'
            },
            grid: {
              color: state.isDarkMode ? '#334155' : '#e5e7eb'
            }
          }
        }
      }
    });
  }
}

function updateAnalytics() {
  // Update stat values
  document.getElementById('stat-recall').textContent = 
    state.recallScore ? state.recallScore.percent + '%' : '-';
  
  const avgReaction = state.reactionTimes.length === 3 ? 
    Math.round(state.reactionTimes.reduce((a, b) => a + b, 0) / 3) : '-';
  document.getElementById('stat-reaction').textContent = avgReaction;
  
  const status = state.recallScore && state.reactionTimes.length === 3 ? 
    'Completed ✓' : state.recallScore ? 'Recall Done' : 'Not Started';
  document.getElementById('stat-status').textContent = status;
  
  // Update charts if they exist
  if (state.charts.recallChart) {
    state.charts.recallChart.data.datasets[0].data = 
      state.recallScore ? 
        [state.recallScore.recalled, state.recallScore.shown - state.recallScore.recalled] : 
        [0, 10];
    state.charts.recallChart.update();
  }
  
  if (state.charts.reactionChart) {
    state.charts.reactionChart.data.datasets[0].data = 
      state.reactionTimes.length > 0 ? state.reactionTimes : [0, 0, 0];
    state.charts.reactionChart.update();
  }
}

// ================ DATA PERSISTENCE ================
function saveDataToStorage() {
  const data = {
    recallScore: state.recallScore,
    reactionTimes: state.reactionTimes,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('exp1-results', JSON.stringify(data));
}

function loadDataFromStorage() {
  const saved = localStorage.getItem('exp1-results');
  if (saved) {
    const data = JSON.parse(saved);
    state.recallScore = data.recallScore;
    state.reactionTimes = data.reactionTimes;
    renderResults();
  }
}

function setupExportImport() {
  elements.exportDataBtn.addEventListener('click', exportData);
  elements.clearDataBtn.addEventListener('click', clearAllData);
}

function exportData() {
  const data = {
    recallScore: state.recallScore,
    reactionTimes: state.reactionTimes,
    timestamp: new Date().toISOString()
  };
  
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `exp1-results-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  showToast('Results exported successfully!');
}

function clearAllData() {
  if (confirm('Are you sure you want to clear all results?')) {
    state.recallScore = null;
    state.reactionTimes = [];
    state.charts.recallChart = null;
    state.charts.reactionChart = null;
    localStorage.removeItem('exp1-results');
    renderResults();
    setupExperimentButtons();
    updateAnalytics();
    showToast('All data cleared!');
  }
}

// ================ RESTART EXPERIMENT ================
function restartExperiment() {
  state.recallScore = null;
  state.reactionTimes = [];
  state.shownItems = [];
  
  setupExperimentButtons();
  renderResults();
  updateAnalytics();
  
  showToast('Experiment restarted!');
}

// ================ UTILITY FUNCTIONS ================
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showToast(msg) {
  elements.toast.textContent = msg;
  elements.toast.classList.add('show');
  setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 1800);
}

// ================ APP START ================
document.addEventListener('DOMContentLoaded', initializeApp);
