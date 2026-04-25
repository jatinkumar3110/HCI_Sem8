// Phase switching
function showPhase(name) {
    document.querySelectorAll('.phase, .phase-content').forEach(e => e.classList.remove('active'));
    
    // Find and activate the corresponding phase button
    const phases = document.querySelectorAll('.phase');
    const phaseContents = document.querySelectorAll('.phase-content');
    
    phaseContents.forEach((content, index) => {
        if(content.id === name) {
            phases[index].classList.add('active');
            content.classList.add('active');
        }
    });
}

// Note management
let notes = JSON.parse(localStorage.getItem('sdlcNotes')) || [];

function addNote() {
    const text = document.getElementById('noteInput').value.trim();
    if(!text) {
        alert('⚠️ Please write a note!');
        return;
    }
    
    notes.push({
        text: text,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
    });
    
    localStorage.setItem('sdlcNotes', JSON.stringify(notes));
    document.getElementById('noteInput').value = '';
    renderNotes();
    alert('✅ Note added successfully!');
}

function deleteNote(i) {
    if(confirm('❓ Are you sure you want to delete this note?')) {
        notes.splice(i, 1);
        localStorage.setItem('sdlcNotes', JSON.stringify(notes));
        renderNotes();
        alert('✅ Note deleted!');
    }
}

function renderNotes() {
    const list = document.getElementById('noteList');
    if(notes.length === 0) {
        list.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No notes yet. Add one to get started!</p>';
        return;
    }
    
    list.innerHTML = notes.map((n, i) => `
        <div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 14px; margin-bottom: 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: start; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <div style="text-align: left; flex: 1;">
                <div style="font-weight: 600; color: #333; margin-bottom: 5px;">${n.text}</div>
                <small style="color: #777; display: block;">📅 ${n.date} | 🕒 ${n.time}</small>
            </div>
            <button onclick="deleteNote(${i})" style="background: #e74c3c; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; font-size: 12px; margin-left: 10px;">✕ Delete</button>
        </div>
    `).join('');
}

function rateStar(el, type) {
    const stars = el.parentElement.querySelectorAll('.star');
    stars.forEach(s => s.classList.remove('active'));
    
    const index = Array.from(stars).indexOf(el);
    for(let i = 0; i <= index; i++) {
        stars[i].classList.add('active');
    }
}

function submitFeedback() {
    const ease = document.getElementById('easeRating').querySelectorAll('.star.active').length;
    const clarity = document.getElementById('clarityRating').querySelectorAll('.star.active').length;
    const comment = document.getElementById('feedback').value;
    
    if(ease === 0 || clarity === 0) {
        alert('⚠️ Please rate both questions!');
        return;
    }
    
    const feedback = {
        ease: ease,
        clarity: clarity,
        comment: comment,
        timestamp: new Date().toLocaleString()
    };
    
    // Save feedback to localStorage
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    
    alert(`✅ Thanks for your feedback!\n\n⭐ Ease: ${ease}/5\n⭐ Clarity: ${clarity}/5\n\n💬 Comment: ${comment || '(none)'}`);
    
    // Clear form
    document.getElementById('feedback').value = '';
    document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
}

// Initial render
renderNotes();
