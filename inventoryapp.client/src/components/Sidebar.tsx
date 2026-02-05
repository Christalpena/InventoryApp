import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <img src="https://www.gruporica.com/wp-content/uploads/2024/02/Logo-Rica.png" />
                <h3>Panel Admin</h3>
            </div>

            <nav className="sidebar-nav">
                <ul className="sidebar-nav-ul">
                    <li>
                        <NavLink
                            to="/admin/products"
                            end
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active-link" : ""}`
                            }
                        >
                            <span className="material-symbols-outlined">
                                category
                            </span>
                            <span>Ver productos</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/admin/products/create"
                            end
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active-link" : ""}`
                            }
                        >
                            <span className="material-symbols-outlined">
                                add_shopping_cart
                            </span>
                            <span>Crear producto</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/admin/history"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active-link" : ""}`
                            }
                        >
                            <span className="material-symbols-outlined">
                                history
                            </span>
                            <span>Historial</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/admin/users"
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active-link" : ""}`
                            }
                        >
                            <span className="material-symbols-outlined">
                                group
                            </span>
                            <span>Usuarios</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <button
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                    className="logout-btn">
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
