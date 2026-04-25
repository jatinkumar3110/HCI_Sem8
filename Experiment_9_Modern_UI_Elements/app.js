// Experiment 9: Modern UI Elements - Professional HCI UI
// Kanban board, inline editing, modals, analytics, device preview

// ================== STATE MANAGEMENT ==================
const state = {
  kanbanData: {
    todo: [
      { title: 'Design UI', priority: 'high' },
      { title: 'Write Report', priority: 'medium' }
    ],
    doing: [
      { title: 'Code Demo', priority: 'high' }
    ],
    done: [
      { title: 'Setup Project', priority: 'low' }
    ]
  },
  isDarkMode: localStorage.getItem('theme') === 'dark',
  currentTab: 'kanban',
  searchQuery: '',
  priorityFilter: '',
  editableItems: ['Click to edit this item', 'Double-click or press Enter', 'Try editing me!'],
  charts: {
    boardChart: null,
    progressChart: null
  }
};

// ================ DOM ELEMENTS CACHE ================
const elements = {
  themeToggle: document.getElementById('theme-toggle'),
  navBtns: document.querySelectorAll('.nav-btn'),
  tabContents: document.querySelectorAll('.tab-content'),
  lists: {
    todo: document.getElementById('todo-list'),
    doing: document.getElementById('doing-list'),
    done: document.getElementById('done-list')
  },
  addCardBtn: document.getElementById('add-card-btn'),
  searchCards: document.getElementById('search-cards'),
  priorityFilter: document.getElementById('priority-filter'),
  editableList: document.getElementById('editable-list'),
  openModalBtn: document.getElementById('open-modal-btn'),
  modalOverlay: document.getElementById('modal-overlay'),
  closeModalBtn: document.getElementById('close-modal-btn'),
  modalForm: document.getElementById('modal-form'),
  modalTaskTitle: document.getElementById('modal-task-title'),
  modalPriority: document.getElementById('modal-priority'),
  resetBoardBtn: document.getElementById('reset-board-btn'),
  exportBtn: document.getElementById('export-btn'),
  toast: document.getElementById('toast'),
  appContainer: document.getElementById('app-container')
};

// ================ INITIALIZATION ================
function initializeApp() {
  if (state.isDarkMode) {
    document.body.classList.add('dark-mode');
    elements.themeToggle.textContent = '☀️ Light Mode';
  } else {
    elements.themeToggle.textContent = '🌙 Dark Mode';
  }

  setupThemeToggle();
  setupNavigation();
  setupKanban();
  setupInlineEditing();
  setupModal();
  setupSettings();
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

  if (state.charts.boardChart) {
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

  elements.navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  elements.tabContents.forEach(tab => {
    tab.classList.toggle('active', tab.id === `${tabName}-tab`);
  });

  if (tabName === 'analytics') {
    setTimeout(() => {
      initializeCharts();
      updateAnalytics();
    }, 100);
  }
}

// ================ KANBAN BOARD ================
function setupKanban() {
  elements.addCardBtn.addEventListener('click', openAddCardModal);
  elements.searchCards.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase();
    renderKanban();
  });
  elements.priorityFilter.addEventListener('change', (e) => {
    state.priorityFilter = e.target.value;
    renderKanban();
  });
  renderKanban();
  setupDragDrop();
}

function filterCards(cards) {
  return cards.filter(card => {
    const title = typeof card === 'string' ? card : card.title;
    const priority = typeof card === 'object' ? card.priority : 'medium';
    
    // Apply search filter
    const matchesSearch = !state.searchQuery || title.toLowerCase().includes(state.searchQuery);
    
    // Apply priority filter
    const matchesPriority = !state.priorityFilter || priority === state.priorityFilter;
    
    return matchesSearch && matchesPriority;
  });
}

function renderKanban() {
  Object.keys(elements.lists).forEach(status => {
    elements.lists[status].innerHTML = '';
    const filteredCards = filterCards(state.kanbanData[status]);
    
    filteredCards.forEach((card, displayIdx) => {
      const title = typeof card === 'string' ? card : card.title;
      const priority = typeof card === 'object' ? card.priority : 'medium';
      const actualIdx = state.kanbanData[status].indexOf(card);
      
      const li = document.createElement('li');
      li.className = `card priority-${priority}`;
      li.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5em; flex: 1;">
          <span class="card-title">${escapeHTML(title)}</span>
          <span class="priority-badge priority-${priority}">
            ${priority === 'high' ? '🔴 High' : priority === 'low' ? '🟢 Low' : '🟡 Med'}
          </span>
        </div>
        <button class="delete-btn" data-status="${status}" data-idx="${actualIdx}" aria-label="Delete">🗑️</button>
      `;

      li.querySelector('.delete-btn').addEventListener('click', () => {
        state.kanbanData[status].splice(actualIdx, 1);
        saveDataToStorage();
        renderKanban();
        setupDragDrop();
        updateAnalytics();
        showToast('Card deleted!');
      });

      elements.lists[status].appendChild(li);
    });
    
    // Show empty state message
    if (filteredCards.length === 0) {
      const empty = document.createElement('li');
      empty.style.cssText = 'color: var(--text-secondary); padding: 1em; text-align: center;';
      empty.textContent = 'No cards match your filters';
      elements.lists[status].appendChild(empty);
    }
  });
}

function setupDragDrop() {
  Object.keys(elements.lists).forEach(status => {
    new Sortable(elements.lists[status], {
      group: 'kanban',
      animation: 150,
      ghostClass: 'sortable-ghost',
      filter: '.empty-state',
      onEnd: function(evt) {
        const fromList = state.kanbanData[evt.from.id.replace('-list', '')];
        const toList = state.kanbanData[evt.to.id.replace('-list', '')];
        
        const filtered = filterCards(fromList);
        const movedCard = filtered[evt.oldIndex];
        const actualFromIdx = fromList.indexOf(movedCard);
        
        const [moved] = fromList.splice(actualFromIdx, 1);
        toList.splice(evt.newIndex, 0, moved);
        
        saveDataToStorage();
        renderKanban();
        setupDragDrop();
        updateAnalytics();
        showToast('Card moved!');
      }
    });
  });
}

function openAddCardModal() {
  elements.modalTaskTitle.value = '';
  elements.modalPriority.value = 'medium';
  elements.modalTaskTitle.focus();
  openModal();
}

// ================ INLINE EDITING ================
function setupInlineEditing() {
  renderEditableList();
}

function renderEditableList() {
  elements.editableList.innerHTML = '';
  state.editableItems.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'editable';
    li.textContent = item;
    li.tabIndex = 0;

    li.addEventListener('dblclick', () => makeEditable(li, idx));
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') makeEditable(li, idx);
    });

    elements.editableList.appendChild(li);
  });
}

function makeEditable(element, idx) {
  if (element.classList.contains('editing')) return;

  element.classList.add('editing');
  const oldText = element.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = oldText;

  element.textContent = '';
  element.appendChild(input);
  input.focus();

  function finishEdit() {
    const newText = input.value.trim() || oldText;
    state.editableItems[idx] = newText;
    element.textContent = newText;
    element.classList.remove('editing');
    saveDataToStorage();
    showToast('Item updated!');
  }

  function cancelEdit() {
    element.textContent = oldText;
    element.classList.remove('editing');
  }

  input.addEventListener('blur', finishEdit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finishEdit();
    if (e.key === 'Escape') cancelEdit();
  });
}

// ================ MODAL ================
function setupModal() {
  elements.openModalBtn.addEventListener('click', openModal);
  elements.closeModalBtn.addEventListener('click', closeModal);
  elements.modalForm.addEventListener('submit', handleModalSubmit);

  elements.modalOverlay.addEventListener('click', (e) => {
    if (e.target === elements.modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.modalOverlay.classList.contains('active')) closeModal();
  });
}

function openModal() {
  elements.modalOverlay.classList.add('active');
  setTimeout(() => {
    elements.modalTaskTitle.focus();
  }, 100);
}

function closeModal() {
  elements.modalOverlay.classList.remove('active');
  elements.modalForm.reset();
}

function handleModalSubmit(e) {
  e.preventDefault();
  const title = elements.modalTaskTitle.value.trim();
  const priority = elements.modalPriority.value || 'medium';

  if (!title) {
    showToast('Card title is required');
    return;
  }

  state.kanbanData.todo.push({ title, priority });
  saveDataToStorage();
  renderKanban();
  setupDragDrop();
  closeModal();
  updateAnalytics();
  showToast('Card added!');
}

// ================ SETTINGS ================
function setupSettings() {
  elements.resetBoardBtn.addEventListener('click', resetBoard);
  elements.exportBtn.addEventListener('click', exportData);
}

function resetBoard() {
  if (confirm('Reset all cards to default state?')) {
    state.kanbanData = {
      todo: [
        { title: 'Design UI', priority: 'high' },
        { title: 'Write Report', priority: 'medium' }
      ],
      doing: [
        { title: 'Code Demo', priority: 'high' }
      ],
      done: [
        { title: 'Setup Project', priority: 'low' }
      ]
    };
    state.editableItems = ['Click to edit this item', 'Double-click or press Enter', 'Try editing me!'];
    saveDataToStorage();
    renderKanban();
    renderEditableList();
    setupDragDrop();
    updateAnalytics();
    showToast('Board reset!');
  }
}

function exportData() {
  const data = {
    kanbanData: state.kanbanData,
    editableItems: state.editableItems,
    exported: new Date().toISOString()
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `exp9-board-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);

  showToast('Data exported!');
}

// ================ ANALYTICS ================
function initializeCharts() {
  const boardCtx = document.getElementById('board-chart');
  if (boardCtx && !state.charts.boardChart) {
    const todo = state.kanbanData.todo.length;
    const doing = state.kanbanData.doing.length;
    const done = state.kanbanData.done.length;

    state.charts.boardChart = new Chart(boardCtx, {
      type: 'doughnut',
      data: {
        labels: ['To Do', 'Doing', 'Done'],
        datasets: [{
          data: [todo, doing, done],
          backgroundColor: ['#f59e0b', '#3b82f6', '#10b981'],
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

  const progressCtx = document.getElementById('progress-chart');
  if (progressCtx && !state.charts.progressChart) {
    const total = Object.values(state.kanbanData).flat().length;
    const doneCount = state.kanbanData.done.length;
    const progress = total > 0 ? Math.round((doneCount / total) * 100) : 0;

    state.charts.progressChart = new Chart(progressCtx, {
      type: 'bar',
      data: {
        labels: ['Progress'],
        datasets: [{
          label: 'Completion %',
          data: [progress],
          backgroundColor: ['#10b981'],
          borderColor: ['#059669'],
          borderWidth: 1,
          borderRadius: 6,
          barThickness: 60
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: {
              color: state.isDarkMode ? '#cbd5a1' : '#6b7280'
            },
            grid: {
              color: state.isDarkMode ? '#334155' : '#e5e7eb'
            }
          },
          y: {
            ticks: {
              color: state.isDarkMode ? '#cbd5a1' : '#6b7280'
            },
            grid: {
              color: state.isDarkMode ? '#334155' : '#e5e7eb'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: state.isDarkMode ? '#e2e8f0' : '#1f2937'
            }
          }
        }
      }
    });
  }
}

function updateAnalytics() {
  const todo = state.kanbanData.todo.length;
  const doing = state.kanbanData.doing.length;
  const done = state.kanbanData.done.length;
  const total = todo + doing + done;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-todo').textContent = todo;
  document.getElementById('stat-doing').textContent = doing;
  document.getElementById('stat-done').textContent = done;

  if (state.charts.boardChart) {
    state.charts.boardChart.data.datasets[0].data = [todo, doing, done];
    state.charts.boardChart.update();
  }

  if (state.charts.progressChart) {
    const progress = total > 0 ? Math.round((done / total) * 100) : 0;
    state.charts.progressChart.data.datasets[0].data = [progress];
    state.charts.progressChart.update();
  }
}

// ================ DATA PERSISTENCE ================
function saveDataToStorage() {
  const data = {
    kanbanData: state.kanbanData,
    editableItems: state.editableItems
  };
  localStorage.setItem('exp9-data', JSON.stringify(data));
}

function loadDataFromStorage() {
  const saved = localStorage.getItem('exp9-data');
  if (saved) {
    const data = JSON.parse(saved);
    state.kanbanData = data.kanbanData || state.kanbanData;
    state.editableItems = data.editableItems || state.editableItems;
    renderEditableList();
  }
}

// ================ UTILITY FUNCTIONS ================
function escapeHTML(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return str.replace(/[&<>"']/g, c => map[c]);
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
