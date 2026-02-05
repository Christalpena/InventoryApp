import axios from "axios";
import api from "./api";


const API_URL = "https://localhost:7182/api/auth";

export const login = (username: string, password: string) =>
    axios.post(`${API_URL}/login`, { username, password });

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};

export const register = (username: string, password: string) => {
    return api.post("/api/auth/register", {
        username,
        password,
    });
};

