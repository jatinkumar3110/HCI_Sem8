// Smart Student Study Planner - Experiment 10 (Enhanced with HCI Analytics & Device Preview)
// Author: HCI Lab
// Features: Device frame preview, browser chrome simulation, HCI analytics, interaction heatmap, Pomodoro timer

// ============= DEVICE CONFIGURATION =============
const DEVICE_CONFIGS = {
  desktop: { width: 1440, height: 900, portrait: true, label: 'Desktop (1440×900)' },
  laptop: { width: 1280, height: 800, portrait: true, label: 'Laptop (1280×800)' },
  tablet: { width: 768, height: 1024, portrait: true, label: 'iPad (768×1024)' },
  android: { width: 412, height: 915, portrait: true, label: 'Android (412×915)' },
  iphone: { width: 375, height: 812, portrait: true, label: 'iPhone (375×812)' }
};

// ============= STATE =============
let tasks = JSON.parse(localStorage.getItem('exp10_tasks') || '[]');
let editingTaskId = null;
let charts = { completion: null, distribution: null, weekly: null };

// HCI Analytics State
let hciState = {
  usabilityTestMode: false,
  showAnalytics: false,
  currentDevice: 'desktop',
  deviceOrientation: 'portrait',
  interactions: [],
  heatmapData: [],
  sessionStartTime: Date.now(),
  sessionInteractions: 0,
  pomodoroActive: false,
  pomodoroTime: 1500,
  pomodoroIsBreak: false
};

// ============= DOM ELEMENTS =============
// These will be initialized when DOM is ready
let deviceBtns, usabilityTestBtn, analyticsToggleBtn, deviceRotateBtn, deviceFullscreenBtn, usabilityIndicator;
let devicePreviewContainer, deviceFrame, hciAnalyticsOverlay, heatmapCanvas;
let appContainer, headerNav, navBtns, themeToggle, defaultPresetBtn;
let tabPanels, modalOverlay, modalTitle, taskForm, taskTitle, taskDesc, taskDue, taskPriority;
let closeModalBtn, cancelModalBtn, todoList, inprogressList, doneList;
let tasksTodayEl, completedTodayEl, totalTasksEl, productivityRateEl, dashboardProgress, progressDone, progressTotal;
let upcomingTasks, completionChartEl, distributionChartEl, weeklyChartEl, settingsDarkMode, settingsAnimations;
let exportDataBtn, clearTasksBtn, resetStatsBtn, fabBtn, toast, pomodoroWidget, pomodoroStart, pomodoroReset;
let appBootstrapped = false;
let previewScale = 1;

// Initialize DOM elements after page loads
function cacheDOMElements() {
  // HCI Control Panel
  deviceBtns = document.querySelectorAll('.device-btn');
  usabilityTestBtn = document.getElementById('usability-test-btn');
  analyticsToggleBtn = document.getElementById('analytics-toggle-btn');
  deviceRotateBtn = document.getElementById('device-rotate-btn');
  deviceFullscreenBtn = document.getElementById('device-fullscreen-btn');
  usabilityIndicator = document.getElementById('usability-indicator');
  devicePreviewContainer = document.getElementById('device-preview-container');
  deviceFrame = document.getElementById('device-frame');
  hciAnalyticsOverlay = document.getElementById('hci-analytics-overlay');
  heatmapCanvas = document.getElementById('heatmap-canvas');

  // App Container
  appContainer = document.getElementById('app-container');
  headerNav = document.querySelector('.main-nav');
  navBtns = document.querySelectorAll('.nav-btn');
  themeToggle = document.getElementById('theme-toggle');
  defaultPresetBtn = document.getElementById('default-preset-btn');

  // Tab Panels
  tabPanels = document.querySelectorAll('.tab-panel');

  // Modal
  modalOverlay = document.getElementById('modal-overlay');
  modalTitle = document.getElementById('modal-title');
  taskForm = document.getElementById('task-form');
  taskTitle = document.getElementById('task-title');
  taskDesc = document.getElementById('task-desc');
  taskDue = document.getElementById('task-due');
  taskPriority = document.getElementById('task-priority');
  closeModalBtn = document.querySelector('.close-btn');
  cancelModalBtn = document.getElementById('cancel-modal');

  // Kanban Board
  todoList = document.getElementById('todo-list');
  inprogressList = document.getElementById('inprogress-list');
  doneList = document.getElementById('done-list');

  // Dashboard Widgets
  dashboardProgress = document.getElementById('dashboard-progress');
  progressDone = document.getElementById('progress-done');
  progressTotal = document.getElementById('progress-total');
  tasksTodayEl = document.getElementById('tasks-today');
  completedTodayEl = document.getElementById('completed-today');
  totalTasksEl = document.getElementById('total-tasks');
  productivityRateEl = document.getElementById('productivity-rate');
  upcomingTasks = document.getElementById('upcoming-tasks');

  // Analytics Canvas
  completionChartEl = document.getElementById('completion-chart');
  distributionChartEl = document.getElementById('distribution-chart');
  weeklyChartEl = document.getElementById('weekly-chart');

  // Settings
  settingsDarkMode = document.getElementById('settings-dark-mode');
  settingsAnimations = document.getElementById('settings-animations');
  exportDataBtn = document.getElementById('export-data-btn');
  clearTasksBtn = document.getElementById('clear-tasks-btn');
  resetStatsBtn = document.getElementById('reset-stats-btn');

  // FAB & Toast
  fabBtn = document.getElementById('add-task-btn');
  toast = document.getElementById('toast');

  // Pomodoro
  pomodoroWidget = document.getElementById('pomodoro-widget');
  pomodoroStart = document.getElementById('pomodoro-start');
  pomodoroReset = document.getElementById('pomodoro-reset');
}

// ============= INITIALIZATION =============
function initializeApp() {
  console.log('🚀 Starting app initialization...');

  try {
    cacheDOMElements();
    console.log('✅ DOM elements cached');
  } catch (error) {
    console.error('❌ Failed to cache DOM elements:', error);
    return;
  }

  // Attach core interactions first so buttons remain responsive even if later optional init fails.
  try {
    setupEventListeners();
    console.log('✅ Event listeners attached');
  } catch (error) {
    console.error('❌ Failed to attach event listeners:', error);
  }

  try {
    loadThemePreference();
    console.log('✅ Theme loaded');
  } catch (error) {
    console.error('❌ Theme initialization failed:', error);
  }

  try {
    loadDevicePreview();
    applyDevicePreviewScale();
    console.log('✅ Device preview loaded');
  } catch (error) {
    console.error('❌ Device preview initialization failed:', error);
  }

  try {
    setupHCITracking();
    console.log('✅ HCI tracking initialized');
  } catch (error) {
    console.error('❌ HCI tracking initialization failed:', error);
  }

  try {
    initializeDragDrop();
    console.log('✅ Drag-drop initialized');
  } catch (error) {
    console.error('❌ Drag-drop initialization failed:', error);
  }

  try {
    renderAllUI();
    console.log('✅ UI rendered');
  } catch (error) {
    console.error('❌ UI rendering failed:', error);
  }

  try {
    initializePomodoro();
    console.log('✅ Pomodoro initialized');
  } catch (error) {
    console.error('❌ Pomodoro initialization failed:', error);
  }

  console.log('✅✅✅ App initialization completed ✅✅✅');
}

// ============= EVENT LISTENERS =============
function setupEventListeners() {
  navBtns.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
  themeToggle?.addEventListener('click', toggleTheme);
  defaultPresetBtn?.addEventListener('click', loadDefaultPresetData);
  deviceBtns.forEach(btn => btn.addEventListener('click', (e) => {
    console.log('🔘 Device button clicked:', btn.dataset.device);
    switchDeviceView(btn.dataset.device);
  }));
  
  deviceRotateBtn?.addEventListener('click', () => {
    console.log('🔘 Rotate button clicked');
    toggleDeviceOrientation();
  });
  deviceFullscreenBtn?.addEventListener('click', () => {
    console.log('🔘 Fullscreen button clicked');
    toggleFullscreenMode();
  });
  usabilityTestBtn?.addEventListener('click', () => {
    console.log('🔘 Usability test button clicked');
    toggleUsabilityTest();
  });
  analyticsToggleBtn?.addEventListener('click', () => {
    console.log('🔘 Analytics toggle button clicked');
    toggleAnalyticsOverlay();
  });

  fabBtn?.addEventListener('click', () => openTaskModal());
  closeModalBtn?.addEventListener('click', closeTaskModal);
  cancelModalBtn?.addEventListener('click', closeTaskModal);
  modalOverlay?.addEventListener('click', (e) => { if (e.target === modalOverlay) closeTaskModal(); });

  taskForm?.addEventListener('submit', saveTask);
  settingsDarkMode?.addEventListener('change', (e) => setDarkMode(e.target.checked));
  settingsAnimations?.addEventListener('change', (e) => localStorage.setItem('enableAnimations', e.target.checked));
  exportDataBtn?.addEventListener('click', exportData);
  clearTasksBtn?.addEventListener('click', clearAllTasks);
  resetStatsBtn?.addEventListener('click', resetAnalytics);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) closeTaskModal();
  });

  window.addEventListener('resize', applyDevicePreviewScale);

  const resizeHandle = document.getElementById('device-resize-handle');
  resizeHandle?.addEventListener('mousedown', startResizeDevice);

  pomodoroStart?.addEventListener('click', togglePomodoroTimer);
  pomodoroReset?.addEventListener('click', resetPomodoroTimer);
}

// ============= DEVICE PREVIEW SYSTEM =============
function switchDeviceView(device) {
  if (!DEVICE_CONFIGS[device]) return;
  deviceBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.device === device));
  
  hciState.currentDevice = device;
  hciState.deviceOrientation = 'portrait';

  const config = DEVICE_CONFIGS[device];
  const frame = document.getElementById('device-frame');
  frame.style.width = config.width + 'px';
  frame.style.height = config.height + 'px';

  appContainer.classList.remove('desktop-view', 'laptop-view', 'tablet-view', 'android-view', 'iphone-view');
  appContainer.classList.add(`${device}-view`);
  deviceFrame.classList.remove('landscape');

  const isMobile = ['android', 'iphone'].includes(device);
  deviceRotateBtn.style.opacity = isMobile ? '1' : '0.3';
  deviceRotateBtn.style.pointerEvents = isMobile ? 'auto' : 'none';

  localStorage.setItem('devicePreview', device);
  applyDevicePreviewScale();
  trackInteraction('device_switch', { device, orientation: 'portrait' });
  showToast(`📱 Switched to ${config.label}`);
}

function toggleDeviceOrientation() {
  const isMobile = ['android', 'iphone'].includes(hciState.currentDevice);
  if (!isMobile) {
    showToast('⚠️ Orientation only available for mobile devices');
    return;
  }

  deviceFrame.classList.add('device-rotating');
  const isLandscape = hciState.deviceOrientation === 'landscape';
  hciState.deviceOrientation = isLandscape ? 'portrait' : 'landscape';

  const config = DEVICE_CONFIGS[hciState.currentDevice];
  if (isLandscape) {
    deviceFrame.style.width = config.width + 'px';
    deviceFrame.style.height = config.height + 'px';
    deviceFrame.classList.remove('landscape');
  } else {
    deviceFrame.style.width = config.height + 'px';
    deviceFrame.style.height = config.width + 'px';
    deviceFrame.classList.add('landscape');
  }

  setTimeout(() => deviceFrame.classList.remove('device-rotating'), 800);
  applyDevicePreviewScale();
  trackInteraction('device_rotate', { device: hciState.currentDevice, orientation: hciState.deviceOrientation });
  showToast(`🔄 Rotated to ${hciState.deviceOrientation}`);
}

function toggleFullscreenMode() {
  devicePreviewContainer.classList.toggle('fullscreen-mode');
  applyDevicePreviewScale();
  trackInteraction('fullscreen_toggle');
  showToast(devicePreviewContainer.classList.contains('fullscreen-mode') ? '⛶ Fullscreen ON' : '⛶ Fullscreen OFF');
}

function loadDevicePreview() {
  const saved = localStorage.getItem('devicePreview') || 'desktop';
  switchDeviceView(saved);
}

function startResizeDevice(e) {
  e.preventDefault();
  const startX = e.clientX, startY = e.clientY;
  const startWidth = deviceFrame.offsetWidth, startHeight = deviceFrame.offsetHeight;

  const handleMouseMove = (e) => {
    const newWidth = Math.max(300, startWidth + (e.clientX - startX));
    const newHeight = Math.max(300, startHeight + (e.clientY - startY));
    deviceFrame.style.width = newWidth + 'px';
    deviceFrame.style.height = newHeight + 'px';
    applyDevicePreviewScale();
  };
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}

function applyDevicePreviewScale() {
  if (!devicePreviewContainer || !devicePreviewContainer.parentElement) return;

  devicePreviewContainer.style.transform = 'scale(1)';

  const wrapperRect = devicePreviewContainer.parentElement.getBoundingClientRect();
  const naturalWidth = devicePreviewContainer.offsetWidth;
  const naturalHeight = devicePreviewContainer.offsetHeight;

  if (!naturalWidth || !naturalHeight) return;

  const horizontalPadding = 28;
  const verticalPadding = 18;
  const availableWidth = Math.max(320, wrapperRect.width - horizontalPadding);
  const availableHeight = Math.max(240, wrapperRect.height - verticalPadding);

  const fitScale = Math.min(availableWidth / naturalWidth, availableHeight / naturalHeight, 1);
  previewScale = Number.isFinite(fitScale) ? Math.max(0.45, fitScale) : 1;

  devicePreviewContainer.style.transform = `scale(${previewScale})`;
}

// ============= HCI ANALYTICS =============
function setupHCITracking() {
  const appScreen = document.querySelector('.device-screen');
  appScreen?.addEventListener('click', (e) => {
    trackInteraction('click', {
      elementType: e.target.tagName.toLowerCase(),
      elementClass: e.target.className || '',
      x: e.clientX,
      y: e.clientY
    });
  });
  appScreen?.addEventListener('input', (e) => {
    trackInteraction('input', { elementType: e.target.tagName.toLowerCase(), value: e.target.value.length });
  });
  navBtns.forEach(btn => btn.addEventListener('click', () => trackInteraction('navigation', { tab: btn.dataset.tab })));
  appScreen?.addEventListener('dragstart', (e) => trackInteraction('task_drag', { taskId: e.target.dataset.taskId }));
}

function trackInteraction(action, details = {}) {
  if (!hciState.usabilityTestMode) return;

  const interaction = { timestamp: Date.now(), action, details, sessionTime: ((Date.now() - hciState.sessionStartTime) / 1000).toFixed(2) };
  hciState.interactions.push(interaction);
  hciState.sessionInteractions++;

  if (action === 'click' && details.x && details.y) {
    const frameRect = deviceFrame.getBoundingClientRect();
    hciState.heatmapData.push({
      x: details.x - frameRect.left,
      y: details.y - frameRect.top,
      timestamp: Date.now(),
      intensity: 1
    });
  }
  updateMetricsDisplay();
}

function toggleUsabilityTest() {
  hciState.usabilityTestMode = !hciState.usabilityTestMode;
  if (hciState.usabilityTestMode) {
    hciState.interactions = [];
    hciState.heatmapData = [];
    hciState.sessionStartTime = Date.now();
    hciState.sessionInteractions = 0;
    usabilityIndicator.style.display = 'inline-flex';
    usabilityTestBtn.classList.add('active');
    showToast('🧪 Recording interactions...');
  } else {
    usabilityIndicator.style.display = 'none';
    usabilityTestBtn.classList.remove('active');
    exportInteractions();
    showToast(`🧪 ${hciState.sessionInteractions} interactions recorded`);
  }
}

function toggleAnalyticsOverlay() {
  hciState.showAnalytics = !hciState.showAnalytics;
  hciAnalyticsOverlay.style.display = hciState.showAnalytics && hciState.usabilityTestMode ? 'flex' : 'none';
  analyticsToggleBtn.classList.toggle('active', hciState.showAnalytics);
  if (hciState.showAnalytics && hciState.usabilityTestMode) renderHeatmap();
}

function updateMetricsDisplay() {
  if (!hciState.showAnalytics) return;
  const sessionTime = Math.floor((Date.now() - hciState.sessionStartTime) / 1000);
  const clickDensity = hciState.heatmapData.length > 0 ? (hciState.heatmapData.length / sessionTime).toFixed(2) : 0;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const completionRate = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  document.getElementById('metric-interactions').textContent = hciState.sessionInteractions;
  document.getElementById('metric-density').textContent = clickDensity;
  document.getElementById('metric-session').textContent = formatTime(sessionTime);
  document.getElementById('metric-completion').textContent = completionRate + '%';
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60), secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function renderHeatmap() {
  if (!heatmapCanvas) return;
  const ctx = heatmapCanvas.getContext('2d');
  const frameRect = deviceFrame.getBoundingClientRect();
  heatmapCanvas.width = frameRect.width;
  heatmapCanvas.height = frameRect.height;

  hciState.heatmapData.forEach(point => {
    const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 40);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.6)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(point.x - 40, point.y - 40, 80, 80);
  });
}

function exportInteractions() {
  const exportData = {
    timestamp: new Date().toISOString(),
    device: hciState.currentDevice,
    orientation: hciState.deviceOrientation,
    sessionDuration: (Date.now() - hciState.sessionStartTime) / 1000,
    totalInteractions: hciState.sessionInteractions,
    heatmapPoints: hciState.heatmapData.length,
    interactions: hciState.interactions
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hci-interactions-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 Interaction log exported');
}

// ============= POMODORO TIMER =============
function initializePomodoro() { updatePomodoroDisplay(); }

function togglePomodoroTimer() {
  hciState.pomodoroActive = !hciState.pomodoroActive;
  pomodoroStart.textContent = hciState.pomodoroActive ? '⏸' : '▶';
  if (hciState.pomodoroActive) startPomodoroTimer();
}

function startPomodoroTimer() {
  const interval = setInterval(() => {
    if (!hciState.pomodoroActive) { clearInterval(interval); return; }
    hciState.pomodoroTime--;
    if (hciState.pomodoroTime <= 0) {
      hciState.pomodoroIsBreak = !hciState.pomodoroIsBreak;
      hciState.pomodoroTime = hciState.pomodoroIsBreak ? 300 : 1500;
      showToast(hciState.pomodoroIsBreak ? '☕ Break time! Get ready to focus.' : '🎯 Focus session complete! Take a break.');
    }
    updatePomodoroDisplay();
  }, 1000);
}

function resetPomodoroTimer() {
  hciState.pomodoroActive = false;
  hciState.pomodoroTime = 1500;
  hciState.pomodoroIsBreak = false;
  pomodoroStart.textContent = '▶';
  updatePomodoroDisplay();
  showToast('↻ Pomodoro timer reset');
}

function updatePomodoroDisplay() {
  const mins = Math.floor(hciState.pomodoroTime / 60), secs = hciState.pomodoroTime % 60;
  const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  const status = hciState.pomodoroIsBreak ? 'Break' : 'Focus';
  const pomodoroTimeEl = pomodoroWidget?.querySelector('.pomodoro-time');
  const pomodoroStatusEl = pomodoroWidget?.querySelector('.pomodoro-status');
  if (pomodoroTimeEl) pomodoroTimeEl.textContent = timeStr;
  if (pomodoroStatusEl) pomodoroStatusEl.textContent = status;
}

// ============= TAB NAVIGATION =============
function switchTab(tabName) {
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
    btn.setAttribute('aria-selected', btn.dataset.tab === tabName);
  });
  tabPanels.forEach(panel => panel.classList.toggle('active', panel.id === tabName));
  if (tabName === 'dashboard') updateDashboard();
  else if (tabName === 'analytics') setTimeout(initializeCharts, 100);
  trackInteraction('tab_switch', { tab: tabName });
}

// ============= DARK MODE =============
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  setDarkMode(isDark);
}

function setDarkMode(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  if (settingsDarkMode) settingsDarkMode.checked = isDark;
  localStorage.setItem('darkMode', isDark);
  showToast(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
}

function loadThemePreference() {
  const isDark = localStorage.getItem('darkMode') === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches;
  setDarkMode(isDark);
}

// ============= MODAL MANAGEMENT =============
function openTaskModal(taskId = null) {
  editingTaskId = taskId;
  if (taskId !== null) {
    const task = tasks[taskId];
    modalTitle.textContent = '✏️ Edit Task';
    taskTitle.value = task.title;
    taskDesc.value = task.desc || '';
    taskDue.value = task.due;
    taskPriority.value = task.priority || 'normal';
  } else {
    modalTitle.textContent = '➕ Add New Task';
    taskForm.reset();
    taskDue.valueAsDate = new Date();
  }
  modalOverlay.classList.add('active');
  setTimeout(() => taskTitle.focus(), 100);
}

function closeTaskModal() {
  modalOverlay.classList.remove('active');
  editingTaskId = null;
  taskForm.reset();
}

// ============= TASK MANAGEMENT =============
function saveTask(e) {
  e.preventDefault();
  const title = taskTitle.value.trim(), desc = taskDesc.value.trim(), due = taskDue.value, priority = taskPriority.value;
  if (!title || !due) { showToast('⚠️ Title and due date are required'); return; }

  if (editingTaskId !== null) {
    tasks[editingTaskId] = { ...tasks[editingTaskId], title, desc, due, priority };
    showToast('✏️ Task updated');
  } else {
    tasks.push({ id: Date.now(), title, desc, due, priority: priority || 'normal', status: 'todo', completed: false, createdAt: new Date().toISOString() });
    showToast('➕ Task created');
  }
  saveTasks();
  renderAllUI();
  closeTaskModal();
  trackInteraction('task_saved', { priority, status: editingTaskId ? 'updated' : 'created' });
}

function deleteTask(taskId) {
  if (confirm('Delete this task?')) {
    tasks.splice(taskId, 1);
    saveTasks();
    renderAllUI();
    showToast('🗑️ Task deleted');
    trackInteraction('task_deleted', { taskId });
  }
}

function saveTasks() { localStorage.setItem('exp10_tasks', JSON.stringify(tasks)); }

// ============= KANBAN RENDERING =============
function renderKanbanBoard() {
  todoList.innerHTML = '';
  inprogressList.innerHTML = '';
  doneList.innerHTML = '';

  const statusMap = { todo: todoList, inprogress: inprogressList, done: doneList };
  tasks.forEach((task, idx) => {
    const li = createTaskCard(task, idx);
    const list = statusMap[task.status] || todoList;
    list.appendChild(li);
  });
  updateTaskCounts();
  reinitializeDragDrop();
}

function createTaskCard(task, idx) {
  const li = document.createElement('li');
  li.className = `task-card priority-${task.priority}`;
  li.draggable = true;
  li.dataset.taskId = idx;
  const isOverdue = new Date(task.due) < new Date() && task.status !== 'done';

  li.innerHTML = `
    <div class="task-header">
      <span class="task-title-el">${escapeHTML(task.title)}</span>
      <span class="task-priority-badge priority-${task.priority}">
        ${task.priority === 'high' ? '🔴' : task.priority === 'low' ? '🟢' : '🟡'} ${task.priority}
      </span>
    </div>
    ${task.desc ? `<div class="task-desc">${escapeHTML(task.desc)}</div>` : ''}
    <div class="task-meta">
      <span class="task-due ${isOverdue ? 'overdue' : ''}">📅 ${task.due}</span>
    </div>
    <div class="task-actions">
      <button class="icon-btn edit" title="Edit" data-id="${idx}">✏️</button>
      <button class="icon-btn delete" title="Delete" data-id="${idx}">🗑️</button>
    </div>
  `;
  li.querySelector('.edit').addEventListener('click', () => openTaskModal(idx));
  li.querySelector('.delete').addEventListener('click', () => deleteTask(idx));
  return li;
}

function updateTaskCounts() {
  document.getElementById('todo-count').textContent = tasks.filter(t => t.status === 'todo').length;
  document.getElementById('inprogress-count').textContent = tasks.filter(t => t.status === 'inprogress').length;
  document.getElementById('done-count').textContent = tasks.filter(t => t.status === 'done').length;
}

// ============= DRAG & DROP =============
function initializeDragDrop() {
  const lists = [todoList, inprogressList, doneList];
  lists.forEach(list => {
    new Sortable(list, {
      group: 'tasks',
      animation: 150,
      ghostClass: 'task-card-ghost',
      onEnd: (evt) => {
        const taskId = parseInt(evt.item.dataset.taskId);
        const newStatus = evt.to.id.replace('-list', '');
        if (tasks[taskId]) {
          tasks[taskId].status = newStatus;
          saveTasks();
          showToast('📌 Task moved');
          trackInteraction('task_moved', { taskId, newStatus });
        }
      }
    });
  });
}

function reinitializeDragDrop() {
  const lists = [todoList, inprogressList, doneList];
  lists.forEach(list => Sortable.get(list).destroy());
  initializeDragDrop();
}

// ============= DASHBOARD =============
function updateDashboard() {
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.due === today);
  const completedTasksToday = todayTasks.filter(t => t.status === 'done').length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;

  tasksTodayEl.textContent = todayTasks.length;
  completedTodayEl.textContent = completedTasksToday;
  totalTasksEl.textContent = tasks.length;
  productivityRateEl.textContent = tasks.length ? Math.round((doneTasks / tasks.length) * 100) + '%' : '0%';

  const total = tasks.length || 1, completed = doneTasks;
  dashboardProgress.style.width = (completed / total) * 100 + '%';
  progressDone.textContent = completed;
  progressTotal.textContent = total;

  renderUpcomingTasks();
}

function renderUpcomingTasks() {
  upcomingTasks.innerHTML = '';
  const upcoming = tasks
    .filter(t => t.status !== 'done' && new Date(t.due) >= new Date())
    .sort((a, b) => new Date(a.due) - new Date(b.due))
    .slice(0, 5);

  if (upcoming.length === 0) {
    upcomingTasks.innerHTML = '<div style="color: var(--text-secondary); padding: 1em;">No upcoming tasks</div>';
    return;
  }
  upcoming.forEach((task) => {
    const div = document.createElement('div');
    div.className = `task-item task-priority-${task.priority}`;
    div.innerHTML = `<div class="task-item-content"><div class="task-item-title">${escapeHTML(task.title)}</div><div class="task-item-due">Due: ${task.due}</div></div>`;
    upcomingTasks.appendChild(div);
  });
}

// ============= ANALYTICS =============
function initializeCharts() {
  if (charts.completion && charts.distribution && charts.weekly) {
    updateCharts();
    return;
  }

  if (completionChartEl && !charts.completion) {
    const totalTasks = tasks.length || 1, doneTasks = tasks.filter(t => t.status === 'done').length;
    const ctx = completionChartEl.getContext('2d');
    charts.completion = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Remaining'],
        datasets: [{ data: [doneTasks, totalTasks - doneTasks], backgroundColor: ['#10b981', '#dbeafe'], borderColor: ['#10b981', '#dbeafe'], borderWidth: 1 }]
      },
      options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } } }
    });
  }

  if (distributionChartEl && !charts.distribution) {
    const todoCount = tasks.filter(t => t.status === 'todo').length;
    const inprogCount = tasks.filter(t => t.status === 'inprogress').length;
    const doneCount = tasks.filter(t => t.status === 'done').length;
    const ctx = distributionChartEl.getContext('2d');
    charts.distribution = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [{ data: [todoCount, inprogCount, doneCount], backgroundColor: ['#2563eb', '#f59e0b', '#10b981'], borderColor: ['#2563eb', '#f59e0b', '#10b981'], borderWidth: 1 }]
      },
      options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: true, position: 'bottom' } } }
    });
  }

  if (weeklyChartEl && !charts.weekly) {
    const labels = getWeekLabels(), data = getWeeklyData();
    const ctx = weeklyChartEl.getContext('2d');
    charts.weekly = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Tasks Completed',
          data,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      },
      options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: tasks.length + 1 } } }
    });
  }
}

function updateCharts() {
  if (charts.completion) charts.completion.destroy();
  if (charts.distribution) charts.distribution.destroy();
  if (charts.weekly) charts.weekly.destroy();
  charts = { completion: null, distribution: null, weekly: null };
  initializeCharts();
}

function getWeekLabels() {
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
  }
  return labels;
}

function getWeeklyData() {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = tasks.filter(t => t.due === dateStr && t.status === 'done').length;
    data.push(count);
  }
  return data;
}

// ============= DEMO PRESET =============
function formatDateOffset(daysOffset) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
}

function generateDefaultPresetTasks() {
  const profileIntro = {
    title: 'Profile Setup: JATIN (22BAI71254)',
    desc: 'B.Tech AI student. Demo preset owner: JATIN, UID 22BAI71254. Goal: showcase full productivity workflow for HCI mini-project review.',
    due: formatDateOffset(0),
    priority: 'high',
    status: 'done'
  };

  const weeklyDoneTemplate = [3, 2, 4, 1, 3, 2, 5];
  const weeklyDoneTasks = [];
  for (let dayIndex = 0; dayIndex < weeklyDoneTemplate.length; dayIndex++) {
    const offset = dayIndex - 6;
    for (let count = 1; count <= weeklyDoneTemplate[dayIndex]; count++) {
      weeklyDoneTasks.push({
        title: `Completed Study Block D${dayIndex + 1}-${count}`,
        desc: 'Closed focused session with notes synced to revision board.',
        due: formatDateOffset(offset),
        priority: count % 2 === 0 ? 'normal' : 'low',
        status: 'done'
      });
    }
  }

  const todoTasks = [
    {
      title: 'Finalize HCI viva revision cards',
      desc: 'Create concise cards for Nielsen heuristics, Fitts Law, and cognitive load examples.',
      due: formatDateOffset(1),
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Draft usability testing report v2',
      desc: 'Summarize findings from 5 test users with issue severity and screenshots.',
      due: formatDateOffset(2),
      priority: 'normal',
      status: 'todo'
    },
    {
      title: 'Record mini-project walkthrough video',
      desc: 'Capture 3-minute narration explaining dashboard, kanban board, analytics, and settings.',
      due: formatDateOffset(3),
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Prepare stakeholder feedback slide',
      desc: 'Highlight persona-driven decisions and iteration impact metrics.',
      due: formatDateOffset(4),
      priority: 'normal',
      status: 'todo'
    },
    {
      title: 'Compile references and appendix',
      desc: 'Attach survey summary, wireframes, and test tasks in final submission.',
      due: formatDateOffset(5),
      priority: 'low',
      status: 'todo'
    }
  ];

  const inProgressTasks = [
    {
      title: 'Polish responsive UI for mobile demo',
      desc: 'Validate Android and iPhone preview modes with readable typography and spacing.',
      due: formatDateOffset(0),
      priority: 'high',
      status: 'inprogress'
    },
    {
      title: 'Tune analytics interpretation notes',
      desc: 'Map completion chart and weekly trend to study behavior insights.',
      due: formatDateOffset(1),
      priority: 'normal',
      status: 'inprogress'
    },
    {
      title: 'Review task descriptions for clarity',
      desc: 'Ensure each task communicates action, deadline, and outcome.',
      due: formatDateOffset(2),
      priority: 'normal',
      status: 'inprogress'
    },
    {
      title: 'Backlog grooming for next sprint',
      desc: 'Break large tasks into testable subtasks for quick execution.',
      due: formatDateOffset(3),
      priority: 'low',
      status: 'inprogress'
    }
  ];

  const allTasks = [profileIntro, ...weeklyDoneTasks, ...todoTasks, ...inProgressTasks];
  const startId = Date.now();

  return allTasks.map((task, index) => ({
    id: startId + index,
    title: task.title,
    desc: task.desc,
    due: task.due,
    priority: task.priority,
    status: task.status,
    completed: task.status === 'done',
    createdAt: new Date().toISOString()
  }));
}

function loadDefaultPresetData() {
  if (tasks.length > 0) {
    const shouldReplace = confirm('Load default preset data? This will replace current tasks with a full demo dataset.');
    if (!shouldReplace) return;
  }

  tasks = generateDefaultPresetTasks();
  saveTasks();
  renderAllUI();
  switchTab('dashboard');
  showToast('✨ Demo preset loaded for JATIN (22BAI71254)');
  trackInteraction('default_preset_loaded', { owner: 'JATIN', uid: '22BAI71254', totalTasks: tasks.length });
}

// ============= SETTINGS =============
function clearAllTasks() {
  if (confirm('Clear all tasks? This cannot be undone.')) {
    tasks = [];
    saveTasks();
    renderAllUI();
    showToast('🗑️ All tasks cleared');
    trackInteraction('clear_all_tasks');
  }
}

function resetAnalytics() {
  if (confirm('Reset all analytics data?')) {
    tasks = tasks.map(t => ({ ...t, completed: false, status: 'todo' }));
    saveTasks();
    renderAllUI();
    updateCharts();
    showToast('🔄 Analytics reset');
    trackInteraction('reset_analytics');
  }
}

function exportData() {
  const data = JSON.stringify(tasks, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 Tasks exported');
  trackInteraction('export_tasks');
}

// ============= UTILITY FUNCTIONS =============
function escapeHTML(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return str.replace(/[&<>"']/g, c => map[c]);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function renderAllUI() {
  renderKanbanBoard();
  updateDashboard();
  updateCharts();
}

// ============= INITIALIZATION =============
function bootstrapApp() {
  if (appBootstrapped) return;
  appBootstrapped = true;
  initializeApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp, { once: true });
} else {
  bootstrapApp();
}


