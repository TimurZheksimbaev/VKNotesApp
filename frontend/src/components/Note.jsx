import React, { useState } from "react";
import "../styles/Note.css";

function Note({ note, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(note.content);
    const [editedTitle, setEditedTitle] = useState(note.title);

    const formattedDate = new Date(note.created_at).toLocaleDateString("RU-ru");

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedContent(note.content);
        setEditedTitle(note.title);
    };

    const handleSaveEdit = () => {
        onUpdate(note.id, { content: editedContent, title: editedTitle });
        setIsEditing(false);
    };

    return (
        <div className="note-container">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p className="note-title">{note.title}</p>
                    <p className="note-content">{note.content}</p>
                    <p className="note-date">{formattedDate}</p>
                    <button className="edit-button" onClick={handleEdit}>
                        Edit
                    </button>
                    <button className="delete-button" onClick={() => onDelete(note.id)}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default Note;
