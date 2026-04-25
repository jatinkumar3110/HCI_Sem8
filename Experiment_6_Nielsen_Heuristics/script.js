const heuristics = [
    {
        id: 'h1',
        title: 'Visibility of system status',
        hint: 'Does the system keep users informed about what is going on?'
    },
    {
        id: 'h2',
        title: 'Match between system and real world',
        hint: 'Use familiar language and concepts.'
    },
    {
        id: 'h3',
        title: 'User control and freedom',
        hint: 'Are there undo or exit options?'
    },
    {
        id: 'h4',
        title: 'Consistency and standards',
        hint: 'Are terms and actions consistent?'
    },
    {
        id: 'h5',
        title: 'Error prevention',
        hint: 'Prevent problems before they occur.'
    },
    {
        id: 'h6',
        title: 'Recognition rather than recall',
        hint: 'Make options and actions visible.'
    },
    {
        id: 'h7',
        title: 'Flexibility and efficiency of use',
        hint: 'Support shortcuts for expert users.'
    },
    {
        id: 'h8',
        title: 'Aesthetic and minimalist design',
        hint: 'Remove irrelevant or rarely needed info.'
    },
    {
        id: 'h9',
        title: 'Help users recognize, diagnose, recover',
        hint: 'Clear error messages and recovery steps.'
    },
    {
        id: 'h10',
        title: 'Help and documentation',
        hint: 'Provide accessible guidance when needed.'
    }
];

const samplePresets = {
    collegePortal: {
        system: 'College Portal',
        evaluator: 'Jatin Kumar',
        entries: [
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Loading spinner not shown after form submission; users are unsure if the request went through.',
                suggestion: 'Show a visible progress indicator with a success message when the request completes.'
            },
            {
                status: 'needs',
                severity: 'low',
                issue: 'Academic terms like "AR" and "FA" are used without explanation.',
                suggestion: 'Replace acronyms with full labels or add inline tooltips.'
            },
            {
                status: 'needs',
                severity: 'high',
                issue: 'No undo after dropping a course; navigation resets to dashboard.',
                suggestion: 'Provide an undo option or confirmation dialog with a back link.'
            },
            {
                status: 'ok',
                severity: 'low',
                issue: '',
                suggestion: 'Maintain consistent button labels across modules.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Form allows empty submissions for certain requests.',
                suggestion: 'Add required-field validation before submission.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Users must remember the section code from a previous page.',
                suggestion: 'Display section details while registering or provide a quick lookup panel.'
            },
            {
                status: 'needs',
                severity: 'low',
                issue: 'No keyboard shortcut for common tasks like semester registration.',
                suggestion: 'Add quick actions or shortcut links on the dashboard.'
            },
            {
                status: 'ok',
                severity: 'low',
                issue: '',
                suggestion: 'Keep the layout clean by grouping related widgets.'
            },
            {
                status: 'needs',
                severity: 'high',
                issue: 'Error messages are generic ("Something went wrong").',
                suggestion: 'Provide actionable error text and recovery steps.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Help section is hidden under multiple menus.',
                suggestion: 'Add a visible help link in the header.'
            }
        ]
    },
    emailClient: {
        system: 'Email Client',
        evaluator: 'Jatin Kumar',
        entries: [
            {
                status: 'needs',
                severity: 'medium',
                issue: 'No clear send progress indicator for large attachments.',
                suggestion: 'Show upload progress and a queued status label.'
            },
            {
                status: 'ok',
                severity: 'low',
                issue: '',
                suggestion: 'Use familiar labels like Inbox, Sent, Drafts.'
            },
            {
                status: 'needs',
                severity: 'high',
                issue: 'Accidental delete has no undo or trash recovery prompt.',
                suggestion: 'Add undo snackbar and move items to Trash by default.'
            },
            {
                status: 'needs',
                severity: 'low',
                issue: 'Different icons used for the same action across screens.',
                suggestion: 'Standardize iconography and button labels.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Send button is enabled even when recipient is empty.',
                suggestion: 'Disable Send until required fields are filled.'
            },
            {
                status: 'ok',
                severity: 'low',
                issue: '',
                suggestion: 'Use visible recipient chips to reduce memory load.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'No keyboard shortcuts for power users in compose view.',
                suggestion: 'Add shortcuts for send, archive, and search.'
            },
            {
                status: 'ok',
                severity: 'low',
                issue: '',
                suggestion: 'Keep layout minimal with focused reading pane.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Error message for failed send does not explain next steps.',
                suggestion: 'Add retry action and display the reason for failure.'
            },
            {
                status: 'needs',
                severity: 'low',
                issue: 'Help content is hidden in settings.',
                suggestion: 'Provide a visible help link near the compose area.'
            }
        ]
    },
    foodDelivery: {
        system: 'Food Delivery App',
        evaluator: 'Jatin Kumar',
        entries: [
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Order status refresh is slow and lacks timestamps.',
                suggestion: 'Show live tracking with time-stamped updates.'
            },
            {
                status: 'ok',
                severity: 'low',
                issue: '',
                suggestion: 'Use familiar terms like Cart, Checkout, Delivery.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Cannot cancel after ordering without contacting support.',
                suggestion: 'Allow cancellation within a short grace period.'
            },
            {
                status: 'needs',
                severity: 'low',
                issue: 'Discount labels are inconsistent across restaurants.',
                suggestion: 'Apply the same promotional badge style everywhere.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Checkout allows missing delivery instructions.',
                suggestion: 'Add optional prompts and confirmation for address.'
            },
            {
                status: 'needs',
                severity: 'low',
                issue: 'Users must remember coupon codes from previous screens.',
                suggestion: 'Auto-suggest available coupons at checkout.'
            },
            {
                status: 'needs',
                severity: 'low',
                issue: 'No quick reorder shortcut for frequent items.',
                suggestion: 'Add reorder buttons in order history.'
            },
            {
                status: 'ok',
                severity: 'low',
                issue: '',
                suggestion: 'Keep the menu list clean and categorized.'
            },
            {
                status: 'needs',
                severity: 'high',
                issue: 'Payment failure message is generic and blocks checkout.',
                suggestion: 'Provide clear error reason and retry options.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Help is buried inside profile settings.',
                suggestion: 'Add help access on the order status screen.'
            }
        ]
    },
    bankingApp: {
        system: 'Banking App',
        evaluator: 'Jatin Kumar',
        entries: [
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Balance refresh is slow and unclear after transfers.',
                suggestion: 'Show immediate pending status with last-updated time.'
            },
            {
                status: 'ok',
                severity: 'low',
                issue: '',
                suggestion: 'Use common labels like Transfer, Pay Bills, Statements.'
            },
            {
                status: 'needs',
                severity: 'high',
                issue: 'No undo or cancel option for scheduled transfers.',
                suggestion: 'Add a cancel/undo option in pending transfers list.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Inconsistent button placement between Accounts and Cards.',
                suggestion: 'Standardize primary action placement across tabs.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Transfer form allows invalid account numbers without prompt.',
                suggestion: 'Validate account numbers before submission.'
            },
            {
                status: 'needs',
                severity: 'low',
                issue: 'Users must remember last biller reference numbers.',
                suggestion: 'Show recent biller references inline in the form.'
            },
            {
                status: 'needs',
                severity: 'low',
                issue: 'No quick action shortcuts for frequent payees.',
                suggestion: 'Add favorite payee shortcuts on the dashboard.'
            },
            {
                status: 'ok',
                severity: 'low',
                issue: '',
                suggestion: 'Keep transaction list clean with filters.'
            },
            {
                status: 'needs',
                severity: 'high',
                issue: 'Error messages do not explain transfer failures.',
                suggestion: 'Provide clear error reason and retry steps.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Help is buried inside settings.',
                suggestion: 'Add a help icon on transfer and payment screens.'
            }
        ]
    },
    learningLms: {
        system: 'Learning LMS',
        evaluator: 'Jatin Kumar',
        entries: [
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Assignment upload status is not visible after submit.',
                suggestion: 'Show upload progress and submission confirmation.'
            },
            {
                status: 'ok',
                severity: 'low',
                issue: '',
                suggestion: 'Use familiar terms like Modules, Grades, Assignments.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'No back navigation from quiz review page.',
                suggestion: 'Add a clear back or exit button with confirmation.'
            },
            {
                status: 'needs',
                severity: 'low',
                issue: 'Inconsistent icons between course and dashboard pages.',
                suggestion: 'Standardize icon and color usage across screens.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Submission form accepts empty comments without prompt.',
                suggestion: 'Add optional prompts or validation hints.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Students must recall quiz deadlines from announcements.',
                suggestion: 'Show upcoming deadlines in a persistent sidebar.'
            },
            {
                status: 'needs',
                severity: 'low',
                issue: 'No keyboard shortcuts for navigation.',
                suggestion: 'Add quick navigation shortcuts for power users.'
            },
            {
                status: 'ok',
                severity: 'low',
                issue: '',
                suggestion: 'Keep course homepage minimal with grouped content.'
            },
            {
                status: 'needs',
                severity: 'high',
                issue: 'Generic error on quiz submission failures.',
                suggestion: 'Provide cause and recovery steps for failed submissions.'
            },
            {
                status: 'needs',
                severity: 'medium',
                issue: 'Help documentation is hard to find.',
                suggestion: 'Add a help link near the top navigation.'
            }
        ]
    }
};

const grid = document.getElementById('heuristicGrid');
const issueCount = document.getElementById('issueCount');
const okCount = document.getElementById('okCount');
const needsCount = document.getElementById('needsCount');
const totalCount = document.getElementById('totalCount');

const reportOutput = document.getElementById('reportOutput');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const sampleSelect = document.getElementById('sampleSelect');
const applySampleBtn = document.getElementById('applySampleBtn');
const usabilityScore = document.getElementById('usabilityScore');
const maturityLevel = document.getElementById('maturityLevel');

function createCard(heuristic, index) {
    const card = document.createElement('div');
    card.className = 'heuristic-card';
    card.dataset.index = index.toString();
    card.innerHTML = `
        <div class="card-header">
            <div class="card-title">
                <h3>${index + 1}. ${heuristic.title}</h3>
                <button class="info-icon" type="button" aria-label="Heuristic info" data-tip="${heuristic.hint}">i</button>
            </div>
            <span class="badge">Heuristic</span>
        </div>
        <p class="muted">${heuristic.hint}</p>
        <div class="toggle-group" data-id="${heuristic.id}">
            <button class="toggle ok" data-value="ok">Compliant</button>
            <button class="toggle warn" data-value="needs">Needs Work</button>
        </div>
        <div class="field">
            <label>Severity Level</label>
            <select class="severity-select">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
        <div class="field">
            <label>Issue Observed</label>
            <textarea rows="3" placeholder="Describe the usability issue (if any)"></textarea>
        </div>
        <div class="field">
            <label>Suggested Improvement</label>
            <textarea rows="3" placeholder="Provide a recommendation"></textarea>
        </div>
    `;
    return card;
}

function renderCards() {
    grid.innerHTML = '';
    heuristics.forEach((h, index) => grid.appendChild(createCard(h, index)));
}

function updateSummary() {
    const cards = Array.from(document.querySelectorAll('.heuristic-card'));
    let ok = 0;
    let needs = 0;
    let issues = 0;
    let penalty = 0;
    let statusCount = 0;

    cards.forEach(card => {
        const active = card.querySelector('.toggle.active');
        if (active?.dataset.value === 'ok') ok += 1;
        if (active?.dataset.value === 'needs') needs += 1;
        if (active) statusCount += 1;

        const issueText = card.querySelector('textarea').value.trim();
        if (issueText) issues += 1;

        const severity = card.querySelector('.severity-select').value;
        if (active?.dataset.value === 'needs') {
            if (severity === 'low') penalty += 2;
            if (severity === 'medium') penalty += 5;
            if (severity === 'high') penalty += 9;
        }
    });

    totalCount.textContent = heuristics.length.toString();
    issueCount.textContent = issues.toString();
    okCount.textContent = ok.toString();
    needsCount.textContent = needs.toString();

    if (statusCount === 0) {
        usabilityScore.textContent = '--';
        maturityLevel.textContent = '--';
        return;
    }

    const baseScore = Math.round((ok / heuristics.length) * 100);
    const score = Math.max(0, Math.min(100, baseScore - penalty));
    usabilityScore.textContent = `${score}%`;
    if (score >= 85) maturityLevel.textContent = 'Excellent';
    else if (score >= 70) maturityLevel.textContent = 'Good';
    else if (score >= 50) maturityLevel.textContent = 'Fair';
    else maturityLevel.textContent = 'Needs Improvement';
}

function generateReport() {
    const system = document.getElementById('systemName').value.trim() || document.getElementById('systemSelect').value;
    const evaluator = document.getElementById('evaluator').value.trim() || 'Evaluator';
    const date = new Date().toLocaleDateString();

    const cards = Array.from(document.querySelectorAll('.heuristic-card'));
    const hasInput = cards.some(card => {
        return card.querySelector('.toggle.active') || card.querySelector('textarea').value.trim();
    });

    if (!hasInput) {
        alert('Please mark at least one heuristic or add an issue before generating the report.');
        return;
    }

    let report = `Experiment No 6: Apply Nielsen's heuristics to evaluate a system\n`;
    report += `System Evaluated: ${system}\nEvaluator: ${evaluator}\nDate: ${date}\n`;
    report += `Overall Usability Score: ${usabilityScore.textContent}\nDesign Maturity: ${maturityLevel.textContent}\n\n`;
    report += `Findings:\n`;

    cards.forEach((card, index) => {
        const title = heuristics[index].title;
        const status = card.querySelector('.toggle.active')?.dataset.value === 'ok' ? 'Compliant' : 'Needs Work';
        const severity = card.querySelector('.severity-select').value;
        const issue = card.querySelectorAll('textarea')[0].value.trim() || 'No issue noted.';
        const suggestion = card.querySelectorAll('textarea')[1].value.trim() || 'No suggestion recorded.';

        report += `\n${index + 1}. ${title}\n`;
        report += `- Status: ${status}\n`;
        report += `- Severity: ${severity.charAt(0).toUpperCase() + severity.slice(1)}\n`;
        report += `- Issue: ${issue}\n`;
        report += `- Suggestion: ${suggestion}\n`;
    });

    report += `\nSummary:\n`;
    report += `- Issues Found: ${issueCount.textContent}\n`;
    report += `- Compliant: ${okCount.textContent}\n`;
    report += `- Needs Work: ${needsCount.textContent}\n`;
    report += `\nResult: The selected system was evaluated using Nielsen's heuristics. Improvement suggestions were provided for each issue identified.`;

    reportOutput.value = report;
}

function copyReport() {
    if (!reportOutput.value.trim()) {
        generateReport();
    }
    navigator.clipboard.writeText(reportOutput.value);
    copyBtn.textContent = 'Copied';
    setTimeout(() => (copyBtn.textContent = 'Copy Report'), 1500);
}

function downloadReport() {
    if (!reportOutput.value.trim()) {
        generateReport();
    }
    const blob = new Blob([reportOutput.value], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'experiment_6_nielsen_report.txt';
    link.click();
    URL.revokeObjectURL(link.href);
}

function resetAll() {
    document.getElementById('systemName').value = '';
    document.querySelectorAll('.heuristic-card').forEach(card => {
        card.querySelectorAll('.toggle').forEach(btn => btn.classList.remove('active', 'ok', 'warn'));
        card.querySelectorAll('textarea').forEach(t => (t.value = ''));
        card.querySelector('.severity-select').value = 'low';
        card.classList.remove('is-ok', 'is-needs');
    });
    reportOutput.value = '';
    updateSummary();
}

function applySample() {
    const sampleKey = sampleSelect.value;
    if (!sampleKey || !samplePresets[sampleKey]) return;

    const sample = samplePresets[sampleKey];
    const systemSelect = document.getElementById('systemSelect');
    const systemName = document.getElementById('systemName');
    const evaluator = document.getElementById('evaluator');

    systemSelect.value = sample.system;
    systemName.value = '';
    evaluator.value = sample.evaluator;

    const cards = Array.from(document.querySelectorAll('.heuristic-card'));
    cards.forEach((card, index) => {
        const entry = sample.entries[index];
        const toggles = card.querySelectorAll('.toggle');
        toggles.forEach(btn => btn.classList.remove('active', 'ok', 'warn'));
        if (entry?.status) {
            const btn = card.querySelector(`.toggle[data-value="${entry.status}"]`);
            if (btn) {
                btn.classList.add('active');
                btn.classList.add(entry.status === 'ok' ? 'ok' : 'warn');
            }
        }
        card.classList.remove('is-ok', 'is-needs');
        if (entry?.status === 'ok') card.classList.add('is-ok');
        if (entry?.status === 'needs') card.classList.add('is-needs');

        const severitySelect = card.querySelector('.severity-select');
        severitySelect.value = entry?.severity || 'low';

        const areas = card.querySelectorAll('textarea');
        areas[0].value = entry?.issue || '';
        areas[1].value = entry?.suggestion || '';
    });

    updateSummary();
}

grid.addEventListener('click', event => {
    const btn = event.target.closest('.toggle');
    if (!btn) return;
    const group = btn.closest('.toggle-group');
    group.querySelectorAll('.toggle').forEach(b => b.classList.remove('active', 'ok', 'warn'));
    btn.classList.add('active');
    btn.classList.add(btn.dataset.value === 'ok' ? 'ok' : 'warn');
    const card = btn.closest('.heuristic-card');
    if (card) {
        card.classList.remove('is-ok', 'is-needs');
        card.classList.add(btn.dataset.value === 'ok' ? 'is-ok' : 'is-needs');
    }
    updateSummary();
});

grid.addEventListener('input', event => {
    if (event.target.tagName === 'TEXTAREA' || event.target.classList.contains('severity-select')) {
        updateSummary();
    }
});

renderCards();
updateSummary();

generateBtn.addEventListener('click', generateReport);
copyBtn.addEventListener('click', copyReport);
downloadBtn.addEventListener('click', downloadReport);
resetBtn.addEventListener('click', resetAll);
applySampleBtn.addEventListener('click', applySample);