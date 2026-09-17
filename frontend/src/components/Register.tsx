import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            await register({ username, email, password });
            setMessage("user created successfully");
            navigate("/login");
        } catch (err: string | any) {
            setError(err.response?.data);
        }
    };

    return (
        <div>
            <h2>REGISTER</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">sign up</button>
            </form>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
