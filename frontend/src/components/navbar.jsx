import { useAuth } from "../pages/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <h1
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        MedCare
      </h1>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 text-sm">
            Hi, {user.name}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded text-sm hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
