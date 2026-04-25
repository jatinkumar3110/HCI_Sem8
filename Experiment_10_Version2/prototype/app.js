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

const STORAGE_KEYS = {
  tasks: 'exp10_v2_tasks',
  profile: 'exp10_v2_profile',
  language: 'exp10_v2_language',
  nudges: 'exp10_v2_nudges',
  members: 'exp10_v2_members',
  challenges: 'exp10_v2_challenges',
  activeUser: 'exp10_v2_active_user',
  accessibility: 'exp10_v2_accessibility',
  notifications: 'exp10_v2_notifications'
  ,nudge: 'exp10_v2_nudge_state'
  ,experiment: 'exp10_v2_experiment_state'
};

// ============= STATE =============
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.tasks) || localStorage.getItem('exp10_tasks') || '[]');
let editingTaskId = null;
let charts = { completion: null, distribution: null, weekly: null };
let smartPlanDraft = [];
let coachHistory = [];
let userProfile = JSON.parse(localStorage.getItem(STORAGE_KEYS.profile) || '{}');
let communityMembers = JSON.parse(localStorage.getItem(STORAGE_KEYS.members) || '[]');
let communityChallenges = JSON.parse(localStorage.getItem(STORAGE_KEYS.challenges) || '[]');
let activeUserName = localStorage.getItem(STORAGE_KEYS.activeUser) || '';
let appNotifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.notifications) || '[]');
let accessibilityPrefs = JSON.parse(localStorage.getItem(STORAGE_KEYS.accessibility) || '{"fontScale":100,"dyslexiaFont":false,"highContrast":false,"reduceMotion":false}');
let taskSearchQuery = '';
let taskPriorityFilter = 'all';
let lastDeletedTask = null;
let nudgeState = JSON.parse(localStorage.getItem(STORAGE_KEYS.nudge) || '{"current":"","history":[],"applied":0,"dismissed":0}');
let experimentState = JSON.parse(localStorage.getItem(STORAGE_KEYS.experiment) || '{"variant":"A","density":"comfy","metrics":{"A":{"sessions":0,"success":0,"friction":0,"completed":0,"commands":0},"B":{"sessions":0,"success":0,"friction":0,"completed":0,"commands":0}}}');

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
let riskScoreEl, riskNoteEl, consistencyScoreEl, consistencyNoteEl, focusRecommendationEl, performanceSignalsEl;
let planExamDate, planWeeklyHours, planTopics, generatePlanBtn, smartPlanOutput;
let coachMessages, coachInput, coachSendBtn, coachChipBtns;
let settingsLanguage, settingsNudges, profileNameInput, profileUidInput, profileGoalInput, saveProfileBtn;
let activeUserPill, switchUserBtn, activeUserAvatar;
let memberNameInput, memberRoleInput, addMemberBtn, challengeMemberSelect, challengeTitleInput, assignChallengeBtn;
let communityMembersEl, communityChallengesEl;
let instActiveLearnersEl, instRiskLearnersEl, instAvgCompletionEl, instChallengeClosedEl, instituteRankingEl;
let communityRoleHintEl, instituteRoleHintEl, instituteNavBtn;
let demoMentorBtn, demoStudentBtn, notificationsToggleBtn, notificationDrawer, clearNotificationsBtn, notificationListEl;
let commandPaletteBtn, commandOverlay, commandInput, commandResults;
let taskSearchInput, taskFilterChipBtns;
let settingsFontScale, settingsDyslexiaFont, settingsHighContrast, settingsReduceMotion;
let adaptiveNudgeTextEl, nudgeStatsEl, nudgeRefreshBtn, nudgeApplyBtn, nudgeDismissBtn, nudgeHistoryListEl;
let experimentVariantSelect, experimentDensitySelect, applyExperimentBtn, logSuccessSessionBtn, logFrictionBtn, experimentInsightsEl;
let demoScriptBtn;
let appBootstrapped = false;
let previewScale = 1;
let demoScriptRunning = false;
let demoScriptTimers = [];

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
  instituteNavBtn = document.querySelector('.nav-btn[data-tab="institute"]');
  themeToggle = document.getElementById('theme-toggle');
  defaultPresetBtn = document.getElementById('default-preset-btn');
  activeUserPill = document.getElementById('active-user-pill');
  activeUserAvatar = document.getElementById('active-user-avatar');
  switchUserBtn = document.getElementById('switch-user-btn');
  demoMentorBtn = document.getElementById('demo-mentor-btn');
  demoStudentBtn = document.getElementById('demo-student-btn');
  notificationsToggleBtn = document.getElementById('notifications-toggle-btn');
  commandPaletteBtn = document.getElementById('command-palette-btn');
  demoScriptBtn = document.getElementById('demo-script-btn');

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
  taskSearchInput = document.getElementById('task-search-input');
  taskFilterChipBtns = document.querySelectorAll('.filter-chip');

  // Dashboard Widgets
  dashboardProgress = document.getElementById('dashboard-progress');
  progressDone = document.getElementById('progress-done');
  progressTotal = document.getElementById('progress-total');
  tasksTodayEl = document.getElementById('tasks-today');
  completedTodayEl = document.getElementById('completed-today');
  totalTasksEl = document.getElementById('total-tasks');
  productivityRateEl = document.getElementById('productivity-rate');
  upcomingTasks = document.getElementById('upcoming-tasks');
  riskScoreEl = document.getElementById('risk-score');
  riskNoteEl = document.getElementById('risk-note');
  consistencyScoreEl = document.getElementById('consistency-score');
  consistencyNoteEl = document.getElementById('consistency-note');
  focusRecommendationEl = document.getElementById('focus-recommendation');
  performanceSignalsEl = document.getElementById('performance-signals');
  adaptiveNudgeTextEl = document.getElementById('adaptive-nudge-text');
  nudgeStatsEl = document.getElementById('nudge-stats');
  nudgeRefreshBtn = document.getElementById('nudge-refresh-btn');
  nudgeApplyBtn = document.getElementById('nudge-apply-btn');
  nudgeDismissBtn = document.getElementById('nudge-dismiss-btn');
  nudgeHistoryListEl = document.getElementById('nudge-history-list');
  planExamDate = document.getElementById('plan-exam-date');
  planWeeklyHours = document.getElementById('plan-weekly-hours');
  planTopics = document.getElementById('plan-topics');
  generatePlanBtn = document.getElementById('generate-plan-btn');
  smartPlanOutput = document.getElementById('smart-plan-output');

  // AI Coach
  coachMessages = document.getElementById('coach-messages');
  coachInput = document.getElementById('coach-input');
  coachSendBtn = document.getElementById('coach-send-btn');
  coachChipBtns = document.querySelectorAll('.coach-chip');

  // Analytics Canvas
  completionChartEl = document.getElementById('completion-chart');
  distributionChartEl = document.getElementById('distribution-chart');
  weeklyChartEl = document.getElementById('weekly-chart');

  // Settings
  settingsDarkMode = document.getElementById('settings-dark-mode');
  settingsAnimations = document.getElementById('settings-animations');
  settingsFontScale = document.getElementById('settings-font-scale');
  settingsDyslexiaFont = document.getElementById('settings-dyslexia-font');
  settingsHighContrast = document.getElementById('settings-high-contrast');
  settingsReduceMotion = document.getElementById('settings-reduce-motion');
  experimentVariantSelect = document.getElementById('experiment-variant');
  experimentDensitySelect = document.getElementById('experiment-density');
  applyExperimentBtn = document.getElementById('apply-experiment-btn');
  logSuccessSessionBtn = document.getElementById('log-success-session-btn');
  logFrictionBtn = document.getElementById('log-friction-btn');
  experimentInsightsEl = document.getElementById('experiment-insights');
  settingsLanguage = document.getElementById('settings-language');
  settingsNudges = document.getElementById('settings-nudges');
  profileNameInput = document.getElementById('profile-name');
  profileUidInput = document.getElementById('profile-uid');
  profileGoalInput = document.getElementById('profile-goal');
  saveProfileBtn = document.getElementById('save-profile-btn');

  // Community
  memberNameInput = document.getElementById('member-name');
  memberRoleInput = document.getElementById('member-role');
  addMemberBtn = document.getElementById('add-member-btn');
  challengeMemberSelect = document.getElementById('challenge-member');
  challengeTitleInput = document.getElementById('challenge-title');
  assignChallengeBtn = document.getElementById('assign-challenge-btn');
  communityMembersEl = document.getElementById('community-members');
  communityChallengesEl = document.getElementById('community-challenges');
  communityRoleHintEl = document.getElementById('community-role-hint');
  instituteRoleHintEl = document.getElementById('institute-role-hint');

  // Institute
  instActiveLearnersEl = document.getElementById('inst-active-learners');
  instRiskLearnersEl = document.getElementById('inst-risk-learners');
  instAvgCompletionEl = document.getElementById('inst-avg-completion');
  instChallengeClosedEl = document.getElementById('inst-challenge-closed');
  instituteRankingEl = document.getElementById('institute-ranking');
  exportDataBtn = document.getElementById('export-data-btn');
  clearTasksBtn = document.getElementById('clear-tasks-btn');
  resetStatsBtn = document.getElementById('reset-stats-btn');

  // FAB & Toast
  fabBtn = document.getElementById('add-task-btn');
  toast = document.getElementById('toast');
  notificationDrawer = document.getElementById('notification-drawer');
  clearNotificationsBtn = document.getElementById('clear-notifications-btn');
  notificationListEl = document.getElementById('notification-list');
  commandOverlay = document.getElementById('command-overlay');
  commandInput = document.getElementById('command-input');
  commandResults = document.getElementById('command-results');

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
    initializeV2Experience();
    console.log('✅ V2 experience initialized');
  } catch (error) {
    console.error('❌ V2 initialization failed:', error);
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
  switchUserBtn?.addEventListener('click', switchActiveUser);
  demoMentorBtn?.addEventListener('click', () => applyRolePreset('mentor'));
  demoStudentBtn?.addEventListener('click', () => applyRolePreset('student'));
  demoScriptBtn?.addEventListener('click', toggleDemoScriptMode);
  notificationsToggleBtn?.addEventListener('click', toggleNotificationDrawer);
  commandPaletteBtn?.addEventListener('click', openCommandPalette);
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
  settingsFontScale?.addEventListener('input', (e) => {
    accessibilityPrefs.fontScale = Number(e.target.value);
    applyAccessibilityPrefs();
  });
  settingsDyslexiaFont?.addEventListener('change', (e) => {
    accessibilityPrefs.dyslexiaFont = e.target.checked;
    applyAccessibilityPrefs();
  });
  settingsHighContrast?.addEventListener('change', (e) => {
    accessibilityPrefs.highContrast = e.target.checked;
    applyAccessibilityPrefs();
  });
  settingsReduceMotion?.addEventListener('change', (e) => {
    accessibilityPrefs.reduceMotion = e.target.checked;
    applyAccessibilityPrefs();
  });
  settingsLanguage?.addEventListener('change', (e) => setLanguage(e.target.value));
  settingsNudges?.addEventListener('change', (e) => localStorage.setItem(STORAGE_KEYS.nudges, e.target.checked));
  saveProfileBtn?.addEventListener('click', saveUserProfile);
  exportDataBtn?.addEventListener('click', exportData);
  clearTasksBtn?.addEventListener('click', clearAllTasks);
  resetStatsBtn?.addEventListener('click', resetAnalytics);
  generatePlanBtn?.addEventListener('click', generateSmartPlan);
  coachSendBtn?.addEventListener('click', sendCoachMessage);
  taskSearchInput?.addEventListener('input', (e) => {
    taskSearchQuery = e.target.value.trim().toLowerCase();
    renderKanbanBoard();
  });
  taskFilterChipBtns?.forEach((chip) => chip.addEventListener('click', () => {
    taskPriorityFilter = chip.dataset.filter || 'all';
    taskFilterChipBtns.forEach((btn) => btn.classList.toggle('active', btn === chip));
    renderKanbanBoard();
  }));

  nudgeRefreshBtn?.addEventListener('click', () => refreshAdaptiveNudge(true));
  nudgeApplyBtn?.addEventListener('click', markNudgeApplied);
  nudgeDismissBtn?.addEventListener('click', dismissNudge);

  applyExperimentBtn?.addEventListener('click', () => applyExperimentMode(true));
  logSuccessSessionBtn?.addEventListener('click', () => logExperimentEvent('success'));
  logFrictionBtn?.addEventListener('click', () => logExperimentEvent('friction'));

  clearNotificationsBtn?.addEventListener('click', clearNotifications);
  commandInput?.addEventListener('input', () => renderCommandResults(commandInput.value));
  commandInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') executeCommandFromInput(commandInput.value);
  });
  commandOverlay?.addEventListener('click', (e) => {
    if (e.target === commandOverlay) closeCommandPalette();
  });
  commandResults?.addEventListener('click', (e) => {
    const button = e.target.closest('.command-item');
    if (!button) return;
    executeCommand(button.dataset.command || '');
  });
  document.addEventListener('click', (e) => {
    if (!notificationDrawer || notificationDrawer.style.display === 'none') return;
    const clickedDrawer = notificationDrawer.contains(e.target);
    const clickedToggle = notificationsToggleBtn?.contains(e.target);
    if (!clickedDrawer && !clickedToggle) notificationDrawer.style.display = 'none';
  });
  addMemberBtn?.addEventListener('click', addCommunityMember);
  assignChallengeBtn?.addEventListener('click', assignCommunityChallenge);
  coachInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendCoachMessage();
    }
  });
  coachChipBtns?.forEach((chip) => chip.addEventListener('click', () => {
    coachInput.value = chip.dataset.prompt || '';
    sendCoachMessage();
  }));

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCommandPalette();
      return;
    }

    if (e.key === 'Escape') {
      if (modalOverlay?.classList.contains('active')) closeTaskModal();
      closeCommandPalette();
      return;
    }
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
  if (tabName === 'institute' && getActiveRole() !== 'mentor') {
    showToast('🔒 Institute dashboard is mentor-only in local mode');
    tabName = 'community';
  }

  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
    btn.setAttribute('aria-selected', btn.dataset.tab === tabName);
  });
  tabPanels.forEach(panel => panel.classList.toggle('active', panel.id === tabName));
  if (tabName === 'dashboard') updateDashboard();
  else if (tabName === 'coach') ensureCoachWelcome();
  else if (tabName === 'community') renderCommunitySection();
  else if (tabName === 'institute') renderInstituteSection();
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
  addNotification(`Task ${editingTaskId !== null ? 'updated' : 'created'}: ${title}`);
  trackInteraction('task_saved', { priority, status: editingTaskId ? 'updated' : 'created' });
}

function deleteTask(taskId) {
  if (confirm('Delete this task?')) {
    const deleted = tasks[taskId];
    tasks.splice(taskId, 1);
    lastDeletedTask = { task: deleted, deletedAt: Date.now() };
    saveTasks();
    renderAllUI();
    showToast('🗑️ Task deleted (Ctrl+K -> undo delete)');
    addNotification(`Task deleted: ${deleted?.title || 'Untitled task'}`);
    trackInteraction('task_deleted', { taskId });
  }
}

function saveTasks() { localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks)); }

// ============= KANBAN RENDERING =============
function renderKanbanBoard() {
  todoList.innerHTML = '';
  inprogressList.innerHTML = '';
  doneList.innerHTML = '';

  const statusMap = { todo: todoList, inprogress: inprogressList, done: doneList };
  const visible = getVisibleTasks();
  visible.forEach(({ task, idx }) => {
    const li = createTaskCard(task, idx);
    const list = statusMap[task.status] || todoList;
    list.appendChild(li);
  });

  ['todo', 'inprogress', 'done'].forEach((status) => {
    const list = statusMap[status];
    if (list.children.length === 0) {
      list.innerHTML = '<li class="community-item" style="font-size:0.86em;color:var(--text-secondary);">No matching tasks in this column.</li>';
    }
  });

  updateTaskCounts();
  reinitializeDragDrop();
}

function getVisibleTasks() {
  return tasks
    .map((task, idx) => ({ task, idx }))
    .filter(({ task }) => {
      const queryOk = !taskSearchQuery || `${task.title} ${task.desc || ''}`.toLowerCase().includes(taskSearchQuery);
      const priorityOk = taskPriorityFilter === 'all' || task.priority === taskPriorityFilter;
      return queryOk && priorityOk;
    });
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
          const oldStatus = tasks[taskId].status;
          tasks[taskId].status = newStatus;
          if (newStatus === 'done' && oldStatus !== 'done') {
            getActiveVariantMetrics().completed++;
            localStorage.setItem(STORAGE_KEYS.experiment, JSON.stringify(experimentState));
          }
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
  updateCommandCenter();
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

// ============= VERSION 2 EXPERIENCE =============
function initializeV2Experience() {
  const savedLanguage = localStorage.getItem(STORAGE_KEYS.language) || 'en';
  if (settingsLanguage) settingsLanguage.value = savedLanguage;
  if (settingsNudges) settingsNudges.checked = localStorage.getItem(STORAGE_KEYS.nudges) !== 'false';

  profileNameInput.value = userProfile.name || '';
  profileUidInput.value = userProfile.uid || '';
  profileGoalInput.value = userProfile.goal || '';

  if (userProfile.name && communityMembers.every((m) => m.name !== userProfile.name)) {
    communityMembers.push({
      id: Date.now(),
      name: userProfile.name,
      role: 'student',
      uid: userProfile.uid || '',
      completionRate: 0,
      riskLevel: 'low',
      joinedAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.members, JSON.stringify(communityMembers));
  }

  if (!activeUserName) {
    activeUserName = userProfile.name || 'Guest';
    localStorage.setItem(STORAGE_KEYS.activeUser, activeUserName);
  }

  const tomorrow = formatDateOffset(1);
  if (planExamDate && !planExamDate.value) planExamDate.value = tomorrow;
  if (planWeeklyHours && !planWeeklyHours.value) planWeeklyHours.value = 16;
  if (planTopics && !planTopics.value) planTopics.value = 'Algorithms, HCI, Aptitude';

  if (settingsFontScale) settingsFontScale.value = accessibilityPrefs.fontScale || 100;
  if (settingsDyslexiaFont) settingsDyslexiaFont.checked = !!accessibilityPrefs.dyslexiaFont;
  if (settingsHighContrast) settingsHighContrast.checked = !!accessibilityPrefs.highContrast;
  if (settingsReduceMotion) settingsReduceMotion.checked = !!accessibilityPrefs.reduceMotion;
  if (experimentVariantSelect) experimentVariantSelect.value = experimentState.variant || 'A';
  if (experimentDensitySelect) experimentDensitySelect.value = experimentState.density || 'comfy';

  setLanguage(savedLanguage, true);
  applyAccessibilityPrefs(true);
  applyExperimentMode(false);
  renderSmartPlanOutput();
  renderExperimentInsights();
  refreshAdaptiveNudge(false);
  ensureCoachWelcome();
  renderCommunitySection();
  renderInstituteSection();
  updateActiveUserUI();
  renderNotifications();
}

function refreshAdaptiveNudge(addToHistory = false) {
  const open = tasks.filter((t) => t.status !== 'done');
  const overdue = open.filter((t) => new Date(t.due) < new Date()).length;
  const high = open.filter((t) => t.priority === 'high').length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const completion = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const goal = (userProfile.goal || '').trim();

  let message = 'Take one high-impact task and complete it in a 25-minute focus sprint.';
  if (overdue > 0) message = `You have ${overdue} overdue tasks. Clear one overdue task before starting anything new.`;
  else if (high > 1) message = `Prioritize high-impact work: close 1 of ${high} high-priority tasks in the next hour.`;
  else if (completion < 40) message = 'Use a quick-win sequence: finish 2 easy tasks to rebuild momentum.';
  else if (completion >= 70) message = 'Strong progress today. Protect a deep-work block and avoid context switching.';
  if (goal) message += ` Goal alignment: ${goal}.`;

  nudgeState.current = message;
  if (addToHistory) {
    nudgeState.history.unshift({ text: message, ts: new Date().toISOString() });
    nudgeState.history = nudgeState.history.slice(0, 8);
  }
  localStorage.setItem(STORAGE_KEYS.nudge, JSON.stringify(nudgeState));
  renderAdaptiveNudge();
}

function renderAdaptiveNudge() {
  if (adaptiveNudgeTextEl) adaptiveNudgeTextEl.textContent = nudgeState.current || 'No adaptive recommendation yet.';
  if (nudgeStatsEl) nudgeStatsEl.textContent = `Applied: ${nudgeState.applied || 0} · Dismissed: ${nudgeState.dismissed || 0}`;
  if (nudgeHistoryListEl) {
    if (!nudgeState.history?.length) {
      nudgeHistoryListEl.innerHTML = '<div class="nudge-history-item">No nudge history yet.</div>';
    } else {
      nudgeHistoryListEl.innerHTML = nudgeState.history.map((item) => {
        const stamp = new Date(item.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `<div class="nudge-history-item">${escapeHTML(item.text)} <small>(${stamp})</small></div>`;
      }).join('');
    }
  }
}

function markNudgeApplied() {
  nudgeState.applied = (nudgeState.applied || 0) + 1;
  localStorage.setItem(STORAGE_KEYS.nudge, JSON.stringify(nudgeState));
  renderAdaptiveNudge();
  addNotification('Adaptive nudge marked as applied');
  showToast('✅ Nudge applied');
}

function dismissNudge() {
  nudgeState.dismissed = (nudgeState.dismissed || 0) + 1;
  localStorage.setItem(STORAGE_KEYS.nudge, JSON.stringify(nudgeState));
  renderAdaptiveNudge();
  showToast('❌ Nudge dismissed');
}

function getActiveVariantMetrics() {
  const variant = experimentState.variant || 'A';
  return experimentState.metrics[variant];
}

function applyExperimentMode(trackSession = true) {
  experimentState.variant = experimentVariantSelect?.value || experimentState.variant || 'A';
  experimentState.density = experimentDensitySelect?.value || experimentState.density || 'comfy';

  document.body.classList.remove('ui-variant-a', 'ui-variant-b', 'compact-density', 'comfy-density');
  document.body.classList.add(experimentState.variant === 'B' ? 'ui-variant-b' : 'ui-variant-a');
  document.body.classList.add(experimentState.density === 'compact' ? 'compact-density' : 'comfy-density');

  if (trackSession) {
    getActiveVariantMetrics().sessions++;
    addNotification(`Experiment mode applied: Variant ${experimentState.variant} (${experimentState.density})`);
    showToast(`🧪 Variant ${experimentState.variant} applied`);
  }

  localStorage.setItem(STORAGE_KEYS.experiment, JSON.stringify(experimentState));
  renderExperimentInsights();
}

function logExperimentEvent(type) {
  const metrics = getActiveVariantMetrics();
  if (type === 'success') {
    metrics.success++;
    showToast('👍 Success event logged');
  } else if (type === 'friction') {
    metrics.friction++;
    showToast('⚠️ Friction event logged');
  }
  localStorage.setItem(STORAGE_KEYS.experiment, JSON.stringify(experimentState));
  renderExperimentInsights();
}

function renderExperimentInsights() {
  if (!experimentInsightsEl) return;
  const a = experimentState.metrics.A;
  const b = experimentState.metrics.B;

  const scoreA = (a.success * 2 + a.completed + a.commands * 0.5) - (a.friction * 1.2);
  const scoreB = (b.success * 2 + b.completed + b.commands * 0.5) - (b.friction * 1.2);
  const winner = scoreA === scoreB ? 'Tie' : scoreA > scoreB ? 'Variant A' : 'Variant B';

  experimentInsightsEl.innerHTML = `
    <div class="experiment-row"><strong>Variant A</strong>: sessions ${a.sessions}, success ${a.success}, friction ${a.friction}, tasks completed ${a.completed}, commands ${a.commands}</div>
    <div class="experiment-row"><strong>Variant B</strong>: sessions ${b.sessions}, success ${b.success}, friction ${b.friction}, tasks completed ${b.completed}, commands ${b.commands}</div>
    <div class="experiment-row"><strong>Current Winner</strong>: ${winner} (A score ${scoreA.toFixed(1)} vs B score ${scoreB.toFixed(1)})</div>
  `;
}

function saveUserProfile() {
  userProfile = {
    name: profileNameInput?.value.trim() || '',
    uid: profileUidInput?.value.trim() || '',
    goal: profileGoalInput?.value.trim() || ''
  };
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(userProfile));
  upsertMemberFromProfile();
  renderCommunitySection();
  renderInstituteSection();
  updateActiveUserUI();
  showToast('💾 Profile saved');
}

function upsertMemberFromProfile() {
  if (!userProfile.name) return;
  const existingIndex = communityMembers.findIndex((m) => m.name.toLowerCase() === userProfile.name.toLowerCase());
  if (existingIndex >= 0) {
    communityMembers[existingIndex] = {
      ...communityMembers[existingIndex],
      uid: userProfile.uid || communityMembers[existingIndex].uid || ''
    };
  } else {
    communityMembers.push({
      id: Date.now(),
      name: userProfile.name,
      role: 'student',
      uid: userProfile.uid || '',
      completionRate: 0,
      riskLevel: 'low',
      joinedAt: new Date().toISOString()
    });
  }
  localStorage.setItem(STORAGE_KEYS.members, JSON.stringify(communityMembers));
}

function setLanguage(languageCode, silent = false) {
  const labels = {
    en: {
      dashboard: '📊 Dashboard',
      tasks: '📋 Tasks',
      coach: '🤖 AI Coach',
      community: '👥 Community',
      institute: '🏫 Institute',
      analytics: '📈 Analytics',
      settings: '⚙️ Settings',
      subtitle: "Here's your productivity overview for today."
    },
    hi: {
      dashboard: '📊 डैशबोर्ड',
      tasks: '📋 कार्य',
      coach: '🤖 एआई कोच',
      community: '👥 समुदाय',
      institute: '🏫 संस्थान',
      analytics: '📈 विश्लेषण',
      settings: '⚙️ सेटिंग्स',
      subtitle: 'आज की प्रोडक्टिविटी का सारांश यहां देखें।'
    },
    es: {
      dashboard: '📊 Panel',
      tasks: '📋 Tareas',
      coach: '🤖 Coach IA',
      community: '👥 Comunidad',
      institute: '🏫 Instituto',
      analytics: '📈 Analitica',
      settings: '⚙️ Ajustes',
      subtitle: 'Aqui tienes tu panorama de productividad de hoy.'
    }
  };

  const selected = labels[languageCode] || labels.en;
  const navMap = ['dashboard', 'tasks', 'coach', 'community', 'institute', 'analytics', 'settings'];
  navMap.forEach((key) => {
    const btn = document.querySelector(`.nav-btn[data-tab="${key}"]`);
    if (btn) btn.textContent = selected[key];
  });

  const sub = document.querySelector('#dashboard .subtitle');
  if (sub) sub.textContent = selected.subtitle;

  localStorage.setItem(STORAGE_KEYS.language, languageCode);
  if (!silent) showToast(`🌐 Language set to ${languageCode.toUpperCase()}`);
}

function applyRolePreset(role) {
  const preset = role === 'mentor'
    ? { name: 'Alex Mentor', role: 'mentor', uid: 'MTR-9001', completionRate: 88, riskLevel: 'low' }
    : { name: 'Jatin Student', role: 'student', uid: '22BAI71254', completionRate: 64, riskLevel: 'medium' };

  const existingIndex = communityMembers.findIndex((m) => m.name.toLowerCase() === preset.name.toLowerCase());
  if (existingIndex >= 0) {
    communityMembers[existingIndex] = { ...communityMembers[existingIndex], ...preset };
  } else {
    communityMembers.push({ id: Date.now(), joinedAt: new Date().toISOString(), ...preset });
  }

  localStorage.setItem(STORAGE_KEYS.members, JSON.stringify(communityMembers));
  activeUserName = preset.name;
  localStorage.setItem(STORAGE_KEYS.activeUser, activeUserName);

  if (role === 'student') {
    userProfile = { name: preset.name, uid: preset.uid, goal: userProfile.goal || 'Exam prep and productivity' };
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(userProfile));
    if (profileNameInput) profileNameInput.value = userProfile.name;
    if (profileUidInput) profileUidInput.value = userProfile.uid;
    if (profileGoalInput) profileGoalInput.value = userProfile.goal;
  }

  renderAllUI();
  updateActiveUserUI();
  addNotification(role === 'mentor' ? 'Demo role switched: Mentor' : 'Demo role switched: Student');
  showToast(role === 'mentor' ? '🧑‍🏫 Mentor preset activated' : '🎓 Student preset activated');
}

function applyAccessibilityPrefs(silent = false) {
  document.documentElement.style.fontSize = `${accessibilityPrefs.fontScale || 100}%`;
  document.body.classList.toggle('dyslexia-font', !!accessibilityPrefs.dyslexiaFont);
  document.body.classList.toggle('high-contrast', !!accessibilityPrefs.highContrast);
  document.body.classList.toggle('reduced-motion', !!accessibilityPrefs.reduceMotion);
  localStorage.setItem(STORAGE_KEYS.accessibility, JSON.stringify(accessibilityPrefs));
  if (!silent) showToast('♿ Accessibility preferences updated');
}

function addNotification(text) {
  appNotifications.unshift({ id: Date.now(), text, ts: new Date().toISOString() });
  appNotifications = appNotifications.slice(0, 30);
  localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(appNotifications));
  renderNotifications();
}

function renderNotifications() {
  if (!notificationListEl) return;
  if (appNotifications.length === 0) {
    notificationListEl.innerHTML = '<div class="notification-item">No notifications yet.</div>';
    return;
  }
  notificationListEl.innerHTML = appNotifications.map((item) => {
    const when = new Date(item.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `<div class="notification-item">${escapeHTML(item.text)}<br><small>${when}</small></div>`;
  }).join('');
}

function clearNotifications() {
  appNotifications = [];
  localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(appNotifications));
  renderNotifications();
}

function toggleNotificationDrawer() {
  if (!notificationDrawer) return;
  const nextDisplay = notificationDrawer.style.display === 'none' ? 'block' : 'none';
  notificationDrawer.style.display = nextDisplay;
  renderNotifications();
  showToast(nextDisplay === 'block' ? '🔔 Notifications opened' : '🔕 Notifications closed');
}

function getCommandDefinitions() {
  return [
    { id: 'go-dashboard', label: 'Go: Dashboard', run: () => switchTab('dashboard') },
    { id: 'go-tasks', label: 'Go: Tasks', run: () => switchTab('tasks') },
    { id: 'go-coach', label: 'Go: AI Coach', run: () => switchTab('coach') },
    { id: 'go-community', label: 'Go: Community', run: () => switchTab('community') },
    { id: 'go-institute', label: 'Go: Institute', run: () => switchTab('institute') },
    { id: 'new-task', label: 'Action: Add New Task', run: () => openTaskModal() },
    { id: 'load-preset', label: 'Action: Load Default Preset', run: () => loadDefaultPresetData() },
    { id: 'demo-mentor', label: 'Preset: Demo Mentor', run: () => applyRolePreset('mentor') },
    { id: 'demo-student', label: 'Preset: Demo Student', run: () => applyRolePreset('student') },
    { id: 'run-demo-script', label: 'Demo: Run Guided Walkthrough', run: () => startDemoScriptMode() },
    { id: 'stop-demo-script', label: 'Demo: Stop Guided Walkthrough', run: () => stopDemoScriptMode(true) },
    { id: 'undo-delete', label: 'Action: Undo Last Delete', run: () => undoLastDelete() },
    { id: 'toggle-theme', label: 'Action: Toggle Theme', run: () => toggleTheme() },
    { id: 'export-tasks', label: 'Action: Export Tasks', run: () => exportData() }
  ];
}

function openCommandPalette() {
  if (!commandOverlay) return;
  commandOverlay.style.display = 'flex';
  renderCommandResults('');
  setTimeout(() => commandInput?.focus(), 30);
}

function closeCommandPalette() {
  if (!commandOverlay) return;
  commandOverlay.style.display = 'none';
  if (commandInput) commandInput.value = '';
}

function renderCommandResults(query) {
  if (!commandResults) return;
  const q = (query || '').trim().toLowerCase();
  const commands = getCommandDefinitions().filter((cmd) => !q || cmd.label.toLowerCase().includes(q) || cmd.id.includes(q));
  commandResults.innerHTML = commands.map((cmd) => `<button class="command-item" type="button" data-command="${cmd.id}">${escapeHTML(cmd.label)}</button>`).join('');
  if (commands.length === 0) commandResults.innerHTML = '<div class="notification-item">No matching commands.</div>';
}

function executeCommandFromInput(inputText) {
  const q = (inputText || '').trim().toLowerCase();
  const command = getCommandDefinitions().find((cmd) => cmd.id === q || cmd.label.toLowerCase() === q) || getCommandDefinitions().find((cmd) => cmd.label.toLowerCase().includes(q));
  if (command) executeCommand(command.id);
}

function executeCommand(commandId) {
  const command = getCommandDefinitions().find((cmd) => cmd.id === commandId);
  if (!command) return;
  closeCommandPalette();
  command.run();
  getActiveVariantMetrics().commands++;
  localStorage.setItem(STORAGE_KEYS.experiment, JSON.stringify(experimentState));
  renderExperimentInsights();
  addNotification(`Command executed: ${command.label}`);
}

function undoLastDelete() {
  if (!lastDeletedTask?.task) {
    showToast('ℹ️ Nothing to undo');
    return;
  }
  tasks.push(lastDeletedTask.task);
  saveTasks();
  renderAllUI();
  showToast('↩️ Last deleted task restored');
  addNotification(`Restored task: ${lastDeletedTask.task.title}`);
  lastDeletedTask = null;
}

function toggleDemoScriptMode() {
  if (demoScriptRunning) {
    stopDemoScriptMode(true);
    return;
  }
  startDemoScriptMode();
}

function startDemoScriptMode() {
  if (demoScriptRunning) return;
  demoScriptRunning = true;
  if (demoScriptBtn) {
    demoScriptBtn.classList.add('demo-running');
    demoScriptBtn.textContent = '⏹ Stop Demo';
  }

  if (!tasks.length) {
    tasks = generateDefaultPresetTasks();
    saveTasks();
    renderAllUI();
  }

  addNotification('Demo script started');
  showToast('🎬 Guided demo started');

  const steps = [
    { delay: 200, run: () => { applyRolePreset('student'); switchTab('dashboard'); showToast('Step 1/8: Student dashboard'); } },
    { delay: 1800, run: () => { refreshAdaptiveNudge(true); markNudgeApplied(); showToast('Step 2/8: Adaptive nudge engine'); } },
    { delay: 3600, run: () => { switchTab('tasks'); taskPriorityFilter = 'high'; setActiveTaskFilterChip('high'); renderKanbanBoard(); showToast('Step 3/8: Task filtering'); } },
    { delay: 5600, run: () => { switchTab('coach'); coachInput.value = 'Plan my day in 3 focused blocks'; sendCoachMessage(); showToast('Step 4/8: AI coach response'); } },
    { delay: 7600, run: () => { switchTab('community'); showToast('Step 5/8: Community collaboration'); } },
    { delay: 9400, run: () => { applyRolePreset('mentor'); switchTab('institute'); showToast('Step 6/8: Mentor institute dashboard'); } },
    { delay: 11200, run: () => { experimentVariantSelect.value = 'B'; experimentDensitySelect.value = 'compact'; applyExperimentMode(true); showToast('Step 7/8: A/B experiment lab'); } },
    { delay: 13200, run: () => { switchTab('analytics'); toggleNotificationDrawer(); showToast('Step 8/8: Analytics + notifications'); } },
    { delay: 15200, run: () => stopDemoScriptMode(false) }
  ];

  demoScriptTimers = steps.map((step) => setTimeout(() => {
    if (!demoScriptRunning) return;
    step.run();
  }, step.delay));
}

function stopDemoScriptMode(manual) {
  demoScriptRunning = false;
  demoScriptTimers.forEach((id) => clearTimeout(id));
  demoScriptTimers = [];

  if (demoScriptBtn) {
    demoScriptBtn.classList.remove('demo-running');
    demoScriptBtn.textContent = '🎬 Demo Script';
  }

  if (manual) showToast('⏹ Demo script stopped');
  else showToast('✅ Demo walkthrough completed');
  addNotification(manual ? 'Demo script stopped' : 'Demo walkthrough completed');
}

function setActiveTaskFilterChip(filter) {
  taskFilterChipBtns?.forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.filter === filter);
  });
}

function updateActiveUserUI() {
  const role = getActiveRole();
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
  if (activeUserPill) activeUserPill.textContent = `Local: ${activeUserName || 'Guest'} • ${roleLabel}`;
  if (activeUserAvatar) {
    activeUserAvatar.src = getAvatarDataUri(activeUserName || 'Guest', role);
    activeUserAvatar.alt = `${activeUserName || 'Guest'} avatar`;
  }
  applyRoleBasedView();
}

function getAvatarDataUri(name, role) {
  const label = encodeURIComponent((name || 'Guest').slice(0, 1).toUpperCase());
  const isMentor = role === 'mentor';
  const bg = isMentor ? '#2563eb' : role === 'student' ? '#0ea5e9' : '#64748b';
  const icon = isMentor ? 'M' : role === 'student' ? 'S' : 'G';
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${bg}'/>
          <stop offset='100%' stop-color='#111827'/>
        </linearGradient>
      </defs>
      <rect width='64' height='64' rx='32' fill='url(#g)'/>
      <circle cx='32' cy='24' r='11' fill='#ffffff' fill-opacity='0.94'/>
      <path d='M14 56c3-11 13-16 18-16s15 5 18 16' fill='#ffffff' fill-opacity='0.94'/>
      <text x='49' y='18' font-size='11' font-family='Arial, sans-serif' fill='#ffffff' text-anchor='middle'>${icon}</text>
      <text x='49' y='52' font-size='10' font-family='Arial, sans-serif' fill='#ffffff' text-anchor='middle'>${decodeURIComponent(label)}</text>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function getActiveMember() {
  const target = (activeUserName || '').toLowerCase();
  return communityMembers.find((m) => m.name.toLowerCase() === target);
}

function getActiveRole() {
  const member = getActiveMember();
  return member?.role || 'student';
}

function applyRoleBasedView() {
  const isMentor = getActiveRole() === 'mentor';

  if (instituteNavBtn) instituteNavBtn.style.display = isMentor ? '' : 'none';
  if (communityRoleHintEl) {
    communityRoleHintEl.textContent = isMentor
      ? 'Mentor mode: You can add members, assign challenges, and review cohort health.'
      : 'Student mode: You can view group progress and close your own assigned challenges.';
  }
  if (instituteRoleHintEl) {
    instituteRoleHintEl.textContent = isMentor
      ? 'Mentor mode: Cohort-wide analytics unlocked.'
      : 'Student mode: Personal institute snapshot only.';
  }

  if (addMemberBtn) addMemberBtn.disabled = !isMentor;
  if (assignChallengeBtn) assignChallengeBtn.disabled = !isMentor;
  if (memberNameInput) memberNameInput.disabled = !isMentor;
  if (memberRoleInput) memberRoleInput.disabled = !isMentor;
  if (challengeMemberSelect) challengeMemberSelect.disabled = !isMentor;
  if (challengeTitleInput) challengeTitleInput.disabled = !isMentor;

  const institutePanelActive = document.getElementById('institute')?.classList.contains('active');
  if (!isMentor && institutePanelActive) switchTab('community');
}

function switchActiveUser() {
  const options = communityMembers.map((m) => m.name);
  const hint = options.length > 0 ? `Available: ${options.join(', ')}` : 'No members yet. Add members in Community tab.';
  const next = prompt(`Switch local user. ${hint}`, activeUserName || userProfile.name || 'Guest');
  if (!next) return;
  activeUserName = next.trim();
  if (!activeUserName) return;

  if (!communityMembers.some((m) => m.name.toLowerCase() === activeUserName.toLowerCase())) {
    communityMembers.push({
      id: Date.now(),
      name: activeUserName,
      role: 'student',
      uid: '',
      completionRate: 0,
      riskLevel: 'low',
      joinedAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.members, JSON.stringify(communityMembers));
  }

  localStorage.setItem(STORAGE_KEYS.activeUser, activeUserName);
  renderCommunitySection();
  renderInstituteSection();
  updateActiveUserUI();
  showToast(`👤 Switched to ${activeUserName}`);
}

function addCommunityMember() {
  if (getActiveRole() !== 'mentor') {
    showToast('🔒 Only mentors can add members');
    return;
  }

  const name = memberNameInput?.value.trim();
  const role = memberRoleInput?.value || 'student';
  if (!name) {
    showToast('⚠️ Member name required');
    return;
  }
  if (communityMembers.some((m) => m.name.toLowerCase() === name.toLowerCase())) {
    showToast('⚠️ Member already exists');
    return;
  }

  communityMembers.push({
    id: Date.now(),
    name,
    role,
    uid: '',
    completionRate: Math.max(15, Math.min(95, Math.round((tasks.filter((t) => t.status === 'done').length / Math.max(1, tasks.length)) * 100))),
    riskLevel: Math.random() > 0.7 ? 'medium' : 'low',
    joinedAt: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEYS.members, JSON.stringify(communityMembers));
  memberNameInput.value = '';
  renderCommunitySection();
  renderInstituteSection();
  showToast('➕ Community member added');
}

function assignCommunityChallenge() {
  if (getActiveRole() !== 'mentor') {
    showToast('🔒 Only mentors can assign challenges');
    return;
  }

  const member = challengeMemberSelect?.value;
  const title = challengeTitleInput?.value.trim();
  if (!member || !title) {
    showToast('⚠️ Select member and challenge title');
    return;
  }

  communityChallenges.unshift({
    id: Date.now(),
    member,
    title,
    status: 'open',
    createdAt: new Date().toISOString()
  });

  localStorage.setItem(STORAGE_KEYS.challenges, JSON.stringify(communityChallenges));
  challengeTitleInput.value = '';
  renderCommunitySection();
  renderInstituteSection();
  showToast('🎯 Challenge assigned');
}

function renderCommunitySection() {
  applyRoleBasedView();

  if (challengeMemberSelect) {
    const options = communityMembers.map((m) => `<option value="${escapeHTML(m.name)}">${escapeHTML(m.name)} (${escapeHTML(m.role)})</option>`).join('');
    challengeMemberSelect.innerHTML = options || '<option value="">No members</option>';
  }

  if (communityMembersEl) {
    if (communityMembers.length === 0) {
      communityMembersEl.innerHTML = '<div class="community-item">No members yet. Add one to start local collaboration.</div>';
    } else {
      communityMembersEl.innerHTML = communityMembers.map((m) => {
        const avatar = getAvatarDataUri(m.name, m.role);
        return `<div class="community-item"><div class="community-item-head"><img class="community-avatar" src="${avatar}" alt="${escapeHTML(m.name)} avatar"><div class="community-item-title">${escapeHTML(m.name)} <span class="community-item-meta">(${escapeHTML(m.role)})</span></div></div><div class="community-item-meta">Completion: ${m.completionRate || 0}% | Risk: ${escapeHTML((m.riskLevel || 'low').toUpperCase())}</div></div>`;
      }).join('');
    }
  }

  if (communityChallengesEl) {
    if (communityChallenges.length === 0) {
      communityChallengesEl.innerHTML = '<div class="community-item">No challenges assigned yet.</div>';
    } else {
      communityChallengesEl.innerHTML = communityChallenges.slice(0, 12).map((c) => {
        const canClose = c.status !== 'closed' && (getActiveRole() === 'mentor' || (activeUserName || '').toLowerCase() === c.member.toLowerCase());
        return `<div class="community-item"><div class="community-item-title">${escapeHTML(c.title)}</div><div class="community-item-meta">Assigned to ${escapeHTML(c.member)} · ${new Date(c.createdAt).toLocaleDateString()} · ${escapeHTML(c.status.toUpperCase())}</div>${canClose ? `<div class="community-item-actions"><button class="btn btn-secondary close-challenge-btn" data-id="${c.id}">✅ Close</button></div>` : ''}</div>`;
      }).join('');

      communityChallengesEl.querySelectorAll('.close-challenge-btn').forEach((btn) => {
        btn.addEventListener('click', () => closeCommunityChallenge(Number(btn.dataset.id)));
      });
    }
  }
}

function closeCommunityChallenge(challengeId) {
  const idx = communityChallenges.findIndex((c) => c.id === challengeId);
  if (idx < 0) return;
  const challenge = communityChallenges[idx];
  const canClose = getActiveRole() === 'mentor' || (activeUserName || '').toLowerCase() === challenge.member.toLowerCase();
  if (!canClose) {
    showToast('🔒 You can only close your own challenges');
    return;
  }

  communityChallenges[idx] = { ...challenge, status: 'closed', closedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEYS.challenges, JSON.stringify(communityChallenges));
  renderCommunitySection();
  renderInstituteSection();
  showToast('✅ Challenge closed');
}

function renderInstituteSection() {
  const isMentor = getActiveRole() === 'mentor';
  const learners = communityMembers.filter((m) => m.role === 'student');
  const activeMember = getActiveMember();

  const avgCompletion = isMentor
    ? (learners.length ? Math.round(learners.reduce((acc, m) => acc + (m.completionRate || 0), 0) / learners.length) : 0)
    : (activeMember?.completionRate || 0);
  const riskCount = isMentor
    ? learners.filter((m) => (m.riskLevel || 'low') !== 'low').length
    : ((activeMember?.riskLevel || 'low') === 'low' ? 0 : 1);
  const closedChallenges = isMentor
    ? communityChallenges.filter((c) => c.status === 'closed').length
    : communityChallenges.filter((c) => c.status === 'closed' && c.member.toLowerCase() === (activeUserName || '').toLowerCase()).length;

  if (instActiveLearnersEl) instActiveLearnersEl.textContent = isMentor ? learners.length : (activeMember ? 1 : 0);
  if (instRiskLearnersEl) instRiskLearnersEl.textContent = riskCount;
  if (instAvgCompletionEl) instAvgCompletionEl.textContent = `${avgCompletion}%`;
  if (instChallengeClosedEl) instChallengeClosedEl.textContent = closedChallenges;

  if (instituteRankingEl) {
    if (!isMentor && !activeMember) {
      instituteRankingEl.innerHTML = '<div class="community-item">No personal data available for current user.</div>';
    } else if (learners.length === 0) {
      instituteRankingEl.innerHTML = '<div class="community-item">No learner data yet.</div>';
    } else {
      const ranking = isMentor ? [...learners].sort((a, b) => (b.completionRate || 0) - (a.completionRate || 0)) : [activeMember];
      instituteRankingEl.innerHTML = ranking.map((m, idx) => {
        const rankLabel = isMentor ? `#${idx + 1}` : 'You';
        return `<div class="community-item"><div class="community-item-title">${rankLabel} ${escapeHTML(m.name)}</div><div class="community-item-meta">Completion ${m.completionRate || 0}% · Risk ${(m.riskLevel || 'low').toUpperCase()}</div></div>`;
      }).join('');
    }
  }
}

function updateCommandCenter() {
  const now = new Date();
  const openTasks = tasks.filter(t => t.status !== 'done');
  const overdue = openTasks.filter(t => new Date(t.due) < now).length;
  const highPriorityOpen = openTasks.filter(t => t.priority === 'high').length;
  const done = tasks.filter(t => t.status === 'done').length;
  const completionRate = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  let riskLabel = 'Low';
  let riskReason = 'Great momentum. Keep current pace.';
  if (overdue > 3 || completionRate < 30) {
    riskLabel = 'High';
    riskReason = `You have ${overdue} overdue tasks and low completion. Start recovery mode.`;
  } else if (overdue > 0 || highPriorityOpen > 2 || completionRate < 55) {
    riskLabel = 'Medium';
    riskReason = `Open pressure detected (${highPriorityOpen} high-priority pending).`;
  }

  const consistency = Math.min(100, Math.max(0, Math.round(completionRate * 0.7 + (tasks.length > 0 ? 30 : 0) - overdue * 8)));
  const recommendation = getFocusRecommendation(overdue, highPriorityOpen, completionRate);

  if (riskScoreEl) riskScoreEl.textContent = riskLabel;
  if (riskNoteEl) riskNoteEl.textContent = riskReason;
  if (consistencyScoreEl) consistencyScoreEl.textContent = `${consistency}/100`;
  if (consistencyNoteEl) consistencyNoteEl.textContent = consistency >= 70 ? 'Consistency trend is healthy.' : 'Consistency can improve with daily blocks.';
  if (focusRecommendationEl) focusRecommendationEl.textContent = recommendation;

  renderPerformanceSignals({ overdue, highPriorityOpen, completionRate, consistency, done });
}

function getFocusRecommendation(overdue, highPriorityOpen, completionRate) {
  if (overdue > 0) return 'Clear 1 overdue task in the next 45 minutes.';
  if (highPriorityOpen > 0) return 'Finish one high-priority task before starting low-priority work.';
  if (completionRate < 60) return 'Use two Pomodoro cycles and complete quick wins first.';
  return 'Protect deep work time and maintain your current cadence.';
}

function renderPerformanceSignals(metrics) {
  if (!performanceSignalsEl) return;
  const lines = [
    `Completion rate: ${metrics.completionRate}% (${metrics.done}/${tasks.length || 0} tasks done).`,
    `Overdue tasks: ${metrics.overdue}.`,
    `High-priority pending: ${metrics.highPriorityOpen}.`,
    `Consistency score: ${metrics.consistency}/100.`
  ];
  performanceSignalsEl.innerHTML = lines.map((line) => `<div class="signal-item">${escapeHTML(line)}</div>`).join('');
}

function generateSmartPlan() {
  const targetDate = planExamDate?.value;
  const weeklyHours = Number(planWeeklyHours?.value || 0);
  const topicText = planTopics?.value.trim() || '';

  if (!targetDate || weeklyHours < 1 || !topicText) {
    showToast('⚠️ Add target date, weekly hours, and topics');
    return;
  }

  const topics = topicText.split(',').map((topic) => topic.trim()).filter(Boolean);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exam = new Date(targetDate);
  const daysLeft = Math.max(1, Math.ceil((exam - today) / (1000 * 60 * 60 * 24)));
  const sessionsPerWeek = Math.max(3, Math.round(weeklyHours / 2));
  const totalSessions = Math.min(24, Math.max(topics.length * 2, Math.round((daysLeft / 7) * sessionsPerWeek)));

  smartPlanDraft = Array.from({ length: totalSessions }, (_, index) => {
    const topic = topics[index % topics.length];
    const dueOffset = Math.min(daysLeft, Math.floor((index / totalSessions) * daysLeft));
    return {
      id: Date.now() + index,
      title: `AI Plan: ${topic} Session ${Math.floor(index / topics.length) + 1}`,
      desc: `Targeted ${Math.ceil((weeklyHours * 60) / sessionsPerWeek)}-minute block for ${topic}.`,
      due: formatDateOffset(dueOffset),
      priority: index < Math.ceil(totalSessions * 0.35) ? 'high' : index < Math.ceil(totalSessions * 0.75) ? 'normal' : 'low',
      status: 'todo',
      completed: false,
      createdAt: new Date().toISOString()
    };
  });

  renderSmartPlanOutput();
}

function renderSmartPlanOutput() {
  if (!smartPlanOutput) return;
  if (smartPlanDraft.length === 0) {
    smartPlanOutput.innerHTML = '<div style="color: var(--text-secondary);">No smart plan yet. Generate one to preview actionable sessions.</div>';
    return;
  }

  const previewItems = smartPlanDraft.slice(0, 8).map((item) => {
    return `<li class="plan-item"><strong>${escapeHTML(item.title)}</strong><br><span>${escapeHTML(item.desc)}</span><br><small>Due: ${item.due}</small></li>`;
  }).join('');

  smartPlanOutput.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:0.8em;margin-bottom:0.8em;flex-wrap:wrap;">
      <strong>${smartPlanDraft.length} sessions generated</strong>
      <button id="add-plan-to-board-btn" type="button" class="btn btn-secondary">➕ Add Plan To Board</button>
    </div>
    <ul class="plan-list">${previewItems}</ul>
  `;

  document.getElementById('add-plan-to-board-btn')?.addEventListener('click', () => {
    const sessionCount = smartPlanDraft.length;
    tasks = [...tasks, ...smartPlanDraft];
    saveTasks();
    renderAllUI();
    smartPlanDraft = [];
    renderSmartPlanOutput();
    showToast('⚡ Smart plan added to task board');
    trackInteraction('smart_plan_added', { sessions: sessionCount });
  });
}

function ensureCoachWelcome() {
  if (!coachMessages) return;
  if (coachHistory.length > 0) return;

  const person = userProfile.name ? ` ${userProfile.name}` : '';
  const intro = `Hi${person}, I am your AI Coach. I can help with planning, recovery, and focus routines based on your live task board.`;
  addCoachMessage('assistant', intro);
}

function addCoachMessage(role, content) {
  if (!coachMessages) return;
  const message = { role, content, timestamp: Date.now() };
  coachHistory.push(message);
  const bubble = document.createElement('div');
  bubble.className = `coach-msg ${role}`;
  bubble.textContent = content;
  coachMessages.appendChild(bubble);
  coachMessages.scrollTop = coachMessages.scrollHeight;
}

function sendCoachMessage() {
  const text = coachInput?.value.trim();
  if (!text) return;

  addCoachMessage('user', text);
  if (coachInput) coachInput.value = '';

  const reply = generateCoachReply(text);
  setTimeout(() => addCoachMessage('assistant', reply), 240);
  trackInteraction('coach_message', { length: text.length });
}

function generateCoachReply(prompt) {
  const q = prompt.toLowerCase();
  const openTasks = tasks.filter(t => t.status !== 'done');
  const overdueTasks = openTasks.filter(t => new Date(t.due) < new Date());
  const highTasks = openTasks.filter(t => t.priority === 'high');
  const completionRate = tasks.length ? Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100) : 0;

  if (q.includes('risk')) {
    return `Risk scan: ${overdueTasks.length} overdue tasks, ${highTasks.length} high-priority pending, ${completionRate}% completion. Recommendation: close one overdue task first, then one high-priority task.`;
  }
  if (q.includes('recovery')) {
    return 'Recovery mode (15 min): 5 min pick one smallest overdue task, 7 min focused execution, 3 min update next action in board. Repeat 2 cycles.';
  }
  if (q.includes('motivate')) {
    return `You already completed ${tasks.filter(t => t.status === 'done').length} tasks. Keep momentum: finish one meaningful task now, then take a 5-minute break.`;
  }
  if (q.includes('plan') || q.includes('day')) {
    const top = highTasks.slice(0, 3).map((t, i) => `${i + 1}) ${t.title}`).join(' | ');
    return top ? `Suggested focus order: ${top}. Work in 40-10 cycles with zero context switching.` : 'No high-priority tasks found. Create 1 strategic task and 2 quick wins to structure your day.';
  }
  if (q.includes('revision') || q.includes('weekly')) {
    return 'Weekly revision template: Mon/Wed/Fri concept review, Tue/Thu problem solving, Sat mock test, Sun retrospective + gap fix.';
  }

  const goal = userProfile.goal ? ` aligned with your goal (${userProfile.goal})` : '';
  return `Here is a practical next step${goal}: complete one high-impact task before checking analytics again. Ask me for "risk", "recovery", or "plan my day" for targeted guidance.`;
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
  refreshAdaptiveNudge(false);
  renderAdaptiveNudge();
  renderExperimentInsights();
  renderCommunitySection();
  renderInstituteSection();
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


