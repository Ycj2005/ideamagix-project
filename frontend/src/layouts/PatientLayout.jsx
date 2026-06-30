import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Loader from "../components/Loader.jsx";
import { useAuth } from "../pages/context/AuthContext.jsx";

function PatientLayout() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/patient/login" />;
  if (user.role !== "patient") return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PatientLayout;
