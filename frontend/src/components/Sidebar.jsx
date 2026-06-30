import { NavLink } from "react-router-dom";
import { useAuth } from "../pages/context/AuthContext.jsx";

function Sidebar() {
  const { user } = useAuth();

  const doctorLinks = [
    { to: "/doctor/dashboard", label: "Dashboard" },
    { to: "/doctor/profile", label: "Profile" },
    { to: "/doctor/consultations", label: "Consultations" },
  ];

  const patientLinks = [
    { to: "/patient/dashboard", label: "Dashboard" },
    { to: "/patient/profile", label: "Profile" },
    { to: "/patient/doctors", label: "Doctors" },
    { to: "/patient/prescriptions", label: "Prescriptions" },
  ];

  const links = user?.role === "doctor" ? doctorLinks : patientLinks;

  return (
    <aside className="w-56 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="mb-6">
        <p className="text-xs text-gray-400 uppercase tracking-wider">Menu</p>
      </div>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                "block px-3 py-2 rounded text-sm " +
                (isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50")
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
