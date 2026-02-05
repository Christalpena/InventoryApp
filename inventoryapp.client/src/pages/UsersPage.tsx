/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import api from "../services/api";

interface User {
    id: number;
    username: string;
    role: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState(2);

    const loadUsers = async () => {
        const res = await api.get<User[]>("/api/admin/users");
        setUsers(res.data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleCreate = async () => {
        if (!username || !password) {
            alert("Completa todos los campos");
            return;
        }

        try {
            await api.post("/api/admin/users", {
                username,
                password,
                roleId,
            });

            alert("Usuario creado correctamente");

            setUsername("");
            setPassword("");
            setRoleId(2);
            loadUsers();
        } catch (error: any) {
            if (error.response?.status === 400) {
                alert(error.response.data);
            } else {
                alert("Error inesperado al crear el usuario");
            }
        }
    };

    return (
        <div className="table-container">
            <div className="form-card">
                <h2>Crear usuario</h2>

                <div className="form-group">
                    <label>Usuario</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nombre de usuario"
                    />
                </div>

                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                    />
                </div>

                <div className="form-group">
                    <label>Rol</label>
                    <select
                        className="form-select"
                        value={roleId}
                        onChange={(e) => setRoleId(Number(e.target.value))}
                    >
                        <option value={1}>Admin</option>
                        <option value={2}>User</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button className="btn-primary" onClick={handleCreate}>
                        <span className="material-symbols-outlined">person_add</span>
                        Crear usuario
                    </button>
                </div>
            </div>

            <table className="modern-table">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.username}</td>
                            <td className="muted">{u.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
