import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConsultationsForDoctor } from "../../services/doctorApi.js";
import Loader from "../../components/Loader.jsx";
import { getImageUrl } from "../../utils/helper.js";

function ConsultationList() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const res = await getConsultationsForDoctor();
      setConsultations(res.data.consultations);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Patient Consultations</h2>
      {consultations.length === 0 ? (
        <p className="text-gray-500 bg-white p-4 rounded border border-gray-200">
          No consultations available at the moment.
        </p>
      ) : (
        <div className="grid gap-6">
          {consultations.map((c) => (
            <div key={c._id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={c.PatientId?.profileImage ? getImageUrl(c.PatientId.profileImage) : "https://ui-avatars.com/api/?name=" + (c.PatientId?.name || "Patient") + "&background=10b981&color=fff"}
                    alt="Patient"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{c.PatientId?.name || "Unknown Patient"}</h3>
                    <p className="text-xs text-gray-500">Age: {c.PatientId?.age} | Status: {c.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block mb-2">{new Date(c.createdAt).toLocaleDateString()}</span>
                  {c.status === "Pending" ? (
                    <button
                      onClick={() => navigate("/doctor/prescription/write/" + c._id)}
                      className="bg-blue-500 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-600"
                    >
                      Write Prescription
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/doctor/prescription/edit/" + c._id)}
                      className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded text-sm hover:bg-gray-200 border border-gray-300"
                    >
                      Edit Prescription
                    </button>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100 text-sm">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Current Illness:</p>
                  <p className="text-gray-600 mb-3">{c.illnessHistory || "N/A"}</p>
                  <p className="font-medium text-gray-700 mb-1">Recent Surgery:</p>
                  <p className="text-gray-600">{c.recentSurgery || "None"} <span className="text-xs text-gray-400">({c.surgeryTime})</span></p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Family Medical:</p>
                  <p className="text-gray-600 mb-1">Diabetic: {c.diabetic ? "Yes" : "No"}</p>
                  <p className="text-gray-600 mb-1">Allergies: {c.allergies || "None"}</p>
                  <p className="text-gray-600">Others: {c.others || "None"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConsultationList;
