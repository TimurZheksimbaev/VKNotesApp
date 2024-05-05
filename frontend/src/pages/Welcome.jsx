import { useState, useEffect } from "react";
import "../styles/Welcome.css"
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Welcome() {    
    return (
        <div className="welcome-container">
            <h1>Welcome to my notes app!</h1>
            <div className="welcome-register">
                <h2>Are you registered?</h2>
                <button className="welcome-button" onClick={() => setIsRegister(true)}>Register</button>
            </div>

            <div className="welcome-login">
                <h2>If you have an account, you can login</h2>
                <button className="welcome-button" onClick={() => navigate("/login")}>Login</button>
            </div>
        </div>
    );
}

export default Welcome