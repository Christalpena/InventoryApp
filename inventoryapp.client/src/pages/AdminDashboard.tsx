/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
    getProducts,
    createProduct,
    deleteProduct,
} from "../services/productService";

import type { Product } from "../services/productService";

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);

    const loadProducts = async () => {
        const res = await getProducts();
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleCreate = async () => {
        await createProduct({ name, description, quantity });
        setName("");
        setDescription("");
        setQuantity(0);
        loadProducts();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Eliminar producto?")) return;
        await deleteProduct(id);
        loadProducts();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>📦 Productos</h1>

            {/* Crear */}
            <h3>Crear producto</h3>
            <input
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <input
                type="number"
                placeholder="Cantidad"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <br />
            <button onClick={handleCreate}>Crear</button>

            <hr />

            {/* Listado */}
            <table border={1} cellPadding={8}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Creado por</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <td>{p.quantity}</td>
                            <td>{p.createdBy}</td>
                            <td>
                                <button onClick={() => handleDelete(p.id)}>
                                    🗑 Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
