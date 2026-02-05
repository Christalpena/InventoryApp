import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import ProductsPage from "../pages/ProductsPage";
import CreateProductPage from "../pages/CreateProductPage";
import HistoryPage from "../pages/HistoryPage";

const AdminRoutes = () => {
    return (
        <Route path="/admin" element={<AdminLayout />}>
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/create" element={<CreateProductPage />} />
            <Route path="history" element={<HistoryPage />} />
        </Route>
    );
};

export default AdminRoutes;
