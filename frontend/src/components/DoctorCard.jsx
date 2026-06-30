import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/helper.js";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center">
      <img
        src={doctor.profileImage ? getImageUrl(doctor.profileImage) : "https://ui-avatars.com/api/?name=" + doctor.name + "&background=3b82f6&color=fff"}
        alt={doctor.name}
        className="w-20 h-20 rounded-full object-cover mb-3"
      />
      <h3 className="font-medium text-gray-800">{doctor.name}</h3>
      <p className="text-sm text-gray-500 mb-1">{doctor.speciality || "General"}</p>
      <p className="text-xs text-gray-400 mb-3">{doctor.experience} yrs experience</p>
      <button
        onClick={() => navigate("/patient/consult/" + doctor._id)}
        className="bg-blue-500 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-600 w-full"
      >
        Consult
      </button>
    </div>
  );
}

export default DoctorCard;
