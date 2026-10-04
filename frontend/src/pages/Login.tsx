import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        // replace true-> if u press back after log in, it won't go back to login iff replace is true
        navigate(ROUTES.todos, {replace: true})
    }

    return (
        <div className = " bg-slate-800 min-h-screen text-white">
            <div>
                <form onSubmit ={handleSubmit} className =" flex flex-col gap-2">
                    <input value = {username} onChange = {(e)=> setUsername(e.target.value)} placeholder="userName"/>
                    <input value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder="passWord"/>
                    <button type = "submit" className = " bg-yellow-600 rounded">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login;