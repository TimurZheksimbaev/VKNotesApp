import Form from "../components/Form"
import "../styles/Login.css"
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate();
    return <> <Form route="/api/token/" method="login" />
        <button className="register-button " onClick={() => navigate("/register")}>Register</button>
    </>

}

export default Login