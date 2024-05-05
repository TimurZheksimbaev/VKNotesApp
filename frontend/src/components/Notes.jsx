import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Notes.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import api from "../api"

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newTitle, setNewTitle] = useState('');
//   const [newDate, setNewDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  

  useEffect(() => {
    api.get('api/notes/').then((response) => {
      setNotes(response.data);
    });
  }, []);

  const addNote = () => {
    api
      .post('api/notes/', {
        title: newTitle,
        content: newNote,
        created_at: new Date().toLocaleDateString("US-en"),
      })
      .then((response) => {
        setNotes([...notes, response.data]);
        setNewTitle('');
        setNewNote('');
      });
  };

  const deleteNote = (id) => {
    api.delete(`api/notes/delete/${id}/`).then(() => {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
    });
  };

  const updateNote = (id) => {
    api
      .put(`api/notes/update/${id}/`, { content: editedContent })
      .then(() => {
        const updatedNotes = [...notes];
        const noteIndex = updatedNotes.findIndex((note) => note.id === id);
        updatedNotes[noteIndex].content = editedContent;
        setNotes(updatedNotes);
        setEditMode(null);
      });
  };



const filteredNotes = searchTerm
  ? notes.filter((note) =>
      note.title &&
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : notes;

  return (
    <div className="notes-container">
      <h1 style={{color:"white"}}>Notes</h1>
      <div className="add-note">
        <input
          type="text"
          placeholder="Title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Note content..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />

        <button onClick={addNote}>Add</button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="notes-list">
        {filteredNotes.map((note) => (
          <div key={note.id} className="note">
            <div className="note-content">
              <h3>{note.title}</h3>
              {editMode === note.id ? (
                <div>
                  <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <button onClick={() => updateNote(note.id)}>
                        Submit
                  </button>
                </div>
              ) : (
                <p>{note.content}</p>
              )}
            </div>
            <div className="note-date">{note.created_at}</div>
            <div className="note-actions">
              {editMode !== note.id ? (
                <button onClick={() => setEditMode(note.id)}>
                    Update
                </button>
              ) : null}
              <button className="delete-button" onClick={() => deleteNote(note.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;