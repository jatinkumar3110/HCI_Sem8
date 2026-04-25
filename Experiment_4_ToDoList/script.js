// Initialize tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function showScreen(name) {
    document.querySelectorAll('.screen, .nav-btn').forEach(e => e.classList.remove('active'));
    document.getElementById(name).classList.add('active');
    event.target.classList.add('active');
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    if(tasks.length === 0) {
        list.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No tasks yet. Add one to get started!</p>';
        return;
    }
    list.innerHTML = tasks.map((t, i) => `
        <div class="task-item">
            <div>
                <strong>${t.title}</strong><br>
                <small style="color: #666;">${t.desc}</small><br>
                <span style="background: ${t.priority === 'High' ? '#e74c3c' : t.priority === 'Medium' ? '#f39c12' : '#27ae60'}; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px; font-weight: bold;">${t.priority}</span>
            </div>
            <button onclick="deleteTask(${i})">✕ Delete</button>
        </div>
    `).join('');
}

function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const desc = document.getElementById('taskDesc').value.trim();
    const priority = document.getElementById('priority').value;
    
    if(!title) {
        alert('⚠️ Please enter a task title!');
        return;
    }
    
    tasks.push({ 
        title, 
        desc: desc || 'No description', 
        priority,
        createdAt: new Date().toLocaleString()
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    clearForm();
    renderTasks();
    showScreen('home');
    alert('✅ Task added successfully!');
}

function deleteTask(i) {
    if(confirm('❓ Are you sure you want to delete this task?')) {
        tasks.splice(i, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        alert('✅ Task deleted!');
    }
}

function clearForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDesc').value = '';
    document.getElementById('priority').value = 'Medium';
}

function clearAllTasks() {
    if(confirm('⚠️ Are you sure you want to delete ALL tasks? This cannot be undone!')) {
        tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        alert('✅ All tasks have been cleared!');
    }
}

// Initial render
renderTasks();
