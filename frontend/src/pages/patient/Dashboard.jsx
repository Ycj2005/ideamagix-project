import { useAuth } from "../../pages/context/AuthContext.jsx";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Patient Dashboard</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Welcome, {user?.name}!</h3>
        <p className="text-gray-600">
          From here you can view doctors, book consultations, and check your prescriptions.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
