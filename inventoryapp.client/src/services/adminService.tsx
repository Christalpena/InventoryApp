import axios from "axios";
import type { AdminUser, AdminProduct } from "../types/admin";

const API_URL = "https://localhost:7182/api/admin";

export const getUsers = () =>
    axios.get<AdminUser[]>(`${API_URL}/users`);

export const getProducts = () =>
    axios.get<AdminProduct[]>(`${API_URL}/products`);
