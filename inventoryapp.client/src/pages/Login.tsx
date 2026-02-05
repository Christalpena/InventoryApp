import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await login(username, password);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            if (res.data.role === "Admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        } catch {
            alert("Credenciales invalidas");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-left">
                    <h3 className = 'login-slogan'>Nuestra naturaleza es rica</h3>
                    <h2 className="login-title">Iniciar Sección</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>Usuario</label>
                            <input
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="btn-primary login-btn" type="submit">
                            Entrar
                        </button>
                    </form>
                </div>

                <div className="login-right">
                    <img
                        className="login-logo"
                        src="https://www.gruporica.com/wp-content/uploads/2024/02/Logo-Rica.png"
                        alt="Rica"
                    />

                    <h2>¡Bienvenido!</h2>
                    <p>Panel administrativo de inventario</p>

                    <div className="login-divider" />

                    <p className="login-small-text">¿No tienes cuenta?
                        
                    </p>

                    <button
                        className="btn-outline"
                        onClick={() => navigate("/register")}
                    >
                        Crear cuenta
                    </button>
                </div>


            </div>
        </div>
    );

}
