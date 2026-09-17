import axios from "axios";

export interface UserType {
    username?: string;
    email: string;
    password?: string;
}

const api = axios.create({ baseURL: "http://localhost:3000" });

export async function register({ username, email, password }: UserType) {
    const res = await api.post("/auth/register", { username, email, password });
    return res.data;
}

export async function login({ email, password }: UserType) {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
}

export async function getProfile(token: string) {
    const res = await api.get("/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

export async function getUsers() {
    const res = await api.get("/auth/users");
    return res.data;
}
