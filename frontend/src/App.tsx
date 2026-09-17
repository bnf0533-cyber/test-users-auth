import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router";
import { useUserStore } from "./store/useUserStore";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Users from "./pages/Users";
import "./App.css";

function App() {
    const token = useUserStore((s) => s.token);
    return (
        <BrowserRouter>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/users">Users</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Navigate to="/profile" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/profile"
                    element={token ? <ProfilePage /> : <Navigate to="/login" />}
                />
                <Route path="/users" element={<Users />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
