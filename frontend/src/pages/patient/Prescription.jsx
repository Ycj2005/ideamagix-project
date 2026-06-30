import { useState, useEffect } from "react";
import { getMyPrescriptions, downloadPdf } from "../../services/patientApi.js";
import Loader from "../../components/Loader.jsx";

function Prescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await getMyPrescriptions();
      setPrescriptions(res.data.prescriptions);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDownload = async (id) => {
    try {
      const res = await downloadPdf(id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "prescription-" + id + ".pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("Failed to download PDF");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <p className="text-gray-500 bg-white p-4 rounded border border-gray-200">
          You haven't received any prescriptions yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {prescriptions.map((p) => (
            <div key={p._id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between md:items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="font-semibold text-lg">Doctor: {p.doctorId?.name || "Unknown"}</h3>
                <p className="text-sm text-gray-500 mb-2">Specialty: {p.doctorId?.speciality || "N/A"}</p>
                <p className="text-sm text-gray-700 mt-2">
                  <span className="font-medium">Date:</span> {new Date(p.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Care:</span> {p.care}
                </p>
              </div>
              <div>
                {p.pdf ? (
                  <button
                    onClick={() => handleDownload(p._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
                  >
                    Download PDF
                  </button>
                ) : (
                  <span className="text-gray-400 text-sm italic">PDF not available</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Prescription;
