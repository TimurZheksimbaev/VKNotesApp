import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api
        .get("/api/notes/")
        .then((res) => res.data)
        .then((data) => setNotes(data))
        .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) {
                alert("Not deleted!")
            } else {
                alert("Failed to delete note")
            }
            getNotes();
        }).catch((error) =>  alert(error))
        
    };

    const createNote = (e) => {
        e.preventDefault()
        api.post("api/notes/", {content, title}).then((res) => {
            if (res.status === 201) alert("Note created!")
            else alert("Failed to create note")
            getNotes();
        }).catch((err) => alert(err))

    }; 

    return (
        <div>
            <div>
                <h1>Notes</h1>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))} 
            </div>
            <h1>Create a Note</h1>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
            <br />
            <input 
                type="text" 
                id="title" 
                name="title" 
                required onChange={
                    (e) => setTitle(e.target.value)
                } />
            <label htmlFor="content">Content:</label>
            <br />
            <textarea 
                name="content" 
                id="content" 
                required value={content}
                onChange={(e) => setContent(e.target.value)}> </textarea>
            <br />
            <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home