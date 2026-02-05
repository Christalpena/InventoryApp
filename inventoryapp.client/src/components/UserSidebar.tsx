import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

export default function UserSidebar() {
    const navigate = useNavigate();

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <img
                    src="https://www.gruporica.com/wp-content/uploads/2024/02/Logo-Rica.png"
                    alt="Rica"
                />
                <h3>Panel Usuario</h3>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink
                            to="/user/products"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active-link" : ""}`
                            }
                        >
                            <span className="material-symbols-outlined">
                                category
                            </span>
                            Productos
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button
                    className="logout-btn"
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                >
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}
