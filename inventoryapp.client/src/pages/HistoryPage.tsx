import { useEffect, useState } from "react";
import api from "../services/api";

interface HistoryItem {
    id: number;
    name: string;
    description: string;
    quantity: number;
    createdBy: string;
    deletedBy: string;
    deletedAt: string;
}

export default function HistoryPage() {
    const [items, setItems] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    const loadHistory = async () => {
        try {
            const res = await api.get<HistoryItem[]>("/api/admin/history");
            setItems(res.data);
        } finally {
            setLoading(false);
        }
    };

    const handleClearHistory = async () => {
        const ok = confirm(
            "¿Seguro que deseas vaciar todo el historial?\nEsta acción no se puede deshacer."
        );
        if (!ok) return;

        await api.delete("/api/admin/history");
        alert("Historial eliminado correctamente");
        loadHistory();
    };

    useEffect(() => {
        loadHistory();
    }, []);

    if (loading) return <p>Cargando historial...</p>;

    return (
        <div className="table-container table-container-users">
            <div className="table-header">
                <h1 className="table-title">Historial de productos eliminados</h1>

                {items.length > 0 && (
                    <button
                        className="btn-danger"
                        onClick={handleClearHistory}
                    >
                        <span className="material-symbols-outlined">
                            delete_forever
                        </span>
                        Vaciar historial
                    </button>
                )}
            </div>

            {items.length === 0 ? (
                <p>No hay productos eliminados</p>
            ) : (
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Creado por</th>
                            <th>Eliminado por</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((h) => (
                            <tr key={h.id}>
                                <td>{h.name}</td>
                                <td className="muted">{h.description}</td>
                                <td>{h.quantity}</td>
                                <td>{h.createdBy}</td>
                                <td>{h.deletedBy}</td>
                                <td className="date-cell">
                                    {new Date(h.deletedAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
