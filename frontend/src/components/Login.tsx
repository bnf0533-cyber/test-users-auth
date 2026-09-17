import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/api";
import { useUserStore } from "../store/useUserStore";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const setAuth = useUserStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            const res = await login({ email, password });
            setAuth(res.token, res.user);
            setMessage("your in system");
            navigate("/profile");
        } catch (err: any) {
            console.log(err);
            
            setError(err.response?.data || "something went wrong");
        }
    };

    return (
        <div>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">login</button>
            </form>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
