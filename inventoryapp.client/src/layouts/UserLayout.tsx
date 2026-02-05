import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";

export default function UserLayout() {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <UserSidebar />
            <main style={{ flex: 1, padding: "20px", background: "#f1f5f9" }}>
                <Outlet />
            </main>
        </div>
    );
}
