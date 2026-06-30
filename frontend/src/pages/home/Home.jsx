import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">MedCare</h1>
        <p className="text-gray-500">Online Prescription Platform</p>
      </div>
      <div className="flex gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center w-64">
          <div className="text-3xl mb-3">🩺</div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Doctor</h2>
          <p className="text-sm text-gray-500 mb-4">Login or create your doctor account</p>
          <button
            onClick={() => navigate("/doctor/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm w-full mb-2 hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/doctor/register")}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded text-sm w-full hover:bg-blue-50"
          >
            Sign Up
          </button>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center w-64">
          <div className="text-3xl mb-3">🧑</div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Patient</h2>
          <p className="text-sm text-gray-500 mb-4">Login or create your patient account</p>
          <button
            onClick={() => navigate("/patient/login")}
            className="bg-green-500 text-white px-4 py-2 rounded text-sm w-full mb-2 hover:bg-green-600"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/patient/register")}
            className="border border-green-500 text-green-500 px-4 py-2 rounded text-sm w-full hover:bg-green-50"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
