import { useAuth } from "../../pages/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/helper.js";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
      <h2 className="text-2xl font-bold mb-6">Doctor Profile</h2>
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 mb-4">
          <img
            src={user.profileImage ? getImageUrl(user.profileImage) : "https://ui-avatars.com/api/?name=" + user.name + "&background=3b82f6&color=fff"}
            alt={user.name}
            className="w-full h-full object-cover rounded-full border-4 border-blue-100"
          />
        </div>
        <h3 className="text-xl font-semibold mb-1">Dr. {user.name}</h3>
        <p className="text-gray-600 mb-4">{user.speciality || "General Practitioner"}</p>
        
        <div className="w-full max-w-sm text-left bg-gray-50 p-4 rounded mb-6">
          <p className="text-sm text-gray-700 mb-2"><span className="font-medium">Email:</span> {user.email}</p>
          <p className="text-sm text-gray-700 mb-2"><span className="font-medium">Phone:</span> {user.phone}</p>
          <p className="text-sm text-gray-700"><span className="font-medium">Experience:</span> {user.experience} Years</p>
        </div>

        <button
          onClick={() => navigate("/doctor/consultations")}
          className="bg-blue-500 text-white px-6 py-2 rounded text-sm hover:bg-blue-600 transition"
        >
          View Patient Consultations
        </button>
      </div>
    </div>
  );
}

export default Profile;
