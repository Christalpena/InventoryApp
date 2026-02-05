import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import ProductsPage from "./pages/ProductsPage";
import CreateProductPage from "./pages/CreateProductPage";
import HistoryPage from "./pages/HistoryPage";
import UsersPage from "./pages/UsersPage";
import Register from "./pages/Register";
import UserLayout from "./layouts/UserLayout";
import UserProductsPage from "./pages/UserProductsPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Login */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


                {/* Rutas protegidas del Admin */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute role="Admin">
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/create" element={<CreateProductPage />} />
                    <Route path="products/edit/:id" element={<CreateProductPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="history" element={<HistoryPage />} />

                    {/* Default dentro del admin */}
                    <Route path="" element={<Navigate to="products" replace />} />
                </Route>

                {/* Otra ruta */}
                <Route path="*" element={<Navigate to="/login" replace />} />

                {/* USER NORMAL*/}
                <Route
                    path="/user"
                    element={
                        <ProtectedRoute role="User">
                            <UserLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="products" element={<UserProductsPage />} />
                    <Route path="" element={<Navigate to="products" replace />} />
                </Route>
            </Routes>

        </BrowserRouter>
    );
}
