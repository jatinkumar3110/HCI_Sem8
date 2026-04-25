// ==================== INTERACTION LOG SYSTEM ====================
const interactions = [];

function logInteraction(type, detail) {
    const timestamp = new Date().toLocaleTimeString();
    const entry = {
        time: timestamp,
        type: type,
        detail: detail
    };
    interactions.push(entry);
    updateLog();
}

function updateLog() {
    const logContent = document.getElementById('logContent');
    
    if (interactions.length === 0) {
        logContent.innerHTML = '<div style="color: #999; text-align: center; padding: 20px;">Interactions will be logged here...</div>';
        return;
    }

    logContent.innerHTML = interactions.map((entry, index) => `
        <div class="log-entry">
            <div>
                <span class="log-action">${entry.type}</span>: ${entry.detail}
            </div>
            <span class="log-time">${entry.time}</span>
        </div>
    `).join('');

    logContent.scrollTop = logContent.scrollHeight;
}

function clearLog() {
    interactions.length = 0;
    updateLog();
}

// ==================== MOUSE INTERACTION ====================
let currentColor = '#667eea';

function changeButtonColor(btn) {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA', '#45B7D1', '#96CEB4'];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    
    btn.style.background = newColor;
    currentColor = newColor;

    document.getElementById('mouseMessage').textContent = `✨ Color changed to ${newColor}!`;
    logInteraction('MOUSE_CLICK', 'Button color changed');
}

function setButtonColor(color) {
    const btn = document.querySelector('.color-button');
    btn.style.background = color;
    currentColor = color;

    document.getElementById('mouseMessage').textContent = `🎨 Selected color: ${color}`;
    logInteraction('COLOR_SELECT', `Selected ${color}`);
}

document.querySelector('.color-button').addEventListener('mouseenter', function() {
    logInteraction('MOUSE_HOVER', 'Hovered over color button');
});

// ==================== KEYBOARD INTERACTION ====================
const keyboardInput = document.getElementById('keyboardInput');
const displayArea = document.getElementById('displayArea');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');

keyboardInput.addEventListener('input', function() {
    const text = this.value;
    
    displayArea.textContent = text || 'Your text will appear here as you type...';
    charCount.textContent = text.length;
    
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    wordCount.textContent = words;

    logInteraction('KEYBOARD_INPUT', `Typed: "${text.substring(text.length - 10)}"`);
});

keyboardInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        logInteraction('KEYBOARD_ENTER', 'Pressed Enter');
    } else if (e.key === 'Backspace') {
        logInteraction('KEYBOARD_BACKSPACE', 'Pressed Backspace');
    }
});

keyboardInput.addEventListener('focus', function() {
    logInteraction('KEYBOARD_FOCUS', 'Input field focused');
});

// ==================== TOUCH INTERACTION ====================
const touchZone = document.getElementById('touchZone');
const touchFeedback = document.getElementById('touchFeedback');
let lastTouchTime = 0;

touchZone.addEventListener('touchstart', function(e) {
    this.classList.add('touched');
    logInteraction('TOUCH_START', 'Touch started on zone');
    updateTouchFeedback();
});

touchZone.addEventListener('touchend', function(e) {
    this.classList.remove('touched');
    logInteraction('TOUCH_END', 'Touch ended on zone');
    
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTouchTime;
    
    if (tapLength < 300 && tapLength > 0) {
        logInteraction('DOUBLE_TAP', 'Double tap detected');
        touchFeedback.textContent = '🎉 Double tap detected!';
    }
    lastTouchTime = currentTime;
});

touchZone.addEventListener('click', function() {
    logInteraction('MOUSE_CLICK', 'Clicked on touch zone');
    updateTouchFeedback();
});

let touchStartX = 0;
let touchStartY = 0;

touchZone.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

touchZone.addEventListener('touchmove', function(e) {
    if (e.touches.length === 1) {
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > 30) {
            const direction = diffX > 0 ? 'right →' : 'left ←';
            touchFeedback.textContent = `👉 Swiping ${direction}`;
            logInteraction('SWIPE', `Swiping ${direction}`);
        }
    }
});

function updateTouchFeedback() {
    const messages = [
        '👆 Great tap!',
        '⚡ Quick response!',
        '🎯 Target hit!',
        '✨ Touch registered!',
        '💫 Perfect!',
        '🎪 Nice interaction!'
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    touchFeedback.textContent = msg;
}

// ==================== RESET FUNCTION ====================
function resetAll() {
    keyboardInput.value = '';
    displayArea.textContent = 'Your text will appear here as you type...';
    charCount.textContent = '0';
    wordCount.textContent = '0';

    document.querySelector('.color-button').style.background = '#667eea';
    document.getElementById('mouseMessage').textContent = '👆 Click the button or select a color from the palette above!';

    touchZone.classList.remove('touched');
    touchFeedback.textContent = 'Touch area ready for interaction...';

    clearLog();
    logInteraction('SYSTEM', 'All interactions reset');
}

// Initialize
logInteraction('SYSTEM', 'Application loaded');
