import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function CreateProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            setLoading(true);
            api.get("/api/admin/products")
                .then(res => {
                    const product = res.data.find(
                        (p: any) => p.id === Number(id)
                    );
                    if (product) {
                        setName(product.name);
                        setDescription(product.description);
                        setQuantity(product.quantity);
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleSave = async () => {
        if (!name || !description) {
            alert("Completa todos los campos");
            return;
        }

        const payload = { name, description, quantity };

        try {
            if (isEdit) {
                await api.put(`/api/admin/products/${id}`, payload);
                alert("Producto actualizado correctamente");
            } else {
                await api.post("/api/admin/products", payload);
                alert("Producto creado correctamente");

            }
            navigate("/admin/products");
        } catch {
            alert("Error guardando el producto");
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="form-container table-container-users">
            <h1 className="form-title">
                {isEdit ? "Editar producto" : "Crear producto"}
            </h1>

            <div className="form-card form-card-user">
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre del producto"
                    />
                </div>

                <div className="form-group">
                    <label>Descripción</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descripción"
                    />
                </div>

                <div className="form-group">
                    <label>Cantidad</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(Number(e.target.value))
                        }
                    />
                </div>

                <div className="form-actions">
                    <button className="btn-primary" onClick={handleSave}>
                        <span className="material-symbols-outlined">
                            save
                        </span>
                        {isEdit ? "Actualizar" : "Crear"}
                    </button>

                    <button
                        className="btn-secondary"
                        onClick={() => navigate("/admin/products")}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
