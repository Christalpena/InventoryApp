import api from "./api";

export interface Product {
    id: number;
    name: string;
    description: string;
    quantity: number;
    createdBy: string;
}

export const getProducts = () =>
    api.get<Product[]>("/api/admin/products");

export const createProduct = (
    product: Omit<Product, "id" | "createdBy">
) =>
    api.post("/api/admin/products", product);

export const deleteProduct = (id: number) =>
    api.delete(`/api/admin/products/${id}`);
