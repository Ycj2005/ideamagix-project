import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPrescription } from "../../services/doctorApi.js";
import Input from "../../components/Input.jsx";

function WritePrescription() {
  const { consultationId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    care: "",
    medicines: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await createPrescription({ ...form, consultationId });
      alert("Prescription created successfully!");
      navigate("/doctor/consultations");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to create prescription");
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Write Prescription</h2>
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
            placeholder="Dietary instructions, rest, specific care..."
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
            placeholder="1. Paracetamol 500mg - 1x0x1..."
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
            disabled={submitting}
            className="bg-blue-500 text-white px-6 py-2 rounded text-sm hover:bg-blue-600 disabled:opacity-50 flex-1"
          >
            {submitting ? "Generating PDF..." : "Submit & Generate PDF"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default WritePrescription;
