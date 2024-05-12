import { useState, useEffect } from "react";
import "../styles/Home.css"
import Notes from "../components/Notes"


function Home() {
    const username = localStorage.getItem('username')
    return <div>
        <h1>Welcome home {username}</h1>
        <Notes />
    </div>
}

export default Home;