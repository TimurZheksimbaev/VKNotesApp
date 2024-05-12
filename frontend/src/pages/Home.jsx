import { useState, useEffect } from "react";
import "../styles/Home.css"
import Notes from "../components/Notes"
import { useNavigate } from "react-router-dom";


function Home() {
    const username = localStorage.getItem('username')
    const navigate = useNavigate()
    return <div>
        <h1>Welcome home {username}</h1>
        <button onClick={() => navigate("/logout")} className="logout-button"> Logout </button>
        <Notes />
    </div>
}

export default Home;