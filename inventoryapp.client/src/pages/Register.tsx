/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await register(username, password);
            alert("Usuario creado correctamente");
            navigate("/login");
        } catch (error: any) {
            alert(error.response?.data || "Error al crear usuario");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                {/* FORM */}
                <div className="login-left">
                    <h2 className="login-title">Crear cuenta</h2>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>Usuario</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="btn-primary login-btn">
                            Registrarse
                        </button>
                    </form>
                </div>

                <div className="login-right">
                    <img
                        className="login-logo"
                        src="https://www.gruporica.com/wp-content/uploads/2024/02/Logo-Rica.png"
                        alt="Rica"
                    />
                    <h2>¿Ya tienes cuenta?</h2>
                    <p>Inicia sesión aquí</p>

                    <button
                        className="btn-outline"
                        onClick={() => navigate("/login")}
                    >
                        Volver al login
                    </button>
                </div>

            </div>
        </div>
    );
}
