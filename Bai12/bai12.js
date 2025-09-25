const notesContainer = document.getElementById('notes-container')
const addNoteBtn = document.getElementById('add-note')
const noteTitleInput = document.getElementById('note-title')
const noteContentInput = document.getElementById('note-content')

let notes = JSON.parse(localStorage.getItem('notes')) || []


function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes))
}


function createNote(note) {
    const div = document.createElement('div')
    div.className = 'note'
    div.style.left = note.x + 'px'
    div.style.top = note.y + 'px'
    div.innerHTML = `
    <span class="close-btn">&times;</span>
    <h3>${note.title}</h3>
    <p>${note.content}</p>
  `


    div.querySelector('.close-btn').addEventListener('click', () => {
        notes = notes.filter(n => n.id !== note.id)
        saveNotes()
        div.remove()
    });

   
    div.onmousedown = function (e) {
        let shiftX = e.clientX - div.getBoundingClientRect().left
        let shiftY = e.clientY - div.getBoundingClientRect().top

        function moveAt(pageX, pageY) {
            div.style.left = pageX - shiftX + 'px'
            div.style.top = pageY - shiftY + 'px'
        }

        function onMouseMove(e) {
            moveAt(e.pageX, e.pageY)
        }

        document.addEventListener('mousemove', onMouseMove)

        div.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove)
            div.onmouseup = null
            
            note.x = parseInt(div.style.left)
            note.y = parseInt(div.style.top)
            saveNotes()
        };
    };

    div.ondragstart = function () {
        return false
    };

    notesContainer.appendChild(div)
}


function renderNotes() {
    notesContainer.innerHTML = ''
    notes.forEach(createNote)
}


addNoteBtn.addEventListener('click', () => {
    const title = noteTitleInput.value.trim()
    const content = noteContentInput.value.trim()
    if (!title && !content) return

    const note = {
        id: Date.now(),
        title,
        content,
        x: 10,
        y: 10
    }
    notes.push(note)
    saveNotes()
    createNote(note)

    noteTitleInput.value = ''
    noteContentInput.value = ''
})


renderNotes()
