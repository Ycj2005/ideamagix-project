import { useAuth } from "../../pages/context/AuthContext.jsx";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Welcome, Dr. {user?.name}!</h3>
        <p className="text-gray-600">
          From here you can view your profile, manage patient consultations, and write prescriptions.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
