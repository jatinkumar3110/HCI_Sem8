// Experiment 8: Mobile To-Do App - Professional HCI UI
// Full-featured task management with dark mode, device preview, analytics

// ================== STATE MANAGEMENT ==================
const state = {
  tasks: JSON.parse(localStorage.getItem('exp8-tasks') || '[]'),
  isDarkMode: localStorage.getItem('theme') === 'dark',
  loggedIn: false,
  editingTaskIdx: null,
  currentTab: 'tasks',
  searchQuery: '',
  priorityFilter: '',
  statusFilter: '',
  charts: {
    statusChart: null,
    priorityChart: null
  }
};

// ================ DOM ELEMENTS CACHE ================
const elements = {
  themeToggle: document.getElementById('theme-toggle'),
  navBtns: document.querySelectorAll('.nav-btn'),
  tabContents: document.querySelectorAll('.tab-content'),
  loginSection: document.getElementById('login-section'),
  tasksSection: document.getElementById('tasks-section'),
  loginForm: document.getElementById('login-form'),
  usernameInput: document.getElementById('username'),
  passwordInput: document.getElementById('password'),
  addTaskBtn: document.getElementById('add-task-btn'),
  taskList: document.getElementById('task-list'),
  searchTasks: document.getElementById('search-tasks'),
  priorityFilter: document.getElementById('priority-filter'),
  statusFilter: document.getElementById('status-filter'),
  modalOverlay: document.getElementById('modal-overlay'),
  modalTitle: document.getElementById('modal-title'),
  taskForm: document.getElementById('task-form'),
  taskTitle: document.getElementById('task-title'),
  taskDesc: document.getElementById('task-desc'),
  taskPriority: document.getElementById('task-priority'),
  taskCompleted: document.getElementById('task-completed'),
  closeModalBtn: document.getElementById('close-modal-btn'),
  exportDataBtn: document.getElementById('export-data-btn'),
  importDataBtn: document.getElementById('import-data-btn'),
  importInput: document.getElementById('import-input'),
  clearDataBtn: document.getElementById('clear-data-btn'),
  logoutBtn: document.getElementById('logout-btn'),
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
  setupLoginForm();
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
  
  if (state.charts.statusChart) {
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
  
  if (tabName === 'analytics' && state.loggedIn) {
    setTimeout(() => {
      initializeCharts();
      updateAnalytics();
    }, 100);
  }
}

// ================ LOGIN ================
function setupLoginForm() {
  elements.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleLogin();
  });
}

function handleLogin() {
  const username = elements.usernameInput.value.trim();
  const password = elements.passwordInput.value.trim();
  
  if (!username || !password) {
    showToast('Enter username and password');
    return;
  }
  
  state.loggedIn = true;
  elements.loginSection.style.display = 'none';
  elements.tasksSection.style.display = 'block';
  elements.addTaskBtn.style.display = 'block';
  elements.loginForm.reset();
  renderTasks();
  showToast(`Welcome, ${username}!`);
}

// ================ EXPERIMENT BUTTONS ================
function setupExperimentButtons() {
  elements.addTaskBtn.addEventListener('click', openAddTaskModal);
  elements.closeModalBtn.addEventListener('click', closeModal);
  elements.taskForm.addEventListener('submit', handleTaskSubmit);
  elements.exportDataBtn.addEventListener('click', exportData);
  elements.importDataBtn.addEventListener('click', () => {
    elements.importInput.click();
  });
  elements.importInput.addEventListener('change', importData);
  elements.clearDataBtn.addEventListener('click', clearAllData);
  elements.logoutBtn.addEventListener('click', handleLogout);
  
  // Search and Filter Listeners
  elements.searchTasks.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase();
    renderTasks();
  });
  
  elements.priorityFilter.addEventListener('change', (e) => {
    state.priorityFilter = e.target.value;
    renderTasks();
  });
  
  elements.statusFilter.addEventListener('change', (e) => {
    state.statusFilter = e.target.value;
    renderTasks();
  });
}

function handleLogout() {
  state.loggedIn = false;
  elements.tasksSection.style.display = 'none';
  elements.loginSection.style.display = 'flex';
  elements.addTaskBtn.style.display = 'none';
  elements.usernameInput.value = '';
  elements.passwordInput.value = '';
  showToast('Logged out successfully!');
}

// ================ TASK MODAL ================
function openAddTaskModal() {
  state.editingTaskIdx = null;
  elements.modalTitle.textContent = 'Add New Task';
  elements.taskForm.reset();
  elements.taskPriority.value = 'medium';
  elements.taskCompleted.checked = false;
  openModal();
}

function openModal() {
  elements.modalOverlay.style.display = 'flex';
  setTimeout(() => {
    elements.modalOverlay.classList.add('active');
    elements.taskTitle.focus();
  }, 10);
}

function closeModal() {
  elements.modalOverlay.classList.remove('active');
  setTimeout(() => {
    elements.modalOverlay.style.display = 'none';
  }, 200);
}

elements.modalOverlay.addEventListener('click', (e) => {
  if (e.target === elements.modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && elements.modalOverlay.style.display === 'flex') closeModal();
});

// ================ TASK CRUD ================
function handleTaskSubmit(e) {
  e.preventDefault();
  
  const title = elements.taskTitle.value.trim();
  const desc = elements.taskDesc.value.trim();
  const priority = elements.taskPriority.value;
  const completed = elements.taskCompleted.checked;
  
  if (!title) {
    showToast('Task title is required');
    return;
  }
  
  const task = { title, desc, priority, completed, createdAt: new Date().toISOString() };
  
  if (state.editingTaskIdx !== null) {
    state.tasks[state.editingTaskIdx] = { ...state.tasks[state.editingTaskIdx], ...task };
    showToast('Task updated!');
  } else {
    state.tasks.push(task);
    showToast('Task added!');
  }
  
  saveDataToStorage();
  renderTasks();
  closeModal();
  updateAnalytics();
}

function renderTasks() {
  elements.taskList.innerHTML = '';
  
  // Apply filters
  const filteredTasks = state.tasks.filter(task => {
    const matchesSearch = !state.searchQuery || task.title.toLowerCase().includes(state.searchQuery);
    const matchesPriority = !state.priorityFilter || task.priority === state.priorityFilter;
    const matchesStatus = !state.statusFilter || (state.statusFilter === 'completed' ? task.completed : !task.completed);
    return matchesSearch && matchesPriority && matchesStatus;
  });
  
  if (filteredTasks.length === 0) {
    elements.taskList.innerHTML = '<li style="text-align: center; color: var(--text-secondary); padding: 2em;">No tasks match your filters</li>';
    return;
  }
  
  filteredTasks.forEach((task, displayIdx) => {
    const actualIdx = state.tasks.indexOf(task);
    const li = document.createElement('li');
    li.className = `task-card ${task.completed ? 'completed' : ''} ${task.priority}-priority`;
    
    const priorityEmoji = task.priority === 'high' ? '🔴 ' : task.priority === 'low' ? '🟢 ' : '🟡 ';
    
    li.innerHTML = `
      <div class="task-main">
        <div class="task-title" style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${escapeHTML(task.title)}</div>
        ${task.desc ? `<div class="task-desc">${escapeHTML(task.desc)}</div>` : ''}
        <span class="task-priority">${priorityEmoji}${task.priority.toUpperCase()}</span>
      </div>
      <div class="actions">
        <button class="icon-btn edit" aria-label="Edit Task" data-idx="${actualIdx}" title="Edit">✏️</button>
        <button class="icon-btn delete" aria-label="Delete Task" data-idx="${actualIdx}" title="Delete">🗑️</button>
      </div>
    `;
    
    li.querySelector('.edit').addEventListener('click', () => {
      state.editingTaskIdx = actualIdx;
      elements.modalTitle.textContent = 'Edit Task';
      elements.taskTitle.value = task.title;
      elements.taskDesc.value = task.desc;
      elements.taskPriority.value = task.priority;
      elements.taskCompleted.checked = task.completed;
      openModal();
    });
    
    li.querySelector('.delete').addEventListener('click', () => {
      if (confirm('Delete this task?')) {
        state.tasks.splice(actualIdx, 1);
        saveDataToStorage();
        renderTasks();
        updateAnalytics();
        showToast('Task deleted!');
      }
    });
    
    elements.taskList.appendChild(li);
  });
}

// ================ ANALYTICS ================
function initializeCharts() {
  const statusCtx = document.getElementById('task-status-chart');
  if (statusCtx && !state.charts.statusChart) {
    const completed = state.tasks.filter(t => t.completed).length;
    const pending = state.tasks.length - completed;
    
    state.charts.statusChart = new Chart(statusCtx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending'],
        datasets: [{
          data: [completed, pending],
          backgroundColor: ['#10b981', '#f59e0b'],
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
  
  const priorityCtx = document.getElementById('priority-chart');
  if (priorityCtx && !state.charts.priorityChart) {
    const high = state.tasks.filter(t => t.priority === 'high').length;
    const medium = state.tasks.filter(t => t.priority === 'medium').length;
    const low = state.tasks.filter(t => t.priority === 'low').length;
    
    state.charts.priorityChart = new Chart(priorityCtx, {
      type: 'bar',
      data: {
        labels: ['High', 'Medium', 'Low'],
        datasets: [{
          label: 'Task Count',
          data: [high, medium, low],
          backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
          borderColor: ['#dc2626', '#d97706', '#059669'],
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        indexAxis: 'x',
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
              color: state.isDarkMode ? '#cbd5a1' : '#6b7280'
            },
            grid: {
              color: state.isDarkMode ? '#334155' : '#e5e7eb'
            }
          },
          x: {
            ticks: {
              color: state.isDarkMode ? '#cbd5a1' : '#6b7280'
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
  const completed = state.tasks.filter(t => t.completed).length;
  const total = state.tasks.length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-completion').textContent = completionRate + '%';
  
  if (state.charts.statusChart) {
    const pending = total - completed;
    state.charts.statusChart.data.datasets[0].data = [completed, pending];
    state.charts.statusChart.update();
  }
  
  if (state.charts.priorityChart) {
    const high = state.tasks.filter(t => t.priority === 'high').length;
    const medium = state.tasks.filter(t => t.priority === 'medium').length;
    const low = state.tasks.filter(t => t.priority === 'low').length;
    state.charts.priorityChart.data.datasets[0].data = [high, medium, low];
    state.charts.priorityChart.update();
  }
}

// ================ DATA PERSISTENCE ================
function saveDataToStorage() {
  localStorage.setItem('exp8-tasks', JSON.stringify(state.tasks));
}

function loadDataFromStorage() {
  state.tasks = JSON.parse(localStorage.getItem('exp8-tasks') || '[]');
}

function exportData() {
  const data = {
    tasks: state.tasks,
    exported: new Date().toISOString()
  };
  
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `exp8-tasks-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  showToast('Tasks exported successfully!');
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (!data.tasks || !Array.isArray(data.tasks)) {
        showToast('Invalid file format');
        return;
      }
      state.tasks = data.tasks;
      saveDataToStorage();
      renderTasks();
      updateAnalytics();
      showToast('Tasks imported successfully!');
    } catch (error) {
      showToast('Error importing file');
    }
  };
  reader.readAsText(file);
  elements.importInput.value = '';
}

function clearAllData() {
  if (confirm('Are you sure you want to delete all tasks?')) {
    state.tasks = [];
    saveDataToStorage();
    renderTasks();
    updateAnalytics();
    showToast('All tasks cleared!');
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
