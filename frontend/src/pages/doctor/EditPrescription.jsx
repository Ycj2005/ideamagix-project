import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPrescriptionsForDoctor, editPrescription, sendPrescription, downloadPdf } from "../../services/doctorApi.js";
import Loader from "../../components/Loader.jsx";

function EditPrescription() {
  const { consultationId } = useParams();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [form, setForm] = useState({ care: "", medicines: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await getPrescriptionsForDoctor();
        // find prescription related to this consultation
        const p = res.data.prescriptions.find(p => p.consultationId?._id === consultationId);
        if (p) {
          setPrescription(p);
          setForm({ care: p.care || "", medicines: p.medicines || "" });
        } else {
          setError("Prescription not found");
        }
      } catch (err) {
        setError("Error fetching prescription");
      }
      setLoading(false);
    };
    fetchPrescription();
  }, [consultationId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await editPrescription(prescription._id, form);
      alert("Prescription updated & PDF regenerated!");
      navigate("/doctor/consultations");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to edit prescription");
    }
  };

  const handleSend = async () => {
    if (!window.confirm("Are you sure you want to send this to the patient?")) return;
    setSending(true);
    try {
      await sendPrescription(prescription._id);
      alert("Sent to patient successfully!");
      navigate("/doctor/consultations");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to send");
    }
    setSending(false);
  };

  const handleDownload = async () => {
    try {
      const res = await downloadPdf(prescription._id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "prescription-" + prescription._id + ".pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("Failed to download PDF");
    }
  };

  if (loading) return <Loader />;
  if (error && !prescription) return <p className="text-red-500 p-6">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Edit Prescription</h2>
        <div className="flex gap-2">
          {prescription.pdf && (
             <button
               type="button"
               onClick={handleDownload}
               className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 border border-gray-300"
             >
               View PDF
             </button>
          )}
          <button
            type="button"
            onClick={handleSend}
            disabled={sending}
            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send to Patient"}
          </button>
        </div>
      </div>
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Care to be taken (Mandatory)
          </label>
          <textarea
            name="care"
            value={form.care}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medicines
          </label>
          <textarea
            name="medicines"
            value={form.medicines}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            rows="4"
          ></textarea>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded text-sm hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded text-sm hover:bg-blue-600 flex-1"
          >
            Update & Regenerate PDF
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPrescription;
