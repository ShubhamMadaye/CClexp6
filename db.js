// db.js — JSON file storage (no MySQL needed, same API as original)
const fs   = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'notes.json');

function initDB() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
    }
}

function readNotes() {
    initDB();
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function writeNotes(notes) {
    fs.writeFileSync(DB_FILE, JSON.stringify(notes, null, 2));
}

const getNotes = async function() {
    const notes = readNotes();
    return notes.sort((a, b) => b.id - a.id);
}

const saveNote = async function(content) {
    const notes = readNotes();
    const newNote = {
        id: Date.now(),
        content: content,
        created_at: new Date().toISOString()
    };
    notes.push(newNote);
    writeNotes(notes);
    return newNote;
}

const deleteNote = async function(id) {
    let notes = readNotes();
    notes = notes.filter(note => String(note.id) !== String(id));
    writeNotes(notes);
}

module.exports = {
    getNotes,
    saveNote,
    deleteNote
}
