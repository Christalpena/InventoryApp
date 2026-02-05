import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    description: string;
    quantity: number;
    createdBy: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const ITEMS_PER_PAGE = 10;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

    const paginatedProducts = products.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );


    const loadProducts = async () => {
        try {
            const res = await api.get<Product[]>("/api/admin/products");
            setProducts(res.data);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        const ok = confirm("¿Seguro que deseas eliminar este producto?");
        if (!ok) return;

        await api.delete(`/api/admin/products/${id}`);
        loadProducts();
    };

    useEffect(() => {
        loadProducts();
    }, []);

    if (loading) return <p>Cargando productos...</p>;

    return (
        <div className="table-container table-container-users">
            {products.length === 0 ? (
                <p>No hay productos registrados</p>
            ) : (
                <>
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                 <th>Descripción</th>
                                <th>Cantidad</th>
                                <th>Creado por</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProducts.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.name}</td>
                                    <td className="muted">{p.description}</td>
                                    <td>{p.quantity}</td>
                                    <td>{p.createdBy}</td>
                                    <td className="actions">
                                        <button
                                            className="icon-btn"
                                            onClick={() =>
                                                navigate(`/admin/products/edit/${p.id}`)
                                            }
                                        >
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </button>

                                        <button
                                            className="icon-btn danger"
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                            >
                                Anterior
                            </button>

                            <span>
                                Página {currentPage} de {totalPages}
                            </span>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => p + 1)}
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
