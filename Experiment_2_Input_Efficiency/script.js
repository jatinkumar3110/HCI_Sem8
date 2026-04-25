const TARGET = 'The quick brown fox jumps over the lazy dog.';
let tests = { mouse: {}, keyboard: {}, touch: {} };

// ===== TAB SWITCHING =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-content, .tab-btn').forEach(e => e.classList.remove('active'));
        document.getElementById(this.dataset.tab).classList.add('active');
        this.classList.add('active');
        if(this.dataset.tab === 'results') displayResults();
    });
});

// ===== MOUSE TEST =====
let mouseData = { start: 0, current: 0, errors: 0, timer: 0 };

function startMouseTest() {
    mouseData = { start: Date.now(), current: 0, errors: 0, timer: 0 };
    const btns = document.getElementById('mouseButtons');
    btns.innerHTML = '';
    let nums = Array.from({length:9}, (_,i) => i+1).sort(() => Math.random() - 0.5);
    nums.forEach(n => {
        const btn = document.createElement('button');
        btn.className = 'click-btn';
        btn.textContent = n;
        btn.onclick = () => handleMouseClick(n);
        btns.appendChild(btn);
    });
    mouseData.timer = setInterval(() => {
        document.getElementById('mouseTime').textContent = ((Date.now() - mouseData.start)/1000).toFixed(1) + 's';
    }, 100);
}

function handleMouseClick(n) {
    mouseData.current++;
    if(n !== mouseData.current) mouseData.errors++;
    else document.querySelectorAll('.click-btn')[n-1].classList.add('clicked');
    document.getElementById('mouseErrors').textContent = mouseData.errors;
    document.getElementById('mouseProgress').textContent = mouseData.current + '/9';
    if(mouseData.current === 9) {
        clearInterval(mouseData.timer);
        tests.mouse = { time: ((Date.now() - mouseData.start)/1000).toFixed(2), errors: mouseData.errors };
    }
}

function resetMouseTest() {
    clearInterval(mouseData.timer);
    document.getElementById('mouseButtons').innerHTML = '';
    mouseData = { start: 0, current: 0, errors: 0, timer: 0 };
    document.getElementById('mouseTime').textContent = '0.0s';
    document.getElementById('mouseErrors').textContent = '0';
    document.getElementById('mouseProgress').textContent = '0/9';
}

// ===== KEYBOARD TEST =====
let keyboardData = { start: 0, timer: 0 };

function startKeyboardTest() {
    keyboardData.start = Date.now();
    const input = document.getElementById('typingInput');
    input.value = '';
    input.focus();
    keyboardData.timer = setInterval(updateKeyboard, 100);
}

function updateKeyboard() {
    const inp = document.getElementById('typingInput').value;
    const elapsed = ((Date.now() - keyboardData.start)/1000).toFixed(1);
    document.getElementById('keyboardTime').textContent = elapsed + 's';
    
    let errors = 0;
    for(let i = 0; i < inp.length; i++) if(inp[i] !== TARGET[i]) errors++;
    document.getElementById('keyboardErrors').textContent = errors;
    
    const acc = inp.length > 0 ? Math.max(0, 100 - (errors/inp.length)*100).toFixed(1) : '0.0';
    document.getElementById('keyboardAccuracy').textContent = acc + '%';
    
    if(inp === TARGET) {
        clearInterval(keyboardData.timer);
        tests.keyboard = { time: elapsed, errors, accuracy: acc + '%' };
    }
}

function resetKeyboardTest() {
    clearInterval(keyboardData.timer);
    document.getElementById('typingInput').value = '';
    document.getElementById('keyboardTime').textContent = '0.0s';
    document.getElementById('keyboardErrors').textContent = '0';
    document.getElementById('keyboardAccuracy').textContent = '0%';
}

// ===== TOUCH TEST =====
let touchData = { start: 0, count: 0, timer: 0 };

function startTouchTest() {
    touchData = { start: Date.now(), count: 0, timer: 0 };
    const area = document.getElementById('touchArea');
    area.onclick = () => {
        if(!touchData.timer) return;
        touchData.count++;
        document.getElementById('touchTaps').textContent = touchData.count + '/5';
        document.getElementById('touchAction').textContent = '✓ Tapped';
        
        // Add visual feedback
        area.classList.add('touched');
        setTimeout(() => area.classList.remove('touched'), 200);
        
        if(touchData.count === 5) {
            clearInterval(touchData.timer);
            tests.touch = { time: ((Date.now() - touchData.start)/1000).toFixed(2), taps: 5 };
        }
    };
    touchData.timer = setInterval(() => {
        document.getElementById('touchTime').textContent = ((Date.now() - touchData.start)/1000).toFixed(1) + 's';
    }, 100);
}

function resetTouchTest() {
    clearInterval(touchData.timer);
    touchData = { start: 0, count: 0, timer: 0 };
    document.getElementById('touchTime').textContent = '0.0s';
    document.getElementById('touchTaps').textContent = '0/5';
    document.getElementById('touchAction').textContent = '--';
}

// ===== RESULTS DISPLAY =====
function displayResults() {
    if(tests.mouse.time) document.getElementById('rMouseTime').textContent = tests.mouse.time + 's';
    if(tests.keyboard.time) document.getElementById('rKeyTime').textContent = tests.keyboard.time + 's';
    if(tests.touch.time) document.getElementById('rTouchTime').textContent = tests.touch.time + 's';
}

function resetAllTests() {
    resetMouseTest();
    resetKeyboardTest();
    resetTouchTest();
    tests = { mouse: {}, keyboard: {}, touch: {} };
}

// Auto-update keyboard on input
document.getElementById('typingInput').addEventListener('input', updateKeyboard);
