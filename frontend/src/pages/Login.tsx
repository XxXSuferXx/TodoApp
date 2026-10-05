import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import useInput from "../Hooks/useInput";
import { useAuth } from "../Context/authContext";


function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const username = useInput("");
    const password = useInput("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username.value.trim() === "" || password.value === "") {
            setError("Username and password are required");
            return;
        }

        try {
            setSubmitting(true);
            setError("");
            await login({ username: username.value.trim(), password: password.value });
            // replace true-> if u press back after log in, it won't go back to login iff replace is true
            navigate(ROUTES.todos, { replace: true });
        } catch(err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setSubmitting(false);
        }

    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        username.onChange(e);
        if(error) setError("");
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        password.onChange(e);
        if(error) setError("");
    }

    return (
        <div className = " bg-slate-800 min-h-screen text-white">
            <div>
                <form onSubmit ={handleSubmit} className =" flex flex-col gap-2">
                    <input value = {username.value} onChange = {handleUsernameChange} placeholder="userName"/>
                    <input value = {password.value} onChange = {handlePasswordChange} placeholder="passWord"/>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type = "submit" disabled={submitting} className = " bg-yellow-600 rounded">
                        {submitting ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;