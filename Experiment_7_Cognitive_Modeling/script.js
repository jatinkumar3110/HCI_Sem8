const operatorTimes = {
    K: 0.28,
    P: 1.1,
    H: 0.4,
    M: 1.35,
    R: 1.0
};

const opList = document.getElementById('opList');
const operatorSelect = document.getElementById('operatorSelect');
const operatorNote = document.getElementById('operatorNote');
const totalTimeEl = document.getElementById('totalTime');
const totalOpsEl = document.getElementById('totalOps');
const predictedTime = document.getElementById('predictedTime');
const taskSelect = document.getElementById('taskSelect');
const taskName = document.getElementById('taskName');
const summaryOutput = document.getElementById('summaryOutput');
const efficiencyBadge = document.getElementById('efficiencyBadge');
const operatorDesc = document.getElementById('operatorDesc');
const sampleSelect = document.getElementById('sampleSelect');
const applySampleBtn = document.getElementById('applySampleBtn');

const calcBtn = document.getElementById('calcBtn');
const resetBtn = document.getElementById('resetBtn');
const addOpBtn = document.getElementById('addOpBtn');
const removeLastBtn = document.getElementById('removeLastBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const reportBtn = document.getElementById('reportBtn');
const copyBtn = document.getElementById('copyBtn');

let operators = [];

const operatorDescriptions = {
    K: 'Keystroke (typing or pressing a key).',
    P: 'Pointing (move cursor to a target).',
    H: 'Homing (hand moves between mouse and keyboard).',
    M: 'Mental preparation (decide or think).',
    R: 'System response (waiting time).'
};

const samplePresets = {
    renameFile: {
        task: 'Rename a file',
        operators: [
            { op: 'M', note: 'Decide to rename' },
            { op: 'P', note: 'Point to file' },
            { op: 'K', note: 'Single click' },
            { op: 'H', note: 'Move hand to keyboard' },
            { op: 'K', note: 'Press F2' },
            { op: 'K', note: 'Type new name' },
            { op: 'K', note: 'Press Enter' }
        ],
        goms: {
            goal: 'Rename a file in a file manager.',
            ops: 'Select file, press F2, type new name, press Enter.',
            methods: 'Method A: Use keyboard shortcut. Method B: Right-click > Rename.',
            rules: 'If hands are on keyboard, use F2; otherwise use context menu.'
        },
        notes: 'Most time is spent in pointing and mental preparation.',
        suggestions: 'Add a rename icon and inline edit to reduce homing.'
    },
    deleteMessage: {
        task: 'Delete a message',
        operators: [
            { op: 'M', note: 'Decide to delete' },
            { op: 'P', note: 'Point to message' },
            { op: 'K', note: 'Click message' },
            { op: 'P', note: 'Point to delete' },
            { op: 'K', note: 'Click delete' },
            { op: 'R', note: 'System update' }
        ],
        goms: {
            goal: 'Delete an email from inbox.',
            ops: 'Select message, press Delete button, confirm.',
            methods: 'Method A: Click delete icon. Method B: Press keyboard Delete.',
            rules: 'If using keyboard, press Delete; else use toolbar icon.'
        },
        notes: 'Pointing dominates. Efficiency improves with keyboard shortcuts.',
        suggestions: 'Highlight keyboard shortcut tooltip next to delete icon.'
    },
    sendEmail: {
        task: 'Send an email',
        operators: [
            { op: 'M', note: 'Compose intent' },
            { op: 'K', note: 'Open compose' },
            { op: 'K', note: 'Type recipient' },
            { op: 'K', note: 'Type subject' },
            { op: 'K', note: 'Type message' },
            { op: 'P', note: 'Point to Send' },
            { op: 'K', note: 'Click Send' },
            { op: 'R', note: 'Send confirmation' }
        ],
        goms: {
            goal: 'Send a short email using compose window.',
            ops: 'Open compose, fill To, Subject, Body, click Send.',
            methods: 'Method A: Mouse for Send. Method B: Use Ctrl+Enter shortcut.',
            rules: 'If proficient, use keyboard shortcut to reduce pointing.'
        },
        notes: 'Typing is the main component; send action can be shortened.',
        suggestions: 'Support Ctrl+Enter to reduce pointing and homing.'
    },
    uploadDocument: {
        task: 'Upload a document',
        operators: [
            { op: 'M', note: 'Decide to upload' },
            { op: 'P', note: 'Point to upload button' },
            { op: 'K', note: 'Click upload' },
            { op: 'R', note: 'File dialog opens' },
            { op: 'H', note: 'Move hand to keyboard' },
            { op: 'K', note: 'Type file name' },
            { op: 'K', note: 'Press Enter' },
            { op: 'R', note: 'Upload completes' }
        ],
        goms: {
            goal: 'Upload a document to the portal.',
            ops: 'Click upload, select file, confirm, wait for upload.',
            methods: 'Method A: Use upload button. Method B: Drag-and-drop file.',
            rules: 'If drag-and-drop is available, use it to reduce steps.'
        },
        notes: 'Dialog navigation and system response time are the main delays.',
        suggestions: 'Add drag-and-drop and recent files list to speed selection.'
    },
    createNote: {
        task: 'Create a note',
        operators: [
            { op: 'M', note: 'Decide to create note' },
            { op: 'P', note: 'Point to add note' },
            { op: 'K', note: 'Click add note' },
            { op: 'K', note: 'Type title' },
            { op: 'K', note: 'Type body' },
            { op: 'P', note: 'Point to Save' },
            { op: 'K', note: 'Click Save' }
        ],
        goms: {
            goal: 'Create a new note in the app.',
            ops: 'Open add note, type content, save note.',
            methods: 'Method A: Click add button. Method B: Use keyboard shortcut.',
            rules: 'If shortcut is known, use it to reduce pointing.'
        },
        notes: 'Typing dominates; save action can be streamlined.',
        suggestions: 'Auto-save drafts and add keyboard shortcut for new note.'
    }
};

function addOperator() {
    const op = operatorSelect.value;
    operators.push({
        op,
        note: operatorNote.value.trim()
    });
    operatorNote.value = '';
    renderList();
    updateTotals();
}

function removeLast() {
    operators.pop();
    renderList();
    updateTotals();
}

function clearAll() {
    operators = [];
    renderList();
    updateTotals();
}

function renderList() {
    if (operators.length === 0) {
        opList.innerHTML = '<div class="op-item">No operators added yet.</div>';
        return;
    }

    opList.innerHTML = operators.map((item, index) => {
        const time = operatorTimes[item.op];
        const note = item.note ? ` - ${item.note}` : '';
        return `
            <div class="op-item">
                <div>#${index + 1} ${item.op}${note}</div>
                <span>${time.toFixed(2)}s</span>
            </div>
        `;
    }).join('');
}

function updateTotals() {
    const total = operators.reduce((sum, item) => sum + operatorTimes[item.op], 0);
    totalTimeEl.textContent = `${total.toFixed(2)}s`;
    totalOpsEl.textContent = operators.length.toString();
    predictedTime.value = `${total.toFixed(2)} seconds`;
    updateEfficiency(total);
    totalTimeEl.classList.remove('pulse');
    void totalTimeEl.offsetWidth;
    totalTimeEl.classList.add('pulse');
}

function updateEfficiency(total) {
    if (operators.length === 0) {
        efficiencyBadge.textContent = '--';
        efficiencyBadge.className = '';
        return;
    }

    if (total <= 6) {
        efficiencyBadge.textContent = 'Efficient';
        efficiencyBadge.className = 'badge-good';
    } else if (total <= 10) {
        efficiencyBadge.textContent = 'Moderate';
        efficiencyBadge.className = 'badge-warn';
    } else {
        efficiencyBadge.textContent = 'Inefficient';
        efficiencyBadge.className = 'badge-bad';
    }
}

function generateSummary() {
    const task = taskName.value.trim() || taskSelect.value;
    const total = operators.reduce((sum, item) => sum + operatorTimes[item.op], 0);
    const efficiencyNotes = document.getElementById('efficiencyNotes').value.trim() || 'No notes recorded.';
    const suggestionNotes = document.getElementById('suggestionNotes').value.trim() || 'No suggestions recorded.';

    if (operators.length === 0) {
        alert('Please add at least one KLM operator before generating the summary.');
        return;
    }

    let summary = `Experiment No 7: Create a cognitive model to analyze user efficiency\n`;
    summary += `Task: ${task}\n`;
    summary += `Model Used: KLM\n`;
    summary += `Estimated Completion Time: ${total.toFixed(2)} seconds\n\n`;
    summary += `Operator Sequence:\n`;
    operators.forEach((item, index) => {
        const note = item.note ? ` (${item.note})` : '';
        summary += `  ${index + 1}. ${item.op}${note} - ${operatorTimes[item.op].toFixed(2)}s\n`;
    });

    summary += `\nEfficiency Notes:\n${efficiencyNotes}\n\n`;
    summary += `Improvement Suggestions:\n${suggestionNotes}\n`;

    summaryOutput.value = summary;
}

function copySummary() {
    if (!summaryOutput.value.trim()) {
        generateSummary();
    }
    navigator.clipboard.writeText(summaryOutput.value);
    copyBtn.textContent = 'Copied';
    setTimeout(() => (copyBtn.textContent = 'Copy Summary'), 1500);
}

function resetModel() {
    taskName.value = '';
    operators = [];
    document.getElementById('gomsGoal').value = '';
    document.getElementById('gomsOps').value = '';
    document.getElementById('gomsMethods').value = '';
    document.getElementById('gomsRules').value = '';
    document.getElementById('efficiencyNotes').value = '';
    document.getElementById('suggestionNotes').value = '';
    summaryOutput.value = '';
    renderList();
    updateTotals();
}

function applySample() {
    const key = sampleSelect.value;
    if (!key || !samplePresets[key]) return;

    const sample = samplePresets[key];
    taskSelect.value = sample.task;
    taskName.value = '';
    operators = [...sample.operators];

    document.getElementById('gomsGoal').value = sample.goms.goal;
    document.getElementById('gomsOps').value = sample.goms.ops;
    document.getElementById('gomsMethods').value = sample.goms.methods;
    document.getElementById('gomsRules').value = sample.goms.rules;
    document.getElementById('efficiencyNotes').value = sample.notes;
    document.getElementById('suggestionNotes').value = sample.suggestions;

    renderList();
    updateTotals();
}

function updateOperatorDescription() {
    const op = operatorSelect.value;
    operatorDesc.textContent = `${op}: ${operatorDescriptions[op]}`;
}

addOpBtn.addEventListener('click', addOperator);
removeLastBtn.addEventListener('click', removeLast);
clearAllBtn.addEventListener('click', clearAll);
calcBtn.addEventListener('click', updateTotals);
resetBtn.addEventListener('click', resetModel);
reportBtn.addEventListener('click', generateSummary);
copyBtn.addEventListener('click', copySummary);
applySampleBtn.addEventListener('click', applySample);
operatorSelect.addEventListener('change', updateOperatorDescription);

renderList();
updateTotals();
updateOperatorDescription();
